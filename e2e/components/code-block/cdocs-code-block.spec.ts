import { test, expect } from '@playwright/test';
import { hideOverlays } from '../../helpers';

const PAGE_URL = '/dd_e2e/cdocs/components/code_block/';
const CONTENT_AREA = '#mainContent';

test.describe('Cdocs code block component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PAGE_URL);
        await page.waitForSelector(CONTENT_AREA);
        await hideOverlays(page);
    });

    test('page renders as expected', async ({ page }) => {
        await expect(page.locator(CONTENT_AREA)).toHaveScreenshot('code-block-initial.png');
    });
});
