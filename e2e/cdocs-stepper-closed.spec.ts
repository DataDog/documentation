import { test, expect, type Page } from '@playwright/test';

const PAGE_URL = '/dd_e2e/cdocs/components/stepper_closed/';

// --- Selectors ---

const STEPPER = '.stepper';
const STEP = '.stepper__step';
const ACTIVE_STEP = '.stepper__step--active';
const STEP_TITLE = '.stepper__step-title';
const STEP_CONTENT = '.stepper__step-content';
const NEXT_BTN = '.stepper__next-btn';
const PREV_BTN = '.stepper__prev-btn';
const FINISH_BTN = '.stepper__finish-btn';
const RESET_BTN = '.stepper__reset-btn';
const EXPAND_BTN = '.stepper__show-all-btn';
const COLLAPSE_BTN = '.stepper__collapse-btn';
const FINISHED_SECTION = '.stepper__finished';
const CONTENT_AREA = '#mainContent';

// --- Helpers ---

/** Returns the step element at 0-based index. */
function step(page: Page, index: number) {
  return page.locator(STEP).nth(index);
}

/** Returns the step title at 0-based index. */
function stepTitle(page: Page, index: number) {
  return step(page, index).locator(STEP_TITLE);
}

/**
 * Click a step title to navigate to that step.
 * Step titles are <h3> elements with JS click handlers. The parent step div
 * intercepts pointer events in Playwright's hit test, so we use dispatchEvent
 * to fire the click directly on the title element.
 */
async function clickStepTitle(page: Page, index: number) {
  await stepTitle(page, index).dispatchEvent('click');
}

/** Returns the step content at 0-based index. */
function stepContent(page: Page, index: number) {
  return step(page, index).locator(STEP_CONTENT);
}

/**
 * Click a nav button scoped to the active step.
 * Nav buttons are only visible inside the active step's nav, so we scope to
 * .stepper__step--active to avoid matching hidden buttons from other steps.
 */
async function clickNavBtn(page: Page, btnSelector: string) {
  await page.locator(ACTIVE_STEP).locator(btnSelector).click();
}

/** Focus a nav button scoped to the active step (for keyboard tests). */
async function focusNavBtn(page: Page, btnSelector: string) {
  await page.locator(ACTIVE_STEP).locator(btnSelector).focus();
}

/** Asserts that a step is the active step. */
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

/** Navigate from step 1 through all steps to finish. */
async function completeAllSteps(page: Page) {
  await clickNavBtn(page, NEXT_BTN);
  await clickNavBtn(page, NEXT_BTN);
  await clickNavBtn(page, FINISH_BTN);
}

/** Hide fixed/floating elements that can overlap content and block clicks. */
async function hideOverlays(page: Page) {
  await page.addStyleTag({
    content: `
      .conv-search-float-btn { display: none !important; }
      body > header { display: none !important; }
      .announcement-banner { display: none !important; }
    `,
  });
}

// --- Tests ---

