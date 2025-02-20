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

    const isSafari = navigator.userAgent.indexOf('Safari') !== -1;
    const ref = document.querySelector('.integration-popper-button');
    const pop = document.getElementById('integration-popper');
    if (ref && pop) {
        ref.addEventListener('click', function () {
            pop.style.display = pop.style.display === 'none' ? 'block' : 'none';
            return false;
        });
    }

    const mobileDropDown = document.querySelector('#dropdownMenuLink');
    const controls = document.querySelector('[data-ref="controls"]');
    let filters = null;
    const mobilecontrols = document.querySelector('[data-ref="mobilecontrols"]');
    let mobilefilters = null;
    const search = document.querySelector('[data-ref="search"]');
    const items = window.integrations;

    if (!container) return;

    if (controls) {
        filters = controls.querySelectorAll('[data-ref="filter"]');
    }
    if (mobilecontrols) {
        mobilefilters = mobilecontrols.querySelectorAll('[data-ref="filter"]');
    }

    const config = {
        animation: {
            duration: 150
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

    if (parseInt(window.innerWidth) <= 575) {
        config['animation']['enable'] = false;
    }

    const mixer = mixitup(container, config);

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
            activateButton(allBtn, filters);
            updateData(e.target.value.toLowerCase(), true);

            if (window.location.hash && window.location.hash !== 'all') {
                window.location.hash = '#all';
            }

            updateQueryParameter('q', e.target.value.toLowerCase());

            if (e.target.value.length > 0 && window._DATADOG_SYNTHETICS_BROWSER === undefined) {
                window.DD_LOGS.logger.log(
                    'Integrations Search',
                    {
                        browser: {
                            integrations: {
                                search: e.target.value.toLowerCase()
                            }
                        }
                    },
                    'info'
                );
            }
        }, 400);
    });

    function activateButton(activeButton, siblings) {
        let button;
        let i;

        if (activeButton && siblings) {
            for (i = 0; i < siblings.length; i++) {
                button = siblings[i];
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
            // eslint-disable-line no-underscore-dangle
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

    function updateData(filter, isSearch) {
        const show = [];
        const hide = [];
        const filterWords = filter.split(/\s+/);

        for (let i = 0; i < window.integrations.length; i++) {
            const item = window.integrations[i];
            const domitem = document.getElementById(`mixid_${item.id}`);
            const int = domitem.querySelector('.integration');
            if (filter === 'all' || filter === '#all' || (isSearch && !filter)) {
                if (!isSafari) {
                    int.classList.remove('dimmer');
                }
                show.push(item);
            } else {
                const name = item.name ? item.name.toLowerCase() : '';
                const publicTitle = item.public_title ? item.public_title.toLowerCase() : '';

                const matchesFilter = filterWords.some(word => 
                    (isSearch && (name.includes(word) || publicTitle.includes(word))) ||
                    (!isSearch && item.tags.indexOf(word.substr(1)) !== -1)
                );

                if (matchesFilter) {
                    if (!isSafari) {
                        int.classList.remove('dimmer');
                    }
                    show.push(item);
                } else {
                    if (!isSafari) {
                        int.classList.add('dimmer');
                    }
                    hide.push(item);
                }
            }
        }

        const mixerItems = [].concat(show, hide);
        mixer.dataset(mixerItems).then(function () {
            if (isSafari) {
                for (let i = 0; i < window.integrations.length; i++) {
                    const item = window.integrations[i];
                    const domitem = document.getElementById(`mixid_${item.id}`);
                    const int = domitem.querySelector('.integration');
                    if (filter === 'all' || filter === '#all' || (isSearch && !filter)) {
                        int.classList.remove('dimmer');
                    } else {
                        const name = item.name ? item.name.toLowerCase() : '';
                        const publicTitle = item.public_title ? item.public_title.toLowerCase() : '';

                        const matchesFilter = filterWords.some(word => 
                            (isSearch && (name.includes(word) || publicTitle.includes(word))) ||
                            (!isSearch && item.tags.indexOf(word.substr(1)) !== -1)
                        );

                        if (matchesFilter) {
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

    const integrationTiles = document.querySelectorAll('.integration-row .integration');

    integrationTiles.forEach((integration) => {
        integration.addEventListener('mouseover', () => {
            integration.classList.remove('hover');

            if (window.innerWidth >= 576) {
                integration.classList.add('hover');
            }
        });

        integration.addEventListener('mouseout', () => {
            integration.classList.remove('hover');
        });
    });
}
