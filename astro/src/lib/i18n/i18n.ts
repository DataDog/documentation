/**
 * i18n helper. Mirrors Hugo's `i18n(key)` call: resolves a lang_key into its
 * "other" string from the per-locale bundle.
 *
 * Two sources are merged: `shared/i18n/*.json` at the repo root, which Hugo
 * also reads (the legacy, authoritative bundle) and
 * `websites-modules/i18n/*.yaml` (the newer shared bundle). The `shared`
 * bundle wins on key conflicts so we don't silently drift from the Hugo
 * site's translations.
 *
 * Locale files are loaded eagerly via `import.meta.glob` so missing files are
 * a no-op at runtime — callers fall back to English entry-by-entry, then to
 * the key itself. Translation completeness is owned upstream; this module
 * never warns or fails on gaps.
 */
import { parse as parseYaml } from "yaml";
import { DEFAULT_LOCALE, type Locale, resolveLocale } from "./locale";

type I18nEntry = { one?: string; other?: string };
type I18nTable = Record<string, I18nEntry>;

const yamlModules: Record<string, string> = import.meta.glob<string>(
  "@websites-modules/i18n/*.yaml",
  { query: "?raw", import: "default", eager: true },
);

const sharedModules: Record<string, string> = import.meta.glob<string>(
  "@shared/i18n/*.json",
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
mergeBundle(sharedModules, (raw) => JSON.parse(raw) as I18nTable, { override: true });

function lookup(lang: Locale, key: string): string | undefined {
  const entry = tables[lang]?.[key];
  if (!entry) {
    return undefined;
  }
  return entry.other ?? entry.one;
}

/** A locale already bound to a translator. See `useTranslations`. */
export type Translate = (key: string | undefined) => string;

export function i18n(key: string | undefined, lang: Locale): string {
  if (!key) {
    return "";
  }
  return lookup(lang, key) ?? lookup(DEFAULT_LOCALE, key) ?? key;
}

/**
 * Binds a locale once and returns a `translate(key)` function, so components
 * pass the locale a single time instead of threading it through every `i18n()`
 * call. Named after the same helper in Astro's i18n docs.
 *
 * Not to be confused with `getLanguageNames` in `./languageNames` — that one
 * only maps language *display names* for the language selector.
 *
 * Takes `Astro.currentLocale`'s raw `string | undefined` directly — the locale
 * can't be derived in here, because `currentLocale` lives on the per-request
 * render context and is only handed to component scope. Anything narrower than
 * a component (this module included) has no way to reach it.
 *
 * Prefer this over calling `i18n(key, lang)` directly — a bound `translate`
 * has no locale argument to forget at the call site.
 */
export function useTranslations(currentLocale: string | undefined): Translate {
  const lang = resolveLocale(currentLocale);
  return (key) => i18n(key, lang);
}
