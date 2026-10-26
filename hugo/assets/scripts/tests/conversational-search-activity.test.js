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
        expect(state.searches).toBe(2);
        expect(state.reads).toBe(3);
        expect(state.pages).toHaveLength(3);
        expect(state.researchEndedAt).toBe(15000);
        expect(describeHeadline(state)).toBe('Researched for 15s');
        expect(summarizeActivity(state)).toBe('2 searches · 3 pages read');
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
        expect(describeStep(state.steps[0])).toBe('Found 2 pages');
        expect(summarizeActivity(state)).toBe('1 search · 2 pages found');
        expect(describeHeadline(state)).toBe('Researched for 5s');
    });

    it('describes the active step while researching', () => {
        let state = createActivityState(0);
        expect(describeHeadline(state, 0)).toBe('Thinking');

        state = reduceActivity(state, thinking(SEARCHING), 100);
        expect(describeHeadline(state)).toBe('Searching the docs');

        state = reduceActivity(state, thinking(REVIEWING, { retrieved_pages: [page('a')] }), 200);
        expect(describeHeadline(state)).toBe('Thinking');
        expect(describeStep(state.steps[0])).toBe('Found 1 page');

        state = reduceActivity(state, thinking(REVIEWING), 300);
        expect(describeHeadline(state)).toBe('Reading a page');
        state = reduceActivity(state, thinking(REVIEWING), 400);
        expect(describeHeadline(state)).toBe('Reading 2 pages');

        state = reduceActivity(state, thinking(GENERATING), 500);
        expect(describeStep(state.steps[1])).toBe('Read 2 pages');
        expect(describeStep(state.steps[2])).toBe('Writing the answer');
    });

    it('matches results to parallel searches in order', () => {
        const state = run([
            [thinking(SEARCHING, { query: 'log pipelines' }), 100],
            [thinking(SEARCHING, { query: 'log indexes' }), 120],
            [thinking(REVIEWING, { retrieved_pages: [page('pipelines')] }), 900],
            [thinking(REVIEWING), 950],
            [thinking(REVIEWING, { retrieved_pages: [page('indexes'), page('exclusion')] }), 1000]
        ]);

        const [first, second, read] = state.steps;
        expect(first.pages.map((p) => p.title)).toEqual(['Page pipelines']);
        expect(second.pages.map((p) => p.title)).toEqual(['Page indexes', 'Page exclusion']);
        expect(describeStep(second)).toBe('Found 2 pages for “log indexes”');
        expect(read.kind).toBe('read');
        expect(second.status).toBe('done');
    });

    it('shows a search for results that arrive without one, and empty results', () => {
        let state = run([[thinking(REVIEWING, { retrieved_pages: [page('a')] }), 100]]);
        expect(state.steps).toHaveLength(1);
        expect(state.steps[0]).toMatchObject({ kind: 'search', status: 'done', resolved: true });

        state = run([[thinking(SEARCHING), 100], [thinking(REVIEWING, { retrieved_pages: [] }), 200]]);
        expect(describeStep(state.steps[0])).toBe('No matching pages');
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

        expect(labels([...research, [{ type: 'error' }, 400]])).toEqual(['Found 1 page', "Reading didn't finish"]);
        expect(labels([...research, [{ type: 'stopped' }, 400]])).toEqual(['Found 1 page', 'Reading stopped']);

        // The read finished when the next search started; only the search was cut short.
        const searching = [...research, [thinking(SEARCHING, { query: 'log indexes' }), 400]];
        expect(labels([...searching, [{ type: 'error' }, 500]]))
            .toEqual(['Found 1 page', 'Read 1 page', "Search for “log indexes” didn't finish"]);
        expect(labels([...searching, [{ type: 'stopped' }, 500]]))
            .toEqual(['Found 1 page', 'Read 1 page', 'Search for “log indexes” stopped']);

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
});

describe('ActivityTimeline', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders steps and page chips as text, then collapses when the answer starts', () => {
        const timeline = new ActivityTimeline();
        document.body.appendChild(timeline.root);

        timeline.dispatch(thinking(SEARCHING));
        timeline.dispatch(thinking(REVIEWING, {
            retrieved_pages: [
                { title: '<img src=x onerror=alert(1)>', distinct_base_url: '/a/' },
                page('b'), page('c'), page('d'), page('e'), page('f')
            ]
        }));

        const steps = timeline.root.querySelectorAll('.conv-search-activity-step');
        expect(steps).toHaveLength(1);
        expect(steps[0].dataset.status).toBe('done');
        expect(timeline.root.querySelector('img')).toBeNull();
        expect(timeline.root.querySelector('.conv-search-activity-page-title').textContent)
            .toBe('<img src=x onerror=alert(1)>');
        expect(timeline.root.querySelectorAll('.conv-search-activity-page.is-overflow')).toHaveLength(2);

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
        expect(timeline.headline.textContent).toMatch(/^Researched for \d+s$/);
        expect(timeline.meta.textContent).toBe('1 search · 6 pages found');
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
            'Thinking', 'Searching the docs', 'Reading a page', 'Searching the docs', 'Writing the answer', 'Answer ready'
        ]);
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
