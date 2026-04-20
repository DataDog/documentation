import { test, expect, type Locator, type Page } from '@playwright/test';
import errorsOverlay from './fixtures/errors-overlay.json';
import {
    freezeClock,
    patchConsoleData,
    selectAutocompleteOption,
    waitForConsole
} from './helpers';

const CONSOLE_URL = '/cdocs/console/';
const FROZEN_NOW = '2026-04-20T12:00:00Z';
const FROZEN_BUILD_TIMESTAMP = Date.parse('2026-04-20T11:59:30Z');

/**
 * Shared setup: freeze the clock, patch data.json to pin the build timestamp,
 * then navigate. Routes / init scripts must be registered before goto.
 */
async function setupConsole(
    page: Page,
    opts: { errorsByFilePath?: Record<string, unknown>; tab?: string } = {}
) {
    await freezeClock(page, FROZEN_NOW);
    await patchConsoleData(page, {
        timestamp: FROZEN_BUILD_TIMESTAMP,
        errorsByFilePath: opts.errorsByFilePath
    });
    const url = opts.tab ? `${CONSOLE_URL}?tab=${opts.tab}` : CONSOLE_URL;
    await page.goto(url);
    await waitForConsole(page);
}

/** Locate the MUI Accordion that contains a summary button with `title` text. */
function accordionByTitle(page: Page, title: string): Locator {
    return page
        .getByRole('button', { name: title, exact: true })
        .locator('xpath=ancestor::*[contains(@class, "MuiAccordion-root")][1]');
}

// --- Build errors tab ---

