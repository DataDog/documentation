---
title: Metrics Introduction
kind: documentation
description: "Learn about data, aggregation, and graphing metrics"
aliases:
  - /graphing/metrics/introduction/
further_reading:
  - link: "graphing/metrics/explorer"
    tag: "Documentation"
    text: "Metrics Explorer"
  - link: "graphing/metrics/summary"
    tag: "Documentation"
    text: "Metrics Summary"
  - link: "graphing/metrics/distributions"
    tag: "Documentation"
    text: "Metrics Distributions"
---

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

### Query

A query extracts a stored time series and reports the data points over a defined span of time. This is a graphed time series over 15 minutes:

{{< img src="graphing/metrics/introduction/query.png" alt="Query" responsive="true">}}

When the selected time span is small, all data points are displayed. However, as this time span becomes larger, it is not possible to display thousands of raw data points in a single pixel.

### Time aggregation

Datadog uses time aggregation to solve the display problem. Data points are placed into buckets of time with preset start and end points. For example, when examining four hours, data points are combined into five-minute buckets. Combining data points in this way is referred to as a **rollup**:

{{< img src="graphing/metrics/introduction/time-aggregation.png" alt="Time Aggregation" responsive="true">}}

### Combining time series

Time series are often combined together to produce a single representative time series. For example, you might want to see the average data received by the web servers in your infrastructure.

Take two hosts submitting the same metric to Datadog:

{{< img src="graphing/metrics/introduction/adding-by-host.png" alt="Two hosts send metrics to Datadog" responsive="true" style="width:35%;">}}

When you look at the data separated by host, `net.bytes_rcvd` is submitted at slightly different times:

{{< img src="graphing/metrics/introduction/mismatched-time-series.png" alt="Mismatched Time Series" responsive="true">}}

### Space aggregation

To combine the two time series, the data must be time-synced. Datadog uses one of the following methods:

  1. If no time aggregation is applied, the data points must be interpolated. A common timestamp must be decided, then the value for each time series is estimated at that time.

    {{< img src="graphing/metrics/introduction/interpolation.png" alt="Interpolation" responsive="true" style="width:80%;">}}

  2. If time aggregation is applied, a rollup is used to create time buckets that share start and end points for each time series:

    {{< img src="graphing/metrics/introduction/rollup.png" alt="Rollup" responsive="true" style="width:80%;">}}

Once the points are time-aligned, the time series is space aggregated to produce a single time series representing the average of both:

{{< img src="graphing/metrics/introduction/combined-series.png" alt="Interpolation" responsive="true">}}

### Breaking down the metric query

In Datadog, the metric query looks like this:

{{< img src="graphing/metrics/introduction/ui-query.png" alt="UI Query" responsive="true" style="width:70%;">}}

Looking at the JSON, the query can be broken out by space aggregation, metric name, scope, and grouping:

{{< img src="graphing/metrics/introduction/color-query.png" alt="Query explained" responsive="true" style="width:70%;">}}

* **Scope** is the set of tags used to choose time series for the query.
* **Grouping** is the set of tags over which to apply space aggregation.
* **Time aggregation** is done implicitly, but can be set manually with the rollup function:

{{< img src="graphing/metrics/introduction/color-query2.png" alt="Query explained" responsive="true" style="width:70%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
