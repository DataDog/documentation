import { useEffect, useState } from 'preact/hooks';
import type { JSX } from 'preact';
import styles from './ApiSchemaTable.module.css';
import { classListFactory } from '../../utils/classListFactory';

const cl = classListFactory(styles);

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

interface ApiSchemaTableProps {
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

  const rowClass = [
    cl('schema-table__row'),
    field.readOnly && cl('schema-table__row--readonly'),
    field.deprecated && cl('schema-table__row--deprecated'),
  ].filter(Boolean).join(' ');

  const toggleClass = [
    cl('schema-table__toggle'),
    isExpanded && cl('schema-table__toggle--expanded'),
  ].filter(Boolean).join(' ');

  return (
    <>
      <div
        class={rowClass}
        data-field-name={field.name}
        data-depth={depth}
      >
        <div class={cl('schema-table__cell-name')} style={indent > 0 ? { paddingLeft: `calc(var(--space-md) + ${indent}px)` } : undefined}>
          {hasChildren && (
            <button
              class={toggleClass}
              onClick={() => togglePath(path)}
              aria-expanded={isExpanded}
              aria-label={`Toggle ${field.name}`}
            >
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M3 1 L7 5 L3 9" fill="none" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </button>
          )}
          <code class={cl('schema-table__name')}>{field.name}</code>
          {field.required && (
            <span class={cl('schema-table__required')}>{' '}[required]</span>
          )}
        </div>{' '}
        <div class={cl('schema-table__cell-type')}>
          <span class={cl('schema-table__type')}>{field.type}</span>
        </div>{' '}
        <div class={cl('schema-table__cell-description')}>
          {field.deprecated && (
            <><strong class={cl('schema-table__deprecated-label')}>DEPRECATED</strong>{' '}</>
          )}
          <span dangerouslySetInnerHTML={{ __html: field.description }} />
          {field.defaultValue !== undefined && (
            <span class={cl('schema-table__default')}> Default: <code>{field.defaultValue}</code></span>
          )}
          {field.enumValues && field.enumValues.length > 0 && (
            <EnumValues values={field.enumValues} />
          )}
        </div>
      </div>

      {/* Render children if expanded */}
      {hasChildren && (
        <div
          class={cl('schema-table__children')}
          style={{ display: isExpanded ? 'block' : 'none' }}
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
              <div class={cl('schema-table__union-label')} style={{ paddingLeft: `${(depth + 1) * 20 + 8}px` }}>
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
      <div class={cl('schema-table__enum')}>
        Allowed enum values: <code>{values.join(', ')}</code>
      </div>
    );
  }
  const visible = values.slice(0, ENUM_INLINE_LIMIT);
  const rest = values.slice(ENUM_INLINE_LIMIT);
  return (
    <div class={cl('schema-table__enum')}>
      Allowed enum values: <code>{visible.join(', ')}</code>
      <details class={cl('schema-table__enum-details')}>
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

export function ApiSchemaTable({ fields, title, showExpandAll = true }: ApiSchemaTableProps): JSX.Element {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

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
    <div class="schema-table" data-hydrated={hydrated ? 'true' : undefined}>
      {showExpandAll && allPaths.length > 0 && (
        <div class={cl('schema-table__toolbar')}>
          <button
            class={cl('schema-table__expand-all')}
            onClick={toggleAll}
          >
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      )}
      <div class={cl('schema-table__table')}>
      <div class={cl('schema-table__columns')}>
        <div class={cl('schema-table__columns-name')}>Name</div>{' '}
        <div class={cl('schema-table__columns-type')}>Type</div>{' '}
        <div class={cl('schema-table__columns-description')}>Description</div>
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
