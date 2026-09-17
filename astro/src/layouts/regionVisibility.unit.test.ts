/**
 * The pre-paint allow-list and the per-region CSS in BaseLayout are both
 * derived from `shared/regions.yaml`. Both used to be hardcoded, and both had
 * drifted — each was missing UK1 and US2-FED. These tests fail if either
 * drifts again.
 */
import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import preactRenderer from "@astrojs/preact/server.js";
import BaseLayout from "./BaseLayout.astro";
import { getAllowedRegions } from "@config/regions";

async function render(): Promise<string> {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container.renderToString(BaseLayout, {
    props: { title: "Test page" },
  });
}

describe("BaseLayout region visibility", () => {
  it("hands the inline script every region key, in weight order", async () => {
    const html = await render();
    const match = html.match(/regionKeysJson\s*=\s*"((?:[^"\\]|\\.)*)"/);
    expect(match, "regionKeysJson not found in rendered output").toBeTruthy();

    // The value is a JSON string inside a JS string literal, so it is escaped
    // twice: parse the literal, then parse the JSON it holds.
    const keys = JSON.parse(JSON.parse(`"${match![1]}"`)) as string[];
    expect(keys).toEqual(getAllowedRegions().map((r) => r.key));
  });

  it("emits one visibility selector per region", async () => {
    const html = await render();
    for (const region of getAllowedRegions()) {
      expect(html, `no visibility rule for region "${region.key}"`).toContain(
        `html[data-active-region='${region.key}'] [data-region='${region.key}']`,
      );
    }
  });

  it("emits no visibility selector for an unknown region", async () => {
    const html = await render();
    const emitted = [
      ...html.matchAll(/html\[data-active-region='([^']+)'\]/g),
    ].map((m) => m[1]);
    const known = new Set(getAllowedRegions().map((r) => r.key));
    expect(emitted.filter((k) => !known.has(k))).toEqual([]);
  });
});

/**
 * The site-support banner rides the same region-visibility mechanism: it
 * renders one `[data-region]` element per unsupported region and relies on the
 * generated CSS above to reveal the matching one.
 *
 * These read the frozen fixture, not real product data —
 * `vitest.unit.config.ts` redirects `@shared/site_support.yaml`.
 */
describe("BaseLayout site-support banner", () => {
  async function renderAt(
    pathname: string,
    props: Record<string, unknown> = {},
  ): Promise<string> {
    const container = await AstroContainer.create();
    container.addServerRenderer({
      renderer: preactRenderer,
      name: "@astrojs/preact",
    });
    return container.renderToString(BaseLayout, {
      props: { title: "Test page", ...props },
      request: new Request(`https://docs.example.com${pathname}`),
    });
  }

  it("renders the banner for a path matching url_paths", async () => {
    const html = await renderAt("/fake/scoped/deep/page");
    expect(html).toContain("site-support-banner");
  });

  it("renders no banner for an unaffected path", async () => {
    const html = await renderAt("/totally/unrelated");
    expect(html).not.toContain("site-support-banner");
  });

  it("resolves the siteSupportId prop ahead of the path", async () => {
    const html = await renderAt("/totally/unrelated", {
      siteSupportId: "fake_product",
    });
    expect(html).toContain(`data-region="gov2"`);
  });

  it("places the banner inside the body wrapper, above the page slot", async () => {
    // Hugo puts the banner at the top of the content area. Keeping it inside
    // `.base-layout__body` means it sits below the fixed header rather than
    // under it.
    const html = await renderAt("/fake/scoped/deep/page");
    const bodyIdx = html.indexOf("base-layout__body");
    const bannerIdx = html.indexOf("site-support-banner");
    expect(bodyIdx).toBeGreaterThan(-1);
    expect(bannerIdx).toBeGreaterThan(bodyIdx);
  });
});
