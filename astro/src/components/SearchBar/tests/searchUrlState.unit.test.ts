// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import {
  readSearchQueryFromUrl,
  buildSearchUrl,
  writeSearchQueryParam,
} from "../searchUrlState";

afterEach(() => {
  window.history.replaceState(null, "", "/");
});

describe("readSearchQueryFromUrl", () => {
  it("returns the value when the param is present", () => {
    expect(readSearchQueryFromUrl("?s=RUM")).toBe("RUM");
  });

  it("returns an empty string when the param is absent", () => {
    expect(readSearchQueryFromUrl("?site=eu")).toBe("");
  });

  it("returns an empty string for an empty search string", () => {
    expect(readSearchQueryFromUrl("")).toBe("");
  });

  it("returns an empty string when the param is present but empty", () => {
    expect(readSearchQueryFromUrl("?s=")).toBe("");
  });

  it("decodes percent-encoded values", () => {
    expect(readSearchQueryFromUrl("?s=foo%20bar")).toBe("foo bar");
  });

  it("tolerates a search string without the leading question mark", () => {
    expect(readSearchQueryFromUrl("s=RUM")).toBe("RUM");
  });
});

describe("buildSearchUrl", () => {
  it("sets the param", () => {
    expect(buildSearchUrl("https://docs.test/api/", "RUM")).toBe(
      "https://docs.test/api/?s=RUM",
    );
  });

  it("removes the param for an empty query, leaving no bare question mark", () => {
    expect(buildSearchUrl("https://docs.test/api/?s=RUM", "")).toBe(
      "https://docs.test/api/",
    );
  });

  it("removes the param for a whitespace-only query", () => {
    expect(buildSearchUrl("https://docs.test/api/?s=RUM", "   ")).toBe(
      "https://docs.test/api/",
    );
  });

  it("preserves an unrelated param such as ?site=", () => {
    const url = new URL(
      buildSearchUrl("https://docs.test/api/?site=eu", "RUM"),
    );
    expect(url.searchParams.get("site")).toBe("eu");
    expect(url.searchParams.get("s")).toBe("RUM");
  });

  it("preserves unrelated params when clearing the query", () => {
    expect(buildSearchUrl("https://docs.test/api/?site=eu&s=RUM", "")).toBe(
      "https://docs.test/api/?site=eu",
    );
  });

  it("preserves the hash", () => {
    expect(buildSearchUrl("https://docs.test/api/#overview", "RUM")).toBe(
      "https://docs.test/api/?s=RUM#overview",
    );
  });

  it("overwrites an existing value", () => {
    expect(buildSearchUrl("https://docs.test/api/?s=old", "new")).toBe(
      "https://docs.test/api/?s=new",
    );
  });

  it("writes the trimmed query, matching Hugo's stateToRoute", () => {
    expect(buildSearchUrl("https://docs.test/api/", "  RUM  ")).toBe(
      "https://docs.test/api/?s=RUM",
    );
  });
});

describe("writeSearchQueryParam", () => {
  it("replaces the current entry rather than pushing a new one", () => {
    const lengthBefore = window.history.length;
    writeSearchQueryParam("RUM");
    expect(window.location.search).toBe("?s=RUM");
    expect(window.history.length).toBe(lengthBefore);
  });

  it("passes the existing history state through, for Astro's ClientRouter", () => {
    window.history.replaceState({ astro: "state" }, "", "/api/");
    writeSearchQueryParam("RUM");
    expect(window.history.state).toEqual({ astro: "state" });
  });

  it("drops the param, and the question mark, for an empty query", () => {
    window.history.replaceState(null, "", "/api/?s=RUM");
    writeSearchQueryParam("");
    expect(window.location.search).toBe("");
  });
});
