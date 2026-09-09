import { describe, expect, it } from "vitest";
import {
  buildEmptyState,
  buildLoadingIndicator,
  buildMessage,
  buildMessageActionsRow,
  buildSuggestionButton,
  buildWidgetElements,
} from "./markup";
import { STRINGS } from "./strings";

const XSS = "<script>alert(1)</script>";

describe("buildWidgetElements", () => {
  it("returns the three roots the widget appends to the body", () => {
    const { floatButton, overlay, sidebar } = buildWidgetElements();

    expect(floatButton.className).toBe("conv-search-float-btn");
    expect(overlay.className).toBe("conv-search-overlay");
    expect(sidebar.className).toBe("conv-search-sidebar");
  });

  it("provides every element the panel looks up by selector", () => {
    const { sidebar } = buildWidgetElements();

    const required = [
      ".conv-search-messages",
      ".conv-search-close",
      ".conv-search-new",
      ".conv-search-input",
      ".conv-search-send",
      ".conv-search-mode-toggle",
      ".conv-search-mode-menu",
    ];
    for (const selector of required) {
      expect(sidebar.querySelector(selector), selector).not.toBeNull();
    }

    expect(sidebar.querySelectorAll(".conv-search-mode-option")).toHaveLength(
      3,
    );
    expect(sidebar.querySelectorAll(".conv-search-resize-handle")).toHaveLength(
      3,
    );
  });

  it("offers the three view modes, with fullscreen checked by default", () => {
    const { sidebar } = buildWidgetElements();

    const options = Array.from(
      sidebar.querySelectorAll<HTMLButtonElement>(".conv-search-mode-option"),
    );
    expect(options.map((option) => option.dataset["mode"])).toEqual([
      "floating",
      "sidebar",
      "fullscreen",
    ]);

    const checked = options.filter(
      (option) => option.getAttribute("aria-checked") === "true",
    );
    expect(checked).toHaveLength(1);
    expect(checked[0]?.dataset["mode"]).toBe("fullscreen");
  });

  it("labels the three resize handles by axis", () => {
    const { sidebar } = buildWidgetElements();

    const handles = Array.from(
      sidebar.querySelectorAll<HTMLElement>(".conv-search-resize-handle"),
    );
    expect(handles.map((handle) => handle.dataset["resize"])).toEqual([
      "left",
      "top",
      "corner",
    ]);
  });

  it("links the disclaimer to the privacy policy in a safe new tab", () => {
    const { sidebar } = buildWidgetElements();

    const link = sidebar.querySelector<HTMLAnchorElement>(
      ".conv-search-disclaimer a",
    );
    expect(link?.getAttribute("href")).toBe(STRINGS.privacyPolicyUrl);
    expect(link?.target).toBe("_blank");
    expect(link?.rel).toBe("noopener noreferrer");
  });

  it("wires the info button to its tooltip", () => {
    const { sidebar } = buildWidgetElements();

    const button = sidebar.querySelector(".conv-search-info-btn");
    const describedBy = button?.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(sidebar.querySelector(`#${describedBy}`)?.textContent).toBe(
      STRINGS.disclaimerTooltip,
    );
  });
});

describe("buildEmptyState", () => {
  it("renders the prompt and an empty suggestions container", () => {
    const emptyState = buildEmptyState();

    expect(
      emptyState.querySelector(".conv-search-empty-title")?.textContent,
    ).toBe(STRINGS.emptyTitle);
    expect(
      emptyState.querySelector(".conv-search-empty-subtitle")?.textContent,
    ).toBe(STRINGS.emptySubtitle);

    const suggestions = emptyState.querySelector(".conv-search-suggestions");
    expect(suggestions).not.toBeNull();
    expect(suggestions?.children).toHaveLength(0);
  });
});

describe("buildSuggestionButton", () => {
  it("carries the question as both the label and the query", () => {
    const button = buildSuggestionButton("What is the Datadog Agent?");

    expect(button.className).toBe("conv-search-suggestion");
    expect(button.dataset["query"]).toBe("What is the Datadog Agent?");
    expect(button.querySelector("span")?.textContent).toBe(
      "What is the Datadog Agent?",
    );
  });

  it("does not interpret markup in the question", () => {
    const button = buildSuggestionButton(XSS);

    expect(button.querySelector("script")).toBeNull();
    expect(button.textContent).toBe(XSS);
  });
});

describe("buildMessage", () => {
  it("marks the message with its role", () => {
    const { messageElement } = buildMessage("user", "hello");

    expect(messageElement.classList.contains("conv-search-message")).toBe(true);
    expect(messageElement.classList.contains("conv-search-message-user")).toBe(
      true,
    );
  });

  it("does not interpret markup in a user message", () => {
    const { messageElement, contentElement } = buildMessage("user", XSS);

    expect(messageElement.querySelector("script")).toBeNull();
    expect(contentElement.textContent).toBe(XSS);
  });

  it("leaves an assistant message empty for the stream to fill", () => {
    const { contentElement } = buildMessage("assistant");

    expect(contentElement.className).toBe("conv-search-message-content");
    expect(contentElement.textContent).toBe("");
  });
});

describe("buildMessageActionsRow", () => {
  it("offers thumbs up, thumbs down, and copy", () => {
    const row = buildMessageActionsRow();

    const actions = Array.from(
      row.querySelectorAll<HTMLButtonElement>(".conv-search-action-btn"),
    );
    expect(actions.map((action) => action.dataset["action"])).toEqual([
      "thumbs-up",
      "thumbs-down",
      "copy",
    ]);
  });

  it("starts the copy button on the copy icon, with the check hidden", () => {
    const row = buildMessageActionsRow();
    const copyButton = row.querySelector<HTMLElement>('[data-action="copy"]');

    const copyIcon = copyButton?.querySelector<HTMLElement>(".copy-icon");
    const checkIcon = copyButton?.querySelector<HTMLElement>(".check-icon");
    expect(copyIcon?.style.display).not.toBe("none");
    expect(checkIcon?.style.display).toBe("none");
  });

  it("includes a live region for feedback confirmations", () => {
    const row = buildMessageActionsRow();

    const feedback = row.querySelector(".conv-search-feedback-inline");
    expect(feedback?.getAttribute("aria-live")).toBe("polite");
  });
});

describe("buildLoadingIndicator", () => {
  it("shows a spinner and the opening status text", () => {
    const { wrapper, statusElement } = buildLoadingIndicator("Searching…");

    expect(wrapper.classList.contains("conv-search-loading-state")).toBe(true);
    expect(
      wrapper.querySelector(".conv-search-loading-spinner"),
    ).not.toBeNull();
    expect(statusElement.textContent).toBe("Searching…");
  });
});
