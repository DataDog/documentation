import { test, expect, type Page } from "@playwright/test";

// Table borders from the Tables section of `src/styles/global.css`, checked on
// the typography showcase page. Hugo draws a line between body rows
// (`border-top` on each cell); the first body row has none because the header
// sits directly above it.
const TYPOGRAPHY_URL = "/dd_e2e/integration/typography/";

test.describe("prose table row lines", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TYPOGRAPHY_URL);
  });

  test("body rows after the first have a top border", async ({ page }) => {
    const cell = page
      .locator(".prose table", { hasText: "Row 2, Cell 1" })
      .locator("tbody tr:nth-child(2) td")
      .first();
    const border = await cell.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        width: style.borderTopWidth,
        style: style.borderTopStyle,
        color: style.borderTopColor,
      };
    });

    expect(border.width).toBe("1px");
    expect(border.style).toBe("solid");
    expect(border.color).toBe(await tokenColor(page, "--color-surface-border"));
  });

  test("the first body row has no top border", async ({ page }) => {
    const cell = page
      .locator(".prose table", { hasText: "Row 1, Cell 1" })
      .locator("tbody tr:first-child td")
      .first();
    const borderStyle = await cell.evaluate(
      (element) => getComputedStyle(element).borderTopStyle,
    );

    expect(borderStyle).toBe("none");
  });
});

/** Resolves a color token to the browser's computed `rgb(...)` string. */
async function tokenColor(page: Page, tokenName: string): Promise<string> {
  return page.evaluate((name) => {
    const probe = document.createElement("div");
    probe.style.color = `var(${name})`;
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  }, tokenName);
}
