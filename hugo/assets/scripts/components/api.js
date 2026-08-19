import Tab from 'bootstrap/js/dist/tab';
import { bodyClassContains } from '../helpers/helpers';
import { setSidenavMaxHeight } from '../datadog-docs';

const versionSelect = document.querySelector('.js-api-version-select');
const expandAllToggles = document.querySelectorAll('.js-expand-all');
const modelToggles = document.querySelectorAll('.js-model-link');
const exampleToggles = document.querySelectorAll('.js-example-link');
const childCollapseToggles = document.querySelectorAll('.hasChildData .js-collapse-trigger');
const versionTabToggles = document.querySelectorAll('.toggle-version-tab');
const dataVersionToggles = document.querySelectorAll('a[data-version^="v"]');

function versionSelectHandler(event) {
    let previewPath = '';

    if (window.location.href.includes('docs-staging')) {
        previewPath = `/${document.documentElement.dataset.commitRef}`;
    }

    if (event.target.value === 'v2') {
        // check if on main /api page
        if (window.location.href === `${window.location.origin + previewPath}/api/`) {
            window.location = `${window.location.origin + previewPath}/api/v2`;
        } else {
            // check if page exists on v2
            fetch(`${window.location.href.replace('api/v1', 'api/v2')}`)
                .then((response) => {
                    // redirect to v2 page
                    if (response.status === 404) {
                        window.location = `${window.location.origin + previewPath}/api/v2`;
                    } else {
                        window.location = `${window.location.href.replace('api/v1', 'api/v2')}`;
                    }
                })
                .catch((err) => {
                    console.log(err); // eslint-disable-line
                    // redirect to main v2 overview page
                    window.location = `${window.location.origin + previewPath}/api/v2`;
                });
        }
    } else if (event.target.value === 'v1') {
        // check if page exists on v1

        fetch(`${window.location.href.replace('api/v2', 'api/v1')}`)
            .then((response) => {
                // redirect to v2 page
                if (response.status === 404) {
                    window.location = `${window.location.origin + previewPath}/api/v1`;
                } else {
                    window.location = `${window.location.href.replace('api/v2', 'api/v1')}`;
                }
            })
            .catch((err) => {
                // redirect to main v2 overview page
                console.log(err); // eslint-disable-line
                window.location = `${window.location.origin + previewPath}/api/v1`;
            });
    }
}

if (versionSelect) {
    versionSelect.addEventListener('change', versionSelectHandler);
}

if (expandAllToggles.length) {
    expandAllToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('expanded');

            const schemaTable = toggle.closest('.schema-table');
            const nestedElements = schemaTable?.querySelectorAll('.isNested');
            const toggleElements = schemaTable?.querySelectorAll('.toggle-arrow');

            if (schemaTable && toggle.classList.contains('expanded')) {
                toggle.textContent = 'Collapse All';

                if (nestedElements.length) {
                    nestedElements.forEach((element) => {
                        element.classList.remove('d-none');
                    });
                }

                if (toggleElements.length) {
                    toggleElements.forEach((element) => {
                        element.classList.add('expanded');
                    });
                }
            } else if (schemaTable) {
                toggle.textContent = 'Expand All';

                if (nestedElements.length) {
                    nestedElements.forEach((element) => {
                        element.classList.add('d-none');
                    });
                }

                if (toggleElements.length) {
                    toggleElements.forEach((element) => {
                        element.classList.remove('expanded');
                    });
                }
            }
        });
    });
}

if (modelToggles.length && exampleToggles.length) {
    modelToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            toggle.closest('.tab-content').querySelector('.js-example-link').classList.remove('active');
            toggle.closest('.tab-content').querySelector('.js-tab-example').classList.remove('active');
            toggle.classList.add('active');
            toggle.closest('.tab-content').querySelector('.js-tab-model').classList.add('active');
        });
    });

    exampleToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            toggle.closest('.tab-content').querySelector('.js-model-link').classList.remove('active');
            toggle.closest('.tab-content').querySelector('.js-tab-model').classList.remove('active');
            toggle.classList.add('active');
            toggle.closest('.tab-content').querySelector('.js-tab-example').classList.add('active');
        });
    });
}

if (childCollapseToggles.length) {
    childCollapseToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const row = toggle.closest('.row');
            const nestedSiblings = [...row.parentNode.children].filter(
                (child) => child !== row && child.classList.contains('isNested')
            );

            if (nestedSiblings.length) {
                nestedSiblings.forEach((element) => {
                    element.classList.toggle('d-none');
                });
            }

            toggle.querySelector('.toggle-arrow').classList.toggle('expanded');
        });
    });
}