test.describe('Build errors tab', () => {
    test('no-errors state shows success alert', async ({ page }) => {
        await setupConsole(page, { tab: 'build-errors' });
        await expect(page.getByText('The latest cdocs build has no errors.')).toBeVisible();
        await expect(page.getByText('Compilation errors')).toBeHidden();
    });

    test('no-errors state snapshot', async ({ page }) => {
        await setupConsole(page, { tab: 'build-errors' });
        await expect(page).toHaveScreenshot('build-errors-no-errors.png');
    });

    test('errors state shows alert and compilation errors heading', async ({ page }) => {
        await setupConsole(page, { tab: 'build-errors', errorsByFilePath: errorsOverlay });
        await expect(page.getByText('The latest cdocs build has errors.')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Compilation errors' })).toBeVisible();
    });

    test('errors state renders one Paper per file with VS Code links', async ({ page }) => {
        await setupConsole(page, { tab: 'build-errors', errorsByFilePath: errorsOverlay });
        for (const filePath of Object.keys(errorsOverlay)) {
            const filename = filePath.split('/').pop()!;
            await expect(page.getByRole('heading', { level: 3, name: filename })).toBeVisible();
            await expect(page.locator(`a[href^="vscode://file/${filePath}"]`).first()).toBeVisible();
        }
    });

    test('errors state renders each error message as a row', async ({ page }) => {
        await setupConsole(page, { tab: 'build-errors', errorsByFilePath: errorsOverlay });
        const expectedMessages = Object.values(errorsOverlay).flatMap((errors) =>
            errors.map((e) => e.message)
        );
        for (const msg of expectedMessages) {
            await expect(page.getByRole('cell', { name: msg })).toBeVisible();
        }
    });

    test('errors state snapshot', async ({ page }) => {
        await setupConsole(page, { tab: 'build-errors', errorsByFilePath: errorsOverlay });
        await expect(page).toHaveScreenshot('build-errors-with-errors.png');
    });
});

// --- Quick filter tab ---

test.describe('Quick filter tab', () => {
    const traitInput = (page: Page) =>
        page.getByPlaceholder('Type here to search available traits');
    const optionGroupInput = (page: Page) =>
        page.getByPlaceholder('Type here to search available option groups');

    test.beforeEach(async ({ page }) => {
        await setupConsole(page, { tab: 'quick-filter' });
    });

    test('initial render has no generated markup', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Filter configuration' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Generated markup' })).toBeHidden();
    });

    test('initial snapshot', async ({ page }) => {
        await expect(page).toHaveScreenshot('quick-filter-initial.png');
    });

    test('selecting only a trait does not generate markup', async ({ page }) => {
        await selectAutocompleteOption(traitInput(page), 'database', /\(id: `database`/);
        await expect(page.getByRole('heading', { name: 'Generated markup' })).toBeHidden();
    });

    test('selecting a trait and option group generates frontmatter and if blocks', async ({
        page
    }) => {
        await selectAutocompleteOption(traitInput(page), 'database', /\(id: `database`/);
        await selectAutocompleteOption(
            optionGroupInput(page),
            'dd_e2e_database_options',
            /dd_e2e_database_options/
        );

        await expect(page.getByRole('heading', { name: 'Generated markup' })).toBeVisible();

        // First code block is the yaml frontmatter, second is the if-blocks example.
        const codeBlocks = page.locator('pre');
        await expect(codeBlocks.nth(0)).toContainText('trait_id: database');
        await expect(codeBlocks.nth(0)).toContainText('option_group_id: dd_e2e_database_options');

        await expect(codeBlocks.nth(1)).toContainText('equals($database, "postgres")');
        await expect(codeBlocks.nth(1)).toContainText('equals($database, "mysql")');
        await expect(codeBlocks.nth(1)).toContainText('equals($database, "mongo_db")');
    });

    test('snapshot after lookup completes', async ({ page }) => {
        await selectAutocompleteOption(traitInput(page), 'database', /\(id: `database`/);
        await selectAutocompleteOption(
            optionGroupInput(page),
            'dd_e2e_database_options',
            /dd_e2e_database_options/
        );
        await expect(page.getByRole('heading', { name: 'Generated markup' })).toBeVisible();

        await expect(page).toHaveScreenshot('quick-filter-after-lookup.png');
    });
});

// --- Page wizard tab ---

test.describe('Page wizard tab', () => {
    test.beforeEach(async ({ page }) => {
        await setupConsole(page, { tab: 'page-wizard' });
    });

    test('initial render has only Add filter button', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: 'Filters' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Add filter' })).toBeVisible();
        await expect(page.getByText('No filters added yet.')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Setup instructions' })).toBeHidden();
    });

    test('initial snapshot', async ({ page }) => {
        await expect(page).toHaveScreenshot('page-wizard-initial.png');
    });

    test.describe('existing-config path', () => {
        async function addExistingFilter(page: Page) {
            await page.getByRole('button', { name: 'Add filter' }).click();
            await selectAutocompleteOption(
                page.getByPlaceholder('Type here to search existing traits'),
                'prog_lang',
                /\(id: `prog_lang`/
            );
            await selectAutocompleteOption(
                page.getByPlaceholder('Type here to search existing option groups'),
                'dd_e2e_backend_prog_lang_options',
                /dd_e2e_backend_prog_lang_options/
            );
            // Filter-level Save is the last "Save" in the DOM (outside any accordion).
            const filterLevelSave = page.getByRole('button', { name: 'Save', exact: true }).last();
            await expect(filterLevelSave).toBeEnabled();
            await filterLevelSave.click();
            await expect(page.getByRole('heading', { name: 'Setup instructions' })).toBeVisible();
        }

        test('pick existing trait and existing option group', async ({ page }) => {
            await addExistingFilter(page);

            // Filter row summary shows the option labels joined.
            await expect(page.getByText(/JavaScript, Python, Ruby, Go, Java/)).toBeVisible();

            // No new config needed → YamlConfigInstructions returns null.
            await expect(
                page.getByRole('heading', {
                    name: 'Add the required YAML configuration to the docs site'
                })
            ).toBeHidden();

            // mdoc template references the filter.
            const mdocCode = page.locator('pre').filter({ hasText: 'trait_id: prog_lang' });
            await expect(mdocCode).toBeVisible();
            await expect(mdocCode).toContainText('option_group_id: dd_e2e_backend_prog_lang_options');
        });

        test('filters section snapshot', async ({ page }) => {
            await addExistingFilter(page);
            const filtersSection = page
                .getByRole('heading', { level: 1, name: 'Filters' })
                .locator('xpath=..');
            await expect(filtersSection).toHaveScreenshot(
                'page-wizard-existing-filters-section.png'
            );
        });

        test('setup instructions snapshot', async ({ page }) => {
            await addExistingFilter(page);
            const setupSection = page
                .getByRole('heading', { name: 'Setup instructions' })
                .locator('xpath=..');
            await expect(setupSection).toHaveScreenshot(
                'page-wizard-existing-setup-instructions.png'
            );
        });
    });

    test.describe('new-config path (mirrors twoNewFilters.test.ts)', () => {
        const monsterMovieSpec: NewFilterSpec = {
            traitId: 'favorite_monster_movie',
            traitLabel: 'Favorite monster movie',
            optionGroupId: 'favorite_monster_movie_options',
            options: [
                { id: 'jaws', label: 'Jaws' },
                { id: 'godzilla', label: 'Godzilla' }
            ]
        };
        const movieCandySpec: NewFilterSpec = {
            traitId: 'favorite_movie_candy',
            traitLabel: 'Favorite movie candy',
            optionGroupId: 'favorite_movie_candy_options',
            options: [
                { id: 'twizzlers', label: 'Twizzlers' },
                { id: 'skittles', label: 'Skittles' }
            ]
        };

        async function buildBothFilters(page: Page) {
            await buildNewFilter(page, monsterMovieSpec);
            await buildNewFilter(page, movieCandySpec);
            await expect(page.getByRole('heading', { name: 'Setup instructions' })).toBeVisible();
        }

        // Each YAML code block follows its h3 — scope by the heading for clarity.
        const codeAfter = (page: Page, headingName: string) =>
            page
                .getByRole('heading', { name: headingName })
                .locator('xpath=following-sibling::pre[1]');

        test('filter rows, YAML, and mdoc template all render', async ({ page }) => {
            await buildBothFilters(page);

            await expect(page.getByText(/Favorite monster movie: Jaws, Godzilla/)).toBeVisible();
            await expect(page.getByText(/Favorite movie candy: Twizzlers, Skittles/)).toBeVisible();

            const traitsYaml = codeAfter(page, 'Add new traits');
            await expect(traitsYaml).toContainText('- id: favorite_monster_movie');
            await expect(traitsYaml).toContainText('- id: favorite_movie_candy');

            const optionsYaml = codeAfter(page, 'Add new options');
            await expect(optionsYaml).toContainText('- label: Jaws');
            await expect(optionsYaml).toContainText('- label: Godzilla');
            await expect(optionsYaml).toContainText('- label: Twizzlers');
            await expect(optionsYaml).toContainText('- label: Skittles');

            const optionGroupsYaml = codeAfter(page, 'Add new option groups');
            await expect(optionGroupsYaml).toContainText('favorite_monster_movie_options:');
            await expect(optionGroupsYaml).toContainText('favorite_movie_candy_options:');
            // Each group's first option is marked default: true
            await expect(optionGroupsYaml).toContainText('default: true');

            const mdocCode = codeAfter(page, 'Create the page');
            await expect(mdocCode).toContainText('trait_id: favorite_monster_movie');
            await expect(mdocCode).toContainText('trait_id: favorite_movie_candy');
        });

        test('YAML traits section snapshot', async ({ page }) => {
            await buildBothFilters(page);
            await expect(codeAfter(page, 'Add new traits')).toHaveScreenshot(
                'page-wizard-new-yaml-traits.png'
            );
        });

        test('YAML options section snapshot', async ({ page }) => {
            await buildBothFilters(page);
            await expect(codeAfter(page, 'Add new options')).toHaveScreenshot(
                'page-wizard-new-yaml-options.png'
            );
        });

        test('YAML option groups section snapshot', async ({ page }) => {
            await buildBothFilters(page);
            await expect(codeAfter(page, 'Add new option groups')).toHaveScreenshot(
                'page-wizard-new-yaml-option-groups.png'
            );
        });

        test('mdoc template snapshot', async ({ page }) => {
            await buildBothFilters(page);
            await expect(codeAfter(page, 'Create the page')).toHaveScreenshot(
                'page-wizard-new-mdoc-template.png'
            );
        });
    });
});

// --- Cross-tab ---

test.describe('Tab navigation', () => {
    test('clicking tabs updates the URL query param', async ({ page }) => {
        await setupConsole(page);

        await page.getByRole('tab', { name: 'Quick filter' }).click();
        await expect(page).toHaveURL(/[?&]tab=quick-filter/);

        await page.getByRole('tab', { name: 'Page wizard' }).click();
        await expect(page).toHaveURL(/[?&]tab=page-wizard/);

        await page.getByRole('tab', { name: 'Build errors' }).click();
        await expect(page).toHaveURL(/[?&]tab=build-errors/);
    });

    test('loading with ?tab=page-wizard selects the Page wizard tab', async ({ page }) => {
        await setupConsole(page, { tab: 'page-wizard' });
        await expect(page.getByRole('tab', { name: 'Page wizard' })).toHaveAttribute(
            'aria-selected',
            'true'
        );
    });
});

// --- Builder helper for new-config filters ---

interface NewFilterSpec {
    traitId: string;
    traitLabel: string;
    optionGroupId: string;
    options: { id: string; label: string }[];
}

/**
 * Build one filter entirely from new config: new trait, new option group
 * with new options. Mirrors the UI path exercised in twoNewFilters.test.ts.
 */
async function buildNewFilter(page: Page, spec: NewFilterSpec) {
    await page.getByRole('button', { name: 'Add filter' }).click();

    // --- New trait ---
    const traitAccordion = accordionByTitle(page, 'Add a new trait');
    await traitAccordion.getByRole('button', { name: 'Add a new trait' }).click();
    await page.getByPlaceholder('e.g., prog_lang').fill(spec.traitId);
    await page.getByPlaceholder('e.g., Programming language').fill(spec.traitLabel);
    const traitSaveButton = traitAccordion.getByRole('button', { name: 'Save', exact: true });
    await expect(traitSaveButton).toBeEnabled();
    await traitSaveButton.click();

    // --- New option group ---
    const groupAccordion = accordionByTitle(page, 'Add a new option group');
    await groupAccordion.getByRole('button', { name: 'Add a new option group' }).click();
    await page.getByPlaceholder('e.g., rum_sdk_platform_options').fill(spec.optionGroupId);

    for (const option of spec.options) {
        const optionAccordion = accordionByTitle(page, 'Add a new option');
        await optionAccordion.getByRole('button', { name: 'Add a new option' }).click();
        await page.getByPlaceholder('e.g., amazon_ec2').fill(option.id);
        await page.getByPlaceholder('e.g., Amazon EC2').fill(option.label);
        await optionAccordion.getByRole('button', { name: 'Add option to selection' }).click();
    }

    const groupSaveButton = groupAccordion.getByRole('button', { name: 'Save', exact: true });
    await expect(groupSaveButton).toBeEnabled();
    await groupSaveButton.click();

    // --- Filter-level Save (outside any accordion — last Save in DOM) ---
    const filterLevelSave = page.getByRole('button', { name: 'Save', exact: true }).last();
    await expect(filterLevelSave).toBeEnabled();
    await filterLevelSave.click();
}
