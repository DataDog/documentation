/**
 * Server-readable cookie storage for cdocs filter preferences.
 *
 * Unlike Hugo's client-side localStorage (`CdocsClientStorage`), preferences
 * live in a cookie so the server can read them at render time and resolve
 * filters with no session store, database, or auth.
 *
 * Preferences are keyed by *trait* (for example `os: linux`), not by page, so
 * the cookie does not grow as the user visits more pages. Each entry carries a
 * timestamp, and once the number of stored traits exceeds `MAX_TRAITS`, the
 * oldest-set entries are dropped — mirroring `CdocsClientStorage`'s eviction.
 */

export const COOKIE_NAME = 'cdocs_prefs';

/** Cap on distinct traits kept in the cookie (matches the localStorage cap). */
export const MAX_TRAITS = 15;

interface StoredEntry {
  value: string;
  timestamp: number;
}

type Storage = Record<string, StoredEntry>;

function parseStorage(raw: string | undefined): Storage {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

/** Read the current trait values from the raw cookie string, keyed by trait id. */
export function readPrefs(raw: string | undefined): Record<string, string> {
  const storage = parseStorage(raw);
  const values: Record<string, string> = {};
  for (const [traitId, entry] of Object.entries(storage)) {
    if (entry && typeof entry.value === 'string') values[traitId] = entry.value;
  }
  return values;
}

/**
 * Upsert the given trait values into the cookie storage, evicting the
 * oldest-set entries if the trait count exceeds the cap. Returns the new raw
 * cookie string to persist.
 */
export function writePrefs(
  raw: string | undefined,
  updates: Record<string, string>,
  now: number,
): string {
  const storage = parseStorage(raw);

  for (const [traitId, value] of Object.entries(updates)) {
    storage[traitId] = { value, timestamp: now };
  }

  const traitIds = Object.keys(storage);
  if (traitIds.length > MAX_TRAITS) {
    traitIds.sort((a, b) => storage[a].timestamp - storage[b].timestamp);
    while (traitIds.length > MAX_TRAITS) {
      delete storage[traitIds.shift()!];
    }
  }

  return JSON.stringify(storage);
}
