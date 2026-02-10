import { getConfig } from '../helpers/getConfig';
import Typesense from 'typesense';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { initializeFeatureFlags, getBooleanFlag } from 'scripts/helpers/feature-flags';

const { env } = document.documentElement.dataset;
const typesenseConfig = getConfig(env).typesense;

let IS_CONVERSATIONAL_SEARCH_ENABLED = false;
const CONVERSATIONAL_SEARCH_FLAG_KEY = 'docs_conversational_search';

initializeFeatureFlags().then((client) => {
    IS_CONVERSATIONAL_SEARCH_ENABLED = getBooleanFlag(client, CONVERSATIONAL_SEARCH_FLAG_KEY);
    console.log("FLAG INITIALIZED: IS_CONVERSATIONAL_SEARCH_ENABLED", IS_CONVERSATIONAL_SEARCH_ENABLED);
    if (IS_CONVERSATIONAL_SEARCH_ENABLED) {
        document.body.classList.add('conv-search-enabled');
        // Initialize conversational search after feature flag is confirmed enabled
        initConversationalSearch();
    }
});

// Configure marked with highlight.js
marked.use(
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto(code).value;
        }
    }),
    {
        breaks: true,   // Convert \n to <br>
        gfm: true       // GitHub Flavored Markdown
    }
);

