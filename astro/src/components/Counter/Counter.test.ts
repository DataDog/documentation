import { describe, it, expect } from 'vitest';
import { render } from 'preact-render-to-string';
import { h } from 'preact';
import { Counter } from './Counter';

describe('Counter component', () => {
  it('renders with default initial count of 0', () => {
    const html = render(h(Counter, {}));

    expect(html).toContain('0');
    expect(html).toContain('-');
    expect(html).toContain('+');
  });

  it('renders with a custom initial count', () => {
    const html = render(h(Counter, { initialCount: 42 }));

    expect(html).toContain('42');
  });

  it('renders two buttons', () => {
    const html = render(h(Counter, {}));
    const buttonCount = (html.match(/<button/g) || []).length;

    expect(buttonCount).toBe(2);
  });
});
