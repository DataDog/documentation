import styles from './ApiResponse.module.css';
import { classListFactory } from '../../utils/classListFactory';
import { TabsBloated } from '../TabsBloated/TabsBloated';
import { ApiSchemaTable } from '../ApiSchemaTable/ApiSchemaTable';
import { CodeBlockBloated } from '../CodeBlockBloated/CodeBlockBloated';

const cl = classListFactory(styles);

export interface ResponseData {
  statusCode: string;
  description?: string;
  schema?: import('../ApiSchemaTable/ApiSchemaTable').SchemaField[];
  examples?: { name: string; value: string; highlightedValue?: string }[];
}

interface ApiResponseProps {
  responses: ResponseData[];
}

export function ApiResponse({ responses }: ApiResponseProps): JSX.Element {
  const labels = responses.map((r) => r.statusCode);

  return (
    <div class={cl('api-response')}>
      <h3 class={cl('api-response__heading')}>Response</h3>

      <TabsBloated labels={labels} variant="pills">
        {(activeIndex) => {
          const r = responses[activeIndex];
          if (!r) return null;

          const toggleLabels: string[] = [];
          if (r.schema) toggleLabels.push('Model');
          if (r.examples && r.examples.length > 0) toggleLabels.push('Example');

          return (
            <div class={`api-response__panel api-response__panel--${r.statusCode}`}>
              {r.description && (
                <p class={cl('api-response__description')} dangerouslySetInnerHTML={{ __html: r.description }} />
              )}

              {toggleLabels.length > 0 ? (
                <TabsBloated labels={toggleLabels} variant="pills">
                  {(activeToggleIndex) => {
                    const activeLabel = toggleLabels[activeToggleIndex];

                    if (activeLabel === 'Model' && r.schema) {
                      return <ApiSchemaTable fields={r.schema} />;
                    }

                    if (activeLabel === 'Example' && r.examples && r.examples.length > 0) {
                      return (
                        <>
                          {r.examples.map((ex) => (
                            <div key={ex.name} class={cl('api-response__example')}>
                              <CodeBlockBloated content={ex.value} language="json" highlightedCode={ex.highlightedValue} />
                            </div>
                          ))}
                        </>
                      );
                    }

                    return null;
                  }}
                </TabsBloated>
              ) : null}
            </div>
          );
        }}
      </TabsBloated>
    </div>
  );
}
