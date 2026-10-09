import { describe, expect, it } from "vitest";
import { IMG_URL, mdToMetaDescription, ogImageUrl } from "./seo";

const ogDefault = (file: string) => `${IMG_URL}images/og-default/${file}`;

describe("ogImageUrl", () => {
  it("serves an authored meta_image", () => {
    expect(
      ogImageUrl({
        metaImage: "logs/og-logs.png",
        contentPath: "api/latest/_index.md",
      }),
    ).toBe(`${IMG_URL}images/logs/og-logs.png`);
  });

  // Expected images were read off the live Hugo pages, so these pin parity
  // with Hugo's `meta.html` rotation, not just internal consistency.
  it.each([
    ["api/latest/_index.md", "og-thumbnails-generic5.png"],
    ["api/latest/dashboards/_index.md", "og-thumbnails-generic4.png"],
    ["api/latest/aws-integration/_index.md", "og-thumbnails-generic2.png"],
    [
      "api/latest/dashboards/create-a-new-dashboard/index.md",
      "og-thumbnails-generic3.png",
    ],
    [
      "api/latest/aws-integration/list-all-aws-integrations/index.md",
      "og-thumbnails-generic2.png",
    ],
  ])("rotates the default image by content path: %s", (contentPath, file) => {
    expect(ogImageUrl({ contentPath })).toBe(ogDefault(file));
  });

  it("falls back to generic5 with no content path", () => {
    expect(ogImageUrl({})).toBe(ogDefault("og-thumbnails-generic5.png"));
  });
});

describe("mdToMetaDescription", () => {
  it("strips emphasis, code, heading, and link syntax", () => {
    expect(
      mdToMetaDescription("## Title\n\nSee **the** _docs_ `here` [link](/x)."),
    ).toBe("Title See the docs here link.");
  });

  it("keeps underscores and hashes inside words", () => {
    expect(
      mdToMetaDescription("Use `as_count()` or `as_rate()` from C# code."),
    ).toBe("Use as_count() or as_rate() from C# code.");
  });
});
