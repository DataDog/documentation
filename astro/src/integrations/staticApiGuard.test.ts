import { describe, it, expect } from "vitest";
import {
  findUnprerenderedApiRoutes,
  findUncontainedPaths,
  countCategoryRoutes,
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

  it("allows every locale-prefixed /api subtree", () => {
    const offenders = findUncontainedPaths([
      "api/latest/dashboards/index.html",
      "fr/api/latest/dashboards/index.html",
      "ja/api/latest/dashboards/index.html",
      "ko/api/latest/dashboards/index.html",
      "es/api/latest/dashboards/index.html",
      "api/_astro/chunk.abc123.js",
    ]);
    expect(offenders).toEqual([]);
  });

  it("rejects a lookalike path that isn't actually under api/", () => {
    const offenders = findUncontainedPaths(["apiary/index.html"]);
    expect(offenders).toEqual(["apiary/index.html"]);
  });
});

describe("countCategoryRoutes", () => {
  it("counts only prerendered /api/latest/{category} routes", () => {
    const count = countCategoryRoutes([
      { route: "/api/latest/dashboards", prerender: true },
      { route: "/api/latest/metrics", prerender: true },
      { route: "/api/latest/metrics", prerender: false },
      { route: "/api/latest", prerender: true },
      { route: "/api/latest/metrics/get-a-metric", prerender: true },
    ]);
    expect(count).toBe(2);
  });

  it("is zero when nothing matches", () => {
    expect(countCategoryRoutes([{ route: "/dd_e2e/index", prerender: true }])).toBe(
      0,
    );
  });
});
