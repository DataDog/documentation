/**
 * Schema and cross-entry validation tests.
 *
 * These parse inline datasets directly rather than going through the module's
 * load-time parse, so a deliberately malformed case fails one test instead of
 * breaking every other test in the suite at import time.
 */
import { describe, expect, it } from "vitest";
import {
  SiteSupportFileSchema,
  assertKnownRegions,
  assertNoOverlappingPaths,
} from "./siteSupport";

const ok = {
  site_support_ids: {
    thing: { regions: ["gov"], url_paths: ["/a/**"] },
  },
};

describe("SiteSupportFileSchema", () => {
  it("accepts a minimal entry with only regions", () => {
    const parsed = SiteSupportFileSchema.parse({
      site_support_ids: { thing: { regions: ["gov"] } },
    });
    expect(parsed.site_support_ids.thing.url_paths).toEqual([]);
  });

  it("accepts url_paths and description", () => {
    const parsed = SiteSupportFileSchema.parse({
      site_support_ids: {
        thing: { regions: ["gov"], url_paths: ["/a/**"], description: "note" },
      },
    });
    expect(parsed.site_support_ids.thing.description).toBe("note");
  });

  it("rejects an entry with an empty regions list", () => {
    expect(() =>
      SiteSupportFileSchema.parse({
        site_support_ids: { thing: { regions: [] } },
      }),
    ).toThrow();
  });

  it("rejects a path that does not start with /", () => {
    expect(() =>
      SiteSupportFileSchema.parse({
        site_support_ids: { thing: { regions: ["gov"], url_paths: ["a/**"] } },
      }),
    ).toThrow(/start with/i);
  });

  it("rejects wildcards outside the * and ** subset", () => {
    for (const bad of ["/a/?", "/a/[abc]", "/a/{b,c}", "/a/!(b)", "/a/+(b)"]) {
      expect(
        () =>
          SiteSupportFileSchema.parse({
            site_support_ids: { thing: { regions: ["gov"], url_paths: [bad] } },
          }),
        `expected ${bad} to be rejected`,
      ).toThrow();
    }
  });

  it("accepts the * and ** wildcards", () => {
    for (const good of ["/a/*", "/a/**", "/a/*/b", "/a"]) {
      expect(
        () =>
          SiteSupportFileSchema.parse({
            site_support_ids: {
              thing: { regions: ["gov"], url_paths: [good] },
            },
          }),
        `expected ${good} to be accepted`,
      ).not.toThrow();
    }
  });
});

describe("assertKnownRegions", () => {
  it("passes for real region keys", () => {
    expect(() =>
      assertKnownRegions(SiteSupportFileSchema.parse(ok)),
    ).not.toThrow();
  });

  it("throws naming the unknown region and its key", () => {
    const bad = SiteSupportFileSchema.parse({
      site_support_ids: { thing: { regions: ["nope"] } },
    });
    expect(() => assertKnownRegions(bad)).toThrow(/thing.*nope|nope.*thing/);
  });
});

describe("assertNoOverlappingPaths", () => {
  it("passes for disjoint paths", () => {
    const fine = SiteSupportFileSchema.parse({
      site_support_ids: {
        a: { regions: ["gov"], url_paths: ["/a/**"] },
        b: { regions: ["gov"], url_paths: ["/b/**"] },
      },
    });
    expect(() => assertNoOverlappingPaths(fine)).not.toThrow();
  });

  it("throws when two keys claim the same path", () => {
    const clash = SiteSupportFileSchema.parse({
      site_support_ids: {
        a: { regions: ["gov"], url_paths: ["/same/**"] },
        b: { regions: ["gov2"], url_paths: ["/same/**"] },
      },
    });
    expect(() => assertNoOverlappingPaths(clash)).toThrow(/same/);
  });

  it("throws when one glob subsumes another key's path", () => {
    const clash = SiteSupportFileSchema.parse({
      site_support_ids: {
        broad: { regions: ["gov"], url_paths: ["/api/**"] },
        narrow: { regions: ["gov2"], url_paths: ["/api/latest/thing"] },
      },
    });
    expect(() => assertNoOverlappingPaths(clash)).toThrow();
  });
});
