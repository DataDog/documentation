---
title: Metrics
aliases:
  - /graphing/metrics/
  - /metrics/introduction/
  - /graphing/faq/inconsistent-sum-aggregation-between-different-time-windows-on-graph/
  - /dashboards/faq/inconsistent-sum-aggregation-between-different-time-windows-on-graph/
cascade:
    algolia:
        rank: 70
        tags: ["submit metrics", "metrics submission"]
---
This page provides an overview of Metrics in Datadog and why they're useful. The Metrics documentation also covers the following topics: 

{{< whatsnext desc="Submit metrics to Datadog" >}}
    {{< nextlink href="/metrics/custom_metrics">}}<u>Submit Custom Metrics</u> - Learn what custom metrics are and how to submit them.{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/otel_metrics" >}}<u>Send OpenTelemetry Metrics</u> - Configure the Datadog Agent or OpenTelemetry Collector.{{< /nextlink >}}
    {{< nextlink href="/metrics/types" >}}<u>Metrics Types</u> - Types of metrics that can be submitted to Datadog.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Distribution Metrics</u> - Learn about Distribution Metrics and globally accurate percentiles.{{< /nextlink >}}
    {{< nextlink href="/metrics/units" >}}<u>Metrics Units</u> - Learn about the units that can be associated with metrics.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Visualize and query your metrics" >}}
    {{< nextlink href="/metrics/explorer" >}}<u>Metrics Explorer</u> - Explore all of your metrics and perform Analytics.{{< /nextlink >}}
    {{< nextlink href="/metrics/summary" >}}<u>Metrics Summary</u> - Understand your actively reporting Datadog metrics.{{< /nextlink >}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Advanced Filtering</u> - Filter your data to narrow the scope of metrics returned.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Understand and manage your custom metrics volumes and costs" >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without Limits™</u> - Learn how to control custom metrics volumes with tags and aggregations configurations using Metrics without Limits™.{{< /nextlink >}}
{{< /whatsnext >}}

## Overview
### What are metrics?

Metrics are numerical values that can track anything about your environment over time, from latency to error rates to user sign-ups.

In Datadog, metric data is ingested and stored as datapoints, each with a value and a timestamp:

```text
[ 17.82,  22:11:01 ]
```

A sequence of datapoints is stored as a timeseries:

```text
[ 17.82,  22:11:01 ]
[  6.38,  22:11:12 ]
[  2.87,  22:11:38 ]
[  7.06,  22:12:00 ]
```

Any metrics with timestamps that include fractional seconds are rounded to the nearest second. If any points have the same timestamp, the latest point overwrites the previous one.

### Why are metrics useful?

Metrics provide an overall picture of your system. You can use them to assess the health of your environment at a glance, such as how fast users are loading your website, or the average memory consumption of your servers. After you identify a problem, you can use [Logs][1] and [Tracing][2] to troubleshoot further.

Datadog's integrations with more than {{< translate key="integration_count" >}} services automatically come with metrics that track system health. You can also track metrics that are specific to your business, also known as _custom metrics_. You can track things like the number of user logins, user cart sizes, or even the frequency of your team's code commits.

In addition, metrics can help you adjust the scale of your environment to meet customer demand. Knowing exactly what resources you need can help you save money or improve performance.

### Submitting metrics to Datadog

Metrics can be sent to Datadog from several places:

- The [Datadog Agent][15] automatically sends several standard metrics (such as CPU and disk usage).

- [Datadog-Supported Integrations][8]: Datadog's {{< translate key="integration_count" >}}+ integrations include metrics out of the box. To access these metrics, navigate to the specific integration page for your service and follow the installation instructions. If you need to monitor an EC2 instance, for example, go to the [Amazon EC2 integration documentation][9].

- You can generate metrics directly within the Datadog platform. For example, you can count error status codes appearing in your logs and [store that as a new metric][10] in Datadog.

- You might need to track metrics related to your business (for example, the number of user logins or signups). In these cases, you can create [custom metrics][11]. Custom metrics can be submitted through the [Agent][12], [DogStatsD][13], or the [HTTP API][14].

For a summary of all metric submission sources and methods, read the [Metrics Types documentation][16].

### Metric types and real-time metrics visibility

#### Metric types

Datadog supports several different metric types that serve distinct use cases: _count_, _gauge_, _rate_, _histogram_, and _distribution_. Metric types determine which graphs and functions you can use with that metric in Datadog.

The Datadog Agent doesn't make a separate request to Datadog's servers for every individual datapoint you send. Instead, it reports values collected over a _flush time interval_. The metric's type determines how the values collected from your host over this interval are aggregated for submission.

The _count_ type adds up all the submitted values in a time interval. This type is suitable for a metric tracking the number of website hits, for instance.

The _rate_ type takes the count and divides it by the length of the time interval. This is useful if you're interested in the number of hits per second.

A _gauge_ type takes the last value reported during the interval. This type makes sense for tracking RAM or CPU usage, where the last value provides a representative picture of the host's behavior during the time interval. In this case, using a different type, such as _count_, would probably lead to inaccurate and extreme values. Choosing the correct metric type ensures accurate data.

A _histogram_ reports five different values summarizing the submitted values: the average, count, median, 95th percentile, and max. This produces five different timeseries. This metric type is suitable for things like latency, where the average value alone is insufficient. Histograms allow you to understand how your data is spread out without recording every single datapoint.

A _distribution_ is similar to a histogram, but it summarizes values submitted during a time interval across all hosts in your environment. You can also choose to report multiple percentiles: _p50_, _p75_, _p90_, _p95_, and _p99_. You can learn more about this powerful feature in [Distributions][19].

See the [metrics types][16] documentation for detailed examples and submission instructions for each metric type.

## Querying metrics

You can visualize your metrics and create graphs throughout Datadog, in [Metrics Explorer][3], [Dashboards][4], or [Notebooks][5].

Here's an example of a timeseries visualization:

{{< img src="metrics/introduction/timeseries_example.png" alt="A timeseries graph displays a latency metric represented by a single blue line with several spikes" >}}

This line graph plots latency experienced by users (in milliseconds) on the y-axis against time on the x-axis.

#### Additional visualizations

Datadog offers a variety of visualization options to help you graph and display your metrics. 

A metric query consists of the same two evaluation steps to start: time aggregation and space aggregation. See the [anatomy of a metric query][6] for more information.

{{< whatsnext desc="Two visualization offerings that Metrics users often find useful are:">}}
    {{< nextlink href="dashboards/widgets/query_value/" >}}<u>Query Value Widget</u> - Reduces the results of time and space aggregation into a single value.{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list/" >}}<u>Top List</u> - Returns a single value per group.{{< /nextlink >}}
{{< /whatsnext >}}

Additionally, Datadog has many other types of graphs and widgets for visualizations. You can learn more about them in Datadog's [blog series about metric graphs][7].

The graphing experience is consistent whether you are using dashboards, notebooks, or monitors. You can create graphs by using the graphing editor UI or by directly changing the raw query string. To edit the query string, use the `</>` button on the far right.

### Anatomy of a metric query

A metric query in Datadog looks like this:

{{< img src="metrics/introduction/newanatomy.jpg" alt="Example query with color-coded sections" style="width:70%;">}}

You can break this query into a few steps.

#### Metric name

First, choose the specific metric that you'd like to graph by searching or selecting it from the dropdown next to **Metric**. If you're not sure which metric to use, start with the Metrics Explorer or a notebook. You can also see a list of actively reporting metrics on the Metrics Summary page.

#### Filter your metric

After selecting a metric, you can filter your query based on tag(s). For instance, you can use `account:prod` to _scope_ your query to include only the metrics from your production hosts. For more information, read the [tagging documentation][17].

#### Configure time aggregation

Next, choose the granularity of your data using time rollup. In this example, you've defined that there is one datapoint for every hour (3600 seconds). You can choose how you want to aggregate the data in each time bucket. By default, _avg_ is applied, but other available options are _sum_, _min_, _max_, and _count_. You can also customize how your metrics data is aggregated and bucketed with functions or in-application modifiers. For example, if you want to apply _max_ and customize how your metrics data is rolled up and bucketed in time with calendar aligned queries, you can use `.rollup(max, 60)`. For more information, see [Functions][24], [Rollup][23], and [In-application modifiers][25].

#### Configure space aggregation

In Datadog, "space" refers to the way metrics are distributed over different hosts and tags. There are two different aspects of space that you can control: aggregator and grouping.

_Aggregator_ defines how the metrics in each group are combined. There are four aggregations available: _sum_, _min_, _max_, and _avg_.

_Grouping_ defines what constitutes a line on the graph. For example, if you have hundreds of hosts spread across four regions, grouping by region allows you to graph one line for every region. This reduces the number of timeseries to four.

#### Apply functions (optional)

You can modify your graph values with mathematical [functions][18]. You can perform arithmetic between an integer and a metric (for example, multiplying a metric by 2) and between two metrics (for example, tracking the memory utilization rate by dividing `jvm.heap_memory` by `jvm.heap_memory_max`).

### Time and space aggregation

_Time aggregation_ and _space aggregation_ are two important components of any query. Understanding how these aggregations work helps you avoid misinterpreting your graphs. These concepts are explained in more detail below.

#### Time aggregation

Datadog stores a large volume of points, and in most cases it's not possible to display all of them on a graph. There would be more datapoints than pixels. Datadog uses time aggregation to solve this problem by combining datapoints into time buckets. For example, when examining four hours, datapoints are combined into two-minute buckets. This is called a _rollup_. As the time interval you define for your query increases, the granularity of your data decreases.

There are five aggregations you can apply to combine your data in each time bucket: _sum_, _min_, _max_, _avg_, and _count_.

It's important to remember that time aggregation is **always** applied in every query that you make.

#### Space aggregation

Space aggregation splits a single metric into multiple timeseries by tags such as host, container, and region. For example, if you want to view the latency of your EC2 instances by region, you can use space aggregation to group by each region's hosts.

There are four aggregators that can be applied when using space aggregation: _sum_, _min_, _max_, and _avg_. If your EC2 hosts are spread across four regions, then the hosts in each region need to be combined using an aggregator function. Using the _max_ aggregator yields the maximum latency experienced across all hosts in a region, while the _avg_ aggregator yields the average latency per region.

### View real-time information about metrics

The [Metrics Summary page][20] displays a list of all the metrics that you reported to Datadog in the specified time frame, which can be the past hour, day, or week. Metrics can be filtered by metric name or tag.

Click on any metric name to display a details side panel with more detailed information. The details side panel displays key information for a given metric, including its metadata (type, unit, interval), the number of distinct metrics, the number of reporting hosts, the number of tags submitted, and a table containing all tags submitted on a metric. Seeing which tags are being submitted on a metric helps you understand the number of distinct metrics reporting from it, because this number depends on your tag value combinations.

**Note:** The number of distinct metrics reported in the details side panel on Metrics Summary does not define your bill. See your [usage details][21] for a precise accounting of your usage over the past month.

Read the [metrics summary documentation][22] for more details.

## Further reading

{{< whatsnext desc="To continue with metrics, check out:">}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Advanced Filtering</u> - Filter your data to narrow the scope of metrics returned.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Distribution metrics</u> - Compute global percentiles across your entire dataset.{{< /nextlink >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without Limits™</u> - Learn how to control custom metrics volumes with tags and aggregations configurations using Metrics without Limits™.{{< /nextlink >}}
    {{< nextlink href="https://dtdg.co/fe" >}}<u>Foundation Enablement</u> - Join an interactive session to unlock the full potential of metrics.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /logs
[2]: /tracing/
[3]: /metrics/explorer/
[4]: /dashboards/
[5]: /notebooks/
[6]: https://docs.datadoghq.com/metrics/#anatomy-of-a-metric-query
[7]: https://www.datadoghq.com/blog/timeseries-metric-graphs-101/
[8]: /integrations/
[9]: /integrations/amazon_ec2/
[10]: /logs/logs_to_metrics/
[11]: /metrics/custom_metrics/
[12]: /agent/
[13]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[14]: /api/
[15]: https://docs.datadoghq.com/agent/basic_agent_usage/
[16]: /metrics/types/
[17]: /getting_started/tagging/using_tags/
[18]: /dashboards/functions/
[19]: /metrics/distributions/
[20]: https://app.datadoghq.com/metric/summary
[21]: /account_management/plan_and_usage/usage_details/
[22]: /metrics/summary/
[23]: /dashboards/functions/rollup/#rollup-with-calendar-aligned-queries
[24]: /dashboards/functions/
[25]: /metrics/custom_metrics/type_modifiers/?tab=count#in-application-modifiers
