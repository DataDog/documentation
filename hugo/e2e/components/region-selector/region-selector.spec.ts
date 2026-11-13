import { test, expect, type Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { hideOverlays } from '../../helpers';

// The expected values are read from `shared/regions.yaml`.
// Hugo builds the page from the same file.
// So these tests check that the page shows what the file says.
interface Region {
    key: string;
    label: string;
    weight: number;
    values: Record<string, string>;
}

const REGIONS_FILE = path.resolve(__dirname, '../../../../shared/regions.yaml');
const { regions } = yaml.safeLoad(fs.readFileSync(REGIONS_FILE, 'utf8')) as { regions: Region[] };
const regionsByWeight = [...regions].sort((a, b) => a.weight - b.weight);
const valueKeys = Object.keys(regions[0].values);

const PAGE_URL = '/dd_e2e/cdocs/components/region_param/';
const CONTENT_AREA = '#mainContent';
const PROBE_CLASS = 'e2e-region-probe';

async function selectRegion(page: Page, key: string) {
    await page.click('.js-region-select .btn');
    await page.click(`.js-region-select .dropdown-item[data-value="${key}"]`);
}

test.describe('Region selector', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PAGE_URL);
        await page.waitForSelector(CONTENT_AREA);
        await hideOverlays(page);
    });

    test('dropdown lists every region in weight order', async ({ page }) => {
        const items = page.locator('.js-region-select .dropdown-item');

        await expect(items).toHaveCount(regionsByWeight.length);
        expect(await items.evaluateAll((els) => els.map((el) => (el as HTMLElement).dataset.value))).toEqual(
            regionsByWeight.map((r) => r.key)
        );
        expect((await items.allTextContents()).map((t) => t.trim())).toEqual(regionsByWeight.map((r) => r.label));
    });

    for (const region of regionsByWeight) {
        test(`selecting ${region.label} updates the selector and every region param`, async ({ page }) => {
            // The region script finds `[data-region-param]` elements each time the
            // region changes, so one probe per key covers the whole config
            // without a test page that lists every key by hand.
            await page.evaluate(
                ({ keys, probeClass }) => {
                    const container = document.querySelector('#mainContent');
                    for (const key of keys) {
                        const span = document.createElement('span');
                        span.className = `js-region-param region-param ${probeClass}`;
                        span.dataset.regionParam = key;
                        container?.appendChild(span);
                    }
                },
                { keys: valueKeys, probeClass: PROBE_CLASS }
            );

            await selectRegion(page, region.key);

            await expect(page.locator('.js-region-select .btn-inner')).toHaveText(region.label);
            await expect(page).toHaveURL(new RegExp(`[?&]site=${region.key}(&|$)`));

            // Some values hold markup (`<br>`) and the script writes them with
            // innerHTML, so compare HTML. Run the expected values through the
            // browser's parser too, so entity encoding (`&` -> `&amp;`) matches.
            const { rendered, expected } = await page.evaluate(
                ({ probeClass, values }) => {
                    const toHtml = (value: string) => {
                        const el = document.createElement('span');
                        el.innerHTML = value;
                        return el.innerHTML;
                    };
                    const probes = [...document.querySelectorAll<HTMLElement>(`.${probeClass}`)];
                    return {
                        rendered: Object.fromEntries(probes.map((el) => [el.dataset.regionParam, el.innerHTML])),
                        expected: Object.fromEntries(Object.entries(values).map(([k, v]) => [k, toHtml(v)]))
                    };
                },
                { probeClass: PROBE_CLASS, values: region.values }
            );
            expect(rendered).toEqual(expected);
        });
    }
});
