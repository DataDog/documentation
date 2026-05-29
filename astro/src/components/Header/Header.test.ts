import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of islands in headless tests.
import preactRenderer from "@astrojs/preact/server.js";
import Header from "./Header.astro";
import { getHeaderData } from "@lib/componentUtils/menuData";
import { i18n } from "@lib/i18n/i18n";

async function createContainer() {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container;
}

describe("Header", () => {
  it("renders every non-disabled top-level menu item from menus.yaml", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Header);

    const header = getHeaderData();
    const expectedLeft = [
      header.product?.label,
      header.solutions?.label,
      ...header.simpleLeft.map((m) => m.label),
    ].filter((s): s is string => Boolean(s));

    for (const label of expectedLeft) {
      expect(html).toContain(label);
    }
  });

  it("renders the Datadog logo linking to /", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Header);

    // The logo anchor has the header__logo-column BEM class and href="/".
    // Attribute order is implementation-defined, so accept either ordering.
    expect(html).toMatch(
      /<a[^>]*(class="[^"]*header__logo-column[^"]*"[^>]*href="\/"|href="\/"[^>]*class="[^"]*header__logo-column)/,
    );
  });

  it("serves retina srcset on the desktop and mobile logo images", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Header);

    // Every <img> inside the header must carry a 1x/2x srcset so retina
    // displays render a crisp logo instead of upscaling the 1x PNG.
    const imgTags = html.match(/<img[^>]*>/g) ?? [];
    expect(imgTags.length).toBeGreaterThan(0);
    for (const img of imgTags) {
      expect(img).toMatch(/srcset="[^"]*1x, [^"]*2x"/);
    }
  });

  it("renders a GET STARTED FREE CTA from the right-hand menu", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Header);

    expect(html).toContain(i18n("get_started_free"));
  });

  it("renders desktop product categories as interactive islands", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Header);

    // Mega-menu toggle buttons are hydrated as a Preact island, so they won't
    // appear in rendered HTML unless we inspect the SSR fallback. The static
    // markup should still include the product-dropdown marker and the product
    // menu link.
    expect(html).toContain("product-dropdown");
    const header = getHeaderData();
    expect(header.product).not.toBeNull();
    expect(html).toContain(header.product!.label);
    // And the desktop product mega-categories should render at build time.
    for (const cat of header.product!.megaCategories) {
      expect(html).toContain(cat.label);
    }
  });

  it("renders About and Blog dropdowns from main_right", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Header);

    const header = getHeaderData();
    const rightLabels = [
      header.about?.label,
      header.blog?.label,
      header.login?.label,
    ].filter((s): s is string => Boolean(s));

    for (const label of rightLabels) {
      expect(html).toContain(label);
    }
  });
});
