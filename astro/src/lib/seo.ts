/**
 * SEO constants and helpers. Mirrors the meta-tag set that Hugo emits via
 * `layouts/partials/meta.html` and `layouts/partials/hreflang.html`, with the
 * per-locale defaults pulled from `config/_default/params.{lang}.yaml`.
 */

import { createHash } from "node:crypto";
import { IMAGES_URL } from "@config/images";
import {
  LOCALES,
  DEFAULT_LOCALE,
  localePrefix,
  type Locale,
} from "./i18n/locale";

export const TWITTER_HANDLE = "@datadoghq";
export const THEME_COLOR = "#774aa4";

// Indexed by the first digit of a page's content-path hash. Order and the
// `generic5` fallback are copied from Hugo's `meta.html`, so a page shares the
// same preview image on both sites.
const OG_DEFAULT_IMAGES = [
  "og-thumbnails-generic.png",
  "og-thumbnails-generic2.png",
  "og-thumbnails-generic3.png",
  "og-thumbnails-generic4.png",
  "og-thumbnails-generic5.png",
];
const OG_FALLBACK_IMAGE = "og-thumbnails-generic5.png";

/**
 * The social-share image URL for a page. An authored `meta_image` (a path
 * under `images/`) wins; otherwise one of the generic thumbnails is picked
 * from the page's content path, as Hugo does with `.File.UniqueID`.
 *
 * `contentPath` is the page's Hugo source path relative to `content/<lang>/`
 * (e.g. `api/latest/dashboards/_index.md`); it only needs to match Hugo for
 * the rotation to match Hugo.
 */
export function ogImageUrl({
  metaImage,
  contentPath,
}: {
  metaImage?: string;
  contentPath?: string;
}): string {
  const imagePath =
    metaImage ??
    `og-default/${contentPath ? rotatedOgDefault(contentPath) : OG_FALLBACK_IMAGE}`;
  return `${IMAGES_URL}/images/${imagePath}`;
}

function rotatedOgDefault(contentPath: string): string {
  const hash = createHash("md5").update(contentPath).digest("hex");
  // Hugo strips letters and reads the first remaining digit; a hash with no
  // digits yields 0 there too.
  const firstDigit = Number(hash.replace(/[a-z]/g, "")[0] ?? 0);
  return OG_DEFAULT_IMAGES[firstDigit % OG_DEFAULT_IMAGES.length];
}

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
    metaDescription:
      "Datadog, le principal prestataire de services de surveillance à l'échelle du cloud.",
  },
  ja: {
    siteName: "Datadogでインフラストラクチャーとアプリケーションのモニタリング",
    metaTitle: "Datadogを始めてみましょう",
    metaDescription:
      "Datadogが大規模なクラウドのモニタリングサービスをリードします。",
  },
  ko: {
    siteName: "Datadog 인프라스트럭처 및 응용 프로그램 모니터링",
    metaTitle: "Datadog로 시작하기",
    metaDescription: "클라우드 스케일 모니터링의 선두주자, Datadog",
  },
  es: {
    siteName:
      "Monitorización de la infraestructura y las aplicaciones de Datadog",
    metaTitle: "Empezando con Datadog",
    metaDescription:
      "Datadog, el servicio líder de monitorización a escala en nube.",
  },
};

export function getLocaleDefaults(lang: Locale): LocaleDefaults {
  return SITE_DEFAULTS[lang] ?? SITE_DEFAULTS[DEFAULT_LOCALE];
}

/**
 * Strip Markdown syntax and collapse whitespace for use as a meta
 * description. Aim for ~155 chars (search engines truncate around 160). A
 * longer description is cut to its first sentence, and a first sentence that's
 * still too long is truncated at a word boundary.
 */
export function mdToMetaDescription(
  md: string | undefined | null,
  maxLen = 155,
): string {
  if (!md) {
    return "";
  }
  const text = stripMd(md);
  if (text.length <= maxLen) {
    return text;
  }
  return truncateAtWord(firstSentence(md), maxLen);
}

function stripMd(md: string): string {
  return (
    md
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/^#+\s*/gm, "")
      // Emphasis underscores sit at word edges; intraword ones (`as_count`) are
      // part of an identifier and stay.
      .replace(/(?<![A-Za-z0-9])_+|_+(?![A-Za-z0-9])/g, "")
      .replace(/[*`]/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
}

/**
 * The first sentence of the first block. The block ends at a blank line,
 * heading or list item, so a heading never runs into the text before it. A
 * sentence ends at `.`, `!` or `?` followed by a space and a capital letter,
 * so `e.g.` and `v1.2` don't end it.
 */
function firstSentence(md: string): string {
  const [firstBlock = ""] = md
    .trim()
    .split(/\n\s*\n|\n(?=\s*(?:#+\s|[-*+]\s|\d+\.\s))/);
  const text = stripMd(firstBlock);
  const sentenceEnd = text.match(/^.+?[.!?](?=\s+[A-Z]|$)/);
  return sentenceEnd ? sentenceEnd[0] : text;
}

function truncateAtWord(text: string, maxLen: number): string {
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
export function buildHreflangAlternates(
  unprefixedPath: string,
): Array<{ hreflang: string; href: string }> {
  const out: Array<{ hreflang: string; href: string }> = LOCALES.map(
    (lang) => ({
      hreflang: lang,
      href: `${localePrefix(lang)}${unprefixedPath}`,
    }),
  );
  out.push({ hreflang: "x-default", href: unprefixedPath });
  return out;
}
