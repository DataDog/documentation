import { describe, it, expect } from "vitest";
import { renderMdocWithTwins } from "../twinTransform";

describe("renderMdocWithTwins", () => {
  it("passes plain markdown through unchanged", () => {
    const out = renderMdocWithTwins("# Title\n\nA paragraph.\n");
    expect(out).toContain("# Title");
    expect(out).toContain("A paragraph.");
  });

  it("routes an alert through its twin", () => {
    const source = '{% alert level="warning" %}\nWatch out.\n{% /alert %}';
    const out = renderMdocWithTwins(source);
    expect(out).toContain("{% alert");
    expect(out).toContain('level="warning"');
    expect(out).toContain("Watch out.");
  });

  it("transforms tags nested inside another twin", () => {
    const source = [
      '{% alert level="warning" %}',
      '{% alert level="info" %}',
      "Nested note.",
      "{% /alert %}",
      "{% /alert %}",
    ].join("\n");
    const out = renderMdocWithTwins(source);

    // The outer alert twin runs and its nested alert twin still round-trips
    // its own tag markup.
    expect(out).toContain('{% alert level="warning" %}');
    expect(out).toContain('{% alert level="info" %}');
    expect(out).toContain("Nested note.");
  });
});
