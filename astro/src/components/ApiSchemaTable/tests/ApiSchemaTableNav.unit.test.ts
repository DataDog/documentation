// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import { ApiSchemaTableNav } from '../ApiSchemaTableNav';

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
});

// ApiSchemaTableNav is an event-delegated island. The schema rows are
// rendered server-side; the island only flips BEM modifiers and `hidden`
// on the existing DOM. Tests build a representative server-render output
// in JSDOM, then mount the island and drive interactions.
function buildShell(tableId: string, opts: { withToolbar?: boolean } = {}): {
  root: HTMLElement;
  expandAllId: string;
} {
  const expandAllId = `${tableId}-expand-all`;
  const root = document.createElement('div');
  root.id = tableId;
  root.className = 'schema-table';
  root.innerHTML = `
    ${opts.withToolbar
      ? `<div class="schema-table__toolbar">
           <button id="${expandAllId}" type="button" class="schema-table__expand-all">
             <span class="schema-table__expand-all-label schema-table__expand-all-label--expand">Expand All</span>
             <span class="schema-table__expand-all-label schema-table__expand-all-label--collapse" hidden>Collapse All</span>
           </button>
         </div>`
      : ''}
    <div class="schema-table__table">
      <div class="schema-table__row" data-field-name="parent" data-depth="0">
        <div class="schema-table__cell-name">
          <button type="button" class="schema-table__toggle" aria-expanded="false" aria-label="Toggle parent"></button>
          <code class="schema-table__name">parent</code>
        </div>
        <div class="schema-table__cell-type"><span class="schema-table__type">object</span></div>
        <div class="schema-table__cell-description"></div>
      </div>
      <div class="schema-table__children" hidden>
        <div class="schema-table__row" data-field-name="child" data-depth="1">
          <div class="schema-table__cell-name"><code class="schema-table__name">child</code></div>
          <div class="schema-table__cell-type"><span class="schema-table__type">string</span></div>
          <div class="schema-table__cell-description"></div>
        </div>
      </div>
      <div class="schema-table__row" data-field-name="other" data-depth="0">
        <div class="schema-table__cell-name">
          <button type="button" class="schema-table__toggle" aria-expanded="false" aria-label="Toggle other"></button>
          <code class="schema-table__name">other</code>
        </div>
        <div class="schema-table__cell-type"><span class="schema-table__type">object</span></div>
        <div class="schema-table__cell-description"></div>
      </div>
      <div class="schema-table__children" hidden>
        <div class="schema-table__row" data-field-name="grandchild" data-depth="1">
          <div class="schema-table__cell-name"><code class="schema-table__name">grandchild</code></div>
          <div class="schema-table__cell-type"><span class="schema-table__type">string</span></div>
          <div class="schema-table__cell-description"></div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(root);
  return { root, expandAllId };
}

function mountIsland(tableId: string, opts: { withToolbar?: boolean } = {}): {
  root: HTMLElement;
} {
  const { root, expandAllId } = buildShell(tableId, opts);
  const islandHost = document.createElement('div');
  root.appendChild(islandHost);
  render(
    h(ApiSchemaTableNav, {
      externalContext: {
        scope: tableId,
        entries: opts.withToolbar
          ? { tableEl: tableId, expandAllEl: expandAllId }
          : { tableEl: tableId },
      },
    }),
    { container: islandHost },
  );
  return { root };
}

describe('ApiSchemaTableNav — hydration', () => {
  it('marks the table root as hydrated on mount', () => {
    const { root } = mountIsland('t1', { withToolbar: true });
    expect(root.getAttribute('data-hydrated')).toBe('true');
  });
});

describe('ApiSchemaTableNav — single-row toggle', () => {
  it('clicking a toggle expands its children container (visibility + BEM + aria)', async () => {
    const user = userEvent.setup();
    const { root } = mountIsland('t2');
    const toggles = root.querySelectorAll<HTMLButtonElement>('.schema-table__toggle');
    const childrenContainers = root.querySelectorAll<HTMLElement>('.schema-table__children');

    await user.click(toggles[0]);

    expect(toggles[0].classList.contains('schema-table__toggle--expanded')).toBe(true);
    expect(toggles[0].getAttribute('aria-expanded')).toBe('true');
    expect(childrenContainers[0].hidden).toBe(false);
    // Sibling row stays collapsed
    expect(toggles[1].classList.contains('schema-table__toggle--expanded')).toBe(false);
    expect(childrenContainers[1].hidden).toBe(true);
  });

  it('clicking an expanded toggle collapses it', async () => {
    const user = userEvent.setup();
    const { root } = mountIsland('t3');
    const toggle = root.querySelector<HTMLButtonElement>('.schema-table__toggle')!;
    const children = root.querySelector<HTMLElement>('.schema-table__children')!;

    await user.click(toggle);
    await user.click(toggle);

    expect(toggle.classList.contains('schema-table__toggle--expanded')).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(children.hidden).toBe(true);
  });
});

describe('ApiSchemaTableNav — expand-all', () => {
  it('clicking expand-all expands every row and flips the label', async () => {
    const user = userEvent.setup();
    const { root } = mountIsland('t4', { withToolbar: true });
    const expandAll = root.querySelector<HTMLButtonElement>('.schema-table__expand-all')!;
    const expandLabel = root.querySelector<HTMLElement>('.schema-table__expand-all-label--expand')!;
    const collapseLabel = root.querySelector<HTMLElement>('.schema-table__expand-all-label--collapse')!;

    await user.click(expandAll);

    root.querySelectorAll<HTMLButtonElement>('.schema-table__toggle').forEach((t) => {
      expect(t.classList.contains('schema-table__toggle--expanded')).toBe(true);
      expect(t.getAttribute('aria-expanded')).toBe('true');
    });
    root.querySelectorAll<HTMLElement>('.schema-table__children').forEach((c) => {
      expect(c.hidden).toBe(false);
    });
    expect(expandLabel.hidden).toBe(true);
    expect(collapseLabel.hidden).toBe(false);
  });

  it('clicking again collapses every row and restores the label', async () => {
    const user = userEvent.setup();
    const { root } = mountIsland('t5', { withToolbar: true });
    const expandAll = root.querySelector<HTMLButtonElement>('.schema-table__expand-all')!;
    const expandLabel = root.querySelector<HTMLElement>('.schema-table__expand-all-label--expand')!;
    const collapseLabel = root.querySelector<HTMLElement>('.schema-table__expand-all-label--collapse')!;

    await user.click(expandAll);
    await user.click(expandAll);

    root.querySelectorAll<HTMLButtonElement>('.schema-table__toggle').forEach((t) => {
      expect(t.classList.contains('schema-table__toggle--expanded')).toBe(false);
    });
    root.querySelectorAll<HTMLElement>('.schema-table__children').forEach((c) => {
      expect(c.hidden).toBe(true);
    });
    expect(expandLabel.hidden).toBe(false);
    expect(collapseLabel.hidden).toBe(true);
  });

  it('flips expand-all label to "Collapse All" once individual toggles bring all rows expanded', async () => {
    const user = userEvent.setup();
    const { root } = mountIsland('t6', { withToolbar: true });
    const toggles = root.querySelectorAll<HTMLButtonElement>('.schema-table__toggle');
    const expandLabel = root.querySelector<HTMLElement>('.schema-table__expand-all-label--expand')!;
    const collapseLabel = root.querySelector<HTMLElement>('.schema-table__expand-all-label--collapse')!;

    await user.click(toggles[0]);
    expect(expandLabel.hidden).toBe(false);
    expect(collapseLabel.hidden).toBe(true);

    await user.click(toggles[1]);
    expect(expandLabel.hidden).toBe(true);
    expect(collapseLabel.hidden).toBe(false);
  });
});
