import { test, expect } from '@playwright/test';

test.describe('ApiEndpoint component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/test_pages/components/api-endpoint');
  });

  test('renders at least one endpoint section', async ({ page }) => {
    const endpoint = page.locator('.api-endpoint');
    await expect(endpoint.first()).toBeVisible();
  });

  test('renders API method badge', async ({ page }) => {
    const badge = page.locator('.api-method-badge');
    await expect(badge.first()).toBeVisible();
  });

  test('renders endpoint heading with anchor', async ({ page }) => {
    const endpoint = page.locator('.api-endpoint').first();
    const heading = endpoint.locator('h2');
    await expect(heading).toBeVisible();

    const id = await heading.getAttribute('id');
    expect(id).toBeTruthy();
  });

  test('renders the URL path', async ({ page }) => {
    const endpoint = page.locator('.api-endpoint').first();
    const code = endpoint.locator('code').first();
    await expect(code).toBeVisible();
  });

  test('renders deprecated alert on deprecated endpoint', async ({ page }) => {
    const deprecatedEndpoint = page.locator('.api-endpoint').nth(1);
    const alert = deprecatedEndpoint.locator('.api-status-alert');
    await expect(alert).toBeVisible();
  });

  test('renders response section when responses exist', async ({ page }) => {
    const endpoint = page.locator('.api-endpoint').first();
    const response = endpoint.locator('.api-response');
    await expect(response).toBeVisible();
  });

  test('renders code examples when they exist', async ({ page }) => {
    const endpoint = page.locator('.api-endpoint').first();
    const codeExample = endpoint.locator('.api-code-example');
    await expect(codeExample).toBeVisible();
  });

  test('shows only the active region URL (default: datadoghq.com)', async ({ page }) => {
    const endpoint = page.locator('.api-endpoint').first();
    const visibleUrl = endpoint.locator('[data-region="us"]').first();
    await expect(visibleUrl).toBeVisible();
    await expect(visibleUrl).toContainText('datadoghq.com');

    // EU variant is rendered in the DOM but hidden.
    const euUrl = endpoint.locator('[data-region="eu"]').first();
    await expect(euUrl).toBeHidden();
  });
});

test.describe('ApiEndpoint region switching', () => {
  test('swapping the region swaps the visible endpoint URL', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/docs/test_pages/components/api-endpoint');

    await expect(page.locator('.region-selector[data-hydrated="true"]').first()).toBeVisible();
    await page.locator('.region-selector__select').selectOption('eu');

    const endpoint = page.locator('.api-endpoint').first();
    const euUrl = endpoint.locator('[data-region="eu"]').first();
    await expect(euUrl).toBeVisible();
    await expect(euUrl).toContainText('datadoghq.eu');

    const usUrl = endpoint.locator('[data-region="us"]').first();
    await expect(usUrl).toBeHidden();
  });

  test('swapping the region swaps the visible curl command', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/docs/test_pages/components/api-endpoint');

    await expect(page.locator('.region-selector[data-hydrated="true"]').first()).toBeVisible();
    await page.locator('.region-selector__select').selectOption('eu');

    const codeExample = page.locator('.api-code-example').first();
    const euVariant = codeExample.locator('[data-region="eu"]').first();
    await expect(euVariant).toBeVisible();
    await expect(euVariant).toContainText('datadoghq.eu');

    const usVariant = codeExample.locator('[data-region="us"]').first();
    await expect(usVariant).toBeHidden();
  });
});
