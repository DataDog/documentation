import { useEffect, useState } from 'preact/hooks';
import type {
  AccordionSectionId,
  FooterLink,
  FooterSection,
} from '@lib/componentUtils/footerMenus';
import styles from './Footer.module.css';
import { classListFactory } from '@lib/cssUtils/classListFactory';

export type { FooterLink, FooterSection };

type SectionKey = AccordionSectionId;

const cl = classListFactory(styles);

/**
 * Wraps the four footer menu columns so only one body stays open at a time
 * below 992px. Above 992px CSS forces every body to `display: block`
 * regardless of state, matching Hugo's `x-show.important="desktop || openSection === '...'"`.
 * Default open section is `resources`, matching Hugo's `openSection: 'resources'`.
 */
export default function FooterAccordion({ sections }: { sections: FooterSection[] }) {
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
        const halfClass = s.stackOnDesktop
          ? cl('footer__menu-links--half-lg-100')
          : cl('footer__menu-links--half');
        const bodyFlexClass = s.stackOnDesktop
          ? `${cl('footer__column-body-flex')} ${cl('footer__column-body-flex--stacked')}`
          : cl('footer__column-body-flex');
        return (
          <div class={`${cl('footer__column')} ${cl(`footer__column--${s.id}`)} footer-section footer-section--${s.id}`}>
            <p
              class={cl('footer__section-header')}
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
            <div class={`${cl('footer__divider')} ${cl('footer__divider--desktop')}`} aria-hidden="true" />
            <div class={`${cl('footer__section-body')} ${isOpen ? cl('footer__section-body--open') : ''}`}>
              <div class={bodyFlexClass}>
                <div class={`${cl('footer__menu-links')} ${halfClass}`}>
                  {s.firstColumn.map((link) => (
                    <a href={link.href} class={cl('footer__menu-link')} target={link.target}>
                      {link.label}
                    </a>
                  ))}
                </div>
                <div class={`${cl('footer__menu-links')} ${halfClass}`}>
                  {s.secondColumn.map((link) => (
                    <a href={link.href} class={cl('footer__menu-link')} target={link.target}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div class={`${cl('footer__divider')} ${cl('footer__divider--mobile')}`} aria-hidden="true" />
          </div>
        );
      })}
    </>
  );
}
