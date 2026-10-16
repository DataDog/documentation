import { describe, expect, it } from "vitest";
import { toCategorySlug, toOperationSlug, toSlug } from "./categorySlug";

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

describe("toOperationSlug", () => {
  it("lowercases and joins words with hyphens", () => {
    expect(toOperationSlug("List all AWS integrations")).toBe(
      "list-all-aws-integrations",
    );
  });

  it("drops punctuation rather than turning it into a hyphen, as Hugo does", () => {
    expect(toOperationSlug("Get a monitor's details")).toBe(
      "get-a-monitors-details",
    );
    expect(toOperationSlug("Trigger tests from CI/CD pipelines")).toBe(
      "trigger-tests-from-cicd-pipelines",
    );
  });

  it("keeps existing hyphens and underscores", () => {
    expect(toOperationSlug("Get an on-call user_handle")).toBe(
      "get-an-on-call-user_handle",
    );
  });
});
