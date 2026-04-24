import { useState } from 'preact/hooks';
import type { JSX } from 'preact';
import { TabsBloated } from '../TabsBloated/TabsBloated';
import { CodeBlockBloated } from '../CodeBlockBloated/CodeBlockBloated';
import styles from './ApiCodeExample.module.css';
import { classListFactory } from '../../utils/classListFactory';

const cl = classListFactory(styles);

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
              class={cl('api-code-example__code-block')}
            >
              <CodeBlockBloated content={variant.code} language={entry.syntax} highlightedCode={variant.highlightedCode} />
            </div>
          ))}
        </>
      );
    }
    return (
      <div class={cl('api-code-example__code-block')}>
        <CodeBlockBloated content={entry.code} language={entry.syntax} highlightedCode={entry.highlightedCode} />
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
          const headerClass = [
            cl('api-code-example__accordion-header'),
            isOpen && cl('api-code-example__accordion-header--open'),
          ].filter(Boolean).join(' ');

          return (
            <div key={key} class={cl('api-code-example__accordion')}>
              <button
                class={headerClass}
                onClick={() => toggleEntry(key)}
                aria-expanded={isOpen}
              >
                <svg class={cl('api-code-example__accordion-icon')} width="10" height="10" viewBox="0 0 10 10">
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
    <div class={cl('api-code-example')}>
      <h3 class={cl('api-code-example__heading')}>Code Example</h3>

      <TabsBloated
        labels={examples.map((ex) => ex.label)}
        variant="pills"
        onTabChange={() => setExpandedEntries(new Set(['0']))}
      >
        {(activeIndex) => {
          const ex = examples[activeIndex];
          return ex ? renderPanel(ex) : null;
        }}
      </TabsBloated>
    </div>
  );
}
