import { test, expect } from '@playwright/test';
import { clickPill, expectFilterHidden, expectFilterVisible, hideOverlays } from '../../helpers';

const PAGE_URL = '/dd_e2e/cdocs/integration/conditionally_displayed_filters/show_if/';
const CONTENT_AREA = '#mainContent';

// --- Tests ---

test.describe('Cdocs show_if conditional filter display', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PAGE_URL);
        await page.waitForSelector('#cdoc-content');
        await hideOverlays(page);
    });

    test('database filter visibility toggles based on prog_lang selection', async ({ page }) => {
        // Set prog_lang to the default to clear any persisted state
        await clickPill(page, 'prog_lang', 'javascript');

        // With the default (javascript), the database filter should be hidden (show_if requires java)
        await expectFilterVisible(page, 'prog_lang');
        await expectFilterHidden(page, 'database');

        // Snapshot with database filter hidden at defaults
        await expect(page.locator(CONTENT_AREA)).toHaveScreenshot('show-if-defaults.png');

        // Select Java and verify the database filter has appeared
        await clickPill(page, 'prog_lang', 'java');
        await expectFilterVisible(page, 'database');

        // Snapshot with both filters visible after selecting Java
        await expect(page.locator(CONTENT_AREA)).toHaveScreenshot('show-if-java-selected.png');

        // Return to the default prog_lang and verify the database filter has hidden again
        await clickPill(page, 'prog_lang', 'javascript');
        await expectFilterHidden(page, 'database');
    });
});
