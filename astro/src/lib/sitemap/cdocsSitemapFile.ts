/**
 * The Cdocs sitemap's path, relative to the site root. It's at the root
 * because a sitemap can only list URLs under its own folder.
 *
 * Imports must stay alias-free: `staticApiGuard` and `astro.config.mjs` read
 * this outside Vite's module graph.
 */
export const CDOCS_SITEMAP_FILE = "sitemap-cdocs.xml";
