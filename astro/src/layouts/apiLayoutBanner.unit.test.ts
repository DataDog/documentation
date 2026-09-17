/**
 * Placement test for the site-support banner in the API column.
 *
 * Hugo renders its banner inside the main content container, below the
 * breadcrumb row and above the page's `<h1>`. The banner first went into
 * `BaseLayout` here, which sits above the layout that creates the content
 * column, so it spanned the full page width above the side nav. These tests
 * pin the corrected position: inside `.api-main`, after the toolbar and before
 * `.prose`.
 */
import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import preactRenderer from "@astrojs/preact/server.js";
import ApiLayout from "./ApiLayout.astro";
import { getUnsupportedRegions } from "@config/siteSupport";

// A path the test-only `dd_e2e` fixture entry marks unsupported, so the banner
// renders without naming a real production key.
const BANNER_PATH = "/dd_e2e/components/site-support-banner";
const NO_BANNER_PATH = "/api/latest/fake-unmatched-path";

async function render(pathname: string): Promise<string> {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container.renderToString(ApiLayout, {
    props: { title: "Test page", categories: [] },
    request: new Request(`https://docs.example.com${pathname}`),
  });
}

describe("ApiLayout site-support banner", () => {
  it("renders one banner variant per unsupported region", async () => {
    const regions = getUnsupportedRegions(BANNER_PATH);
    expect(regions.length, "fixture entry resolved no regions").toBeGreaterThan(
      0,
    );

    const html = await render(BANNER_PATH);
    for (const regionKey of regions) {
      expect(html, `no banner variant for "${regionKey}"`).toContain(
        `data-region="${regionKey}"`,
      );
    }
  });

  it("places the banner after the toolbar and before .prose", async () => {
    const html = await render(BANNER_PATH);
    // Anchor on the opening tag, not the class name: the scoped `<style>`
    // block at the end of the document also contains `api-toolbar`.
    const toolbarIndex = html.indexOf('class="api-toolbar"');
    const bannerIndex = html.indexOf('class="site-support-banner');
    const proseIndex = html.indexOf('class="prose"');

    expect(toolbarIndex).toBeGreaterThan(-1);
    expect(bannerIndex).toBeGreaterThan(-1);
    expect(proseIndex).toBeGreaterThan(-1);
    // The order in the markup is what keeps the banner inside the content
    // column, below the breadcrumb, matching Hugo.
    expect(bannerIndex).toBeGreaterThan(toolbarIndex);
    expect(bannerIndex).toBeLessThan(proseIndex);
  });

  it("renders the banner outside .prose", async () => {
    // `.prose h1:first-child` carries the heading's top margin. A banner
    // inside `.prose` would take that margin instead, but only on the pages
    // that have a banner.
    const html = await render(BANNER_PATH);
    const proseIndex = html.indexOf('class="prose"');
    expect(html.indexOf('class="site-support-banner')).toBeLessThan(proseIndex);
  });

  it("renders no banner for a supported path", async () => {
    expect(getUnsupportedRegions(NO_BANNER_PATH)).toEqual([]);
    const html = await render(NO_BANNER_PATH);
    expect(html).not.toContain('class="site-support-banner');
  });
});
