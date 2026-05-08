import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './CopyPageButton.module.css';
import { classListFactory } from '@utils/classListFactory';
import { markSelfAsHydrated } from '@utils/markSelfAsHydrated';
import { loadPageText } from './pageTextLoader';

const cl = classListFactory(styles);

function ClipboardIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M6 5h2.5a3 3 0 0 1 3-3a3 3 0 0 1 3 3H17a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1v3H7V6zm2 2h7V6H8zm3.5-5a2 2 0 0 0-2 2h4a2 2 0 0 0-2-2" />
        </svg>
    );
}

function ClipboardSuccessIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M6 5h2.5a3 3 0 0 1 3-3a3 3 0 0 1 3 3H17a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1v3H7V6zm2 2h7V6H8zm3.5-5a2 2 0 0 0-2 2h4a2 2 0 0 0-2-2m5.65 8.6L10 18.75l-3.2-3.2l.7-.71l2.5 2.5l6.44-6.45z" />
        </svg>
    );
}

export function CopyPageButton() {
    const [copied, setCopied] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => { markSelfAsHydrated(ref); }, []);

    const handleMouseEnter = () => { loadPageText(); };

    const handleClick = async () => {
        const text = await loadPageText();
        await navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <button
            ref={ref}
            class={cl('copy-page-button')}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            aria-label={copied ? 'Copied page contents' : 'Copy page contents'}
        >
            <span class={cl('copy-page-button__icon')}>
                {copied ? <ClipboardSuccessIcon /> : <ClipboardIcon />}
            </span>
            <span class={cl('copy-page-button__label')}>
                {copied ? 'Copied!' : 'Copy page contents'}
            </span>
        </button>
    );
}
