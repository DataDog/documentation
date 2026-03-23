import { test, expect, type Page } from '@playwright/test';

const PAGE_URL = '/dd_e2e/cdocs/components/tabs/';
const CONTENT_AREA = '#mainContent';

// Tab group indices (0-based DOM order)
const GROUP = {
  TWO_TABS: 0,
  THREE_TABS: 1,
  PLAIN_TEXT: 2,
  MIXED_CONTENT: 3,
  TABLES: 4,
  MANY_TABS: 5,
} as const;

// --- Helpers ---

async function hideOverlays(page: Page) {
  await page.addStyleTag({
    content: `
      .conv-search-float-btn { display: none !important; }
      body > header { display: none !important; }
      .announcement-banner { display: none !important; }
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  });
}

function tabGroup(page: Page, index: number) {
  return page.locator('.code-tabs').nth(index);
}

function tabButton(page: Page, groupIndex: number, lang: string) {
  return tabGroup(page, groupIndex).locator(`.nav-tabs a[data-lang="${lang}"]`);
}

function tabPane(page: Page, groupIndex: number, lang: string) {
  return tabGroup(page, groupIndex).locator(`.tab-pane[data-lang="${lang}"]`);
}

// --- Tests ---

test.describe('Cdocs tabs component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForSelector(CONTENT_AREA);
    // Wait for codetabs.js to render tab buttons
    await page.waitForSelector('.code-tabs .nav-tabs li');
    await page.evaluate(() =>
      Promise.all([
        document.fonts.ready,
        ...Array.from(document.images, (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((r) => {
                img.onload = img.onerror = r;
              })
        ),
      ])
    );
    await hideOverlays(page);
  });

  test('page renders as expected', async ({ page }) => {
    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'tabs-initial.png'
    );
  });

  test('first tab in each group is selected on initial load', async ({
    page,
  }) => {
    const expected: [number, string][] = [
      [GROUP.TWO_TABS, 'python'],
      [GROUP.THREE_TABS, 'linux'],
      [GROUP.PLAIN_TEXT, 'overview'],
      [GROUP.MIXED_CONTENT, 'configuration'],
      [GROUP.TABLES, 'required-parameters'],
      [GROUP.MANY_TABS, 'amazon-linux'],
    ];

    for (const [groupIdx, lang] of expected) {
      const activeLink = tabGroup(page, groupIdx).locator(
        '.nav-tabs li.active a'
      );
      await expect(activeLink).toHaveAttribute('data-lang', lang);
    }
  });

  test('only the active tab content is visible in each group', async ({
    page,
  }) => {
    for (const groupIdx of Object.values(GROUP)) {
      const group = tabGroup(page, groupIdx);
      // Exactly one pane should be active
      await expect(group.locator('.tab-pane.active.show')).toHaveCount(1);
    }
  });

  test('tab buttons display the correct labels', async ({ page }) => {
    const twoTabLinks = tabGroup(page, GROUP.TWO_TABS).locator('.nav-tabs a');
    await expect(twoTabLinks).toHaveText(['Python', 'Ruby']);

    const threeTabLinks = tabGroup(page, GROUP.THREE_TABS).locator(
      '.nav-tabs a'
    );
    await expect(threeTabLinks).toHaveText(['Linux', 'macOS', 'Windows']);

    const manyTabLinks = tabGroup(page, GROUP.MANY_TABS).locator('.nav-tabs a');
    await expect(manyTabLinks).toHaveCount(9);
    await expect(manyTabLinks.first()).toHaveText('Amazon Linux');
    await expect(manyTabLinks.last()).toHaveText('Kubernetes');
  });

  test('clicking a tab reveals its content and hides the previous tab', async ({
    page,
  }) => {
    const pythonPane = tabPane(page, GROUP.TWO_TABS, 'python');
    const rubyPane = tabPane(page, GROUP.TWO_TABS, 'ruby');
    const rubyBtn = tabButton(page, GROUP.TWO_TABS, 'ruby');

    // Python is initially active
    await expect(pythonPane).toHaveClass(/active/);
    await expect(rubyPane).not.toHaveClass(/active/);

    // Click Ruby
    await rubyBtn.click();

    await expect(rubyPane).toHaveClass(/active/);
    await expect(rubyPane).toHaveClass(/show/);
    await expect(pythonPane).not.toHaveClass(/active/);

    // Ruby button's <li> is marked active
    await expect(rubyBtn.locator('..')).toHaveClass(/active/);
  });

  test('mixed content tab displays code block and alert', async ({ page }) => {
    const configPane = tabPane(page, GROUP.MIXED_CONTENT, 'configuration');
    await expect(configPane).toHaveClass(/active/);
    await expect(configPane.locator('.code-snippet')).toBeVisible();
    await expect(configPane.locator('.alert-info')).toBeVisible();
  });

  test('tables tab displays table content', async ({ page }) => {
    // Required parameters is the initial active tab
    const requiredPane = tabPane(page, GROUP.TABLES, 'required-parameters');
    await expect(requiredPane.locator('table')).toBeVisible();

    // Switch to optional parameters
    await tabButton(page, GROUP.TABLES, 'optional-parameters').click();
    const optionalPane = tabPane(page, GROUP.TABLES, 'optional-parameters');
    await expect(optionalPane).toHaveClass(/active/);
    await expect(optionalPane.locator('table')).toBeVisible();
  });

  test('URL updates with tab query parameter on click', async ({ page }) => {
    await tabButton(page, GROUP.TWO_TABS, 'ruby').click();
    await expect(page).toHaveURL(/[?&]tab=ruby/);
  });

  test('many-tabs group switches to pill layout', async ({ page }) => {
    await expect(tabGroup(page, GROUP.MANY_TABS)).toHaveClass(
      /tabs-wrap-layout/
    );
  });
});
