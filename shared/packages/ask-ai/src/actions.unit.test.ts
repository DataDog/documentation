import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { addMessageActions, injectCodeCopyButtons } from "./actions";
import { STRINGS } from "./strings";
import type { LogContext } from "./types";

const CONTEXT: LogContext = {
  conversationId: "dd_docsai_abc",
  isDatadogUser: undefined,
};
const getLogContext = () => CONTEXT;

let writeText: ReturnType<typeof vi.fn>;
let addAction: ReturnType<typeof vi.fn>;

function stubClipboard(result: Promise<void>) {
  writeText = vi.fn().mockReturnValue(result);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
}

/** A rendered assistant message, ready for an actions row. */
function messageElement(): HTMLElement {
  const element = document.createElement("div");
  element.className = "conv-search-message conv-search-message-assistant";
  return element;
}

function actionButton(row: HTMLElement, action: string): HTMLButtonElement {
  const button = row.querySelector<HTMLButtonElement>(
    `[data-action="${action}"]`,
  );
  if (!button) throw new Error(`no ${action} button`);
  return button;
}

beforeEach(() => {
  vi.useFakeTimers();
  stubClipboard(Promise.resolve());

  addAction = vi.fn();
  window.DD_RUM = { addAction, addError: vi.fn() };
});

afterEach(() => {
  vi.useRealTimers();
  delete window.DD_RUM;
  vi.restoreAllMocks();
});

describe("addMessageActions", () => {
  it("appends an actions row to the message", () => {
    const message = messageElement();
    addMessageActions(message, "the answer", getLogContext);

    expect(message.querySelector(".conv-search-message-actions")).not.toBeNull();
  });

  it("marks the chosen thumb active and confirms the feedback", () => {
    const message = messageElement();
    addMessageActions(message, "the answer", getLogContext);
    const row = message.querySelector<HTMLElement>(
      ".conv-search-message-actions",
    )!;

    actionButton(row, "thumbs-up").click();

    expect(actionButton(row, "thumbs-up").classList.contains("active")).toBe(true);
    expect(row.querySelector(".conv-search-feedback-inline")?.textContent).toBe(
      STRINGS.feedbackThanks,
    );
  });

  it("moves the active state when the other thumb is chosen", () => {
    const message = messageElement();
    addMessageActions(message, "the answer", getLogContext);
    const row = message.querySelector<HTMLElement>(
      ".conv-search-message-actions",
    )!;

    actionButton(row, "thumbs-up").click();
    actionButton(row, "thumbs-down").click();

    expect(actionButton(row, "thumbs-up").classList.contains("active")).toBe(false);
    expect(actionButton(row, "thumbs-down").classList.contains("active")).toBe(true);
  });

  it("does not log a second time when the same thumb is clicked twice", () => {
    const message = messageElement();
    addMessageActions(message, "the answer", getLogContext);
    const row = message.querySelector<HTMLElement>(
      ".conv-search-message-actions",
    )!;

    actionButton(row, "thumbs-up").click();
    actionButton(row, "thumbs-up").click();

    const feedbackEvents = addAction.mock.calls.filter(
      ([, payload]) => (payload as { action: string }).action === "feedback",
    );
    expect(feedbackEvents).toHaveLength(1);
  });

  it("logs the feedback with its polarity and the response", () => {
    const message = messageElement();
    addMessageActions(message, "the answer", getLogContext);
    const row = message.querySelector<HTMLElement>(
      ".conv-search-message-actions",
    )!;

    actionButton(row, "thumbs-down").click();

    expect(addAction).toHaveBeenCalledWith(
      "conversational_search_action",
      expect.objectContaining({
        action: "feedback",
        feedback: "negative",
        response_content: "the answer",
        conversation_id: "dd_docsai_abc",
      }),
    );
  });

  it("clears the feedback message after it has been read", () => {
    const message = messageElement();
    addMessageActions(message, "the answer", getLogContext);
    const row = message.querySelector<HTMLElement>(
      ".conv-search-message-actions",
    )!;
    const feedback = row.querySelector<HTMLElement>(
      ".conv-search-feedback-inline",
    )!;

    actionButton(row, "thumbs-up").click();
    expect(feedback.textContent).not.toBe("");

    vi.advanceTimersByTime(2000);
    expect(feedback.textContent).toBe("");
    expect(feedback.classList.contains("feedback-success")).toBe(false);
  });

  it("copies the whole response and logs it as a full response", () => {
    const message = messageElement();
    addMessageActions(message, "the answer", getLogContext);
    const row = message.querySelector<HTMLElement>(
      ".conv-search-message-actions",
    )!;

    actionButton(row, "copy").click();

    expect(writeText).toHaveBeenCalledWith("the answer");
    expect(addAction).toHaveBeenCalledWith(
      "conversational_search_action",
      expect.objectContaining({
        action: "copy",
        copy_type: "full_response",
        content_length: "the answer".length,
      }),
    );
  });

  it("swaps to the check icon and back after copying", () => {
    const message = messageElement();
    addMessageActions(message, "the answer", getLogContext);
    const row = message.querySelector<HTMLElement>(
      ".conv-search-message-actions",
    )!;
    const copy = actionButton(row, "copy");

    copy.click();
    expect(copy.querySelector<HTMLElement>(".copy-icon")?.style.display).toBe("none");
    expect(copy.querySelector<HTMLElement>(".check-icon")?.style.display).toBe("block");

    vi.advanceTimersByTime(1200);
    expect(copy.querySelector<HTMLElement>(".copy-icon")?.style.display).toBe("block");
    expect(copy.querySelector<HTMLElement>(".check-icon")?.style.display).toBe("none");
  });

  it("reports a clipboard rejection instead of failing silently", async () => {
    stubClipboard(Promise.reject(new Error("denied")));

    const message = messageElement();
    addMessageActions(message, "the answer", getLogContext);
    const row = message.querySelector<HTMLElement>(
      ".conv-search-message-actions",
    )!;

    actionButton(row, "copy").click();
    await vi.waitFor(() =>
      expect(
        row.querySelector(".conv-search-feedback-inline")?.textContent,
      ).toBe(STRINGS.copyFailed),
    );
  });
});

