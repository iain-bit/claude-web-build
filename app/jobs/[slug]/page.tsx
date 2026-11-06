import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobMeta } from "@/components/JobBoard";
import { SITE_NAME } from "@/lib/constants";
import { getJob } from "@/lib/jobs";
import { jobMetaDescription, jobPageTitle, jobPostingJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJob((await params).slug);
  if (!job) return { title: "Job not found | Lumiq Talent" };
  const title = jobPageTitle(job);
  const description = jobMetaDescription(job);
  return {
    title,
    description,
    alternates: { canonical: `/jobs/${job.slug}` },
    // What LinkedIn, Slack etc. show when the link is shared. The preview
    // image comes from opengraph-image.tsx next to this file. Setting
    // openGraph here replaces the one in the root layout, so siteName and
    // locale are repeated.
    openGraph: {
      title,
      description,
      url: `/jobs/${job.slug}`,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_AU",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function JobPage({ params }: Props) {
  const job = await getJob((await params).slug);
  if (!job) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <Link
        href="/jobs"
        className="font-sans text-sm text-forest/70 hover:text-forest"
      >
        &larr; All jobs
      </Link>

      <h1 className="mt-6 font-heading text-4xl font-bold text-forest sm:text-5xl">
        {job.title}
      </h1>
      <JobMeta job={job} />

      {job.bulletPoints.length > 0 && (
        <ul className="mt-8 list-disc space-y-1 pl-5 font-sans text-forest/80">
          {job.bulletPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}

      <div
        className="job-description mt-8 font-sans text-forest/80"
        dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
      />

      <div className="mt-12 flex flex-wrap items-center gap-4">
        {job.applyUrl ? (
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-bronze px-8 py-3 font-sans text-sm font-medium text-stone transition-opacity hover:opacity-90"
          >
            Apply now
          </a>
        ) : (
          <Link
            href="/contact"
            className="inline-block rounded-full bg-bronze px-8 py-3 font-sans text-sm font-medium text-stone transition-opacity hover:opacity-90"
          >
            Enquire about this role
          </Link>
        )}
        {job.reference && (
          <span className="font-sans text-xs text-forest/50">
            Ref: {job.reference}
          </span>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jobPostingJsonLd(job) }}
      />
    </div>
  );
}
