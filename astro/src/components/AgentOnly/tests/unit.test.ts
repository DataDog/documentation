import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import AgentOnly from "../AgentOnly.astro";

describe("AgentOnly component", () => {
  it("wraps its slot content in an agent-only div", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AgentOnly, {
      slots: { default: "Agent instructions." },
    });

    expect(html).toContain("<div");
    // Both Hugo marker classes are preserved so downstream plaintext/copy
    // tooling can still identify the block.
    expect(html).toContain("agent-only");
    expect(html).toContain("plaintext-section");
    expect(html).toContain('title="Instructions for AI agents"');
    expect(html).toContain("Agent instructions.");
  });
});
