---
title: Nested Queries
further_reading:
- link: "/dashboards/querying/"
  tag: "Documentation"
  text: "Dashboard Querying"
- link: "https://www.datadoghq.com/blog/nested-queries/"
  tag: "Blog"
  text: "Discover powerful insights with nested metric queries"
---

## Overview

By default, every metric query in Datadog consists of two layers of aggregation. Nested queries allows you to reuse the results of a previous query in a subsequent one.

{{< img src="metrics/nested_queries/nested-queries-example-video.mp4" alt="How to configure nested queries in the UI" video=true style="width:100%" >}}

Nested queries unlocks several powerful capabilities: 

- [Multilayer aggregation][6]
- [Percentiles and standard deviation on count/rate/gauge type metrics][7]
- [Higher resolution queries over historical timeframes][8]

## Multilayer aggregation

In Datadog, each metric query in Datadog is evaluated with two layers of aggregation: first by time, then by space. Multilayer aggregation allows you to apply additional layers of time or space aggregation. For more information on aggregation, see the [anatomy of a metric's query][5].

{{< img src="/metrics/nested_queries/nested-queries-before-after.png" alt="example of applying nested queries before and after" style="width:100%;" >}}



### Multilayer time aggregation

Access multilayer time aggregation with the `rollup` function. Every metric query already contains an initial `rollup` (time aggregation) that controls the granularity of the data points displayed on the graph. For more information, see the [Rollup][1] documentation. 

You can apply additional layers of time aggregation with subsequent rollups.

The first rollup supports the following aggregators:
- `avg`
- `sum`
- `min`
- `max`
- `count`

Additional layers provided by multilayer time aggregation supports the following time aggregators: 

- `avg`
- `sum`
- `min`
- `max`
- `count`
- `arbitrary percentile pxx` (`p78, p99, p99.99, etc.`)
- `stddev`

Multilayer time aggregation can be used with the following functions: 

| Supported Functions   | Description                                                                                    |
|-----------------------|-----------------------------------------------------------------------------------------------|
| Arithmetic operators   | `+, -, *, /`                                                                                  |
| Timeshift functions    | `<METRIC_NAME>{*}, -<TIME_IN_SECOND>`<br> `hour_before(<METRIC_NAME>{*})`<br> `day_before(<METRIC_NAME>{*})`<br> `week_before(<METRIC_NAME>{*})`<br> `month_before(<METRIC_NAME>{*})` |
| Top-k selection        | `top(<METRIC_NAME>{*}, <LIMIT_TO>, '<BY>', '<DIR>')`                                         |

Any functions not listed above cannot be combined with multilayer time aggregation. 

{{% collapse-content title="Time aggregation example query" level="h5" %}}
This query first calculates the average CPU utilization for each EC2 instance grouped by `env` and `team`, rolled up into 5-minute intervals. Then multilayer time aggregation is applied to calculate the 95th percentile in time of this nested query over 30m intervals. 


{{< img src="/metrics/nested_queries/multilayer-time-agg-ui.png" alt="example of multilayer time aggregation in the JSON" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/multilayer-time-agg-json.png" alt="example of multilayer time aggregation in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 


### Multilayer space aggregation

After you specify tag(s) in your first layer of space aggregation to group by, access multilayer space aggregation with the `Group By` function. 

You can apply additional layers of space aggregation with subsequent `Group Bys`.
Note: if you do not specify tag(s) to group by in your initial space aggregation layer, multilayer space aggregation will not be available.

The first layer of space aggregation supports the following aggregators:

- `avg by`
- `sum by`
- `min by`
- `max by`

Additional layers of space aggregation support:

- `avg by`
- `sum by`
- `min by`
- `max by`
- `arbitrary percentile pXX` (`p75, p99, p99.99, etc.`)
- `stddev by`

Multilayer space aggregation can be used with the following functions: 
| Supported Functions   | Description                                                                                    |
|-----------------------|-----------------------------------------------------------------------------------------------|
| Arithmetic operators   | `+, -, *, /`                                                                                  |
| Timeshift functions    | `<METRIC_NAME>{*}, -<TIME_IN_SECOND>`<br> `hour_before(<METRIC_NAME>{*})`<br> `day_before(<METRIC_NAME>{*})`<br> `week_before(<METRIC_NAME>{*})`<br> `month_before(<METRIC_NAME>{*})` |
| Top-k selection        | `top(<METRIC_NAME>{*}, <LIMIT_TO>, '<BY>', '<DIR>')`                                         |

Any other functions not listed above cannot be combined with multilayer space aggregation. 

All space aggregators with the exception of percentile space aggregators have one argument, which is the tag key(s) you want to group by. Percentile space aggregators require two arguments: 
- The arbitrary percentile pXX
- The tag(s) to group by


{{% collapse-content title="Space aggregation example queries" level="h5" %}}
This initial query, `avg:aws.ec2.cpuutilization{*} by {env,host}.rollup(avg, 300)` calculates the sum of average CPU utilization, grouped by `env` and `host` every 5 minutes. Then multilayer space aggregation is applied to calculate maximum value of the average CPU utilization by `env`.


In the UI or JSON tab, it would look as follows:

{{< img src="/metrics/nested_queries/multilayer-space-agg-ui.png" alt="example of multilayer space aggregation in the UI" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/multilayer-space-agg-json.png" alt="example of multilayer space aggregation in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 


## Percentiles and Standard Deviation for aggregated counts, rates, and gauges

You can use multilayer aggregation (time and space) to query percentiles and standard deviation from queries on counts, rates, and gauges. They allow you to better understand the variability and spread of your large datasets and allow you to better identify outliers. 

**Note**: The percentile or standard deviation aggregators in Nested queries are calculated using the results of an existing, aggregated count, rate, or gauge metrics. For globally accurate percentiles that are computed on unaggregated, raw values of a metric, use [distribution metrics][9] instead. 

 {{% collapse-content title="Percentiles in Multilayer Time Aggregation example query " level="h5" %}}

We can use percentiles in multilayer time aggregation to summarize the results of our nested query (avg CPU utilization by `env` and `team` every 5 minutes) by calculating the p95th value of this nested query every 30 minutes. 

 {{< img src="/metrics/nested_queries/percentiles-time-agg-ui.png" alt="example of MLA time agg percentiles using nested queries in the UI" style="width:100%;" >}}

 {{< img src="/metrics/nested_queries/percentiles-time-agg-json.png" alt="example of MLA time agg percentiles using nested queries in the JSON" style="width:100%;" >}}

 {{% /collapse-content %}} 
 

{{% collapse-content title="Percentiles in Multilayer Space Aggregation example query" level="h5" %}}

We can use percentiles in multilayer space aggregation to summarize the results of our nested query (avg CPU utilization by `env` and `team` every 5 minutes) by calculating the p95th value of this nested query for every unique `env` value. 

In the UI or JSON tab, it would look as follows:

 {{< img src="/metrics/nested_queries/percentiles-space-agg-ui.png" alt="example of MLA space agg percentiles using nested queries in the UI" style="width:100%;" >}}

 {{< img src="/metrics/nested_queries/percentiles-space-agg-json.png" alt="example of MLA space agg percentiles using nested queries in the JSON" style="width:100%;" >}}

  {{% /collapse-content %}} 



{{% collapse-content title="Standard deviation example query" level="h5" %}}

Standard deviation helps measure the variability or dispersion of a dataset. The following query uses standard deviation with multilayer time aggregation to calculate the standard deviation of our nested query (sum of API request counts, averaged over 4 hour) over longer twelve-hour periods:

In the UI or JSON tab, it would look as follows:

 {{< img src="/metrics/nested_queries/nested-queries-std-ui.png" alt="example of standard deviation with nested queries in the UI" style="width:100%;" >}}

 {{< img src="/metrics/nested_queries/nested-queries-std-json.png" alt="example of standard deviation with nested queries in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 


## Higher resolution queries over historical time frames

Every metric query contains an initial layer of time aggregation (rollup) which controls the granularity of datapoints shown. Datadog provides default rollup time intervals that increase as your overall query timeframe grows. With nested queries, you can access more granular, high-resolution data over longer, historical timeframes.

 {{< img src="/metrics/nested_queries/higher-res-query-example.png" alt="example of higher resolution queries over historical timeframes in the UI" style="width:100%;" >}}

{{% collapse-content title="Higher resolution example query" level="h5" %}}

Historically, when querying a metric over the past month, you would see data at 4-hour granularity by default. You can use nested queries to access higher granularity data over this historical timeframe. Here's an example query graphed over the past month where the query batch count is initially rolled up in 5 minute intervals. Then multilayer time aggregation is applied to calculate the standard deviation in time of this nested query over 4 hour intervals for a more human-readable graph.

_**Note**: Datadog recommends that you define your initial rollup with the most granular rollup interval and use multilayer time aggregation with coarser rollup intervals to get more user-readable graphs._

In the UI or JSON tab, it would look as follows:

{{< img src="/metrics/nested_queries/nested-queries-higher-res-ui.png" alt="example of higher resolution queries using nested queries in the UI" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/nested-queries-higher-res-json.png" alt="example of higher resolution queries using nested queries in the JSON" style="width:100%;" >}}
{{% /collapse-content %}} 

## Moving rollup
Datadog provides a `moving_rollup` function that enables aggregation of datapoints over a specified time window. See [moving-rollup][10] for more information. By using nested queries, you can extend its functionality to incorporate lookback mode, allowing you to analyze datapoints beyond the original query window. This provides a more comprehensive view of your query's trends and patterns over the specified time window.

{{< img src="/metrics/nested_queries/moving-rollup-diagram.png" alt="example of old vs. new moving_rollup function" style="width:100%;" >}}

The existing version of the `moving_rollup` function only supports the following aggregators:
- `avg`
- `sum`
- `min`
- `max`
- `median`

When nesting queries, only the lookback mode version of the `moving_rollup` function can be used. This version of the function supports the following aggregators:
- `avg`
- `sum`
- `min`
- `max`
- `count`
- `count by`
- `arbitrary percentile pxx` (`p78, p99, p99.99, etc.`)
- `stddev`

{{% collapse-content title="Max Moving rollup with Lookback Mode Enabled" level="h5" %}}
When nesting these `moving_rollups`, the rollup intervals provided must get larger as shown in the UI or JSON tab:

{{< img src="/metrics/nested_queries/moving_rollup1_ui.png" alt="example of moving rollup in the UI" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/moving_rollup1_json.png" alt="example of moving rollup in the JSON" style="width:100%;" >}}


{{% /collapse-content %}} 


{{% collapse-content title="Standard Deviation Moving Rollup with Lookback Mode Enabled" level="h5" %}}
You can also use percentiles and standard deviation with the new moving rollup function, which supports lookback, and allows nesting of moving rollups with lookback enabled.

In the UI or JSON tab, it would look as follows:

{{< img src="/metrics/nested_queries/moving_rollup2_ui.png" alt="example of moving rollup with standard deviation in the UI" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/moving_rollup2_json.png" alt="example of moving rollup with standard deviation in the JSON" style="width:100%;" >}}

{{% /collapse-content %}} 


## Boolean threshold remapping functions

Remap functions allow you to refine and transform query results based on specific conditions, extending functionality for monitoring and analysis. Nested queries unlocks the following three new functions:

- `is_greater` (`<QUERY>, <THRESHOLD>`)
- `is_less` (`<QUERY>, <THRESHOLD>`)
- `is_between` (`<QUERY>, <LOWER THRESHOLD>, <UPPER THRESHOLD>`)


{{% collapse-content title="is_greater() example query" level="h5" %}}
`is_greater()` returns 1.0 for each point where the query is greater than a constant of 30 and 0.0 elsewhere.

In the UI or JSON tab, it would look as follows:
{{< img src="/metrics/nested_queries/is_greater_ui.png" alt="example of is_greater mapping function in UI" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/is_greater_json.png" alt="example of is_greater mapping function in JSON" style="width:100%;" >}}

{{% /collapse-content %}} 

{{% collapse-content title="is_less() example query" level="h5" %}}
`is_less()` returns 1.0 for each point where the query is less than a constant of 30 and 0.0 elsewhere.

In the UI or JSON tab, it would look as follows:
{{< img src="/metrics/nested_queries/is_less_ui.png" alt="example of is_less mapping function in UI" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/is_less_json.png" alt="example of is_less mapping function in JSON" style="width:100%;" >}}


{{% /collapse-content %}} 

{{% collapse-content title="is_between() example query" level="h5" %}}
`is_between()` returns 1.0 for each point where the query is between 10 and 30 (exclusive), and 0.0 elsewhere.

In the UI or JSON tab, it would look as follows:
{{< img src="/metrics/nested_queries/is_between_ui.png" alt="example of is_between mapping function in UI" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/is_between_json.png" alt="example of is_between mapping function in JSON" style="width:100%;" >}}


{{% /collapse-content %}} 


## Use nested queries with Datadog's API
You can use nested queries functionality in our [public API for querying timeseries data][3]. Change the contents of the **formula** object


 {{< img src="/metrics/nested_queries/nested-queries-using-api.png" alt="example of higher resolution queries using nested queries in the JSON" style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/functions/rollup/
[2]: /metrics/#configure-time-aggregation
[3]: /metrics/#query-timeseries-data-across-multiple-products
[4]: /metrics/distributions/
[5]: /metrics/#anatomy-of-a-metric-query
[6]: /metrics/nested_queries/#multilayer-aggregation
[7]: /metrics/nested_queries/#percentiles-and-standard-deviation-for-aggregated-counts-rates-and-gauges
[8]: /metrics/nested_queries/#higher-resolution-queries-over-historical-time-frames
[9]: /metrics/distributions/
[10]: /dashboards/functions/rollup/#moving-rollup
