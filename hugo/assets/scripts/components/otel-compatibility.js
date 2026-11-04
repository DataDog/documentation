// Compare and one-setup views for the otel-compatibility shortcode.
// The shortcode renders the full table; this script only shows, hides, and orders its columns.
// Each shown column gets an SDK menu and a destination menu, so readers can swap one part at a time.
// Both menus list every option. Picking one that doesn't pair with the other part switches that part.
// layouts/partials/footer-scripts.html loads it only on pages that use the shortcode.

const PARAMS = { view: 'compat_view', a: 'compat_a', b: 'compat_b' };
const VIEWS = ['compare', 'one'];
const ROLES = ['sdk', 'receiver'];

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

    // Pairs in display order, which puts recommended setups first
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
    const pairOf = (sdk, receiver) => pairById.get(`${sdk}.${receiver}`);

    // Cells keyed by pair id, for every row that has one cell per setup
    const cellMap = (row) => new Map([...row.cells].filter((cell) => cell.dataset.pair).map((cell) => [cell.dataset.pair, cell]));
    const columnRows = [headerRow, ...featureRows, footerRow].filter(Boolean).map((row) => ({ row, cells: cellMap(row) }));
    const cellsByFeatureRow = new Map(featureRows.map((row) => [row, cellMap(row)]));

    // Each slot keeps its SDK and receiver here; its menus are rebuilt from this state
    const slots = ['a', 'b'].map((key) => {
        const menus = {};
        ROLES.forEach((role) => {
            menus[role] = holder.querySelector(`select[data-slot="${key}"][data-role="${role}"]`);
        });
        return { key, name: key === 'a' ? 'Setup 1' : 'Setup 2', menus, sdk: null, receiver: null };
    });
    // Every SDK and receiver the menus offer, in menu order, with their labels
    const labels = {};
    ROLES.forEach((role) => {
        labels[role] = new Map([...slots[0].menus[role].options].map((option) => [option.value, option.textContent]));
    });

    const viewInputs = [...controls.querySelectorAll('.otel-compat__view input')];
    const status = controls.querySelector('.otel-compat__status');
    const announce = controls.querySelector('[data-role="announce"]');
    const corner = headerRow.querySelector('.otel-compat__feature-col');
    const cornerLabel = corner.querySelector('.otel-compat__corner-label');
    const diffLabel = corner.querySelector('.otel-compat__diff');
    const diffInput = diffLabel.querySelector('input');

    // Default compare: the first two recommended setups
    const fallbackA = recommended[0] || pairIds[0];
    const fallbackB = recommended.find((id) => id !== fallbackA) || pairIds.find((id) => id !== fallbackA) || fallbackA;
    const otherThan = (id) => [fallbackA, fallbackB, ...pairIds].find((p) => p !== id) || id;

    function currentView() {
        const checked = viewInputs.find((input) => input.checked);
        return checked ? checked.value : 'compare';
    }

    const pairIdOf = (slot) => `${slot.sdk}.${slot.receiver}`;
    const otherRole = (role) => (role === 'sdk' ? 'receiver' : 'sdk');
    // The pair an SDK or receiver makes with the slot's other part, if any
    const pairWith = (slot, role, value) => (role === 'sdk' ? pairOf(value, slot.receiver) : pairOf(slot.sdk, value));

    function option(value, text) {
        const el = document.createElement('option');
        el.value = value;
        el.textContent = text;
        return el;
    }

    // List every option, grouped by whether it pairs with the slot's other part.
    // With nothing to switch to, the menu has no groups.
    function fillMenu(slot, role) {
        const menu = slot.menus[role];
        const other = otherRole(role);
        const works = [];
        const switches = [];
        labels[role].forEach((label, value) => {
            const pair = pairWith(slot, role, value);
            if (pair) {
                works.push(option(value, label + (pair.recommended ? ' (recommended)' : '')));
            } else {
                switches.push(option(value, label));
            }
        });
        menu.textContent = '';
        if (switches.length) {
            const group = (label, items) => {
                const el = document.createElement('optgroup');
                el.label = label;
                el.append(...items);
                return el;
            };
            const otherLabel = labels[other].get(slot[other]);
            menu.append(group(`Works with ${otherLabel}`, works), group(role === 'sdk' ? 'Switches the destination' : 'Switches the SDK', switches));
        } else {
            menu.append(...works);
        }
        menu.value = slot[role];
    }

    function fillMenus(slot) {
        ROLES.forEach((role) => fillMenu(slot, role));
    }

    function setSlot(slot, pairId) {
        const pair = pairById.get(pairId);
        if (!pair) return;
        slot.sdk = pair.sdk;
        slot.receiver = pair.receiver;
        fillMenus(slot);
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
        slots.forEach((slot) => holder.append(slot.menus.sdk, slot.menus.receiver));
        ids.forEach((id, i) => {
            const visual = headers.get(id).querySelector('.otel-compat__visual');
            visual.classList.add('otel-compat__visual--menu');
            visual.querySelector('.otel-compat__sdk').appendChild(slots[i].menus.sdk);
            visual.querySelector('.otel-compat__dest').appendChild(slots[i].menus.receiver);
        });
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

        cornerLabel.hidden = compare;
        diffLabel.hidden = !compare;

        // Explain an empty table; otherwise the filtered rows speak for themselves
        status.textContent = filterDiff && hiddenRows === featureRows.length ? 'These setups support the same features.' : '';

        if (updateUrl) writeParams({ view, a, b });
    }

    // The part the reader picked wins. If it doesn't pair with the other part, the other part
    // moves to the first one that does, in display order.
    function onMenuChange(slot, role) {
        const other = otherRole(role);
        slot[role] = slot.menus[role].value;
        let switched = false;
        if (!pairOf(slot.sdk, slot.receiver)) {
            slot[other] = pairs.find((p) => p[role] === slot[role])[other];
            switched = true;
        }
        const otherSlot = slots.find((s) => s !== slot);
        if (currentView() === 'compare' && pairIdOf(slot) === pairIdOf(otherSlot) && current[slot.key]) {
            setSlot(otherSlot, current[slot.key]);
        }
        fillMenus(slot);
        announce.textContent = '';
        render();
        // Point out the part the reader didn't pick
        if (switched) {
            const part = headers.get(pairIdOf(slot)).querySelector(other === 'sdk' ? '.otel-compat__sdk' : '.otel-compat__dest');
            part.classList.remove('otel-compat__part--changed');
            void part.offsetWidth; // restart the highlight if it's still running
            part.classList.add('otel-compat__part--changed');
            const sdk = labels.sdk.get(slot.sdk);
            const receiver = labels.receiver.get(slot.receiver);
            announce.textContent =
                other === 'sdk'
                    ? `${slot.name} now uses the ${sdk}, which works with ${receiver}.`
                    : `${slot.name} now sends data to ${receiver}, which works with the ${sdk}.`;
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
        ROLES.forEach((role) => slot.menus[role].addEventListener('change', () => onMenuChange(slot, role)));
    });
    viewInputs.forEach((input) => input.addEventListener('change', () => render()));
    diffInput.addEventListener('change', () => render());
    root.addEventListener('animationend', (event) => event.target.classList.remove('otel-compat__part--changed'));

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
