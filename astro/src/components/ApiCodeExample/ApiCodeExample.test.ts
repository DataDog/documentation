// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import { ApiCodeExample } from './ApiCodeExample';

const ApiCodeExampleComponent = ApiCodeExample as ComponentType<any>;

afterEach(cleanup);

const examples = [
  {
    language: 'curl',
    label: 'cURL',
    entries: [
      { description: 'Basic call', code: 'curl https://api.example.com', syntax: 'shell' },
    ],
  },
  {
    language: 'python',
    label: 'Python',
    entries: [
      { description: 'First', code: 'print("hi")', syntax: 'python' },
      { description: 'Second', code: 'print("bye")', syntax: 'python' },
    ],
  },
];

const renderComponent = () =>
  render(h(ApiCodeExampleComponent, { examples }));

function getTab(i: number) {
  return document.querySelector<HTMLButtonElement>(`.tabs__button[data-tab-index="${i}"]`)!;
}
function getToggles() {
  return Array.from(
    document.querySelectorAll<HTMLButtonElement>('.api-code-example__accordion-header'),
  );
}

describe('ApiCodeExample — static render', () => {
  it('renders the component root and a heading', () => {
    renderComponent();

    expect(document.querySelector('.api-code-example')).toBeTruthy();
    expect(screen.getByText('Code Example')).toBeTruthy();
  });

  it('renders a tab label for every example set', () => {
    renderComponent();

    expect(screen.getByText('cURL')).toBeTruthy();
    expect(screen.getByText('Python')).toBeTruthy();
  });

  it('renders the active tab\'s single-entry code inline', () => {
    renderComponent();

    expect(screen.getByText('curl https://api.example.com')).toBeTruthy();
  });
});

describe('ApiCodeExample — multi-entry accordion interactivity', () => {
  it('first entry is expanded by default; second is collapsed (BEM + aria + visibility)', async () => {
    const user = userEvent.setup();
    renderComponent();

    // Switch to the Python tab which has 2 entries.
    await user.click(getTab(1));

    const toggles = getToggles();
    expect(toggles).toHaveLength(2);

    // First entry open by default.
    expect(toggles[0].classList.contains('api-code-example__accordion-header--open')).toBe(true);
    expect(toggles[0].getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('print("hi")')).toBeTruthy();

    // Second entry collapsed by default.
    expect(toggles[1].classList.contains('api-code-example__accordion-header--open')).toBe(false);
    expect(toggles[1].getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByText('print("bye")')).toBeNull();
  });

  it('clicking a collapsed entry expands it and makes its body visible (BEM + aria)', async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(getTab(1));

    const toggles = getToggles();
    await user.click(toggles[1]);

    expect(toggles[1].classList.contains('api-code-example__accordion-header--open')).toBe(true);
    expect(toggles[1].getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('print("bye")')).toBeTruthy();
  });

  it('clicking an expanded entry collapses it and hides its body (BEM + aria)', async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(getTab(1));

    const toggles = getToggles();
    await user.click(toggles[0]);

    expect(toggles[0].classList.contains('api-code-example__accordion-header--open')).toBe(false);
    expect(toggles[0].getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByText('print("hi")')).toBeNull();
  });
});

describe('ApiCodeExample — tab change resets accordion state', () => {
  it('expanding a non-default entry then switching tabs and back resets to default (first open)', async () => {
    const user = userEvent.setup();
    renderComponent();

    // Go to Python tab, expand the second entry.
    await user.click(getTab(1));
    let toggles = getToggles();
    await user.click(toggles[1]);
    expect(toggles[1].classList.contains('api-code-example__accordion-header--open')).toBe(true);

    // Switch to cURL and back to Python.
    await user.click(getTab(0));
    await user.click(getTab(1));

    toggles = getToggles();
    expect(toggles[0].classList.contains('api-code-example__accordion-header--open')).toBe(true);
    expect(toggles[0].getAttribute('aria-expanded')).toBe('true');
    expect(toggles[1].classList.contains('api-code-example__accordion-header--open')).toBe(false);
    expect(toggles[1].getAttribute('aria-expanded')).toBe('false');
  });
});
