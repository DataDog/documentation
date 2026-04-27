import { test, expect } from '@playwright/test';

test.describe('ApiStatusAlert component — visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/test_pages/components/api-status-alert');
  });

  test('deprecated api status alert matches screenshot', async ({ page }) => {
    const alert = page
      .locator('.tabs__panel--active')
      .locator('.api-status-alert--deprecated')
      .first();
    await expect(alert).toHaveScreenshot('api-status-alert-deprecated.png');
  });

  test('deprecated with newer version link api status alert matches screenshot', async ({ page }) => {
    const alert = page
      .locator('.tabs__panel--active')
      .locator('.api-status-alert--deprecated')
      .nth(1);
    await expect(alert).toHaveScreenshot('api-status-alert-deprecated-newer-version.png');
  });

  test('unstable api status alert matches screenshot', async ({ page }) => {
    const alert = page
      .locator('.tabs__panel--active')
      .locator('.api-status-alert--unstable')
      .first();
    await expect(alert).toHaveScreenshot('api-status-alert-unstable.png');
  });

  test('beta api status alert matches screenshot', async ({ page }) => {
    const alert = page
      .locator('.tabs__panel--active')
      .locator('.api-status-alert--beta')
      .first();
    await expect(alert).toHaveScreenshot('api-status-alert-beta.png');
  });
});
