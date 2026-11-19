/**
 * The sitemap's files. The sitemap is at the root, like any site's, so it can
 * list every URL: the API docs under `/api/`, and the docs in other folders.
 *
 * Imports must stay alias-free: `staticApiGuard` and `astro.config.mjs` read
 * this outside Vite's module graph.
 */

/** `@astrojs/sitemap` writes `sitemap-index.xml` and `sitemap-N.xml`. */
export const SITEMAP_FILENAME_BASE = "sitemap";

/**
 * The build-time intermediate file listing the pages that render on demand,
 * which `@astrojs/sitemap` can't see. See the `onDemandSitemapPages`
 * integration.
 */
export const ON_DEMAND_PAGES_INTERMEDIATE_FILE = "on-demand-pages-index.json";

const SITEMAP_FILE = new RegExp(
  `^${SITEMAP_FILENAME_BASE}-(?:index|\\d+)\\.xml$`,
);

/** Whether an emitted file, relative to the output root, is a sitemap file. */
export function isSitemapFile(filePath: string): boolean {
  return SITEMAP_FILE.test(filePath);
}
