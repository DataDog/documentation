// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import LanguageSelector, { type LanguageOption } from '../LanguageSelector';

const LanguageSelectorComponent = LanguageSelector as ComponentType<any>;

afterEach(cleanup);

const currentLang: LanguageOption = {
  code: 'en',
  primary: 'English',
  secondary: 'English',
  href: '/en/',
};

const alternates: LanguageOption[] = [
  { code: 'ja', primary: '日本語', secondary: 'Japanese', href: '/ja/' },
  { code: 'fr', primary: 'Français', secondary: 'French', href: '/fr/' },
];

const renderSelector = (props: Partial<Parameters<typeof LanguageSelector>[0]> = {}) =>
  render(
    h(LanguageSelectorComponent, {
      currentLang,
      alternates,
      worldIconHtml: '<svg data-testid="world-icon"></svg>',
      caretIconHtml: '<svg data-testid="caret-icon"></svg>',
      ...props,
    }),
  );

describe('LanguageSelector — static render', () => {
  it('renders the toggle button with current language', () => {
    renderSelector();

    const wrapper = document.querySelector('.footer__lang-toggle')!;
    expect(wrapper).toBeTruthy();

    const button = wrapper.querySelector('button')!;
    expect(button.textContent).toContain('English');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(button.getAttribute('aria-haspopup')).toBe('listbox');
  });

  it('popup is hidden by default and has no open BEM modifier', () => {
    renderSelector();

    const popup = screen.getByRole('listbox', { hidden: true });
    expect(popup.hasAttribute('hidden')).toBe(true);
    expect(popup.classList.contains('footer__lang-popup')).toBe(true);
    expect(popup.classList.contains('footer__lang-popup--open')).toBe(false);
  });

  it('caret has no open BEM modifier by default', () => {
    const { container } = renderSelector();

    const caret = container.querySelector('.footer__lang-caret')!;
    expect(caret.classList.contains('footer__lang-caret--open')).toBe(false);
  });
});

describe('LanguageSelector — interactivity', () => {
  it('clicking the button opens the popup (visibility + BEM + aria)', async () => {
    const user = userEvent.setup();
    renderSelector();

    const button = screen.getByRole('button');
    await user.click(button);

    expect(button.getAttribute('aria-expanded')).toBe('true');

    const popup = screen.getByRole('listbox');
    expect(popup.hasAttribute('hidden')).toBe(false);
    expect(popup.classList.contains('footer__lang-popup--open')).toBe(true);

    const caret = popup.parentElement!.querySelector('.footer__lang-caret')!;
    expect(caret.classList.contains('footer__lang-caret--open')).toBe(true);
  });

  it('clicking the button again closes the popup (visibility + BEM)', async () => {
    const user = userEvent.setup();
    const { container } = renderSelector();

    const button = screen.getByRole('button');
    await user.click(button);
    await user.click(button);

    expect(button.getAttribute('aria-expanded')).toBe('false');

    const popup = screen.getByRole('listbox', { hidden: true });
    expect(popup.hasAttribute('hidden')).toBe(true);
    expect(popup.classList.contains('footer__lang-popup--open')).toBe(false);

    const caret = container.querySelector('.footer__lang-caret')!;
    expect(caret.classList.contains('footer__lang-caret--open')).toBe(false);
  });

  it('renders current language and all alternates inside the open popup', async () => {
    const user = userEvent.setup();
    renderSelector();

    await user.click(screen.getByRole('button'));

    const popup = screen.getByRole('listbox');
    const items = popup.querySelectorAll('a.footer__lang-item');
    expect(items.length).toBe(3);
    expect(items[0].getAttribute('href')).toBe('/en/');
    expect(items[1].getAttribute('href')).toBe('/ja/');
    expect(items[2].getAttribute('href')).toBe('/fr/');

    expect(items[1].querySelector('.footer__lang-primary')!.textContent).toBe('日本語');
    expect(items[1].querySelector('.footer__lang-secondary')!.textContent).toBe('Japanese');
  });

  it('pressing Escape closes an open popup (visibility + BEM)', async () => {
    const user = userEvent.setup();
    renderSelector();

    const button = screen.getByRole('button');
    await user.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');

    await user.keyboard('{Escape}');

    expect(button.getAttribute('aria-expanded')).toBe('false');
    const popup = screen.getByRole('listbox', { hidden: true });
    expect(popup.hasAttribute('hidden')).toBe(true);
    expect(popup.classList.contains('footer__lang-popup--open')).toBe(false);
  });

  it('clicking outside the wrapper closes the popup (visibility + BEM)', async () => {
    const user = userEvent.setup();
    renderSelector();

    const button = screen.getByRole('button');
    await user.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');

    const outside = document.createElement('div');
    outside.setAttribute('data-testid', 'outside');
    document.body.appendChild(outside);

    await user.pointer({ target: outside, keys: '[MouseLeft]' });

    expect(button.getAttribute('aria-expanded')).toBe('false');
    const popup = screen.getByRole('listbox', { hidden: true });
    expect(popup.hasAttribute('hidden')).toBe(true);
    expect(popup.classList.contains('footer__lang-popup--open')).toBe(false);

    outside.remove();
  });
});

describe('LanguageSelector — single-language case', () => {
  it('renders only the current language in the popup when there are no alternates', async () => {
    const user = userEvent.setup();
    renderSelector({ alternates: [] });

    await user.click(screen.getByRole('button'));

    const popup = screen.getByRole('listbox');
    const items = popup.querySelectorAll('a.footer__lang-item');
    expect(items.length).toBe(1);
    expect(items[0].getAttribute('href')).toBe('/en/');
    expect(popup.classList.contains('footer__lang-popup--open')).toBe(true);
  });
});
