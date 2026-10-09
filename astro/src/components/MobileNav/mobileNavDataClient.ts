import type { MobileNavData } from "@lib/api/mobileNavData";

const requestsByUrl = new Map<string, Promise<MobileNavData>>();
const loadedDataByUrl = new Map<string, MobileNavData>();

/**
 * Fetch the mobile nav's operation links (see `mobileNavData.ts`). Every
 * caller for the same URL shares one request. A failed request is dropped from
 * the cache, so a later call retries.
 */
export function loadMobileNavData(url: string): Promise<MobileNavData> {
  const existingRequest = requestsByUrl.get(url);
  if (existingRequest) {
    return existingRequest;
  }

  const request = fetchMobileNavData(url).then(
    (data) => {
      loadedDataByUrl.set(url, data);
      return data;
    },
    (error: unknown) => {
      requestsByUrl.delete(url);
      throw error;
    },
  );
  requestsByUrl.set(url, request);
  return request;
}

/**
 * The data, if it has already arrived. Lets a click handler render
 * synchronously, before the `<details>` it's expanding opens.
 */
export function getLoadedMobileNavData(url: string): MobileNavData | undefined {
  return loadedDataByUrl.get(url);
}

async function fetchMobileNavData(url: string): Promise<MobileNavData> {
  const response = await fetch(url, { priority: "low" });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return (await response.json()) as MobileNavData;
}

/**
 * Reset the module-level cache. Exposed for testing only.
 */
export function _resetMobileNavDataCache(): void {
  requestsByUrl.clear();
  loadedDataByUrl.clear();
}
