import { XMLParser } from "fast-xml-parser";
import sanitizeHtml from "sanitize-html";

/**
 * Parses the XML job feed JobAdder posts to /api/jobadder-feed.
 *
 * Based on JobAdder's standard "Jobs on your Website" XML format:
 *   <Jobs>
 *     <Job jid="123" reference="ABC" datePosted="..." dateUpdated="...">
 *       <Title/> <Summary/> <BulletPoints><BulletPoint/></BulletPoints>
 *       <Classifications><Classification name="Location">…</Classification></Classifications>
 *       <Description>HTML</Description> <Apply><Url/></Apply>
 *     </Job>
 *   </Jobs>
 *
 * Every field except the id and title is treated as optional, so a job
 * with missing details still renders rather than breaking the page.
 */

export type Job = {
  id: string;
  slug: string;
  reference: string | null;
  title: string;
  summary: string | null;
  bulletPoints: string[];
  /** Sanitised HTML, safe to render. */
  descriptionHtml: string;
  category: string | null;
  subCategory: string | null;
  location: string | null;
  area: string | null;
  workType: string | null;
  salary: string | null;
  datePosted: string | null;
  applyUrl: string | null;
};

type XmlNode = Record<string, unknown>;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  parseTagValue: false,
  parseAttributeValue: false,
  trimValues: true,
  isArray: (name) =>
    ["Job", "BulletPoint", "Classification"].includes(name),
});

/** Returns the parsed jobs, or null if the XML isn't a JobAdder jobs feed. */
export function parseJobsXml(xml: string): Job[] | null {
  let doc: XmlNode;
  try {
    doc = parser.parse(xml) as XmlNode;
  } catch {
    return null;
  }

  const root = pick(doc, "Jobs");
  if (root === undefined) return null;
  // An empty <Jobs/> (no live ads) parses to "" — valid, just no jobs.
  if (!isNode(root)) return [];

  const jobs = asArray(pick(root, "Job"))
    .filter(isNode)
    .map(toJob)
    .filter((job): job is Job => job !== null);

  return jobs.sort((a, b) =>
    (b.datePosted ?? "").localeCompare(a.datePosted ?? "")
  );
}

function toJob(node: XmlNode): Job | null {
  const id = text(pick(node, "@_jid")) ?? text(pick(node, "@_id"));
  const title = text(pick(node, "Title"));
  if (!id || !title) return null;

  const classifications = new Map<string, string>();
  for (const c of asArray(pick(pick(node, "Classifications"), "Classification"))) {
    const name = isNode(c) ? text(pick(c, "@_name")) : null;
    const value = text(c);
    if (name && value) classifications.set(normaliseKey(name), value);
  }

  const bulletPoints = asArray(
    pick(pick(node, "BulletPoints"), "BulletPoint")
  )
    .map(text)
    .filter((b): b is string => !!b);

  return {
    id,
    slug: `${id}-${slugify(title)}`,
    reference: text(pick(node, "@_reference")),
    title,
    summary: text(pick(node, "Summary")),
    bulletPoints,
    descriptionHtml: sanitizeDescription(text(pick(node, "Description")) ?? ""),
    category: classifications.get("category") ?? null,
    subCategory: classifications.get("subcategory") ?? null,
    location: classifications.get("location") ?? null,
    area: classifications.get("area") ?? null,
    workType: classifications.get("worktype") ?? null,
    salary: salaryText(pick(node, "Salary")),
    datePosted: text(pick(node, "@_datePosted")),
    applyUrl: safeUrl(text(pick(pick(node, "Apply"), "Url"))),
  };
}

function salaryText(node: unknown): string | null {
  if (!isNode(node)) return text(node);
  const explicit = text(pick(node, "Text"));
  if (explicit) return explicit;
  const min = text(pick(node, "MinValue"));
  const max = text(pick(node, "MaxValue"));
  if (!min && !max) return null;
  const range = min && max && min !== max ? `${min} – ${max}` : (min ?? max);
  const period = text(pick(node, "@_period"));
  return period ? `${range} ${period.toLowerCase()}` : range;
}

function sanitizeDescription(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li",
      "h2", "h3", "h4", "a", "blockquote",
    ],
    allowedAttributes: { a: ["href"] },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        target: "_blank",
        rel: "noopener noreferrer",
      }),
    },
  });
}

/** Only allow http(s) apply links through to the Apply button. */
function safeUrl(url: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:"
      ? parsed.toString()
      : null;
  } catch {
    return null;
  }
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function normaliseKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

function isNode(value: unknown): value is XmlNode {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asArray(value: unknown): unknown[] {
  if (value === undefined || value === null || value === "") return [];
  return Array.isArray(value) ? value : [value];
}

/** Case-insensitive child lookup, so small casing differences don't matter. */
function pick(node: unknown, key: string): unknown {
  if (!isNode(node)) return undefined;
  if (key in node) return node[key];
  const lower = key.toLowerCase();
  const match = Object.keys(node).find((k) => k.toLowerCase() === lower);
  return match === undefined ? undefined : node[match];
}

function text(value: unknown): string | null {
  if (typeof value === "string") return value.trim() || null;
  if (typeof value === "number") return String(value);
  if (isNode(value)) return text(value["#text"]);
  return null;
}
