import { test, expect } from '@playwright/test';
import { clickPill, pill } from '../helpers';

const PAGE_URL = '/profiler/enabling/';
const LANGUAGES = ['java', 'python', 'go', 'ruby', 'node_js', 'dot_net', 'php', 'c', 'cpp', 'rust'];

test('keeps all profiler languages visible when the Java runtime filter is shown', async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForSelector('#cdoc-content');
    await clickPill(page, 'prog_lang', 'java');

    for (const language of LANGUAGES) {
        await expect(page.locator(pill('prog_lang', language))).toBeVisible();
    }
    await expect(page.locator('#cdoc-dropdown-runtime')).toBeVisible();

    await clickPill(page, 'prog_lang', 'python');

    for (const language of LANGUAGES) {
        await expect(page.locator(pill('prog_lang', language))).toBeVisible();
    }
    await expect(page.locator('#cdoc-dropdown-runtime')).toHaveCount(0);
});
