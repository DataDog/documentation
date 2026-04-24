// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import { CodeBlockBloated } from './CodeBlockBloated';

const CodeBlockComponent = CodeBlockBloated as ComponentType<any>;

afterEach(cleanup);

const renderCodeBlock = (props: Partial<Parameters<typeof CodeBlockBloated>[0]> = {}) =>
  render(h(CodeBlockComponent, { content: 'const x = 1;', ...props }));

describe('CodeBlock — static render', () => {
  it('renders with data-testid attribute', () => {
    renderCodeBlock();
    expect(screen.getByTestId('code-block')).toBeTruthy();
  });

  it('sets data-language attribute when language is provided', () => {
    renderCodeBlock({ language: 'javascript' });
    expect(screen.getByTestId('code-block').getAttribute('data-language')).toBe('javascript');
  });

  it('omits data-language attribute when no language specified', () => {
    renderCodeBlock();
    expect(screen.getByTestId('code-block').hasAttribute('data-language')).toBe(false);
  });

  it('renders a copy button with default text by default', () => {
    renderCodeBlock();
    const copyButton = screen.getByTestId('code-block-copy');
    expect(copyButton).toBeTruthy();
    expect(copyButton.textContent).toBe('Copy');
  });

  it('renders highlighted HTML when highlightedCode is provided', () => {
    const highlighted = '<pre class="shiki"><code><span style="color:#D73A49">const</span> x = 1;</code></pre>';
    const { container } = renderCodeBlock({ highlightedCode: highlighted });
    expect(container.innerHTML).toContain('shiki');
    expect(container.innerHTML).toContain('color:#D73A49');
  });

  it('falls back to plain pre/code when no highlightedCode', () => {
    const { container } = renderCodeBlock({ content: 'plain text' });
    expect(container.querySelector('pre')).toBeTruthy();
    expect(container.querySelector('code')).toBeTruthy();
    expect(container.querySelector('code')?.textContent).toBe('plain text');
  });

  it('renders filename in header when provided', () => {
    renderCodeBlock({ filename: 'app.py' });
    const filename = screen.getByTestId('code-block-filename');
    expect(filename).toBeTruthy();
    expect(filename.textContent).toBe('app.py');
  });

  it('does not render filename element when not provided', () => {
    renderCodeBlock({ language: 'python' });
    expect(screen.queryByTestId('code-block-filename')).toBeNull();
  });

  it('shows filename when both language and filename are provided', () => {
    renderCodeBlock({ language: 'python', filename: 'app.py' });
    expect(screen.getByTestId('code-block').getAttribute('data-language')).toBe('python');
    expect(screen.getByTestId('code-block-filename').textContent).toBe('app.py');
  });

  it('hides copy button when disableCopy is true', () => {
    renderCodeBlock({ disableCopy: true });
    expect(screen.queryByTestId('code-block-copy')).toBeNull();
  });

  it('renders toggle button when collapsible is true, content visible by default', () => {
    renderCodeBlock({ collapsible: true });
    const toggle = screen.getByTestId('code-block-toggle');
    expect(toggle).toBeTruthy();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');

    const content = screen.getByTestId('code-block-content');
    expect(content.classList.contains('code-block__content--hidden')).toBe(false);
  });

  it('does not render toggle button by default', () => {
    renderCodeBlock();
    expect(screen.queryByTestId('code-block-toggle')).toBeNull();
  });

  it('applies BEM wrap modifier when wrap is true', () => {
    renderCodeBlock({ wrap: true });
    const container = screen.getByTestId('code-block');
    expect(container.classList.contains('code-block--wrap')).toBe(true);
  });

  it('does not apply wrap modifier by default', () => {
    renderCodeBlock();
    const container = screen.getByTestId('code-block');
    expect(container.classList.contains('code-block--wrap')).toBe(false);
  });
});

describe('CodeBlock — copy interactivity', () => {
  it('clicking copy writes content to clipboard and updates button text', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
      writable: true,
    });

    renderCodeBlock({ content: 'hello world' });

    const copyButton = screen.getByTestId('code-block-copy');
    expect(copyButton.textContent).toBe('Copy');

    await user.click(copyButton);

    expect(writeText).toHaveBeenCalledWith('hello world');
    expect(screen.getByTestId('code-block-copy').textContent).toBe('Copied!');
  });
});

describe('CodeBlock — collapsible interactivity', () => {
  it('toggle button hides content and updates BEM modifier + aria when clicked', async () => {
    const user = userEvent.setup();
    renderCodeBlock({ collapsible: true });

    const toggle = screen.getByTestId('code-block-toggle');
    const content = screen.getByTestId('code-block-content');
    const chevron = toggle.querySelector('.code-block__chevron') as HTMLElement;

    // Initial state: expanded, chevron up, content not hidden
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-label')).toBe('Collapse code');
    expect(content.classList.contains('code-block__content--hidden')).toBe(false);
    expect(chevron.classList.contains('code-block__chevron--up')).toBe(true);
    expect(chevron.classList.contains('code-block__chevron--down')).toBe(false);

    await user.click(toggle);

    // Collapsed: hidden class applied, aria flipped, chevron down
    const toggleAfter = screen.getByTestId('code-block-toggle');
    const contentAfter = screen.getByTestId('code-block-content');
    const chevronAfter = toggleAfter.querySelector('.code-block__chevron') as HTMLElement;

    expect(toggleAfter.getAttribute('aria-expanded')).toBe('false');
    expect(toggleAfter.getAttribute('aria-label')).toBe('Expand code');
    expect(contentAfter.classList.contains('code-block__content--hidden')).toBe(true);
    expect(chevronAfter.classList.contains('code-block__chevron--down')).toBe(true);
    expect(chevronAfter.classList.contains('code-block__chevron--up')).toBe(false);
  });

  it('clicking toggle a second time re-expands the content', async () => {
    const user = userEvent.setup();
    renderCodeBlock({ collapsible: true });

    const toggle = screen.getByTestId('code-block-toggle');
    await user.click(toggle);
    await user.click(screen.getByTestId('code-block-toggle'));

    const content = screen.getByTestId('code-block-content');
    expect(content.classList.contains('code-block__content--hidden')).toBe(false);
    expect(screen.getByTestId('code-block-toggle').getAttribute('aria-expanded')).toBe('true');
  });
});
