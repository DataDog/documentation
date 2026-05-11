import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './CopyPageButton.module.css';
import { classListFactory } from '@utils/classListFactory';
import { markSelfAsHydrated } from '@utils/markSelfAsHydrated';
import { loadPageText } from './pageTextLoader';
import clipboardIcon from '../../assets/images/svg-icons/clipboard.svg?raw';
import clipboardSuccessIcon from '../../assets/images/svg-icons/clipboard-success.svg?raw';

const cl = classListFactory(styles);

export interface CopyPageButtonLabels {
    "Copy page": string;
    "Copied": string;
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

    // Both labels render at all times; only one is visible. Stacking them in
    // the same grid cell locks the label slot to the width of the longer
    // string, so swapping between "Copy page" and "Copied" doesn't reflow
    // the icon or the surrounding layout.
    return (
        <button
            ref={ref}
            class={cl('copy-page-button')}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            aria-label={copied ? labels["Copied"] : labels["Copy page"]}
        >
            <span
                class={cl('copy-page-button__icon')}
                dangerouslySetInnerHTML={{ __html: copied ? clipboardSuccessIcon : clipboardIcon }}
            />
            <span class={cl('copy-page-button__label')}>
                <span
                    class={copied
                        ? cl('copy-page-button__label-text')
                        : cl('copy-page-button__label-text', 'copy-page-button__label-text--visible')}
                    aria-hidden={copied ? 'true' : undefined}
                >
                    {labels["Copy page"]}
                </span>
                <span
                    class={copied
                        ? cl('copy-page-button__label-text', 'copy-page-button__label-text--visible')
                        : cl('copy-page-button__label-text')}
                    aria-hidden={copied ? undefined : 'true'}
                >
                    {labels["Copied"]}
                </span>
            </span>
        </button>
    );
}
