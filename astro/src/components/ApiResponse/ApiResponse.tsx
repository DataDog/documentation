import type { JSX } from 'preact';
import { Tabs } from '../Tabs/Tabs';
import { SchemaTable } from '../SchemaTable/SchemaTable';
import { CodeBlock } from '../CodeBlock/CodeBlock';
import type { SchemaField } from '../SchemaTable/SchemaTable';
import styles from './ApiResponse.module.css';

export interface ResponseData {
  statusCode: string;
  description: string;
  schema?: SchemaField[];
  examples?: Array<{
    name: string;
    value: string;
    highlightedValue?: string;
  }>;
}

interface ApiResponseProps {
  responses: ResponseData[];
}

export function ApiResponse({ responses }: ApiResponseProps): JSX.Element {
  const labels = responses.map((r) => r.statusCode);

  return (
    <div class={styles.response} data-testid="api-response">
      <h3 class={styles.heading}>Response</h3>

      <Tabs labels={labels} variant="pills">
        {(activeIndex) => {
          const r = responses[activeIndex];
          if (!r) return null;

          const toggleLabels: string[] = [];
          if (r.schema) toggleLabels.push('Model');
          if (r.examples && r.examples.length > 0) toggleLabels.push('Example');

          return (
            <div data-testid={`api-response-panel-${r.statusCode}`}>
              {r.description && (
                <p class={styles.description} dangerouslySetInnerHTML={{ __html: r.description }} />
              )}

              {toggleLabels.length > 0 ? (
                <Tabs labels={toggleLabels} variant="pills">
                  {(activeToggleIndex) => {
                    const activeLabel = toggleLabels[activeToggleIndex];

                    if (activeLabel === 'Model' && r.schema) {
                      return <SchemaTable fields={r.schema} />;
                    }

                    if (activeLabel === 'Example' && r.examples && r.examples.length > 0) {
                      return (
                        <>
                          {r.examples.map((ex) => (
                            <div key={ex.name} class={styles.example}>
                              <CodeBlock content={ex.value} language="json" highlightedCode={ex.highlightedValue} />
                            </div>
                          ))}
                        </>
                      );
                    }

                    return null;
                  }}
                </Tabs>
              ) : null}
            </div>
          );
        }}
      </Tabs>
    </div>
  );
}
