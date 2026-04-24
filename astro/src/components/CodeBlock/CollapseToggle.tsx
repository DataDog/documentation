import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './CodeBlock.module.css';
import { classListFactory } from '../../utils/classListFactory';

const cl = classListFactory(styles);

interface CollapseToggleProps {
  targetId: string;
}

export function CollapseToggle({ targetId }: CollapseToggleProps) {
  const [collapsed, setCollapsed] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    ref.current
      ?.closest('.code-block')
      ?.setAttribute('data-hydrated', 'true');
  }, []);

  // Collapse state lives in this island, but the hidden content lives in
  // the Astro shell — toggle the BEM class and its CSS-module hash on the
  // shell's content wrapper imperatively so component styles still apply.
  const applyCollapsed = (next: boolean) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.classList.toggle('code-block__content--hidden', next);
    const hashed = styles['code-block__content--hidden'];
    if (hashed) target.classList.toggle(hashed, next);
  };

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    applyCollapsed(next);
  };

  const chevronClass = collapsed
    ? cl('code-block__chevron', 'code-block__chevron--down')
    : cl('code-block__chevron', 'code-block__chevron--up');

  return (
    <button
      ref={ref}
      class={cl('code-block__toggle')}
      onClick={handleToggle}
      aria-expanded={!collapsed}
      aria-label={collapsed ? 'Expand code' : 'Collapse code'}
    >
      <span class={chevronClass} />
    </button>
  );
}
