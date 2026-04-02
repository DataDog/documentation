import { test, expect } from '@playwright/test';
import { hideOverlays } from '../../helpers';

const PAGE_URL = '/dd_e2e/cdocs/components/video/';
const CONTENT_AREA = '#mainContent';


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
