import type { PlaintextPage, PlaintextPageSource } from "./types";

/**
 * Flattens every page from every source — root pages plus every section's
 * pages — into one list. Used by `pages.json`, which lists all pages flat and
 * ignores sectioning. Does not dedupe; `buildPagesListing` detects and rejects
 * duplicate URLs.
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
