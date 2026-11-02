import { test, expect, type Locator } from "@playwright/test";

// Browser tests cover only what the unit tests can't: layout and computed
// styles. The test page renders fixed cases, so nothing depends on live data.

const TEST_PAGE_URL = "/dd_e2e/components/pagination";

const CONTROL_SELECTOR =
  ".pagination__previous, .pagination__page, .pagination__next";

function boxStyle(locator: Locator) {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      borderStyle: style.borderTopStyle,
      borderColor: style.borderTopColor,
      background: style.backgroundColor,
      color: style.color,
    };
  });
}

test.describe("Pagination", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_PAGE_URL);
    await page.evaluate(() => document.fonts.ready);
  });

  test("each control is its own bordered box, apart from its neighbors", async ({
    page,
  }) => {
    const controls = await page
      .locator("#middle-page")
      .locator(CONTROL_SELECTOR)
      .evaluateAll((elements) =>
        elements.map((element) => {
          const box = element.getBoundingClientRect();
          return {
            borderStyle: getComputedStyle(element).borderTopStyle,
            left: box.left,
            right: box.right,
          };
        }),
      );
    // Prev, five page numbers, Next.
    expect(controls).toHaveLength(7);
    for (const control of controls) {
      expect(control.borderStyle).toBe("solid");
    }
    for (let index = 1; index < controls.length; index++) {
      expect(controls[index].left).toBeGreaterThan(controls[index - 1].right);
    }
  });

  test("text is trimmed to its capitals, with equal padding above and below", async ({
    page,
  }) => {
    const controls = await page
      .locator("#middle-page")
      .locator(CONTROL_SELECTOR)
      .evaluateAll((elements) =>
        elements.map((element) => {
          const style = getComputedStyle(element);
          return {
            textBoxTrim: style.textBoxTrim,
            paddingTop: style.paddingTop,
            paddingBottom: style.paddingBottom,
          };
        }),
      );
    expect(controls).toHaveLength(7);
    for (const control of controls) {
      expect(control.textBoxTrim).toBe("trim-both");
      expect(control.paddingTop).toBe(control.paddingBottom);
    }
  });

  test("a single-digit page number is close to square", async ({ page }) => {
    const box = await page
      .locator("#middle-page a.pagination__page", { hasText: /^1$/ })
      .boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width / box!.height).toBeLessThan(1.25);
  });

  test("the current page is filled, its border in the fill color", async ({
    page,
  }) => {
    const current = await boxStyle(
      page.locator("#middle-page .pagination__page--current"),
    );
    const other = await boxStyle(
      page.locator("#middle-page a.pagination__page").first(),
    );
    expect(current.borderColor).toBe(current.background);
    expect(current.background).not.toBe(other.background);
    expect(current.color).not.toBe(other.color);
  });

  test("the ellipsis has no border", async ({ page }) => {
    const ellipsis = page.locator("#middle-page .pagination__ellipsis").first();
    await expect(ellipsis).toHaveCSS("border-top-style", "none");
  });

  // A text color change alone was too subtle to read as disabled.
  test("disabled Prev and Next are grayed out", async ({ page }) => {
    const disabledPrevious = await boxStyle(
      page.locator("#first-page .pagination__previous--disabled"),
    );
    const enabledNext = await boxStyle(
      page.locator("#first-page a.pagination__next"),
    );
    const disabledNext = await boxStyle(
      page.locator("#last-page .pagination__next--disabled"),
    );
    expect(disabledPrevious.color).not.toBe(enabledNext.color);
    expect(disabledPrevious.background).not.toBe(enabledNext.background);
    expect(disabledPrevious.borderColor).not.toBe(enabledNext.borderColor);
    expect(disabledNext).toEqual(disabledPrevious);
  });

  test("a linked control is highlighted on hover", async ({ page }) => {
    const next = page.locator("#middle-page a.pagination__next");
    const before = await boxStyle(next);
    await next.hover();
    await expect
      .poll(async () => (await boxStyle(next)).background)
      .not.toBe(before.background);
  });
});
