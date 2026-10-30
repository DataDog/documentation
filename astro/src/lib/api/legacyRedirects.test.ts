import { describe, it, expect } from "vitest";
import { LEGACY_REDIRECTS, legacyRedirectStaticPaths } from "./legacyRedirects";
import { DEFAULT_LOCALE, LOCALES } from "@lib/i18n/locale";

describe("LEGACY_REDIRECTS", () => {
  it("has no duplicate `from` entries", () => {
    const froms = LEGACY_REDIRECTS.map((r) => r.from);
    expect(new Set(froms).size).toBe(froms.length);
  });

  // `/api/` is a real page (`[...lang]/api/index.astro`), not a redirect stub,
  // so Hugo-to-Astro view transitions survive the jump to the API root.
  it("leaves the bare /api/ root to its own page", () => {
    expect(LEGACY_REDIRECTS.map((r) => r.from)).not.toContain("/api/");
  });
});

describe("legacyRedirectStaticPaths", () => {
  it("emits every redirect in every built locale", () => {
    expect(legacyRedirectStaticPaths()).toHaveLength(
      LOCALES.length * LEGACY_REDIRECTS.length,
    );
  });

  it("uses the empty `[...lang]` segment for English and a prefix for the rest", () => {
    const langs = new Set(
      legacyRedirectStaticPaths().map((entry) => entry.params.lang),
    );

    expect(langs).toContain(undefined);
    expect(langs).not.toContain(DEFAULT_LOCALE);
    for (const locale of LOCALES.filter((l) => l !== DEFAULT_LOCALE)) {
      expect(langs).toContain(locale);
    }
  });

  // The route lives at `[...lang]/api/[...legacyPath]`, so the param carries
  // only what follows `/api`.
  it("strips the /api prefix off the legacyPath param", () => {
    const english = legacyRedirectStaticPaths().filter(
      (entry) => entry.params.lang === undefined,
    );
    const paths = english.map((entry) => entry.params.legacyPath);

    expect(paths).toContain("screenboards");
    expect(paths).toContain("latest/downtimes/s");
    // Every param is a bare relative path, with no leading slash, no `api`
    // segment, and no trailing slash.
    for (const path of paths) {
      expect(path).toBeDefined();
      expect(path).not.toMatch(/^\/|^api\b|\/$/);
    }
  });

  it("carries each destination through as a prop", () => {
    const entry = legacyRedirectStaticPaths().find(
      (candidate) =>
        candidate.params.lang === "ja" &&
        candidate.params.legacyPath === "screenboards",
    );

    expect(entry?.props.to).toBe("/api/latest/dashboards/");
  });
});
