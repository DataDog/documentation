---
title: Metrics Introduction
kind: documentation
description: "Learn about data, aggregation, and graphing metrics"
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

## Metric data

In Datadog, data points are ingested and stored as a metric value and a timestamp:

```
[ 17.82,  22:11:01 ]
```

A sequence of data points are stored as a **time series**:

```
[ 17.82,  22:11:01 ]
[  6.38,  22:11:12 ]
[  2.87,  22:11:38 ]
[  7.06,  22:12:00 ]
```

### Query

A query extracts the stored time series and reports them over a defined span in time. This is a graphed time series:

{{< img src="/graphing/metrics/introduction/query.png" alt="Query" responsive="true">}}

When the selected time span is small, all data points associated with the window of time are displayed. However, as this time span becomes larger, it becomes problematic to process and display potentially thousands of raw data points.

### Time aggregation

The solution to the display problem is time aggregation. Data points are placed into buckets of time, with preset start and endpoints. The previous example only showed 15 minutes. When examining four hours, data points are combined into five minute buckets. Combining data points in this way is referred to as a `rollup`.

{{< img src="/graphing/metrics/introduction/time-aggregation.png" alt="Time Aggregation" responsive="true">}}

### Combining timeseries

However, timeseries are often combined together to produce a single representative timeseries. For example, you might want the average amount of data received by the web servers in our infrastructure.

Take two hosts submitting a metric to Datadog:

{{< img src="/graphing/metrics/introduction/adding-by-host.png" alt="Two hosts send metrics to Datadog" responsive="true" style="width:35%;">}}

Querying the data then graphing the metric `net.bytes_rcvd` in time:

{{< img src="/graphing/metrics/introduction/mismatched-time-series.png" alt="Mismatched Time Series" responsive="true">}}

### Space Aggregation

To combine the two time series, the data must be time-synced. One of two methods must be used:

  1. If no time aggregation is applied, the data points must be interpolated. A common timestamp must be decided, then the value for each timeseries is estimated at that time.

    {{< img src="/graphing/metrics/introduction/interpolation.png" alt="Interpolation" responsive="true" style="width:80%;">}}

  2. Otherwise, a **rollup** can be used to create time buckets that share start and end points for each timeseries.

    {{< img src="/graphing/metrics/introduction/rollup.png" alt="Rollup" responsive="true" style="width:80%;">}}

Once time-aligned, the timeseries can be **Space Aggregated** to produce a single time series representing (in this case) the average of both:

{{< img src="/graphing/metrics/introduction/combined-series.png" alt="Interpolation" responsive="true">}}

### Time and Space Aggregation in the Metric Query

In the Datadog UI, each part of the query is represented like so:

{{< img src="/graphing/metrics/introduction/ui-query.png" alt="UI Query" responsive="true" style="width:70%;">}}

Underneath, this looks like this:

{{< img src="/graphing/metrics/introduction/color-query.png" alt="Query explained" responsive="true" style="width:70%;">}}

**Scope** is the set of tags used to choose time series for the query, while the **Grouping** is the set of tags over which to apply Space Aggregation. Time aggregation is usually implicitly done for you, but can be set manually via the rollup function:

{{< img src="/graphing/metrics/introduction/color-query2.png" alt="Query explained" responsive="true" style="width:70%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
