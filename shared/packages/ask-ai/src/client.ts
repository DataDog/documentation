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
  onThinking?: (message: string) => void;
  onError?: (error: unknown) => void;
}

/**
 * The events this client acts on. The endpoint may send others; anything not
 * in this union is dropped rather than assumed to have a usable shape.
 */
type StreamEvent =
  | { type: "thinking"; content: string }
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
    throw new Error(`Docs AI request failed: ${response.status}`);
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

      if (event.type === "thinking") {
        onThinking?.(event.content);
      } else {
        fullMessage += event.content;
        onToken?.(event.content, fullMessage);
      }
    }
  }

  return fullMessage;
}

/** Throws on unparseable JSON; returns `null` for an event we do not handle. */
function parseStreamEvent(payload: string): StreamEvent | null {
  const parsed: unknown = JSON.parse(payload);
  if (typeof parsed !== "object" || parsed === null) return null;

  const { type, content } = parsed as { type?: unknown; content?: unknown };
  if (typeof content !== "string") return null;
  if (type !== "thinking" && type !== "markdown_fragment") return null;

  return { type, content };
}
