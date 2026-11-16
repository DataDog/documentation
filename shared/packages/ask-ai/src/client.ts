import type { DocsAiCredentials } from "./config";
import type { ChatMessage } from "./types";

export interface StreamDocsAiChatOptions {
  credentials: DocsAiCredentials;
  query: string;
  history?: ChatMessage[];
  conversationId?: string | null;
  anchorUrl?: string;
  /** Asks the API to rewrite the query for retrieval. First message only. */
  rewriteQuery?: boolean;
  signal?: AbortSignal;
  onToken?: (token: string, fullMessage: string) => void;
  /** Receives the whole event, which carries the pages a step found or read. */
  onThinking?: (message: string, event: ThinkingEvent) => void;
  /** An `error` event: the answer failed on the server after streaming began. */
  onServerError?: (event: ServerErrorEvent) => void;
  /** Sent after a completed answer; it signs feedback on that answer. */
  onFeedbackToken?: (token: string) => void;
  onError?: (error: unknown) => void;
}

/** A page a research step found or opened, as the API names its fields. */
export interface ActivityPage {
  title?: string;
  url?: string;
  distinct_base_url?: string;
}

export interface ThinkingEvent {
  type: "thinking";
  content: string;
  /** Present when a search returns. */
  retrieved_pages?: ActivityPage[];
  query?: string;
  /** Present when the agent opens a page. */
  page?: ActivityPage;
}

export interface ServerErrorEvent {
  type: "error";
  content?: string;
  code?: string;
  /** Absent means retryable. */
  retryable?: boolean;
  /** Absent means the partial answer is discarded. */
  discard_partial?: boolean;
}

/** A failed request, with the HTTP status for callers that branch on it. */
export class DocsAiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "DocsAiRequestError";
  }
}

/**
 * The events this client acts on. The endpoint may send others; anything not
 * in this union is dropped rather than assumed to have a usable shape.
 */
type StreamEvent =
  | ThinkingEvent
  | ServerErrorEvent
  | { type: "feedback_token"; token: string }
  | { type: "markdown_fragment"; content: string };

const DONE_SENTINEL = "[DONE]";
const DATA_PREFIX = "data: ";

/**
 * Streams an answer from the Docs AI endpoint, calling back per token.
 *
 * Resolves with the full message, either at the `[DONE]` sentinel or when the
 * body ends. Rejects if the request itself fails; a single unparseable event
 * goes to `onError` and the stream continues.
 */
export async function streamDocsAiChat({
  credentials,
  query,
  history = [],
  conversationId,
  anchorUrl = "",
  rewriteQuery = false,
  signal,
  onToken,
  onThinking,
  onServerError,
  onFeedbackToken,
  onError,
}: StreamDocsAiChatOptions): Promise<string> {
  const response = await fetch(`${credentials.apiUrl}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Docs-Ai-Api-Key": credentials.apiKey,
    },
    body: JSON.stringify({
      data: {
        attributes: {
          query,
          ...(history.length > 0 && { history }),
          ...(conversationId && { conversation_id: conversationId }),
          ...(anchorUrl && { anchor_url: anchorUrl }),
          ...(rewriteQuery && { rewrite_query: true }),
        },
      },
    }),
    signal,
  });

  if (!response.ok) {
    throw new DocsAiRequestError(
      `Docs AI request failed: ${response.status}`,
      response.status,
    );
  }
  if (!response.body) {
    throw new Error("Docs AI response had no body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullMessage = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // The last element is whatever follows the final newline: either an empty
    // string, or the start of an event the next chunk finishes.
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith(DATA_PREFIX)) continue;

      const payload = trimmed.slice(DATA_PREFIX.length);
      if (payload === DONE_SENTINEL) return fullMessage;

      let event: StreamEvent | null;
      try {
        event = parseStreamEvent(payload);
      } catch (error) {
        onError?.(error);
        continue;
      }
      if (!event) continue;

      switch (event.type) {
        case "thinking":
          onThinking?.(event.content, event);
          break;
        case "error":
          onServerError?.(event);
          break;
        case "feedback_token":
          onFeedbackToken?.(event.token);
          break;
        case "markdown_fragment":
          fullMessage += event.content;
          onToken?.(event.content, fullMessage);
          break;
      }
    }
  }

  return fullMessage;
}

/** Throws on unparseable JSON; returns `null` for an event we do not handle. */
function parseStreamEvent(payload: string): StreamEvent | null {
  const parsed: unknown = JSON.parse(payload);
  if (typeof parsed !== "object" || parsed === null) return null;

  const event = parsed as Record<string, unknown>;
  switch (event["type"]) {
    case "thinking":
      if (typeof event["content"] !== "string") return null;
      return {
        type: "thinking",
        content: event["content"],
        ...(Array.isArray(event["retrieved_pages"]) && {
          retrieved_pages: event["retrieved_pages"] as ActivityPage[],
        }),
        ...(typeof event["query"] === "string" && { query: event["query"] }),
        ...(isObject(event["page"]) && {
          page: event["page"] as ActivityPage,
        }),
      };
    case "error":
      return {
        type: "error",
        ...(typeof event["content"] === "string" && {
          content: event["content"],
        }),
        ...(typeof event["code"] === "string" && { code: event["code"] }),
        ...(typeof event["retryable"] === "boolean" && {
          retryable: event["retryable"],
        }),
        ...(typeof event["discard_partial"] === "boolean" && {
          discard_partial: event["discard_partial"],
        }),
      };
    case "feedback_token":
      return typeof event["token"] === "string"
        ? { type: "feedback_token", token: event["token"] }
        : null;
    case "markdown_fragment":
      return typeof event["content"] === "string"
        ? { type: "markdown_fragment", content: event["content"] }
        : null;
    default:
      return null;
  }
}

function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

/** The feedback request must not hang: the rating buttons wait on it. */
export const FEEDBACK_TIMEOUT_MS = 10_000;

export interface SendDocsAiFeedbackOptions {
  credentials: DocsAiCredentials;
  /** The `feedback_token` that signed the answer being rated. */
  token: string;
  conversationId?: string | null;
  rating?: "up" | "down";
  reasons?: string[];
}

/**
 * Sends a rating, thumbs-down reasons, or both, for a signed answer. Rejects on
 * a non-OK status or a timeout. `keepalive` lets the request finish when the
 * reader leaves the page right after clicking.
 */
export async function sendDocsAiFeedback({
  credentials,
  token,
  conversationId,
  rating,
  reasons,
}: SendDocsAiFeedbackOptions): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FEEDBACK_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${credentials.apiUrl}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Docs-Ai-Api-Key": credentials.apiKey,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            feedback_token: token,
            ...(rating && { rating }),
            ...(reasons && reasons.length > 0 && { reasons }),
            ...(conversationId && { conversation_id: conversationId }),
          },
        },
      }),
      keepalive: true,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    throw new DocsAiRequestError(
      `Docs AI feedback failed: ${response.status}`,
      response.status,
    );
  }
}
