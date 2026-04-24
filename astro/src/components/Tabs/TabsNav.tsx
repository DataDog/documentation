import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './Tabs.module.css';
import { classListFactory } from '../../utils/classListFactory';
import { markSelfAsHydrated } from '../../utils/markSelfAsHydrated';

const cl = classListFactory(styles);

interface TabsNavProps {
    labels: string[];
    panelIds: string[];
}

// Renders the nav and buttons for a tabs group, manages active-tab state, and
// toggles visibility on the panels rendered server-side by TabsIsland.astro.
// Panels stay in the Astro shell because their content is arbitrary HTML that
// shouldn't cross the island prop boundary (nested islands would break).
export function TabsNav({ labels, panelIds }: TabsNavProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    const activate = (index: number) => {
        setActiveIndex(index);
        panelIds.forEach((panelId, i) => {
            const panel = document.getElementById(panelId);
            if (!panel) return;
            const active = i === index;
            panel.hidden = !active;
            panel.classList.toggle('tabs__panel--active', active);
            const hashed = styles['tabs__panel--active'];
            if (hashed) panel.classList.toggle(hashed, active);
        });
    };

    useEffect(() => {
        const thisElement = ref.current;
        if (!thisElement) return;
        const root = thisElement.closest<HTMLElement>('.tabs');
        if (!root) return;

        const measuringHashed = styles['tabs__nav--measuring'];
        const pillsHashed = styles['tabs--pills'];

        const checkOverflow = () => {
            thisElement.classList.add('tabs__nav--measuring');
            if (measuringHashed) thisElement.classList.add(measuringHashed);
            const overflows = thisElement.scrollWidth > thisElement.clientWidth;
            thisElement.classList.remove('tabs__nav--measuring');
            if (measuringHashed) thisElement.classList.remove(measuringHashed);
            root.classList.toggle('tabs--pills', overflows);
            if (pillsHashed) root.classList.toggle(pillsHashed, overflows);
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);

        markSelfAsHydrated(ref);

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
                    onClick={() => activate(i)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
