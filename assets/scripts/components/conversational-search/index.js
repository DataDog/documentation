import { getConfig } from '../../helpers/getConfig';
import { initializeFeatureFlags, getBooleanFlag, fetchDatadogUserStatus } from 'scripts/helpers/feature-flags';

import { logAction, logError } from './logger';
import { parseMarkdown, inlineRefChips, extractSources, renderMessageWithSources } from './markdown';
import { attachTooltips, buildSourceCards, showSourceTooltip, closeAllSourceTooltips, repositionTooltip } from './sources';
import { addMessageActions, injectCodeCopyButtons } from './actions';
import { streamDocsAiChat } from './docsai-client';
import { pickQuestions } from './suggested-questions';

const { env } = document.documentElement.dataset;
const docsConfig = getConfig(env);
const docsAiConfig = docsConfig.docsAi;

const DOCS_AI_ENABLED_FLAG_KEY = 'docs-ai-enabled';

// Optimistic render: default on so the UI mounts at DOMContentLoaded — no
// layout shift. If the flag resolves to false we tear the UI down. Right
// tradeoff for a default-on permanent kill switch: degraded UX during a rare
// incident is fine; everyday layout shift is not.
let IS_DOCS_AI_ENABLED = true;

const INTERNAL_CONVERSATION_ID_PREFIX = 'dd_docsai_';

const RENDER_THROTTLE = 50;

// Auto-rotated client-side messages shown while we wait for the first server `thinking` event.
// Aligned with the mapped server messages below so the user sees consistent copy either way.
const LOADING_MESSAGES = [
    'Understanding your question…',
    'Searching the docs…',
    'Reading the most relevant pages…',
    'Drafting your response…'
];

// Maps backend `thinking` event content to user-facing copy.
// `null` hides the event entirely (used for internal optimization steps the user shouldn't see).
// Unknown keys fall through to the original message so new backend stages still surface something.
const THINKING_MESSAGES = {
    'Rewriting query...': 'Understanding your question…',
    'Searching documentation...': 'Searching the docs…',
    'Reviewing relevant pages': 'Reading the most relevant pages…',
    'Generating answer...': 'Drafting your response…',
    'Something went wrong. Please try again.': 'Something went wrong. Try asking again.'
};

function mapThinkingMessage(serverMessage) {
    if (Object.prototype.hasOwnProperty.call(THINKING_MESSAGES, serverMessage)) {
        return THINKING_MESSAGES[serverMessage];
    }
    return serverMessage;
}

let isDatadogUser = false;

initializeFeatureFlags().then(async (client) => {
    IS_DOCS_AI_ENABLED = getBooleanFlag(client, DOCS_AI_ENABLED_FLAG_KEY, true);
    isDatadogUser = await fetchDatadogUserStatus();

    if (IS_DOCS_AI_ENABLED) {
        logAction('Conversational Search Impression', {
            conversational_search: { action: 'impression', page: window.location.pathname }
        });
    } else {
        teardownConversationalSearch();
    }
});

// --- Main class ------------------------------------------------------------------

class ConversationalSearch {
    constructor() {
        this.conversationId = null;
        this.chatHistory = [];
        this.isOpen = false;
        this.isLoading = false;
        this.abortController = null;
        this.userCancelledRequest = false;
        this.hasLoggedFirstOpen = false;
        this.isSuggestionQuery = false;

        // Rewrites the initial user query for better retrieval before answering.
        // Only applied on the first message (no history). Follow-ups use history context instead.
        this.shouldRewriteQuery = true;

        this.isHomepage = document.querySelector('.kind-home') !== null;
        this.homeAiBtnVisible = false;
        this.ready = false;

        if (!this.createElements()) return;
        this.bindEvents();
        this.ready = true;
    }

    get ctx() {
        return {
            conversationId: this.conversationId,
            isDatadogUser
        };
    }

    log(message, data) { logAction(message, data, this.ctx); }
    logErr(message, error) { logError(message, error, this.ctx); }

