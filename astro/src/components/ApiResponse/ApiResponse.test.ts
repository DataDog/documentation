// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import { ApiResponse } from './ApiResponse';

const ApiResponseComponent = ApiResponse as ComponentType<any>;

afterEach(cleanup);

const responses = [
  {
    statusCode: '200',
    description: 'OK response',
    schema: [
      { name: 'id', type: 'string', description: 'Identifier' },
    ],
    examples: [
      { name: 'Example 1', value: '{"ok": true}' },
    ],
  },
  {
    statusCode: '404',
    description: 'Not found response',
  },
];

const renderApiResponse = (props: Partial<Parameters<typeof ApiResponse>[0]> = {}) =>
  render(h(ApiResponseComponent, { responses, ...props }));

describe('ApiResponse — static render', () => {
  it('renders wrapper with data-testid and a heading', () => {
    renderApiResponse();

    expect(screen.getByTestId('api-response')).toBeTruthy();
    expect(screen.getByText('Response')).toBeTruthy();
  });

  it('renders a tab for each status code', () => {
    renderApiResponse();

    const statusTabs = screen.getAllByRole('tab').filter((el) =>
      ['200', '404'].includes(el.textContent ?? ''),
    );
    expect(statusTabs.map((t) => t.textContent)).toEqual(['200', '404']);
  });

  it('renders the active response panel and description on first load', () => {
    renderApiResponse();

    expect(screen.getByTestId('api-response-panel-200')).toBeTruthy();
    expect(screen.getByText('OK response')).toBeTruthy();
  });

  it('applies BEM classes to wrapper, heading, and description', () => {
    renderApiResponse();

    expect(screen.getByTestId('api-response').classList.contains('api-response')).toBe(true);
    expect(screen.getByText('Response').classList.contains('api-response__heading')).toBe(true);
    expect(screen.getByText('OK response').classList.contains('api-response__description')).toBe(true);
  });
});

describe('ApiResponse — status code tab interactivity', () => {
  it('first status tab is active by default with BEM modifier + aria', () => {
    renderApiResponse();

    const firstStatusTab = screen.getAllByRole('tab').find((el) => el.textContent === '200')!;
    expect(firstStatusTab.classList.contains('tabs__button--active')).toBe(true);
    expect(firstStatusTab.getAttribute('aria-selected')).toBe('true');
  });

  it('clicking a different status tab swaps the active BEM modifier and visible panel', async () => {
    const user = userEvent.setup();
    renderApiResponse();

    const tab200 = screen.getAllByRole('tab').find((el) => el.textContent === '200')!;
    const tab404 = screen.getAllByRole('tab').find((el) => el.textContent === '404')!;

    await user.click(tab404);

    expect(tab404.classList.contains('tabs__button--active')).toBe(true);
    expect(tab404.getAttribute('aria-selected')).toBe('true');
    expect(tab200.classList.contains('tabs__button--active')).toBe(false);
    expect(tab200.getAttribute('aria-selected')).toBe('false');

    // Panel visibility: 404 panel mounted, 200 panel unmounted
    expect(screen.getByTestId('api-response-panel-404')).toBeTruthy();
    expect(screen.queryByTestId('api-response-panel-200')).toBeNull();
    expect(screen.getByText('Not found response')).toBeTruthy();
  });
});

describe('ApiResponse — Model/Example toggle interactivity', () => {
  it('renders Model and Example toggle tabs when the active response has both', () => {
    renderApiResponse();

    expect(screen.getByRole('tab', { name: 'Model' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Example' })).toBeTruthy();
  });

  it('Model toggle is active by default with BEM modifier applied', () => {
    renderApiResponse();

    const modelTab = screen.getByRole('tab', { name: 'Model' });
    const exampleTab = screen.getByRole('tab', { name: 'Example' });

    expect(modelTab.classList.contains('tabs__button--active')).toBe(true);
    expect(modelTab.getAttribute('aria-selected')).toBe('true');
    expect(exampleTab.classList.contains('tabs__button--active')).toBe(false);
    expect(exampleTab.getAttribute('aria-selected')).toBe('false');
  });

  it('clicking Example activates it, deactivates Model, and shows example content', async () => {
    const user = userEvent.setup();
    renderApiResponse();

    const modelTab = screen.getByRole('tab', { name: 'Model' });
    const exampleTab = screen.getByRole('tab', { name: 'Example' });

    await user.click(exampleTab);

    expect(exampleTab.classList.contains('tabs__button--active')).toBe(true);
    expect(exampleTab.getAttribute('aria-selected')).toBe('true');
    expect(modelTab.classList.contains('tabs__button--active')).toBe(false);
    expect(modelTab.getAttribute('aria-selected')).toBe('false');

    // Example wrapper uses the api-response__example BEM class
    const panel = screen.getByTestId('api-response-panel-200');
    const exampleEl = panel.querySelector('.api-response__example');
    expect(exampleEl).not.toBeNull();
  });

  it('hides the Model/Example toggle when the active response has neither schema nor examples', async () => {
    const user = userEvent.setup();
    renderApiResponse();

    const tab404 = screen.getAllByRole('tab').find((el) => el.textContent === '404')!;
    await user.click(tab404);

    // The only remaining tabs should be the outer status-code tabs (200, 404).
    const remainingTabLabels = screen.getAllByRole('tab').map((t) => t.textContent);
    expect(remainingTabLabels).not.toContain('Model');
    expect(remainingTabLabels).not.toContain('Example');
  });
});
