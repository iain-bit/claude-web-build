import type { Metadata } from "next";
import Link from "next/link";
import JobBoard from "@/components/JobBoard";
import { getJobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Jobs | Lumiq Talent",
  description: "Current opportunities in AI, Data & Analytics, and Engineering.",
};

export default async function Jobs() {
  const jobs = await getJobs();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <h1 className="font-heading text-4xl font-bold text-forest sm:text-5xl">
        Jobs
      </h1>
      <p className="mt-4 max-w-2xl font-sans text-forest/70">
        Current opportunities across AI &amp; Machine Learning, Data Centre
        &amp; Infrastructure, and Data &amp; Analytics.
      </p>

      <div className="mt-12">
        {jobs && jobs.length > 0 ? <JobBoard jobs={jobs} /> : <NoJobs />}
      </div>
    </div>
  );
}

function NoJobs() {
  return (
    <div className="rounded-2xl bg-white/60 p-12 text-center">
      <p className="font-heading text-xl font-bold text-forest">
        No open roles listed right now.
      </p>
      <p className="mx-auto mt-3 max-w-md font-sans text-sm text-forest/70">
        New roles are added regularly. In the meantime, get in touch and
        we&apos;ll point you at roles that fit.
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-block rounded-full bg-bronze px-6 py-3 font-sans text-sm font-medium text-stone transition-opacity hover:opacity-90"
      >
        Get in touch
      </Link>
    </div>
  );
}
