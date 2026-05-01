import { useEffect, useRef, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';

interface Props {
  /** Trigger label shown on the top-level nav bar. */
  label: string;
  /** Href for the top-level trigger. */
  href: string;
  /** BEM identifier class appended to the <li>. */
  identifier: string;
  /** CSS-modules class names — passed in from the parent so this island can use the
      same module scope as `Header.module.css`. */
  classes: {
    menuItem: string;
    menuItemOpen: string;
    menuLink: string;
    dropdownMenu: string;
    dropdownMenuOpen: string;
    solutionsMenu?: string;
  };
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
export default function NavDropdown({ label, href, identifier, classes, isSolutions, children }: Props) {
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
    classes.dropdownMenu,
    open ? classes.dropdownMenuOpen : '',
    isSolutions && classes.solutionsMenu ? classes.solutionsMenu : '',
    'dropdown-menu',
    isSolutions ? 'solutions-menu' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li
      class={`${classes.menuItem} ${open ? classes.menuItemOpen : ''} dropdown ${identifier}-dropdown`}
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <a class={`${classes.menuLink} dropdown`} href={href}>
        <span class="menu-text">{label}</span>
      </a>
      <div class={`${menuClass} ${identifier}-dropdown-menu`}>
        {children}
      </div>
    </li>
  );
}
