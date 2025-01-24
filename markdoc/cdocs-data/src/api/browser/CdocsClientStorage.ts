/**
 * A wrapper for local storage that stores trait values,
 * ensuring that the number of stored keys does not exceed
 * a maximum value.
 */
export class CdocsClientStorage {
  private topLevelKey: string;
  private maxKeyCount: number;
  private storage: Record<string, { value: any; timestamp: number }>;

  /**
   * Create a new instance of CdocsClientStorage, resuming
   * any previous sessions by loading any existing trait values
   * from local storage.
   *
   * @param p.topLevelKey A unique key under which all cdocs data
   * will be kept in local storage, such as 'cdocs-client-storage'.
   *
   * @param p.maxKeyCount The maximum number of keys that should be stored
   * in the user's browser at one time.
   */
  constructor(p: { topLevelKey: string; maxKeyCount: number }) {
    this.topLevelKey = p.topLevelKey;
    this.maxKeyCount = p.maxKeyCount;
    this.storage = {};

    // If any data is available from a previous session,
    // load it into memory
    this.loadLocalStorageData();
  }

  /**
   * Get the value of all traits, keyed by trait ID.
   *
   * @returns A record of trait IDs to their values,
   * such as { 'os': 'linux' }.
   */
  getTraitVals() {
    const entries: Record<string, string> = {};

    for (const key in this.storage) {
      entries[key] = this.storage[key].value;
    }

    return entries;
  }

  /**
   * Update the value of one or more traits.
   * Any trait IDs not provided will be left unchanged.
   *
   * @param entries A record of trait IDs to their updated values.
   *
   * @returns A record of all known trait IDs to their values,
   * regardless of whether they were updated in this batch.
   */
  setTraitVals(entries: Record<string, string>) {
    for (const key in entries) {
      this.storage[key] = { value: entries[key], timestamp: Date.now() };
    }

    // Remove oldest entries if storage has too many
    if (Object.keys(this.storage).length > this.maxKeyCount) {
      const sortedKeys = Object.keys(this.storage).sort(
        (a, b) => this.storage[a].timestamp - this.storage[b].timestamp,
      );

      while (sortedKeys.length > this.maxKeyCount) {
        delete this.storage[sortedKeys.shift()!];
      }
    }

    this.writeToLocalStorage();
    return this.getTraitVals();
  }

  /**
   * Asynchronously write the current storage to local storage,
   * so it can be accessed in future sessions.
   */
  async writeToLocalStorage() {
    localStorage.setItem(this.topLevelKey, JSON.stringify(this.storage));
  }

  /**
   * Overwrite the in-memory storage with
   * whatever is in local storage.
   */
  loadLocalStorageData() {
    const data = localStorage.getItem(this.topLevelKey);

    if (data) {
      this.storage = JSON.parse(data);
    }
  }

  /**
   * Erase all stored trait values, but keep the top-level key.
   */
  clear() {
    this.storage = {};
    this.writeToLocalStorage();
  }

  /**
   * Erase all browser data stored by this class.
   */
  destroy() {
    this.storage = {};
    localStorage.removeItem(this.topLevelKey);
  }
}
