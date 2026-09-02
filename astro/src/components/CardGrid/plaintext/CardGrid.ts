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

export interface PlaintextCard {
  href: string;
  title?: string;
  subtitle?: string;
  // Accepted and ignored, so callers can pass a card through unchanged.
  src?: string;
  alt?: string;
  tooltip?: string;
  image_width?: number;
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

export function cardGridNode(cards: PlaintextCard[]): MarkdocNode {
  const items = cards.map((card) =>
    listItem([inline([link(card.href, escapeLinkText(displayText(card)))])]),
  );
  return list("unordered", items);
}
