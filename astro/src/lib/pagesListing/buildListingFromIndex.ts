import { createHash } from "node:crypto";
import type { PagesListing } from "./schema";
import type { PageIndexEntry } from "./pageIndex";
import { assemblePagesListing } from "./assemblePagesListing";

/** Reads the emitted plaintext for a disk-relative file path. */
export type FileReader = (file: string) => Promise<string>;

function md5Hex(input: string): string {
  return createHash("md5").update(input, "utf8").digest("hex");
}

/**
 * Turns the metadata sidecar into the final `pages.json` listing by hashing each
 * page's already-emitted plaintext. `readFile` is injected so the disk read is
 * the only side effect and the core is unit-testable without a filesystem. Files
 * are read and hashed one at a time, so peak memory is a single body regardless
 * of page count. Alias-free for use from the `astro:build:done` integration.
 */
export async function buildListingFromIndex(
  index: PageIndexEntry[],
  readFile: FileReader,
): Promise<PagesListing> {
  const hashed = [];
  for (const entry of index) {
    const body = await readFile(entry.file);
    hashed.push({
      key: entry.key,
      metadata: entry.metadata,
      mdocHash: md5Hex(body),
    });
  }
  return assemblePagesListing(hashed);
}
