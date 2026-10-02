/**
 * Smoke tests for the translation overlay loader. These exercise the real
 * overlay files rather than fixtures so the test catches schema drift if a
 * future overlay update changes the expected shape.
 *
 * Because that data is live, the live-data assertions check *shape* — a key
 * resolves, and resolves to genuinely translated text — never an exact phrase.
 * Upstream re-translates frequently (a translation drop rewrote the v1
 * `ListAPIKeys` summary), and pinning a string here only breaks the build for
 * a copy edit that is not this loader's concern.
 */

import { describe, it, expect } from "vitest";
import {
  getTranslationOverlay,
  translateTag,
  translateAction,
} from "./translationsLoader";

/**
 * Hiragana, katakana, or CJK ideographs. Presence of any proves the overlay
 * returned translated text rather than falling through to the English spec.
 */
const JAPANESE_SCRIPT = /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/;

describe("translation overlays", () => {
  it("returns an empty bundle for English", () => {
    const overlay = getTranslationOverlay("v1", "en");
    expect(Object.keys(overlay.tags).length).toBe(0);
    expect(Object.keys(overlay.actions).length).toBe(0);
  });

  it("loads the Japanese tag overlay for v1", () => {
    const overlay = getTranslationOverlay("v1", "ja");
    const name = overlay.tags["aws-integration"]?.name;
    expect(name).toEqual(expect.any(String));
    expect(name).toMatch(JAPANESE_SCRIPT);
  });

  it("loads the Japanese action overlay for v1", () => {
    const overlay = getTranslationOverlay("v1", "ja");
    const op = overlay.actions["ListAPIKeys"];
    expect(op?.summary).toEqual(expect.any(String));
    expect(op?.summary).toMatch(JAPANESE_SCRIPT);
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
