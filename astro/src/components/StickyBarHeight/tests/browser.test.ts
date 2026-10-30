import { test, expect, type Page } from "@playwright/test";

// The landing position itself is covered by tests/browser/anchor-offset.spec.ts.
// These cover when StickyBarHeight must NOT move the page after a jump.
//
// They check where an element sits in the viewport, not `scrollY`: when the
// sticky toolbar grows, the browser's scroll anchoring changes `scrollY` to
// keep the content in place on screen, so `scrollY` moves even though the
// reader sees nothing move.

/** Makes the toolbar taller by giving the breadcrumb a title that wraps. */
async function growToolbar(page: Page) {
  const toolbarHeight = () =>
    page
      .locator(".api-toolbar")
      .evaluate((toolbar) => toolbar.getBoundingClientRect().height);
  const before = await toolbarHeight();
  await page.evaluate(() => {
    const label = document.querySelector(
      ".api-toolbar .breadcrumbs__item:last-child .breadcrumbs__label",
    )!;
    label.textContent =
      "A page title long enough to wrap onto several lines in the toolbar breadcrumb";
  });
  await expect.poll(toolbarHeight).toBeGreaterThan(before);
}

/** The element's top edge in the viewport, once it stops moving. */
async function settledTop(page: Page, id: string): Promise<number> {
  const top = () =>
    page.evaluate(
      (targetId) =>
        Math.round(
          document.getElementById(targetId)!.getBoundingClientRect().top,
        ),
      id,
    );
  let previous = Number.NaN;
  await expect
    .poll(async () => {
      const current = await top();
      const settled = current === previous;
      previous = current;
      return settled;
    })
    .toBe(true);
  return previous;
}

test.describe("StickyBarHeight re-align", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("doesn't move the page after the reader scrolls", async ({ page }) => {
    const id = "increase-your-rate-limit";
    await page.goto(`/api/latest/rate-limits/#${id}`);
    await settledTop(page, id);

    await page.mouse.move(180, 500);
    await page.mouse.wheel(0, 300);
    const scrolledTop = await settledTop(page, id);

    await growToolbar(page);
    expect(await settledTop(page, id)).toBe(scrolledTop);
  });

  test("doesn't scroll to an anchor that isn't covered", async ({ page }) => {
    // Version panels sit below the title and version pills, so the page stays
    // at the top when it opens on a panel's anchor.
    const id = "list-all-aws-integrations-v1";
    await page.goto(
      `/api/latest/aws-integration/list-all-aws-integrations/#${id}`,
    );
    const startTop = await settledTop(page, id);

    await growToolbar(page);
    // The panel sits below the toolbar, which pushes it down by the growth.
    // A re-align would instead pull it up to just below the toolbar.
    expect(await settledTop(page, id)).toBeGreaterThanOrEqual(startTop);
  });
});
