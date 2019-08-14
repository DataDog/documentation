import Mousetrap from 'mousetrap';
import mixitup from 'mixitup';

export function initializeIntegrations(){
    let finder_state = 0;  // closed
    const container = document.querySelector('[data-ref="container"]');

    $(window).on('focus', function () {
        if (finder_state && container) {
            container.classList.remove('find');
            finder_state = 0;
        }
    });

    Mousetrap.bind(['command+f', 'control+f'], function (e) {
        if (!finder_state && container) {
            container.classList.add('find');
            finder_state = 1;
        }
    });

    const is_safari = navigator.userAgent.indexOf('Safari') !== -1;
    const ref = document.querySelector('.integration-popper-button');
    const pop = document.getElementById('integration-popper');
    if(ref && pop) {
        ref.addEventListener('click', function(e) {
            pop.style.display = (pop.style.display === 'none') ? 'block' : 'none';
            const p = new Popper(ref, pop, {
                placement: "start-bottom",
                modifiers: {
                    preventOverflow: { enabled: false },
                    hide: {
                        enabled: false
                    }
                }
            });
            return false;
        });
    }


    const mobileBtn = document.querySelector('#dropdownMenuLink');
    const controls = document.querySelector('[data-ref="controls"]');
    let filters = null;
    const mobilecontrols = document.querySelector('[data-ref="mobilecontrols"]');
    let mobilefilters = null;
    const sorts = document.querySelectorAll('[data-ref="sort"]');
    const search = document.querySelector('[data-ref="search"]');
    const items = window.integrations;

    if(!container) return;

    const collection = Array.prototype.slice.call(container.querySelectorAll('.mix'));

    if(controls) {
        filters = controls.querySelectorAll('[data-ref="filter"]');
    }
    if(mobilecontrols) {
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

    if(parseInt($(window).width()) <= 575) {
        config['animation']['enable'] = false;
    }

    const mixer = mixitup(container, config);

    controls.addEventListener('click', function(e) {
        // e.preventDefault();
        handleButtonClick(e.target, filters);
        // trigger same active on mobile
        // $('.integrations-select').val('#'+e.target.getAttribute('href').substr(1));
        const mobileBtn = controls.querySelector(`[data-filter="${e.target.getAttribute('data-filter')}"]`);
        activateButton(mobileBtn, mobilefilters);
        // return false;
    });

    mobilecontrols.addEventListener('click', function(e) {
        e.stopPropagation();
        // e.preventDefault();
        handleButtonClick(e.target, mobilefilters);
        // trigger same active on desktop
        const desktopBtn = controls.querySelector(`[data-filter="${e.target.getAttribute('data-filter')}"]`);
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
            if (e.target.value.length > 0) {
                window.datadog_logger.log('Integrations Search', {"browser": {"integrations":{"search":e.target.value.toLowerCase()}}}, 'info');
            }
        }, 400);
    });

    function activateButton(activeButton, siblings) {
        let button;
        let i;

        if(activeButton && siblings) {
            for (i = 0; i < siblings.length; i++) {
                button = siblings[i];
                button.classList[button === activeButton ? 'add' : 'remove']('active');
            }
            mobileBtn.textContent = activeButton.textContent;
        }
    }

    function handleButtonClick(button, filters) {
        // clear the search input
        search.value = "";
        // If button is already active, or an operation is in progress, ignore the click
        if (button.classList.contains('active') || !button.getAttribute('data-filter')) return;

        const filter = button.getAttribute('data-filter');
        window.datadog_logger.log('Integrations category selected', {"browser": {"integrations":{"category":button.innerText}}}, 'info');
        activateButton(button, filters);
        updateData(filter, false);

        if (history.pushState) {
            const href = button.getAttribute('href');
            history.pushState(null, document.title, href);
        }
    }

    function updateData(filter, isSearch) {
        const show = [];
        const hide = [];
        for(let i = 0; i < window.integrations.length; i++) {
            const item = window.integrations[i];
            const domitem = document.getElementById(`mixid_${item.id}`);
            if(filter === 'all' || filter === '#all' || (isSearch && !filter)) {
                if(!is_safari) {
                    domitem.classList.remove('grayscale');
                }
                show.push(item);
            } else {
                const name = item.name ? item.name.toLowerCase() : '';
                const public_title = item.public_title ? item.public_title.toLowerCase() : '';

                if (filter
                    && (isSearch && (name.includes(filter) || public_title.includes(filter)))
                    || (!isSearch && item.tags.indexOf(filter.substr(1)) !== -1)) {
                    if(!is_safari) {
                        domitem.classList.remove('grayscale');
                    }
                    show.push(item);
                } else {
                    if(!is_safari) {
                        domitem.classList.add('grayscale');
                    }
                    hide.push(item);
                }
            }
        }
        const items = [].concat(show, hide);
        mixer.dataset(items).then(function(state) {
            if(is_safari) {
                for(let i = 0; i < window.integrations.length; i++) {
                    const item = window.integrations[i];
                    const domitem = document.getElementById(`mixid_${item.id}`);
                    if (filter === 'all' || filter === '#all' || (isSearch && !filter)) {
                        domitem.classList.remove('grayscale');
                        // show.push(item);
                    } else {
                        const name = item.name ? item.name.toLowerCase() : '';
                        const public_title = item.public_title ? item.public_title.toLowerCase() : '';

                        if (filter
                            && (isSearch && (name.includes(filter) || public_title.includes(filter)))
                            || (!isSearch && item.tags.indexOf(filter.substr(1)) !== -1)) {
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
    }

    // Set controls the active controls on startup
    activateButton(controls.querySelector('[data-filter="all"]'), filters);
    activateButton(mobilecontrols.querySelector('[data-filter="all"]'), mobilefilters);

    $(window).on('hashchange', function(){
        let current_cat = "";
        if (window.location.href.indexOf("#") > -1) {
            current_cat = window.location.href.substring(window.location.href.indexOf("#"));
        }
        const current_selected = $('.controls .active').attr('href');
        if(current_cat && current_selected) {
            if (current_cat !== current_selected) {
                $(`a[href="${  current_cat  }"]`).get(0).click();
            }
        }
        if(current_cat === "") {
            activateButton(controls.querySelector('[data-filter="all"]'), filters);
            activateButton(mobilecontrols.querySelector('[data-filter="all"]'), mobilefilters);
            updateData("all", false);
        }
    });

    if (window.location.href.indexOf("#") > -1) {
        $(window).trigger('hashchange');
    }

}