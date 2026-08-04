export function isSitemapPage(url: string): boolean {
  const { pathname } = new URL(url);
  if (pathname.startsWith('/dd_e2e/')) return false;
  if (pathname === '/') return false;
  return true;
}
