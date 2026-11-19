/**
 * Redirects for Cdocs URLs with filter params the page can't use, such as a
 * value the page doesn't offer. Each of those URLs would otherwise be cached
 * on its own, with the same content as a valid one.
 *
 * A bad value is replaced, not dropped. The `CdocsBareUrlRedirect` head script
 * adds a stored preference for any filter the URL is missing, so dropping a
 * stored value the page no longer offers would send the reader back and forth
 * between the two forever.
 *
 * Only filter params are checked. Other params, such as `utm_source`, are
 * kept, since analytics never sees a URL that redirects before the page loads.
 */
import type { FiltersManifest } from "cdocs-data";
import type { CdocContentFilter } from "./filters";

export interface FindParamRedirectInput {
  contentFilters: CdocContentFilter[];
  filtersManifest: FiltersManifest;
  /** The request URL's query string. */
  searchParams: URLSearchParams;
  /** The page's resolved values, from `resolvePageFilterValues`. */
  valsByTraitId: Record<string, string>;
}

/**
 * The query string to redirect to, with params in alphabetical order, or
 * `null` when every filter param in the URL is valid. Filters the URL is
 * missing stay missing, so the head script can add the reader's preferences.
 */
export function findParamRedirect(
  input: FindParamRedirectInput,
): string | null {
  const { contentFilters, filtersManifest, searchParams, valsByTraitId } =
    input;
  const redirectParams = new URLSearchParams(searchParams);
  let hasInvalidParam = false;

  for (const filter of contentFilters) {
    const traitId = filter.trait_id;
    const urlVals = searchParams.getAll(traitId);
    if (urlVals.length === 0) continue;

    const validVal =
      valsByTraitId[traitId] ??
      hiddenFilterVal(filtersManifest, traitId, urlVals[0]);
    if (urlVals.length === 1 && urlVals[0] === validVal) continue;

    hasInvalidParam = true;
    if (validVal === undefined) {
      redirectParams.delete(traitId);
    } else {
      redirectParams.set(traitId, validVal);
    }
  }

  if (!hasInvalidParam) return null;
  redirectParams.sort();
  const query = redirectParams.toString();
  return query ? `?${query}` : "";
}

// Private functions ------------------------------------------------

/**
 * A hidden filter's value doesn't change the content. The URL keeps any value
 * the filter offers, so it's there if the filter shows again, and gets the
 * default for any other.
 */
function hiddenFilterVal(
  filtersManifest: FiltersManifest,
  traitId: string,
  urlVal: string,
): string | undefined {
  const possibleVals = filtersManifest.filtersByTraitId[traitId]?.possibleVals;
  if (possibleVals?.includes(urlVal)) return urlVal;
  return filtersManifest.defaultValsByTraitId[traitId];
}
