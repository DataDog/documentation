import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './CopyPageButton.module.css';
import { classListFactory } from '@utils/classListFactory';
import { markSelfAsHydrated } from '@utils/markSelfAsHydrated';
import { loadPageText } from './pageTextLoader';
import clipboardIcon from '../../assets/images/svg-icons/clipboard.svg?raw';
import clipboardSuccessIcon from '../../assets/images/svg-icons/clipboard-success.svg?raw';

const cl = classListFactory(styles);

export interface CopyPageButtonLabels {
    "Copy page contents": string;
    "Copied page contents": string;
    "Copied!": string;
}

interface CopyPageButtonProps {
    labels: CopyPageButtonLabels;
}

export function CopyPageButton({ labels }: CopyPageButtonProps) {
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
            aria-label={copied ? labels["Copied page contents"] : labels["Copy page contents"]}
        >
            <span
                class={cl('copy-page-button__icon')}
                dangerouslySetInnerHTML={{ __html: copied ? clipboardSuccessIcon : clipboardIcon }}
            />
            <span class={cl('copy-page-button__label')}>
                {copied ? labels["Copied!"] : labels["Copy page contents"]}
            </span>
        </button>
    );
}
