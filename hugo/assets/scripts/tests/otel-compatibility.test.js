import { initOtelCompat } from '../components/otel-compatibility';

// A small version of the markup that layouts/shortcodes/otel-compatibility.html renders
const PAIRS = [
    { id: 'ddot_sdk.ddot_collector', recommended: true },
    { id: 'otel_sdk.upstream_collector', recommended: true },
    { id: 'datadog_sdk.agents_collector' },
    { id: 'otel_sdk.agents_collector' }
];
// Support per feature, in PAIRS order
const FEATURES = {
    tracing: ['unknown', 'supported', 'supported', 'supported'],
    profiler: ['unknown', 'not_supported', 'supported', 'not_supported']
};

const options = PAIRS.map((p) => `<option value="${p.id}">${p.id}</option>`).join('');

function render() {
    document.body.innerHTML = `
        <div class="otel-compat" data-otel-compat>
            <div class="otel-compat__controls" hidden>
                <fieldset class="otel-compat__view">
                    <label><input type="radio" name="view" value="compare" checked></label>
                    <label><input type="radio" name="view" value="one"></label>
                </fieldset>
                <p class="otel-compat__status"></p>
                <div class="otel-compat__holder" hidden>
                    <select data-slot="a">${options}</select>
                    <select data-slot="b">${options}</select>
                </div>
            </div>
            <table class="otel-compat__table">
                <thead><tr>
                    <th class="otel-compat__feature-col">
                        <span class="otel-compat__corner-label">Feature</span>
                        <label class="otel-compat__diff" hidden><input type="checkbox" data-role="diff"></label>
                        <span class="otel-compat__count" hidden></span>
                    </th>${PAIRS.map((p) => `
                    <th data-pair="${p.id}" data-recommended="${!!p.recommended}"><span class="otel-compat__visual">${p.id}</span></th>`).join('')}
                </tr></thead>
                <tbody>${Object.entries(FEATURES).map(([feature, support]) => `
                    <tr data-feature="${feature}"><th>${feature}</th>${PAIRS.map((p, i) => `
                        <td data-pair="${p.id}" data-support="${support[i]}"></td>`).join('')}
                    </tr>`).join('')}
                </tbody>
                <tfoot><tr><td></td>${PAIRS.map((p) => `<td data-pair="${p.id}"></td>`).join('')}</tr></tfoot>
            </table>
        </div>`;
    const root = document.querySelector('[data-otel-compat]');
    initOtelCompat(root);
    return root;
}

const shown = (root, selector) => [...root.querySelectorAll(selector)].filter((el) => !el.hidden).map((el) => el.dataset.pair);
const shownPairs = (root) => shown(root, 'thead th[data-pair]');
const select = (root, slot) => root.querySelector(`select[data-slot="${slot}"]`);
const choose = (el, value) => {
    el.value = value;
    el.dispatchEvent(new Event('change'));
};
const view = (root, value) => {
    const input = root.querySelector(`.otel-compat__view input[value="${value}"]`);
    input.checked = true;
    input.dispatchEvent(new Event('change'));
};
const checkDiff = (root) => {
    const diff = root.querySelector('[data-role="diff"]');
    diff.checked = true;
    diff.dispatchEvent(new Event('change'));
};

