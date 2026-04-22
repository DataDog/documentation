// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen, waitFor } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import FreeTrialModal from './FreeTrialModal';

const FreeTrialModalComponent = FreeTrialModal as ComponentType<any>;

const classes = {
  overlay: 'free-trial-modal__overlay',
  overlayOpen: 'free-trial-modal__overlay--open',
  dialog: 'free-trial-modal__dialog',
  header: 'free-trial-modal__header',
  title: 'free-trial-modal__title',
  close: 'free-trial-modal__close',
  body: 'free-trial-modal__body',
  iframe: 'free-trial-modal__iframe',
};

const defaultProps = {
  title: 'Start a free trial',
  iframeSrc: 'https://example.com/trial',
  classes,
};

const renderModal = (props: Partial<typeof defaultProps> = {}) =>
  render(h(FreeTrialModalComponent, { ...defaultProps, ...props }));

afterEach(() => {
  cleanup();
  // Reset any body overflow left behind by the modal's open effect.
  document.body.style.overflow = '';
  // Remove any leftover trigger elements added to document.body in tests.
  document.body.innerHTML = '';
});

describe('FreeTrialModal — initial render', () => {
  it('renders closed by default (hidden, no open BEM modifier, no iframe)', () => {
    renderModal();

    const overlay = screen.getByTestId('free-trial-modal');
    expect(overlay.classList.contains('free-trial-modal__overlay')).toBe(true);
    expect(overlay.classList.contains('free-trial-modal__overlay--open')).toBe(false);
    expect(overlay.hasAttribute('hidden')).toBe(true);
    expect(overlay.getAttribute('aria-hidden')).toBe('true');
    expect(overlay.querySelector('iframe')).toBeNull();
  });

  it('renders the title and close button', () => {
    renderModal();

    const heading = screen.getByText('Start a free trial');
    expect(heading.tagName).toBe('H6');
    expect(heading.classList.contains('free-trial-modal__title')).toBe(true);
    const closeBtn = screen
      .getByTestId('free-trial-modal')
      .querySelector('button[aria-label="close"]');
    expect(closeBtn).not.toBeNull();
  });
});

describe('FreeTrialModal — opens via trigger', () => {
  it('opens when an element with data-trigger="free-trial" is clicked (visibility + BEM)', async () => {
    const user = userEvent.setup();
    renderModal();

    const trigger = document.createElement('button');
    trigger.setAttribute('data-trigger', 'free-trial');
    trigger.textContent = 'Open trial';
    document.body.appendChild(trigger);

    await user.click(trigger);

    const overlay = screen.getByTestId('free-trial-modal');
    expect(overlay.classList.contains('free-trial-modal__overlay--open')).toBe(true);
    expect(overlay.hasAttribute('hidden')).toBe(false);
    expect(overlay.getAttribute('aria-hidden')).toBe('false');

    const iframe = overlay.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute('src')).toBe('https://example.com/trial');
    expect(iframe?.classList.contains('free-trial-modal__iframe')).toBe(true);
  });

  it('opens when a descendant of the trigger is clicked (closest lookup)', async () => {
    const user = userEvent.setup();
    renderModal();

    const trigger = document.createElement('a');
    trigger.setAttribute('data-trigger', 'free-trial');
    trigger.href = '#';
    const inner = document.createElement('span');
    inner.textContent = 'Try for free';
    trigger.appendChild(inner);
    document.body.appendChild(trigger);

    await user.click(inner);

    const overlay = screen.getByTestId('free-trial-modal');
    expect(overlay.classList.contains('free-trial-modal__overlay--open')).toBe(true);
  });
});

describe('FreeTrialModal — closing', () => {
  async function openModal(user: ReturnType<typeof userEvent.setup>) {
    const trigger = document.createElement('button');
    trigger.setAttribute('data-trigger', 'free-trial');
    document.body.appendChild(trigger);
    await user.click(trigger);
  }

  it('closes when the close button is clicked (visibility + BEM)', async () => {
    const user = userEvent.setup();
    renderModal();
    await openModal(user);

    const overlay = screen.getByTestId('free-trial-modal');
    expect(overlay.classList.contains('free-trial-modal__overlay--open')).toBe(true);

    await user.click(screen.getByRole('button', { name: 'close' }));

    expect(overlay.classList.contains('free-trial-modal__overlay--open')).toBe(false);
    expect(overlay.hasAttribute('hidden')).toBe(true);
    expect(overlay.getAttribute('aria-hidden')).toBe('true');
    expect(overlay.querySelector('iframe')).toBeNull();
  });

  it('closes on Escape keypress', async () => {
    const user = userEvent.setup();
    renderModal();
    await openModal(user);

    const overlay = screen.getByTestId('free-trial-modal');
    expect(overlay.classList.contains('free-trial-modal__overlay--open')).toBe(true);

    await user.keyboard('{Escape}');

    expect(overlay.classList.contains('free-trial-modal__overlay--open')).toBe(false);
    expect(overlay.hasAttribute('hidden')).toBe(true);
  });

  it('closes on backdrop click but stays open when inner dialog is clicked', async () => {
    const user = userEvent.setup();
    renderModal();
    await openModal(user);

    const overlay = screen.getByTestId('free-trial-modal');
    const dialog = overlay.querySelector('.free-trial-modal__dialog') as HTMLElement;
    expect(dialog).not.toBeNull();

    // Clicking inside the dialog should not close.
    await user.click(dialog);
    expect(overlay.classList.contains('free-trial-modal__overlay--open')).toBe(true);

    // Clicking the overlay itself (backdrop) should close.
    await user.click(overlay);
    expect(overlay.classList.contains('free-trial-modal__overlay--open')).toBe(false);
    expect(overlay.hasAttribute('hidden')).toBe(true);
  });
});

describe('FreeTrialModal — body scroll lock', () => {
  it('locks and unlocks body scroll across open/close', async () => {
    const user = userEvent.setup();
    renderModal();

    expect(document.body.style.overflow).toBe('');

    const trigger = document.createElement('button');
    trigger.setAttribute('data-trigger', 'free-trial');
    document.body.appendChild(trigger);
    await user.click(trigger);

    const overlay = screen.getByTestId('free-trial-modal');
    expect(overlay.classList.contains('free-trial-modal__overlay--open')).toBe(true);
    await waitFor(() => expect(document.body.style.overflow).toBe('hidden'));

    const closeBtn = overlay.querySelector('button[aria-label="close"]') as HTMLButtonElement;
    await user.click(closeBtn);

    expect(overlay.classList.contains('free-trial-modal__overlay--open')).toBe(false);
    await waitFor(() => expect(document.body.style.overflow).toBe(''));
  });
});
