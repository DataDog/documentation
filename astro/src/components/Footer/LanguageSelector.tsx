import { useEffect, useRef, useState } from 'preact/hooks';

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
  classes: {
    wrapper: string;
    button: string;
    buttonLabel: string;
    caret: string;
    caretOpen: string;
    popup: string;
    popupOpen: string;
    item: string;
    primary: string;
    secondary: string;
  };
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
  classes,
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
    <div
      ref={wrapperRef}
      class={`${classes.wrapper} footer-lang-toggle`}
      data-testid="footer-language-selector"
    >
      <button
        type="button"
        class={classes.button}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
      >
        <span style="display:inline-flex;align-items:center;">
          <span style="display:inline-flex;align-items:center;" dangerouslySetInnerHTML={{ __html: worldIconHtml }} />
          &nbsp;
          <span class={classes.buttonLabel}>{currentLang.primary}</span>
        </span>
        <span
          class={`${classes.caret} ${open ? classes.caretOpen : ''}`}
          dangerouslySetInnerHTML={{ __html: caretIconHtml }}
        />
      </button>

      <div
        class={`${classes.popup} ${open ? classes.popupOpen : ''}`}
        role="listbox"
        hidden={!open}
      >
        <a class={classes.item} href={currentLang.href}>
          <div class={classes.primary}>{currentLang.primary}</div>
          <div class={classes.secondary}>{currentLang.secondary}</div>
        </a>
        {alternates.map((opt) => (
          <a class={classes.item} href={opt.href}>
            <div class={classes.primary}>{opt.primary}</div>
            <div class={classes.secondary}>{opt.secondary}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
