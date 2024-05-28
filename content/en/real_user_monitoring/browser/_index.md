---
title: RUM Browser Monitoring
kind: documentation
aliases:
  - /real_user_monitoring/setup
further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/logs/log_collection/javascript/'
  tag: 'Documentation'
  text: 'Learn about the Datadog Browser SDK for Logs'
---

## Overview

Datadog Real User Monitoring (RUM) for browser monitoring enables you to visualize and analyze the real-time performance and user journeys of your application's individual users. Get insight into your application's frontend performance from the perspective of real users. To collect events, add the RUM Browser SDK to your browser application and configure what data is collected using initialization parameters.

{{< img src="real_user_monitoring/browser/rum-browser-overview.png" alt="RUM performance summary dashboard" style="width:100%;">}}

## Getting started

To get started with the RUM Browser SDK, follow the steps to [create a JavaScript RUM application][1].

## Advanced configuration

You can modify the data and context collected by RUM to support your specific needs. Learn how to override default settings in [Advanced Configuration][2].

## 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/setup/#setup
[2]: /real_user_monitoring/browser/advanced_configuration/