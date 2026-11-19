/**
 * Server-side cdocs filter resolution, backed by the real `cdocs-data` package
 * (the same package Hugo uses via `cdocs-hugo-integration`). Shared by the
 * catch-all cdoc route and its plaintext twin.
 *
 * Per request, the route builds the page's filters manifest
 * (`buildPageFiltersManifest`), and we:
 *   1. pick each filter's active value with the precedence
 *      URL param > option-group default (skipping an invalid URL value),
 *   2. settle those values (`settleValues`), the same way the filter bar and
 *      the variant lists do, so the content always matches the selected pills.
 *
 * Nothing else about the request is read, so the same URL always renders the
 * same content. The reader's stored preferences are applied in the browser
 * instead, by adding them to the URL.
 *
 * The resolved trait values become Markdoc variables so the built-in `if` tags
 * drop non-matching content.
 */
import type { FiltersManifest } from "cdocs-data";
import { settleValues, shownValues } from "./variants";

/**
 * A `content_filters` entry as it appears in a doc's frontmatter (cdocs-data's
 * *raw* filter config: `label` is optional and filled from the trait glossary).
 */
export interface CdocContentFilter {
  trait_id: string;
  option_group_id: string;
  label?: string;
  default_value?: string;
  show_if?: Array<Record<string, string[]>>;
  hide_if?: Array<Record<string, string[]>>;
}

export interface ResolvePageFilterValuesInput {
  /** The `content_filters` list from the doc's frontmatter. */
  contentFilters: CdocContentFilter[];
  /** The page's filters manifest, from `buildPageFiltersManifest`. */
  filtersManifest: FiltersManifest;
  /** The request URL's query string. */
  searchParams: URLSearchParams;
}

/** The active value of every shown filter, keyed by trait id. */
export function resolvePageFilterValues(
  input: ResolvePageFilterValuesInput,
): Record<string, string> {
  const { contentFilters, filtersManifest, searchParams } = input;

  // Apply precedence URL > default, keeping only valid option ids.
  const selectedValsByTraitId: Record<string, string> = {};
  for (const filter of contentFilters) {
    const traitId = filter.trait_id;
    const validValues = new Set(
      filtersManifest.filtersByTraitId[traitId]?.possibleVals ?? [],
    );
    const urlVal = searchParams.get(traitId);
    const chosen =
      urlVal && validValues.has(urlVal)
        ? urlVal
        : filtersManifest.defaultValsByTraitId[traitId];
    if (chosen != null) selectedValsByTraitId[traitId] = chosen;
  }

  return shownValues(
    settleValues(filtersManifest, contentFilters, selectedValsByTraitId),
  );
}
