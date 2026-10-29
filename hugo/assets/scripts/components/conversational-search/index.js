import { getConfig } from '../../helpers/getConfig';
import { initializeFeatureFlags, getBooleanFlag, fetchDatadogUserStatus } from 'scripts/helpers/feature-flags';

import { logAction, logError } from './logger';
import { parseMarkdown, inlineRefChips, extractSources, renderMessageWithSources } from './markdown';
import { attachTooltips, buildSourceCards, showSourceTooltip, closeAllSourceTooltips, repositionTooltip } from './sources';
import { addMessageActions, injectCodeCopyButtons } from './actions';
import { sendDocsAiFeedback, streamDocsAiChat } from './docsai-client';
import { pickQuestions } from './suggested-questions';
import { ActivityTimeline } from './activity';

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

const VIEW_MODES = ['fullscreen', 'floating', 'sidebar'];
const DEFAULT_VIEW_MODE = 'fullscreen';
const VIEW_MODE_STORAGE_KEY = 'docs-ai-view-mode';

const RESIZABLE_MODES = {
    sidebar: {
        width: {
            cssVar: '--docs-ai-sidebar-width',
            storageKey: 'docs-ai-sidebar-width',
            default: 440,
            min: 280,
            maxPx: 800,
            maxViewportPct: 0.6,
            viewportOffset: 0,
        },
    },
    floating: {
        width: {
            cssVar: '--docs-ai-floating-width',
            storageKey: 'docs-ai-floating-width',
            default: 500,
            min: 360,
            maxPx: 920,
            maxViewportPct: 0.9,
            viewportOffset: 24,
        },
        height: {
            cssVar: '--docs-ai-floating-height',
            storageKey: 'docs-ai-floating-height',
            default: 570,
            min: 400,
            maxPx: 900,
            maxViewportPct: 0.85,
            viewportOffset: 24,
        },
    },
};

const HANDLE_AXES = {
    left: ['width'],
    top: ['height'],
    corner: ['width', 'height'],
};

const HANDLE_CURSORS = {
    left: 'col-resize',
    top: 'row-resize',
    corner: 'nwse-resize',
};

function readStoredViewMode() {
    try {
        const stored = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
        return VIEW_MODES.includes(stored) ? stored : DEFAULT_VIEW_MODE;
    } catch (_) {
        return DEFAULT_VIEW_MODE;
    }
}

function persistViewMode(mode) {
    try { localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode); } catch (_) { /* ignore */ }
}

function readStoredSize(mode, dim) {
    const cfg = RESIZABLE_MODES[mode]?.[dim];
    if (!cfg) return null;
    try {
        const raw = parseInt(localStorage.getItem(cfg.storageKey), 10);
        return Number.isFinite(raw) ? raw : cfg.default;
    } catch (_) {
        return cfg.default;
    }
}

function persistSize(mode, dim, px) {
    const cfg = RESIZABLE_MODES[mode]?.[dim];
    if (!cfg) return;
    try { localStorage.setItem(cfg.storageKey, String(px)); } catch (_) { /* ignore */ }
}

function clampSize(mode, dim, px) {
    const cfg = RESIZABLE_MODES[mode]?.[dim];
    if (!cfg) return px;
    const viewport = dim === 'width' ? window.innerWidth : window.innerHeight;
    const max = Math.min(cfg.maxPx, viewport * cfg.maxViewportPct);
    return Math.max(cfg.min, Math.min(px, max));
}

function forEachResizable(callback) {
    Object.entries(RESIZABLE_MODES).forEach(([mode, dims]) => {
        Object.keys(dims).forEach((dim) => callback(mode, dim));
    });
}

const DEFAULT_ERROR_MESSAGE = 'Something went wrong while answering. Try again in a moment.';
const EMPTY_RESPONSE_MESSAGE = 'No response received. Try again.';
// Retrying the same request can't help, so this copy must not invite a retry.
const NON_RETRYABLE_MESSAGE = "Docs AI can't answer this request. Start a new question instead.";
const REJECTED_REQUEST_MESSAGE = "Docs AI couldn't process this question. Try shortening or rephrasing it.";
const RETRY_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.5 15a9 9 0 1 0 2.1-9.4L1 10"></path></svg>';

