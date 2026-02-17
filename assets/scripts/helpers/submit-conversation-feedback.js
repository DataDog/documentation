export async function submitConversationFeedback({
    host,
    collection,
    message,
    apiKey,
    userFeedback,
    messageField = 'message'
}) {
    if (!host || !collection || !apiKey) {
        return { ok: false, error: 'missing_context' };
    }

    return updateByMessage({
        host,
        collection,
        messageField,
        message,
        apiKey,
        userFeedback
    });
}

function withApiKey(url, apiKey) {
    return `${url}${url.includes('?') ? '&' : '?'}x-typesense-api-key=${encodeURIComponent(apiKey)}`;
}

function escapeFilterValue(value) {
    return value.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
}

function compactMessageForFilter(message) {
    const text = (message || '').replace(/\s+/g, ' ').trim();
    // Keep payload reasonable while preserving enough signal for exact match.
    return text.slice(0, 800);
}

async function updateByMessage({ host, collection, messageField, message, apiKey, userFeedback }) {
    const compactMessage = compactMessageForFilter(message);
    if (!compactMessage) {
        return { ok: false, error: 'missing_message' };
    }

    // Use backtick-quoted exact match to avoid parser issues with parentheses/quotes in LLM text.
    const filterExpression = `${messageField}:=\`${escapeFilterValue(compactMessage)}\``;
    const baseUrl = `https://${host}/collections/${collection}/documents`;
    const params = new URLSearchParams({
        filter_by: filterExpression,
        action: 'update'
    });
    const url = withApiKey(`${baseUrl}?${params.toString()}`, apiKey);

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-TYPESENSE-API-KEY': apiKey
            },
            body: JSON.stringify({
                user_feedback: userFeedback
            })
        });

        if (!response.ok) {
            const errorText = await safeResponseText(response);
            return { ok: false, error: errorText || `http_${response.status}` };
        }

        // Keep behavior explicit: update by message only.
        try {
            const body = await response.json();
            if (typeof body?.num_updated === 'number' && body.num_updated === 0) {
                return { ok: false, error: 'message_not_found' };
            }
        } catch (e) {
            // If response is non-JSON, treat successful HTTP status as success.
        }

        return { ok: true };
    } catch (error) {
        return { ok: false, error: 'network' };
    }
}

async function safeResponseText(response) {
    try {
        const txt = await response.text();
        return txt ? txt.slice(0, 140) : '';
    } catch (e) {
        return '';
    }
}

