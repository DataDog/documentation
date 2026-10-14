// Relative, not `@lib`: `astro.config.mjs` imports this file before aliases exist.
import { stripLocalePrefix } from "../i18n/locale";
import { CHANGELOG_ROOT_PATH } from "../api/changelogPaths";

export function isSitemapPage(url: string): boolean {
  const { pathname } = new URL(url);
  if (pathname.startsWith("/dd_e2e/")) return false;
  if (pathname === "/") return false;
  // Build-time sidecars for pages.json and llms.txt; deleted after the build.
  if (pathname === "/pages-index.json") return false;
  if (pathname === "/llms-index.json") return false;
  // Client-side data for the mobile nav, not a page.
  if (pathname.endsWith("/api/mobile-nav.json")) return false;
  if (isSecondaryChangelogPage(pathname)) return false;
  return true;
}

/**
 * Filtered and later changelog pages are thin slices of the landing page, so
 * only the landing page is listed.
 */
function isSecondaryChangelogPage(pathname: string): boolean {
  const { rest } = stripLocalePrefix(pathname);
  return rest.startsWith(CHANGELOG_ROOT_PATH) && rest !== CHANGELOG_ROOT_PATH;
}
