/**
 * SEO constants and helpers. Mirrors the meta-tag set that Hugo emits via
 * `layouts/partials/meta.html` and `layouts/partials/hreflang.html`, with the
 * per-locale defaults pulled from `config/_default/params.{lang}.yaml`.
 */

import { LOCALES, DEFAULT_LOCALE, localePrefix, type Locale } from "./i18n/locale";

export const TWITTER_HANDLE = "@datadoghq";
export const THEME_COLOR = "#774aa4";
export const IMG_URL = "https://datadog-docs.imgix.net/";
export const DEFAULT_OG_IMAGE = `${IMG_URL}images/og-default/og-thumbnails-generic5.png`;

interface LocaleDefaults {
  siteName: string;
  metaTitle: string;
  metaDescription: string;
}

export const SITE_DEFAULTS: Record<string, LocaleDefaults> = {
  en: {
    siteName: "Datadog Infrastructure and Application Monitoring",
    metaTitle: "Getting Started with Datadog",
    metaDescription: "Datadog, the leading service for cloud-scale monitoring.",
  },
  fr: {
    siteName: "Surveillance d'applications et d'infrastructures avec Datadog",
    metaTitle: "Débuter avec Datadog",
    metaDescription: "Datadog, le principal prestataire de services de surveillance à l'échelle du cloud.",
  },
  ja: {
    siteName: "Datadogでインフラストラクチャーとアプリケーションのモニタリング",
    metaTitle: "Datadogを始めてみましょう",
    metaDescription: "Datadogが大規模なクラウドのモニタリングサービスをリードします。",
  },
  ko: {
    siteName: "Datadog 인프라스트럭처 및 응용 프로그램 모니터링",
    metaTitle: "Datadog로 시작하기",
    metaDescription: "클라우드 스케일 모니터링의 선두주자, Datadog",
  },
  es: {
    siteName: "Monitorización de la infraestructura y las aplicaciones de Datadog",
    metaTitle: "Empezando con Datadog",
    metaDescription: "Datadog, el servicio líder de monitorización a escala en nube.",
  },
};

export function getLocaleDefaults(lang: Locale): LocaleDefaults {
  return SITE_DEFAULTS[lang] ?? SITE_DEFAULTS[DEFAULT_LOCALE];
}

/**
 * Strip Markdown syntax and collapse whitespace, then truncate at a word
 * boundary for use as a meta description. Aim for ~155 chars (search engines
 * truncate around 160).
 */
export function mdToMetaDescription(md: string | undefined | null, maxLen = 155): string {
  if (!md) {
    return "";
  }
  const text = md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLen) {
    return text;
  }
  const truncated = text.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  const stem = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;
  return stem.trimEnd() + "…";
}

/**
 * Build hreflang alternates for a path that doesn't include a locale prefix.
 * Returns one entry per supported locale plus an `x-default` pointing at the
 * default-locale URL.
 *
 * Example: `buildHreflangAlternates("/api/latest/dashboards/")` →
 *   [{ hreflang: "en", href: "/api/latest/dashboards/" },
 *    { hreflang: "fr", href: "/fr/api/latest/dashboards/" }, ...,
 *    { hreflang: "x-default", href: "/api/latest/dashboards/" }]
 */
export function buildHreflangAlternates(unprefixedPath: string): Array<{ hreflang: string; href: string }> {
  const out: Array<{ hreflang: string; href: string }> = LOCALES.map((lang) => ({
    hreflang: lang,
    href: `${localePrefix(lang)}${unprefixedPath}`,
  }));
  out.push({ hreflang: "x-default", href: unprefixedPath });
  return out;
}
