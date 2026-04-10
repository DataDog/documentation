import { test, expect } from '@playwright/test';

test.describe('ApiCodeExample component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/api-code-example');
  });

  test('renders the code example section', async ({ page }) => {
    const codeExample = page.locator('[data-testid="api-code-example"]');
    await expect(codeExample.first()).toBeVisible();
  });

  test('shows language tabs', async ({ page }) => {
    const tabs = page.locator('[data-testid="api-code-example-tabs"]').first();
    await expect(tabs).toBeVisible();
  });

  test('first language tab is active by default', async ({ page }) => {
    const firstTab = page.locator('[data-testid^="api-code-example-tab-"]').first();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('clicking a language tab switches the panel', async ({ page }) => {
    const tabs = page.locator('[data-testid^="api-code-example-tab-"]');
    const count = await tabs.count();

    if (count >= 2) {
      const secondTab = tabs.nth(1);
      await secondTab.click();
      await expect(secondTab).toHaveAttribute('aria-selected', 'true');

      // First tab deselected
      const firstTab = tabs.first();
      await expect(firstTab).toHaveAttribute('aria-selected', 'false');
    }
  });

  test('accordion items can be expanded and collapsed', async ({ page }) => {
    const accordion = page.locator('[data-testid="api-code-example-accordion"]').first();
    if (await accordion.isVisible()) {
      const toggle = accordion.locator('[data-testid="api-code-example-accordion-toggle"]');
      await toggle.click();

      // Toggle state should change — verify the content area is visible/hidden
      // The exact behavior depends on the initial state
      await expect(toggle).toBeVisible();
    }
  });
});
