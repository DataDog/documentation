import { afterEach, describe, expect, it, vi } from "vitest";
import { streamDocsAiChat } from "./client";

const CREDENTIALS = {
  apiUrl: "https://dd.datad0g.com/api/unstable/docs-ai",
  apiKey: "ddpub_test",
};

/** Serves `chunks` as the body of an OK response, one read per chunk. */
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

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("streamDocsAiChat", () => {
  it("fires onThinking then onToken, in order, and returns the full message", async () => {
    mockStream([
      sse("thinking", "Searching documentation..."),
      sse("markdown_fragment", "Hello "),
      sse("markdown_fragment", "world"),
      "data: [DONE]\n",
    ]);

    const events: string[] = [];
    const answer = await streamDocsAiChat({
      credentials: CREDENTIALS,
      query: "hi",
      onThinking: (message) => events.push(`thinking:${message}`),
      onToken: (token) => events.push(`token:${token}`),
    });

    expect(events).toEqual([
      "thinking:Searching documentation...",
      "token:Hello ",
      "token:world",
    ]);
    expect(answer).toBe("Hello world");
  });

  it("passes the running message alongside each token", async () => {
    mockStream([
      sse("markdown_fragment", "Hello "),
      sse("markdown_fragment", "world"),
      "data: [DONE]\n",
    ]);

    const running: string[] = [];
    await streamDocsAiChat({
      credentials: CREDENTIALS,
      query: "hi",
      onToken: (_token, fullMessage) => running.push(fullMessage),
    });

    expect(running).toEqual(["Hello ", "Hello world"]);
  });

  it("stops at the [DONE] sentinel and ignores anything after it", async () => {
    mockStream([
      sse("markdown_fragment", "kept"),
      "data: [DONE]\n",
      sse("markdown_fragment", "discarded"),
    ]);

    const answer = await streamDocsAiChat({
      credentials: CREDENTIALS,
      query: "hi",
    });

    expect(answer).toBe("kept");
  });

  it("ignores unknown event types", async () => {
    mockStream([
      sse("some_future_event", "ignored"),
      sse("markdown_fragment", "kept"),
      "data: [DONE]\n",
    ]);

    const onThinking = vi.fn();
    const answer = await streamDocsAiChat({
      credentials: CREDENTIALS,
      query: "hi",
      onThinking,
    });

    expect(onThinking).not.toHaveBeenCalled();
    expect(answer).toBe("kept");
  });

  it("reassembles an event split across two chunks", async () => {
    const full = sse("markdown_fragment", "split");
    mockStream([full.slice(0, 20), full.slice(20), "data: [DONE]\n"]);

    const answer = await streamDocsAiChat({
      credentials: CREDENTIALS,
      query: "hi",
    });

    expect(answer).toBe("split");
  });

  it("reports a malformed event to onError without aborting the stream", async () => {
    mockStream([
      "data: {not json}\n",
      sse("markdown_fragment", "kept"),
      "data: [DONE]\n",
    ]);

    const onError = vi.fn();
    const answer = await streamDocsAiChat({
      credentials: CREDENTIALS,
      query: "hi",
      onError,
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(answer).toBe("kept");
  });

  it("throws on a non-OK response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 503, body: null }),
    );

    await expect(
      streamDocsAiChat({ credentials: CREDENTIALS, query: "hi" }),
    ).rejects.toThrow("503");
  });

  it("sends the query, key, and optional attributes the API expects", async () => {
    const fetchMock = mockStream(["data: [DONE]\n"]);

    await streamDocsAiChat({
      credentials: CREDENTIALS,
      query: "how do I install the agent",
      history: [{ role: "user", content: "earlier" }],
      conversationId: "dd_docsai_abc",
      anchorUrl: "https://docs.datadoghq.com/api/",
      rewriteQuery: true,
    });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${CREDENTIALS.apiUrl}/chat`);
    expect((init.headers as Record<string, string>)["X-Docs-Ai-Api-Key"]).toBe(
      CREDENTIALS.apiKey,
    );
    expect(JSON.parse(init.body as string)).toEqual({
      data: {
        attributes: {
          query: "how do I install the agent",
          history: [{ role: "user", content: "earlier" }],
          conversation_id: "dd_docsai_abc",
          anchor_url: "https://docs.datadoghq.com/api/",
          rewrite_query: true,
        },
      },
    });
  });

  it("omits the optional attributes when they are not supplied", async () => {
    const fetchMock = mockStream(["data: [DONE]\n"]);

    await streamDocsAiChat({ credentials: CREDENTIALS, query: "hi" });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(init.body as string)).toEqual({
      data: { attributes: { query: "hi" } },
    });
  });
});
