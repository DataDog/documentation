import type { PlaintextPage, PlaintextPageSource } from "./types";

/**
 * Flattens every page from every source into one list. Used by consumers that
 * need the pages themselves (llms.txt) rather than the hashed listing
 * (`buildPagesListing`). Does not dedupe — `buildPagesListing` is where
 * duplicate URLs are detected and rejected.
 */
export async function collectPages(
  sources: PlaintextPageSource[],
): Promise<PlaintextPage[]> {
  const pages: PlaintextPage[] = [];
  for (const source of sources) {
    pages.push(...(await source.listPages()));
  }
  return pages;
}
