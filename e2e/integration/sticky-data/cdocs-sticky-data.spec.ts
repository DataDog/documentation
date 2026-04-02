import { test, expect, type Page } from '@playwright/test';
import { hideOverlays } from '../../helpers';

const CONTENT_FILTERING_URL = '/dd_e2e/cdocs/integration/content_filtering/';
const STICKY_DATA_URL = '/dd_e2e/cdocs/integration/sticky_data/';

// --- Selectors ---

/** Returns a selector for a filter pill button. */
function pill(filterId: string, optionId: string): string {
  return `button.cdoc-pill[data-filter-id="${filterId}"][data-option-id="${optionId}"]`;
}

/** Returns a selector for a toggleable content block by its data-description. */
function toggleable(description: string): string {
  return `.cdoc__toggleable[data-description="${description}"]`;
}

// Content descriptions on the sticky data page
const STICKY_DESCRIPTIONS: Record<string, string> = {
  swift: 'Programming Language is Swift',
  kotlin: 'Programming Language is Kotlin',
  java: 'Programming Language is Java',
};

// --- Helpers ---

async function clickPill(page: Page, filterId: string, optionId: string) {
  await page.click(pill(filterId, optionId));
}

async function expectVisible(page: Page, description: string) {
  const el = page.locator(toggleable(description));
  await expect(el).not.toHaveClass(/cdoc__hidden/);
}

async function expectHidden(page: Page, description: string) {
  const el = page.locator(toggleable(description));
  await expect(el).toHaveClass(/cdoc__hidden/);
}


// --- Tests ---

test.describe('Cdocs sticky data', () => {
  test.beforeEach(async ({ page }) => {
    // Visit content filtering page and reset to defaults to clear persisted state
    await page.goto(CONTENT_FILTERING_URL);
    await page.waitForSelector('#cdoc-content');
    await hideOverlays(page);
    await clickPill(page, 'prog_lang', 'javascript');
    await clickPill(page, 'database', 'postgres');
  });

  test('selection persists when the option is available on the target page', async ({
    page,
  }) => {
    // Select java on the content filtering page (java is also available on the sticky data page)
    await clickPill(page, 'prog_lang', 'java');
    const javaPill = page.locator(pill('prog_lang', 'java'));
    await expect(javaPill).toHaveAttribute('aria-selected', 'true');

    // Navigate to the sticky data page
    await page.goto(STICKY_DATA_URL);
    await page.waitForSelector('#cdoc-content');

    // Verify that java persisted
    const stickyJavaPill = page.locator(pill('prog_lang', 'java'));
    await expect(stickyJavaPill).toHaveAttribute('aria-selected', 'true');
    await expectVisible(page, STICKY_DESCRIPTIONS['java']);
    await expectHidden(page, STICKY_DESCRIPTIONS['swift']);
    await expectHidden(page, STICKY_DESCRIPTIONS['kotlin']);
  });

  test('default selection is applied when visiting the page directly', async ({
    page,
  }) => {
    // Navigate directly to the sticky data page (beforeEach already reset state)
    await page.goto(STICKY_DATA_URL);
    await page.waitForSelector('#cdoc-content');

    // Verify the default (swift) is selected
    const swiftPill = page.locator(pill('prog_lang', 'swift'));
    await expect(swiftPill).toHaveAttribute('aria-selected', 'true');
    await expectVisible(page, STICKY_DESCRIPTIONS['swift']);
    await expectHidden(page, STICKY_DESCRIPTIONS['kotlin']);
    await expectHidden(page, STICKY_DESCRIPTIONS['java']);
  });

  test('default selection is applied when the previous selection is unavailable', async ({
    page,
  }) => {
    // Select python on the content filtering page (python is NOT available on the sticky data page)
    await clickPill(page, 'prog_lang', 'python');
    const pythonPill = page.locator(pill('prog_lang', 'python'));
    await expect(pythonPill).toHaveAttribute('aria-selected', 'true');

    // Navigate to the sticky data page
    await page.goto(STICKY_DATA_URL);
    await page.waitForSelector('#cdoc-content');

    // Verify that the default (swift) was applied instead
    const swiftPill = page.locator(pill('prog_lang', 'swift'));
    await expect(swiftPill).toHaveAttribute('aria-selected', 'true');
    await expectVisible(page, STICKY_DESCRIPTIONS['swift']);
    await expectHidden(page, STICKY_DESCRIPTIONS['kotlin']);
    await expectHidden(page, STICKY_DESCRIPTIONS['java']);
  });

  test('round-trip: unavailable selection falls back to default on both pages', async ({
    page,
  }) => {
    // Select java on the content filtering page and navigate to the sticky data page
    await clickPill(page, 'prog_lang', 'java');
    await page.goto(STICKY_DATA_URL);
    await page.waitForSelector('#cdoc-content');
    await hideOverlays(page);

    // Java should have persisted on the sticky data page
    const stickyJavaPill = page.locator(pill('prog_lang', 'java'));
    await expect(stickyJavaPill).toHaveAttribute('aria-selected', 'true');

    // Now select kotlin (only available on the sticky data page, not on content filtering)
    await clickPill(page, 'prog_lang', 'kotlin');
    const kotlinPill = page.locator(pill('prog_lang', 'kotlin'));
    await expect(kotlinPill).toHaveAttribute('aria-selected', 'true');

    // Navigate back to the content filtering page
    await page.goto(CONTENT_FILTERING_URL);
    await page.waitForSelector('#cdoc-content');

    // Kotlin is not available here, so the default (javascript) should be applied
    const jsPill = page.locator(pill('prog_lang', 'javascript'));
    await expect(jsPill).toHaveAttribute('aria-selected', 'true');
  });
});
