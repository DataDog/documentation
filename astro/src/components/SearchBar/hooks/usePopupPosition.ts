import { useLayoutEffect, useState } from "preact/hooks";

export interface PopupRect {
  top: number;
  left: number;
  width: number;
}

/**
 * Tracks the bounding rect of an anchor element while `active` is true.
 * The popup is `position: fixed` so it escapes ancestor `overflow: auto`
 * clips and stacking contexts; we recompute on resize and capture-phase
 * scrolls so the popup follows any ancestor that scrolls.
 *
 * A layout effect, so the rect is measured before the popup paints. The rect
 * is cleared on deactivation so a reopen never paints at the old position.
 */
export function usePopupPosition(
  anchorRef: { current: HTMLElement | null },
  active: boolean,
): PopupRect | null {
  const [rect, setRect] = useState<PopupRect | null>(null);

  useLayoutEffect(() => {
    if (!active) {
      setRect(null);
      return;
    }
    const recompute = () => {
      const el = anchorRef.current;
      // A `display: none` anchor (the hidden island at the 992px breakpoint)
      // has no client rects, but `getBoundingClientRect` still returns a
      // zeroed rect, which would pin the popup to the top-left corner.
      if (!el || el.getClientRects().length === 0) {
        setRect(null);
        return;
      }
      const r = el.getBoundingClientRect();
      setRect({ top: r.bottom, left: r.left, width: r.width });
    };
    recompute();
    window.addEventListener("resize", recompute);
    window.addEventListener("scroll", recompute, true);
    return () => {
      window.removeEventListener("resize", recompute);
      window.removeEventListener("scroll", recompute, true);
    };
  }, [active, anchorRef]);

  return rect;
}
