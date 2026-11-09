import { addMessageActions, FEEDBACK_REASONS } from '../components/conversational-search/actions';
import { FEEDBACK_TIMEOUT_MS, sendDocsAiFeedback, streamDocsAiChat } from '../components/conversational-search/docsai-client';
import { logAction } from '../components/conversational-search/logger';

jest.mock('../components/conversational-search/logger', () => ({ logAction: jest.fn() }));

const config = { apiUrl: 'https://example.test', apiKey: 'key' };

describe('Docs AI feedback requests', () => {
    beforeAll(() => {
        // eslint-disable-next-line global-require
        global.TextDecoder = global.TextDecoder || require('util').TextDecoder;
    });

    afterEach(() => {
        delete global.fetch;
    });

    it('hands over the feedback token sent after the answer', async () => {
        const encoder = { encode: (text) => Buffer.from(text, 'utf8') };
        const chunks = [
            'data: {"type": "markdown_fragment", "content": "Hello"}\n\n',
            'data: {"type": "feedback_token", "token": "answer.1.sig"}\n\ndata: [DONE]\n\n'
        ];
        let index = 0;
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            body: {
                getReader: () => ({
                    read: async () => (index < chunks.length
                        ? { done: false, value: encoder.encode(chunks[index++]) }
                        : { done: true })
                })
            }
        });
        const onFeedbackToken = jest.fn();

        const answer = await streamDocsAiChat({ config, query: 'q', onFeedbackToken });

        expect(answer).toBe('Hello');
        expect(onFeedbackToken).toHaveBeenCalledWith('answer.1.sig');
    });

    it('posts only structured feedback, omitting any supplied comment', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 202 });

        await sendDocsAiFeedback({
            config, token: 't', conversationId: 'c1', rating: 'down', reasons: ['incorrect'],
            comment: 'PRIVATE_FEEDBACK_MARKER'
        });

        const [url, init] = global.fetch.mock.calls[0];
        expect(url).toBe('https://example.test/feedback');
        expect(init.keepalive).toBe(true);
        expect(init.headers['X-Docs-Ai-Api-Key']).toBe('key');
        expect(JSON.parse(init.body)).toEqual({
            data: {
                attributes: {
                    feedback_token: 't', rating: 'down', reasons: ['incorrect'], conversation_id: 'c1'
                }
            }
        });
        expect(init.body).not.toContain('PRIVATE_FEEDBACK_MARKER');
    });

    it('rejects with the HTTP status when feedback is refused', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 503 });

        await expect(sendDocsAiFeedback({ config, token: 't', rating: 'up' })).rejects.toMatchObject({ status: 503 });
    });

    it('gives up on a request that never answers', async () => {
        jest.useFakeTimers();
        global.fetch = jest.fn((url, init) => new Promise((resolve, reject) => {
            init.signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })));
        }));

        const request = sendDocsAiFeedback({ config, token: 't', rating: 'up' });
        jest.advanceTimersByTime(FEEDBACK_TIMEOUT_MS);

        await expect(request).rejects.toMatchObject({ name: 'AbortError' });
        jest.useRealTimers();
    });
});

