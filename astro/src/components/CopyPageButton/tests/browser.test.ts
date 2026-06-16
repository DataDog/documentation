import { test, expect } from '@playwright/test';

// API pages render two CopyPageButton instances: the default variant in the
// page body and the icon variant inside the sticky toolbar. Selectors below
// disambiguate via the `--icon` BEM modifier.
const MAIN = '.copy-page-button:not(.copy-page-button--icon)';
const ICON = '.copy-page-button--icon';

test.describe('CopyPageButton component', () => {
    test('is visible on the API index page', async ({ page }) => {
        await page.goto('/api/latest/');
        const btn = page.locator(MAIN);
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Copy page');
    });

    test('is visible on a category page', async ({ page }) => {
        await page.goto('/api/latest/metrics/');
        const btn = page.locator(MAIN);
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Copy page');
    });

    test('is visible on an operation page', async ({ page }) => {
        await page.goto('/api/latest/metrics/edit-metric-metadata/');
        const btn = page.locator(MAIN);
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Copy page');
    });

    test('shows Copied feedback after click and resets', async ({ page, context }) => {
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);
        await page.goto('/api/latest/');

        const btn = page.locator(MAIN);
        await btn.waitFor({ state: 'attached' });

        // Wait for hydration
        await expect(btn).toHaveAttribute('data-hydrated', 'true', { timeout: 5000 });

        await btn.click();

        await expect(btn.locator('.copy-page-button__label')).toContainText('Copied');

        // Wait for reset (3 seconds + buffer)
        await expect(btn.locator('.copy-page-button__label')).toContainText('Copy page', { timeout: 5000 });
    });

    test('contains a clipboard SVG icon', async ({ page }) => {
        await page.goto('/api/latest/');
        const icon = page.locator(`${MAIN} .copy-page-button__icon svg`);
        await expect(icon).toBeAttached();
        await expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    test('screenshot: default state', async ({ page }) => {
        await page.goto('/api/latest/');
        const btn = page.locator(MAIN);
        await expect(btn).toBeVisible();
        await expect(btn).toHaveScreenshot();
    });
});

test.describe('CopyPageButton (icon variant in toolbar)', () => {
    test('is hidden while the page is scrolled to the top', async ({ page }) => {
        await page.goto('/api/latest/metrics/edit-metric-metadata/');
        const icon = page.locator(ICON);
        // Wait until the island has hydrated and the visibility class is settled.
        await expect(icon).toHaveAttribute('data-hydrated', 'true', { timeout: 5000 });
        await expect(icon).toBeHidden();
    });

    test('reveals itself once the main button scrolls behind the sticky toolbar', async ({ page }) => {
        await page.goto('/api/latest/metrics/edit-metric-metadata/');
        const icon = page.locator(ICON);
        await expect(icon).toHaveAttribute('data-hydrated', 'true', { timeout: 5000 });

        // Scroll far enough that the main button is no longer in view; the
        // icon variant's scroll listener should mark itself visible.
        await page.evaluate(() => window.scrollTo(0, 1500));
        await expect(icon).toBeVisible();
    });

    test('has a "Copy page" tooltip via the title attribute', async ({ page }) => {
        await page.goto('/api/latest/metrics/edit-metric-metadata/');
        const icon = page.locator(ICON);
        await expect(icon).toHaveAttribute('title', 'Copy page');
    });
});
