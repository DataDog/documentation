---
title: Nested Queries
further_reading:
- link: "/dashboards/querying/"
  tag: "Documentation"
  text: "Dashboard Querying"
---

## Overview

Datadog’s nested queries feature allows you to add additional layers of aggregation on the results of existing queries in time and space. This functionality is available through the JSON tab or the API, and it supports various aggregation functions to enhance data analysis. Nested queries help you achieve multilayer aggregation, compute percentiles, and standard deviations on metrics, and run higher resolution queries over historical time frames.

Datadog currently allows for [time and space aggregation][2] of your metric queries allowing for custom roll-up  capaibilities but were limited to up to 1 time and 1 space aggregation per query. With nested queries, you are now able to add an additional layer of aggregation on the results of existing queries in time and space. This unlocks new querying functionality including multilayer aggregation, standard deviation

## Multilayer aggregation

In Datadog, each metric query in Datadog is evaluated with two layers of aggregation: first by time, then by space. Multilayer aggregation allows you to apply additional layers of aggregation beyond the default.

| Supported Functions   | Description                                                                                    |
|-----------------------|-----------------------------------------------------------------------------------------------|
| Arithmetic operators   | `+, -, *, /`                                                                                  |
| Timeshift functions    | `<METRIC_NAME>{*}, -<TIME_IN_SECOND>`<br> `hour_before(<METRIC_NAME>{*})`<br> `day_before(<METRIC_NAME>{*})`<br> `week_before(<METRIC_NAME>{*})`<br> `month_before(<METRIC_NAME>{*})` |
| Top-k selection        | `top(<METRIC_NAME>{*}, <LIMIT_TO>, '<BY>', '<DIR>')`                                         |

Other functions cannot be combined with multilayer aggregation.

### Multilayer time aggregation

Multilayer time aggregation is expressed with the `rollup` function. The first `rollup` applied to a query determines its base level precision and aggregation. For more information, see the [Rollup][1] documentation. Subsequent rollups allow for additional layers of time aggregation.

The first rollup supports the following aggregators:
- `avg`
- `sum`
- `min`
- `max`
- `count`

Additional layers of time aggregation support:

- `avg`
- `sum`
- `min`
- `max`
- `count`
- `arbitrary percentile pxx` (`p78, p99, p99.99, etc.`)
- `stddev`

{{% collapse-content title="Time aggregation example query" level="h5" %}}
This query calculates the 95th percentile of average CPU utilization for each EC2 instance grouped by environment and host, rolled up into 5-minute intervals, over the last 30 minutes.

```text
"rollup(avg:aws.ec2.cpuutilization{*} by {env,host}.rollup(avg, 300),'p95',1800)"
```

In JSON or API format, it would look as follows:

{{< img src="/metrics/nested_queries/multilayer-time-agg-example.png" alt="example of multilayer time aggregation in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 


### Multilayer space aggregation

Multilayer space aggregation is expressed with the name of the aggregator. Aggregators such as max(), stddev(), sum() have one argument, which is the tag key(s) to group by. Percentile space aggregation, on the other hand, requires two arguments: The percentile aggregator in the form of pxx and the tag key(s) to group-by.

{{% collapse-content title="Space aggregation example queries" level="h5" %}}
The following query calculates the sum of average CPU utilization, grouped by environment:

```text
sum(avg:aws.ec2.cpuutilization{*} by {env,host}.rollup(avg, 300),{env})
```

For percentile space aggregation, the following query calculates the 95th percentile of average CPU utilization, grouped by environment:

```text
percentile(avg:aws.ec2.cpuutilization{*} by {env,host}.rollup(avg, 300),'p95', {env})
```
In JSON or API format, it would look as follows:

{{< img src="/metrics/nested_queries/multilayer-space-agg-example.png" alt="example of multilayer space aggregation in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 


## Percentiles

Percentile calculations allow for a deeper understanding of data distribution. Here's an example that calculates the 95th percentile of average CPU utilization, grouped by environment and host, rolled up into 5-minute intervals, over the last 30 minutes:

{{% collapse-content title="Percentiles example query" level="h5" %}}
```text
"rollup(avg:aws.ec2.cpuutilization{*} by {env,host}.rollup(avg, 300),'p95',1800)"
```
In JSON or API format:

 {{< img src="/metrics/nested_queries/nested-queries-percentiles-example.png" alt="example of percentiles  using nested queries in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 


## Standard Deviation

Standard deviation helps measure the variability or dispersion of a dataset. The following query calculates the standard deviation of the sum of API request counts, averaged over 5-minute intervals, and rolled up over 1-hour periods:

{{% collapse-content title="Standard deviation example query" level="h5" %}}
```text
"rollup(sum:api.requests.count{*}.rollup(avg,300),'stddev',3600)"
```
In JSON or API format:

 {{< img src="/metrics/nested_queries/nested-queries-standard-dev-example.png" alt="example of standard deviation with nested queries in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 


## Higher Resolution Queries

High-resolution queries allow you to obtain more granular data over extended periods. Here's an example that calculates the standard deviation of high-resolution metrics batch counts, with a 5-minute base and a 4-hour reducer interval:

{{% collapse-content title="Higher resolution example query" level="h5" %}}
```text
"rollup(sum:dd.metrics.query.batch.count{*}.rollup(avg,300),`stddev`,14400)"
```
In JSON or API format:

 {{< img src="/dashboards/querying/nested-queries-higher-res-example.png" alt="example of higher resolution queries using nested queries in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/functions/rollup/
[2]: /metrics/#configure-time-aggregation
