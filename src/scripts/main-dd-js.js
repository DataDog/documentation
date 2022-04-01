import 'bootstrap';


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

/* temporary - just for header get started */
// Event handlers
$('.main-nav .sign-up-trigger').on('click', function (event) {
    event.preventDefault();
    $('#signupModal').modal('show');
});

// TODO: split up code from datadog-docs.js into modules after webpack migration
// import './components/sidenav';
