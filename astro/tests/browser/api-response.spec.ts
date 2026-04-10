import { test, expect } from '@playwright/test';

test.describe('ApiResponse component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/api-response');
  });

  test('renders the response section', async ({ page }) => {
    const response = page.locator('[data-testid="api-response"]');
    await expect(response.first()).toBeVisible();
  });

  test('shows status code tabs', async ({ page }) => {
    const tabs = page.locator('[data-testid="api-response-tabs"]').first();
    await expect(tabs).toBeVisible();
  });

  test('first status code tab is active by default', async ({ page }) => {
    const firstTab = page.locator('[data-testid^="api-response-tab-"]').first();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('clicking a status code tab switches the panel', async ({ page }) => {
    const tabs = page.locator('[data-testid^="api-response-tab-"]');
    const count = await tabs.count();

    if (count >= 2) {
      const secondTab = tabs.nth(1);
      await secondTab.click();
      await expect(secondTab).toHaveAttribute('aria-selected', 'true');

      // First tab should be deselected
      const firstTab = tabs.first();
      await expect(firstTab).toHaveAttribute('aria-selected', 'false');
    }
  });

  test('model/example toggle switches between views', async ({ page }) => {
    const toggle = page.locator('[data-testid="api-response-model-example-toggle"]').first();
    await expect(toggle).toBeVisible();

    const buttons = toggle.getByRole('button');
    const count = await buttons.count();
    expect(count).toBe(2);

    // Click the second button (Example view)
    await buttons.nth(1).click();
    await expect(buttons.nth(1)).toHaveAttribute('aria-selected', 'true');
  });
});
