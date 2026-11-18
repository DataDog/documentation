/**
 * Adds the reader's stored preferences to links that point to Cdocs pages, so
 * the linked page opens on the variant the reader chose before.
 *
 * Pure, so it's testable without a DOM. `preferencesClient.ts` calls it when
 * the reader hovers over, touches, or focuses a link.
 */
import type { CdocsTraitsList } from "./cdocsPages";

/**
 * The link's href with the stored preferences its page accepts added as
 * params, or `null` to leave the link alone.
 *
 * Only adds params. A param already on the link is never changed. Trait
 * params are put in alphabetical order, the same order as variant URLs.
 */
export function addPreferencesToHref(p: {
  href: string;
  /** The URL of the page the link is on, to resolve relative links. */
  pageUrl: string;
  traitsList: CdocsTraitsList;
  preferences: Record<string, string>;
  /** The deploy path prefix, such as "/my-branch", or "". */
  pathPrefix: string;
}): string | null {
  let url: URL;
  try {
    url = new URL(p.href, p.pageUrl);
  } catch {
    return null;
  }
  if (url.origin !== new URL(p.pageUrl).origin) return null;

  const acceptedTraitIds = findAcceptedTraitIds(
    url.pathname,
    p.pathPrefix,
    p.traitsList,
  );
  if (!acceptedTraitIds) return null;

  let changed = false;
  for (const traitId of acceptedTraitIds) {
    const preference = p.preferences[traitId];
    if (preference && !url.searchParams.has(traitId)) {
      url.searchParams.set(traitId, preference);
      changed = true;
    }
  }
  if (!changed) return null;

  // Sorts every param by name. The order of repeated params is kept.
  url.searchParams.sort();
  return url.pathname + url.search + url.hash;
}

// Private functions ------------------------------------------------

/** The traits the page at this path accepts, or `null` if it's not a Cdocs page. */
function findAcceptedTraitIds(
  pathname: string,
  pathPrefix: string,
  traitsList: CdocsTraitsList,
): string[] | null {
  let path = pathname;
  if (pathPrefix) {
    if (!path.startsWith(`${pathPrefix}/`)) return null;
    path = path.slice(pathPrefix.length);
  }

  // Traits list keys have no leading or trailing slash.
  const pageId = path.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!Object.hasOwn(traitsList.pages, pageId)) return null;

  return traitsList.pages[pageId].map(
    (traitIndex) => traitsList.traits[traitIndex],
  );
}
