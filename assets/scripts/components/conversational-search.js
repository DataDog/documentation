import { getConfig } from '../helpers/getConfig';
import Typesense from 'typesense';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { initializeFeatureFlags, getBooleanFlag } from 'scripts/helpers/feature-flags';

const { env } = document.documentElement.dataset;
const docsConfig = getConfig(env);
const typesenseConfig = docsConfig.typesense;

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

// Conversation model IDs
const MODEL_4_1_ID = 'CONVERSATION-MODEL-DOCS-OPENAI-GPT-4.1';
const MODEL_5_2_ID = 'CONVERSATION-MODEL-DOCS-OPENAI-GPT-5.2';
const DEFAULT_CONVERSATION_MODEL_ID = MODEL_5_2_ID;
const USE_LEGACY_MODEL_FLAG_KEY = 'docs_conv_search_use_gpt_4_1';

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
        this.selectedModelId = DEFAULT_CONVERSATION_MODEL_ID;
        this.isHomepage = document.querySelector('.kind-home') !== null;
        this.homeAiBtnVisible = false;

        this.init();
        this.resolveModelFromFlag();
    }

    init() {
        this.createElements();
        this.bindEvents();
    }

    resolveModelFromFlag() {
        initializeFeatureFlags().then((client) => {
            if (getBooleanFlag(client, USE_LEGACY_MODEL_FLAG_KEY)) {
                this.selectedModelId = MODEL_4_1_ID;
            }
        }).catch(() => {});
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

        // On the homepage, hide the floating button initially since the
        // homepage already has a dedicated "Ask AI" button. An
        // IntersectionObserver will show/hide it based on scroll position.
        if (this.isHomepage) {
            this.floatButton.classList.add('hidden');
        }

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

        // On the homepage, observe the dedicated "Ask AI" button so we
        // reveal the floating button once it scrolls out of view.
        if (this.isHomepage) {
            const homeAiBtn = document.querySelector('.home-ai-btn');
            if (homeAiBtn) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        this.homeAiBtnVisible = entry.isIntersecting;
                        // Only toggle when dialog is closed
                        if (!this.isOpen) {
                            if (entry.isIntersecting) {
                                this.floatButton.classList.add('hidden');
                            } else {
                                this.floatButton.classList.remove('hidden');
                            }
                        }
                    },
                    { threshold: 0 }
                );
                observer.observe(homeAiBtn);
            }
        }

        this.messagesContainer.addEventListener('click', (e) => {
            const sourceRefBtn = e.target.closest('.conv-search-source-ref-btn');
            if (sourceRefBtn && this.messagesContainer.contains(sourceRefBtn)) {
                e.preventDefault();
                e.stopPropagation();
                this.toggleSourceTooltip(sourceRefBtn);
                return;
            }

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

        // Close any open source tooltips when clicking outside them
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.conv-search-source-ref-wrap')) {
                this.closeAllSourceTooltips();
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
        document.body.style.overflow = '';

        // On the homepage, only show the floating button if the dedicated
        // "Ask AI" button has scrolled out of view.
        if (!this.isHomepage || !this.homeAiBtnVisible) {
            this.floatButton.classList.remove('hidden');
        }

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

    closeAllSourceTooltips() {
        const openTooltips = this.messagesContainer.querySelectorAll('.conv-search-source-tooltip.open');
        openTooltips.forEach((tooltip) => tooltip.classList.remove('open'));

        const expandedButtons = this.messagesContainer.querySelectorAll('.conv-search-source-ref-btn[aria-expanded="true"]');
        expandedButtons.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
    }

    toggleSourceTooltip(button) {
        const wrap = button.closest('.conv-search-source-ref-wrap');
        if (!wrap) {
            return;
        }

        const tooltip = wrap.querySelector('.conv-search-source-tooltip');
        if (!tooltip) {
            return;
        }

        const willOpen = !tooltip.classList.contains('open');
        this.closeAllSourceTooltips();
        if (willOpen) {
            tooltip.classList.add('open');
            button.setAttribute('aria-expanded', 'true');
        }
    }

    /**
     * Render markdown with numbered reference chips and source cards.
     *
     * The LLM embeds [N] markers inline and appends a ```sources``` JSON
     * block mapping each number to a URL + title. We parse the sources,
     * swap [N] text nodes for clickable chips, and append a source-card
     * strip at the bottom.
     */
    renderMessageWithSources(markdownText) {
        const { displayMarkdown, sources } = this.extractSources(markdownText);
        const html = marked.parse(displayMarkdown);

        const container = document.createElement('div');
        container.innerHTML = html;

        if (sources.length > 0) {
            const byNumber = new Map();
            sources.forEach((s) => byNumber.set(s.number, s));
            this.replaceRefNumbers(container, byNumber);
            container.appendChild(this.buildSourceCards(sources));
        }

        return container.innerHTML;
    }

    /**
     * Walk DOM text nodes and replace [N] tokens with interactive chips.
     * Skips content inside <pre>/<code> so code blocks stay intact.
     */
    replaceRefNumbers(container, sourcesByNumber) {
        const refPattern = /\[\d{1,3}\]/;

        const walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    let el = node.parentNode;
                    while (el && el !== container) {
                        const tag = el.tagName;
                        if (tag === 'PRE' || tag === 'CODE') {
                            return NodeFilter.FILTER_REJECT;
                        }
                        el = el.parentNode;
                    }
                    return refPattern.test(node.textContent)
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT;
                }
            }
        );

        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        textNodes.forEach((textNode) => {
            const frag = document.createDocumentFragment();
            textNode.textContent.split(/(\[\d{1,3}\])/).forEach((part) => {
                const m = part.match(/^\[(\d{1,3})\]$/);
                if (m) {
                    const num = parseInt(m[1], 10);
                    const source = sourcesByNumber.get(num);
                    if (source) {
                        frag.appendChild(this.createRefChip(num, source));
                        return;
                    }
                }
                if (part) frag.appendChild(document.createTextNode(part));
            });
            textNode.parentNode.replaceChild(frag, textNode);
        });
    }

    createRefChip(number, source) {
        const wrap = document.createElement('span');
        wrap.className = 'conv-search-source-ref-wrap';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'conv-search-source-ref-btn';
        btn.setAttribute('data-source-number', String(number));
        btn.setAttribute('aria-label', `Source ${number}: ${source.label}`);
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = `<span class="conv-search-source-ref-number">${number}</span>`;

        const tooltip = document.createElement('div');
        tooltip.className = 'conv-search-source-tooltip';
        tooltip.innerHTML = `<a href="${source.href}" target="_blank" rel="noopener noreferrer">${source.label}</a>`;

        wrap.appendChild(btn);
        wrap.appendChild(tooltip);
        return wrap;
    }

    buildSourceCards(sources) {
        const section = document.createElement('div');
        section.className = 'conv-search-sources';

        const title = document.createElement('p');
        title.className = 'conv-search-sources-title';
        title.textContent = 'Sources';
        section.appendChild(title);

        const cards = document.createElement('div');
        cards.className = 'conv-search-sources-cards';

        sources.forEach((source) => {
            const card = document.createElement('article');
            card.className = 'conv-search-source-card';

            const badge = document.createElement('span');
            badge.className = 'conv-search-source-card-number';
            badge.textContent = String(source.number);

            const link = document.createElement('a');
            link.href = source.href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = source.label;

            card.appendChild(badge);
            card.appendChild(link);
            cards.appendChild(card);
        });

        section.appendChild(cards);
        return section;
    }

    /**
     * Extract the ```sources … ``` JSON block, strip it from display
     * markdown, and return parsed source objects with number/href/label.
     */
    extractSources(markdownText) {
        const sourceBlockRegex = /```(?:sources|docs-sources|sources-json|json)\s*([\s\S]*?)```/gi;
        let displayMarkdown = markdownText;
        let sources = [];
        const matches = [...markdownText.matchAll(sourceBlockRegex)];

        matches.forEach((match) => {
            const parsed = this.parseSourcesJson(match[1]);
            if (parsed.length > 0) sources = [...sources, ...parsed];
            displayMarkdown = displayMarkdown.replace(match[0], '');
        });

        sources.forEach((s, i) => {
            if (!s.number) s.number = i + 1;
        });

        return { displayMarkdown: displayMarkdown.trim(), sources };
    }

    parseSourcesJson(jsonText) {
        for (const candidate of [jsonText.trim(), this.relaxSourcesJson(jsonText)]) {
            if (!candidate) continue;
            const parsed = this.tryParseSourcesCandidate(candidate);
            if (parsed.length > 0) return parsed;
        }
        return [];
    }

    tryParseSourcesCandidate(candidateText) {
        try {
            const parsed = JSON.parse(candidateText);
            const list = Array.isArray(parsed) ? parsed : parsed?.sources;
            if (!Array.isArray(list)) return [];

            const out = [];
            const seen = new Set();
            list.forEach((item, i) => {
                const href = this.normalizeHref(item?.url || item?.href || item?.link || '');
                if (!href || seen.has(href)) return;
                seen.add(href);

                const label = (item?.title || item?.label || item?.name || href).toString().trim() || href;
                const number = typeof item?.number === 'number' ? item.number : i + 1;
                out.push({ number, href, label });
            });
            return out;
        } catch {
            return [];
        }
    }

    relaxSourcesJson(rawJsonText) {
        let relaxed = (rawJsonText || '').trim();
        if (!relaxed) return '';

        relaxed = relaxed
            .replace(/^\s*\{\s*sources\s*:/i, '{"sources":')
            .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')
            .replace(/'/g, '"')
            .replace(/,\s*([}\]])/g, '$1');
        return relaxed;
    }

    normalizeHref(rawHref) {
        const href = (rawHref || '').toString().trim();
        if (!href) return '';

        try {
            const url = new URL(href, window.location.origin);
            if (!['http:', 'https:'].includes(url.protocol)) return '';
            return url.href;
        } catch {
            return '';
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
            conversation_model_id: this.selectedModelId,
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
                                    // Strip any sources/json fenced block so it never flashes during streaming
                                    const streamDisplay = accumulatedMessage.replace(/```(?:sources|docs-sources|sources-json|json)[\s\S]*?(?:```|$)/gi, '').trim();
                                    responseContainer.innerHTML = marked.parse(streamDisplay);
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
                responseContainer.innerHTML = this.renderMessageWithSources(accumulatedMessage);
                this.addMessageActions(responseContainer.parentElement, query, accumulatedMessage);
                this.scrollToBottom();
                
                // Log successful response with latency and full content
                const latency = Date.now() - startTime;
                this.logAction('Conversational Search Response', {
                    conversational_search: {
                        action: 'response_received',
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
                responseContainer.innerHTML = this.renderMessageWithSources(fullAnswer);
                this.addMessageActions(responseContainer.parentElement, query, fullAnswer);
                
                const latency = Date.now() - startTime;
                this.logAction('Conversational Search Response', {
                    conversational_search: {
                        action: 'response_received',
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
        const template = document.getElementById('conv-search-actions-template');
        if (!template) {
            console.error('[Conversational Search] Template #conv-search-actions-template not found in DOM');
            return;
        }

        const actionsDiv = template.content.firstElementChild.cloneNode(true);

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
        switch (action) {
            case 'thumbs-up':
            case 'thumbs-down':
                {
                    const opposite = action === 'thumbs-up' ? 'thumbs-down' : 'thumbs-up';
                    const oppositeBtn = button.parentElement.querySelector(`[data-action="${opposite}"]`);
                    const isUndo = button.classList.contains('active');

                    if (isUndo) {
                        button.classList.remove('active');
                        this.showFeedbackTooltip(button, 'Feedback removed');
                    } else {
                        button.classList.add('active');
                        if (oppositeBtn) oppositeBtn.classList.remove('active');
                        this.showFeedbackTooltip(button, 'Thanks for feedback!');
                    }

                    this.logAction('Conversational Search Feedback', {
                        conversational_search: {
                            action: 'feedback',
                            feedback: isUndo ? 'cleared' : (action === 'thumbs-up' ? 'positive' : 'negative'),
                            conversation_id: this.conversationId
                        }
                    });
                }
                break;

            case 'copy':
                navigator.clipboard.writeText(response).then(() => {
                    this.logAction('Conversational Search Copy', {
                        conversational_search: {
                            action: 'copy',
                            conversation_id: this.conversationId
                        }
                    });
                    this.showFeedbackTooltip(button, 'Copied to clipboard!');
                }).catch(() => {
                    this.showFeedbackTooltip(button, 'Copy failed', true);
                });
                break;
        }
    }

    showFeedbackTooltip(button, message, isError = false) {
        const feedbackEl = button.parentElement?.querySelector('.conv-search-feedback-inline');
        if (!feedbackEl) {
            return;
        }

        // Strip classes + force reflow so the animation restarts every time
        feedbackEl.classList.remove('feedback-success', 'feedback-error');
        void feedbackEl.offsetWidth;

        feedbackEl.textContent = message;
        feedbackEl.classList.add(isError ? 'feedback-error' : 'feedback-success');

        clearTimeout(feedbackEl._hideTimer);
        feedbackEl._hideTimer = setTimeout(() => {
            feedbackEl.classList.remove('feedback-success', 'feedback-error');
            feedbackEl.textContent = '';
        }, 2000);
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
