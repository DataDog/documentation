/**
 * A Cdocs page's filters manifest: its frontmatter filters, with the option
 * groups and defaults they need from the customization config.
 *
 * Server-only, since it reads the whole build-time customization config. The
 * filter bar gets a pruned copy (`pruneManifestForClient`) instead.
 */
import { buildFiltersManifest } from "cdocs-data/buildFiltersManifest";
import type { CustomizationConfig, FiltersManifest } from "cdocs-data";
import configByLang from "virtual:cdocs-config";
import type { CdocContentFilter } from "./filters";

const DEFAULT_LANG = "en";

export function buildPageFiltersManifest(
  contentFilters: CdocContentFilter[],
  customizationConfig: CustomizationConfig = configByLang[DEFAULT_LANG],
): FiltersManifest {
  return buildFiltersManifest({
    frontmatter: { title: "", content_filters: contentFilters },
    customizationConfig,
  });
}
