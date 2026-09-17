/**
 * Resolver unit tests.
 *
 * These read the frozen fixture at `tests/fixtures/siteSupport/site_support.yaml`,
 * not the real `shared/site_support.yaml` — `vitest.unit.config.ts` redirects
 * the import. The fixture's keys are invented, so nothing here breaks when a
 * real product key is added, renamed or deleted.
 */
import { describe, expect, it } from "vitest";
import { getUnsupportedRegions } from "./siteSupport";

describe("getUnsupportedRegions", () => {
  describe("frontmatter site_support_id", () => {
    it("returns the entry's regions", () => {
      expect(getUnsupportedRegions("/anything", "fake_product")).toEqual([
        "gov",
        "gov2",
      ]);
    });

    it("wins over a url_paths match on the same page", () => {
      // The path matches `fake_scoped` (gov), but the frontmatter names
      // `fake_product` (gov, gov2). Frontmatter is tier 1.
      expect(
        getUnsupportedRegions("/fake/scoped/thing", "fake_product"),
      ).toEqual(["gov", "gov2"]);
    });

    it("throws on an ID absent from the dataset", () => {
      expect(() => getUnsupportedRegions("/anything", "no_such_id")).toThrow(
        /no_such_id/,
      );
    });
  });

  describe("url_paths globs", () => {
    it("matches descendants under a ** pattern", () => {
      expect(getUnsupportedRegions("/fake/scoped/deep/page")).toEqual(["gov"]);
    });

    it("matches an exact path with no wildcard", () => {
      expect(getUnsupportedRegions("/fake/single")).toEqual(["gov2"]);
    });

    it("does not match a sibling path that shares a prefix", () => {
      expect(getUnsupportedRegions("/fake/scopedother")).toEqual([]);
    });

    it("returns [] for a page matching nothing", () => {
      expect(getUnsupportedRegions("/totally/unrelated")).toEqual([]);
    });
  });

  describe("locale prefixes", () => {
    it("resolves a prefixed path identically to an unprefixed one", () => {
      for (const lang of ["fr", "es", "ja", "ko"]) {
        expect(getUnsupportedRegions(`/${lang}/fake/scoped/deep`)).toEqual([
          "gov",
        ]);
      }
    });

    it("does not treat a non-locale first segment as a prefix", () => {
      expect(getUnsupportedRegions("/fake/scoped/deep")).toEqual(["gov"]);
    });
  });

  describe("region ordering", () => {
    it("returns regions in weight order, not dataset order", () => {
      // `gov` has a lower weight than `gov2`, so it comes first regardless of
      // how the YAML happens to list them.
      const regions = getUnsupportedRegions("/anything", "fake_product");
      expect(regions).toEqual(["gov", "gov2"]);
    });
  });
});
