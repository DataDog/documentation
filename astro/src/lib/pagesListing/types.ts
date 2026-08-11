/**
 * Contracts for the plaintext page listing: the `pages.json` and `llms.txt`
 * artifact schemas, their build-time sidecars, and the page-source interfaces
 * both are built from.
 *
 * Alias-free (zod only) so the `astro:build:done` integrations, which run in Node
 * outside Vite's module graph, can import from here.
 */

import { z } from "zod";

/**
 * Mirrors the kept subset of Hugo's `html-to-mdoc` pages listing (see
 * `plans/20_pages_json.md`): `metadata` + `mdocHash`, plus an Astro-specific
 * `source` key. Hugo's `htmlHash` and `astIsValid` are intentionally dropped —
 * Astro has no source HTML to hash, and it builds plaintext Markdoc→Markdoc so
 * validity is guaranteed by construction. Defined here rather than imported from
 * `corp-node-packages` to keep everything inside `astro/`.
 */
export const PageMetadataSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    /** Ancestor trail only — never includes the page's own title. */
    breadcrumbs: z.array(z.string()),
    /** Omitted in input means public; parsed output always carries a boolean. */
    isPrivate: z.boolean().default(false),
  })
  .strict();

export const PagesListingEntrySchema = z
  .object({
    metadata: PageMetadataSchema,
    /** md5 of the exact plaintext served at this URL, hex, 32 chars. */
    mdocHash: z.string().length(32),
    /** Provenance marker so this file can be blended with Hugo's pages.json. */
    source: z.literal("astro"),
  })
  .strict();

/** Keyed by the full absolute URL of each page's plaintext twin (ends in `.md`). */
export const PagesListingSchema = z.record(z.string(), PagesListingEntrySchema);

export type PageMetadata = z.infer<typeof PageMetadataSchema>;
export type PageMetadataInput = z.input<typeof PageMetadataSchema>;
export type PagesListingEntry = z.infer<typeof PagesListingEntrySchema>;
export type PagesListing = z.infer<typeof PagesListingSchema>;

/**
 * One plaintext page.
 *
 * Deliberately metadata-only: a page body is materialized exactly once, by that
 * page's `.md` route during the static build, and hashed from disk afterwards
 * (see `buildListingFromIndex` and the `pagesJson` integration). A source is
 * never asked to render a body, so it cannot drift from what the route serves.
 *
 * A schema rather than a bare interface because it crosses a disk boundary: the
 * `llms-index.json` sidecar is parsed back in the `llmsTxt` integration.
 */
export const PlaintextPageSchema = z
  .object({
    /** Path portion of the URL, ending in `.md`, e.g. "/api/latest/metrics/get-a-metric.md". */
    urlPath: z.string(),
    metadata: PageMetadataSchema,
  })
  .strict();

/**
 * A group of pages a source chooses as one unit for llms.txt: it becomes an
 * entry in the top-level index and gets its own detail `llms.txt` file (split
 * into numbered parts if it exceeds the hard character limit). The source
 * decides what a section is — the API source uses one section per category.
 * `pages.json` ignores sections and lists every page flat.
 */
export const PlaintextSectionSchema = z
  .object({
    /** Display name, e.g. the category name. Used as the index link + detail `# heading`. */
    title: z.string(),
    /** URL path of this section's detail file, ending in "/llms.txt", e.g. "/api/latest/metrics/llms.txt". */
    llmsTxtPath: z.string(),
    /** Pages in this section. The first is treated as the section's overview (its description labels the index link). */
    pages: z.array(PlaintextPageSchema),
  })
  .strict();

/** One source's contribution to the `llms-index.json` sidecar. */
export const LlmsIndexSourceSchema = z
  .object({
    /** Heading for this source's area in the top-level llms.txt index. */
    title: z.string(),
    rootPages: z.array(PlaintextPageSchema),
    sections: z.array(PlaintextSectionSchema),
  })
  .strict();

/**
 * `llms-index.json` — the structure sidecar for the llms.txt tree.
 *
 * The resolved output of every page source, in registry order: exactly what
 * `buildLlmsTree` needs and nothing more. Deliberately holds `urlPath`s rather
 * than absolute URLs, so the sidecar is origin-independent and `site` is applied
 * exactly once, by the integration that writes the files.
 */
export const LlmsIndexSchema = z.array(LlmsIndexSourceSchema);

export type PlaintextPage = z.infer<typeof PlaintextPageSchema>;
export type PlaintextSection = z.infer<typeof PlaintextSectionSchema>;
export type LlmsIndexSource = z.infer<typeof LlmsIndexSourceSchema>;
export type LlmsIndex = z.infer<typeof LlmsIndexSchema>;

/**
 * A source of plaintext content. Provides pages that sit directly under the
 * source's heading in the index (`listRootPages` — e.g. the landing and static
 * pages) plus chunkable `listSections`. Cdocs and other content sources
 * implement the same interface and append to the `pageSources` registry.
 */
export interface PlaintextPageSource {
  /** Heading for this source's area in the top-level llms.txt index, e.g. "API Reference". */
  title: string;
  /** Pages listed directly under the source heading (no detail file of their own). */
  listRootPages: () => Promise<PlaintextPage[]>;
  /** Chunkable sections, each rendered to its own detail `llms.txt`. */
  listSections: () => Promise<PlaintextSection[]>;
}

/**
 * One page's entry in the metadata sidecar (`pages-index.json`).
 *
 * This is the cheap half of `pages.json`: everything except the content hash.
 * `file` is the disk-relative path of the emitted `.md`, so the
 * `astro:build:done` integration can read it out of `dist/client` and hash it
 * without rebuilding the body.
 */
export interface PageIndexEntry {
  /** Full absolute URL of the page's plaintext twin, ending in `.md`. */
  key: string;
  /** Disk-relative path under the client output dir, e.g. "api/latest/a.md". */
  file: string;
  metadata: PageMetadata;
}
