import { test, expect } from "@playwright/test";

// Grid order matches the section order in
// src/content/en/dd_e2e/components/card-grid.mdoc.
const TOOLTIP_GRID_INDEX = 3;
const PLAIN_GRID_INDEX = 0;

/**
 * The tooltip island is `client:idle`, so its listeners attach whenever the
 * browser next goes idle. A hover dispatched before then is simply lost: it
 * fires no `mouseenter` on an element that has no listener yet, and because
 * Playwright's synthetic hover moves the pointer exactly once, nothing ever
 * re-triggers it — the assertion then burns its full timeout on a tooltip that
 * will never open. Under a saturated worker pool idle time arrives late enough
 * for this to happen regularly, which is why it surfaced only in full runs.
 *
 * Waiting for `data-hydrated` (the convention used across this repo — see
 * Tabs, CodeBlock, and SearchBar's browser tests) closes that window.
 */
async function waitForTooltipHydration(
  grid: import("@playwright/test").Locator,
) {
  await expect(
    grid.locator('.card-grid__tooltip[data-hydrated="true"]'),
  ).toBeAttached();
}

/**
 * Wait for every image inside a grid to finish decoding.
 *
 * The cards use `loading="lazy"` (ImageCard.astro), so whether an image has
 * pixels by screenshot time depends on where the grid sits in the page — and
 * therefore on how much content precedes it. Without this, editing the fixture
 * page above a grid silently re-races these snapshots, and a baseline can be
 * captured with some logos still blank.
 *
 * `scrollIntoViewIfNeeded` triggers the lazy load; `complete` plus a non-zero
 * `naturalWidth` is what distinguishes a decoded image from one that is still
 * fetching or has failed.
 */
async function waitForGridImages(grid: import("@playwright/test").Locator) {
  await grid.scrollIntoViewIfNeeded();
  const images = grid.locator(".image-card__image");
  const count = await images.count();
  for (let index = 0; index < count; index++) {
    await expect
      .poll(() =>
        images
          .nth(index)
          .evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
      )
      .toBe(true);
  }
}

