export function initializeSecurityRules() {
    const inputSearch = document.querySelector('[data-ref="search"]');
    const controls = document.querySelector('[data-ref="controls"]');
    const allGroupHeaders = Array.prototype.slice.call(document.getElementsByClassName('js-group-header') || []);
    const allRules = document.querySelectorAll('.js-single-rule');
    const allRuleGroups = document.querySelectorAll('.js-group');
    const urlParams = new URLSearchParams(window.location.search);
    const urlHash = window.location.hash;
    const keyword = urlParams.get('q');
    let keyupTimeout;
    let filters;

    if (controls) {
       filters = controls.querySelectorAll('[data-ref="filter"]');
    }

    // Returns array of results filtered by category and/or user search value
    const filterResults = (filterCategoryValue, searchValue) => {
        let results = [];

        if (filterCategoryValue && filterCategoryValue !== 'all') {
            results = document.querySelectorAll(`.${filterCategoryValue}`);
        } else {
            results = allRules;
        }

        if (searchValue && searchValue.length > 3) {
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
            
        const searchValue = inputSearch.value.length > 3 ? inputSearch.value.toLowerCase().trim() : '';
        const filtered = filterResults(event.target.dataset.filter, searchValue);
        activateButton(event.target, filters);
        showResults(filtered);
    }

    const handleKeyup = () => {
        const searchValue = inputSearch.value.length > 3 ? inputSearch.value.toLowerCase().trim() : '';
        const activeCategoryFilter = document.querySelector('.controls .active').dataset.filter;
        clearTimeout(keyupTimeout);

        keyupTimeout = setTimeout(() => {
            window.history.replaceState({q: searchValue}, '', `?q=${searchValue}`);
            const filtered = filterResults(activeCategoryFilter, searchValue);
            showResults(filtered);
        }, 350);
    }

    if (inputSearch) {
        inputSearch.addEventListener('keyup', handleKeyup);
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

    // const containerEl = document.querySelector('#rules .list-group');
    // const inputSearch = document.querySelector('[data-ref="search"]');
    // const controls = document.querySelector('[data-ref="controls"]');
    // const ruleList = Array.prototype.slice.call(document.getElementsByClassName('rule-list') || []);
    // const urlParams = new URLSearchParams(window.location.search);
    // const keyword = urlParams.get('q');
    // let keyupTimeout;
    // let filters;
    // let mixer;

    // if (!containerEl) return;

    // if(controls) {
    //    filters = controls.querySelectorAll('[data-ref="filter"]');
    // }

    // ruleList.forEach(elm => {
    //     elm.addEventListener("click", e => {
    //         e.currentTarget.classList.toggle('active');
    //     });
    // });

    // function filterByString(searchValue) {
    //     if (searchValue) {
    //         // Use an attribute wildcard selector to check for matches
    //         mixer.filter(`[data-name*="${searchValue}"]`);
    //         activateButton(controls.querySelector('[data-filter="all"]'), filters);
    //     } else {
    //         // If no searchValue, treat as filter('all')
    //         mixer.filter('all');
    //     }
    // }

    // function activateButton(activeButton, siblings) {
    //     let button;
    //     let i;

    //     if (activeButton && siblings) {
    //         for (i = 0; i < siblings.length; i++) {
    //             button = siblings[i];
    //             button.classList[button === activeButton ? 'add' : 'remove']('active');
    //         }
    //     }

    //     // enable all
    //     ruleList.forEach(elm => {
    //         elm.classList.add('active');
    //     });
    // }

    // if(containerEl) {
    //     mixer = mixitup(containerEl, {
    //         animation: {
    //             duration: 350,
    //             enable: false
    //         },
    //         callbacks: {
    //             onMixClick() {
    //                 // Reset the search if a filter is clicked
    //                 if (this.matches('[data-filter]')) {
    //                     inputSearch.value = '';
    //                 }
    //             },
    //             onMixEnd(state){
    //                 state.hide.forEach((x) => {
    //                     x.closest(".js-group").style.display = 'none';
    //                 });
    //                 state.show.forEach((x) => {
    //                     x.closest(".js-group").style.display = '';
    //                 });
    //             }
    //         }
    //     });

    //     if (inputSearch) {
    //         inputSearch.addEventListener('keyup', function () {
    //             let searchValue;
    //             if (inputSearch.value.length < 3) {
    //                 // If the input value is less than 3 characters, don't send
    //                 searchValue = '';
    //             } else {
    //                 searchValue = inputSearch.value.toLowerCase().trim();
    //             }
    //             clearTimeout(keyupTimeout);
    //             keyupTimeout = setTimeout(function () {
    //                 window.history.replaceState({q: searchValue}, '', `?q=${searchValue}`);
    //                 filterByString(searchValue);
    //             }, 350);
    //         });
    //     }

    //     if (controls) {
    //         controls.addEventListener('click', function (e) {
    //             inputSearch.value = '';
    //             const url = window.location.href.replace(window.location.search, '');
    //             window.history.replaceState({q: ''}, '', url);
    //             // If button is already active, or an operation is in progress, ignore the click
    //             if (e.target.classList.contains('active') || !e.target.getAttribute('data-filter'))
    //                 return;
    //             activateButton(e.target, filters);
    //         });
    //     }

    //     // Set controls the active controls on startup
    //     if(controls) {
    //         activateButton(controls.querySelector('[data-filter="all"]'), filters);
    //     }
    //     if(keyword) { filterByString(keyword); }

    //     $(window).on('hashchange', function() {
    //         let currentCat = '';
    //         if (window.location.href.indexOf('#') > -1) {
    //             currentCat = window.location.href.substring(
    //                 window.location.href.indexOf('#')
    //             );
    //         }
    //         const currentSelected = $('.controls .active').attr('href');
    //         if (currentCat && currentSelected) {
    //             if (currentCat !== currentSelected) {
    //                 $(`a[href="${currentCat}"]`).get(0).click();
    //             }
    //         }
    //         if (currentCat === '') {
    //             activateButton(controls.querySelector('[data-filter="all"]'), filters);
    //         }
    //     });

    //     if (window.location.href.indexOf('#') > -1) {
    //         $(window).trigger('hashchange');
    //     }
    // }
// }