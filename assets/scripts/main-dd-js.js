import Modal from 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/collapse';

import './datadog-docs';
import './utms';

import './components/copy-code';
import './components/global-modals';
// import './components/header';
import './components/platforms';
import './components/algolia';
import './components/api';
import './components/code-languages';
import './components/language-select';
import './components/bootstrap-dropdown-custom';
import './components/navbar'; // should move this to websites-modules
import './components/mobile-nav'; // should move this to websites-modules

// Event handlers
document.querySelectorAll('.sign-up-trigger').forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        const signupModal = new Modal(document.getElementById('signupModal'))
        signupModal.show(item)
    })
})

// TODO: split up code from datadog-docs.js into modules after webpack migration
// import './components/sidenav';