// Custom renderer for links (open in new tab)
const renderer = {
    link({ href, title, text }) {
        return `<a href="${href}"${title ? ` title="${title}"` : ''} target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
};

marked.use({ renderer });

// Conversation model ID for the docs collection
const CONVERSATION_MODEL_ID = 'CONVERSATION-MODEL-DOCS-OPENAI-GPT-4.1';

// Embedding field to use for semantic search
const EMBEDDING_FIELD = 'embedding';

// Initialize Typesense client (for potential future non-streaming use)
const typesenseClient = new Typesense.Client({
    nodes: [
        {
            host: `${typesenseConfig.host}-1.a1.typesense.net`,
            port: 443,
            protocol: 'https'
        },
        {
            host: `${typesenseConfig.host}-2.a1.typesense.net`,
            port: 443,
            protocol: 'https'
        },
        {
            host: `${typesenseConfig.host}-3.a1.typesense.net`,
            port: 443,
            protocol: 'https'
        }
    ],
    apiKey: typesenseConfig.public_key,
    connectionTimeoutSeconds: 10
});

class ConversationalSearch {
    constructor() {
        this.conversationId = null;
        this.isOpen = false;
        this.isLoading = false;
        this.messages = [];
        this.abortController = null;
        
        this.init();
    }

    init() {
        this.createElements();
        this.bindEvents();
    }

    createElements() {
        // Clone from Hugo-rendered <template> (see layouts/partials/conversational-search.html)
        const template = document.getElementById('conv-search-template');
        if (!template) {
            console.error('[Conversational Search] Template #conv-search-template not found in DOM');
            return;
        }

        const content = template.content;

        // Clone the three top-level elements from the template
        this.floatButton = content.querySelector('.conv-search-float-btn').cloneNode(true);
        this.overlay = content.querySelector('.conv-search-overlay').cloneNode(true);
        this.sidebar = content.querySelector('.conv-search-sidebar').cloneNode(true);

        // Inject the empty state into the messages container
        const messagesContainer = this.sidebar.querySelector('.conv-search-messages');
        this.injectEmptyState(messagesContainer);

        // Append to DOM
        document.body.appendChild(this.floatButton);
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.sidebar);

        // Cache DOM references
        this.closeBtn = this.sidebar.querySelector('.conv-search-close');
        this.newChatBtn = this.sidebar.querySelector('.conv-search-new');
        this.messagesContainer = messagesContainer;
        this.input = this.sidebar.querySelector('.conv-search-input');
        this.sendBtn = this.sidebar.querySelector('.conv-search-send');
    }

    /**
     * Clone the empty state from its <template> and inject into a container.
     * Used by both createElements() (initial load) and newChat() (reset).
     */
    injectEmptyState(container) {
        const emptyStateTemplate = document.getElementById('conv-search-empty-state');
        if (emptyStateTemplate) {
            container.appendChild(emptyStateTemplate.content.cloneNode(true));
        }
    }

    bindEvents() {
        this.floatButton.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.newChatBtn.addEventListener('click', () => this.newChat());
        this.overlay.addEventListener('click', () => this.close());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        this.input.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        this.messagesContainer.addEventListener('click', (e) => {
            // Suggestion chips click handler
            const suggestionBtn = e.target.closest('.conv-search-suggestion');
            if (suggestionBtn) {
                const query = suggestionBtn.dataset.query;
                if (query) {
                    this.logAction('Conversational Search Suggestion Click', {
                        conversational_search: {
                            action: 'suggestion_clicked',
                            suggestion_query: query,
                            conversation_id: this.conversationId
                        },
                    });
                    this.input.value = query;
                    this.sendMessage();
                }
            }
            
            // Link click handler
            const link = e.target.closest('a');
            if (link && this.messagesContainer.contains(link)) {
                this.logAction('Conversational Search Link Click', {
                    conversational_search: {
                        action: 'link_clicked',
                        link_url: link.href,
                        link_text: link.textContent,
                        conversation_id: this.conversationId
                    }
                });
            }
        });
    }

    open() {
        this.isOpen = true;
        this.sidebar.classList.add('open');
        this.overlay.classList.add('open');
        this.floatButton.classList.add('hidden');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => this.input.focus(), 300);
    }

    close() {
        this.isOpen = false;
        this.sidebar.classList.remove('open');
        this.overlay.classList.remove('open');
        this.floatButton.classList.remove('hidden');
        document.body.style.overflow = '';
        // Let any ongoing request continue in the background so the
        // response is still there when the user reopens the dialog.
    }

    newChat() {
        // Abort any ongoing request
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }

        // Reset conversation state
        this.conversationId = null;
        this.messages = [];
        this.isLoading = false;
        this.sendBtn.disabled = false;

        // Clear messages and restore empty state from template
        this.messagesContainer.innerHTML = '';
        this.injectEmptyState(this.messagesContainer);

        // Clear and focus input
        this.input.value = '';
        this.input.style.height = 'auto';
        this.input.focus();
    }

    addMessage(role, content) {
        // Remove empty state on first interaction
        const emptyState = this.messagesContainer.querySelector('.conv-search-empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `conv-search-message conv-search-message-${role}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'conv-search-message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        
        // Force scroll when user sends a message
        this.scrollToBottom(true);
        
        return contentDiv;
    }

    addStreamingMessage() {
        const welcome = this.messagesContainer.querySelector('.conv-search-welcome');
        if (welcome) {
            welcome.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = 'conv-search-message conv-search-message-assistant';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'conv-search-message-content';
        contentDiv.innerHTML = '<span class="conv-search-cursor"></span>';
        
        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        
        // Force scroll when assistant starts responding
        this.scrollToBottom(true);
        
        return contentDiv;
    }

    // Check if user is near the bottom of scroll (within 100px)
    isNearBottom() {
        const container = this.messagesContainer;
        const threshold = 100;
        return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
    }

    scrollToBottom(force = false) {
        // Only auto-scroll if user is near bottom or force is true
        if (force || this.isNearBottom()) {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }

    async sendMessage() {
        const query = this.input.value.trim();
        if (!query || this.isLoading) return;

        this.isLoading = true;
        this.input.value = '';
        this.input.style.height = 'auto';
        this.sendBtn.disabled = true;

        // Add user message
        this.addMessage('user', query);

        // Add streaming response container
        const responseContainer = this.addStreamingMessage();

        try {
            await this.streamConversation(query, responseContainer);
        } catch (error) {
            if (error.name === 'AbortError') {
                responseContainer.textContent = 'Request cancelled.';
            } else {
                console.error('Conversational search error:', error);
                responseContainer.textContent = 'Sorry, something went wrong. Please try again.';
            }
        } finally {
            this.isLoading = false;
            this.sendBtn.disabled = false;
            this.abortController = null;
            this.input.focus();
        }
    }

    async streamConversation(query, responseContainer) {
        // Create abort controller for cancellation
        this.abortController = new AbortController();
        const startTime = Date.now();

        // Build the search body - only collection-specific params go here
        const searchBody = {
            searches: [
                {
                    collection: typesenseConfig.docsIndex,
                    per_page: 15,
                    exclude_fields: EMBEDDING_FIELD,
                    filter_by: 'language:en',
                    query_by: EMBEDDING_FIELD,
                    prefix: false // Required for remote embedders
                }
            ]
        };

        // Build query params - conversation params go in the URL
        const queryParams = new URLSearchParams({
            conversation: 'true',
            conversation_model_id: CONVERSATION_MODEL_ID,
            q: query,
            conversation_stream: 'true'
        });

        // Add conversation_id for follow-up questions
        if (this.conversationId) {
            queryParams.set('conversation_id', this.conversationId);
        }

        // Build the URL for streaming
        const host = `${typesenseConfig.host}-1.a1.typesense.net`;
        const url = `https://${host}/multi_search?${queryParams.toString()}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream',
                'X-TYPESENSE-API-KEY': typesenseConfig.public_key
            },
            body: JSON.stringify(searchBody),
            signal: this.abortController.signal
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Typesense error:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Stream the SSE response
        if (response.body) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedMessage = '';
            let buffer = '';
            let lastRenderTime = 0;
            const RENDER_THROTTLE = 50; // Render markdown every 50ms max

            responseContainer.innerHTML = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                
                // Process complete SSE lines
                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // Keep incomplete line in buffer

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6).trim();
                        
                        // Check for end of stream
                        if (data === '[DONE]') {
                            continue;
                        }

                        try {
                            const parsed = JSON.parse(data);
                            
                            // Extract conversation_id from first chunk
                            if (parsed.conversation_id && !this.conversationId) {
                                this.conversationId = parsed.conversation_id;
                            }

                            // Streaming chunks have incremental message content
                            if (parsed.message !== undefined) {
                                accumulatedMessage += parsed.message;
                                
                                // Render markdown progressively (throttled)
                                const now = Date.now();
                                if (now - lastRenderTime > RENDER_THROTTLE) {
                                    responseContainer.innerHTML = marked.parse(accumulatedMessage);
                                    lastRenderTime = now;
                                    this.scrollToBottom();
                                }
                            }

                            // Final chunk contains full conversation object
                            if (parsed.conversation) {
                                this.conversationId = parsed.conversation.conversation_id;
                            }
                        } catch (e) {
                            // Skip malformed JSON chunks
                            console.debug('Skipping malformed chunk:', data);
                        }
                    }
                }
            }

            // Render markdown after streaming completes
            if (accumulatedMessage) {
                responseContainer.innerHTML = marked.parse(accumulatedMessage);
                this.addMessageActions(responseContainer.parentElement, query, accumulatedMessage);
                this.scrollToBottom();
                
                // Log successful response with latency and full content
                const latency = Date.now() - startTime;
                this.logAction('Conversational Search Response', {
                    conversational_search: {
                        action: 'response_received',
                        query,
                        response: accumulatedMessage, // Full AI response
                        response_length: accumulatedMessage.length,
                        conversation_id: this.conversationId,
                        latency_ms: latency
                    }
                });
            } else {
                responseContainer.textContent = 'No response received. Please try again.';
            }
        } else {
            // Fallback for browsers that don't support streaming
            const text = await response.text();
            const lines = text.split('\n');
            let fullAnswer = '';

            for (const line of lines) {
                if (line.startsWith('data: ') && line.slice(6).trim() !== '[DONE]') {
                    try {
                        const parsed = JSON.parse(line.slice(6));
                        if (parsed.message) {
                            fullAnswer += parsed.message;
                        }
                        if (parsed.conversation_id) {
                            this.conversationId = parsed.conversation_id;
                        }
                    } catch (e) {
                        // Skip malformed lines
                    }
                }
            }

            if (fullAnswer) {
                responseContainer.innerHTML = marked.parse(fullAnswer);
                this.addMessageActions(responseContainer.parentElement, query, fullAnswer);
                
                // Log successful response with latency and full content (fallback mode)
                const latency = Date.now() - startTime;
                this.logAction('Conversational Search Response', {
                    conversational_search: {
                        action: 'response_received',
                        query,
                        response: fullAnswer, // Full AI response
                        response_length: fullAnswer.length,
                        conversation_id: this.conversationId,
                        latency_ms: latency
                    }
                });
            } else {
                responseContainer.textContent = 'No response received.';
            }
        }
    }

    addMessageActions(messageDiv, query, response) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'conv-search-message-actions';
        
        // SVG icons - outline (default) and filled (active)
        const thumbsUpOutline = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`;
        const thumbsUpFilled = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`;
        const thumbsDownOutline = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>`;
        const thumbsDownFilled = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>`;
        const copyOutline = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
        const copyFilled = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
        
        actionsDiv.innerHTML = `
            <button class="conv-search-action-btn" data-action="thumbs-up" data-outline="${encodeURIComponent(thumbsUpOutline)}" data-filled="${encodeURIComponent(thumbsUpFilled)}" title="Good response">
                ${thumbsUpOutline}
            </button>
            <button class="conv-search-action-btn" data-action="thumbs-down" data-outline="${encodeURIComponent(thumbsDownOutline)}" data-filled="${encodeURIComponent(thumbsDownFilled)}" title="Bad response">
                ${thumbsDownOutline}
            </button>
            <button class="conv-search-action-btn" data-action="copy" data-outline="${encodeURIComponent(copyOutline)}" data-filled="${encodeURIComponent(copyFilled)}" title="Copy response">
                ${copyOutline}
            </button>
        `;

        // Bind event handlers
        const buttons = actionsDiv.querySelectorAll('.conv-search-action-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.dataset.action;
                this.handleMessageAction(action, query, response, btn);
            });
        });

        messageDiv.appendChild(actionsDiv);
    }

    handleMessageAction(action, query, response, button) {
        const logData = {
            conversational_search: {
                action,
                query,
                response_length: response.length,
                conversation_id: this.conversationId
            }
        };

        // Helper to swap icon to filled/outline
        const setButtonIcon = (btn, filled) => {
            const icon = filled ? btn.dataset.filled : btn.dataset.outline;
            if (icon) btn.innerHTML = decodeURIComponent(icon);
        };

        switch (action) {
            case 'thumbs-up':
                this.logAction('Conversational Search Feedback', { ...logData, conversational_search: { ...logData.conversational_search, feedback: 'positive' } });
                button.classList.add('active');
                setButtonIcon(button, true);
                // Reset thumbs-down
                const thumbsDown = button.parentElement.querySelector('[data-action="thumbs-down"]');
                if (thumbsDown) {
                    thumbsDown.classList.remove('active');
                    setButtonIcon(thumbsDown, false);
                }
                break;

            case 'thumbs-down':
                this.logAction('Conversational Search Feedback', { ...logData, conversational_search: { ...logData.conversational_search, feedback: 'negative' } });
                button.classList.add('active');
                setButtonIcon(button, true);
                // Reset thumbs-up
                const thumbsUp = button.parentElement.querySelector('[data-action="thumbs-up"]');
                if (thumbsUp) {
                    thumbsUp.classList.remove('active');
                    setButtonIcon(thumbsUp, false);
                }
                break;

            case 'copy':
                navigator.clipboard.writeText(response).then(() => {
                    this.logAction('Conversational Search Copy', logData);
                    // Show copied feedback - filled icon for 3 seconds
                    const originalTitle = button.title;
                    const filledIcon = decodeURIComponent(button.dataset.filled);
                    const outlineIcon = decodeURIComponent(button.dataset.outline);
                    
                    button.title = 'Copied!';
                    button.classList.add('copied');
                    button.innerHTML = filledIcon;
                    
                    setTimeout(() => {
                        button.title = originalTitle;
                        button.classList.remove('copied');
                        button.innerHTML = outlineIcon;
                    }, 3000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
                break;
        }
    }

    logAction(message, data) {
        // Always log to console for debugging in dev/preview
        console.log('[Conversational Search] Action:', message, data);

        if (window.DD_LOGS?.logger) {
            console.log('DD_LOGS.logger found, logging message:', message, data);
            window.DD_LOGS.logger.info(message, data, 'info');
        } else {
            console.warn('DD_LOGS.logger not found, could not log message:', message, data);
        }
        
        if (window.DD_RUM) {
            window.DD_RUM.addAction('conversational_search_action', data.conversational_search);
        } else {
            console.warn('DD_RUM not found, could not send RUM action:', data.conversational_search);
        }
    }
}

// Store instance globally for external access
let conversationalSearchInstance = null;

// Initialize when DOM is ready
function initConversationalSearch() {
    // Guard against double initialization
    if (!IS_CONVERSATIONAL_SEARCH_ENABLED || conversationalSearchInstance) {
        return;
    }

    conversationalSearchInstance = new ConversationalSearch();
}

// Open the modal and send a query (for external use)
function askDocsAI(query) {
    if (IS_CONVERSATIONAL_SEARCH_ENABLED && conversationalSearchInstance) {
        conversationalSearchInstance.open();
        if (query && query.trim()) {
            conversationalSearchInstance.input.value = query;
            // Small delay to ensure modal is fully open
            setTimeout(() => {
                conversationalSearchInstance.sendMessage();
            }, 100);
        }
    }
}

// Expose globally for search bar integration
window.askDocsAI = askDocsAI;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConversationalSearch);
} else {
    initConversationalSearch();
}

export { ConversationalSearch, typesenseClient, askDocsAI, CONVERSATIONAL_SEARCH_FLAG_KEY };
