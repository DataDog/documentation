/**
 * Locale helpers for the API docs.
 *
 * Mirrors Hugo's `defaultContentLanguageInSubdir: false` URL shape: English at
 * the root (`/api/latest/...`), other locales prefixed (`/{lang}/api/latest/...`).
 */
import { prefixed } from "../site/pathPrefix";

const ALL_LOCALES = ["en", "fr", "ja", "ko", "es"] as const;
export type Locale = (typeof ALL_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Translations are built by default. Set `SKIP_TRANSLATIONS=true` for a
 * faster English-only build during local development. The default is to
 * include translations so production builds can't accidentally omit them.
 */
export const LOCALES: readonly Locale[] =
  process.env.SKIP_TRANSLATIONS === "true" ? [DEFAULT_LOCALE] : ALL_LOCALES;

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}

/**
 * Is this a locale this site can have? Unlike `isLocale`, the answer does not
 * depend on `SKIP_TRANSLATIONS`.
 *
 * Use this for questions about URL *shape* — "is this path segment a locale
 * prefix?" — so dev and a full build agree on the URL space. Use `isLocale`
 * for questions about what the current build actually emits.
 */
export function isLocaleCode(value: unknown): value is Locale {
  return (
    typeof value === "string" &&
    (ALL_LOCALES as readonly string[]).includes(value)
  );
}

/**
 * Narrow `Astro.currentLocale` to our `Locale` union.
 *
 * Astro derives `currentLocale` from the URL using the `i18n` block in
 * `astro.config.mjs`, so components never have to compute or receive the page
 * language. It is typed `string | undefined` and is `undefined` only when the
 * render context has no i18n manifest — which never happens in a real build or
 * SSR request, but does happen in `AstroContainer` unit tests, where the
 * container builds a bare manifest. Those fall back to English.
 */
export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/**
 * Parse the `[...lang]` rest param. Returns the validated locale, or
 * `undefined` if the segment is not a recognized non-default locale. The
 * caller is expected to 404 on `undefined` (since the English page lives at
 * the root and is reached via the empty-segment variant).
 *
 * Astro types rest params as `string | number | undefined`; non-string values
 * are treated as invalid locales (caller 404s).
 */
export function parseLangParam(
  param: string | number | undefined,
): Locale | undefined {
  if (param === undefined || param === "") {
    return DEFAULT_LOCALE;
  }
  if (typeof param !== "string") {
    return undefined;
  }
  if (isLocale(param) && param !== DEFAULT_LOCALE) {
    return param;
  }
  return undefined;
}

/**
 * Resolve the slug of a route whose path is captured by two adjacent rest
 * params, `[...lang]/[...slug]`. Returns the slug with no locale prefix, or
 * `undefined` when the path does carry one (the caller 404s).
 *
 * Two adjacent rest params make an ambiguous pattern, and the optional group
 * Astro compiles `[...lang]` to is greedy, so the first path segment lands in
 * `lang` whether or not it is a locale — `/dd_e2e/components/tabs` arrives as
 * `lang: "dd_e2e"`, `slug: "components/tabs"`. Reassembling it here is the
 * cost of nesting a root-level catch-all under `[...lang]`, which is what
 * keeps the `/api` routes ahead of it in Astro's route priority.
 *
 * A first segment that *is* a locale returns `undefined`: translated content
 * is not wired up, and English is served at the root, so `/en/...` is not a
 * second address for it either.
 *
 * One ambiguity is unavoidable: a top-level section named after a locale
 * (`/fr/...`) is indistinguishable from a locale prefix.
 */
export function resolveUnprefixedSlug(
  langParam: string | number | undefined,
  slugParam: string | number | undefined,
): string | undefined {
  const rawLang = langParam === undefined ? "" : String(langParam);
  const rawSlug = slugParam === undefined ? "" : String(slugParam);
  if (rawLang === "") {
    return rawSlug;
  }
  if (isLocaleCode(rawLang)) {
    return undefined;
  }
  return `${rawLang}/${rawSlug}`;
}

/** `''` for English, `/{lang}` for everything else. */
export function localePrefix(lang: Locale): string {
  if (lang === DEFAULT_LOCALE) {
    return "";
  }
  return `/${lang}`;
}

/**
 * Build a localized URL for a path that's expressed without any locale
 * prefix (e.g. `/api/latest/dashboards/`). The path must start with `/`.
 *
 * Also applies the preview branch prefix (a no-op outside preview), since
 * this is the funnel every in-page Astro link goes through. Callers that
 * concatenate onto an origin which already carries the branch prefix (e.g.
 * `HUGO_ORIGIN`) must use `localePrefix(lang) + path` instead, or the prefix
 * gets applied twice.
 */
export function localizedHref(lang: Locale, path: string): string {
  return prefixed(lang === DEFAULT_LOCALE ? path : `/${lang}${path}`);
}

/**
 * Strip a leading `/{lang}` segment off a pathname so it can be re-prefixed
 * for another locale. Used by the language dropdown to keep the user on the
 * same page when switching languages.
 */
export function stripLocalePrefix(pathname: string): {
  lang: Locale;
  rest: string;
} {
  for (const lang of LOCALES) {
    if (lang === DEFAULT_LOCALE) {
      continue;
    }
    if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) {
      return { lang, rest: pathname.slice(`/${lang}`.length) || "/" };
    }
  }
  return { lang: DEFAULT_LOCALE, rest: pathname };
}
