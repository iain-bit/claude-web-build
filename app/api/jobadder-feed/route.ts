import { createHash, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { parseJobsXml } from "@/lib/jobadder";
import { JOBS_CACHE_TAG, saveFeed } from "@/lib/jobs";

/**
 * JobAdder HTTP-posts our job ads here as XML every time a job on the
 * website board changes. Protected with HTTP Basic auth using
 * JOBADDER_FEED_USER / JOBADDER_FEED_PASSWORD (the same details given to
 * JobAdder support). As a fallback for senders that can't do Basic auth,
 * the password can instead be passed as a `key` query parameter.
 *
 * Accepts all three of JobAdder's post formats: raw XML,
 * multipart/form-data and application/x-www-form-urlencoded.
 */

const MAX_FEED_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  // Trim in case a trailing space or newline was pasted into Vercel.
  const user = process.env.JOBADDER_FEED_USER?.trim();
  const password = process.env.JOBADDER_FEED_PASSWORD?.trim();
  if (!user || !password) {
    console.error("JobAdder feed: JOBADDER_FEED_USER/PASSWORD not set");
    return new Response("Feed endpoint not configured", { status: 503 });
  }

  const authFailure = checkAuth(request, user, password);
  if (authFailure) {
    console.warn(`JobAdder feed rejected: ${authFailure}`);
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
    console.warn(
      `JobAdder feed rejected: not a jobs feed (starts: ${JSON.stringify(xml.slice(0, 120))})`
    );
    return new Response("Not a JobAdder jobs feed", { status: 400 });
  }

  try {
    await saveFeed(xml);
  } catch (error) {
    console.error("Failed to store JobAdder feed", error);
    return new Response("Could not store feed", { status: 500 });
  }
  revalidateTag(JOBS_CACHE_TAG, { expire: 0 });

  console.log(`JobAdder feed received: ${jobs.length} jobs`);
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

/**
 * Returns null when authorised, otherwise a reason for the logs. The
 * reason never includes the supplied or expected credentials.
 */
function checkAuth(
  request: Request,
  user: string,
  password: string
): string | null {
  const key = new URL(request.url).searchParams.get("key");
  if (key !== null) {
    return safeEqual(key.trim(), password) ? null : "key did not match";
  }

  const header = request.headers.get("authorization");
  if (!header) return "no Authorization header or key sent";
  const [scheme, encoded = ""] = header.trim().split(/\s+/, 2);
  if (scheme.toLowerCase() !== "basic") {
    return `unsupported auth scheme "${scheme}"`;
  }

  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const separator = decoded.indexOf(":");
  const suppliedUser = decoded.slice(0, separator).trim();
  const suppliedPassword = decoded.slice(separator + 1).trim();
  if (separator === -1 || !safeEqual(suppliedUser.toLowerCase(), user.toLowerCase())) {
    return "username did not match";
  }
  return safeEqual(suppliedPassword, password) ? null : "password did not match";
}

function safeEqual(a: string, b: string): boolean {
  const hash = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(a), hash(b));
}
