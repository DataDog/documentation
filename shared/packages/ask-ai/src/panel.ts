import { addMessageActions, injectCodeCopyButtons } from "./actions";
import { ActivityTimeline, type ActivitySummary } from "./activity";
import {
  DocsAiRequestError,
  sendDocsAiFeedback,
  streamDocsAiChat,
  type ServerErrorEvent,
} from "./client";
import type { DocsAiCredentials } from "./config";
import { logAction, logError } from "./logger";
import {
  extractSources,
  inlineRefChips,
  parseMarkdown,
  renderMessageWithSources,
} from "./markdown";
import {
  buildEmptyState,
  buildMessage,
  buildSuggestionButton,
  buildTurnError,
  buildWidgetElements,
} from "./markup";
import {
  buildSourceCards,
  closeAllSourceTooltips,
  repositionTooltip,
  showSourceTooltip,
} from "./sources";
import stylesheet from "./styles.css";
import { STRINGS } from "./strings";
import { pickQuestions } from "./suggestedQuestions";
import type {
  AskAiActionPayload,
  ChatMessage,
  Dimension,
  FeedbackSender,
  LogContext,
  LogContextProvider,
  ResizableMode,
  ResizableModeTable,
  ResizeAxis,
  SizeConfig,
  TriggerSource,
  ViewMode,
} from "./types";

export interface AskAiPanelOptions {
  credentials: DocsAiCredentials;
  /**
   * Read at log time, so a status that resolves after mount is still reported.
   * Absent, or returning `undefined`, omits the tag rather than sending `false`.
   */
  getIsDatadogUser?: () => boolean | undefined;
}

const INTERNAL_CONVERSATION_ID_PREFIX = "dd_docsai_";

/** Shortest query `ask()` will submit on the reader's behalf. */
const AUTO_SUBMIT_MIN_LENGTH = 10;
/** Delay before an auto-submitted query is sent, so the open animation runs. */
const AUTO_SUBMIT_DELAY_MS = 100;
/** Delay before the input takes focus, for the same reason. */
const FOCUS_DELAY_MS = 300;

/** Minimum gap between re-renders of a partial answer. */
const RENDER_THROTTLE_MS = 50;

/** Client errors a retry can still fix: a timeout and rate limiting. */
const RETRYABLE_CLIENT_STATUSES = [408, 429];

/** How close to the bottom counts as "following along", in px. */
const NEAR_BOTTOM_PX = 100;
/** Ceiling on the auto-grown input, in px. */
const MAX_INPUT_HEIGHT_PX = 120;

const VIEW_MODES: readonly ViewMode[] = ["fullscreen", "floating", "sidebar"];
const DEFAULT_VIEW_MODE: ViewMode = "fullscreen";
const VIEW_MODE_STORAGE_KEY = "docs-ai-view-mode";

const RESIZABLE_MODES: ResizableModeTable = {
  sidebar: {
    width: {
      cssVar: "--docs-ai-sidebar-width",
      storageKey: "docs-ai-sidebar-width",
      default: 440,
      min: 280,
      maxPx: 800,
      maxViewportPct: 0.6,
      viewportOffset: 0,
    },
  },
  floating: {
    width: {
      cssVar: "--docs-ai-floating-width",
      storageKey: "docs-ai-floating-width",
      default: 500,
      min: 360,
      maxPx: 920,
      maxViewportPct: 0.9,
      viewportOffset: 24,
    },
    height: {
      cssVar: "--docs-ai-floating-height",
      storageKey: "docs-ai-floating-height",
      default: 570,
      min: 400,
      maxPx: 900,
      maxViewportPct: 0.85,
      viewportOffset: 24,
    },
  },
};

const HANDLE_AXES: Record<ResizeAxis, Dimension[]> = {
  left: ["width"],
  top: ["height"],
  corner: ["width", "height"],
};

const HANDLE_CURSORS: Record<ResizeAxis, string> = {
  left: "col-resize",
  top: "row-resize",
  corner: "nwse-resize",
};

// -- Stored preferences --------------------------------------------------------
//
// Every `localStorage` access is guarded: it throws outright in Safari private
// browsing, and a lost preference must not take the widget down with it.

function readStoredViewMode(): ViewMode {
  try {
    const stored = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
    return isViewMode(stored) ? stored : DEFAULT_VIEW_MODE;
  } catch {
    return DEFAULT_VIEW_MODE;
  }
}

