/**
 * Options for `@astrojs/sitemap`.
 *
 * Imports must stay alias-free: `astro.config.mjs` reads this outside Vite's
 * module graph.
 */
import { isSitemapPage } from "./sitemapFilter";
import { SITEMAP_FILENAME_BASE } from "./sitemapFiles";

/**
 * `onDemandUrls` starts empty. The `onDemandSitemapPages` integration fills it
 * in `astro:build:done`, before `@astrojs/sitemap` reads it in the same hook.
 * On-demand pages decide for themselves which pages to list, so the filter for
 * built pages doesn't apply to them.
 */
export function sitemapOptions(onDemandUrls: string[]) {
  let onDemandUrlSet: Set<string> | undefined;
  return {
    filenameBase: SITEMAP_FILENAME_BASE,
    customPages: onDemandUrls,
    filter: (url: string) => {
      onDemandUrlSet ??= new Set(onDemandUrls);
      return onDemandUrlSet.has(url) || isSitemapPage(url);
    },
  };
}
