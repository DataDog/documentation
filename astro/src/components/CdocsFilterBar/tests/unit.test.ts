// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, cleanup } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';

// `navigate` from astro:transitions/client isn't available under Vitest; stub it
// so we can assert the client-side navigation target a pill click produces.
const navigate = vi.fn();
vi.mock('astro:transitions/client', () => ({ navigate: (...args: unknown[]) => navigate(...args) }));

import CdocsFilterBar from '../CdocsFilterBar';
import type { ResolvedFilter } from '@lib/cdocs/types';

const filters: ResolvedFilter[] = [
  {
    traitId: 'prog_lang',
    label: 'Language',
    defaultValue: 'java',
    currentValue: 'java',
    options: [
      { id: 'java', label: 'Java' },
      { id: 'python', label: 'Python' },
    ],
  },
  {
    traitId: 'api_type',
    label: 'API',
    defaultValue: 'otel_api',
    currentValue: 'dd_api',
    options: [
      { id: 'otel_api', label: 'OpenTelemetry API' },
      { id: 'dd_api', label: 'Datadog API' },
    ],
  },
];

const mount = (props = { filters }) => render(h(CdocsFilterBar, props));

const pill = (label: string) =>
  [...document.querySelectorAll<HTMLButtonElement>('.cdocs-filter-bar__pill')].find(
    (button) => button.textContent === label,
  )!;

beforeEach(() => {
  navigate.mockReset();
  window.history.replaceState(
    {},
    '',
    '/dd_e2e/cdocs/custom_instrumentation/',
  );
});

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
});

describe('CdocsFilterBar', () => {
  it('renders a labeled radiogroup of pills per filter', () => {
    mount();
    const groups = document.querySelectorAll('.cdocs-filter-bar__pills');
    expect(groups.length).toBe(2);
    expect(groups[0].getAttribute('role')).toBe('radiogroup');

    const labels = [...document.querySelectorAll('.cdocs-filter-bar__label')].map(
      (el) => el.textContent,
    );
    expect(labels).toEqual(['Language', 'API']);

    // The group is labelled by its heading for assistive tech.
    const labelId = document.querySelector('.cdocs-filter-bar__label')!.id;
    expect(groups[0].getAttribute('aria-labelledby')).toBe(labelId);
  });

  it('marks the current value as the selected pill', () => {
    mount();
    expect(pill('Java').classList.contains('cdocs-filter-bar__pill--selected')).toBe(true);
    expect(pill('Java').getAttribute('aria-checked')).toBe('true');
    expect(pill('Python').getAttribute('aria-checked')).toBe('false');
    // Second filter's resolved value drives its selection independently.
    expect(pill('Datadog API').classList.contains('cdocs-filter-bar__pill--selected')).toBe(true);
    expect(pill('OpenTelemetry API').getAttribute('aria-checked')).toBe('false');
  });

  it('navigates with the trait set as a URL param when a pill is clicked', async () => {
    const user = userEvent.setup();
    mount();
    await user.click(pill('Python'));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(
      '/dd_e2e/cdocs/custom_instrumentation/?prog_lang=python',
    );
  });

  it('preserves other params already in the URL', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/doc/?prog_lang=java&api_type=dd_api');
    mount();
    await user.click(pill('Python'));
    expect(navigate).toHaveBeenCalledWith('/doc/?prog_lang=python&api_type=dd_api');
  });

  it('renders nothing when there are no filters', () => {
    mount({ filters: [] });
    expect(document.querySelector('.cdocs-filter-bar')).toBeNull();
  });
});
