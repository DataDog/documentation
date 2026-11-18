// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { CdocsClientStorage } from "cdocs-data/CdocsClientStorage";
import {
  MAX_STORED_TRAITS,
  PREFERENCES_STORAGE_KEY,
  readPreferences,
  writePreferences,
} from "./preferences";

// How Hugo's filters manager opens its storage.
const openHugoStorage = () =>
  new CdocsClientStorage({
    topLevelKey: "datadog-docs-content-filters",
    maxKeyCount: 20,
  });

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("preferences", () => {
  it("uses Hugo's storage key and trait limit", () => {
    expect(PREFERENCES_STORAGE_KEY).toBe("datadog-docs-content-filters");
    expect(MAX_STORED_TRAITS).toBe(20);
  });

  it("reads nothing when nothing is stored", () => {
    expect(readPreferences()).toEqual({});
  });

  it("stores each trait as { value, timestamp }", () => {
    writePreferences({ os: "linux" }, 1000);

    expect(JSON.parse(localStorage.getItem(PREFERENCES_STORAGE_KEY)!)).toEqual({
      os: { value: "linux", timestamp: 1000 },
    });
  });

  it("keeps traits it isn't writing", () => {
    writePreferences({ os: "linux" }, 1000);
    writePreferences({ prog_lang: "python" }, 2000);

    expect(readPreferences()).toEqual({ os: "linux", prog_lang: "python" });
  });

  it("removes the oldest-set traits past the limit", () => {
    for (let index = 0; index < MAX_STORED_TRAITS; index++) {
      writePreferences({ [`trait_${index}`]: "value" }, 1000 + index);
    }
    writePreferences({ newest: "value" }, 5000);

    const traitIds = Object.keys(readPreferences());
    expect(traitIds).toHaveLength(MAX_STORED_TRAITS);
    expect(traitIds).not.toContain("trait_0");
    expect(traitIds).toContain("trait_1");
    expect(traitIds).toContain("newest");
  });

  it("reads preferences that Hugo saved", () => {
    openHugoStorage().setTraitVals({ os: "windows", prog_lang: "go" });

    expect(readPreferences()).toEqual({ os: "windows", prog_lang: "go" });
  });

  it("saves preferences that Hugo can read", () => {
    writePreferences({ os: "windows", prog_lang: "go" });

    expect(openHugoStorage().getTraitVals()).toEqual({
      os: "windows",
      prog_lang: "go",
    });
  });

  it("ignores stored data that isn't in Hugo's format", () => {
    localStorage.setItem(PREFERENCES_STORAGE_KEY, "not json");
    expect(readPreferences()).toEqual({});

    localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify({ os: "linux", prog_lang: { value: "go", timestamp: 1 } }),
    );
    expect(readPreferences()).toEqual({ prog_lang: "go" });
  });

  it("works without storage access", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    expect(readPreferences()).toEqual({});
    expect(() => writePreferences({ os: "linux" })).not.toThrow();
  });
});
