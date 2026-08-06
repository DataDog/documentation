import { expect, type Locator, type Page } from '@playwright/test';

// --- Route patching ---

/**
 * Intercept the console's `data.json` request, fetch the live response,
 * and overwrite just the bits the tests depend on. Leaves the real
 * customizationConfig untouched so dropdown contents track the live build.
 */
export async function patchConsoleData(
    page: Page,
    overrides: {
        timestamp: number;
        errorsByFilePath?: Record<string, unknown>;
    }
) {
    await page.route('**/cdocs/console/data.json', async (route) => {
        const response = await route.fetch();
        const json = await response.json();
        json.timestamp = overrides.timestamp;
        if (overrides.errorsByFilePath) {
            json.errorsByFilePath = overrides.errorsByFilePath;
        }
        await route.fulfill({ response, json });
    });
}

/**
 * Freeze `Date.now()` (and `new Date()` called with no args) to a fixed
 * instant so `ReactTimeAgo` renders deterministic text like "1 minute ago"
 * regardless of wall-clock drift between the patched `timestamp` and the
 * moment the test actually runs.
 */
export async function freezeClock(page: Page, iso: string) {
    const fixedNow = Date.parse(iso);
    await page.addInitScript((now: number) => {
        const RealDate = Date;
        class FrozenDate extends RealDate {
            constructor(...args: ConstructorParameters<typeof Date>) {
                if (args.length === 0) {
                    super(now);
                } else {
                    // @ts-expect-error — forwarding variadic args to Date
                    super(...args);
                }
            }
            static now() {
                return now;
            }
        }
        // @ts-expect-error — replacing the global
        globalThis.Date = FrozenDate;
    }, fixedNow);
}

// --- MUI Autocomplete ---

/**
 * Select an option from a MUI Autocomplete by typing a substring of its label.
 * Works for both strict (single-value) and flexible (create-new) selectors
 * since all of the console's dropdowns share the same Autocomplete base.
 */
export async function selectAutocompleteOption(
    input: Locator,
    search: string,
    optionText: string | RegExp
) {
    await input.click();
    await input.fill(search);
    const option = input.page().getByRole('option', { name: optionText }).first();
    await expect(option).toBeVisible();
    await option.click();
}

// --- Page chrome ---

/** Wait for the SPA to finish mounting — `<h1 id="title">` only renders after fetch. */
export async function waitForConsole(page: Page) {
    await page.waitForSelector('h1#title');
}
