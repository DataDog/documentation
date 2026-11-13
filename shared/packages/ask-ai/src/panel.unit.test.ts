import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AskAiPanel } from "./panel";
import { STRINGS } from "./strings";

const CREDENTIALS = {
  apiUrl: "https://dd.datad0g.com/api/unstable/docs-ai",
  apiKey: "ddpub_test",
};

let panel: AskAiPanel;

/** Serves `chunks` as an OK SSE body, one read per chunk. */
function mockStream(chunks: string[]) {
  const encoder = new TextEncoder();
  let index = 0;

  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
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
  });

  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

/**
 * Serves `chunks`, then holds the stream open until the request is aborted,
 * the way a real stream behaves when the reader presses stop mid-answer.
 */
function mockOpenStream(chunks: string[]) {
  const encoder = new TextEncoder();
  let index = 0;

  const fetchMock = vi.fn((_url: string, init: RequestInit) =>
    Promise.resolve({
      ok: true,
      status: 200,
      body: {
        getReader: () => ({
          read: () =>
            index < chunks.length
              ? Promise.resolve({
                  done: false,
                  value: encoder.encode(chunks[index++]),
                })
              : new Promise((_resolve, reject) => {
                  init.signal?.addEventListener("abort", () =>
                    reject(new DOMException("Aborted", "AbortError")),
                  );
                }),
        }),
      },
    }),
  );

  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

/** Lets a pending stream deliver what it has queued. */
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

function sse(type: string, content: string): string {
  return `data: ${JSON.stringify({ type, content })}\n`;
}

function mount(): AskAiPanel {
  panel = new AskAiPanel({ credentials: CREDENTIALS });
  return panel;
}

function query<T extends Element>(selector: string): T {
  const found = document.querySelector<T>(selector);
  if (!found) throw new Error(`no ${selector}`);
  return found;
}

function pressKey(target: EventTarget, init: KeyboardEventInit): void {
  target.dispatchEvent(
    new KeyboardEvent("keydown", { bubbles: true, cancelable: true, ...init }),
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("style");
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
  });
});

