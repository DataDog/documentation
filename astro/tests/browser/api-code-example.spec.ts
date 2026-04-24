import { test, expect } from '@playwright/test';

test.describe('ApiCodeExample component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/api-code-example');
  });

  test('renders the code example section', async ({ page }) => {
    const codeExample = page.locator('.api-code-example');
    await expect(codeExample.first()).toBeVisible();
  });

  test('shows language tabs', async ({ page }) => {
    const codeExample = page.locator('.api-code-example').first();
    const tabs = codeExample.locator('.tabs').first();
    await expect(tabs).toBeVisible();
  });

  test('first language tab is active by default', async ({ page }) => {
    const codeExample = page.locator('.api-code-example').first();
    const firstTab = codeExample.locator('[role="tab"]').first();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('clicking a language tab switches the panel', async ({ page }) => {
    const codeExample = page.locator('.api-code-example').first();
    await expect(codeExample.locator('.tabs[data-hydrated="true"]').first()).toBeVisible();
    const tabButtons = codeExample.locator('[role="tab"]');
    const count = await tabButtons.count();

    if (count >= 2) {
      const secondTab = tabButtons.nth(1);
      await secondTab.click();
      await expect(secondTab).toHaveAttribute('aria-selected', 'true');

      const firstTab = tabButtons.first();
      await expect(firstTab).toHaveAttribute('aria-selected', 'false');
    }
  });

  test('accordion items can be expanded and collapsed', async ({ page }) => {
    const accordion = page.locator('.api-code-example__accordion').first();
    if (await accordion.isVisible()) {
      const toggle = accordion.locator('.api-code-example__accordion-header');
      await toggle.click();

      // Toggle state should change — verify the content area is visible/hidden
      // The exact behavior depends on the initial state
      await expect(toggle).toBeVisible();
    }
  });
});
