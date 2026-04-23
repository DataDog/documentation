import { Tabs } from '../Tabs/Tabs';
import { ApiSchemaTable } from '../ApiSchemaTable/ApiSchemaTable';
import { CodeBlock } from '../CodeBlock/CodeBlock';
import type { SchemaField } from '../ApiSchemaTable/ApiSchemaTable';
import styles from '../ApiEndpoint/ApiEndpoint.module.css';
import { classListFactory } from '../../utils/classListFactory';

const cl = classListFactory(styles);

interface ApiRequestBodyTabsProps {
  schema: SchemaField[];
  examples: Array<{ name: string; value: string; highlightedValue?: string }>;
}

export function ApiRequestBodyTabs({ schema, examples }: ApiRequestBodyTabsProps) {
  const hasSchema = schema.length > 0;
  const hasExamples = examples.length > 0;

  // If only schema or only examples, render without tabs
  if (hasSchema && !hasExamples) {
    return <ApiSchemaTable fields={schema} />;
  }
  if (!hasSchema && hasExamples) {
    return (
      <div class={cl('request-body-tabs__examples')}>
        {examples.map((ex) => (
          <CodeBlock key={ex.name} content={ex.value} language="json" highlightedCode={ex.highlightedValue} />
        ))}
      </div>
    );
  }
  if (!hasSchema && !hasExamples) return null;

  return (
    <Tabs labels={['Model', 'Example']} variant="pills">
      {(activeIndex: number) =>
        activeIndex === 0 ? (
          <ApiSchemaTable fields={schema} />
        ) : (
          <div class={cl('request-body-tabs__examples')}>
            {examples.map((ex) => (
              <div key={ex.name}>
                {examples.length > 1 && <strong>{ex.name}</strong>}
                <CodeBlock content={ex.value} language="json" highlightedCode={ex.highlightedValue} />
              </div>
            ))}
          </div>
        )
      }
    </Tabs>
  );
}
