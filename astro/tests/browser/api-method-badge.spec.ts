import { test, expect } from '@playwright/test';

test.describe('API Method Badge component — visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/api-method-badge');
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
        .locator(`.api-method-badge--${method}`)
        .first();
      await expect(badge).toHaveScreenshot(`api-method-badge-${method}.png`);
    });
  }
});
