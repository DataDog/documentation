import { describe, it, expect } from "vitest";
import { apiPageSource } from "./apiPageSource";
import { collectPages } from "./collectPages";
import { PageMetadataSchema } from "./schema";
import { getCategoriesView } from "@lib/api/viewsBuilder";

describe("apiPageSource", () => {
  it("exposes landing + special pages as root pages", async () => {
    const roots = await apiPageSource.listRootPages();
    const paths = roots.map((p) => p.urlPath);
    expect(paths).toEqual([
      "/api/latest.md",
      "/api/latest/using-the-api.md",
      "/api/latest/scopes.md",
      "/api/latest/rate-limits.md",
    ]);
    const landing = roots[0];
    expect(landing.metadata.title).toBe("API Reference");
    expect(landing.metadata.breadcrumbs).toEqual(["Docs"]);
  });

  it("exposes one section per category, path /api/latest/{slug}/llms.txt", async () => {
    const sections = await apiPageSource.listSections();
    const categories = await getCategoriesView("en");

    expect(sections.map((s) => s.title).sort()).toEqual(
      categories.map((c) => c.name).sort(),
    );
    for (const cat of categories) {
      const section = sections.find((s) => s.title === cat.name)!;
      expect(section.llmsTxtPath).toBe(`/api/latest/${cat.slug}/llms.txt`);
      // First page is the category overview, then one per operation.
      expect(section.pages[0].urlPath).toBe(`/api/latest/${cat.slug}.md`);
      expect(section.pages.length).toBe(1 + cat.operations.length);
    }
  });

  it("sets operation breadcrumbs to [Docs, API Reference, <Category>]", async () => {
    const sections = await apiPageSource.listSections();
    const categories = await getCategoriesView("en");
    const cat = categories.find((c) => c.operations.length > 0)!;
    const section = sections.find((s) => s.title === cat.name)!;
    const opPage = section.pages[1];
    expect(opPage.metadata.breadcrumbs).toEqual(["Docs", "API Reference", cat.name]);
  });

  it("flattens to schema-valid, non-private metadata with .md paths", async () => {
    const pages = await collectPages([apiPageSource]);
    expect(pages.length).toBeGreaterThan(0);
    for (const page of pages) {
      expect(page.urlPath.endsWith(".md")).toBe(true);
      expect(() => PageMetadataSchema.parse(page.metadata)).not.toThrow();
      expect(page.metadata.isPrivate).toBe(false);
    }
  });

  it("operation buildBody renders the summary heading", async () => {
    const sections = await apiPageSource.listSections();
    const categories = await getCategoriesView("en");
    const cat = categories.find((c) => c.operations.length > 0)!;
    const section = sections.find((s) => s.title === cat.name)!;
    const opPage = section.pages[1];
    const body = await opPage.buildBody();
    expect(body).toContain(`# ${opPage.metadata.title}`);
  });
});
