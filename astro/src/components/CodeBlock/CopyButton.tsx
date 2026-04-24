import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './CodeBlock.module.css';
import { classListFactory } from '../../utils/classListFactory';

const cl = classListFactory(styles);

interface CopyButtonProps {
    content: string;
}

export function CopyButton({ content }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);

    // Nothing uses this signal today
    useEffect(() => {
        ref.current?.closest('.code-block')?.setAttribute('data-hydrated', 'true');
    }, []);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
        navigator.clipboard?.writeText(content).catch(() => {});
    };

    return (
        <button
            ref={ref}
            class={cl('code-block__copy')}
            onClick={handleCopy}
            aria-label="Copy code"
        >
            <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
    );
}
