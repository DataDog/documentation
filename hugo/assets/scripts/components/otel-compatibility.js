// Compare and one-setup views for the otel-compatibility shortcode.
// The shortcode renders the full table; this script only shows, hides, and orders its columns.
// Each shown column gets an SDK menu and a destination menu, so readers can swap one part at a time.
// layouts/partials/footer-scripts.html loads it only on pages that use the shortcode.

const PARAMS = { view: 'compat_view', a: 'compat_a', b: 'compat_b' };
const VIEWS = ['compare', 'one'];

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

    const holder = controls.querySelector('.otel-compat__holder');
    const headerRow = table.tHead.rows[0];
    const featureRows = [...table.tBodies[0].rows];
    const footerRow = table.tFoot ? table.tFoot.rows[0] : null;

    const headers = new Map([...headerRow.querySelectorAll('th[data-pair]')].map((th) => [th.dataset.pair, th]));
    const pairs = [...headers.values()].map((th) => ({
        id: th.dataset.pair,
        sdk: th.dataset.sdk,
        receiver: th.dataset.receiver,
        recommended: th.dataset.recommended === 'true'
    }));
    const pairIds = pairs.map((p) => p.id);
    const pairById = new Map(pairs.map((p) => [p.id, p]));
    const recommended = pairIds.filter((id) => pairById.get(id).recommended);

    // Cells keyed by pair id, for every row that has one cell per setup
    const cellMap = (row) => new Map([...row.cells].filter((cell) => cell.dataset.pair).map((cell) => [cell.dataset.pair, cell]));
    const columnRows = [headerRow, ...featureRows, footerRow].filter(Boolean).map((row) => ({ row, cells: cellMap(row) }));
    const cellsByFeatureRow = new Map(featureRows.map((row) => [row, cellMap(row)]));

    const slots = ['a', 'b'].map((key) => ({
        key,
        name: key === 'a' ? 'Setup 1' : 'Setup 2',
        sdk: holder.querySelector(`select[data-slot="${key}"][data-role="sdk"]`),
        receiver: holder.querySelector(`select[data-slot="${key}"][data-role="receiver"]`)
    }));
    // Every destination, in menu order. Each SDK change refills a destination menu with the ones that pair with it.
    const receiverLabels = new Map([...slots[0].receiver.options].map((option) => [option.value, option.textContent]));
    const sdkLabels = new Map([...slots[0].sdk.options].map((option) => [option.value, option.textContent]));

    const viewInputs = [...controls.querySelectorAll('.otel-compat__view input')];
    const status = controls.querySelector('.otel-compat__status');
    const announce = controls.querySelector('[data-role="announce"]');
    const corner = headerRow.querySelector('.otel-compat__feature-col');
    const cornerLabel = corner.querySelector('.otel-compat__corner-label');
    const diffLabel = corner.querySelector('.otel-compat__diff');
    const diffInput = diffLabel.querySelector('input');
    const count = corner.querySelector('.otel-compat__count');

    // Default compare: the first two recommended setups
    const fallbackA = recommended[0] || pairIds[0];
    const fallbackB = recommended.find((id) => id !== fallbackA) || pairIds.find((id) => id !== fallbackA) || fallbackA;
    const otherThan = (id) => [fallbackA, fallbackB, ...pairIds].find((p) => p !== id) || id;

    function currentView() {
        const checked = viewInputs.find((input) => input.checked);
        return checked ? checked.value : 'compare';
    }

    function pairIdOf(slot) {
        return `${slot.sdk.value}.${slot.receiver.value}`;
    }

    // Offer only destinations that pair with the slot's SDK, and keep the current one if it still does
    function fillReceivers(slot) {
        const sdk = slot.sdk.value;
        const valid = [...receiverLabels.keys()].filter((id) => pairById.has(`${sdk}.${id}`));
        const keep = valid.includes(slot.receiver.value) ? slot.receiver.value : valid[0];
        slot.receiver.textContent = '';
        slot.receiver.append(
            ...valid.map((id) => {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = receiverLabels.get(id) + (pairById.get(`${sdk}.${id}`).recommended ? ' (recommended)' : '');
                return option;
            })
        );
        slot.receiver.value = keep;
    }

    function setSlot(slot, pairId) {
        const pair = pairById.get(pairId);
        if (!pair) return;
        slot.sdk.value = pair.sdk;
        fillReceivers(slot);
        slot.receiver.value = pair.receiver;
    }

    function showColumns(ids) {
        columnRows.forEach(({ row, cells }) => {
            ids.forEach((id) => {
                const cell = cells.get(id);
                cell.hidden = false;
                row.appendChild(cell);
            });
            cells.forEach((cell, id) => {
                if (!ids.includes(id)) cell.hidden = true;
            });
        });
    }

    // Put each slot's menus over the SDK and destination labels in the header of the column it shows
    function placeMenus(ids) {
        headers.forEach((th) => th.querySelector('.otel-compat__visual').classList.remove('otel-compat__visual--menu'));
        slots.forEach((slot) => holder.append(slot.sdk, slot.receiver));
        ids.forEach((id, i) => {
            const visual = headers.get(id).querySelector('.otel-compat__visual');
            visual.classList.add('otel-compat__visual--menu');
            visual.querySelector('.otel-compat__sdk').appendChild(slots[i].sdk);
            visual.querySelector('.otel-compat__dest').appendChild(slots[i].receiver);
        });
    }

    function countText(id) {
        const support = featureRows.map((row) => cellsByFeatureRow.get(row).get(id).dataset.support);
        const supported = support.filter((s) => s === 'supported' || s === 'partial').length;
        const unknown = support.filter((s) => s === 'unknown').length;
        const text = `Supports ${supported} of ${support.length} features`;
        return unknown ? `${text}, ${unknown} not yet documented` : text;
    }

    // Each slot's last setup, so picking the other slot's setup swaps the two
    const current = { a: null, b: null };

    function render(updateUrl = true) {
        const view = currentView();
        const compare = view === 'compare';
        const focused = document.activeElement;
        // Coming from the one-setup view, the second setup may match the first
        if (compare && pairIdOf(slots[1]) === pairIdOf(slots[0])) {
            setSlot(slots[1], otherThan(pairIdOf(slots[0])));
        }
        const a = pairIdOf(slots[0]);
        const b = pairIdOf(slots[1]);
        current.a = a;
        current.b = b;
        const shown = compare ? [a, b] : [a];

        root.dataset.view = view;
        showColumns(shown);
        placeMenus(shown);
        // Moving a menu drops its focus, so put focus back for keyboard users
        if (focused && focused !== document.activeElement && root.contains(focused)) focused.focus();

        // In compare view, mark rows where the setups differ, and optionally hide rows where they match.
        // A row with an undocumented cell isn't marked, since it may not differ, but it isn't hidden either.
        const filterDiff = compare && diffInput.checked;
        let hiddenRows = 0;
        featureRows.forEach((row) => {
            const cells = cellsByFeatureRow.get(row);
            const support = compare ? [cells.get(a).dataset.support, cells.get(b).dataset.support] : [];
            const same = compare && support[0] === support[1];
            row.classList.toggle('otel-compat__row--differs', compare && !same && !support.includes('unknown'));
            row.hidden = filterDiff && same;
            if (row.hidden) hiddenRows += 1;
        });

        cornerLabel.hidden = true;
        diffLabel.hidden = !compare;
        count.hidden = compare;
        count.textContent = compare ? '' : countText(a);

        // Explain an empty table; otherwise the filtered rows speak for themselves
        status.textContent = filterDiff && hiddenRows === featureRows.length ? 'These setups support the same features.' : '';

        if (updateUrl) writeParams({ view, a, b });
    }

    function onSlotChange(slot, role) {
        const before = slot.receiver.value;
        if (role === 'sdk') fillReceivers(slot);
        const moved = slot.receiver.value !== before;
        const other = slots.find((s) => s !== slot);
        if (currentView() === 'compare' && pairIdOf(slot) === pairIdOf(other) && current[slot.key]) {
            setSlot(other, current[slot.key]);
        }
        announce.textContent = '';
        render();
        // A new SDK can force a new destination. Point that out, since the reader didn't pick it.
        if (moved) {
            const dest = headers.get(pairIdOf(slot)).querySelector('.otel-compat__dest');
            dest.classList.remove('otel-compat__dest--changed');
            void dest.offsetWidth; // restart the highlight if it's still running
            dest.classList.add('otel-compat__dest--changed');
            announce.textContent = `${slot.name} now sends data to ${receiverLabels.get(slot.receiver.value)}, which works with the ${sdkLabels.get(slot.sdk.value)}.`;
        }
    }

    // Initial state: URL parameters, then defaults
    const params = readParams();
    const initialView = VIEWS.includes(params.get(PARAMS.view)) ? params.get(PARAMS.view) : 'compare';
    viewInputs.forEach((input) => {
        input.checked = input.value === initialView;
    });
    setSlot(slots[0], pairById.has(params.get(PARAMS.a)) ? params.get(PARAMS.a) : fallbackA);
    setSlot(slots[1], pairById.has(params.get(PARAMS.b)) ? params.get(PARAMS.b) : fallbackB);

    slots.forEach((slot) => {
        slot.sdk.addEventListener('change', () => onSlotChange(slot, 'sdk'));
        slot.receiver.addEventListener('change', () => onSlotChange(slot, 'receiver'));
    });
    viewInputs.forEach((input) => input.addEventListener('change', () => render()));
    diffInput.addEventListener('change', () => render());
    root.addEventListener('animationend', (event) => event.target.classList.remove('otel-compat__dest--changed'));

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