describe("injectCodeCopyButtons", () => {
  function containerWithCode(code: string): HTMLElement {
    const container = document.createElement("div");
    container.innerHTML = `<pre><code>${code}</code></pre>`;
    return container;
  }

  it("adds one button per code block", () => {
    const container = document.createElement("div");
    container.innerHTML = "<pre><code>one</code></pre><pre><code>two</code></pre>";

    injectCodeCopyButtons(container, getLogContext);

    expect(container.querySelectorAll(".conv-search-code-copy")).toHaveLength(2);
  });

  it("does not add a second button to a block it has already handled", () => {
    const container = containerWithCode("one");

    injectCodeCopyButtons(container, getLogContext);
    injectCodeCopyButtons(container, getLogContext);

    expect(container.querySelectorAll(".conv-search-code-copy")).toHaveLength(1);
  });

  it("copies the code and logs it as a snippet", () => {
    const container = containerWithCode("datadog-agent status");
    injectCodeCopyButtons(container, getLogContext);

    container.querySelector<HTMLButtonElement>(".conv-search-code-copy")!.click();

    expect(writeText).toHaveBeenCalledWith("datadog-agent status");
    expect(addAction).toHaveBeenCalledWith(
      "conversational_search_action",
      expect.objectContaining({
        action: "copy",
        copy_type: "snippet",
        content_length: "datadog-agent status".length,
      }),
    );
  });

  it("does not let the click reach the message underneath", () => {
    const container = containerWithCode("one");
    const onContainerClick = vi.fn();
    container.addEventListener("click", onContainerClick);

    injectCodeCopyButtons(container, getLogContext);
    container.querySelector<HTMLButtonElement>(".conv-search-code-copy")!.click();

    expect(onContainerClick).not.toHaveBeenCalled();
  });
});
