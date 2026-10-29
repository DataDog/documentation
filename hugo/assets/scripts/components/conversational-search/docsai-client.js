/**
 * Docs AI internal streaming client.
 * SSE endpoint returning `thinking` status events, `markdown_fragment` tokens, an optional
 * `error` event ({ content, retryable, discard_partial }), and a `feedback_token` after a completed answer.
 */
export async function streamDocsAiChat({
    config,
    query,
    history = [],
    conversationId,
    anchorUrl = '',
    rewriteQuery = false,
    signal,
    onToken,
    onThinking,
    onServerError,
    onFeedbackToken,
    onError
}) {
    const attributes = { query };
    if (history.length > 0) {
        attributes.history = history;
    }
    if (conversationId) {
        attributes.conversation_id = conversationId;
    }
    if (anchorUrl) {
        attributes.anchor_url = anchorUrl;
    }
    // Tells the API to rewrite the query for better retrieval (first message only)
    if (rewriteQuery) {
        attributes.rewrite_query = true;
    }

    const response = await fetch(`${config.apiUrl}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Docs-Ai-Api-Key': config.apiKey
        },
        body: JSON.stringify({ data: { attributes } }),
        signal
    });

    if (!response.ok) {
        const error = new Error(`Docs AI request failed: ${response.status}`);
        error.status = response.status;
        throw error;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullMessage = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith('data: ')) continue;

            const payload = trimmed.slice(6);
            if (payload === '[DONE]') return fullMessage;

            try {
                const parsed = JSON.parse(payload);
                if (parsed.type === 'thinking' && onThinking) {
                    onThinking(parsed.content, parsed);
                } else if (parsed.type === 'error' && onServerError) {
                    onServerError(parsed);
                } else if (parsed.type === 'feedback_token' && onFeedbackToken) {
                    onFeedbackToken(parsed.token);
                } else if (parsed.type === 'markdown_fragment') {
                    fullMessage += parsed.content;
                    if (onToken) onToken(parsed.content, fullMessage);
                }
            } catch (e) {
                if (onError) onError(e);
            }
        }
    }

    return fullMessage;
}

/**
 * Sends a rating ('up' or 'down'), a comment, or both for the answer the token was issued with.
 * `keepalive` lets the request finish when the reader leaves the page right after clicking.
 */
export async function sendDocsAiFeedback({ config, token, conversationId, rating, comment }) {
    const attributes = { feedback_token: token };
    if (rating) attributes.rating = rating;
    if (comment) attributes.comment = comment;
    if (conversationId) attributes.conversation_id = conversationId;

    const response = await fetch(`${config.apiUrl}/feedback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Docs-Ai-Api-Key': config.apiKey
        },
        body: JSON.stringify({ data: { attributes } }),
        keepalive: true
    });
    if (!response.ok) {
        const error = new Error(`Docs AI feedback failed: ${response.status}`);
        error.status = response.status;
        throw error;
    }
}
