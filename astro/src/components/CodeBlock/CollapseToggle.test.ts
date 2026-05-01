// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import { CollapseToggle } from './CollapseToggle';

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
});

const setupShell = (shellId: string, contentId: string) => {
  const shell = document.createElement('div');
  shell.id = shellId;
  shell.className = 'code-block';
  const target = document.createElement('div');
  target.id = contentId;
  shell.appendChild(target);
  document.body.appendChild(shell);
  return { shell, target };
};

const mountToggle = (shellId: string, contentId: string) =>
  render(
    h(CollapseToggle, {
      externalContext: { scope: shellId, entries: { contentEl: contentId } },
    }),
  );

describe('CollapseToggle', () => {
  it('renders expanded by default', () => {
    setupShell('s1', 't1');
    mountToggle('s1', 't1');
    const toggle = document.querySelector('.code-block__toggle')!;
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-label')).toBe('Collapse code');
    const chevron = toggle.querySelector('.code-block__chevron') as HTMLElement;
    expect(chevron.classList.contains('code-block__chevron--up')).toBe(true);
  });

  it('toggles target hidden class + aria + chevron on click', async () => {
    const user = userEvent.setup();
    const { target } = setupShell('s2', 't2');
    mountToggle('s2', 't2');

    const toggle = document.querySelector('.code-block__toggle')!;
    expect(target.classList.contains('code-block__content--hidden')).toBe(false);

    await user.click(toggle);

    const after = document.querySelector('.code-block__toggle')!;
    expect(after.getAttribute('aria-expanded')).toBe('false');
    expect(after.getAttribute('aria-label')).toBe('Expand code');
    expect(target.classList.contains('code-block__content--hidden')).toBe(true);
    const chevron = after.querySelector('.code-block__chevron') as HTMLElement;
    expect(chevron.classList.contains('code-block__chevron--down')).toBe(true);
  });

  it('second click re-expands', async () => {
    const user = userEvent.setup();
    const { target } = setupShell('s3', 't3');
    mountToggle('s3', 't3');

    await user.click(document.querySelector('.code-block__toggle')!);
    await user.click(document.querySelector('.code-block__toggle')!);

    expect(target.classList.contains('code-block__content--hidden')).toBe(false);
    expect(document.querySelector('.code-block__toggle')!.getAttribute('aria-expanded')).toBe('true');
  });

  it('sets data-hydrated on itself on mount', () => {
    setupShell('s4', 't4');
    mountToggle('s4', 't4');
    expect(document.querySelector('.code-block__toggle')!.getAttribute('data-hydrated')).toBe('true');
  });
});
