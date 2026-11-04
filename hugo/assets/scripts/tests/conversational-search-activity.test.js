import {
    ActivityTimeline,
    createActivityState,
    describeHeadline,
    describeStep,
    reduceActivity,
    summarizeActivity
} from '../components/conversational-search/activity';
import { streamDocsAiChat } from '../components/conversational-search/docsai-client';

const SEARCHING = 'Searching documentation...';
const REVIEWING = 'Reviewing relevant pages';
const GENERATING = 'Generating answer...';

const page = (slug) => ({ title: `Page ${slug}`, distinct_base_url: `/${slug}/` });
const thinking = (content, extra = {}) => ({ type: 'thinking', content, ...extra });

function run(actions, start = 0) {
    let state = createActivityState(start);
    actions.forEach(([action, at]) => {
        state = reduceActivity(state, action, at);
    });
    return state;
}

describe('reduceActivity', () => {
    it('builds a research timeline from an agent stream', () => {
        const state = run([
            [thinking(SEARCHING), 1900],
            [thinking(REVIEWING, { retrieved_pages: [page('a'), page('b'), page('a')] }), 4600],
            [thinking(REVIEWING), 5600],
            [thinking(REVIEWING), 6800],
            [thinking(REVIEWING), 8000],
            [thinking(SEARCHING), 9800],
            [thinking(REVIEWING, { retrieved_pages: [page('b'), page('c')] }), 11200],
            [thinking(GENERATING), 15000],
            [{ type: 'answer' }, 15100],
            [{ type: 'done' }, 16600]
        ]);

        expect(state.steps.map((s) => s.kind)).toEqual(['search', 'read', 'search', 'write']);
        expect(state.steps.every((s) => s.status === 'done')).toBe(true);
        expect(state.steps[0].pages.map((p) => p.url)).toEqual([
            'https://docs.datadoghq.com/a/',
            'https://docs.datadoghq.com/b/'
        ]);
        expect(state.steps[1].count).toBe(3);
        expect(describeStep(state.steps[2])).toBe('Found 1 more page');
        expect(state.steps[2].pages.map((p) => p.url)).toEqual(['https://docs.datadoghq.com/c/']);
        expect(state.searches).toBe(2);
        expect(state.reads).toBe(3);
        expect(state.pages).toHaveLength(3);
        expect(state.researchEndedAt).toBe(15000);
        expect(describeHeadline(state)).toBe('Reviewed the documentation \u00b7 15s');
        expect(summarizeActivity(state)).toBe('2 searches · 3 pages checked');
    });

    it('supports the single-pass retrieval stream', () => {
        const state = run([
            [thinking(SEARCHING), 800],
            [thinking(REVIEWING, { retrieved_pages: [{ title: 'Current page', distinct_base_url: '/agent/' }, page('x')] }), 4800],
            [thinking(GENERATING), 5200],
            [{ type: 'answer' }, 7300],
            [{ type: 'done' }, 9000]
        ]);

        expect(state.steps.map((s) => s.kind)).toEqual(['search', 'write']);
        expect(describeStep(state.steps[0])).toBe('Found 2 relevant pages');
        expect(summarizeActivity(state)).toBe('1 search · 2 pages found');
        expect(describeHeadline(state)).toBe('Reviewed the documentation \u00b7 5s');
    });

    it('keeps the headline steady while the steps describe the research', () => {
        let state = createActivityState(0);
        expect(describeHeadline(state, 0)).toBe('Thinking...');

        state = reduceActivity(state, thinking(SEARCHING), 100);
        expect(describeHeadline(state)).toBe('Reviewing the documentation...');
        expect(describeStep(state.steps[0])).toBe('Finding relevant pages...');

        state = reduceActivity(state, thinking(REVIEWING, { retrieved_pages: [page('a')] }), 200);
        expect(describeHeadline(state)).toBe('Reviewing the documentation...');
        expect(describeStep(state.steps[0])).toBe('Found 1 relevant page');

        state = reduceActivity(state, thinking(REVIEWING), 300);
        expect(describeStep(state.steps[1])).toBe('Checking a page...');
        state = reduceActivity(state, thinking(REVIEWING), 400);
        expect(describeStep(state.steps[1])).toBe('Checking 2 pages...');

        state = reduceActivity(state, thinking(GENERATING), 500);
        expect(describeStep(state.steps[1])).toBe('Checked 2 pages');
        expect(describeStep(state.steps[2])).toBe('Writing the answer...');
        expect(describeHeadline(state, 900)).toBe('Reviewed the documentation \u00b7 1s');
    });

    it('does not claim a documentation review when the assistant answered without one', () => {
        const state = run([[thinking(GENERATING), 800], [{ type: 'answer' }, 900], [{ type: 'done' }, 1200]]);
        expect(describeHeadline(state)).toBe('Answered in 1s');
    });

    it('shows parallel searches as one step, without their queries', () => {
        let state = run([
            [thinking(SEARCHING, { query: 'log pipelines' }), 100],
            [thinking(SEARCHING, { query: 'log indexes' }), 120],
            [thinking(REVIEWING, { query: 'log indexes', retrieved_pages: [page('indexes'), page('shared')] }), 900]
        ]);
        expect(state.steps).toHaveLength(1);
        expect(describeStep(state.steps[0])).toBe('Finding relevant pages...');

        state = reduceActivity(
            state,
            thinking(REVIEWING, { query: 'log pipelines', retrieved_pages: [page('pipelines'), page('shared')] }),
            950
        );
        expect(describeStep(state.steps[0])).toBe('Found 3 relevant pages');
        expect(state.steps[0].pages.map((p) => p.title)).toEqual(['Page indexes', 'Page shared', 'Page pipelines']);
        expect(state.searches).toBe(2);
        expect(summarizeActivity(state)).toBe('2 searches · 3 pages found');
    });

    it('keeps a search that runs alongside a read in the same step', () => {
        const state = run([
            [thinking(SEARCHING), 100],
            [thinking(REVIEWING), 120],
            [thinking(SEARCHING), 140],
            [thinking(REVIEWING, { retrieved_pages: [page('a')] }), 900],
            [thinking(REVIEWING, { retrieved_pages: [page('b')] }), 950]
        ]);

        expect(state.steps.map((s) => s.kind)).toEqual(['search', 'read']);
        expect(describeStep(state.steps[0])).toBe('Found 2 relevant pages');
    });

    it('labels a later search by the pages it adds', () => {
        const later = run([
            [thinking(SEARCHING), 100],
            [thinking(REVIEWING, { retrieved_pages: [page('a'), page('b')] }), 200],
            [thinking(REVIEWING, { page: page('a') }), 300],
            [thinking(SEARCHING), 400]
        ]);
        expect(describeStep(later.steps[2])).toBe('Finding more pages...');

        const found = reduceActivity(later, thinking(REVIEWING, { retrieved_pages: [page('b'), page('c')] }), 500);
        expect(describeStep(found.steps[2])).toBe('Found 1 more page');
        expect(found.steps[2].pages.map((p) => p.title)).toEqual(['Page c']);

        const none = reduceActivity(later, thinking(REVIEWING, { retrieved_pages: [page('a')] }), 500);
        expect(describeStep(none.steps[2])).toBe('No new pages');
    });

    it('counts each page once and shows reading further into a page', () => {
        const opened = (slug) => thinking(REVIEWING, { page: { title: `Page ${slug}`, distinct_base_url: `/${slug}/` } });
        const state = run([
            [thinking(SEARCHING), 100],
            [thinking(REVIEWING, { retrieved_pages: [page('a'), page('b')] }), 200],
            [opened('a'), 300],
            [opened('b'), 350],
            [thinking(SEARCHING), 400],
            [thinking(REVIEWING, { retrieved_pages: [page('c')] }), 500],
            [opened('a'), 600],
            [opened('a'), 700]
        ]);

        expect(state.steps.map(describeStep)).toEqual([
            'Found 2 relevant pages', 'Checked 2 pages', 'Found 1 more page', 'Checking more of the page...'
        ]);
        expect(state.steps[1].pages.map((p) => p.title)).toEqual(['Page a', 'Page b']);
        expect(state.steps[3].pages.map((p) => p.title)).toEqual(['Page a']);
        expect(state.reads).toBe(2);
        expect(summarizeActivity(state)).toBe('2 searches \u00b7 2 pages checked');
    });

    it('keeps researching when the answer announcement was only narration', () => {
        const state = run([
            [thinking(SEARCHING), 100],
            [thinking(REVIEWING, { retrieved_pages: [page('a')] }), 200],
            [thinking(GENERATING), 2000],
            [thinking(REVIEWING, { page: page('a') }), 2500],
            [thinking(SEARCHING), 3000],
            [thinking(REVIEWING, { retrieved_pages: [page('b')] }), 3500],
            [thinking(GENERATING), 9000],
            [{ type: 'answer' }, 9100],
            [{ type: 'done' }, 12000]
        ]);

        expect(state.steps.map(describeStep)).toEqual([
            'Found 1 relevant page', 'Checked 1 page', 'Found 1 more page', 'Wrote the answer'
        ]);
        expect(describeHeadline(state)).toBe('Reviewed the documentation \u00b7 9s');
    });

    it('shows a search for results that arrive without one, and empty results', () => {
        let state = run([[thinking(REVIEWING, { retrieved_pages: [page('a')] }), 100]]);
        expect(state.steps).toHaveLength(1);
        expect(state.steps[0]).toMatchObject({ kind: 'search', status: 'done', resolved: true });

        state = run([[thinking(SEARCHING), 100], [thinking(REVIEWING, { retrieved_pages: [] }), 200]]);
        expect(describeStep(state.steps[0])).toBe('No relevant pages');
    });

    it('surfaces unknown stages and ignores empty ones', () => {
        let state = reduceActivity(createActivityState(0), thinking('Checking the API reference'), 10);
        expect(state.steps[0]).toMatchObject({ kind: 'note', label: 'Checking the API reference' });
        state = reduceActivity(state, thinking(''), 20);
        expect(state.steps).toHaveLength(1);
    });

    it('settles active steps on errors and stops', () => {
        const failed = run([[thinking(SEARCHING), 100], [{ type: 'error' }, 300]]);
        expect(failed.phase).toBe('error');
        expect(failed.steps[0].status).toBe('failed');
        expect(describeHeadline(failed)).toBe('Something went wrong');

        const stopped = run([[thinking(SEARCHING), 100], [{ type: 'stopped' }, 300]]);
        expect(stopped.steps[0].status).toBe('cancelled');
        expect(describeHeadline(stopped)).toBe('Stopped');
    });

    it('labels steps that an error or a stop cut short', () => {
        const research = [
            [thinking(SEARCHING), 100],
            [thinking(REVIEWING, { retrieved_pages: [page('a')] }), 200],
            [thinking(REVIEWING), 300]
        ];
        const labels = (actions) => run(actions).steps.map(describeStep);

        expect(labels([...research, [{ type: 'error' }, 400]])).toEqual(['Found 1 relevant page', "Checking didn't finish"]);
        expect(labels([...research, [{ type: 'stopped' }, 400]])).toEqual(['Found 1 relevant page', 'Stopped checking pages']);

        // The read finished when the next search started; only the search was cut short.
        const searching = [...research, [thinking(SEARCHING, { query: 'log indexes' }), 400]];
        expect(labels([...searching, [{ type: 'error' }, 500]]))
            .toEqual(['Found 1 relevant page', 'Checked 1 page', "Finding pages didn't finish"]);
        expect(labels([...searching, [{ type: 'stopped' }, 500]]))
            .toEqual(['Found 1 relevant page', 'Checked 1 page', 'Stopped finding pages']);

        const writing = run([[thinking(GENERATING), 100], [{ type: 'error' }, 200]]);
        expect(describeStep(writing.steps[0])).toBe('Answer interrupted');
    });

    it('only links to http(s) documentation pages', () => {
        const state = run([
            [thinking(REVIEWING, {
                retrieved_pages: [
                    { title: 'Script', distinct_base_url: 'javascript:alert(1)' },
                    { title: 'Absolute', distinct_base_url: 'https://docs.datadoghq.com/logs/' },
                    { title: '', distinct_base_url: '' }
                ]
            }), 100]
        ]);
        expect(state.steps[0].pages).toEqual([
            { title: 'Script', url: '' },
            { title: 'Absolute', url: 'https://docs.datadoghq.com/logs/' }
        ]);
    });

    it('names a page that arrives without a title after its path', () => {
        const opened = (title, path) => thinking(REVIEWING, { page: { title, distinct_base_url: path } });
        const state = run([
            [opened('/tracing/trace_collection/dd_libraries/java/', '/tracing/trace_collection/dd_libraries/java/'), 100],
            [opened('', '/serverless/aws_lambda/'), 200],
            [opened('/', '/'), 300]
        ]);
        expect(state.steps[0].pages.map((p) => p.title)).toEqual(['Java', 'Aws lambda', '/']);
    });
});

