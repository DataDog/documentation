import { useState } from 'preact/hooks';
import type { JSX } from 'preact';
import styles from './ApiCodeExample.module.css';

export interface CodeExampleEntry {
  description: string;
  code: string;
  syntax: string;
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
  const [activeLang, setActiveLang] = useState<string>(examples[0]?.language ?? '');
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

  return (
    <div class={styles.codeExample} data-testid="api-code-example">
      <h3 class={styles.heading}>Code Example</h3>

      {/* Language tabs */}
      <div class={styles.tabs} role="tablist" data-testid="api-code-example-tabs">
        {examples.map((ex) => (
          <button
            key={ex.language}
            class={`${styles.tab} ${ex.language === activeLang ? styles['tab--active'] : ''}`}
            role="tab"
            aria-selected={ex.language === activeLang}
            onClick={() => {
              setActiveLang(ex.language);
              setExpandedEntries(new Set(['0']));
            }}
            data-testid={`api-code-example-tab-${ex.language}`}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Language panels — all rendered for SEO */}
      {examples.map((ex) => (
        <div
          key={ex.language}
          role="tabpanel"
          style={{ display: ex.language === activeLang ? 'block' : 'none' }}
          data-testid={`api-code-example-panel-${ex.language}`}
        >
          {ex.entries.length === 1 ? (
            /* Single example — no accordion */
            <div class={styles.codeBlock}>
              <pre class={styles.pre}>
                <code>{ex.entries[0].code}</code>
              </pre>
            </div>
          ) : (
            /* Multiple examples — accordion */
            ex.entries.map((entry, i) => {
              const key = String(i);
              const isOpen = expandedEntries.has(key);
              return (
                <div key={key} class={styles.accordion} data-testid="api-code-example-accordion">
                  <button
                    class={`${styles.accordionHeader} ${isOpen ? styles['accordionHeader--open'] : ''}`}
                    onClick={() => toggleEntry(key)}
                    aria-expanded={isOpen}
                    data-testid="api-code-example-accordion-toggle"
                  >
                    <svg class={styles.accordionIcon} width="10" height="10" viewBox="0 0 10 10">
                      <path d="M3 1 L7 5 L3 9" fill="none" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                    <span>{entry.description}</span>
                  </button>
                  {isOpen && (
                    <div class={styles.codeBlock}>
                      <pre class={styles.pre}>
                        <code>{entry.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      ))}
    </div>
  );
}
