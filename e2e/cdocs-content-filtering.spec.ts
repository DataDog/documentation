import { test, expect, type Page } from '@playwright/test';

const PAGE_URL = '/dd_e2e/cdocs/content_filtering/';

// --- Selectors ---

/** Returns a selector for a filter pill button. */
function pill(filterId: string, optionId: string): string {
  return `button.cdoc-pill[data-filter-id="${filterId}"][data-option-id="${optionId}"]`;
}

/** Returns a selector for a toggleable content block by its data-description. */
function toggleable(description: string): string {
  return `.cdoc__toggleable[data-description="${description}"]`;
}

const CONTENT_AREA = '#mainContent';

// Content descriptions (from the compiled HTML data-description attributes)
const PROG_LANG_DESCRIPTIONS: Record<string, string> = {
  python: 'Programming Language is Python',
  ruby: 'Programming Language is Ruby',
  go: 'Programming Language is Go',
  javascript: 'Programming Language is JavaScript',
  java: 'Programming Language is Java',
};

const DATABASE_DESCRIPTIONS: Record<string, string> = {
  postgres: 'Database is Postgres',
  mysql: 'Database is MySQL',
  mongo_db: 'Database is MongoDB',
};

const AND_DESCRIPTION = '(Programming Language is Go) and (Database is MySQL)';
const OR_DESCRIPTION =
  '(Programming Language is Go) or (Programming Language is Ruby) or (Programming Language is Python)';
const INCLUDES_DESCRIPTION =
  "The selected value for Programming Language is included in the given list: 'Go, Ruby, Python'";
const NOT_DESCRIPTION = 'Programming Language is not JavaScript';

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

async function resetToDefaults(page: Page) {
  await clickPill(page, 'prog_lang', 'javascript');
  await clickPill(page, 'database', 'postgres');
}

/** Hide the fixed-position Ask AI button so it doesn't overlap element screenshots. */
async function hideAskAiButton(page: Page) {
  await page.addStyleTag({
    content: '.conv-search-float-btn { display: none !important; }',
  });
}

// --- Tests ---

test.describe('Cdocs content filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForSelector('#cdoc-content');
    // Click defaults to clear any persisted state from URL params
    await resetToDefaults(page);
    await hideAskAiButton(page);
  });

  test('initial page snapshot', async ({ page }) => {
    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'content-filtering-defaults.png'
    );
  });

  test.describe('basic prog_lang filtering', () => {
    const languages = ['python', 'ruby', 'go', 'javascript', 'java'] as const;

    for (const lang of languages) {
      test(`selecting ${lang} shows only its content`, async ({ page }) => {
        await clickPill(page, 'prog_lang', lang);

        // The selected pill should be marked as selected
        const selectedPill = page.locator(pill('prog_lang', lang));
        await expect(selectedPill).toHaveClass(/selected/);
        await expect(selectedPill).toHaveAttribute('aria-selected', 'true');

        // The matching content block should be visible
        await expectVisible(page, PROG_LANG_DESCRIPTIONS[lang]);

        // All other prog_lang blocks should be hidden
        for (const other of languages) {
          if (other !== lang) {
            await expectHidden(page, PROG_LANG_DESCRIPTIONS[other]);
          }
        }
      });
    }
  });

  test.describe('basic database filtering', () => {
    const databases = ['postgres', 'mysql', 'mongo_db'] as const;

    for (const db of databases) {
      test(`selecting ${db} shows only its content`, async ({ page }) => {
        await clickPill(page, 'database', db);

        const selectedPill = page.locator(pill('database', db));
        await expect(selectedPill).toHaveClass(/selected/);
        await expect(selectedPill).toHaveAttribute('aria-selected', 'true');

        await expectVisible(page, DATABASE_DESCRIPTIONS[db]);

        for (const other of databases) {
          if (other !== db) {
            await expectHidden(page, DATABASE_DESCRIPTIONS[other]);
          }
        }
      });
    }
  });

  test.describe('and function', () => {
    test('go + mysql reveals and-content', async ({ page }) => {
      await clickPill(page, 'prog_lang', 'go');
      await clickPill(page, 'database', 'mysql');
      await expectVisible(page, AND_DESCRIPTION);
    });

    test('go + postgres hides and-content', async ({ page }) => {
      await clickPill(page, 'prog_lang', 'go');
      await clickPill(page, 'database', 'postgres');
      await expectHidden(page, AND_DESCRIPTION);
    });

    test('python + mysql hides and-content', async ({ page }) => {
      await clickPill(page, 'prog_lang', 'python');
      await clickPill(page, 'database', 'mysql');
      await expectHidden(page, AND_DESCRIPTION);
    });
  });

  test.describe('or function', () => {
    for (const lang of ['go', 'ruby', 'python'] as const) {
      test(`${lang} reveals or-content`, async ({ page }) => {
        await clickPill(page, 'prog_lang', lang);
        await expectVisible(page, OR_DESCRIPTION);
      });
    }

    for (const lang of ['javascript', 'java'] as const) {
      test(`${lang} hides or-content`, async ({ page }) => {
        await clickPill(page, 'prog_lang', lang);
        await expectHidden(page, OR_DESCRIPTION);
      });
    }
  });

  test.describe('includes function', () => {
    for (const lang of ['go', 'ruby', 'python'] as const) {
      test(`${lang} reveals includes-content`, async ({ page }) => {
        await clickPill(page, 'prog_lang', lang);
        await expectVisible(page, INCLUDES_DESCRIPTION);
      });
    }

    for (const lang of ['javascript', 'java'] as const) {
      test(`${lang} hides includes-content`, async ({ page }) => {
        await clickPill(page, 'prog_lang', lang);
        await expectHidden(page, INCLUDES_DESCRIPTION);
      });
    }
  });

  test.describe('not function', () => {
    for (const lang of ['python', 'go', 'ruby', 'java'] as const) {
      test(`${lang} reveals not-content`, async ({ page }) => {
        await clickPill(page, 'prog_lang', lang);
        await expectVisible(page, NOT_DESCRIPTION);
      });
    }

    test('javascript hides not-content', async ({ page }) => {
      await clickPill(page, 'prog_lang', 'javascript');
      await expectHidden(page, NOT_DESCRIPTION);
    });
  });

  test.describe('keyboard navigation', () => {
    test('can select a filter option using keyboard', async ({ page }) => {
      // Start from defaults (javascript + postgres)
      await expectVisible(page, PROG_LANG_DESCRIPTIONS['javascript']);

      // Focus the first prog_lang pill (javascript) and tab to python
      const jsPill = page.locator(pill('prog_lang', 'javascript'));
      await jsPill.focus();
      await page.keyboard.press('Tab');

      // Now the Python pill should be focused
      const pythonPill = page.locator(pill('prog_lang', 'python'));
      await expect(pythonPill).toBeFocused();

      // Press Enter or Space to select it
      await page.keyboard.press('Enter');

      // Verify Python content is now visible and JavaScript is hidden
      await expectVisible(page, PROG_LANG_DESCRIPTIONS['python']);
      await expectHidden(page, PROG_LANG_DESCRIPTIONS['javascript']);
      await expect(pythonPill).toHaveAttribute('aria-selected', 'true');
    });
  });

  test('snapshot after changing both filters', async ({ page }) => {
    await clickPill(page, 'prog_lang', 'go');
    await clickPill(page, 'database', 'mysql');

    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'content-filtering-go-mysql.png'
    );
  });
});
