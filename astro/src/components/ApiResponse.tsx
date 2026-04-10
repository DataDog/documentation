import { useState } from 'preact/hooks';
import type { JSX } from 'preact';
import { SchemaTable } from './SchemaTable';
import type { SchemaField } from './SchemaTable';
import styles from './ApiResponse.module.css';

export interface ResponseData {
  statusCode: string;
  description: string;
  schema?: SchemaField[];
  examples?: Array<{
    name: string;
    value: string;
  }>;
}

interface ApiResponseProps {
  responses: ResponseData[];
}

export function ApiResponse({ responses }: ApiResponseProps): JSX.Element {
  const [activeCode, setActiveCode] = useState<string>(responses[0]?.statusCode ?? '');
  const [viewMode, setViewMode] = useState<Record<string, 'model' | 'example'>>({});

  const getViewMode = (code: string) => viewMode[code] || 'model';
  const setViewModeFor = (code: string, mode: 'model' | 'example') => {
    setViewMode((prev) => ({ ...prev, [code]: mode }));
  };

  return (
    <div class={styles.response} data-testid="api-response">
      <h3 class={styles.heading}>Response</h3>

      {/* Status code tabs */}
      <div class={styles.tabs} role="tablist" data-testid="api-response-tabs">
        {responses.map((r) => (
          <button
            key={r.statusCode}
            class={`${styles.tab} ${r.statusCode === activeCode ? styles['tab--active'] : ''}`}
            role="tab"
            aria-selected={r.statusCode === activeCode}
            onClick={() => setActiveCode(r.statusCode)}
            data-testid={`api-response-tab-${r.statusCode}`}
          >
            {r.statusCode}
          </button>
        ))}
      </div>

      {/* Tab panels — all rendered for SEO, only active is visible */}
      {responses.map((r) => (
        <div
          key={r.statusCode}
          role="tabpanel"
          class={styles.panel}
          style={{ display: r.statusCode === activeCode ? 'block' : 'none' }}
          data-testid={`api-response-panel-${r.statusCode}`}
        >
          {r.description && (
            <p class={styles.description} dangerouslySetInnerHTML={{ __html: r.description }} />
          )}

          {/* Model / Example toggle */}
          {(r.schema || r.examples) && (
            <div class={styles.toggle} data-testid="api-response-model-example-toggle">
              {r.schema && (
                <button
                  class={`${styles.toggleBtn} ${getViewMode(r.statusCode) === 'model' ? styles['toggleBtn--active'] : ''}`}
                  onClick={() => setViewModeFor(r.statusCode, 'model')}
                >
                  Model
                </button>
              )}
              {r.examples && r.examples.length > 0 && (
                <button
                  class={`${styles.toggleBtn} ${getViewMode(r.statusCode) === 'example' ? styles['toggleBtn--active'] : ''}`}
                  onClick={() => setViewModeFor(r.statusCode, 'example')}
                >
                  Example
                </button>
              )}
            </div>
          )}

          {/* Model view */}
          {r.schema && (
            <div style={{ display: getViewMode(r.statusCode) === 'model' ? 'block' : 'none' }}>
              <SchemaTable fields={r.schema} />
            </div>
          )}

          {/* Example view */}
          {r.examples && r.examples.length > 0 && (
            <div style={{ display: getViewMode(r.statusCode) === 'example' ? 'block' : 'none' }}>
              {r.examples.map((ex) => (
                <div key={ex.name} class={styles.example}>
                  <pre class={styles.examplePre}>
                    <code>{ex.value}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
