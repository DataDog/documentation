import { describe, it, expect } from "vitest";
import {
  buildSyncUrl,
  indexForKey,
  readSyncCookie,
  resolveSyncKey,
  serializeSyncCookie,
  syncKeyFromLabel,
} from "../tabSync";

describe("syncKeyFromLabel", () => {
  it.each([
    [".NET", "net"],
    ["Agent (Linux)", "agentlinux"],
    ["DD_EXTERNAL_ENV", "dd_external_env"],
    ["MySQL ≥ 5.7", "mysql57"],
    ["alpine--musl", "alpinemusl"],
  ])("%s → %s", (label, key) => {
    expect(syncKeyFromLabel(label)).toBe(key);
  });
});

describe("readSyncCookie", () => {
  it("finds the group's cookie among other cookies", () => {
    expect(
      readSyncCookie("code-lang", "site=us; code-lang=go; tab=linux"),
    ).toBe("go");
  });

  it("does not match a cookie whose name only ends with the group", () => {
    expect(readSyncCookie("tab", "mytab=linux")).toBeUndefined();
  });

  it("returns undefined for a malformed value", () => {
    expect(readSyncCookie("tab", "tab=%E0")).toBeUndefined();
  });

  it("returns undefined when the cookie is absent", () => {
    expect(readSyncCookie("tab", "site=us")).toBeUndefined();
  });
});

describe("resolveSyncKey", () => {
  it("prefers the query param over the cookie", () => {
    expect(
      resolveSyncKey({
        group: "code-lang",
        search: "?code-lang=go",
        cookieString: "code-lang=python",
      }),
    ).toEqual({ key: "go", source: "query" });
  });

  it("reads Hugo's legacy ?tabs= for the content tab group", () => {
    expect(
      resolveSyncKey({ group: "tab", search: "?tabs=macOS", cookieString: "" }),
    ).toEqual({ key: "macos", source: "query" });
  });

  it("ignores ?tabs= for other groups", () => {
    expect(
      resolveSyncKey({
        group: "code-lang",
        search: "?tabs=go",
        cookieString: "",
      }),
    ).toBeUndefined();
  });

  it("falls back to the cookie", () => {
    expect(
      resolveSyncKey({ group: "tab", search: "", cookieString: "tab=linux" }),
    ).toEqual({ key: "linux", source: "cookie" });
  });

  it("normalizes Hugo's hyphenated keys", () => {
    expect(
      resolveSyncKey({
        group: "tab",
        search: "?tab=alpine--musl",
        cookieString: "",
      }),
    ).toEqual({ key: "alpinemusl", source: "query" });
  });

  it("skips a query value that normalizes to nothing", () => {
    expect(
      resolveSyncKey({
        group: "tab",
        search: "?tab=---",
        cookieString: "tab=linux",
      }),
    ).toEqual({ key: "linux", source: "cookie" });
  });

  it("returns undefined with no query and no cookie", () => {
    expect(
      resolveSyncKey({ group: "tab", search: "", cookieString: "" }),
    ).toBeUndefined();
  });
});

describe("indexForKey", () => {
  it("returns the index of a known key", () => {
    expect(indexForKey(["curl", "python", "go"], "go")).toBe(2);
  });

  it("returns the first tab for an unknown key", () => {
    expect(indexForKey(["curl", "python"], "pythonlegacy")).toBe(0);
  });
});

describe("serializeSyncCookie", () => {
  it("is a site-wide session cookie", () => {
    expect(serializeSyncCookie("code-lang", "go")).toBe(
      "code-lang=go; path=/; SameSite=Lax",
    );
  });
});

describe("buildSyncUrl", () => {
  it("sets the param and keeps other params and the hash", () => {
    expect(
      buildSyncUrl("https://x.test/api/?site=eu#op-v1", "code-lang", "go"),
    ).toBe("https://x.test/api/?site=eu&code-lang=go#op-v1");
  });

  it("replaces Hugo's legacy ?tabs= for the content tab group", () => {
    expect(buildSyncUrl("https://x.test/p/?tabs=linux", "tab", "macos")).toBe(
      "https://x.test/p/?tab=macos",
    );
  });
});
