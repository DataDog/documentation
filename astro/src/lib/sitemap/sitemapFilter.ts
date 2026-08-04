export function isSitemapPage(url: string): boolean {
  const { pathname } = new URL(url);
  if (pathname.startsWith('/docs/')) return false;
  if (pathname === '/') return false;
  return true;
}
