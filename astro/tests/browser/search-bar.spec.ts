import { test, expect } from '@playwright/test';

test.describe('SearchBar component — visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/test_pages/components/search-bar');
  });

  test('closed state matches screenshot', async ({ page }) => {
    const bar = page.locator('.search-bar').first();
    await expect(bar).toBeVisible();
    await expect(bar).toHaveScreenshot('search-bar-closed.png');
  });

  test('focused but empty state does not show the popup', async ({ page }) => {
    const bar = page.locator('.search-bar').first();
    const input = bar.locator('.search-bar__input');
    await input.click();
    await expect(bar.locator('.search-bar__popup')).toHaveCount(0);
  });

  test('renders the side-nav placement on API pages', async ({ page }) => {
    await page.goto('/api/latest/');
    const sidenavSearch = page.locator('.api-side-nav__search .search-bar').first();
    await expect(sidenavSearch).toBeVisible();
  });
});
