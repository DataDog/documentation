import { createHash } from "node:crypto";
import {
  PagesListingSchema,
  type PageIndexEntry,
  type PagesListing,
} from "./types";

/** Reads the emitted plaintext for a disk-relative file path. */
export type FileReader = (file: string) => Promise<string>;

function md5Hex(input: string): string {
  return createHash("md5").update(input, "utf8").digest("hex");
}

/**
 * Turns the metadata sidecar into the final `pages.json` listing by hashing each
 * page's already-emitted plaintext.
 *
 * `readFile` is injected so the disk read is the only side effect and the core is
 * unit-testable without a filesystem. Files are read and hashed one at a time, so
 * peak memory is a single body regardless of page count. The result is validated
 * against `PagesListingSchema`, so a malformed hash or shape fails the build
 * rather than shipping. Key order is the sidecar's, which `buildPageIndex` has
 * already deduped and sorted. Alias-free for use from the `astro:build:done`
 * integration.
 */
export async function buildListingFromIndex(
  index: PageIndexEntry[],
  readFile: FileReader,
): Promise<PagesListing> {
  const listing: PagesListing = {};
  for (const entry of index) {
    listing[entry.key] = {
      metadata: entry.metadata,
      mdocHash: md5Hex(await readFile(entry.file)),
      source: "astro",
    };
  }
  return PagesListingSchema.parse(listing);
}
