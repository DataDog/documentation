/**
 * Minimal English-only i18n helper. Mirrors Hugo's i18n(key) call, resolving
 * a lang_key into its "other" string from the bundled en.yaml. When non-English
 * content lands, swap the implementation here — no markup changes needed.
 */
import { parse as parseYaml } from 'yaml';
// @ts-ignore — Vite raw import
import enRaw from '../mocked_dependencies/websites_modules/i18n/en.yaml?raw';

type I18nEntry = { one?: string; other?: string };
type I18nTable = Record<string, I18nEntry>;

const table: I18nTable = parseYaml(enRaw) as I18nTable;

export function i18n(key: string | undefined): string {
  if (!key) return '';
  const entry = table[key];
  if (!entry) return key;
  return entry.other ?? entry.one ?? key;
}
