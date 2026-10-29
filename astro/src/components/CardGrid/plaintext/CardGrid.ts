/**
 * AST twin of the `{% card-grid %}` component (`CardGrid.astro`).
 *
 * A grid collapses to a flat unordered list of links — one item per card, no
 * nesting and no images.
 *
 * Only `href`, `title`, and `subtitle` survive; a grid carries no semantics
 * once its images are stripped.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { inline, link, list, listItem } from "@lib/plaintext/helpers";
import { siteBase } from "@lib/site/siteUrl";
import {
  isExternalHref,
  rewriteInternalDocLink,
} from "@lib/plaintext/rewriteDocLink";

export interface PlaintextCard {
  href: string;
  title?: string;
  subtitle?: string;
}

/**
 * Markdoc's `format()` escapes parens in link hrefs on its own, but leaves
 * brackets in link text alone — and an unescaped `]` would close the link
 * early. So text is escaped here and URLs are not.
 */
function escapeLinkText(text: string): string {
  return text.replace(/([[\]])/g, "\\$1");
}

/** The href's `tab` query param, if it has one. */
function tabQueryParam(href: string): string | null {
  const queryStart = href.indexOf("?");
  if (queryStart === -1) return null;
  const [query] = href.slice(queryStart + 1).split("#");
  return new URLSearchParams(query).get("tab");
}

/** The last non-empty path segment, ignoring any query string or fragment. */
function finalPathSegment(href: string): string {
  const path = href.split(/[?#]/)[0];
  const segments = path.split("/").filter((segment) => segment !== "");
  return segments[segments.length - 1] ?? "";
}

/**
 * Display text, in priority order: the title, else the `tab` query param, else
 * the final path segment.
 *
 * The tab branch exists because grids often link to one page's several tabs
 * (`/mcp_server/setup/?tab=cursor`, `?tab=claudecode`, ...). Those share a
 * pathname, so without it every card would read `setup`.
 */
function displayText({ title, subtitle, href }: PlaintextCard): string {
  const baseText = title ?? tabQueryParam(href) ?? finalPathSegment(href);
  return subtitle ? `${baseText} - ${subtitle}` : baseText;
}

/**
 * The card's href, pointed at the linked page's plaintext twin and made
 * absolute when a `site` is supplied.
 *
 * Cards build their links rather than authoring them as markdown, so the cdocs
 * AST walker never sees them; the `.md` rewrite has to be applied per href here.
 *
 * Plaintext is consumed away from the page it came from, where a root-relative
 * href has no origin to resolve against. Resolving against `siteBase` rather
 * than `site.origin` keeps the branch segment that preview builds carry.
 *
 * Not `absoluteUrl`: that helper rejects a path already carrying the deploy
 * prefix, which is the right guard for canonical page URLs it builds itself but
 * wrong for authored hrefs, which may legitimately point anywhere.
 *
 * The leading slash is stripped before resolving: `new URL("/a/", base)` is
 * root-relative and would drop the branch segment from the base's path.
 */
function resolveHref(href: string, site?: string | URL): string {
  const twin = rewriteInternalDocLink(href);
  if (!site || isExternalHref(twin)) {
    return twin;
  }
  return new URL(twin.replace(/^\//, ""), siteBase(site)).href;
}

export function cardGridNode(
  cards: PlaintextCard[],
  site?: string | URL,
): MarkdocNode {
  const items = cards.map((card) =>
    listItem([
      inline([
        link(resolveHref(card.href, site), escapeLinkText(displayText(card))),
      ]),
    ]),
  );
  return list("unordered", items);
}
