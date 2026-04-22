// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import LanguageSelector, { type LanguageOption } from './LanguageSelector';

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

const classes = {
  wrapper: 'lang__wrapper',
  button: 'lang__button',
  buttonLabel: 'lang__button-label',
  caret: 'lang__caret',
  caretOpen: 'lang__caret--open',
  popup: 'lang__popup',
  popupOpen: 'lang__popup--open',
  item: 'lang__item',
  primary: 'lang__primary',
  secondary: 'lang__secondary',
};

const renderSelector = (props: Partial<Parameters<typeof LanguageSelector>[0]> = {}) =>
  render(
    h(LanguageSelectorComponent, {
      currentLang,
      alternates,
      worldIconHtml: '<svg data-testid="world-icon"></svg>',
      caretIconHtml: '<svg data-testid="caret-icon"></svg>',
      classes,
      ...props,
    }),
  );

describe('LanguageSelector — static render', () => {
  it('renders the toggle button with current language', () => {
    renderSelector();

    const wrapper = screen.getByTestId('footer-language-selector');
    expect(wrapper).toBeTruthy();
    expect(wrapper.classList.contains('footer-lang-toggle')).toBe(true);

    const button = wrapper.querySelector('button')!;
    expect(button.textContent).toContain('English');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(button.getAttribute('aria-haspopup')).toBe('listbox');
  });

  it('popup is hidden by default and has no open BEM modifier', () => {
    renderSelector();

    const popup = screen.getByRole('listbox', { hidden: true });
    expect(popup.hasAttribute('hidden')).toBe(true);
    expect(popup.classList.contains('lang__popup')).toBe(true);
    expect(popup.classList.contains('lang__popup--open')).toBe(false);
  });

  it('caret has no open BEM modifier by default', () => {
    const { container } = renderSelector();

    const caret = container.querySelector('.lang__caret')!;
    expect(caret.classList.contains('lang__caret--open')).toBe(false);
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
    expect(popup.classList.contains('lang__popup--open')).toBe(true);

    const caret = popup.parentElement!.querySelector('.lang__caret')!;
    expect(caret.classList.contains('lang__caret--open')).toBe(true);
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
    expect(popup.classList.contains('lang__popup--open')).toBe(false);

    const caret = container.querySelector('.lang__caret')!;
    expect(caret.classList.contains('lang__caret--open')).toBe(false);
  });

  it('renders current language and all alternates inside the open popup', async () => {
    const user = userEvent.setup();
    renderSelector();

    await user.click(screen.getByRole('button'));

    const popup = screen.getByRole('listbox');
    const items = popup.querySelectorAll('a.lang__item');
    expect(items.length).toBe(3);
    expect(items[0].getAttribute('href')).toBe('/en/');
    expect(items[1].getAttribute('href')).toBe('/ja/');
    expect(items[2].getAttribute('href')).toBe('/fr/');

    expect(items[1].querySelector('.lang__primary')!.textContent).toBe('日本語');
    expect(items[1].querySelector('.lang__secondary')!.textContent).toBe('Japanese');
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
    expect(popup.classList.contains('lang__popup--open')).toBe(false);
  });

  it('clicking outside the wrapper closes the popup (visibility + BEM)', async () => {
    const user = userEvent.setup();
    renderSelector();

    const button = screen.getByRole('button');
    await user.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');

    // Create and click an outside element
    const outside = document.createElement('div');
    outside.setAttribute('data-testid', 'outside');
    document.body.appendChild(outside);

    await user.pointer({ target: outside, keys: '[MouseLeft]' });

    expect(button.getAttribute('aria-expanded')).toBe('false');
    const popup = screen.getByRole('listbox', { hidden: true });
    expect(popup.hasAttribute('hidden')).toBe(true);
    expect(popup.classList.contains('lang__popup--open')).toBe(false);

    outside.remove();
  });
});

describe('LanguageSelector — single-language case', () => {
  it('renders only the current language in the popup when there are no alternates', async () => {
    const user = userEvent.setup();
    renderSelector({ alternates: [] });

    await user.click(screen.getByRole('button'));

    const popup = screen.getByRole('listbox');
    const items = popup.querySelectorAll('a.lang__item');
    expect(items.length).toBe(1);
    expect(items[0].getAttribute('href')).toBe('/en/');
    expect(popup.classList.contains('lang__popup--open')).toBe(true);
  });
});
