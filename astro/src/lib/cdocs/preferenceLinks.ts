/**
 * Adds the reader's stored preferences to links that point to Cdocs pages, so
 * the linked page opens on the variant the reader chose before.
 *
 * Pure, so it's testable without a DOM. `preferencesClient.ts` calls it when
 * the reader hovers over, touches, or focuses a link. The plaintext route adds
 * the request's params on the server instead, with `addOfferedParamsToHref`.
 */
import type { CdocsLinkTarget } from "./linkTargets";
import type { CdocsTraitsList } from "./pageLists";

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
  const link = parseLink(p.href, p.pageUrl, p.pathPrefix);
  if (!link || !Object.hasOwn(p.traitsList.pages, link.pageId)) return null;
  const { url } = link;

  const acceptedTraitIds = p.traitsList.pages[link.pageId].map(
    (traitIndex) => p.traitsList.traits[traitIndex],
  );

  let changed = false;
  for (const traitId of acceptedTraitIds) {
    const preference = p.preferences[traitId];
    if (preference && !url.searchParams.has(traitId)) {
      url.searchParams.set(traitId, preference);
      changed = true;
    }
  }
  if (!changed) return null;

  return formatLink(url);
}

/**
 * The link's href with the given params added where the linked Cdocs page
 * offers their values, or `null` to leave the link alone.
 *
 * Like `addPreferencesToHref`, but the server can resolve the linked page's
 * filters, so it adds a value only if the page would show it. A value the
 * page doesn't offer, one another filter rules out, or one for a hidden
 * filter is left off. A param already on the link is never changed.
 */
export function addOfferedParamsToHref(p: {
  href: string;
  /** The URL of the page the link is on, to resolve relative links. */
  pageUrl: string;
  linkTargetsById: ReadonlyMap<string, CdocsLinkTarget>;
  params: Record<string, string>;
}): string | null {
  const link = parseLink(p.href, p.pageUrl, "");
  const target = link && p.linkTargetsById.get(link.pageId);
  if (!link || !target) return null;
  const { url } = link;

  const linkVals: Record<string, string> = {};
  for (const traitId of target.traitIds) {
    const value = url.searchParams.get(traitId);
    if (value !== null) linkVals[traitId] = value;
  }
  // If the link's own params don't hold, check new values without them.
  let keptVals = target.showsValues(linkVals) ? linkVals : {};
  const addedVals: Record<string, string> = {};

  // A value can depend on another one added later in the pass, such as a
  // filter shown only for one host, so repeat until nothing more is added.
  let addedInPass = true;
  while (addedInPass) {
    addedInPass = false;
    for (const traitId of target.traitIds) {
      const value = p.params[traitId];
      if (!value || url.searchParams.has(traitId) || traitId in addedVals) {
        continue;
      }
      const candidateVals = { ...keptVals, [traitId]: value };
      if (!target.showsValues(candidateVals)) continue;
      keptVals = candidateVals;
      addedVals[traitId] = value;
      addedInPass = true;
    }
  }
  if (Object.keys(addedVals).length === 0) return null;

  for (const [traitId, value] of Object.entries(addedVals)) {
    url.searchParams.set(traitId, value);
  }
  return formatLink(url);
}

// Private functions ------------------------------------------------

/**
 * The link as a URL, with the ID of the page it points to, or `null` for a
 * link to another site or outside the deploy path prefix.
 */
function parseLink(
  href: string,
  pageUrl: string,
  pathPrefix: string,
): { url: URL; pageId: string } | null {
  let url: URL;
  try {
    url = new URL(href, pageUrl);
  } catch {
    return null;
  }
  if (url.origin !== new URL(pageUrl).origin) return null;

  let path = url.pathname;
  if (pathPrefix) {
    if (!path.startsWith(`${pathPrefix}/`)) return null;
    path = path.slice(pathPrefix.length);
  }

  // Page IDs have no leading or trailing slash.
  const pageId = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return { url, pageId };
}

/** The link's path, params, and fragment, with every param sorted by name. */
function formatLink(url: URL): string {
  // The order of repeated params is kept.
  url.searchParams.sort();
  return url.pathname + url.search + url.hash;
}
