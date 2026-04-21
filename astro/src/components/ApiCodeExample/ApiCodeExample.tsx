import { useState } from 'preact/hooks';
import type { JSX } from 'preact';
import { Tabs } from '../Tabs/Tabs';
import { CodeBlock } from '../CodeBlock/CodeBlock';
import styles from './ApiCodeExample.module.css';

export interface CodeExampleEntry {
  description: string;
  code: string;
  syntax: string;
  highlightedCode?: string;
  /** If present, render one code block per region. Only the variant matching the active region is visible. */
  regionVariants?: Record<string, { code: string; highlightedCode?: string }>;
}

export interface CodeExampleSet {
  language: string;
  label: string;
  entries: CodeExampleEntry[];
}

interface ApiCodeExampleProps {
  examples: CodeExampleSet[];
}

export function ApiCodeExample({ examples }: ApiCodeExampleProps): JSX.Element {
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set(['0']));

  const toggleEntry = (key: string) => {
    setExpandedEntries((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const renderEntryBody = (entry: CodeExampleEntry) => {
    if (entry.regionVariants) {
      return (
        <>
          {Object.entries(entry.regionVariants).map(([regionKey, variant]) => (
            <div
              key={regionKey}
              data-region={regionKey}
              data-testid={`api-code-example-region-${regionKey}`}
              class={`api-code-example__code-block ${styles.codeBlock}`}
            >
              <CodeBlock content={variant.code} language={entry.syntax} highlightedCode={variant.highlightedCode} />
            </div>
          ))}
        </>
      );
    }
    return (
      <div class={`api-code-example__code-block ${styles.codeBlock}`}>
        <CodeBlock content={entry.code} language={entry.syntax} highlightedCode={entry.highlightedCode} />
      </div>
    );
  };

  const renderPanel = (ex: CodeExampleSet) => {
    if (ex.entries.length === 1) {
      return renderEntryBody(ex.entries[0]);
    }

    return (
      <>
        {ex.entries.map((entry, i) => {
          const key = String(i);
          const isOpen = expandedEntries.has(key);
          return (
            <div key={key} class={`api-code-example__accordion ${styles.accordion}`} data-testid="api-code-example-accordion">
              <button
                class={`api-code-example__accordion-header ${styles.accordionHeader} ${isOpen ? `api-code-example__accordion-header--open ${styles['accordionHeader--open']}` : ''}`}
                onClick={() => toggleEntry(key)}
                aria-expanded={isOpen}
                data-testid="api-code-example-accordion-toggle"
              >
                <svg class={`api-code-example__accordion-icon ${styles.accordionIcon}`} width="10" height="10" viewBox="0 0 10 10">
                  <path d="M3 1 L7 5 L3 9" fill="none" stroke="currentColor" stroke-width="1.5" />
                </svg>
                <span>{entry.description}</span>
              </button>
              {isOpen && renderEntryBody(entry)}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div class={`api-code-example ${styles.codeExample}`} data-testid="api-code-example">
      <h3 class={`api-code-example__heading ${styles.heading}`}>Code Example</h3>

      <Tabs
        labels={examples.map((ex) => ex.label)}
        variant="pills"
        onTabChange={() => setExpandedEntries(new Set(['0']))}
      >
        {(activeIndex) => {
          const ex = examples[activeIndex];
          return ex ? renderPanel(ex) : null;
        }}
      </Tabs>
    </div>
  );
}
