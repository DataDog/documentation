/**
 * Agent activity timeline for Docs AI answers.
 *
 * The chat endpoint streams `thinking` events while it researches an answer:
 *   "Searching documentation..."                     -> a documentation search started
 *   "Reviewing relevant pages" + `retrieved_pages`   -> results for the running search
 *   "Reviewing relevant pages" without pages         -> the assistant opened a page to read it
 *   "Generating answer..."                           -> research is over, the answer is being written
 *
 * `reduceActivity` turns those events into a timeline state. It has no DOM dependency so it
 * can be unit-tested. `ActivityTimeline` renders that state inside an assistant message.
 *
 * The timeline shows what was found, never the search terms: those are short English keywords
 * written for the search index, not for the reader. Searches that run in parallel share a step.
 */

const DOCS_ORIGIN = 'https://docs.datadoghq.com';
const MAX_VISIBLE_PAGES = 4;

export const SERVER_STAGES = {
    'Rewriting query...': 'understand',
    'Searching documentation...': 'search',
    'Reviewing relevant pages': 'review',
    'Generating answer...': 'write'
};

export function createActivityState(now = Date.now()) {
    return {
        phase: 'thinking',
        steps: [],
        pages: [],
        searches: 0,
        reads: 0,
        startedAt: now,
        researchEndedAt: null,
        nextId: 1
    };
}

function normalizePage(page) {
    if (!page || typeof page !== 'object') return null;
    const path = (page.distinct_base_url || page.url || '').toString().trim();
    let url = '';
    if (path.startsWith('/')) {
        url = `${DOCS_ORIGIN}${path}`;
    } else if (/^https?:\/\//.test(path)) {
        url = path;
    }
    const title = (page.title || '').toString().trim() || path;
    if (!title) return null;
    return { title, url };
}

function normalizePages(pages) {
    const seen = new Set();
    const result = [];
    (pages || []).forEach((raw) => {
        const page = normalizePage(raw);
        if (!page) return;
        const key = page.url || page.title;
        if (seen.has(key)) return;
        seen.add(key);
        result.push(page);
    });
    return result;
}

function mergePages(existing, added) {
    return normalizePages([...existing, ...added].map((p) => ({ title: p.title, url: p.url })));
}

const isPendingSearch = (step) => step.kind === 'search' && !step.resolved;

function settle(steps, status = 'done', keep = () => false) {
    return steps.map((step) => (step.status === 'active' && !keep(step) ? { ...step, status } : step));
}

// A new step settles the previous ones, except searches whose results are still on the way
// (the assistant can run several searches in parallel).
function settleForNewStep(steps) {
    return settle(steps, 'done', isPendingSearch);
}

function addStep(state, step) {
    return {
        ...state,
        steps: [...state.steps, { id: state.nextId, status: 'active', pages: [], count: 0, ...step }],
        nextId: state.nextId + 1
    };
}

function endResearch(state, now) {
    return state.researchEndedAt ? state : { ...state, researchEndedAt: now };
}

function startWriting(state, now) {
    if (state.steps.some((step) => step.kind === 'write')) {
        return { ...endResearch(state, now), phase: 'writing' };
    }
    const settled = { ...state, steps: settle(state.steps) };
    return { ...addStep(endResearch(settled, now), { kind: 'write' }), phase: 'writing' };
}

const pageKey = (page) => page.url || page.title;

function startSearch(state) {
    const searches = state.searches + 1;
    const running = state.steps.findIndex(isPendingSearch);
    if (running !== -1) {
        // Started while another search is still running: the reader sees one search step.
        const steps = [...state.steps];
        steps[running] = { ...steps[running], pending: steps[running].pending + 1 };
        return { ...state, steps, searches, phase: 'researching' };
    }
    const followUp = state.steps.some((step) => step.kind === 'search');
    const next = { ...state, steps: settleForNewStep(state.steps), searches };
    return { ...addStep(next, { kind: 'search', pending: 1, followUp }), phase: 'researching' };
}

