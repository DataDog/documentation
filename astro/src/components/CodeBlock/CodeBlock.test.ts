import { describe, it, expect } from 'vitest';
import { render } from 'preact-render-to-string';
import { h } from 'preact';
import { CodeBlock } from './CodeBlock';

describe('CodeBlock component', () => {
  it('renders with data-testid attribute', () => {
    const html = render(h(CodeBlock, { content: 'const x = 1;' }));

    expect(html).toContain('data-testid="code-block"');
  });

  it('sets data-language attribute when language is provided', () => {
    const html = render(h(CodeBlock, { content: 'const x = 1;', language: 'javascript' }));

    expect(html).toContain('data-language="javascript"');
  });

  it('omits language label when no language specified', () => {
    const html = render(h(CodeBlock, { content: 'plain text' }));

    expect(html).not.toContain('data-language');
  });

  it('renders a copy button with text by default', () => {
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

  it('always renders header even without language', () => {
    const html = render(h(CodeBlock, { content: 'test' }));
    const buttonCount = (html.match(/<button/g) || []).length;

    expect(buttonCount).toBe(1);
  });

  // === Filename ===

  it('renders filename in header when provided', () => {
    const html = render(h(CodeBlock, { content: 'code', filename: 'app.py' }));

    expect(html).toContain('data-testid="code-block-filename"');
    expect(html).toContain('app.py');
  });

  it('does not render filename element when not provided', () => {
    const html = render(h(CodeBlock, { content: 'code', language: 'python' }));

    expect(html).not.toContain('data-testid="code-block-filename"');
  });

  it('shows filename when both language and filename are provided', () => {
    const html = render(h(CodeBlock, { content: 'code', language: 'python', filename: 'app.py' }));

    expect(html).toContain('app.py');
    expect(html).toContain('data-language="python"');
    expect(html).toContain('data-testid="code-block-filename"');
  });

  // === Disable copy ===

  it('hides copy button when disableCopy is true', () => {
    const html = render(h(CodeBlock, { content: 'code', disableCopy: true }));

    expect(html).not.toContain('data-testid="code-block-copy"');
  });

  it('adds data-disable-copy attribute when disableCopy is true', () => {
    const html = render(h(CodeBlock, { content: 'code', disableCopy: true }));

    expect(html).toContain('data-disable-copy');
  });

  // === Collapsible ===

  it('renders toggle button when collapsible is true', () => {
    const html = render(h(CodeBlock, { content: 'code', collapsible: true }));

    expect(html).toContain('data-testid="code-block-toggle"');
    expect(html).toContain('aria-expanded="true"');
  });

  it('does not render toggle button by default', () => {
    const html = render(h(CodeBlock, { content: 'code' }));

    expect(html).not.toContain('data-testid="code-block-toggle"');
  });

  it('renders content visible by default when collapsible', () => {
    const html = render(h(CodeBlock, { content: 'code', collapsible: true }));

    expect(html).toContain('data-testid="code-block-content"');
    expect(html).not.toContain('content--hidden');
  });

  it('adds data-collapsible attribute when collapsible', () => {
    const html = render(h(CodeBlock, { content: 'code', collapsible: true }));

    expect(html).toContain('data-collapsible');
  });

  // === Wrap ===

  it('adds data-wrap attribute when wrap is true', () => {
    const html = render(h(CodeBlock, { content: 'code', wrap: true }));

    expect(html).toContain('data-wrap');
  });

  it('does not add data-wrap attribute by default', () => {
    const html = render(h(CodeBlock, { content: 'code' }));

    expect(html).not.toContain('data-wrap');
  });
});
