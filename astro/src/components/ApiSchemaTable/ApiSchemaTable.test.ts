// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import { ApiSchemaTable, type SchemaField } from './ApiSchemaTable';

const ApiSchemaTableComponent = ApiSchemaTable as ComponentType<any>;

afterEach(cleanup);

const flatFields: SchemaField[] = [
  {
    name: 'id',
    type: 'string',
    required: true,
    deprecated: false,
    readOnly: false,
    description: 'Unique identifier',
  },
  {
    name: 'tags',
    type: '[string]',
    required: false,
    deprecated: false,
    readOnly: false,
    description: 'List of tags',
  },
];

const nestedFields: SchemaField[] = [
  {
    name: 'parent',
    type: 'object',
    required: false,
    deprecated: false,
    readOnly: false,
    description: 'A parent object',
    children: [
      {
        name: 'child',
        type: 'string',
        required: false,
        deprecated: false,
        readOnly: false,
        description: 'A child field',
      },
      {
        name: 'sibling',
        type: 'number',
        required: false,
        deprecated: false,
        readOnly: false,
        description: 'A sibling field',
      },
    ],
  },
  {
    name: 'other',
    type: 'object',
    required: false,
    deprecated: false,
    readOnly: false,
    description: 'Another parent',
    children: [
      {
        name: 'grandchild',
        type: 'string',
        required: false,
        deprecated: false,
        readOnly: false,
        description: 'A grandchild field',
      },
    ],
  },
];

function getTable() {
  return document.querySelector<HTMLElement>('.schema-table')!;
}
function getRows() {
  return Array.from(document.querySelectorAll<HTMLElement>('.schema-table__row'));
}
function getToggles() {
  return Array.from(document.querySelectorAll<HTMLButtonElement>('.schema-table__toggle'));
}
function getChildren() {
  return Array.from(document.querySelectorAll<HTMLElement>('.schema-table__children'));
}
function getExpandAll() {
  return document.querySelector<HTMLButtonElement>('.schema-table__expand-all');
}

describe('ApiSchemaTable — static render', () => {
  it('renders the table root and column headers', () => {
    render(h(ApiSchemaTableComponent, { fields: flatFields }));

    const table = getTable();
    expect(table).toBeTruthy();
    expect(table.textContent).toContain('Name');
    expect(table.textContent).toContain('Type');
    expect(table.textContent).toContain('Description');
  });

  it('renders a row for every top-level field', () => {
    render(h(ApiSchemaTableComponent, { fields: flatFields }));

    expect(getRows().length).toBe(2);

    const table = getTable();
    expect(table.textContent).toContain('Unique identifier');
    expect(table.textContent).toContain('List of tags');
  });

  it('flags required fields with a [required] marker', () => {
    render(h(ApiSchemaTableComponent, { fields: flatFields }));

    const required = document.querySelector<HTMLElement>('.schema-table__required');
    expect(required).toBeTruthy();
    expect(required!.textContent).toContain('[required]');
  });

  it('renders toggle controls for fields with children', () => {
    render(h(ApiSchemaTableComponent, { fields: nestedFields }));

    expect(getToggles().length).toBe(2);
    expect(getExpandAll()).toBeTruthy();
  });
});

