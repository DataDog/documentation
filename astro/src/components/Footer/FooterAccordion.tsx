import { useEffect, useState } from 'preact/hooks';

type SectionKey = 'product' | 'resources' | 'about' | 'blog';

export interface FooterLink {
  label: string;
  href: string;
  target?: '_blank';
}

/**
 * A section body lays out two sub-columns of links side-by-side. Product uses
 * the `half` layout; the other three use `halfLg100` so they stack into a
 * single column at ≥992px.
 */
export interface FooterSection {
  id: SectionKey;
  title: string;
  /** First half of the link list. */
  firstColumn: FooterLink[];
  /** Second half of the link list. */
  secondColumn: FooterLink[];
  /** Whether sub-columns stack vertically at ≥992px (true for Resources/About/Blog). */
  stackOnDesktop: boolean;
}

interface Props {
  sections: FooterSection[];
  classes: {
    column: string;
    header: string;
    body: string;
    bodyOpen: string;
    divider: string;
    dividerDesktop: string;
    dividerMobile: string;
    columnBodyFlex: string;
    columnBodyFlexStacked: string;
    menuLinks: string;
    menuLinksHalf: string;
    menuLinksHalfLg100: string;
    menuLink: string;
  };
}

/**
 * Wraps the four footer menu columns so only one body stays open at a time
 * below 992px. Above 992px CSS forces every body to `display: block`
 * regardless of state, matching Hugo's `x-show.important="desktop || openSection === '...'"`.
 * Default open section is `resources`, matching Hugo's `openSection: 'resources'`.
 */
export default function FooterAccordion({ sections, classes }: Props) {
  const [openSection, setOpenSection] = useState<SectionKey | false>('resources');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 992px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  function toggle(key: SectionKey) {
    setOpenSection((cur) => (cur === key ? false : key));
  }

  return (
    <>
      {sections.map((s) => {
        const isOpen = isDesktop || openSection === s.id;
        const bodyFlexClass = s.stackOnDesktop
          ? `${classes.columnBodyFlex} ${classes.columnBodyFlexStacked}`
          : classes.columnBodyFlex;
        const halfClass = s.stackOnDesktop ? classes.menuLinksHalfLg100 : classes.menuLinksHalf;
        return (
          <div class={classes.column} data-testid={`footer-section-${s.id}`}>
            <p
              class={classes.header}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => toggle(s.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle(s.id);
                }
              }}
            >
              {s.title}
            </p>
            <div class={`${classes.divider} ${classes.dividerDesktop}`} aria-hidden="true" />
            <div class={`${classes.body} ${isOpen ? classes.bodyOpen : ''}`}>
              <div class={bodyFlexClass}>
                <div class={`${classes.menuLinks} ${halfClass}`}>
                  {s.firstColumn.map((link) => (
                    <a href={link.href} class={classes.menuLink} target={link.target}>
                      {link.label}
                    </a>
                  ))}
                </div>
                <div class={`${classes.menuLinks} ${halfClass}`}>
                  {s.secondColumn.map((link) => (
                    <a href={link.href} class={classes.menuLink} target={link.target}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div class={`${classes.divider} ${classes.dividerMobile}`} aria-hidden="true" />
          </div>
        );
      })}
    </>
  );
}
