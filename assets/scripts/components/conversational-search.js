import { getConfig } from '../helpers/getConfig';
import Typesense from 'typesense';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { initializeFeatureFlags, getBooleanFlag, fetchDatadogUserStatus } from 'scripts/helpers/feature-flags';

const { env } = document.documentElement.dataset;
const docsConfig = getConfig(env);
const typesenseConfig = docsConfig.typesense;

let IS_CONVERSATIONAL_SEARCH_ENABLED = false;
const CONVERSATIONAL_SEARCH_FLAG_KEY = 'docs_conversational_search';

initializeFeatureFlags().then(async (client) => {
    IS_CONVERSATIONAL_SEARCH_ENABLED = getBooleanFlag(client, CONVERSATIONAL_SEARCH_FLAG_KEY);

    // Auto-enable for logged-in Datadog users (dogwebu cookie via /locate).
    // The promise is already resolved at this point (fetched during FF init).
    if (!IS_CONVERSATIONAL_SEARCH_ENABLED) {
        const isDatadogUser = await fetchDatadogUserStatus();
        if (isDatadogUser) {
            IS_CONVERSATIONAL_SEARCH_ENABLED = true;
        }
    }

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
const CONV_MODEL_DOCS_PREVIEW = 'docs-ai-conv-model-v1-preview';
const CONV_MODEL_DOCS_STABLE = 'docs-ai-conv-model-v1-stable';
const DEFAULT_CONVERSATION_MODEL_ID = CONV_MODEL_DOCS_STABLE;
const USE_LEGACY_MODEL_FLAG_KEY = 'DOCS_AI_USE_LEGACY_MODEL';
const feedbackHideTimers = new WeakMap();

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
    // Streaming conversational responses can legitimately take longer.
    connectionTimeoutSeconds: 45
});

