/**
 * Write a record of trait values to a URL,
 * forwarding any non-trait params.
 *
 * @param p.url The URL to write to.
 * @param p.traitValsById A record of trait IDs to their values.
 *
 * @returns A new URL with the trait values written to the search params.
 */
export function writeTraitValsToUrl(p: {
  url: URL;
  traitValsById: Record<string, string>;
}): URL {
  const searchParams = p.url.searchParams;
  const updatedUrlParams: Record<string, string> = { ...p.traitValsById };

  // Forward any non-trait params
  searchParams.forEach((val, key) => {
    if (!(key in p.traitValsById)) {
      updatedUrlParams[key] = val;
    }
  });

  // Sort the search param keys
  const sortedKeys = Object.keys(updatedUrlParams).sort();

  // Update the URL
  const newUrl = new URL(p.url.origin + p.url.pathname);
  sortedKeys.forEach((key) => {
    newUrl.searchParams.set(key, updatedUrlParams[key]);
  });

  return newUrl;
}
