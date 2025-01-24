/**
 * Read the selected trait values from the URL.
 *
 * @param p.url The URL to read from.
 * @param p.traitIds The trait IDs to read from the URL, such as ['host', 'programming_language'].
 *
 * @returns A record of trait IDs to their values.
 */
export function getTraitValsFromUrl(p: {
  url: URL;
  traitIds: string[];
}): Record<string, string> {
  const searchParams = p.url.searchParams;

  const selectedValsByTraitId: Record<string, string> = {};
  searchParams.forEach((val, key) => {
    if (p.traitIds.includes(key)) {
      selectedValsByTraitId[key] = val;
    }
  });

  return selectedValsByTraitId;
}
