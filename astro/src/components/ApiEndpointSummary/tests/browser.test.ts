import { test, expect } from '@playwright/test';

test.describe('ApiEndpointSummary component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/test_pages/components/api-endpoint-summary');
  });

  test('renders a heading linking to the endpoint page', async ({ page }) => {
    const summary = page.locator('.api-endpoint-summary').first();
    const link = summary.locator('.api-endpoint-summary__link');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/api/latest/dashboards/get-a-dashboard/');
  });

  test('renders the method badge', async ({ page }) => {
    const summary = page.locator('.api-endpoint-summary').first();
    await expect(summary.locator('.api-method-badge')).toBeVisible();
  });

  test('renders a deprecated badge on the deprecated endpoint', async ({ page }) => {
    const badge = page.locator('.api-endpoint-summary__badge--deprecated');
    await expect(badge).toBeVisible();
  });

  test('shows only the active region URL (default: datadoghq.com)', async ({ page }) => {
    const summary = page.locator('.api-endpoint-summary').first();
    const usUrl = summary.locator('[data-region="us"]').first();
    await expect(usUrl).toBeVisible();
    await expect(usUrl).toContainText('datadoghq.com');

    const euUrl = summary.locator('[data-region="eu"]').first();
    await expect(euUrl).toBeHidden();
  });
});

test.describe('ApiEndpointSummary region switching', () => {
  test('swapping the region swaps the visible endpoint URL', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/docs/test_pages/components/api-endpoint-summary');

    await expect(page.locator('.region-selector[data-hydrated="true"]').first()).toBeVisible();
    await page.locator('.region-selector .select__control').selectOption('eu');

    const summary = page.locator('.api-endpoint-summary').first();
    const euUrl = summary.locator('[data-region="eu"]').first();
    await expect(euUrl).toBeVisible();
    await expect(euUrl).toContainText('datadoghq.eu');

    const usUrl = summary.locator('[data-region="us"]').first();
    await expect(usUrl).toBeHidden();
  });
});
