import { test, expect } from "@playwright/test";
import { chooseSelectOption } from "./chooseSelectOption";

// Runs against the live demo on the Select test page. Unit tests cover the
// keyboard and ARIA logic; these cover what only a real browser can: layout
// and the hydrated island reporting changes.
test.describe("Select component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/select");
    await expect(
      page.locator('.select-demo[data-hydrated="true"]'),
    ).toBeVisible();
  });

  test("opens the menu below the button without covering it", async ({
    page,
  }) => {
    const button = page.locator(".select-demo .select__button");
    const menu = page.locator(".select-demo .select__menu");

    await button.click();
    await expect(menu).toBeVisible();

    const buttonBox = (await button.boundingBox())!;
    const menuBox = (await menu.boundingBox())!;
    expect(menuBox.y).toBeGreaterThanOrEqual(buttonBox.y + buttonBox.height);
  });

  // The demo sits inside `.prose`, whose global list rules add an indent and
  // an en-dash bullet to every <ul>/<li>.
  test("menu ignores prose list styling", async ({ page }) => {
    await page.locator(".select-demo .select__button").click();

    const menu = page.locator(".select-demo .select__menu");
    const firstOption = page.locator(".select-demo .select__option").first();
    await expect(menu).toHaveCSS("padding-left", "0px");
    const bulletContent = await firstOption.evaluate(
      (option) => getComputedStyle(option, "::before").content,
    );
    expect(bulletContent).toBe("none");
    await expect(firstOption).not.toHaveCSS("padding-left", "0px");
  });

  test("reports the chosen value", async ({ page }) => {
    const demo = page.locator(".select-demo");

    await chooseSelectOption(demo, "cherry");

    await expect(demo.locator(".select")).toHaveAttribute(
      "data-value",
      "cherry",
    );
    await expect(demo.locator(".select-demo__value")).toHaveText("cherry");
  });

  test("chooses with the keyboard and returns focus to the button", async ({
    page,
  }) => {
    const demo = page.locator(".select-demo");
    const button = demo.locator(".select__button");

    await button.focus();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await expect(demo.locator(".select-demo__value")).toHaveText("banana");
    await expect(button).toBeFocused();
  });
});
