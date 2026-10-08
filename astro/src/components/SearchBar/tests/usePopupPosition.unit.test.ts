// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { renderHook, cleanup } from "@testing-library/preact";
import { usePopupPosition } from "../hooks/usePopupPosition";

afterEach(() => {
  cleanup();
});

/** An anchor that reports a laid-out rect at the given position. */
function makeLaidOutAnchor(rect: { top: number; left: number; width: number }) {
  const anchor = document.createElement("form");
  const domRect = {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    bottom: rect.top + 40,
  } as DOMRect;
  anchor.getClientRects = () => [domRect] as unknown as DOMRectList;
  anchor.getBoundingClientRect = () => domRect;
  return anchor;
}

describe("usePopupPosition", () => {
  it("reports the anchor's position while active", () => {
    const anchorRef = {
      current: makeLaidOutAnchor({ top: 10, left: 20, width: 300 }),
    };
    const { result } = renderHook(() => usePopupPosition(anchorRef, true));

    expect(result.current).toEqual({ top: 50, left: 20, width: 300 });
  });

  it("forgets the position when deactivated, so a reopen never paints at the old spot", () => {
    const anchorRef = {
      current: makeLaidOutAnchor({ top: 10, left: 20, width: 300 }),
    };
    const { result, rerender } = renderHook(
      ({ active }: { active: boolean }) => usePopupPosition(anchorRef, active),
      { initialProps: { active: true } },
    );
    expect(result.current).not.toBeNull();

    rerender({ active: false });

    expect(result.current).toBeNull();
  });

  it("reports null for an anchor that isn't laid out", () => {
    const anchor = document.createElement("form");
    anchor.getClientRects = () => [] as unknown as DOMRectList;
    const { result } = renderHook(() =>
      usePopupPosition({ current: anchor }, true),
    );

    expect(result.current).toBeNull();
  });
});
