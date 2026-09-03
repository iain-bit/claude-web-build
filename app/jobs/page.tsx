import type { Metadata } from "next";
import JobAdderEmbed from "@/components/JobAdderEmbed";

export const metadata: Metadata = {
  title: "Jobs | Lumiq Talent",
  description: "Current opportunities in AI, Data & Analytics, and Engineering.",
};

export default function Jobs() {
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
        <JobAdderEmbed />
      </div>
    </div>
  );
}
