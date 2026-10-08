/**
 * Pure comparisons between Astro's `shared/site_support.yaml` and the Hugo
 * config it was copied from. Each `find*` function returns one human-readable
 * line per drift it finds, or `[]` when the two agree.
 *
 * `checkSiteSupportDrift.ts` reads the real files and feeds them in here.
 * Keeping file access out of this module lets the unit tests pass small
 * literal inputs.
 */
import { toCategorySlug } from "../../src/lib/api/categorySlug.ts";

export interface SharedSiteSupportEntry {
  regions: string[];
  url_paths?: string[];
}

export type SharedSiteSupportIds = Record<string, SharedSiteSupportEntry>;

/** Hugo's `unsupported_sites` param: key → unsupported region keys. */
export type HugoUnsupportedSites = Record<string, string[]>;

export interface BannerPair {
  hugo?: string;
  shared?: string;
}

export function findKeySetDrift(
  sharedIds: SharedSiteSupportIds,
  hugoUnsupportedSites: HugoUnsupportedSites,
): string[] {
  const missingFromShared = Object.keys(hugoUnsupportedSites)
    .filter((id) => !(id in sharedIds))
    .map(
      (id) =>
        `${id}: in Hugo's unsupported_sites but not in shared/site_support.yaml`,
    );
  const missingFromHugo = Object.keys(sharedIds)
    .filter((id) => !(id in hugoUnsupportedSites))
    .map(
      (id) =>
        `${id}: in shared/site_support.yaml but not in Hugo's unsupported_sites`,
    );
  return [...missingFromShared, ...missingFromHugo];
}

export function findRegionDrift(
  sharedIds: SharedSiteSupportIds,
  hugoUnsupportedSites: HugoUnsupportedSites,
): string[] {
  const mismatches: string[] = [];
  for (const [id, entry] of Object.entries(sharedIds)) {
    const hugoRegions = hugoUnsupportedSites[id];
    if (!hugoRegions) {
      continue; // findKeySetDrift reports this
    }
    const sharedSorted = JSON.stringify([...entry.regions].sort());
    const hugoSorted = JSON.stringify([...hugoRegions].sort());
    if (sharedSorted !== hugoSorted) {
      mismatches.push(
        `${id}: shared has ${sharedSorted}, Hugo has ${hugoSorted}`,
      );
    }
  }
  return mismatches;
}

/**
 * Compares the banner string byte for byte, upstream quirks included (`fr`
 * has a stray space before `</a>`, and `ja` is still English). Copying them
 * verbatim means an upstream fix shows up here instead of drifting silently.
 */
export function findBannerDrift(
  bannersByLocale: Record<string, BannerPair>,
): string[] {
  return Object.entries(bannersByLocale)
    .filter(([, banner]) => banner.hugo !== banner.shared)
    .map(
      ([lang, banner]) =>
        `${lang}: shared has ${JSON.stringify(banner.shared)}, ` +
        `Hugo has ${JSON.stringify(banner.hugo)}`,
    );
}

/**
 * Hugo matches any path segment against a key name, so a key named like an
 * API category banners that category's pages with no `url_paths` at all.
 * Astro matches `url_paths` only, so such a key must carry them or Astro
 * drops the banner Hugo shows.
 */
export function findUnpathedSlugCollisions(
  sharedIds: SharedSiteSupportIds,
  apiCategorySlugs: Set<string>,
): string[] {
  return Object.entries(sharedIds)
    .filter(
      ([id, entry]) =>
        apiCategorySlugs.has(id) && (entry.url_paths?.length ?? 0) === 0,
    )
    .map(
      ([id]) =>
        `${id}: matches the API category slug but has no url_paths, ` +
        `so Hugo shows a banner on /api/latest/${id} and Astro does not`,
    );
}

const HTTP_METHODS = [
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
] as const;

interface MinimalOperation {
  operationId?: string;
  tags?: string[];
}

export interface MinimalOpenApiSpec {
  tags?: { name: string }[];
  paths?: Record<string, Partial<Record<string, unknown>>>;
}

/**
 * The slugs of every API category page, built with the same rules as
 * `getCategoriesView` in `src/lib/api/viewsBuilder.ts`: every `tags[]` entry,
 * plus the first tag of each operation that has an `operationId`.
 */
export function collectApiCategorySlugs(
  specs: MinimalOpenApiSpec[],
): Set<string> {
  const slugs = new Set<string>();
  for (const spec of specs) {
    for (const tag of spec.tags ?? []) {
      slugs.add(toCategorySlug(tag.name));
    }
    for (const pathItem of Object.values(spec.paths ?? {})) {
      for (const method of HTTP_METHODS) {
        const operation = pathItem?.[method] as MinimalOperation | undefined;
        const primaryTag = operation?.tags?.[0];
        if (primaryTag && operation?.operationId) {
          slugs.add(toCategorySlug(primaryTag));
        }
      }
    }
  }
  return slugs;
}
