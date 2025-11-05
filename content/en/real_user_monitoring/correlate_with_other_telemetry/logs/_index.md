---
title: Connect RUM and Logs
description: "Correlate RUM events with logs to get full visibility into frontend and backend issues across your application stack."
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

{{< img src="real_user_monitoring/correlate_rum_and_logs/rum_browser_logs.png" alt="Browser logs in a RUM action" style="width:100%;" >}}

## Overview

The RUM integration with Logs allows you to have full visibility of the state of your application.

Use frontend data from RUM, as well as backend, infrastructure, and log information to pinpoint issues anywhere in your stack and understand what your users are experiencing.

To start sending RUM events to Datadog, see [Real User Monitoring][1].

## How is RUM correlated with Logs?

Logs and RUM events are automatically correlated. Correlating your logs with RUM also eases [aggressive sampling strategy without losing entity-level consistency][2] with the use of attributes like `session_id` and `view.id`.

For more information, see [RUM & Session Replay Billing][3]. 
To ensure proper correlation for **Browser Logs**, you must [match configurations between the RUM Browser SDK and Logs SDK][4].

## Setup instructions

To access the Logs setup pages, follow the links below based on your platform:

{{< partial name="rum/rum-correlate-rum-and-logs.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /logs/guide/ease-troubleshooting-with-cross-product-correlation/#correlate-frontend-products
[3]: /account_management/billing/rum/#how-do-you-view-logs-from-the-browser-collector-in-rum
[4]: /logs/log_collection/javascript/#initialization-parameters
