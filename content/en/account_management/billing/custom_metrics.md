---
title: Custom Metrics Billing
kind: documentation
aliases:
    - /integrations/faq/what-standard-integrations-emit-custom-metrics/
---

If a metric is not submitted from one of the [400+ Datadog integrations][1] it's considered a [custom metric][2]<sup>[(1)](#standard-integrations)</sup>.

**A custom metric is uniquely identified by a combination of a metric name and tag values (including the host tag)**.

## Counting Custom Metrics

The number of custom metrics associated with a particular metric name depends on its metric [submission type][3]. Below are examples of how to count your custom metrics based on the following scenario below:

Suppose you’re submitting a metric, `request.Latency`, from two hosts (`host:A`,`host:B`), which measures the latency of your endpoint requests. You’re submitting this metric with two tag keys:

- `endpoint`, which has the value `endpoint:X` or `endpoint:Y`.
- `status`, which has the value `status:200` or `status:400`.

Assume that in your data, `endpoint:X` is supported by both hosts, but fails only on `host:B`. Also assume that requests to `endpoint:Y` are always successful and only appear on `host:B` as shown below:

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Request latency" responsive="true" style="width:80%;">}}

{{< tabs >}}
{{% tab "Count, Rate, Gauge" %}}

The number of custom metrics from [COUNT][1], [RATE][2], and [GAUGE][3] metric types is calculated with the same logic.

The number of unique tag value combinations submitted for a GAUGE metric with this tagging scheme is **four**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

This results in `request.Latency` reporting **four distinct custom metrics**.

### Effect of adding tags

Adding tags **may not** result in more custom metrics. Your count of custom metrics usually scales with the most granular or detailed tag. Suppose you are measuring temperature in the US, and you have tagged your `temperature` metric by country and region. You submit the following to Datadog:

| Metric Name   | Tag Values                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Suppose you wanted to add the tag `city` which has three values: `NYC`, `Miami`, and `Orlando`. Adding this tag increases the number of custom metrics as it provides more detail and granularity to your dataset as shown below:

| Metric Name   | Tag Values                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

The count of custom metrics reporting from `temperature` scales with the most granular tag, `city`.

Now suppose you also wanted to tag your temperature metric by `state` (which has two values: `NY` and `Florida`). You’re now tagging temperature by the set of tags: `country`, `region`, `state`, and `city`. Adding the state tag doesn’t increase the level of granularity already present in your dataset provided by the city tag.

To obtain the temperature in Florida, you can simply recombine the custom metrics of:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Note**: Reordering tag values doesn’t add uniqueness. The following combinations are the same custom metric:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`


[1]: /developers/metrics/types/?tab=count#metric-submission-types
[2]: /developers/metrics/types/?tab=rate#metric-submission-types
[3]: /developers/metrics/types/?tab=gauge#metric-submission-types
{{% /tab %}}
{{% tab "Histogram" %}}

**A HISTOGRAM metric generates by default five custom metrics for each unique combination of metric name and tag values** to support the Agent-side aggregations `max`, `median`, `avg`, `95pc`, and `count`. [Learn more about HISTOGRAM metric type][1].

The number of unique tag value combinations submitted for a HISTOGRAM metric with this tagging scheme is **four**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

By default, the Agent generates five custom metrics for each of the original four unique tag value combinations to account [for each Agent-side aggregations enabled][2]: `avg`, `count`, `median`, `95percentile`, and `max`. Consequently, `request.Latency` reports a total of **4\*5 = 20 custom metrics**.

**Note**: Adding aggregations to your HISTOGRAM metrics increases the number of distinct custom metrics reported. Removing aggregations decreases the number of custom metrics reported.

- Configure which aggregation you want to send to Datadog with the `histogram_aggregates` parameter in your [datadog.yaml configuration file][3]. By default, only `max`, `median`, `avg`, and `count` aggregations are sent out to Datadog. `sum` and `min` are also available if desired.
- Configure which percentile aggregation you want to send to Datadog with the `histogram_percentiles` parameter in your [datadog.yaml configuration file][3]. By default, only the `95percentile`, 95th percentile, is sent out to Datadog.


[1]: /developers/metrics/types/?tab=histogram
[2]: /developers/metrics/types/?tab=histogram#metric-submission-types
[3]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Distribution" %}}

**A DISTRIBUTION metric generates by default five custom metrics for each unique combination of metric name and tag values** to represent the global statistical distribution of values. These five custom metrics represent server-side aggregations of `count`, `sum`, `min`, `max`, and `avg`. [Learn more about DISTRIBUTION metric type][1].

The number of unique tag value combinations submitted for a DISTRIBUTION metric with this tagging scheme is **four**.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

The number of custom metrics from a [DISTRIBUTION metric][1] is five times the unique combination of metric name and tag values. This results in `request.Latency` reporting a total of **5\*4 = 20 custom metrics**.

##### Customization of tagging

You can customize [which tag combination][2] aggregations are created for any DISTRIBUTION metric. Suppose you want to keep only the `endpoint` and `status` tags associated with the `request.Latency` metric. This results in the following three unique tag combinations:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

The number of custom metrics from a [DISTRIBUTION metric][1] is five times the unique combination of metric name and tag values. As a result of the tag customization, `request.Latency` reporting a total of **5\*3 = 15 custom metrics**

##### Adding percentile aggregations

Percentile aggregations are unique in the way they're counted because **Datadog stores five custom metrics for each potentially queryable tag value combination** to provide you with globally accurate percentiles: `p50`, `p75`, `p90`, `p95`, and `p99`. Suppose you have [added percentile aggregations][3] for `request.Latency` for the set of tags `endpoint` and `status` with the same tag dependency seen earlier. The number of queryable tag value combinations is **eight**:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`
- `endpoint:X`
- `endpoint:Y`
- `status:200`
- `status:400`
- `*`

