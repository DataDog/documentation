import { describe, expect, it } from "vitest";
import { getCategoriesView } from "./viewsBuilder";
import { buildMobileNavData, mobileNavDataUrl } from "./mobileNavData";

describe("buildMobileNavData", () => {
  it("includes every category, in nav order", async () => {
    const categories = await getCategoriesView("en");
    const data = buildMobileNavData(categories, "en");
    expect(data.categories.map((category) => category.slug)).toEqual(
      categories.map((category) => category.slug),
    );
  });

  it("includes every operation's slug and summary, in nav order", async () => {
    const categories = await getCategoriesView("en");
    const data = buildMobileNavData(categories, "en");
    data.categories.forEach((navCategory, index) => {
      expect(navCategory.operations).toEqual(
        categories[index].operations.map((operation) => ({
          slug: operation.slug,
          summary: operation.summary,
        })),
      );
    });
  });

  it("localizes the category hrefs", async () => {
    const categories = await getCategoriesView("en");
    const [firstCategory] = categories;
    expect(buildMobileNavData(categories, "en").categories[0].href).toBe(
      `/api/latest/${firstCategory.slug}/`,
    );
    expect(buildMobileNavData(categories, "ja").categories[0].href).toBe(
      `/ja/api/latest/${firstCategory.slug}/`,
    );
  });
});

describe("mobileNavDataUrl", () => {
  it("localizes the endpoint URL", () => {
    expect(mobileNavDataUrl("en")).toBe("/api/mobile-nav.json");
    expect(mobileNavDataUrl("ja")).toBe("/ja/api/mobile-nav.json");
  });
});
