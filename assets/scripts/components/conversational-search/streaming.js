import Typesense from 'typesense';

let client = null;

export function getTypesenseClient(typesenseConfig) {
    if (client) return client;

    client = new Typesense.Client({
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
        q: query,
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
