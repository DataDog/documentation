import { test, expect } from '@playwright/test';

const PAGE_URL = '/dd_e2e/cdocs/components/video/';
const CONTENT_AREA = '#mainContent';

async function hideOverlays(page: import('@playwright/test').Page) {
    await page.addStyleTag({
        content: `
      .conv-search-float-btn { display: none !important; }
      body > header { display: none !important; }
      .announcement-banner { display: none !important; }
    `
    });
}

test.describe('Cdocs video component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PAGE_URL);
        await page.waitForSelector(CONTENT_AREA);
        await hideOverlays(page);
    });

    test('video element has expected attributes', async ({ page }) => {
        const video = page.locator('video');

        await expect(video).toBeVisible();
        await expect(video).toHaveAttribute('autoplay', '');
        await expect(video).toHaveAttribute('muted', '');
        await expect(video).toHaveAttribute('loop', '');
        await expect(video).toHaveAttribute('controls', '');
        await expect(video).toHaveAttribute('playsinline', '');

        const source = video.locator('source');
        await expect(source).toHaveAttribute('type', 'video/mp4');
        await expect(source).toHaveAttribute('src', /dashboard\.mp4/);
    });
});
