import { describe, it, expect } from "vitest";
import { renderMdocWithTwins } from "../twinTransform";

describe("renderMdocWithTwins", () => {
  it("passes plain markdown through unchanged", () => {
    const out = renderMdocWithTwins("# Title\n\nA paragraph.\n");
    expect(out).toContain("# Title");
    expect(out).toContain("A paragraph.");
  });

  it("renders a card grid as a flat link list", () => {
    const source = [
      "{% card-grid %}",
      '{% image-card href="/a/" title="A" /%}',
      '{% image-card href="/b/" title="B" /%}',
      "{% /card-grid %}",
    ].join("\n");
    const out = renderMdocWithTwins(source);

    expect(out).toContain("- [A](/a.md)");
    expect(out).toContain("- [B](/b.md)");
  });

  it("drops a card's image, alt, tooltip, and width from the link list", () => {
    const source = [
      "{% card-grid %}",
      '{% image-card href="/a/" title="Alpha" src="logos/a.svg"',
      'alt="A logo" tooltip="Alpha tooltip" image_width=200 /%}',
      "{% /card-grid %}",
    ].join(" ");
    const out = renderMdocWithTwins(source);

    expect(out).toContain("- [Alpha](/a.md)");
    expect(out).not.toContain("logos/a.svg");
    expect(out).not.toContain("A logo");
    expect(out).not.toContain("Alpha tooltip");
    expect(out).not.toContain("image_width");
  });

  it("renders card-grid cards that Markdoc grouped into a paragraph", () => {
    // Two self-closing tags on one line become inline siblings inside a
    // paragraph rather than direct children of the grid. Reading only direct
    // children would emit an empty list and silently lose both cards.
    const source = [
      "{% card-grid %}",
      '{% image-card href="/a/" title="A" /%} {% image-card href="/b/" title="B" /%}',
      "{% /card-grid %}",
    ].join("\n");
    const out = renderMdocWithTwins(source);

    expect(out).toContain("- [A](/a.md)");
    expect(out).toContain("- [B](/b.md)");
  });

  it("renders collapse-content as a heading, not tag markup", () => {
    const source = [
      '{% collapse-content title="Section" %}',
      "Body text.",
      "{% /collapse-content %}",
    ].join("\n");
    const out = renderMdocWithTwins(source);

    expect(out).toContain("### Section");
    expect(out).toContain("Body text.");
    expect(out).not.toContain("{% collapse-content");
    expect(out).not.toContain("{% /collapse-content");
  });

  it("uses the configured heading level for collapse-content", () => {
    const source = [
      '{% collapse-content title="Section" level="h4" %}',
      "Body text.",
      "{% /collapse-content %}",
    ].join("\n");
    const out = renderMdocWithTwins(source);

    expect(out).toContain("#### Section");
  });

  it("routes an alert through its twin", () => {
    const source = '{% alert level="warning" %}\nWatch out.\n{% /alert %}';
    const out = renderMdocWithTwins(source);
    expect(out).toContain("{% alert");
    expect(out).toContain('level="warning"');
    expect(out).toContain("Watch out.");
  });

  it("renders a stepper as numbered headings, not tag markup", () => {
    const source = [
      "{% stepper %}",
      '{% step title="First" %}',
      "Do the first thing.",
      "{% /step %}",
      '{% step title="Second" %}',
      "Do the second thing.",
      "{% /step %}",
      "{% /stepper %}",
    ].join("\n");
    const out = renderMdocWithTwins(source);

    expect(out).toContain("### Step 1: First");
    expect(out).toContain("Do the first thing.");
    expect(out).toContain("### Step 2: Second");
    expect(out).toContain("Do the second thing.");
    expect(out).not.toContain("{% stepper");
    expect(out).not.toContain("{% step");
  });

  it("routes an img through its twin, resolving src to the CDN URL", () => {
    const source =
      '{% img src="cicd_optimization/cicd_health.png" alt="CI/CD Health dashboard" /%}';
    const out = renderMdocWithTwins(source);

    expect(out).toContain("{% img");
    expect(out).toContain(
      'src="https://docs-staging.dd-static.net/images/cicd_optimization/cicd_health.png"',
    );
    expect(out).toContain('alt="CI/CD Health dashboard"');
  });

  it("drops inline images from the output", () => {
    const source =
      '{% img src="icons/pencil.png" inline=true width="22" height="22" /%}';
    const out = renderMdocWithTwins(source);

    expect(out).not.toContain("{% img");
  });

  it("drops layout-only attributes from img but keeps caption as an attribute", () => {
    const source = [
      "{% img",
      'src="synthetics/guide/otp-from-email-body/simple_otp.png"',
      'alt="Example of an OTP with a simple text field"',
      "widthPercent=40",
      'caption="Example of an OTP with a simple text field"',
      "/%}",
    ].join(" ");
    const out = renderMdocWithTwins(source);

    expect(out).not.toContain("widthPercent=");
    expect(out).toContain(
      'caption="Example of an OTP with a simple text field"',
    );
  });

  it("marks a video img with video=true", () => {
    const source =
      '{% img src="ci/custom-tags-create-facet.mp4" alt="Facet creation" video=true /%}';
    const out = renderMdocWithTwins(source);

    expect(out).toContain(
      'src="https://docs-staging.dd-static.net/images/ci/custom-tags-create-facet.mp4"',
    );
    expect(out).toContain("video=true");
  });

  it("transforms tags nested inside another twin", () => {
    const source = [
      '{% collapse-content title="Outer" %}',
      '{% alert level="info" %}',
      "Nested note.",
      "{% /alert %}",
      "{% /collapse-content %}",
    ].join("\n");
    const out = renderMdocWithTwins(source);

    // The collapse-content wrapper becomes a heading; its nested alert twin
    // still runs and round-trips its own tag markup.
    expect(out).toContain("### Outer");
    expect(out).toContain('{% alert level="info" %}');
    expect(out).toContain("Nested note.");
  });

  it("resolves card-grid hrefs against site when one is given", () => {
    const source = [
      "{% card-grid %}",
      '{% image-card href="/a/" title="A" /%}',
      "{% /card-grid %}",
    ].join("\n");
    const out = renderMdocWithTwins(source, {
      site: "https://docs.datadoghq.com",
    });

    expect(out).toContain("- [A](https://docs.datadoghq.com/a.md)");
  });

  it("still points card-grid hrefs at the .md twin when no site is given", () => {
    // The two rewrites are independent: the twin is where the content lives
    // either way, so only the origin is missing without a `site`.
    const source = [
      "{% card-grid %}",
      '{% image-card href="/a/" title="A" /%}',
      "{% /card-grid %}",
    ].join("\n");
    const out = renderMdocWithTwins(source);

    expect(out).toContain("- [A](/a.md)");
    expect(out).not.toContain("docs.datadoghq.com");
  });
});
