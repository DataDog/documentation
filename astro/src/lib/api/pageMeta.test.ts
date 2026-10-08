import { describe, expect, it } from "vitest";
import {
  apiBreadcrumbs,
  categoryMetaDescription,
  operationMetaDescription,
} from "./pageMeta";

describe("apiBreadcrumbs", () => {
  it("ends at API on the API root", () => {
    expect(apiBreadcrumbs("en")).toEqual([
      { label: "Docs", href: "/" },
      { label: "API" },
    ]);
  });

  it("links API and ends at the page title below the root", () => {
    expect(apiBreadcrumbs("en", "Get a metric")).toEqual([
      { label: "Docs", href: "/" },
      { label: "API", href: "/api/latest/" },
      { label: "Get a metric" },
    ]);
  });

  it("localizes the hrefs", () => {
    const crumbs = apiBreadcrumbs("ja", "Get a metric");
    expect(crumbs[0].href).toBe("/ja/");
    expect(crumbs[1].href).toBe("/ja/api/latest/");
  });
});

describe("categoryMetaDescription", () => {
  it("uses the description when there is one", () => {
    expect(
      categoryMetaDescription({
        name: "Metrics",
        description: "About **metrics**.",
      }),
    ).toBe("About metrics.");
  });

  it("falls back to a generic line", () => {
    expect(categoryMetaDescription({ name: "Metrics", description: "" })).toBe(
      "Metrics endpoints in the Datadog API.",
    );
  });
});

describe("operationMetaDescription", () => {
  it("uses the latest variant's description when there is one", () => {
    expect(
      operationMetaDescription({
        summary: "Get a metric",
        variants: [{ description: "Gets a metric." }],
      }),
    ).toBe("Gets a metric.");
  });

  it("falls back to a generic line", () => {
    expect(
      operationMetaDescription({
        summary: "Get a metric",
        variants: [{ description: "" }],
      }),
    ).toBe("Get a metric endpoint in the Datadog API.");
  });
});
