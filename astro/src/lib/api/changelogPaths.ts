// Dependency-free: `astro.config.mjs` reaches this file through the sitemap
// filter before aliases exist.

/** The changelog landing page, a top-level nav sibling of the overview. */
export const CHANGELOG_ROOT_PATH = "/api/changelog/";

/**
 * True for a locale-stripped path on any changelog page: the landing page and
 * every filtered or later page beneath it, but not the `.md` twin.
 */
export function isChangelogPath(unprefixedPath: string): boolean {
  return unprefixedPath.startsWith(CHANGELOG_ROOT_PATH);
}
