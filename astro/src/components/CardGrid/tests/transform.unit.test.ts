import { describe, it, expect } from "vitest";
import Markdoc from "@markdoc/markdoc";
import type { Config, RenderableTreeNode, Tag } from "@markdoc/markdoc";
import config from "../../../../markdoc.config.mjs";

/**
 * Astro's config is not assignable to Markdoc's own `Config`, and cannot be.
 * Markdoc pins its render type to `string`; Astro widens it to
 * `ComponentConfig | AstroInstance["default"] | string` so `component()` can
 * return a config object instead of a tag name (@astrojs/markdoc
 * config.d.ts:5,12). The runtime accepts it — Astro passes this same object to
 * Markdoc.transform in its own renderer — so the cast is at this one boundary
 * rather than suppressed per call.
 */
const markdocConfig = config as unknown as Config;

/**
 * Narrow a transform-output node to a Tag.
 */
function asTag(node: RenderableTreeNode | undefined): Tag {
  if (!Markdoc.Tag.isTag(node)) {
    throw new Error(`expected a Markdoc Tag, got ${JSON.stringify(node)}`);
  }
  return node;
}

/**
 * Transform a `.mdoc` source string and return the single top-level
 * card-grid tag, with its children.
 *
 * `Markdoc.transform` returns one Tag whose `children` hold the rendered
 * tags. Astro's `component()` render value is `{ type: "local", path }`, so
 * a tag is identified by its render path rather than by a tag name.
 */
function transformGrid(source: string): Tag {
  const rendered = asTag(
    Markdoc.transform(Markdoc.parse(source), markdocConfig),
  );
  const grid = rendered.children.find((child) => {
    if (!Markdoc.Tag.isTag(child)) return false;
    // Astro's `component()` render value is `{ type: "local", path }`, so the
    // tag's `name` is that object rather than a string.
    const render = child.name as unknown as { path?: string };
    return render?.path?.endsWith("CardGrid.astro") ?? false;
  });
  if (!grid) throw new Error("no card-grid tag in transform output");
  return asTag(grid);
}

function cardTags(source: string): Tag[] {
  return transformGrid(source).children.map(asTag);
}

function cardAttributes(source: string): Record<string, any>[] {
  return cardTags(source).map((card) => card.attributes);
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
    const ids = grid.children.map((card) => asTag(card).attributes.id);

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
    const [alpha, , gamma] = grid.children.map(
      (card) => asTag(card).attributes.id,
    );

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

    expect(grid.attributes.tooltipLabelsByCardId).toEqual({
      [alphaId]: "Alpha",
    });
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