function applyResults(state, pages) {
    const normalized = normalizePages(pages);
    // A step lists only the pages earlier searches didn't find.
    const known = new Set(state.pages.map(pageKey));
    const fresh = normalized.filter((p) => !known.has(pageKey(p)));
    const next = { ...state, pages: mergePages(state.pages, normalized) };
    const index = state.steps.findIndex(isPendingSearch);
    if (index === -1) {
        // Results without a visible search (older backends): show them as a completed search.
        const followUp = state.steps.some((step) => step.kind === 'search');
        const withSearch = addStep(
            { ...next, steps: settleForNewStep(next.steps), searches: next.searches + 1 },
            { kind: 'search', pending: 0, followUp }
        );
        const last = withSearch.steps.length - 1;
        withSearch.steps[last] = { ...withSearch.steps[last], status: 'done', resolved: true, pages: fresh };
        return { ...withSearch, phase: 'researching' };
    }
    const steps = [...state.steps];
    const step = steps[index];
    const pending = step.pending - 1;
    steps[index] = {
        ...step,
        pending,
        resolved: pending <= 0,
        status: pending <= 0 ? 'done' : step.status,
        pages: mergePages(step.pages, fresh)
    };
    return { ...next, steps, phase: 'researching' };
}

function applyRead(state, page) {
    const last = state.steps[state.steps.length - 1];
    const opened = normalizePages(page ? [page] : []);
    // Continuing a long page, or reading it again, is not a new page.
    const alreadyRead = opened.length > 0 && state.steps.some(
        (step) => step.kind === 'read' && step.pages.some((p) => pageKey(p) === pageKey(opened[0]))
    );
    if (alreadyRead) return { ...state, phase: 'researching' };
    const next = { ...state, reads: state.reads + 1, phase: 'researching' };
    if (last && last.kind === 'read' && last.status === 'active') {
        const steps = [...next.steps];
        steps[steps.length - 1] = { ...last, count: last.count + 1, pages: mergePages(last.pages, opened) };
        return { ...next, steps };
    }
    return addStep({ ...next, steps: settleForNewStep(next.steps) }, { kind: 'read', count: 1, pages: opened });
}

/**
 * Pure reducer. Actions:
 *   { type: 'thinking', content, retrieved_pages?, page? }   (a `query` field is ignored)
 *   { type: 'answer' }   first answer token
 *   { type: 'done' } | { type: 'error' } | { type: 'stopped' }
 */
export function reduceActivity(state, action, now = Date.now()) {
    switch (action.type) {
        case 'thinking': {
            const stage = SERVER_STAGES[action.content];
            if (stage === 'search') return startSearch(state);
            if (stage === 'review') {
                return Array.isArray(action.retrieved_pages)
                    ? applyResults(state, action.retrieved_pages)
                    : applyRead(state, action.page);
            }
            if (stage === 'write') return startWriting(state, now);
            if (stage === 'understand') {
                const next = { ...state, steps: settleForNewStep(state.steps) };
                return { ...addStep(next, { kind: 'understand' }), phase: 'researching' };
            }
            if (typeof action.content === 'string' && action.content.trim()) {
                // Unknown stage from a newer backend: surface its text rather than hiding progress.
                const next = { ...state, steps: settleForNewStep(state.steps) };
                return { ...addStep(next, { kind: 'note', label: action.content.trim() }), phase: 'researching' };
            }
            return state;
        }
        case 'answer':
            return state.phase === 'writing' ? state : startWriting(state, now);
        case 'done':
            return { ...endResearch(state, now), phase: 'done', steps: settle(state.steps) };
        case 'error':
            return { ...endResearch(state, now), phase: 'error', steps: settle(state.steps, 'failed') };
        case 'stopped':
            return { ...endResearch(state, now), phase: 'stopped', steps: settle(state.steps, 'cancelled') };
        default:
            return state;
    }
}

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

// Steps cut short by an error or by the reader stopping the answer.
function describeInterruptedStep(step) {
    const failed = step.status === 'failed';
    switch (step.kind) {
        case 'search':
            return failed ? "Search didn't finish" : 'Search stopped';
        case 'read':
            return failed ? "Reading didn't finish" : 'Reading stopped';
        case 'write':
            return failed ? 'Answer interrupted' : 'Writing stopped';
        case 'understand':
            return failed ? "Couldn't finish understanding your question" : 'Stopped';
        default:
            return step.label || '';
    }
}

export function describeStep(step) {
    if ((step.status === 'failed' || step.status === 'cancelled') && !step.resolved) {
        return describeInterruptedStep(step);
    }
    const active = step.status === 'active';
    switch (step.kind) {
        case 'understand':
            return active ? 'Understanding your question' : 'Understood your question';
        case 'search': {
            const found = step.pages.length;
            if (step.followUp) {
                if (active) return 'Searching for more details';
                if (!step.resolved) return 'Searched for more details';
                return found ? `Found ${plural(found, 'more page', 'more pages')}` : 'No new pages';
            }
            if (active) return 'Searching the docs';
            if (!step.resolved) return 'Searched the docs';
            return found ? `Found ${plural(found, 'page', 'pages')}` : 'No matching pages';
        }
        case 'read':
            return active
                ? `Reading ${step.count === 1 ? 'a page' : plural(step.count, 'page', 'pages')}`
                : `Read ${plural(step.count, 'page', 'pages')}`;
        case 'write':
            return active ? 'Writing the answer' : 'Wrote the answer';
        default:
            return step.label || '';
    }
}

