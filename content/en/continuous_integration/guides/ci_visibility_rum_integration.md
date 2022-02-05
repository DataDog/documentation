---
title: Instrumenting your browser tests with RUM
kind: guide
aliases: /continuous_integration/guides/rum_integration/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

### Compatibility

The CI Visibility - RUM integration is only available for these versions of `cypress`, `dd-trace-js` and `browser-sdk`:

* `cypress` >= 6.7.0
* `dd-trace-js` >= 1.7.0
* `browser-sdk` >= 3.11.0

**Note**: Only `cypress` is supported for this integration at the moment.

### Browser tests and RUM

If you use Cypress for your browser tests and your application under test is instrumented using [RUM][1], your test results and their generated RUM browser sessions and session replays will be automatically linked. A new **Browser Sessions** tab appears in the test detail side panel:

{{< img src="ci/ci-browser-session-tab.png" alt="Browser Session Tab in Test Detail" style="width:100%;">}}

This RUM session has all the data that [RUM normally collects][2], so it lets you debug potential issues in your browser test, such as unexpected errors:

{{< img src="ci/ci-browser-session-tab-errors.png" alt="Browser Session Tab Errors in Test Detail" style="width:100%;">}}

[1]: /real_user_monitoring/browser/
[2]: /real_user_monitoring/browser/data_collected/
