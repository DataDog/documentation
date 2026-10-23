import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import StickyBarHeight from "../StickyBarHeight.astro";

describe("StickyBarHeight", () => {
  // The height must be set before the browser jumps to a URL's anchor. Only
  // an inline script, placed after the bar, runs that early; a bundled
  // module script is deferred until after the jump.
  it("renders an inline script, not a bundled module", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(StickyBarHeight, {
      props: { selector: ".api-toolbar" },
    });

    expect(html).toMatch(/<script(?![^>]*type="module")[^>]*>/);
    expect(html).not.toMatch(/<script[^>]*\ssrc=/);
    expect(html).toContain(".api-toolbar");
    expect(html).toContain("--sticky-bar-content-height");
  });
});
