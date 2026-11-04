import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./CopyPageButton.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { markSelfAsHydrated } from "@lib/componentUtils/markSelfAsHydrated";
import { loadPageText } from "./pageTextLoader";
import clipboardIcon from "../../assets/images/svg-icons/clipboard.svg?raw";
import clipboardSuccessIcon from "../../assets/images/svg-icons/clipboard-success.svg?raw";

const cl = classListFactory(styles);

export interface CopyPageButtonLabels {
  "Copy page": string;
  Copied: string;
}

export type CopyPageButtonVariant = "default" | "icon";

interface CopyPageButtonProps {
  labels: CopyPageButtonLabels;
  variant?: CopyPageButtonVariant;
  // For the 'icon' variant only. CSS selector for the element this button
  // shadows: when the target scrolls behind the sticky toolbar this button
  // appears in its place. Defaults to the page's main (non-icon)
  // CopyPageButton.
  watchTargetSelector?: string;
  // For the 'icon' variant only. CSS selector for the sticky container
  // whose bottom edge marks where `watchTargetSelector` is considered
  // hidden. Defaults to the closest `.api-toolbar` ancestor.
  stickyAnchorSelector?: string;
}

export function CopyPageButton({
  labels,
  variant = "default",
  watchTargetSelector = ".copy-page-button:not(.copy-page-button--icon)",
  stickyAnchorSelector = ".api-toolbar",
}: CopyPageButtonProps) {
  const isIcon = variant === "icon";
  const [copied, setCopied] = useState(false);
  // The icon variant stays hidden until the watch target scrolls behind
  // the sticky toolbar. The default variant is always visible.
  const [floatingVisible, setFloatingVisible] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    markSelfAsHydrated(ref);
  }, []);

  useEffect(() => {
    if (!isIcon) {
      return;
    }
    const button = ref.current;
    if (!button) {
      return;
    }
    const target = document.querySelector(watchTargetSelector);
    const anchor = button.closest(stickyAnchorSelector);
    if (!target || !anchor) {
      return;
    }
    // Compare the target's bottom edge to the sticky toolbar's bottom
    // edge in viewport coords. IntersectionObserver against the viewport
    // would only fire once the target left the *whole* viewport — long
    // after it disappeared behind the sticky region. Sampling on each
    // scroll frame avoids that lag and stays correct across mobile vs.
    // desktop sticky offsets (which differ via CSS vars) without having
    // to recompute a rootMargin on resize.
    const update = () => {
      const anchorBottom = anchor.getBoundingClientRect().bottom;
      const targetBottom = target.getBoundingClientRect().bottom;
      setFloatingVisible(targetBottom <= anchorBottom);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isIcon, watchTargetSelector, stickyAnchorSelector]);

  const handleMouseEnter = () => {
    loadPageText();
  };

  const handleClick = async () => {
    const text = await loadPageText();
    await navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const buttonClass = cl(
    "copy-page-button",
    ...(isIcon ? ["copy-page-button--icon"] : []),
    ...(isIcon && floatingVisible ? ["copy-page-button--icon-visible"] : []),
  );

  // Both labels render at all times; only one is visible. Stacking them in
  // the same grid cell locks the label slot to the width of the longer
  // string, so swapping between "Copy page" and "Copied" doesn't reflow
  // the icon or the surrounding layout.
  return (
    <button
      ref={ref}
      class={buttonClass}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      aria-label={copied ? labels["Copied"] : labels["Copy page"]}
      title={isIcon ? labels["Copy page"] : undefined}
    >
      <span
        class={cl("copy-page-button__icon")}
        dangerouslySetInnerHTML={{
          __html: copied ? clipboardSuccessIcon : clipboardIcon,
        }}
      />
      {!isIcon && (
        <span class={cl("copy-page-button__label")}>
          <span
            class={
              copied
                ? cl("copy-page-button__label-text")
                : cl(
                    "copy-page-button__label-text",
                    "copy-page-button__label-text--visible",
                  )
            }
            aria-hidden={copied ? "true" : undefined}
          >
            {labels["Copy page"]}
          </span>
          <span
            class={
              copied
                ? cl(
                    "copy-page-button__label-text",
                    "copy-page-button__label-text--visible",
                  )
                : cl("copy-page-button__label-text")
            }
            aria-hidden={copied ? undefined : "true"}
          >
            {labels["Copied"]}
          </span>
        </span>
      )}
    </button>
  );
}
