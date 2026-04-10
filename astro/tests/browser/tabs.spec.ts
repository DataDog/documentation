import { test, expect } from '@playwright/test';

test.describe('Tabs component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/tabs');
  });

  test('renders tabs on the page', async ({ page }) => {
    const tabs = page.locator('[data-testid="tabs"]');
    await expect(tabs.first()).toBeVisible();
    expect(await tabs.count()).toBeGreaterThanOrEqual(2);
  });

  test('first tab is active by default', async ({ page }) => {
    const firstTab = page.locator('[data-testid="tab-0"]').first();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('clicking a tab switches the active tab', async ({ page }) => {
    const secondTab = page.locator('[data-testid="tab-1"]').first();
    await secondTab.click();

    await expect(secondTab).toHaveAttribute('aria-selected', 'true');

    const panel = page.locator('[data-testid="tabs-panel"]').first();
    await expect(panel).toContainText('Ruby');
  });

  test('clicking a tab deactivates the previous tab', async ({ page }) => {
    const firstTab = page.locator('[data-testid="tab-0"]').first();
    const secondTab = page.locator('[data-testid="tab-1"]').first();

    await secondTab.click();
    await expect(firstTab).toHaveAttribute('aria-selected', 'false');
  });

  test('many-tab instance uses pills layout', async ({ page }) => {
    const pillsTabs = page.locator('[data-testid="tabs"][data-layout="pills"]');
    await expect(pillsTabs).toBeVisible();
  });

  test('pills layout switches tabs on click', async ({ page }) => {
    const pillsTabs = page.locator('[data-testid="tabs"][data-layout="pills"]');
    const tab3 = pillsTabs.locator('[data-testid="tab-2"]');
    await tab3.click();

    await expect(tab3).toHaveAttribute('aria-selected', 'true');
    const panel = pillsTabs.locator('[data-testid="tabs-panel"]');
    await expect(panel).toContainText('Go');
  });
});
