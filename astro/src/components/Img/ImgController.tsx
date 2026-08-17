import { useEffect, useRef, useState } from "preact/hooks";
import type { JSX } from "preact";
import styles from "./ImgController.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";

const cl = classListFactory(styles);

interface ImgControllerProps {
  imageUrl: string;
  srcset: string;
  popupHref: string;
  alt?: string;
  caption?: string;
  width?: string;
  height?: string;
  widthPercent?: number;
  inline?: boolean;
  popup?: boolean;
}

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
function applyLightboxResize(
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

interface SizingProps {
  width?: string;
  height?: string;
  widthPercent?: number;
}

function PictureImage({
  srcset,
  alt,
  width,
  height,
  widthPercent,
}: SizingProps & { srcset: string; alt?: string }) {
  return (
    <picture>
      <img
        class={cl("img__image")}
        srcset={srcset}
        style={widthPercent ? { width: `${widthPercent}%` } : undefined}
        width={width}
        height={height}
        alt={alt}
      />
    </picture>
  );
}

interface FigureWithLightboxProps extends SizingProps {
  srcset: string;
  alt?: string;
  caption?: string;
  popup: boolean;
  popupHref: string;
  onTriggerClick: (e: MouseEvent) => void;
}

function FigureWithLightbox({
  srcset,
  alt,
  caption,
  popup,
  popupHref,
  width,
  height,
  widthPercent,
  onTriggerClick,
}: FigureWithLightboxProps) {
  const image = (
    <PictureImage
      srcset={srcset}
      alt={alt}
      width={width}
      height={height}
      widthPercent={widthPercent}
    />
  );

  return (
    <figure class={cl("img__figure")}>
      {popup ? (
        <a
          href={popupHref}
          class={cl("img__link", "img__link--popup")}
          onClick={onTriggerClick}
        >
          {image}
        </a>
      ) : (
        image
      )}
      {caption && <figcaption class={cl("img__caption")}>{caption}</figcaption>}
    </figure>
  );
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

export default function ImgController({
  imageUrl,
  srcset,
  popupHref,
  alt,
  caption,
  width,
  height,
  widthPercent,
  inline = false,
  popup = true,
}: ImgControllerProps) {
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

  let media: JSX.Element;
  const showsLightbox = !inline && popup;
  if (inline) {
    media = (
      <PictureImage
        srcset={srcset}
        alt={alt}
        width={width}
        height={height}
        widthPercent={widthPercent}
      />
    );
  } else {
    media = (
      <FigureWithLightbox
        srcset={srcset}
        alt={alt}
        caption={caption}
        popup={popup}
        popupHref={popupHref}
        width={width}
        height={height}
        widthPercent={widthPercent}
        onTriggerClick={handleTriggerClick}
      />
    );
  }

  if (!showsLightbox) {
    return media;
  }

  return (
    <>
      {media}
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
        <div
          ref={dialogRef}
          class={cl("img-lightbox__dialog")}
          tabIndex={-1}
        >
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
