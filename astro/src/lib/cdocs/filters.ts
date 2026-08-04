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
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
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

const DEFAULT_LANG = 'en';

// The customization config mirrors Hugo's top-level `customization_config/`
// (with per-language subdirectories).
//
// It is inlined at build time rather than read from disk relative to this
// module: `loadCustomizationConfig` reads YAML off the filesystem, but in the
// bundled prod server this module lives in `dist/server/chunks/`, so an
// `import.meta.url`-relative path points at a `customization_config/` dir that
// was never emitted — the loader then silently returns an empty config and
// `buildFiltersManifest` throws on the missing traits. Vite's glob resolves the
// source YAML in both dev and prod and ships it inside the bundle, decoupling
// config loading from where the code happens to run.
const CONFIG_ROOT_SEGMENT = 'customization_config/';
const configYamlByGlobKey = import.meta.glob(
  '../../customization_config/**/*.{yaml,yml}',
  { query: '?raw', import: 'default', eager: true },
) as Record<string, string>;

// TODO(cdocs-data): remove this materialize-to-temp-dir dance once cdocs-data
// offers an in-memory config loader. The root problem is that
// `loadCustomizationConfig` is filesystem-only — it can only read the config
// from a directory tree on disk, with no way to pass already-loaded data. That
// forces us to inline the YAML (above) and then write it back out to a temp dir
// here just so the loader has files to read, which also adds a runtime
// dependency on a writable `os.tmpdir()`.
//
// The right fix lives upstream in cdocs-data (which we own): add an in-memory
// entry point — e.g. `loadCustomizationConfigFromRecords(yamlByRelPath)` or a
// virtual-FS option on `loadCustomizationConfig` — that runs the same merge and
// validation against provided data instead of reading disk. Then this file can
// pass the glob-inlined YAML straight through, dropping the temp dir, the
// `fs`/`os`/`path` imports, and `materializeConfigDir` entirely. The Hugo
// integration has the same FS assumption and would benefit too. Not blocking:
// the workaround is correct and portable, just not the clean shape.

// Materialize the inlined YAML back into the `<lang>/{traits,options,
// option_groups}` directory layout the loader expects, in a temp dir created
// once per process. `os.tmpdir()` is writable on every Node deploy target.
let materializedConfigDir: string | null = null;
function materializeConfigDir(): string {
  if (materializedConfigDir) return materializedConfigDir;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdocs-config-'));
  for (const [globKey, contents] of Object.entries(configYamlByGlobKey)) {
    // e.g. '../../cdocs/customization_config/en/traits/general.yaml'
    //   -> 'en/traits/general.yaml'
    const relPath = globKey.slice(
      globKey.indexOf(CONFIG_ROOT_SEGMENT) + CONFIG_ROOT_SEGMENT.length,
    );
    const dest = path.join(dir, relPath);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, contents);
  }
  materializedConfigDir = dir;
  return dir;
}

let configByLang: Record<string, CustomizationConfig> | null = null;

function getCustomizationConfig(lang: string): CustomizationConfig {
  if (!configByLang) {
    configByLang = loadCustomizationConfig({
      configDir: materializeConfigDir(),
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
