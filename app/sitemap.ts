import type { MetadataRoute } from "next";
import { NAV_ITEMS, SITE_URL } from "@/lib/constants";
import { getJobs } from "@/lib/jobs";

// Rebuilt hourly so newly posted jobs are picked up.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    ...NAV_ITEMS.map((item) => ({
      url: `${SITE_URL}${item.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const jobs = (await getJobs()) ?? [];
  const jobPages: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${SITE_URL}/jobs/${job.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...pages, ...jobPages];
}
