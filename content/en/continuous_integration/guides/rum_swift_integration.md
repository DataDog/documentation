---
title: Instrumenting your Swift tests with RUM
kind: guide
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

### Compatibility

The CI Visibility - RUM integration is only available for these versions of `dd-sdk-swift-testing` and `dd-sdk-ios`:

* `dd-sdk-swift-testing` >= 2.0.0
* `dd-sdk-ios` >= 1.10.0

### Swift tests and RUM

If you link dd-sdk-swift-testing for your UI tests and the application being tested is instrumented using [RUM][1], your test results and their generated RUM browser sessions and session replays are automatically linked. A new **RUM Sessions** tab appears in the test detail side panel:

{{< img src="ci/ci-swift-rum-session-tab.png" alt="Browser Session Tab in Test Detail" style="width:100%;">}}

The RUM session has all the data that [RUM normally collects][2], so you can debug potential issues in your iOS tests, such as user name or unexpected errors:

{{< img src="ci/ci-swift-rum-session-tab-errors.png" alt="Browser Session Tab Errors in Test Detail" style="width:100%;">}}

[1]: /real_user_monitoring/ios/
[2]: /real_user_monitoring/ios/data_collected/
