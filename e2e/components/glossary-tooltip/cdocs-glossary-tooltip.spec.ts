import { test, expect, type Page, type Locator } from '@playwright/test';
import { hideOverlays } from '../../helpers';

const PAGE_URL = '/dd_e2e/cdocs/components/glossary_tooltip/';
const CONTENT_AREA = '#mainContent';

function paragraph(page: Page, label: string): Locator {
    return page.locator('p', { hasText: label });
}

test.describe('Cdocs glossary-tooltip component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PAGE_URL);
        await page.waitForSelector(CONTENT_AREA);
        await hideOverlays(page);
    });

    test('page renders as expected', async ({ page }) => {
        await expect(page.locator(CONTENT_AREA)).toHaveScreenshot('glossary-tooltip-initial.png');
    });

    test('default case renders glossary title unchanged', async ({ page }) => {
        const trigger = paragraph(page, 'Default case:').locator('.tooltip-trigger');
        await expect(trigger).toHaveText('new');
    });

    test('casing is applied to the tooltip trigger text', async ({ page }) => {
        const expected: [string, string][] = [
            ['Title case:', 'New'],
            ['Sentence case:', 'New'],
            ['Lower case:', 'new'],
            ['Upper case:', 'NEW']
        ];

        for (const [label, text] of expected) {
            const trigger = paragraph(page, label).locator('.tooltip-trigger');
            await expect(trigger).toHaveText(text);
        }
    });

    test('no-short-definition renders title as plain text, no tooltip wrapper', async ({ page }) => {
        const expected: [string, string][] = [
            ['Title case (no short definition):', 'Simple Network Management Protocol (snmp)'],
            ['Sentence case (no short definition):', 'Simple network management protocol (snmp)']
        ];

        for (const [label, text] of expected) {
            const para = paragraph(page, label);
            await expect(para).toContainText(text);
            await expect(para.locator('.tooltip-container')).toHaveCount(0);
        }
    });

    test('hover reveals the tooltip popup with the short definition', async ({ page }) => {
        const trigger = paragraph(page, 'Default case:').locator('.tooltip-trigger');

        await trigger.hover();
        // tooltip.js lifts the popup to <body> on hover (escapes ancestor overflow:hidden).
        const popup = page.locator('body > .tooltip-content.show');
        await expect(popup).toBeVisible();
        await expect(popup).toContainText('NEW indicates a fully developed');
    });

    test('tooltip contains a working link to the glossary entry', async ({ page }) => {
        const para = paragraph(page, 'Default case:');
        const link = para.locator('a.tooltip-full-link');

        await expect(link).toHaveAttribute('href', /\/glossary\/#new$/);
        await expect(link).toHaveText('Glossary');

        await para.locator('.tooltip-trigger').hover();
        await page.locator('body > .tooltip-content.show a.tooltip-full-link').click();
        await expect(page).toHaveURL(/\/glossary\/#new$/);
    });

    test('anomaly fallback renders title as plain text, no tooltip wrapper', async ({ page }) => {
        const para = paragraph(page, 'No glossary-tooltip rendered:');
        await expect(para).toContainText('anomaly');
        await expect(para.locator('.tooltip-container')).toHaveCount(0);
    });
});
