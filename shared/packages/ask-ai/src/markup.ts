/**
 * The widget's DOM, built in code.
 *
 * Hugo ships this as four `<template>` elements in a partial that every layout
 * has to include, and the script clones them. Building them here means the
 * package works on any page of any host without markup being planted first.
 *
 * Anything derived from a message, a question, or a source label is set with
 * `textContent`. Only icon markup from `icons.ts` is inserted as HTML.
 */

import {
  checkIcon,
  checkmarkIcon,
  closeIcon,
  copyIcon,
  floatingModeIcon,
  fullscreenModeIcon,
  infoIcon,
  plusIcon,
  sendIcon,
  sidebarModeIcon,
  sparkAiIcon,
  sparkPurpleIcon,
  thumbsDownIcon,
  thumbsUpIcon,
  viewModeIcon,
} from "./icons";
import { STRINGS } from "./strings";
import type { ViewMode } from "./types";

/** The three nodes the widget appends to `document.body`. */
export interface AskAiElements {
  floatButton: HTMLButtonElement;
  overlay: HTMLDivElement;
  sidebar: HTMLDivElement;
}

const INFO_TOOLTIP_ID = "tooltip-docs-ai-info";

export function buildWidgetElements(): AskAiElements {
  return {
    floatButton: buildFloatButton(),
    overlay: element("div", "conv-search-overlay"),
    sidebar: buildSidebar(),
  };
}

function buildFloatButton(): HTMLButtonElement {
  const button = element("button", "conv-search-float-btn", {
    "aria-label": STRINGS.askAi,
  });

  appendIcon(button, sparkAiIcon({ size: 18 }));
  button.appendChild(text("span", STRINGS.askAi));

  return button;
}

function buildSidebar(): HTMLDivElement {
  const sidebar = element("div", "conv-search-sidebar");

  sidebar.append(
    ...buildResizeHandles(),
    element("div", "conv-search-aurora"),
    buildHeader(),
    element("div", "conv-search-messages"),
    buildFooter(),
  );

  return sidebar;
}

// -- Resize handles -----------------------------------------------------------

const RESIZE_HANDLES = [
  { axis: "left", orientation: "vertical", label: STRINGS.resizeWidth },
  { axis: "top", orientation: "horizontal", label: STRINGS.resizeHeight },
  // The corner drags both axes at once, so it has no single orientation.
  { axis: "corner", orientation: undefined, label: STRINGS.resizeBoth },
] as const;

function buildResizeHandles(): HTMLDivElement[] {
  return RESIZE_HANDLES.map(({ axis, orientation, label }) => {
    const handle = element(
      "div",
      `conv-search-resize-handle conv-search-resize-handle--${axis}`,
      {
        role: "separator",
        "aria-label": label,
        // Draggable but not tab-reachable, matching Hugo.
        tabindex: "-1",
        ...(orientation && { "aria-orientation": orientation }),
      },
    );
    handle.dataset["resize"] = axis;
    return handle;
  });
}

// -- Header -------------------------------------------------------------------

function buildHeader(): HTMLDivElement {
  const header = element("div", "conv-search-header");
  header.append(buildTitleGroup(), buildHeaderActions());
  return header;
}

function buildTitleGroup(): HTMLDivElement {
  const group = element("div", "conv-search-title-group");

  const logoGroup = element("div", "conv-search-logo-group");
  appendIcon(
    logoGroup,
    sparkPurpleIcon({ size: 36, className: "conv-search-title-icon" }),
  );
  logoGroup.appendChild(text("span", STRINGS.askAi, "conv-search-title"));

  group.append(logoGroup, buildInfoTooltip());
  return group;
}

function buildInfoTooltip(): HTMLSpanElement {
  const container = element(
    "span",
    "tooltip-container conv-search-info-tooltip",
  );

  // Hugo names this button through its icon's `alt`. An inline SVG has no
  // `alt`, so the name moves to the button itself.
  const trigger = element("button", "tooltip-trigger conv-search-info-btn", {
    "aria-label": STRINGS.info,
    "aria-describedby": INFO_TOOLTIP_ID,
  });
  appendIcon(trigger, infoIcon({ size: 16 }));

  const tooltip = text("span", STRINGS.disclaimerTooltip, "tooltip-content");
  tooltip.id = INFO_TOOLTIP_ID;
  tooltip.setAttribute("role", "tooltip");

  container.append(trigger, tooltip);
  return container;
}

