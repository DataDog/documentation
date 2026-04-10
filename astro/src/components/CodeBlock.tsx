import { useState } from 'preact/hooks';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  content: string;
  language?: string;
  highlightedCode?: string;
}

export function CodeBlock({ content, language, highlightedCode }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div class={styles['code-block']} data-testid="code-block" data-language={language || undefined}>
      <div class={styles['code-block__header']}>
        {language && (
          <span class={styles['code-block__language']}>{language}</span>
        )}
        <button
          class={styles['code-block__copy']}
          onClick={handleCopy}
          data-testid="code-block-copy"
          aria-label="Copy code"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
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
  );
}
