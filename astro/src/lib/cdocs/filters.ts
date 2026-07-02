/**
 * Server-side cdocs filter resolution, backed by the real `cdocs-data` package
 * (the same package Hugo uses via `cdocs-hugo-integration`).
 *
 * Per request we:
 *   1. load the customization config (traits/options/option groups) once,
 *   2. build the page's filters manifest from its `content_filters` frontmatter,
 *   3. pick each filter's active value with the precedence
 *      URL param > cookie > option-group default (skipping invalid candidates),
 *   4. resolve the manifest against those values to get UI-ready options/labels.
 *
 * The resolved trait values (`valsByTraitId`) become Markdoc variables so the
 * built-in `if` tags drop non-matching content, and are persisted to the cookie.
 */
import { fileURLToPath } from 'node:url';
import {
  loadCustomizationConfig,
  buildFiltersManifest,
  resolveFilters,
  type CustomizationConfig,
} from 'cdocs-data';
import type { ResolvedFilter } from './types';

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

// The customization config lives alongside the cdocs content, mirroring Hugo's
// top-level `customization_config/` (with per-language subdirectories).
const CONFIG_DIR = fileURLToPath(
  new URL('../../cdocs/customization_config', import.meta.url),
);

const DEFAULT_LANG = 'en';

let configByLang: Record<string, CustomizationConfig> | null = null;

function getCustomizationConfig(lang: string): CustomizationConfig {
  if (!configByLang) {
    configByLang = loadCustomizationConfig({
      configDir: CONFIG_DIR,
      langs: [DEFAULT_LANG],
    }).customizationConfigByLang;
  }
  return configByLang[lang] ?? configByLang[DEFAULT_LANG];
}

export interface ResolvePageFiltersInput {
  /** The `content_filters` list from the doc's frontmatter. */
  contentFilters: CdocContentFilter[];
  /** Values parsed from the URL query string, keyed by trait id. */
  urlVals: Record<string, string>;
  /** Values read from the persisted cookie, keyed by trait id. */
  cookieVals: Record<string, string>;
  lang?: string;
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
  const { contentFilters, urlVals, cookieVals, lang = DEFAULT_LANG } = input;
  const customizationConfig = getCustomizationConfig(lang);

  const filtersManifest = buildFiltersManifest({
    frontmatter: { title: '', content_filters: contentFilters },
    customizationConfig,
  });

  // Apply precedence URL > cookie > default, keeping only valid option ids.
  const selectedValsByTraitId: Record<string, string> = {};
  for (const filter of contentFilters) {
    const traitId = filter.trait_id;
    const validValues = new Set(
      filtersManifest.filtersByTraitId[traitId]?.possibleVals ?? [],
    );
    const chosen =
      [urlVals[traitId], cookieVals[traitId]].find(
        (candidate) => candidate && validValues.has(candidate),
      ) ?? filtersManifest.defaultValsByTraitId[traitId];
    if (chosen != null) selectedValsByTraitId[traitId] = chosen;
  }

  const resolved = resolveFilters({
    valsByTraitId: selectedValsByTraitId,
    filtersManifest,
  });

  const resolvedFilters: ResolvedFilter[] = [];
  const valsByTraitId: Record<string, string> = {};
  for (const filter of contentFilters) {
    const entry = resolved[filter.trait_id];
    if (!entry || !entry.isShown) continue;
    resolvedFilters.push({
      traitId: entry.id,
      label: entry.label,
      options: entry.options,
      defaultValue: entry.defaultValue,
      currentValue: entry.currentValue,
    });
    valsByTraitId[entry.id] = entry.currentValue;
  }

  return { resolvedFilters, valsByTraitId };
}
