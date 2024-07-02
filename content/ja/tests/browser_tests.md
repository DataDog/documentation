---
title: Instrument Your Browser Tests With RUM
kind: documentation
description: Learn how to use CI Visibility and RUM to connect your test results with browser sessions and session replays.
aliases:
- /continuous_integration/guides/rum_integration
- /continuous_integration/integrate_tests/browser_tests
- /continuous_integration/tests/browser_tests
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: Learn about Test Visibility
- link: /real_user_monitoring/browser
  tag: Documentation
  text: Learn about RUM Browser Monitoring
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Test Visibility integrates with Datadog [Real User Monitoring][2] to provide you with the tools for deep analysis of your browser tests.

### Compatibility

To enable RUM integration ensure that [Test Visibility][1] is set up for your tests and that the application being tested is instrumented using [RUM][2].

RUM integration is supported for Cypress browser tests and Selenium-driven browser tests.

#### Cypress

* `cypress` >= 6.7.0
* `dd-trace-js` >= 1.7.0
* `browser-sdk` >= 3.11.0

#### Selenium

* `selenium-js` >= 4.11.0, `dd-trace-js` >= 5.11.0 / >= 4.35.0
* `selenium-java` >= 3.141.59, `dd-trace-java` >= 1.34.0
* `selenium-dotnet` >= 3.0.0, `dd-trace-dotnet` >= 2.51.0
* `selenium-ruby` >= 4.0.0, `datadog-ci` >= 1.0.0.beta6
* `browser-sdk` >= 5.15.0

<blockquote class="alert alert-info">
From Browser SDK v5.0.0, enable the `allowUntrustedEvents` initialization parameter during the tests to correctly capture clicks.
</blockquote>

## ブラウザテストとRUM の接続

If you use Cypress or Selenium to run your browser tests and the application being tested is instrumented using [Real User Monitoring][2], your test results and their generated RUM browser sessions and session replays are automatically linked.

Test Visibility のテスト詳細サイドパネルに、**Browser Sessions** タブが表示されます。

{{< img src="ci/ci-browser-session-tab.png" alt="テスト詳細のブラウザセッションタブ" style="width:100%;">}}

RUM セッションには、[RUM が通常収集する][3]データがすべて含まれているため、予期せぬエラーなど、ブラウザテストで起こりうる問題をデバッグすることができます。

{{< img src="ci/ci-browser-session-tab-errors.png" alt="テスト詳細のブラウザセッションタブエラー" style="width:100%;">}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/setup/
[2]: /real_user_monitoring/browser/
[3]: /real_user_monitoring/browser/data_collected/
