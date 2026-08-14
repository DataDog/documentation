import { describe, it, expect } from "vitest";
import { apiPageSource } from "./apiPageSource";
import { collectPages } from "./pageIndex";
import { PageMetadataSchema } from "./types";
import { getCategoriesView } from "@lib/api/viewsBuilder";

describe("apiPageSource", () => {
  it("exposes landing + special pages as root pages", async () => {
    const roots = await apiPageSource.listRootPages();
    const paths = roots.map((page) => page.urlPath);
    expect(paths).toEqual([
      "/api/latest.md",
      "/api/latest/rate-limits.md",
      "/api/latest/scopes.md",
      "/api/latest/using-the-api.md",
    ]);
    const landing = roots[0];
    expect(landing.metadata.title).toBe("API Reference");
    expect(landing.metadata.breadcrumbs).toEqual(["Docs"]);
  });

  it("exposes one section per category, path /api/latest/{slug}/llms.txt", async () => {
    const sections = await apiPageSource.listSections();
    const categories = await getCategoriesView("en");

    expect(sections.map((section) => section.title).sort()).toEqual(
      categories.map((category) => category.name).sort(),
    );
    for (const category of categories) {
      const section = sections.find((s) => s.title === category.name)!;
      expect(section.llmsTxtPath).toBe(`/api/latest/${category.slug}/llms.txt`);
      // First page is the category overview, then one per operation.
      expect(section.pages[0].urlPath).toBe(`/api/latest/${category.slug}.md`);
      expect(section.pages.length).toBe(1 + category.operations.length);
    }
  });

  it("sets operation breadcrumbs to [Docs, API Reference, <Category>]", async () => {
    const sections = await apiPageSource.listSections();
    const categories = await getCategoriesView("en");
    const category = categories.find((c) => c.operations.length > 0)!;
    const section = sections.find((s) => s.title === category.name)!;
    expect(section.pages[1].metadata.breadcrumbs).toEqual([
      "Docs",
      "API Reference",
      category.name,
    ]);
  });

  it("titles each operation page with that operation's summary", async () => {
    const sections = await apiPageSource.listSections();
    const categories = await getCategoriesView("en");
    const category = categories.find((c) => c.operations.length > 0)!;
    const section = sections.find((s) => s.title === category.name)!;

    const summaries = category.operations.map((operation) => operation.summary);
    for (const page of section.pages.slice(1)) {
      expect(summaries).toContain(page.metadata.title);
    }
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
});
