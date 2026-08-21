import { useEffect, useRef, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import styles from "./Lightbox.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";

const cl = classListFactory(styles);

interface DisplayedImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface LightboxProps {
  imageUrl: string;
  alt?: string;
  caption?: string;
  children: (onTriggerClick: (e: MouseEvent) => void) => ComponentChildren;
}

/**
 * Resizes an element/container pair to a max-90vw/90vh box, preserving the
 * image's aspect ratio. Ported from Hugo's global-modals.js `resize()` so
 * the lightbox scales images identically to the Bootstrap modal it replaces.
 */
function applyLightboxResize(
  imageElement: HTMLImageElement,
  dialogElement: HTMLDivElement,
  naturalWidth: number,
  naturalHeight: number,
) {
  if (!naturalWidth || !naturalHeight) return;

  const parentWidth = (window.innerWidth / 100) * 90;
  const parentHeight = (window.innerHeight / 100) * 90;

  let ratio = Math.max(
    naturalWidth / (parentWidth - 1),
    naturalHeight / (parentHeight - 1),
  );

  let width: number;
  let height: number;
  if (ratio > 1) {
    ratio = naturalHeight / Math.floor(naturalHeight / ratio);
    width = naturalWidth / ratio;
    height = naturalHeight / ratio;
  } else {
    width = naturalWidth;
    height = naturalHeight;
  }

  imageElement.style.width = `${width}px`;
  imageElement.style.height = `${height}px`;
  dialogElement.style.width = `${width}px`;
  dialogElement.style.height = `${height}px`;
}

/**
 * Builds a lightbox image URL sized to the current viewport (capped by DPR),
 * so opening the lightbox doesn't download the full original resolution just
 * to shrink it with CSS. Ported from Hugo's global-modals.js.
 */
function buildViewportSizedUrl(imageUrl: string): string {
  const width = Math.round(window.innerWidth);
  const height = Math.round(window.innerHeight);
  const dpr = Math.round(window.devicePixelRatio || 1);
  return `${imageUrl}?fit=max&auto=format&w=${width}&h=${height}&dpr=${dpr}`;
}

/**
 * Owns the overlay/dialog markup and all lightbox state. The trigger element
 * (a popup link, normally) is supplied via `children`, a render function that
 * receives the click handler to wire up — this keeps the trigger's own markup
 * (figure/caption/link) outside Lightbox, since only the overlay is common
 * between images that show a lightbox and those that don't.
 */
export default function Lightbox({ imageUrl, alt, caption, children }: LightboxProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayed, setDisplayed] = useState<DisplayedImage | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lightboxImageRef = useRef<HTMLImageElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      // The dialog has no focusable content (Hugo's modal has no close
      // button either), so trap Tab on the dialog itself rather than
      // cycling between real elements.
      if (e.key === "Tab") {
        e.preventDefault();
        dialogRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setDisplayed(null);
      setLoading(false);
      return;
    }
    function handleResize() {
      const imageElement = lightboxImageRef.current;
      const dialogElement = dialogRef.current;
      if (!imageElement || !dialogElement) return;
      applyLightboxResize(
        imageElement,
        dialogElement,
        imageElement.naturalWidth,
        imageElement.naturalHeight,
      );
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  function handleTriggerClick(e: MouseEvent) {
    e.preventDefault();
    triggerRef.current = e.currentTarget as HTMLElement;
    setDisplayed({ src: buildViewportSizedUrl(imageUrl), alt, caption });
    setLoading(true);
    setOpen(true);
  }

  function handleOverlayClick(e: MouseEvent) {
    if (e.target === overlayRef.current) setOpen(false);
  }

  function handleLightboxImageLoad() {
    const imageElement = lightboxImageRef.current;
    const dialogElement = dialogRef.current;
    if (imageElement && dialogElement) {
      applyLightboxResize(
        imageElement,
        dialogElement,
        imageElement.naturalWidth,
        imageElement.naturalHeight,
      );
    }
    setLoading(false);
  }

  return (
    <>
      {children(handleTriggerClick)}
      <div
        ref={overlayRef}
        class={cl("img-lightbox__overlay")}
        role="dialog"
        aria-modal="true"
        aria-label={displayed?.alt || "Image preview"}
        aria-hidden={!open}
        hidden={!open}
        onClick={handleOverlayClick}
      >
        <div ref={dialogRef} class={cl("img-lightbox__dialog")} tabIndex={-1}>
          {open && displayed && (
            <>
              {loading && <div class={cl("img-lightbox__spinner")} />}
              <img
                ref={lightboxImageRef}
                class={cl("img-lightbox__image")}
                src={displayed.src}
                alt={displayed.alt}
                style={{ display: loading ? "none" : "block" }}
                onLoad={handleLightboxImageLoad}
              />
              {displayed.caption && (
                <p class={cl("img-lightbox__caption")}>{displayed.caption}</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
