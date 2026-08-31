import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of the tooltip island.
import preactRenderer from "@astrojs/preact/server.js";
import CardGrid from "../CardGrid.astro";

async function renderGrid(props: Record<string, unknown>) {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container.renderToString(CardGrid as never, {
    props: {
      id: "card-grid-abc123",
      card_width: 150,
      tooltipCardIds: [],
      tooltipLabelsByCardId: {},
      ...props,
    },
    slots: { default: "<a>card</a>" },
  });
}

describe("CardGrid component", () => {
  it("renders a grid wrapper carrying its id", async () => {
    const html = await renderGrid({});

    expect(html).toContain("card-grid");
    expect(html).toContain('id="card-grid-abc123"');
  });

  it("exposes card_width as the --card-min-width custom property in px", async () => {
    const html = await renderGrid({ card_width: 225 });

    expect(html).toContain("--card-min-width: 225px");
  });

  it("renders its cards", async () => {
    const html = await renderGrid({});

    expect(html).toContain("<a>card</a>");
  });

  it("mounts no tooltip island when no card has a tooltip", async () => {
    const html = await renderGrid({ tooltipCardIds: [] });

    expect(html).not.toContain("astro-island");
  });

  it("mounts a tooltip island when at least one card has a tooltip", async () => {
    const html = await renderGrid({
      tooltipCardIds: ["card-grid-abc123-card-0"],
      tooltipLabelsByCardId: { "card-grid-abc123-card-0": "Alpha" },
    });

    expect(html).toContain("astro-island");
  });
});
