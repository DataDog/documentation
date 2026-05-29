import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './Footer.module.css';
import { classListFactory } from '@lib/cssUtils/classListFactory';

const cl = classListFactory(styles);

export interface LanguageOption {
  /** Language code, e.g. "en", "ja". */
  code: string;
  /** Display name in its own language (e.g. "English", "日本語"). */
  primary: string;
  /** Display name in the current language (e.g. "English" when current=en, "Japanese" when current=en). */
  secondary: string;
  /** Full URL to switch to this language. */
  href: string;
}

interface Props {
  currentLang: LanguageOption;
  alternates: LanguageOption[];
  /** Pre-rendered SVGs for the globe + caret icons, passed in to avoid coupling the island to Astro's import machinery. */
  worldIconHtml: string;
  caretIconHtml: string;
}

/**
 * Footer language toggle. Opens a popup listing the current language and all
 * alternates. Each link sets `?lang_pref=<code>` so Hugo (or the Astro
 * equivalent later) can remember the choice across sites. With only one
 * language configured, the popup just shows the current language — no
 * functional change, just visible parity with Hugo.
 */
export default function LanguageSelector({
  currentLang,
  alternates,
  worldIconHtml,
  caretIconHtml,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} class={cl('footer__lang-toggle')}>
      <button
        type="button"
        class={cl('footer__lang-button')}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
      >
        <span style="display:inline-flex;align-items:center;">
          <span style="display:inline-flex;align-items:center;" dangerouslySetInnerHTML={{ __html: worldIconHtml }} />
          &nbsp;
          <span class={cl('footer__lang-button-label')}>{currentLang.primary}</span>
        </span>
        <span
          class={`${cl('footer__lang-caret')} ${open ? cl('footer__lang-caret--open') : ''}`}
          dangerouslySetInnerHTML={{ __html: caretIconHtml }}
        />
      </button>

      <div
        class={`${cl('footer__lang-popup')} ${open ? cl('footer__lang-popup--open') : ''}`}
        role="listbox"
        hidden={!open}
      >
        <a class={cl('footer__lang-item')} href={currentLang.href}>
          <div class={cl('footer__lang-primary')}>{currentLang.primary}</div>
          <div class={cl('footer__lang-secondary')}>{currentLang.secondary}</div>
        </a>
        {alternates.map((opt) => (
          <a class={cl('footer__lang-item')} href={opt.href}>
            <div class={cl('footer__lang-primary')}>{opt.primary}</div>
            <div class={cl('footer__lang-secondary')}>{opt.secondary}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
