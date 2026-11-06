import type { Job } from "@/lib/jobadder";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

/**
 * Structured data (JSON-LD) helpers for search engines and AI assistants.
 * Everything here describes facts already on the site or in the JobAdder
 * feed — nothing is invented. Jobs always name Lumiq Talent as the hiring
 * organisation so the client is never revealed.
 */

/** Escape "<" so embedded HTML can't close the script tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const STATES: Record<string, string> = {
  sydney: "NSW",
  "new south wales": "NSW",
  nsw: "NSW",
  melbourne: "VIC",
  victoria: "VIC",
  vic: "VIC",
  brisbane: "QLD",
  queensland: "QLD",
  qld: "QLD",
  "gold coast": "QLD",
  perth: "WA",
  "western australia": "WA",
  wa: "WA",
  adelaide: "SA",
  "south australia": "SA",
  canberra: "ACT",
  act: "ACT",
  hobart: "TAS",
  tasmania: "TAS",
  darwin: "NT",
  "northern territory": "NT",
};

const COUNTRIES: Record<string, string> = {
  australia: "AU",
  au: "AU",
  "new zealand": "NZ",
  nz: "NZ",
};

/** Best-effort state for an Australian location string, e.g. "Sydney CBD". */
function stateFor(...places: (string | null)[]): string | undefined {
  for (const place of places) {
    if (!place) continue;
    const lower = place.toLowerCase();
    for (const [name, code] of Object.entries(STATES)) {
      if (new RegExp(`\\b${name}\\b`).test(lower)) return code;
    }
  }
  return undefined;
}

function isRemote(job: Job): boolean {
  return [job.location, job.area, job.workType].some((v) =>
    /\bremote\b/i.test(v ?? "")
  );
}

/** Maps JobAdder work types to Google's employmentType values. */
function employmentType(workType: string | null): string[] | undefined {
  if (!workType) return undefined;
  const w = workType.toLowerCase();
  const types = new Set<string>();
  if (/full|perm/.test(w)) types.add("FULL_TIME");
  if (/part/.test(w)) types.add("PART_TIME");
  if (/contract|fixed/.test(w)) types.add("CONTRACTOR");
  if (/temp|casual/.test(w)) types.add("TEMPORARY");
  if (/intern|graduate/.test(w)) types.add("INTERN");
  return types.size ? [...types] : undefined;
}

const PERIOD_UNITS: [RegExp, string][] = [
  [/hour/i, "HOUR"],
  [/day|daily/i, "DAY"],
  [/week/i, "WEEK"],
  [/month/i, "MONTH"],
  [/year|annual|annum|p\.?a/i, "YEAR"],
];

function baseSalary(job: Job) {
  const s = job.salaryRange;
  if (!s) return undefined;
  const unitText =
    PERIOD_UNITS.find(([re]) => re.test(s.period ?? ""))?.[1] ?? "YEAR";
  const value =
    s.min !== null && s.max !== null && s.min !== s.max
      ? { "@type": "QuantitativeValue", minValue: s.min, maxValue: s.max, unitText }
      : { "@type": "QuantitativeValue", value: s.min ?? s.max, unitText };
  return { "@type": "MonetaryAmount", currency: s.currency, value };
}

export function jobPostingJsonLd(job: Job): string {
  const countryName = job.country ?? "Australia";
  const addressCountry = COUNTRIES[countryName.toLowerCase()] ?? countryName;
  const remote = isRemote(job);
  const locality = remote ? undefined : job.location ?? undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.descriptionHtml || job.summary || job.title,
    datePosted: job.datePosted ?? undefined,
    employmentType: employmentType(job.workType),
    identifier: {
      "@type": "PropertyValue",
      name: SITE_NAME,
      value: job.reference ?? job.id,
    },
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: `${SITE_URL}/lumiq-logo-green.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        addressRegion: stateFor(job.location, job.area),
        addressCountry,
      },
    },
    ...(remote
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: {
            "@type": "Country",
            name: countryName,
          },
        }
      : {}),
    baseSalary: baseSalary(job),
    directApply: false,
    url: `${SITE_URL}/jobs/${job.slug}`,
  };
  return jsonLd(data);
}

/** Plain-text job description trimmed for meta descriptions. */
export function jobMetaDescription(job: Job): string | undefined {
  const source =
    job.summary ??
    job.descriptionHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!source) return undefined;
  return source.length > 155 ? `${source.slice(0, 152).trimEnd()}…` : source;
}

/** "[Job title], [City] | Lumiq Talent", leaving out a city already in the title. */
export function jobPageTitle(job: Job): string {
  const place = job.location;
  const withPlace =
    place && !job.title.toLowerCase().includes(place.toLowerCase())
      ? `${job.title}, ${place}`
      : job.title;
  return `${withPlace} | ${SITE_NAME}`;
}
