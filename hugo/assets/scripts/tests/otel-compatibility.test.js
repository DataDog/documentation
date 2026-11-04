import { initOtelCompat } from '../components/otel-compatibility';

// A small version of the markup that layouts/shortcodes/otel-compatibility.html renders
const SDKS = ['ddot_sdk', 'datadog_sdk', 'otel_sdk'];
const RECEIVERS = ['ddot_collector', 'upstream_collector', 'agents_collector'];
const PAIRS = [
    { sdk: 'ddot_sdk', receiver: 'ddot_collector', recommended: true },
    { sdk: 'otel_sdk', receiver: 'upstream_collector', recommended: true },
    { sdk: 'datadog_sdk', receiver: 'agents_collector' },
    { sdk: 'otel_sdk', receiver: 'agents_collector' }
];
// Support per feature, in PAIRS order
const FEATURES = {
    tracing: ['unknown', 'supported', 'supported', 'supported'],
    profiler: ['unknown', 'not_supported', 'supported', 'not_supported']
};

const id = (p) => `${p.sdk}.${p.receiver}`;
const options = (ids) => ids.map((v) => `<option value="${v}">${v}</option>`).join('');
const menus = (slot) => `
    <select data-slot="${slot}" data-role="sdk">${options(SDKS)}</select>
    <select data-slot="${slot}" data-role="receiver">${options(RECEIVERS)}</select>`;

function render() {
    document.body.innerHTML = `
        <div class="otel-compat" data-otel-compat>
            <div class="otel-compat__controls" hidden>
                <fieldset class="otel-compat__view">
                    <label><input type="radio" name="view" value="compare" checked></label>
                    <label><input type="radio" name="view" value="one"></label>
                </fieldset>
                <p class="otel-compat__status"></p>
                <p data-role="announce"></p>
                <div class="otel-compat__holder" hidden>${menus('a')}${menus('b')}</div>
            </div>
            <table class="otel-compat__table">
                <thead><tr>
                    <th class="otel-compat__feature-col">
                        <span class="otel-compat__corner-label">Feature</span>
                        <label class="otel-compat__diff" hidden><input type="checkbox" data-role="diff"></label>
                        <span class="otel-compat__count" hidden></span>
                    </th>${PAIRS.map((p) => `
                    <th data-pair="${id(p)}" data-sdk="${p.sdk}" data-receiver="${p.receiver}" data-recommended="${!!p.recommended}">
                        <span class="otel-compat__visual"><span class="otel-compat__sdk">${p.sdk}</span><span class="otel-compat__dest">${p.receiver}</span></span>
                    </th>`).join('')}
                </tr></thead>
                <tbody>${Object.entries(FEATURES).map(([feature, support]) => `
                    <tr data-feature="${feature}"><th>${feature}</th>${PAIRS.map((p, i) => `
                        <td data-pair="${id(p)}" data-support="${support[i]}"></td>`).join('')}
                    </tr>`).join('')}
                </tbody>
                <tfoot><tr><td></td>${PAIRS.map((p) => `<td data-pair="${id(p)}"></td>`).join('')}</tr></tfoot>
            </table>
        </div>`;
    const root = document.querySelector('[data-otel-compat]');
    initOtelCompat(root);
    return root;
}

const shown = (root, selector) => [...root.querySelectorAll(selector)].filter((el) => !el.hidden).map((el) => el.dataset.pair);
const shownPairs = (root) => shown(root, 'thead th[data-pair]');
const select = (root, slot, role) => root.querySelector(`select[data-slot="${slot}"][data-role="${role}"]`);
const optionTexts = (el) => [...el.options].map((o) => o.textContent);
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
const announcement = (root) => root.querySelector('[data-role="announce"]').textContent;

