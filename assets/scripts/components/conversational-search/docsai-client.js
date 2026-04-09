/**
 * Docs AI internal streaming client.
 * SSE endpoint returning `thinking` status events and `markdown_fragment` tokens.
 */
export async function streamDocsAiChat({
    config,
    query,
    history = [],
    conversationId,
    rewriteQuery = false,
    signal,
    onToken,
    onThinking,
    onError
}) {
    const attributes = { query };
    if (history.length > 0) {
        attributes.history = history;
    }
    if (conversationId) {
        attributes.conversation_id = conversationId;
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
        throw new Error(`Docs AI request failed: ${response.status}`);
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
                    onThinking(parsed.content);
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
