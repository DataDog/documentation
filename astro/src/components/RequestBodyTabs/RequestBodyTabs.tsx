import { Tabs } from '../Tabs/Tabs';
import { SchemaTable } from '../SchemaTable/SchemaTable';
import { CodeBlock } from '../CodeBlock/CodeBlock';
import type { SchemaField } from '../SchemaTable/SchemaTable';
import styles from '../ApiEndpoint/ApiEndpoint.module.css';

interface RequestBodyTabsProps {
  schema: SchemaField[];
  examples: Array<{ name: string; value: string; highlightedValue?: string }>;
}

export function RequestBodyTabs({ schema, examples }: RequestBodyTabsProps) {
  const hasSchema = schema.length > 0;
  const hasExamples = examples.length > 0;

  // If only schema or only examples, render without tabs
  if (hasSchema && !hasExamples) {
    return <SchemaTable fields={schema} />;
  }
  if (!hasSchema && hasExamples) {
    return (
      <div class={`request-body-tabs__examples ${styles.requestExamples}`}>
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
          <SchemaTable fields={schema} />
        ) : (
          <div class={`request-body-tabs__examples ${styles.requestExamples}`}>
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