describe('ActivityTimeline', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('lists checked pages as text links, then collapses when the answer starts', () => {
        const timeline = new ActivityTimeline();
        document.body.appendChild(timeline.root);

        const opened = (title, slug) => thinking(REVIEWING, { page: { title, distinct_base_url: `/${slug}/` } });
        timeline.dispatch(thinking(SEARCHING));
        timeline.dispatch(thinking(REVIEWING, { retrieved_pages: [page('a'), page('b')] }));
        [['<img src=x onerror=alert(1)>', 'a'], ['Page b', 'b'], ['Page c', 'c'], ['Page d', 'd'], ['Page e', 'e'], ['Page f', 'f']]
            .forEach(([title, slug]) => timeline.dispatch(opened(title, slug)));

        const steps = timeline.root.querySelectorAll('.conv-search-activity-step');
        expect(steps).toHaveLength(2);
        expect(steps[0].dataset.status).toBe('done');
        expect(steps[0].querySelector('.conv-search-activity-page')).toBeNull();
        expect(timeline.root.querySelector('img')).toBeNull();
        expect(steps[1].querySelector('.conv-search-activity-page-title').textContent)
            .toBe('<img src=x onerror=alert(1)>');
        expect(steps[1].querySelectorAll('.conv-search-activity-page.is-overflow')).toHaveLength(2);

        const more = timeline.root.querySelector('.conv-search-activity-more');
        expect(more.textContent).toBe('+2 more');
        more.click();
        expect(timeline.root.querySelector('.conv-search-activity-pages').classList.contains('is-expanded')).toBe(true);

        expect(timeline.root.classList.contains('is-collapsed')).toBe(false);
        timeline.dispatch({ type: 'answer' });
        expect(timeline.root.classList.contains('is-collapsed')).toBe(true);
        expect(timeline.header.getAttribute('aria-expanded')).toBe('false');

        timeline.dispatch({ type: 'done' });
        expect(timeline.root.dataset.phase).toBe('done');
        expect(timeline.headline.textContent).toMatch(/^Reviewed the documentation \u00b7 \d+s$/);
        expect(timeline.meta.textContent).toBe('1 search \u00b7 6 pages checked');
        timeline.destroy();
    });

    it('takes collapsed steps out of the tab order', () => {
        const timeline = new ActivityTimeline();
        timeline.dispatch(thinking(SEARCHING));
        expect(timeline.body.hasAttribute('inert')).toBe(false);

        timeline.dispatch({ type: 'answer' });
        expect(timeline.body.hasAttribute('inert')).toBe(true);
        expect(timeline.body.getAttribute('aria-hidden')).toBe('true');

        timeline.header.click();
        expect(timeline.body.hasAttribute('inert')).toBe(false);
        expect(timeline.body.hasAttribute('aria-hidden')).toBe(false);
        timeline.destroy();
    });

    it('announces each step once and when the answer is ready', () => {
        const timeline = new ActivityTimeline();
        const heard = [];
        const listen = () => {
            if (heard[heard.length - 1] !== timeline.live.textContent) heard.push(timeline.live.textContent);
        };
        listen();
        [
            thinking(SEARCHING),
            thinking(REVIEWING, { retrieved_pages: [page('a')] }),
            thinking(REVIEWING),
            thinking(SEARCHING),
            thinking(REVIEWING, { retrieved_pages: [page('b')] }),
            thinking(GENERATING),
            { type: 'answer' },
            { type: 'done' }
        ].forEach((action) => {
            timeline.dispatch(action);
            listen();
        });

        expect(heard).toEqual([
            'Thinking...', 'Finding relevant pages...', 'Checking a page...', 'Finding more pages...', 'Writing the answer',
            'Answer ready'
        ]);
        timeline.destroy();
    });

    it('never shows search queries, even when a search is cut short', () => {
        const timeline = new ActivityTimeline();
        document.body.appendChild(timeline.root);
        const query = 'trace-agent port 8126 configuration';
        [
            thinking(SEARCHING, { query }),
            thinking(REVIEWING, { query, retrieved_pages: [page('a')] }),
            thinking(SEARCHING, { query }),
            { type: 'error' }
        ].forEach((action) => {
            timeline.dispatch(action);
            expect(timeline.root.textContent).not.toContain('8126');
        });
        expect(timeline.list.textContent).toContain("Finding pages didn't finish");
        timeline.destroy();
    });

    it('keeps the timeline open when the reader expanded it', () => {
        const onToggle = jest.fn();
        const timeline = new ActivityTimeline({ onToggle });
        timeline.dispatch(thinking(SEARCHING));
        timeline.header.click();
        timeline.header.click();
        expect(onToggle).toHaveBeenLastCalledWith(true);

        timeline.dispatch({ type: 'answer' });
        expect(timeline.root.classList.contains('is-collapsed')).toBe(false);
        timeline.destroy();
    });
});

