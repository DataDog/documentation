/**
 * Pure comparisons between Astro's `shared/site_support.yaml` and the Hugo
 * config it was copied from. Each `find*` function returns one human-readable
 * line per drift it finds, or `[]` when the two agree.
 *
 * `checkSiteSupportDrift.ts` reads the real files and feeds them in here.
 * Keeping file access out of this module lets the unit tests pass small
 * literal inputs.
 */
import { parse as parseYaml } from "yaml";
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

/** A Hugo frontmatter cascade target that assigns a `site_support_id`. */
export interface CascadeSiteSupport {
  path: string;
  siteSupportId: string;
}

interface CascadeEntry {
  _target?: { path?: string };
  site_support_id?: string;
}

const FRONTMATTER = /^---\n([\s\S]*?)\n---(?:\n|$)/;

/**
 * Reads the `cascade` in a Hugo page's YAML frontmatter and returns each
 * target that sets a `site_support_id`. Hugo accepts `cascade` as either a
 * list of entries or a single entry, so both are handled.
 */
export function collectCascadeSiteSupport(
  markdownSource: string,
): CascadeSiteSupport[] {
  const frontmatterYaml = FRONTMATTER.exec(markdownSource)?.[1];
  if (!frontmatterYaml) return [];

  const cascade = (parseYaml(frontmatterYaml) as { cascade?: unknown })
    ?.cascade;
  const entries = (
    Array.isArray(cascade) ? cascade : cascade ? [cascade] : []
  ) as CascadeEntry[];

  return entries.flatMap((entry) => {
    const path = entry._target?.path;
    const siteSupportId = entry.site_support_id;
    return path && siteSupportId ? [{ path, siteSupportId }] : [];
  });
}

/**
 * Hugo can also attach a key to API pages through the frontmatter cascade in
 * `content/en/api/_index.md`. Astro has no cascade, so each cascade path must
 * appear in that key's `url_paths` or Astro drops the banner Hugo shows.
 */
export function findCascadeDrift(
  sharedIds: SharedSiteSupportIds,
  cascadeSiteSupports: CascadeSiteSupport[],
): string[] {
  return cascadeSiteSupports.flatMap(({ path, siteSupportId }) => {
    const entry = sharedIds[siteSupportId];
    if (!entry) {
      return [
        `${siteSupportId}: Hugo's API cascade uses this key for ${path}, ` +
          `but it isn't in shared/site_support.yaml`,
      ];
    }
    if (!(entry.url_paths ?? []).includes(path)) {
      return [
        `${siteSupportId}: Hugo's API cascade covers ${path}, ` +
          `but the key's url_paths in shared/site_support.yaml don't include it`,
      ];
    }
    return [];
  });
}

export interface CheckResult {
  title: string;
  findings: string[];
}

/**
 * Runs one check. An error, such as a file that fails to parse, becomes a
 * finding instead of crashing the script, so the other checks still report.
 */
export function runCheck(title: string, check: () => string[]): CheckResult {
  try {
    return { title, findings: check() };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    // YAML parse errors append a multi-line snippet; the first line already
    // names the problem and its position.
    const firstLine = message.split("\n")[0];
    return { title, findings: [`Couldn't run this check: ${firstLine}`] };
  }
}
