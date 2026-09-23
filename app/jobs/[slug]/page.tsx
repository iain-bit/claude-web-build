import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobMeta } from "@/components/JobBoard";
import type { Job } from "@/lib/jobadder";
import { getJob } from "@/lib/jobs";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJob((await params).slug);
  if (!job) return { title: "Job not found | Lumiq Talent" };
  return {
    title: `${job.title} | Lumiq Talent`,
    description: job.summary ?? undefined,
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

/** Structured data so the role can appear in Google's job search. */
function jobPostingJsonLd(job: Job): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.descriptionHtml || job.summary || job.title,
    datePosted: job.datePosted ?? undefined,
    identifier: job.reference
      ? { "@type": "PropertyValue", name: "Lumiq Talent", value: job.reference }
      : undefined,
    hiringOrganization: {
      "@type": "Organization",
      name: "Lumiq Talent",
      sameAs: "https://www.lumiqtalent.com",
    },
    jobLocation: job.location
      ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location,
          },
        }
      : undefined,
  };
  // Escape "<" so description HTML can't close the script tag.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
