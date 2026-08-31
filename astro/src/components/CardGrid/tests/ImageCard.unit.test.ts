import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import ImageCard from "../ImageCard.astro";

async function renderCard(props: Record<string, unknown>) {
  const container = await AstroContainer.create();
  return container.renderToString(ImageCard as never, {
    props: { id: "card-grid-abc123-card-0", ...props },
  });
}

describe("ImageCard component", () => {
  it("renders an anchor to the card href", async () => {
    const html = await renderCard({ href: "/integrations/aws/", title: "AWS" });

    expect(html).toContain("image-card");
    expect(html).toContain('href="/integrations/aws/"');
  });

  it("renders an image when src is set", async () => {
    const html = await renderCard({
      href: "/integrations/aws/",
      src: "logos/aws.svg",
      alt: "AWS",
    });

    expect(html).toContain("image-card__image");
    expect(html).toContain("<picture");
    expect(html).toContain('alt="AWS"');
    expect(html).toContain("logos/aws.svg");
  });

  it("defaults the image width to 150 when none is set", async () => {
    const html = await renderCard({
      href: "/integrations/aws/",
      src: "logos/aws.svg",
    });

    expect(html).toContain('width="150"');
  });

  it("uses the resolved image_width when one is set", async () => {
    const html = await renderCard({
      href: "/integrations/aws/",
      src: "logos/aws.svg",
      image_width: 200,
    });

    expect(html).toContain('width="200"');
    expect(html).not.toContain('width="150"');
  });

  it("renders a title-only card's title as an h5", async () => {
    const html = await renderCard({
      href: "/getting_started/",
      title: "Getting Started",
    });

    expect(html).toMatch(/<h5[^>]*image-card__title/);
    expect(html).toContain("Getting Started");
  });

  it("renders a title alongside an image as a paragraph, not an h5", async () => {
    const html = await renderCard({
      href: "/integrations/datadog/",
      src: "logos/dd.png",
      title: "Datadog",
    });

    expect(html).toMatch(/<p[^>]*image-card__title/);
    expect(html).not.toContain("<h5");
  });

  it("renders a subtitle when set", async () => {
    const html = await renderCard({
      href: "/serverless/jobs",
      title: "Jobs",
      subtitle: "(Preview)",
    });

    expect(html).toContain("image-card__subtitle");
    expect(html).toContain("(Preview)");
  });

  it("omits the subtitle element when unset", async () => {
    const html = await renderCard({ href: "/serverless/jobs", title: "Jobs" });

    expect(html).not.toContain("image-card__subtitle");
  });

  it("applies the has-title modifier only when a title is set", async () => {
    const titled = await renderCard({ href: "/a/", title: "A" });
    const untitled = await renderCard({ href: "/a/", src: "logos/a.svg" });

    expect(titled).toContain("image-card--has-title");
    expect(untitled).not.toContain("image-card--has-title");
  });

  it("labels the anchor with the tooltip text for screen readers", async () => {
    const html = await renderCard({
      href: "/integrations/aws/",
      src: "logos/aws.svg",
      tooltip: "Amazon Web Services integration",
    });

    expect(html).toContain('aria-label="Amazon Web Services integration"');
  });

  it("omits aria-label when there is no tooltip", async () => {
    const html = await renderCard({ href: "/a/", src: "logos/a.svg" });

    expect(html).not.toContain("aria-label");
  });

  it("does not emit Bootstrap tooltip data attributes", async () => {
    const html = await renderCard({
      href: "/a/",
      src: "logos/a.svg",
      tooltip: "Alpha",
    });

    expect(html).not.toContain("data-bs-");
  });
});
