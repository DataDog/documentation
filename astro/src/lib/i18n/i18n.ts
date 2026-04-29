/**
 * i18n helper. Mirrors Hugo's `i18n(key)` call: resolves a lang_key into its
 * "other" string from the per-locale YAML bundle.
 *
 * Locale files are loaded eagerly via `import.meta.glob` so missing files are
 * a no-op at runtime — callers fall back to English entry-by-entry, then to
 * the key itself. Translation completeness is owned upstream; this module
 * never warns or fails on gaps.
 */
import { parse as parseYaml } from 'yaml';
import { DEFAULT_LOCALE, type Locale } from './locale';

type I18nEntry = { one?: string; other?: string };
type I18nTable = Record<string, I18nEntry>;

const rawModules: Record<string, string> = import.meta.glob<string>(
  '../mocked_dependencies/websites_modules/i18n/*.yaml',
  { query: '?raw', import: 'default', eager: true },
);

const LOCALE_FILE_RE = /\/i18n\/([a-z]{2})\.yaml$/;

const tables: Partial<Record<Locale, I18nTable>> = {};
for (const [path, raw] of Object.entries(rawModules)) {
  const match = LOCALE_FILE_RE.exec(path);
  if (!match) {
    continue;
  }
  const lang = match[1] as Locale;
  tables[lang] = parseYaml(raw) as I18nTable;
}

function lookup(lang: Locale, key: string): string | undefined {
  const entry = tables[lang]?.[key];
  if (!entry) {
    return undefined;
  }
  return entry.other ?? entry.one;
}

export function i18n(key: string | undefined, lang: Locale = DEFAULT_LOCALE): string {
  if (!key) {
    return '';
  }
  return lookup(lang, key) ?? lookup(DEFAULT_LOCALE, key) ?? key;
}
