import { createHash, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { parseJobsXml } from "@/lib/jobadder";
import { JOBS_CACHE_TAG, saveFeed } from "@/lib/jobs";

/**
 * JobAdder HTTP-posts our job ads here as XML every time a job on the
 * website board changes. Protected with HTTP Basic auth using
 * JOBADDER_FEED_USER / JOBADDER_FEED_PASSWORD (the same details given to
 * JobAdder support).
 *
 * Accepts all three of JobAdder's post formats: raw XML,
 * multipart/form-data and application/x-www-form-urlencoded.
 */

const MAX_FEED_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const user = process.env.JOBADDER_FEED_USER;
  const password = process.env.JOBADDER_FEED_PASSWORD;
  if (!user || !password) {
    return new Response("Feed endpoint not configured", { status: 503 });
  }

  if (!isAuthorised(request.headers.get("authorization"), user, password)) {
    return new Response("Unauthorised", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="jobadder-feed"' },
    });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_FEED_BYTES) {
    return new Response("Feed too large", { status: 413 });
  }

  const xml = await readXml(request);
  if (!xml || xml.length > MAX_FEED_BYTES) {
    return new Response("No XML found in request", { status: 400 });
  }

  const jobs = parseJobsXml(xml);
  if (jobs === null) {
    return new Response("Not a JobAdder jobs feed", { status: 400 });
  }

  try {
    await saveFeed(xml);
  } catch (error) {
    console.error("Failed to store JobAdder feed", error);
    return new Response("Could not store feed", { status: 500 });
  }
  revalidateTag(JOBS_CACHE_TAG, { expire: 0 });

  return new Response(`OK: received ${jobs.length} jobs`, { status: 200 });
}

async function readXml(request: Request): Promise<string | null> {
  const contentType = request.headers.get("content-type") ?? "";

  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const form = await request.formData();
    for (const value of form.values()) {
      const text = typeof value === "string" ? value : await value.text();
      if (text.trim().startsWith("<")) return text;
    }
    return null;
  }

  return request.text();
}

function isAuthorised(
  header: string | null,
  user: string,
  password: string
): boolean {
  if (!header?.startsWith("Basic ")) return false;
  const supplied = Buffer.from(header.slice(6), "base64").toString("utf8");
  return safeEqual(supplied, `${user}:${password}`);
}

function safeEqual(a: string, b: string): boolean {
  const hash = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(a), hash(b));
}
