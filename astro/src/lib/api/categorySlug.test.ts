import { describe, expect, it } from "vitest";
import { toCategorySlug, toSlug } from "./categorySlug";

describe("toSlug", () => {
  it("lowercases and joins words with hyphens", () => {
    expect(toSlug("AWS Integration")).toBe("aws-integration");
  });

  it("collapses runs of non-alphanumerics and trims the ends", () => {
    expect(toSlug("  On-Call / Paging  ")).toBe("on-call-paging");
  });

  it("deletes apostrophes instead of hyphenating them, as Hugo does", () => {
    expect(toSlug("Get a monitor's details")).toBe("get-a-monitors-details");
  });

  it("drops slashes instead of hyphenating them", () => {
    expect(toSlug("Trigger tests from CI/CD pipelines")).toBe(
      "trigger-tests-from-cicd-pipelines",
    );
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
