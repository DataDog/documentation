import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of the ImgController island.
import preactRenderer from "@astrojs/preact/server.js";
import Img from "../Img.astro";

async function renderImg(props: Record<string, unknown>) {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container.renderToString(Img as never, { props });
}

describe("Img component", () => {
  it("renders a figure-wrapped image by default", async () => {
    const html = await renderImg({
      src: "cicd_optimization/cicd_health.png",
      alt: "CI/CD Health dashboard",
    });

    expect(html).toContain("img__figure");
    expect(html).toContain("<img");
    expect(html).toContain('alt="CI/CD Health dashboard"');
  });

  it("resolves a local srcset in dev mode", async () => {
    const html = await renderImg({ src: "cicd_optimization/cicd_health.png" });

    expect(html).toContain("srcset=");
    expect(html).toContain("cicd_optimization/cicd_health.png");
  });

  it("wraps the image in a popup link by default", async () => {
    const html = await renderImg({
      src: "cicd_optimization/cicd_health.png",
      alt: "CI/CD Health dashboard",
    });

    expect(html).toContain("img__link--popup");
    expect(html).toContain("<a href=");
  });

  it("omits the popup link when popup is false", async () => {
    const html = await renderImg({
      src: "account_management/audit_logs/reference_tables.png",
      popup: false,
    });

    expect(html).not.toContain("img__link--popup");
    expect(html).not.toContain("<a href=");
  });

  it("renders a figcaption when caption is set", async () => {
    const html = await renderImg({
      src: "synthetics/guide/otp-from-email-body/simple_otp.png",
      caption: "Example of an OTP with a simple text field",
    });

    expect(html).toContain("<figcaption");
    expect(html).toContain("Example of an OTP with a simple text field");
  });

  it("omits the figcaption when caption is not set", async () => {
    const html = await renderImg({ src: "cicd_optimization/cicd_health.png" });

    expect(html).not.toContain("<figcaption");
  });

  it("renders a bare inline img with no figure or popup", async () => {
    const html = await renderImg({
      src: "metrics/guide/agent_filtering_for_custom_metrics/show_sidebar.png",
      inline: true,
      width: "22",
    });

    expect(html).not.toContain("img__figure");
    expect(html).not.toContain("<figure");
    expect(html).not.toContain("<a href=");
    expect(html).toContain("<img");
    expect(html).toContain('width="22"');
  });

  it("renders a video instead of an image when video is true", async () => {
    const html = await renderImg({ src: "ci/custom-tags-create-facet.mp4", video: true });

    expect(html).toContain("<video");
    expect(html).toContain("img__video");
    expect(html).not.toContain("<img");
  });

  it("renders the video with autoplay/loop/muted/controls behavior", async () => {
    const html = await renderImg({ src: "ci/custom-tags-create-facet.mp4", video: true });

    expect(html).toContain("muted");
    expect(html).toContain("playsinline");
    expect(html).toContain("autoplay");
    expect(html).toContain("loop");
    expect(html).toContain("controls");
  });

  it("points the video source at the resolved src", async () => {
    const html = await renderImg({ src: "ci/custom-tags-create-facet.mp4", video: true });

    expect(html).toContain("<source src=");
    expect(html).toContain("custom-tags-create-facet.mp4");
  });

  it("prioritizes video over inline when both are true", async () => {
    const html = await renderImg({
      src: "ci/custom-tags-create-facet.mp4",
      video: true,
      inline: true,
    });

    expect(html).toContain("<video");
    expect(html).not.toContain("<img");
  });

  it("applies widthPercent as an inline width style on the rendered image", async () => {
    const html = await renderImg({
      src: "cicd_optimization/cicd_health.png",
      widthPercent: 40,
    });

    expect(html).toMatch(/<img[^>]*style="width:\s*40%;?"/);
  });

  it("omits the style attribute when widthPercent is not set", async () => {
    const html = await renderImg({ src: "cicd_optimization/cicd_health.png" });

    expect(html).not.toContain("style=");
  });
});
