/**
 * The Cdocs page lists: every Cdocs page in the content collection, with its
 * bare URL and every valid variant URL, and the traits list built from them.
 *
 * Each combination of filter values on a Cdocs page has its own content, so
 * the sitemap, llms.txt, pages.json, and the traits list all need to agree on
 * which variant URLs exist. They all read them from here, and list each
 * variant by its canonical URL.
 */
import { getCollection } from "astro:content";
import { buildFiltersManifest } from "cdocs-data/buildFiltersManifest";
import type { CustomizationConfig } from "cdocs-data";
import configByLang from "virtual:cdocs-config";
import type { CdocContentFilter } from "./filters";
import { buildCanonicalPath } from "./canonicalUrl";
import {
  CDOCS_TRAITS_INTERMEDIATE_FILE,
  cdocsTraitsListPath,
} from "./traitsListFile";
import {
  buildVariant,
  compareCodeUnits,
  compareVariants,
  findAllValueCombinations,
  type CdocsVariant,
} from "./variants";

const DEFAULT_LANG = "en";

export interface CdocsPage {
  /** The content collection entry ID, such as "tracing/custom_instrumentation". */
  id: string;
  title: string;
  /** The frontmatter description, if the page has one. */
  description?: string;
  /** The page path with no params, such as "/tracing/custom_instrumentation/". */
  bareUrl: string;
  /** Every trait the page accepts as a param, alphabetical. Includes conditional filters. */
  traitIds: string[];
  variants: CdocsPageVariant[];
}

export interface CdocsPageVariant extends CdocsVariant {
  /**
   * The variant's canonical URL: the bare URL for the default variant, and
   * `url` for any other. The listings use it, so they match the canonical tag.
   */
  canonicalUrl: string;
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

/** Every Cdocs entry in the English content collection, except hidden test pages. */
export function getCdocsEntries() {
  return getCollection(
    "en",
    (entry) =>
      entry.data.content_filters !== undefined && !isHiddenTestPage(entry.id),
  );
}

/** Every Cdocs page in the English content collection, sorted by ID. */
export async function getCdocsPages(): Promise<CdocsPage[]> {
  const entries = await getCdocsEntries();

  return entries
    .map((entry) =>
      buildCdocsPage({
        id: entry.id,
        title: entry.data.title,
        description: entry.data.description,
        contentFilters: entry.data.content_filters!,
        customizationConfig: configByLang[DEFAULT_LANG],
      }),
    )
    .sort((pageA, pageB) => compareCodeUnits(pageA.id, pageB.id));
}

export function buildCdocsPage(p: {
  id: string;
  title: string;
  description?: string;
  contentFilters: CdocContentFilter[];
  customizationConfig: CustomizationConfig;
}): CdocsPage {
  const bareUrl = `/${p.id}/`;
  const filtersManifest = buildFiltersManifest({
    frontmatter: { title: p.title, content_filters: p.contentFilters },
    customizationConfig: p.customizationConfig,
  });

  const variants = findAllValueCombinations(filtersManifest, p.contentFilters)
    .map((combination) => buildVariant(bareUrl, p.description, combination))
    .sort(compareVariants);

  return {
    id: p.id,
    title: p.title,
    ...(p.description !== undefined && { description: p.description }),
    bareUrl,
    traitIds: p.contentFilters.map((filter) => filter.trait_id).sort(),
    variants: variants.map(({ variant }) => ({
      ...variant,
      canonicalUrl: buildCanonicalPath({
        bareUrl,
        contentFilters: p.contentFilters,
        filtersManifest,
        valsByTraitId: variant.valsByTraitId,
      }),
    })),
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
 * Built output serves the content-hashed file the `cdocsTraitsList` integration
 * writes. `astro dev` has no build step, so it serves the intermediate file's
 * route instead.
 */
export async function getCdocsTraitsListUrl(
  p: { isDev: boolean } = { isDev: import.meta.env.DEV },
): Promise<string> {
  if (p.isDev) return `/${CDOCS_TRAITS_INTERMEDIATE_FILE}`;
  return `/${cdocsTraitsListPath(await getCdocsTraitsListJson())}`;
}

// Private functions ------------------------------------------------

/**
 * `dd_e2e/` test pages 404 in the live build, so they aren't listed there.
 * Matches the guard in `src/pages/[...slug].astro`.
 */
function isHiddenTestPage(id: string): boolean {
  return id.startsWith("dd_e2e/") && __CI_ENV__ === "live";
}
