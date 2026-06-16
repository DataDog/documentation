// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getMdUrl, loadPageText, extractPageText, _resetCache } from '../pageTextLoader';

beforeEach(() => {
    _resetCache();
    vi.restoreAllMocks();
    delete document.documentElement.dataset.commitRef;
});

function setLocation({ origin, pathname }: { origin: string; pathname: string }) {
    Object.defineProperty(window, 'location', {
        value: { origin, pathname },
        writable: true,
    });
}

describe('getMdUrl', () => {
    it('strips trailing slash and appends .md, anchored to the current origin', () => {
        setLocation({ origin: 'https://docs.datadoghq.com', pathname: '/api/latest/metrics/' });
        expect(getMdUrl()).toBe('https://docs.datadoghq.com/api/latest/metrics.md');
    });

    it('handles paths without a trailing slash', () => {
        setLocation({ origin: 'https://docs.datadoghq.com', pathname: '/api/latest/metrics' });
        expect(getMdUrl()).toBe('https://docs.datadoghq.com/api/latest/metrics.md');
    });

    it('handles locale-prefixed paths', () => {
        setLocation({ origin: 'https://docs.datadoghq.com', pathname: '/ja/api/latest/metrics/' });
        expect(getMdUrl()).toBe('https://docs.datadoghq.com/ja/api/latest/metrics.md');
    });

    it('strips commitRef branch prefix from pathname', () => {
        document.documentElement.dataset.commitRef = 'my-branch';
        setLocation({
            origin: 'https://docs.datadoghq.com',
            pathname: '/my-branch/api/latest/metrics/',
        });
        expect(getMdUrl()).toBe('https://docs.datadoghq.com/api/latest/metrics.md');
    });

    it('uses the current origin instead of forcing docs.datadoghq.com', () => {
        setLocation({ origin: 'http://localhost:4322', pathname: '/api/latest/metrics/' });
        expect(getMdUrl()).toBe('http://localhost:4322/api/latest/metrics.md');
    });

    it('uses the current origin for preview deployments', () => {
        setLocation({
            origin: 'https://preview.datadoghq.example',
            pathname: '/api/latest/metrics/',
        });
        expect(getMdUrl()).toBe('https://preview.datadoghq.example/api/latest/metrics.md');
    });
});

describe('loadPageText', () => {
    beforeEach(() => {
        setLocation({ origin: 'https://docs.datadoghq.com', pathname: '/api/latest/metrics/' });
    });

    it('fetches the .md URL from the current origin and returns text', async () => {
        const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
            new Response('# Metrics\n\nSome content', { status: 200 }),
        );

        const text = await loadPageText();

        expect(fetchSpy).toHaveBeenCalledWith(
            'https://docs.datadoghq.com/api/latest/metrics.md',
            { credentials: 'omit' },
        );
        expect(text).toBe('# Metrics\n\nSome content');
    });

    it('caches the result on subsequent calls', async () => {
        const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
            new Response('cached text', { status: 200 }),
        );

        await loadPageText();
        const text = await loadPageText();

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(text).toBe('cached text');
    });

    it('deduplicates concurrent calls', async () => {
        const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
            new Response('deduped', { status: 200 }),
        );

        const [a, b] = await Promise.all([loadPageText(), loadPageText()]);

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(a).toBe('deduped');
        expect(b).toBe('deduped');
    });

    it('falls back to extractPageText when fetch fails', async () => {
        vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network'));

        const prose = document.createElement('div');
        prose.className = 'prose';
        prose.innerHTML = '<h1>Title</h1><p>Body text</p>';
        document.body.appendChild(prose);

        const text = await loadPageText();

        expect(text).toContain('Title');
        expect(text).toContain('Body text');

        document.body.removeChild(prose);
    });

    it('falls back when fetch returns non-ok status', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue(
            new Response('Not Found', { status: 404 }),
        );

        const prose = document.createElement('div');
        prose.className = 'prose';
        prose.innerHTML = '<p>Fallback content</p>';
        document.body.appendChild(prose);

        const text = await loadPageText();

        expect(text).toContain('Fallback content');

        document.body.removeChild(prose);
    });
});

describe('extractPageText', () => {
    it('converts headings to markdown format', () => {
        const root = document.createElement('div');
        root.innerHTML = '<h1>Title</h1><h2>Subtitle</h2>';
        const text = extractPageText(root);
        expect(text).toContain('# Title');
        expect(text).toContain('## Subtitle');
    });

    it('converts links to markdown format', () => {
        const root = document.createElement('div');
        root.innerHTML = '<p>See <a href="https://example.com">the docs</a> for more.</p>';
        const text = extractPageText(root);
        expect(text).toMatch(/\[the docs\]\(https:\/\/example\.com\/?\)/);
    });

    it('preserves block structure with newlines', () => {
        const root = document.createElement('div');
        root.innerHTML = '<p>First paragraph</p><p>Second paragraph</p>';
        const text = extractPageText(root);
        expect(text).toContain('First paragraph');
        expect(text).toContain('Second paragraph');
        expect(text).toMatch(/First paragraph\n/);
    });

    it('returns empty string for empty root', () => {
        const root = document.createElement('div');
        expect(extractPageText(root)).toBe('');
    });
});
