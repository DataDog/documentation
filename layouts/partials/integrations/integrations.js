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

    $(window).on('hashchange', function(){
        var current_cat = "#all";
        if (window.location.href.indexOf("#") > -1) {
            current_cat = window.location.href.substring(window.location.href.indexOf("#"));
        }
        var current_selected = $('.controls .active').attr('href');
        if(current_selected) {
            if (current_cat && current_selected && current_cat !== current_selected) {
                $('a[href="' + current_cat + '"]:visible').get(0).click();
            } else if(current_cat) {
                $('a[href="' + current_cat + '"]:visible').get(0).click();
            } else {
                $('a[href="#all"]:visible').get(0).click();
            }
        }
    });
    $(window).trigger('hashchange');

});

document.addEventListener('DOMContentLoaded', function () {
    var mobileBtn = document.querySelector('#dropdownMenuLink');
    var controls = document.querySelector('[data-ref="controls"]');
    var filters = null;
    var mobilecontrols = document.querySelector('[data-ref="mobilecontrols"]');
    var mobilefilters = null;
    var sorts = document.querySelectorAll('[data-ref="sort"]');
    var container = document.querySelector('[data-ref="container"]');
    var items = window.integrations;

    if(controls) {
        filters = controls.querySelectorAll('[data-ref="filter"]');
    }
    if(mobilecontrols) {
        mobilefilters = mobilecontrols.querySelectorAll('[data-ref="filter"]');
    }

    if(!container) return;

    var mixer = mixitup(container, {
        animation: {
            duration: 200
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
        var mobileBtn = controls.querySelector('[data-filter="'+e.target.getAttribute('data-filter')+'"]');
        activateButton(mobileBtn, mobilefilters);
        //return false;
    });

    mobilecontrols.addEventListener('click', function(e) {
        //e.preventDefault();
        handleButtonClick(e.target, mobilefilters);
        // trigger same active on desktop
        var desktopBtn = controls.querySelector('[data-filter="'+e.target.getAttribute('data-filter')+'"]');
        activateButton(desktopBtn, filters);
        //return false;
    });

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

    function grayOut(filter) {
        var collection = Array.from(container.querySelectorAll('.mix'));
        if(filter) {
            for(var i = 0; i < collection.length; i++) {
                if(collection[i].classList.contains(filter.substr(1))) {
                    collection[i].classList.remove('grayscale');
                } else {
                    collection[i].classList.add('grayscale');
                }
            }
        } else {

        }
    }

    function resetGray() {
        var collection = Array.from(container.querySelectorAll('.mix'));
        for(var i = 0; i < collection.length; i++) {
            collection[i].classList.remove('grayscale');
        }
    }

    function handleButtonClick(button, filters) {
        // If button is already active, or an operation is in progress, ignore the click
        if (button.classList.contains('active') || mixer.isMixing()) return;

        var filter = button.getAttribute('data-filter');
        activateButton(button, filters);
        if(filter === 'all') {
            resetGray();
        } else {
            grayOut(filter);
        }

        var show = [];
        var hide = [];
        for(var i = 0; i < window.integrations.length; i++) {
            if(filter && window.integrations[i].tags.indexOf(filter.substr(1)) !== -1) {
                show.push(window.integrations[i]);
            } else {
                hide.push(window.integrations[i]);
            }
        }
        var items = [].concat(show, hide);
        mixer.dataset(items);
    }

    // Set controls the active controls on startup
    activateButton(controls.querySelector('[data-filter="all"]'), filters);
    activateButton(mobilecontrols.querySelector('[data-filter="all"]'), mobilefilters);
});