function buildHeaderActions(): HTMLDivElement {
  const actions = element("div", "conv-search-header-actions");

  const newChat = element("button", "conv-search-new", {
    "aria-label": STRINGS.newQuestion,
    title: STRINGS.newQuestion,
  });
  appendIcon(newChat, plusIcon({ size: 16 }));
  newChat.appendChild(text("span", STRINGS.newQuestion));

  const close = element("button", "conv-search-close", {
    "aria-label": STRINGS.close,
  });
  appendIcon(close, closeIcon({ size: 18 }));

  actions.append(newChat, buildModeSwitcher(), close);
  return actions;
}

// -- View-mode switcher -------------------------------------------------------

const MODE_OPTIONS: ReadonlyArray<{
  mode: ViewMode;
  label: string;
  icon: string;
}> = [
  {
    mode: "floating",
    label: STRINGS.modeFloating,
    icon: floatingModeIcon({ size: 16 }),
  },
  {
    mode: "sidebar",
    label: STRINGS.modeSidebar,
    icon: sidebarModeIcon({ size: 16 }),
  },
  {
    mode: "fullscreen",
    label: STRINGS.modeFullscreen,
    icon: fullscreenModeIcon({ size: 16 }),
  },
];

/** Matches Hugo's markup default; the panel re-checks against stored state. */
const DEFAULT_CHECKED_MODE: ViewMode = "fullscreen";

function buildModeSwitcher(): HTMLDivElement {
  const switcher = element("div", "conv-search-mode-switcher");

  const toggle = element("button", "conv-search-mode-toggle", {
    "aria-label": STRINGS.changeView,
    "aria-haspopup": "true",
    "aria-expanded": "false",
    title: STRINGS.changeView,
  });
  appendIcon(toggle, viewModeIcon({ size: 16 }));

  const menu = element("div", "conv-search-mode-menu", {
    role: "menu",
    "aria-hidden": "true",
  });
  menu.appendChild(
    text("div", STRINGS.switchTo, "conv-search-mode-menu-label"),
  );
  menu.append(...MODE_OPTIONS.map(buildModeOption));

  switcher.append(toggle, menu);
  return switcher;
}

function buildModeOption({
  mode,
  label,
  icon,
}: (typeof MODE_OPTIONS)[number]): HTMLButtonElement {
  const option = element("button", "conv-search-mode-option", {
    role: "menuitemradio",
    "aria-checked": String(mode === DEFAULT_CHECKED_MODE),
  });
  option.dataset["mode"] = mode;

  const iconSlot = element("span", "conv-search-mode-option-icon", {
    "aria-hidden": "true",
  });
  appendIcon(iconSlot, icon);

  const check = element("span", "conv-search-mode-option-check", {
    "aria-hidden": "true",
  });
  appendIcon(check, checkmarkIcon({ size: 14 }));

  option.append(
    iconSlot,
    text("span", label, "conv-search-mode-option-label"),
    check,
  );
  return option;
}

// -- Footer -------------------------------------------------------------------

function buildFooter(): HTMLDivElement {
  const footer = element("div", "conv-search-footer");

  const inputContainer = element("div", "conv-search-input-container");

  const input = element("textarea", "conv-search-input", {
    placeholder: STRINGS.inputPlaceholder,
    // Grown to fit by the panel as the reader types.
    rows: "1",
  });

  const send = element("button", "conv-search-send", {
    "aria-label": STRINGS.send,
  });
  appendIcon(send, sendIcon({ size: 16 }));

  inputContainer.append(input, send);
  footer.append(inputContainer, buildDisclaimer());
  return footer;
}

