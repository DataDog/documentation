$(document).ready(function () {
    var finder_state = 0;  // closed
    var titles = document.getElementsByClassName('title');

    $(window).on('focus', function () {
        if (finder_state) {
            $.each(titles, function (e, v) {
                v.style.display = 'none';
            });
            $('.integration-row').removeClass('find');
            finder_state = 0;
        }
    });

    Mousetrap.bind(['command+f', 'control+f'], function (e) {
        if (!finder_state) {
            $.each(titles, function (e, v) {
                v.style.display = 'block';
            });
            $('.integration-row').addClass('find');
            finder_state = 1;
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {

    var ref = document.querySelector('.integration-popper-button');
    var pop = document.getElementById('integration-popper');
    if(ref && pop) {
        ref.addEventListener('click', function(e) {
            pop.style.display = (pop.style.display === 'none') ? 'block' : 'none';
            var p = new Popper(ref, pop, {
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


    var mobileBtn = document.querySelector('#dropdownMenuLink');
    var controls = document.querySelector('[data-ref="controls"]');
    var filters = null;
    var mobilecontrols = document.querySelector('[data-ref="mobilecontrols"]');
    var mobilefilters = null;
    var sorts = document.querySelectorAll('[data-ref="sort"]');
    var container = document.querySelector('[data-ref="container"]');
    var items = window.integrations;

    if(!container) return;

    var collection = Array.prototype.slice.call(container.querySelectorAll('.mix'));

    if(controls) {
        filters = controls.querySelectorAll('[data-ref="filter"]');
    }
    if(mobilecontrols) {
        mobilefilters = mobilecontrols.querySelectorAll('[data-ref="filter"]');
    }

    var mixer = mixitup(container, {
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
    });

    controls.addEventListener('click', function(e) {
        //e.preventDefault();
        handleButtonClick(e.target, filters);
        // trigger same active on mobile
        //$('.integrations-select').val('#'+e.target.getAttribute('href').substr(1));
        var mobileBtn = controls.querySelector('[data-filter="'+e.target.getAttribute('data-filter')+'"]');
        activateButton(mobileBtn, mobilefilters);
        //return false;
    });

    mobilecontrols.addEventListener('click', function(e) {
        e.stopPropagation();
        //e.preventDefault();
        handleButtonClick(e.target, mobilefilters);
        // trigger same active on desktop
        var desktopBtn = controls.querySelector('[data-filter="'+e.target.getAttribute('data-filter')+'"]');
        activateButton(desktopBtn, filters);
        //return false;
        pop.style.display = 'none';
        $(window).scrollTop(0);
    });

    // integrations dropdown select
    /*$('.integrations-select').on('change', function(e) {
        var filter = $(this).val();
        updateData(filter);
        // trigger same active on desktop
        var desktopBtn = controls.querySelector('[data-filter=".'+filter.substr(1)+'"]');
        activateButton(desktopBtn, filters);

        var url = window.location.href.replace(window.location.hash, '').replace(window.location.search, '');
        history.pushState(null, null, url + filter)
    });*/

    function activateButton(activeButton, siblings) {
        var button;
        var i;

        if(activeButton && siblings) {
            for (i = 0; i < siblings.length; i++) {
                button = siblings[i];
                button.classList[button === activeButton ? 'add' : 'remove']('active');
            }
            mobileBtn.textContent = activeButton.textContent;
        }
    }

    function handleButtonClick(button, filters) {
        // If button is already active, or an operation is in progress, ignore the click
        if (button.classList.contains('active') || !button.getAttribute('data-filter')) return;

        var filter = button.getAttribute('data-filter');
        activateButton(button, filters);
        updateData(filter);
    }

    function updateData(filter) {
        /*var show = [];
        var hide = [];
        for(var i = 0; i < window.integrations.length; i++) {
            var item = window.integrations[i];
            var domitem = document.getElementById('mixid_'+item.id);
            if(filter === 'all' || filter === '#all') {
                domitem.classList.remove('grayscale');
                show.push(item);
            } else {
                if(filter && item.tags.indexOf(filter.substr(1)) !== -1) {
                    domitem.classList.remove('grayscale');
                    show.push(item);
                } else {
                    domitem.classList.add('grayscale');
                    hide.push(item);
                }
            }
        }
        var items = [].concat(show, hide);
        mixer.dataset(items);*/

        mixer.filter(filter);
    }

    // Set controls the active controls on startup
    activateButton(controls.querySelector('[data-filter="all"]'), filters);
    activateButton(mobilecontrols.querySelector('[data-filter="all"]'), mobilefilters);

    $(window).on('hashchange', function(){
        var current_cat = "";
        if (window.location.href.indexOf("#") > -1) {
            current_cat = window.location.href.substring(window.location.href.indexOf("#"));
        }
        var current_selected = $('.controls .active').attr('href');
        if(current_cat && current_selected) {
            if (current_cat !== current_selected) {
                $('a[href="' + current_cat + '"]:visible').get(0).click();
            }
        }
        if(current_cat === "") {
            activateButton(controls.querySelector('[data-filter="all"]'), filters);
            activateButton(mobilecontrols.querySelector('[data-filter="all"]'), mobilefilters);
            updateData("all");
        }
    });

    if (window.location.href.indexOf("#") > -1) {
        $(window).trigger('hashchange');
    }
});