    generateInternalConversationId() {
        if (window.crypto?.randomUUID) {
            return `${INTERNAL_CONVERSATION_ID_PREFIX}${window.crypto.randomUUID()}`;
        }

        return `${INTERNAL_CONVERSATION_ID_PREFIX}${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    }

    // --- DOM setup ---------------------------------------------------------------

    createElements() {
        const template = document.getElementById('conv-search-template');
        if (!template) {
            console.warn(
                `[Conversational Search] Skipped — #conv-search-template not in DOM on ${window.location.pathname}. ` +
                `This layout (404) does not include the conversational-search partial.`
            );
            return false;
        }

        const content = template.content;
        this.floatButton = content.querySelector('.conv-search-float-btn').cloneNode(true);
        this.overlay = content.querySelector('.conv-search-overlay').cloneNode(true);
        this.sidebar = content.querySelector('.conv-search-sidebar').cloneNode(true);

        const messagesContainer = this.sidebar.querySelector('.conv-search-messages');
        this.injectEmptyState(messagesContainer);

        if (this.isHomepage) {
            this.floatButton.classList.add('hidden');
        }

        document.body.appendChild(this.floatButton);
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.sidebar);

        this.closeBtn = this.sidebar.querySelector('.conv-search-close');
        this.newChatBtn = this.sidebar.querySelector('.conv-search-new');
        this.messagesContainer = messagesContainer;
        this.input = this.sidebar.querySelector('.conv-search-input');
        this.sendBtn = this.sidebar.querySelector('.conv-search-send');
        return true;
    }

    injectEmptyState(container) {
        const emptyStateTemplate = document.getElementById('conv-search-empty-state');
        if (emptyStateTemplate) {
            container.appendChild(emptyStateTemplate.content.cloneNode(true));
            this.renderSuggestions(container);
        }
    }

    renderSuggestions(container = this.messagesContainer) {
        const suggestionsContainer = container?.querySelector('.conv-search-suggestions');
        const template = document.getElementById('conv-search-suggestion-template');
        if (!suggestionsContainer || !template) return;

        suggestionsContainer.replaceChildren(...pickQuestions().map((q) => {
            const btn = template.content.firstElementChild.cloneNode(true);
            btn.dataset.query = q;
            btn.querySelector('span').textContent = q;
            return btn;
        }));
    }

    // --- Events ------------------------------------------------------------------

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

        this.input.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });

        this.bindHomepageObserver();
        this.bindTooltipEvents();
        this.bindClickDelegation();
        this.bindScrollFade();
    }

    bindHomepageObserver() {
        if (!this.isHomepage) return;
        const homeAiBtn = document.querySelector('.home-ai-btn');
        if (!homeAiBtn) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                this.homeAiBtnVisible = entry.isIntersecting;
                if (!this.isOpen) {
                    this.floatButton.classList.toggle('hidden', entry.isIntersecting);
                }
            },
            { threshold: 0 }
        );
        observer.observe(homeAiBtn);
    }

    bindScrollFade() {
        this.messagesContainer.addEventListener('scroll', () => {
            this.messagesContainer.classList.toggle(
                'has-scrolled',
                this.messagesContainer.scrollTop > 0
            );
        });
    }

    bindTooltipEvents() {
        this.messagesContainer.addEventListener('mouseover', (e) => {
            const wrap = e.target.closest('.conv-search-source-ref-wrap');
            if (!wrap || !this.messagesContainer.contains(wrap)) return;
            const btn = wrap.querySelector('.conv-search-source-ref-btn');
            if (btn && !wrap.querySelector('.conv-search-source-tooltip.open')) {
                closeAllSourceTooltips(this.messagesContainer);
                showSourceTooltip(btn);
                repositionTooltip(
                    wrap.querySelector('.conv-search-source-tooltip'),
                    this.sidebar
                );
            }
        });

        this.messagesContainer.addEventListener('mouseout', (e) => {
            const wrap = e.target.closest('.conv-search-source-ref-wrap');
            if (!wrap || !this.messagesContainer.contains(wrap)) return;
            if (!wrap.contains(e.relatedTarget)) {
                closeAllSourceTooltips(this.messagesContainer);
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.conv-search-source-ref-wrap')) {
                closeAllSourceTooltips(this.messagesContainer);
            }
        });
    }

    bindClickDelegation() {
        this.messagesContainer.addEventListener('click', (e) => {
            const sourceRefBtn = e.target.closest('.conv-search-source-ref-btn');
            if (sourceRefBtn && this.messagesContainer.contains(sourceRefBtn)) {
                e.preventDefault();
                e.stopPropagation();

                const sourceNumber = sourceRefBtn.dataset.sourceNumber;
                const tooltipLink = sourceRefBtn.parentNode?.querySelector('.conv-search-source-tooltip a');

                this.logInteraction('source_ref_click', {
                    source_number: sourceNumber ? parseInt(sourceNumber, 10) : null,
                    source_url: tooltipLink?.href || null,
                    source_title: tooltipLink?.textContent || null
                });

                if (tooltipLink?.href) {
                    window.open(tooltipLink.href, '_blank', 'noopener,noreferrer');
                }
                return;
            }

            const sourceCard = e.target.closest('.conv-search-source-card');
            if (sourceCard && this.messagesContainer.contains(sourceCard)) {
                const cardLink = sourceCard.querySelector('a');
                const badge = sourceCard.querySelector('.conv-search-source-card-number');
                this.logInteraction('source_card_click', {
                    source_number: badge ? parseInt(badge.textContent, 10) : null,
                    source_url: cardLink?.href || null,
                    source_title: cardLink?.textContent || null
                });
            }

            const suggestionBtn = e.target.closest('.conv-search-suggestion');
            if (suggestionBtn) {
                const query = suggestionBtn.dataset.query;
                if (query) {
                    this.logInteraction('suggestion_clicked', { suggestion_query: query });
                    this.input.value = query;
                    this.isSuggestionQuery = true;
                    this.sendMessage();
                }
            }

            const link = e.target.closest('a');
            if (link && this.messagesContainer.contains(link)) {
                this.logInteraction('link_clicked', {
                    link_url: link.href,
                    link_text: link.textContent
                });
            }
        });
    }

    // --- Open / Close / Reset ----------------------------------------------------

    open(trigger = 'entry_button') {
        if (!this.hasLoggedFirstOpen) {
            this.log('Conversational Search Open', {
                conversational_search: { action: 'open_first_time', trigger }
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
        const messageCount = this.chatHistory.filter(m => m.role === 'user').length;
        if (messageCount > 0) {
            this.logInteraction('conversation_close', {
                messages_sent: messageCount,
                responses_received: this.chatHistory.filter(m => m.role === 'assistant').length
            });
        }

        this.isOpen = false;
        this.sidebar.classList.remove('open');
        this.overlay.classList.remove('open');
        document.body.style.overflow = '';

        if (!this.isHomepage || !this.homeAiBtnVisible) {
            this.floatButton.classList.remove('hidden');
        }
    }

    newChat() {
        this.logInteraction('new_chat');

        if (this.abortController) {
            this.userCancelledRequest = true;
            this.abortController.abort();
            this.abortController = null;
        }

        this.conversationId = null;
        this.chatHistory = [];
        this.isSuggestionQuery = false;
        this.isLoading = false;
        this.sendBtn.disabled = false;

        this.messagesContainer.innerHTML = '';
        this.injectEmptyState(this.messagesContainer);

        this.input.value = '';
        this.input.style.height = 'auto';
        this.input.focus();
    }

    // --- Message DOM helpers -----------------------------------------------------

    addMessage(role, content) {
        const emptyState = this.messagesContainer.querySelector('.conv-search-empty-state');
        if (emptyState) emptyState.remove();

        const messageDiv = document.createElement('div');
        messageDiv.className = `conv-search-message conv-search-message-${role}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'conv-search-message-content';
        contentDiv.textContent = content;

        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom(true);

        return contentDiv;
    }

    addResponseContainer() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'conv-search-message conv-search-message-assistant';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'conv-search-message-content';

        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom(true);

        return contentDiv;
    }

    /**
     * Shows a spinner + status text while waiting for the first content token.
     * Returns { updateStatus, stop } — call updateStatus(text) when the server
     * sends a thinking event (auto-rotation is killed on first call); call stop()
     * to remove the indicator.
     */
    showLoadingIndicator() {
        const emptyState = this.messagesContainer.querySelector('.conv-search-empty-state');
        if (emptyState) emptyState.remove();

        const wrapper = document.createElement('div');
        wrapper.className = 'conv-search-message conv-search-message-assistant conv-search-loading-state';

        const indicator = document.createElement('div');
        indicator.className = 'conv-search-loading-indicator';
        indicator.innerHTML =
            '<span class="conv-search-loading-spinner"></span>' +
            `<span class="conv-search-status-text">${LOADING_MESSAGES[0]}</span>`;

        wrapper.appendChild(indicator);
        this.messagesContainer.appendChild(wrapper);
        this.scrollToBottom(true);

        let msgIndex = 0;
        let interval = setInterval(() => {
            if (msgIndex < LOADING_MESSAGES.length - 1) msgIndex++;
            const el = wrapper.querySelector('.conv-search-status-text');
            if (el) el.textContent = LOADING_MESSAGES[msgIndex];
        }, 3000);

        return {
            updateStatus: (text) => {
                if (interval) { clearInterval(interval); interval = null; }
                const el = wrapper.querySelector('.conv-search-status-text');
                if (el) el.textContent = text;
            },
            stop: () => {
                if (interval) clearInterval(interval);
                if (wrapper.parentNode) wrapper.remove();
            }
        };
    }

    isNearBottom() {
        const c = this.messagesContainer;
        return c.scrollHeight - c.scrollTop - c.clientHeight < 100;
    }

    scrollToBottom(force = false) {
        if (force || this.isNearBottom()) {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }

    // --- Logging helpers ---------------------------------------------------------

    logInteraction(action, extra = {}) {
        this.log('Conversational Search Interaction', {
            conversational_search: {
                action,
                ...(this.conversationId && { conversation_id: this.conversationId }),
                ...extra
            }
        });
    }

    logResponse({ query, answer, startTime }) {
        this.log('Conversational Search Response', {
            conversational_search: {
                action: 'response_received',
                response_length: answer.length,
                ...(this.conversationId && { conversation_id: this.conversationId }),
                latency_ms: Date.now() - startTime
            }
        });
    }

    // --- Send / dispatch ---------------------------------------------------------

    async sendMessage() {
        const query = this.input.value.trim();
        if (!query || this.isLoading) return;

        this.isLoading = true;
        this.userCancelledRequest = false;
        this.input.value = '';
        this.input.style.height = 'auto';
        this.sendBtn.disabled = true;

        this.addMessage('user', query);

        try {
            await this.runInternalStream(query);
        } catch (error) {
            if (error.name === 'AbortError' && this.userCancelledRequest) {
                this.addResponseContainer().textContent = 'Request cancelled.';
            } else {
                this.logErr('Conversational Search Response Error', error);
                this.addResponseContainer().textContent = 'Sorry, something went wrong. Please try again.';
            }
        } finally {
            this.isLoading = false;
            this.sendBtn.disabled = false;
            this.abortController = null;
            this.userCancelledRequest = false;
            this.isSuggestionQuery = false;
            this.input.focus();
        }
    }

    // --- Docs AI streaming -------------------------------------------------------

    async runInternalStream(query) {
        this.abortController = new AbortController();
        const startTime = Date.now();
        const loadingIndicator = this.showLoadingIndicator();

        const isFirstMessage = this.chatHistory.length === 0;
        const isSuggestion = this.isSuggestionQuery;
        if (!this.conversationId) {
            this.conversationId = this.generateInternalConversationId();
        }
        this.chatHistory.push({ role: 'user', content: query });

        let responseContainer = null;
        let lastRenderTime = 0;

        let answer;
        try {
            answer = await streamDocsAiChat({
                config: docsAiConfig,
                query,
                history: isFirstMessage ? [] : this.chatHistory.slice(0, -1),
                conversationId: this.conversationId,
                anchorUrl: window.location.href,
                rewriteQuery: isFirstMessage && this.shouldRewriteQuery && !isSuggestion,
                signal: this.abortController.signal,
                onThinking: (message) => {
                    const mapped = mapThinkingMessage(message);
                    if (mapped) loadingIndicator.updateStatus(mapped);
                },
                onToken: (_token, fullMessage) => {
                    if (!responseContainer) {
                        loadingIndicator.stop();
                        responseContainer = this.addResponseContainer();
                    }

                    const now = Date.now();
                    if (now - lastRenderTime > RENDER_THROTTLE) {
                        const { displayMarkdown, sources } = extractSources(fullMessage);
                        responseContainer.innerHTML = inlineRefChips(parseMarkdown(displayMarkdown));
                        if (sources.length > 0) {
                            responseContainer.appendChild(buildSourceCards(sources));
                        }
                        lastRenderTime = now;
                        this.scrollToBottom();
                    }
                },
                onError: (error) => {
                    this.logErr('Docs AI Streaming Error', error);
                }
            });
        } finally {
            loadingIndicator.stop();
        }

        if (!responseContainer) {
            responseContainer = this.addResponseContainer();
        }

        if (answer) {
            this.chatHistory.push({ role: 'assistant', content: answer });
            this.finalizeResponse(responseContainer, query, answer, startTime);
        } else {
            responseContainer.textContent = 'No response received. Please try again.';
        }
    }

    // --- Shared finalization -----------------------------------------------------

    finalizeResponse(container, query, answer, startTime) {
        container.innerHTML = renderMessageWithSources(answer, {
            attachTooltips,
            buildSourceCards
        });
        injectCodeCopyButtons(container, this.ctx);
        addMessageActions(container.parentElement, query, answer, this.ctx);
        this.scrollToBottom();
        this.logResponse({ query, answer, startTime });
    }
}

// --- Bootstrap -------------------------------------------------------------------

let conversationalSearchInstance = null;

function initConversationalSearch() {
    if (!IS_DOCS_AI_ENABLED || conversationalSearchInstance) return;

    const instance = new ConversationalSearch();
    if (instance.ready) conversationalSearchInstance = instance;

    const homeAiBtn = document.querySelector('.home-ai-btn');
    if (homeAiBtn) {
        homeAiBtn.addEventListener('click', () => {
            const searchInput = document.querySelector('.ais-SearchBox-input');
            const query = searchInput ? searchInput.value : '';
            askDocsAI(query, { source: 'home_hero' });
        });
    }
}

function teardownConversationalSearch() {
    const inst = conversationalSearchInstance;
    if (inst) {
        inst.floatButton?.remove();
        inst.overlay?.remove();
        inst.sidebar?.remove();
        conversationalSearchInstance = null;
    }
    document.querySelector('.home-ai-btn')?.remove();
    document.querySelector('.home-ai-divider')?.remove();
}

// The minimum length of the query to auto-submit the conversation.
// to avoid submitting short queries that are not meaningful.
const AUTO_SUBMIT_MIN_LENGTH = 10;

function askDocsAI(query, options = {}) {
    if (!IS_DOCS_AI_ENABLED || !conversationalSearchInstance) return;

    const trimmed = (query || '').trim();
    const inst = conversationalSearchInstance;
    inst.open(options.source || 'entry_button');

    const isNewConversation = inst.chatHistory.length === 0 && !inst.conversationId;
    if (!trimmed || !isNewConversation) return;

    inst.input.value = trimmed;

    if (trimmed.length >= AUTO_SUBMIT_MIN_LENGTH) {
        setTimeout(() => inst.sendMessage(), 100);
    }
}

window.askDocsAI = askDocsAI;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConversationalSearch);
} else {
    initConversationalSearch();
}

export { ConversationalSearch, askDocsAI, DOCS_AI_ENABLED_FLAG_KEY };
