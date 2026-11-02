// Compare and one-setup views for the otel-compatibility shortcode.
// The shortcode renders the full table; this script only shows, hides, and orders its columns.
// It moves each setup menu into the header of the column that menu shows.
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
    const pairIds = [...headers.keys()];
    const recommended = pairIds.filter((id) => headers.get(id).dataset.recommended === 'true');

    // Cells keyed by pair id, for every row that has one cell per setup
    const cellMap = (row) => new Map([...row.cells].filter((cell) => cell.dataset.pair).map((cell) => [cell.dataset.pair, cell]));
    const columnRows = [headerRow, ...featureRows, footerRow].filter(Boolean).map((row) => ({ row, cells: cellMap(row) }));
    const cellsByFeatureRow = new Map(featureRows.map((row) => [row, cellMap(row)]));

    const selects = ['a', 'b'].map((key) => holder.querySelector(`select[data-slot="${key}"]`));
    const viewInputs = [...controls.querySelectorAll('.otel-compat__view input')];
    const status = controls.querySelector('.otel-compat__status');
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

    // Put each menu in the header of the column it shows, over that column's label
    function placeMenus(ids) {
        headers.forEach((th) => th.querySelector('.otel-compat__visual').classList.remove('otel-compat__visual--menu'));
        selects.forEach((select) => holder.appendChild(select));
        ids.forEach((id, i) => {
            const visual = headers.get(id).querySelector('.otel-compat__visual');
            visual.classList.add('otel-compat__visual--menu');
            visual.appendChild(selects[i]);
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
        // Coming from the one-setup view, the second menu may match the first
        if (compare && selects[1].value === selects[0].value) {
            selects[1].value = otherThan(selects[0].value);
        }
        const a = selects[0].value;
        const b = selects[1].value;
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

        if (filterDiff && hiddenRows === featureRows.length) {
            status.textContent = 'These setups support the same features.';
        } else if (filterDiff && hiddenRows > 0) {
            status.textContent = `Hiding ${hiddenRows} features that both setups support the same way.`;
        } else {
            status.textContent = '';
        }

        if (updateUrl) writeParams({ view, a, b });
    }

    function onSelectChange(i) {
        const key = i === 0 ? 'a' : 'b';
        const other = selects[1 - i];
        if (currentView() === 'compare' && selects[i].value === other.value && current[key]) {
            other.value = current[key];
        }
        render();
    }

    // Initial state: URL parameters, then defaults
    const params = readParams();
    const initialView = VIEWS.includes(params.get(PARAMS.view)) ? params.get(PARAMS.view) : 'compare';
    viewInputs.forEach((input) => {
        input.checked = input.value === initialView;
    });
    selects[0].value = headers.has(params.get(PARAMS.a)) ? params.get(PARAMS.a) : fallbackA;
    selects[1].value = headers.has(params.get(PARAMS.b)) ? params.get(PARAMS.b) : fallbackB;

    selects.forEach((select, i) => select.addEventListener('change', () => onSelectChange(i)));
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
