import { describe, it, expect } from "vitest";
import { LEGACY_REDIRECTS, legacyRedirectStaticPaths } from "./legacyRedirects";
import { DEFAULT_LOCALE, LOCALES } from "@lib/i18n/locale";

// Pinned from hugo/content/en/api/_index.md's cascade. If that file changes,
// update this table to match — the single redirect route under src/pages/
// generates itself from it, so no page file needs touching.
//
// Collision check: none of the four synthetic alias slugs (screenboards,
// ci-visibility, cloud-workload-security, service-scorecards) matches a tag
// name in hugo/data/api/{v1,v2}/full_spec.yaml as of this writing (verified
// manually — the test fixtures under tests/fixtures/api intentionally retain
// a legacy "Screenboards" tag for unrelated tests, so they aren't a reliable
// proxy for the live spec here).
const HUGO_CASCADE: Record<string, string> = {
  "/api/": "/api/latest/",
  "/api/screenboards/": "/api/latest/dashboards/",
  "/api/latest/downtimes/s": "/api/latest/downtimes/",
  "/api/latest/ci-visibility": "/api/latest/ci-visibility-pipelines/",
  "/api/latest/cloud-workload-security": "/api/latest/csm-threats/",
  "/api/latest/service-scorecards": "/api/latest/scorecards/",
};

describe("LEGACY_REDIRECTS", () => {
  it("matches Hugo's api/_index.md cascade exactly", () => {
    const table = Object.fromEntries(
      LEGACY_REDIRECTS.map(({ from, to }) => [from, to]),
    );
    expect(table).toEqual(HUGO_CASCADE);
  });

  it("has no duplicate `from` entries", () => {
    const froms = LEGACY_REDIRECTS.map((r) => r.from);
    expect(new Set(froms).size).toBe(froms.length);
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
  // only what follows `/api` — and nothing at all for the bare `/api/` root,
  // whose empty spread renders as `/api/` itself.
  it("strips the /api prefix off the legacyPath param", () => {
    const english = legacyRedirectStaticPaths().filter(
      (entry) => entry.params.lang === undefined,
    );
    const paths = english.map((entry) => entry.params.legacyPath);

    expect(paths).toContain(undefined);
    expect(paths).toContain("screenboards");
    expect(paths).toContain("latest/downtimes/s");
    // Only the `/api/` root is param-less; the rest must be bare relative
    // paths, with no leading slash, no `api` segment, and no trailing slash.
    for (const path of paths.filter((candidate) => candidate !== undefined)) {
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
