import { describe, it, expect } from 'vitest';
import { htmlToMd, htmlToMdInline } from './htmlToMd';

describe('htmlToMd', () => {
  it('returns empty string for empty input', () => {
    expect(htmlToMd('')).toBe('');
    expect(htmlToMd(undefined)).toBe('');
    expect(htmlToMd(null)).toBe('');
  });

  it('returns plain text unchanged on the fast path', () => {
    expect(htmlToMd('Just plain text.')).toBe('Just plain text.');
  });

  it('converts paragraphs to plain text', () => {
    expect(htmlToMd('<p>Hello world.</p>')).toBe('Hello world.');
  });

  it('converts links', () => {
    expect(htmlToMd('See <a href="https://docs.example.com">our docs</a>.')).toBe(
      'See [our docs](https://docs.example.com).',
    );
  });

  it('converts inline code', () => {
    expect(htmlToMd('Use the <code>foo</code> field.')).toBe('Use the `foo` field.');
  });

  it('converts emphasis to underscores', () => {
    expect(htmlToMd('This is <em>important</em>.')).toBe('This is _important_.');
  });

  it('converts strong to double-asterisks', () => {
    expect(htmlToMd('This is <strong>required</strong>.')).toBe('This is **required**.');
  });

  it('converts <br> to a Markdown hard break', () => {
    expect(htmlToMd('Line one<br>line two')).toBe('Line one  \nline two');
  });

  it('converts unordered lists with the dash bullet style', () => {
    const html = '<ul><li>one</li><li>two</li></ul>';
    expect(htmlToMd(html)).toBe('-   one\n-   two');
  });

  it('decodes HTML entities in tag-free strings (marked encodes apostrophes/quotes)', () => {
    expect(htmlToMd('It&#39;s a &quot;quoted&quot; word')).toBe(`It's a "quoted" word`);
  });
});

describe('htmlToMdInline', () => {
  it('collapses whitespace and newlines to single spaces', () => {
    expect(htmlToMdInline('<p>Line one</p><p>Line two</p>')).toBe('Line one Line two');
  });

  it('handles plain text', () => {
    expect(htmlToMdInline('Plain text')).toBe('Plain text');
  });

  it('returns empty string for empty input', () => {
    expect(htmlToMdInline('')).toBe('');
  });
});
