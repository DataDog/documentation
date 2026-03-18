import Typesense from 'typesense';

let client = null;

export function resetTypesenseClient() {
    client = null;
}

export function getTypesenseClient(typesenseConfig) {
    if (client) return client;

    client = new Typesense.Client({
        nearestNode: { host: `${typesenseConfig.host}.a1.typesense.net`, port: 443, protocol: 'https' },
        nodes: [
            { host: `${typesenseConfig.host}-1.a1.typesense.net`, port: 443, protocol: 'https' },
            { host: `${typesenseConfig.host}-2.a1.typesense.net`, port: 443, protocol: 'https' },
            { host: `${typesenseConfig.host}-3.a1.typesense.net`, port: 443, protocol: 'https' }
        ],
        apiKey: typesenseConfig.public_key,
        connectionTimeoutSeconds: 45
    });

    return client;
}

/**
 * Strips Typesense query syntax that breaks hybrid (keyword + vector) search:
 *  - "double quotes" trigger exact-phrase mode; when 0 keyword hits match,
 *    Typesense skips vector search entirely and returns 0 results.
 *  - -dash prefix triggers token exclusion, which is not meaningful for
 *    a conversational AI query.
 */
export function sanitizeQuery(raw) {
    return raw
        .replace(/"/g, '')
        .replace(/(^|\s)-/g, '$1')
        .trim();
}

export async function streamConversation({
    typesenseConfig,
    query,
    modelId,
    conversationId,
    signal,
    onChunk,
    onError
}) {
    const tsClient = getTypesenseClient(typesenseConfig);

    const searchBody = {
        searches: [
            {
                collection: typesenseConfig.docsIndex,
                preset: 'docs_ai_search_preset'
            }
        ]
    };

    const commonSearchParams = {
        conversation: true,
        conversation_model_id: modelId,
        q: sanitizeQuery(query),
        conversation_stream: true
    };

    if (conversationId) {
        commonSearchParams.conversation_id = conversationId;
    }

    return tsClient.apiCall.post('/multi_search', searchBody, commonSearchParams, {}, {
        abortSignal: signal,
        isStreamingRequest: true,
        streamConfig: { onChunk, onError }
    });
}

export async function streamDocsAiChat({
    docsAiConfig,
    query,
    signal,
    onToken,
    onError
}) {
    const response = await fetch(docsAiConfig.apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Docs-Api-Key': docsAiConfig.apiKey
        },
        body: JSON.stringify({
            data: { attributes: { query } }
        }),
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
                if (parsed.token !== undefined) {
                    fullMessage += parsed.token;
                    onToken(parsed.token, fullMessage);
                }
            } catch (e) {
                if (onError) onError(e);
            }
        }
    }

    return fullMessage;
}

export async function fetchConversation({
    typesenseConfig,
    query,
    modelId,
    conversationId,
    signal
}) {
    const tsClient = getTypesenseClient(typesenseConfig);

    const searchBody = {
        searches: [
            {
                collection: typesenseConfig.docsIndex,
                preset: 'docs_ai_search_preset'
            }
        ]
    };

    const commonSearchParams = {
        conversation: true,
        conversation_model_id: modelId,
        q: sanitizeQuery(query)
    };

    if (conversationId) {
        commonSearchParams.conversation_id = conversationId;
    }

    return tsClient.apiCall.post('/multi_search', searchBody, commonSearchParams, {}, {
        abortSignal: signal
    });
}
