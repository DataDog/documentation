import { describe, it, expect } from "vitest";
import { isChangelogPath } from "./changelogPaths";

describe("isChangelogPath", () => {
  it("matches the changelog landing page and every filtered or later page", () => {
    expect(isChangelogPath("/api/changelog/")).toBe(true);
    expect(isChangelogPath("/api/changelog/2/")).toBe(true);
    expect(isChangelogPath("/api/changelog/breaking/")).toBe(true);
    expect(isChangelogPath("/api/changelog/breaking/2/")).toBe(true);
  });

  it("does not match the markdown twin or a path that shares the prefix", () => {
    expect(isChangelogPath("/api/changelog.md")).toBe(false);
    expect(isChangelogPath("/api/changelogs/")).toBe(false);
  });

  it("does not match other API pages", () => {
    expect(isChangelogPath("/api/latest/")).toBe(false);
    expect(isChangelogPath("/api/latest/dashboards/")).toBe(false);
  });
});
