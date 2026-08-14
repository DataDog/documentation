// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import { CopyButton, type CopyButtonLabels } from '../CopyButton';

const labels: CopyButtonLabels = {
  "Copy code": "Copy code",
  "Copy": "Copy",
  "Copied!": "Copied!",
};

afterEach(cleanup);

describe('CopyButton', () => {
  it('renders with default Copy label', () => {
    render(h(CopyButton, { content: 'hello', labels }));
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

    render(h(CopyButton, { content: 'hello world', labels }));
    await user.click(document.querySelector('.code-block__copy')!);

    expect(writeText).toHaveBeenCalledWith('hello world');
    expect(document.querySelector('.code-block__copy')!.textContent).toBe('Copied!');
  });

  it('sets data-hydrated on itself on mount', () => {
    render(h(CopyButton, { content: 'x', labels }));
    expect(document.querySelector('.code-block__copy')!.getAttribute('data-hydrated')).toBe('true');
  });
});