describe('thumbs and predefined reasons', () => {
    beforeEach(() => {
        logAction.mockClear();
        document.body.innerHTML = `
            <template id="conv-search-actions-template">
                <div class="conv-search-message-actions">
                    <button class="conv-search-action-btn" data-action="thumbs-up"></button>
                    <button class="conv-search-action-btn" data-action="thumbs-down"></button>
                    <button class="conv-search-action-btn" data-action="copy"></button>
                    <span class="conv-search-feedback-inline"></span>
                </div>
            </template>
            <div class="message"></div>`;
    });

    const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

    // Each call returns a request the test answers explicitly.
    function controlledSender() {
        const requests = [];
        const sendFeedback = jest.fn(() => new Promise((resolve, reject) => {
            requests.push({ resolve, reject });
        }));
        const answer = async (ok = true) => {
            const request = requests.shift();
            if (ok) request.resolve();
            else request.reject(new Error('Docs AI feedback failed: 503'));
            await settle();
        };
        return { sendFeedback, answer };
    }

    function renderActions(sendFeedback) {
        const message = document.querySelector('.message');
        addMessageActions(message, 'question', 'answer', { conversationId: 'c1', sendFeedback });
        const thumb = (action) => message.querySelector(`[data-action="${action}"]`);
        const click = (action) => thumb(action).click();
        const form = () => message.querySelector('.conv-search-feedback-form');
        const notice = () => message.querySelector('.conv-search-feedback-inline');
        return { thumb, click, form, notice };
    }

    const pick = (form, id) => form.querySelector(`[data-reason="${id}"]`).click();
    const submit = (form) => form.dispatchEvent(new Event('submit', { cancelable: true }));

    it('marks a thumbs-down only after acceptance, then offers predefined reasons', async () => {
        const { sendFeedback, answer } = controlledSender();
        const { thumb, click, form, notice } = renderActions(sendFeedback);

        click('thumbs-down');
        expect(sendFeedback).toHaveBeenLastCalledWith({ rating: 'down' });
        expect(thumb('thumbs-down').classList.contains('active')).toBe(false);
        expect(thumb('thumbs-down').classList.contains('is-pending')).toBe(true);
        expect(thumb('thumbs-up').disabled).toBe(true);
        expect(form()).toBeNull();

        await answer();

        expect(thumb('thumbs-down').classList.contains('active')).toBe(true);
        expect(thumb('thumbs-up').disabled).toBe(false);
        expect(notice().textContent).toBe('Thanks for your feedback!');
        expect(form().querySelector('textarea, input, [contenteditable="true"]')).toBeNull();
    });

    it('leaves the thumbs unchanged and lets the reader retry when saving fails', async () => {
        const { sendFeedback, answer } = controlledSender();
        const { thumb, click, form, notice } = renderActions(sendFeedback);

        click('thumbs-down');
        await answer(false);

        expect(thumb('thumbs-down').classList.contains('active')).toBe(false);
        expect(thumb('thumbs-down').disabled).toBe(false);
        expect(notice().classList.contains('feedback-error')).toBe(true);
        expect(notice().textContent).toBe("Couldn't send feedback. Try again.");
        expect(form()).toBeNull();

        click('thumbs-down');
        expect(notice().textContent).toBe('');
        await answer();
        expect(thumb('thumbs-down').classList.contains('active')).toBe(true);
    });

    it('ignores clicks while a rating is being saved', async () => {
        const { sendFeedback, answer } = controlledSender();
        const { click } = renderActions(sendFeedback);

        click('thumbs-down');
        click('thumbs-up');
        click('thumbs-down');
        await answer();

        expect(sendFeedback).toHaveBeenCalledTimes(1);
    });

    it('sends reasons once, retaining selections on failure and logging only the selected IDs', async () => {
        const { sendFeedback, answer } = controlledSender();
        const { click, form, notice } = renderActions(sendFeedback);
        click('thumbs-down');
        await answer();

        pick(form(), 'sources');
        submit(form());
        expect(sendFeedback).toHaveBeenLastCalledWith({ reasons: ['sources'] });
        expect(form().querySelector('.conv-search-feedback-send').textContent).toBe('Sending\u2026');

        await answer(false);
        expect(form().querySelector('[data-reason="sources"]').getAttribute('aria-pressed')).toBe('true');
        expect(form().querySelector('.conv-search-feedback-form-error').hidden).toBe(false);

        submit(form());
        await answer();
        expect(form()).toBeNull();
        expect(notice().textContent).toBe('Thanks, this helps us improve!');
        expect(logAction).toHaveBeenLastCalledWith('Conversational Search Feedback Reasons', {
            conversational_search: {
                action: 'feedback_reasons', feedback_reasons: ['sources'], conversation_id: 'c1'
            }
        }, expect.any(Object));

        click('thumbs-up');
        await answer();
        click('thumbs-down');
        await answer();
        expect(form()).toBeNull();
    });

    it('offers all six reason chips, including Other without a free-text field', async () => {
        const { sendFeedback, answer } = controlledSender();
        const { click, form } = renderActions(sendFeedback);
        click('thumbs-down');
        await answer();

        const send = form().querySelector('.conv-search-feedback-send');
        expect([...form().querySelectorAll('.conv-search-feedback-reason')].map((c) => c.dataset.reason))
            .toEqual(FEEDBACK_REASONS.map((r) => r.id));
        expect(send.disabled).toBe(true);
        pick(form(), 'incorrect');
        expect(send.disabled).toBe(false);
        pick(form(), 'incorrect');
        expect(send.disabled).toBe(true);

        pick(form(), 'other');
        pick(form(), 'incomplete');
        expect(form().querySelector('textarea, input, [contenteditable="true"]')).toBeNull();
        submit(form());
        expect(sendFeedback).toHaveBeenLastCalledWith({ reasons: ['incomplete', 'other'] });
        await answer();
    });

    it('blocks vote changes while reasons are sending and preserves a failed submission', async () => {
        const { sendFeedback, answer } = controlledSender();
        const { thumb, click, form } = renderActions(sendFeedback);
        click('thumbs-down');
        await answer();

        pick(form(), 'sources');
        const pendingForm = form();
        submit(pendingForm);

        expect(thumb('thumbs-up').disabled).toBe(true);
        expect(thumb('thumbs-down').disabled).toBe(true);
        click('thumbs-up');
        submit(pendingForm);
        expect(sendFeedback).toHaveBeenCalledTimes(2);

        await answer(false);
        expect(form()).toBe(pendingForm);
        expect(form().querySelector('[data-reason="sources"]').getAttribute('aria-pressed')).toBe('true');
        expect(form().querySelector('.conv-search-feedback-form-error').hidden).toBe(false);
        expect(thumb('thumbs-up').disabled).toBe(false);
        expect(thumb('thumbs-down').classList.contains('active')).toBe(true);

        submit(form());
        await answer();
        expect(form()).toBeNull();
        expect(thumb('thumbs-up').disabled).toBe(false);
    });

    it('blocks form actions while a vote change is pending and restores them on failure', async () => {
        const { sendFeedback, answer } = controlledSender();
        const { click, form } = renderActions(sendFeedback);
        click('thumbs-down');
        await answer();
        pick(form(), 'incomplete');
        const pendingForm = form();

        click('thumbs-up');
        expect([...pendingForm.querySelectorAll('button')].every((control) => control.disabled)).toBe(true);
        submit(pendingForm);
        pendingForm.querySelector('.conv-search-feedback-dismiss').click();
        expect(sendFeedback).toHaveBeenCalledTimes(2);
        expect(form()).toBe(pendingForm);

        await answer(false);
        expect(form()).toBe(pendingForm);
        expect(form().querySelector('[data-reason="incomplete"]').getAttribute('aria-pressed')).toBe('true');
        expect([...pendingForm.querySelectorAll('button')].every((control) => !control.disabled)).toBe(true);
        submit(form());
        expect(sendFeedback).toHaveBeenLastCalledWith({ reasons: ['incomplete'] });
        await answer();
    });

    it('keeps Send disabled without selected reasons after a failed vote change', async () => {
        const { sendFeedback, answer } = controlledSender();
        const { click, form } = renderActions(sendFeedback);
        click('thumbs-down');
        await answer();

        click('thumbs-up');
        await answer(false);
        expect(form().querySelector('.conv-search-feedback-send').disabled).toBe(true);
        expect(form().querySelector('[data-reason="incomplete"]').disabled).toBe(false);
    });

    it('locks only the answer whose feedback is pending', async () => {
        const first = controlledSender();
        const second = controlledSender();
        const { click, form } = renderActions(first.sendFeedback);
        const otherMessage = document.createElement('div');
        document.body.appendChild(otherMessage);
        addMessageActions(otherMessage, 'another question', 'another answer', {
            conversationId: 'c1', sendFeedback: second.sendFeedback
        });
        click('thumbs-down');
        await first.answer();
        pick(form(), 'incorrect');
        submit(form());

        const otherThumb = otherMessage.querySelector('[data-action="thumbs-up"]');
        expect(otherThumb.disabled).toBe(false);
        otherThumb.click();
        expect(second.sendFeedback).toHaveBeenCalledWith({ rating: 'up' });
        await second.answer();
        expect(otherThumb.classList.contains('active')).toBe(true);
        await first.answer(false);
        expect(form().querySelector('[data-reason="incorrect"]').getAttribute('aria-pressed')).toBe('true');
    });

    it('withdraws the reasons form after an accepted thumbs-up', async () => {
        const { sendFeedback, answer } = controlledSender();
        const { click, form } = renderActions(sendFeedback);

        click('thumbs-down');
        await answer();
        click('thumbs-up');
        expect(form()).not.toBeNull();
        await answer();

        expect(sendFeedback).toHaveBeenLastCalledWith({ rating: 'up' });
        expect(form()).toBeNull();
    });

    it('closes the form without submitting an empty selection', async () => {
        const { sendFeedback, answer } = controlledSender();
        const { click, form } = renderActions(sendFeedback);
        click('thumbs-down');
        await answer();

        submit(form());
        expect(sendFeedback).toHaveBeenCalledTimes(1);
        form().querySelector('.conv-search-feedback-dismiss').click();
        expect(form()).toBeNull();
    });

    it('marks the reaction immediately for answers without feedback support', () => {
        const { thumb, click, form } = renderActions(null);

        click('thumbs-down');

        expect(thumb('thumbs-down').classList.contains('active')).toBe(true);
        expect(form()).toBeNull();
    });
});
