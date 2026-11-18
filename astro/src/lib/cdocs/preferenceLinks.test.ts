import { describe, it, expect } from "vitest";
import { addPreferencesToHref } from "./preferenceLinks";
import type { CdocsTraitsList } from "./cdocsPages";

const traitsList: CdocsTraitsList = {
  traits: ["api_type", "os", "prog_lang"],
  pages: {
    "tracing/setup": [1, 2],
    "tracing/api": [0],
  },
};

const pageUrl = "https://docs.example.com/guides/current/";

function addPreferences(
  href: string,
  preferences: Record<string, string> = { os: "linux", prog_lang: "python" },
  pathPrefix = "",
) {
  return addPreferencesToHref({
    href,
    pageUrl,
    traitsList,
    preferences,
    pathPrefix,
  });
}

describe("addPreferencesToHref", () => {
  it("adds the stored preferences a bare Cdocs link accepts, alphabetically", () => {
    expect(addPreferences("/tracing/setup/")).toBe(
      "/tracing/setup/?os=linux&prog_lang=python",
    );
  });

  it("leaves out preferences the page doesn't accept", () => {
    expect(
      addPreferences("/tracing/api/", { os: "linux", api_type: "dd_api" }),
    ).toBe("/tracing/api/?api_type=dd_api");
  });

  it("doesn't change params already on the link", () => {
    expect(addPreferences("/tracing/setup/?os=windows")).toBe(
      "/tracing/setup/?os=windows&prog_lang=python",
    );
  });

  it("keeps params that aren't traits, and the fragment", () => {
    expect(addPreferences("/tracing/setup/?tab=1#install")).toBe(
      "/tracing/setup/?os=linux&prog_lang=python&tab=1#install",
    );
  });

  it("matches the page with or without a trailing slash", () => {
    expect(addPreferences("/tracing/setup")).toBe(
      "/tracing/setup?os=linux&prog_lang=python",
    );
  });

  it("resolves relative links against the page URL", () => {
    expect(addPreferences("../../tracing/setup/")).toBe(
      "/tracing/setup/?os=linux&prog_lang=python",
    );
  });

  it("matches pages under the deploy path prefix", () => {
    expect(
      addPreferences("/my-branch/tracing/setup/", undefined, "/my-branch"),
    ).toBe("/my-branch/tracing/setup/?os=linux&prog_lang=python");
  });

  it("leaves links to pages that aren't Cdocs pages alone", () => {
    expect(addPreferences("/tracing/other/")).toBeNull();
  });

  it("leaves links to other sites alone", () => {
    expect(addPreferences("https://example.org/tracing/setup/")).toBeNull();
  });

  it("leaves the link alone when there's nothing to add", () => {
    expect(addPreferences("/tracing/setup/", {})).toBeNull();
    expect(
      addPreferences("/tracing/setup/?os=windows&prog_lang=go"),
    ).toBeNull();
  });

  it("leaves links that aren't web URLs alone", () => {
    expect(addPreferences("mailto:docs@example.com")).toBeNull();
    expect(addPreferences("#install")).toBeNull();
  });
});
