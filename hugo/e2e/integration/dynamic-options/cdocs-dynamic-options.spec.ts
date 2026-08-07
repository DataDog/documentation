import { test, expect } from '@playwright/test';
import { clickPill, expectHidden, expectVisible, filterPills, hideOverlays, pill } from '../../helpers';

const PAGE_URL = '/dd_e2e/cdocs/integration/dynamic_options/';
const CONTENT_AREA = '#mainContent';

// Platform descriptions
const PLATFORM_DESCRIPTIONS: Record<string, string> = {
    ios: 'Platform is iOS',
    android: 'Platform is Android'
};

// Language descriptions
const PROG_LANG_DESCRIPTIONS: Record<string, string> = {
    swift: 'Programming Language is Swift',
    objective_c: 'Programming Language is Objective-C',
    kotlin: 'Programming Language is Kotlin',
    java: 'Programming Language is Java'
};

// Installation section descriptions (and-conditions)
const INSTALL_DESCRIPTIONS: Record<string, string> = {
    ios_swift: '(Platform is iOS) and (Programming Language is Swift)',
    ios_objective_c: '(Platform is iOS) and (Programming Language is Objective-C)',
    android_kotlin: '(Platform is Android) and (Programming Language is Kotlin)',
    android_java: '(Platform is Android) and (Programming Language is Java)'
};

// Which languages belong to each platform
const PLATFORM_LANGUAGES: Record<string, string[]> = {
    ios: ['swift', 'objective_c'],
    android: ['kotlin', 'java']
};

// Default language for each platform
const PLATFORM_DEFAULT_LANG: Record<string, string> = {
    ios: 'swift',
    android: 'kotlin'
};

test.describe('Cdocs dynamic options', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PAGE_URL);
        await page.waitForSelector('#cdoc-content');
        // Reset to defaults
        await clickPill(page, 'platform', 'ios');
        await clickPill(page, 'prog_lang', 'swift');
        await hideOverlays(page);
    });

    test.afterEach(async ({ page }) => {
        // Reset to defaults
        await clickPill(page, 'platform', 'ios');
        await clickPill(page, 'prog_lang', 'swift');
    });

    test.describe('prog_lang options update when platform changes', () => {
        for (const platform of ['ios', 'android'] as const) {
            test(`selecting ${platform} shows correct language options`, async ({ page }) => {
                await clickPill(page, 'platform', platform);

                const expectedLangs = PLATFORM_LANGUAGES[platform];

                // Verify that each expected language pill is visible
                for (const lang of expectedLangs) {
                    await expect(page.locator(pill('prog_lang', lang))).toBeVisible();
                }

                // Verify that languages from the other platform are NOT present
                const otherPlatform = platform === 'ios' ? 'android' : 'ios';
                const otherLangs = PLATFORM_LANGUAGES[otherPlatform];
                for (const lang of otherLangs) {
                    await expect(page.locator(pill('prog_lang', lang))).toHaveCount(0);
                }
            });
        }
    });

    test.describe('default language is selected when platform changes', () => {
        test('switching to android selects kotlin by default', async ({ page }) => {
            await clickPill(page, 'platform', 'android');

            const kotlinPill = page.locator(pill('prog_lang', 'kotlin'));
            await expect(kotlinPill).toHaveAttribute('aria-selected', 'true');
        });

        test('switching back to ios selects swift by default', async ({ page }) => {
            // Switch away first
            await clickPill(page, 'platform', 'android');
            // Switch back
            await clickPill(page, 'platform', 'ios');

            const swiftPill = page.locator(pill('prog_lang', 'swift'));
            await expect(swiftPill).toHaveAttribute('aria-selected', 'true');
        });
    });

    test.describe('platform content filtering', () => {
        for (const platform of ['ios', 'android'] as const) {
            test(`selecting ${platform} shows only its content`, async ({ page }) => {
                await clickPill(page, 'platform', platform);

                await expectVisible(page, PLATFORM_DESCRIPTIONS[platform]);

                const otherPlatform = platform === 'ios' ? 'android' : 'ios';
                await expectHidden(page, PLATFORM_DESCRIPTIONS[otherPlatform]);

                await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(`dynamic-options-${platform}.png`);
            });
        }
    });

    test.describe('prog_lang content filtering', () => {
        for (const [platform, languages] of Object.entries(PLATFORM_LANGUAGES)) {
            for (const lang of languages) {
                test(`selecting ${platform}/${lang} shows only its language content`, async ({ page }) => {
                    await clickPill(page, 'platform', platform);
                    await clickPill(page, 'prog_lang', lang);

                    // The selected language content should be visible
                    await expectVisible(page, PROG_LANG_DESCRIPTIONS[lang]);

                    // The other language on this platform should be hidden
                    for (const otherLang of languages) {
                        if (otherLang !== lang) {
                            await expectHidden(page, PROG_LANG_DESCRIPTIONS[otherLang]);
                        }
                    }
                });
            }
        }
    });

    test.describe('installation section filtering', () => {
        for (const [platform, languages] of Object.entries(PLATFORM_LANGUAGES)) {
            for (const lang of languages) {
                test(`${platform}/${lang} shows only its install block`, async ({ page }) => {
                    await clickPill(page, 'platform', platform);
                    await clickPill(page, 'prog_lang', lang);

                    const activeKey = `${platform}_${lang}`;
                    await expectVisible(page, INSTALL_DESCRIPTIONS[activeKey]);

                    // All other install blocks should be hidden
                    for (const [key, desc] of Object.entries(INSTALL_DESCRIPTIONS)) {
                        if (key !== activeKey) {
                            await expectHidden(page, desc);
                        }
                    }
                });
            }
        }
    });
});
