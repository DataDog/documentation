import { test, expect, type Locator } from '@playwright/test';

const PAGE_URL = '/getting_started/';

async function dispatchEnter(
    input: Locator,
    { isComposing = false, keyCode = 13 }: { isComposing?: boolean; keyCode?: number } = {}
) {
    await input.evaluate(
        (element, options) => {
            const event = new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                code: 'Enter',
                isComposing: options.isComposing,
                key: 'Enter'
            });
            Object.defineProperty(event, 'keyCode', { value: options.keyCode });
            element.dispatchEvent(event);
        },
        { isComposing, keyCode }
    );
}

test.describe('Docs AI conversational search', () => {
    test('does not submit Enter used to confirm IME composition', async ({ page }) => {
        let chatRequests = 0;
        await page.route('**/*', async (route) => {
            const url = new URL(route.request().url());
            if (url.pathname.endsWith('/api/unstable/docs-ai/chat')) {
                chatRequests += 1;
                await route.fulfill({
                    body: 'data: [DONE]\n\n',
                    contentType: 'text/event-stream',
                    status: 200
                });
                return;
            }
            if (url.hostname !== 'localhost') {
                await route.abort();
                return;
            }
            await route.continue();
        });

        await page.goto(PAGE_URL);
        await page.locator('.conv-search-float-btn').click();

        const input = page.locator('.conv-search-input');
        await input.fill('にほん');

        await dispatchEnter(input, { isComposing: true });
        await expect(input).toHaveValue('にほん');
        await expect(page.locator('.conv-search-message-user')).toHaveCount(0);
        expect(chatRequests).toBe(0);

        // Safari can report isComposing=false for the Enter that ends composition,
        // while retaining the IME process key code.
        await dispatchEnter(input, { keyCode: 229 });
        await expect(input).toHaveValue('にほん');
        await expect(page.locator('.conv-search-message-user')).toHaveCount(0);
        expect(chatRequests).toBe(0);

        await input.press('Enter');
        await expect(input).toHaveValue('');
        await expect(page.locator('.conv-search-message-user .conv-search-message-content')).toHaveText('にほん');
        await expect.poll(() => chatRequests).toBe(1);
    });
});
