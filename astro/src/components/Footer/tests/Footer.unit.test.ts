import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of islands in headless tests.
import preactRenderer from "@astrojs/preact/server.js";
import Footer from "../Footer.astro";
import FooterBlurb from "../FooterBlurb.astro";
import {
  getFooterData,
  resolveFooterUrl,
} from "@lib/componentUtils/footerMenus";
// The container has no i18n manifest, so `Astro.currentLocale` is undefined and
// Footer renders as English. Expectations are built for the same locale.
import { DEFAULT_LOCALE } from "@lib/i18n/locale";
import { HUGO_ORIGIN } from "@config/origins";

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function createContainer() {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container;
}

describe("Footer", () => {
  it("renders a <footer> element", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);

    expect(html).toMatch(/<footer[\s>]/);
  });

  it("renders every resources, about, blog, and sub link from menus.en.yaml", async () => {
    const container = await createContainer();
    const html = decodeEntities(await container.renderToString(Footer));

    const footer = getFooterData(DEFAULT_LOCALE);
    const sectionLinks = footer.linkSections.flatMap(
      (section) => section.links,
    );

    for (const link of [...sectionLinks, ...footer.sub]) {
      expect(html).toContain(link.label);
      expect(html).toContain(link.href);
    }
  });

  it("renders each social link with its aria-label and href", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);

    const footer = getFooterData(DEFAULT_LOCALE);
    for (const s of footer.social) {
      expect(html).toContain(`aria-label="${s.label} link"`);
      expect(html).toContain(s.href);
    }
  });

  it("renders section headers for Product, Resources, About, and Blog", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);

    expect(html).toContain("footer-section--product");
    expect(html).toContain("footer-section--resources");
    expect(html).toContain("footer-section--about");
    expect(html).toContain("footer-section--blog");
  });

  it("renders the copyright with the current year", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);
    const year = new Date().getFullYear();

    expect(html).toMatch(new RegExp(`&copy; Datadog\\s*${year}`));
  });

  it("renders the Datadog logo and the mobile-app row", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);

    expect(html).toMatch(
      /<img[^>]*class="[^"]*footer__logo[^"]*"[^>]*alt="Datadog logo"/,
    );
    expect(html).toContain("Download mobile app");
    expect(html).toContain('aria-label="Apple Store Link"');
    expect(html).toContain('aria-label="Google Play Store Link"');
  });

  it("no longer renders a free-trial CTA", async () => {
    // Upstream dropped it from the docs footer in websites-modules v1.4.322.
    const container = await createContainer();
    const html = await container.renderToString(Footer);

    expect(html).not.toContain("free-trial");
  });

  it("renders the nested product categories with their inline icons", async () => {
    const container = await createContainer();
    const html = decodeEntities(await container.renderToString(Footer));

    const { categories } = getFooterData(DEFAULT_LOCALE).product;
    expect(categories.length).toBeGreaterThan(0);

    for (const category of categories) {
      expect(html).toContain(`footer-category-${category.identifier}`);
      expect(html).toContain(category.label);
    }

    // Every category icon is inlined, not an icon-font glyph.
    expect(html).not.toMatch(/<i class="icon-/);
    // `cl()` emits the static name and the hashed one, so match the attribute
    // start to count elements rather than class tokens.
    const iconCount = (html.match(/class="footer__category-icon/g) ?? [])
      .length;
    expect(iconCount).toBe(categories.length);
  });

  it("renders the subcategory headings inside a category", async () => {
    const container = await createContainer();
    const html = decodeEntities(await container.renderToString(Footer));

    const { categories } = getFooterData(DEFAULT_LOCALE).product;
    const labels = categories.flatMap((category) =>
      category.groups.map((group) => group.label).filter(Boolean),
    );
    expect(labels.length).toBeGreaterThan(0);

    for (const label of labels) {
      expect(html).toContain(label as string);
    }
  });

  it("renders the language selector with the current language", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);

    expect(html).toContain("footer__lang-toggle");
    // Current language label in its own language — English.
    expect(html).toContain("English");
  });
});

describe("FooterBlurb", () => {
  it("renders the docs-only heading and Contact Us CTA pointing at the docs /help/ page", async () => {
    const container = await createContainer();
    const html = decodeEntities(await container.renderToString(FooterBlurb));

    expect(html).toContain("Can't find something?");
    expect(html).toContain(
      "Our friendly, knowledgeable solutions engineers are here to help!",
    );
    expect(html).toContain("Contact Us");
    // The help page lives on the Hugo docs site; www.datadoghq.com/help/ is a 404.
    expect(html).toContain(`href="${HUGO_ORIGIN}/help/"`);
  });
});

describe("footerMenus loader", () => {
  it("orders the link sections resources, blog, about", () => {
    expect(getFooterData(DEFAULT_LOCALE).linkSections.map((s) => s.id)).toEqual(
      ["resources", "blog", "about"],
    );
  });

  it("passes absolute URLs through unchanged", () => {
    expect(resolveFooterUrl("https://securitylabs.datadoghq.com/")).toBe(
      "https://securitylabs.datadoghq.com/",
    );
  });

  it("prefixes relative URLs with https://www.datadoghq.com/", () => {
    expect(resolveFooterUrl("pricing/")).toBe(
      "https://www.datadoghq.com/pricing/",
    );
    expect(resolveFooterUrl("/legal/")).toBe(
      "https://www.datadoghq.com/legal/",
    );
  });
});
