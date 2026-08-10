import type { PlaintextPageSource } from "./types";
import type { PageMetadata } from "./schema";
import { collectPages } from "./collectPages";

/**
 * One page's entry in the metadata sidecar (`pages-index.json`).
 *
 * This is the cheap half of `pages.json`: everything except the content hash.
 * `file` is the disk-relative path of the emitted `.md` (the `urlPath` without
 * its leading slash), so the `astro:build:done` integration can read it out of
 * `dist/client` and hash it without rebuilding the body.
 */
export interface PageIndexEntry {
  /** Full absolute URL of the page's plaintext twin, ending in `.md`. */
  key: string;
  /** Disk-relative path under the client output dir, e.g. "api/latest/a.md". */
  file: string;
  metadata: PageMetadata;
}

/**
 * Builds the metadata index for `pages.json` from the page sources.
 *
 * Deliberately does NOT build page bodies — the body is materialized exactly
 * once, by each `.md` route during the static build, and hashed from disk after
 * the fact (see `buildListingFromIndex` / the `pagesJson` integration). At tens
 * of thousands of pages this keeps memory flat and avoids building every page
 * twice. Entries are sorted by key for stable, diff-friendly output; throws on
 * duplicate keys and on an empty `siteOrigin` so bugs fail the build.
 */
export async function buildPageIndex(
  sources: PlaintextPageSource[],
  siteOrigin: string,
): Promise<PageIndexEntry[]> {
  if (!siteOrigin) {
    throw new Error(
      "buildPageIndex: siteOrigin is required to emit canonical page keys.",
    );
  }

  const entriesByKey = new Map<string, PageIndexEntry>();
  for (const page of await collectPages(sources)) {
    const key = `${siteOrigin}${page.urlPath}`;
    if (entriesByKey.has(key)) {
      throw new Error(`buildPageIndex: duplicate page URL "${key}".`);
    }
    entriesByKey.set(key, {
      key,
      file: page.urlPath.replace(/^\//, ""),
      metadata: page.metadata,
    });
  }

  return [...entriesByKey.values()].sort((a, b) => a.key.localeCompare(b.key));
}
