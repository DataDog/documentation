import { test, expect } from '@playwright/test';

test.describe('Alert component — visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/test_pages/components/alert');
  });

  const types: Array<'info' | 'danger' | 'warning' | 'tip'> = ['info', 'danger', 'warning', 'tip'];

  for (const type of types) {
    test(`${type} alert matches screenshot`, async ({ page }) => {
      const alert = page
        .locator('.tabs__panel--active')
        .locator(`.alert--${type}`)
        .first();
      await expect(alert).toHaveScreenshot(`alert-${type}.png`);
    });
  }
});
