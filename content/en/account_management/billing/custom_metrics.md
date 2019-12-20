---
title: Custom Metrics Billing
kind: documentation
aliases:
  - /integrations/faq/what-standard-integrations-emit-custom-metrics/
---

If a metric is not submitted from one of the [350+ Datadog integrations][1] it's considered a [custom metric][2]<sup>[(1)](#standard-integrations)</sup>.

**A custom metric is uniquely identified by a combination of a metric name and tag values (including the host tag)**:

## Counting Custom Metrics

Below are examples of how to count your custom metrics. The number of custom metrics associated with a particular metric name depends on its metric [submission type][3].

Suppose you’re submitting a metric, `request.Latency`, from two hosts (`host:A`,`host:B`), which measure the latency of your endpoint requests. You’re submitting this metric with two tag keys:

* `endpoint`  that has the value `endpoint:X` or `endpoint:Y`.
* `status` that has the value `status:200` or `status:400`.

Let’s assume that in your data, `endpoint:X` is supported by both hosts, but fails only on `host:B`, and requests to `endpoint:Y` are always successful and only appears on `host:B` as shown below:

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Request latency" responsive="true" style="width:80%;">}}

{{< tabs >}}
{{% tab "Count, Rate, Gauge" %}}

The number of custom metrics from [COUNT][1], [RATE][2], and [GAUGE][3] metric types is calculated with the same logic:.

The number of unique tag value combinations submitted for a GAUGE metric with this tagging scheme is **4**:

* `host:A`, `endpoint:X`, `status:200`
* `host:B`, `endpoint:X`, `status:200`
* `host:B`, `endpoint:X`, `status:400`
* `host:B`, `endpoint:Y`, `status:200`

This results in `request.Latency` reporting **4 distinct custom metrics**.

### Effect of Adding Tags

Adding tags **may not** result in more custom metrics. Your count of custom metrics usually scales with the most granular/detailed tag. Let’s suppose you’re measuring temperature in the US and you’ve tagged your temperature metric by country and region. You submit the following data to Datadog:

| Metric Name   | Tag Values                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Suppose you wanted to add the tag `City` which has three values: `NYC`, `Miami`, and `Orlando`. Adding this tag increases the number of custom metrics as it provides more detail and granularity to your dataset as shown below:

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

**Note**: Reordering tag values doesn’t add uniqueness. The following combinations are the same custom metric:

*  `temperature{country:USA, state:Florida, city:Miami}`
*  `temperature{state:Florida, city:Miami, country:USA}`

[1]: /developers/metrics/types/?tab=count#metric-submission-types
[2]: /developers/metrics/types/?tab=rate#metric-submission-types
[3]: /developers/metrics/types/?tab=gauge#metric-submission-types
{{% /tab %}}
{{% tab "Histogram" %}}

**A HISTOGRAM metric generates by default five custom metrics** for each unique combination of metric name, host, and tag values to support the Agent-side aggregations: `max`, `median`, `avg`, `95pc`, and `count`. [Learn more about HISTOGRAM metric type][1].

The number of unique tag value combinations submitted for a HISTOGRAM metric with this tagging scheme is **4**:

* `host:A`, `endpoint:X`, `status:200`
* `host:B`, `endpoint:X`, `status:200`
* `host:B`, `endpoint:X`, `status:400`
* `host:B`, `endpoint:Y`, `status:200`

The Agent generates by default 5 custom metric for each of the original 4 unique tag value combinations to account [for each Agent-side aggregations enabled][2]: `max`, `median`, `avg`, `95pc`, and `count`. This results in `request.Latency` reporting a total of **4*5 = 20 custom metrics**.

**Notes**: Adding (resp. removing) aggregations to your HISTOGRAM metrics increases (resp. decreases) the number of distinct custom metrics reported:

* Configure which aggregation you want to send to Datadog with the `histogram_aggregates` parameter in your [datadog.yaml configuration file][3]. By default, only `max`, `median`, `avg`, and `count` aggregations are sent out to Datadog. `sum` and `min` are available for addition.
* Configure which percentile aggregation you want to send to Datadog with the `histogram_percentiles` parameter in your [datadog.yaml configuration file][3]. By default, only the `95pc` percentile is sent out to Datadog.

[1]: /developers/metrics/types/?tab=histogram
[2]: /developers/metrics/types/?tab=histogram#metric-submission-types
[3]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Distribution" %}}

**A DISTRIBUTION metric generates by default five custom metrics** for each unique combination of metric name, host, and tag values to represent the global statistical distribution of values. These 5 custom metrics represent server-side aggregations of `count`, `sum`, `min`, `max`, and `avg`. [Learn more about DISTRIBUTION metric type][1].

