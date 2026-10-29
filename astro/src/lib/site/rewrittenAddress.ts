/**
 * The address-bar path for a page rendered through `Astro.rewrite()`.
 *
 * A rewrite serves another route's HTML at the requested URL, so the browser
 * still shows the original path. When the two differ, `BaseLayout` swaps the
 * address bar to the rewritten (canonical) path with `history.replaceState`,
 * which, unlike a redirect, adds no extra page load and so keeps
 * cross-document view transitions intact. `/api/` → `/api/latest/` is the
 * motivating case.
 *
 * Returns `undefined` when the page wasn't rewritten.
 */
import { prefixed } from "./pathPrefix";

export function rewrittenAddressPath(
  originPathname: string,
  pathname: string,
): string | undefined {
  if (withoutTrailingSlash(originPathname) === withoutTrailingSlash(pathname)) {
    return undefined;
  }
  return prefixed(pathname);
}

function withoutTrailingSlash(path: string): string {
  return path.replace(/\/+$/, "");
}
