---
title: Metrics Introduction
kind: documentation
description: "Learn about data, aggregation, and graphing metrics"
aliases:
  - /graphing/metrics/introduction/
further_reading:
  - link: "/metrics/explorer"
    tag: "Documentation"
    text: "Metrics Explorer"
  - link: "/metrics/summary"
    tag: "Documentation"
    text: "Metrics Summary"
  - link: "/metrics/distributions"
    tag: "Documentation"
    text: "Metrics Distributions"
---

<div class="alert alert-warning">
Metrics without Limits provides the ability to customize tagging on all metric types in-app without having to redeploy or change any code. Metrics without Limits is now in public beta. Interested? <a href="/help">Contact Datadog support to join</a>.

**Note**: Review the [custom metrics billing page][1] to learn how custom tagging effects billing.
</div>

### Metric data

In Datadog, metric data is ingested and stored as data points with a value and timestamp:

```text
[ 17.82,  22:11:01 ]
```

A sequence of data points is stored as a time series:

```text
[ 17.82,  22:11:01 ]
[  6.38,  22:11:12 ]
[  2.87,  22:11:38 ]
[  7.06,  22:12:00 ]
```

Datadog stores metric points at a 1 second resolution. However, it is recommended that you only submit points every 15 seconds. Any metrics with fractions of a second timestamps are rounded to the nearest second. If any points have the same timestamp, the latest point overwrites the previous ones.

### Query

A query extracts a stored time series and reports the data points over a defined span of time. This is a graphed time series over 15 minutes:

{{< img src="metrics/introduction/query.png" alt="Query" >}}

When the selected time span is small, all data points are displayed. However, as this time span becomes larger, it is not possible to display thousands of raw data points in a single pixel.

### Time aggregation

Datadog uses time aggregation to solve the display problem. Data points are placed into buckets of time with preset start and end points. For example, when examining four hours, data points are combined into five-minute buckets. Combining data points in this way is referred to as a **rollup**:

{{< img src="metrics/introduction/time-aggregation.png" alt="Time Aggregation" >}}

Datadog tries to return about 150 points for any given time window. Granularity becomes coarser as the amount of time requested increases. Time aggregation is done through averages.

### Combining time series

Time series are often combined together to produce a single representative time series. For example, you might want to see the average data received by the web servers in your infrastructure.

Take two hosts submitting the same metric to Datadog:

{{< img src="metrics/introduction/adding-by-host.png" alt="Two hosts send metrics to Datadog"  style="width:35%;">}}

When you look at the data separated by host, `net.bytes_rcvd` is submitted at slightly different times:

{{< img src="metrics/introduction/mismatched-time-series.png" alt="Mismatched Time Series" >}}

### Space aggregation

To combine the two time series, the data must be time-synced. Datadog uses one of the following methods:

  1. If no time aggregation is applied, the data points must be interpolated. A common timestamp must be decided, then the value for each time series is estimated at that time.

    {{< img src="metrics/introduction/interpolation.png" alt="Interpolation"  style="width:80%;">}}

  2. If time aggregation is applied, a rollup is used to create time buckets that share start and end points for each time series:

    {{< img src="metrics/introduction/rollup.png" alt="Rollup"  style="width:80%;">}}

Once the points are time-aligned, the time series is space aggregated to produce a single time series representing the average of both:

{{< img src="metrics/introduction/combined-series.png" alt="Interpolation" >}}

### Breaking down the metric query

In Datadog, the metric query looks like this:

{{< img src="metrics/introduction/ui-query.png" alt="UI Query"  style="width:70%;">}}

Looking at the JSON, the query can be broken out by space aggregation, metric name, scope, and grouping:

{{< img src="metrics/introduction/color-query.png" alt="Query explained"  style="width:70%;">}}

* **Scope** is the set of tags used to choose time series for the query.
* **Grouping** is the set of tags over which to apply space aggregation.
* **Time aggregation** is done implicitly, but can be set manually with the rollup function:

{{< img src="metrics/introduction/color-query2.png" alt="Query explained"  style="width:70%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/billing/custom_metrics