export function researchSeconds(state, now = Date.now()) {
    const end = state.researchEndedAt || now;
    return Math.max(1, Math.round((end - state.startedAt) / 1000));
}

export function summarizeActivity(state) {
    const parts = [];
    // Count search steps, not backend calls: parallel searches show as one step.
    const searches = state.steps.filter((step) => step.kind === 'search').length;
    if (searches) parts.push(plural(searches, 'search', 'searches'));
    if (state.reads) parts.push(`${plural(state.reads, 'page', 'pages')} read`);
    else if (state.pages.length) parts.push(`${plural(state.pages.length, 'page', 'pages')} found`);
    return parts.join(' · ');
}

export function describeHeadline(state, now = Date.now()) {
    switch (state.phase) {
        case 'error':
            return 'Something went wrong';
        case 'stopped':
            return 'Stopped';
        case 'writing':
        case 'done':
            return `Researched for ${researchSeconds(state, now)}s`;
        default: {
            const active = [...state.steps].reverse().find((step) => step.status === 'active');
            return active ? describeStep(active) : 'Thinking';
        }
    }
}

// --- View ------------------------------------------------------------------------

const ICONS = {
    understand: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><line x1="20" y1="20" x2="15.6" y2="15.6"/>',
    read: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>',
    write: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    note: '<circle cx="12" cy="12" r="1.5"/>'
};

const CHEVRON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

function icon(kind) {
    return `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[kind] || ICONS.note}</svg>`;
}

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

let timelineCount = 0;

export class ActivityTimeline {
    constructor({ onToggle } = {}) {
        this.state = createActivityState();
        this.onToggle = onToggle;
        this.expanded = true;
        this.userToggled = false;
        this.stepNodes = new Map();
        this.lastAnnounced = '';
        this.announcedThinking = false;

        timelineCount += 1;
        const bodyId = `conv-search-activity-${timelineCount}`;

        this.root = el('div', 'conv-search-activity is-working');
        this.header = el('button', 'conv-search-activity-header');
        this.header.type = 'button';
        this.header.setAttribute('aria-expanded', 'true');
        this.header.setAttribute('aria-controls', bodyId);

        this.orb = el('span', 'conv-search-activity-orb');
        this.orb.setAttribute('aria-hidden', 'true');
        this.headline = el('span', 'conv-search-activity-headline', 'Thinking');
        this.meta = el('span', 'conv-search-activity-meta');
        this.timer = el('span', 'conv-search-activity-timer');
        this.timer.setAttribute('aria-hidden', 'true');
        const chevron = el('span', 'conv-search-activity-chevron');
        chevron.innerHTML = CHEVRON;
        this.header.append(this.orb, this.headline, this.meta, this.timer, chevron);

        this.body = el('div', 'conv-search-activity-body');
        this.body.id = bodyId;
        const inner = el('div', 'conv-search-activity-body-inner');
        this.list = el('ol', 'conv-search-activity-steps');
        inner.appendChild(this.list);
        this.body.appendChild(inner);

        this.live = el('span', 'conv-search-sr-only');
        this.live.setAttribute('aria-live', 'polite');

        this.root.append(this.header, this.body, this.live);

        this.header.addEventListener('click', () => {
            this.userToggled = true;
            this.setExpanded(!this.expanded);
            if (this.onToggle) this.onToggle(this.expanded);
        });

        this.render();
        this.tick = setInterval(() => this.renderHeader(), 1000);
    }

    dispatch(action) {
        this.state = reduceActivity(this.state, action);
        if (action.type === 'answer' && !this.userToggled) this.setExpanded(false);
        if (['done', 'error', 'stopped'].includes(action.type)) this.stopTimer();
        this.render();
    }

    stopTimer() {
        if (this.tick) clearInterval(this.tick);
        this.tick = null;
    }

