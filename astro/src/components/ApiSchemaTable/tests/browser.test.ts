import { test, expect, type Page } from "@playwright/test";

test.describe("ApiSchemaTable component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/api-schema-table");
  });

  test("renders schema table on the page", async ({ page }) => {
    const table = page.locator(".schema-table");
    await expect(table.first()).toBeVisible();
  });

  test("displays required badge on required fields", async ({ page }) => {
    const badge = page.locator(".schema-table__required");
    await expect(badge.first()).toBeVisible();
    await expect(badge.first()).toHaveText("[required]");
  });

  test("expands nested rows when toggle is clicked", async ({ page }) => {
    await expect(
      page.locator('.schema-table[data-hydrated="true"]').first(),
    ).toBeVisible();
    const toggle = page.locator(".schema-table__toggle").first();
    const children = page.locator(".schema-table__children").first();

    // Children should be hidden initially
    await expect(children).toBeHidden();

    // Click to expand
    await toggle.click();
    await expect(children).toBeVisible();

    // Click again to collapse
    await toggle.click();
    await expect(children).toBeHidden();
  });

  test("expand all button shows all nested rows", async ({ page }) => {
    const table = page
      .locator('.schema-table[data-hydrated="true"]', {
        has: page.locator(".schema-table__expand-all"),
      })
      .first();
    await expect(table).toBeVisible();
    const expandAll = table.locator(".schema-table__expand-all").first();
    await expandAll.click();

    const children = table.locator(".schema-table__children");
    const count = await children.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(children.nth(i)).toBeVisible();
    }
  });

  // Spacing, dividers, toggle position, and deprecated styling are checked by
  // screenshot, so they can change without rewriting assertions.
  test("nested rows look right when expanded", async ({ page }) => {
    const table = await expandAllInTable(page, "after_deep");
    await expect(table).toHaveScreenshot("api-schema-table-deep-expanded.png");
  });

  test("deprecated and required rows look right", async ({ page }) => {
    const table = page
      .locator('.schema-table[data-hydrated="true"]', {
        has: page.locator('[data-field-name="old_field"]'),
      })
      .first();
    await expect(table).toBeVisible();
    await expect(table).toHaveScreenshot(
      "api-schema-table-deprecated-required-rows.png",
    );
  });
});

/** Clicks Expand All on the table holding a field with this name. */
async function expandAllInTable(page: Page, fieldName: string) {
  const table = page
    .locator('.schema-table[data-hydrated="true"]', {
      has: page.locator(`[data-field-name="${fieldName}"]`),
    })
    .first();
  await expect(table).toBeVisible();
  await table.locator(".schema-table__expand-all").click();
  await expect(table.locator(".schema-table__children").last()).toBeVisible();
  // Move off the table so no row is captured in its hover state.
  await page.mouse.move(0, 0);
  return table;
}
