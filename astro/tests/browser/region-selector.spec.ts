import { test, expect } from '@playwright/test';

test.describe('RegionSelector component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/region-selector');
  });

  test('renders the region selector', async ({ page }) => {
    const selector = page.locator('[data-testid="region-selector"]');
    await expect(selector).toBeVisible();
  });

  test('defaults to US1 region', async ({ page }) => {
    const select = page.locator('[data-testid="region-selector-select"]');
    await expect(select).toHaveValue('us1');
  });

  test('changes region when a different option is selected', async ({ page }) => {
    const select = page.locator('[data-testid="region-selector-select"]');
    await select.selectOption('eu');
    await expect(select).toHaveValue('eu');
  });

  test('persists selection in localStorage', async ({ page }) => {
    const select = page.locator('[data-testid="region-selector-select"]');
    await select.selectOption('eu');

    const stored = await page.evaluate(() => localStorage.getItem('dd-api-region'));
    expect(stored).toBe('eu');
  });

  test('sets data-region attribute on document element', async ({ page }) => {
    const select = page.locator('[data-testid="region-selector-select"]');
    await select.selectOption('ap1');

    const region = await page.evaluate(() =>
      document.documentElement.getAttribute('data-region')
    );
    expect(region).toBe('ap1');
  });
});