    setExpanded(expanded) {
        this.expanded = expanded;
        this.root.classList.toggle('is-collapsed', !expanded);
        this.header.setAttribute('aria-expanded', String(expanded));
        // Keeps the collapsed page chips out of the tab order and the accessibility tree.
        if (expanded) {
            this.body.removeAttribute('inert');
            this.body.removeAttribute('aria-hidden');
        } else {
            this.body.setAttribute('inert', '');
            this.body.setAttribute('aria-hidden', 'true');
        }
    }

    summary() {
        return {
            research_ms: (this.state.researchEndedAt || Date.now()) - this.state.startedAt,
            searches: this.state.searches,
            pages_found: this.state.pages.length,
            pages_read: this.state.reads
        };
    }

    render() {
        const { phase } = this.state;
        this.root.dataset.phase = phase;
        this.root.classList.toggle('is-working', phase === 'thinking' || phase === 'researching');
        this.root.classList.toggle('is-writing', phase === 'writing');
        this.root.classList.toggle('is-settled', ['done', 'error', 'stopped'].includes(phase));
        this.root.classList.toggle('is-empty', this.state.steps.length === 0);
        this.state.steps.forEach((step, index) => this.renderStep(step, index));
        this.renderHeader();
    }

    renderHeader() {
        const { phase } = this.state;
        const headline = describeHeadline(this.state);
        if (this.headline.textContent !== headline) this.headline.textContent = headline;

        const researching = phase === 'thinking' || phase === 'researching';
        this.timer.textContent = researching ? `${researchSeconds(this.state)}s` : '';
        this.meta.textContent = researching || phase === 'error' ? '' : summarizeActivity(this.state);

        const announcement = this.announcement(headline);
        if (announcement && announcement !== this.lastAnnounced) {
            this.live.textContent = announcement;
            this.lastAnnounced = announcement;
        }
    }

    // Screen readers hear each research step once and when the answer is ready. Errors are
    // announced by the error message itself (role="alert").
    announcement(headline) {
        switch (this.state.phase) {
            case 'writing':
                return 'Writing the answer';
            case 'done':
                return 'Answer ready';
            case 'stopped':
                return 'Stopped';
            case 'error':
                return '';
            default:
                if (headline !== 'Thinking') return headline;
                if (this.announcedThinking) return '';
                this.announcedThinking = true;
                return headline;
        }
    }

    renderStep(step, index) {
        let node = this.stepNodes.get(step.id);
        if (!node) {
            node = el('li', 'conv-search-activity-step');
            node.dataset.kind = step.kind;
            const marker = el('span', 'conv-search-activity-step-icon');
            marker.innerHTML = icon(step.kind);
            const body = el('div', 'conv-search-activity-step-body');
            body.appendChild(el('span', 'conv-search-activity-step-label'));
            node.append(marker, body);
            node.style.setProperty('--conv-step-index', String(index));
            this.list.appendChild(node);
            this.stepNodes.set(step.id, node);
        }
        node.dataset.status = step.status;
        const label = node.querySelector('.conv-search-activity-step-label');
        const text = describeStep(step);
        if (label.textContent !== text) label.textContent = text;

        const body = node.querySelector('.conv-search-activity-step-body');
        const rendered = node.dataset.pages ? Number(node.dataset.pages) : 0;
        if (step.pages.length !== rendered) {
            body.querySelector('.conv-search-activity-pages')?.remove();
            if (step.pages.length) body.appendChild(this.renderPages(step.pages));
            node.dataset.pages = String(step.pages.length);
        }
    }

    renderPages(pages) {
        const wrap = el('div', 'conv-search-activity-pages');
        pages.forEach((page, i) => {
            const chip = el(page.url ? 'a' : 'span', 'conv-search-activity-page');
            if (page.url) {
                chip.href = page.url;
                chip.target = '_blank';
                chip.rel = 'noopener noreferrer';
            }
            chip.title = page.title;
            chip.style.setProperty('--conv-chip-index', String(Math.min(i, MAX_VISIBLE_PAGES)));
            chip.appendChild(el('span', 'conv-search-activity-page-title', page.title));
            if (i >= MAX_VISIBLE_PAGES) chip.classList.add('is-overflow');
            wrap.appendChild(chip);
        });
        const hidden = pages.length - MAX_VISIBLE_PAGES;
        if (hidden > 0) {
            const more = el('button', 'conv-search-activity-more', `+${hidden} more`);
            more.type = 'button';
            more.addEventListener('click', () => {
                wrap.classList.add('is-expanded');
                more.remove();
            });
            wrap.appendChild(more);
        }
        return wrap;
    }

    destroy() {
        this.stopTimer();
    }
}
