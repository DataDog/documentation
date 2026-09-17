/**
 * Resolves the site-support banner for a path and returns it as Markdoc nodes,
 * ready to splice into a `.md` route's content list.
 *
 * Every `.md` route composes its page differently, so this holds the one thing
 * they share: resolve the unsupported regions, then build the plaintext twin.
 * An unaffected page yields `[]`, which spreads to nothing.
 */
import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { getUnsupportedRegions } from "@config/siteSupport";
import { siteSupportNode } from "@components/SiteSupportBanner/plaintext/SiteSupportBanner";
import type { Locale } from "@lib/i18n/locale";

export function siteSupportNoteNodes(
  pathname: string,
  lang: Locale,
  siteSupportId?: string,
): MarkdocNode[] {
  const regions = getUnsupportedRegions(pathname, siteSupportId);
  const node = siteSupportNode(regions, lang);
  return node ? [node] : [];
}
