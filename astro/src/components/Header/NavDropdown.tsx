import { useEffect, useRef, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import styles from './Header.module.css';
import { classListFactory } from '@lib/cssUtils/classListFactory';

const cl = classListFactory(styles);

export interface NavDropdownLabels {
  trigger: string;
}

interface Props {
  labels: NavDropdownLabels;
  /** Href for the top-level trigger. */
  href: string;
  /** BEM identifier class appended to the <li>. */
  identifier: string;
  /** Set true for the Solutions/mega-menu width variant. */
  isSolutions?: boolean;
  /** Pre-rendered children (dropdown contents). Rendered at build time so SEO sees them. */
  children: ComponentChildren;
}

/**
 * Hover-open dropdown island. Opens on mouse-enter with no delay; closes on
 * mouse-leave after ~150ms so the user can travel between trigger and menu.
 * Hugo's Bootstrap-driven dropdowns use the same "hover to open, slight close
 * delay" behavior; we reproduce it without Bootstrap or Alpine.
 */
export default function NavDropdown({ labels, href, identifier, isSolutions, children }: Props) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const cancelClose = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    timeoutRef.current = window.setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => cancelClose(), []);

  const menuClass = [
    cl('header__dropdown-menu'),
    open ? cl('header__dropdown-menu--open') : '',
    isSolutions ? cl('header__solutions-menu') : '',
    'dropdown-menu',
    isSolutions ? 'solutions-menu' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li
      class={`${cl('header__menu-item')} ${open ? cl('header__menu-item--open') : ''} dropdown ${identifier}-dropdown`}
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <a class={`${cl('header__menu-link')} dropdown`} href={href}>
        <span class="menu-text">{labels.trigger}</span>
      </a>
      <div class={`${menuClass} ${identifier}-dropdown-menu`}>
        {children}
      </div>
    </li>
  );
}
