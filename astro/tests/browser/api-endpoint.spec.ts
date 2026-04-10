import { test, expect } from '@playwright/test';

test.describe('ApiEndpoint component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/api-endpoint');
  });

  test('renders at least one endpoint section', async ({ page }) => {
    const endpoint = page.locator('[data-testid="api-endpoint"]');
    await expect(endpoint.first()).toBeVisible();
  });

  test('renders HTTP method badge', async ({ page }) => {
    const badge = page.locator('[data-testid="http-method-badge"]');
    await expect(badge.first()).toBeVisible();
  });

  test('renders endpoint heading with anchor', async ({ page }) => {
    const endpoint = page.locator('[data-testid="api-endpoint"]').first();
    const heading = endpoint.locator('h2');
    await expect(heading).toBeVisible();

    const id = await heading.getAttribute('id');
    expect(id).toBeTruthy();
  });

  test('renders the URL path', async ({ page }) => {
    const endpoint = page.locator('[data-testid="api-endpoint"]').first();
    const code = endpoint.locator('code').first();
    await expect(code).toBeVisible();
  });

  test('renders deprecated alert on deprecated endpoint', async ({ page }) => {
    const deprecatedEndpoint = page.locator('[data-testid="api-endpoint"]').nth(1);
    const alert = deprecatedEndpoint.locator('[data-testid="api-status-alert"]');
    await expect(alert).toBeVisible();
  });

  test('renders response section when responses exist', async ({ page }) => {
    const endpoint = page.locator('[data-testid="api-endpoint"]').first();
    const response = endpoint.locator('[data-testid="api-response"]');
    await expect(response).toBeVisible();
  });

  test('renders code examples when they exist', async ({ page }) => {
    const endpoint = page.locator('[data-testid="api-endpoint"]').first();
    const codeExample = endpoint.locator('[data-testid="api-code-example"]');
    await expect(codeExample).toBeVisible();
  });
});
