// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import SearchBar from './SearchBar';
import basicFixture from './__fixtures__/typesense_basic.json';
import noHitsFixture from './__fixtures__/typesense_no_hits.json';
import apiOnlyFixture from './__fixtures__/typesense_api_only.json';
import { flattenResult, type MultiSearchResponse } from '../../utils/typesense';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const env = {
  host: 'test',
  publicKey: 'test',
  docsIndex: 'docs_alias',
  partnersIndex: 'docs_partners_alias',
};

function fixtureToResponse(fixture: { results: any[] }): MultiSearchResponse {
  return {
    docs: flattenResult(fixture.results[0]),
    partners: flattenResult(fixture.results[1]),
  };
}

function makeSearch(fixture: { results: any[] }) {
  return vi.fn().mockResolvedValue(fixtureToResponse(fixture));
}

function mount(fixture: { results: any[] } = basicFixture) {
  const search = makeSearch(fixture);
  const utils = render(h(SearchBar as any, { env, search }));
  return { ...utils, search };
}

async function typeAndWait(user: ReturnType<typeof userEvent.setup>, value: string) {
  const input = document.querySelector<HTMLInputElement>('.search-bar__input')!;
  await user.click(input);
  await user.type(input, value);
  // Allow the 200ms debounce + microtasks for the resolved promise to flush.
  await new Promise((r) => setTimeout(r, 250));
}

describe('SearchBar — empty state', () => {
  it('renders the input and no popup before typing', () => {
    mount();
    expect(document.querySelector('.search-bar__input')).toBeTruthy();
    expect(document.querySelector('.search-bar__popup')).toBeFalsy();
  });
});

describe('SearchBar — query renders results', () => {
  it('opens the popup with grouped categories when query returns hits', async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, 'dashboard');

    expect(document.querySelector('.search-bar__popup')).toBeTruthy();
    expect(document.querySelector('.search-bar__ai-suggestion')).toBeTruthy();

    const labels = Array.from(document.querySelectorAll('.search-bar__category-label'))
      .map((el) => el.textContent);
    // API is pinned first, partners last per the plan.
    expect(labels).toEqual(['API', 'Getting Started', 'Documentation', 'Guides', 'Partners']);
  });

  it('renders nothing in categories without hits (api-only fixture)', async () => {
    const user = userEvent.setup();
    mount(apiOnlyFixture);
    await typeAndWait(user, 'monitor');

    const labels = Array.from(document.querySelectorAll('.search-bar__category-label'))
      .map((el) => el.textContent);
    expect(labels).toEqual(['API']);
  });
});

describe('SearchBar — no-hits state', () => {
  it('shows the no-hits message when results are empty', async () => {
    const user = userEvent.setup();
    mount(noHitsFixture);
    await typeAndWait(user, 'zzz');
    expect(document.querySelector('.search-bar__no-hits')?.textContent).toContain('No results');
  });
});

describe('SearchBar — URL routing', () => {
  it('keeps API hits same-origin and routes non-API hits to docs.datadoghq.com', async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, 'dashboard');

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.search-bar__hit-link'));
    const hrefs = links.map((a) => a.getAttribute('href'));

    // API hits resolve relative (same-origin in production).
    expect(hrefs).toContain('/api/latest/dashboards/');
    // Documentation hits go to the Hugo origin.
    expect(hrefs).toContain('https://docs.datadoghq.com/dashboards/');
    // Partner hits also go to the Hugo origin.
    expect(hrefs).toContain('https://docs.datadoghq.com/partners/acme-dashboards/');
  });
});

describe('SearchBar — keyboard navigation', () => {
  it('ArrowDown moves selection through Ask AI then hits', async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, 'dashboard');

    const input = document.querySelector<HTMLInputElement>('.search-bar__input')!;
    await user.click(input);

    await user.keyboard('{ArrowDown}');
    expect(document.querySelector('.search-bar__ai-suggestion--selected')).toBeTruthy();

    await user.keyboard('{ArrowDown}');
    const selected = document.querySelectorAll('.search-bar__hit--selected');
    expect(selected.length).toBe(1);
  });

  it('ArrowUp from index 0 returns focus to input', async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, 'dashboard');

    const input = document.querySelector<HTMLInputElement>('.search-bar__input')!;
    await user.click(input);
    await user.keyboard('{ArrowDown}'); // Ask AI selected
    await user.keyboard('{ArrowUp}'); // back to input

    expect(document.querySelector('.search-bar__ai-suggestion--selected')).toBeFalsy();
    expect(document.activeElement).toBe(input);
  });
});

describe("SearchBar — Enter routes to Hugo's search page when no hit is selected", () => {
  it('navigates to docs.datadoghq.com/search/?s=<query> when Enter is pressed without a selection', async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, 'monitor');

    // Stub navigation so we can assert without a real reload.
    const hrefs: string[] = [];
    const original = Object.getOwnPropertyDescriptor(window, 'location');
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: new Proxy({} as any, {
        set(_t, prop, value) {
          if (prop === 'href') hrefs.push(value);
          return true;
        },
      }),
    });

    try {
      const input = document.querySelector<HTMLInputElement>('.search-bar__input')!;
      await user.click(input);
      await user.keyboard('{Enter}');
    } finally {
      if (original) Object.defineProperty(window, 'location', original);
    }

    expect(hrefs).toContain('https://docs.datadoghq.com/search/?s=monitor');
  });
});

describe('SearchBar — global keyboard shortcuts', () => {
  it('Cmd+K focuses the input from anywhere', async () => {
    const user = userEvent.setup();
    mount();

    document.body.focus();
    await user.keyboard('{Meta>}k{/Meta}');

    const input = document.querySelector<HTMLInputElement>('.search-bar__input')!;
    expect(document.activeElement).toBe(input);
  });

  it('forward-slash focuses the input when not editing text elsewhere', async () => {
    const user = userEvent.setup();
    mount();

    document.body.focus();
    await user.keyboard('/');

    const input = document.querySelector<HTMLInputElement>('.search-bar__input')!;
    expect(document.activeElement).toBe(input);
  });

  it('Escape clears the query and blurs the input', async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, 'dashboard');

    expect(document.querySelector('.search-bar__popup')).toBeTruthy();

    const input = document.querySelector<HTMLInputElement>('.search-bar__input')!;
    await user.click(input);
    await user.keyboard('{Escape}');

    // Wait a tick for state to flush.
    await new Promise((r) => setTimeout(r, 10));

    expect(input.value).toBe('');
    expect(document.querySelector('.search-bar__popup')).toBeFalsy();
  });
});
