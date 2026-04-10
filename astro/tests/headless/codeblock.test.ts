import { describe, it, expect } from 'vitest';
import { render } from 'preact-render-to-string';
import { h } from 'preact';
import { CodeBlock } from '../../src/components/CodeBlock';

describe('CodeBlock component', () => {
  it('renders with data-testid attribute', () => {
    const html = render(h(CodeBlock, { content: 'const x = 1;' }));

    expect(html).toContain('data-testid="code-block"');
  });

  it('displays language label when provided', () => {
    const html = render(h(CodeBlock, { content: 'const x = 1;', language: 'javascript' }));

    expect(html).toContain('data-language="javascript"');
    expect(html).toContain('javascript');
  });

  it('omits language label when no language specified', () => {
    const html = render(h(CodeBlock, { content: 'plain text' }));

    expect(html).not.toContain('data-language');
  });

  it('renders a copy button', () => {
    const html = render(h(CodeBlock, { content: 'test' }));

    expect(html).toContain('data-testid="code-block-copy"');
    expect(html).toContain('Copy');
  });

  it('renders highlighted HTML when highlightedCode is provided', () => {
    const highlighted = '<pre class="shiki"><code><span style="color:#D73A49">const</span> x = 1;</code></pre>';
    const html = render(h(CodeBlock, { content: 'const x = 1;', highlightedCode: highlighted }));

    expect(html).toContain('shiki');
    expect(html).toContain('color:#D73A49');
  });

  it('falls back to plain pre/code when no highlightedCode', () => {
    const html = render(h(CodeBlock, { content: 'plain text' }));

    expect(html).toContain('<pre');
    expect(html).toContain('<code');
    expect(html).toContain('plain text');
  });

  it('always renders header with copy button even without language', () => {
    const html = render(h(CodeBlock, { content: 'test' }));
    const buttonCount = (html.match(/<button/g) || []).length;

    expect(buttonCount).toBe(1);
  });
});
