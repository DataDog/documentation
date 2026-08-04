/**
 * Rewrites an internal documentation link to point at its plaintext (`.md`)
 * twin, mirroring what the Copy-page loader does for the current page.
 *
 * In plaintext output, a link to another doc should resolve to that doc's
 * plaintext version (so an agent/LLM following the link stays in plaintext),
 * while external URLs, mail/anchor links, and asset links are left untouched.
 *
 * A link is rewritten only when it is site-internal (relative or root-absolute,
 * no URL scheme) and its final path segment has no file extension (so real docs
 * like `/agent/guide` are rewritten, but `/images/x.png`, `#section`, and
 * `https://…` are not). Any query string or fragment is preserved after `.md`.
 */
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;

export function rewriteInternalDocLink(href: string): string {
  if (!href) return href;
  // Pure fragment or query: no path to rewrite.
  if (href.startsWith('#') || href.startsWith('?')) return href;
  // Absolute URL (http:, https:, mailto:, tel:, …) or protocol-relative.
  if (HAS_SCHEME.test(href) || href.startsWith('//')) return href;

  // Split off the query/fragment suffix so `.md` lands on the path.
  const suffixStart = href.search(/[?#]/);
  const path = suffixStart === -1 ? href : href.slice(0, suffixStart);
  const suffix = suffixStart === -1 ? '' : href.slice(suffixStart);

  // The bare site root has no doc of its own to point at.
  if (path === '' || path === '/') return href;

  const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
  const lastSegment = cleanPath.slice(cleanPath.lastIndexOf('/') + 1);
  // A dot in the last segment means an existing extension (asset, or already
  // `.md`): leave it alone rather than doubling up.
  if (lastSegment.includes('.')) return href;

  return `${cleanPath}.md${suffix}`;
}
