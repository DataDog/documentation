// Setup picker and compare view for the otel-compatibility shortcode.
// The shortcode renders the full table; this script only shows, hides, and orders its columns.

const PARAMS = { view: 'compat_view', a: 'compat_a', b: 'compat_b' };
const VIEWS = ['compare', 'single', 'all'];

function readParams() {
    try {
        return new URLSearchParams(window.location.search);
    } catch (e) {
        return new URLSearchParams();
    }
}

function writeParams(state) {
    const url = new URL(window.location.href);
    url.searchParams.set(PARAMS.view, state.view);
    url.searchParams.set(PARAMS.a, state.a);
    if (state.view === 'compare') {
        url.searchParams.set(PARAMS.b, state.b);
    } else {
        url.searchParams.delete(PARAMS.b);
    }
    window.history.replaceState(window.history.state, '', url);
}

function initOtelCompat(root) {
    const table = root.querySelector('.otel-compat__table');
    const controls = root.querySelector('.otel-compat__controls');
    if (!table || !controls) return;

    const rows = [table.tHead.rows[0], ...table.tBodies[0].rows];
    const pairs = [...rows[0].querySelectorAll('th[data-pair]')].map((th) => ({
        id: th.dataset.pair,
        sdk: th.dataset.sdk,
        receiver: th.dataset.receiver,
        confirmed: th.dataset.confirmed !== 'false',
        recommended: th.dataset.recommended === 'true'
    }));
    const pairById = new Map(pairs.map((p) => [p.id, p]));

    // Cells keyed by pair id for each row, captured in the original column order
    const cellsByRow = rows.map((row) => {
        const map = new Map();
        [...row.cells].forEach((cell) => {
            if (cell.dataset.pair) map.set(cell.dataset.pair, cell);
        });
        return map;
    });

    const slots = ['a', 'b'].map((key) => {
        const fieldset = controls.querySelector(`.otel-compat__setup[data-slot="${key}"]`);
        return {
            key,
            fieldset,
            sdk: fieldset.querySelector('[data-role="sdk"]'),
            receiver: fieldset.querySelector('[data-role="receiver"]')
        };
    });
    const viewInputs = [...controls.querySelectorAll('.otel-compat__view input')];
    const diffInput = controls.querySelector('[data-role="diff"]');
    const status = controls.querySelector('.otel-compat__status');

    // Default compare: the first two recommended setups
    const recommended = pairs.filter((p) => p.recommended);
    const defaults = {
        a: (recommended[0] || pairs[0]).id,
        b: (recommended[1] || pairs.find((p) => p.id !== (recommended[0] || pairs[0]).id) || pairs[0]).id
    };

    function selectedPairId(slot) {
        return `${slot.sdk.value}.${slot.receiver.value}`;
    }

    // Disable receivers that have no pair with the chosen SDK, then move off a disabled choice
    function syncReceiverOptions(slot) {
        let firstValid = null;
        [...slot.receiver.options].forEach((option) => {
            const pair = pairById.get(`${slot.sdk.value}.${option.value}`);
            option.disabled = !pair;
            if (pair && (!firstValid || (pair.confirmed && !firstValid.confirmed))) {
                firstValid = pair;
            }
        });
        if (slot.receiver.selectedOptions[0]?.disabled && firstValid) {
            slot.receiver.value = firstValid.receiver;
        }
    }

    function setSlot(slot, pairId) {
        const pair = pairById.get(pairId);
        if (!pair) return;
        slot.sdk.value = pair.sdk;
        syncReceiverOptions(slot);
        slot.receiver.value = pair.receiver;
    }

    function currentView() {
        const checked = viewInputs.find((input) => input.checked);
        return checked ? checked.value : 'compare';
    }

    function showColumns(pairIds) {
        rows.forEach((row, i) => {
            const cells = cellsByRow[i];
            pairIds.forEach((id) => {
                const cell = cells.get(id);
                cell.hidden = false;
                row.appendChild(cell);
            });
            cells.forEach((cell, id) => {
                if (!pairIds.includes(id)) cell.hidden = true;
            });
        });
    }

    // updateUrl is false on first render, so a plain page visit keeps a clean URL
    function render(updateUrl = true) {
        const view = currentView();
        const a = selectedPairId(slots[0]);
        const b = selectedPairId(slots[1]);
        const messages = [];

        slots[0].fieldset.hidden = view === 'all';
        slots[1].fieldset.hidden = view !== 'compare';
        diffInput.parentElement.hidden = view !== 'compare';

        let shown;
        if (view === 'all') {
            shown = pairs.filter((p) => p.confirmed).map((p) => p.id);
        } else if (view === 'single' || a === b) {
            shown = [a];
            if (view === 'compare') messages.push('Both setups are the same. Pick a different setup to compare.');
        } else {
            shown = [a, b];
        }
        showColumns(shown);

        // In compare view, optionally hide rows where both setups have the same support value
        const filterDiff = view === 'compare' && shown.length === 2 && diffInput.checked;
        let hiddenRows = 0;
        rows.slice(1).forEach((row, i) => {
            const cells = cellsByRow[i + 1];
            const same = filterDiff && cells.get(shown[0]).dataset.support === cells.get(shown[1]).dataset.support;
            row.hidden = same;
            if (same) hiddenRows += 1;
        });
        if (filterDiff && hiddenRows === rows.length - 1) {
            messages.push('These setups support the same features.');
        } else if (filterDiff && hiddenRows > 0) {
            messages.push(`Hiding ${hiddenRows} features that both setups support the same way.`);
        }

        status.textContent = messages.join(' ');
        root.dataset.view = view;
        if (updateUrl) writeParams({ view, a, b });
    }

    // Initial state: URL parameters, then defaults
    const params = readParams();
    const initialView = VIEWS.includes(params.get(PARAMS.view)) ? params.get(PARAMS.view) : 'compare';
    viewInputs.forEach((input) => {
        input.checked = input.value === initialView;
    });
    setSlot(slots[0], pairById.has(params.get(PARAMS.a)) ? params.get(PARAMS.a) : defaults.a);
    setSlot(slots[1], pairById.has(params.get(PARAMS.b)) ? params.get(PARAMS.b) : defaults.b);

    slots.forEach((slot) => {
        slot.sdk.addEventListener('change', () => {
            syncReceiverOptions(slot);
            render();
        });
        slot.receiver.addEventListener('change', () => render());
    });
    viewInputs.forEach((input) => input.addEventListener('change', () => render()));
    diffInput.addEventListener('change', () => render());

    controls.hidden = false;
    root.classList.add('otel-compat--initialized');
    render(false);
}

function initAllOtelCompat() {
    document.querySelectorAll('[data-otel-compat]:not(.otel-compat--initialized)').forEach(initOtelCompat);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllOtelCompat);
} else {
    initAllOtelCompat();
}

export { initAllOtelCompat, initOtelCompat };
