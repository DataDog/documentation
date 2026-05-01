import { test, expect } from '@playwright/test';

test.describe('Tabs component', () => {
  // Narrow viewport forces the many-tabs instance to overflow into pills layout;
  // retina `deviceScaleFactor` matches the rest of the suite.
  test.use({ viewport: { width: 900, height: 900 }, deviceScaleFactor: 2 });

  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/test_pages/components/tabs');
  });

  test('many-tab instance uses pills layout', async ({ page }) => {
    const pillsTabs = page.locator('.tabs.tabs--pills');
    await expect(pillsTabs).toBeVisible();
  });

  test('pills layout switches tabs on click', async ({ page }) => {
    const pillsTabs = page.locator('.tabs.tabs--pills');
    const tab3 = pillsTabs.locator('.tabs__button[data-tab-index="2"]');
    await tab3.click();

    await expect(tab3).toHaveAttribute('aria-selected', 'true');
    const panel = pillsTabs.locator('.tabs__panel--active');
    await expect(panel).toContainText('Go');
  });

  test('default tabs variant matches screenshot', async ({ page }) => {
    const defaultTabs = page
      .locator('.tabs:not(.tabs--pills)')
      .first();
    await expect(defaultTabs).toHaveScreenshot('tabs-default.png');
  });

  test('pills tabs variant matches screenshot', async ({ page }) => {
    const pillsTabs = page.locator('.tabs.tabs--pills').first();
    await expect(pillsTabs).toHaveScreenshot('tabs-pills.png');
  });

  test('active tab highlighted state matches screenshot', async ({ page }) => {
    const defaultTabs = page
      .locator('.tabs:not(.tabs--pills)')
      .first();
    await defaultTabs.locator('.tabs__button[data-tab-index="2"]').click();
    await expect(defaultTabs.locator('.tabs__button[data-tab-index="2"]')).toHaveAttribute(
      'aria-selected',
      'true'
    );
    await expect(defaultTabs).toHaveScreenshot('tabs-active.png');
  });
});
