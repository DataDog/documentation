import { describe, it, expect } from "vitest";
import config from "../../markdoc.config.mjs";

describe("Markdoc tag names", () => {
  // @astrojs/markdoc turns each tag name into an import identifier by
  // replacing only the first "-" with "_". A name with two hyphens, such as
  // "region-keys-table", becomes `Tagregion_keys-table`, which is invalid
  // JavaScript, so every page that uses the tag fails to compile.
  it("have at most one hyphen", () => {
    const tagNamesWithManyHyphens = Object.keys(config.tags ?? {}).filter(
      (tagName) => (tagName.match(/-/g) ?? []).length > 1,
    );

    expect(tagNamesWithManyHyphens).toEqual([]);
  });
});
