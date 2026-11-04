import { initOtelCompat } from '../components/otel-compatibility';

// A small version of the markup that layouts/shortcodes/otel-compatibility.html renders
const SDKS = ['ddot_sdk', 'datadog_sdk', 'otel_sdk'];
const RECEIVERS = ['ddot_collector', 'upstream_collector', 'agents_collector'];
const PAIRS = [
    { sdk: 'ddot_sdk', receiver: 'ddot_collector', recommended: true },
    { sdk: 'otel_sdk', receiver: 'upstream_collector', recommended: true },
    { sdk: 'datadog_sdk', receiver: 'agents_collector' },
    { sdk: 'otel_sdk', receiver: 'agents_collector' },
    // With this pair, the OpenTelemetry SDK pairs with every receiver
    { sdk: 'otel_sdk', receiver: 'ddot_collector' }
];
// Support per feature, in PAIRS order
const FEATURES = {
    tracing: ['unknown', 'supported', 'supported', 'supported', 'unknown'],
    profiler: ['unknown', 'not_supported', 'supported', 'not_supported', 'not_supported']
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
// A menu's options as { group label: option texts }, or a plain list when it has no groups
const menuOf = (el) => {
    const groups = [...el.querySelectorAll('optgroup')];
    if (!groups.length) return [...el.options].map((o) => o.textContent);
    return Object.fromEntries(groups.map((g) => [g.label, [...g.querySelectorAll('option')].map((o) => o.textContent)]));
};
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
const changed = (root) => [...root.querySelectorAll('.otel-compat__part--changed')].map((el) => el.className.split(' ')[0]);

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

    it('lists every option, grouped by whether it pairs with the other part', () => {
        const root = render();
        expect(menuOf(select(root, 'a', 'sdk'))).toEqual({
            'Works with ddot_collector': ['ddot_sdk (recommended)', 'otel_sdk'],
            'Switches the destination': ['datadog_sdk']
        });
        expect(menuOf(select(root, 'a', 'receiver'))).toEqual({
            'Works with ddot_sdk': ['ddot_collector (recommended)'],
            'Switches the SDK': ['upstream_collector', 'agents_collector']
        });
        expect(menuOf(select(root, 'b', 'sdk'))).toEqual({
            'Works with upstream_collector': ['otel_sdk (recommended)'],
            'Switches the destination': ['ddot_sdk', 'datadog_sdk']
        });
    });

    it('drops the groups when every option pairs with the other part', () => {
        const root = render();
        expect(menuOf(select(root, 'b', 'receiver'))).toEqual(['ddot_collector', 'upstream_collector (recommended)', 'agents_collector']);
    });

    it('swaps only the destination when it pairs with the SDK', () => {
        const root = render();
        choose(select(root, 'b', 'receiver'), 'agents_collector');
        expect(shownPairs(root)).toEqual(['ddot_sdk.ddot_collector', 'otel_sdk.agents_collector']);
        expect(root.querySelector('thead th[data-pair="otel_sdk.agents_collector"] .otel-compat__dest select')).toBe(select(root, 'b', 'receiver'));
        expect(announcement(root)).toBe('');
        expect(changed(root)).toEqual([]);
    });

    it('switches the destination when a new SDK does not pair with it, and says so', () => {
        const root = render();
        choose(select(root, 'a', 'sdk'), 'datadog_sdk');
        expect(shownPairs(root)).toEqual(['datadog_sdk.agents_collector', 'otel_sdk.upstream_collector']);
        expect(changed(root)).toEqual(['otel-compat__dest']);
        expect(announcement(root)).toBe('Setup 1 now sends data to agents_collector, which works with the datadog_sdk.');
    });

    it('switches the SDK when a new destination does not pair with it, and says so', () => {
        const root = render();
        choose(select(root, 'a', 'receiver'), 'agents_collector');
        // The first pair with that receiver, in display order
        expect(shownPairs(root)).toEqual(['datadog_sdk.agents_collector', 'otel_sdk.upstream_collector']);
        expect(changed(root)).toEqual(['otel-compat__sdk']);
        expect(announcement(root)).toBe('Setup 1 now uses the datadog_sdk, which works with agents_collector.');
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

    it('shows one setup in the one-setup view, with the feature label in the corner', () => {
        const root = render();
        checkDiff(root);
        view(root, 'one');
        expect(shownPairs(root)).toEqual(['ddot_sdk.ddot_collector']);
        expect(root.querySelectorAll('thead select')).toHaveLength(2);
        expect(root.querySelector('.otel-compat__diff').hidden).toBe(true);
        expect(root.querySelector('.otel-compat__corner-label').hidden).toBe(false);
        // The differences filter only applies to compare view
        expect([...root.querySelectorAll('tbody tr')].every((tr) => !tr.hidden)).toBe(true);
        expect(window.location.search).toBe('?compat_view=one&compat_a=ddot_sdk.ddot_collector');
        choose(select(root, 'a', 'sdk'), 'otel_sdk');
        expect(shownPairs(root)).toEqual(['otel_sdk.ddot_collector']);
    });

    it('picks a different second setup when compare view starts from the same one', () => {
        const root = render();
        view(root, 'one');
        choose(select(root, 'a', 'receiver'), 'upstream_collector');
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
