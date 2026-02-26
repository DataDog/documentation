import { getConfig } from '../../helpers/getConfig';
import { initializeFeatureFlags, getBooleanFlag, isDatadogEmployee, fetchDatadogUserStatus } from 'scripts/helpers/feature-flags';

import { logAction, logError } from './logger';
import { parseMarkdown, inlineRefChips, extractSources, renderMessageWithSources } from './markdown';
import { attachTooltips, buildSourceCards, showSourceTooltip, closeAllSourceTooltips, repositionTooltip } from './sources';
import { addMessageActions, injectCodeCopyButtons } from './actions';
import { streamConversation } from './streaming';

const { env } = document.documentElement.dataset;
const docsConfig = getConfig(env);
const typesenseConfig = docsConfig.typesense;

let IS_CONVERSATIONAL_SEARCH_ENABLED = false;
const CONVERSATIONAL_SEARCH_FLAG_KEY = 'docs_conversational_search';

const CONV_MODEL_DOCS_PREVIEW = 'docs-ai-conv-model-v1-preview';
const CONV_MODEL_DOCS_STABLE = 'docs-ai-conv-model-v1-stable';
const DEFAULT_CONVERSATION_MODEL_ID = CONV_MODEL_DOCS_STABLE;
const USE_LEGACY_MODEL_FLAG_KEY = 'DOCS_AI_USE_LEGACY_MODEL';

const RENDER_THROTTLE = 50;

let isDatadogUser = false;

initializeFeatureFlags().then(async (client) => {
    IS_CONVERSATIONAL_SEARCH_ENABLED = getBooleanFlag(client, CONVERSATIONAL_SEARCH_FLAG_KEY);

    if (!IS_CONVERSATIONAL_SEARCH_ENABLED && isDatadogEmployee()) {
        IS_CONVERSATIONAL_SEARCH_ENABLED = true;
    }

    // /locate tells us if the visitor is a logged-in Datadog app user.
    // Not used for feature gating — included in every Docs AI log event.
    isDatadogUser = await fetchDatadogUserStatus();

    if (IS_CONVERSATIONAL_SEARCH_ENABLED) {
        document.body.classList.add('conv-search-enabled');
        initConversationalSearch();
    }
});

class ConversationalSearch {
    constructor() {
        this.conversationId = null;
        this.isOpen = false;
        this.isLoading = false;
        this.abortController = null;
        this.userCancelledRequest = false;
        this.hasLoggedFirstOpen = false;
        this.selectedModelId = DEFAULT_CONVERSATION_MODEL_ID;
        this.isHomepage = document.querySelector('.kind-home') !== null;
        this.homeAiBtnVisible = false;

        this.createElements();
        this.bindEvents();
        this.resolveModelFromFlag();
    }

    get ctx() {
        return { selectedModelId: this.selectedModelId, conversationId: this.conversationId, isDatadogUser };
    }

    log(message, data) { logAction(message, data, this.ctx); }
    logErr(message, error) { logError(message, error, this.ctx); }

    resolveModelFromFlag() {
        initializeFeatureFlags().then((client) => {
            if (getBooleanFlag(client, USE_LEGACY_MODEL_FLAG_KEY)) {
                this.selectedModelId = CONV_MODEL_DOCS_PREVIEW;
            }
        }).catch(() => {});
    }

