import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { logAction, logError } from "./logger";
import type { LogContext } from "./types";

const NO_CONTEXT: LogContext = {
  conversationId: null,
  isDatadogUser: undefined,
};

function installFakeGlobals() {
  const addAction = vi.fn();
  const addError = vi.fn();
  const info = vi.fn();
  const error = vi.fn();

  window.DD_RUM = { addAction, addError };
  window.DD_LOGS = { logger: { info, error } };

  return { addAction, addError, info, error };
}

afterEach(() => {
  delete window.DD_RUM;
  delete window.DD_LOGS;
  vi.restoreAllMocks();
});

describe("with no telemetry globals present", () => {
  it("does not throw", () => {
    expect(() =>
      logAction("msg", { action: "new_chat" }, NO_CONTEXT),
    ).not.toThrow();
  });

  it("logs nothing to the console for a normal action", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});

    logAction("msg", { action: "new_chat" }, NO_CONTEXT);

    expect(consoleError).not.toHaveBeenCalled();
    expect(consoleWarn).not.toHaveBeenCalled();
  });

  it("does not throw when reporting an error", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => logError("msg", new Error("boom"), NO_CONTEXT)).not.toThrow();
  });
});

describe("logAction", () => {
  let fakes: ReturnType<typeof installFakeGlobals>;

  beforeEach(() => {
    fakes = installFakeGlobals();
  });

  it("always tags the payload with docs_ai", () => {
    logAction("msg", { action: "new_chat" }, NO_CONTEXT);

    expect(fakes.addAction).toHaveBeenCalledWith(
      "conversational_search_action",
      expect.objectContaining({ docs_ai: true, action: "new_chat" }),
    );
  });

  it("omits is_datadog_user when no callback supplied a value", () => {
    logAction("msg", { action: "new_chat" }, NO_CONTEXT);

    const payload = fakes.addAction.mock.calls[0]?.[1] as Record<
      string,
      unknown
    >;
    expect(payload).not.toHaveProperty("is_datadog_user");
  });

  it("includes is_datadog_user when a value is known", () => {
    logAction(
      "msg",
      { action: "new_chat" },
      {
        conversationId: null,
        isDatadogUser: false,
      },
    );

    expect(fakes.addAction).toHaveBeenCalledWith(
      "conversational_search_action",
      expect.objectContaining({ is_datadog_user: false }),
    );
  });

  it("includes the conversation id when there is one", () => {
    logAction(
      "msg",
      { action: "new_chat" },
      {
        conversationId: "dd_docsai_abc",
        isDatadogUser: true,
      },
    );

    expect(fakes.addAction).toHaveBeenCalledWith(
      "conversational_search_action",
      expect.objectContaining({ conversation_id: "dd_docsai_abc" }),
    );
  });

  it("sends the message and a nested payload to Logs", () => {
    logAction(
      "Conversational Search Impression",
      {
        action: "impression",
        page: "/api/latest/",
      },
      NO_CONTEXT,
    );

    expect(fakes.info).toHaveBeenCalledWith(
      "Conversational Search Impression",
      expect.objectContaining({
        conversational_search: expect.objectContaining({
          action: "impression",
          page: "/api/latest/",
        }),
      }),
      "info",
    );
  });
});

describe("logError", () => {
  let fakes: ReturnType<typeof installFakeGlobals>;

  beforeEach(() => {
    fakes = installFakeGlobals();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("reports the error name and message to RUM", () => {
    logError("Docs AI Streaming Error", new TypeError("bad json"), {
      conversationId: "dd_docsai_abc",
      isDatadogUser: undefined,
    });

    expect(fakes.addError).toHaveBeenCalledTimes(1);
    const [, context] = fakes.addError.mock.calls[0] as [
      Error,
      { conversational_search: Record<string, unknown> },
    ];
    expect(context.conversational_search).toMatchObject({
      docs_ai: true,
      conversation_id: "dd_docsai_abc",
      error_message: "bad json",
      error_name: "TypeError",
    });
    expect(context.conversational_search).not.toHaveProperty("is_datadog_user");
  });

  it("handles a thrown non-Error value", () => {
    logError("Docs AI Streaming Error", "just a string", NO_CONTEXT);

    const [, context] = fakes.addError.mock.calls[0] as [
      Error,
      { conversational_search: Record<string, unknown> },
    ];
    expect(context.conversational_search).toMatchObject({
      error_message: "just a string",
      error_name: "Error",
    });
  });
});
