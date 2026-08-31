import { describe, it, expect } from "vitest";
import Markdoc from "@markdoc/markdoc";
import config from "../../../../markdoc.config.mjs";

/**
 * Transform a `.mdoc` source string and return the single top-level
 * card-grid tag, with its children.
 *
 * `Markdoc.transform` returns one Tag whose `children` hold the rendered
 * tags. Astro's `component()` render value is `{ type: "local", path }`, so
 * a tag is identified by its render path rather than by a tag name.
 */
function transformGrid(source: string) {
  const rendered = Markdoc.transform(Markdoc.parse(source), config);
  const grid = rendered.children.find(
    (child: any) => child?.name?.path?.endsWith("CardGrid.astro"),
  );
  if (!grid) throw new Error("no card-grid tag in transform output");
  return grid;
}

function cardAttributes(source: string) {
  return transformGrid(source).children.map((card) => card.attributes);
}

describe("card-grid transform", () => {
  it("renders cards that Markdoc grouped into a paragraph", () => {
    // Two self-closing tags on one line are inline siblings, so Markdoc wraps
    // them in a paragraph instead of making them direct children of the grid.
    // The validator already walks into paragraphs and accepts these, so a
    // transform that only reads direct children would silently drop both
    // cards and emit an empty grid with no error.
    const cards = cardAttributes(
      `{% card-grid %}\n{% image-card href="/a/" title="A" /%} {% image-card href="/b/" title="B" /%}\n{% /card-grid %}`,
    );

    expect(cards).toHaveLength(2);
    expect(cards.map((card) => card.title)).toEqual(["A", "B"]);
  });

  it("passes card_width through to the grid", () => {
    const grid = transformGrid(
      `{% card-grid card_width=225 %}\n{% image-card href="/a/" title="A" /%}\n{% /card-grid %}`,
    );

    expect(grid.attributes.card_width).toBe(225);
  });

  it("defaults card_width to 150", () => {
    const grid = transformGrid(
      `{% card-grid %}\n{% image-card href="/a/" title="A" /%}\n{% /card-grid %}`,
    );

    expect(grid.attributes.card_width).toBe(150);
  });

  it("pushes the parent image_width down to a child that did not set one", () => {
    const [card] = cardAttributes(
      `{% card-grid image_width=100 %}\n{% image-card href="/a/" src="logos/a.svg" /%}\n{% /card-grid %}`,
    );

    expect(card.image_width).toBe(100);
  });

  it("lets a child override the parent image_width", () => {
    const [card] = cardAttributes(
      `{% card-grid image_width=100 %}\n{% image-card href="/a/" src="logos/a.svg" image_width=200 /%}\n{% /card-grid %}`,
    );

    expect(card.image_width).toBe(200);
  });

  it("leaves image_width undefined when neither sets it", () => {
    const [card] = cardAttributes(
      `{% card-grid %}\n{% image-card href="/a/" src="logos/a.svg" /%}\n{% /card-grid %}`,
    );

    expect(card.image_width).toBeUndefined();
  });

  it("gives every card a distinct id scoped to the grid", () => {
    const grid = transformGrid(
      `{% card-grid %}\n{% image-card href="/a/" title="A" /%}\n{% image-card href="/b/" title="B" /%}\n{% /card-grid %}`,
    );
    const ids = grid.children.map((card) => card.attributes.id);

    expect(new Set(ids).size).toBe(2);
    for (const id of ids) {
      expect(id.startsWith(grid.attributes.id)).toBe(true);
    }
  });

  it("collects only the cards that have a tooltip", () => {
    const grid = transformGrid(
      `{% card-grid %}\n` +
        `{% image-card href="/a/" src="logos/a.svg" tooltip="Alpha" /%}\n` +
        `{% image-card href="/b/" src="logos/b.svg" /%}\n` +
        `{% image-card href="/c/" src="logos/c.svg" tooltip="Gamma" /%}\n` +
        `{% /card-grid %}`,
    );
    const [alpha, , gamma] = grid.children.map((card) => card.attributes.id);

    expect(grid.attributes.tooltipCardIds).toEqual([alpha, gamma]);
  });

  it("maps each tooltip card id to its label", () => {
    const grid = transformGrid(
      `{% card-grid %}\n` +
        `{% image-card href="/a/" src="logos/a.svg" tooltip="Alpha" /%}\n` +
        `{% image-card href="/b/" src="logos/b.svg" /%}\n` +
        `{% /card-grid %}`,
    );
    const [alphaId] = grid.attributes.tooltipCardIds;

    expect(grid.attributes.tooltipLabelsByCardId).toEqual({ [alphaId]: "Alpha" });
  });

  it("leaves tooltipCardIds empty when no card has a tooltip", () => {
    const grid = transformGrid(
      `{% card-grid %}\n{% image-card href="/a/" title="A" /%}\n{% /card-grid %}`,
    );

    expect(grid.attributes.tooltipCardIds).toEqual([]);
  });

  it("skips whitespace text nodes between cards", () => {
    const grid = transformGrid(
      `{% card-grid %}\n\n{% image-card href="/a/" title="A" /%}\n\n{% image-card href="/b/" title="B" /%}\n\n{% /card-grid %}`,
    );

    expect(grid.children).toHaveLength(2);
  });
});
