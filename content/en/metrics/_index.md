---
title: Metrics
kind: documentation
disable_toc: true
aliases:
  - /graphing/metrics/
  - /metrics/introduction/
---

### What are metrics?

Metrics are numerical values that can track anything about your environment over time, from latency to error rates to user signups.

### Why are metrics useful?

Metrics provide an overall picture of your system. You can use them to assess the health of your environment at a glance---how quickly users are loading your website or the average memory consumption of your servers, for instance. Once you identify a problem, you can use [logs][1] and [tracing][2] to locate the exact source of the issue.

Metrics that track system health come automatically through our integrations with 400+ services. However, you can also track metrics that are specific to your business---also known as custom metrics---from the number of user logins to user cart sizes to the frequency of your team’s code commits.

In addition, metrics can help you adjust the scale of your environment in order to meet the demand from your customers. Knowing exactly how much you need to consume in resources can help you save money or improve performance.

### How do I use metrics in Datadog?

You can visualize your metrics and create graphs throughout the Datadog app: in [Metrics Explorer][3], [Dashboards][4], or [Notebooks][5].

Here’s an example of how a timeseries visualization would look:

{{< img src="metrics/introduction/timeseries_example.png" alt="Timeseries example" >}}

This line graph plots latency (in milliseconds) experienced by users on the y-axis against time on the x-axis.

Datadog has many other types of graphs and widgets for visualizations. You can learn more about them [here][6].

### How do I submit metrics to Datadog?

Metrics can be sent to Datadog from several places.

- [Datadog-Supported Integrations][7]: Metrics sent from one of our {{< translate key="integration_count" >}}+ integrations are included with your infrastructure plan. To set up metrics from external integrations, navigate to the specific page for your service and follow the installation instructions there. If you need to monitor an EC2 instance, for example, you would go to [this page][8].

- Many of our products generate metrics directly. For instance, you can count error status codes appearing in your logs and [store that as a new metric][9] in Datadog.

- Often, you’ll need to track metrics related to your business (e.g. number of user logins/signups). In these cases, you can create [custom metrics][10]. Custom metrics can be submitted through the [agent][11], [DogStatsD][12], or the [HTTP API][13].

- Additionally, the [Datadog Agent][21] automatically sends several standard metrics (such as CPU and disk usage).

For a summary of all metric submission sources and methods, please refer to our [Metrics Types documentation][14].

## Querying Metrics

Whether you are using metrics, monitors, dashboards, notebooks, etc., all graphs in Datadog have the same basic functionality. You can create graphs either by using the graphing editor UI or by directly changing the raw query string. To edit the query string, hit the `</>` button on the far right.

### Breaking Down the Metric Query

A metric query in Datadog looks like this:

{{< img src="metrics/introduction/color-query2.png" alt="Query explained"  style="width:70%;">}}

We can break this query into a few steps:

#### 1. Metric name

First, choose the specific metric that you’d like to graph by searching or selecting it from the dropdown next to Metric. If you’re not sure which metric to use, start with the Metrics Explorer or a notebook. You can also see a list of metrics on the Metrics Summary page.

#### 2. Filter your metric

After selecting a metric, you can filter your query based on tag(s). For instance, you can use `account:prod` to _scope_ your query to include only the metrics from your production hosts. For more information, please refer to our [Tagging][15] documentation.

#### 3. Configure Time

Next, choose the granularity of your data using time rollup. In this example, we’ve defined that there will be one data point for every six minutes (360 seconds). You can also choose how you want to aggregate the data in each time bucket. By default, _avg_ is applied, but other available options are _sum_, _min_, _max_, and _count_. If you wanted to apply max, you would use `.rollup(max, 60)`.

#### 4. Configure Space

In Datadog, “space” refers to the way metrics are distributed over different hosts and tags. There are two different aspects of space that you can control: grouping and aggregation.

_Grouping_ defines what constitutes a line on the graph. For example, if you have hundreds of hosts spread across four regions, grouping by region allows you to graph one line for every region, reducing the number of timeseries to four.

_Aggregation_ defines how the metrics in each group are combined. There are four aggregations available: sum, min, max, and avg.

#### 5. (optional) Apply Functions

You can modify your graph values with mathematical [functions][16]. This can mean performing arithmetic between an integer and a metric (e.g. multiply a metric by 2), or between two metrics (e.g. create a new timeseries for the memory utilization rate like this: `jvm.heap_memory / jvm.heap_memory_max`).

### Time and Space Aggregation

_Time aggregation_ and _space aggregation_ are two important components of any query. Because understanding how these aggregations work will help you avoid misinterpreting your graphs, these concepts are explained in more detail below.

#### Time Aggregation

Datadog stores a large volume of points, and in most cases it’s not possible to display them all on a graph---there would be more datapoints than pixels. Therefore, we use time aggregation to solve this problem by combining data points into time buckets. This is called a _rollup_. As the time interval you’ve defined for your query increases, the granularity of your data becomes coarser.

