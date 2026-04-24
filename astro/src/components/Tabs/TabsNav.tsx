import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './Tabs.module.css';
import { classListFactory } from '../../utils/classListFactory';
import { addStyleFactory } from '../../utils/addStyleFactory';
import { removeStyleFactory } from '../../utils/removeStyleFactory';
import { markSelfAsHydrated } from '../../utils/markSelfAsHydrated';

const cl = classListFactory(styles);
const addStyle = addStyleFactory(styles);
const removeStyle = removeStyleFactory(styles);

interface TabsNavProps {
    labels: string[];
    panelIds: string[];
    /** If set, skips overflow detection and trusts the SSR-applied variant. */
    variant?: 'tabs' | 'pills';
}

// Renders the nav and buttons for a tabs group, manages active-tab state, and
// toggles visibility on the panels rendered server-side by TabsIsland.astro.
// Panels stay in the Astro shell because their content is arbitrary HTML that
// shouldn't cross the island prop boundary (nested islands would break).
export function TabsNav({ labels, panelIds, variant }: TabsNavProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<HTMLElement[]>([]);

    const setActiveTab = (index: number) => {
        setActiveIndex(index);
        panelsRef.current.forEach((panel, i) => {
            const active = i === index;
            panel.hidden = !active;
            if (active) {
                addStyle(panel.classList, 'tabs__panel--active');
            } else {
                removeStyle(panel.classList, 'tabs__panel--active');
            }
        });
    };

    useEffect(() => {
        const thisElement = ref.current;
        if (!thisElement) return;
        const root = thisElement.closest<HTMLElement>('.tabs');
        if (!root) return;

        panelsRef.current = panelIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        markSelfAsHydrated(ref);

        if (variant) return;

        const checkOverflow = () => {
            addStyle(thisElement.classList, 'tabs__nav--measuring');
            const overflows = thisElement.scrollWidth > thisElement.clientWidth;
            removeStyle(thisElement.classList, 'tabs__nav--measuring');
            if (overflows) {
                addStyle(root.classList, 'tabs--pills');
            } else {
                removeStyle(root.classList, 'tabs--pills');
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);

        return () => window.removeEventListener('resize', checkOverflow);
    }, []);

    return (
        <div ref={ref} class={cl('tabs__nav')} role="tablist">
            {labels.map((label, i) => (
                <button
                    role="tab"
                    class={i === activeIndex ? cl('tabs__button', 'tabs__button--active') : cl('tabs__button')}
                    aria-selected={i === activeIndex ? 'true' : 'false'}
                    aria-controls={panelIds[i]}
                    data-tab-index={i}
                    onClick={() => setActiveTab(i)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
