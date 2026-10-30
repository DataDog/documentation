import { initOtelCompat } from '../components/otel-compatibility';

// A small version of the markup that layouts/shortcodes/otel-compatibility.html renders
const SDKS = ['ddot_sdk', 'datadog_sdk', 'otel_sdk'];
const RECEIVERS = ['ddot_collector', 'upstream_collector', 'agents_collector', 'otlp_intake'];
const PAIRS = [
    { sdk: 'ddot_sdk', receiver: 'ddot_collector', recommended: true },
    { sdk: 'otel_sdk', receiver: 'upstream_collector', recommended: true },
    { sdk: 'datadog_sdk', receiver: 'agents_collector' },
    { sdk: 'otel_sdk', receiver: 'agents_collector' },
    { sdk: 'ddot_sdk', receiver: 'otlp_intake', confirmed: false }
];
// Support per feature, in PAIRS order
const FEATURES = {
    tracing: ['unknown', 'supported', 'supported', 'supported', 'unknown'],
    profiler: ['unknown', 'not_supported', 'supported', 'not_supported', 'unknown']
};

const id = (p) => `${p.sdk}.${p.receiver}`;
const options = (ids) => ids.map((v) => `<option value="${v}" data-description="About ${v}">${v}</option>`).join('');
const menu = (slot, role, ids) => `
    <span class="otel-compat__menu" data-slot="${slot}" data-role="${role}">
        <select class="otel-compat__select">${options(ids)}</select>
        <span class="tooltip-container"><button class="tooltip-trigger" aria-describedby="tip-${slot}-${role}"></button><span id="tip-${slot}-${role}" class="tooltip-content"></span></span>
    </span>`;
const field = (role, label) => `<div data-field="${role}"><dt>${role}</dt><dd><span class="otel-compat__value">${label}</span></dd></div>`;

