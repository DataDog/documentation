import { useState, useEffect, useRef } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import styles from '../Tabs/Tabs.module.css';
import { classListFactory } from '../../utils/classListFactory';

const cl = classListFactory(styles);

interface CommonProps {
  /** Tab labels, in order. */
  labels: string[];
  /** Called when the active tab changes. */
  onTabChange?: (index: number) => void;
  /** Force a specific variant instead of auto-detecting from overflow. */
  variant?: 'tabs' | 'pills';
}

interface RenderPropProps extends CommonProps {
  /** Render function for the active panel. One panel is mounted at a time. */
  children: (activeIndex: number) => ComponentChildren;
  panelsHtml?: never;
}

interface HtmlPanelsProps extends CommonProps {
  /**
   * Pre-rendered HTML per panel. All panels are rendered into the DOM so
   * nested islands can hydrate; only the active one is visible. The string
   * reference must be stable across renders so Preact's diff skips the
   * innerHTML write and leaves nested islands untouched on tab switches.
   */
  panelsHtml: string[];
  children?: never;
}

export type TabsBloatedProps = RenderPropProps | HtmlPanelsProps;

// Legacy variant used inside other Preact islands (ApiResponse, ApiCodeExample,
// ApiRequestBodyTabs). Those islands serialize this component's props — including
// all panel content — into their parent data-props JSON, hence the "bloat".
// To be deleted once those parents are split into astro shells + TabsNav islands.
export function TabsBloated(props: TabsBloatedProps) {
  const { labels, onTabChange, variant } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [usePills, setUsePills] = useState(variant === 'pills');
  const [hydrated, setHydrated] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setHydrated(true); }, []);

  useEffect(() => {
    if (variant) {
      setUsePills(variant === 'pills');
      return;
    }
    const nav = navRef.current;
    if (!nav || labels.length === 0) return;

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
    // identity; callers often pass a fresh `map()` array each render, and
    // Preact doesn't bail out of renders when `setUsePills` is called with an
    // unchanged value, so the effect would otherwise loop.
  }, [labels.join('\u0000'), variant]);

  if (labels.length === 0) {
    return <div class={cl('tabs')} />;
  }

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onTabChange?.(index);
  };

  const containerClass = usePills ? cl('tabs', 'tabs--pills') : cl('tabs');
  const panelsHtml = 'panelsHtml' in props ? props.panelsHtml : undefined;

  return (
    <div class={containerClass} data-hydrated={hydrated ? 'true' : undefined}>
      <div ref={navRef} class={cl('tabs__nav')} role="tablist">
        {labels.map((label, i) => {
          const active = i === activeIndex;
          const btnClass = active ? cl('tabs__button', 'tabs__button--active') : cl('tabs__button');

          return (
            <button
              key={i}
              role="tab"
              aria-selected={active}
              class={btnClass}
              onClick={() => handleTabClick(i)}
              data-tab-index={i}
            >
              {label}
            </button>
          );
        })}
      </div>
      {panelsHtml
        ? panelsHtml.map((html, i) => (
            <div
              key={i}
              role="tabpanel"
              class={i === activeIndex ? cl('tabs__panel', 'tabs__panel--active') : cl('tabs__panel')}
              data-tab-panel
              hidden={i !== activeIndex}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))
        : (
          <div role="tabpanel" class={cl('tabs__panel', 'tabs__panel--active')}>
            {(props as RenderPropProps).children(activeIndex)}
          </div>
        )}
    </div>
  );
}
