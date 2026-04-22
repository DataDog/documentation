import { test, expect } from '@playwright/test';

test.describe('Alert component — visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/alert');
    // Wait for all Tabs islands to finish hydrating and hiding their pre-hydration source.
    await expect(page.locator('[data-tabs-source]').first()).toBeHidden();
  });

  const types: Array<'info' | 'danger' | 'warning' | 'tip'> = ['info', 'danger', 'warning', 'tip'];

  for (const type of types) {
    test(`${type} alert matches screenshot`, async ({ page }) => {
      const alert = page
        .locator('[data-testid="tabs-panel"]')
        .locator(`[data-alert-type="${type}"]`)
        .first();
      await expect(alert).toHaveScreenshot(`alert-${type}.png`);
    });
  }
});
