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

function getTabs() {
  return document.querySelector<HTMLElement>('.tabs');
}
function getTab(i: number) {
  return document.querySelector<HTMLButtonElement>(`.tabs__button[data-tab-index="${i}"]`)!;
}
function getSchemaTable() {
  return document.querySelector<HTMLElement>('.schema-table');
}
function getCodeBlocks() {
  return Array.from(document.querySelectorAll<HTMLElement>('.code-block'));
}

describe('ApiRequestBodyTabs — static render', () => {
  it('renders only the schema table when no examples are provided', () => {
    render(h(ApiRequestBodyTabsComponent, { schema, examples: [] }));

    expect(getSchemaTable()).toBeTruthy();
    expect(getTabs()).toBeNull();
  });

  it('renders only code blocks when no schema is provided', () => {
    render(h(ApiRequestBodyTabsComponent, { schema: [], examples }));

    expect(getCodeBlocks().length).toBeGreaterThan(0);
    expect(getSchemaTable()).toBeNull();
    expect(getTabs()).toBeNull();
  });

  it('renders nothing when both schema and examples are empty', () => {
    const { container } = render(h(ApiRequestBodyTabsComponent, { schema: [], examples: [] }));

    expect(container.innerHTML).toBe('');
  });

  it('renders a Model/Example tab pair when both are provided', () => {
    render(h(ApiRequestBodyTabsComponent, { schema, examples }));

    expect(getTabs()).toBeTruthy();
    expect(getTab(0).textContent).toBe('Model');
    expect(getTab(1).textContent).toBe('Example');
  });
});

describe('ApiRequestBodyTabs — interactivity', () => {
  it('shows the schema table and active Model tab by default (BEM + visibility)', () => {
    render(h(ApiRequestBodyTabsComponent, { schema, examples }));

    const modelTab = getTab(0);
    const exampleTab = getTab(1);

    expect(modelTab.classList.contains('tabs__button--active')).toBe(true);
    expect(modelTab.getAttribute('aria-selected')).toBe('true');

    expect(exampleTab.classList.contains('tabs__button--active')).toBe(false);
    expect(exampleTab.getAttribute('aria-selected')).toBe('false');

    expect(getSchemaTable()).toBeTruthy();
    expect(getCodeBlocks().length).toBe(0);
  });

  it('clicking Example swaps the visible panel to the code block and updates BEM state', async () => {
    const user = userEvent.setup();
    render(h(ApiRequestBodyTabsComponent, { schema, examples }));

    await user.click(getTab(1));

    const modelTab = getTab(0);
    const exampleTab = getTab(1);

    expect(exampleTab.classList.contains('tabs__button--active')).toBe(true);
    expect(exampleTab.getAttribute('aria-selected')).toBe('true');

    expect(modelTab.classList.contains('tabs__button--active')).toBe(false);
    expect(modelTab.getAttribute('aria-selected')).toBe('false');

    expect(getCodeBlocks().length).toBeGreaterThan(0);
    expect(getSchemaTable()).toBeNull();
  });

  it('clicking back to Model restores the schema table and deactivates Example', async () => {
    const user = userEvent.setup();
    render(h(ApiRequestBodyTabsComponent, { schema, examples }));

    await user.click(getTab(1));
    await user.click(getTab(0));

    const modelTab = getTab(0);
    const exampleTab = getTab(1);

    expect(modelTab.classList.contains('tabs__button--active')).toBe(true);
    expect(exampleTab.classList.contains('tabs__button--active')).toBe(false);

    expect(getSchemaTable()).toBeTruthy();
    expect(getCodeBlocks().length).toBe(0);
  });

  it('renders example labels only when multiple examples are provided (Example tab active)', async () => {
    const user = userEvent.setup();
    render(h(ApiRequestBodyTabsComponent, { schema, examples: multipleExamples }));

    await user.click(getTab(1));

    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Second')).toBeTruthy();
    expect(getCodeBlocks().length).toBe(2);
  });

  it('uses the pills variant on the Tabs container (BEM modifier)', () => {
    render(h(ApiRequestBodyTabsComponent, { schema, examples }));

    const container = getTabs()!;
    expect(container.classList.contains('tabs--pills')).toBe(true);
  });
});
