/**
 * Plaintext twin tests for the site-support banner.
 *
 * The `.md` output departs from the HTML in one way on purpose: it names the
 * unsupported sites by host, in a single block, because a `.md` reader has no
 * region switcher and so has no "selected site". The tag and that shape match
 * what `html-to-mdoc` already emits for Hugo's banners
 * (corp-node-packages `html-to-mdoc` → `ddSites/siteRegion.ts`).
 */
import { describe, it, expect } from "vitest";
import { buildMarkdocStr } from "@lib/plaintext/helpers";
import { getAllowedRegions, appHost } from "@config/regions";
import { siteSupportNode } from "../SiteSupportBanner";

function render(regionKeys: string[]): string {
  const node = siteSupportNode(regionKeys, "en");
  return node ? buildMarkdocStr([node]) : "";
}

describe("siteSupportNode", () => {
  it("emits nothing for an empty region list", () => {
    expect(siteSupportNode([], "en")).toBeUndefined();
  });

  it("lists every unsupported site in one callout", () => {
    const result = render(["gov", "gov2"]);
    expect(result).toContain("{% callout %}");
    expect(result).toContain("{% /callout %}");
    // One block, not one per site.
    expect(result.match(/\{% callout %\}/g)).toHaveLength(1);
  });

  it("names sites by host, not by region key", () => {
    const result = render(["gov", "gov2"]);
    expect(result).toContain(appHost("gov"));
    expect(result).toContain(appHost("gov2"));
    expect(result).not.toContain("gov2,");
  });

  it("lists sites in the order given, comma separated", () => {
    const result = render(["gov", "gov2"]);
    expect(result).toContain(`${appHost("gov")}, ${appHost("gov2")}`);
  });

  it("puts the sentence in a paragraph with no heading node", () => {
    const node = siteSupportNode(["gov"], "en");
    const types = node!.children.map((child) => child.type);
    expect(types).toEqual(["paragraph"]);
  });

  it("uses the shared translation string", () => {
    expect(render(["gov"])).toContain(
      "This product or feature is not supported for the following sites:",
    );
  });

  it("resolves a non-empty host for every allowed region", () => {
    // Guards against a new region landing without an app host, which would
    // render an empty site name rather than fail.
    for (const region of getAllowedRegions()) {
      expect(appHost(region.key), region.key).toBeTruthy();
    }
  });

  it("falls back to English for a locale with no translation yet", () => {
    // `site_support_banner_plaintext` is Astro-invented and has no Hugo
    // original, so only `en` is populated. `i18n` falls back to English rather
    // than emitting the raw key, which is the required behavior until
    // authoritative translations land.
    const node = siteSupportNode(["gov"], "fr");
    const french = buildMarkdocStr([node!]);
    expect(french).toBe(render(["gov"]));
    expect(french).not.toContain("site_support_banner_plaintext");
  });

  it("throws on a region key that is not a real region", () => {
    expect(() => siteSupportNode(["nope"], "en")).toThrow(/nope/);
  });
});
