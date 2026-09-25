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

// API changelog filters (/api/changelog/)
const changelogRoot = document.querySelector('.api-changelog');

if (changelogRoot) {
    const filterTabs = changelogRoot.querySelectorAll('[data-changelog-filter]');
    const dateSections = changelogRoot.querySelectorAll('.api-changelog-date-section');
    const entries = [...changelogRoot.querySelectorAll('.api-changelog-entry')];
    const timeline = changelogRoot.querySelector('.api-changelog-timeline');
    const pagination = document.getElementById('api-changelog-pagination');
    const clearButtons = changelogRoot.querySelectorAll('[data-changelog-reset]');
    const emptyState = document.getElementById('api-changelog-empty-state');

    let activeBucket = 'all';
    let currentPage = 1;
    const entriesPerPage = 20;

    function renderChangelogPagination(totalPages) {
        if (!pagination) return;

        pagination.classList.toggle('d-none', totalPages <= 1);
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        const pageButtons = Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;
            return `<li class="api-changelog-pagination-item${isActive ? ' is-active' : ''}">
                <button type="button" data-changelog-page="${page}"${isActive ? ' disabled aria-current="page"' : ''}>${page}</button>
            </li>`;
        }).join('');

        pagination.innerHTML = `<ul class="api-changelog-pagination-list">
            <li class="api-changelog-pagination-item">
                <button type="button" data-changelog-page="${currentPage - 1}"${currentPage === 1 ? ' disabled' : ''}>Prev</button>
            </li>
            ${pageButtons}
            <li class="api-changelog-pagination-item">
                <button type="button" data-changelog-page="${currentPage + 1}"${currentPage === totalPages ? ' disabled' : ''}>Next</button>
            </li>
        </ul>`;

        pagination.querySelectorAll('[data-changelog-page]:not([disabled])').forEach((button) => {
            button.addEventListener('click', () => {
                currentPage = Number(button.dataset.changelogPage);
                applyChangelogFilters();
                if (timeline) timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function applyChangelogFilters() {
        const matchingEntries = entries.filter(
            (entry) => activeBucket === 'all' || entry.dataset.bucket === activeBucket
        );
        const totalPages = Math.max(1, Math.ceil(matchingEntries.length / entriesPerPage));
        currentPage = Math.min(currentPage, totalPages);
        const pageStart = (currentPage - 1) * entriesPerPage;
        const pageEnd = Math.min(pageStart + entriesPerPage, matchingEntries.length);
        const visibleEntries = new Set(matchingEntries.slice(pageStart, pageEnd));

        entries.forEach((entry) => entry.classList.toggle('d-none', !visibleEntries.has(entry)));

        dateSections.forEach((section) => {
            const hasVisibleEntry = [...section.querySelectorAll('.api-changelog-entry')]
                .some((entry) => visibleEntries.has(entry));
            section.classList.toggle('d-none', !hasVisibleEntry);
        });

        if (emptyState) emptyState.classList.toggle('d-none', matchingEntries.length !== 0);
        renderChangelogPagination(totalPages);
    }

    filterTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            activeBucket = tab.dataset.changelogFilter;
            currentPage = 1;
            filterTabs.forEach((item) => item.classList.toggle('is-active', item === tab));
            applyChangelogFilters();
        });
    });

    clearButtons.forEach((button) => {
        button.addEventListener('click', () => {
            activeBucket = 'all';
            currentPage = 1;
            filterTabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.changelogFilter === 'all'));
            applyChangelogFilters();
        });
    });

    applyChangelogFilters();
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
