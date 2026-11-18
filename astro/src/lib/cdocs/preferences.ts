/**
 * The reader's Cdocs filter preferences, kept in localStorage in the same
 * format as Hugo (`CdocsClientStorage` in cdocs-data), so preferences carry
 * over between the two sites.
 *
 * The stored value is a JSON object keyed by trait ID, where each entry is
 * `{ value, timestamp }`. Past `MAX_STORED_TRAITS`, the oldest-set traits are
 * removed first.
 *
 * Not `CdocsClientStorage` itself, because it throws when storage is blocked
 * (and rejects a promise nobody awaits when a write fails). Every read and
 * write here fails quietly, so the page works without storage.
 */

/** Hugo's key. Changing it stops preferences carrying over between sites. */
export const PREFERENCES_STORAGE_KEY = "datadog-docs-content-filters";

/** Hugo's limit. */
export const MAX_STORED_TRAITS = 20;

interface StoredPreference {
  value: string;
  timestamp: number;
}

type StoredPreferences = Record<string, StoredPreference>;

/** The stored value of each trait, keyed by trait ID. */
export function readPreferences(): Record<string, string> {
  const valsByTraitId: Record<string, string> = {};
  for (const [traitId, preference] of Object.entries(readStoredPreferences())) {
    valsByTraitId[traitId] = preference.value;
  }
  return valsByTraitId;
}

/**
 * Store the given trait values. Traits not given are kept, unless the limit
 * removes them.
 */
export function writePreferences(
  valsByTraitId: Record<string, string>,
  now: number = Date.now(),
): void {
  const storedPreferences = readStoredPreferences();
  for (const [traitId, value] of Object.entries(valsByTraitId)) {
    storedPreferences[traitId] = { value, timestamp: now };
  }

  try {
    localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify(removeOldestPastLimit(storedPreferences)),
    );
  } catch {
    // Storage is blocked or full. Preferences just aren't saved.
  }
}

// Private functions ------------------------------------------------

/** Stored entries in Hugo's format. Anything else is ignored. */
function readStoredPreferences(): StoredPreferences {
  let parsed: unknown;
  try {
    parsed = JSON.parse(localStorage.getItem(PREFERENCES_STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
  if (!parsed || typeof parsed !== "object") return {};

  const storedPreferences: StoredPreferences = {};
  for (const [traitId, entry] of Object.entries(parsed)) {
    if (isStoredPreference(entry)) storedPreferences[traitId] = entry;
  }
  return storedPreferences;
}

function isStoredPreference(entry: unknown): entry is StoredPreference {
  return (
    typeof entry === "object" &&
    entry !== null &&
    typeof (entry as StoredPreference).value === "string" &&
    typeof (entry as StoredPreference).timestamp === "number"
  );
}

function removeOldestPastLimit(
  storedPreferences: StoredPreferences,
): StoredPreferences {
  const traitIdsNewestFirst = Object.keys(storedPreferences).sort(
    (traitIdA, traitIdB) =>
      storedPreferences[traitIdB].timestamp -
      storedPreferences[traitIdA].timestamp,
  );
  const keptPreferences: StoredPreferences = {};
  for (const traitId of traitIdsNewestFirst.slice(0, MAX_STORED_TRAITS)) {
    keptPreferences[traitId] = storedPreferences[traitId];
  }
  return keptPreferences;
}
