#!/usr/bin/env node
/**
 * Reports drift between Astro's `shared/site_support.yaml` and the Hugo
 * config it was copied from.
 *
 * While both sites run, the site-support data lives in two places on purpose.
 * This script is a warning, not a gate: it lives outside the test suite so
 * drift introduced upstream doesn't block unrelated work. It prints every
 * finding and exits 1 when there is drift, so a CI job marked as allowed to
 * fail can surface it as a warning.
 *
 * Delete this script when Hugo reads `shared/site_support.yaml` directly. At
 * that point there is only one copy and there is nothing to compare.
 *
 * Runs as TypeScript directly under Node 24's type-stripping, so relative
 * imports carry their `.ts` extension.
 *
 * Usage: node scripts/checkSiteSupportDrift.ts
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import {
  collectApiCategorySlugs,
  collectCascadeSiteSupport,
  findBannerDrift,
  findCascadeDrift,
  findKeySetDrift,
  findRegionDrift,
  findUnpathedSlugCollisions,
  runCheck,
  type BannerPair,
  type CascadeSiteSupport,
  type CheckResult,
  type HugoUnsupportedSites,
  type MinimalOpenApiSpec,
  type SharedSiteSupportIds,
} from "./lib/siteSupportDrift.ts";

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const HUGO_CONFIG_DIR = path.join(REPO_ROOT, "hugo/config/_default");
const SHARED_DIR = path.join(REPO_ROOT, "shared");
const LOCALES = ["en", "es", "fr", "ja", "ko"] as const;

/**
 * Reads and parses one file. A read or parse error is rethrown with the file's
 * repo-relative path, so the report names the broken file.
 */
function readParsed<T>(filePath: string, parse: (text: string) => unknown): T {
  try {
    return parse(readFileSync(filePath, "utf8")) as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${path.relative(REPO_ROOT, filePath)}: ${message}`);
  }
}

function readYaml<T>(filePath: string): T {
  return readParsed<T>(filePath, (text) => parseYaml(text));
}

function readJson<T>(filePath: string): T {
  return readParsed<T>(filePath, (text) => JSON.parse(text));
}

function loadSharedIds(): SharedSiteSupportIds {
  return readYaml<{ site_support_ids: SharedSiteSupportIds }>(
    path.join(SHARED_DIR, "site_support.yaml"),
  ).site_support_ids;
}

function loadHugoUnsupportedSites(): HugoUnsupportedSites {
  return readYaml<{ unsupported_sites: HugoUnsupportedSites }>(
    path.join(HUGO_CONFIG_DIR, "params.yaml"),
  ).unsupported_sites;
}

function loadBannersByLocale(): Record<string, BannerPair> {
  return Object.fromEntries(
    LOCALES.map((lang) => {
      const hugoParams = readYaml<{ site_support_banner?: string }>(
        path.join(HUGO_CONFIG_DIR, `params.${lang}.yaml`),
      );
      const sharedI18n = readJson<
        Record<string, { other?: string } | undefined>
      >(path.join(SHARED_DIR, "i18n", `${lang}.json`));
      return [
        lang,
        {
          hugo: hugoParams.site_support_banner,
          shared: sharedI18n.site_support_banner?.other,
        },
      ];
    }),
  );
}

function loadApiCategorySlugs(): Set<string> {
  const specs = ["v1", "v2"].map((version) =>
    readYaml<MinimalOpenApiSpec>(
      path.join(REPO_ROOT, "astro/api-spec", version, "full_spec.yaml"),
    ),
  );
  return collectApiCategorySlugs(specs);
}

function loadApiCascadeSiteSupport(): CascadeSiteSupport[] {
  return readParsed<CascadeSiteSupport[]>(
    path.join(REPO_ROOT, "hugo/content/en/api/_index.md"),
    collectCascadeSiteSupport,
  );
}

function printCheck({ title, findings }: CheckResult): void {
  if (findings.length === 0) {
    console.log(`✓ ${title}`);
    return;
  }
  console.log(`✗ ${title} (${findings.length})`);
  for (const finding of findings) {
    console.log(`    ${finding}`);
  }
}

function main(): void {
  // Each check loads its own inputs inside `runCheck`, so a file that fails
  // to read or parse is reported against the checks that need it, and the
  // rest still run.
  const results = [
    runCheck("Same keys", () =>
      findKeySetDrift(loadSharedIds(), loadHugoUnsupportedSites()),
    ),
    runCheck("Same regions per key", () =>
      findRegionDrift(loadSharedIds(), loadHugoUnsupportedSites()),
    ),
    runCheck("Same banner string", () =>
      findBannerDrift(loadBannersByLocale()),
    ),
    runCheck("API-slug keys have url_paths", () =>
      findUnpathedSlugCollisions(loadSharedIds(), loadApiCategorySlugs()),
    ),
    runCheck("API cascade paths are in url_paths", () =>
      findCascadeDrift(loadSharedIds(), loadApiCascadeSiteSupport()),
    ),
  ];

  console.log("Site-support drift: shared/site_support.yaml vs. Hugo\n");
  results.forEach(printCheck);

  const driftCount = results.reduce(
    (sum, { findings }) => sum + findings.length,
    0,
  );
  if (driftCount > 0) {
    console.log(
      `\n${driftCount} drift finding(s). Update shared/site_support.yaml ` +
        `to match Hugo.`,
    );
    process.exitCode = 1;
  }
}

main();
