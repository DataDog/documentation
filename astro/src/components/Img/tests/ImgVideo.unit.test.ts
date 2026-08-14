// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/preact";
import { h } from "preact";
import type { ComponentType } from "preact";
import ImgVideo from "../ImgVideo";

const ImgVideoComponent = ImgVideo as ComponentType<any>;

const baseProps = {
  imageUrl: "/videos/content/example.mp4",
};

const renderImgVideo = (props: Record<string, unknown> = {}) =>
  render(h(ImgVideoComponent, { ...baseProps, ...props }));

describe("ImgVideo", () => {
  it("renders a figure-wrapped video", () => {
    const { container } = renderImgVideo();

    expect(container.querySelector(".img__figure")).not.toBeNull();
    expect(container.querySelector("video.img__video")).not.toBeNull();
  });

  it("renders with autoplay/loop/muted/controls behavior", () => {
    const { container } = renderImgVideo();

    const video = container.querySelector("video")!;
    expect(video.hasAttribute("muted")).toBe(true);
    expect(video.hasAttribute("playsinline")).toBe(true);
    expect(video.hasAttribute("autoplay")).toBe(true);
    expect(video.hasAttribute("loop")).toBe(true);
    expect(video.hasAttribute("controls")).toBe(true);
  });

  it("points the video source at the resolved imageUrl", () => {
    const { container } = renderImgVideo();

    const source = container.querySelector("source");
    expect(source?.getAttribute("src")).toBe(baseProps.imageUrl);
    expect(source?.getAttribute("type")).toBe("video/mp4");
  });

  it("applies width/height attributes when set", () => {
    const { container } = renderImgVideo({ width: "640", height: "360" });

    const video = container.querySelector("video")!;
    expect(video.getAttribute("width")).toBe("640");
    expect(video.getAttribute("height")).toBe("360");
  });

  it("applies widthPercent as an inline width style", () => {
    const { container } = renderImgVideo({ widthPercent: 40 });

    const video = container.querySelector("video") as HTMLElement;
    expect(video.style.width).toBe("40%");
  });

  it("omits the style attribute when widthPercent is not set", () => {
    const { container } = renderImgVideo();

    const video = container.querySelector("video")!;
    expect(video.hasAttribute("style")).toBe(false);
  });
});
