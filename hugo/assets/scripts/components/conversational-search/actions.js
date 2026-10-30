import { logAction } from './logger';

const feedbackHideTimers = new WeakMap();

export const MAX_FEEDBACK_COMMENT_CHARS = 500;

// Reasons offered after a thumbs-down. The IDs are the API's reason values.
export const FEEDBACK_REASONS = [
    { id: 'incorrect', label: 'Incorrect' },
    { id: 'not_relevant', label: "Didn't answer my question" },
    { id: 'incomplete', label: 'Missing details' },
    { id: 'refused', label: 'Refused to answer' },
    { id: 'sources', label: 'Wrong or broken links' },
    { id: 'other', label: 'Other' }
];

export function addMessageActions(messageDiv, query, response, ctx) {
    const template = document.getElementById('conv-search-actions-template');
    if (!template) return;

    const actionsDiv = template.content.firstElementChild.cloneNode(true);

    actionsDiv.querySelectorAll('.conv-search-action-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            handleMessageAction(btn.dataset.action, query, response, btn, ctx);
        });
    });

    messageDiv.appendChild(actionsDiv);
}

export function injectCodeCopyButtons(container, ctx) {
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
            `<img class="copy-icon" src="${copySrc}" width="14" height="14" alt="" />`
            + `<img class="check-icon" src="${checkSrc}" width="14" height="14" alt="" style="display:none" />`;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const code = pre.querySelector('code');
            const text = code ? code.textContent : pre.textContent;
            navigator.clipboard.writeText(text).catch(() => {});

            logAction('Conversational Search Copy', {
                conversational_search: {
                    action: 'copy',
                    copy_type: 'snippet',
                    content_length: text?.length || 0,
                    conversation_id: ctx.conversationId
                }
            }, ctx);

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

function handleMessageAction(action, query, response, button, ctx) {
    switch (action) {
        case 'thumbs-up':
        case 'thumbs-down': {
            if (button.classList.contains('active') || button.disabled) return;
            // Only completed answers can be rated: the others have no feedback sender.
            if (ctx.sendFeedback) submitRating(button, action === 'thumbs-up', response, ctx);
            else markRating(button, action === 'thumbs-up', response, ctx);
            break;
        }

        case 'copy': {
            navigator.clipboard.writeText(response).catch(() => {
                showFeedbackTooltip(button, 'Copy failed', true);
            });

            logAction('Conversational Search Copy', {
                conversational_search: {
                    action: 'copy',
                    copy_type: 'full_response',
                    content_length: response?.length || 0,
                    conversation_id: ctx.conversationId
                }
            }, ctx);
            showFeedbackTooltip(button, 'Copied to clipboard!');

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
            break;
        }
    }
}

function markRating(button, positive, response, ctx) {
    const opposite = positive ? 'thumbs-down' : 'thumbs-up';
    button.parentElement.querySelector(`[data-action="${opposite}"]`)?.classList.remove('active');
    button.classList.add('active');
    showFeedbackTooltip(button, 'Thanks for your feedback!');

    logAction('Conversational Search Feedback', {
        conversational_search: {
            action: 'feedback',
            feedback: positive ? 'positive' : 'negative',
            response_content: response,
            conversation_id: ctx.conversationId
        }
    }, ctx);
}

// A rating counts only once the API has recorded it; until then both thumbs wait, and a failure leaves them as they were.
async function submitRating(button, positive, response, ctx) {
    const actionsDiv = button.parentElement;
    const thumbs = actionsDiv.querySelectorAll('[data-action="thumbs-up"], [data-action="thumbs-down"]');
    thumbs.forEach((thumb) => { thumb.disabled = true; });
    clearFeedbackTooltip(button);
    button.classList.add('is-pending');
    actionsDiv.setAttribute('aria-busy', 'true');

    let sent = false;
    try {
        await ctx.sendFeedback({ rating: positive ? 'up' : 'down' });
        sent = true;
    } catch (error) {
        showFeedbackTooltip(button, "Couldn't send feedback. Try again.", true);
    } finally {
        thumbs.forEach((thumb) => { thumb.disabled = false; });
        button.classList.remove('is-pending');
        actionsDiv.removeAttribute('aria-busy');
    }
    if (!sent) return;

    markRating(button, positive, response, ctx);
    if (positive) removeCommentForm(actionsDiv);
    else showCommentForm(actionsDiv, ctx);
}

function removeCommentForm(actionsDiv) {
    const next = actionsDiv.nextElementSibling;
    if (next && next.classList.contains('conv-search-feedback-form')) next.remove();
}

// Optional reasons and a note after a thumbs-down, sent once per answer.
function showCommentForm(actionsDiv, ctx) {
    const next = actionsDiv.nextElementSibling;
    if (actionsDiv.dataset.commented || (next && next.classList.contains('conv-search-feedback-form'))) return;

    const form = document.createElement('form');
    form.className = 'conv-search-feedback-form';

    const title = document.createElement('p');
    title.className = 'conv-search-feedback-form-title';
    title.id = `conv-search-feedback-title-${Math.random().toString(36).slice(2)}`;
    title.innerHTML = 'What went wrong? <span>(optional)</span>';

    const reasons = document.createElement('div');
    reasons.className = 'conv-search-feedback-reasons';
    reasons.setAttribute('role', 'group');
    reasons.setAttribute('aria-labelledby', title.id);
    const chips = FEEDBACK_REASONS.map(({ id, label }) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'conv-search-feedback-reason';
        chip.dataset.reason = id;
        chip.textContent = label;
        chip.setAttribute('aria-pressed', 'false');
        reasons.appendChild(chip);
        return chip;
    });
    const selectedReasons = () => chips.filter((chip) => chip.getAttribute('aria-pressed') === 'true')
        .map((chip) => chip.dataset.reason);

    const field = document.createElement('textarea');
    field.className = 'conv-search-feedback-comment';
    field.rows = 2;
    field.maxLength = MAX_FEEDBACK_COMMENT_CHARS;
    field.placeholder = 'Tell us more (optional)';
    field.setAttribute('aria-label', 'Tell us more');

    const buttons = document.createElement('div');
    buttons.className = 'conv-search-feedback-form-buttons';
    const dismiss = document.createElement('button');
    dismiss.type = 'button';
    dismiss.className = 'conv-search-feedback-dismiss';
    dismiss.textContent = 'Not now';
    const send = document.createElement('button');
    send.type = 'submit';
    send.className = 'conv-search-feedback-send';
    send.textContent = 'Send';
    send.disabled = true;
    buttons.append(dismiss, send);
    const error = document.createElement('p');
    error.className = 'conv-search-feedback-form-error';
    error.setAttribute('role', 'alert');
    error.hidden = true;
    form.append(title, reasons, field, error, buttons);

    const hasFeedback = () => selectedReasons().length > 0 || Boolean(field.value.trim());
    let sending = false;
    const setSending = (value) => {
        sending = value;
        [field, dismiss, ...chips].forEach((control) => { control.disabled = value; });
        send.disabled = value || !hasFeedback();
        send.textContent = value ? 'Sending\u2026' : 'Send';
    };

    chips.forEach((chip) => chip.addEventListener('click', () => {
        chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'));
        send.disabled = !hasFeedback();
    }));
    field.addEventListener('input', () => {
        send.disabled = !hasFeedback();
    });
    dismiss.addEventListener('click', () => form.remove());
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (sending || !hasFeedback()) return;
        const comment = field.value.trim();
        const picked = selectedReasons();
        error.hidden = true;
        setSending(true);
        try {
            await ctx.sendFeedback({ ...(picked.length && { reasons: picked }), ...(comment && { comment }) });
        } catch (err) {
            setSending(false);
            error.textContent = "Couldn't send your feedback. Try again.";
            error.hidden = false;
            form.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
            return;
        }
        logAction('Conversational Search Feedback Comment', {
            conversational_search: {
                action: 'feedback_comment',
                feedback_reasons: picked,
                comment_length: comment.length,
                conversation_id: ctx.conversationId
            }
        }, ctx);
        actionsDiv.dataset.commented = 'true';
        form.remove();
        const thumbsDown = actionsDiv.querySelector('[data-action="thumbs-down"]');
        if (thumbsDown) showFeedbackTooltip(thumbsDown, 'Thanks, this helps us improve!');
    });

    actionsDiv.after(form);
    form.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
}

function clearFeedbackTooltip(button) {
    const feedbackEl = button.parentElement?.querySelector('.conv-search-feedback-inline');
    if (!feedbackEl) return;
    clearTimeout(feedbackHideTimers.get(feedbackEl));
    feedbackHideTimers.delete(feedbackEl);
    feedbackEl.classList.remove('feedback-success', 'feedback-error');
    feedbackEl.textContent = '';
}

function showFeedbackTooltip(button, message, isError = false) {
    const feedbackEl = button.parentElement?.querySelector('.conv-search-feedback-inline');
    if (!feedbackEl) return;

    feedbackEl.classList.remove('feedback-success', 'feedback-error');
    void feedbackEl.offsetWidth;

    feedbackEl.textContent = message;
    feedbackEl.classList.add(isError ? 'feedback-error' : 'feedback-success');

    const existingHideTimer = feedbackHideTimers.get(feedbackEl);
    if (existingHideTimer) clearTimeout(existingHideTimer);

    const hideTimer = setTimeout(() => {
        feedbackEl.classList.remove('feedback-success', 'feedback-error');
        feedbackEl.textContent = '';
        feedbackHideTimers.delete(feedbackEl);
    }, 2000);
    feedbackHideTimers.set(feedbackEl, hideTimer);
}
