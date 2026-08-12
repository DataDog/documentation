import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Img from "../Img.astro";

describe("Img component", () => {
  it("renders a figure-wrapped image by default", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Img, {
      props: { src: "cicd_optimization/cicd_health.png", alt: "CI/CD Health dashboard" },
    });

    expect(html).toContain("img__figure");
    expect(html).toContain("<img");
    expect(html).toContain('alt="CI/CD Health dashboard"');
    expect(html).toContain("cicd_optimization/cicd_health.png");
  });

  it("resolves a local srcset in dev mode", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Img, {
      props: { src: "cicd_optimization/cicd_health.png" },
    });

    expect(html).toContain("srcset=");
    expect(html).toContain("cicd_optimization/cicd_health.png");
  });

  it("wraps the image in a popup link by default", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Img, {
      props: { src: "cicd_optimization/cicd_health.png", alt: "CI/CD Health dashboard" },
    });

    expect(html).toContain("img__link--popup");
    expect(html).toContain("<a href=");
  });

  it("annotates the popup link with lightbox data attributes", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Img, {
      props: { src: "cicd_optimization/cicd_health.png", alt: "CI/CD Health dashboard" },
    });

    expect(html).toContain("data-lightbox-src=");
    expect(html).toContain("cicd_optimization/cicd_health.png");
    expect(html).toContain('data-lightbox-alt="CI/CD Health dashboard"');
  });

  it("omits the lightbox alt attribute when alt is not set", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Img, {
      props: { src: "cicd_optimization/cicd_health.png" },
    });

    expect(html).not.toContain("data-lightbox-alt=");
  });

  it("omits the popup link when popup is false", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Img, {
      props: {
        src: "account_management/audit_logs/reference_tables.png",
        popup: false,
      },
    });

    expect(html).not.toContain("img__link--popup");
    expect(html).not.toContain("<a href=");
  });

  it("renders a figcaption when caption is set", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Img, {
      props: {
        src: "synthetics/guide/otp-from-email-body/simple_otp.png",
        caption: "Example of an OTP with a simple text field",
      },
    });

    expect(html).toContain("<figcaption");
    expect(html).toContain("Example of an OTP with a simple text field");
  });

  it("omits the figcaption when caption is not set", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Img, {
      props: { src: "cicd_optimization/cicd_health.png" },
    });

    expect(html).not.toContain("<figcaption");
  });

  it("renders a bare inline img with no figure or popup", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Img, {
      props: {
        src: "metrics/guide/agent_filtering_for_custom_metrics/show_sidebar.png",
        inline: true,
        width: "22",
      },
    });

    expect(html).not.toContain("img__figure");
    expect(html).not.toContain("<figure");
    expect(html).not.toContain("<a href=");
    expect(html).toContain("<img");
    expect(html).toContain('width="22"');
  });

  it("renders a video instead of an image when video is true", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Img, {
      props: { src: "ci/custom-tags-create-facet.mp4", video: true },
    });

    expect(html).toContain("<video");
    expect(html).toContain("img__video");
    expect(html).toContain("muted");
    expect(html).toContain("playsinline");
    expect(html).toContain("autoplay");
    expect(html).toContain("loop");
    expect(html).toContain("controls");
    expect(html).toContain("<source src=");
    expect(html).toContain("custom-tags-create-facet.mp4");
    expect(html).not.toContain("<img");
  });

  it("prioritizes video over inline when both are true", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Img, {
      props: { src: "ci/custom-tags-create-facet.mp4", video: true, inline: true },
    });

    expect(html).toContain("<video");
    expect(html).not.toContain("<img");
  });

  it("applies the style attribute to the rendered image", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Img, {
      props: { src: "cicd_optimization/cicd_health.png", style: "width:100%;" },
    });

    expect(html).toContain('style="width:100%;"');
  });
});
