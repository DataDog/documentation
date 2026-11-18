/**
 * Cdocs variants: the combinations of filter values a page can show.
 *
 * A filter's options can depend on another filter's value, and whether it's
 * shown can too, so a set of values has to be settled before it names a real
 * variant. Everything that builds variant URLs goes through here, so the page
 * lists, the filter bar, and its plaintext twin all agree on them.
 */
import { resolveFilters } from "cdocs-data/resolveFilters";
import type { FiltersManifest, ResolvedFilters } from "cdocs-data";
import type { CdocContentFilter } from "./filters";

/** Introduces a variant's filter values in its description. */
const VARIANT_FILTERS_INTRO = "For customers using the following:";

/** One filter value on a variant, with labels for display. */
export interface CdocsVariantLabel {
  traitId: string;
  /** The filter's label, such as "Language". */
  traitLabel: string;
  optionId: string;
  /** The option's label, such as "Python". */
  optionLabel: string;
}

/** One valid combination of filter values on a Cdocs page. */
export interface CdocsVariant {
  /** The page path with every shown filter's value as a param, alphabetical by trait. */
  url: string;
  /** The value of every shown filter, in frontmatter order. */
  valsByTraitId: Record<string, string>;
  /** Labels for each value in `valsByTraitId`, in frontmatter order. */
  labels: CdocsVariantLabel[];
  /**
   * The page description followed by the variant's filter values, such as
   * "Set up the agent. For customers using the following: Host: Azure,
   * Database: Cosmos DB."
   */
  description: string;
}

/** A settled set of resolved filters, for one combination of values. */
export interface ValueCombination {
  resolvedFilters: ResolvedFilters;
  contentFilters: CdocContentFilter[];
}

/** A variant, with the position of each of its options for sorting. */
export interface SortableVariant {
  variant: CdocsVariant;
  /** Per filter, in frontmatter order: the option's index in its group, or -1 if hidden. */
  optionIndices: number[];
}

/**
 * Explore every combination of values a reader can reach by changing one
 * filter at a time, starting from the defaults.
 *
 * A filter's options can depend on earlier filters (`<HOST>_database_options`),
 * and whether it's shown can depend on any filter (`show_if`). Walking
 * outward from the defaults handles both, whatever order the filters are in.
 */
export function findAllValueCombinations(
  filtersManifest: FiltersManifest,
  contentFilters: CdocContentFilter[],
): ValueCombination[] {
  const combinationsByKey = new Map<string, ValueCombination>();
  const queue = [settleValues(filtersManifest, contentFilters, {})];

  while (queue.length > 0) {
    const combination = queue.pop()!;
    const key = JSON.stringify(shownValues(combination));
    if (combinationsByKey.has(key)) continue;
    combinationsByKey.set(key, combination);

    for (const filter of contentFilters) {
      const resolvedFilter = combination.resolvedFilters[filter.trait_id];
      if (!resolvedFilter.isShown) continue;
      for (const option of resolvedFilter.options) {
        queue.push(
          settleValues(filtersManifest, contentFilters, {
            ...shownValues(combination),
            [filter.trait_id]: option.id,
          }),
        );
      }
    }
  }

  return [...combinationsByKey.values()];
}

/**
 * Resolve the filters until the values stop changing. Any value that's
 * missing or no longer valid falls back to its default, and a change can
 * show, hide, or reset another filter, so one pass isn't always enough.
 */
export function settleValues(
  filtersManifest: FiltersManifest,
  contentFilters: CdocContentFilter[],
  requestedValsByTraitId: Record<string, string>,
): ValueCombination {
  let valsByTraitId = requestedValsByTraitId;

  // Each pass can only settle more filters, so the filter count bounds it.
  for (let pass = 0; pass <= contentFilters.length; pass++) {
    const resolvedFilters = resolveFilters({
      valsByTraitId: {
        ...filtersManifest.defaultValsByTraitId,
        ...valsByTraitId,
      },
      filtersManifest,
    });
    const combination = { resolvedFilters, contentFilters };
    const settledValsByTraitId = shownValues(combination);
    if (
      JSON.stringify(settledValsByTraitId) === JSON.stringify(valsByTraitId)
    ) {
      return combination;
    }
    valsByTraitId = settledValsByTraitId;
  }

  throw new Error(
    `Cdocs filters didn't settle for values ${JSON.stringify(requestedValsByTraitId)}.`,
  );
}

