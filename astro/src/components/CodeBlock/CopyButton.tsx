import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './CodeBlock.module.css';
import { classListFactory } from '../../utils/classListFactory';
import { markSelfAsHydrated } from '../../utils/markSelfAsHydrated';

const cl = classListFactory(styles);

interface CopyButtonProps {
    content: string;
}

export function CopyButton({ content }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => { markSelfAsHydrated(ref); }, []);

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
