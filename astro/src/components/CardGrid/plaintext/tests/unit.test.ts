import { describe, it, expect } from "vitest";
import { cardGridNode } from "../CardGrid";
import { buildMarkdocStr } from "@lib/plaintext/helpers";

function renderCards(cards: Parameters<typeof cardGridNode>[0]): string {
  return buildMarkdocStr([cardGridNode(cards)]);
}

describe("cardGridNode", () => {
  it("emits one unordered list item per card", () => {
    const md = renderCards([
      { href: "/a/", title: "Alpha" },
      { href: "/b/", title: "Beta" },
    ]);

    expect(md).toBe("- [Alpha](/a/)\n- [Beta](/b/)\n");
  });

  it("prefers the title as display text", () => {
    const md = renderCards([{ href: "/mcp_server/setup/?tab=cursor", title: "Cursor" }]);

    expect(md).toContain("[Cursor]");
  });

  it("falls back to the tab query param when there is no title", () => {
    const md = renderCards([{ href: "/mcp_server/setup/?tab=cursor" }]);

    expect(md).toContain("[cursor]");
  });

  it("distinguishes cards that share a path but differ by tab", () => {
    const md = renderCards([
      { href: "/mcp_server/setup/?tab=cursor" },
      { href: "/mcp_server/setup/?tab=claudecode" },
    ]);

    expect(md).toContain("[cursor]");
    expect(md).toContain("[claudecode]");
  });

  it("falls back to the final path segment when there is no title or tab", () => {
    const md = renderCards([
      { href: "/database_monitoring/setup_postgres/rds/" },
    ]);

    expect(md).toContain("[rds]");
  });

  it("ignores a trailing slash when taking the final path segment", () => {
    // Compare the derived link text, not the whole line: hrefs are emitted
    // exactly as authored (normalization belongs to the site-wide link
    // rewriting), so the two outputs legitimately differ in the href itself.
    expect(renderCards([{ href: "/a/b/c/" }])).toBe("- [c](/a/b/c/)\n");
    expect(renderCards([{ href: "/a/b/c" }])).toBe("- [c](/a/b/c)\n");
  });

  it("appends a subtitle after the title", () => {
    const md = renderCards([
      { href: "/serverless/jobs", title: "Jobs", subtitle: "(Preview)" },
    ]);

    expect(md).toContain("[Jobs - (Preview)]");
  });

  it("appends a subtitle after a fallback display text too", () => {
    const md = renderCards([{ href: "/a/b/rds/", subtitle: "(Preview)" }]);

    expect(md).toContain("[rds - (Preview)]");
  });

  it("escapes square brackets in link text", () => {
    const md = renderCards([{ href: "/a/", title: "Alpha [beta]" }]);

    expect(md).toContain("Alpha \\[beta\\]");
  });
});
