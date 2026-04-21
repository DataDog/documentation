import { test, expect } from '@playwright/test';

test.describe('Placeholder layout — Hugo-identical dimensions', () => {
  test('banner is 30px tall and pinned to the top edge', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/docs/components/placeholder');

    const banner = page.locator('.placeholder__announcement-banner');
    const box = await banner.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.height)).toBe(30);
    expect(Math.round(box!.y)).toBe(0);
    expect(Math.round(box!.x)).toBe(0);
    expect(Math.round(box!.width)).toBe(1400);
  });

  test('header is 130px tall at desktop and sits 30px below the top', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/docs/components/placeholder');

    const header = page.locator('.placeholder__header');
    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.height)).toBe(130);
    expect(Math.round(box!.y)).toBe(30);
    expect(Math.round(box!.width)).toBe(1400);
  });

  test('header is 60px tall below the 992px breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto('/docs/components/placeholder');

    const header = page.locator('.placeholder__header');
    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.height)).toBe(60);
    expect(Math.round(box!.y)).toBe(30);
  });

  test('footer renders in normal flow below the page content', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/docs/components/placeholder');

    const footer = page.locator('footer.placeholder__footer');
    await expect(footer).toBeVisible();

    const footerBox = await footer.boundingBox();
    const headerBox = await page.locator('.placeholder__header').boundingBox();
    expect(footerBox).not.toBeNull();
    expect(headerBox).not.toBeNull();
    expect(footerBox!.y).toBeGreaterThan(headerBox!.y + headerBox!.height);
  });

  test('document itself scrolls — not an inner container', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/docs/components/placeholder');

    const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    test.skip(docHeight <= viewportHeight, 'Page is not tall enough to scroll');

    await page.evaluate(() => window.scrollTo(0, 200));
    const docScrolled = await page.evaluate(() => window.scrollY);
    expect(docScrolled).toBe(200);
  });

  test('banner stays at the top edge while the page scrolls', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/docs/components/placeholder');

    await page.evaluate(() => window.scrollTo(0, 300));
    const banner = page.locator('.placeholder__announcement-banner');
    const box = await banner.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.y)).toBe(0);
  });

  test('header shrinks 1:1 with scroll on desktop and clamps at 65px', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/api/latest/authentication/');
    await page.waitForLoadState('networkidle');

    const headerHeight = async () =>
      Math.round((await page.locator('.placeholder__header').boundingBox())!.height);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(60);
    expect(await headerHeight()).toBe(130);

    await page.evaluate(() => window.scrollTo(0, 30));
    await page.waitForTimeout(60);
    expect(await headerHeight()).toBe(100);

    await page.evaluate(() => window.scrollTo(0, 70));
    await page.waitForTimeout(60);
    expect(await headerHeight()).toBe(65);

    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(60);
    expect(await headerHeight()).toBe(65);
  });

  test('header does not shrink below the desktop breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto('/api/latest/authentication/');
    await page.waitForLoadState('networkidle');

    const headerHeight = async () =>
      Math.round((await page.locator('.placeholder__header').boundingBox())!.height);

    expect(await headerHeight()).toBe(60);
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(60);
    expect(await headerHeight()).toBe(60);
  });

  test('dark mode swaps the placeholder colors', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/docs/components/placeholder');

    const banner = page.locator('.placeholder__announcement-banner');

    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    const lightBg = await banner.evaluate((el) => getComputedStyle(el).backgroundColor);

    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    const darkBg = await banner.evaluate((el) => getComputedStyle(el).backgroundColor);

    expect(lightBg).not.toBe(darkBg);
  });
});
