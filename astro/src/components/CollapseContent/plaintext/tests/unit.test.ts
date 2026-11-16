import { describe, it, expect } from "vitest";
import { parse } from "@markdoc/markdoc";
import { buildMarkdocStr } from "@lib/plaintext/helpers";
import { collapseContentNode } from "../CollapseContent";

const render = (nodes: ReturnType<typeof collapseContentNode>): string =>
  buildMarkdocStr(nodes);

describe("collapseContentNode", () => {
  it("renders the title as a heading followed by its content", () => {
    const children = parse("Hidden away.").children;
    const result = render(collapseContentNode("Advanced options", children));

    // Default level is h3, so the heading uses three hashes.
    expect(result).toContain("### Advanced options");
    expect(result).toContain("Hidden away.");
    // Title comes before the body.
    expect(result.indexOf("Advanced options")).toBeLessThan(
      result.indexOf("Hidden away."),
    );
  });

  it("does not round-trip the collapse-content tag markup", () => {
    const result = render(collapseContentNode("Section"));
    expect(result).not.toContain("{% collapse-content");
    expect(result).not.toContain("{% /collapse-content");
  });

  it("uses the configured heading level", () => {
    const result = render(collapseContentNode("Section", [], { level: "h2" }));
    expect(result).toContain("## Section");
  });
});
