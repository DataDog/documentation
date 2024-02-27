---
title: Metrics
kind: documentation
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
This is an introduction to Metrics in Datadog and why they're useful. This section includes the following topics: 

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

Metrics are numerical values that can track anything about your environment over time, from latency to error rates to user signups.

In Datadog, metric data is ingested and stored as data points with a value and timestamp:

```text
[ 17.82,  22:11:01 ]
```

A sequence of data points is stored as a timeseries:

```text
[ 17.82,  22:11:01 ]
[  6.38,  22:11:12 ]
[  2.87,  22:11:38 ]
[  7.06,  22:12:00 ]
```

Any metrics with fractions of a second timestamps are rounded to the nearest second. If any points have the same timestamp, the latest point overwrites the previous ones.

### Why are metrics useful?

Metrics provide an overall picture of your system. You can use them to assess the health of your environment at a glance. Visualize how quickly users are loading your website, or the average memory consumption of your servers, for instance. Once you identify a problem, you can use [logs][1] and [tracing][2] to further troubleshoot.

Metrics that track system health come automatically through Datadog's integrations with more than {{< translate key="integration_count" >}} services. You can also track metrics that are specific to your business—also known as custom metrics. You can track things such as the number of user logins or user cart sizes to the frequency of your team's code commits.

In addition, metrics can help you adjust the scale of your environment to meet the demand from your customers. Knowing exactly how much you need to consume in resources can help you save money or improve performance.

### Submitting metrics to Datadog

Metrics can be sent to Datadog from several places.

- [Datadog-Supported Integrations][8]: Datadog's {{< translate key="integration_count" >}}+ integrations include metrics out of the box. To access these metrics, navigate to the specific integration page for your service and follow the installation instructions there. If you need to monitor an EC2 instance, for example, you would go to the [Amazon EC2 integration documentation][9].

- You can generate metrics directly within the Datadog platform. For instance, you can count error status codes appearing in your logs and [store that as a new metric][10] in Datadog.

- Often, you'll need to track metrics related to your business (for example, number of user logins or signups). In these cases, you can create [custom metrics][11]. Custom metrics can be submitted through the [Agent][12], [DogStatsD][13], or the [HTTP API][14].

- Additionally, the [Datadog Agent][15] automatically sends several standard metrics (such as CPU and disk usage).

For a summary of all metric submission sources and methods, read the [Metrics Types documentation][16].

### Metric types and real-time metrics visibility

#### Metric types

Datadog supports several different metric types that serve distinct use cases: count, gauge, rate, histogram, and distribution. Metric types determine which graphs and functions are available to use with the metric in the app.

The Datadog Agent doesn't make a separate request to Datadog's servers for every single data point you send. Instead, it reports values collected over a _flush time interval_. The metric's type determines how the values collected from your host over this interval are aggregated for submission.

A **_count_** type adds up all the submitted values in a time interval. This would be suitable for a metric tracking the number of website hits, for instance.

The **_rate_** type takes the count and divides it by the length of the time interval. This is useful if you're interested in the number of hits per second.

A **_gauge_** type takes the last value reported during the interval. This type would make sense for tracking RAM or CPU usage, where taking the last value provides a representative picture of the host's behavior during the time interval. In this case, using a different type such as _count_ would probably lead to inaccurate and extreme values. Choosing the correct metric type ensures accurate data.

A **_histogram_** reports five different values summarizing the submitted values: the average, count, median, 95th percentile, and max. This produces five different timeseries. This metric type is suitable for things like latency, for which it's not enough to know the average value. Histograms allow you to understand how your data was spread out without recording every single data point.

A **_distribution_** is similar to a histogram, but it summarizes values submitted during a time interval across all hosts in your environment. You can also choose to report multiple percentiles: p50, p75, p90, p95, and p99. You can learn more about this powerful feature in the [Distributions documentation][19].

See the [metrics types][16] documentation for more detailed examples of each metric type and submission instructions.

## Querying metrics

You can visualize your metrics and create graphs throughout Datadog: in [Metrics Explorer][3], [Dashboards][4], or [Notebooks][5].

Here's an example of a timeseries visualization:

{{< img src="metrics/introduction/timeseries_example.png" alt="A timeseries graph displays a latency metric represented by a single blue line with several spikes" >}}

This line graph plots latency (in milliseconds) experienced by users on the y-axis against time on the x-axis.

#### Additional visualizations

Datadog offers a variety of visualization options to help users easily graph and display their metrics. 

A metric query consists of the same two evaluation steps to start: time aggregation and space aggregation. See the [anatomy of a metric query][6] for more information.

