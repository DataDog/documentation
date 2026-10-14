import { test, expect } from "@playwright/test";

test.describe("Alert component — visual", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/alert");
  });

  const types: Array<"info" | "danger" | "warning" | "tip"> = [
    "info",
    "danger",
    "warning",
    "tip",
  ];

  for (const type of types) {
    test(`${type} alert matches screenshot`, async ({ page }) => {
      const alert = page
        .locator(".tabs__panel--active")
        .locator(`.alert--${type}`)
        .first();
      await expect(alert).toHaveScreenshot(`alert-${type}.png`);
    });
  }
});

test.describe("Alert component — spacing", () => {
  test("the last paragraph adds no space below the text", async ({ page }) => {
    await page.goto("/dd_e2e/components/alert");
    const alert = page
      .locator(".tabs__panel--active")
      .locator(".alert--info")
      .first();

    // Without this, the paragraph's margin-bottom sits on top of the alert's
    // bottom padding, so the space below the text is larger than above it.
    const lastChildMarginBottom = await alert.evaluate((element) =>
      parseFloat(getComputedStyle(element.lastElementChild!).marginBottom),
    );

    expect(lastChildMarginBottom).toBe(0);
  });
});