class ConversationalSearch {
    constructor() {
        this.conversationId = null;
        this.isOpen = false;
        this.isLoading = false;
        this.messages = [];
        this.abortController = null;
        this.userCancelledRequest = false;
        this.hasLoggedFirstOpen = false;
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
                this.selectedModelId = CONV_MODEL_DOCS_PREVIEW;
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
        this.floatButton.addEventListener('click', () => this.open('floating_button'));
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

        // Hover tooltip for ref chips — show on enter wrap, hide on leave wrap
        this.messagesContainer.addEventListener('mouseover', (e) => {
            const wrap = e.target.closest('.conv-search-source-ref-wrap');
            if (!wrap || !this.messagesContainer.contains(wrap)) return;
            const btn = wrap.querySelector('.conv-search-source-ref-btn');
            if (btn && !wrap.querySelector('.conv-search-source-tooltip.open')) {
                this.closeAllSourceTooltips();
                this.showSourceTooltip(btn);
            }
        });

        this.messagesContainer.addEventListener('mouseout', (e) => {
            const wrap = e.target.closest('.conv-search-source-ref-wrap');
            if (!wrap || !this.messagesContainer.contains(wrap)) return;
            if (!wrap.contains(e.relatedTarget)) {
                this.closeAllSourceTooltips();
            }
        });

        this.messagesContainer.addEventListener('click', (e) => {
            // Click on ref chip → navigate directly to source
            const sourceRefBtn = e.target.closest('.conv-search-source-ref-btn');
            if (sourceRefBtn && this.messagesContainer.contains(sourceRefBtn)) {
                e.preventDefault();
                e.stopPropagation();

                const sourceNumber = sourceRefBtn.dataset.sourceNumber;
                const tooltipLink = sourceRefBtn.parentNode?.querySelector('.conv-search-source-tooltip a');

                this.logAction('Conversational Search Source Ref Click', {
                    conversational_search: {
                        action: 'source_ref_click',
                        source_number: sourceNumber ? parseInt(sourceNumber, 10) : null,
                        source_url: tooltipLink?.href || null,
                        source_title: tooltipLink?.textContent || null,
                        conversation_id: this.conversationId
                    }
                });

                if (tooltipLink?.href) {
                    window.open(tooltipLink.href, '_blank', 'noopener,noreferrer');
                }
                return;
            }

            // Source card click handler
            const sourceCard = e.target.closest('.conv-search-source-card');
            if (sourceCard && this.messagesContainer.contains(sourceCard)) {
                const cardLink = sourceCard.querySelector('a');
                const badge = sourceCard.querySelector('.conv-search-source-card-number');
                this.logAction('Conversational Search Source Card Click', {
                    conversational_search: {
                        action: 'source_card_click',
                        source_number: badge ? parseInt(badge.textContent, 10) : null,
                        source_url: cardLink?.href || null,
                        source_title: cardLink?.textContent || null,
                        conversation_id: this.conversationId
                    }
                });
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

    open(trigger = 'entry_button') {
        if (!this.hasLoggedFirstOpen) {
            this.logAction('Conversational Search Open', {
                conversational_search: {
                    action: 'open_first_time',
                    trigger
                }
            });
            this.hasLoggedFirstOpen = true;
        }

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
        this.logAction('Conversational Search New Chat', {
            conversational_search: {
                action: 'new_chat',
                conversation_id: this.conversationId
            }
        });

        // Abort any ongoing request
        if (this.abortController) {
            this.userCancelledRequest = true;
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
        this.messagesContainer.querySelectorAll('.conv-search-source-tooltip.open').forEach((tooltip) => {
            tooltip.classList.remove('open');
            tooltip.removeAttribute('style');
        });
        this.messagesContainer.querySelectorAll('.conv-search-source-ref-btn[aria-expanded="true"]').forEach((btn) => {
            btn.setAttribute('aria-expanded', 'false');
        });
    }

    showSourceTooltip(button) {
        const wrap = button.closest('.conv-search-source-ref-wrap');
        if (!wrap) return;

        const tooltip = wrap.querySelector('.conv-search-source-tooltip');
        if (!tooltip) return;

        tooltip.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
        this.repositionTooltip(tooltip);
    }

    toggleSourceTooltip(button) {
        const wrap = button.closest('.conv-search-source-ref-wrap');
        if (!wrap) return;

        const tooltip = wrap.querySelector('.conv-search-source-tooltip');
        if (!tooltip) return;

        const willOpen = !tooltip.classList.contains('open');
        this.closeAllSourceTooltips();

        if (willOpen) {
            tooltip.classList.add('open');
            button.setAttribute('aria-expanded', 'true');
            this.repositionTooltip(tooltip);
        }
    }

    repositionTooltip(tooltip) {
        const dialogRect = this.sidebar.getBoundingClientRect();
        const tipRect = tooltip.getBoundingClientRect();

        if (tipRect.left < dialogRect.left + 8) {
            tooltip.style.left = '0';
            tooltip.style.transform = 'none';
        } else if (tipRect.right > dialogRect.right - 8) {
            tooltip.style.left = 'auto';
            tooltip.style.right = '0';
            tooltip.style.transform = 'none';
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
        const html = this.inlineRefChips(marked.parse(displayMarkdown));

        const container = document.createElement('div');
        container.innerHTML = html;

        if (sources.length > 0) {
            const byNumber = new Map();
            sources.forEach((s) => byNumber.set(s.number, s));
            this.attachTooltips(container, byNumber);
            container.appendChild(this.buildSourceCards(sources));
        }

        return container.innerHTML;
    }

    injectCodeCopyButtons(container) {
        const tpl = document.getElementById('conv-search-actions-template');
        const tplCopyBtn = tpl?.content?.querySelector('.conv-search-action-btn[data-action="copy"]');
        const copySrc = tplCopyBtn?.querySelector('.copy-icon')?.getAttribute('src') || '/images/svg-icons/copy.svg';
        const checkSrc = tplCopyBtn?.querySelector('.check-icon')?.getAttribute('src') || '/images/svg-icons/check-light.svg';

        container.querySelectorAll('pre').forEach((pre) => {
            if (pre.querySelector('.conv-search-code-copy')) return;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'conv-search-code-copy';
            btn.setAttribute('aria-label', 'Copy code');
            btn.innerHTML =
                `<img class="copy-icon" src="${copySrc}" width="14" height="14" alt="" />` +
                `<img class="check-icon" src="${checkSrc}" width="14" height="14" alt="" style="display:none" />`;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const code = pre.querySelector('code');
                const text = code ? code.textContent : pre.textContent;
                navigator.clipboard.writeText(text).catch(() => {});
                this.logAction('Conversational Search Copy', {
                    conversational_search: {
                        action: 'copy',
                        copy_type: 'snippet',
                        content_length: text?.length || 0,
                        conversation_id: this.conversationId
                    }
                });
                const copyIcon = btn.querySelector('.copy-icon');
                const checkIcon = btn.querySelector('.check-icon');
                copyIcon.style.display = 'none';
                checkIcon.style.display = 'block';
                setTimeout(() => {
                    copyIcon.style.display = 'block';
                    checkIcon.style.display = 'none';
                }, 1200);
            });
            pre.appendChild(btn);
        });
    }

    /**
     * String-based pass that converts [N] tokens to numbered badge chips.
     * Used during streaming (inert chips) AND final render (same DOM,
     * tooltips attached separately). Code blocks are left untouched.
     */
    inlineRefChips(html) {
        return html.replace(
            /(<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)|(\[(\d{1,3})\])/gi,
            (match, codeBlock, _ref, num) => {
                if (codeBlock) return codeBlock;
                return '<span class="conv-search-source-ref-wrap">'
                    + `<button type="button" class="conv-search-source-ref-btn" data-source-number="${num}">`
                    + `<span class="conv-search-source-ref-number">${num}</span>`
                    + '</button></span>';
            }
        );
    }

    /**
     * Walk existing chips produced by inlineRefChips and attach tooltip
     * spans with source URLs. Runs only on the final render pass.
     */
    attachTooltips(container, sourcesByNumber) {
        container.querySelectorAll('.conv-search-source-ref-btn[data-source-number]').forEach((btn) => {
            const num = parseInt(btn.dataset.sourceNumber, 10);
            const source = sourcesByNumber.get(num);
            if (!source) return;

            btn.setAttribute('aria-label', `Source ${num}: ${source.label}`);
            btn.setAttribute('aria-expanded', 'false');

            const tooltip = document.createElement('span');
            tooltip.className = 'conv-search-source-tooltip';
            tooltip.innerHTML = `<a href="${source.href}" target="_blank" rel="noopener noreferrer">${source.label}</a>`;

            btn.parentNode.appendChild(tooltip);
        });
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

            const arrow = document.createElement('span');
            arrow.className = 'conv-search-source-card-arrow';
            arrow.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>';

            card.appendChild(badge);
            card.appendChild(link);
            card.appendChild(arrow);
            cards.appendChild(card);
        });

        section.appendChild(cards);
        return section;
    }

    /**
     * Extract sources from the LLM response and strip them from display.
     *
     * Primary format — pipe-delimited (fast, streamable):
     *   [sources]
     *   1 | Page Title | https://docs.datadoghq.com/...
     *
     * Fallback — legacy ```sources``` JSON block.
     */
    extractSources(markdownText) {
        const markerIdx = markdownText.indexOf('[sources]');

        if (markerIdx !== -1) {
            const displayMarkdown = markdownText.slice(0, markerIdx).trim();
            const sources = this.parseSourceLines(markdownText.slice(markerIdx + 9));
            return { displayMarkdown, sources };
        }

        // Fallback: legacy JSON ```sources``` block
        const jsonRe = /```(?:sources|docs-sources|sources-json|json)\s*([\s\S]*?)```/gi;
        let displayMarkdown = markdownText;
        let sources = [];

        for (const match of markdownText.matchAll(jsonRe)) {
            const parsed = this.parseJsonSources(match[1]);
            if (parsed.length > 0) sources = parsed;
            displayMarkdown = displayMarkdown.replace(match[0], '');
        }

        // Strip incomplete blocks or partial markers still streaming
        displayMarkdown = displayMarkdown
            .replace(/```(?:sources|docs-sources|sources-json|json)[\s\S]*$/gi, '')
            .replace(/\[sources?\]?\s*$/i, '');

        sources.forEach((s, i) => { if (!s.number) s.number = i + 1; });
        return { displayMarkdown: displayMarkdown.trim(), sources };
    }

    parseSourceLines(text) {
        const sources = [];
        const lineRe = /^(\d+)\s*\|\s*(.+?)\s*\|\s*(\S+)\s*$/;

        for (const raw of text.split('\n')) {
            const m = raw.trim().match(lineRe);
            if (!m) continue;
            const href = this.normalizeHref(m[3]);
            if (!href) continue;
            sources.push({ number: parseInt(m[1], 10), href, label: m[2].trim() });
        }
        return sources;
    }

    parseJsonSources(jsonText) {
        try {
            const relaxed = jsonText.trim()
                .replace(/^\s*\{\s*sources\s*:/i, '{"sources":')
                .replace(/([{,]\s*)([a-zA-Z_]\w*)\s*:/g, '$1"$2":')
                .replace(/'/g, '"')
                .replace(/,\s*([}\]])/g, '$1');

            const parsed = JSON.parse(relaxed);
            const list = Array.isArray(parsed) ? parsed : parsed?.sources;
            if (!Array.isArray(list)) return [];

            const out = [];
            const seen = new Set();
            list.forEach((item, i) => {
                const href = this.normalizeHref(item?.url || item?.href || '');
                if (!href || seen.has(href)) return;
                seen.add(href);
                out.push({
                    number: typeof item?.number === 'number' ? item.number : i + 1,
                    href,
                    label: (item?.title || item?.label || href).toString().trim()
                });
            });
            return out;
        } catch {
            return [];
        }
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
        this.userCancelledRequest = false;
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
            if (error.name === 'AbortError' && this.userCancelledRequest) {
                responseContainer.textContent = 'Request cancelled.';
            } else {
                this.logError('Conversational Search Response Error', error);
                responseContainer.textContent = 'Sorry, something went wrong. Please try again.';
            }
        } finally {
            this.isLoading = false;
            this.sendBtn.disabled = false;
            this.abortController = null;
            this.userCancelledRequest = false;
            this.input.focus();
        }
    }

    async streamConversation(query, responseContainer) {
        // Create abort controller for cancellation
        this.abortController = new AbortController();
        const startTime = Date.now();

        // Build the search body - use preset from typesense.config.json
        const searchBody = {
            searches: [
                {
                    collection: typesenseConfig.docsIndex,
                    preset: 'docs_ai_search_preset'
                }
            ]
        };

        // Use the Typesense client for streaming so node failover uses configured HA nodes.
        const commonSearchParams = {
            conversation: true,
            conversation_model_id: this.selectedModelId,
            q: query,
            conversation_stream: true
        };

        // Add conversation_id for follow-up questions
        if (this.conversationId) {
            commonSearchParams.conversation_id = this.conversationId;
        }

        let accumulatedMessage = '';
        let lastRenderTime = 0;
        const RENDER_THROTTLE = 50; // Render markdown every 50ms max

        responseContainer.innerHTML = '';

        const response = await typesenseClient.apiCall.post('/multi_search', searchBody, commonSearchParams, {}, {
            abortSignal: this.abortController.signal,
            isStreamingRequest: true,
            streamConfig: {
                onChunk: (chunk) => {
                    if (chunk?.conversation_id && !this.conversationId) {
                        this.conversationId = chunk.conversation_id;
                    }

                    if (chunk?.message !== undefined) {
                        accumulatedMessage += chunk.message;

                        const now = Date.now();
                        if (now - lastRenderTime > RENDER_THROTTLE) {
                            const { displayMarkdown, sources } = this.extractSources(accumulatedMessage);
                            responseContainer.innerHTML = this.inlineRefChips(marked.parse(displayMarkdown));
                            if (sources.length > 0) {
                                responseContainer.appendChild(this.buildSourceCards(sources));
                            }
                            lastRenderTime = now;
                            this.scrollToBottom();
                        }
                    }
                },
                onError: (error) => {
                    this.logError('Conversational Search Streaming Error', error);
                }
            }
        });

        const finalConversationId = response?.results?.[0]?.conversation?.conversation_id;
        if (finalConversationId) {
            this.conversationId = finalConversationId;
        }

        // Render markdown after streaming completes
        if (accumulatedMessage) {
            responseContainer.innerHTML = this.renderMessageWithSources(accumulatedMessage);
            this.injectCodeCopyButtons(responseContainer);
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
                    const alreadyActive = button.classList.contains('active');

                    // Keep feedback idempotent: second click on same choice does nothing.
                    if (alreadyActive) return;

                    button.classList.add('active');
                    if (oppositeBtn) oppositeBtn.classList.remove('active');
                    this.showFeedbackTooltip(button, 'Thanks for feedback!');

                    this.logAction('Conversational Search Feedback', {
                        conversational_search: {
                            action: 'feedback',
                            feedback: action === 'thumbs-up' ? 'positive' : 'negative',
                            response_content: response,
                            conversation_id: this.conversationId
                        }
                    });
                }
                break;

            case 'copy':
                {
                    navigator.clipboard.writeText(response).catch(() => {
                        this.showFeedbackTooltip(button, 'Copy failed', true);
                    });
                    this.logAction('Conversational Search Copy', {
                        conversational_search: {
                            action: 'copy',
                            copy_type: 'full_response',
                            content_length: response?.length || 0,
                            conversation_id: this.conversationId
                        }
                    });
                    this.showFeedbackTooltip(button, 'Copied to clipboard!');

                    const copyIcon = button.querySelector('.copy-icon');
                    const checkIcon = button.querySelector('.check-icon');
                    if (copyIcon && checkIcon) {
                        copyIcon.style.display = 'none';
                        checkIcon.style.display = 'block';
                        setTimeout(() => {
                            copyIcon.style.display = 'block';
                            checkIcon.style.display = 'none';
                        }, 1200);
                    }
                }
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

        const existingHideTimer = feedbackHideTimers.get(feedbackEl);
        if (existingHideTimer) {
            clearTimeout(existingHideTimer);
        }

        const hideTimer = setTimeout(() => {
            feedbackEl.classList.remove('feedback-success', 'feedback-error');
            feedbackEl.textContent = '';
            feedbackHideTimers.delete(feedbackEl);
        }, 2000);
        feedbackHideTimers.set(feedbackEl, hideTimer);
    }

    logAction(message, data) {
        const conversationalSearchData = {
            docs_ai: true,
            model_id: this.selectedModelId,
            ...(data?.conversational_search || {})
        };
        const payload = {
            ...data,
            conversational_search: conversationalSearchData
        };

        console.log('[Conversational Search] Action:', message, payload);

        if (window.DD_LOGS?.logger) {
            console.log('DD_LOGS.logger found, logging message:', message, payload);
            window.DD_LOGS.logger.info(message, payload, 'info');
        } else {
            console.warn('DD_LOGS.logger not found, could not log message:', message, payload);
        }

        if (window.DD_RUM) {
            window.DD_RUM.addAction('conversational_search_action', conversationalSearchData);
        }
    }

    logError(message, error) {
        const errorData = {
            docs_ai: true,
            model_id: this.selectedModelId,
            conversation_id: this.conversationId,
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
function askDocsAI(query, options = {}) {
    if (IS_CONVERSATIONAL_SEARCH_ENABLED && conversationalSearchInstance) {
        conversationalSearchInstance.open(options.source || 'entry_button');
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
