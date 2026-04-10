import { useState, useEffect, useRef } from 'preact/hooks';
import styles from './Tabs.module.css';

export interface Tab {
  label: string;
  content: string;
}

export function Tabs() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [usePills, setUsePills] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = containerRef.current?.closest('[data-tabs-wrapper]');
    const source = wrapper?.querySelector('[data-tabs-source]');
    if (!source) return;

    const tabEls = source.querySelectorAll<HTMLElement>('[data-tab-label]');
    const extracted: Tab[] = Array.from(tabEls).map((el) => ({
      label: el.getAttribute('data-tab-label') ?? '',
      content: el.innerHTML.trim(),
    }));

    (source as HTMLElement).hidden = true;
    setTabs(extracted);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || tabs.length === 0) return;

    const checkOverflow = () => {
      nav.style.flexWrap = 'nowrap';
      const overflows = nav.scrollWidth > nav.clientWidth;
      nav.style.flexWrap = '';
      setUsePills(overflows);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [tabs]);

  if (tabs.length === 0) {
    return <div ref={containerRef} data-testid="tabs" />;
  }

  const containerClass = usePills
    ? `${styles.tabs} ${styles['tabs--pills']}`
    : styles.tabs;

  return (
    <div ref={containerRef} class={containerClass} data-testid="tabs" data-layout={usePills ? 'pills' : 'tabs'}>
      <div ref={navRef} class={styles.tabs__nav} role="tablist" data-testid="tabs-nav">
        {tabs.map((tab, i) => {
          const active = i === activeIndex;
          const btnClass = active
            ? `${styles.tabs__button} ${styles['tabs__button--active']}`
            : styles.tabs__button;

          return (
            <button
              key={i}
              role="tab"
              aria-selected={active}
              class={btnClass}
              onClick={() => setActiveIndex(i)}
              data-testid={`tab-${i}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        class={styles.tabs__panel}
        data-testid="tabs-panel"
        dangerouslySetInnerHTML={{ __html: tabs[activeIndex]?.content ?? '' }}
      />
    </div>
  );
}
