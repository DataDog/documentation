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

    const messages = document.querySelectorAll(".conv-search-message-content");
    expect(messages[messages.length - 1]?.textContent).toBe(
      STRINGS.emptyResponse,
    );
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

    const messages = document.querySelectorAll(".conv-search-message-content");
    expect(messages[messages.length - 1]?.textContent).toBe(
      STRINGS.requestFailed,
    );
    expect(query<HTMLButtonElement>(".conv-search-send").disabled).toBe(false);
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
