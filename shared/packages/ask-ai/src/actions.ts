import { checkIcon, copyIcon } from "./icons";
import { logAction } from "./logger";
import { buildMessageActionsRow } from "./markup";
import { STRINGS } from "./strings";
import type { LogContextProvider } from "./types";

/** How long the check icon stays up after a successful copy. */
const COPIED_ICON_MS = 1200;
/** How long an inline feedback message stays on screen. */
const FEEDBACK_MS = 2000;

const feedbackHideTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

/**
 * Adds the thumbs / copy row under a finished answer.
 *
 * Hugo also passes the originating query here; nothing reads it, so it is not
 * a parameter.
 */
export function addMessageActions(
  messageElement: HTMLElement,
  response: string,
  getLogContext: LogContextProvider,
): void {
  const row = buildMessageActionsRow();

  row
    .querySelectorAll<HTMLButtonElement>(".conv-search-action-btn")
    .forEach((button) => {
      button.addEventListener("click", () => {
        handleMessageAction(button, response, getLogContext);
      });
    });

  messageElement.appendChild(row);
}

function handleMessageAction(
  button: HTMLButtonElement,
  response: string,
  getLogContext: LogContextProvider,
): void {
  switch (button.dataset["action"]) {
    case "thumbs-up":
      recordFeedback(button, "positive", response, getLogContext);
      break;
    case "thumbs-down":
      recordFeedback(button, "negative", response, getLogContext);
      break;
    case "copy":
      copyFullResponse(button, response, getLogContext);
      break;
  }
}

function recordFeedback(
  button: HTMLButtonElement,
  feedback: "positive" | "negative",
  response: string,
  getLogContext: LogContextProvider,
): void {
  // Feedback is given once per response; a second click on the same thumb is
  // not a second signal.
  if (button.classList.contains("active")) return;

  const opposite =
    feedback === "positive" ? "thumbs-down" : "thumbs-up";
  button.parentElement
    ?.querySelector(`[data-action="${opposite}"]`)
    ?.classList.remove("active");

  button.classList.add("active");
  showFeedback(button, STRINGS.feedbackThanks);

  logAction(
    "Conversational Search Feedback",
    { action: "feedback", feedback, response_content: response },
    getLogContext(),
  );
}

function copyFullResponse(
  button: HTMLButtonElement,
  response: string,
  getLogContext: LogContextProvider,
): void {
  copyToClipboard(response, () =>
    showFeedback(button, STRINGS.copyFailed, true),
  );

  // Confirmed optimistically, as Hugo does: a rejection replaces the message.
  showFeedback(button, STRINGS.copySucceeded);
  flashCopiedIcon(button);

  logAction(
    "Conversational Search Copy",
    {
      action: "copy",
      copy_type: "full_response",
      content_length: response.length,
    },
    getLogContext(),
  );
}

/** Puts a copy button on every code block in a rendered answer. */
export function injectCodeCopyButtons(
  container: HTMLElement,
  getLogContext: LogContextProvider,
): void {
  container.querySelectorAll("pre").forEach((pre) => {
    if (pre.querySelector(".conv-search-code-copy")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "conv-search-code-copy";
    button.setAttribute("aria-label", STRINGS.copyCode);
    button.innerHTML =
      copyIcon({ size: 14, className: "copy-icon" }) +
      checkIcon({ size: 14, className: "check-icon", style: "display:none" });

    button.addEventListener("click", (event) => {
      // The message body listens for clicks to close source tooltips.
      event.stopPropagation();

      const code = pre.querySelector("code");
      const snippet = (code ?? pre).textContent ?? "";

      copyToClipboard(snippet);
      flashCopiedIcon(button);

      logAction(
        "Conversational Search Copy",
        {
          action: "copy",
          copy_type: "snippet",
          content_length: snippet.length,
        },
        getLogContext(),
      );
    });

    pre.appendChild(button);
  });
}

/** Rejects when the document is not focused or permission is refused. */
function copyToClipboard(value: string, onFailure?: () => void): void {
  navigator.clipboard.writeText(value).catch(() => onFailure?.());
}

/** Swaps a button's copy icon for a tick, then swaps it back. */
function flashCopiedIcon(button: HTMLElement): void {
  const copy = button.querySelector<HTMLElement>(".copy-icon");
  const check = button.querySelector<HTMLElement>(".check-icon");
  if (!copy || !check) return;

  copy.style.display = "none";
  check.style.display = "block";

  setTimeout(() => {
    copy.style.display = "block";
    check.style.display = "none";
  }, COPIED_ICON_MS);
}

function showFeedback(
  button: HTMLElement,
  message: string,
  isError = false,
): void {
  const feedback = button.parentElement?.querySelector<HTMLElement>(
    ".conv-search-feedback-inline",
  );
  if (!feedback) return;

  feedback.classList.remove("feedback-success", "feedback-error");
  // Forces a reflow so the fade-in replays when the same message repeats.
  void feedback.offsetWidth;

  feedback.textContent = message;
  feedback.classList.add(isError ? "feedback-error" : "feedback-success");

  const pending = feedbackHideTimers.get(feedback);
  if (pending) clearTimeout(pending);

  feedbackHideTimers.set(
    feedback,
    setTimeout(() => {
      feedback.classList.remove("feedback-success", "feedback-error");
      feedback.textContent = "";
      feedbackHideTimers.delete(feedback);
    }, FEEDBACK_MS),
  );
}
