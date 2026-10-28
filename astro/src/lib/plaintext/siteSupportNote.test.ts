/**
 * Reads the frozen fixture, not real product data — `vitest.unit.config.ts`
 * redirects `@shared/site_support.yaml`.
 */
import { describe, expect, it } from "vitest";
import { siteSupportNoteNodes } from "./siteSupportNote";

describe("siteSupportNoteNodes", () => {
  it("returns a single callout node for an affected path", () => {
    const nodes = siteSupportNoteNodes("/fake/scoped/deep", "en");
    expect(nodes).toHaveLength(1);
    expect(nodes[0].tag).toBe("callout");
  });

  it("returns nothing for an unaffected path", () => {
    expect(siteSupportNoteNodes("/totally/unrelated", "en")).toEqual([]);
  });

  it("honors an explicit site_support_id over the path", () => {
    const nodes = siteSupportNoteNodes(
      "/totally/unrelated",
      "en",
      "fake_product",
    );
    expect(nodes).toHaveLength(1);
  });

  it("spreads cleanly into a node list when empty", () => {
    // The routes splice this in with `...`, so an empty result must not
    // introduce an undefined entry.
    const contents = [...siteSupportNoteNodes("/totally/unrelated", "en")];
    expect(contents).toEqual([]);
  });
});
