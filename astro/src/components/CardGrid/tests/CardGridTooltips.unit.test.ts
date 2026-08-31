// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";
import CardGridTooltips from "../CardGridTooltips";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

/**
 * Preact flushes state updates asynchronously, so an assertion made in the
 * same tick as a dispatched event still sees the pre-update DOM. The
 * `userEvent` helpers await internally; a raw `dispatchEvent` does not, so
 * the focus/blur tests below have to yield explicitly.
 */
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

const GRID_ID = "card-grid-abc123";
const CARD_IDS = [`${GRID_ID}-card-0`, `${GRID_ID}-card-1`];
const LABELS = {
  [CARD_IDS[0]]: "Amazon Web Services",
  [CARD_IDS[1]]: "Google Cloud",
};

/**
 * Build server-equivalent grid markup (plain BEM classes, as classListFactory
 * emits) and mount the island into it, mirroring production where the DOM
 * exists before the island hydrates.
 */
function mountTooltips() {
  const grid = document.createElement("div");
  grid.id = GRID_ID;
  grid.className = "card-grid";

  for (const cardId of CARD_IDS) {
    const card = document.createElement("a");
    card.id = cardId;
    card.className = "image-card";
    card.href = "/integrations/";
    card.setAttribute("aria-label", LABELS[cardId]);
    grid.appendChild(card);
  }

  const islandHost = document.createElement("div");
  grid.appendChild(islandHost);
  document.body.appendChild(grid);

  // `container` must be passed as an option. Testing Library's `render` treats
  // a bare second argument as an options object, NOT a mount point — passing
  // `islandHost` directly mounts into a detached div appended to <body>, and
  // the `bubble()` lookup below (scoped to `grid`) then returns null.
  render(
    h(CardGridTooltips, {
      externalContext: { scope: GRID_ID, entries: { cardEls: CARD_IDS } },
      tooltipLabelsByCardId: LABELS,
    }),
    { container: islandHost },
  );

  return {
    grid,
    cards: CARD_IDS.map((id) => document.getElementById(id) as HTMLElement),
    bubble: () => grid.querySelector(".card-grid__tooltip") as HTMLElement,
  };
}

describe("CardGridTooltips", () => {
  it("marks the bubble as hydrated once its listeners are attached", async () => {
    // The island is client:idle, so a hover before this flag appears finds no
    // listener and is silently dropped. Browser tests gate on the attribute to
    // avoid that race, which only works if it tracks real listener readiness.
    const { bubble } = mountTooltips();
    await flush();

    expect(bubble().getAttribute("data-hydrated")).toBe("true");
  });

  it("renders a hidden bubble before any interaction", () => {
    const { bubble } = mountTooltips();

    expect(bubble()).toBeTruthy();
    expect(bubble().classList.contains("card-grid__tooltip--visible")).toBe(
      false,
    );
  });

  it("marks the bubble aria-hidden so it does not double-announce", () => {
    const { bubble } = mountTooltips();

    expect(bubble().getAttribute("aria-hidden")).toBe("true");
  });

  it("shows the hovered card's label", async () => {
    const user = userEvent.setup();
    const { cards, bubble } = mountTooltips();

    await user.hover(cards[0]);

    expect(bubble().classList.contains("card-grid__tooltip--visible")).toBe(
      true,
    );
    expect(bubble().textContent).toBe("Amazon Web Services");
  });

  it("hides the bubble on mouseleave", async () => {
    const user = userEvent.setup();
    const { cards, bubble } = mountTooltips();

    await user.hover(cards[0]);
    await user.unhover(cards[0]);

    expect(bubble().classList.contains("card-grid__tooltip--visible")).toBe(
      false,
    );
  });

  it("shows only one tooltip at a time when moving between cards", async () => {
    const user = userEvent.setup();
    const { grid, cards, bubble } = mountTooltips();

    await user.hover(cards[0]);
    await user.unhover(cards[0]);
    await user.hover(cards[1]);

    expect(grid.querySelectorAll(".card-grid__tooltip")).toHaveLength(1);
    expect(bubble().textContent).toBe("Google Cloud");
  });

  it("shows the tooltip on keyboard focus", async () => {
    const { cards, bubble } = mountTooltips();
    await flush();

    cards[0].dispatchEvent(new FocusEvent("focus"));
    await flush();

    expect(bubble().classList.contains("card-grid__tooltip--visible")).toBe(
      true,
    );
  });

  it("hides the tooltip on blur", async () => {
    const { cards, bubble } = mountTooltips();
    await flush();

    cards[0].dispatchEvent(new FocusEvent("focus"));
    await flush();
    cards[0].dispatchEvent(new FocusEvent("blur"));
    await flush();

    expect(bubble().classList.contains("card-grid__tooltip--visible")).toBe(
      false,
    );
  });

  it("hides the tooltip when Escape is pressed", async () => {
    const user = userEvent.setup();
    const { cards, bubble } = mountTooltips();

    await user.hover(cards[0]);
    await user.keyboard("{Escape}");

    expect(bubble().classList.contains("card-grid__tooltip--visible")).toBe(
      false,
    );
  });
});
