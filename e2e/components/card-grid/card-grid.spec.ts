import { test, expect, type Page } from '@playwright/test';
import { hideOverlays } from '../../helpers';

const PAGE_URL = '/dd_e2e/card_grid/';
const CONTENT_AREA = '#mainContent';

// Section indices (0-based DOM order matching fixture page headings)
const SECTION = {
    IMAGE_4: 0,
    IMAGE_7: 1,
    TEXT_ONLY: 2,
    CUSTOM_MIN_WIDTH: 3,
    CUSTOM_IMG_WIDTH: 4,
    SINGLE: 5,
    TOOLTIPS: 6
} as const;

function gridSection(page: Page, index: number) {
    return page.locator('.card-grid').nth(index);
}

test.describe('card-grid shortcode', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PAGE_URL);
        await page.waitForSelector(CONTENT_AREA);
        await hideOverlays(page);
    });

    test('page renders as expected', async ({ page }) => {
        await expect(page.locator(CONTENT_AREA)).toHaveScreenshot('card-grid-initial.png');
    });

    test('correct number of cards in each grid', async ({ page }) => {
        await expect(gridSection(page, SECTION.IMAGE_4).locator('.card-grid-card')).toHaveCount(4);
        await expect(gridSection(page, SECTION.IMAGE_7).locator('.card-grid-card')).toHaveCount(7);
        await expect(gridSection(page, SECTION.TEXT_ONLY).locator('.card-grid-card')).toHaveCount(3);
        await expect(gridSection(page, SECTION.CUSTOM_MIN_WIDTH).locator('.card-grid-card')).toHaveCount(3);
        await expect(gridSection(page, SECTION.CUSTOM_IMG_WIDTH).locator('.card-grid-card')).toHaveCount(3);
        await expect(gridSection(page, SECTION.SINGLE).locator('.card-grid-card')).toHaveCount(1);
    });

    test('cards are links with valid href', async ({ page }) => {
        const cards = gridSection(page, SECTION.IMAGE_4).locator('.card-grid-card');
        for (let i = 0; i < 4; i++) {
            const card = cards.nth(i);
            await expect(card).toHaveAttribute('href', /\/.+/);
            const tagName = await card.evaluate(el => el.tagName.toLowerCase());
            expect(tagName).toBe('a');
        }
    });

    test('image cards render images', async ({ page }) => {
        const cards = gridSection(page, SECTION.IMAGE_4).locator('.card-grid-card');
        for (let i = 0; i < 4; i++) {
            await expect(cards.nth(i).locator('img')).toBeVisible();
        }
    });

    test('text-only cards render title without images', async ({ page }) => {
        const cards = gridSection(page, SECTION.TEXT_ONLY).locator('.card-grid-card');
        await expect(cards.nth(0).locator('h5')).toHaveText('Containers');
        await expect(cards.nth(1).locator('h5')).toHaveText('Jobs');
        await expect(cards.nth(2).locator('h5')).toHaveText('Functions');
        // No images in text-only cards
        await expect(cards.nth(0).locator('img')).toHaveCount(0);
    });

    test('subtitle renders when present', async ({ page }) => {
        const jobsCard = gridSection(page, SECTION.TEXT_ONLY).locator('.card-grid-card').nth(1);
        await expect(jobsCard.locator('small')).toHaveText('(Preview)');
        // First card has no subtitle
        const containersCard = gridSection(page, SECTION.TEXT_ONLY).locator('.card-grid-card').nth(0);
        await expect(containersCard.locator('small')).toHaveCount(0);
    });

    test('custom card_width sets CSS custom property', async ({ page }) => {
        const grid = gridSection(page, SECTION.CUSTOM_MIN_WIDTH);
        const minWidth = await grid.evaluate(el =>
            getComputedStyle(el).getPropertyValue('--card-min-width').trim()
        );
        expect(minWidth).toBe('200px');
    });

    test('default card_width is 150px', async ({ page }) => {
        const grid = gridSection(page, SECTION.IMAGE_4);
        const minWidth = await grid.evaluate(el =>
            getComputedStyle(el).getPropertyValue('--card-min-width').trim()
        );
        expect(minWidth).toBe('150px');
    });

    test('custom image_width applies to images', async ({ page }) => {
        const card = gridSection(page, SECTION.CUSTOM_IMG_WIDTH).locator('.card-grid-card').first();
        const imgWidth = await card.locator('img').getAttribute('width');
        expect(imgWidth).toBe('50');
    });

    test('last row is centered in 7-card grid', async ({ page }) => {
        const grid = gridSection(page, SECTION.IMAGE_7);
        const gridBox = await grid.boundingBox();
        const cards = grid.locator('.card-grid-card');
        const cardCount = await cards.count();

        // Find the last row: cards whose top position is the same as the last card's
        const lastCardBox = await cards.nth(cardCount - 1).boundingBox();
        const lastRowCards: { left: number; right: number }[] = [];
        for (let i = 0; i < cardCount; i++) {
            const box = await cards.nth(i).boundingBox();
            if (box && lastCardBox && Math.abs(box.y - lastCardBox.y) < 2) {
                lastRowCards.push({ left: box.x, right: box.x + box.width });
            }
        }

        // The last row should have fewer cards than would fill the grid
        expect(lastRowCards.length).toBeGreaterThan(0);
        expect(lastRowCards.length).toBeLessThan(4);

        // Check centering: leftmost card's distance from grid left edge should
        // roughly equal rightmost card's distance from grid right edge
        if (gridBox && lastRowCards.length > 0) {
            const leftGap = lastRowCards[0].left - gridBox.x;
            const rightGap = (gridBox.x + gridBox.width) - lastRowCards[lastRowCards.length - 1].right;
            expect(Math.abs(leftGap - rightGap)).toBeLessThan(20);
        }
    });

    test('responsive: fewer columns at narrow viewport', async ({ page }) => {
        // Default viewport is 1280px (from playwright.config.ts)
        const grid = gridSection(page, SECTION.IMAGE_4);
        const cardsWide = grid.locator('.card-grid-card');

        // At 1280px, 4 cards with min-width 150px should fit in one row
        const firstCardWide = await cardsWide.nth(0).boundingBox();
        const lastCardWide = await cardsWide.nth(3).boundingBox();
        // Same row = same y position
        if (firstCardWide && lastCardWide) {
            expect(Math.abs(firstCardWide.y - lastCardWide.y)).toBeLessThan(2);
        }

        // Shrink viewport to 400px — cards should wrap
        await page.setViewportSize({ width: 400, height: 720 });
        await page.waitForTimeout(100);

        const firstCardNarrow = await cardsWide.nth(0).boundingBox();
        const lastCardNarrow = await cardsWide.nth(3).boundingBox();
        // Different rows = different y positions
        if (firstCardNarrow && lastCardNarrow) {
            expect(lastCardNarrow.y).toBeGreaterThan(firstCardNarrow.y + 10);
        }
    });

    test('hover shows box-shadow', async ({ page }) => {
        const card = gridSection(page, SECTION.IMAGE_4).locator('.card-grid-card').first();

        const shadowBefore = await card.evaluate(el =>
            getComputedStyle(el).boxShadow
        );

        await card.hover();

        const shadowAfter = await card.evaluate(el =>
            getComputedStyle(el).boxShadow
        );

        expect(shadowAfter).not.toBe(shadowBefore);
        expect(shadowAfter).not.toBe('none');
    });

    test('tooltip cards have Bootstrap tooltip attributes', async ({ page }) => {
        const cards = gridSection(page, SECTION.TOOLTIPS).locator('.card-grid-card');
        // Bootstrap JS moves title to data-bs-original-title on init
        await expect(cards.nth(0)).toHaveAttribute('data-bs-original-title', 'Linux');
        await expect(cards.nth(0)).toHaveAttribute('data-bs-toggle', 'tooltip');
        await expect(cards.nth(0)).toHaveAttribute('data-bs-placement', 'top');
        await expect(cards.nth(1)).toHaveAttribute('data-bs-original-title', 'Docker');
    });

    test('non-tooltip cards do not have tooltip attributes', async ({ page }) => {
        const card = gridSection(page, SECTION.IMAGE_4).locator('.card-grid-card').first();
        await expect(card).not.toHaveAttribute('data-bs-toggle');
    });

    test('tooltip grid emits script tag for page reload', async ({ page }) => {
        const scripts = await page.locator('script').evaluateAll(els =>
            els.map(el => el.textContent?.trim())
        );
        expect(scripts).toContain('void 0');
    });

    test('tooltips work after sidenav navigation', async ({ page }) => {
        // Navigate away to another page
        await page.goto('/getting_started/');
        await page.waitForLoadState('domcontentloaded');

        // Navigate back to the card grid page
        await page.goto(PAGE_URL);
        await page.waitForSelector(CONTENT_AREA);
        await hideOverlays(page);

        // Hover over a tooltip card and verify the tooltip appears
        const card = gridSection(page, SECTION.TOOLTIPS).locator('.card-grid-card').first();
        await card.hover();
        await page.waitForTimeout(500);

        const tooltip = page.locator('.tooltip.show, .bs-tooltip-top');
        await expect(tooltip).toBeVisible();
    });
});
