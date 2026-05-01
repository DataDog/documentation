/**
 * Locale helpers for the API docs.
 *
 * Mirrors Hugo's `defaultContentLanguageInSubdir: false` URL shape: English at
 * the root (`/api/latest/...`), other locales prefixed (`/{lang}/api/latest/...`).
 */

export const LOCALES = ['en', 'fr', 'ja', 'ko', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/**
 * Parse the `[...lang]` rest param. Returns the validated locale, or
 * `undefined` if the segment is not a recognized non-default locale. The
 * caller is expected to 404 on `undefined` (since the English page lives at
 * the root and is reached via the empty-segment variant).
 */
export function parseLangParam(param: string | undefined): Locale | undefined {
  if (!param) {
    return DEFAULT_LOCALE;
  }
  if (isLocale(param) && param !== DEFAULT_LOCALE) {
    return param;
  }
  return undefined;
}

/** `''` for English, `/{lang}` for everything else. */
export function localePrefix(lang: Locale): string {
  if (lang === DEFAULT_LOCALE) {
    return '';
  }
  return `/${lang}`;
}

/**
 * Build a localized URL for a path that's expressed without any locale
 * prefix (e.g. `/api/latest/dashboards/`). The path must start with `/`.
 */
export function localizedHref(lang: Locale, path: string): string {
  if (lang === DEFAULT_LOCALE) {
    return path;
  }
  return `/${lang}${path}`;
}

/**
 * Strip a leading `/{lang}` segment off a pathname so it can be re-prefixed
 * for another locale. Used by the language dropdown to keep the user on the
 * same page when switching languages.
 */
export function stripLocalePrefix(pathname: string): { lang: Locale; rest: string } {
  for (const lang of LOCALES) {
    if (lang === DEFAULT_LOCALE) {
      continue;
    }
    if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) {
      return { lang, rest: pathname.slice(`/${lang}`.length) || '/' };
    }
  }
  return { lang: DEFAULT_LOCALE, rest: pathname };
}
