import { useState } from 'preact/hooks';
import type { JSX } from 'preact';
import styles from './SchemaTable.module.css';

export interface SchemaField {
  name: string;
  type: string;
  required: boolean;
  deprecated: boolean;
  readOnly: boolean;
  description: string;
  enumValues?: string[];
  defaultValue?: string;
  children?: SchemaField[];
  unionOptions?: { label: string; fields: SchemaField[] }[];
}

interface SchemaTableProps {
  fields: SchemaField[];
  title?: string;
  showExpandAll?: boolean;
}

const ENUM_INLINE_LIMIT = 10;

function FieldRow({
  field,
  depth,
  expandedPaths,
  togglePath,
  parentPath,
}: {
  field: SchemaField;
  depth: number;
  expandedPaths: Set<string>;
  togglePath: (path: string) => void;
  parentPath: string;
}): JSX.Element {
  const path = `${parentPath}.${field.name}`;
  const hasChildren = (field.children && field.children.length > 0) ||
    (field.unionOptions && field.unionOptions.length > 0);
  const isExpanded = expandedPaths.has(path);
  const indent = depth * 20;

  return (
    <>
      <div
        class={`schema-table__row ${styles.row} ${field.readOnly ? `schema-table__row--readonly ${styles['row--readonly']}` : ''} ${field.deprecated ? `schema-table__row--deprecated ${styles['row--deprecated']}` : ''}`}
        data-testid="schema-table-row"
        data-field-name={field.name}
        data-depth={depth}
      >
        <div class={`schema-table__cell-name ${styles.cell__name}`} style={indent > 0 ? { paddingLeft: `calc(var(--space-md) + ${indent}px)` } : undefined}>
          {hasChildren && (
            <button
              class={`schema-table__toggle ${styles.toggle} ${isExpanded ? `schema-table__toggle--expanded ${styles['toggle--expanded']}` : ''}`}
              onClick={() => togglePath(path)}
              aria-expanded={isExpanded}
              aria-label={`Toggle ${field.name}`}
              data-testid="schema-table-toggle"
            >
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M3 1 L7 5 L3 9" fill="none" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </button>
          )}
          <code class={`schema-table__name ${styles.name}`}>{field.name}</code>
          {field.required && (
            <span class={`schema-table__required ${styles.required}`} data-testid="schema-field-required">{' '}[required]</span>
          )}
        </div>{' '}
        <div class={`schema-table__cell-type ${styles.cell__type}`}>
          <span class={`schema-table__type ${styles.type}`}>{field.type}</span>
        </div>{' '}
        <div class={`schema-table__cell-description ${styles.cell__description}`}>
          {field.deprecated && (
            <><strong class={`schema-table__deprecated-label ${styles.deprecated__label}`}>DEPRECATED</strong>{' '}</>
          )}
          <span dangerouslySetInnerHTML={{ __html: field.description }} />
          {field.defaultValue !== undefined && (
            <span class={`schema-table__default ${styles.default}`}> Default: <code>{field.defaultValue}</code></span>
          )}
          {field.enumValues && field.enumValues.length > 0 && (
            <EnumValues values={field.enumValues} />
          )}
        </div>
      </div>

      {/* Render children if expanded */}
      {hasChildren && (
        <div
          class={`schema-table__children ${styles.children}`}
          style={{ display: isExpanded ? 'block' : 'none' }}
          data-testid="schema-table-children"
        >
          {field.children?.map((child) => (
            <FieldRow
              key={`${path}.${child.name}`}
              field={child}
              depth={depth + 1}
              expandedPaths={expandedPaths}
              togglePath={togglePath}
              parentPath={path}
            />
          ))}
          {field.unionOptions?.map((option, i) => (
            <div key={`${path}__union_${i}`}>
              <div class={`schema-table__union-label ${styles.union__label}`} style={{ paddingLeft: `${(depth + 1) * 20 + 8}px` }}>
                {option.label}
              </div>
              {option.fields.map((child) => (
                <FieldRow
                  key={`${path}__union_${i}.${child.name}`}
                  field={child}
                  depth={depth + 2}
                  expandedPaths={expandedPaths}
                  togglePath={togglePath}
                  parentPath={`${path}__union_${i}`}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function EnumValues({ values }: { values: string[] }): JSX.Element {
  if (values.length <= ENUM_INLINE_LIMIT) {
    return (
      <div class={`schema-table__enum ${styles.enum}`}>
        Allowed enum values: <code>{values.join(', ')}</code>
      </div>
    );
  }
  const visible = values.slice(0, ENUM_INLINE_LIMIT);
  const rest = values.slice(ENUM_INLINE_LIMIT);
  return (
    <div class={`schema-table__enum ${styles.enum}`}>
      Allowed enum values: <code>{visible.join(', ')}</code>
      <details class={`schema-table__enum-details ${styles.enum__details}`}>
        <summary>Show {rest.length} more</summary>
        <code>{rest.join(', ')}</code>
      </details>
    </div>
  );
}

/** Recursively collect all expandable paths. */
function collectPaths(fields: SchemaField[], parentPath: string, result: string[]): void {
  for (const field of fields) {
    const path = `${parentPath}.${field.name}`;
    const hasChildren = (field.children && field.children.length > 0) ||
      (field.unionOptions && field.unionOptions.length > 0);
    if (hasChildren) {
      result.push(path);
      if (field.children) collectPaths(field.children, path, result);
      field.unionOptions?.forEach((opt, i) => {
        collectPaths(opt.fields, `${path}__union_${i}`, result);
      });
    }
  }
}

export function SchemaTable({ fields, title, showExpandAll = true }: SchemaTableProps): JSX.Element {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const togglePath = (path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const allPaths: string[] = [];
  collectPaths(fields, '', allPaths);
  const allExpanded = allPaths.length > 0 && allPaths.every((p) => expandedPaths.has(p));

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedPaths(new Set());
    } else {
      setExpandedPaths(new Set(allPaths));
    }
  };

  return (
    <div class="schema-table" data-testid="schema-table">
      {showExpandAll && allPaths.length > 0 && (
        <div class={`schema-table__toolbar ${styles.toolbar}`}>
          <button
            class={`schema-table__expand-all ${styles.expandAll}`}
            onClick={toggleAll}
            data-testid="schema-table-expand-all"
          >
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      )}
      <div class={`schema-table__table ${styles.table}`}>
      <div class={`schema-table__columns ${styles.columns}`}>
        <div class={`schema-table__columns-name ${styles.columns__name}`}>Name</div>{' '}
        <div class={`schema-table__columns-type ${styles.columns__type}`}>Type</div>{' '}
        <div class={`schema-table__columns-description ${styles.columns__description}`}>Description</div>
      </div>
      {fields.map((field) => (
        <FieldRow
          key={field.name}
          field={field}
          depth={0}
          expandedPaths={expandedPaths}
          togglePath={togglePath}
          parentPath=""
        />
      ))}
      </div>
    </div>
  );
}