afterEach(() => {
  panel?.teardown();
  document.body.innerHTML = "";
  document.body.className = "";
  document.body.removeAttribute("style");
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("mounting", () => {
  it("appends the button, overlay, and panel to the body", () => {
    mount();

    expect(document.querySelector(".conv-search-float-btn")).not.toBeNull();
    expect(document.querySelector(".conv-search-overlay")).not.toBeNull();
    expect(document.querySelector(".conv-search-sidebar")).not.toBeNull();
  });

  it("injects its stylesheet exactly once across panels", () => {
    mount();
    const second = new AskAiPanel({ credentials: CREDENTIALS });

    expect(document.querySelectorAll("style[data-ask-ai]")).toHaveLength(1);
    second.teardown();
  });

  it("starts on the empty state with three suggestions", () => {
    mount();

    expect(document.querySelector(".conv-search-empty-state")).not.toBeNull();
    expect(document.querySelectorAll(".conv-search-suggestion")).toHaveLength(
      3,
    );
  });

  it("reports itself ready", () => {
    expect(mount().ready).toBe(true);
  });
});

describe("view mode", () => {
  it("defaults to fullscreen", () => {
    mount();

    expect(
      query(".conv-search-sidebar").classList.contains("mode-fullscreen"),
    ).toBe(true);
  });

  it("restores a stored mode", () => {
    localStorage.setItem("docs-ai-view-mode", "sidebar");
    mount();

    expect(
      query(".conv-search-sidebar").classList.contains("mode-sidebar"),
    ).toBe(true);
  });

  it("falls back to the default when the stored value is not a mode", () => {
    localStorage.setItem("docs-ai-view-mode", "notamode");
    mount();

    expect(
      query(".conv-search-sidebar").classList.contains("mode-fullscreen"),
    ).toBe(true);
  });

  it("persists and marks the mode chosen from the menu", () => {
    mount();

    query<HTMLButtonElement>('[data-mode="floating"]').click();

    expect(localStorage.getItem("docs-ai-view-mode")).toBe("floating");
    expect(
      query(".conv-search-sidebar").classList.contains("mode-floating"),
    ).toBe(true);
    expect(query('[data-mode="floating"]').getAttribute("aria-checked")).toBe(
      "true",
    );
    expect(query('[data-mode="fullscreen"]').getAttribute("aria-checked")).toBe(
      "false",
    );
  });

  it("pushes the body aside only while open in sidebar mode", () => {
    localStorage.setItem("docs-ai-view-mode", "sidebar");
    mount();
    expect(document.body.classList.contains("docs-ai-sidebar-pushed")).toBe(
      false,
    );

    panel.open();
    expect(document.body.classList.contains("docs-ai-sidebar-pushed")).toBe(
      true,
    );

    panel.close();
    expect(document.body.classList.contains("docs-ai-sidebar-pushed")).toBe(
      false,
    );
  });
});

describe("panel size", () => {
  it("applies the stored size as a custom property", () => {
    localStorage.setItem("docs-ai-sidebar-width", "520");
    mount();

    expect(
      document.documentElement.style.getPropertyValue(
        "--docs-ai-sidebar-width",
      ),
    ).toBe("520px");
  });

  it("clamps a stored size that is below the minimum", () => {
    localStorage.setItem("docs-ai-sidebar-width", "10");
    mount();

    expect(
      document.documentElement.style.getPropertyValue(
        "--docs-ai-sidebar-width",
      ),
    ).toBe("280px");
  });

  it("uses the default when the stored value is not a number", () => {
    localStorage.setItem("docs-ai-floating-height", "wide please");
    mount();

    expect(
      document.documentElement.style.getPropertyValue(
        "--docs-ai-floating-height",
      ),
    ).toBe("570px");
  });
});

describe("open and close", () => {
  it("opens the panel and hides the floating button", () => {
    mount();
    panel.open();

    expect(query(".conv-search-sidebar").classList.contains("open")).toBe(true);
    expect(query(".conv-search-float-btn").classList.contains("hidden")).toBe(
      true,
    );
  });

  it("closes on Escape", () => {
    mount();
    panel.open();

    pressKey(document, { key: "Escape" });

    expect(query(".conv-search-sidebar").classList.contains("open")).toBe(
      false,
    );
  });

  it("closes the mode menu on Escape before closing the panel", () => {
    mount();
    panel.open();
    query<HTMLButtonElement>(".conv-search-mode-toggle").click();
    expect(query(".conv-search-mode-menu").classList.contains("open")).toBe(
      true,
    );

    pressKey(document, { key: "Escape" });

    expect(query(".conv-search-mode-menu").classList.contains("open")).toBe(
      false,
    );
    expect(query(".conv-search-sidebar").classList.contains("open")).toBe(true);
  });

  it("closes when the overlay is clicked", () => {
    mount();
    panel.open();

    query<HTMLElement>(".conv-search-overlay").click();

    expect(query(".conv-search-sidebar").classList.contains("open")).toBe(
      false,
    );
  });
});

describe("the input", () => {
  it("submits on Enter", () => {
    mount();
    const send = vi.spyOn(panel, "sendMessage").mockResolvedValue();

    const input = query<HTMLTextAreaElement>(".conv-search-input");
    input.value = "hello";
    pressKey(input, { key: "Enter" });

    expect(send).toHaveBeenCalledTimes(1);
  });

  it("does not submit on Shift+Enter", () => {
    mount();
    const send = vi.spyOn(panel, "sendMessage").mockResolvedValue();

    pressKey(query(".conv-search-input"), { key: "Enter", shiftKey: true });

    expect(send).not.toHaveBeenCalled();
  });

  it("does not submit the Enter that confirms an IME composition", () => {
    mount();
    const send = vi.spyOn(panel, "sendMessage").mockResolvedValue();

    pressKey(query(".conv-search-input"), { key: "Enter", keyCode: 229 });

    expect(send).not.toHaveBeenCalled();
  });
});

describe("sending a message", () => {
  it("renders the question as text and the answer as markdown", async () => {
    mockStream([
      sse("markdown_fragment", "Use **the Agent**"),
      "data: [DONE]\n",
    ]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    await panel.sendMessage();

    const messages = document.querySelectorAll(".conv-search-message-content");
    expect(messages[0]?.textContent).toBe("how?");
    expect(messages[1]?.querySelector("strong")?.textContent).toBe("the Agent");
  });

  it("does not interpret markup in the question", async () => {
    mockStream(["data: [DONE]\n"]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value =
      "<script>alert(1)</script>";
    await panel.sendMessage();

    const first = document.querySelectorAll(".conv-search-message-content")[0];
    expect(first?.querySelector("script")).toBeNull();
    expect(first?.textContent).toBe("<script>alert(1)</script>");
  });

  it("clears the empty state and offers actions on the answer", async () => {
    mockStream([sse("markdown_fragment", "an answer"), "data: [DONE]\n"]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    await panel.sendMessage();

    expect(document.querySelector(".conv-search-empty-state")).toBeNull();
    expect(
      document.querySelector(".conv-search-message-actions"),
    ).not.toBeNull();
  });

  it("says so when the stream produces nothing", async () => {
    mockStream(["data: [DONE]\n"]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    await panel.sendMessage();

    expect(query(".conv-search-turn-error p").textContent).toBe(
      STRINGS.emptyResponse,
    );
    expect(query(".conv-search-retry")).not.toBeNull();
  });

  it("reports a failed request without leaving the panel stuck", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 503, body: null }),
    );
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    await panel.sendMessage();

    expect(query(".conv-search-turn-error p").textContent).toBe(
      STRINGS.requestFailed,
    );
    expect(query(".conv-search-retry")).not.toBeNull();
    expect(query<HTMLButtonElement>(".conv-search-send").disabled).toBe(false);
  });

  it("does not offer a retry when the request is rejected", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 400, body: null }),
    );
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    await panel.sendMessage();

    expect(query(".conv-search-turn-error p").textContent).toBe(
      STRINGS.requestRejected,
    );
    expect(document.querySelector(".conv-search-retry")).toBeNull();
  });

  it("shows a server error and retries the same question", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockStream([
      sse("markdown_fragment", "partial"),
      `data: ${JSON.stringify({ type: "error", content: "Busy. Try again.", retryable: true })}\n`,
      "data: [DONE]\n",
    ]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    await panel.sendMessage();

    expect(query(".conv-search-turn-error p").textContent).toBe(
      "Busy. Try again.",
    );
    // The partial answer is discarded unless the server says to keep it.
    expect(
      query<HTMLElement>(".conv-search-turn .conv-search-message-content")
        .hidden,
    ).toBe(true);

    const retryFetch = mockStream([
      sse("markdown_fragment", "the answer"),
      "data: [DONE]\n",
    ]);
    query<HTMLButtonElement>(".conv-search-retry").click();
    await flush();
    await flush();

    expect(document.querySelector(".conv-search-turn-error")).toBeNull();
    const body = JSON.parse(retryFetch.mock.calls[0]?.[1].body as string);
    expect(body.data.attributes.query).toBe("how?");
    // The failed question was dropped, so the retry is a first message again.
    expect(body.data.attributes.history).toBeUndefined();
  });

  it("keeps the server's non-retryable error out of the copy", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockStream([
      `data: ${JSON.stringify({ type: "error", content: "Try again.", retryable: false })}\n`,
      "data: [DONE]\n",
    ]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    await panel.sendMessage();

    expect(query(".conv-search-turn-error p").textContent).toBe(
      STRINGS.requestNotRetryable,
    );
    expect(document.querySelector(".conv-search-retry")).toBeNull();
  });

  it("ignores an empty input", async () => {
    const fetchMock = mockStream(["data: [DONE]\n"]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "   ";
    await panel.sendMessage();

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("asks for a query rewrite on the first message only", async () => {
    const fetchMock = mockStream([
      sse("markdown_fragment", "first"),
      "data: [DONE]\n",
    ]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "first question";
    await panel.sendMessage();

    mockStream([sse("markdown_fragment", "second"), "data: [DONE]\n"]);
    query<HTMLTextAreaElement>(".conv-search-input").value = "second question";
    await panel.sendMessage();

    const firstBody = JSON.parse(fetchMock.mock.calls[0]?.[1].body as string);
    expect(firstBody.data.attributes.rewrite_query).toBe(true);

    const laterCalls = (globalThis.fetch as ReturnType<typeof vi.fn>).mock
      .calls;
    const secondBody = JSON.parse(laterCalls[0]?.[1].body as string);
    expect(secondBody.data.attributes.rewrite_query).toBeUndefined();
    expect(secondBody.data.attributes.history).toEqual([
      { role: "user", content: "first question" },
      { role: "assistant", content: "first" },
    ]);
  });
});

describe("research timeline", () => {
  it("shows the research above the answer and settles when it finishes", async () => {
    mockStream([
      sse("thinking", "Searching documentation..."),
      `data: ${JSON.stringify({ type: "thinking", content: "Reviewing relevant pages", retrieved_pages: [{ title: "Agent", distinct_base_url: "/agent/" }] })}\n`,
      sse("markdown_fragment", "an answer"),
      "data: [DONE]\n",
    ]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    await panel.sendMessage();

    const turn = query(".conv-search-turn");
    const activity = turn.querySelector<HTMLElement>(".conv-search-activity");
    expect(activity?.dataset["phase"]).toBe("done");
    expect(activity?.textContent).toContain("Found 1 relevant page");
    // The timeline comes first, then the answer.
    expect(turn.firstElementChild).toBe(activity);
  });
});

describe("stopping an answer", () => {
  it("turns send into stop while an answer streams", async () => {
    mockOpenStream([sse("markdown_fragment", "partial")]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    const sending = panel.sendMessage();
    await flush();

    const send = query<HTMLButtonElement>(".conv-search-send");
    expect(send.classList.contains("is-stop")).toBe(true);
    expect(send.getAttribute("aria-label")).toBe(STRINGS.stopGenerating);

    send.click();
    await sending;

    expect(send.classList.contains("is-stop")).toBe(false);
    expect(send.getAttribute("aria-label")).toBe(STRINGS.send);
  });

  it("keeps the partial answer and sends it as history", async () => {
    mockOpenStream([sse("markdown_fragment", "partial answer")]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "first";
    const sending = panel.sendMessage();
    await flush();
    query<HTMLButtonElement>(".conv-search-send").click();
    await sending;

    const turn = query(".conv-search-turn");
    expect(
      turn.querySelector(".conv-search-message-content")?.textContent,
    ).toContain("partial answer");
    expect(turn.querySelector(".conv-search-stream-caret")).toBeNull();
    expect(
      turn.querySelector<HTMLElement>(".conv-search-activity")?.dataset[
        "phase"
      ],
    ).toBe("stopped");

    const next = mockStream([sse("markdown_fragment", "ok"), "data: [DONE]\n"]);
    query<HTMLTextAreaElement>(".conv-search-input").value = "second";
    await panel.sendMessage();

    const body = JSON.parse(next.mock.calls[0]?.[1].body as string);
    expect(body.data.attributes.history).toEqual([
      { role: "user", content: "first" },
      { role: "assistant", content: "partial answer" },
    ]);
  });

  it("removes the empty answer when stopped before any text", async () => {
    mockOpenStream([]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    const sending = panel.sendMessage();
    await flush();
    query<HTMLButtonElement>(".conv-search-send").click();
    await sending;

    const turn = query(".conv-search-turn");
    expect(turn.querySelector(".conv-search-message-content")).toBeNull();
    expect(turn.querySelector(".conv-search-message-actions")).toBeNull();
  });
});

describe("feedback", () => {
  it("sends a rating signed with the answer's feedback token", async () => {
    mockStream([
      sse("markdown_fragment", "an answer"),
      `data: ${JSON.stringify({ type: "feedback_token", token: "answer.1.sig" })}\n`,
      "data: [DONE]\n",
    ]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    await panel.sendMessage();

    const feedbackFetch = vi.fn().mockResolvedValue({ ok: true, status: 202 });
    vi.stubGlobal("fetch", feedbackFetch);
    query<HTMLButtonElement>('[data-action="thumbs-up"]').click();
    await flush();

    const [url, init] = feedbackFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${CREDENTIALS.apiUrl}/feedback`);
    expect(JSON.parse(init.body as string).data.attributes).toMatchObject({
      feedback_token: "answer.1.sig",
      rating: "up",
    });
    expect(
      query('[data-action="thumbs-up"]').classList.contains("active"),
    ).toBe(true);
  });

  it("only logs a rating when the answer has no feedback token", async () => {
    mockStream([sse("markdown_fragment", "an answer"), "data: [DONE]\n"]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    await panel.sendMessage();

    const feedbackFetch = vi.fn();
    vi.stubGlobal("fetch", feedbackFetch);
    query<HTMLButtonElement>('[data-action="thumbs-up"]').click();

    expect(feedbackFetch).not.toHaveBeenCalled();
    expect(
      query('[data-action="thumbs-up"]').classList.contains("active"),
    ).toBe(true);
  });
});

describe("newChat", () => {
  it("clears the thread and restores the empty state", async () => {
    mockStream([sse("markdown_fragment", "an answer"), "data: [DONE]\n"]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    await panel.sendMessage();

    query<HTMLButtonElement>(".conv-search-new").click();

    expect(document.querySelectorAll(".conv-search-message")).toHaveLength(0);
    expect(document.querySelector(".conv-search-empty-state")).not.toBeNull();
    expect(document.querySelectorAll(".conv-search-suggestion")).toHaveLength(
      3,
    );
  });

  it("starts a new conversation id on the next message", async () => {
    const fetchMock = mockStream([
      sse("markdown_fragment", "one"),
      "data: [DONE]\n",
    ]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "first question";
    await panel.sendMessage();
    const firstId = JSON.parse(fetchMock.mock.calls[0]?.[1].body as string).data
      .attributes.conversation_id;

    query<HTMLButtonElement>(".conv-search-new").click();

    const secondFetch = mockStream([
      sse("markdown_fragment", "two"),
      "data: [DONE]\n",
    ]);
    query<HTMLTextAreaElement>(".conv-search-input").value = "second question";
    await panel.sendMessage();
    const secondId = JSON.parse(secondFetch.mock.calls[0]?.[1].body as string)
      .data.attributes.conversation_id;

    expect(firstId).toMatch(/^dd_docsai_/);
    expect(secondId).not.toBe(firstId);
  });
});

describe("ask", () => {
  it("opens the panel and prefills the query", () => {
    mount();
    const send = vi.spyOn(panel, "sendMessage").mockResolvedValue();

    panel.ask("short");

    expect(query(".conv-search-sidebar").classList.contains("open")).toBe(true);
    expect(query<HTMLTextAreaElement>(".conv-search-input").value).toBe(
      "short",
    );
    expect(send).not.toHaveBeenCalled();
  });

  it("auto-submits a query long enough to be meaningful", async () => {
    vi.useFakeTimers();
    mount();
    const send = vi.spyOn(panel, "sendMessage").mockResolvedValue();

    panel.ask("how do I install the agent");
    await vi.advanceTimersByTimeAsync(100);

    expect(send).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it("only opens the panel once a conversation is under way", async () => {
    mockStream([sse("markdown_fragment", "an answer"), "data: [DONE]\n"]);
    mount();

    query<HTMLTextAreaElement>(".conv-search-input").value = "how?";
    await panel.sendMessage();

    panel.ask("a different long question");

    expect(query<HTMLTextAreaElement>(".conv-search-input").value).toBe("");
  });
});

describe("teardown", () => {
  it("removes everything the panel added", () => {
    mount();
    panel.teardown();

    expect(document.querySelector(".conv-search-float-btn")).toBeNull();
    expect(document.querySelector(".conv-search-overlay")).toBeNull();
    expect(document.querySelector(".conv-search-sidebar")).toBeNull();
    expect(document.querySelector("style[data-ask-ai]")).toBeNull();
  });

  it("can be called twice", () => {
    mount();
    panel.teardown();

    expect(() => panel.teardown()).not.toThrow();
  });
});
