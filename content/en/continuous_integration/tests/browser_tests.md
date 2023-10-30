---
title: Instrument Your Browser Tests With RUM
kind: documentation
description: Learn how to use CI Visibility and RUM to connect your test results with browser sessions and session replays.
aliases:
- /continuous_integration/guides/rum_integration
- /continuous_integration/integrate_tests/browser_tests
further_reading:
- link: "/continuous_integration/tests"
  tag: "Documentation"
  text: "Learn about Test Visibility"
- link: "/real_user_monitoring/browser"
  tag: "Documentation"
  text: "Learn about RUM Browser Monitoring"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Ensure that [Test Visibility][1] is already set up for Cypress.

### Compatibility

The CI Visibility - RUM integration is only available for these versions of `cypress`, `dd-trace-js`, and `browser-sdk`:

* `cypress` >= 6.7.0
* `dd-trace-js` >= 1.7.0
* `browser-sdk` >= 3.11.0

Only `cypress` is supported for this integration at the moment.

<blockquote class="alert alert-info">
From Browser SDK v5.0.0, enable the `allowUntrustedEvents` initialization parameter during Cypress tests to correctly capture clicks.
</blockquote>

## Connect browser tests and RUM

If you use Cypress to run your browser tests and the application being tested is instrumented using [Real User Monitoring][2], your test results and their generated RUM browser sessions and session replays are automatically linked.

A **Browser Sessions** tab appears in the Test Visibility test details side panel.

{{< img src="ci/ci-browser-session-tab.png" alt="Browser Session Tab in Test Detail" style="width:100%;">}}

The RUM session has all the data that [RUM normally collects][3] so you can debug potential issues in your browser tests, such as unexpected errors.

{{< img src="ci/ci-browser-session-tab-errors.png" alt="Browser Session Tab Errors in Test Detail" style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/javascript/?tab=cypress#instrument-your-tests
[2]: /real_user_monitoring/browser/
[3]: /real_user_monitoring/browser/data_collected/
