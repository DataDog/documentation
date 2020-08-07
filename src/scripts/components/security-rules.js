import mixitup from 'mixitup';

export function initializeSecurityRules() {
    const containerEl = document.querySelector('#rules .list-group');
    const inputSearch = document.querySelector('[data-ref="search"]');
    const controls = document.querySelector('[data-ref="controls"]');
    const ruleList = Array.prototype.slice.call(document.getElementsByClassName('rule-list'));
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get('q');
    let keyupTimeout;
    let filters;
    if(controls) {
       filters = controls.querySelectorAll('[data-ref="filter"]');
    }

    ruleList.forEach(elm => {
        elm.addEventListener("click", e => {
            e.currentTarget.classList.toggle('active');
        });
    });

    const mixer = mixitup(containerEl, {
        animation: {duration: 350},
        callbacks: {
          onMixClick() {
            // Reset the search if a filter is clicked
            if (this.matches('[data-filter]')) {
              inputSearch.value = '';
            }
          }
        }
    });

    inputSearch.addEventListener('keyup', function() {
        let searchValue;
        if (inputSearch.value.length < 3) {
            // If the input value is less than 3 characters, don't send
            searchValue = '';
        } else {
            searchValue = inputSearch.value.toLowerCase().trim();
        }
        clearTimeout(keyupTimeout);
        keyupTimeout = setTimeout(function() {
            window.history.replaceState({}, '', `?q=${searchValue}`);
            filterByString(searchValue);
        }, 350);
    });

    function filterByString(searchValue) {
        if (searchValue) {
            // Use an attribute wildcard selector to check for matches
            mixer.filter(`[data-name*="${searchValue}"]`);
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
                button.classList[button === activeButton ? 'add' : 'remove'](
                    'active'
                );
            }
        }
    }

    controls.addEventListener('click', function(e) {
        e.preventDefault();
        inputSearch.value = '';
        activateButton(e.target, filters);
    });

    // on page load check url params
    if(keyword) {
        filterByString(keyword);
    }
    activateButton(controls.querySelector('[data-filter="all"]'), filters);
}