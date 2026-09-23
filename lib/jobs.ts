import "server-only";
import { get, put } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import { parseJobsXml, type Job } from "@/lib/jobadder";

/**
 * The latest JobAdder feed is stored as a single private file in Vercel
 * Blob. Each post from JobAdder contains every live job, so it simply
 * overwrites the previous file.
 */
const FEED_PATHNAME = "jobadder/jobadder.xml";

export const JOBS_CACHE_TAG = "jobadder-jobs";

export async function saveFeed(xml: string): Promise<void> {
  await put(FEED_PATHNAME, xml, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/xml",
  });
}

/**
 * Returns the live jobs, or null when no feed has been received yet (or
 * Blob storage isn't connected), so the page can show a fallback.
 * Cached, and refreshed as soon as a new feed arrives.
 */
export const getJobs = unstable_cache(
  async (): Promise<Job[] | null> => {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return null;

    try {
      const result = await get(FEED_PATHNAME, {
        access: "private",
        useCache: false,
      });
      if (!result || result.statusCode !== 200) return null;
      const xml = await new Response(result.stream).text();
      return parseJobsXml(xml);
    } catch (error) {
      console.error("Failed to load JobAdder feed", error);
      return null;
    }
  },
  ["jobadder-jobs"],
  { tags: [JOBS_CACHE_TAG], revalidate: 3600 }
);

export async function getJob(slug: string): Promise<Job | null> {
  const id = slug.split("-")[0];
  const jobs = await getJobs();
  return jobs?.find((job) => job.id === id) ?? null;
}
