import { test, expect } from '@playwright/test';

test.describe('ApiSideNav — layout', () => {
  test('sits flush under the header with no banner gap', async ({ page }) => {
    // API pages carry no announcement banner, so the sticky side nav must sit
    // directly under the fixed header — no reserved banner height. Guards
    // against reintroducing a raw `--hugo-banner-height` offset (which would
    // leave a 30px gap on every API page when no banner is configured).
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/api/latest/authentication/');
    await page.waitForLoadState('networkidle');

    const header = await page.locator('.header__wrapper .header__nav').boundingBox();
    const sideNav = await page.locator('.api-side-nav').boundingBox();
    expect(header).not.toBeNull();
    expect(sideNav).not.toBeNull();

    // Side nav top aligns with the header's bottom edge.
    expect(Math.round(sideNav!.y)).toBe(Math.round(header!.y + header!.height));
    // And the body reserves no banner height (header is at the very top).
    expect(Math.round(header!.y)).toBe(0);
  });
});