The number of unique tag value combinations submitted for a DISTRIBUTION metric with this tagging scheme is **4**.

* `host:A`, `endpoint:X`, `status:200`
* `host:B`, `endpoint:X`, `status:200`
* `host:B`, `endpoint:X`, `status:400`
* `host:B`, `endpoint:Y`, `status:200`

The number of custom metrics from a [DISTRIBUTION metric][1] is five times the unique combination of metric name, host, and tag values. This results in `request.Latency` reporting a total of **5*4 = 20 custom metrics**:

##### Customized Tagging

You can control over [which tag combination][2] aggregations are performed for any DISTRIBUTION metric. Let's say that you want to keep only the `endpoint` and `status` tags associated with your distribution, this leaves the following 3 unique tag combinations:

* `endpoint:X`, `status:200`
* `endpoint:X`, `status:400`
* `endpoint:Y`, `status:200`

The number of custom metrics from a [DISTRIBUTION metric][1] is five times the unique combination of metric name, host, and tag values. This results in `request.Latency` reporting a total of **5*3 = 15 custom metrics** with the tagging customisation .

##### Percentile Aggregations

**Datadog stores 5 custom metrics for each potentially queryable tag value combination** to provide you with globally accurate percentiles: `p50`, `p75`, `p90`, `p95`, and `p99`. Suppose you have [added percentile aggregations][3] for `request.Latency` for the set of tags `endpoint` and `status` with the same tag dependency seen earlier. The number of queryable tag value combination is **8**:

* `endpoint:X`, `status:200`
* `endpoint:X`, `status:400`
* `endpoint:Y`, `status:200`
* `endpoint:X`
* `endpoint:Y`
* `status:200`
* `status:400`
* `*`

This results in `request.Latency` with percentile aggregation enabled reporting an extra of **5*8 = 40 custom metrics**.

**Note**: Is counted as queryable, tag value combinations that actually appear in your data. Since the combination { `endpoint:Y`, `status:400` } was never submitted in your data, this combination won’t be queryable and won’t count towards your custom metric count.

[1]: /developers/metrics/types/?tab=distribution
[2]: /graphing/metrics/distributions/#customize-tagging
[3]: /graphing/metrics/distributions/#aggregations
{{% /tab %}}
{{< /tabs >}}

## Tracking Custom metrics

Administrative users (those with [Datadog Admin roles][4]) can see the total custom metrics per hour and the top 500 custom metrics for their account on the [usage details page][5]. See the [Usage Details][6] documentation for more information.

For more real-time tracking of the count of custom metrics for a particular metric name, click into the metric name on the [Metrics Summary page][7]; it’s listed as “Currently reporting # distinct metrics…” as shown below:

{{< img src="account_management/billing/custom_metrics/tracking_metric.mp4" alt="Tracking metric" video="true" responsive="true">}}

## Allocation

You are allocated a certain number of custom metrics based on your Datadog pricing plan:

* Pro: 100 custom metrics per host.
* Enterprise: 200 custom metrics per host.

These allocations are counted across your entire infrastructure. For example, if you are on the Pro plan and licensed for three hosts, 300 custom metrics are allocated. The 300 custom metrics can be divided equally across each host, or all 300 metrics can be used by a single host. Using this example, the graphic below shows scenarios that do not exceed the allocated custom metric count:

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="host_custom_metrics" responsive="true" >}}

The billable number of custom metrics is based on the average number of custom metrics (from all paid hosts) per hour over a given month. Contact [Sales][8] or your [Customer Success Manager][9] to discuss custom metrics for your account or to purchase an additional custom metrics package.

## Standard integrations

The following standard integrations can potentially emit custom metrics.

| Type of integrations                             | Integrations                                                                                                                                                  |
|--------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Limited to 350 custom metrics by default.        | [ActiveMQ XML][10] / [Go-Expvar][11]                                                                                                                          |
| No default limit upon custom metrics collection. | [Agent Metrics][12] /[Directory][13] /[Linux Proc Extras][14] /[Nagios][15] /[PDH Check][16] /[Prometheus][17] /[SNMP][18] /[Windows Services][19] /[WMI][20] |
| Can be configured to collect custom metrics.     | [MySQL][21] /[Oracle][22] /[Postgres][23] /[SQL Server][24]                                                                                                   |

## Troubleshooting

For technical questions, contact [Datadog support][25].

For billing questions, contact your [Customer Success][9] Manager.

[1]: /integrations
[2]: /developers/metrics/custom_metrics
[3]: /developers/metrics/types/#metric-submission-types
[4]: /account_management/team
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /account_management/billing/usage_details
[7]: https://app.datadoghq.com/metric/summary
[8]: mailto:sales@datadoghq.com
[9]: mailto:success@datadoghq.com
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
