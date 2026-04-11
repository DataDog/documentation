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
    ? `code-block code-block--wrap ${styles['code-block']} ${styles['code-block--wrap']}`
    : `code-block ${styles['code-block']}`;

  const contentClass = collapsed
    ? `code-block__content code-block__content--hidden ${styles['code-block__content']} ${styles['code-block__content--hidden']}`
    : `code-block__content ${styles['code-block__content']}`;

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
        <div class={`code-block__header ${styles['code-block__header']}`}>
          {filename ? (
            <span class={`code-block__filename ${styles['code-block__filename']}`} data-testid="code-block-filename">
              {filename}
            </span>
          ) : null}
          <div class={`code-block__header-actions ${styles['code-block__header-actions']}`}>
            {collapsible && (
              <button
                class={`code-block__toggle ${styles['code-block__toggle']}`}
                onClick={() => setCollapsed((prev) => !prev)}
                data-testid="code-block-toggle"
                aria-expanded={!collapsed}
                aria-label={collapsed ? 'Expand code' : 'Collapse code'}
              >
                <span
                  class={`code-block__chevron ${styles['code-block__chevron']} ${
                    collapsed
                      ? `code-block__chevron--down ${styles['code-block__chevron--down']}`
                      : `code-block__chevron--up ${styles['code-block__chevron--up']}`
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
            class={`code-block__copy ${styles['code-block__copy']}`}
            onClick={handleCopy}
            data-testid="code-block-copy"
            aria-label="Copy code"
          >
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        )}
        {highlightedCode ? (
          <div
            class={`code-block__highlighted ${styles['code-block__highlighted']}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <pre class={`code-block__pre ${styles['code-block__pre']}`}>
            <code class={`code-block__code ${styles['code-block__code']}`}>{content}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