test.describe("CardGrid component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/card-grid");
  });

  test("renders every grid on the page", async ({ page }) => {
    await expect(page.locator(".card-grid")).toHaveCount(9);
  });

  test("positions the tooltip over its card inside a positioned ancestor", async ({
    page,
  }) => {
    // This grid sits inside a tab panel, and `.tabs`/`.tabs__panel` are both
    // `position: relative` (Tabs.module.css). An absolutely positioned bubble
    // using page coordinates would resolve against that ancestor instead of
    // the page and land far from its card, so this pins the bubble to the card
    // rather than merely asserting that it opened.
    //
    // Scoped to the tab pane rather than picked by position, so appending
    // sections to the test page cannot silently retarget it.
    const grid = page.locator(".tabs__panel .card-grid");
    const tooltip = grid.locator(".card-grid__tooltip");

    await waitForTooltipHydration(grid);
    const card = grid.locator(".image-card").first();
    await card.scrollIntoViewIfNeeded();
    await card.hover();
    await expect(tooltip).toHaveClass(/card-grid__tooltip--visible/);

    const cardBox = await card.boundingBox();
    const tooltipBox = await tooltip.boundingBox();
    if (!cardBox || !tooltipBox) {
      throw new Error(
        "Expected both the card and the open tooltip to have a layout box.",
      );
    }

    // Sits just above the card, horizontally centered on it.
    const gapAboveCard = cardBox.y - (tooltipBox.y + tooltipBox.height);
    expect(gapAboveCard).toBeGreaterThanOrEqual(0);
    expect(gapAboveCard).toBeLessThan(20);

    const cardCenterX = cardBox.x + cardBox.width / 2;
    const tooltipCenterX = tooltipBox.x + tooltipBox.width / 2;
    expect(Math.abs(tooltipCenterX - cardCenterX)).toBeLessThan(2);
  });

  test("shows a tooltip on hover and hides it on mouseleave", async ({
    page,
  }) => {
    const grid = page.locator(".card-grid").nth(TOOLTIP_GRID_INDEX);
    const card = grid.locator(".image-card").first();
    const tooltip = grid.locator(".card-grid__tooltip");

    await waitForTooltipHydration(grid);
    await card.hover();
    await expect(tooltip).toHaveClass(/card-grid__tooltip--visible/);
    await expect(tooltip).toHaveText("Amazon Web Services integration");

    await page.mouse.move(0, 0);
    await expect(tooltip).not.toHaveClass(/card-grid__tooltip--visible/);
  });

  test("shows the tooltip on keyboard focus", async ({ page }) => {
    const grid = page.locator(".card-grid").nth(TOOLTIP_GRID_INDEX);
    const tooltip = grid.locator(".card-grid__tooltip");

    await waitForTooltipHydration(grid);
    await grid.locator(".image-card").first().focus();

    await expect(tooltip).toHaveClass(/card-grid__tooltip--visible/);
  });

  test("hides the tooltip when Escape is pressed", async ({ page }) => {
    const grid = page.locator(".card-grid").nth(TOOLTIP_GRID_INDEX);
    const tooltip = grid.locator(".card-grid__tooltip");

    await waitForTooltipHydration(grid);
    await waitForGridImages(grid);
    await grid.locator(".image-card").first().hover();
    await expect(tooltip).toHaveClass(/card-grid__tooltip--visible/);

    await page.keyboard.press("Escape");

    await expect(tooltip).not.toHaveClass(/card-grid__tooltip--visible/);
  });

  test("clicking a card navigates, so the tooltip does not swallow the click", async ({
    page,
  }) => {
    const grid = page.locator(".card-grid").nth(TOOLTIP_GRID_INDEX);

    await grid.locator(".image-card").first().click();

    await expect(page).toHaveURL(/\/integrations\/aws\//);
  });

  test("hydrates no tooltip island in a grid with no tooltips", async ({
    page,
  }) => {
    const grid = page.locator(".card-grid").nth(PLAIN_GRID_INDEX);

    // Two assertions, because they claim different things. No bubble is the
    // visible outcome; no `astro-island` is the actual guarantee — the grid
    // omits the island from its HTML entirely (CardGrid.astro short-circuits
    // on `needsTooltips`), so the browser never opens a hydration boundary or
    // fetches the island's JS. An island that mounted and rendered nothing
    // would satisfy the first assertion while quietly costing that work on
    // every tooltip-free grid, which is the regression this pins.
    await expect(grid.locator(".card-grid__tooltip")).toHaveCount(0);
    await expect(grid.locator("astro-island")).toHaveCount(0);
  });

  test("hydrates a tooltip island only in the grids that need one", async ({
    page,
  }) => {
    // The counterpart to the assertion above: proves the island is omitted
    // because no card asked for a tooltip, not because it never renders at
    // all. Sections 4 and 8 are the two tooltip grids on the fixture page.
    await expect(page.locator(".card-grid astro-island")).toHaveCount(2);
    await expect(
      page
        .locator(".card-grid")
        .nth(TOOLTIP_GRID_INDEX)
        .locator("astro-island"),
    ).toHaveCount(1);
  });

  test("applies the inherited image width to every card in the grid", async ({
    page,
  }) => {
    // Section 5: {% card-grid image_width=100 %} with three cards, none
    // setting its own width. (Unquoted numeric literal — Markdoc's Number
    // schema type does not coerce a quoted string.)
    const images = page
      .locator(".card-grid")
      .nth(4)
      .locator(".image-card__image");

    await expect(images).toHaveCount(3);
    for (const image of await images.all()) {
      await expect(image).toHaveAttribute("width", "100");
    }
  });

  test("applies card_width as the card's width", async ({ page }) => {
    // Section 7 sets card_width=225; every other grid uses the 150 default.
    // Asserting the RENDERED width, not the inline style string, is what makes
    // the --card-grid-card-width plumbing load-bearing: if the CSS read a
    // different property name, the declaration would silently fall back to
    // 150px and only a measured card would notice.
    const wide = page.locator(".card-grid").nth(6);
    const narrow = page.locator(".card-grid").nth(0);

    const wideCard = await wide.locator(".image-card").first().boundingBox();
    const narrowCard = await narrow
      .locator(".image-card")
      .first()
      .boundingBox();
    if (!wideCard || !narrowCard) {
      throw new Error(
        "Expected a layout box for the first card of both grids.",
      );
    }

    expect(wideCard.width).toBeGreaterThan(narrowCard.width);
    expect(wideCard.width).toBeGreaterThanOrEqual(225);
  });

  test("lets a card override the grid's image width", async ({ page }) => {
    // Section 6: grid sets 100; only the FIRST card sets 200. Asserting both
    // halves keeps this honest — a bug that ignored image_width entirely and
    // fell back to the 150 default would fail, and so would one that leaked
    // the override onto its siblings.
    const images = page
      .locator(".card-grid")
      .nth(5)
      .locator(".image-card__image");

    await expect(images.nth(0)).toHaveAttribute("width", "200");
    await expect(images.nth(1)).toHaveAttribute("width", "100");
    await expect(images.nth(2)).toHaveAttribute("width", "100");
  });
});

