export function isSitemapPage(url: string): boolean {
  const { pathname } = new URL(url);
  if (pathname.startsWith('/dd_e2e/')) return false;
  if (pathname === '/') return false;
  // Build-time sidecars for pages.json and llms.txt; deleted after the build.
  if (pathname === '/pages-index.json') return false;
  if (pathname === '/llms-index.json') return false;
  return true;
}
