---
description: Learn how to leverage Datadog platform capabilities to maximize RUM capabilities.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Learn about the RUM Explorer
kind: documentation
title: Platform
---

## Overview

Once you've started collecting data for your RUM applications, you can leverage Datadog platform capabilities to visualize, monitor, and analyze data across RUM and the rest of your connected stack. 

## Create dashboards
Use [dashboards][1] to track, analyze, and display key performance and usage metrics.

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="RUM dashboard" >}}

## Configure monitors
Configure [monitors][2] to notify your teams, and manage alerts at a glance on the Alerting platform.

{{< img src="monitors/monitor_types/rum/rum_multiple_queries_2.png" alt="A monitor configured to alert on the error rate of a cart page. This monitor has two queries (a and b) and contains a formula: (a/b)*100." style="width:80%;" >}}

## Generate Custom Metrics
Generate [custom metrics][3] to track application KPIs over an extended period of time of up to 15 months.

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="Generate a RUM-based custom metric" width="80%" >}}

## Connect RUM and Traces
[Connect RUM and Traces][4] to Link frontend requests to their corresponding backend traces and pinpoint issues anywhere in your stack.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM and Traces" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/platform/dashboards
[2]: /ja/monitors/types/real_user_monitoring/
[3]: /ja/real_user_monitoring/platform/generate_metrics
[4]: /ja/real_user_monitoring/platform/connect_rum_and_traces