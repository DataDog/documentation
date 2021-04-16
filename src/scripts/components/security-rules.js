import { stringToTitleCase } from '../helpers/string';

export function initializeSecurityRules() {
    const inputSearch = document.querySelector('[data-ref="search"]');
    const controls = document.querySelector('[data-ref="controls"]');
    const allGroupHeaders = Array.prototype.slice.call(document.getElementsByClassName('js-group-header') || []);
    const allRules = document.querySelectorAll('.js-single-rule');
    const allRuleGroups = document.querySelectorAll('.js-group');
    const jsEmptyResults = document.querySelector('.js-empty-results');
    const urlParams = new URLSearchParams(window.location.search);
    const urlHash = window.location.hash;
    const keyword = urlParams.get('q');
    const form = document.getElementById('rules');
    let keyupTimeout;
    let filters;

    if (controls) {
       filters = controls.querySelectorAll('[data-ref="filter"]');
    }

    // Returns array of results filtered by category and/or user search value
    const filterResults = (filterCategoryValue, searchValue) => {
        let results = [];

        if (filterCategoryValue && filterCategoryValue !== 'all') {
            const val = (filterCategoryValue.startsWith('.')) ? filterCategoryValue.slice(1) : filterCategoryValue;
            results = document.querySelectorAll(`.${val}`);
        } else {
            results = allRules;
        }

        if (searchValue && searchValue.length > 2) {
            results = Array.from(results).filter(item => item.dataset.name.indexOf(searchValue) > -1);
        }

        return results;
    }

    const activateButton = (activeButton, siblings) => {
        let button;
        let i;

        if (activeButton && siblings) {
            for (i = 0; i < siblings.length; i++) {
                button = siblings[i];
                button.classList[button === activeButton ? 'add' : 'remove']('active');
            }
        }

        // enable all
        allGroupHeaders.forEach(elm => {
            elm.classList.add('active');
        });
    }

    const handleEmptyResultSet = () => {
        const searchQuery = inputSearch.value;
        const txt = (document.querySelector('.controls .active')) ? document.querySelector('.controls .active').text : '';
        const activeCategoryFilter = stringToTitleCase(txt);
        const message = `No results found for query "${searchQuery}" in category ${activeCategoryFilter}`;
        if(jsEmptyResults) {
          jsEmptyResults.innerText = message;
          jsEmptyResults.classList.remove('d-none');
        }
    }

    const showResults = (filteredResults) => {
        // Hide all groups, headers, and rules.
        allRules.forEach(element => {
            element.style.display = 'none';
        })

        allGroupHeaders.forEach(element => {
            element.style.display = 'none';
        })

        allRuleGroups.forEach(element => {
            element.style.display = 'none';
        })

        // Handle empty result set
        if (filteredResults.length < 1) {
            handleEmptyResultSet();
        } else if (jsEmptyResults) {
            jsEmptyResults.innerText = '';
            jsEmptyResults.classList.add('d-none');
        }

        // Show headers and groups for all matches
        filteredResults.forEach(element => {
            const jsGroup = element.closest('.js-group');
            const header = jsGroup.querySelector('.js-group-header');
            jsGroup.style.display = 'block';
            header.style.display = 'block';
            element.style.display = 'inline';
        })
    }

    const handleCategoryFilterClick = (event) => {
        // If button is already active, or an operation is in progress, ignore the click
        if (event.target.classList.contains('active') || !event.target.getAttribute('data-filter'))
            return;

        const searchValue = inputSearch.value.length > 2 ? inputSearch.value.toLowerCase().trim() : '';
        const filtered = filterResults(event.target.dataset.filter, searchValue);
        activateButton(event.target, filters);
        showResults(filtered);
    }

    const handleKeyup = () => {
        const searchValue = inputSearch.value.length > 2 ? inputSearch.value.toLowerCase().trim() : '';
        const activeCategory = document.querySelector('.controls .active');
        const activeCategoryFilter = (activeCategory) ? activeCategory.dataset.filter : '';
        const { hash } = window.location;
        const replaceUrl = hash ? `?q=${searchValue}${hash}` : `?q=${searchValue}`

        clearTimeout(keyupTimeout);

        keyupTimeout = setTimeout(() => {
            window.history.replaceState({q: searchValue}, '', replaceUrl);
            const filtered = filterResults(activeCategoryFilter, searchValue);
            showResults(filtered);
        }, 350);
    }

    if (inputSearch) {
        inputSearch.addEventListener('keyup', handleKeyup);
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    allGroupHeaders.forEach(elm => {
        elm.addEventListener("click", e => {
            e.currentTarget.classList.toggle('active');
        });
    });

    // We cannot listen for a DOM loaded event due to the script loading async; this code should execute when the default rules content is loaded.
    if (controls) {
        controls.addEventListener('click', handleCategoryFilterClick);
        let searchValue = '';

        if (keyword) {
            searchValue = keyword;
            inputSearch.value = keyword;
        }

        const activeCategoryFilter = urlHash ? urlHash.substring(1) : 'all';
        const activeFilterButton = document.querySelector(`[data-filter="${activeCategoryFilter}"]`);
        const filtered = filterResults(activeCategoryFilter, searchValue);
        activateButton(activeFilterButton, filters);
        showResults(filtered);
    }
}