test.describe('Cdocs closed stepper', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to prevent persisted stepper state from affecting tests
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

  test('initial state: only first step content is visible and finished is hidden', async ({
    page,
  }) => {
    await expectActiveStep(page, 0);

    // First step content is visible
    await expect(stepContent(page, 0)).toBeVisible();

    // Other step contents are hidden
    await expect(stepContent(page, 1)).not.toBeVisible();
    await expect(stepContent(page, 2)).not.toBeVisible();

    // Finished section is hidden
    await expect(page.locator(FINISHED_SECTION)).not.toBeVisible();

    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'stepper-closed-initial.png'
    );
  });

  test('Next button advances to the next step', async ({ page }) => {
    // Step 1 -> Step 2
    await clickNavBtn(page, NEXT_BTN);
    await expectActiveStep(page, 1);
    await expect(stepContent(page, 1)).toBeVisible();
    await expect(stepContent(page, 0)).not.toBeVisible();

    // Step 1 should now show as completed
    await expect(step(page, 0)).toHaveClass(/stepper__step--completed/);

    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'stepper-closed-step2.png'
    );
  });

  test('Previous button rewinds to the prior step', async ({ page }) => {
    // Advance to step 2
    await clickNavBtn(page, NEXT_BTN);
    await expectActiveStep(page, 1);

    // Go back to step 1
    await clickNavBtn(page, PREV_BTN);
    await expectActiveStep(page, 0);
    await expect(stepContent(page, 0)).toBeVisible();
    await expect(stepContent(page, 1)).not.toBeVisible();
  });

  test('clicking a step title skips to that step', async ({ page }) => {
    // From step 1, click step 3 title to skip ahead
    await clickStepTitle(page, 2);
    await expectActiveStep(page, 2);
    await expect(stepContent(page, 2)).toBeVisible();
    await expect(stepContent(page, 0)).not.toBeVisible();
    await expect(stepContent(page, 1)).not.toBeVisible();

    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'stepper-closed-skip-to-step3.png'
    );
  });

  test('Expand all shows all step contents', async ({ page }) => {
    await page.locator(EXPAND_BTN).click();

    // All step contents should be visible
    await expect(stepContent(page, 0)).toBeVisible();
    await expect(stepContent(page, 1)).toBeVisible();
    await expect(stepContent(page, 2)).toBeVisible();

    // Stepper should have the expanded class
    await expect(page.locator(STEPPER)).toHaveClass(/stepper--all-expanded/);

    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'stepper-closed-expanded.png'
    );
  });

  test('Collapse all preserves the active step', async ({ page }) => {
    // Advance to step 2
    await clickNavBtn(page, NEXT_BTN);
    await expectActiveStep(page, 1);

    // Expand all
    await page.locator(EXPAND_BTN).click();
    await expect(page.locator(STEPPER)).toHaveClass(/stepper--all-expanded/);

    // Collapse all
    await page.locator(COLLAPSE_BTN).click();
    await expect(page.locator(STEPPER)).not.toHaveClass(
      /stepper--all-expanded/
    );

    // Step 2 should still be the active step
    await expectActiveStep(page, 1);
    await expect(stepContent(page, 1)).toBeVisible();
  });

  test('Finish shows stepper-finished content', async ({ page }) => {
    // Navigate through all steps: Next, Next, Finish
    await completeAllSteps(page);

    // Finished section should be visible
    await expect(page.locator(FINISHED_SECTION)).toBeVisible();
    await expect(page.locator(FINISHED_SECTION)).toContainText(
      'Happy databasing'
    );

    // All steps should be marked as completed
    const steps = page.locator(STEP);
    const count = await steps.count();
    for (let i = 0; i < count; i++) {
      await expect(steps.nth(i)).toHaveClass(/stepper__step--completed/);
    }

    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'stepper-closed-finished.png'
    );
  });

  test('rewinding from finished state hides stepper-finished content', async ({
    page,
  }) => {
    // Complete the stepper
    await completeAllSteps(page);
    await expect(page.locator(FINISHED_SECTION)).toBeVisible();

    // Click a step title to rewind
    await clickStepTitle(page, 1);
    await expect(page.locator(FINISHED_SECTION)).not.toBeVisible();
    await expectActiveStep(page, 1);
  });

  test('Start over resets the stepper to step 1', async ({ page }) => {
    // Complete the stepper
    await completeAllSteps(page);
    await expect(page.locator(FINISHED_SECTION)).toBeVisible();

    // Click Start over
    await page.locator(RESET_BTN).click();
    await expectActiveStep(page, 0);
    await expect(stepContent(page, 0)).toBeVisible();
    await expect(page.locator(FINISHED_SECTION)).not.toBeVisible();

    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'stepper-closed-after-reset.png'
    );
  });

  test.describe('keyboard navigation', () => {
    test('Enter on Next button advances step', async ({ page }) => {
      // Focus the active step's Next button and press Enter
      await focusNavBtn(page, NEXT_BTN);
      await page.keyboard.press('Enter');

      await expectActiveStep(page, 1);
      await expect(stepContent(page, 1)).toBeVisible();
    });

    test('Enter on Previous button rewinds step', async ({ page }) => {
      // Advance to step 2
      await clickNavBtn(page, NEXT_BTN);
      await expectActiveStep(page, 1);

      // Use keyboard to press Previous
      await focusNavBtn(page, PREV_BTN);
      await page.keyboard.press('Enter');

      await expectActiveStep(page, 0);
    });

    test('Tab through the stepper using only keyboard', async ({ page }) => {
      // Tab into the stepper from the page body.
      // The first tabbable element inside step 1 is the "Expand all" button,
      // followed by interactive elements in step content, then the "Next" button.
      // We use focus helpers to land on the right button, then use Tab/Enter
      // from there — simulating real keyboard usage.

      // Step 1 → 2: focus Next and press Enter
      await focusNavBtn(page, NEXT_BTN);
      await page.keyboard.press('Enter');
      await expectActiveStep(page, 1);

      // Step 2 → 3: Tab from Previous to Next within the active nav, then Enter
      await focusNavBtn(page, PREV_BTN);
      await page.keyboard.press('Tab');
      await expect(
        page.locator(ACTIVE_STEP).locator(NEXT_BTN)
      ).toBeFocused();
      await page.keyboard.press('Enter');
      await expectActiveStep(page, 2);

      // Finish: Tab from Previous to Finish, then Enter
      await focusNavBtn(page, PREV_BTN);
      await page.keyboard.press('Tab');
      await expect(
        page.locator(ACTIVE_STEP).locator(FINISH_BTN)
      ).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.locator(FINISHED_SECTION)).toBeVisible();

      // Reset via keyboard
      await page.locator(RESET_BTN).focus();
      await page.keyboard.press('Enter');
      await expectActiveStep(page, 0);
      await expect(page.locator(FINISHED_SECTION)).not.toBeVisible();
    });

    test('keyboard expand and collapse', async ({ page }) => {
      // Expand all via keyboard
      await page.locator(EXPAND_BTN).focus();
      await page.keyboard.press('Enter');
      await expect(page.locator(STEPPER)).toHaveClass(/stepper--all-expanded/);

      // Collapse via keyboard
      await page.locator(COLLAPSE_BTN).focus();
      await page.keyboard.press('Enter');
      await expect(page.locator(STEPPER)).not.toHaveClass(
        /stepper--all-expanded/
      );

      await expectActiveStep(page, 0);
    });
  });
});
