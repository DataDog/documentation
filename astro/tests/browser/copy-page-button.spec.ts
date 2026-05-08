import { test, expect } from '@playwright/test';

test.describe('CopyPageButton component', () => {
    test('is visible on the API index page', async ({ page }) => {
        await page.goto('/api/latest/');
        const btn = page.locator('.copy-page-button');
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Copy page as text');
    });

    test('is visible on a category page', async ({ page }) => {
        await page.goto('/api/latest/metrics/');
        const btn = page.locator('.copy-page-button');
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Copy page as text');
    });

    test('is visible on an operation page', async ({ page }) => {
        await page.goto('/api/latest/metrics/edit-metric-metadata/');
        const btn = page.locator('.copy-page-button');
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Copy page as text');
    });

    test('shows Copied! feedback after click and resets', async ({ page, context }) => {
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);
        await page.goto('/api/latest/');

        const btn = page.locator('.copy-page-button');
        await btn.waitFor({ state: 'attached' });

        // Wait for hydration
        await expect(btn).toHaveAttribute('data-hydrated', 'true', { timeout: 5000 });

        await btn.click();

        await expect(btn.locator('.copy-page-button__label')).toContainText('Copied!');

        // Wait for reset (3 seconds + buffer)
        await expect(btn.locator('.copy-page-button__label')).toContainText('Copy page as text', { timeout: 5000 });
    });

    test('contains a clipboard SVG icon', async ({ page }) => {
        await page.goto('/api/latest/');
        const icon = page.locator('.copy-page-button__icon svg');
        await expect(icon).toBeAttached();
        await expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    test('screenshot: default state', async ({ page }) => {
        await page.goto('/api/latest/');
        const btn = page.locator('.copy-page-button');
        await expect(btn).toBeVisible();
        await expect(page.locator('.copy-page-button')).toHaveScreenshot();
    });
});
