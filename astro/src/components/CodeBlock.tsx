import { useState } from 'preact/hooks';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  content: string;
  language?: string;
  highlightedCode?: string;
  filename?: string;
  wrap?: boolean;
  collapsible?: boolean;
  disableCopy?: boolean;
}

export function CodeBlock({
  content,
  language,
  highlightedCode,
  filename,
  wrap = false,
  collapsible = false,
  disableCopy = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  const containerClass = wrap
    ? `${styles['code-block']} ${styles['code-block--wrap']}`
    : styles['code-block'];

  const contentClass = collapsed
    ? `${styles['code-block__content']} ${styles['code-block__content--hidden']}`
    : styles['code-block__content'];

  return (
    <div
      class={containerClass}
      data-testid="code-block"
      data-language={language || undefined}
      data-collapsible={collapsible || undefined}
      data-wrap={wrap || undefined}
      data-disable-copy={disableCopy || undefined}
    >
      {(filename || collapsible) && (
        <div class={styles['code-block__header']}>
          {filename ? (
            <span class={styles['code-block__filename']} data-testid="code-block-filename">
              {filename}
            </span>
          ) : null}
          <div class={styles['code-block__header-actions']}>
            {collapsible && (
              <button
                class={styles['code-block__toggle']}
                onClick={() => setCollapsed((prev) => !prev)}
                data-testid="code-block-toggle"
                aria-expanded={!collapsed}
                aria-label={collapsed ? 'Expand code' : 'Collapse code'}
              >
                <span
                  class={`${styles['code-block__chevron']} ${
                    collapsed
                      ? styles['code-block__chevron--down']
                      : styles['code-block__chevron--up']
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      )}
      <div class={contentClass} data-testid="code-block-content">
        {!disableCopy && (
          <button
            class={styles['code-block__copy']}
            onClick={handleCopy}
            data-testid="code-block-copy"
            aria-label="Copy code"
          >
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        )}
        {highlightedCode ? (
          <div
            class={styles['code-block__highlighted']}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <pre class={styles['code-block__pre']}>
            <code class={styles['code-block__code']}>{content}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
