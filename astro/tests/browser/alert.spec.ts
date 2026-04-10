import { test, expect } from '@playwright/test';

test.describe('Alert component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/alert');
  });

  test('renders all alert types', async ({ page }) => {
    const types = ['info', 'warning', 'error', 'success'];

    for (const type of types) {
      const alert = page.locator(`[data-alert-type="${type}"]`).first();
      await expect(alert).toBeVisible();
    }
  });

  test('each alert displays its label', async ({ page }) => {
    await expect(page.getByText('Info:')).toBeVisible();
    await expect(page.getByText('Warning:')).toBeVisible();
    await expect(page.getByText('Error:')).toBeVisible();
    await expect(page.getByText('Success:')).toBeVisible();
  });
});
