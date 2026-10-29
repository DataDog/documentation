// Setup picker and compare view for the otel-compatibility shortcode.
// The shortcode renders the full table; this script only shows, hides, and orders its columns.
// In compare view, it moves the SDK and receiver menus into the two visible column headers.

const PARAMS = { view: 'compat_view', a: 'compat_a', b: 'compat_b' };
const VIEWS = ['compare', 'all'];

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
    if (state.view === 'compare') {
        url.searchParams.set(PARAMS.a, state.a);
        url.searchParams.set(PARAMS.b, state.b);
    } else {
        url.searchParams.delete(PARAMS.a);
        url.searchParams.delete(PARAMS.b);
    }
    window.history.replaceState(window.history.state, '', url);
}

function initOtelCompat(root) {
    const table = root.querySelector('.otel-compat__table');
    const controls = root.querySelector('.otel-compat__controls');
    if (!table || !controls) return;

    const headerRow = table.tHead.rows[0];
    const bodyRows = [...table.tBodies[0].rows];
    const featureRows = bodyRows.filter((row) => row.dataset.feature);
    const holder = controls.querySelector('.otel-compat__holder');

    const headers = new Map([...headerRow.querySelectorAll('th[data-pair]')].map((th) => [th.dataset.pair, th]));
    const pairs = [...headers.values()].map((th) => ({
        id: th.dataset.pair,
        sdk: th.dataset.sdk,
        receiver: th.dataset.receiver,
        confirmed: th.dataset.confirmed !== 'false',
        recommended: th.dataset.recommended === 'true'
    }));
    const pairById = new Map(pairs.map((p) => [p.id, p]));

    // Cells keyed by pair id for the header row and each feature row
    const cellMap = (row) => new Map([...row.cells].filter((cell) => cell.dataset.pair).map((cell) => [cell.dataset.pair, cell]));
    const columnRows = [headerRow, ...featureRows].map((row) => ({ row, cells: cellMap(row) }));
    const cellsByFeatureRow = new Map(columnRows.slice(1).map(({ row, cells }) => [row, cells]));

    // Each slot has an SDK menu and a receiver menu; a menu is a select plus an info tooltip
    const slots = ['a', 'b'].map((key) => {
        const menus = {
            sdk: holder.querySelector(`.otel-compat__menu[data-slot="${key}"][data-role="sdk"]`),
            receiver: holder.querySelector(`.otel-compat__menu[data-slot="${key}"][data-role="receiver"]`)
        };
        return {
            key,
            menus,
            sdk: menus.sdk.querySelector('select'),
            receiver: menus.receiver.querySelector('select')
        };
    });
    const viewInputs = [...controls.querySelectorAll('.otel-compat__view input')];
    const diffInput = controls.querySelector('[data-role="diff"]');
    const status = controls.querySelector('.otel-compat__status');

    // Default compare: the first two recommended setups
    const recommended = pairs.filter((p) => p.recommended);
    const fallbackA = (recommended[0] || pairs[0]).id;
    const fallbackB = (recommended[1] || pairs.find((p) => p.id !== fallbackA) || pairs[0]).id;

    function pairIdOf(slot) {
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
        columnRows.forEach(({ row, cells }) => {
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

    // Put each slot's menus in its column header, in place of the SDK and receiver text
    function placeMenus(pairIds) {
        headers.forEach((th) => {
            th.querySelectorAll('.otel-compat__value').forEach((value) => {
                value.hidden = false;
            });
        });
        slots.forEach((slot) => {
            holder.append(slot.menus.sdk, slot.menus.receiver);
        });
        pairIds.forEach((id, i) => {
            const th = headers.get(id);
            ['sdk', 'receiver'].forEach((role) => {
                const dd = th.querySelector(`[data-field="${role}"] dd`);
                dd.querySelector('.otel-compat__value').hidden = true;
                dd.appendChild(slots[i].menus[role]);
            });
        });
    }

    // Show the one-line description of the selected SDK or receiver in the menu's info tooltip.
    // The site's tooltip script may have moved the tooltip element, so look it up by id.
    function syncDescriptions() {
        slots.forEach((slot) => {
            ['sdk', 'receiver'].forEach((role) => {
                const id = slot.menus[role].querySelector('.tooltip-trigger').getAttribute('aria-describedby');
                const tip = document.getElementById(id);
                if (tip) tip.textContent = slot[role].selectedOptions[0]?.dataset.description || '';
            });
        });
    }

    // Each slot's last pair, so picking the other slot's pair swaps the two
    const current = { a: null, b: null };

    function render(updateUrl = true) {
        const view = currentView();
        const focused = document.activeElement;
        const a = pairIdOf(slots[0]);
        const b = pairIdOf(slots[1]);
        current.a = a;
        current.b = b;

        diffInput.parentElement.hidden = view !== 'compare';
        const shown = view === 'all' ? pairs.filter((p) => p.confirmed).map((p) => p.id) : [a, b];
        showColumns(shown);
        placeMenus(view === 'compare' ? shown : []);
        syncDescriptions();
        // Moving a menu drops its focus, so put focus back for keyboard users
        if (focused && focused !== document.activeElement && root.contains(focused)) focused.focus();

        // In compare view, optionally hide rows where both setups have the same support value
        const filterDiff = view === 'compare' && diffInput.checked;
        let hiddenRows = 0;
        featureRows.forEach((row) => {
            const cells = cellsByFeatureRow.get(row);
            const same = filterDiff && cells.get(a).dataset.support === cells.get(b).dataset.support;
            row.hidden = same;
            if (same) hiddenRows += 1;
        });

        // Hide a section heading when every feature under it is hidden
        let sectionRow = null;
        let sectionHasRows = false;
        bodyRows.forEach((row) => {
            if (!row.dataset.feature) {
                if (sectionRow) sectionRow.hidden = !sectionHasRows;
                sectionRow = row;
                sectionHasRows = false;
            } else if (!row.hidden) {
                sectionHasRows = true;
            }
        });
        if (sectionRow) sectionRow.hidden = !sectionHasRows;

        if (filterDiff && hiddenRows === featureRows.length) {
            status.textContent = 'These setups support the same features.';
        } else if (filterDiff && hiddenRows > 0) {
            status.textContent = `Hiding ${hiddenRows} features that both setups support the same way.`;
        } else {
            status.textContent = '';
        }

        root.dataset.view = view;
        if (updateUrl) writeParams({ view, a, b });
    }

    function onSlotChange(slot) {
        const other = slots.find((s) => s !== slot);
        const previous = current[slot.key];
        if (pairIdOf(slot) === pairIdOf(other) && previous) {
            setSlot(other, previous);
        }
        render();
    }

    // Initial state: URL parameters, then defaults
    const params = readParams();
    const initialView = VIEWS.includes(params.get(PARAMS.view)) ? params.get(PARAMS.view) : 'compare';
    viewInputs.forEach((input) => {
        input.checked = input.value === initialView;
    });
    const initialA = pairById.has(params.get(PARAMS.a)) ? params.get(PARAMS.a) : fallbackA;
    let initialB = pairById.has(params.get(PARAMS.b)) ? params.get(PARAMS.b) : fallbackB;
    if (initialA === initialB) {
        initialB = initialA === fallbackA ? fallbackB : fallbackA;
    }
    setSlot(slots[0], initialA);
    setSlot(slots[1], initialB);

    slots.forEach((slot) => {
        slot.sdk.addEventListener('change', () => {
            syncReceiverOptions(slot);
            onSlotChange(slot);
        });
        slot.receiver.addEventListener('change', () => onSlotChange(slot));
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
