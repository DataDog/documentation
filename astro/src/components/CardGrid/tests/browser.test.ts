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
async function waitForTooltipHydration(grid: import("@playwright/test").Locator) {
  await expect(grid.locator('.card-grid__tooltip[data-hydrated="true"]')).toBeAttached();
}

test.describe("CardGrid component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/card-grid");
  });

  test("renders every grid on the page", async ({ page }) => {
    await expect(page.locator(".card-grid")).toHaveCount(8);
  });

  test("positions the tooltip over its card inside a positioned ancestor", async ({
    page,
  }) => {
    // The last grid sits inside a tab pane, and `.tabs`/`.tabs__pane` are both
    // `position: relative` (Tabs.module.css). An absolutely positioned bubble
    // using page coordinates would resolve against that ancestor instead of
    // the page and land far from its card, so this pins the bubble to the card
    // rather than merely asserting that it opened.
    const grid = page.locator(".card-grid").last();
    const tooltip = grid.locator(".card-grid__tooltip");

    await waitForTooltipHydration(grid);
    const card = grid.locator(".image-card").first();
    await card.scrollIntoViewIfNeeded();
    await card.hover();
    await expect(tooltip).toHaveClass(/card-grid__tooltip--visible/);

    const cardBox = await card.boundingBox();
    const tooltipBox = await tooltip.boundingBox();
    if (!cardBox || !tooltipBox) {
      throw new Error("Expected both the card and the open tooltip to have a layout box.");
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

    await expect(grid.locator(".card-grid__tooltip")).toHaveCount(0);
  });

  test("applies the inherited image width to every card in the grid", async ({
    page,
  }) => {
    // Section 5: {% card-grid image_width=100 %} with two cards, neither
    // setting its own width. (Unquoted numeric literal — Markdoc's Number
    // schema type does not coerce a quoted string.)
    const images = page.locator(".card-grid").nth(4).locator(".image-card__image");

    await expect(images).toHaveCount(2);
    await expect(images.nth(0)).toHaveAttribute("width", "100");
    await expect(images.nth(1)).toHaveAttribute("width", "100");
  });

  test("lets a card override the grid's image width", async ({ page }) => {
    // Section 6: grid sets 100, the single card sets 200.
    const image = page.locator(".card-grid").nth(5).locator(".image-card__image");

    await expect(image).toHaveAttribute("width", "200");
  });
});

test.describe("CardGrid visual snapshots", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/card-grid");
  });

  test("basic image card", async ({ page }) => {
    await expect(page.locator(".card-grid").nth(0)).toHaveScreenshot(
      "card-grid-basic.png",
    );
  });

  test("titled and subtitled card", async ({ page }) => {
    await expect(page.locator(".card-grid").nth(1)).toHaveScreenshot(
      "card-grid-titled.png",
    );
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
      throw new Error("Expected both the grid and the open tooltip to have a layout box.");
    }
    const top = Math.min(gridBox.y, tooltipBox.y);
    const left = Math.min(gridBox.x, tooltipBox.x);
    const right = Math.max(gridBox.x + gridBox.width, tooltipBox.x + tooltipBox.width);
    const bottom = Math.max(gridBox.y + gridBox.height, tooltipBox.y + tooltipBox.height);

    await expect(page).toHaveScreenshot("card-grid-tooltip-open.png", {
      clip: { x: left, y: top, width: right - left, height: bottom - top },
    });
  });
});
