/* eslint-disable no-underscore-dangle */

import Mousetrap from 'mousetrap';
import mixitup from 'mixitup';

export function initializeIntegrations() {
    let finderState = 0; // closed
    let popupClosed = true;
    const container = document.querySelector('[data-ref="container"]');

    $(window).on('focus', function() {
        if (finderState && container) {
            container.classList.remove('find');
            finderState = 0;
        }
    });

    Mousetrap.bind(['command+f', 'control+f'], function() {
        if (!finderState && container) {
            container.classList.add('find');
            finderState = 1;
        }
    });

    const isSafari = navigator.userAgent.indexOf('Safari') !== -1;
    const ref = document.querySelector('.integration-popper-button');
    const pop = document.getElementById('integration-popper');
    if (ref && pop) {
        ref.addEventListener('click', function() {
            pop.style.display = pop.style.display === 'none' ? 'block' : 'none';
            return false;
        });
    }

    const mobileDropDown = document.querySelector('#dropdownMenuLink');
    const controls = document.querySelector('[data-ref="controls"]');
    let filters = null;
    const mobilecontrols = document.querySelector(
        '[data-ref="mobilecontrols"]'
    );
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
            target: '[data-ref="item"]' // Query targets with an attribute selector to keep our JS and styling classes seperate
        },
        load: {
            dataset: items // As we have pre-rendered targets, we must "prime" MixItUp with their underlying data
        },
        data: {
            uidKey: 'id' // Our data model must have a unique id. In this case, its key is 'id'
        }
    };

    if (parseInt($(window).width()) <= 575) {
        config['animation']['enable'] = false;
    }

    const mixer = mixitup(container, config);

    controls.addEventListener('click', function(e) {
        // e.preventDefault();
        handleButtonClick(e.target, filters);
        // trigger same active on mobile
        // $('.integrations-select').val('#'+e.target.getAttribute('href').substr(1));
        const mobileBtn = controls.querySelector(
            `[data-filter="${e.target.getAttribute('data-filter')}"]`
        );
        activateButton(mobileBtn, mobilefilters);
        // return false;
    });

    mobilecontrols.addEventListener('click', function(e) {
        e.stopPropagation();
        // e.preventDefault();
        handleButtonClick(e.target, mobilefilters);
        // trigger same active on desktop
        const desktopBtn = controls.querySelector(
            `[data-filter="${e.target.getAttribute('data-filter')}"]`
        );
        activateButton(desktopBtn, filters);
        // return false;
        pop.style.display = 'none';
        $(window).scrollTop(0);
    });

    let searchTimer;

    search.addEventListener('input', function(e) {
        const allBtn = controls.querySelector('[data-filter="all"]');

        // search only executes after user is finished typing
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function() {
            activateButton(allBtn, filters);
            updateData(e.target.value.toLowerCase(), true);

            if (
                e.target.value.length > 0 &&
                window._DATADOG_SYNTHETICS_BROWSER === undefined
            ) {
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
                button.classList[button === activeButton ? 'add' : 'remove'](
                    'active'
                );
            }
            mobileDropDown.textContent = activeButton.textContent;
        }
    }

    function handleButtonClick(button, catFilters) {
        // clear the search input
        search.value = '';
        // If button is already active, or an operation is in progress, ignore the click
        if (
            button.classList.contains('active') ||
            !button.getAttribute('data-filter')
        )
            return;

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
        for (let i = 0; i < window.integrations.length; i++) {
            const item = window.integrations[i];
            const domitem = document.getElementById(`mixid_${item.id}`);
            if (
                filter === 'all' ||
                filter === '#all' ||
                (isSearch && !filter)
            ) {
                if (!isSafari) {
                    domitem.classList.remove('grayscale');
                }
                show.push(item);
            } else {
                const name = item.name ? item.name.toLowerCase() : '';
                const publicTitle = item.public_title
                    ? item.public_title.toLowerCase()
                    : '';

                if (
                    (filter &&
                        isSearch &&
                        (name.includes(filter) ||
                            publicTitle.includes(filter))) ||
                    (!isSearch && item.tags.indexOf(filter.substr(1)) !== -1)
                ) {
                    if (!isSafari) {
                        domitem.classList.remove('grayscale');
                    }
                    show.push(item);
                } else {
                    if (!isSafari) {
                        domitem.classList.add('grayscale');
                    }
                    hide.push(item);
                }
            }
        }

        const mixerItems = [].concat(show, hide);
        mixer.dataset(mixerItems).then(function() {
            if (isSafari) {
                for (let i = 0; i < window.integrations.length; i++) {
                    const item = window.integrations[i];
                    const domitem = document.getElementById(`mixid_${item.id}`);
                    if (
                        filter === 'all' ||
                        filter === '#all' ||
                        (isSearch && !filter)
                    ) {
                        domitem.classList.remove('grayscale');
                        // show.push(item);
                    } else {
                        const name = item.name ? item.name.toLowerCase() : '';
                        const publicTitle = item.public_title
                            ? item.public_title.toLowerCase()
                            : '';

                        if (
                            (filter &&
                                isSearch &&
                                (name.includes(filter) ||
                                    publicTitle.includes(filter))) ||
                            (!isSearch &&
                                item.tags.indexOf(filter.substr(1)) !== -1)
                        ) {
                            domitem.classList.remove('grayscale');
                            // show.push(item);
                        } else {
                            domitem.classList.add('grayscale');
                            // hide.push(item);
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

    // Set controls the active controls on startup
    activateButton(controls.querySelector('[data-filter="all"]'), filters);
    activateButton(
        mobilecontrols.querySelector('[data-filter="all"]'),
        mobilefilters
    );

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
                $(`a[href="${currentCat}"]`)
                    .get(0)
                    .click();
            }
        }
        if (currentCat === '') {
            activateButton(
                controls.querySelector('[data-filter="all"]'),
                filters
            );
            activateButton(
                mobilecontrols.querySelector('[data-filter="all"]'),
                mobilefilters
            );
            updateData('all', false);
        }
    });

    if (window.location.href.indexOf('#') > -1) {
        $(window).trigger('hashchange');
    }
}
