import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mountAskAi, type AskAiConfig, type AskAiHandle } from "./index";

let handle: AskAiHandle | null = null;

function mount(config: AskAiConfig = {}): AskAiHandle {
  handle = mountAskAi(config);
  return handle;
}

/** The RUM action payload of the nth `addAction` call. */
function actionPayload(
  addAction: ReturnType<typeof vi.fn>,
  index = 0,
): Record<string, unknown> {
  return addAction.mock.calls[index]?.[1] as Record<string, unknown>;
}

function stubRum(): ReturnType<typeof vi.fn> {
  const addAction = vi.fn();
  vi.stubGlobal("DD_RUM", { addAction, addError: vi.fn() });
  return addAction;
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("style");
});

afterEach(() => {
  handle?.teardown();
  handle = null;
  document.body.innerHTML = "";
  document.body.className = "";
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("mountAskAi", () => {
  it("mounts one widget however many times it is called", () => {
    const first = mount();
    const second = mountAskAi();

    expect(second).toBe(first);
    expect(document.querySelectorAll(".conv-search-sidebar")).toHaveLength(1);
    expect(document.querySelectorAll(".conv-search-float-btn")).toHaveLength(1);
  });

  it("adds nothing to window", () => {
    mount();

    expect("askDocsAI" in window).toBe(false);
  });

  it("opens the panel through the handle", () => {
    mount().ask("short");

    const sidebar = document.querySelector(".conv-search-sidebar");
    const input =
      document.querySelector<HTMLTextAreaElement>(".conv-search-input");
    expect(sidebar?.classList.contains("open")).toBe(true);
    expect(input?.value).toBe("short");
  });
});

describe("teardown", () => {
  it("leaves no package nodes behind", () => {
    mount().teardown();

    expect(document.querySelector(".conv-search-float-btn")).toBeNull();
    expect(document.querySelector(".conv-search-overlay")).toBeNull();
    expect(document.querySelector(".conv-search-sidebar")).toBeNull();
    expect(document.querySelector("style[data-ask-ai]")).toBeNull();
  });

  it("lets a later call mount again", () => {
    mount().teardown();
    mount();

    expect(document.querySelectorAll(".conv-search-sidebar")).toHaveLength(1);
  });

  it("aborts an in-flight request", async () => {
    let requestSignal: AbortSignal | undefined;
    vi.stubGlobal(
      "fetch",
      vi.fn((_url: string, init: RequestInit) => {
        requestSignal = init.signal ?? undefined;
        // Never settles, so the request is still in flight at teardown.
        return new Promise<Response>(() => {});
      }),
    );
    vi.useFakeTimers();

    mount().ask("how do I install the agent");
    await vi.advanceTimersByTimeAsync(100);
    expect(requestSignal?.aborted).toBe(false);

    handle?.teardown();
    expect(requestSignal?.aborted).toBe(true);

    vi.useRealTimers();
  });
});

describe("the feature flag seam", () => {
  it("tears the widget down when the flag resolves false", async () => {
    mount({ isEnabled: () => Promise.resolve(false) });

    await vi.waitFor(() => {
      expect(document.querySelector(".conv-search-sidebar")).toBeNull();
    });
  });

  it("logs one impression when the flag resolves true", async () => {
    const addAction = stubRum();
    mount({ isEnabled: () => Promise.resolve(true) });

    await vi.waitFor(() => expect(addAction).toHaveBeenCalledTimes(1));
    expect(addAction).toHaveBeenCalledWith(
      "conversational_search_action",
      expect.objectContaining({
        docs_ai: true,
        action: "impression",
        page: window.location.pathname,
      }),
    );
  });

  it("logs no impression when the flag resolves false", async () => {
    const addAction = stubRum();
    mount({ isEnabled: () => Promise.resolve(false) });

    await vi.waitFor(() => {
      expect(document.querySelector(".conv-search-sidebar")).toBeNull();
    });
    expect(addAction).not.toHaveBeenCalled();
  });

  it("stays mounted and enabled when the flag rejects", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const addAction = stubRum();
    mount({ isEnabled: () => Promise.reject(new Error("flags are down")) });

    await vi.waitFor(() => expect(addAction).toHaveBeenCalledTimes(1));
    expect(document.querySelector(".conv-search-sidebar")).not.toBeNull();
  });

  it("treats an absent flag as enabled", async () => {
    const addAction = stubRum();
    mount();

    await vi.waitFor(() => expect(addAction).toHaveBeenCalledTimes(1));
    expect(document.querySelector(".conv-search-sidebar")).not.toBeNull();
  });
});

describe("the Datadog-user seam", () => {
  it("tags events once the host reports a status", async () => {
    const addAction = stubRum();
    mount({ getIsDatadogUser: () => Promise.resolve(true) });

    await vi.waitFor(() => expect(addAction).toHaveBeenCalledTimes(1));
    expect(actionPayload(addAction)["is_datadog_user"]).toBe(true);
  });

  it("omits the tag when the host cannot say", async () => {
    const addAction = stubRum();
    mount();

    await vi.waitFor(() => expect(addAction).toHaveBeenCalledTimes(1));
    expect(actionPayload(addAction)).not.toHaveProperty("is_datadog_user");
  });

  it("omits the tag when the host's lookup rejects", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const addAction = stubRum();
    mount({ getIsDatadogUser: () => Promise.reject(new Error("no session")) });

    await vi.waitFor(() => expect(addAction).toHaveBeenCalledTimes(1));
    expect(actionPayload(addAction)).not.toHaveProperty("is_datadog_user");
  });
});
