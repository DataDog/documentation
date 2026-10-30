jest.mock('marked', () => ({ marked: { use: jest.fn(), parse: (text) => text } }));
jest.mock('marked-highlight', () => ({ markedHighlight: () => ({}) }));
jest.mock('highlight.js', () => ({}));

// eslint-disable-next-line import/first
import { expandRefGroup, inlineRefChips } from '../components/conversational-search/markdown';

const chips = (html) => [...html.matchAll(/data-source-number="(\d+)"/g)].map((m) => Number(m[1]));

describe('inlineRefChips', () => {
    it('turns single and grouped citations into chips', () => {
        expect(chips(inlineRefChips('<p>Enable logs [1].</p>'))).toEqual([1]);
        expect(chips(inlineRefChips('<p>See [2, 3] and [1-3] and [4–5].</p>'))).toEqual([2, 3, 1, 2, 3, 4, 5]);
        expect(chips(inlineRefChips('<p>Mixed [1, 3-4].</p>'))).toEqual([1, 3, 4]);
        expect(inlineRefChips('<p>[2, 3]</p>')).not.toContain('[2, 3]');
    });

    it('leaves code and non-citation brackets alone', () => {
        const code = '<pre><code>tags: [1, 2]</code></pre><p><code>[3]</code></p>';
        expect(inlineRefChips(code)).toBe(code);
        expect(inlineRefChips('<p>[a] [3-1] [1-50]</p>')).toBe('<p>[a] [3-1] [1-50]</p>');
    });
});

describe('expandRefGroup', () => {
    it('expands lists and ranges without duplicates', () => {
        expect(expandRefGroup('2, 3')).toEqual([2, 3]);
        expect(expandRefGroup('1-3, 2')).toEqual([1, 2, 3]);
        expect(expandRefGroup('3-1')).toBeNull();
        expect(expandRefGroup('x')).toBeNull();
    });
});