if (versionTabToggles.length) {
    versionTabToggles.forEach((toggle) => {
        const url = toggle.getAttribute('href');
        const el = document.querySelector(`a[href="${url}"]`);

        if (el) {
            const tab = new Tab(el);
            tab.show();
        }

        return false;
    });
}

// toggle version from nav
if (dataVersionToggles.length) {
    dataVersionToggles.forEach((toggle) => {
        const version = toggle.getAttribute('data-version');
        const href = toggle.getAttribute('href');
        const url = `${href}-${version}`;
        const el = document.querySelector(`a[href="${url}"]`);
        if (el) {
            const tab = new Tab(el);
            tab.show();
        }
    });
}

// API changelog filter bar (/api/changelog)
const changelogRoot = document.querySelector('.api-changelog');

if (changelogRoot) {
    const filterTabs = changelogRoot.querySelectorAll('[data-changelog-filter]');
    const productSelect = document.getElementById('api-changelog-product-filter');
    const versionSelect = document.getElementById('api-changelog-version-filter');
    const versionSections = changelogRoot.querySelectorAll('.api-changelog-version');
    const shownCountEl = document.getElementById('api-changelog-shown-count');
    const versionCountEl = document.getElementById('api-changelog-version-count');
    const clearButtons = document.querySelectorAll('#api-changelog-clear-filters, [data-changelog-reset]');
    const emptyState = document.getElementById('api-changelog-empty-state');

    let activeBucket = 'all';
    let activeProduct = 'all';
    let activeVersionFloor = 'all';

    function applyChangelogFilters() {
        let shownCount = 0;
        let shownVersionCount = 0;

        versionSections.forEach((section) => {
            const versionHidden = activeVersionFloor !== 'all' && section.dataset.version < activeVersionFloor;
            let visibleInSection = 0;
            let breakingInSection = 0;

            section.querySelectorAll('.api-changelog-entry').forEach((entry) => {
                const matches = !versionHidden
                    && (activeBucket === 'all' || entry.dataset.bucket === activeBucket)
                    && (activeProduct === 'all' || entry.dataset.tag === activeProduct);
                entry.classList.toggle('d-none', !matches);

                if (matches) {
                    visibleInSection += 1;
                    if (entry.dataset.type === 'breaking') breakingInSection += 1;
                }
            });

            section.classList.toggle('d-none', visibleInSection === 0);

            const breakingBadge = section.querySelector('[data-breaking-badge]');
            if (breakingBadge) {
                breakingBadge.classList.toggle('d-none', breakingInSection === 0);
                breakingBadge.textContent = `${breakingInSection} breaking ${breakingInSection === 1 ? 'change' : 'changes'}`;
            }

            if (visibleInSection > 0) shownVersionCount += 1;
            shownCount += visibleInSection;
        });

        if (shownCountEl) shownCountEl.textContent = shownCount;
        if (versionCountEl) versionCountEl.textContent = shownVersionCount;
        if (emptyState) emptyState.classList.toggle('d-none', shownCount !== 0);

        const isFiltered = activeBucket !== 'all' || activeProduct !== 'all' || activeVersionFloor !== 'all';
        clearButtons.forEach((button) => {
            if (button.id === 'api-changelog-clear-filters') button.classList.toggle('d-none', !isFiltered);
        });
    }

    filterTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            activeBucket = tab.dataset.changelogFilter;
            filterTabs.forEach((t) => t.classList.toggle('is-active', t === tab));
            applyChangelogFilters();
        });
    });

    if (productSelect) {
        productSelect.addEventListener('change', () => {
            activeProduct = productSelect.value;
            applyChangelogFilters();
        });
    }

    if (versionSelect) {
        versionSelect.addEventListener('change', () => {
            activeVersionFloor = versionSelect.value;
            applyChangelogFilters();
        });
    }

    clearButtons.forEach((button) => {
        button.addEventListener('click', () => {
            activeBucket = 'all';
            activeProduct = 'all';
            activeVersionFloor = 'all';
            filterTabs.forEach((t) => t.classList.toggle('is-active', t.dataset.changelogFilter === 'all'));
            if (productSelect) productSelect.value = 'all';
            if (versionSelect) versionSelect.value = 'all';
            applyChangelogFilters();
        });
    });
}

// Date-based per-operation API version control (x-datadog-api-versioning)
const apiVersionQueryParameter = 'datadog-api-version';

function getRequestedApiVersion(block) {
    const { apiMajorVersion, versions } = block.dataset;
    const requestedVersion = new URLSearchParams(window.location.search).get(apiVersionQueryParameter);
    const prefix = `${apiMajorVersion}-`;

    if (!requestedVersion || !apiMajorVersion || !requestedVersion.startsWith(prefix)) return null;

    const dateVersion = requestedVersion.slice(prefix.length);
    return versions.split(',').includes(dateVersion) ? dateVersion : null;
}

