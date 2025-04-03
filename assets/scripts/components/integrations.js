/* eslint-disable no-underscore-dangle */
import Mousetrap from 'mousetrap';
import mixitup from 'mixitup';
import { updateQueryParameter, deleteQueryParameter, getQueryParameterByName } from '../helpers/browser';
import { scrollTop } from '../helpers/scrollTop';
import { triggerEvent } from '../helpers/triggerEvent';

export function initializeIntegrations() {
    let finderState = 0; // closed
    let popupClosed = true;
    const container = document.querySelector('[data-ref="container"]');

    // Early return if container doesn't exist to avoid unnecessary processing
    if (!container) return;

    // Cache Safari detection - this is used multiple times
    const isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
    
    // Cache DOM elements
    const ref = document.querySelector('.integration-popper-button');
    const pop = document.getElementById('integration-popper');
    const mobileDropDown = document.querySelector('#dropdownMenuLink');
    const controls = document.querySelector('[data-ref="controls"]');
    const mobilecontrols = document.querySelector('[data-ref="mobilecontrols"]');
    const search = document.querySelector('[data-ref="search"]');
    const items = window.integrations;
    
    // Create a Map for faster DOM element lookups
    const domElements = new Map();
    
    // Pre-process integrations data
    if (items && items.length) {
        items.forEach(item => {
            if (item.name) item.nameLower = item.name.toLowerCase();
            if (item.public_title) item.publicTitleLower = item.public_title.toLowerCase();
        });
    }

    window.addEventListener('focus', () => {
        if (finderState && container) {
            container.classList.remove('find');
            finderState = 0;
        }
    });

    Mousetrap.bind(['command+f', 'control+f'], function () {
        if (!finderState && container) {
            container.classList.add('find');
            finderState = 1;
        }
    });

    if (ref && pop) {
        ref.addEventListener('click', function () {
            pop.style.display = pop.style.display === 'none' ? 'block' : 'none';
            return false;
        });
    }

    const filters = controls ? controls.querySelectorAll('[data-ref="filter"]') : null;
    const mobilefilters = mobilecontrols ? mobilecontrols.querySelectorAll('[data-ref="filter"]') : null;

    const config = {
        animation: {
            duration: 150,
            enable: !(parseInt(window.innerWidth) <= 575)
        },
        selectors: {
            target: '[data-ref="item"]' // Query targets with an attribute selector to keep our JS and styling classes separate
        },
        load: {
            dataset: items // As we have pre-rendered targets, we must "prime" MixItUp with their underlying data
        },
        data: {
            uidKey: 'id' // Our data model must have a unique id. In this case, its key is 'id'
        }
    };

    const mixer = mixitup(container, config);

    // Helper function to get DOM element with caching
    function getDomElement(id) {
        if (!domElements.has(id)) {
            domElements.set(id, document.getElementById(`mixid_${id}`));
        }
        return domElements.get(id);
    }

    controls.addEventListener('click', function (e) {
        handleButtonClick(e.target, filters);

        if (e.target.dataset.filter && e.target.dataset.filter !== 'all') {
            deleteQueryParameter('q');
        }

        // trigger same active on mobile
        const mobileBtn = controls.querySelector(`[data-filter="${e.target.getAttribute('data-filter')}"]`);
        activateButton(mobileBtn, mobilefilters);
    });

    mobilecontrols.addEventListener('click', function (e) {
        e.stopPropagation();
        handleButtonClick(e.target, mobilefilters);

        // trigger same active on desktop
        const desktopBtn = controls.querySelector(`[data-filter="${e.target.getAttribute('data-filter')}"]`);

        activateButton(desktopBtn, filters);

        pop.style.display = 'none';
        scrollTop(window, 0);
    });

    let searchTimer;

    search.addEventListener('input', function (e) {
        const allBtn = controls.querySelector('[data-filter="all"]');

        // search only executes after user is finished typing
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
            const searchValue = e.target.value.toLowerCase();
            activateButton(allBtn, filters);
            updateData(searchValue, true);

            if (window.location.hash && window.location.hash !== 'all') {
                window.location.hash = '#all';
            }

            updateQueryParameter('q', searchValue);

            if (searchValue.length > 0 && window._DATADOG_SYNTHETICS_BROWSER === undefined) {
                window.DD_LOGS.logger.log(
                    'Integrations Search',
                    {
                        browser: {
                            integrations: {
                                search: searchValue
                            }
                        }
                    },
                    'info'
                );
            }
        }, 400);
    });

    function activateButton(activeButton, siblings) {
        if (activeButton && siblings) {
            for (let i = 0; i < siblings.length; i++) {
                const button = siblings[i];
                button.classList[button === activeButton ? 'add' : 'remove']('active');
            }
            mobileDropDown.textContent = activeButton.textContent;
        }
    }

    function handleButtonClick(button, catFilters) {
        // clear the search input
        search.value = '';
        // If button is already active, or an operation is in progress, ignore the click
        if (button.classList.contains('active') || !button.getAttribute('data-filter')) return;

        const filter = button.getAttribute('data-filter');
        if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
            window.DD_LOGS.logger.log(
                'Integrations category selected',
                { browser: { integrations: { category: button.innerText } } },
                'info'
            );
        }
        activateButton(button, catFilters);
        updateData(filter, false);

        if (window.history.pushState) {
            const href = button.getAttribute('href');
            window.history.pushState(null, document.title, href);
        }
    }

    // Shared function to check for matches - reduces code duplication
    function checkMatches(item, filter, filterWords, isSearch) {
        // Use pre-processed lowercase values
        const name = item.nameLower || '';
        const publicTitle = item.publicTitleLower || '';
        
        // Check for exact matches first
        const hasExactMatch = isSearch && (
            name === filter || 
            publicTitle === filter ||
            filterWords.some(word => name === word || publicTitle === word)
        );
        
        // Then check for partial matches
        const hasPartialMatch = filterWords.some(word => 
            (isSearch && (name.includes(word) || publicTitle.includes(word))) ||
            (!isSearch && item.tags && item.tags.indexOf(word.substr(1)) !== -1)
        );
        
        return { hasExactMatch, hasPartialMatch };
    }

    function updateData(filter, isSearch) {
        const exactMatches = [];
        const partialMatches = [];
        const hide = [];
        const filterWords = filter.split(/\s+/);
        const isAllFilter = filter === 'all' || filter === '#all' || (isSearch && !filter);

        // Process all items in a single loop
        for (let i = 0; i < window.integrations.length; i++) {
            const item = window.integrations[i];
            const domitem = getDomElement(item.id);
            const int = domitem.querySelector('.integration');
            
            if (isAllFilter) {
                if (!isSafari) {
                    int.classList.remove('dimmer');
                }
                exactMatches.push(item);
                continue;
            }
            
            const { hasExactMatch, hasPartialMatch } = checkMatches(item, filter, filterWords, isSearch);

            if (hasExactMatch) {
                if (!isSafari) {
                    int.classList.remove('dimmer');
                }
                exactMatches.push(item);
            } else if (hasPartialMatch) {
                if (!isSafari) {
                    int.classList.remove('dimmer');
                }
                partialMatches.push(item);
            } else {
                if (!isSafari) {
                    int.classList.add('dimmer');
                }
                hide.push(item);
            }
        }

        // Combine exact matches first, then partial matches, then hidden items
        const show = [...exactMatches, ...partialMatches];
        const mixerItems = [...show, ...hide];
        
        mixer.dataset(mixerItems).then(function () {
            if (isSafari) {
                for (let i = 0; i < window.integrations.length; i++) {
                    const item = window.integrations[i];
                    const domitem = getDomElement(item.id);
                    const int = domitem.querySelector('.integration');
                    
                    if (isAllFilter) {
                        int.classList.remove('dimmer');
                    } else {
                        const { hasExactMatch, hasPartialMatch } = checkMatches(item, filter, filterWords, isSearch);

                        if (hasExactMatch || hasPartialMatch) {
                            int.classList.remove('dimmer');
                        } else {
                            int.classList.add('dimmer');
                        }
                    }
                }
            }
        });

        // if no integrations are found, trigger hotjar popup
        if (!show.length && popupClosed) {
            window.hj('trigger', 'dd_integrations_poll');
            popupClosed = false;
        }
    }

    // Handle search query param filtering on page load.
    const handleQueryParamFilter = () => {
        const searchQueryParameter = getQueryParameterByName('q', window.location.href);

        if (searchQueryParameter) {
            // Search query parameter should take priority if both param & category hash are present in URL.
            if (window.location.hash) {
                window.location.hash = '#all';
            }

            updateData(searchQueryParameter, true);

            search.value = searchQueryParameter;

            if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
                window.DD_LOGS.logger.log(
                    'Integrations Search',
                    {
                        browser: {
                            integrations: {
                                search: searchQueryParameter.toLowerCase()
                            }
                        }
                    },
                    'info'
                );
            }
        }
    };

    // Set controls the active controls on startup
    activateButton(controls.querySelector('[data-filter="all"]'), filters);
    activateButton(mobilecontrols.querySelector('[data-filter="all"]'), mobilefilters);

    handleQueryParamFilter();

    window.addEventListener('hashchange', () => {
        let currentCat = '';
        if (window.location.href.indexOf('#') > -1) {
            currentCat = window.location.href.substring(window.location.href.indexOf('#'));
        }
        const currentSelected = document.querySelector('.controls .active')?.getAttribute('href');

        if (currentCat && currentSelected) {
            if (currentCat !== currentSelected) {
                document.querySelector(`a[href="${currentCat}"]`)?.click();
            }
        }
        if (currentCat === '') {
            activateButton(controls.querySelector('[data-filter="all"]'), filters);
            activateButton(mobilecontrols.querySelector('[data-filter="all"]'), mobilefilters);
            updateData('all', false);
        }
    });

    if (window.location.href.indexOf('#') > -1) {
        triggerEvent(window, 'hashchange');
    }

    // Use event delegation for hover effects instead of attaching to each tile
    const integrationRows = document.querySelectorAll('.integration-row');
    integrationRows.forEach(row => {
        row.addEventListener('mouseover', (e) => {
            const integration = e.target.closest('.integration');
            if (integration) {
                integration.classList.remove('hover');
                if (window.innerWidth >= 576) {
                    integration.classList.add('hover');
                }
            }
        });
        
        row.addEventListener('mouseout', (e) => {
            const integration = e.target.closest('.integration');
            if (integration) {
                integration.classList.remove('hover');
            }
        });
    });
}
