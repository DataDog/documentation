import mixitup from 'mixitup';

export function initializeSecurityRules() {
    const containerEl = document.querySelector('#rules .list-group');
    const inputSearch = document.querySelector('[data-ref="search"]');
    const controls = document.querySelector('[data-ref="controls"]');
    const ruleList = Array.prototype.slice.call(document.getElementsByClassName('rule-list') || []);
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get('q');
    let keyupTimeout;
    let filters;
    let mixer;

    if (!containerEl) return;

    if(controls) {
       filters = controls.querySelectorAll('[data-ref="filter"]');
    }

    ruleList.forEach(elm => {
        elm.addEventListener("click", e => {
            e.currentTarget.classList.toggle('active');
        });
    });

    function filterByString(searchValue) {
        if (searchValue) {
            // Use an attribute wildcard selector to check for matches
            mixer.filter(`[data-name*="${searchValue}"]`);
            activateButton(controls.querySelector('[data-filter="all"]'), filters);
        } else {
            // If no searchValue, treat as filter('all')
            mixer.filter('all');
        }
    }

    function activateButton(activeButton, siblings) {
        let button;
        let i;

        if (activeButton && siblings) {
            for (i = 0; i < siblings.length; i++) {
                button = siblings[i];
                button.classList[button === activeButton ? 'add' : 'remove']('active');
            }
        }

        // enable all
        ruleList.forEach(elm => {
            elm.classList.add('active');
        });
    }

    if(containerEl) {
        mixer = mixitup(containerEl, {
            animation: {
                duration: 350,
                enable: false
            },
            callbacks: {
                onMixClick() {
                    // Reset the search if a filter is clicked
                    if (this.matches('[data-filter]')) {
                        inputSearch.value = '';
                    }
                },
                onMixEnd(state){
                    state.hide.forEach((x) => {
                        x.closest(".js-group").style.display = 'none';
                    });
                    state.show.forEach((x) => {
                        x.closest(".js-group").style.display = '';
                    });
                }
            }
        });

        if (inputSearch) {
            inputSearch.addEventListener('keyup', function () {
                let searchValue;
                if (inputSearch.value.length < 3) {
                    // If the input value is less than 3 characters, don't send
                    searchValue = '';
                } else {
                    searchValue = inputSearch.value.toLowerCase().trim();
                }
                clearTimeout(keyupTimeout);
                keyupTimeout = setTimeout(function () {
                    window.history.replaceState({q: searchValue}, '', `?q=${searchValue}`);
                    filterByString(searchValue);
                }, 350);
            });
        }

        if (controls) {
            controls.addEventListener('click', function (e) {
                inputSearch.value = '';
                const url = window.location.href.replace(window.location.search, '');
                window.history.replaceState({q: ''}, '', url);
                // If button is already active, or an operation is in progress, ignore the click
                if (e.target.classList.contains('active') || !e.target.getAttribute('data-filter'))
                    return;
                activateButton(e.target, filters);
            });
        }

        // Set controls the active controls on startup
        if(controls) {
            activateButton(controls.querySelector('[data-filter="all"]'), filters);
        }
        if(keyword) { filterByString(keyword); }

        $(window).on('hashchange', function() {
            let currentCat = '';
            if (window.location.href.indexOf('#') > -1) {
                currentCat = window.location.href.substring(
                    window.location.href.indexOf('#')
                );
            }
            const currentSelected = $('.controls .active').attr('href');
            if (currentCat && currentSelected) {
                if (currentCat !== currentSelected) {
                    $(`a[href="${currentCat}"]`).get(0).click();
                }
            }
            if (currentCat === '') {
                activateButton(controls.querySelector('[data-filter="all"]'), filters);
            }
        });

        if (window.location.href.indexOf('#') > -1) {
            $(window).trigger('hashchange');
        }
    }
}