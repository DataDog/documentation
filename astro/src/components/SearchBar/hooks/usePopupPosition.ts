import { useEffect, useState } from "preact/hooks";

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
 */
export function usePopupPosition(
  anchorRef: { current: HTMLElement | null },
  active: boolean,
): PopupRect | null {
  const [rect, setRect] = useState<PopupRect | null>(null);

  useEffect(() => {
    if (!active) return;
    const recompute = () => {
      const el = anchorRef.current;
      // An anchor that isn't laid out (the hidden half of the 992px
      // breakpoint pair) has no client rects, but `getBoundingClientRect`
      // still reports a zeroed one — which would strand the popup at the
      // top-left corner with zero width when the viewport crosses 992px.
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
