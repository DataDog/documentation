/**
 * The shared Cdocs page query: every Cdocs page in the content collection,
 * with its bare URL and every valid variant URL.
 *
 * Each combination of filter values on a Cdocs page has its own content, so
 * the sitemap, llms.txt, pages.json, and the traits list all need to agree on
 * which variant URLs exist. They all read them from here.
 */
import { getCollection } from "astro:content";
import { buildFiltersManifest } from "cdocs-data/buildFiltersManifest";
import { resolveFilters } from "cdocs-data/resolveFilters";
import type {
  CustomizationConfig,
  FiltersManifest,
  ResolvedFilters,
} from "cdocs-data";
import configByLang from "virtual:cdocs-config";
import type { CdocContentFilter } from "./filters";
import { CDOCS_TRAITS_SIDECAR, cdocsTraitsListPath } from "./traitsListFile";

const DEFAULT_LANG = "en";

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
}

export interface CdocsPage {
  /** The content collection entry ID, such as "tracing/custom_instrumentation". */
  id: string;
  title: string;
  /** The page path with no params, such as "/tracing/custom_instrumentation/". */
  bareUrl: string;
  /** Every trait the page accepts as a param, alphabetical. Includes conditional filters. */
  traitIds: string[];
  variants: CdocsVariant[];
}

/**
 * The traits list the link-hover script reads to find which URLs are Cdocs
 * pages and which params each one accepts. Pages refer to traits by index, to
 * keep the file small.
 */
export interface CdocsTraitsList {
  /** Every trait any Cdocs page accepts, alphabetical. */
  traits: string[];
  /** Indices into `traits`, keyed by page path without slashes, such as "tracing/custom_instrumentation". */
  pages: Record<string, number[]>;
}

/** Every Cdocs page in the English content collection, sorted by ID. */
export async function getCdocsPages(): Promise<CdocsPage[]> {
  const entries = await getCollection(
    "en",
    (entry) =>
      entry.data.content_filters !== undefined && !isHiddenTestPage(entry.id),
  );

  return entries
    .map((entry) =>
      buildCdocsPage({
        id: entry.id,
        title: entry.data.title,
        contentFilters: entry.data.content_filters!,
        customizationConfig: configByLang[DEFAULT_LANG],
      }),
    )
    .sort((pageA, pageB) => compareCodeUnits(pageA.id, pageB.id));
}

export function buildCdocsPage(p: {
  id: string;
  title: string;
  contentFilters: CdocContentFilter[];
  customizationConfig: CustomizationConfig;
}): CdocsPage {
  const bareUrl = `/${p.id}/`;
  const filtersManifest = buildFiltersManifest({
    frontmatter: { title: p.title, content_filters: p.contentFilters },
    customizationConfig: p.customizationConfig,
  });

  const variants = findAllValueCombinations(filtersManifest, p.contentFilters)
    .map((combination) => buildVariant(bareUrl, combination))
    .sort(compareVariants);

  return {
    id: p.id,
    title: p.title,
    bareUrl,
    traitIds: p.contentFilters.map((filter) => filter.trait_id).sort(),
    variants: variants.map(({ variant }) => variant),
  };
}

export function buildCdocsTraitsList(pages: CdocsPage[]): CdocsTraitsList {
  const traits = [...new Set(pages.flatMap((page) => page.traitIds))].sort();
  const traitIndexById = new Map(
    traits.map((traitId, index) => [traitId, index]),
  );

  const pagesById: Record<string, number[]> = {};
  for (const page of [...pages].sort((pageA, pageB) =>
    compareCodeUnits(pageA.id, pageB.id),
  )) {
    pagesById[page.id] = page.traitIds.map((traitId) =>
      traitIndexById.get(traitId)!,
    );
  }

  return { traits, pages: pagesById };
}

let traitsListJsonPromise: Promise<string> | null = null;

/**
 * The traits list, serialized. Computed once per server process, since the
 * content collection doesn't change while the server runs.
 */
export function getCdocsTraitsListJson(): Promise<string> {
  traitsListJsonPromise ??= getCdocsPages().then((pages) =>
    JSON.stringify(buildCdocsTraitsList(pages)),
  );
  return traitsListJsonPromise;
}

/**
 * The root-relative URL of the traits list, the same on every page. Apply
 * `prefixed()` before rendering it as an href.
 *
 * Built output serves the content-hashed file the `cdocsTraitsList`
 * integration writes. `astro dev` has no build step, so it serves the sidecar
 * route instead.
 */
export async function getCdocsTraitsListUrl(
  p: { isDev: boolean } = { isDev: import.meta.env.DEV },
): Promise<string> {
  if (p.isDev) return `/${CDOCS_TRAITS_SIDECAR}`;
  return `/${cdocsTraitsListPath(await getCdocsTraitsListJson())}`;
}

// Private functions ------------------------------------------------

/**
 * The same order as `Array.prototype.sort()` with no comparator, so trait
 * lists and URL params sort the same way. Unlike `localeCompare`, it doesn't
 * vary by locale.
 */
function compareCodeUnits(stringA: string, stringB: string): number {
  if (stringA === stringB) return 0;
  return stringA < stringB ? -1 : 1;
}

/**
 * `dd_e2e/` test pages 404 in the live build, so they aren't listed there.
 * Matches the guard in `src/pages/[...slug].astro`.
 */
function isHiddenTestPage(id: string): boolean {
  return id.startsWith("dd_e2e/") && __CI_ENV__ === "live";
}

/** A settled set of resolved filters, for one combination of values. */
interface ValueCombination {
  resolvedFilters: ResolvedFilters;
  contentFilters: CdocContentFilter[];
}

/**
 * Explore every combination of values a reader can reach by changing one
 * filter at a time, starting from the defaults.
 *
 * A filter's options can depend on earlier filters (`<HOST>_database_options`),
 * and whether it's shown can depend on any filter (`show_if`). Walking
 * outward from the defaults handles both, whatever order the filters are in.
 */
function findAllValueCombinations(
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
function settleValues(
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
function shownValues(combination: ValueCombination): Record<string, string> {
  const valsByTraitId: Record<string, string> = {};
  for (const filter of combination.contentFilters) {
    const resolvedFilter = combination.resolvedFilters[filter.trait_id];
    if (resolvedFilter.isShown) {
      valsByTraitId[filter.trait_id] = resolvedFilter.currentValue;
    }
  }
  return valsByTraitId;
}

/** A variant, with the position of each of its options for sorting. */
interface SortableVariant {
  variant: CdocsVariant;
  /** Per filter, in frontmatter order: the option's index in its group, or -1 if hidden. */
  optionIndices: number[];
}

function buildVariant(
  bareUrl: string,
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
    },
    optionIndices,
  };
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

/** Order variants as the filter bar lists their options, first filter first. */
function compareVariants(
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
