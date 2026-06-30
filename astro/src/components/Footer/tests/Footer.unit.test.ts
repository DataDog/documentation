import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of islands in headless tests.
import preactRenderer from "@astrojs/preact/server.js";
import Footer from "../Footer.astro";
import FooterBlurb from "../FooterBlurb.astro";
import {
  getFooterData,
  resolveFooterUrl,
  splitHalves,
} from "@lib/componentUtils/footerMenus";

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

    const footer = getFooterData();
    const accordionLinks = footer.accordionSections
      .filter((s) => s.id !== "product")
      .flatMap((s) => [...s.firstColumn, ...s.secondColumn]);

    for (const link of [...accordionLinks, ...footer.sub]) {
      expect(html).toContain(link.label);
      expect(html).toContain(link.href);
    }
  });

  it("renders each social link with its aria-label and href", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);

    const footer = getFooterData();
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

  it('renders the Free Trial CTA as a link with data-trigger="free-trial"', async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);

    expect(html).toMatch(
      /<a[^>]*data-trigger="free-trial"[^>]*>[\s\S]*?Free Trial[\s\S]*?<\/a>/,
    );
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
  it("renders the docs-only heading and Contact Us CTA pointing at /help/", async () => {
    const container = await createContainer();
    const html = decodeEntities(await container.renderToString(FooterBlurb));

    expect(html).toContain("Can't find something?");
    expect(html).toContain(
      "Our friendly, knowledgeable solutions engineers are here to help!",
    );
    expect(html).toContain("Contact Us");
    expect(html).toContain("https://www.datadoghq.com/help/");
  });
});

describe("footerMenus loader", () => {
  it("splits a 10-item list into halves of 5 and 5", () => {
    const items = Array.from({ length: 10 }, (_, i) => i);
    const { first, second } = splitHalves(items);
    expect(first).toHaveLength(5);
    expect(second).toHaveLength(5);
  });

  it("splits a 9-item list into halves of 5 and 4 (first half gets the extra)", () => {
    const items = Array.from({ length: 9 }, (_, i) => i);
    const { first, second } = splitHalves(items);
    expect(first).toHaveLength(5);
    expect(second).toHaveLength(4);
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
