import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { addMessageActions } from "./actions";
import {
  FEEDBACK_TIMEOUT_MS,
  sendDocsAiFeedback,
  streamDocsAiChat,
} from "./client";
import { FEEDBACK_REASONS, STRINGS } from "./strings";
import type { FeedbackSender, LogContext } from "./types";

const CREDENTIALS = { apiUrl: "https://example.test", apiKey: "key" };
const CONTEXT: LogContext = { conversationId: "c1", isDatadogUser: undefined };
const getLogContext = () => CONTEXT;

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.body.innerHTML = "";
  delete window.DD_RUM;
});

describe("Docs AI feedback requests", () => {
  it("hands over the feedback token sent after the answer", async () => {
    const encoder = new TextEncoder();
    const chunks = [
      'data: {"type": "markdown_fragment", "content": "Hello"}\n\n',
      'data: {"type": "feedback_token", "token": "answer.1.sig"}\n\ndata: [DONE]\n\n',
    ];
    let index = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        body: {
          getReader: () => ({
            read: () =>
              Promise.resolve(
                index < chunks.length
                  ? { done: false, value: encoder.encode(chunks[index++]) }
                  : { done: true, value: undefined },
              ),
          }),
        },
      }),
    );
    const onFeedbackToken = vi.fn();

    const answer = await streamDocsAiChat({
      credentials: CREDENTIALS,
      query: "q",
      onFeedbackToken,
    });

    expect(answer).toBe("Hello");
    expect(onFeedbackToken).toHaveBeenCalledWith("answer.1.sig");
  });

  it("posts the token, rating, reasons, and conversation id", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 202 });
    vi.stubGlobal("fetch", fetchMock);

    await sendDocsAiFeedback({
      credentials: CREDENTIALS,
      token: "t",
      conversationId: "c1",
      rating: "down",
      reasons: ["incorrect"],
    });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://example.test/feedback");
    expect(init.keepalive).toBe(true);
    expect((init.headers as Record<string, string>)["X-Docs-Ai-Api-Key"]).toBe(
      "key",
    );
    expect(JSON.parse(init.body as string)).toEqual({
      data: {
        attributes: {
          feedback_token: "t",
          rating: "down",
          reasons: ["incorrect"],
          conversation_id: "c1",
        },
      },
    });
  });

  it("rejects with the HTTP status when feedback is refused", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 503 }),
    );

    await expect(
      sendDocsAiFeedback({
        credentials: CREDENTIALS,
        token: "t",
        rating: "up",
      }),
    ).rejects.toMatchObject({ status: 503 });
  });

  it("gives up on a request that never answers", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_url: string, init: RequestInit) =>
          new Promise((_resolve, reject) => {
            init.signal?.addEventListener("abort", () =>
              reject(
                Object.assign(new Error("aborted"), { name: "AbortError" }),
              ),
            );
          }),
      ),
    );

    const request = sendDocsAiFeedback({
      credentials: CREDENTIALS,
      token: "t",
      rating: "up",
    });
    vi.advanceTimersByTime(FEEDBACK_TIMEOUT_MS);

    await expect(request).rejects.toMatchObject({ name: "AbortError" });
  });
});

