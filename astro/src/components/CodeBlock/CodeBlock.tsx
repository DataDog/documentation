import { useEffect, useState } from 'preact/hooks';
import styles from './CodeBlock.module.css';
import { classListFactory } from '../../utils/classListFactory';

const cl = classListFactory(styles);

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
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
    navigator.clipboard?.writeText(content).catch(() => {});
  };

  const containerClass = wrap ? cl('code-block', 'code-block--wrap') : cl('code-block');
  const contentClass = collapsed ? cl('code-block__content', 'code-block__content--hidden') : cl('code-block__content');
  const chevronClass = collapsed ? cl('code-block__chevron', 'code-block__chevron--down') : cl('code-block__chevron', 'code-block__chevron--up');

  return (
    <div
      class={containerClass}
      data-testid="code-block"
      data-hydrated={hydrated ? 'true' : undefined}
      data-language={language || undefined}
      data-collapsible={collapsible || undefined}
      data-disable-copy={disableCopy || undefined}
    >
      {(filename || collapsible) && (
        <div class={cl('code-block__header')}>
          {filename ? (
            <span class={cl('code-block__filename')} data-testid="code-block-filename">
              {filename}
            </span>
          ) : null}
          <div class={cl('code-block__header-actions')}>
            {collapsible && (
              <button
                class={cl('code-block__toggle')}
                onClick={() => setCollapsed((prev) => !prev)}
                data-testid="code-block-toggle"
                aria-expanded={!collapsed}
                aria-label={collapsed ? 'Expand code' : 'Collapse code'}
              >
                <span class={chevronClass} />
              </button>
            )}
          </div>
        </div>
      )}
      <div class={contentClass} data-testid="code-block-content">
        {!disableCopy && (
          <button
            class={cl('code-block__copy')}
            onClick={handleCopy}
            data-testid="code-block-copy"
            aria-label="Copy code"
          >
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        )}
        {highlightedCode ? (
          <div
            class={cl('code-block__highlighted')}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <pre class={cl('code-block__pre')}>
            <code class={cl('code-block__code')}>{content}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
