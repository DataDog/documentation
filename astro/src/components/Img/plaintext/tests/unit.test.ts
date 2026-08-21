import { describe, it, expect } from "vitest";
import { format } from "@markdoc/markdoc";
import { imgNode } from "../Img";

describe("imgNode", () => {
  it("renders an img tag with src and alt", () => {
    const node = imgNode({
      src: "https://prod.img.url",
      alt: "Browse the integration pipeline library",
    });
    const result = format(node);

    expect(result).toContain("{% img");
    expect(result).toContain('src="https://prod.img.url"');
    expect(result).toContain('alt="Browse the integration pipeline library"');
    expect(result).toContain("/%}");
  });

  it("omits the alt attribute when alt is not set", () => {
    const node = imgNode({ src: "https://prod.img.url" });
    const result = format(node);

    expect(result).not.toContain("alt=");
  });

  it("includes caption as an attribute", () => {
    const node = imgNode({
      src: "https://prod.img.url",
      alt: "An example",
      caption: "Example of an OTP field",
    });
    const result = format(node);

    expect(result).toContain('caption="Example of an OTP field"');
  });

  it("omits caption content when caption is not set", () => {
    const node = imgNode({ src: "https://prod.img.url" });
    const result = format(node);

    expect(result.trim()).toBe('{% img src="https://prod.img.url" /%}');
  });

  it("renders video=true for video sources", () => {
    const node = imgNode({ src: "https://prod.video.url", video: true });
    const result = format(node);

    expect(result).toContain('src="https://prod.video.url"');
    expect(result).toContain("video=true");
    expect(result).not.toContain("alt=");
  });

  it("has no errors", () => {
    const node = imgNode({ src: "https://prod.img.url", alt: "An example" });
    expect(node.errors).toHaveLength(0);
  });
});
