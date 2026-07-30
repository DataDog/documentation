/**
 * `filter` for the `@astrojs/sitemap` integration. Astro classifies `.ts`
 * endpoint routes (like `llms.txt.ts` and the `.md.ts` plaintext twins) as
 * `endpoint`, not `page`, so the integration already excludes those before
 * this filter ever runs. This only needs to exclude the remaining `.astro`
 * page routes that aren't real API docs content.
 */
export function isSitemapPage(url: string): boolean {
  const { pathname } = new URL(url);
  if (pathname.startsWith('/docs/')) return false;
  if (pathname === '/') return false;
  return true;
}