/** The value of every shown filter, in frontmatter order. */
export function shownValues(
  combination: ValueCombination,
): Record<string, string> {
  const valsByTraitId: Record<string, string> = {};
  for (const filter of combination.contentFilters) {
    const resolvedFilter = combination.resolvedFilters[filter.trait_id];
    if (resolvedFilter.isShown) {
      valsByTraitId[filter.trait_id] = resolvedFilter.currentValue;
    }
  }
  return valsByTraitId;
}

export function buildVariant(
  bareUrl: string,
  pageDescription: string | undefined,
  combination: ValueCombination,
): SortableVariant {
  const valsByTraitId = shownValues(combination);
  const labels: CdocsVariantLabel[] = [];
  const optionIndices: number[] = [];

  for (const filter of combination.contentFilters) {
    const resolvedFilter = combination.resolvedFilters[filter.trait_id];
    if (!resolvedFilter.isShown) {
      optionIndices.push(-1);
      continue;
    }
    const optionIndex = resolvedFilter.options.findIndex(
      (option) => option.id === resolvedFilter.currentValue,
    );
    optionIndices.push(optionIndex);
    labels.push({
      traitId: filter.trait_id,
      traitLabel: resolvedFilter.label,
      optionId: resolvedFilter.currentValue,
      optionLabel: resolvedFilter.options[optionIndex].label,
    });
  }

  return {
    variant: {
      url: buildVariantUrl(bareUrl, valsByTraitId),
      valsByTraitId,
      labels,
      description: describeVariant(pageDescription, labels),
    },
    optionIndices,
  };
}

/** Order variants as the filter bar lists their options, first filter first. */
export function compareVariants(
  variantA: SortableVariant,
  variantB: SortableVariant,
): number {
  for (let index = 0; index < variantA.optionIndices.length; index++) {
    const difference =
      variantA.optionIndices[index] - variantB.optionIndices[index];
    if (difference !== 0) return difference;
  }
  return 0;
}

/**
 * The same order as `Array.prototype.sort()` with no comparator, so trait
 * lists and URL params sort the same way. Unlike `localeCompare`, it doesn't
 * vary by locale.
 */
export function compareCodeUnits(stringA: string, stringB: string): number {
  if (stringA === stringB) return 0;
  return stringA < stringB ? -1 : 1;
}

// Private functions ------------------------------------------------

/**
 * The page description, then each filter value as "Trait: Option". A
 * description without ending punctuation gets a period, so the two read as
 * separate sentences.
 */
function describeVariant(
  pageDescription: string | undefined,
  labels: CdocsVariantLabel[],
): string {
  const sentences: string[] = [];
  const trimmedDescription = pageDescription?.trim();
  if (trimmedDescription) {
    sentences.push(
      /[.!?]$/.test(trimmedDescription)
        ? trimmedDescription
        : `${trimmedDescription}.`,
    );
  }
  if (labels.length > 0) {
    const filterValues = labels
      .map((label) => `${label.traitLabel}: ${label.optionLabel}`)
      .join(", ");
    sentences.push(`${VARIANT_FILTERS_INTRO} ${filterValues}.`);
  }
  return sentences.join(" ");
}

/** The bare URL with each value as a param, alphabetical by trait. */
function buildVariantUrl(
  bareUrl: string,
  valsByTraitId: Record<string, string>,
): string {
  const params = new URLSearchParams(
    Object.entries(valsByTraitId).sort(([traitIdA], [traitIdB]) =>
      compareCodeUnits(traitIdA, traitIdB),
    ),
  );
  const query = params.toString();
  return query ? `${bareUrl}?${query}` : bareUrl;
}
