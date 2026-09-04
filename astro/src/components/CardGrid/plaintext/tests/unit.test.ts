import { describe, it, expect } from "vitest";
import { cardGridNode } from "../CardGrid";
import { buildMarkdocStr } from "@lib/plaintext/helpers";

function renderCards(
  cards: Parameters<typeof cardGridNode>[0],
  site?: Parameters<typeof cardGridNode>[1],
): string {
  return buildMarkdocStr([cardGridNode(cards, site)]);
}

describe("cardGridNode", () => {
  it("emits one unordered list item per card", () => {
    const md = renderCards([
      { href: "/a/", title: "Alpha" },
      { href: "/b/", title: "Beta" },
    ]);

    expect(md).toBe("- [Alpha](/a.md)\n- [Beta](/b.md)\n");
  });

  it("prefers the title as display text", () => {
    const md = renderCards([
      { href: "/mcp_server/setup/?tab=cursor", title: "Cursor" },
    ]);

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
    // Both spellings land on the same twin, so here the trailing slash makes no
    // difference to the href either.
    expect(renderCards([{ href: "/a/b/c/" }])).toBe("- [c](/a/b/c.md)\n");
    expect(renderCards([{ href: "/a/b/c" }])).toBe("- [c](/a/b/c.md)\n");
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

  it("leaves the href relative, but still a .md twin, with no site", () => {
    // `.md` rewriting and origin resolution are independent: without a `site`
    // there is no origin to resolve against, but the twin is still the target.
    const md = renderCards([{ href: "/a/", title: "Alpha" }]);

    expect(md).toBe("- [Alpha](/a.md)\n");
  });

  it("resolves hrefs against site when one is given", () => {
    const md = renderCards(
      [{ href: "/integrations/aws/", title: "AWS" }],
      "https://docs.datadoghq.com",
    );

    expect(md).toBe("- [AWS](https://docs.datadoghq.com/integrations/aws.md)\n");
  });

  it("keeps the branch prefix that site carries in a preview build", () => {
    // `site` is `https://docs-staging.datadoghq.com/{branch}` in preview, so
    // resolving against its origin alone would drop the branch segment and
    // point every card at the staging root.
    const md = renderCards(
      [{ href: "/integrations/aws/", title: "AWS" }],
      "https://docs-staging.datadoghq.com/heston/card-grid",
    );

    expect(md).toContain(
      "https://docs-staging.datadoghq.com/heston/card-grid/integrations/aws.md",
    );
  });

  it("preserves a query string and fragment when resolving", () => {
    const md = renderCards(
      [{ href: "/mcp_server/setup/?tab=cursor#install" }],
      "https://docs.datadoghq.com",
    );

    expect(md).toContain(
      "https://docs.datadoghq.com/mcp_server/setup.md?tab=cursor#install",
    );
    // Display text still comes from the tab param, not the absolute URL.
    expect(md).toContain("[cursor]");
  });

  it("leaves an already-absolute href alone", () => {
    const md = renderCards(
      [{ href: "https://www.datadoghq.com/pricing/", title: "Pricing" }],
      "https://docs.datadoghq.com",
    );

    expect(md).toBe("- [Pricing](https://www.datadoghq.com/pricing/)\n");
  });

  it("adds the .md extension before a fragment", () => {
    const md = renderCards(
      [{ href: "/code_analysis/sca/#lockfiles", title: "SCA" }],
      "https://docs.datadoghq.com",
    );

    expect(md).toBe(
      "- [SCA](https://docs.datadoghq.com/code_analysis/sca.md#lockfiles)\n",
    );
  });

  it("adds the .md extension to an href with no trailing slash", () => {
    const md = renderCards(
      [{ href: "/integrations/aws", title: "AWS" }],
      "https://docs.datadoghq.com",
    );

    expect(md).toBe(
      "- [AWS](https://docs.datadoghq.com/integrations/aws.md)\n",
    );
  });

  it("does not double up an href that already ends in .md", () => {
    const md = renderCards(
      [{ href: "/integrations/aws.md", title: "AWS" }],
      "https://docs.datadoghq.com",
    );

    expect(md).toBe(
      "- [AWS](https://docs.datadoghq.com/integrations/aws.md)\n",
    );
  });

  it("leaves an external href's path alone", () => {
    // Only Datadog docs pages have a plaintext twin; appending `.md` to an
    // outside URL would invent a page that does not exist.
    const md = renderCards(
      [{ href: "https://www.datadoghq.com/pricing/", title: "Pricing" }],
      "https://docs.datadoghq.com",
    );

    expect(md).toBe("- [Pricing](https://www.datadoghq.com/pricing/)\n");
  });

  it("still derives display text from the pre-.md href", () => {
    // The `.md` suffix must not leak into the fallback link text.
    const md = renderCards(
      [{ href: "/database_monitoring/setup_postgres/rds/" }],
      "https://docs.datadoghq.com",
    );

    expect(md).toContain("[rds]");
    expect(md).not.toContain("[rds.md]");
  });
});
