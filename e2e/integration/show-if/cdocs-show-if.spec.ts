import { test, expect, type Page } from '@playwright/test';
import { hideOverlays } from '../../helpers';

const PAGE_URL = '/dd_e2e/cdocs/integration/conditionally_displayed_filters/show_if/';
const CONTENT_AREA = '#mainContent';

// --- Selectors ---

/** Returns a selector for a filter pill button. */
function pill(filterId: string, optionId: string): string {
    return `button.cdoc-pill[data-filter-id="${filterId}"][data-option-id="${optionId}"]`;
}

/** Returns a selector matching any pill for a given filter. */
function filterPills(filterId: string): string {
    return `button.cdoc-pill[data-filter-id="${filterId}"]`;
}

// --- Helpers ---

async function clickPill(page: Page, filterId: string, optionId: string) {
    await page.click(pill(filterId, optionId));
}

async function expectFilterVisible(page: Page, filterId: string) {
    await expect(page.locator(filterPills(filterId)).first()).toBeVisible();
}

async function expectFilterHidden(page: Page, filterId: string) {
    await expect(page.locator(filterPills(filterId)).first()).toBeHidden();
}

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
