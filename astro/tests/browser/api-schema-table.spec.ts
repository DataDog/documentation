import { test, expect } from '@playwright/test';

test.describe('ApiSchemaTable component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/api-schema-table');
  });

  test('renders schema table on the page', async ({ page }) => {
    const table = page.locator('[data-testid="schema-table"]');
    await expect(table.first()).toBeVisible();
  });

  test('displays required badge on required fields', async ({ page }) => {
    const badge = page.locator('[data-testid="schema-field-required"]');
    await expect(badge.first()).toBeVisible();
    await expect(badge.first()).toHaveText('[required]');
  });

  test('expands nested rows when toggle is clicked', async ({ page }) => {
    const toggle = page.locator('[data-testid="schema-table-toggle"]').first();
    const children = page.locator('[data-testid="schema-table-children"]').first();

    // Children should be hidden initially
    await expect(children).toBeHidden();

    // Click to expand
    await toggle.click();
    await expect(children).toBeVisible();

    // Click again to collapse
    await toggle.click();
    await expect(children).toBeHidden();
  });

  test('expand all button shows all nested rows', async ({ page }) => {
    const expandAll = page.locator('[data-testid="schema-table-expand-all"]').first();
    await expandAll.click();

    const children = page.locator('[data-testid="schema-table-children"]');
    const count = await children.count();

    for (let i = 0; i < count; i++) {
      await expect(children.nth(i)).toBeVisible();
    }
  });
});
