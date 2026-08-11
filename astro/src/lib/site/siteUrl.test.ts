import { describe, it, expect } from "vitest";
import { absoluteUrl, siteBase } from "./siteUrl";

describe("siteBase", () => {
  it("adds a trailing slash so relative paths resolve under the full path", () => {
    expect(siteBase("https://docs-staging.datadoghq.com/my-branch")).toBe(
      "https://docs-staging.datadoghq.com/my-branch/",
    );
  });

  it("leaves an already-directory URL alone", () => {
    expect(siteBase("https://docs.datadoghq.com/")).toBe(
      "https://docs.datadoghq.com/",
    );
  });

  it("accepts a URL as well as a string", () => {
    expect(siteBase(new URL("https://docs.datadoghq.com"))).toBe(
      "https://docs.datadoghq.com/",
    );
  });
});

describe("absoluteUrl", () => {
  it("joins a root-relative path onto a site with no base path", () => {
    expect(absoluteUrl("/api/latest.md", "https://docs.datadoghq.com")).toBe(
      "https://docs.datadoghq.com/api/latest.md",
    );
  });

  it("preserves the branch segment of a preview site URL", () => {
    expect(
      absoluteUrl(
        "/api/latest/metrics/get-a-metric.md",
        "https://docs-staging.datadoghq.com/my-branch",
      ),
    ).toBe(
      "https://docs-staging.datadoghq.com/my-branch/api/latest/metrics/get-a-metric.md",
    );
  });

  it("does not double the slash when the path already lacks a leading one", () => {
    expect(absoluteUrl("api/latest.md", "https://docs.datadoghq.com")).toBe(
      "https://docs.datadoghq.com/api/latest.md",
    );
  });
});