describe('streamDocsAiChat', () => {
    const encoder = { encode: (text) => Buffer.from(text, 'utf8') };

    beforeAll(() => {
        // eslint-disable-next-line global-require
        global.TextDecoder = global.TextDecoder || require('util').TextDecoder;
    });

    function mockStream(chunks) {
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
    }

    it('rejects with the HTTP status when the request fails', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 400 });
        await expect(streamDocsAiChat({ config: { apiUrl: 'https://example.test', apiKey: 'key' }, query: 'q' }))
            .rejects.toMatchObject({ status: 400 });
    });

    it('forwards thinking payloads, server errors and answer tokens', async () => {
        mockStream([
            'data: {"type": "thinking", "content": "Reviewing relevant pages", "retrieved_pages": [{"title": "A"',
            ', "distinct_base_url": "/a/"}]}\n\n',
            'data: {"type": "markdown_fragment", "content": "Hel"}\n\ndata: {"type": "markdown_fragment", "content": "lo"}\n\n',
            'data: {"type": "error", "code": "temporarily_unavailable", "retryable": true, "discard_partial": true}\n\n',
            'data: [DONE]\n\n'
        ]);
        const onThinking = jest.fn();
        const onServerError = jest.fn();
        const onToken = jest.fn();

        const answer = await streamDocsAiChat({
            config: { apiUrl: 'https://example.test', apiKey: 'key' },
            query: 'q',
            onThinking,
            onServerError,
            onToken
        });

        expect(answer).toBe('Hello');
        expect(onThinking).toHaveBeenCalledWith('Reviewing relevant pages', expect.objectContaining({
            retrieved_pages: [{ title: 'A', distinct_base_url: '/a/' }]
        }));
        expect(onToken).toHaveBeenLastCalledWith('lo', 'Hello');
        expect(onServerError).toHaveBeenCalledWith(expect.objectContaining({ retryable: true, discard_partial: true }));
    });
});
