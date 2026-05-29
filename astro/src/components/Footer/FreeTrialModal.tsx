import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './Footer.module.css';
import { classListFactory } from '@lib/cssUtils/classListFactory';

const cl = classListFactory(styles);

interface Props {
  title: string;
  /** URL loaded in the embedded iframe. Swap this to move off app.datadoghq.com. */
  iframeSrc: string;
}

/**
 * Portable free-trial modal. Listens for any click on an element with
 * `data-trigger="free-trial"` and opens. Closes on Escape, backdrop click,
 * or the × button. Uses a plain div-based modal (not <dialog>) to avoid
 * test-environment quirks around dialog focus trapping.
 */
export default function FreeTrialModal({ title, iframeSrc }: Props) {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleTriggerClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const trigger = target.closest<HTMLElement>('[data-trigger="free-trial"]');
      if (!trigger) return;
      e.preventDefault();
      setOpen(true);
    }
    document.addEventListener('click', handleTriggerClick);
    return () => document.removeEventListener('click', handleTriggerClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    // Pull focus back onto the close button so a cross-origin iframe can't
    // steal Escape keypresses once it finishes loading.
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  function handleOverlayClick(e: MouseEvent) {
    if (e.target === overlayRef.current) setOpen(false);
  }

  return (
    <div
      ref={overlayRef}
      class={`${cl('free-trial-modal__overlay')} ${open ? cl('free-trial-modal__overlay--open') : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      aria-hidden={!open}
      hidden={!open}
      onClick={handleOverlayClick}
    >
      <div class={cl('free-trial-modal__dialog')}>
        <div class={cl('free-trial-modal__header')}>
          <h6 class={cl('free-trial-modal__title')}>{title}</h6>
          <button
            ref={closeButtonRef}
            type="button"
            class={cl('free-trial-modal__close')}
            aria-label="close"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class={cl('free-trial-modal__body')}>
          {open && (
            <iframe
              class={cl('free-trial-modal__iframe')}
              src={iframeSrc}
              title={title}
              width="100%"
              height="600"
              frameborder="0"
            />
          )}
        </div>
      </div>
    </div>
  );
}
