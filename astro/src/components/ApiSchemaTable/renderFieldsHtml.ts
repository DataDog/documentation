import type { SchemaField } from '@lib/api/schemas/schemaField';
import { renderMarkdownInline } from '@lib/api/markdownRenderer';

const ENUM_INLINE_LIMIT = 10;

type ClFn = (...names: string[]) => string;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function hasChildren(field: SchemaField): boolean {
  return (
    (field.children !== undefined && field.children.length > 0) ||
    (field.unionOptions !== undefined && field.unionOptions.length > 0)
  );
}

export function anyFieldExpandable(fields: SchemaField[]): boolean {
  return fields.some(hasChildren);
}

function renderEnum(values: string[], cl: ClFn): string {
  if (values.length === 0) return '';
  if (values.length <= ENUM_INLINE_LIMIT) {
    return `<div class="${escapeAttr(cl('schema-table__enum'))}">Allowed enum values: <code>${escapeHtml(values.join(', '))}</code></div>`;
  }
  const visible = values.slice(0, ENUM_INLINE_LIMIT);
  const rest = values.slice(ENUM_INLINE_LIMIT);
  return (
    `<div class="${escapeAttr(cl('schema-table__enum'))}">` +
    `Allowed enum values: <code>${escapeHtml(visible.join(', '))}</code>` +
    `<details class="${escapeAttr(cl('schema-table__enum-details'))}">` +
    `<summary>Show ${rest.length} more</summary>` +
    `<code>${escapeHtml(rest.join(', '))}</code>` +
    `</details>` +
    `</div>`
  );
}

function renderRow(field: SchemaField, depth: number, cl: ClFn): string {
  const indent = depth * 20;
  const indentStyle = indent > 0 ? ` style="padding-left: calc(var(--space-md) + ${indent}px)"` : '';

  const rowClasses = [
    cl('schema-table__row'),
    field.readOnly ? cl('schema-table__row--readonly') : '',
    field.deprecated ? cl('schema-table__row--deprecated') : '',
  ]
    .filter(Boolean)
    .join(' ');

  const showToggle = hasChildren(field);
  const toggleHtml = showToggle
    ? `<button type="button" class="${escapeAttr(cl('schema-table__toggle'))}" aria-expanded="false" aria-label="Toggle ${escapeAttr(field.name)}">` +
      `<svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 1 L7 5 L3 9" fill="none" stroke="currentColor" stroke-width="1.5"></path></svg>` +
      `</button>`
    : '';

  const requiredHtml = field.required
    ? ` <span class="${escapeAttr(cl('schema-table__required'))}"> [required]</span>`
    : '';

  const deprecatedLabel = field.deprecated
    ? `<strong class="${escapeAttr(cl('schema-table__deprecated-label'))}">DEPRECATED</strong> `
    : '';

  const description = renderMarkdownInline(field.description ?? '');

  const defaultHtml =
    field.defaultValue !== undefined
      ? ` <span class="${escapeAttr(cl('schema-table__default'))}"> Default: <code>${escapeHtml(field.defaultValue)}</code></span>`
      : '';

  const enumHtml = field.enumValues && field.enumValues.length > 0 ? renderEnum(field.enumValues, cl) : '';

  return (
    `<div class="${escapeAttr(rowClasses)}" data-field-name="${escapeAttr(field.name)}" data-depth="${depth}">` +
    `<div class="${escapeAttr(cl('schema-table__cell-name'))}"${indentStyle}>` +
    toggleHtml +
    `<code class="${escapeAttr(cl('schema-table__name'))}">${escapeHtml(field.name)}</code>` +
    requiredHtml +
    `</div> ` +
    `<div class="${escapeAttr(cl('schema-table__cell-type'))}">` +
    `<span class="${escapeAttr(cl('schema-table__type'))}">${escapeHtml(field.type)}</span>` +
    `</div> ` +
    `<div class="${escapeAttr(cl('schema-table__cell-description'))}">` +
    deprecatedLabel +
    `<span>${description}</span>` +
    defaultHtml +
    enumHtml +
    `</div>` +
    `</div>`
  );
}

function renderChildrenContainer(field: SchemaField, depth: number, cl: ClFn): string {
  if (!hasChildren(field)) return '';
  const inner: string[] = [];
  if (field.children) {
    for (const child of field.children) {
      inner.push(renderField(child, depth + 1, cl));
    }
  }
  if (field.unionOptions) {
    field.unionOptions.forEach((option) => {
      const labelIndent = (depth + 1) * 20 + 8;
      inner.push(
        `<div class="${escapeAttr(cl('schema-table__union-label'))}" style="padding-left: ${labelIndent}px">${escapeHtml(option.label)}</div>`,
      );
      for (const child of option.fields) {
        inner.push(renderField(child, depth + 2, cl));
      }
    });
  }
  return `<div class="${escapeAttr(cl('schema-table__children'))}" hidden>${inner.join('')}</div>`;
}

function renderField(field: SchemaField, depth: number, cl: ClFn): string {
  return renderRow(field, depth, cl) + renderChildrenContainer(field, depth, cl);
}

export function renderFieldsHtml(fields: SchemaField[], cl: ClFn): string {
  return fields.map((f) => renderField(f, 0, cl)).join('');
}
