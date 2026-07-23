import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./MobileNav.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import {
  loadExternalContext,
  type ExternalContext,
} from "@lib/componentUtils/loadExternalContext";
import { markSelfAsHydrated } from "@lib/componentUtils/markSelfAsHydrated";

const cl = classListFactory(styles);

export interface MobileNavLabels {
  "Toggle navigation": string;
}

interface Props {
  labels: MobileNavLabels;
  /**
   * References the build-time-rendered overlay and backdrop. The accordion menu
   * itself is rendered in `MobileNav.astro`, never serialized into this island.
   */
  externalContext: ExternalContext<{ overlay: string; backdrop: string }>;
}

/**
 * The hamburger button plus the open/close behavior for the mobile overlay.
 * The overlay and its (large) menu tree live in the DOM already; this island
 * only flips the plain `mobile-nav__panel--open` / `mobile-nav__backdrop--open`
 * modifier classes (it can't reference the hashed module names) and the body
 * scroll lock. The toggle is applied synchronously in the click handler so the
 * panel never lags behind the button state.
 */
export default function MobileNavToggle({ labels, externalContext }: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLElement | null>(null);
  const backdropRef = useRef<HTMLElement | null>(null);

  function applyOpen(next: boolean) {
    overlayRef.current?.classList.toggle("mobile-nav__panel--open", next);
    backdropRef.current?.classList.toggle("mobile-nav__backdrop--open", next);
    document.documentElement.style.overflow = next ? "hidden" : "";
  }

  function setOpenState(next: boolean) {
    setOpen(next);
    applyOpen(next);
  }

  useEffect(() => {
    // Signal hydration so tests (and any consumer) can wait for the click
    // handler to be live before interacting with the toggle.
    markSelfAsHydrated(buttonRef);

    const loaded = loadExternalContext(externalContext);
    if (!loaded) {
      return;
    }
    overlayRef.current = loaded.overlay;
    backdropRef.current = loaded.backdrop;

    const close = () => setOpenState(false);
    backdropRef.current.addEventListener("click", close);
    return () => {
      backdropRef.current?.removeEventListener("click", close);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      class={`${cl("mobile-nav__hamburger")} ${open ? cl("mobile-nav__hamburger--open") : ""} navbar-toggler ${open ? "open" : ""}`}
      aria-expanded={open}
      aria-label={labels["Toggle navigation"]}
      onClick={() => setOpenState(!open)}
    >
      <span class={`${cl("mobile-nav__hamburger-bar")} icon-bar`} />
      <span class={`${cl("mobile-nav__hamburger-bar")} icon-bar`} />
      <span class={`${cl("mobile-nav__hamburger-bar")} icon-bar`} />
    </button>
  );
}
