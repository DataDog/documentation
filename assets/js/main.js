import 'bootstrap';
import '@datadog/browser-rum/bundle/datadog-rum';
import '@datadog/browser-logs/bundle/datadog-logs';

import './api-redirect';
import './datadog-docs';
import './lang-redirects';
import './region-redirects';

import './components/dd-browser-logs-rum';
import './components/announcement_banner';
import './components/copy-code';
import './components/global-modals';
import './components/header';
import './components/platforms';
import './components/algolia';
import './components/api';
import './components/code-languages';
import './components/language-select';
import './components/bootstrap-dropdown-custom';

// TODO: split up code from datadog-docs.js into modules after webpack migration
// import './components/sidenav';