describe('otel-compatibility', () => {
    beforeEach(() => {
        window.history.replaceState(null, '', '/');
    });

    it('compares the two recommended setups by default, with one menu in each header', () => {
        const root = render();
        expect(shownPairs(root)).toEqual(['ddot_sdk.ddot_collector', 'otel_sdk.upstream_collector']);
        expect(root.querySelector('thead th[data-pair="ddot_sdk.ddot_collector"] select').dataset.slot).toBe('a');
        expect(root.querySelector('thead th[data-pair="otel_sdk.upstream_collector"] select').dataset.slot).toBe('b');
        expect(shown(root, 'tfoot td[data-pair]')).toEqual(shownPairs(root));
        expect(root.querySelector('.otel-compat__controls').hidden).toBe(false);
        expect(root.querySelector('.otel-compat__diff').hidden).toBe(false);
        // A plain page visit keeps a clean URL
        expect(window.location.search).toBe('');
    });

    it('moves the menu into the header of the setup it picks', () => {
        const root = render();
        choose(select(root, 'a'), 'datadog_sdk.agents_collector');
        expect(shownPairs(root)).toEqual(['datadog_sdk.agents_collector', 'otel_sdk.upstream_collector']);
        expect(root.querySelector('thead th[data-pair="datadog_sdk.agents_collector"] select')).toBe(select(root, 'a'));
        expect(root.querySelectorAll('thead select')).toHaveLength(2);
    });

    it("swaps the setups when one picks the other's setup", () => {
        const root = render();
        choose(select(root, 'b'), 'ddot_sdk.ddot_collector');
        expect(shownPairs(root)).toEqual(['otel_sdk.upstream_collector', 'ddot_sdk.ddot_collector']);
    });

    it('marks features that differ, and can hide the rest', () => {
        const root = render();
        choose(select(root, 'a'), 'datadog_sdk.agents_collector');
        const differs = [...root.querySelectorAll('tbody tr.otel-compat__row--differs')].map((tr) => tr.dataset.feature);
        expect(differs).toEqual(['profiler']);
        checkDiff(root);
        const visible = [...root.querySelectorAll('tbody tr')].filter((tr) => !tr.hidden).map((tr) => tr.dataset.feature);
        expect(visible).toEqual(['profiler']);
        expect(root.querySelector('.otel-compat__status').textContent).toMatch('Hiding 1 features');
    });

    it("doesn't mark or hide a row with an undocumented cell", () => {
        const root = render();
        checkDiff(root);
        expect(root.querySelectorAll('tbody tr.otel-compat__row--differs')).toHaveLength(0);
        expect([...root.querySelectorAll('tbody tr')].every((tr) => !tr.hidden)).toBe(true);
    });

    it('shows one setup with its count in the one-setup view', () => {
        const root = render();
        checkDiff(root);
        view(root, 'one');
        expect(shownPairs(root)).toEqual(['ddot_sdk.ddot_collector']);
        expect(root.querySelectorAll('thead select')).toHaveLength(1);
        expect(root.querySelector('.otel-compat__diff').hidden).toBe(true);
        expect(root.querySelector('.otel-compat__count').textContent).toBe('Supports 0 of 2 features, 2 not yet documented');
        // The differences filter only applies to compare view
        expect([...root.querySelectorAll('tbody tr')].every((tr) => !tr.hidden)).toBe(true);
        expect(window.location.search).toBe('?compat_view=one&compat_a=ddot_sdk.ddot_collector');
        choose(select(root, 'a'), 'otel_sdk.agents_collector');
        expect(root.querySelector('.otel-compat__count').textContent).toBe('Supports 1 of 2 features');
    });

    it('picks a different second setup when compare view starts from the same one', () => {
        const root = render();
        view(root, 'one');
        choose(select(root, 'a'), 'otel_sdk.upstream_collector');
        view(root, 'compare');
        expect(shownPairs(root)).toEqual(['otel_sdk.upstream_collector', 'ddot_sdk.ddot_collector']);
    });

    it('restores the view and setups from the URL', () => {
        window.history.replaceState(null, '', '/?compat_view=compare&compat_a=otel_sdk.agents_collector&compat_b=datadog_sdk.agents_collector');
        expect(shownPairs(render())).toEqual(['otel_sdk.agents_collector', 'datadog_sdk.agents_collector']);
        window.history.replaceState(null, '', '/?compat_view=one&compat_a=otel_sdk.agents_collector');
        expect(shownPairs(render())).toEqual(['otel_sdk.agents_collector']);
    });

    it('falls back to compare view for an unknown view in the URL', () => {
        window.history.replaceState(null, '', '/?compat_view=all');
        expect(shownPairs(render())).toEqual(['ddot_sdk.ddot_collector', 'otel_sdk.upstream_collector']);
    });
});
