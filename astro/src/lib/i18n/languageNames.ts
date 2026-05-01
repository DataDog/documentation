/**
 * Typed loader for language_names.yaml. Maps (currentLang → targetLang) to the
 * localized display name, e.g. languageNames('en')('ja') === 'Japanese',
 * languageNames('ja')('en') === '英語'.
 */
import { parse as parseYaml } from "yaml";
// @ts-ignore — Vite raw import
import raw from "../../mocked_dependencies/websites_modules/data/language_names.yaml?raw";

type LanguageNamesTable = Record<string, Record<string, string>>;

const table = parseYaml(raw) as LanguageNamesTable;

export type LangCode = string & keyof typeof table;

export const LANG_CODES: readonly string[] = Object.keys(table);

export function isLangCode(value: unknown): value is LangCode {
  return typeof value === "string" && value in table;
}

/**
 * For a given current language, return a function that maps target-language
 * codes to their localized name. Falls back to English, then to the code itself.
 */
export function getTranslations(currentLang: LangCode) {
  const dict = table[currentLang] ?? table.en;
  return (targetLang: string): string => dict[targetLang] ?? targetLang;
}

/** Returns the language's name as written in that language (the YAML diagonal). */
export function getNativeLabel(lang: LangCode): string {
  return table[lang]?.[lang] ?? lang;
}