function setRequestedApiVersion(block, version) {
    const { apiMajorVersion } = block.dataset;
    if (!apiMajorVersion) return;

    const url = new URL(window.location.href);
    url.searchParams.set(apiVersionQueryParameter, `${apiMajorVersion}-${version}`);
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
}

function daysUntil(dateStr) {
    if (!dateStr) return null;
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.round((new Date(dateStr) - new Date()) / msPerDay);
}

// Reads a version's { deprecated, eol } off the block's data-version-meta
// JSON blob and derives escalation state for the lifecycle pill.
function getVersionLifecycle(block, version) {
    let meta = {};
    try {
        meta = JSON.parse(block.dataset.versionMeta || '{}');
    } catch (err) {
        meta = {};
    }
    const entry = meta[version] || {};
    const remaining = daysUntil(entry.eol);
    const eolPast = remaining !== null && remaining < 0;
    const eolSoon = remaining !== null && remaining >= 0 && remaining <= 90;
    return {
        deprecated: !!entry.deprecated,
        eol: entry.eol || '',
        eolPast,
        urgent: eolPast || eolSoon,
    };
}

const apiVersionBlocks = document.querySelectorAll('.api-version-block');

// Applies `version` to an operation and updates
// every piece of UI that reflects it: the chip, dropdown selection, and the
// underlying versioned panes / curl header.
function applyApiVersion(operationId, version) {
    const block = document.querySelector(`.api-version-block[data-operation-id="${operationId}"]`);
    if (!block) return;
    const { latestVersion } = block.dataset;
    const isLatest = version === latestVersion;
    const lifecycle = getVersionLifecycle(block, version);

    const label = block.querySelector('.js-api-version-label');
    if (label) label.textContent = version;

    const dot = block.querySelector('.js-api-version-dot');
    if (dot) {
        dot.classList.toggle('api-version-dot-green', isLatest);
        dot.classList.toggle('api-version-dot-amber', !isLatest);
    }

    const chipPill = block.querySelector('.js-api-version-chip-pill');
    if (chipPill) {
        chipPill.classList.toggle('d-none', !lifecycle.deprecated);
        chipPill.classList.toggle('is-urgent', lifecycle.urgent);
        chipPill.textContent = lifecycle.eolPast ? 'End of life' : 'Deprecated';
    }

    const toggle = block.querySelector('.js-api-version-toggle');
    if (toggle) {
        toggle.classList.toggle('is-deprecated', lifecycle.deprecated);
    }

    block.querySelectorAll('.js-api-version-item').forEach((item) => {
        const selected = item.dataset.apiDateVersion === version;
        item.classList.toggle('active', selected);
        const check = item.querySelector('.js-api-version-check');
        if (check) check.classList.toggle('d-none', !selected);
    });

    document.querySelectorAll(`.api-versioned-pane[data-operation-id="${operationId}"]`).forEach((pane) => {
        pane.classList.toggle('d-none', pane.dataset.apiDateVersion !== version);
    });
    document.querySelectorAll(`.api-version-header-value[data-operation-id="${operationId}"]`).forEach((el) => {
        el.textContent = version;
    });
}

if (apiVersionBlocks.length) {
    apiVersionBlocks.forEach((block) => {
        const { operationId } = block.dataset;
        const requestedVersion = getRequestedApiVersion(block);
        if (requestedVersion) applyApiVersion(operationId, requestedVersion);
    });

    // Dropdown open/close is handled by Bootstrap's own dropdown component
    // (data-bs-toggle="dropdown"); only selection needs custom wiring.
    document.addEventListener('click', (e) => {
        const item = e.target.closest('.js-api-version-item');
        if (!item) return;
        e.preventDefault();
        const { apiDateVersion: version } = item.dataset;
        const selectedBlock = item.closest('.api-version-block');
        setRequestedApiVersion(selectedBlock, version);

        // A page-level version query can apply to more than one operation. Keep
        // every compatible selector in sync so reloading a copied URL produces
        // exactly the same view.
        apiVersionBlocks.forEach((block) => {
            const { operationId: blockOperationId, versions } = block.dataset;
            if (versions.split(',').includes(version)) applyApiVersion(blockOperationId, version);
        });
    });
}


// Scroll the active top level nav item into view below Docs search input
if (bodyClassContains('api')) {
    setSidenavMaxHeight();

    const apiSideNav = document.querySelector('.sidenav-api .sidenav-nav');
    const sideNavActiveMenuItem = apiSideNav.querySelector('li.active');
    if (sideNavActiveMenuItem) {
        const distanceToTop = sideNavActiveMenuItem.offsetTop;
        apiSideNav.scrollTop = distanceToTop - 110;
    }
}
