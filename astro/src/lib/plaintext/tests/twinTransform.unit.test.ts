import { describe, it, expect } from "vitest";
import { renderMdocWithTwins } from "../twinTransform";

describe("renderMdocWithTwins", () => {
  it("passes plain markdown through unchanged", () => {
    const out = renderMdocWithTwins("# Title\n\nA paragraph.\n");
    expect(out).toContain("# Title");
    expect(out).toContain("A paragraph.");
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
      'src="http://docs-staging.dd-static.net/images/cicd_optimization/cicd_health.png"',
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
      'src="http://docs-staging.dd-static.net/images/ci/custom-tags-create-facet.mp4"',
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
});
