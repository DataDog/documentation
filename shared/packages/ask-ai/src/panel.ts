import { addMessageActions, injectCodeCopyButtons } from "./actions";
import { streamDocsAiChat } from "./client";
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
  buildLoadingIndicator,
  buildMessage,
  buildSuggestionButton,
  buildWidgetElements,
} from "./markup";
import {
  buildSourceCards,
  closeAllSourceTooltips,
  repositionTooltip,
  showSourceTooltip,
} from "./sources";
import stylesheet from "./styles.css";
import { LOADING_MESSAGES, STRINGS, THINKING_MESSAGES } from "./strings";
import { pickQuestions } from "./suggestedQuestions";
import type {
  AskAiActionPayload,
  ChatMessage,
  Dimension,
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
const LOADING_MESSAGE_ROTATION_MS = 3000;

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

function mapThinkingMessage(serverMessage: string): string {
  return THINKING_MESSAGES[serverMessage] ?? serverMessage;
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

// -- Loading indicator ---------------------------------------------------------

interface LoadingIndicator {
  /** Replaces the rotating copy with a server-sent status, and stops rotating. */
  updateStatus(text: string): void;
  stop(): void;
}

/** A message row and the element its body goes in. */
interface MessageParts {
  messageElement: HTMLDivElement;
  contentElement: HTMLDivElement;
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
  private userCancelledRequest = false;
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
      ...sidebar.querySelectorAll<HTMLButtonElement>(".conv-search-mode-option"),
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
    this.sendButton.addEventListener("click", () => void this.sendMessage(), {
      signal,
    });

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
          if (clamped !== current) this.applyPanelSize(mode, dimension, clamped);
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
        const wrap = closestFrom(
          event.target,
          ".conv-search-source-ref-wrap",
        );
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
        const wrap = closestFrom(
          event.target,
          ".conv-search-source-ref-wrap",
        );
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
      source_number: badge ? Number.parseInt(badge.textContent ?? "", 10) : null,
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
    this.isLoading = false;
    this.sendButton.disabled = false;

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

    // Flags the abort as deliberate, so the catch reports a cancellation
    // rather than an error.
    this.userCancelledRequest = true;
    this.requestController.abort();
    this.requestController = null;
  }

  private countRole(role: ChatMessage["role"]): number {
    return this.chatHistory.filter((message) => message.role === role).length;
  }

  // -- Message DOM -------------------------------------------------------------

  private addMessage(role: "user" | "assistant", content?: string): MessageParts {
    this.messagesContainer.querySelector(".conv-search-empty-state")?.remove();

    const parts = buildMessage(role, content);
    this.messagesContainer.appendChild(parts.messageElement);
    this.scrollToBottom(true);

    return parts;
  }

  private showLoadingIndicator(): LoadingIndicator {
    this.messagesContainer.querySelector(".conv-search-empty-state")?.remove();

    const { wrapper, statusElement } = buildLoadingIndicator(
      LOADING_MESSAGES[0],
    );
    this.messagesContainer.appendChild(wrapper);
    this.scrollToBottom(true);

    let messageIndex = 0;
    let rotation: ReturnType<typeof setInterval> | null = setInterval(() => {
      // Holds on the last message rather than looping back to the first, so it
      // does not read as if the work restarted.
      if (messageIndex < LOADING_MESSAGES.length - 1) messageIndex += 1;
      statusElement.textContent = LOADING_MESSAGES[messageIndex] ?? "";
    }, LOADING_MESSAGE_ROTATION_MS);

    const stopRotating = (): void => {
      if (rotation === null) return;
      clearInterval(rotation);
      rotation = null;
    };

    return {
      updateStatus: (text) => {
        stopRotating();
        statusElement.textContent = text;
      },
      stop: () => {
        stopRotating();
        wrapper.remove();
      },
    };
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

    this.isLoading = true;
    this.userCancelledRequest = false;
    this.input.value = "";
    this.input.style.height = "auto";
    this.sendButton.disabled = true;

    this.addMessage("user", query);

    try {
      await this.streamAnswer(query);
    } catch (error) {
      const wasCancelled =
        this.userCancelledRequest &&
        error instanceof Error &&
        error.name === "AbortError";

      if (wasCancelled) {
        this.addMessage("assistant", STRINGS.requestCancelled);
      } else {
        logError(
          "Conversational Search Response Error",
          error,
          this.logContext,
        );
        this.addMessage("assistant", STRINGS.requestFailed);
      }
    } finally {
      this.isLoading = false;
      this.sendButton.disabled = false;
      this.requestController = null;
      this.userCancelledRequest = false;
      this.isSuggestionQuery = false;
      this.input.focus();
    }
  }

  private async streamAnswer(query: string): Promise<void> {
    this.requestController = new AbortController();
    const startTime = Date.now();
    const loadingIndicator = this.showLoadingIndicator();

    const isFirstMessage = this.chatHistory.length === 0;
    const isSuggestion = this.isSuggestionQuery;
    this.conversationId ??= generateConversationId();
    this.chatHistory.push({ role: "user", content: query });

    let response: MessageParts | null = null;
    let lastRenderTime = 0;

    /** Swaps the spinner for a message row, the first time content arrives. */
    const ensureResponse = (): MessageParts => {
      if (!response) {
        loadingIndicator.stop();
        response = this.addMessage("assistant");
      }
      return response;
    };

    let answer: string;
    try {
      answer = await streamDocsAiChat({
        credentials: this.credentials,
        query,
        history: isFirstMessage ? [] : this.chatHistory.slice(0, -1),
        conversationId: this.conversationId,
        anchorUrl: window.location.href,
        rewriteQuery: isFirstMessage && this.shouldRewriteQuery && !isSuggestion,
        signal: this.requestController.signal,
        onThinking: (message) => {
          loadingIndicator.updateStatus(mapThinkingMessage(message));
        },
        onToken: (_token, fullMessage) => {
          const { contentElement } = ensureResponse();

          const now = Date.now();
          if (now - lastRenderTime <= RENDER_THROTTLE_MS) return;
          lastRenderTime = now;

          this.renderPartialAnswer(contentElement, fullMessage);
        },
        onError: (error) => {
          logError("Docs AI Streaming Error", error, this.logContext);
        },
      });
    } finally {
      loadingIndicator.stop();
    }

    // A stream that ended without a single token still needs somewhere to say
    // so.
    const finalResponse = ensureResponse();

    if (!answer) {
      finalResponse.contentElement.textContent = STRINGS.emptyResponse;
      return;
    }

    this.chatHistory.push({ role: "assistant", content: answer });
    this.finalizeResponse(finalResponse, answer, startTime);
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

    if (sources.length > 0) {
      contentElement.appendChild(buildSourceCards(sources));
    }
    this.scrollToBottom();
  }

  private finalizeResponse(
    { messageElement, contentElement }: MessageParts,
    answer: string,
    startTime: number,
  ): void {
    contentElement.innerHTML = renderMessageWithSources(answer);
    injectCodeCopyButtons(contentElement, this.provideLogContext);
    addMessageActions(messageElement, answer, this.provideLogContext);
    this.scrollToBottom();

    logAction(
      "Conversational Search Response",
      {
        action: "response_received",
        response_length: answer.length,
        latency_ms: Date.now() - startTime,
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
