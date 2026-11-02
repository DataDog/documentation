import type {
  PageIndexEntry,
  PlaintextPage,
  PlaintextPageSource,
} from "./types";
import { absoluteUrl } from "@lib/site/siteUrl";

/**
 * Flattens every page from every source — root pages plus every section's pages
 * — into one list. `pages.json` lists all pages flat; sectioning matters only to
 * llms.txt. Does not dedupe; `buildPageIndex` detects and rejects duplicate URLs.
 */
export async function collectPages(
  sources: PlaintextPageSource[],
): Promise<PlaintextPage[]> {
  const pages: PlaintextPage[] = [];
  for (const source of sources) {
    pages.push(...(await source.listRootPages()));
    for (const section of await source.listSections()) {
      pages.push(...section.pages);
    }
  }
  return pages;
}

/**
 * Builds the metadata index for `pages.json` from the page sources.
 *
 * Builds no page bodies: each body is materialized exactly once, by its own `.md`
 * route during the static build, and hashed from disk after the fact (see
 * `buildListingFromIndex` and the `pagesJson` integration). At tens of thousands
 * of pages this keeps memory flat and avoids building every page twice. Entries
 * are sorted by key for stable, diff-friendly output; duplicate keys and a
 * missing `site` throw so bugs fail the build.
 */
export async function buildPageIndex(
  sources: PlaintextPageSource[],
  site: string | URL,
): Promise<PageIndexEntry[]> {
  if (!site) {
    throw new Error(
      "buildPageIndex: site is required to emit canonical page keys.",
    );
  }

  const entriesByKey = new Map<string, PageIndexEntry>();
  for (const page of await collectPages(sources)) {
    const key = absoluteUrl(page.urlPath, site);
    if (entriesByKey.has(key)) {
      throw new Error(`buildPageIndex: duplicate page URL "${key}".`);
    }
    entriesByKey.set(key, {
      key,
      // Disk paths carry no site base path: Astro emits at the output root.
      file: page.urlPath.replace(/^\//, ""),
      metadata: page.metadata,
    });
  }

  return [...entriesByKey.values()].sort((a, b) => a.key.localeCompare(b.key));
}