There are five aggregations you can apply to combine your data in each time bucket: sum, min, max, avg, and count.

It’s important to remember that time aggregation is _always_ applied in every query you make because we can’t display every point we store.

#### Space Aggregation

Space aggregation splits a single metric into multiple time series by tags such as host, container, region, etc. For instance, if you were interested in viewing the latency of your EC2 instances by region, you would need to use space aggregation to combine each region’s hosts.

There are four aggregations that can be applied when using space aggregation: _sum_, _min_, _max_, and _avg_. Using the above example, let’s say that your hosts are spread across four regions: us-east-1, us-east-2, us-west-1, and us-west-2. The hosts in each region need to be combined using an aggregator function. Using the _max_ aggregator would result in the maximum latency experienced across hosts in each region, while the _avg_ aggregator would yield the average latency per region.

## Metric Types and Real-time Metrics Visibility

### What metric types can I submit to Datadog?

Datadog supports several different metric types that serve distinct use cases: count, gauge, rate, histogram, and distribution.

### What’s the difference between each metric type?

The Datadog agent doesn’t make a separate request to our servers for every single data point you send. Instead, it reports values collected over a _flush time interval_. The metric’s type determines how the values collected from your host over this interval are aggregated for submission.

A **_count_** type will add up all the submitted values in a time interval; this would be suitable for a metric tracking the number of website hits, for instance.

If you’re more interested in the number of hits per second, the **_rate_** type takes the count and divides it by the length of the time interval.

A **_gauge_** type will take the last value reported during the interval. This type would make sense for tracking RAM or CPU usage, where taking the last value provides a representative picture of the host’s behavior during the time interval. In this case, using a different type such as _count_ would probably lead to inaccurate and extreme values, which highlights the importance of choosing the correct metric type.

A **_histogram_** will report five different values summarizing the submitted values: the average, count, median, 95th percentile, and max. This produces five different timeseries. This metric type is suitable for things like latency, for which it’s not enough to know the average value. Histograms allow you to understand how your data was spread out without recording every single data point.

A **_distribution_** is similar to a histogram, but it summarizes values submitted during a time interval across all hosts in your environment. You can also choose to report multiple percentiles: p50, p75, p90, p95, and p99. You can learn more about this powerful feature [here][17].

To make this concrete with an example, suppose your host reported metric values of [1,1,1,2,2,2,3,3] during a ten-second interval. Depending on the metric type you chose, Datadog would store completely different values:

_Count_ would add them up and send the value 15 over to our servers, while _rate_ would take the total sum and divide it by 10 seconds to report a value of 1.5. _Gauge_ would simply report the last value, 3. If your metric is a _histogram_, Datadog would receive five different values: avg = 1.88, count = 8, median = 2, p95 = 3, max = 3.

Metric types also determine which graphs and functions are available to use with the metric in the app. Please see the [metrics types][14] documentation for more detailed examples of each metric type and submission instructions.

### How do I view real-time information about my metrics?

The [Metrics Summary page][18] displays a list of your metrics reported to Datadog under a specified time frame: the past hour, day, or week. Metrics can be filtered by metric name or tag.

Click on any metric name to display a sidepanel with more detailed information. The metric panel displays key information for a given metric, including its metadata (type, unit, interval), number of distinct metrics, number of reporting hosts, number of tags submitted, and a table containing all tags submitted on a metric. Seeing which tags are being submitted on a metric helps you understand the number of distinct metrics reporting from it, since this number depends on your tag value combinations.

Note: The number of distinct metrics reported in the details sidepanel on Metrics Summary does not define your bill. Please see your [usage details][19] for a precise accounting of your usage over the past month.

Please see the [full Metrics Summary documentation][20] for more details.

## Further reading

{{< whatsnext desc="To continue with metrics, check out:">}}
    {{< nextlink href="/metrics/explorer" >}}<u>Metrics Explorer</u> - Explore all of your metrics and perform Analytics.{{< /nextlink >}}
    {{< nextlink href="/metrics/summary" >}}<u>Metrics Summary</u> - Consult the full list of metrics reporting to Datadog.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Distribution metrics</u> - Compute global percentiles across your entire dataset.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /logs
[2]: /tracing/
[3]: /metrics/explorer/
[4]: /dashboards/
[5]: /notebooks/
[6]: https://www.datadoghq.com/blog/timeseries-metric-graphs-101/
[7]: /integrations/
[8]: /integrations/amazon_ec2/
[9]: /logs/logs_to_metrics/
[10]: /developers/metrics/
[11]: /agent/
[12]: /developers/metrics/dogstatsd_metrics_submission/
[13]: /api/
[14]: /developers/metrics/types/
[15]: /getting_started/tagging/using_tags/
[16]: /dashboards/functions/
[17]: /metrics/distributions/
[18]: https://app.datadoghq.com/metric/summary
[19]: /account_management/billing/usage_details/
[20]: /metrics/summary/
[21]: https://docs.datadoghq.com/agent/basic_agent_usage/
