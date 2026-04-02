import { test, expect, type Page } from '@playwright/test';
import { hideOverlays } from '../../helpers';

const PAGE_URL = '/dd_e2e/cdocs/components/stepper_open/';

// --- Selectors ---

const STEPPER = '.stepper';
const STEP = '.stepper__step';
const ACTIVE_STEP = '.stepper__step--active';
const STEP_CONTENT = '.stepper__step-content';
const NEXT_BTN = '.stepper__next-btn';
const PREV_BTN = '.stepper__prev-btn';
const EXPAND_BTN = '.stepper__show-all-btn';
const COLLAPSE_BTN = '.stepper__collapse-btn';
const CONTENT_AREA = '#mainContent';

// --- Helpers ---

function stepContent(page: Page, index: number) {
  return page.locator(STEP).nth(index).locator(STEP_CONTENT);
}

async function clickNavBtn(page: Page, btnSelector: string) {
  await page.locator(ACTIVE_STEP).locator(btnSelector).click();
}

async function focusNavBtn(page: Page, btnSelector: string) {
  await page.locator(ACTIVE_STEP).locator(btnSelector).focus();
}

async function expectActiveStep(page: Page, index: number) {
  const steps = page.locator(STEP);
  const count = await steps.count();
  for (let i = 0; i < count; i++) {
    if (i === index) {
      await expect(steps.nth(i)).toHaveClass(/stepper__step--active/);
    } else {
      await expect(steps.nth(i)).not.toHaveClass(/stepper__step--active/);
    }
  }
}


// --- Tests ---

test.describe('Cdocs open stepper', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.evaluate(() => {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key?.startsWith('stepper-progress-')) {
          localStorage.removeItem(key);
        }
      }
    });
    await page.reload();
    await page.waitForSelector('.stepper--initialized');
    await hideOverlays(page);
  });

  test('initial state: all steps are displayed', async ({ page }) => {
    await expect(page.locator(STEPPER)).toHaveClass(/stepper--all-expanded/);

    // All step contents should be visible
    await expect(stepContent(page, 0)).toBeVisible();
    await expect(stepContent(page, 1)).toBeVisible();
    await expect(stepContent(page, 2)).toBeVisible();

    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'stepper-open-initial.png'
    );
  });

  test('Collapse shows only the active step', async ({ page }) => {
    await page.locator(COLLAPSE_BTN).click();

    await expect(page.locator(STEPPER)).not.toHaveClass(
      /stepper--all-expanded/
    );

    // Only step 1 content should be visible
    await expectActiveStep(page, 0);
    await expect(stepContent(page, 0)).toBeVisible();
    await expect(stepContent(page, 1)).not.toBeVisible();
    await expect(stepContent(page, 2)).not.toBeVisible();

    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'stepper-open-collapsed.png'
    );
  });

  test('Next button advances the active step after collapsing', async ({
    page,
  }) => {
    // Collapse first
    await page.locator(COLLAPSE_BTN).click();
    await expectActiveStep(page, 0);

    // Step 1 -> Step 2
    await clickNavBtn(page, NEXT_BTN);
    await expectActiveStep(page, 1);
    await expect(stepContent(page, 1)).toBeVisible();
    await expect(stepContent(page, 0)).not.toBeVisible();

    // Step 2 -> Step 3
    await clickNavBtn(page, NEXT_BTN);
    await expectActiveStep(page, 2);
    await expect(stepContent(page, 2)).toBeVisible();
    await expect(stepContent(page, 1)).not.toBeVisible();
  });

  test('Previous button rewinds the active step after collapsing', async ({
    page,
  }) => {
    // Collapse and advance to step 2
    await page.locator(COLLAPSE_BTN).click();
    await clickNavBtn(page, NEXT_BTN);
    await expectActiveStep(page, 1);

    // Go back to step 1
    await clickNavBtn(page, PREV_BTN);
    await expectActiveStep(page, 0);
    await expect(stepContent(page, 0)).toBeVisible();
    await expect(stepContent(page, 1)).not.toBeVisible();
  });

  test('Expand all re-shows all steps after collapsing', async ({ page }) => {
    // Collapse, advance to step 2, then expand again
    await page.locator(COLLAPSE_BTN).click();
    await clickNavBtn(page, NEXT_BTN);
    await expectActiveStep(page, 1);

    await page.locator(EXPAND_BTN).click();
    await expect(page.locator(STEPPER)).toHaveClass(/stepper--all-expanded/);

    await expect(stepContent(page, 0)).toBeVisible();
    await expect(stepContent(page, 1)).toBeVisible();
    await expect(stepContent(page, 2)).toBeVisible();

    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'stepper-open-re-expanded.png'
    );
  });

  test.describe('keyboard navigation', () => {
    test('keyboard collapse, Next, Previous, and Expand', async ({ page }) => {
      // Collapse via keyboard
      await page.locator(COLLAPSE_BTN).focus();
      await page.keyboard.press('Enter');
      await expect(page.locator(STEPPER)).not.toHaveClass(
        /stepper--all-expanded/
      );
      await expectActiveStep(page, 0);

      // Next via keyboard
      await focusNavBtn(page, NEXT_BTN);
      await page.keyboard.press('Enter');
      await expectActiveStep(page, 1);

      // Tab from Previous to Next, then Enter
      await focusNavBtn(page, PREV_BTN);
      await page.keyboard.press('Tab');
      await expect(
        page.locator(ACTIVE_STEP).locator(NEXT_BTN)
      ).toBeFocused();
      await page.keyboard.press('Enter');
      await expectActiveStep(page, 2);

      // Previous via keyboard
      await focusNavBtn(page, PREV_BTN);
      await page.keyboard.press('Enter');
      await expectActiveStep(page, 1);

      // Expand via keyboard
      await page.locator(EXPAND_BTN).focus();
      await page.keyboard.press('Enter');
      await expect(page.locator(STEPPER)).toHaveClass(/stepper--all-expanded/);
    });
  });
});
