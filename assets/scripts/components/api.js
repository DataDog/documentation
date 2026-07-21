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

// Date-based per-operation API version control (x-datadog-api-versioning)
function apiVersionStorageKey(operationId) {
    return `api-version-override:${operationId}`;
}

const API_GLOBAL_VERSION_STORAGE_KEY = 'api-global-version';

function resolveVersionFromGlobal(versionsCsv, global) {
    const versions = versionsCsv.split(',').filter(Boolean);
    let resolved = versions[0];
    versions.forEach((v) => {
        if (v <= global) resolved = v;
    });
    return resolved;
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
const apiGlobalVersionToggle = document.querySelector('.js-api-global-version-toggle');
const apiGlobalVersionCurrent = document.querySelector('.js-api-global-version-current');

function getGlobalVersion() {
    if (apiGlobalVersionToggle) return apiGlobalVersionToggle.dataset.value || null;
    try {
        return window.localStorage.getItem(API_GLOBAL_VERSION_STORAGE_KEY);
    } catch (err) {
        return null;
    }
}

function setGlobalVersionButton(version) {
    if (apiGlobalVersionToggle) apiGlobalVersionToggle.dataset.value = version;
    if (apiGlobalVersionCurrent) apiGlobalVersionCurrent.textContent = version;
    document.querySelectorAll('.js-api-global-version-item').forEach((item) => {
        item.classList.toggle('active', item.dataset.value === version);
    });
}

// Applies `version` as the resolved version for an operation and updates
// every piece of UI that reflects it: the chip, dropdown selection, and the
// underlying versioned panes / curl header.
function applyApiVersion(operationId, version, isOverride) {
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
        toggle.classList.toggle('is-overridden', isOverride);
        toggle.classList.toggle('is-deprecated', lifecycle.deprecated);
    }

    block.querySelectorAll('.js-api-version-item').forEach((item) => {
        const selected = item.dataset.apiDateVersion === version;
        item.classList.toggle('active', selected);
        const check = item.querySelector('.js-api-version-check');
        if (check) check.classList.toggle('d-none', !selected);
    });

    const followMenuItem = block.querySelector('.js-api-version-follow-menu');
    if (followMenuItem) {
        followMenuItem.classList.toggle('active', !isOverride);
        const followCheck = followMenuItem.querySelector('.js-api-version-follow-check');
        if (followCheck) followCheck.classList.toggle('d-none', isOverride);
    }

    document.querySelectorAll(`.api-versioned-pane[data-operation-id="${operationId}"]`).forEach((pane) => {
        pane.classList.toggle('d-none', pane.dataset.apiDateVersion !== version);
    });
    document.querySelectorAll(`.api-version-header-value[data-operation-id="${operationId}"]`).forEach((el) => {
        el.textContent = version;
    });
}

if (apiVersionBlocks.length || apiGlobalVersionToggle) {
    let storedGlobal = null;
    try {
        storedGlobal = window.localStorage.getItem(API_GLOBAL_VERSION_STORAGE_KEY);
    } catch (err) {
        storedGlobal = null;
    }
    if (apiGlobalVersionToggle
        && storedGlobal
        && document.querySelector(`.js-api-global-version-item[data-value="${storedGlobal}"]`)) {
        setGlobalVersionButton(storedGlobal);
    }

    const initGlobal = getGlobalVersion();

    apiVersionBlocks.forEach((block) => {
        const { operationId, versions } = block.dataset;
        if (!versions) return;
        let override = null;
        try {
            override = window.localStorage.getItem(apiVersionStorageKey(operationId));
        } catch (err) {
            override = null;
        }
        if (override && versions.split(',').includes(override)) {
            applyApiVersion(operationId, override, true);
        } else if (initGlobal) {
            applyApiVersion(operationId, resolveVersionFromGlobal(versions, initGlobal), false);
        }
    });

    if (apiGlobalVersionToggle) {
        // Changing the global baseline recomputes every operation that's still
        // following it. Operations with their own override keep it — matching
        // the design mock, only "Follow global" clears an override.
        document.addEventListener('click', (e) => {
            const item = e.target.closest('.js-api-global-version-item');
            if (!item) return;
            e.preventDefault();
            const global = item.dataset.value;
            setGlobalVersionButton(global);
            try {
                window.localStorage.setItem(API_GLOBAL_VERSION_STORAGE_KEY, global);
            } catch (err) {
                // ignore storage errors (e.g. private browsing)
            }
            apiVersionBlocks.forEach((block) => {
                const { operationId, versions } = block.dataset;
                if (!versions) return;
                let override = null;
                try {
                    override = window.localStorage.getItem(apiVersionStorageKey(operationId));
                } catch (err) {
                    override = null;
                }
                if (!override) {
                    applyApiVersion(operationId, resolveVersionFromGlobal(versions, global), false);
                }
            });
        });
    }

    // Dropdown open/close is handled by Bootstrap's own dropdown component
    // (data-bs-toggle="dropdown"), same as the sidebar's global selector and
    // the site's language/region picker — only selection needs custom wiring.
    document.addEventListener('click', (e) => {
        const item = e.target.closest('.js-api-version-item');
        if (item) {
            e.preventDefault();
            const { operationId, apiDateVersion: version } = item.dataset;
            applyApiVersion(operationId, version, true);
            try {
                window.localStorage.setItem(apiVersionStorageKey(operationId), version);
            } catch (err) {
                // ignore storage errors (e.g. private browsing)
            }
            return;
        }

        const follow = e.target.closest('.js-api-version-follow-menu');
        if (follow) {
            e.preventDefault();
            const { operationId } = follow.dataset;
            const block = follow.closest('.api-version-block');
            const versions = block && block.dataset.versions;
            const global = getGlobalVersion();
            if (versions && global) {
                applyApiVersion(operationId, resolveVersionFromGlobal(versions, global), false);
            }
            try {
                window.localStorage.removeItem(apiVersionStorageKey(operationId));
            } catch (err) {
                // ignore storage errors
            }
        }
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