function render() {
    const hidden = (p) => (p.confirmed === false ? ' hidden' : '');
    document.body.innerHTML = `
        <div class="otel-compat" data-otel-compat>
            <div class="otel-compat__controls" hidden>
                <fieldset class="otel-compat__view">
                    <label><input type="radio" name="view" value="compare" checked></label>
                    <label><input type="radio" name="view" value="all"></label>
                </fieldset>
                <label><input type="checkbox" data-role="diff"></label>
                <p class="otel-compat__status"></p>
                <div class="otel-compat__holder" hidden>
                    ${['a', 'b'].map((slot) => menu(slot, 'sdk', SDKS) + menu(slot, 'receiver', RECEIVERS)).join('')}
                </div>
            </div>
            <table class="otel-compat__table">
                <thead><tr><th>Feature</th>${PAIRS.map((p) => `
                    <th data-pair="${id(p)}" data-sdk="${p.sdk}" data-receiver="${p.receiver}" data-confirmed="${p.confirmed !== false}" data-recommended="${!!p.recommended}"${hidden(p)}>
                        <dl class="otel-compat__fields">${field('sdk', p.sdk)}${field('receiver', p.receiver)}</dl>
                    </th>`).join('')}
                </tr></thead>
                <tbody>${Object.entries(FEATURES).map(([feature, support]) => `
                    <tr data-feature="${feature}"><th>${feature}</th>${PAIRS.map((p, i) => `
                        <td data-pair="${id(p)}" data-support="${support[i]}"${hidden(p)}></td>`).join('')}
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>`;
    const root = document.querySelector('[data-otel-compat]');
    initOtelCompat(root);
    return root;
}

const shownPairs = (root) => [...root.querySelectorAll('thead th[data-pair]')].filter((th) => !th.hidden).map((th) => th.dataset.pair);
const select = (root, slot, role) => root.querySelector(`.otel-compat__menu[data-slot="${slot}"][data-role="${role}"] select`);
const choose = (el, value) => {
    el.value = value;
    el.dispatchEvent(new Event('change'));
};
const view = (root, value) => {
    const input = root.querySelector(`.otel-compat__view input[value="${value}"]`);
    input.checked = true;
    input.dispatchEvent(new Event('change'));
};

describe('otel-compatibility', () => {
    beforeEach(() => {
        window.history.replaceState(null, '', '/');
    });

    it('compares the two recommended setups by default, with their menus in the headers', () => {
        const root = render();
        expect(shownPairs(root)).toEqual(['ddot_sdk.ddot_collector', 'otel_sdk.upstream_collector']);
        expect(root.querySelector('thead th[data-pair="ddot_sdk.ddot_collector"]').querySelectorAll('select')).toHaveLength(2);
        expect(root.querySelector('.otel-compat__controls').hidden).toBe(false);
        // A plain page visit keeps a clean URL
        expect(window.location.search).toBe('');
    });

    it('disables receivers that have no pair with the chosen SDK', () => {
        const root = render();
        choose(select(root, 'a', 'sdk'), 'datadog_sdk');
        const disabled = [...select(root, 'a', 'receiver').options].filter((o) => o.disabled).map((o) => o.value);
        expect(disabled).toEqual(['ddot_collector', 'upstream_collector', 'otlp_intake']);
        expect(select(root, 'a', 'receiver').value).toBe('agents_collector');
        expect(shownPairs(root)[0]).toBe('datadog_sdk.agents_collector');
    });

    it("swaps the setups when one picks the other's pair", () => {
        const root = render();
        // Setup 2 moves to DDOT SDK, whose first confirmed receiver makes it the same as setup 1,
        // so setup 1 takes setup 2's previous pair
        choose(select(root, 'b', 'sdk'), 'ddot_sdk');
        expect(shownPairs(root)).toEqual(['otel_sdk.upstream_collector', 'ddot_sdk.ddot_collector']);
    });

    it('hides features that both setups support the same way', () => {
        const root = render();
        choose(select(root, 'a', 'sdk'), 'datadog_sdk');
        const diff = root.querySelector('[data-role="diff"]');
        diff.checked = true;
        diff.dispatchEvent(new Event('change'));
        const visible = [...root.querySelectorAll('tbody tr')].filter((tr) => !tr.hidden).map((tr) => tr.dataset.feature);
        expect(visible).toEqual(['profiler']);
        expect(root.querySelector('.otel-compat__status').textContent).toMatch('Hiding 1 features');
    });

    it('shows every confirmed setup in the all view, with no menus in the headers', () => {
        const root = render();
        view(root, 'all');
        expect(shownPairs(root)).toEqual(PAIRS.filter((p) => p.confirmed !== false).map(id));
        expect(root.querySelectorAll('thead select')).toHaveLength(0);
        expect(window.location.search).toBe('?compat_view=all');
    });

    it('restores the setups from the URL', () => {
        window.history.replaceState(null, '', '/?compat_view=compare&compat_a=otel_sdk.agents_collector&compat_b=datadog_sdk.agents_collector');
        const root = render();
        expect(shownPairs(root)).toEqual(['otel_sdk.agents_collector', 'datadog_sdk.agents_collector']);
    });

    it('fills the info tooltips with the selected one-line descriptions', () => {
        const root = render();
        expect(document.getElementById('tip-a-sdk').textContent).toBe('About ddot_sdk');
        choose(select(root, 'a', 'receiver'), 'otlp_intake');
        expect(document.getElementById('tip-a-receiver').textContent).toBe('About otlp_intake');
    });

    it('keeps updating a tooltip that the tooltip script took out of the page', () => {
        const root = render();
        const tip = document.getElementById('tip-a-receiver');
        tip.remove();
        choose(select(root, 'a', 'receiver'), 'otlp_intake');
        expect(tip.textContent).toBe('About otlp_intake');
    });

    it('moves off a receiver that has no pair with the chosen SDK', () => {
        const root = render();
        choose(select(root, 'a', 'receiver'), 'agents_collector');
        expect(select(root, 'a', 'receiver').value).toBe('ddot_collector');
        expect(shownPairs(root)).toEqual(['ddot_sdk.ddot_collector', 'otel_sdk.upstream_collector']);
    });

    it('opens and closes tooltips on keyboard focus', () => {
        const root = render();
        const trigger = root.querySelector('.tooltip-trigger');
        const events = [];
        trigger.addEventListener('mouseenter', () => events.push('enter'));
        trigger.addEventListener('mouseleave', () => events.push('leave'));
        trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        trigger.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
        expect(events).toEqual(['enter', 'leave', 'leave']);
    });
});
