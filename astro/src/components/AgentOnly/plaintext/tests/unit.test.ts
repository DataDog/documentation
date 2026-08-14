import { describe, it, expect } from "vitest";
import { format, parse } from "@markdoc/markdoc";
import { agentOnlyNode } from "../AgentOnly";

describe("agentOnlyNode", () => {
  it("returns a node with no errors", () => {
    const node = agentOnlyNode([]);
    expect(node.errors).toHaveLength(0);
  });

  it("keeps its content when formatted as plaintext", () => {
    // The rendered component is hidden from humans, but the plaintext twin must
    // retain the content (wrapped in the tag) so AI agents consuming the .md
    // still receive the instructions.
    const children = parse("Instructions for the agent.").children;
    const node = agentOnlyNode(children);
    const result = format(node);

    expect(result).toContain("{% agent-only %}");
    expect(result).toContain("Instructions for the agent.");
    expect(result).toContain("{% /agent-only %}");
  });
});
