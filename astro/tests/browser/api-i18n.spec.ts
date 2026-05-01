import { test, expect } from '@playwright/test';

test.describe('API docs i18n routing', () => {
  test('English category page is canonical at /api/latest/<slug>/ (no /en/ prefix)', async ({ page }) => {
    const response = await page.goto('/api/latest/aws-integration/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('AWS Integration');
  });

  test('Japanese category page is served at /ja/api/latest/<slug>/', async ({ page }) => {
    const response = await page.goto('/ja/api/latest/aws-integration/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('AWS インテグレーション');
  });

  test('language selector is present in the API toolbar', async ({ page }) => {
    await page.goto('/api/latest/aws-integration/');
    const selector = page.locator('.language-selector').first();
    await expect(selector).toBeVisible();
    const select = selector.locator('.language-selector__select');
    await expect(select).toHaveValue('en');
  });

  test('language selector shows all locales with native labels', async ({ page }) => {
    await page.goto('/api/latest/aws-integration/');
    const options = page.locator('.language-selector__select option');
    await expect(options).toHaveCount(5);
    await expect(options.nth(0)).toHaveText('English');
    await expect(options.nth(1)).toHaveText('Français');
    await expect(options.nth(2)).toHaveText('日本語');
    await expect(options.nth(3)).toHaveText('한국어');
    await expect(options.nth(4)).toHaveText('Español');
  });

  test('switching to Japanese stays on the same endpoint page', async ({ page }) => {
    await page.goto('/api/latest/aws-integration/');
    await page.selectOption('.language-selector__select', { value: 'ja' });

    await expect(page).toHaveURL(/\/ja\/api\/latest\/aws-integration\/?$/);
    await expect(page.locator('h1')).toContainText('AWS インテグレーション');
  });

  test('side-nav links carry the locale prefix on Japanese pages', async ({ page }) => {
    await page.goto('/ja/api/latest/aws-integration/');
    const firstCategory = page.locator('.api-side-nav__category').first();
    const href = await firstCategory.getAttribute('href');
    expect(href).toMatch(/^\/ja\/api\/latest\//);
  });

  test('unknown locale prefix returns 404', async ({ page }) => {
    const response = await page.goto('/zh/api/latest/aws-integration/', { waitUntil: 'load' });
    expect(response?.status()).toBe(404);
  });

  test('default locale prefix /en/... is not served', async ({ page }) => {
    const response = await page.goto('/en/api/latest/aws-integration/', { waitUntil: 'load' });
    expect(response?.status()).toBe(404);
  });
});
