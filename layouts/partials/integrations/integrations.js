$(document).ready(function () { });

document.addEventListener('DOMContentLoaded', function () {
    var controls = document.querySelector('[data-ref="controls"]');
    var filters = document.querySelectorAll('[data-ref="filter"]');
    var sorts = document.querySelectorAll('[data-ref="sort"]');
    var container = document.querySelector('[data-ref="container"]');
    var items = window.integrations;

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
        handleButtonClick(e.target);
    });

    function activateButton(activeButton, siblings) {
        var button;
        var i;

        for (i = 0; i < siblings.length; i++) {
            button = siblings[i];
            button.classList[button === activeButton ? 'add' : 'remove']('active');
        }
    }

    function grayOut(filter) {
        var collection = Array.from(container.querySelectorAll('.mix'));
        for(var i = 0; i < collection.length; i++) {
            if(collection[i].classList.contains(filter.substr(1))) {
                collection[i].classList.remove('grayscale');
            } else {
                collection[i].classList.add('grayscale');
            }
        }
    }

    function resetGray() {
        var collection = Array.from(container.querySelectorAll('.mix'));
        for(var i = 0; i < collection.length; i++) {
            collection[i].classList.remove('grayscale');
        }
    }

    function handleButtonClick(button) {
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
            if(window.integrations[i].tags.indexOf(filter.substr(1)) !== -1) {
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
});