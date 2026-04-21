/**
 * Typed loader for language_names.yaml. Maps (currentLang → targetLang) to the
 * localized display name, e.g. languageNames('en')('ja') === 'Japanese',
 * languageNames('ja')('en') === '英語'.
 */
import { parse as parseYaml } from 'yaml';
// @ts-ignore — Vite raw import
import raw from '../mocked_dependencies/websites_modules/data/language_names.yaml?raw';

type LanguageNamesTable = Record<string, Record<string, string>>;

const table = parseYaml(raw) as LanguageNamesTable;

export type LangCode = 'en' | 'ja' | 'ko' | 'fr' | 'pt' | 'es';

/** Language names keyed by the current language's own label of itself. */
export const nativeLabels: Record<LangCode, string> = {
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  fr: 'Français',
  pt: 'Português',
  es: 'Español',
};

/**
 * For a given current language, return a function that maps target-language
 * codes to their localized name. Falls back to English, then to the code itself.
 */
export function getTranslations(currentLang: LangCode) {
  const dict = table[currentLang] ?? table.en;
  return (targetLang: string): string => dict[targetLang] ?? targetLang;
}

export function getNativeLabel(lang: LangCode): string {
  return nativeLabels[lang] ?? lang;
}