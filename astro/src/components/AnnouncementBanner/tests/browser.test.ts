import { test, expect } from '@playwright/test';

test.describe('AnnouncementBanner component — visual', () => {
  test.describe('when a banner is configured', () => {
    test.beforeEach(async ({ page }) => {
      // This test page renders a configured banner via `override`.
      await page.goto('/docs/test_pages/components/announcement-banner');
    });

    test('renders at desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      const banner = page.locator('.announcement-banner');
      await expect(banner).toHaveScreenshot('announcement-banner-desktop.png');
    });

    test('shows the mobile message below the 768px breakpoint', async ({ page }) => {
      await page.setViewportSize({ width: 500, height: 900 });
      const banner = page.locator('.announcement-banner');
      await expect(banner).toHaveScreenshot('announcement-banner-mobile.png');
    });

    test('keeps Hugo banner colors in dark mode', async ({ page }) => {
      // Banner tokens are Hugo-identical and do not swap between themes; the
      // baseline confirms dark mode keeps the Hugo-colored banner intact.
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
      const banner = page.locator('.announcement-banner');
      await expect(banner).toHaveScreenshot('announcement-banner-dark.png');
    });

    test('is 30px tall, fixed at the top, and offsets the header below it', async ({ page }) => {
      // Hugo-identical: the banner is a 30px fixed bar at y:0 spanning the
      // viewport, and the header is pushed down by that height (the
      // `announcement` body class opts the offset in).
      await page.setViewportSize({ width: 1400, height: 900 });

      const bannerBox = await page.locator('.announcement-banner').boundingBox();
      expect(bannerBox).not.toBeNull();
      expect(Math.round(bannerBox!.height)).toBe(30);
      expect(Math.round(bannerBox!.y)).toBe(0);
      expect(Math.round(bannerBox!.width)).toBe(1400);

      const headerBox = await page.locator('.header__wrapper .header__nav').boundingBox();
      expect(headerBox).not.toBeNull();
      expect(Math.round(headerBox!.y)).toBe(30);
    });
  });

  test.describe('when no banner is configured', () => {
    test('renders no banner on a normal page', async ({ page }) => {
      // The Test Pages index has no banner override, so `BaseLayout` falls back
      // to the live site config — which carries no banner when no campaign is
      // active. Nothing should render (no empty banner shell).
      await page.goto('/docs/test_pages/');
      await expect(page.locator('.announcement-banner')).toHaveCount(0);
    });
  });
});
