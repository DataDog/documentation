---
title: Custom Metrics Billing
kind: documentation
aliases:
  - /integrations/faq/what-standard-integrations-emit-custom-metrics/
---

## Overview

If a metric is not submitted from one of the [350+ Datadog integrations][1] it's considered a [custom metric][2]<sup>[(1)](#standard-integrations)</sup>.

## Allocation

You are allocated a certain number of custom metrics based on your Datadog pricing plan:

* Pro: 100 custom metrics per host.
* Enterprise: 200 custom metrics per host.

The billable number of custom metrics is based on the average number of custom metrics (from all paid hosts) per hour over a given month.
These allocations are counted across your entire infrastructure. For example, if you are on the Pro plan and licensed for three hosts, 300 custom metrics are allocated. The 300 custom metrics can be divided equally across each host, or all 300 metrics could be used by a single host.

Using this example, the graphic below shows scenarios that do not exceed the allocated custom metric count:

{{< img src="account_management/billing/custom_metrics/Custom_Metrics_300.jpg" alt="Custom_Metrics_300" responsive="true" style="width:80%;">}}

Contact [Sales][3] or your [Customer Success][4] Manager to discuss custom metrics for your account or purchase an additional custom metrics packages.

## Tracking Custom metrics

Administrative users (those with [Datadog Admin roles][5]) can see the total custom metrics per hour and the top 500 custom metrics for their account on the [usage details page][6]. See the [Usage Details][7] documentation for more information.

For more real-time tracking of the count of custom metrics for a particular metric name, click into the metric name on the [Metrics Summary page][8]; it’s listed as “Currently reporting # distinct metrics…” as shown below:

{{< img src="account_management/billing/custom_metrics/tracking_metric.mp4" alt="Tracking metric" video="true" responsive="true">}}

## Counting Custom Metrics

A custom metric is uniquely identified by a combination of a metric name and tag values (including the host tag):

