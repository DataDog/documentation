/**
 * Site-support configuration, sourced from `shared/site_support.yaml`.
 *
 * That file lists the products and features that are not supported on some
 * Datadog sites. Each key is a `site_support_id`: an identifier a page can name
 * in its frontmatter, and — for the keys that carry `url_paths` — a matcher for
 * whole sections of the site.
 *
 * Resolution has two tiers and no path-segment walk. See the design notes for
 * why Hugo's segment walk is deliberately not reproduced.
 *
 * ⚠️ This module is build-time-only. It pulls in the `yaml` parser, `picomatch`
 * and the full support table. Do not import it from client-bundled code
 * (Preact components, anything in the hydration graph). The banner is static,
 * so nothing client-side needs this data.
 */

import picomatch from "picomatch";
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import SITE_SUPPORT_YAML_RAW from "@shared/site_support.yaml?raw";
import DD_E2E_YAML_RAW from "../../tests/fixtures/siteSupport/dd_e2e.yaml?raw";
import { getAllowedRegions, isAllowedRegionKey } from "./regions";
import { stripLocalePrefix } from "@lib/i18n/locale";

/**
 * Globs are restricted to `*` and `**`. Hugo has no glob function for
 * arbitrary strings (verified on v0.165.0: `strings.GlobMatch`, `path.Match`,
 * `glob` and `strings.Match` are all absent), so when Hugo adopts this file it
 * has to translate these patterns to regex with `findRE`. Keeping the subset
 * tiny keeps that translation trivial.
 *
 * Rejected on sight: `?`, character classes, brace expansion and extglobs.
 */
const DISALLOWED_GLOB_CHARS = /[?[\]{}()!+@]/;

const UrlPathSchema = z
  .string()
  .min(1)
  .refine((p) => p.startsWith("/"), {
    message: "url_paths entries must start with /",
  })
  .refine((p) => !DISALLOWED_GLOB_CHARS.test(p), {
    message:
      "url_paths entries may only use the * and ** wildcards; " +
      "?, [], {}, () and extglobs are not supported",
  });

const SiteSupportEntrySchema = z.object({
  regions: z.array(z.string().min(1)).min(1),
  url_paths: z.array(UrlPathSchema).default([]),
  description: z.string().optional(),
});

export const SiteSupportFileSchema = z.object({
  site_support_ids: z.record(z.string().min(1), SiteSupportEntrySchema),
});

export type SiteSupportFile = z.infer<typeof SiteSupportFileSchema>;
export type SiteSupportEntry = z.infer<typeof SiteSupportEntrySchema>;

/**
 * Every region named in the dataset must be a real region. A typo would
 * silently stop a banner from ever showing, so it fails the build instead.
 */
export function assertKnownRegions(file: SiteSupportFile): void {
  const unknown: string[] = [];
  for (const [id, entry] of Object.entries(file.site_support_ids)) {
    for (const region of entry.regions) {
      if (!isAllowedRegionKey(region)) {
        unknown.push(`${id}: "${region}"`);
      }
    }
  }
  if (unknown.length > 0) {
    throw new Error(
      `shared/site_support.yaml: unknown region keys: ${unknown.join(", ")}.`,
    );
  }
}

/**
 * Two keys must not claim the same page. If they did, the banner shown would
 * depend on object key order — a silent, order-dependent bug. Overlap is
 * checked both ways, so a broad `**` glob subsuming another key's narrower
 * path is caught too.
 */
export function assertNoOverlappingPaths(file: SiteSupportFile): void {
  const entries = Object.entries(file.site_support_ids).filter(
    ([, entry]) => entry.url_paths.length > 0,
  );

  const clashes: string[] = [];
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const [idA, entryA] = entries[i];
      const [idB, entryB] = entries[j];
      for (const patternA of entryA.url_paths) {
        for (const patternB of entryB.url_paths) {
          if (
            picomatch(patternA)(patternB) ||
            picomatch(patternB)(patternA) ||
            patternA === patternB
          ) {
            clashes.push(`${idA} (${patternA}) vs ${idB} (${patternB})`);
          }
        }
      }
    }
  }

  if (clashes.length > 0) {
    throw new Error(
      `shared/site_support.yaml: overlapping url_paths: ${clashes.join("; ")}. ` +
        `Two keys must not claim the same page.`,
    );
  }
}

/**
 * The `dd_e2e` browser test page needs a page that really carries a banner,
 * and a browser test cannot mock build-time data. Merging a test-only fixture
 * outside the live build gives it one without a `dd_e2e` page having to name a
 * real product key — deleting a real key is ordinary content work and must not
 * break these tests.
 *
 * Same guard as `src/pages/[...slug].md.ts`, which hides `dd_e2e` pages from
 * the live build.
 */
function loadDataset(): SiteSupportFile {
  const shared = SiteSupportFileSchema.parse(parseYaml(SITE_SUPPORT_YAML_RAW));
  if (__CI_ENV__ === "live") {
    return shared;
  }
  const testOnly = SiteSupportFileSchema.parse(parseYaml(DD_E2E_YAML_RAW));
  return {
    site_support_ids: {
      ...shared.site_support_ids,
      ...testOnly.site_support_ids,
    },
  };
}

const DATASET = loadDataset();

assertKnownRegions(DATASET);
assertNoOverlappingPaths(DATASET);

/** Region keys in weight order, so banner output is deterministic. */
const REGION_ORDER: string[] = getAllowedRegions().map((r) => r.key);

function sortByWeight(regions: string[]): string[] {
  const wanted = new Set(regions);
  return REGION_ORDER.filter((key) => wanted.has(key));
}

/**
 * Path matchers, compiled once at module load. `picomatch` compiles a pattern
 * to a regex, which is the expensive part; doing it per page would repeat that
 * work across tens of thousands of pages.
 */
const PATH_MATCHERS: { id: string; isMatch: (p: string) => boolean }[] =
  Object.entries(DATASET.site_support_ids).flatMap(([id, entry]) =>
    entry.url_paths.map((pattern) => ({
      id,
      isMatch: picomatch(pattern),
    })),
  );

/**
 * Unsupported region keys for a page, in weight order, or `[]`.
 *
 * Two tiers:
 *   1. `siteSupportId` from the page's frontmatter. An ID absent from the
 *      dataset throws, mirroring Hugo's `errorf`.
 *   2. A `url_paths` glob match on the pathname.
 *
 * The locale prefix is stripped first, so `/fr/api/latest/on-call` matches the
 * same patterns as `/api/latest/on-call`.
 */
export function getUnsupportedRegions(
  pathname: string,
  siteSupportId?: string,
): string[] {
  if (siteSupportId) {
    const entry = DATASET.site_support_ids[siteSupportId];
    if (!entry) {
      throw new Error(
        `Unknown site_support_id "${siteSupportId}". ` +
          `Add it to shared/site_support.yaml or remove it from the page's frontmatter.`,
      );
    }
    return sortByWeight(entry.regions);
  }

  const { rest } = stripLocalePrefix(pathname);
  const normalized = normalizePath(rest);

  for (const matcher of PATH_MATCHERS) {
    if (matcher.isMatch(normalized)) {
      return sortByWeight(DATASET.site_support_ids[matcher.id].regions);
    }
  }
  return [];
}

/**
 * Drop a trailing slash so `/api/latest/on-call/` and `/api/latest/on-call`
 * match the same pattern. Astro emits directory-style URLs, while the patterns
 * in the dataset are written without the trailing slash.
 */
function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/** The parsed dataset, for the equivalence and divergence tests. */
export function getSiteSupportDataset(): SiteSupportFile {
  return DATASET;
}
