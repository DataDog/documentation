import { describe, it, expect } from 'vitest';
import { render } from 'preact-render-to-string';
import { h } from 'preact';
import MobileNav from './MobileNav';

describe('MobileNav component', () => {
  const classes = {
    hamburger: 'hamburger',
    hamburgerOpen: 'hamburger--open',
    hamburgerBar: 'hamburger__bar',
  };

  it('renders the hamburger toggle with a testid', () => {
    const html = render(h(MobileNav, { classes }));

    expect(html).toContain('data-testid="mobile-nav-toggle"');
    expect(html).toContain('aria-label="Toggle navigation"');
  });

  it('renders the nav panel and backdrop', () => {
    const html = render(h(MobileNav, { classes }));

    expect(html).toContain('data-testid="mobile-nav"');
    expect(html).toContain('data-testid="mobile-nav-bg"');
  });

  it('renders the stubbed search input', () => {
    const html = render(h(MobileNav, { classes }));

    expect(html).toContain('data-testid="mobile-nav-search"');
    expect(html).toContain('type="search"');
  });
});
