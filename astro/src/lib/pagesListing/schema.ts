import { z } from "zod";

/**
 * Astro-local schema for the `pages.json` artifact.
 *
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
    isPrivate: z.boolean().optional(),
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
export type PagesListingEntry = z.infer<typeof PagesListingEntrySchema>;
export type PagesListing = z.infer<typeof PagesListingSchema>;
