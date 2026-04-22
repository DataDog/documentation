import { useState, useEffect, useRef } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import styles from './Tabs.module.css';

export interface Tab {
  label: string;
  content: string;
}

interface TabsProps {
  /** Pass labels directly instead of extracting from the DOM. */
  labels?: string[];
  /** Render custom panel content for the active tab index. */
  children?: (activeIndex: number) => ComponentChildren;
  /** Called when the active tab changes. */
  onTabChange?: (index: number) => void;
  /** Force a specific variant instead of auto-detecting from overflow. */
  variant?: 'tabs' | 'pills';
}

export function Tabs({ labels, children, onTabChange, variant }: TabsProps) {
  const [domTabs, setDomTabs] = useState<Tab[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [usePills, setUsePills] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const isControlled = labels != null;

  // DOM extraction mode (original behavior for TabsIsland)
  useEffect(() => {
    if (isControlled) return;
    const wrapper = containerRef.current?.closest('[data-tabs-wrapper]');
    const source = wrapper?.querySelector('[data-tabs-source]');
    if (!source) return;

    const tabEls = source.querySelectorAll<HTMLElement>('[data-tab-label]');
    const extracted: Tab[] = Array.from(tabEls).map((el) => ({
      label: el.getAttribute('data-tab-label') ?? '',
      content: el.innerHTML.trim(),
    }));

    (source as HTMLElement).hidden = true;
    setDomTabs(extracted);
  }, [isControlled]);

  const tabLabels = isControlled ? labels : domTabs.map((t) => t.label);

  // Overflow detection for pills variant (skipped when variant is forced)
  useEffect(() => {
    if (variant) {
      setUsePills(variant === 'pills');
      return;
    }
    const nav = navRef.current;
    if (!nav || tabLabels.length === 0) return;

    const checkOverflow = () => {
      nav.style.flexWrap = 'nowrap';
      const overflows = nav.scrollWidth > nav.clientWidth;
      nav.style.flexWrap = '';
      setUsePills(overflows);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
    // Depend on a stable string form of the labels instead of the array
    // identity; `domTabs.map(...)` produces a new array each render, and
    // Preact doesn't bail out of renders when `setUsePills` is called with an
    // unchanged value, so the effect would otherwise loop.
  }, [tabLabels.join('\u0000'), variant]);

  if (tabLabels.length === 0) {
    return <div ref={containerRef} data-testid="tabs" />;
  }

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onTabChange?.(index);
  };

  const containerClass = usePills
    ? `tabs tabs--pills ${styles.tabs} ${styles['tabs--pills']}`
    : `tabs ${styles.tabs}`;

  return (
    <div ref={containerRef} class={containerClass} data-testid="tabs" data-layout={usePills ? 'pills' : 'tabs'}>
      <div ref={navRef} class={`tabs__nav ${styles.tabs__nav}`} role="tablist" data-testid="tabs-nav">
        {tabLabels.map((label, i) => {
          const active = i === activeIndex;
          const btnClass = active
            ? `tabs__button tabs__button--active ${styles.tabs__button} ${styles['tabs__button--active']}`
            : `tabs__button ${styles.tabs__button}`;

          return (
            <button
              key={i}
              role="tab"
              aria-selected={active}
              class={btnClass}
              onClick={() => handleTabClick(i)}
              data-testid={`tab-${i}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" class={`tabs__panel ${styles.tabs__panel}`} data-testid="tabs-panel">
        {children
          ? children(activeIndex)
          : <span dangerouslySetInnerHTML={{ __html: domTabs[activeIndex]?.content ?? '' }} />
        }
      </div>
    </div>
  );
}
