/**
 * Server-side cdocs filter resolution, backed by the real `cdocs-data` package
 * (the same package Hugo uses via `cdocs-hugo-integration`).
 *
 * Per request, the route builds the page's filters manifest
 * (`buildPageFiltersManifest`), and we:
 *   1. pick each filter's active value with the precedence
 *      URL param > option-group default (skipping an invalid URL value),
 *   2. settle those values (`settleValues`), the same way the filter bar and
 *      the variant lists do, so the content always matches the selected pills,
 *   3. return UI-ready options/labels for each shown filter.
 *
 * The resolved trait values (`valsByTraitId`) become Markdoc variables so the
 * built-in `if` tags drop non-matching content.
 */
import type { FiltersManifest } from "cdocs-data";
import type { ResolvedFilter } from "./types";
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

export interface ResolvePageFiltersInput {
  /** The `content_filters` list from the doc's frontmatter. */
  contentFilters: CdocContentFilter[];
  /** The page's filters manifest, from `buildPageFiltersManifest`. */
  filtersManifest: FiltersManifest;
  /** Values parsed from the URL query string, keyed by trait id. */
  urlVals: Record<string, string>;
}

export interface ResolvePageFiltersResult {
  /** UI-ready filters (only those shown), in frontmatter order. */
  resolvedFilters: ResolvedFilter[];
  /** Active value per trait id — used as Markdoc variables and persisted. */
  valsByTraitId: Record<string, string>;
}

export function resolvePageFilters(
  input: ResolvePageFiltersInput,
): ResolvePageFiltersResult {
  const { contentFilters, filtersManifest, urlVals } = input;

  // Apply precedence URL > default, keeping only valid option ids.
  const selectedValsByTraitId: Record<string, string> = {};
  for (const filter of contentFilters) {
    const traitId = filter.trait_id;
    const validValues = new Set(
      filtersManifest.filtersByTraitId[traitId]?.possibleVals ?? [],
    );
    const urlVal = urlVals[traitId];
    const chosen =
      urlVal && validValues.has(urlVal)
        ? urlVal
        : filtersManifest.defaultValsByTraitId[traitId];
    if (chosen != null) selectedValsByTraitId[traitId] = chosen;
  }

  const combination = settleValues(
    filtersManifest,
    contentFilters,
    selectedValsByTraitId,
  );

  const resolvedFilters: ResolvedFilter[] = [];
  for (const filter of contentFilters) {
    const entry = combination.resolvedFilters[filter.trait_id];
    if (!entry.isShown) continue;
    resolvedFilters.push({
      traitId: entry.id,
      label: entry.label,
      options: entry.options,
      defaultValue: entry.defaultValue,
      currentValue: entry.currentValue,
    });
  }

  return { resolvedFilters, valsByTraitId: shownValues(combination) };
}
