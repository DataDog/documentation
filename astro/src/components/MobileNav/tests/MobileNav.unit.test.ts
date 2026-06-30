// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of the toggle island.
import preactRenderer from "@astrojs/preact/server.js";
import MobileNav from "../MobileNav.astro";
import { getDocsNavTree } from "@lib/componentUtils/docsNavMenu";
import { getCategoriesView } from "@lib/api/viewsBuilder";
import type { ApiCategory } from "@lib/api/schemas/views";
import { HUGO_ORIGIN } from "@config/origins";

async function renderMobileNav(pathname?: string): Promise<Document> {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  const html = await container.renderToString(MobileNav, {
    // When a pathname is given, drive Astro.url through a request so the
    // active-section logic can pick the section owning the current page.
    request: pathname
      ? new Request(`https://docs.datadoghq.com${pathname}`)
      : undefined,
  });
  return new DOMParser().parseFromString(html, "text/html");
}

function sectionByLabel(doc: Document, label: string): Element | undefined {
  return [...doc.querySelectorAll(".mobile-nav__section")].find((section) =>
    section.querySelector("summary")?.textContent?.includes(label),
  );
}

// API categories (from the frozen spec fixture) that have at least one
// operation, so tests can drive the active-category/operation rendering.
async function getCategoriesWithOperations(): Promise<ApiCategory[]> {
  const categories = await getCategoriesView();
  const withOps = categories.filter((cat) => cat.operations.length > 0);
  expect(withOps.length).toBeGreaterThan(0);
  return withOps;
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

  it("renders the quick-links row with correct hrefs", async () => {
    const doc = await renderMobileNav();
    const links = doc.querySelectorAll(".mobile-nav__quicknav-link");
    expect(links.length).toBe(3);
    const [homeLink, docsLink, apiLink] = [...links];
    expect(homeLink?.getAttribute("href")).toBe("https://www.datadoghq.com");
    expect(docsLink?.getAttribute("href")).toBe(`${HUGO_ORIGIN}/`);
    expect(apiLink?.getAttribute("href")).toBe("/api/latest/");
  });

  it("renders the overlay shell (panel, backdrop, search)", async () => {
    // The hamburger toggle lives in the header's mobile row (see
    // MobileNavToggle.unit.test.ts), not here; this component renders only the
    // build-time overlay it manipulates.
    const doc = await renderMobileNav();
    expect(doc.querySelector("#mobile-nav")).not.toBeNull();
    expect(doc.querySelector("#mobile-nav-bg")).not.toBeNull();
    expect(doc.querySelector(".mobile-nav__search")).not.toBeNull();
  });

  it("groups the quick-links and search into a sticky header above the menu", async () => {
    // Quick-links and search live in a single header element that is made
    // sticky in CSS, so they stay pinned while the menu list scrolls beneath.
    const doc = await renderMobileNav();
    const header = doc.querySelector(".mobile-nav__header");
    expect(header).not.toBeNull();
    expect(header?.querySelector(".mobile-nav__quicknav")).not.toBeNull();
    expect(header?.querySelector(".mobile-nav__search")).not.toBeNull();
    // The scrolling menu list is a sibling after the header, not inside it.
    expect(header?.querySelector(".mobile-nav__list")).toBeNull();
    expect(header?.nextElementSibling?.classList.contains("mobile-nav__list")).toBe(
      true,
    );
  });

  it("renders the functional SearchBar island inside the search slot", async () => {
    const doc = await renderMobileNav();
    // The dead placeholder <input> is replaced by the shared SearchBar island,
    // server-rendered to its static markup inside the search slot.
    const searchSlot = doc.querySelector(".mobile-nav__search");
    expect(searchSlot?.querySelector(".search-bar")).not.toBeNull();
    expect(searchSlot?.querySelector(".search-bar__input")).not.toBeNull();
  });

  it("renders the documentation menu as an accordion of sections", async () => {
    const doc = await renderMobileNav();
    // Top-level sections from main.en.yaml render as collapsible sections.
    expect(sectionByLabel(doc, "Essentials")).toBeDefined();
    expect(sectionByLabel(doc, "Infrastructure")).toBeDefined();
  });

  it("renders all sections collapsed when no page owns a section", async () => {
    const doc = await renderMobileNav();
    expect(sectionByLabel(doc, "Essentials")?.hasAttribute("open")).toBe(false);
    expect(sectionByLabel(doc, "Infrastructure")?.hasAttribute("open")).toBe(
      false,
    );
  });

  it("replaces the main docs menu with the API nav on API pages", async () => {
    // Mirrors Hugo's mobile-documentation.html: on `/api/` pages the menu is
    // the API category/operation tree, not the main docs accordion.
    const [category] = await getCategoriesWithOperations();
    const doc = await renderMobileNav(`/api/latest/${category.slug}/`);

    // No main-menu accordion sections (e.g. Essentials/Infrastructure).
    expect(sectionByLabel(doc, "Essentials")).toBeUndefined();
    expect(doc.querySelector(".mobile-nav__section")).toBeNull();
    // The API category list is present instead (expandable sections).
    expect(doc.querySelectorAll(".mobile-nav__api-section").length).toBeGreaterThan(0);
  });

  it("expands the active category and highlights the active operation in the API nav", async () => {
    const [category] = await getCategoriesWithOperations();
    const operation = category.operations[0];
    const doc = await renderMobileNav(
      `/api/latest/${category.slug}/${operation.slug}/`,
    );

    // All categories render their operations in the DOM (inside <details>);
    // only the active one has the open attribute.
    const openSections = doc.querySelectorAll(".mobile-nav__api-section[open]");
    expect(openSections.length).toBe(1);

    // The active operation carries the active modifier and points at its page.
    const activeOp = doc.querySelector(".mobile-nav__api-operation--active");
    expect(activeOp).not.toBeNull();
    expect(activeOp?.getAttribute("href")).toBe(
      `/api/latest/${category.slug}/${operation.slug}/`,
    );
    expect(activeOp?.getAttribute("aria-current")).toBe("page");
  });

  it("marks the active category active on a category landing page", async () => {
    const [category] = await getCategoriesWithOperations();
    const doc = await renderMobileNav(`/api/latest/${category.slug}/`);
    // The summary of the active section carries the active modifier and
    // aria-current when there is no active operation (category landing page).
    const activeSummary = doc.querySelector(".mobile-nav__api-category--active");
    expect(activeSummary?.tagName.toLowerCase()).toBe("summary");
    expect(activeSummary?.getAttribute("aria-current")).toBe("page");
  });

  it("highlights the active page link (purple + aria-current) in the docs accordion", async () => {
    // On a non-API page, the active page link itself — not just its expanded
    // section — is brand-colored. `/getting_started/` renders as a level-1 link
    // under the (expanded) Essentials section, so it appears in the DOM and is
    // the longest-prefix match for the page.
    const doc = await renderMobileNav("/getting_started/");
    const active = doc.querySelector(".mobile-nav__link--active");
    expect(active).not.toBeNull();
    expect(active?.getAttribute("href")).toBe(`${HUGO_ORIGIN}/getting_started/`);
    expect(active?.getAttribute("aria-current")).toBe("page");
    // Exactly one link is active — not its ancestors or siblings.
    expect(doc.querySelectorAll(".mobile-nav__link--active").length).toBe(1);
  });

  it("highlights no docs link when no page matches", async () => {
    const doc = await renderMobileNav();
    expect(doc.querySelector(".mobile-nav__link--active")).toBeNull();
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

  it("renders API categories as expandable <details> sections with chevrons", async () => {
    const [category] = await getCategoriesWithOperations();
    const doc = await renderMobileNav(`/api/latest/${category.slug}/`);
    const sections = doc.querySelectorAll(".mobile-nav__api-section");
    expect(sections.length).toBeGreaterThan(0);
    for (const section of sections) {
      expect(section.tagName.toLowerCase()).toBe("details");
      expect(section.querySelector(".mobile-nav__caret")).not.toBeNull();
    }
  });

  it("starts the active API category expanded and collapses all others", async () => {
    const [category] = await getCategoriesWithOperations();
    const doc = await renderMobileNav(`/api/latest/${category.slug}/`);
    const sections = [...doc.querySelectorAll(".mobile-nav__api-section")];
    const openSections = sections.filter((s) => s.hasAttribute("open"));
    expect(openSections.length).toBe(1);
    expect(
      openSections[0].querySelector(".mobile-nav__api-category--active"),
    ).not.toBeNull();
  });

  it("shows all categories' operations inside their <details>, not just the active one", async () => {
    const [category] = await getCategoriesWithOperations();
    const operation = category.operations[0];
    const doc = await renderMobileNav(
      `/api/latest/${category.slug}/${operation.slug}/`,
    );
    const operationLists = doc.querySelectorAll(".mobile-nav__api-operations");
    // Every category should have its operations in the DOM.
    expect(operationLists.length).toBeGreaterThan(1);
  });

  it("renders nested subsections with children as expandable <details> elements", async () => {
    const tree = getDocsNavTree();
    const sectionWithGrandchildren = tree.find((node) =>
      node.children.some((child) => child.children.length > 0),
    );
    expect(sectionWithGrandchildren).toBeDefined();

    const subsectionWithChildren = sectionWithGrandchildren!.children.find(
      (child) => child.children.length > 0,
    )!;

    const doc = await renderMobileNav();
    const subsectionDetails = [...doc.querySelectorAll("details")].find((el) =>
      el.querySelector("summary")?.textContent?.includes(subsectionWithChildren.label),
    );
    expect(subsectionDetails).toBeDefined();
  });
});
