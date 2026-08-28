import { describe, it, expect } from "vitest";
import {
  findUnprerenderedApiRoutes,
  findUncontainedPaths,
  countCategoryPages,
  toRouteLike,
} from "./staticApiGuard";

describe("findUnprerenderedApiRoutes", () => {
  it("flags an /api route that isn't prerendered", () => {
    const offenders = findUnprerenderedApiRoutes([
      { route: "/api/latest/dashboards", prerender: true },
      { route: "/api/latest/metrics", prerender: false },
      { route: "/fr/api/latest/metrics", prerender: false },
    ]);
    expect(offenders).toEqual([
      "/api/latest/metrics",
      "/fr/api/latest/metrics",
    ]);
  });

  it("ignores non-/api routes regardless of prerender", () => {
    const offenders = findUnprerenderedApiRoutes([
      { route: "/dd_e2e/index", prerender: false },
      { route: "/[...slug]", prerender: false },
    ]);
    expect(offenders).toEqual([]);
  });

  it("passes when every /api route is prerendered", () => {
    const offenders = findUnprerenderedApiRoutes([
      { route: "/api/latest/dashboards", prerender: true },
      { route: "/ja/api/latest/dashboards", prerender: true },
    ]);
    expect(offenders).toEqual([]);
  });
});

describe("findUncontainedPaths", () => {
  it("flags a root-level file", () => {
    const offenders = findUncontainedPaths([
      "api/latest/dashboards/index.html",
      "index.html",
      "favicon.ico",
    ]);
    expect(offenders).toEqual(["index.html", "favicon.ico"]);
  });

  it("allows every locale-prefixed /api subtree, plus the _astro assets", () => {
    const offenders = findUncontainedPaths([
      "api/latest/dashboards/index.html",
      "fr/api/latest/dashboards/index.html",
      "ja/api/latest/dashboards/index.html",
      "ko/api/latest/dashboards/index.html",
      "es/api/latest/dashboards/index.html",
      "_astro/chunk.abc123.js",
      "_astro/NationalWeb-Light.dKg0S4Gx.woff2",
    ]);
    expect(offenders).toEqual([]);
  });

  it("rejects a lookalike path that isn't actually under api/", () => {
    const offenders = findUncontainedPaths(["apiary/index.html"]);
    expect(offenders).toEqual(["apiary/index.html"]);
  });
});

describe("toRouteLike", () => {
  it("maps Astro's IntegrationResolvedRoute shape onto RouteLike", () => {
    expect(
      toRouteLike([
        { pattern: "/api/latest/[category]", isPrerendered: true },
        { pattern: "/[...slug]", isPrerendered: false },
      ]),
    ).toEqual([
      { route: "/api/latest/[category]", prerender: true },
      { route: "/[...slug]", prerender: false },
    ]);
  });
});

describe("countCategoryPages", () => {
  it("counts distinct api/latest/{category} pages", () => {
    const count = countCategoryPages([
      "api/latest/dashboards/",
      "api/latest/metrics/",
      "api/latest/",
      "api/latest/metrics/get-a-metric/",
    ]);
    expect(count).toBe(2);
  });

  it("does not double-count the same category emitted twice", () => {
    expect(
      countCategoryPages(["api/latest/metrics/", "api/latest/metrics/"]),
    ).toBe(1);
  });

  it("counts English pages only, so locales can't inflate the floor", () => {
    const count = countCategoryPages([
      "api/latest/dashboards/",
      "fr/api/latest/dashboards/",
      "ja/api/latest/dashboards/",
      "ko/api/latest/dashboards/",
      "es/api/latest/dashboards/",
    ]);
    expect(count).toBe(1);
  });

  // Why the coverage guard reads `pages` and not `routes`: Astro resolves the whole
  // category tree to one dynamic route, so a route-based count would report 1 no
  // matter how many categories the spec produced. Pages are the generated output.
  it("counts one page per generated category, not one per route pattern", () => {
    const categories = ["dashboards", "metrics", "monitors", "logs"];
    expect(countCategoryPages(categories.map((c) => `api/latest/${c}/`))).toBe(
      4,
    );
  });

  it("is zero when nothing matches", () => {
    expect(countCategoryPages(["dd_e2e/index.html"])).toBe(0);
  });
});
