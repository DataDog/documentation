import Modal from 'bootstrap/js/dist/modal';
import Tooltip from 'bootstrap/js/dist/tooltip';
import { getSignupFailover } from 'signup-failover';

import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/collapse';

import './datadog-docs';
import './utms';
import './alpine';
import './cookie-banner';

import './components/copy-code';
import './components/global-modals';
import './components/platforms';
import './components/api';
import './components/code-languages';
import './components/bootstrap-dropdown-custom';
import './components/navbar'; // should move this to websites-modules
import './components/mobile-nav'; // should move this to websites-modules

// Event handlers
document.querySelectorAll('.sign-up-trigger').forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault();

        getSignupFailover().then((failoverEnabled) => {
            if (failoverEnabled) {
                const demoModal = document.querySelector('#signupDemo');
                const signupDemoModal = demoModal ? new Modal(demoModal) : null;
                if(signupDemoModal) {
                  signupDemoModal.show(item);
                }
            } else {
                const signupModal = new Modal(document.getElementById('signupModal'))
                signupModal.show(item)
            }
        });
    })
})

// TODO: split up code from datadog-docs.js into modules after webpack migration
// import './components/sidenav';

// Add Bootstrap Tooltip across docs
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
Array.from(tooltipTriggerList).map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))