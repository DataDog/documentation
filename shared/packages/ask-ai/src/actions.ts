import { checkIcon, copyIcon } from "./icons";
import { logAction } from "./logger";
import { buildMessageActionsRow } from "./markup";
import { FEEDBACK_REASONS, STRINGS } from "./strings";
import type { FeedbackSender, LogContextProvider } from "./types";

/** How long the check icon stays up after a successful copy. */
const COPIED_ICON_MS = 1200;
/** How long an inline feedback message stays on screen. */
const FEEDBACK_MS = 2000;

const feedbackHideTimers = new WeakMap<
  HTMLElement,
  ReturnType<typeof setTimeout>
>();

/**
 * Adds the thumbs / copy row under a finished answer.
 *
 * Hugo also passes the originating query here; nothing reads it, so it is not
 * a parameter.
 *
 * `sendFeedback` is present only for a completed answer the API signed with a
 * feedback token. Without it, a rating is logged but not sent to the API.
 */
export function addMessageActions(
  messageElement: HTMLElement,
  response: string,
  getLogContext: LogContextProvider,
  sendFeedback?: FeedbackSender,
): void {
  const row = buildMessageActionsRow();

  row
    .querySelectorAll<HTMLButtonElement>(".conv-search-action-btn")
    .forEach((button) => {
      button.addEventListener("click", () => {
        handleMessageAction(button, response, getLogContext, sendFeedback);
      });
    });

  messageElement.appendChild(row);
}

function handleMessageAction(
  button: HTMLButtonElement,
  response: string,
  getLogContext: LogContextProvider,
  sendFeedback: FeedbackSender | undefined,
): void {
  const action = button.dataset["action"];
  switch (action) {
    case "thumbs-up":
    case "thumbs-down": {
      // A rating is given once per response; a second click on the same thumb
      // is not a second signal.
      if (button.classList.contains("active") || button.disabled) return;
      const feedback = action === "thumbs-up" ? "positive" : "negative";
      if (sendFeedback) {
        void submitRating(
          button,
          feedback,
          response,
          getLogContext,
          sendFeedback,
        );
      } else {
        markRating(button, feedback, response, getLogContext);
      }
      break;
    }
    case "copy":
      copyFullResponse(button, response, getLogContext);
      break;
  }
}

