---
title: Correlate RUM and Frontend Logs
description: "Correlate RUM events with logs to get full visibility into frontend and backend issues across your application stack."
aliases:
- /real_user_monitoring/correlate_with_other_telemetry/logs/
further_reading:
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "/logs/guide/ease-troubleshooting-with-cross-product-correlation/"
    tag: "Guide"
    text: "Ease troubleshooting with cross-product correlation"
algolia:
  tags: ['rum logs']
---

## Overview

The RUM integration with Logs allows you to have full visibility of the state of your application.

{{< img src="real_user_monitoring/correlate_rum_and_logs/rum_browser_logs.png" alt="Browser logs in a RUM action" style="width:100%;" >}}

Use frontend data from RUM, as well as backend, infrastructure, and log information to pinpoint issues anywhere in your stack and understand what your users are experiencing.

To start sending RUM events to Datadog, see [Set Up RUM][1].

## How is RUM correlated with Logs?

Logs and RUM events are automatically correlated. [Shared attributes][2] such as `session_id` and `view.id` keep logs and RUM events linked, even when you sample or filter them differently.

For more information, see [RUM & Session Replay Billing][3]. 
For **Browser Logs**, [match the configuration of the RUM Browser SDK and the Logs SDK][4] to correlate them.

## Setup instructions

To access the Logs setup pages, follow the links below based on your platform:

{{< card-grid card_width="200" >}}
  {{< image-card href="/logs/log_collection/javascript" src="integrations_logos/javascript_large.svg" alt="browser" >}}
  {{< image-card href="/logs/log_collection/android" src="integrations_logos/android_large.svg" alt="android" >}}
  {{< image-card href="/logs/log_collection/ios" src="integrations_logos/ios_large.svg" alt="ios" >}}
  {{< image-card href="/logs/log_collection/flutter/" src="integrations_logos/flutter_large.svg" alt="flutter" >}}
  {{< image-card href="/logs/log_collection/reactnative" src="integrations_logos/react-native_large.svg" alt="react native" >}}
  {{< image-card href="/logs/log_collection/kotlin_multiplatform" src="integrations_logos/kotlin-multiplatform_large.svg" alt="Kotlin Multiplatform" >}}
  {{< image-card href="/logs/log_collection/cpp" src="integrations_logos/cpp_large.svg" alt="C++" >}}
  {{< image-card href="/logs/log_collection/roku" src="integrations_logos/roku_large.svg" alt="Roku" >}}
  {{< image-card href="/logs/log_collection/unity" src="integrations_logos/rum-unity_large.svg" alt="Unity" >}}
  {{< image-card href="/logs/log_collection/maui" src="integrations_logos/maui_large.svg" alt=".NET MAUI" >}}
{{< /card-grid >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/setup/
[2]: /logs/guide/ease-troubleshooting-with-cross-product-correlation/#correlate-frontend-products
[3]: /account_management/billing/rum/#how-do-you-view-logs-from-the-browser-collector-in-rum
[4]: /logs/log_collection/javascript/#initialization-parameters
