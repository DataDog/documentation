import Tooltip from 'bootstrap/js/dist/tooltip';

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
import './components/accordion-auto-open';
import './components/signup';

// Add Bootstrap Tooltip across docs
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
Array.from(tooltipTriggerList).map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))