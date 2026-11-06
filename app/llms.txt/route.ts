import {
  NAV_ITEMS,
  SITE_URL,
  SPECIALITIES,
  TAGLINE,
  FOUNDERS,
  VALUES,
} from "@/lib/constants";
import { getJobs } from "@/lib/jobs";

/**
 * /llms.txt — a plain-English summary of Lumiq Talent for AI assistants
 * (ChatGPT, Claude, Perplexity, Gemini and others), with links to the key
 * pages and every live job. Built only from content already on the site,
 * and refreshed hourly so new jobs appear.
 */
export const revalidate = 3600;

export async function GET() {
  const jobs = (await getJobs()) ?? [];
  const team = FOUNDERS.map((f) => f.fullName).join(", ");

  const lines = [
    "# Lumiq Talent",
    "",
    `> Lumiq Talent is a Sydney-based specialist recruiter for AI, data, engineering and data centre talent. ${TAGLINE} We use tools to move faster, but every judgement is made by a human, always.`,
    "",
    `- Based in: Sydney, NSW, Australia; recruiting across Australia`,
    `- Co-founders: ${team}`,
    `- Commercial models: contingency, rate card or subscription`,
    `- Contact: ${SITE_URL}/contact`,
    "",
    "## Specialities",
    "",
    ...SPECIALITIES.flatMap((s) => [
      `### ${s.title}`,
      "",
      s.blurb,
      "",
      `Roles we place: ${s.roles.join("; ")}.`,
      "",
    ]),
    "## How we work",
    "",
    ...VALUES.map((v) => `- ${v.title}: ${v.body}`),
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}/)`,
    ...NAV_ITEMS.map((item) => `- [${item.label}](${SITE_URL}${item.href})`),
    "",
    "## Current jobs",
    "",
    ...(jobs.length
      ? jobs.map(
          (j) =>
            `- [${j.title}${j.location ? `, ${j.location}` : ""}](${SITE_URL}/jobs/${j.slug})`
        )
      : [`- See ${SITE_URL}/jobs for current roles.`]),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
