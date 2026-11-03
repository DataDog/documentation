import { test, expect, type Page } from "@playwright/test";

test.describe("ApiRequestBodyTabs — titled examples", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/api-request-body-tabs");
    await openExampleTab(page);
  });

  const entries = (page: Page) =>
    page.locator("#titled .request-body-tabs__accordion");

  async function openExampleTab(page: Page) {
    const tablist = page.locator(
      '#titled [role="tablist"][data-hydrated="true"]',
    );
    await expect(tablist).toBeVisible();
    await tablist.locator('[role="tab"]', { hasText: "Example" }).click();
  }

  test("shows the first example and collapses the rest", async ({ page }) => {
    await expect(entries(page)).toHaveCount(3);
    await expect(entries(page).nth(0)).toHaveAttribute("open", "");
    await expect(entries(page).nth(1)).not.toHaveAttribute("open");
    await expect(entries(page).nth(2)).not.toHaveAttribute("open");
    await expect(entries(page).nth(0).locator(".code-block")).toBeVisible();
    await expect(entries(page).nth(1).locator(".code-block")).toBeHidden();
  });

  test("opening another example closes the open one", async ({ page }) => {
    await entries(page)
      .nth(1)
      .locator(".request-body-tabs__accordion-header")
      .click();

    await expect(entries(page).nth(1)).toHaveAttribute("open", "");
    await expect(entries(page).nth(1).locator(".code-block")).toBeVisible();
    await expect(entries(page).nth(0)).not.toHaveAttribute("open");
  });
});