function buildDisclaimer(): HTMLParagraphElement {
  const disclaimer = element("p", "conv-search-disclaimer");

  const link = element("a", undefined, {
    href: STRINGS.privacyPolicyUrl,
    target: "_blank",
    rel: "noopener noreferrer",
  });
  link.textContent = STRINGS.disclaimerLinkText;

  disclaimer.append(
    document.createTextNode(STRINGS.disclaimerBefore),
    link,
    document.createTextNode(STRINGS.disclaimerAfter),
  );
  return disclaimer;
}

// -- Empty state and suggestions ----------------------------------------------

export function buildEmptyState(): HTMLDivElement {
  const emptyState = element("div", "conv-search-empty-state");

  const textBlock = element("div", "conv-search-empty-text");
  textBlock.append(
    text("h3", STRINGS.emptyTitle, "conv-search-empty-title"),
    text("p", STRINGS.emptySubtitle, "conv-search-empty-subtitle"),
  );

  // Filled by the panel, which picks a fresh three each time.
  emptyState.append(textBlock, element("div", "conv-search-suggestions"));
  return emptyState;
}

export function buildSuggestionButton(question: string): HTMLButtonElement {
  const button = element("button", "conv-search-suggestion");
  button.dataset["query"] = question;
  button.appendChild(text("span", question));
  return button;
}

// -- Messages -----------------------------------------------------------------

/**
 * A message row and the element its body goes in. An assistant message starts
 * empty and is filled as the stream arrives.
 */
export function buildMessage(
  role: "user" | "assistant",
  content?: string,
): { messageElement: HTMLDivElement; contentElement: HTMLDivElement } {
  const messageElement = element(
    "div",
    `conv-search-message conv-search-message-${role}`,
  );

  const contentElement = element("div", "conv-search-message-content");
  if (content !== undefined) contentElement.textContent = content;

  messageElement.appendChild(contentElement);
  return { messageElement, contentElement };
}

export function buildLoadingIndicator(initialStatus: string): {
  wrapper: HTMLDivElement;
  statusElement: HTMLSpanElement;
} {
  const wrapper = element(
    "div",
    "conv-search-message conv-search-message-assistant conv-search-loading-state",
  );

  const indicator = element("div", "conv-search-loading-indicator");
  const statusElement = text("span", initialStatus, "conv-search-status-text");
  indicator.append(
    element("span", "conv-search-loading-spinner"),
    statusElement,
  );

  wrapper.appendChild(indicator);
  return { wrapper, statusElement };
}

export function buildMessageActionsRow(): HTMLDivElement {
  const row = element("div", "conv-search-message-actions");

  const thumbsUp = buildActionButton("thumbs-up", STRINGS.goodResponse);
  appendIcon(thumbsUp, thumbsUpIcon({ size: 16 }));

  const thumbsDown = buildActionButton("thumbs-down", STRINGS.badResponse);
  appendIcon(thumbsDown, thumbsDownIcon({ size: 16 }));

  const copy = buildActionButton("copy", STRINGS.copyResponse);
  // The pair toggles by `display`, so both ship and one is hidden.
  appendIcon(copy, copyIcon({ size: 16, className: "copy-icon" }));
  appendIcon(
    copy,
    checkIcon({ size: 16, className: "check-icon", style: "display:none" }),
  );

  const feedback = element("span", "conv-search-feedback-inline", {
    "aria-live": "polite",
  });

  row.append(thumbsUp, thumbsDown, copy, feedback);
  return row;
}

function buildActionButton(action: string, title: string): HTMLButtonElement {
  const button = element("button", "conv-search-action-btn", { title });
  button.dataset["action"] = action;
  return button;
}

// -- Small DOM helpers --------------------------------------------------------

function element<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  attributes?: Record<string, string>,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;

  for (const [name, value] of Object.entries(attributes ?? {})) {
    node.setAttribute(name, value);
  }

  return node;
}

/** An element whose only child is text, never markup. */
function text<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  content: string,
  className?: string,
): HTMLElementTagNameMap[K] {
  const node = element(tag, className);
  node.textContent = content;
  return node;
}

function appendIcon(parent: HTMLElement, svg: string): void {
  parent.insertAdjacentHTML("beforeend", svg);
}
