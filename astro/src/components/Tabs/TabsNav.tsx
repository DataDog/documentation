import { useEffect } from 'preact/hooks';
import styles from './Tabs.module.css';

interface TabsNavProps {
  groupId: string;
}

// Wires click handlers and overflow detection onto the static nav/panels
// rendered by TabsIsland.astro. Renders no JSX — all markup lives in the
// Astro shell so no panel content ever crosses the island prop boundary.
export function TabsNav({ groupId }: TabsNavProps) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(`[data-tabs-group="${groupId}"]`);
    if (!root) return;

    root.setAttribute('data-hydrated', 'true');

    const nav = root.querySelector<HTMLElement>('[role="tablist"]');
    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tab-index][role="tab"]'));
    const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-tab-panel]'));

    const activate = (index: number) => {
      buttons.forEach((btn, i) => {
        const active = i === index;
        btn.classList.toggle('tabs__button--active', active);
        const hashed = styles['tabs__button--active'];
        if (hashed) btn.classList.toggle(hashed, active);
        btn.setAttribute('aria-selected', String(active));
      });
      panels.forEach((panel, i) => {
        const active = i === index;
        panel.hidden = !active;
        panel.classList.toggle('tabs__panel--active', active);
        const hashed = styles['tabs__panel--active'];
        if (hashed) panel.classList.toggle(hashed, active);
      });
    };

    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => activate(i));
    });

    if (!nav) return;

    // Auto-detect overflow → pills layout; re-check on resize.
    const checkOverflow = () => {
      nav.style.flexWrap = 'nowrap';
      const overflows = nav.scrollWidth > nav.clientWidth;
      nav.style.flexWrap = '';
      root.classList.toggle('tabs--pills', overflows);
      const hashed = styles['tabs--pills'];
      if (hashed) root.classList.toggle(hashed, overflows);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [groupId]);

  return null;
}
