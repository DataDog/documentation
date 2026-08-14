/**
 * i18n helper. Mirrors Hugo's `i18n(key)` call: resolves a lang_key into its
 * "other" string from the per-locale bundle.
 *
 * Two sources are merged: Hugo's `i18n/*.json` at the repo root (the legacy,
 * authoritative bundle) and `websites-modules/i18n/*.yaml` (the newer shared
 * bundle). Hugo wins on key conflicts so we don't silently drift from the
 * Hugo site's translations.
 *
 * Locale files are loaded eagerly via `import.meta.glob` so missing files are
 * a no-op at runtime — callers fall back to English entry-by-entry, then to
 * the key itself. Translation completeness is owned upstream; this module
 * never warns or fails on gaps.
 */
import { parse as parseYaml } from "yaml";
import { DEFAULT_LOCALE, type Locale } from "./locale";

type I18nEntry = { one?: string; other?: string };
type I18nTable = Record<string, I18nEntry>;

const yamlModules: Record<string, string> = import.meta.glob<string>(
  "@websites-modules/i18n/*.yaml",
  { query: "?raw", import: "default", eager: true },
);

const hugoModules: Record<string, string> = import.meta.glob<string>(
  "@hugo-site/i18n/*.json",
  { query: "?raw", import: "default", eager: true },
);

const LOCALE_FILE_RE = /\/i18n\/([a-z]{2})\.(?:yaml|json)$/;

const tables: Partial<Record<Locale, I18nTable>> = {};

function mergeBundle(
  modules: Record<string, string>,
  parse: (raw: string) => I18nTable,
  { override }: { override: boolean },
) {
  for (const [path, raw] of Object.entries(modules)) {
    const match = LOCALE_FILE_RE.exec(path);
    if (!match) {
      continue;
    }
    const lang = match[1] as Locale;
    const parsed = parse(raw);
    const existing = tables[lang] ?? {};
    tables[lang] = override ? { ...existing, ...parsed } : { ...parsed, ...existing };
  }
}

// TODO: websites-modules/i18n/es.yaml has duplicate top-level keys (cloud_security, ai) — remove uniqueKeys:false once fixed upstream.
mergeBundle(yamlModules, (raw) => parseYaml(raw, { uniqueKeys: false }) as I18nTable, {
  override: false,
});
mergeBundle(hugoModules, (raw) => JSON.parse(raw) as I18nTable, { override: true });

function lookup(lang: Locale, key: string): string | undefined {
  const entry = tables[lang]?.[key];
  if (!entry) {
    return undefined;
  }
  return entry.other ?? entry.one;
}

export function i18n(
  key: string | undefined,
  lang: Locale = DEFAULT_LOCALE,
): string {
  if (!key) {
    return "";
  }
  return lookup(lang, key) ?? lookup(DEFAULT_LOCALE, key) ?? key;
}
