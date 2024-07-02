---
title: Instrumenting your Swift tests with RUM
kind: documentation
description: Learn how to use CI Visibility and RUM to connect your Swift test results with browser sessions and session replays.
aliases:
- /continuous_integration/guides/rum_swift_integration
- /continuous_integration/integrate_tests/swift_tests
- /continuous_integration/tests/swift_tests
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: Learn about Test Visibility
- link: /real_user_monitoring/ios
  tag: Documentation
  text: Learn about RUM iOS and tvOS Monitoring
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Ensure that [Test Visibility][3] is already set up for Swift.

### Compatibility

The CI Visibility - RUM integration is available for these versions of `dd-sdk-swift-testing` and `dd-sdk-ios`:

* `dd-sdk-swift-testing` >= 2.0.0
* `dd-sdk-ios` >= 1.10.0

## Connect Swift tests and RUM

If you link `dd-sdk-swift-testing` for your UI tests and the application being tested is instrumented using [Real User Monitoring][1], your test results and their generated RUM browser sessions and session replays are automatically linked.

A **RUM Sessions** tab appears in the Test Visibility test detail side panel.

{{< img src="ci/ci-swift-rum-session-tab.png" alt="Browser Session Tab in Test Detail" style="width:100%;">}}

The RUM session has all the data that [RUM normally collects][2] so you can debug potential issues in your iOS tests, such as user name or unexpected errors.

{{< img src="ci/ci-swift-rum-session-tab-errors.png" alt="Browser Session Tab Errors in Test Detail" style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/ios/
[2]: /real_user_monitoring/ios/data_collected/
[3]: /continuous_integration/tests/swift/
