import { describe, it, expect } from 'vitest';
import { rewriteInternalDocLink } from './rewriteDocLink';

describe('rewriteInternalDocLink', () => {
  it('appends .md to a root-absolute doc path', () => {
    expect(rewriteInternalDocLink('/agent/guide')).toBe('/agent/guide.md');
  });

  it('strips a trailing slash before appending .md', () => {
    expect(rewriteInternalDocLink('/agent/guide/')).toBe('/agent/guide.md');
  });

  it('rewrites a relative doc path', () => {
    expect(rewriteInternalDocLink('../other/doc')).toBe('../other/doc.md');
  });

  it('preserves a query string after .md', () => {
    expect(rewriteInternalDocLink('/agent/guide?x=1')).toBe('/agent/guide.md?x=1');
  });

  it('preserves a fragment after .md', () => {
    expect(rewriteInternalDocLink('/agent/guide/#section')).toBe(
      '/agent/guide.md#section',
    );
  });

  it('leaves external http(s) URLs untouched', () => {
    expect(rewriteInternalDocLink('https://example.com/x')).toBe(
      'https://example.com/x',
    );
    expect(rewriteInternalDocLink('http://example.com/x')).toBe(
      'http://example.com/x',
    );
  });

  it('leaves protocol-relative and mailto/tel links untouched', () => {
    expect(rewriteInternalDocLink('//cdn.example.com/x')).toBe('//cdn.example.com/x');
    expect(rewriteInternalDocLink('mailto:a@b.com')).toBe('mailto:a@b.com');
    expect(rewriteInternalDocLink('tel:+15551234')).toBe('tel:+15551234');
  });

  it('leaves pure fragment and query links untouched', () => {
    expect(rewriteInternalDocLink('#section')).toBe('#section');
    expect(rewriteInternalDocLink('?x=1')).toBe('?x=1');
  });

  it('leaves asset links (with a file extension) untouched', () => {
    expect(rewriteInternalDocLink('/images/diagram.png')).toBe(
      '/images/diagram.png',
    );
  });

  it('does not double up a link that already ends in .md', () => {
    expect(rewriteInternalDocLink('/agent/guide.md')).toBe('/agent/guide.md');
  });

  it('leaves the bare site root untouched', () => {
    expect(rewriteInternalDocLink('/')).toBe('/');
  });
});