{{< whatsnext desc="Two visualization offerings that Metrics users often find useful are:">}}
    {{< nextlink href="dashboards/widgets/query_value/" >}}<u>Query Value Widget</u> - Reduces the results of those two steps into a single value.{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list/" >}}<u>Top List</u> - Returns a single value per group.{{< /nextlink >}}
{{< /whatsnext >}}

Additionally, Datadog has many other types of graphs and widgets for visualizations. You can learn more about them in Datadog's [blog series about metric graphs][7].

The graphing experience is consistent whether you are using dashboards, notebooks, or monitors. You can create graphs by using the graphing editor UI or by directly changing the raw query string. To edit the query string, use the `</>` button on the far right.

### Anatomy of a metric query

A metric query in Datadog looks like this:

{{< img src="metrics/introduction/newanatomy.jpg" alt="Example query with color-coded sections" style="width:70%;">}}

You can break this query into a few steps:

#### Metric name

First, choose the specific metric that you'd like to graph by searching or selecting it from the dropdown next to **Metric**. If you're not sure which metric to use, start with the Metrics Explorer or a notebook. You can also see a list of actively reporting metrics on the Metrics Summary page.

#### Filter your metric

After selecting a metric, you can filter your query based on tag(s). For instance, you can use `account:prod` to _scope_ your query to include only the metrics from your production hosts. For more information, read the [tagging documentation][17].

#### Configure time aggregation

Next, choose the granularity of your data using time rollup. In this example, you've defined that there is one data point for every hour (3600 seconds). You can choose how you want to aggregate the data in each time bucket. By default, _avg_ is applied, but other available options are _sum_, _min_, _max_, and _count_. You can also customize how your metrics data is aggregated and bucketed with functions or in-application modifiers. For example, if you wanted to apply max and customize how your metrics data is rolled up and bucketed in time with calendar aligned queries, you would use `.rollup(max, 60)`. For more information, see the [Functions][24], [Rollup][23], and [In-application modifiers][25] documentation.

#### Configure space aggregation

In Datadog, "space" refers to the way metrics are distributed over different hosts and tags. There are two different aspects of space that you can control: aggregator and grouping

_Aggregator_ defines how the metrics in each group are combined. There are four aggregations available: sum, min, max, and avg.

_Grouping_ defines what constitutes a line on the graph. For example, if you have hundreds of hosts spread across four regions, grouping by region allows you to graph one line for every region. This would reduce the number of timeseries to four.

#### Apply functions (optional)

You can modify your graph values with mathematical [functions][18]. This can mean performing arithmetic between an integer and a metric (for example, multiplying a metric by 2). Or performing arithmetic between two metrics (for example, creating a new timeseries for the memory utilization rate like this: `jvm.heap_memory / jvm.heap_memory_max`).

### Time and space aggregation

_Time aggregation_ and _space aggregation_ are two important components of any query. Because understanding how these aggregations work helps you avoid misinterpreting your graphs, these concepts are explained in more detail below.

#### Time aggregation

Datadog stores a large volume of points, and in most cases it's not possible to display all of them on a graph. There would be more datapoints than pixels. Datadog uses time aggregation to solve this problem by combining data points into time buckets. For example, when examining four hours, data points are combined into two-minute buckets. This is called a _rollup_. As the time interval you've defined for your query increases, the granularity of your data decreases.

There are five aggregations you can apply to combine your data in each time bucket: sum, min, max, avg, and count.

It's important to remember that time aggregation is _always_ applied in every query you make.

#### Space aggregation

Space aggregation splits a single metric into multiple timeseries by tags such as host, container, and region. For instance, if you wanted to view the latency of your EC2 instances by region, you would need to use space aggregation's grouping by functionality to combine each region's hosts.

There are four aggregators that can be applied when using space aggregation: _sum_, _min_, _max_, and _avg_. Using the above example, say that your hosts are spread across four regions: us-east-1, us-east-2, us-west-1, and us-west-2. The hosts in each region need to be combined using an aggregator function. Using the _max_ aggregator would result in the maximum latency experienced across hosts in each region, while the _avg_ aggregator would yield the average latency per region.

### View real-time information about metrics

The [Metrics Summary page][20] displays a list of your metrics reported to Datadog under a specified time frame: the past hour, day, or week. Metrics can be filtered by metric name or tag.

Click on any metric name to display a details sidepanel with more detailed information. The details sidepanel displays key information for a given metric, including its metadata (type, unit, interval), number of distinct metrics, number of reporting hosts, number of tags submitted, and a table containing all tags submitted on a metric. Seeing which tags are being submitted on a metric helps you understand the number of distinct metrics reporting from it, since this number depends on your tag value combinations.

**Note:** The number of distinct metrics reported in the details sidepanel on Metrics Summary does not define your bill. See your [usage details][21] for a precise accounting of your usage over the past month.

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
