/**
 * The canonical URL of a Cdocs variant. The default variant's is the bare
 * URL, so crawlers index one address for it, whether or not a URL spells out
 * its values. Every other variant's has its values as params, alphabetical by
 * trait, the same as its variant URL.
 *
 * A URL with default values stays as it is. Only the canonical tag points to
 * the bare URL.
 */
import type { FiltersManifest } from "cdocs-data";
import type { CdocContentFilter } from "./filters";
import { buildVariantUrl, settleValues, shownValues } from "./variants";

export interface BuildCanonicalPathInput {
  /** The page path with no params. */
  bareUrl: string;
  contentFilters: CdocContentFilter[];
  filtersManifest: FiltersManifest;
  /** The page's resolved values, from `resolvePageFilterValues`. */
  valsByTraitId: Record<string, string>;
}

/** The canonical path and query, without the origin. */
export function buildCanonicalPath(input: BuildCanonicalPathInput): string {
  const { bareUrl, contentFilters, filtersManifest, valsByTraitId } = input;
  const defaultValsByTraitId = shownValues(
    settleValues(filtersManifest, contentFilters, {}),
  );
  if (haveSameValues(valsByTraitId, defaultValsByTraitId)) return bareUrl;
  return buildVariantUrl(bareUrl, valsByTraitId);
}

// Private functions ------------------------------------------------

function haveSameValues(
  valsA: Record<string, string>,
  valsB: Record<string, string>,
): boolean {
  const traitIdsA = Object.keys(valsA);
  return (
    traitIdsA.length === Object.keys(valsB).length &&
    traitIdsA.every((traitId) => valsA[traitId] === valsB[traitId])
  );
}