describe("thumbs and predefined reasons", () => {
  let addAction: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    addAction = vi.fn();
    window.DD_RUM = { addAction, addError: vi.fn() };
    document.body.innerHTML = '<div class="message"></div>';
  });

  const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

  /** Each call returns a request the test answers explicitly. */
  function controlledSender() {
    const requests: Array<{ resolve: () => void; reject: (e: Error) => void }> =
      [];
    const sendFeedback = vi.fn<FeedbackSender>(
      () =>
        new Promise<void>((resolve, reject) => {
          requests.push({ resolve, reject });
        }),
    );
    const answer = async (ok = true) => {
      const request = requests.shift();
      if (ok) request?.resolve();
      else request?.reject(new Error("Docs AI feedback failed: 503"));
      await settle();
    };
    return { sendFeedback, answer };
  }

  function renderActions(sendFeedback?: FeedbackSender) {
    const message = document.querySelector<HTMLElement>(".message")!;
    addMessageActions(message, "answer", getLogContext, sendFeedback);
    const thumb = (action: string) =>
      message.querySelector<HTMLButtonElement>(`[data-action="${action}"]`)!;
    const click = (action: string) => thumb(action).click();
    const form = () =>
      message.querySelector<HTMLFormElement>(".conv-search-feedback-form");
    const notice = () =>
      message.querySelector<HTMLElement>(".conv-search-feedback-inline")!;
    return { thumb, click, form, notice };
  }

  const pick = (form: HTMLFormElement | null, id: string) =>
    form!.querySelector<HTMLButtonElement>(`[data-reason="${id}"]`)!.click();
  const submit = (form: HTMLFormElement | null) =>
    form!.dispatchEvent(new Event("submit", { cancelable: true }));
  const reason = (form: HTMLFormElement | null, id: string) =>
    form!.querySelector<HTMLButtonElement>(`[data-reason="${id}"]`)!;
  const sendButton = (form: HTMLFormElement | null) =>
    form!.querySelector<HTMLButtonElement>(".conv-search-feedback-send")!;
  const formError = (form: HTMLFormElement | null) =>
    form!.querySelector<HTMLElement>(".conv-search-feedback-form-error")!;

  it("marks a thumbs-down only after acceptance, then offers predefined reasons", async () => {
    const { sendFeedback, answer } = controlledSender();
    const { thumb, click, form, notice } = renderActions(sendFeedback);

    click("thumbs-down");
    expect(sendFeedback).toHaveBeenLastCalledWith({ rating: "down" });
    expect(thumb("thumbs-down").classList.contains("active")).toBe(false);
    expect(thumb("thumbs-down").classList.contains("is-pending")).toBe(true);
    expect(thumb("thumbs-up").disabled).toBe(true);
    expect(form()).toBeNull();

    await answer();

    expect(thumb("thumbs-down").classList.contains("active")).toBe(true);
    expect(thumb("thumbs-up").disabled).toBe(false);
    expect(notice().textContent).toBe(STRINGS.feedbackThanks);
    expect(
      form()!.querySelector('textarea, input, [contenteditable="true"]'),
    ).toBeNull();
  });

  it("leaves the thumbs unchanged and lets the reader retry when saving fails", async () => {
    const { sendFeedback, answer } = controlledSender();
    const { thumb, click, form, notice } = renderActions(sendFeedback);

    click("thumbs-down");
    await answer(false);

    expect(thumb("thumbs-down").classList.contains("active")).toBe(false);
    expect(thumb("thumbs-down").disabled).toBe(false);
    expect(notice().classList.contains("feedback-error")).toBe(true);
    expect(notice().textContent).toBe(STRINGS.feedbackFailed);
    expect(form()).toBeNull();

    click("thumbs-down");
    expect(notice().textContent).toBe("");
    await answer();
    expect(thumb("thumbs-down").classList.contains("active")).toBe(true);
  });

  it("ignores clicks while a rating is being saved", async () => {
    const { sendFeedback, answer } = controlledSender();
    const { click } = renderActions(sendFeedback);

    click("thumbs-down");
    click("thumbs-up");
    click("thumbs-down");
    await answer();

    expect(sendFeedback).toHaveBeenCalledTimes(1);
  });

  it("sends reasons once, retaining selections on failure and logging only the selected ids", async () => {
    const { sendFeedback, answer } = controlledSender();
    const { click, form, notice } = renderActions(sendFeedback);
    click("thumbs-down");
    await answer();

    pick(form(), "sources");
    submit(form());
    expect(sendFeedback).toHaveBeenLastCalledWith({ reasons: ["sources"] });
    expect(sendButton(form()).textContent).toBe(STRINGS.feedbackReasonsSending);

    await answer(false);
    expect(reason(form(), "sources").getAttribute("aria-pressed")).toBe("true");
    expect(formError(form()).hidden).toBe(false);

    submit(form());
    await answer();
    expect(form()).toBeNull();
    expect(notice().textContent).toBe(STRINGS.feedbackReasonsThanks);
    expect(addAction).toHaveBeenLastCalledWith(
      "conversational_search_action",
      expect.objectContaining({
        action: "feedback_reasons",
        feedback_reasons: ["sources"],
        conversation_id: "c1",
      }),
    );

    click("thumbs-up");
    await answer();
    click("thumbs-down");
    await answer();
    expect(form()).toBeNull();
  });

  it("offers all six reason chips, including Other without a free-text field", async () => {
    const { sendFeedback, answer } = controlledSender();
    const { click, form } = renderActions(sendFeedback);
    click("thumbs-down");
    await answer();

    const send = sendButton(form());
    expect(
      [
        ...form()!.querySelectorAll<HTMLElement>(
          ".conv-search-feedback-reason",
        ),
      ].map((chip) => chip.dataset["reason"]),
    ).toEqual(FEEDBACK_REASONS.map((r) => r.id));
    expect(send.disabled).toBe(true);
    pick(form(), "incorrect");
    expect(send.disabled).toBe(false);
    pick(form(), "incorrect");
    expect(send.disabled).toBe(true);

    pick(form(), "other");
    pick(form(), "incomplete");
    expect(
      form()!.querySelector('textarea, input, [contenteditable="true"]'),
    ).toBeNull();
    submit(form());
    expect(sendFeedback).toHaveBeenLastCalledWith({
      reasons: ["incomplete", "other"],
    });
    await answer();
  });

  it("blocks vote changes while reasons are sending and preserves a failed submission", async () => {
    const { sendFeedback, answer } = controlledSender();
    const { thumb, click, form } = renderActions(sendFeedback);
    click("thumbs-down");
    await answer();

    pick(form(), "sources");
    const pendingForm = form();
    submit(pendingForm);

    expect(thumb("thumbs-up").disabled).toBe(true);
    expect(thumb("thumbs-down").disabled).toBe(true);
    click("thumbs-up");
    submit(pendingForm);
    expect(sendFeedback).toHaveBeenCalledTimes(2);

    await answer(false);
    expect(form()).toBe(pendingForm);
    expect(reason(form(), "sources").getAttribute("aria-pressed")).toBe("true");
    expect(formError(form()).hidden).toBe(false);
    expect(thumb("thumbs-up").disabled).toBe(false);
    expect(thumb("thumbs-down").classList.contains("active")).toBe(true);

    submit(form());
    await answer();
    expect(form()).toBeNull();
    expect(thumb("thumbs-up").disabled).toBe(false);
  });

  it("blocks form actions while a vote change is pending and restores them on failure", async () => {
    const { sendFeedback, answer } = controlledSender();
    const { click, form } = renderActions(sendFeedback);
    click("thumbs-down");
    await answer();
    pick(form(), "incomplete");
    const pendingForm = form()!;

    click("thumbs-up");
    expect(
      [...pendingForm.querySelectorAll("button")].every(
        (control) => control.disabled,
      ),
    ).toBe(true);
    submit(pendingForm);
    pendingForm
      .querySelector<HTMLButtonElement>(".conv-search-feedback-dismiss")!
      .click();
    expect(sendFeedback).toHaveBeenCalledTimes(2);
    expect(form()).toBe(pendingForm);

    await answer(false);
    expect(form()).toBe(pendingForm);
    expect(reason(form(), "incomplete").getAttribute("aria-pressed")).toBe(
      "true",
    );
    expect(
      [...pendingForm.querySelectorAll("button")].every(
        (control) => !control.disabled,
      ),
    ).toBe(true);
    submit(form());
    expect(sendFeedback).toHaveBeenLastCalledWith({ reasons: ["incomplete"] });
    await answer();
  });

  it("keeps Send disabled without selected reasons after a failed vote change", async () => {
    const { sendFeedback, answer } = controlledSender();
    const { click, form } = renderActions(sendFeedback);
    click("thumbs-down");
    await answer();

    click("thumbs-up");
    await answer(false);
    expect(sendButton(form()).disabled).toBe(true);
    expect(reason(form(), "incomplete").disabled).toBe(false);
  });

  it("locks only the answer whose feedback is pending", async () => {
    const first = controlledSender();
    const second = controlledSender();
    const { click, form } = renderActions(first.sendFeedback);
    const otherMessage = document.createElement("div");
    document.body.appendChild(otherMessage);
    addMessageActions(
      otherMessage,
      "another answer",
      getLogContext,
      second.sendFeedback,
    );
    click("thumbs-down");
    await first.answer();
    pick(form(), "incorrect");
    submit(form());

    const otherThumb = otherMessage.querySelector<HTMLButtonElement>(
      '[data-action="thumbs-up"]',
    )!;
    expect(otherThumb.disabled).toBe(false);
    otherThumb.click();
    expect(second.sendFeedback).toHaveBeenCalledWith({ rating: "up" });
    await second.answer();
    expect(otherThumb.classList.contains("active")).toBe(true);
    await first.answer(false);
    expect(reason(form(), "incorrect").getAttribute("aria-pressed")).toBe(
      "true",
    );
  });

  it("withdraws the reasons form after an accepted thumbs-up", async () => {
    const { sendFeedback, answer } = controlledSender();
    const { click, form } = renderActions(sendFeedback);

    click("thumbs-down");
    await answer();
    click("thumbs-up");
    expect(form()).not.toBeNull();
    await answer();

    expect(sendFeedback).toHaveBeenLastCalledWith({ rating: "up" });
    expect(form()).toBeNull();
  });

  it("closes the form without submitting an empty selection", async () => {
    const { sendFeedback, answer } = controlledSender();
    const { click, form } = renderActions(sendFeedback);
    click("thumbs-down");
    await answer();

    submit(form());
    expect(sendFeedback).toHaveBeenCalledTimes(1);
    form()!
      .querySelector<HTMLButtonElement>(".conv-search-feedback-dismiss")!
      .click();
    expect(form()).toBeNull();
  });

  it("marks the reaction immediately for answers without feedback support", () => {
    const { thumb, click, form } = renderActions();

    click("thumbs-down");

    expect(thumb("thumbs-down").classList.contains("active")).toBe(true);
    expect(form()).toBeNull();
  });
});
