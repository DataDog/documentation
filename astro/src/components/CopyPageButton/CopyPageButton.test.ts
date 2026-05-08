// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/preact';
import { h } from 'preact';
import { CopyPageButton, type CopyPageButtonLabels } from './CopyPageButton';

const labels: CopyPageButtonLabels = {
    "Copy page contents": "Copy page contents",
    "Copied page contents": "Copied page contents",
    "Copied!": "Copied!",
};

vi.mock('./pageTextLoader', () => ({
    loadPageText: vi.fn().mockResolvedValue('mock page text'),
}));

import { loadPageText } from './pageTextLoader';

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
    it('renders with default "Copy page contents" label', () => {
        render(h(CopyPageButton, { labels }));
        const label = document.querySelector('.copy-page-button__label')!;
        expect(label.textContent).toBe('Copy page contents');
    });

    it('contains a clipboard SVG icon', () => {
        render(h(CopyPageButton, { labels }));
        const svg = document.querySelector('.copy-page-button__icon svg')!;
        expect(svg).toBeTruthy();
        expect(svg.getAttribute('aria-hidden')).toBe('true');
    });

    it('copies text and flips label to "Copied!" on click', async () => {
        const writeText = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText },
            configurable: true,
            writable: true,
        });

        render(h(CopyPageButton, { labels }));
        fireEvent.click(document.querySelector('.copy-page-button')!);

        await waitFor(() => {
            expect(document.querySelector('.copy-page-button__label')!.textContent).toBe('Copied!');
        });

        expect(loadPageText).toHaveBeenCalled();
        expect(writeText).toHaveBeenCalledWith('mock page text');
    });

    it('resets to default label after 3 seconds', async () => {
        vi.useFakeTimers();

        render(h(CopyPageButton, { labels }));
        const btn = document.querySelector('.copy-page-button')!;

        // Fire click and flush microtasks so the async handler resolves
        fireEvent.click(btn);
        await vi.advanceTimersByTimeAsync(0);

        expect(document.querySelector('.copy-page-button__label')!.textContent).toBe('Copied!');

        await vi.advanceTimersByTimeAsync(3000);

        expect(document.querySelector('.copy-page-button__label')!.textContent).toBe('Copy page contents');

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
            expect(document.querySelector('.copy-page-button__label')!.textContent).toBe('Copied!');
        });

        const path = document.querySelector('.copy-page-button__icon svg path')!;
        expect(path.getAttribute('d')).toContain('l-3.2-3.2');
    });
});