// Places the streaming caret at the end of the last block of the partially rendered answer.
function appendStreamCaret(container) {
    const blocks = container.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, td, pre code');
    const target = blocks[blocks.length - 1] || container;
    const caret = document.createElement('span');
    caret.className = 'conv-search-stream-caret';
    caret.setAttribute('aria-hidden', 'true');
    target.appendChild(caret);
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
        this.userStoppedRequest = false;
        this.turnSeq = 0;
        this.hasLoggedFirstOpen = false;
        this.isSuggestionQuery = false;

        // Rewrites the initial user query for better retrieval before answering.
        // Only applied on the first message (no history). Follow-ups use history context instead.
        this.shouldRewriteQuery = true;

        this.isHomepage = document.querySelector('.kind-home') !== null;
        this.homeAiBtnVisible = false;
        this.ready = false;

        this.viewMode = readStoredViewMode();
        this.isModeMenuOpen = false;
        this.panelSizes = Object.fromEntries(
            Object.keys(RESIZABLE_MODES).map((mode) => [mode, {}])
        );
        forEachResizable((mode, dim) => {
            this.panelSizes[mode][dim] = clampSize(mode, dim, readStoredSize(mode, dim));
        });

        if (!this.createElements()) return;
        this.bindEvents();
        forEachResizable((mode, dim) => this.applyPanelSize(mode, dim, this.panelSizes[mode][dim]));
        this.applyViewMode(this.viewMode);
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
        this.modeToggleBtn = this.sidebar.querySelector('.conv-search-mode-toggle');
        this.modeMenu = this.sidebar.querySelector('.conv-search-mode-menu');
        this.modeOptions = Array.from(this.sidebar.querySelectorAll('.conv-search-mode-option'));
        this.resizeHandles = Array.from(this.sidebar.querySelectorAll('.conv-search-resize-handle'));
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
        this.sendBtn.addEventListener('click', () => {
            if (this.isLoading) this.stopGeneration();
            else this.sendMessage();
        });

        this.input.addEventListener('keydown', (e) => {
            // Safari can end composition before dispatching the IME-confirming Enter keydown.
            const isImeComposition = e.isComposing || e.keyCode === 229;
            if (e.key === 'Enter' && !e.shiftKey && !isImeComposition) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.input.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
        });

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            if (this.isModeMenuOpen) {
                this.closeModeMenu();
                return;
            }
            if (this.isOpen) this.close();
        });

        this.bindModeSwitcher();
        this.bindPanelResize();
        this.bindHomepageObserver();
        this.bindTooltipEvents();
        this.bindClickDelegation();
        this.bindScrollFade();

        window.addEventListener('resize', () => {
            if (this.isOpen && this.viewMode === 'sidebar') this.applySidebarTopOffset();
        });
    }

    bindModeSwitcher() {
        if (!this.modeToggleBtn || !this.modeMenu) return;

        this.modeToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.isModeMenuOpen) this.closeModeMenu();
            else this.openModeMenu();
        });

        this.modeOptions.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const mode = btn.dataset.mode;
                if (mode) this.setViewMode(mode);
                this.closeModeMenu();
            });
        });

        document.addEventListener('click', (e) => {
            if (!this.isModeMenuOpen) return;
            if (this.modeMenu.contains(e.target) || this.modeToggleBtn.contains(e.target)) return;
            this.closeModeMenu();
        });
    }

    applyPanelSize(mode, dim, px) {
        const cfg = RESIZABLE_MODES[mode]?.[dim];
        if (!cfg) return;
        const clamped = clampSize(mode, dim, px);
        this.panelSizes[mode][dim] = clamped;
        document.documentElement.style.setProperty(cfg.cssVar, `${clamped}px`);
    }

    bindPanelResize() {
        if (!this.resizeHandles?.length) return;

        this.resizeHandles.forEach((handle) => {
            const axes = HANDLE_AXES[handle.dataset.resize];
            if (!axes) return;
            this.bindResizeHandle(handle, axes);
        });

        window.addEventListener('resize', () => {
            forEachResizable((mode, dim) => {
                const current = this.panelSizes[mode][dim];
                const clamped = clampSize(mode, dim, current);
                if (clamped !== current) this.applyPanelSize(mode, dim, clamped);
            });
        });
    }

    bindResizeHandle(handle, axes) {
        const axisKey = handle.dataset.resize;
        let pointerId = null;
        let activeMode = null;

        const onPointerMove = (e) => {
            if (!activeMode) return;
            axes.forEach((dim) => {
                const cfg = RESIZABLE_MODES[activeMode][dim];
                if (!cfg) return;
                const value = dim === 'width'
                    ? window.innerWidth - cfg.viewportOffset - e.clientX
                    : window.innerHeight - cfg.viewportOffset - e.clientY;
                this.applyPanelSize(activeMode, dim, value);
            });
        };

        const stop = () => {
            const finishedMode = activeMode;
            if (pointerId !== null) {
                try { handle.releasePointerCapture(pointerId); } catch (_) { /* ignore */ }
                pointerId = null;
            }
            handle.removeEventListener('pointermove', onPointerMove);
            handle.removeEventListener('pointerup', stop);
            handle.removeEventListener('pointercancel', stop);
            document.body.classList.remove('docs-ai-panel-resizing');
            axes.forEach((dim) => document.body.classList.remove(`docs-ai-panel-resizing-${dim}`));
            document.body.style.cursor = '';
            if (finishedMode) {
                axes.forEach((dim) => {
                    persistSize(finishedMode, dim, this.panelSizes[finishedMode][dim]);
                });
                this.logInteraction('panel_resized', {
                    mode: finishedMode,
                    axes,
                    width_px: this.panelSizes[finishedMode].width,
                    height_px: this.panelSizes[finishedMode].height,
                });
            }
            activeMode = null;
        };

        handle.addEventListener('pointerdown', (e) => {
            const modeCfg = RESIZABLE_MODES[this.viewMode];
            if (!modeCfg || e.button !== 0) return;
            if (!axes.every((dim) => modeCfg[dim])) return;
            e.preventDefault();
            activeMode = this.viewMode;
            pointerId = e.pointerId;
            try { handle.setPointerCapture(pointerId); } catch (_) { /* ignore */ }
            document.body.classList.add('docs-ai-panel-resizing');
            axes.forEach((dim) => document.body.classList.add(`docs-ai-panel-resizing-${dim}`));
            document.body.style.cursor = HANDLE_CURSORS[axisKey] || 'col-resize';

            handle.addEventListener('pointermove', onPointerMove);
            handle.addEventListener('pointerup', stop);
            handle.addEventListener('pointercancel', stop);
        });
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

    // --- View mode ---------------------------------------------------------------

    applyViewMode(mode) {
        if (!VIEW_MODES.includes(mode)) mode = DEFAULT_VIEW_MODE;
        this.viewMode = mode;

        VIEW_MODES.forEach((m) => this.sidebar.classList.toggle(`mode-${m}`, m === mode));

        this.modeOptions.forEach((btn) => {
            const isActive = btn.dataset.mode === mode;
            btn.setAttribute('aria-checked', String(isActive));
        });

        const isFullscreen = mode === 'fullscreen';
        if (this.isOpen) {
            this.overlay.classList.toggle('open', isFullscreen);
            document.body.style.overflow = isFullscreen ? 'hidden' : '';
        }

        this.updateBodyPush();
    }

    updateBodyPush() {
        const shouldPush = this.isOpen && this.viewMode === 'sidebar';
        document.body.classList.toggle('docs-ai-sidebar-pushed', shouldPush);
        if (shouldPush) this.applySidebarTopOffset();
    }

    // Dock the sidebar just below the announcement banner.
    applySidebarTopOffset() {
        const banner = document.querySelector('.announcement-banner');
        const bannerRect = banner?.getBoundingClientRect();
        const topOffset = bannerRect && bannerRect.height > 0 && bannerRect.top <= 1
            ? Math.max(0, Math.round(bannerRect.bottom))
            : 0;
        document.documentElement.style.setProperty('--docs-ai-sidebar-top-offset', `${topOffset}px`);
    }

    setViewMode(mode) {
        if (!VIEW_MODES.includes(mode) || mode === this.viewMode) return;
        this.logInteraction('view_mode_changed', { view_mode: mode });
        this.applyViewMode(mode);
        persistViewMode(mode);
    }

    openModeMenu() {
        if (!this.modeMenu) return;
        this.isModeMenuOpen = true;
        this.modeMenu.classList.add('open');
        this.modeMenu.setAttribute('aria-hidden', 'false');
        this.modeToggleBtn.setAttribute('aria-expanded', 'true');
    }

    closeModeMenu() {
        if (!this.modeMenu) return;
        this.isModeMenuOpen = false;
        this.modeMenu.classList.remove('open');
        this.modeMenu.setAttribute('aria-hidden', 'true');
        this.modeToggleBtn.setAttribute('aria-expanded', 'false');
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
        this.floatButton.classList.add('hidden');

        const isFullscreen = this.viewMode === 'fullscreen';
        if (isFullscreen) {
            this.overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        this.updateBodyPush();
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
        this.closeModeMenu();
        this.updateBodyPush();

        if (!this.isHomepage || !this.homeAiBtnVisible) {
            this.floatButton.classList.remove('hidden');
        }
    }

    newChat() {
        this.logInteraction('new_chat');

        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }

        this.conversationId = null;
        this.chatHistory = [];
        this.isSuggestionQuery = false;
        this.turnSeq += 1;
        this.setBusy(false);

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

    /**
     * Appends an assistant turn: the live activity timeline followed by the answer body,
     * which stays hidden until the first answer token arrives.
     */
    addAssistantTurn() {
        const emptyState = this.messagesContainer.querySelector('.conv-search-empty-state');
        if (emptyState) emptyState.remove();

        const messageDiv = document.createElement('div');
        messageDiv.className = 'conv-search-message conv-search-message-assistant conv-search-turn';

        const activity = new ActivityTimeline({
            onToggle: (expanded) => this.logInteraction('activity_toggled', { expanded })
        });

        const contentDiv = document.createElement('div');
        contentDiv.className = 'conv-search-message-content';
        contentDiv.hidden = true;

        messageDiv.append(activity.root, contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom(true);

        return { messageDiv, contentDiv, activity };
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

    logResponse({ answer, startTime, activitySummary = {} }) {
        this.log('Conversational Search Response', {
            conversational_search: {
                action: 'response_received',
                response_length: answer.length,
                ...(this.conversationId && { conversation_id: this.conversationId }),
                latency_ms: Date.now() - startTime,
                ...activitySummary
            }
        });
    }

    // --- Send / dispatch ---------------------------------------------------------

    async sendMessage() {
        const query = this.input.value.trim();
        if (!query || this.isLoading) return;

        this.input.value = '';
        this.input.style.height = 'auto';
        this.addMessage('user', query);
        await this.runTurn(query);
    }

    async runTurn(query) {
        const turnId = ++this.turnSeq;
        this.userStoppedRequest = false;
        this.setBusy(true);

        try {
            await this.runInternalStream(query);
        } catch (error) {
            this.logErr('Conversational Search Response Error', error);
        } finally {
            // A newer turn (or a reset) owns the composer state from here on.
            if (this.turnSeq === turnId) {
                this.setBusy(false);
                this.abortController = null;
                this.userStoppedRequest = false;
                this.isSuggestionQuery = false;
                this.input.focus();
            }
        }
    }

    // While a turn is running, the send button becomes a stop button.
    setBusy(busy) {
        this.isLoading = busy;
        this.sendBtn.disabled = false;
        this.sendBtn.classList.toggle('is-stop', busy);
        const label = busy ? 'Stop generating' : 'Send';
        this.sendBtn.setAttribute('aria-label', label);
        this.sendBtn.title = busy ? label : '';
    }

    stopGeneration() {
        if (!this.isLoading || !this.abortController) return;
        this.userStoppedRequest = true;
        this.abortController.abort();
    }

    // --- Docs AI streaming -------------------------------------------------------

    async runInternalStream(query) {
        this.abortController = new AbortController();
        const startTime = Date.now();

        const isFirstMessage = this.chatHistory.length === 0;
        const isSuggestion = this.isSuggestionQuery;
        if (!this.conversationId) {
            this.conversationId = this.generateInternalConversationId();
        }
        const history = isFirstMessage ? [] : [...this.chatHistory];
        this.chatHistory.push({ role: 'user', content: query });

        const turn = this.addAssistantTurn();
        const { contentDiv, activity } = turn;

        let partial = '';
        let serverError = null;
        let feedbackToken = null;
        let lastRenderTime = 0;

        let answer;
        try {
            answer = await streamDocsAiChat({
                config: docsAiConfig,
                query,
                history,
                conversationId: this.conversationId,
                anchorUrl: window.location.href,
                rewriteQuery: isFirstMessage && this.shouldRewriteQuery && !isSuggestion,
                signal: this.abortController.signal,
                onThinking: (content, event = {}) => {
                    activity.dispatch({
                        type: 'thinking',
                        content,
                        retrieved_pages: event.retrieved_pages,
                        query: event.query,
                        page: event.page
                    });
                    this.scrollToBottom();
                },
                onServerError: (event) => {
                    serverError = event;
                },
                onFeedbackToken: (token) => {
                    feedbackToken = token;
                },
                onToken: (_token, fullMessage) => {
                    partial = fullMessage;
                    if (contentDiv.hidden) {
                        activity.dispatch({ type: 'answer' });
                        contentDiv.hidden = false;
                    }

                    const now = Date.now();
                    if (now - lastRenderTime > RENDER_THROTTLE) {
                        const { displayMarkdown, sources } = extractSources(fullMessage);
                        contentDiv.innerHTML = inlineRefChips(parseMarkdown(displayMarkdown));
                        appendStreamCaret(contentDiv);
                        if (sources.length > 0) {
                            contentDiv.appendChild(buildSourceCards(sources));
                        }
                        lastRenderTime = now;
                        this.scrollToBottom();
                    }
                },
                onError: (error) => {
                    this.logErr('Docs AI Streaming Error', error);
                }
            });
        } catch (error) {
            if (error.name === 'AbortError') {
                if (this.userStoppedRequest) this.handleStoppedTurn(turn, query, partial, startTime);
                else activity.dispatch({ type: 'stopped' });
                return;
            }
            this.logErr('Conversational Search Response Error', error);
            // A rejected request (for example, a question that is too long) fails the same way on retry.
            const rejected = error.status >= 400 && error.status < 500 && ![408, 429].includes(error.status);
            this.failTurn(turn, query, rejected ? { message: REJECTED_REQUEST_MESSAGE, retryable: false } : {});
            return;
        }

        if (serverError) {
            this.logErr('Docs AI Server Error', new Error(serverError.code || 'server_error'));
            const retryable = serverError.retryable !== false;
            this.failTurn(turn, query, {
                // The server's copy invites a retry, so it is only shown when a retry can help.
                message: retryable ? serverError.content : undefined,
                retryable,
                discardPartial: serverError.discard_partial !== false
            });
            return;
        }

        if (!answer || !answer.trim()) {
            this.failTurn(turn, query, { message: EMPTY_RESPONSE_MESSAGE, retryable: true });
            return;
        }

        activity.dispatch({ type: 'done' });
        contentDiv.hidden = false;
        this.chatHistory.push({ role: 'assistant', content: answer });
        this.finalizeResponse(contentDiv, query, answer, startTime, activity.summary(), { feedbackToken });
    }

    handleStoppedTurn(turn, query, partial, startTime) {
        const { contentDiv, activity } = turn;
        activity.dispatch({ type: 'stopped' });
        contentDiv.querySelector('.conv-search-stream-caret')?.remove();
        this.logInteraction('response_stopped', { partial_length: partial.length, ...activity.summary() });

        if (partial.trim()) {
            this.chatHistory.push({ role: 'assistant', content: partial });
            this.finalizeResponse(contentDiv, query, partial, startTime, activity.summary(), { log: false });
        } else {
            contentDiv.remove();
            this.dropUnansweredQuery(query);
        }
    }

    failTurn(turn, query, { message, retryable = true, discardPartial = true } = {}) {
        const { messageDiv, contentDiv, activity } = turn;
        activity.dispatch({ type: 'error' });
        contentDiv.querySelector('.conv-search-stream-caret')?.remove();
        if (discardPartial) {
            contentDiv.hidden = true;
            contentDiv.innerHTML = '';
        }
        this.dropUnansweredQuery(query);

        const box = document.createElement('div');
        box.className = 'conv-search-turn-error';
        box.setAttribute('role', 'alert');

        const text = document.createElement('p');
        const fallback = retryable ? DEFAULT_ERROR_MESSAGE : NON_RETRYABLE_MESSAGE;
        text.textContent = typeof message === 'string' && message.trim() ? message : fallback;
        box.appendChild(text);

        if (retryable) {
            const retry = document.createElement('button');
            retry.type = 'button';
            retry.className = 'conv-search-retry';
            retry.innerHTML = `${RETRY_ICON}<span>Try again</span>`;
            retry.addEventListener('click', () => {
                if (this.isLoading) return;
                this.logInteraction('retry_clicked');
                messageDiv.remove();
                this.runTurn(query);
            });
            box.appendChild(retry);
        }

        messageDiv.appendChild(box);
        this.scrollToBottom();
    }

    // Feedback is best-effort: a failed request is logged but never shown to the reader.
    feedbackSender(token) {
        const conversationId = this.conversationId;
        return (feedback) => sendDocsAiFeedback({ config: docsAiConfig, token, conversationId, ...feedback })
            .catch((error) => this.logErr('Docs AI Feedback Error', error));
    }

    // An unanswered question is not sent back as history, so a retry or follow-up starts clean.
    dropUnansweredQuery(query) {
        const last = this.chatHistory[this.chatHistory.length - 1];
        if (last && last.role === 'user' && last.content === query) this.chatHistory.pop();
    }

    // --- Shared finalization -----------------------------------------------------

    finalizeResponse(container, query, answer, startTime, activitySummary = {}, { log = true, feedbackToken = null } = {}) {
        container.innerHTML = renderMessageWithSources(answer, {
            attachTooltips,
            buildSourceCards
        });
        injectCodeCopyButtons(container, this.ctx);
        addMessageActions(container.parentElement, query, answer, {
            ...this.ctx,
            sendFeedback: feedbackToken ? this.feedbackSender(feedbackToken) : null
        });
        this.scrollToBottom();
        if (log) this.logResponse({ query, answer, startTime, activitySummary });
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