describe('ApiSchemaTable — row expand/collapse interactivity', () => {
  it('children container is hidden by default (BEM + visibility)', () => {
    render(h(ApiSchemaTableComponent, { fields: nestedFields }));

    const children = getChildren();
    expect(children.length).toBe(2);
    children.forEach((c) => {
      expect(c.style.display).toBe('none');
    });

    getToggles().forEach((t) => {
      expect(t.classList.contains('schema-table__toggle')).toBe(true);
      expect(t.classList.contains('schema-table__toggle--expanded')).toBe(false);
      expect(t.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('clicking a row toggle expands it (visibility + BEM)', async () => {
    const user = userEvent.setup();
    render(h(ApiSchemaTableComponent, { fields: nestedFields }));

    await user.click(getToggles()[0]);

    const firstToggle = getToggles()[0];
    expect(firstToggle.classList.contains('schema-table__toggle--expanded')).toBe(true);
    expect(firstToggle.getAttribute('aria-expanded')).toBe('true');

    const childrenContainers = getChildren();
    expect(childrenContainers[0].style.display).toBe('block');
    // Second parent remains collapsed
    expect(childrenContainers[1].style.display).toBe('none');

    // Child rows are rendered in the DOM
    expect(screen.getByText('A child field')).toBeTruthy();
    expect(screen.getByText('A sibling field')).toBeTruthy();
  });

  it('clicking an expanded toggle collapses it (visibility + BEM)', async () => {
    const user = userEvent.setup();
    render(h(ApiSchemaTableComponent, { fields: nestedFields }));

    await user.click(getToggles()[0]);
    await user.click(getToggles()[0]);

    const afterToggle = getToggles()[0];
    expect(afterToggle.classList.contains('schema-table__toggle--expanded')).toBe(false);
    expect(afterToggle.getAttribute('aria-expanded')).toBe('false');

    expect(getChildren()[0].style.display).toBe('none');
  });
});

describe('ApiSchemaTable — expand-all toggle', () => {
  it('shows "Expand All" label by default', () => {
    render(h(ApiSchemaTableComponent, { fields: nestedFields }));

    const button = getExpandAll()!;
    expect(button.classList.contains('schema-table__expand-all')).toBe(true);
    expect(button.textContent).toBe('Expand All');
  });

  it('clicking Expand All expands every row (visibility + BEM)', async () => {
    const user = userEvent.setup();
    render(h(ApiSchemaTableComponent, { fields: nestedFields }));

    await user.click(getExpandAll()!);

    getToggles().forEach((t) => {
      expect(t.classList.contains('schema-table__toggle--expanded')).toBe(true);
      expect(t.getAttribute('aria-expanded')).toBe('true');
    });

    getChildren().forEach((c) => {
      expect(c.style.display).toBe('block');
    });

    expect(getExpandAll()!.textContent).toBe('Collapse All');
  });

  it('clicking Collapse All collapses every row (visibility + BEM)', async () => {
    const user = userEvent.setup();
    render(h(ApiSchemaTableComponent, { fields: nestedFields }));

    await user.click(getExpandAll()!);
    await user.click(getExpandAll()!);

    getToggles().forEach((t) => {
      expect(t.classList.contains('schema-table__toggle--expanded')).toBe(false);
      expect(t.getAttribute('aria-expanded')).toBe('false');
    });

    getChildren().forEach((c) => {
      expect(c.style.display).toBe('none');
    });

    expect(getExpandAll()!.textContent).toBe('Expand All');
  });

  it('hides the expand-all button when showExpandAll is false', () => {
    render(h(ApiSchemaTableComponent, { fields: nestedFields, showExpandAll: false }));

    expect(getExpandAll()).toBeNull();
  });
});

describe('ApiSchemaTable — row modifier BEM classes', () => {
  it('applies readonly and deprecated BEM modifiers on rows', () => {
    const fields: SchemaField[] = [
      {
        name: 'readonly_field',
        type: 'string',
        required: false,
        deprecated: false,
        readOnly: true,
        description: 'Read-only field',
      },
      {
        name: 'deprecated_field',
        type: 'string',
        required: false,
        deprecated: true,
        readOnly: false,
        description: 'Deprecated field',
      },
      {
        name: 'plain_field',
        type: 'string',
        required: false,
        deprecated: false,
        readOnly: false,
        description: 'Plain field',
      },
    ];

    render(h(ApiSchemaTableComponent, { fields }));
    const rows = getRows();

    expect(rows[0].classList.contains('schema-table__row--readonly')).toBe(true);
    expect(rows[0].classList.contains('schema-table__row--deprecated')).toBe(false);

    expect(rows[1].classList.contains('schema-table__row--deprecated')).toBe(true);
    expect(rows[1].classList.contains('schema-table__row--readonly')).toBe(false);

    expect(rows[2].classList.contains('schema-table__row--readonly')).toBe(false);
    expect(rows[2].classList.contains('schema-table__row--deprecated')).toBe(false);
  });
});
