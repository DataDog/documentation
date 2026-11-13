/**
 * Tests for the translation overlay loader. These run against the frozen
 * overlays in `tests/fixtures/api/{v1,v2}/translate_*.json` (wired by
 * `vitest.unit.config.ts`), so exact strings are safe to pin. The check that
 * the live overlays still load lives in
 * `tests/integration/translationsLoader.live.test.ts`.
 */

import { describe, it, expect } from "vitest";
import {
  getTranslationOverlay,
  translateTag,
  translateAction,
} from "./translationsLoader";

describe("translation overlays", () => {
  it("returns an empty bundle for English", () => {
    const overlay = getTranslationOverlay("v1", "en");
    expect(Object.keys(overlay.tags).length).toBe(0);
    expect(Object.keys(overlay.actions).length).toBe(0);
  });

  it("reads the fixture overlays, not the live ones", () => {
    // Guards against the redirect in `vitest.unit.config.ts` going missing,
    // which would silently put every assertion below back on live data.
    const overlay = getTranslationOverlay("v1", "ja");
    expect(Object.keys(overlay.tags)).toEqual([
      "aws-integration",
      "dashboards",
    ]);
    expect(Object.keys(overlay.actions)).toEqual(["ListDashboards"]);
  });

  it("loads the Japanese tag overlay for v1", () => {
    const overlay = getTranslationOverlay("v1", "ja");
    expect(overlay.tags["aws-integration"]?.name).toBe(
      "AWS インテグレーション",
    );
  });

  it("loads the Japanese action overlay for v1", () => {
    const overlay = getTranslationOverlay("v1", "ja");
    expect(overlay.actions["ListDashboards"]?.summary).toBe(
      "すべてのダッシュボードを取得する",
    );
  });

  it("keeps each version's overlay separate", () => {
    expect(getTranslationOverlay("v2", "fr").tags["incidents"]?.name).toBe(
      "Incidents",
    );
    expect(getTranslationOverlay("v2", "ja").tags).toEqual({});
  });

  // `zz` is reserved for private use in ISO 3166 and is never a real content
  // locale, so no upstream translation drop can ever add these files.
  it("returns empty overlays when no file exists for the locale", () => {
    const overlay = getTranslationOverlay("v1", "zz");
    expect(Object.keys(overlay.actions).length).toBe(0);
    expect(Object.keys(overlay.tags).length).toBe(0);
  });

  it("populates tags independently of actions, so one missing file does not blank the other", () => {
    // Guards the per-file resolution in getTranslationOverlay: `tags` and
    // `actions` are matched in separate loops, so a locale with only one of
    // the two files must still return the file it has.
    const tagsOnly = {
      tags: { "aws-integration": { name: "Translated" } },
      actions: {},
    };
    expect(
      translateTag(tagsOnly, "aws-integration", { name: "Spec" }).name,
    ).toBe("Translated");
    expect(translateAction(tagsOnly, "ListAPIKeys")).toEqual({});
  });

  it("translateTag falls back to the spec values when the slug is missing", () => {
    const overlay = getTranslationOverlay("v1", "ja");
    const result = translateTag(overlay, "this-slug-does-not-exist", {
      name: "Some Spec Name",
      description: "Some spec description",
    });
    expect(result).toEqual({
      name: "Some Spec Name",
      description: "Some spec description",
    });
  });

  it("translateTag merges translated and fallback values per-field", () => {
    // Build a synthetic overlay where description is missing — should fall back.
    const partialOverlay = {
      tags: { foo: { name: "Translated Name" } },
      actions: {},
    };
    const result = translateTag(partialOverlay, "foo", {
      name: "Spec Name",
      description: "Spec Description",
    });
    expect(result.name).toBe("Translated Name");
    expect(result.description).toBe("Spec Description");
  });

  it("translateAction returns an empty object for unknown operation IDs", () => {
    const overlay = getTranslationOverlay("v1", "ja");
    expect(translateAction(overlay, "NoSuchOperation")).toEqual({});
  });

  it("caches per (version, locale)", () => {
    const a = getTranslationOverlay("v2", "fr");
    const b = getTranslationOverlay("v2", "fr");
    expect(a).toBe(b);
  });
});
