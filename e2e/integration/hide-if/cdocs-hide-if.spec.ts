import { test, expect } from '@playwright/test';
import { clickPill, expectFilterHidden, expectFilterVisible, hideOverlays } from '../../helpers';

const PAGE_URL = '/dd_e2e/cdocs/integration/conditionally_displayed_filters/hide_if/';
const CONTENT_AREA = '#mainContent';

// --- Tests ---

test.describe('Cdocs hide_if conditional filter display', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PAGE_URL);
        await page.waitForSelector('#cdoc-content');
        await hideOverlays(page);
    });

    test('database filter visibility toggles based on prog_lang selection', async ({ page }) => {
        // Set both filters to their defaults to clear any persisted state
        await clickPill(page, 'prog_lang', 'javascript');
        await clickPill(page, 'database', 'postgres');

        // With the default (javascript), the database filter should be visible (hide_if only hides for java)
        await expectFilterVisible(page, 'prog_lang');
        await expectFilterVisible(page, 'database');

        // Snapshot with both filters visible at defaults
        await expect(page.locator(CONTENT_AREA)).toHaveScreenshot('hide-if-defaults.png');

        // Select Java and verify the database filter has disappeared
        await clickPill(page, 'prog_lang', 'java');
        await expectFilterHidden(page, 'database');

        // Snapshot with database filter hidden
        await expect(page.locator(CONTENT_AREA)).toHaveScreenshot('hide-if-java-selected.png');

        // Return to the default prog_lang and verify the database filter has reappeared
        await clickPill(page, 'prog_lang', 'javascript');
        await expectFilterVisible(page, 'database');
    });
});
