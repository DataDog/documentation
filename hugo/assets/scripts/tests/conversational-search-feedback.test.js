import { addMessageActions, MAX_FEEDBACK_COMMENT_CHARS } from '../components/conversational-search/actions';
import { sendDocsAiFeedback, streamDocsAiChat } from '../components/conversational-search/docsai-client';

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

    function renderActions(sendFeedback) {
        const message = document.querySelector('.message');
        addMessageActions(message, 'question', 'answer', { conversationId: 'c1', sendFeedback });
        const click = (action) => message.querySelector(`[data-action="${action}"]`).click();
        const form = () => message.querySelector('.conv-search-feedback-form');
        return { click, form };
    }

    function type(form, text) {
        const field = form.querySelector('textarea');
        field.value = text;
        field.dispatchEvent(new Event('input'));
    }

    it('sends a thumbs-down and offers an optional comment, sent once', () => {
        const sendFeedback = jest.fn();
        const { click, form } = renderActions(sendFeedback);

        click('thumbs-down');
        expect(sendFeedback).toHaveBeenLastCalledWith({ rating: 'down' });
        expect(form().querySelector('textarea').maxLength).toBe(MAX_FEEDBACK_COMMENT_CHARS);
        expect(form().querySelector('.conv-search-feedback-send').disabled).toBe(true);

        type(form(), '  Missing the Python example.  ');
        form().dispatchEvent(new Event('submit', { cancelable: true }));

        expect(sendFeedback).toHaveBeenLastCalledWith({ comment: 'Missing the Python example.' });
        expect(form()).toBeNull();
        click('thumbs-up');
        click('thumbs-down');
        expect(form()).toBeNull();
    });

    it('sends a thumbs-up and withdraws the comment form', () => {
        const sendFeedback = jest.fn();
        const { click, form } = renderActions(sendFeedback);

        click('thumbs-down');
        click('thumbs-up');

        expect(sendFeedback).toHaveBeenLastCalledWith({ rating: 'up' });
        expect(form()).toBeNull();
    });

    it('closes the comment form without sending a blank comment', () => {
        const sendFeedback = jest.fn();
        const { click, form } = renderActions(sendFeedback);

        click('thumbs-down');
        type(form(), '   ');
        form().dispatchEvent(new Event('submit', { cancelable: true }));
        expect(sendFeedback).toHaveBeenCalledTimes(1);

        form().querySelector('.conv-search-feedback-dismiss').click();
        expect(form()).toBeNull();
    });

    it('only records the reaction for answers that cannot be rated', () => {
        const { click, form } = renderActions(null);

        click('thumbs-down');

        expect(form()).toBeNull();
        expect(document.querySelector('[data-action="thumbs-down"]').classList.contains('active')).toBe(true);
    });
});
