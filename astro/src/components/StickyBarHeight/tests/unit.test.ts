// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  CONTENT_HEIGHT_PROPERTY,
  startStickyBarHeight,
  trackStickyBar,
} from "../stickyBarHeight";

// happy-dom has no layout engine and no working ResizeObserver, so these tests
// fake both. The browser tests cover the real layout.

type ResizeCallback = (entries: { contentRect: { height: number } }[]) => void;
let resizeCallbacks: ResizeCallback[] = [];

class FakeResizeObserver {
  callback: ResizeCallback;
  constructor(callback: ResizeCallback) {
    this.callback = callback;
  }
  observe() {
    resizeCallbacks.push(this.callback);
  }
  disconnect() {
    resizeCallbacks = resizeCallbacks.filter(
      (callback) => callback !== this.callback,
    );
  }
}

/** Reports a new content height to every observer, as a resize would. */
function resizeBar(height: number) {
  for (const callback of [...resizeCallbacks]) {
    callback([{ contentRect: { height } }]);
  }
}

function fakeRect(
  element: Element,
  rect: { top?: number; bottom?: number; height?: number },
) {
  vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
    top: 0,
    bottom: 0,
    height: 0,
    ...rect,
  } as DOMRect);
}

/** A sticky bar 100px tall with 9px + 18px padding: 73px of content. */
function addBar(): HTMLElement {
  const bar = document.createElement("div");
  bar.setAttribute("data-sticky-bar", "");
  bar.style.paddingTop = "9px";
  bar.style.paddingBottom = "18px";
  document.body.append(bar);
  fakeRect(bar, { height: 100, bottom: 160 });
  return bar;
}

/** An anchor target at the given viewport top, with a scrollIntoView spy. */
function addTarget(top: number) {
  const target = document.createElement("h2");
  target.id = "target";
  document.body.append(target);
  fakeRect(target, { top });
  const scrollIntoView = vi.fn();
  target.scrollIntoView = scrollIntoView;
  return scrollIntoView;
}

const contentHeight = () =>
  document.documentElement.style.getPropertyValue(CONTENT_HEIGHT_PROPERTY);

let stop: () => void = () => {};

beforeEach(() => {
  resizeCallbacks = [];
  vi.stubGlobal("ResizeObserver", FakeResizeObserver);
  history.replaceState(null, "", "/api/latest/page/");
});

afterEach(() => {
  stop();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  document.body.replaceChildren();
  document.documentElement.style.removeProperty(CONTENT_HEIGHT_PROPERTY);
});

describe("trackStickyBar height", () => {
  it("publishes the bar's content height, without padding", () => {
    addBar();
    stop = trackStickyBar();
    expect(contentHeight()).toBe("73px");
  });

  it("updates the height when the bar resizes", () => {
    addBar();
    stop = trackStickyBar();
    resizeBar(97);
    expect(contentHeight()).toBe("97px");
  });

  it("does nothing on a page without a sticky bar", () => {
    stop = trackStickyBar();
    expect(contentHeight()).toBe("");
  });

  it("removes the height and stops observing when stopped", () => {
    addBar();
    trackStickyBar()();
    expect(contentHeight()).toBe("");
    expect(resizeCallbacks).toHaveLength(0);
  });
});

describe("trackStickyBar re-align", () => {
  // The bar's bottom edge is at 160px (see addBar).
  it("scrolls a covered anchor target back into view when the bar grows", () => {
    history.replaceState(null, "", "#target");
    addBar();
    const scrollIntoView = addTarget(150);
    stop = trackStickyBar();

    resizeBar(97);
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "start" });
  });

  it("doesn't scroll when the target isn't covered", () => {
    history.replaceState(null, "", "#target");
    addBar();
    const scrollIntoView = addTarget(200);
    stop = trackStickyBar();

    resizeBar(97);
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("doesn't scroll when the bar shrinks", () => {
    history.replaceState(null, "", "#target");
    addBar();
    const scrollIntoView = addTarget(150);
    stop = trackStickyBar();

    resizeBar(50);
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("doesn't scroll on a page opened without a hash", () => {
    addBar();
    const scrollIntoView = addTarget(150);
    stop = trackStickyBar();

    resizeBar(97);
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("stops after the reader scrolls", () => {
    history.replaceState(null, "", "#target");
    addBar();
    const scrollIntoView = addTarget(150);
    stop = trackStickyBar();

    window.dispatchEvent(new Event("wheel"));
    resizeBar(97);
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("starts again when the reader clicks a link on the same page", () => {
    history.replaceState(null, "", "#target");
    addBar();
    const scrollIntoView = addTarget(150);
    stop = trackStickyBar();
    const link = document.createElement("a");
    link.href = "#target";
    document.body.append(link);

    link.dispatchEvent(new Event("pointerdown", { bubbles: true }));
    link.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    resizeBar(97);
    expect(scrollIntoView).toHaveBeenCalled();
  });

  it("doesn't start again for a link to another page", () => {
    history.replaceState(null, "", "#target");
    addBar();
    const scrollIntoView = addTarget(150);
    stop = trackStickyBar();
    const link = document.createElement("a");
    link.href = "/api/latest/other/#target";
    link.addEventListener("click", (event) => event.preventDefault());
    document.body.append(link);

    link.dispatchEvent(new Event("pointerdown", { bubbles: true }));
    link.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    resizeBar(97);
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("checks right away on a hash change, in case the bar already grew", () => {
    addBar();
    const scrollIntoView = addTarget(150);
    stop = trackStickyBar();

    history.replaceState(null, "", "#target");
    window.dispatchEvent(new Event("hashchange"));
    expect(scrollIntoView).toHaveBeenCalled();
  });
});

describe("startStickyBarHeight", () => {
  it("tracks the new page's bar after a client-side navigation", () => {
    const firstBar = addBar();
    startStickyBarHeight();
    expect(resizeCallbacks).toHaveLength(1);

    firstBar.remove();
    const secondBar = addBar();
    fakeRect(secondBar, { height: 60 });
    document.dispatchEvent(new Event("astro:after-swap"));

    expect(resizeCallbacks).toHaveLength(1);
    expect(contentHeight()).toBe("33px");
  });
});
