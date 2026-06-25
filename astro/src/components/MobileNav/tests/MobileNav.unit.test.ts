// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of the toggle island.
import preactRenderer from "@astrojs/preact/server.js";
import MobileNav from "../MobileNav.astro";
import { getDocsNavTree } from "@lib/componentUtils/docsNavMenu";
import { HUGO_ORIGIN } from "@config/origins";

async function renderMobileNav(): Promise<Document> {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  const html = await container.renderToString(MobileNav);
  return new DOMParser().parseFromString(html, "text/html");
}

function sectionByLabel(doc: Document, label: string): Element | undefined {
  return [...doc.querySelectorAll(".mobile-nav__section")].find((section) =>
    section.querySelector("summary")?.textContent?.includes(label),
  );
}

describe("MobileNav.astro", () => {
  it("renders the quick-links row with three icons", async () => {
    const doc = await renderMobileNav();
    const icons = doc.querySelectorAll(".mobile-nav__quicknav img");
    expect(icons.length).toBe(3);
    const srcs = [...icons].map((img) => img.getAttribute("src"));
    expect(srcs).toEqual([
      "/images/icons/nav_home.png",
      "/images/icons/nav_docs.png",
      "/images/icons/nav_mobile_api.png",
    ]);
  });

  it("renders the hamburger toggle and overlay shell", async () => {
    const doc = await renderMobileNav();
    expect(doc.querySelector(".navbar-toggler")).not.toBeNull();
    expect(doc.querySelector("#mobile-nav")).not.toBeNull();
    expect(doc.querySelector("#mobile-nav-bg")).not.toBeNull();
    expect(doc.querySelector(".mobile-nav__search")).not.toBeNull();
  });

  it("renders the documentation menu as an accordion of sections", async () => {
    const doc = await renderMobileNav();
    // Top-level sections from main.en.yaml render as collapsible sections.
    expect(sectionByLabel(doc, "Essentials")).toBeDefined();
    expect(sectionByLabel(doc, "Infrastructure")).toBeDefined();
  });

  it("opens the Essentials section by default and leaves others closed", async () => {
    const doc = await renderMobileNav();
    expect(sectionByLabel(doc, "Essentials")?.hasAttribute("open")).toBe(true);
    expect(sectionByLabel(doc, "Infrastructure")?.hasAttribute("open")).toBe(
      false,
    );
  });

  it("renders nested child links pointing to Hugo at build time (SEO)", async () => {
    const doc = await renderMobileNav();
    // "Getting Started" is a Hugo docs page, so its link is absolute with HUGO_ORIGIN.
    const gettingStarted = doc.querySelector(
      `a[href="${HUGO_ORIGIN}/getting_started/"]`,
    );
    expect(gettingStarted).not.toBeNull();
    expect(gettingStarted?.textContent).toContain("Getting Started");
  });

  it("keeps API links relative (Astro) and makes non-API links absolute (Hugo)", async () => {
    const doc = await renderMobileNav();
    // The "API" child of Essentials has url /api/latest/..., so it stays relative.
    const apiLink = doc.querySelector('a[href^="/api/"]');
    expect(apiLink).not.toBeNull();
    // A non-API link like Getting Started must be absolute with HUGO_ORIGIN.
    const hugoLink = doc.querySelector(
      `a[href^="${HUGO_ORIGIN}/getting_started/"]`,
    );
    expect(hugoLink).not.toBeNull();
  });

  it("renders every top-level section from the menu tree", async () => {
    const doc = await renderMobileNav();
    const tree = getDocsNavTree();
    const topWithChildren = tree.filter((node) => node.children.length > 0);
    for (const node of topWithChildren) {
      expect(sectionByLabel(doc, node.label)).toBeDefined();
    }
  });
});
