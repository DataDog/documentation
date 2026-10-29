import { addMessageActions, MAX_FEEDBACK_COMMENT_CHARS } from '../components/conversational-search/actions';
import { FEEDBACK_TIMEOUT_MS, sendDocsAiFeedback, streamDocsAiChat } from '../components/conversational-search/docsai-client';

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

    it('posts a rating or comment with the token and survives leaving the page', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 202 });

        await sendDocsAiFeedback({ config, token: 't', conversationId: 'c1', rating: 'down', comment: 'Wrong page' });

        const [url, init] = global.fetch.mock.calls[0];
        expect(url).toBe('https://example.test/feedback');
        expect(init.keepalive).toBe(true);
        expect(init.headers['X-Docs-Ai-Api-Key']).toBe('key');
        expect(JSON.parse(init.body)).toEqual({
            data: { attributes: { feedback_token: 't', rating: 'down', comment: 'Wrong page', conversation_id: 'c1' } }
        });
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

describe('thumbs and comments', () => {
    beforeEach(() => {
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

    function type(form, text) {
        const field = form.querySelector('textarea');
        field.value = text;
        field.dispatchEvent(new Event('input'));
    }

    const submit = (form) => form.dispatchEvent(new Event('submit', { cancelable: true }));

    it('marks a thumbs-down only once it is recorded, then offers a comment', async () => {
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
        expect(form().querySelector('textarea').maxLength).toBe(MAX_FEEDBACK_COMMENT_CHARS);
    });

    it('leaves the thumbs unchanged and lets the reader retry when recording fails', async () => {
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

    it('ignores clicks while a rating is being recorded', async () => {
        const { sendFeedback, answer } = controlledSender();
        const { click } = renderActions(sendFeedback);

        click('thumbs-down');
        click('thumbs-up');
        click('thumbs-down');
        await answer();

        expect(sendFeedback).toHaveBeenCalledTimes(1);
    });

    it('sends a comment once, keeping it when sending fails', async () => {
        const { sendFeedback, answer } = controlledSender();
        const { click, form, notice } = renderActions(sendFeedback);
        click('thumbs-down');
        await answer();

        type(form(), '  Missing the Python example.  ');
        submit(form());
        expect(sendFeedback).toHaveBeenLastCalledWith({ comment: 'Missing the Python example.' });
        expect(form().querySelector('textarea').disabled).toBe(true);
        expect(form().querySelector('.conv-search-feedback-send').textContent).toBe('Sending\u2026');

        await answer(false);
        expect(form().querySelector('textarea').value).toBe('  Missing the Python example.  ');
        expect(form().querySelector('textarea').disabled).toBe(false);
        expect(form().querySelector('.conv-search-feedback-form-error').hidden).toBe(false);

        submit(form());
        await answer();
        expect(form()).toBeNull();
        expect(notice().textContent).toBe('Thanks, this helps us improve!');

        click('thumbs-up');
        await answer();
        click('thumbs-down');
        await answer();
        expect(form()).toBeNull();
    });

    it('withdraws the comment form after a recorded thumbs-up', async () => {
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

    it('closes the comment form without sending a blank comment', async () => {
        const { sendFeedback, answer } = controlledSender();
        const { click, form } = renderActions(sendFeedback);
        click('thumbs-down');
        await answer();

        type(form(), '   ');
        submit(form());
        expect(sendFeedback).toHaveBeenCalledTimes(1);

        form().querySelector('.conv-search-feedback-dismiss').click();
        expect(form()).toBeNull();
    });

    it('marks the reaction immediately for answers that cannot be rated', () => {
        const { thumb, click, form } = renderActions(null);

        click('thumbs-down');

        expect(thumb('thumbs-down').classList.contains('active')).toBe(true);
        expect(form()).toBeNull();
    });
});
