// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import { ApiRequestBodyTabs } from './ApiRequestBodyTabs';

const ApiRequestBodyTabsComponent = ApiRequestBodyTabs as ComponentType<any>;

afterEach(cleanup);

const schema = [
  {
    name: 'id',
    type: 'string',
    required: true,
    deprecated: false,
    readOnly: false,
    description: 'Identifier',
  },
];
const examples = [{ name: 'Example', value: '{"id": "abc"}' }];
const multipleExamples = [
  { name: 'First', value: '{"id": "abc"}' },
  { name: 'Second', value: '{"id": "xyz"}' },
];

describe('ApiRequestBodyTabs — static render', () => {
  it('renders only the schema table when no examples are provided', () => {
    render(h(ApiRequestBodyTabsComponent, { schema, examples: [] }));

    expect(screen.getByTestId('schema-table')).toBeTruthy();
    expect(screen.queryByTestId('tabs')).toBeNull();
  });

  it('renders only code blocks when no schema is provided', () => {
    render(h(ApiRequestBodyTabsComponent, { schema: [], examples }));

    expect(screen.getByTestId('code-block')).toBeTruthy();
    expect(screen.queryByTestId('schema-table')).toBeNull();
    expect(screen.queryByTestId('tabs')).toBeNull();
  });

  it('renders nothing when both schema and examples are empty', () => {
    const { container } = render(h(ApiRequestBodyTabsComponent, { schema: [], examples: [] }));

    expect(container.innerHTML).toBe('');
  });

  it('renders a Model/Example tab pair when both are provided', () => {
    render(h(ApiRequestBodyTabsComponent, { schema, examples }));

    expect(screen.getByTestId('tabs')).toBeTruthy();
    expect(screen.getByTestId('tab-0').textContent).toBe('Model');
    expect(screen.getByTestId('tab-1').textContent).toBe('Example');
  });
});

describe('ApiRequestBodyTabs — interactivity', () => {
  it('shows the schema table and active Model tab by default (BEM + visibility)', () => {
    render(h(ApiRequestBodyTabsComponent, { schema, examples }));

    const modelTab = screen.getByTestId('tab-0');
    const exampleTab = screen.getByTestId('tab-1');

    expect(modelTab.classList.contains('tabs__button--active')).toBe(true);
    expect(modelTab.getAttribute('aria-selected')).toBe('true');

    expect(exampleTab.classList.contains('tabs__button--active')).toBe(false);
    expect(exampleTab.getAttribute('aria-selected')).toBe('false');

    expect(screen.getByTestId('schema-table')).toBeTruthy();
    expect(screen.queryByTestId('code-block')).toBeNull();
  });

  it('clicking Example swaps the visible panel to the code block and updates BEM state', async () => {
    const user = userEvent.setup();
    render(h(ApiRequestBodyTabsComponent, { schema, examples }));

    await user.click(screen.getByTestId('tab-1'));

    const modelTab = screen.getByTestId('tab-0');
    const exampleTab = screen.getByTestId('tab-1');

    expect(exampleTab.classList.contains('tabs__button--active')).toBe(true);
    expect(exampleTab.getAttribute('aria-selected')).toBe('true');

    expect(modelTab.classList.contains('tabs__button--active')).toBe(false);
    expect(modelTab.getAttribute('aria-selected')).toBe('false');

    expect(screen.getByTestId('code-block')).toBeTruthy();
    expect(screen.queryByTestId('schema-table')).toBeNull();
  });

  it('clicking back to Model restores the schema table and deactivates Example', async () => {
    const user = userEvent.setup();
    render(h(ApiRequestBodyTabsComponent, { schema, examples }));

    await user.click(screen.getByTestId('tab-1'));
    await user.click(screen.getByTestId('tab-0'));

    const modelTab = screen.getByTestId('tab-0');
    const exampleTab = screen.getByTestId('tab-1');

    expect(modelTab.classList.contains('tabs__button--active')).toBe(true);
    expect(exampleTab.classList.contains('tabs__button--active')).toBe(false);

    expect(screen.getByTestId('schema-table')).toBeTruthy();
    expect(screen.queryByTestId('code-block')).toBeNull();
  });

  it('renders example labels only when multiple examples are provided (Example tab active)', async () => {
    const user = userEvent.setup();
    render(h(ApiRequestBodyTabsComponent, { schema, examples: multipleExamples }));

    await user.click(screen.getByTestId('tab-1'));

    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Second')).toBeTruthy();
    expect(screen.getAllByTestId('code-block').length).toBe(2);
  });

  it('uses the pills variant on the Tabs container (BEM modifier)', () => {
    render(h(ApiRequestBodyTabsComponent, { schema, examples }));

    const container = screen.getByTestId('tabs');
    expect(container.classList.contains('tabs--pills')).toBe(true);
  });
});