* Reporting the same metric name on multiple hosts results in multiple custom metrics.
* Adding tags on a metric can change the number of custom metrics (number of unique tag value combinations) associated with that particular metric. See the [Effect of Adding Tags](#effect-of-adding-tags) section.
* Reordering of tag values doesn’t add uniqueness, the following combinations are the same custom metric:

  *  `metric_name{tag_1:value_1, tag_2:value_2}`
  *  `metric_name{tag_2:value_2, tag_1:value_1}`

Find below some example of how to count your custom metrics. The number of custom metrics associated with a particular metric name depends on its metric [submision type][9]:

{{< tabs >}}
{{% tab "Count, Rate, Gauge" %}}

The number of custom metrics from [COUNT][1], [RATE][2], and [GAUGE][3] metric types is calculated the same way as shown below:

Suppose you’re submitting a metric, `request.Count`, from two hosts (`host:A`,`host:B`), which counts the number of endpoint requests. You’re submitting this metric with two tag keys:

* `endpoint`  that can take the value `endpoint:X` or `endpoint:Y`
* `status` that can take the value `status:200` or `status:400`

Let’s assume that in your data, endpoint `endpoint:X` is supported by both hosts, but fails only on `host:B`, and requests to `endpoint:Y` are always successful and only appears on `host:B` as shown below:

{{< img src="account_management/billing/custom_metrics/custom_metrics_host.png" alt="Custom metrics host" responsive="true" style="width:80%;">}}

`request.Count` reports then **4 distinct custom metrics**. The custom metrics are listed below:

| Metric Name     | Tag Values                           |
|-----------------|--------------------------------------|
| `request.Count` | `host:A`, `endpoint:X`, `status:200` |
| `request.Count` | `host:B`, `endpoint:X`, `status:200` |
| `request.Count` | `host:B`, `endpoint:X`, `status:400` |
| `request.Count` | `host:B`, `endpoint:Y`, `status:200` |


### Effect of Adding Tags

Adding tags **may not** result in more custom metrics. Your count of custom metrics usually scales with the most granular/detailed tag.

Let’s suppose you’re measuring temperature in the US and you’ve tagged your temperature metric by country and region. You submit the following data to Datadog:

| Metric Name   | Tag Values                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Suppose you wanted to add the tag `City` which has three values: `NYC`, `Miami`, and `Orlando`. Adding this tag does increase the number of custom metrics since it provides more detail and granularity to your dataset as shown below:

| Metric Name   | Tag Values                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

The count of custom metrics reporting from `temperature` scales with the most granular tag, `city`.

Now suppose you also wanted to tag your temperature metric by `state` (which has 2 values: `NY` and `Florida`). You’re now tagging temperature by the set of tags: `country`, `region`, `state`, and `city`. Adding the state tag doesn’t increase the level of granularity already present in your dataset provided by the city tag.

To obtain the temperature in Florida, you can simply recombine the custom metrics of:

* `temperature:{country:USA, state:Florida, city:Orlando}`
* `temperature{country:USA, state:Florida, city:Miami}`

[1]: /developers/metrics/types/?tab=count#metric-submission-types
[2]: /developers/metrics/types/?tab=rate#metric-submission-types
[3]: /developers/metrics/types/?tab=gauge#metric-submission-types
{{% /tab %}}
{{% tab "Histogram" %}}

**A HISTOGRAM metric generates five custom metrics** for each unique combination of metric name, host, and tag values to support the Agent-side aggregations: `count`, `sum`, `min`, `max`, and `avg`. [Learn more about HISTOGRAM metric type][1].

Suppose you have a histogram metric measuring `request.Latency` for two endpoints `endpoint:X` and `endpoint:Y`  on a single host:

|| INSERT IMAGE  ||

The number of unique tag value combinations submitted for a `HISTOGRAM` metric with this tagging scheme is 2, but the Agent generates [up to 5 custom metrics][1] for each of the original 2 unique tag value combinations to account [for each Agent-side aggregations enabled][2]: `count`, `sum`, `min`, `max`, and `avg`. This results in a total of 10 custom metrics for this `HISTOGRAM` metric: :

| Metric Name       | Tag Values             | Aggregations                            |
|-------------------|------------------------|-----------------------------------------|
| `request.Latency` | `host:A`, `endpoint:X` | `count`, `sum`, `min`, `max`, and `avg` |
| `request.Latency` | `host:A`, `endpoint:Y` | `count`, `sum`, `min`, `max`, and `avg` |

[1]: /developers/metrics/types/?tab=histogram
[2]: /developers/metrics/types/?tab=histogram#metric-submission-types
{{% /tab %}}
{{% tab "Distribution" %}}

**A DISTRIBUTION metric generates five custom metrics** for each unique combination of metric name, host, and tag values to support the server-side aggregations  `count`, `sum`, `min`, `max`, and `avg`. [Learn more about DISTRIBUTION metric type][1].

Suppose you have a distribution metric measuring `request.Latency` in which the following tag value combinations are present in your data as shown below:

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Request latency" responsive="true" style="width:80%;">}}

The number of unique combinations of metric name, host, and tag values submitted for a `GAUGE` metric with [this tagging scheme is 4](#counting-custom-metrics?tab=countrategauge):

| Metric Name       | Tag Values                           |
|-------------------|--------------------------------------|
| `request.Latency` | `host:A`, `endpoint:X`, `status:200` |
| `request.Latency` | `host:B`, `endpoint:X`, `status:200` |
| `request.Latency` | `host:B`, `endpoint:X`, `status:400` |
| `request.Latency` | `host:B`, `endpoint:Y`, `status:200` |

Given `request.Latency` is submitted as a `DISTRIBUTION`, Datadog [stores 5 custom metrics][1] for each of the original 4 unique tag value combinations to account for server side-aggregations: `count`, `sum`, `min`, `max`, and `avg`.

This results in a total of 20 custom metrics for this `DISTRIBUTION` metric:

| Metric Name       | Tag Values                           | Aggregations                            |
|-------------------|--------------------------------------|-----------------------------------------|
| `request.Latency` | `host:A`, `endpoint:X`, `status:200` | `count`, `sum`, `min`, `max`, and `avg` |
| `request.Latency` | `host:B`, `endpoint:X`, `status:200` | `count`, `sum`, `min`, `max`, and `avg` |
| `request.Latency` | `host:B`, `endpoint:X`, `status:400` | `count`, `sum`, `min`, `max`, and `avg` |
| `request.Latency` | `host:B`, `endpoint:Y`, `status:200` | `count`, `sum`, `min`, `max`, and `avg` |

##### Distribution Metrics with Additional Percentile Aggregations

[Adding additional percentile aggregations][2]: `p50`, `p75`, `p90`, `p95`, or `p99` to a distribution metric increases the number of distinct custom metrics reported. In order to support additional globally accurate percentile aggregations, a dedicated custom metric is created for a given aggregation per every potentially queryable tag value combination in your data. For instance let's say you have two hosts: `host:A` and `host:B` and you want to calculate the global `p50` (the median) of your requests latency over a given interval:

| Host     | Requests Latencies measured (in ms) | p50 |
|----------|-------------------------------------|-----|
| `host:A` | 10,20,30,40,50,60,70,80,90,100,110  | 60  |
| `host:B` | 10,15,20,25,30                      | 20  |

The overall `p50` of latency for your request is **NOT** `avg(60,20)=40 ms`, the correct `p50` is: `median(10,10,15,20,20,25,30,30,40,50,60,70,80,90,100,110)=35 ms`

For other metric types, like GAUGE and COUNT, Datadog can combine/aggregate the most granular data to obtain globally accurate results. Percentiles can’t be recombined; therefore, they are precomputed and stored individually in a dedicated custom metric per every potentially queryable tag value combination in your data

**Note**: You can control [which percentile aggregation are performed][2] over [which tag combination][3] for any DISTRIBUTION metric.

[1]: /developers/metrics/types/?tab=distribution
[2]: /graphing/metrics/distributions/#aggregations
[3]: /graphing/metrics/distributions/#customize-tagging
{{% /tab %}}
{{< /tabs >}}

## Standard integrations

The following standard integrations can potentially emit custom metrics.

Integrations limited to 350 custom metrics by default:

* [ActiveMQ XML][10]
* [Go-Expvar][11]

Integrations with no default limit:

* [Agent Metrics][12]
* [Directory][13]
* [Linux Proc Extras][14]
* [Nagios][15]
* [PDH Check][16]
* [Prometheus][17]
* [SNMP][18]
* [Windows Services][19]
* [WMI][20]

Many other integrations can be configured to collect custom metrics, for example:

* [MySQL][21]
* [Oracle][22]
* [Postgres][23]
* [SQL Server][24]

## Troubleshooting

For technical questions, contact [Datadog support][25].

For billing questions, contact your [Customer Success][4] Manager.

[1]: /integrations
[2]: /developers/metrics/custom_metrics
[3]: mailto:sales@datadoghq.com
[4]: mailto:success@datadoghq.com
[5]: /account_management/team
[6]: https://app.datadoghq.com/account/usage/hourly
[7]: /account_management/billing/usage_details
[8]: https://app.datadoghq.com/metric/summary
[9]: /developers/metrics/types/#metric-submission-types
[10]: /integrations/activemq/#activemq-xml-integration
[11]: /integrations/go_expvar
[12]: /integrations/agent_metrics
[13]: /integrations/directory
[14]: /integrations/linux_proc_extras
[15]: /integrations/nagios
[16]: /integrations/pdh_check
[17]: /integrations/prometheus
[18]: /integrations/snmp
[19]: /integrations/windows_service
[20]: /integrations/wmi_check
[21]: /integrations/mysql
[22]: /integrations/oracle
[23]: /integrations/postgres
[24]: /integrations/sqlserver
[25]: /help