function persistViewMode(mode: ViewMode): void {
  try {
    localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}

function readStoredSize(mode: ResizableMode, dimension: Dimension): number {
  const config = sizeConfig(mode, dimension);
  if (!config) return 0;

  try {
    const stored = localStorage.getItem(config.storageKey);
    const parsed = stored === null ? Number.NaN : Number.parseInt(stored, 10);
    return Number.isFinite(parsed) ? parsed : config.default;
  } catch {
    return config.default;
  }
}

function persistSize(
  mode: ResizableMode,
  dimension: Dimension,
  px: number,
): void {
  const config = sizeConfig(mode, dimension);
  if (!config) return;

  try {
    localStorage.setItem(config.storageKey, String(px));
  } catch {
    /* ignore */
  }
}

// -- Size table helpers --------------------------------------------------------

function sizeConfig(
  mode: ResizableMode,
  dimension: Dimension,
): SizeConfig | undefined {
  return RESIZABLE_MODES[mode][dimension];
}

function clampSize(
  mode: ResizableMode,
  dimension: Dimension,
  px: number,
): number {
  const config = sizeConfig(mode, dimension);
  if (!config) return px;

  const viewport =
    dimension === "width" ? window.innerWidth : window.innerHeight;
  const max = Math.min(config.maxPx, viewport * config.maxViewportPct);
  return Math.max(config.min, Math.min(px, max));
}

/** Visits every (mode, dimension) pair the table actually declares. */
function forEachResizable(
  visit: (mode: ResizableMode, dimension: Dimension) => void,
): void {
  for (const mode of Object.keys(RESIZABLE_MODES) as ResizableMode[]) {
    for (const dimension of Object.keys(RESIZABLE_MODES[mode]) as Dimension[]) {
      visit(mode, dimension);
    }
  }
}

// -- Narrowing helpers ---------------------------------------------------------

function isViewMode(value: string | null | undefined): value is ViewMode {
  return value != null && (VIEW_MODES as readonly string[]).includes(value);
}

function isResizeAxis(value: string | undefined): value is ResizeAxis {
  return value === "left" || value === "top" || value === "corner";
}

/** `Element.closest` from an event target, which is typed as an `EventTarget`. */
function closestFrom<T extends Element>(
  target: EventTarget | null,
  selector: string,
): T | null {
  return target instanceof Element ? target.closest<T>(selector) : null;
}

/** Markup this package built itself, so an absent node is a bug, not a state. */
function requireElement<T extends Element>(
  root: ParentNode,
  selector: string,
): T {
  const found = root.querySelector<T>(selector);
  if (!found) throw new Error(`[Ask AI] markup is missing ${selector}`);
  return found;
}

// -- Stylesheet ----------------------------------------------------------------
//
// One `<style>` for the document however many panels exist, counted so the last
// panel to go takes it with it. Hugo ships this through its SCSS pipeline
// instead; here the package owns it, because Astro has no such pipeline to hook.

const STYLE_MARKER = "data-ask-ai";
let panelsHoldingStyles = 0;

function retainStyles(): void {
  panelsHoldingStyles += 1;
  if (document.querySelector(`style[${STYLE_MARKER}]`)) return;

  const style = document.createElement("style");
  style.setAttribute(STYLE_MARKER, "");
  style.textContent = stylesheet;
  document.head.appendChild(style);
}

function releaseStyles(): void {
  panelsHoldingStyles = Math.max(0, panelsHoldingStyles - 1);
  if (panelsHoldingStyles > 0) return;

  document.querySelector(`style[${STYLE_MARKER}]`)?.remove();
}

// -- Turns ---------------------------------------------------------------------

/** A message row and the element its body goes in. */
interface MessageParts {
  messageElement: HTMLDivElement;
  contentElement: HTMLDivElement;
}

/** An assistant turn: the research timeline, then the answer body. */
interface AssistantTurn extends MessageParts {
  activity: ActivityTimeline;
}

interface TurnFailure {
  /** Shown instead of the default copy, when it is non-empty. */
  message?: string | undefined;
  retryable?: boolean;
  discardPartial?: boolean;
}

/**
 * Places the streaming caret at the end of the last block of a partially
 * rendered answer.
 */
function appendStreamCaret(container: HTMLElement): void {
  const blocks = container.querySelectorAll(
    "p, li, h1, h2, h3, h4, h5, h6, td, pre code",
  );
  const target = blocks[blocks.length - 1] ?? container;
  const caret = document.createElement("span");
  caret.className = "conv-search-stream-caret";
  caret.setAttribute("aria-hidden", "true");
  target.appendChild(caret);
}

// -- The panel -----------------------------------------------------------------

export class AskAiPanel {
  /** False only if the constructor could not build its DOM. */
  readonly ready: boolean = false;

  private readonly credentials: DocsAiCredentials;
  private readonly readIsDatadogUser: () => boolean | undefined;

  private readonly floatButton: HTMLButtonElement;
  private readonly overlay: HTMLDivElement;
  private readonly sidebar: HTMLDivElement;
  private readonly messagesContainer: HTMLDivElement;
  private readonly input: HTMLTextAreaElement;
  private readonly sendButton: HTMLButtonElement;
  private readonly modeToggleButton: HTMLButtonElement;
  private readonly modeMenu: HTMLDivElement;
  private readonly modeOptions: HTMLButtonElement[];
  private readonly resizeHandles: HTMLDivElement[];

  /** Aborted by `teardown()`, which is how every listener is removed at once. */
  private readonly listeners = new AbortController();

  private conversationId: string | null = null;
  private chatHistory: ChatMessage[] = [];
  private isOpen = false;
  private isLoading = false;
  private requestController: AbortController | null = null;
  /** Set by the stop button, so the abort keeps what has streamed so far. */
  private userStoppedRequest = false;
  /**
   * Bumped by every turn and by "New Question", so a turn that finishes late
   * can tell that a newer one owns the composer.
   */
  private turnSeq = 0;
  private hasLoggedFirstOpen = false;
  private isSuggestionQuery = false;
  private isTornDown = false;

  /**
   * Rewrites the opening question for retrieval. Only the first message of a
   * conversation; follow-ups have history to work from instead.
   */
  private readonly shouldRewriteQuery = true;

  private readonly isHomepage: boolean;
  private homeAiButtonVisible = false;

  private viewMode: ViewMode;
  private isModeMenuOpen = false;
  private readonly panelSizes: Record<
    ResizableMode,
    Partial<Record<Dimension, number>>
  > = { sidebar: {}, floating: {} };

  constructor({ credentials, getIsDatadogUser }: AskAiPanelOptions) {
    this.credentials = credentials;
    this.readIsDatadogUser = getIsDatadogUser ?? (() => undefined);

    this.isHomepage = document.querySelector(".kind-home") !== null;
    this.viewMode = readStoredViewMode();
    forEachResizable((mode, dimension) => {
      this.panelSizes[mode][dimension] = clampSize(
        mode,
        dimension,
        readStoredSize(mode, dimension),
      );
    });

    retainStyles();

    const { floatButton, overlay, sidebar } = buildWidgetElements();
    this.floatButton = floatButton;
    this.overlay = overlay;
    this.sidebar = sidebar;

    this.messagesContainer = requireElement(sidebar, ".conv-search-messages");
    this.input = requireElement(sidebar, ".conv-search-input");
    this.sendButton = requireElement(sidebar, ".conv-search-send");
    this.modeToggleButton = requireElement(sidebar, ".conv-search-mode-toggle");
    this.modeMenu = requireElement(sidebar, ".conv-search-mode-menu");
    this.modeOptions = [
      ...sidebar.querySelectorAll<HTMLButtonElement>(
        ".conv-search-mode-option",
      ),
    ];
    this.resizeHandles = [
      ...sidebar.querySelectorAll<HTMLDivElement>(".conv-search-resize-handle"),
    ];

    this.injectEmptyState();
    // Hugo's homepage has its own hero entry point, so the floating one waits
    // until that scrolls out of view.
    if (this.isHomepage) this.floatButton.classList.add("hidden");

    document.body.append(this.floatButton, this.overlay, this.sidebar);

    this.bindEvents();
    forEachResizable((mode, dimension) => {
      this.applyPanelSize(mode, dimension, this.panelSizes[mode][dimension]);
    });
    this.applyViewMode(this.viewMode);

    this.ready = true;
  }

  // -- Telemetry ---------------------------------------------------------------

  private get logContext(): LogContext {
    return {
      conversationId: this.conversationId,
      isDatadogUser: this.readIsDatadogUser(),
    };
  }

  /**
   * Handed to the action buttons, which outlive the conversation they were
   * bound in and so must read the id at click time.
   */
  private readonly provideLogContext: LogContextProvider = () =>
    this.logContext;

  private logInteraction(payload: AskAiActionPayload): void {
    logAction("Conversational Search Interaction", payload, this.logContext);
  }

  // -- DOM setup ---------------------------------------------------------------

  private injectEmptyState(): void {
    this.messagesContainer.appendChild(buildEmptyState());
    this.renderSuggestions();
  }

  private renderSuggestions(): void {
    const suggestions = this.messagesContainer.querySelector(
      ".conv-search-suggestions",
    );
    if (!suggestions) return;

    suggestions.replaceChildren(...pickQuestions().map(buildSuggestionButton));
  }

  // -- Events ------------------------------------------------------------------

  private bindEvents(): void {
    const { signal } = this.listeners;

    this.floatButton.addEventListener(
      "click",
      () => this.open("floating_button"),
      { signal },
    );
    requireElement(this.sidebar, ".conv-search-close").addEventListener(
      "click",
      () => this.close(),
      { signal },
    );
    requireElement(this.sidebar, ".conv-search-new").addEventListener(
      "click",
      () => this.newChat(),
      { signal },
    );
    this.overlay.addEventListener("click", () => this.close(), { signal });
    this.sendButton.addEventListener(
      "click",
      () => {
        if (this.isLoading) this.stopGeneration();
        else void this.sendMessage();
      },
      { signal },
    );

    this.input.addEventListener(
      "keydown",
      (event) => {
        // Safari can end composition before dispatching the Enter that confirms
        // it, so the deprecated keyCode is the only signal left.
        const isImeComposition = event.isComposing || event.keyCode === 229;
        if (event.key !== "Enter" || event.shiftKey || isImeComposition) return;

        event.preventDefault();
        void this.sendMessage();
      },
      { signal },
    );

    this.input.addEventListener("input", () => this.growInput(), { signal });

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key !== "Escape") return;
        // The menu is the innermost dismissible thing, so it goes first.
        if (this.isModeMenuOpen) {
          this.closeModeMenu();
          return;
        }
        if (this.isOpen) this.close();
      },
      { signal },
    );

    this.bindModeSwitcher();
    this.bindPanelResize();
    this.bindHomepageObserver();
    this.bindTooltipEvents();
    this.bindClickDelegation();
    this.bindScrollFade();

    window.addEventListener(
      "resize",
      () => {
        if (this.isOpen && this.viewMode === "sidebar") {
          this.applySidebarTopOffset();
        }
      },
      { signal },
    );
  }

  private growInput(): void {
    this.input.style.height = "auto";
    this.input.style.height = `${Math.min(
      this.input.scrollHeight,
      MAX_INPUT_HEIGHT_PX,
    )}px`;
  }

  private bindModeSwitcher(): void {
    const { signal } = this.listeners;

    this.modeToggleButton.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();
        if (this.isModeMenuOpen) this.closeModeMenu();
        else this.openModeMenu();
      },
      { signal },
    );

    this.modeOptions.forEach((option) => {
      option.addEventListener(
        "click",
        (event) => {
          event.stopPropagation();
          const mode = option.dataset["mode"];
          if (isViewMode(mode)) this.setViewMode(mode);
          this.closeModeMenu();
        },
        { signal },
      );
    });

    document.addEventListener(
      "click",
      (event) => {
        if (!this.isModeMenuOpen) return;
        const target = event.target;
        if (!(target instanceof Node)) return;
        if (this.modeMenu.contains(target)) return;
        if (this.modeToggleButton.contains(target)) return;
        this.closeModeMenu();
      },
      { signal },
    );
  }

  private bindPanelResize(): void {
    this.resizeHandles.forEach((handle) => {
      const axis = handle.dataset["resize"];
      if (!isResizeAxis(axis)) return;
      this.bindResizeHandle(handle, axis);
    });

    window.addEventListener(
      "resize",
      () => {
        forEachResizable((mode, dimension) => {
          const current = this.panelSizes[mode][dimension];
          if (current === undefined) return;

          const clamped = clampSize(mode, dimension, current);
          if (clamped !== current)
            this.applyPanelSize(mode, dimension, clamped);
        });
      },
      { signal: this.listeners.signal },
    );
  }

  /**
   * Drag-to-resize on one handle. The pointer is captured for the drag, so it
   * keeps tracking after it leaves the 6px handle.
   */
  private bindResizeHandle(handle: HTMLDivElement, axis: ResizeAxis): void {
    const dimensions = HANDLE_AXES[axis];
    let pointerId: number | null = null;
    let activeMode: ResizableMode | null = null;

    const onPointerMove = (event: PointerEvent): void => {
      // Copied to a const so the null check narrows inside the callback below;
      // narrowing on the mutable `activeMode` does not survive the closure.
      const draggingMode = activeMode;
      if (!draggingMode) return;

      dimensions.forEach((dimension) => {
        const config = sizeConfig(draggingMode, dimension);
        if (!config) return;

        // The panel is anchored to the bottom-right, so a size is the distance
        // from the pointer to the far edge.
        const value =
          dimension === "width"
            ? window.innerWidth - config.viewportOffset - event.clientX
            : window.innerHeight - config.viewportOffset - event.clientY;
        this.applyPanelSize(draggingMode, dimension, value);
      });
    };

    const stop = (): void => {
      const finishedMode = activeMode;
      activeMode = null;

      if (pointerId !== null) {
        try {
          handle.releasePointerCapture(pointerId);
        } catch {
          /* ignore */
        }
        pointerId = null;
      }

      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", stop);
      handle.removeEventListener("pointercancel", stop);

      document.body.classList.remove("docs-ai-panel-resizing");
      dimensions.forEach((dimension) =>
        document.body.classList.remove(`docs-ai-panel-resizing-${dimension}`),
      );
      document.body.style.cursor = "";

      if (!finishedMode) return;

      dimensions.forEach((dimension) => {
        const size = this.panelSizes[finishedMode][dimension];
        if (size !== undefined) persistSize(finishedMode, dimension, size);
      });
      this.logInteraction({
        action: "panel_resized",
        mode: finishedMode,
        axes: dimensions,
        width_px: this.panelSizes[finishedMode].width,
        height_px: this.panelSizes[finishedMode].height,
      });
    };

    handle.addEventListener(
      "pointerdown",
      (event) => {
        if (event.button !== 0) return;
        if (this.viewMode === "fullscreen") return;

        const mode: ResizableMode = this.viewMode;
        // The corner handle is inert in sidebar mode, which has no height.
        if (!dimensions.every((dimension) => sizeConfig(mode, dimension))) {
          return;
        }

        event.preventDefault();
        activeMode = mode;
        pointerId = event.pointerId;
        try {
          handle.setPointerCapture(pointerId);
        } catch {
          /* ignore */
        }

        document.body.classList.add("docs-ai-panel-resizing");
        dimensions.forEach((dimension) =>
          document.body.classList.add(`docs-ai-panel-resizing-${dimension}`),
        );
        document.body.style.cursor = HANDLE_CURSORS[axis];

        handle.addEventListener("pointermove", onPointerMove);
        handle.addEventListener("pointerup", stop);
        handle.addEventListener("pointercancel", stop);
      },
      { signal: this.listeners.signal },
    );
  }

  /**
   * Hides the floating button while the host's own hero entry point is on
   * screen. A host without one — Astro — never reaches the observer.
   */
  private bindHomepageObserver(): void {
    if (!this.isHomepage) return;

    const homeAiButton = document.querySelector(".home-ai-btn");
    if (!homeAiButton) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        this.homeAiButtonVisible = entry.isIntersecting;
        if (!this.isOpen) {
          this.floatButton.classList.toggle("hidden", entry.isIntersecting);
        }
      },
      { threshold: 0 },
    );
    observer.observe(homeAiButton);
  }

  private bindScrollFade(): void {
    this.messagesContainer.addEventListener(
      "scroll",
      () => {
        this.messagesContainer.classList.toggle(
          "has-scrolled",
          this.messagesContainer.scrollTop > 0,
        );
      },
      { signal: this.listeners.signal },
    );
  }

  private bindTooltipEvents(): void {
    const { signal } = this.listeners;

    this.messagesContainer.addEventListener(
      "mouseover",
      (event) => {
        const wrap = closestFrom(event.target, ".conv-search-source-ref-wrap");
        if (!wrap || !this.messagesContainer.contains(wrap)) return;
        if (wrap.querySelector(".conv-search-source-tooltip.open")) return;

        const chip = wrap.querySelector<HTMLElement>(
          ".conv-search-source-ref-btn",
        );
        const tooltip = wrap.querySelector<HTMLElement>(
          ".conv-search-source-tooltip",
        );
        if (!chip || !tooltip) return;

        closeAllSourceTooltips(this.messagesContainer);
        showSourceTooltip(chip);
        repositionTooltip(tooltip, this.sidebar);
      },
      { signal },
    );

    this.messagesContainer.addEventListener(
      "mouseout",
      (event) => {
        const wrap = closestFrom(event.target, ".conv-search-source-ref-wrap");
        if (!wrap || !this.messagesContainer.contains(wrap)) return;

        const movedTo =
          event.relatedTarget instanceof Node ? event.relatedTarget : null;
        if (movedTo && wrap.contains(movedTo)) return;

        closeAllSourceTooltips(this.messagesContainer);
      },
      { signal },
    );

    document.addEventListener(
      "click",
      (event) => {
        if (closestFrom(event.target, ".conv-search-source-ref-wrap")) return;
        closeAllSourceTooltips(this.messagesContainer);
      },
      { signal },
    );
  }

  private bindClickDelegation(): void {
    this.messagesContainer.addEventListener(
      "click",
      (event) => {
        if (this.handleSourceRefClick(event)) return;
        this.handleSourceCardClick(event);
        this.handleSuggestionClick(event);
        this.handleLinkClick(event);
      },
      { signal: this.listeners.signal },
    );
  }

  /** Returns true when the click was a citation chip and is fully handled. */
  private handleSourceRefClick(event: MouseEvent): boolean {
    const chip = closestFrom<HTMLElement>(
      event.target,
      ".conv-search-source-ref-btn",
    );
    if (!chip || !this.messagesContainer.contains(chip)) return false;

    event.preventDefault();
    event.stopPropagation();

    const sourceNumber = chip.dataset["sourceNumber"];
    const tooltipLink = chip.parentElement?.querySelector<HTMLAnchorElement>(
      ".conv-search-source-tooltip a",
    );

    this.logInteraction({
      action: "source_ref_click",
      source_number: sourceNumber ? Number.parseInt(sourceNumber, 10) : null,
      source_url: tooltipLink?.href || null,
      source_title: tooltipLink?.textContent || null,
    });

    if (tooltipLink?.href) {
      window.open(tooltipLink.href, "_blank", "noopener,noreferrer");
    }
    return true;
  }

  private handleSourceCardClick(event: MouseEvent): void {
    const card = closestFrom<HTMLElement>(
      event.target,
      ".conv-search-source-card",
    );
    if (!card || !this.messagesContainer.contains(card)) return;

    const link = card.querySelector("a");
    const badge = card.querySelector(".conv-search-source-card-number");

    this.logInteraction({
      action: "source_card_click",
      source_number: badge
        ? Number.parseInt(badge.textContent ?? "", 10)
        : null,
      source_url: link?.href || null,
      source_title: link?.textContent || null,
    });
  }

  private handleSuggestionClick(event: MouseEvent): void {
    const suggestion = closestFrom<HTMLElement>(
      event.target,
      ".conv-search-suggestion",
    );
    const query = suggestion?.dataset["query"];
    if (!query) return;

    this.logInteraction({
      action: "suggestion_clicked",
      suggestion_query: query,
    });
    this.input.value = query;
    // A suggestion is already phrased for retrieval, so it skips the rewrite.
    this.isSuggestionQuery = true;
    void this.sendMessage();
  }

  private handleLinkClick(event: MouseEvent): void {
    const link = closestFrom<HTMLAnchorElement>(event.target, "a");
    if (!link || !this.messagesContainer.contains(link)) return;

    this.logInteraction({
      action: "link_clicked",
      link_url: link.href,
      link_text: link.textContent ?? "",
    });
  }

  // -- View mode ---------------------------------------------------------------

  private applyPanelSize(
    mode: ResizableMode,
    dimension: Dimension,
    px: number | undefined,
  ): void {
    const config = sizeConfig(mode, dimension);
    if (!config || px === undefined) return;

    const clamped = clampSize(mode, dimension, px);
    this.panelSizes[mode][dimension] = clamped;
    document.documentElement.style.setProperty(config.cssVar, `${clamped}px`);
  }

  private applyViewMode(mode: ViewMode): void {
    this.viewMode = VIEW_MODES.includes(mode) ? mode : DEFAULT_VIEW_MODE;

    VIEW_MODES.forEach((candidate) => {
      this.sidebar.classList.toggle(
        `mode-${candidate}`,
        candidate === this.viewMode,
      );
    });

    this.modeOptions.forEach((option) => {
      option.setAttribute(
        "aria-checked",
        String(option.dataset["mode"] === this.viewMode),
      );
    });

    const isFullscreen = this.viewMode === "fullscreen";
    if (this.isOpen) {
      this.overlay.classList.toggle("open", isFullscreen);
      document.body.style.overflow = isFullscreen ? "hidden" : "";
    }

    this.updateBodyPush();
  }

  private updateBodyPush(): void {
    const shouldPush = this.isOpen && this.viewMode === "sidebar";
    document.body.classList.toggle("docs-ai-sidebar-pushed", shouldPush);
    if (shouldPush) this.applySidebarTopOffset();
  }

  /**
   * Docks the sidebar below the announcement banner, if one is pinned to the
   * top. `.announcement-banner` is the class on both hosts: Hugo's partial uses
   * it directly, and Astro's component reaches it through `cl()`, which emits
   * the plain BEM class alongside the hashed one.
   */
  private applySidebarTopOffset(): void {
    const banner = document.querySelector(".announcement-banner");
    const rect = banner?.getBoundingClientRect();
    const topOffset =
      rect && rect.height > 0 && rect.top <= 1
        ? Math.max(0, Math.round(rect.bottom))
        : 0;

    document.documentElement.style.setProperty(
      "--docs-ai-sidebar-top-offset",
      `${topOffset}px`,
    );
  }

  private setViewMode(mode: ViewMode): void {
    if (mode === this.viewMode) return;

    this.logInteraction({ action: "view_mode_changed", view_mode: mode });
    this.applyViewMode(mode);
    persistViewMode(mode);
  }

  private openModeMenu(): void {
    this.isModeMenuOpen = true;
    this.modeMenu.classList.add("open");
    this.modeMenu.setAttribute("aria-hidden", "false");
    this.modeToggleButton.setAttribute("aria-expanded", "true");
  }

  private closeModeMenu(): void {
    this.isModeMenuOpen = false;
    this.modeMenu.classList.remove("open");
    this.modeMenu.setAttribute("aria-hidden", "true");
    this.modeToggleButton.setAttribute("aria-expanded", "false");
  }

  // -- Open, close, reset ------------------------------------------------------

  open(trigger: TriggerSource = "entry_button"): void {
    if (!this.hasLoggedFirstOpen) {
      logAction(
        "Conversational Search Open",
        { action: "open_first_time", trigger },
        this.logContext,
      );
      this.hasLoggedFirstOpen = true;
    }

    this.isOpen = true;
    this.sidebar.classList.add("open");
    this.floatButton.classList.add("hidden");

    if (this.viewMode === "fullscreen") {
      this.overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    this.updateBodyPush();
    setTimeout(() => this.input.focus(), FOCUS_DELAY_MS);
  }

  close(): void {
    const messagesSent = this.countRole("user");
    if (messagesSent > 0) {
      this.logInteraction({
        action: "conversation_close",
        messages_sent: messagesSent,
        responses_received: this.countRole("assistant"),
      });
    }

    this.isOpen = false;
    this.sidebar.classList.remove("open");
    this.overlay.classList.remove("open");
    document.body.style.overflow = "";
    this.closeModeMenu();
    this.updateBodyPush();

    if (!this.isHomepage || !this.homeAiButtonVisible) {
      this.floatButton.classList.remove("hidden");
    }
  }

  newChat(): void {
    this.logInteraction({ action: "new_chat" });
    this.cancelInFlightRequest();

    this.conversationId = null;
    this.chatHistory = [];
    this.isSuggestionQuery = false;
    this.turnSeq += 1;
    this.setBusy(false);

    this.messagesContainer.replaceChildren();
    this.injectEmptyState();

    this.input.value = "";
    this.input.style.height = "auto";
    this.input.focus();
  }

  /**
   * Opens the panel, prefilling the query and submitting it when it is long
   * enough to be worth answering. A query is only carried into a conversation
   * that has not started yet.
   */
  ask(query: string, options: { source?: TriggerSource } = {}): void {
    this.open(options.source ?? "entry_button");

    const trimmed = query.trim();
    const isNewConversation =
      this.chatHistory.length === 0 && !this.conversationId;
    if (!trimmed || !isNewConversation) return;

    this.input.value = trimmed;
    if (trimmed.length >= AUTO_SUBMIT_MIN_LENGTH) {
      setTimeout(() => void this.sendMessage(), AUTO_SUBMIT_DELAY_MS);
    }
  }

  teardown(): void {
    if (this.isTornDown) return;
    this.isTornDown = true;

    this.cancelInFlightRequest();
    this.listeners.abort();

    this.floatButton.remove();
    this.overlay.remove();
    this.sidebar.remove();

    document.body.classList.remove("docs-ai-sidebar-pushed");
    document.body.style.overflow = "";

    releaseStyles();
  }

  private cancelInFlightRequest(): void {
    if (!this.requestController) return;

    this.requestController.abort();
    this.requestController = null;
  }

  private countRole(role: ChatMessage["role"]): number {
    return this.chatHistory.filter((message) => message.role === role).length;
  }

  // -- Message DOM -------------------------------------------------------------

  private addMessage(
    role: "user" | "assistant",
    content?: string,
  ): MessageParts {
    this.messagesContainer.querySelector(".conv-search-empty-state")?.remove();

    const parts = buildMessage(role, content);
    this.messagesContainer.appendChild(parts.messageElement);
    this.scrollToBottom(true);

    return parts;
  }

  /**
   * Appends an assistant turn: the live research timeline, then the answer
   * body, which stays hidden until the first answer token arrives.
   */
  private addAssistantTurn(): AssistantTurn {
    this.messagesContainer.querySelector(".conv-search-empty-state")?.remove();

    const { messageElement, contentElement } = buildMessage("assistant");
    messageElement.classList.add("conv-search-turn");
    contentElement.hidden = true;

    const activity = new ActivityTimeline({
      onToggle: (expanded) =>
        this.logInteraction({ action: "activity_toggled", expanded }),
    });
    messageElement.prepend(activity.root);

    this.messagesContainer.appendChild(messageElement);
    this.scrollToBottom(true);

    return { messageElement, contentElement, activity };
  }

  private isNearBottom(): boolean {
    const container = this.messagesContainer;
    return (
      container.scrollHeight - container.scrollTop - container.clientHeight <
      NEAR_BOTTOM_PX
    );
  }

  /** Scrolls only when the reader has not scrolled up to read something. */
  private scrollToBottom(force = false): void {
    if (!force && !this.isNearBottom()) return;
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  // -- Sending -----------------------------------------------------------------

  async sendMessage(): Promise<void> {
    const query = this.input.value.trim();
    if (!query || this.isLoading) return;

    this.input.value = "";
    this.input.style.height = "auto";
    this.addMessage("user", query);
    await this.runTurn(query);
  }

  private async runTurn(query: string): Promise<void> {
    const turnId = ++this.turnSeq;
    this.userStoppedRequest = false;
    this.setBusy(true);

    try {
      await this.streamAnswer(query);
    } catch (error) {
      logError("Conversational Search Response Error", error, this.logContext);
    } finally {
      // A newer turn, or a reset, owns the composer from here on.
      if (this.turnSeq === turnId) {
        this.setBusy(false);
        this.requestController = null;
        this.userStoppedRequest = false;
        this.isSuggestionQuery = false;
        this.input.focus();
      }
    }
  }

  /** While a turn runs, the send button becomes a stop button. */
  private setBusy(busy: boolean): void {
    this.isLoading = busy;
    this.sendButton.disabled = false;
    this.sendButton.classList.toggle("is-stop", busy);
    const label = busy ? STRINGS.stopGenerating : STRINGS.send;
    this.sendButton.setAttribute("aria-label", label);
    this.sendButton.title = busy ? label : "";
  }

  private stopGeneration(): void {
    if (!this.isLoading || !this.requestController) return;
    this.userStoppedRequest = true;
    this.requestController.abort();
  }

  private async streamAnswer(query: string): Promise<void> {
    this.requestController = new AbortController();
    const startTime = Date.now();

    const isFirstMessage = this.chatHistory.length === 0;
    const isSuggestion = this.isSuggestionQuery;
    this.conversationId ??= generateConversationId();
    const history = isFirstMessage ? [] : [...this.chatHistory];
    this.chatHistory.push({ role: "user", content: query });

    const turn = this.addAssistantTurn();
    const { contentElement, activity } = turn;

    let partial = "";
    let serverError: ServerErrorEvent | null = null;
    let feedbackToken: string | null = null;
    let lastRenderTime = 0;

    let answer: string;
    try {
      answer = await streamDocsAiChat({
        credentials: this.credentials,
        query,
        history,
        conversationId: this.conversationId,
        anchorUrl: window.location.href,
        rewriteQuery:
          isFirstMessage && this.shouldRewriteQuery && !isSuggestion,
        signal: this.requestController.signal,
        onThinking: (content, event) => {
          activity.dispatch({
            type: "thinking",
            content,
            retrieved_pages: event.retrieved_pages,
            page: event.page,
          });
          this.scrollToBottom();
        },
        onServerError: (event) => {
          serverError = event;
        },
        onFeedbackToken: (token) => {
          feedbackToken = token;
        },
        onToken: (_token, fullMessage) => {
          partial = fullMessage;
          if (contentElement.hidden) {
            activity.dispatch({ type: "answer" });
            contentElement.hidden = false;
          }

          const now = Date.now();
          if (now - lastRenderTime <= RENDER_THROTTLE_MS) return;
          lastRenderTime = now;

          this.renderPartialAnswer(contentElement, fullMessage);
        },
        onError: (error) => {
          logError("Docs AI Streaming Error", error, this.logContext);
        },
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        if (this.userStoppedRequest) {
          this.handleStoppedTurn(turn, query, partial, startTime);
        } else {
          activity.dispatch({ type: "stopped" });
        }
        return;
      }

      logError("Conversational Search Response Error", error, this.logContext);
      // A rejected request, such as a question that is too long, fails the
      // same way on retry.
      const rejected =
        error instanceof DocsAiRequestError &&
        error.status >= 400 &&
        error.status < 500 &&
        !RETRYABLE_CLIENT_STATUSES.includes(error.status);
      this.failTurn(
        turn,
        query,
        rejected ? { message: STRINGS.requestRejected, retryable: false } : {},
      );
      return;
    }

    // Assigned in a callback, which control-flow narrowing does not follow.
    const failure = serverError as ServerErrorEvent | null;
    if (failure) {
      logError(
        "Docs AI Server Error",
        new Error(failure.code || "server_error"),
        this.logContext,
      );
      const retryable = failure.retryable !== false;
      this.failTurn(turn, query, {
        // The server's copy invites a retry, so it is shown only when a retry
        // can help.
        message: retryable ? failure.content : undefined,
        retryable,
        discardPartial: failure.discard_partial !== false,
      });
      return;
    }

    if (!answer.trim()) {
      this.failTurn(turn, query, {
        message: STRINGS.emptyResponse,
        retryable: true,
      });
      return;
    }

    activity.dispatch({ type: "done" });
    contentElement.hidden = false;
    this.chatHistory.push({ role: "assistant", content: answer });
    this.finalizeResponse(turn, answer, startTime, activity.summary(), {
      feedbackToken,
    });
  }

  /** Keeps what streamed before the reader pressed stop, if anything did. */
  private handleStoppedTurn(
    turn: AssistantTurn,
    query: string,
    partial: string,
    startTime: number,
  ): void {
    const { contentElement, activity } = turn;
    activity.dispatch({ type: "stopped" });
    contentElement.querySelector(".conv-search-stream-caret")?.remove();
    this.logInteraction({
      action: "response_stopped",
      partial_length: partial.length,
      ...activity.summary(),
    });

    if (partial.trim()) {
      this.chatHistory.push({ role: "assistant", content: partial });
      this.finalizeResponse(turn, partial, startTime, activity.summary(), {
        log: false,
      });
    } else {
      contentElement.remove();
      this.dropUnansweredQuery(query);
    }
  }

  private failTurn(
    turn: AssistantTurn,
    query: string,
    { message, retryable = true, discardPartial = true }: TurnFailure = {},
  ): void {
    const { messageElement, contentElement, activity } = turn;
    activity.dispatch({ type: "error" });
    contentElement.querySelector(".conv-search-stream-caret")?.remove();
    if (discardPartial) {
      contentElement.hidden = true;
      contentElement.replaceChildren();
    }
    this.dropUnansweredQuery(query);

    const fallback = retryable
      ? STRINGS.requestFailed
      : STRINGS.requestNotRetryable;
    const { box, retry } = buildTurnError(
      message?.trim() ? message : fallback,
      retryable,
    );

    retry?.addEventListener(
      "click",
      () => {
        if (this.isLoading) return;
        this.logInteraction({ action: "retry_clicked" });
        messageElement.remove();
        void this.runTurn(query);
      },
      { signal: this.listeners.signal },
    );

    messageElement.appendChild(box);
    this.scrollToBottom();
  }

  /**
   * An unanswered question is not sent back as history, so a retry or a
   * follow-up starts clean.
   */
  private dropUnansweredQuery(query: string): void {
    const last = this.chatHistory[this.chatHistory.length - 1];
    if (last?.role === "user" && last.content === query) this.chatHistory.pop();
  }

  /** Signs feedback with the answer's token. Failures are logged and rethrown. */
  private feedbackSender(token: string): FeedbackSender {
    const conversationId = this.conversationId;
    return (feedback) =>
      sendDocsAiFeedback({
        credentials: this.credentials,
        token,
        conversationId,
        ...feedback,
      }).catch((error: unknown) => {
        logError("Docs AI Feedback Error", error, this.logContext);
        throw error;
      });
  }

  /**
   * The in-flight render. Source cards are appended but tooltips are not wired
   * yet — the citation list is still growing, so it is rebuilt on every pass.
   */
  private renderPartialAnswer(
    contentElement: HTMLDivElement,
    fullMessage: string,
  ): void {
    const { displayMarkdown, sources } = extractSources(fullMessage);
    contentElement.innerHTML = inlineRefChips(parseMarkdown(displayMarkdown));
    appendStreamCaret(contentElement);

    if (sources.length > 0) {
      contentElement.appendChild(buildSourceCards(sources));
    }
    this.scrollToBottom();
  }

  private finalizeResponse(
    { messageElement, contentElement }: MessageParts,
    answer: string,
    startTime: number,
    activitySummary: ActivitySummary,
    {
      log = true,
      feedbackToken = null,
    }: { log?: boolean; feedbackToken?: string | null } = {},
  ): void {
    contentElement.innerHTML = renderMessageWithSources(answer);
    injectCodeCopyButtons(contentElement, this.provideLogContext);
    addMessageActions(
      messageElement,
      answer,
      this.provideLogContext,
      feedbackToken ? this.feedbackSender(feedbackToken) : undefined,
    );
    this.scrollToBottom();

    if (!log) return;
    logAction(
      "Conversational Search Response",
      {
        action: "response_received",
        response_length: answer.length,
        latency_ms: Date.now() - startTime,
        ...activitySummary,
      },
      this.logContext,
    );
  }
}

/**
 * A conversation id the backend did not assign, so that a session's messages
 * can be correlated in telemetry. `randomUUID` needs a secure context, which a
 * local HTTP dev server is not.
 */
function generateConversationId(): string {
  const suffix = globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

  return `${INTERNAL_CONVERSATION_ID_PREFIX}${suffix}`;
}
