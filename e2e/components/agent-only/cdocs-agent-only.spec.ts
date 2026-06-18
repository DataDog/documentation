import { test, expect } from '@playwright/test';
import { hideOverlays } from '../../helpers';

const PAGE_URL = '/dd_e2e/cdocs/components/agent_only/';
const CONTENT_AREA = '#mainContent';

test.describe('Cdocs agent-only component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PAGE_URL);
        await page.waitForSelector(CONTENT_AREA);
        await hideOverlays(page);
    });

    test('agent-only content is not visible', async ({ page }) => {
        const agentOnlyBlocks = page.locator('.agent-only');
        const count = await agentOnlyBlocks.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            await expect(agentOnlyBlocks.nth(i)).toBeHidden();
        }
    });

    test('page renders as expected', async ({ page }) => {
        await expect(page.locator(CONTENT_AREA)).toHaveScreenshot('agent-only-initial.png');
    });
});
