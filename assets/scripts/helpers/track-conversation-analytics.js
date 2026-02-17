function buildEventId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `evt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function withApiKey(url, apiKey) {
    return `${url}${url.includes('?') ? '&' : '?'}x-typesense-api-key=${encodeURIComponent(apiKey)}`;
}

function toInt(value, fallback = 0) {
    return Number.isFinite(value) ? Math.trunc(value) : fallback;
}

export async function trackConversationAnalytics({
    host,
    collection,
    apiKey,
    event
}) {
    if (!host || !collection || !apiKey || !event) {
        return { ok: false, error: 'missing_context' };
    }

    const url = withApiKey(`https://${host}/collections/${collection}/documents?action=create`, apiKey);
    const payload = {
        event_id: event.event_id || buildEventId(),
        event_type: event.event_type,
        timestamp: toInt(event.timestamp, Math.floor(Date.now() / 1000)),
        conversation_id: event.conversation_id || '',
        model_id: event.model_id || '',
        query: event.query || '',
        answer: event.answer || '',
        answer_excerpt: event.answer_excerpt || '',
        user_feedback: event.user_feedback || '',
        page_path: event.page_path || window.location.pathname || '',
        language: event.language || document.documentElement.lang || 'en',
        latency_ms: toInt(event.latency_ms),
        retrieved_count: toInt(event.retrieved_count),
        retrieved_urls: Array.isArray(event.retrieved_urls) ? event.retrieved_urls : [],
        retrieved_titles: Array.isArray(event.retrieved_titles) ? event.retrieved_titles : [],
        retrieved_ids: Array.isArray(event.retrieved_ids) ? event.retrieved_ids : [],
        metadata_json: event.metadata_json || '{}'
    };
    payload.id = payload.event_id;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-TYPESENSE-API-KEY': apiKey
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            let message = `http_${response.status}`;
            try {
                const text = await response.text();
                if (text) {
                    message = text.slice(0, 140);
                }
            } catch (e) {
                // Ignore response parse errors.
            }
            return { ok: false, error: message };
        }

        return { ok: true, event_id: payload.event_id };
    } catch (e) {
        return { ok: false, error: 'network' };
    }
}
