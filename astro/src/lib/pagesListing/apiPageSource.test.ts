import { describe, it, expect } from "vitest";
import { apiPageSource } from "./apiPageSource";
import { PageMetadataSchema } from "./schema";
import { getCategoriesView } from "@lib/api/viewsBuilder";

describe("apiPageSource.listPages", () => {
  it("enumerates landing + special pages + one page per category + one per operation", async () => {
    const pages = await apiPageSource.listPages();
    const paths = pages.map((p) => p.urlPath);

    const categories = await getCategoriesView("en");
    const expected = new Set<string>([
      "/api/latest.md",
      "/api/latest/using-the-api.md",
      "/api/latest/scopes.md",
      "/api/latest/rate-limits.md",
    ]);
    for (const cat of categories) {
      expected.add(`/api/latest/${cat.slug}.md`);
      for (const op of cat.operations) {
        expected.add(`/api/latest/${cat.slug}/${op.slug}.md`);
      }
    }

    expect(new Set(paths)).toEqual(expected);
    expect(paths.length).toBe(expected.size); // no duplicates
  });

  it("gives every page a .md urlPath and schema-valid, non-private metadata", async () => {
    const pages = await apiPageSource.listPages();
    for (const page of pages) {
      expect(page.urlPath.endsWith(".md")).toBe(true);
      expect(() => PageMetadataSchema.parse(page.metadata)).not.toThrow();
      expect(page.metadata.isPrivate).toBe(false);
      expect(page.metadata.breadcrumbs[0]).toBe("Docs");
    }
  });

  it("sets the expected title and breadcrumbs per page type", async () => {
    const pages = await apiPageSource.listPages();
    const byPath = new Map(pages.map((p) => [p.urlPath, p]));

    const landing = byPath.get("/api/latest.md");
    expect(landing?.metadata.title).toBe("API Reference");
    expect(landing?.metadata.breadcrumbs).toEqual(["Docs"]);

    const rateLimits = byPath.get("/api/latest/rate-limits.md");
    expect(rateLimits?.metadata.title).toBe("Rate Limits");
    expect(rateLimits?.metadata.breadcrumbs).toEqual(["Docs", "API Reference"]);

    const categories = await getCategoriesView("en");
    const cat = categories.find((c) => c.operations.length > 0)!;
    const catPage = byPath.get(`/api/latest/${cat.slug}.md`);
    expect(catPage?.metadata.title).toBe(cat.name);
    expect(catPage?.metadata.breadcrumbs).toEqual(["Docs", "API Reference"]);

    const op = cat.operations[0];
    const opPage = byPath.get(`/api/latest/${cat.slug}/${op.slug}.md`);
    expect(opPage?.metadata.title).toBe(op.summary);
    expect(opPage?.metadata.breadcrumbs).toEqual([
      "Docs",
      "API Reference",
      cat.name,
    ]);
  });

  it("buildBody() for an operation matches apiOperationBody of its view", async () => {
    const categories = await getCategoriesView("en");
    const cat = categories.find((c) => c.operations.length > 0)!;
    const op = cat.operations[0];

    const pages = await apiPageSource.listPages();
    const opPage = pages.find(
      (p) => p.urlPath === `/api/latest/${cat.slug}/${op.slug}.md`,
    )!;
    const body = await opPage.buildBody();
    expect(body.length).toBeGreaterThan(0);
    expect(body).toContain(`# ${op.summary}`);
  });
});
