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
  findBannerDrift,
  findKeySetDrift,
  findRegionDrift,
  findUnpathedSlugCollisions,
  type BannerPair,
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

function readYaml<T>(filePath: string): T {
  return parseYaml(readFileSync(filePath, "utf8")) as T;
}

function readJson<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, "utf8")) as T;
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
      path.join(REPO_ROOT, "hugo/data/api", version, "full_spec.yaml"),
    ),
  );
  return collectApiCategorySlugs(specs);
}

function printCheck(title: string, findings: string[]): void {
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
  const sharedIds = loadSharedIds();
  const hugoUnsupportedSites = loadHugoUnsupportedSites();

  const checks: [string, string[]][] = [
    ["Same keys", findKeySetDrift(sharedIds, hugoUnsupportedSites)],
    ["Same regions per key", findRegionDrift(sharedIds, hugoUnsupportedSites)],
    ["Same banner string", findBannerDrift(loadBannersByLocale())],
    [
      "API-slug keys have url_paths",
      findUnpathedSlugCollisions(sharedIds, loadApiCategorySlugs()),
    ],
  ];

  console.log("Site-support drift: shared/site_support.yaml vs. Hugo\n");
  for (const [title, findings] of checks) {
    printCheck(title, findings);
  }

  const driftCount = checks.reduce(
    (sum, [, findings]) => sum + findings.length,
    0,
  );
  if (driftCount > 0) {
    console.log(
      `\n${driftCount} drift finding(s). Update shared/site_support.yaml ` +
        `to match Hugo, or add url_paths for API-slug keys.`,
    );
    process.exitCode = 1;
  }
}

main();