    createElements() {
        const template = document.getElementById('conv-search-template');
        if (!template) {
            console.error('[Conversational Search] Template #conv-search-template not found in DOM');
            return;
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
    }

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
            // Ref chip → navigate
            const sourceRefBtn = e.target.closest('.conv-search-source-ref-btn');
            if (sourceRefBtn && this.messagesContainer.contains(sourceRefBtn)) {
                e.preventDefault();
                e.stopPropagation();

                const sourceNumber = sourceRefBtn.dataset.sourceNumber;
                const tooltipLink = sourceRefBtn.parentNode?.querySelector('.conv-search-source-tooltip a');

                this.log('Conversational Search Source Ref Click', {
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

            const sourceCard = e.target.closest('.conv-search-source-card');
            if (sourceCard && this.messagesContainer.contains(sourceCard)) {
                const cardLink = sourceCard.querySelector('a');
                const badge = sourceCard.querySelector('.conv-search-source-card-number');
                this.log('Conversational Search Source Card Click', {
                    conversational_search: {
                        action: 'source_card_click',
                        source_number: badge ? parseInt(badge.textContent, 10) : null,
                        source_url: cardLink?.href || null,
                        source_title: cardLink?.textContent || null,
                        conversation_id: this.conversationId
                    }
                });
            }

            const suggestionBtn = e.target.closest('.conv-search-suggestion');
            if (suggestionBtn) {
                const query = suggestionBtn.dataset.query;
                if (query) {
                    this.log('Conversational Search Suggestion Click', {
                        conversational_search: {
                            action: 'suggestion_clicked',
                            suggestion_query: query,
                            conversation_id: this.conversationId
                        }
                    });
                    this.input.value = query;
                    this.sendMessage();
                }
            }

            const link = e.target.closest('a');
            if (link && this.messagesContainer.contains(link)) {
                this.log('Conversational Search Link Click', {
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
        this.isOpen = false;
        this.sidebar.classList.remove('open');
        this.overlay.classList.remove('open');
        document.body.style.overflow = '';

        if (!this.isHomepage || !this.homeAiBtnVisible) {
            this.floatButton.classList.remove('hidden');
        }
    }

    newChat() {
        this.log('Conversational Search New Chat', {
            conversational_search: { action: 'new_chat', conversation_id: this.conversationId }
        });

        if (this.abortController) {
            this.userCancelledRequest = true;
            this.abortController.abort();
            this.abortController = null;
        }

        this.conversationId = null;
        this.isLoading = false;
        this.sendBtn.disabled = false;

        this.messagesContainer.innerHTML = '';
        this.injectEmptyState(this.messagesContainer);

        this.input.value = '';
        this.input.style.height = 'auto';
        this.input.focus();
    }

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

    addStreamingMessage() {
        const welcome = this.messagesContainer.querySelector('.conv-search-welcome');
        if (welcome) welcome.remove();

        const messageDiv = document.createElement('div');
        messageDiv.className = 'conv-search-message conv-search-message-assistant';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'conv-search-message-content';
        contentDiv.innerHTML = '<span class="conv-search-cursor"></span>';

        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom(true);

        return contentDiv;
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

    async sendMessage() {
        const query = this.input.value.trim();
        if (!query || this.isLoading) return;

        this.isLoading = true;
        this.userCancelledRequest = false;
        this.input.value = '';
        this.input.style.height = 'auto';
        this.sendBtn.disabled = true;

        this.addMessage('user', query);
        const responseContainer = this.addStreamingMessage();

        try {
            await this.runStreamConversation(query, responseContainer);
        } catch (error) {
            if (error.name === 'AbortError' && this.userCancelledRequest) {
                responseContainer.textContent = 'Request cancelled.';
            } else {
                this.logErr('Conversational Search Response Error', error);
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

    async runStreamConversation(query, responseContainer) {
        this.abortController = new AbortController();
        const startTime = Date.now();

        let accumulatedMessage = '';
        let lastRenderTime = 0;
        responseContainer.innerHTML = '';

        const response = await streamConversation({
            typesenseConfig,
            query,
            modelId: this.selectedModelId,
            conversationId: this.conversationId,
            signal: this.abortController.signal,
            onChunk: (chunk) => {
                if (chunk?.conversation_id && !this.conversationId) {
                    this.conversationId = chunk.conversation_id;
                }

                if (chunk?.message !== undefined) {
                    accumulatedMessage += chunk.message;

                    const now = Date.now();
                    if (now - lastRenderTime > RENDER_THROTTLE) {
                        const { displayMarkdown, sources } = extractSources(accumulatedMessage);
                        responseContainer.innerHTML = inlineRefChips(parseMarkdown(displayMarkdown));
                        if (sources.length > 0) {
                            responseContainer.appendChild(buildSourceCards(sources));
                        }
                        lastRenderTime = now;
                        this.scrollToBottom();
                    }
                }
            },
            onError: (error) => {
                this.logErr('Conversational Search Streaming Error', error);
            }
        });

        const finalConversationId = response?.results?.[0]?.conversation?.conversation_id;
        if (finalConversationId) {
            this.conversationId = finalConversationId;
        }

        if (accumulatedMessage) {
            responseContainer.innerHTML = renderMessageWithSources(accumulatedMessage, {
                attachTooltips,
                buildSourceCards
            });
            injectCodeCopyButtons(responseContainer, this.ctx);
            addMessageActions(responseContainer.parentElement, query, accumulatedMessage, this.ctx);
            this.scrollToBottom();

            this.log('Conversational Search Response', {
                conversational_search: {
                    action: 'response_received',
                    response_length: accumulatedMessage.length,
                    conversation_id: this.conversationId,
                    latency_ms: Date.now() - startTime
                }
            });
        } else {
            responseContainer.textContent = 'No response received. Please try again.';
        }
    }
}

let conversationalSearchInstance = null;

function initConversationalSearch() {
    if (!IS_CONVERSATIONAL_SEARCH_ENABLED || conversationalSearchInstance) return;
    conversationalSearchInstance = new ConversationalSearch();
}

function askDocsAI(query, options = {}) {
    if (IS_CONVERSATIONAL_SEARCH_ENABLED && conversationalSearchInstance) {
        conversationalSearchInstance.open(options.source || 'entry_button');
        if (query && query.trim()) {
            conversationalSearchInstance.input.value = query;
            setTimeout(() => conversationalSearchInstance.sendMessage(), 100);
        }
    }
}

window.askDocsAI = askDocsAI;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConversationalSearch);
} else {
    initConversationalSearch();
}

export { ConversationalSearch, askDocsAI, CONVERSATIONAL_SEARCH_FLAG_KEY };
