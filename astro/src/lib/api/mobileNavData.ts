/**
 * The payload behind `/{locale}/api/mobile-nav.json`: every API category's
 * operation links, fetched by the mobile nav at idle so it can fill in a
 * category's links on the client when the user expands it. Pages render only
 * the active category's operations on the server; see `MobileNavApiList`.
 *
 * Holds just what a link needs. Each operation's href is
 * `category.href + operation.slug + "/"`.
 */
import type { ApiCategory } from "./schemas/views";
import { localizedHref, type Locale } from "@lib/i18n/locale";

export interface MobileNavOperation {
  slug: string;
  summary: string;
}

export interface MobileNavCategory {
  slug: string;
  href: string;
  operations: MobileNavOperation[];
}

export interface MobileNavData {
  categories: MobileNavCategory[];
}

export function buildMobileNavData(
  categories: ApiCategory[],
  lang: Locale,
): MobileNavData {
  return {
    categories: categories.map((category) => ({
      slug: category.slug,
      href: localizedHref(lang, `/api/latest/${category.slug}/`),
      operations: category.operations.map((operation) => ({
        slug: operation.slug,
        summary: operation.summary,
      })),
    })),
  };
}

/**
 * The localized URL of the endpoint, computed on the server and passed to the
 * client so it never duplicates the locale or preview-prefix logic.
 */
export function mobileNavDataUrl(lang: Locale): string {
  return localizedHref(lang, "/api/mobile-nav.json");
}
