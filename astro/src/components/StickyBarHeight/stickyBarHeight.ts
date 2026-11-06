/**
 * Keeps the anchor scroll offset in step with a sticky bar that sizes to its
 * content, such as the API toolbar, whose breadcrumb title wraps with the
 * title length and window width.
 *
 * Publishes the bar's content height (without padding) on <html> as
 * `--sticky-bar-content-height`. The layout adds the bar's padding to get
 * `--sticky-bar-height`, which `global.css` adds to `scroll-padding-top`.
 * It measures the content, not the whole bar, because the bar's padding can
 * change on scroll; the layout knows which padding applies after a jump.
 *
 * The bar can also grow right after a jump (for example, when the API
 * toolbar's copy icon appears and the title wraps again). The browser doesn't
 * redo a jump that already happened, so when the bar grows over the anchor
 * target, this scrolls the target back into view. It stops once the reader
 * scrolls, taps, clicks, or presses a key, and starts again on the next jump.
 */

/** Marks the sticky bar to measure. One per page. */
export const STICKY_BAR_SELECTOR = "[data-sticky-bar]";

export const CONTENT_HEIGHT_PROPERTY = "--sticky-bar-content-height";

const READER_INPUT_EVENTS = [
  "wheel",
  "touchstart",
  "pointerdown",
  "keydown",
] as const;

/**
 * Starts on the page's sticky bar, if it has one, and again after each
 * client-side navigation (Astro's ClientRouter swaps the document without
 * rerunning bundled scripts).
 */
export function startStickyBarHeight(): void {
  let stop = trackStickyBar();
  document.addEventListener("astro:after-swap", () => {
    stop();
    stop = trackStickyBar();
  });
}

/** Tracks the page's sticky bar. Returns a function that stops tracking. */
export function trackStickyBar(): () => void {
  const bar = document.querySelector<HTMLElement>(STICKY_BAR_SELECTOR);
  if (!bar) return () => {};

  let contentHeight = measureContentHeight(bar);
  publishContentHeight(contentHeight);

  const realign = createRealign(bar);
  const stopRealign = realign.start();

  const observer = new ResizeObserver(([entry]) => {
    const height = entry.contentRect.height;
    if (height === contentHeight) return;
    const grew = height > contentHeight;
    contentHeight = height;
    publishContentHeight(height);
    if (grew) realign.realignCoveredTarget();
  });
  observer.observe(bar);

  return () => {
    observer.disconnect();
    stopRealign();
    document.documentElement.style.removeProperty(CONTENT_HEIGHT_PROPERTY);
  };
}

function measureContentHeight(bar: HTMLElement): number {
  const style = getComputedStyle(bar);
  return (
    bar.getBoundingClientRect().height -
    parseFloat(style.paddingTop) -
    parseFloat(style.paddingBottom)
  );
}

function publishContentHeight(height: number): void {
  document.documentElement.style.setProperty(
    CONTENT_HEIGHT_PROPERTY,
    `${height}px`,
  );
}

function anchorTarget(): HTMLElement | null {
  const id = decodeURIComponent(location.hash.slice(1));
  return id ? document.getElementById(id) : null;
}

function isSamePageLink(target: EventTarget | null): boolean {
  const link =
    target instanceof Element
      ? target.closest<HTMLAnchorElement>("a[href*='#']")
      : null;
  return Boolean(link && link.hash && link.pathname === location.pathname);
}

/** Decides when a covered anchor target may be scrolled back into view. */
function createRealign(bar: HTMLElement) {
  // True from a jump until the reader takes over.
  let allowed = location.hash !== "";

  const realignCoveredTarget = () => {
    if (!allowed) return;
    const target = anchorTarget();
    if (!target) return;
    const covered =
      target.getBoundingClientRect().top < bar.getBoundingClientRect().bottom;
    // `scrollIntoView` honors the updated `scroll-padding-top`.
    if (covered) target.scrollIntoView({ block: "start" });
  };

  const onReaderInput = () => {
    allowed = false;
  };
  // A click on an in-page link comes after its pointerdown or keydown, and
  // before the jump. The bar can grow before hashchange fires, so waiting for
  // hashchange would be too late. This also covers a link to the hash already
  // in the URL, which jumps without a hashchange.
  const onClick = (event: MouseEvent) => {
    if (isSamePageLink(event.target)) allowed = true;
  };
  // Hash changes without a click (back, forward, or a script). The bar may
  // already have grown, so check right away too.
  const onHashChange = () => {
    allowed = true;
    realignCoveredTarget();
  };

  const start = () => {
    for (const type of READER_INPUT_EVENTS) {
      window.addEventListener(type, onReaderInput, {
        capture: true,
        passive: true,
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("hashchange", onHashChange);

    return () => {
      for (const type of READER_INPUT_EVENTS) {
        window.removeEventListener(type, onReaderInput, { capture: true });
      }
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("hashchange", onHashChange);
    };
  };

  return { start, realignCoveredTarget };
}
