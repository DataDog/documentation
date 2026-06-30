import { HUGO_ORIGIN } from "@config/origins";
import type { TypesenseHit, MultiSearchResponse } from "@lib/search/typesense";

export interface NormalizedHit {
  title: string;
  category: string;
  subcategory: string;
  sectionHeader: string;
  snippetHtml: string;
  url: string;
  isApi: boolean;
}

// Category order on API pages, mirroring `instantsearch.js:300-313` after the
// API-pinned-first transform.
export const CATEGORY_ORDER: Array<{ label: string; key: string }> = [
  { label: "API", key: "api" },
  { label: "Getting Started", key: "getting started" },
  { label: "Documentation", key: "documentation" },
  { label: "Guides", key: "guide" },
  { label: "Integrations", key: "integrations" },
];

const STOP_WORDS = new Set(["the", "and", "for"]);

/**
 * Replicates Hugo's `getHitData` + `getSnippetForDisplay` logic against
 * Typesense's native response shape (we removed instantsearch.js + the adapter,
 * so highlights arrive as `[{ field, snippet|value }]` rather than as
 * `_highlightResult`).
 */
export function normalizeHit(
  hit: TypesenseHit,
  query: string,
  indexLabel: "docs" | "partners",
): NormalizedHit {
  const doc = hit.document;
  const highlights = new Map<string, string>();
  for (const h of hit.highlights ?? []) {
    highlights.set(h.field, h.snippet ?? h.value ?? "");
  }

  const title = doc.title ?? "";
  const subcategory = doc.subcategory ?? title;
  const rawCategory =
    indexLabel === "partners" ? "Partners" : (doc.category ?? "Documentation");

  const highlightedTitle = highlights.get("title") ?? title;
  const highlightedSection =
    highlights.get("section_header") ?? doc.section_header ?? "";
  const highlightedContent = highlights.get("content") ?? "";

  const regex = buildHighlightRegex(query);
  const titleHtml = injectMissingMarks(highlightedTitle, regex);
  const sectionHtml = injectMissingMarks(highlightedSection, regex);
  const contentHtml = injectMissingMarks(highlightedContent, regex);

  const snippetHtml = makeSnippet(contentHtml, doc.section_header ?? "");
  const isApi = rawCategory.toLowerCase() === "api";

  return {
    title: titleHtml,
    category: rawCategory,
    subcategory,
    sectionHeader: sectionHtml,
    snippetHtml,
    url: buildUrl(doc.relpermalink ?? "", isApi),
    isApi,
  };
}

export function groupHits(
  response: MultiSearchResponse,
  query: string,
): Map<string, NormalizedHit[]> {
  const buckets = new Map<string, NormalizedHit[]>();
  for (const cat of CATEGORY_ORDER) buckets.set(cat.key, []);
  buckets.set("partners", []);

  for (const hit of response.docs.hits) {
    const normalized = normalizeHit(hit, query, "docs");
    const key = normalized.category.toLowerCase();
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(normalized);
  }
  for (const hit of response.partners.hits) {
    const normalized = normalizeHit(hit, query, "partners");
    buckets.get("partners")!.push(normalized);
  }
  return buckets;
}

function buildHighlightRegex(query: string): RegExp | null {
  const words = query
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w.toLowerCase()))
    .map(escapeRegex);
  if (words.length === 0) return null;
  return new RegExp(`(${words.join("|")})`, "gi");
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function injectMissingMarks(text: string, regex: RegExp | null): string {
  if (!text) return "";
  if (text.includes("<mark>")) return text;
  if (!regex) return text;
  return text.replace(regex, "<mark>$1</mark>");
}

function makeSnippet(
  highlightedContent: string,
  sectionHeader: string,
): string {
  const limit = 180;
  if (!highlightedContent) return "";
  // Prefer a window around the first <mark> when present (matches Hugo's
  // `truncateContentAtHighlight`); otherwise truncate from the start.
  const markIdx = highlightedContent.indexOf("<mark>");
  if (markIdx === -1) {
    return truncate(highlightedContent, limit);
  }
  if (!sectionHeader) {
    const start = truncate(highlightedContent, limit);
    if (start.includes("<mark>")) return start;
  }
  return truncateAtHighlight(highlightedContent, limit, markIdx);
}

function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).replace(/\s+\S*$/, "")}…`;
}

function truncateAtHighlight(
  text: string,
  limit: number,
  markIdx: number,
): string {
  const half = Math.floor(limit / 2);
  const start = Math.max(0, markIdx - half);
  const end = Math.min(text.length, start + limit);
  const window = text.slice(start, end);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  // Don't slice through a <mark> tag — extend right edge to a tag boundary.
  const safe = window.replace(/<mark>[^<]*$/, (m) => m + "</mark>");
  return `${prefix}${safe}${suffix}`;
}

function buildUrl(relpermalink: string, isApi: boolean): string {
  if (!relpermalink) return "";
  if (isApi) return relpermalink;
  return `${HUGO_ORIGIN}${relpermalink}`;
}
