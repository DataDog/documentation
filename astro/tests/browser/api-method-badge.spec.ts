import { test, expect } from '@playwright/test';

test.describe('API Method Badge component — visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/api-method-badge');
    // Wait for all Tabs islands to finish hydrating and hiding their pre-hydration source.
    await expect(page.locator('[data-tabs-source]').first()).toBeHidden();
  });

  const methods: Array<'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options'> = [
    'get',
    'post',
    'put',
    'patch',
    'delete',
    'head',
    'options',
  ];

  for (const method of methods) {
    test(`${method} badge matches screenshot`, async ({ page }) => {
      const badge = page
        .locator('[data-testid="tabs-panel"]')
        .locator(`[data-testid="api-method-badge"][data-method="${method}"]`)
        .first();
      await expect(badge).toHaveScreenshot(`api-method-badge-${method}.png`);
    });
  }
});
