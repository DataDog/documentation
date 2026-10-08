import { describe, expect, it } from "vitest";
import { toCategorySlug, toSlug } from "./categorySlug";

describe("toSlug", () => {
  it("lowercases and joins words with hyphens", () => {
    expect(toSlug("AWS Integration")).toBe("aws-integration");
  });

  it("collapses runs of non-alphanumerics and trims the ends", () => {
    expect(toSlug("  On-Call / Paging  ")).toBe("on-call-paging");
  });
});

describe("toCategorySlug", () => {
  it("slugifies a tag name", () => {
    expect(toCategorySlug("Experiments")).toBe("experiments");
  });

  it("applies the slug overrides", () => {
    expect(toCategorySlug("Case Management")).toBe("cases");
    expect(toCategorySlug("Scorecards")).toBe("service-scorecards");
  });
});