function markRating(
  button: HTMLButtonElement,
  feedback: "positive" | "negative",
  response: string,
  getLogContext: LogContextProvider,
): void {
  const opposite = feedback === "positive" ? "thumbs-down" : "thumbs-up";
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

/**
 * Disables both thumbs and any open reasons form while a feedback request is
 * in flight, so a vote change cannot remove a form whose request is pending.
 * Returns `null` when a request is already in flight, otherwise the unlock.
 */
function lockFeedback(row: HTMLElement): (() => void) | null {
  if (row.getAttribute("aria-busy") === "true") return null;

  const form = reasonsFormAfter(row);
  const controls = [
    ...row.querySelectorAll<HTMLButtonElement>(
      '[data-action="thumbs-up"], [data-action="thumbs-down"]',
    ),
    ...(form?.querySelectorAll<HTMLButtonElement>("button") ?? []),
  ].map((control) => [control, control.disabled] as const);

  controls.forEach(([control]) => (control.disabled = true));
  row.setAttribute("aria-busy", "true");

  return () => {
    controls.forEach(([control, disabled]) => (control.disabled = disabled));
    row.removeAttribute("aria-busy");
  };
}

/**
 * Confirms a rating only after the API accepts it. A failure leaves the
 * previous selection in place.
 */
async function submitRating(
  button: HTMLButtonElement,
  feedback: "positive" | "negative",
  response: string,
  getLogContext: LogContextProvider,
  sendFeedback: FeedbackSender,
): Promise<void> {
  const row = button.parentElement;
  if (!row) return;
  const unlock = lockFeedback(row);
  if (!unlock) return;

  clearFeedback(button);
  button.classList.add("is-pending");

  let sent = false;
  try {
    await sendFeedback({ rating: feedback === "positive" ? "up" : "down" });
    sent = true;
  } catch {
    showFeedback(button, STRINGS.feedbackFailed, true);
  } finally {
    button.classList.remove("is-pending");
    unlock();
  }
  if (!sent) return;

  markRating(button, feedback, response, getLogContext);
  if (feedback === "positive") reasonsFormAfter(row)?.remove();
  else showReasonsForm(row, getLogContext, sendFeedback);
}

function reasonsFormAfter(row: HTMLElement): HTMLFormElement | null {
  const next = row.nextElementSibling;
  return next instanceof HTMLFormElement &&
    next.classList.contains("conv-search-feedback-form")
    ? next
    : null;
}

let reasonsFormCount = 0;

/** Optional predefined reasons after a thumbs-down, sent once per answer. */
function showReasonsForm(
  row: HTMLElement,
  getLogContext: LogContextProvider,
  sendFeedback: FeedbackSender,
): void {
  if (row.dataset["reasonsSubmitted"] || reasonsFormAfter(row)) return;

  const form = document.createElement("form");
  form.className = "conv-search-feedback-form";

  reasonsFormCount += 1;
  const title = document.createElement("p");
  title.className = "conv-search-feedback-form-title";
  title.id = `conv-search-feedback-title-${reasonsFormCount}`;
  const optional = document.createElement("span");
  optional.textContent = STRINGS.feedbackReasonsOptional;
  title.append(`${STRINGS.feedbackReasonsTitle} `, optional);

  const reasons = document.createElement("div");
  reasons.className = "conv-search-feedback-reasons";
  reasons.setAttribute("role", "group");
  reasons.setAttribute("aria-labelledby", title.id);
  const chips = FEEDBACK_REASONS.map(({ id, label }) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "conv-search-feedback-reason";
    chip.dataset["reason"] = id;
    chip.textContent = label;
    chip.setAttribute("aria-pressed", "false");
    reasons.appendChild(chip);
    return chip;
  });
  const selectedReasons = (): string[] =>
    chips
      .filter((chip) => chip.getAttribute("aria-pressed") === "true")
      .map((chip) => chip.dataset["reason"] ?? "");

  const buttons = document.createElement("div");
  buttons.className = "conv-search-feedback-form-buttons";
  const dismiss = document.createElement("button");
  dismiss.type = "button";
  dismiss.className = "conv-search-feedback-dismiss";
  dismiss.textContent = STRINGS.feedbackReasonsDismiss;
  const send = document.createElement("button");
  send.type = "submit";
  send.className = "conv-search-feedback-send";
  send.textContent = STRINGS.feedbackReasonsSend;
  send.disabled = true;
  buttons.append(dismiss, send);

  const error = document.createElement("p");
  error.className = "conv-search-feedback-form-error";
  error.setAttribute("role", "alert");
  error.hidden = true;

  form.append(title, reasons, error, buttons);

  chips.forEach((chip) =>
    chip.addEventListener("click", () => {
      const pressed = chip.getAttribute("aria-pressed") === "true";
      chip.setAttribute("aria-pressed", String(!pressed));
      send.disabled = selectedReasons().length === 0;
    }),
  );
  dismiss.addEventListener("click", () => form.remove());

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    void submitReasons();
  });

  const submitReasons = async (): Promise<void> => {
    const picked = selectedReasons();
    if (picked.length === 0) return;
    const unlock = lockFeedback(row);
    if (!unlock) return;

    error.hidden = true;
    send.textContent = STRINGS.feedbackReasonsSending;
    try {
      await sendFeedback({ reasons: picked });
    } catch {
      error.textContent = STRINGS.feedbackReasonsFailed;
      error.hidden = false;
      form.scrollIntoView?.({ block: "nearest", behavior: "smooth" });
      return;
    } finally {
      unlock();
      send.textContent = STRINGS.feedbackReasonsSend;
    }

    logAction(
      "Conversational Search Feedback Reasons",
      { action: "feedback_reasons", feedback_reasons: picked },
      getLogContext(),
    );
    row.dataset["reasonsSubmitted"] = "true";
    form.remove();

    const thumbsDown = row.querySelector<HTMLElement>(
      '[data-action="thumbs-down"]',
    );
    if (thumbsDown) showFeedback(thumbsDown, STRINGS.feedbackReasonsThanks);
  };

  row.after(form);
  form.scrollIntoView?.({ block: "nearest", behavior: "smooth" });
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

function clearFeedback(button: HTMLElement): void {
  const feedback = button.parentElement?.querySelector<HTMLElement>(
    ".conv-search-feedback-inline",
  );
  if (!feedback) return;

  clearTimeout(feedbackHideTimers.get(feedback));
  feedbackHideTimers.delete(feedback);
  feedback.classList.remove("feedback-success", "feedback-error");
  feedback.textContent = "";
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