test.describe("CardGrid visual snapshots", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/card-grid");
  });

  test("basic image card", async ({ page }) => {
    const grid = page.locator(".card-grid").nth(0);
    await waitForGridImages(grid);
    await expect(grid).toHaveScreenshot("card-grid-basic.png");
  });

  test("titled and subtitled card", async ({ page }) => {
    const grid = page.locator(".card-grid").nth(1);
    await waitForGridImages(grid);
    await expect(grid).toHaveScreenshot("card-grid-titled.png");
  });

  test("tooltip open", async ({ page }) => {
    const grid = page.locator(".card-grid").nth(3);
    const tooltip = grid.locator(".card-grid__tooltip");

    await waitForTooltipHydration(grid);
    await grid.locator(".image-card").first().hover();
    await expect(tooltip).toHaveClass(/card-grid__tooltip--visible/);

    // The bubble is positioned above its card (CardGridTooltips.tsx), so on
    // this page it renders above the grid's own top edge. A screenshot scoped
    // to `grid` would clip it entirely, so the region is expanded to the
    // union of the grid's box and the open tooltip's box.
    //
    // That union also catches the bottom sliver of the section heading above
    // the grid, which is deliberate: tightening the region to exclude the
    // heading risks clipping the bubble itself under font or viewport
    // variance, which would leave this snapshot silently capturing no tooltip.
    // So editing the heading text on the fixture page is an expected, harmless
    // cause of a diff here — re-baseline it rather than reading it as a
    // component regression.
    const gridBox = await grid.boundingBox();
    const tooltipBox = await tooltip.boundingBox();
    if (!gridBox || !tooltipBox) {
      throw new Error(
        "Expected both the grid and the open tooltip to have a layout box.",
      );
    }
    const top = Math.min(gridBox.y, tooltipBox.y);
    const left = Math.min(gridBox.x, tooltipBox.x);
    const right = Math.max(
      gridBox.x + gridBox.width,
      tooltipBox.x + tooltipBox.width,
    );
    const bottom = Math.max(
      gridBox.y + gridBox.height,
      tooltipBox.y + tooltipBox.height,
    );

    await expect(page).toHaveScreenshot("card-grid-tooltip-open.png", {
      clip: { x: left, y: top, width: right - left, height: bottom - top },
    });
  });
  test("keeps a short bottom row's cards the same width as a full row", async ({
    page,
  }) => {
    // Section 9 has 7 cards, so its last row is short at every common width
    // (5+2 at 1440, 4+3 at 1024, 3+3+1 at 800). Cards are `flex: 0 0 <width>`,
    // so a short row keeps their width; dropping to `flex: 1` or moving back
    // to a `1fr` grid track would stretch them to fill the leftover space,
    // which is what measuring every card against the others catches.
    const grid = page.locator(".card-grid").nth(8);
    const boxes: { x: number; y: number; width: number; height: number }[] = [];
    for (const card of await grid.locator(".image-card").all()) {
      const box = await card.boundingBox();
      if (!box) throw new Error("Expected a layout box for every card.");
      boxes.push(box);
    }

    const rowTops = new Set(boxes.map((box) => Math.round(box.y)));
    expect(rowTops.size).toBeGreaterThan(1);

    // The last row really is short: fewer cards than the widest row.
    const cardsPerRow = [...rowTops].map(
      (top) => boxes.filter((box) => Math.round(box.y) === top).length,
    );
    const lastRowCount = cardsPerRow[cardsPerRow.length - 1];
    expect(lastRowCount).toBeLessThan(Math.max(...cardsPerRow));

    const widths = new Set(boxes.map((box) => Math.round(box.width)));
    expect(widths.size).toBe(1);
  });
});
