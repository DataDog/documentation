import { logAction } from './logger';

const feedbackHideTimers = new WeakMap();

export const MAX_FEEDBACK_COMMENT_CHARS = 500;

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
            const opposite = action === 'thumbs-up' ? 'thumbs-down' : 'thumbs-up';
            const oppositeBtn = button.parentElement.querySelector(`[data-action="${opposite}"]`);
            if (button.classList.contains('active')) return;

            button.classList.add('active');
            if (oppositeBtn) oppositeBtn.classList.remove('active');
            showFeedbackTooltip(button, 'Thanks for your feedback!');

            logAction('Conversational Search Feedback', {
                conversational_search: {
                    action: 'feedback',
                    feedback: action === 'thumbs-up' ? 'positive' : 'negative',
                    response_content: response,
                    conversation_id: ctx.conversationId
                }
            }, ctx);

            // Only completed answers can be rated: the others have no feedback sender.
            if (!ctx.sendFeedback) break;
            const rating = action === 'thumbs-up' ? 'up' : 'down';
            ctx.sendFeedback({ rating });
            if (rating === 'down') showCommentForm(button.parentElement, ctx);
            else removeCommentForm(button.parentElement);
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

function removeCommentForm(actionsDiv) {
    const next = actionsDiv.nextElementSibling;
    if (next && next.classList.contains('conv-search-feedback-form')) next.remove();
}

// An optional note after a thumbs-down, sent once per answer.
function showCommentForm(actionsDiv, ctx) {
    const next = actionsDiv.nextElementSibling;
    if (actionsDiv.dataset.commented || (next && next.classList.contains('conv-search-feedback-form'))) return;

    const form = document.createElement('form');
    form.className = 'conv-search-feedback-form';

    const field = document.createElement('textarea');
    field.className = 'conv-search-feedback-comment';
    field.rows = 2;
    field.maxLength = MAX_FEEDBACK_COMMENT_CHARS;
    field.placeholder = 'What could be better? (optional)';
    field.setAttribute('aria-label', 'What could be better?');

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
    form.append(field, buttons);

    field.addEventListener('input', () => {
        send.disabled = !field.value.trim();
    });
    dismiss.addEventListener('click', () => form.remove());
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const comment = field.value.trim();
        if (!comment) return;
        ctx.sendFeedback({ comment });
        logAction('Conversational Search Feedback Comment', {
            conversational_search: {
                action: 'feedback_comment',
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