After enabling percentile aggregations for `request.Latency`, this metric name additionally reports **5\*8 = 40 custom metrics**.

**Note**: Only tag value combinations that actually appear in your data are counted as queryable. Since the combination { `endpoint:Y`, `status:400` } was never submitted in your data, this combination won’t be queryable and won’t count towards your custom metric count.


[1]: /developers/metrics/types/?tab=distribution
[2]: /metrics/distributions/#customize-tagging
[3]: /metrics/distributions/#aggregations
{{% /tab %}}
{{< /tabs >}}

## Tracking custom metrics

Administrative users (those with [Datadog Admin roles][4]) can see the monthly average number of custom metrics per hour and the top 500 custom metrics for their account on the [usage details page][5]. See the [Usage Details][6] documentation for more information.

For more real-time tracking of the count of custom metrics for a particular metric name, click into the metric name on the [Metrics Summary page][7]. It’s listed as “Currently reporting # distinct metrics...” as shown below:

{{< img src="account_management/billing/custom_metrics/tracking_metric.mp4" alt="Tracking metric" video="true" responsive="true">}}

## Allocation

You are allocated a certain number of custom metrics based on your Datadog pricing plan:

- Pro: 100 custom metrics per host.
- Enterprise: 200 custom metrics per host.

These allocations are counted across your entire infrastructure. For example, if you are on the Pro plan and licensed for three hosts, 300 custom metrics are allocated. The 300 custom metrics can be divided equally across each host, or all 300 metrics can be used by a single host. Using this example, the graphic below shows scenarios that do not exceed the allocated custom metric count:

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="host_custom_metrics" responsive="true" >}}

The billable number of custom metrics is based on the average number of custom metrics (from all paid hosts) per hour over a given month. Contact [Sales][3] or your [Customer Success][8] Manager to discuss custom metrics for your account or to purchase an additional custom metrics package.

## Standard integrations

The following standard integrations can potentially emit custom metrics.

| Type of integrations                           | Integrations                                                                                                                             |
|------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Limited to 350 custom metrics by default.      | [ActiveMQ XML][9] / [Go-Expvar][10] / [Java-JMX][11]                                                                                     |
| No default limit on custom metrics collection. | [Directory][12] /[Linux Proc Extras][13] /[Nagios][14] /[PDH Check][15] /[Prometheus][16] /[SNMP][17] /[Windows Services][18] /[WMI][19] |
| Can be configured to collect custom metrics.   | [MySQL][20] /[Oracle][21] /[Postgres][22] /[SQL Server][23]                                                                              |
| Custom metrics sent from cloud integrations    | [AWS][24]                                                                                                                                |

## Troubleshooting

For technical questions, contact [Datadog support][25].

For billing questions, contact your [Customer Success][26] Manager.

[1]: /integrations
[2]: /developers/metrics/custom_metrics
[3]: /developers/metrics/types/#metric-submission-types
[4]: https://app.datadoghq.com/account/usage/hourly
[5]: /account_management/billing/usage_details
[6]: https://app.datadoghq.com/metric/summary
[7]: mailto:sales@datadoghq.com
[8]: /account_management/team
[9]: /integrations/activemq/#activemq-xml-integration
[10]: /integrations/go_expvar
[11]: /integrations/java/
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
[24]: /integrations/amazon_web_services
[25]: /help
[26]: mailto:success@datadoghq.com
