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
 * It lives in the *content column* (ApiLayout / the cdoc page), not in
 * BaseLayout, so it is bounded by the same column as Hugo's banner instead of
 * spanning the full page width above the side nav. These tests pin that: the
 * banner must NOT come from BaseLayout.
 *
 * The banner's own rendering is covered in
 * `src/components/SiteSupportBanner/tests/unit.test.ts`, and its placement in
 * the API column by `src/layouts/apiLayoutBanner.unit.test.ts`.
 */
describe("BaseLayout site-support banner", () => {
  it("does not render the banner itself", async () => {
    // BaseLayout has no pathname-derived banner: putting it here made it span
    // the full page width, above the side nav and breadcrumb.
    const container = await AstroContainer.create();
    container.addServerRenderer({
      renderer: preactRenderer,
      name: "@astrojs/preact",
    });
    const html = await container.renderToString(BaseLayout, {
      props: { title: "Test page" },
      request: new Request("https://docs.example.com/fake/scoped/deep/page"),
    });
    expect(html).not.toContain('class="site-support-banner');
  });
});
