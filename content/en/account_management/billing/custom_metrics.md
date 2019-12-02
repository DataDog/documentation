---
title: Custom Metrics Billing
kind: documentation
aliases:
  - /integrations/faq/what-standard-integrations-emit-custom-metrics/
---

## Overview

If a metric is not submitted from one of the [350+ Datadog integrations][1] it's considered a [custom metric][2] (Note that some standard integrations [emit custom metrics](#standard-integrations)).

* Billable count is based on average number of `custom metrics / hour` for the month.
* Pro plans include 100 custom metrics per host.
* Enterprise plans include 200 custom metrics per host.
* The number of metrics is averaged across all paid hosts.
* Additional custom metrics packages can be purchased.

These allocations are counted across your entire infrastructure. For example, if you are on the Pro plan and licensed for three hosts, 300 custom metrics are allocated. The 300 custom metrics can be divided equally across each host, or all 300 metrics could be used by a single host.

Using this example, the graphic below shows scenarios that do not exceed the allocated custom metric count:

{{< img src="account_management/billing/custom_metrics/Custom_Metrics_300.jpg" alt="Custom_Metrics_300" responsive="true" style="width:80%;">}}

Contact [Sales][3] or your [Customer Success][4] Manager to discuss custom metrics for your account.

## Tracking Custom metrics

Administrative users (those with [Datadog Admin roles][5] can see the total custom metrics per hour and the top 500 custom metrics for their account on the [usage details page][6]. See the [Usage Details][7] documentation for more information.

For more real-time tracking of the count of custom metrics for a particular metric name, click into the metric name on the Metrics Summary page; it’s listed as “Currently reporting # distinct metrics…” as shown below:

{{< img src="account_management/billing/custom_metrics/tracking_metric.mp4" alt="Tracking metric" video="true" responsive="true">}}

## Counting Custom Metrics

A custom metric is uniquely identified by a combination of a metric name and tag values (including the host tag):

* Reporting the same metric name on different hosts results in multiple custom metrics
* Adding tags on a metric can change the number of custom metrics (number of unique tag value combinations) associated with that particular metric -- see Example 3 and 4 below.
* Reordering of tag values doesn’t add uniqueness, the following combinations are the same custom metric:

  *  `metric_name{tag_1:value_1, tag_2:value_2}`
  *  `metric_name{tag_2:value_2, tag_1:value_1}`

Find below some example of how to count your custom metrics, depending on your [submision type][8], the amount of custom metrics generated may difer:

{{< tabs >}}
{{% tab "Count, Rate, Gauge" %}}

**Note**: This example uses a [`COUNT` metric type][1], but the count of custom metrics would have been the same with a [`GAUGE`][2] or a [`RATE`][3] metric type.

Suppose you’re submitting a metric, `request.Count`, from two hosts (A,B), which counts the number of endpoint requests. You’re submitting this metric with two tag keys:

* `endpoint`  that can take the value `X` or `Y`
* `status` that can take the value `200` or `400`

Let’s assume that in your data, endpoint `X` is supported by both hosts, but fails only on `host:B`, and requests to `endpoint:Y` are always successful and only appears on `host:B` as shown below:

{{< img src="account_management/billing/custom_metrics/custom_metrics_host.png" alt="Custom metrics host" responsive="true" style="width:80%;">}}

There are then **4 Custom metrics**, one for each unique combinations of metric name, host, and tag values for your `request.Count` metric. The custom metrics are listed below:

| Metric Name     | Tag Values                           |
| --------------- | ------------------------------------ |
| `request.Count` | `host:A`, `endpoint:X`, `status:200` |
| `request.Count` | `host:B`, `endpoint:X`, `status:200` |
| `request.Count` | `host:B`, `endpoint:X`, `status:400` |
| `request.Count` | `host:B`, `endpoint:Y`, `status:200` |

[1]: /developers/metrics/types/?tab=count
[2]: /developers/metrics/types/?tab=gauge
[3]: /developers/metrics/types/?tab=rate
{{% /tab %}}
{{% tab "Histogram" %}}

**A HISTOGRAM metric generates five custom metrics** for each unique combination of metric name, host, and tag values to support the Agent-side aggregations: `count`, `sum`, `min`, `max`, and `avg`. [Learn more about HISTOGRAM metric type][1].

Suppose you have a histogram metric measuring `request.Latency` for two endpoints `X` and `Y`  on a single host:

|| INSERT IMAGE  ||

The number of unique tag value combinations submitted for a `HISTOGRAM` metric with this tagging scheme is 2, but the Agent generates [5 custom metrics][1] for each of the original 2 unique tag value combinations to account for each Agent-side aggregations: `count`, `sum`, `min`, `max`, and `avg`. This results in a total of 10 custom metrics for this `HISTOGRAM` metric: :

| Metric Name       | Tag Values             | Aggregations                            |
| ----------------- | ---------------------- | --------------------------------------- |
| `request.Latency` | `host:A`, `endpoint:X` | `count`, `sum`, `min`, `max`, and `avg` |
| `request.Latency` | `host:A`, `endpoint:Y` | `count`, `sum`, `min`, `max`, and `avg` |

[1]: /developers/metrics/types/?tab=histogram
{{% /tab %}}
{{% tab "Distribution" %}}

**A DISTRIBUTION metric generates five custom metrics** for each unique combination of metric name, host, and tag values to support the server-side aggregations  `count`, `sum`, `min`, `max`, and `avg`. [Learn more about DISTRIBUTION metric type][1].

Suppose you have a distribution metric measuring `request.Latency` in which the following tag value combinations are present in your data as shown below:

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Request latency" responsive="true" style="width:80%;">}}

The number of unique combinations of metric name, host, and tag values submitted for a `GAUGE` metric with this tagging scheme is 4:

| Metric Name       | Tag Values                           |
| ----------------- | ------------------------------------ |
| `request.Latency` | `host:A`, `endpoint:X`, `status:200` |
| `request.Latency` | `host:B`, `endpoint:X`, `status:200` |
| `request.Latency` | `host:B`, `endpoint:X`, `status:400` |
| `request.Latency` | `host:B`, `endpoint:Y`, `status:200` |

Given `request.Latency` is submitted as a `DISTRIBUTION`, Datadog [stores 5 custom metrics][1] for each of the original 4 unique tag value combinations to account for server side-aggregations: `count`, `sum`, `min`, `max`, and `avg`. This results in a total of 20 custom metrics for this `DISTRIBUTION` metric:

| Metric Name       | Tag Values                           | Aggregations                            |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `request.Latency` | `host:A`, `endpoint:X`, `status:200` | `count`, `sum`, `min`, `max`, and `avg` |
| `request.Latency` | `host:B`, `endpoint:X`, `status:200` | `count`, `sum`, `min`, `max`, and `avg` |
| `request.Latency` | `host:B`, `endpoint:X`, `status:400` | `count`, `sum`, `min`, `max`, and `avg` |
| `request.Latency` | `host:B`, `endpoint:Y`, `status:200` | `count`, `sum`, `min`, `max`, and `avg` |

##### Distribution Metrics with Additional Percentile Aggregations

[Adding additional percentile aggregations][2]: `p50`, `p75`, `p90`, `p95`, `p99`) to your DISTRIBUTION metric increases the number of distinct custom metrics by raising the ammount of aggregations. The final number of metric is:

```
Number_of_distinct_tag_combinations * ( 5 + Number_of_additional_percentile_aggregations_choosen)
```

[1]: /developers/metrics/types/?tab=distribution
[2]: /graphing/metrics/distributions/#aggregations
{{% /tab %}}
{{< /tabs >}}

### Effect of Adding Tags

Adding tags **may not** result in more custom metrics. Your count of custom metrics usually scales with the most granular/detailed tag. Let’s suppose you’re measuring temperature in the US and you’ve tagged your temperature metric by country and region. You submit the following data to Datadog:

| Metric Name   | Tag Values                         |
| ------------- | ---------------------------------- |
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Suppose you wanted to add the tag `City` which has three values: `NYC`, `Miami`, and `Orlando`. Adding this tag does increase the number of custom metrics since it provides more detail and granularity to your dataset as shown below:

| Metric Name   | Tag Values                                          |
| ------------- | --------------------------------------------------- |
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

The count of custom metrics reporting from `temperature` scales with the most granular tag, `city`.

Now suppose you wanted to tag your temperature metric also by `state` (which has 2 values: `NY` and `Florida`). You’re now tagging temperature by the set of tags: `country`, `region`, `state`, and `city`. Adding the state tag doesn’t increase the level of granularity already present in your dataset provided by the city tag.

To obtain the temperature in Florida, you can simply recombine the custom metrics of:

* `temperature:{country:USA, state:Florida, city:Orlando}`
* `temperature{country:USA, state:Florida, city:Miami}`

## Standard integrations

The following standard integrations can potentially emit custom metrics.

Integrations limited to 350 custom metrics by default:

* [ActiveMQ XML][9]
* [Go-Expvar][10]

Integrations with no default limit:

* [Agent Metrics][11]
* [Directory][12]
* [Linux Proc Extras][13]
* [Nagios][14]
* [PDH Check][15]
* [Prometheus][16]
* [SNMP][17]
* [Windows Services][18]
* [WMI][19]

Many other integrations can be configured to collect custom metrics, for example:

* [MySQL][20]
* [Oracle][21]
* [Postgres][22]
* [SQL Server][23]

## Troubleshooting
For technical questions, contact [Datadog support][24].

For billing questions, contact your [Customer Success][4] Manager.

[1]: /integrations
[2]: /developers/metrics/custom_metrics
[3]: mailto:sales@datadoghq.com
[4]: mailto:success@datadoghq.com
[5]: /account_management/team
[6]: https://app.datadoghq.com/account/usage/hourly
[7]: /account_management/billing/usage_details
[8]: /developers/metrics/types/#metric-submission-types
[9]: /integrations/activemq/#activemq-xml-integration
[10]: /integrations/go_expvar
[11]: /integrations/agent_metrics
[12]: /integrations/directory
[13]: /integrations/linux_proc_extras
[14]: /integrations/nagios
[15]: /integrations/pdh_check
[16]: /integrations/prometheus
[17]: /integrations/snmp
[18]: /integrations/windows_service
[19]: /integrations/wmi_check
[20]: /integrations/mysql
[21]: /integrations/oracle
[22]: /integrations/postgres
[23]: /integrations/sqlserver
[24]: /help
