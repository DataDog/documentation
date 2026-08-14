import { describe, it, expect } from "vitest";
import {
  getOverviewPages,
  isApiContent,
  isApiSubPage,
  resolveOverviewState,
} from "./overviewPages";

describe("isApiContent", () => {
  it("matches the API root entry and its descendants", () => {
    expect(isApiContent("api/latest")).toBe(true);
    expect(isApiContent("api/latest/scopes")).toBe(true);
    expect(isApiContent("api/latest/nested/page")).toBe(true);
  });

  it("does not match an id that merely shares the prefix", () => {
    expect(isApiContent("api/latest-somethingelse")).toBe(false);
    expect(isApiContent("api/latestish/scopes")).toBe(false);
  });

  it("does not match the prefix deeper in an id", () => {
    expect(isApiContent("guides/api/latest")).toBe(false);
    expect(isApiContent("dd_e2e/components/tabs")).toBe(false);
  });
});

describe("isApiSubPage", () => {
  it("excludes the API root itself", () => {
    expect(isApiSubPage("api/latest")).toBe(false);
    expect(isApiSubPage("api/latest/scopes")).toBe(true);
    expect(isApiSubPage("api/latest-somethingelse")).toBe(false);
  });
});

describe("resolveOverviewState", () => {
  const pages = [
    { title: "Authorization Scopes", slug: "scopes" },
    { title: "Rate Limits", slug: "rate-limits" },
  ];

  it("treats the API root as the section, with no sub page active", () => {
    expect(resolveOverviewState(pages, "/api/latest/")).toEqual({
      isOverviewSection: true,
    });
  });

  it("activates the hand-written page the path points at", () => {
    expect(resolveOverviewState(pages, "/api/latest/rate-limits/")).toEqual({
      isOverviewSection: true,
      activeOverviewPageSlug: "rate-limits",
    });
  });

  it("leaves the section inactive for a spec category page", () => {
    expect(resolveOverviewState(pages, "/api/latest/dashboards/")).toEqual({
      isOverviewSection: false,
    });
  });

  it("leaves the section inactive outside the API root", () => {
    expect(resolveOverviewState(pages, "/getting_started/")).toEqual({
      isOverviewSection: false,
    });
  });
});

describe("getOverviewPages", () => {
  it("lists the hand-written pages under the API root, sorted by title", async () => {
    const pages = await getOverviewPages();
    expect(pages.length).toBeGreaterThan(0);
    expect(pages.map((page) => page.title)).toEqual(
      [...pages.map((page) => page.title)].sort((a, b) => a.localeCompare(b)),
    );
    // The root entry is a page of its own, not a member of the list.
    expect(pages.map((page) => page.slug)).not.toContain("");
  });
});
