import { describe, expect, it } from "vitest";
import { IMAGES_URL } from "@config/images";
import { mdToMetaDescription, ogImageUrl } from "./seo";

const ogDefault = (file: string) => `${IMAGES_URL}/images/og-default/${file}`;

describe("ogImageUrl", () => {
  it("serves an authored meta_image", () => {
    expect(
      ogImageUrl({
        metaImage: "logs/og-logs.png",
        contentPath: "api/latest/_index.md",
      }),
    ).toBe(`${IMAGES_URL}/images/logs/og-logs.png`);
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

  it("keeps a description that fits whole", () => {
    expect(mdToMetaDescription("Get a thing. It has two sentences.")).toBe(
      "Get a thing. It has two sentences.",
    );
  });

  it("uses the first sentence of a description that's too long", () => {
    const long = `Create a monitor using the specified options. ${"More detail. ".repeat(20)}`;
    expect(mdToMetaDescription(long)).toBe(
      "Create a monitor using the specified options.",
    );
  });

  it("ends the first sentence at a heading or list, so they don't run together", () => {
    const long = `Create a monitor\n\n#### Monitor Types\n\n- anomaly: query alert\n${"- more: detail\n".repeat(20)}`;
    expect(mdToMetaDescription(long)).toBe("Create a monitor");
  });

  it("doesn't end a sentence at a period inside a word", () => {
    const long = `Patch a test using JSON Patch (RFC 6902), e.g. a v1.2 change. ${"More detail. ".repeat(20)}`;
    expect(mdToMetaDescription(long)).toBe(
      "Patch a test using JSON Patch (RFC 6902), e.g. a v1.2 change.",
    );
  });

  it("cuts a first sentence that's still too long at a word boundary", () => {
    const sentence = `${"word ".repeat(40)}end.`;
    const out = mdToMetaDescription(`${sentence} Next sentence.`);
    expect(out.length).toBeLessThanOrEqual(156);
    expect(out).toMatch(/^word( word)*…$/);
  });
});
