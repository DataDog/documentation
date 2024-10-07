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




## Multilayer aggregation

In Datadog, each metric query in Datadog is evaluated with two layers of aggregation: first by time, then by space. Multilayer aggregation allows you to apply additional layers of aggregation beyond the default.

| Supported Functions   | Description                                                                                    |
|-----------------------|-----------------------------------------------------------------------------------------------|
| Arithmetic operators   | `+, -, *, /`                                                                                  |
| Timeshift functions    | `<METRIC_NAME>{*}, -<TIME_IN_SECOND>`<br> `hour_before(<METRIC_NAME>{*})`<br> `day_before(<METRIC_NAME>{*})`<br> `week_before(<METRIC_NAME>{*})`<br> `month_before(<METRIC_NAME>{*})` |
| Top-k selection        | `top(<METRIC_NAME>{*}, <LIMIT_TO>, '<BY>', '<DIR>')`                                         |

Other functions cannot be combined with multilayer aggregation.

### Multilayer time aggregation

Multilayer time aggregation can be accessed with the `rollup` function. As a reminder, every metrics query already contains an initial `rollup` (time aggregation) that controls the granularity of the data points displayed on the graph. For more information, see the [Rollup][1] documentation. 

You can apply additional layers of time aggregation with subsequent rollups.

The first rollup supports the following aggregators:
- `avg`
- `sum`
- `min`
- `max`
- `count`

Additional layers provided by multilayer time aggregation supports additional time aggregators: 

- `avg`
- `sum`
- `min`
- `max`
- `count`
- `arbitrary percentile pxx` (`p78, p99, p99.99, etc.`)
- `stddev`

{{% collapse-content title="Time aggregation example query" level="h5" %}}
This query first calculates the average CPU utilization for each EC2 instance grouped by `env` and `team`, rolled up into 5-minute intervals. Then multilayer time aggregation is applied to calculate the 95th percentile in time of this nested query over 30m intervals. 

```text
```


{{< img src="/metrics/nested_queries/multilayer-time-agg-ui.png" alt="example of multilayer time aggregation in the JSON" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/multilayer-time-agg-json.png" alt="example of multilayer time aggregation in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 


### Multilayer space aggregation

Once you've already specified tag(s) in your first layer of space aggregation to group by, multilayer space aggregation can be accessed with the `Group By` function. As a reminder, every metrics query already contains an initial space aggregation that controls the number of timeseries displayed on the graph. For example, this query `avg:system.cpu.usage{*} by {host}` plots the average cpu usage for every host. 

You can apply additional layers of space aggregation with subsequent `Group Bys`.
Note: if you do not specify tag(s) to group by in your initial space aggregation layer, multilayer space aggregation will not be available.

The first layer of space aggregation supports the following aggregators:

- avg by
- sum by
- min by
- max by

Additional layers of space aggregation support:

- avg by
- sum by
- min by
- max by
- arbitrary percentile pXX (p75, p99, p99.99, etc.)
- stddev by

All space aggregators with the exception of percentile space aggregators have one argument, which is the tag key(s) you'd want to group by. Percentile space aggregators require two arguments: 
- The arbitrary percentile pXX
- The tag(s) to group by


{{% collapse-content title="Space aggregation example queries" level="h5" %}}
The following query calculates the sum of average CPU utilization, grouped by environment:

```text
```


```text
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
Historically when querying a metric over the past month, you would see data at 4-hour granularity. You can now use nested queries to access higher granularity data over this historical timeframe

Note: We recommend you define your initial rollup with the most granular rollup interval and use multilayer time aggregation with coarser rollup intervals to get more user-readable graphs.
```
In the UI or JSON tab:

{{< img src="/dashboards/querying/nested-queries-higher-res-ui.png" alt="example of higher resolution queries using nested queries in the UI" style="width:100%;" >}}

{{< img src="/dashboards/querying/nested-queries-higher-res-json.png" alt="example of higher resolution queries using nested queries in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 



## How can I use Datadog API's to leverage nested queries?
You can use nested queries functionality in our public API for querying timeseries data [here][3]. Simply change the contents of the **formula** object


 {{< img src="/metrics/nested_queries/nested-queries-using-api.png" alt="example of higher resolution queries using nested queries in the JSON" style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/functions/rollup/
[2]: /metrics/#configure-time-aggregation
[3]: /metrics/#query-timeseries-data-across-multiple-products
[4]: /metrics/distributions/