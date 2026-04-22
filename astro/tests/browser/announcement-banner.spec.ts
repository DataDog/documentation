import { test, expect } from '@playwright/test';

test.describe('AnnouncementBanner component — visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/announcement-banner');
  });

  test('default banner at desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const banner = page.locator('[data-testid="announcement-banner"]');
    await expect(banner).toHaveScreenshot('announcement-banner-default-desktop.png');
  });

  test('default banner at mobile viewport shows the mobile message', async ({ page }) => {
    // Below the 768px breakpoint the banner swaps to `banner-title-mobile`.
    await page.setViewportSize({ width: 500, height: 900 });
    const banner = page.locator('[data-testid="announcement-banner"]');
    await expect(banner).toHaveScreenshot('announcement-banner-default-mobile.png');
  });

  test('default banner in dark mode', async ({ page }) => {
    // Banner tokens are Hugo-identical and do not swap between themes; the
    // baseline confirms dark mode keeps the Hugo-colored banner intact.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    const banner = page.locator('[data-testid="announcement-banner"]');
    await expect(banner).toHaveScreenshot('announcement-banner-default-dark.png');
  });
});
