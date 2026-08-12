import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./ImgLightbox.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";

const cl = classListFactory(styles);

interface DisplayedImage {
  src: string;
  alt?: string;
  caption?: string;
}

/**
 * Resizes an element/container pair to a max-90vw/90vh box, preserving the
 * image's aspect ratio. Ported from Hugo's global-modals.js `resize()` so
 * the lightbox scales images identically to the Bootstrap modal it replaces.
 */
function applyHugoResize(
  imageElement: HTMLImageElement,
  dialogElement: HTMLDivElement,
  naturalWidth: number,
  naturalHeight: number,
) {
  if (!naturalWidth || !naturalHeight) return;

  const parentWidth = (window.innerWidth / 100) * 90;
  const parentHeight = (window.innerHeight / 100) * 90;

  imageElement.style.width = "";
  imageElement.style.height = "";
  dialogElement.style.width = "";
  dialogElement.style.height = "";

  let ratio = Math.max(naturalWidth / (parentWidth - 1), naturalHeight / (parentHeight - 1));

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

export default function ImgLightbox() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayed, setDisplayed] = useState<DisplayedImage | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    function handleTriggerClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const trigger = target.closest<HTMLElement>(".img__link--popup");
      if (!trigger) return;
      e.preventDefault();

      const src = trigger.getAttribute("data-lightbox-src");
      if (!src) return;
      const alt = trigger.getAttribute("data-lightbox-alt") ?? undefined;
      const caption =
        trigger.closest("figure")?.querySelector("figcaption")?.textContent ?? undefined;

      setDisplayed({ src, alt, caption });
      setLoading(true);
      setOpen(true);
    }
    document.addEventListener("click", handleTriggerClick);
    return () => document.removeEventListener("click", handleTriggerClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setDisplayed(null);
      setLoading(false);
      return;
    }
    function handleResize() {
      const imageElement = imageRef.current;
      const dialogElement = dialogRef.current;
      if (!imageElement || !dialogElement) return;
      applyHugoResize(
        imageElement,
        dialogElement,
        imageElement.naturalWidth,
        imageElement.naturalHeight,
      );
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  function handleOverlayClick(e: MouseEvent) {
    if (e.target === overlayRef.current) setOpen(false);
  }

  function handleImageLoad() {
    const imageElement = imageRef.current;
    const dialogElement = dialogRef.current;
    if (imageElement && dialogElement) {
      applyHugoResize(
        imageElement,
        dialogElement,
        imageElement.naturalWidth,
        imageElement.naturalHeight,
      );
    }
    setLoading(false);
  }

  return (
    <div
      ref={overlayRef}
      class={cl("img-lightbox__overlay")}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      hidden={!open}
      onClick={handleOverlayClick}
    >
      <div ref={dialogRef} class={cl("img-lightbox__dialog")}>
        {open && displayed && (
          <>
            {loading && <div class={cl("img-lightbox__spinner")} />}
            <img
              ref={imageRef}
              class={cl("img-lightbox__image")}
              src={displayed.src}
              alt={displayed.alt}
              style={{ display: loading ? "none" : "block" }}
              onLoad={handleImageLoad}
            />
            {displayed.caption && (
              <p class={cl("img-lightbox__caption")}>{displayed.caption}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
