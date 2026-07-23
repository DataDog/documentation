import { expect, type Page } from '@playwright/test';

// --- Filter selectors ---

/** Returns a selector for a filter pill button. */
export function pill(filterId: string, optionId: string): string {
    return `button.cdoc-pill[data-filter-id="${filterId}"][data-option-id="${optionId}"]`;
}

/** Returns a selector matching any pill for a given filter. */
export function filterPills(filterId: string): string {
    return `button.cdoc-pill[data-filter-id="${filterId}"]`;
}

/** Returns a selector for a toggleable content block by its data-description. */
export function toggleable(description: string): string {
    return `.cdoc__toggleable[data-description="${description}"]`;
}

// --- Filter actions ---

export async function clickPill(page: Page, filterId: string, optionId: string) {
    await page.click(pill(filterId, optionId));
}

export async function expectVisible(page: Page, description: string) {
    const el = page.locator(toggleable(description));
    await expect(el).not.toHaveClass(/cdoc__hidden/);
}

export async function expectHidden(page: Page, description: string) {
    const el = page.locator(toggleable(description));
    await expect(el).toHaveClass(/cdoc__hidden/);
}

export async function expectFilterVisible(page: Page, filterId: string) {
    await expect(page.locator(filterPills(filterId)).first()).toBeVisible();
}

export async function expectFilterHidden(page: Page, filterId: string) {
    await expect(page.locator(filterPills(filterId)).first()).toBeHidden();
}

// --- Overlay helpers ---

export async function hideOverlays(page: Page) {
    await page.addStyleTag({
        content: `
      .conv-search-float-btn { display: none !important; }
      body > header { display: none !important; }
      .announcement-banner { display: none !important; }
      nav.main-nav { display: none !important; }
    `
    });
}