describe('otel-compatibility', () => {
    beforeEach(() => {
        window.history.replaceState(null, '', '/');
    });

    it('compares the two recommended setups by default, with SDK and destination menus in each header', () => {
        const root = render();
        expect(shownPairs(root)).toEqual(['ddot_sdk.ddot_collector', 'otel_sdk.upstream_collector']);
        const th = root.querySelector('thead th[data-pair="ddot_sdk.ddot_collector"]');
        expect(th.querySelector('.otel-compat__sdk select')).toBe(select(root, 'a', 'sdk'));
        expect(th.querySelector('.otel-compat__dest select')).toBe(select(root, 'a', 'receiver'));
        expect(shown(root, 'tfoot td[data-pair]')).toEqual(shownPairs(root));
        expect(root.querySelector('.otel-compat__controls').hidden).toBe(false);
        // A plain page visit keeps a clean URL
        expect(window.location.search).toBe('');
    });

    it('offers only destinations that pair with the chosen SDK', () => {
        const root = render();
        expect(optionTexts(select(root, 'a', 'receiver'))).toEqual(['ddot_collector (recommended)']);
        expect(optionTexts(select(root, 'b', 'receiver'))).toEqual(['upstream_collector (recommended)', 'agents_collector']);
    });

    it('swaps only the destination, keeping the SDK', () => {
        const root = render();
        choose(select(root, 'b', 'receiver'), 'agents_collector');
        expect(shownPairs(root)).toEqual(['ddot_sdk.ddot_collector', 'otel_sdk.agents_collector']);
        expect(root.querySelector('thead th[data-pair="otel_sdk.agents_collector"] .otel-compat__dest select')).toBe(select(root, 'b', 'receiver'));
        expect(announcement(root)).toBe('');
    });

    it('moves to a destination that pairs with a new SDK, and says so', () => {
        const root = render();
        choose(select(root, 'a', 'sdk'), 'datadog_sdk');
        expect(shownPairs(root)).toEqual(['datadog_sdk.agents_collector', 'otel_sdk.upstream_collector']);
        expect(root.querySelector('thead th[data-pair="datadog_sdk.agents_collector"] .otel-compat__dest').classList).toContain('otel-compat__dest--changed');
        expect(announcement(root)).toBe('Setup 1 now sends data to agents_collector, which works with the datadog_sdk.');
    });

    it('keeps the destination when the new SDK pairs with it', () => {
        const root = render();
        choose(select(root, 'a', 'sdk'), 'datadog_sdk');
        choose(select(root, 'a', 'sdk'), 'otel_sdk');
        expect(shownPairs(root)[0]).toBe('otel_sdk.agents_collector');
        expect(announcement(root)).toBe('');
    });

    it("swaps the setups when one picks the other's setup", () => {
        const root = render();
        // Setup 2 moves to the DDOT SDK, whose only destination makes it the same as setup 1,
        // so setup 1 takes setup 2's previous setup
        choose(select(root, 'b', 'sdk'), 'ddot_sdk');
        expect(shownPairs(root)).toEqual(['otel_sdk.upstream_collector', 'ddot_sdk.ddot_collector']);
    });

    it('marks features that differ, and can hide the rest', () => {
        const root = render();
        choose(select(root, 'a', 'sdk'), 'datadog_sdk');
        const differs = [...root.querySelectorAll('tbody tr.otel-compat__row--differs')].map((tr) => tr.dataset.feature);
        expect(differs).toEqual(['profiler']);
        checkDiff(root);
        const visible = [...root.querySelectorAll('tbody tr')].filter((tr) => !tr.hidden).map((tr) => tr.dataset.feature);
        expect(visible).toEqual(['profiler']);
        expect(root.querySelector('.otel-compat__status').textContent).toBe('');
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
        expect(root.querySelectorAll('thead select')).toHaveLength(2);
        expect(root.querySelector('.otel-compat__diff').hidden).toBe(true);
        expect(root.querySelector('.otel-compat__count').textContent).toBe('Supports 0 of 2 features, 2 not yet documented');
        // The differences filter only applies to compare view
        expect([...root.querySelectorAll('tbody tr')].every((tr) => !tr.hidden)).toBe(true);
        expect(window.location.search).toBe('?compat_view=one&compat_a=ddot_sdk.ddot_collector');
        choose(select(root, 'a', 'sdk'), 'otel_sdk');
        expect(shownPairs(root)).toEqual(['otel_sdk.upstream_collector']);
        expect(root.querySelector('.otel-compat__count').textContent).toBe('Supports 1 of 2 features');
    });

    it('picks a different second setup when compare view starts from the same one', () => {
        const root = render();
        view(root, 'one');
        choose(select(root, 'a', 'sdk'), 'otel_sdk');
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
