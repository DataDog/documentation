---
title: Monitor Sensitive Data Scanner Usage
description: Graph and alert on the volume of data Sensitive Data Scanner scans, broken down by product and service, using the scanned bytes estimated usage metric.
further_reading:
  - link: /account_management/billing/usage_metrics/
    tag: Documentation
    text: Learn more about estimated usage metrics
  - link: /security/sensitive_data_scanner/
    tag: Documentation
    text: Set up Sensitive Data Scanner
  - link: /metrics/explorer/
    tag: Documentation
    text: Learn more about the Metrics Explorer
  - link: /monitors/types/metric/
    tag: Documentation
    text: Learn to set up metric monitors
---
## Overview

Sensitive Data Scanner reports the volume of data it scans in Logs, APM, RUM, and Events with the `datadog.estimated_usage.sds.scanned_bytes` [estimated usage metric][1]. Use this guide to track scanned volume in a graph or alert on it, and to read the breakdown by product and service correctly. This guide is for teams that manage Sensitive Data Scanner adoption or cost and want to see which products and services drive scanned volume.

The metric includes the following tags:

`product`
: The product the scanned data comes from: Logs, APM, RUM, or Events.

`service`
: The service the scanned data comes from. Data without a `service` tag is grouped under `service:unknown`.

`scanning_group_id`
: The scanning group that scanned the data. The `scanning_group_id:global` value prevents the same event from being counted multiple times when different scanning groups scan it. Exclude it from your queries. It does not impact billing.

## Prerequisites

Before you start, verify you have:

- Sensitive Data Scanner configured with scanning groups and scanning rules. See [Set up Sensitive Data Scanner][2] for more information.
- [Permissions][3] to create dashboards or monitors.

## Graph scanned volume by product and service

1. Navigate to the [Metrics Explorer][4], or add a timeseries widget to a [dashboard][5].
1. In the metric field, select `datadog.estimated_usage.sds.scanned_bytes`.
1. In the {{< ui >}}from{{< /ui >}} field, add `!scanning_group_id:global` to exclude the global scanning group.
1. Set the space aggregation to `sum` and group by `product` and `service`.
1. Apply the `as_count()` function to graph the scanned bytes in each interval. The resulting query is:

   ```
   sum:datadog.estimated_usage.sds.scanned_bytes{!scanning_group_id:global} by {product,service}.as_count()
   ```

## Create a monitor on scanned volume

1. Navigate to [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][6] and select the {{< ui >}}Metric{{< /ui >}} monitor type.
1. In the {{< ui >}}Define the metric{{< /ui >}} section, enter the same query:

   ```
   sum:datadog.estimated_usage.sds.scanned_bytes{!scanning_group_id:global} by {product,service}.as_count()
   ```

1. In the {{< ui >}}Set alert conditions{{< /ui >}} section, set a threshold above your normal scanned volume. Monitor the metric for 1-2 weeks to establish a baseline before you choose a threshold.
1. Configure [notifications][7] and add a monitor message that names the team responsible for the affected service.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/billing/usage_metrics/
[2]: /security/sensitive_data_scanner/
[3]: /account_management/rbac/permissions/
[4]: https://app.datadoghq.com/metric/explorer
[5]: /dashboards/
[6]: https://app.datadoghq.com/monitors/create/metric
[7]: /monitors/notify/
