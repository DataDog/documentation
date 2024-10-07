---
title: Nested Queries
further_reading:
- link: "/dashboards/querying/"
  tag: "Documentation"
  text: "Dashboard Querying"
---

## Overview

{{< callout url="#" btn_hidden="true">}}
  This feature is in Preview. Please reach out to Customer Success to get this feature enabled. 
{{< /callout >}}  

Every metrics query in Datadog consists of two layers of aggregation by default (quick refresher [here](https://docs-staging.datadoghq.com/rachealou/nested-queries-updates/metrics/#anatomy-of-a-metric-query)). 
Nested queries allows users to reuse the results of an initial existing query as input to a subsequent one. 

![nestedqueries](https://github.com/user-attachments/assets/b1b0a116-70cb-40da-a48a-2ab318a17d12)

Nested queries unlocks several powerful capabilities: 

- Multilayer aggregation 
- Percentiles and standard deviation on non-distribution metrics
- Higher resolution queries over historical timeframes

This unlocks multiple query features including multilayer aggregation, standard deviation, and higher resolution queries over historical time frames. Percentiles are also enabled with nested queries, but for metrics where globally accurate percentile aggregations are essential, submitting [distribution metrics][4] achieves this directly without applying nested queries. 



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
This query calculates the 95th percentile of average CPU utilization for each EC2 instance grouped by environment and team, rolled up into 5-minute intervals, over the last 30 minutes.

```text
"rollup(avg:aws.ec2.cpuutilization{*} by {env,host}.rollup(avg, 300),'p95',1800)"
```

In the UI or JSON tab, it would look as follows:

{{< img src="/metrics/nested_queries/multilayer-time-agg-ui.png" alt="example of multilayer time aggregation in the JSON" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/multilayer-time-agg-json.png" alt="example of multilayer time aggregation in the JSON" style="width:100%;" >}}
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
In the UI or JSON tab, it would look as follows:

{{< img src="/metrics/nested_queries/multilayer-space-agg-ui.png" alt="example of multilayer space aggregation in the UI" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/multilayer-space-agg-json.png" alt="example of multilayer space aggregation in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 



## Percentiles

Percentile calculations provide deeper insights into your data's distribution by allowing you to set performance thresholds, and identifying outliers/extremes in your data.

Here's an example that calculates the 95th percentile of average CPU utilization, grouped by environment and host, rolled up into 5-minute intervals, over the last 30 minutes:

{{% collapse-content title="Percentiles example query" level="h5" %}}
```text
"rollup(avg:aws.ec2.cpuutilization{*} by {env,host}.rollup(avg, 300),'p95',1800)"
```

In the UI or JSON tab, it would look as follows:

 {{< img src="/metrics/nested_queries/nested-queries-percentiles-ui.png" alt="example of percentiles  using nested queries in the UI" style="width:100%;" >}}

 {{< img src="/metrics/nested_queries/nested-queries-percentiles-json.png" alt="example of percentiles  using nested queries in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 



## Standard Deviation

Standard deviation helps measure the variability or dispersion of a dataset. The following query calculates the standard deviation of the sum of API request counts, averaged over 5-minute intervals, and rolled up over 1-hour periods:

{{% collapse-content title="Standard deviation example query" level="h5" %}}
```text
"rollup(sum:api.requests.count{*}.rollup(avg,300),'stddev',14400)"
```
In the UI or JSON tab, it would look as follows:

 {{< img src="/metrics/nested_queries/nested-queries-std-ui.png" alt="example of standard deviation with nested queries in the UI" style="width:100%;" >}}

 {{< img src="/metrics/nested_queries/nested-queries-std-jsonigh.png" alt="example of standard deviation with nested queries in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 



## Higher Resolution Queries

As the query time frame increases, the rollup interval becomes less granular, preventing you from querying anything more detailed than those default time intervals. With nested queries, you can now access more granular, high-resolution data over longer periods.

Here's an example that calculates the standard deviation of high-resolution metrics batch counts, with a 5-minute base and a 4-hour reducer interval:

{{% collapse-content title="Higher resolution example query" level="h5" %}}
```text
"rollup(sum:dd.metrics.query.batch.count{*}.rollup(avg,300),`stddev`,14400)"
```
In the UI or JSON tab:

{{< img src="/dashboards/querying/nested-queries-higher-res-ui.png" alt="example of higher resolution queries using nested queries in the UI" style="width:100%;" >}}

{{< img src="/dashboards/querying/nested-queries-higher-res-json.png" alt="example of higher resolution queries using nested queries in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 



## How can I use Datadog API's to leverage nested queries?
You can use nested queries functionality in our public API for querying timeseries data [here][3]. Simply change the contents of the **formula** object

You would need to change the contents of the formula string parameter as seen here:

 {{< img src="/metrics/nested_queries/nested-queries-using-api.png" alt="example of higher resolution queries using nested queries in the JSON" style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/functions/rollup/
[2]: /metrics/#configure-time-aggregation
[3]: /metrics/#query-timeseries-data-across-multiple-products
[4]: /metrics/distributions/