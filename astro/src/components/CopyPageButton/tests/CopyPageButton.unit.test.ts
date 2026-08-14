// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/preact';
import { h } from 'preact';
import { CopyPageButton, type CopyPageButtonLabels } from '../CopyPageButton';

const labels: CopyPageButtonLabels = {
    "Copy page": "Copy page",
    "Copied": "Copied",
};

const visibleLabel = () =>
    document.querySelector('.copy-page-button__label-text--visible')!.textContent;

vi.mock('../pageTextLoader', () => ({
    loadPageText: vi.fn().mockResolvedValue('mock page text'),
}));

import { loadPageText } from '../pageTextLoader';

afterEach(cleanup);

beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockResolvedValue(undefined) },
        configurable: true,
        writable: true,
    });
});

describe('CopyPageButton', () => {
    it('renders with the "Copy page" label visible by default', () => {
        render(h(CopyPageButton, { labels }));
        expect(visibleLabel()).toBe('Copy page');
    });

    it('always renders both label states in the DOM so the icon does not shift on click', () => {
        render(h(CopyPageButton, { labels }));
        const texts = Array.from(
            document.querySelectorAll('.copy-page-button__label-text'),
        ).map((el) => el.textContent);
        expect(texts).toEqual(['Copy page', 'Copied']);
    });

    it('contains a clipboard SVG icon', () => {
        render(h(CopyPageButton, { labels }));
        const svg = document.querySelector('.copy-page-button__icon svg')!;
        expect(svg).toBeTruthy();
        expect(svg.getAttribute('aria-hidden')).toBe('true');
    });

    it('copies text and flips the visible label to "Copied" on click', async () => {
        const writeText = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText },
            configurable: true,
            writable: true,
        });

        render(h(CopyPageButton, { labels }));
        fireEvent.click(document.querySelector('.copy-page-button')!);

        await waitFor(() => {
            expect(visibleLabel()).toBe('Copied');
        });

        expect(loadPageText).toHaveBeenCalled();
        expect(writeText).toHaveBeenCalledWith('mock page text');
    });

    it('resets to the default visible label after 3 seconds', async () => {
        vi.useFakeTimers();

        render(h(CopyPageButton, { labels }));
        const btn = document.querySelector('.copy-page-button')!;

        // Fire click and flush microtasks so the async handler resolves
        fireEvent.click(btn);
        await vi.advanceTimersByTimeAsync(0);

        expect(visibleLabel()).toBe('Copied');

        await vi.advanceTimersByTimeAsync(3000);

        expect(visibleLabel()).toBe('Copy page');

        vi.useRealTimers();
    });

    it('preloads text on mouseenter', () => {
        render(h(CopyPageButton, { labels }));
        fireEvent.mouseEnter(document.querySelector('.copy-page-button')!);
        expect(loadPageText).toHaveBeenCalled();
    });

    it('sets data-hydrated on mount', () => {
        render(h(CopyPageButton, { labels }));
        expect(document.querySelector('.copy-page-button')!.getAttribute('data-hydrated')).toBe('true');
    });

    it('shows success icon with checkmark path when copied', async () => {
        render(h(CopyPageButton, { labels }));
        fireEvent.click(document.querySelector('.copy-page-button')!);

        await waitFor(() => {
            expect(visibleLabel()).toBe('Copied');
        });

        const path = document.querySelector('.copy-page-button__icon svg path')!;
        expect(path.getAttribute('d')).toContain('l-3.2-3.2');
    });
});

describe('CopyPageButton (icon variant)', () => {
    // happy-dom doesn't run layout, so getBoundingClientRect returns zeros by
    // default. Stub specific rects per test to drive the position check.
    function stubRect(el: Element, bottom: number) {
        el.getBoundingClientRect = () =>
            ({ top: 0, left: 0, right: 0, bottom, width: 0, height: bottom, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;
    }

    function setupDom(targetBottom: number, anchorBottom: number) {
        // The icon variant looks for `.api-toolbar` as its sticky anchor via
        // `closest()`, so the test container must carry that class and
        // contain the rendered icon button.
        document.body.innerHTML = `
            <button class="copy-page-button" data-testid="main-button"></button>
            <div class="api-toolbar" data-testid="toolbar"></div>
        `;
        const target = document.querySelector('[data-testid="main-button"]')!;
        const toolbar = document.querySelector('[data-testid="toolbar"]')!;
        stubRect(target, targetBottom);
        stubRect(toolbar, anchorBottom);
        return { target, toolbar };
    }

    function renderIcon(toolbar: Element) {
        return render(h(CopyPageButton, { labels, variant: 'icon' }), {
            container: toolbar as HTMLElement,
        });
    }

    it('renders no label and uses title for the tooltip', () => {
        const { toolbar } = setupDom(200, 100);
        renderIcon(toolbar);
        const btn = document.querySelector('.copy-page-button--icon')!;
        expect(btn.getAttribute('title')).toBe('Copy page');
        expect(document.querySelector('.copy-page-button--icon .copy-page-button__label')).toBeNull();
    });

    it('starts hidden while the watch target sits below the sticky anchor', async () => {
        const { toolbar } = setupDom(200, 100);
        renderIcon(toolbar);
        // Initial position sample runs synchronously in useEffect after mount.
        await waitFor(() => {
            const btn = document.querySelector('.copy-page-button--icon')!;
            expect(btn.classList.contains('copy-page-button--icon-visible')).toBe(false);
        });
    });

    it('reveals itself once the watch target scrolls behind the sticky anchor', async () => {
        const { toolbar, target } = setupDom(200, 100);
        renderIcon(toolbar);

        // Simulate the user scrolling far enough that the main button is now
        // above (or at) the sticky toolbar's bottom edge.
        stubRect(target, 80);
        window.dispatchEvent(new Event('scroll'));

        await waitFor(() => {
            const btn = document.querySelector('.copy-page-button--icon')!;
            expect(btn.classList.contains('copy-page-button--icon-visible')).toBe(true);
        });
    });

    it('hides itself once the watch target scrolls back below the sticky anchor', async () => {
        const { toolbar, target } = setupDom(200, 100);
        renderIcon(toolbar);

        stubRect(target, 80);
        window.dispatchEvent(new Event('scroll'));
        await waitFor(() => {
            expect(
                document.querySelector('.copy-page-button--icon')!
                    .classList.contains('copy-page-button--icon-visible'),
            ).toBe(true);
        });

        stubRect(target, 250);
        window.dispatchEvent(new Event('scroll'));
        await waitFor(() => {
            expect(
                document.querySelector('.copy-page-button--icon')!
                    .classList.contains('copy-page-button--icon-visible'),
            ).toBe(false);
        });
    });
});
