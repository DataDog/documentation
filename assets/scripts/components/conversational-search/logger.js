export function logAction(message, data, { selectedModelId } = {}) {
    const conversationalSearchData = {
        docs_ai: true,
        model_id: selectedModelId,
        ...(data?.conversational_search || {})
    };
    const payload = {
        ...data,
        conversational_search: conversationalSearchData
    };

    if (window.DD_LOGS?.logger) {
        window.DD_LOGS.logger.info(message, payload, 'info');
    }

    if (window.DD_RUM) {
        window.DD_RUM.addAction('conversational_search_action', conversationalSearchData);
    }
}

export function logError(message, error, { selectedModelId, conversationId } = {}) {
    const errorData = {
        docs_ai: true,
        model_id: selectedModelId,
        conversation_id: conversationId,
        error_message: error?.message || String(error),
        error_name: error?.name || 'Error'
    };

    console.error('[Conversational Search] Error:', message, errorData);

    if (window.DD_LOGS?.logger) {
        window.DD_LOGS.logger.error(message, { conversational_search: errorData }, 'error');
    }

    if (window.DD_RUM) {
        window.DD_RUM.addError(new Error(message), { conversational_search: errorData });
    }
}
