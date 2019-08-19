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

A sequence of data points are then stored as a **time series**:

```
[ 17.82,  22:11:01 ]
[  6.38,  22:11:12 ]
[  2.87,  22:11:38 ]
[  7.06,  22:12:00 ]
...
```

### Query

A **query** extracts the stored time series and reports them over a defined span in time. When graphed, a time series looks like this:

![A graphed time series][1]

When the time span selected is small, all data points associated with that window of time can be displayed. However, as this time span becomes larger, it becomes problematic to process and display potentially thousands of raw data points.

### Time aggregation

The solution to the display problem is **time aggregation**. Data points are placed into buckets in time, with preset start and endpoints. The original query only spanned 15 minutes. When examining four hours, data points are combined into five minute buckets. Combining data points in this way is also referred to as a `rollup`.

![Time Aggregation - time bucketing][2]

### Combining timeseries

However, timeseries are often combined together to produce a single representative timeseries. For example, we might want the average amount of data received by the web servers in our infrastructure.

Take two hosts submitting our metric to Datadog:

<p align="center">
<img src="https://github.com/DataDog/se-docs/blob/master/images/metrics101-adding_by_host.png" height="40%" width="40%">
</p>

Querying the data then graphing the metric `net.bytes_rcvd` in time, we see...

![Time Aggregation - time bucketing][3]
<p align="center">
<img src="https://github.com/DataDog/se-docs/blob/master/images/metrics101-mismatched_time_series2.png" height="80%" width="80%">
</p>

### Space Aggregation

To combine the two time series, the data must be time-synced. One of two methods must be used:

  1. If no **Time Aggregation** (rollup) is applied, the data points must be **Interpolated**. A common timestamp must be decided, then the value for each timeseries is estimated at that time.

<p align="center">
<img src="https://github.com/DataDog/se-docs/blob/master/images/metrics101-interpolation.png" height="70%" width="70%">
</p>

  2. Otherwise, a **rollup** can be used to create time buckets that share start and end points for each timeseries.

<p align="center">
<img src="https://github.com/DataDog/se-docs/blob/master/images/metrics101-rollup.png" height="70%" width="70%">
</p>

Once time-aligned, the timeseries can be **Space Aggregated** to produce a single time series representing (in this case) the average of both:

![A graphed time series][4]

### Time and Space Aggregation in the Metric Query

In the Datadog UI, each part of the query is represented like so:

<p align="center">
<img src="https://github.com/DataDog/se-docs/blob/master/images/metrics101-UI_query.png" height="70%" width="70%">
</p>

Underneath, this looks like this:

<p align="center">
<img src="https://github.com/DataDog/se-docs/blob/master/images/metrics101-color_query.png" height="65%" width="65%">
</p>

**Scope** is the set of tags used to choose time series for the query, while the **Grouping** is the set of tags over which to apply Space Aggregation. Time aggregation is usually implicitly done for you, but can be set manually via the rollup function:

<p align="center">
<img src="https://github.com/DataDog/se-docs/blob/master/images/metrics101-color_query2.png" height="65%" width="65%">
</p>


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/se-docs/blob/master/images/metrics101-query-blurred.png
[2]: https://github.com/DataDog/se-docs/blob/master/images/metrics101-timeagg-blurred.png
[3]: https://github.com/DataDog/se-docs/blob/master/images/metrics101-mismatched_time_series.png
[4]: https://github.com/DataDog/se-docs/blob/master/images/metrics101-combined_series.png
