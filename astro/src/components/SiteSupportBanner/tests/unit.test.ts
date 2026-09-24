/**
 * The banner renders one hidden element per unsupported region. Which one the
 * reader sees is decided entirely by CSS generated in BaseLayout, keyed on
 * `html[data-active-region]` — so the server has no "selected region" and must
 * emit every variant. See `src/layouts/regionVisibility.unit.test.ts` for the
 * reveal rules themselves.
 *
 * These tests read the frozen fixture, not real product data:
 * `vitest.unit.config.ts` redirects `@shared/site_support.yaml`.
 */
import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import SiteSupportBanner from "../SiteSupportBanner.astro";
import { datacenterLabel } from "@config/regions";

async function render(props: {
  pathname: string;
  siteSupportId?: string;
}): Promise<string> {
  const container = await AstroContainer.create();
  return container.renderToString(SiteSupportBanner, { props });
}

describe("SiteSupportBanner", () => {
  it("renders nothing for a page with no unsupported regions", async () => {
    const html = await render({ pathname: "/totally/unrelated" });
    expect(html.trim()).toBe("");
  });

  it("renders one element per unsupported region", async () => {
    const html = await render({
      pathname: "/anything",
      siteSupportId: "fake_product",
    });
    expect(html).toContain(`data-region="gov"`);
    expect(html).toContain(`data-region="gov2"`);
  });

  it("resolves by url_paths when no site_support_id is given", async () => {
    const html = await render({ pathname: "/fake/scoped/deep/page" });
    expect(html).toContain(`data-region="gov"`);
    expect(html).not.toContain(`data-region="gov2"`);
  });

  it("marks the banner as non-snippetable", async () => {
    // Search engines must not surface a site-specific caution as the page's
    // summary, since it only applies to some readers.
    const html = await render({ pathname: "/fake/single" });
    expect(html).toContain("data-nosnippet");
  });

  it("uses the danger alert level", async () => {
    const html = await render({ pathname: "/fake/single" });
    expect(html).toContain("alert--danger");
  });

  it("carries the stable BEM block class", async () => {
    const html = await render({ pathname: "/fake/single" });
    expect(html).toContain("site-support-banner");
  });

  it("names the datacenter in each region's variant", async () => {
    const html = await render({
      pathname: "/anything",
      siteSupportId: "fake_product",
    });
    for (const key of ["gov", "gov2"]) {
      expect(html, `no label for ${key}`).toContain(datacenterLabel(key));
    }
  });

  it("emits the region elements in weight order", async () => {
    const html = await render({
      pathname: "/anything",
      siteSupportId: "fake_product",
    });
    expect(html.indexOf(`data-region="gov"`)).toBeLessThan(
      html.indexOf(`data-region="gov2"`),
    );
  });
});
