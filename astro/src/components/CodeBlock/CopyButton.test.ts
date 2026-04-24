// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import { CopyButton } from './CopyButton';

afterEach(cleanup);

describe('CopyButton', () => {
  it('renders with default Copy label', () => {
    render(h(CopyButton, { content: 'hello' }));
    expect(document.querySelector('.code-block__copy')!.textContent).toBe('Copy');
  });

  it('writes content to clipboard and flips label when clicked', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
      writable: true,
    });

    render(h(CopyButton, { content: 'hello world' }));
    await user.click(document.querySelector('.code-block__copy')!);

    expect(writeText).toHaveBeenCalledWith('hello world');
    expect(document.querySelector('.code-block__copy')!.textContent).toBe('Copied!');
  });

  it('tags its ancestor code-block container with data-hydrated on mount', () => {
    const container = document.createElement('div');
    container.className = 'code-block';
    document.body.appendChild(container);

    render(h(CopyButton, { content: 'x' }), { container });

    expect(container.getAttribute('data-hydrated')).toBe('true');
    document.body.removeChild(container);
  });
});
