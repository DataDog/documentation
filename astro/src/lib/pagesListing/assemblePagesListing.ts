import { PagesListingSchema, type PagesListing, type PageMetadata } from "./schema";

export interface HashedPageEntry {
  key: string;
  metadata: PageMetadata;
  /** md5 of the exact plaintext served at this URL, hex, 32 chars. */
  mdocHash: string;
}

/**
 * Assembles the final `pages.json` record from per-page hashed entries.
 *
 * Sorts keys for stable output, rejects duplicate keys, stamps every entry with
 * `source: "astro"`, and validates against `PagesListingSchema` so a malformed
 * hash or shape fails the build rather than shipping. Alias-free (only `./schema`
 * + zod) so the `astro:build:done` integration can import it under Node.
 */
export function assemblePagesListing(entries: HashedPageEntry[]): PagesListing {
  const listing: PagesListing = {};
  for (const entry of entries) {
    if (entry.key in listing) {
      throw new Error(`assemblePagesListing: duplicate page URL "${entry.key}".`);
    }
    listing[entry.key] = {
      metadata: entry.metadata,
      mdocHash: entry.mdocHash,
      source: "astro",
    };
  }

  const sorted: PagesListing = {};
  for (const key of Object.keys(listing).sort()) {
    sorted[key] = listing[key];
  }

  return PagesListingSchema.parse(sorted);
}
