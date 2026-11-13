/**
 * The real translation overlays staged by `yarn fetch:spec` must load and
 * match the overlay schemas.
 *
 * This lives in `tests/integration/` because the unit config redirects the
 * overlays to a frozen fixture. It checks shape only, never exact phrases:
 * upstream re-translates often, and a copy edit is not this loader's concern.
 */
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { getTranslationOverlay } from "@lib/api/translationsLoader";
import { ApiVersionSchema } from "@lib/api/schemas/version";
import {
  ActionTranslationSchema,
  TagTranslationSchema,
} from "@lib/api/schemas/translation";

/**
 * Hiragana, katakana, or CJK ideographs. Presence of any proves the overlay
 * returned translated text rather than falling through to the English spec.
 */
const JAPANESE_SCRIPT = /[぀-ゟ゠-ヿ一-龯]/;

describe.each(ApiVersionSchema.options)("%s Japanese overlays", (version) => {
  const overlay = getTranslationOverlay(version, "ja");

  it("reads real data, not the unit-test fixture", () => {
    expect(Object.keys(overlay.tags).length).toBeGreaterThan(2);
    expect(Object.keys(overlay.actions).length).toBeGreaterThan(1);
  });

  it("matches the overlay schemas", () => {
    z.record(z.string(), TagTranslationSchema).parse(overlay.tags);
    z.record(z.string(), ActionTranslationSchema).parse(overlay.actions);
  });

  it("holds translated text", () => {
    const tagNames = Object.values(overlay.tags).map((tag) => tag.name ?? "");
    const summaries = Object.values(overlay.actions).map(
      (action) => action.summary ?? "",
    );
    expect(tagNames.some((name) => JAPANESE_SCRIPT.test(name))).toBe(true);
    expect(summaries.some((summary) => JAPANESE_SCRIPT.test(summary))).toBe(
      true,
    );
  });
});
