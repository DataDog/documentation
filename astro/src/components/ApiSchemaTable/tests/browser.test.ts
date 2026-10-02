import { test, expect } from "@playwright/test";

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

  test("indents a child's name well past its parent's name", async ({
    page,
  }) => {
    const table = page
      .locator('.schema-table[data-hydrated="true"]', {
        has: page.locator('[data-field-name="data"]'),
      })
      .first();
    await expect(table).toBeVisible();
    await table.locator(".schema-table__expand-all").click();

    const parentName = table.locator(
      '[data-field-name="data"] .schema-table__name',
    );
    const childName = table.locator(
      '[data-field-name="type"][data-depth="1"] .schema-table__name',
    );
    await expect(childName).toBeVisible();

    const parentBox = await parentName.boundingBox();
    const childBox = await childName.boundingBox();
    // Hugo offsets each level ~22px past the parent's name text.
    expect(childBox!.x - parentBox!.x).toBeGreaterThanOrEqual(18);
  });

  test("does not fade deprecated rows", async ({ page }) => {
    const row = page.locator(".schema-table__row--deprecated").first();
    await expect(row).toBeVisible();
    await expect(row).toHaveCSS("opacity", "1");
  });
});
