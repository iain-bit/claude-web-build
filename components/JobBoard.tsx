"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Job } from "@/lib/jobadder";

export default function JobBoard({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const categories = useMemo(
    () =>
      [...new Set(jobs.map((job) => job.category).filter((c) => c !== null))]
        .sort(),
    [jobs]
  );

  const visible = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return jobs.filter((job) => {
      if (category && job.category !== category) return false;
      const haystack = [job.title, job.summary, job.location, job.category]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [jobs, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, skill or location"
          aria-label="Search jobs"
          className="flex-1 rounded-full border border-forest/20 bg-white/60 px-5 py-3 font-sans text-sm text-forest placeholder:text-forest/50 focus:border-bronze focus:outline-none"
        />
        {categories.length > 1 && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by speciality"
            className="rounded-full border border-forest/20 bg-white/60 px-5 py-3 font-sans text-sm text-forest focus:border-bronze focus:outline-none"
          >
            <option value="">All specialities</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
      </div>

      <p className="mt-6 font-sans text-sm text-forest/60">
        {visible.length} {visible.length === 1 ? "role" : "roles"}
      </p>

      <ul className="mt-4 space-y-4">
        {visible.map((job) => (
          <li key={job.id}>
            <Link
              href={`/jobs/${job.slug}`}
              className="block rounded-2xl bg-white/60 p-6 transition-colors hover:bg-white/90 sm:p-8"
            >
              <h2 className="font-heading text-xl font-bold text-forest sm:text-2xl">
                {job.title}
              </h2>
              <JobMeta job={job} />
              {job.summary && (
                <p className="mt-3 font-sans text-sm text-forest/80">
                  {job.summary}
                </p>
              )}
              <span className="mt-4 inline-block font-sans text-sm font-medium text-bronze">
                View role &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="mt-8 font-sans text-sm text-forest/70">
          No roles match your search.
        </p>
      )}
    </div>
  );
}

export function JobMeta({ job }: { job: Job }) {
  const items = [
    job.location,
    job.workType,
    job.salary,
    job.category,
  ].filter((item) => item !== null);
  if (items.length === 0) return null;

  return (
    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-sans text-sm text-forest/60">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
