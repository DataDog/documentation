---
title: Custom Metrics Billing
aliases:
    - /integrations/faq/what-standard-integrations-emit-custom-metrics/
further_reading:
- link: "/metrics/custom_metrics/"
  tag: "Documentation"
  text: "Learn more about Custom Metrics"
- link: "/metrics/guide/custom_metrics_governance/"
  tag: "Guide"
  text: "Best Practice for Custom Metric Governance"
algolia:
  tags: ['Custom Metrics billing']
---

## Overview

If a metric is not submitted from one of the [more than {{< translate key="integration_count" >}} Datadog integrations][1] it's considered a [custom metric][2]. Certain standard integrations can also potentially emit Custom Metrics. For more information, see [Custom Metrics and standard integrations][14].

**A custom metric is uniquely identified by a combination of a metric name and tag values (including the host tag)**. In general, any metric you send using [DogStatsD][3] or through a [custom Agent Check][4] is a custom metric.

Your monthly billable Custom Metrics usage (reflected on the Usage page) is calculated by taking the total of all distinct Custom Metrics (also known as timeseries) for each hour in a given month, and dividing it by the number of hours in the month to compute a monthly average value. Your billable usage is not impacted by data point submission frequency or the number of queries you run on your metrics.

Metrics without Limits™ users see monthly billable volumes for _ingested_ and _indexed_ Custom Metrics on their Usage page. Learn more about ingested and indexed Custom Metrics and [Metrics without Limits™][5]. 

## Counting Custom Metrics

The number of Custom Metrics associated with a particular metric name depends on its metric [submission type][6]. Below are examples of how to count your Custom Metrics based on the following scenario below:

Suppose you're submitting a metric, `request.Latency`, from two hosts (`host:A`,`host:B`), which measures the latency of your endpoint requests. You're submitting this metric with two tag keys:

- `endpoint`, which has the value `endpoint:X` or `endpoint:Y`.
- `status`, which has the value `status:200` or `status:400`.

Assume that in your data, `endpoint:X` is supported by both hosts, but fails only on `host:B`. Also assume that requests to `endpoint:Y` are always successful and only appear on `host:B` as shown below:

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Request latency" style="width:80%;">}}

{{< tabs >}}
{{% tab "Count, Rate"%}}

The number of Custom Metrics from [COUNT][1] and [RATE][2] is calculated with the same logic.

The number of unique tag value combinations submitted for a RATE metric with this tagging scheme is **four**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

This results in `request.Latency` reporting **four Custom Metrics**. 

### Effect of adding tags

Adding tags **may not** result in more Custom Metrics. Your count of Custom Metrics usually scales with the most granular or detailed tag. Suppose you are measuring temperature in the US, and you have tagged your `temperature` metric by country and region. You submit the following to Datadog:

| Metric Name   | Tag Values                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Suppose you wanted to add the tag `city` which has three values: `NYC`, `Miami`, and `Orlando`. Adding this tag increases the number of Custom Metrics as it provides more detail and granularity to your dataset as shown below:

| Metric Name   | Tag Values                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

The count of Custom Metrics reporting from `temperature` scales with the most granular tag, `city`.

Suppose you also wanted to tag your temperature metric by `state` (which has two values: `NY` and `Florida`). This means you are tagging temperature by the tags: `country`, `region`, `state`, and `city`. Adding the state tag doesn't increase the level of granularity already present in your dataset provided by the city tag.

To obtain the temperature in Florida, you can recombine the Custom Metrics of:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Note**: Reordering tag values doesn't add uniqueness. The following combinations are the same custom metric:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configure tags with Metrics without Limits™

Custom Metrics volumes can be impacted by configuring tags using [Metrics without Limits™][3]. Metrics without Limits™ decouples ingestion costs from indexing costs -- so you can continue sending Datadog all of your data (everything is ingested) and you can specify an allowlist of tags you'd want to remain queryable in the Datadog platform. Given the volume of data Datadog is ingesting for your configured metrics now differs from the smaller, remaining volume you've indexed, you'll see two distinct volumes on your Usage page as well as the Metrics Summary page. 
 
- **Ingested Custom Metrics**: The original volume of Custom Metrics based on the all ingested tags (sent via code)
- **Indexed Custom Metrics**: The volume of Custom Metrics that remains queryable in the Datadog platform (based on any Metrics without Limits™ configurations) 

**Note: Only configured metrics contribute to your Ingested Custom Metrics volume.** If a metric is not configured with Metrics without Limits™, you're only charged for its indexed Custom Metrics volume.

#### When are you charged for ingested vs indexed Custom Metrics?
For metrics not configured with Metrics without Limits™, you pay for indexed Custom Metrics.

|                                      | Indexed Custom Metrics<br>(based on monthly average number of Custom Metrics per hour)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Account allotment                    | - Pro: 100 indexed Custom Metrics per host <br>- Enterprise: 200 indexed Custom Metrics per host                             |
| Usage greater than account allotment | For each 100 indexed Custom Metrics over the account allotment, you pay an amount that is specified in your current contract. |

For metrics configured with Metrics without Limits™ (tags are configured), you pay for ingested Custom Metrics and indexed Custom Metrics.

|                                      | Ingested Custom Metrics                                                                           | Indexed Custom Metrics                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Account Allotment                    | - Pro: 100 ingested Custom Metrics per host<br>- Enterprise: 200 ingested Custom Metrics per host | - Pro: 100 indexed Custom Metrics per host<br>- Enterprise: 200 indexed Custom Metrics per host                               |
| Usage greater than account allotment | For each 100 ingested Custom Metrics over the account allotment, you pay $0.10.                   | For each 100 indexed Custom Metrics over the account allotment, you pay an amount that is specified in your current contract. |

Suppose you wanted to use Metrics without Limits™ to reduce the size of your `request.Latency` metric by keeping only the `endpoint` and `status` tags. This results in the following three unique tag combinations:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

As a result of the tag configuration, `request.Latency` reporting a total of **3 indexed Custom Metrics** . Based on the original tags sent on this metric, the original **ingested** Custom Metrics volume of `request.Latency` is **4 ingested Custom Metrics**.

Learn more about [Metrics without Limits™][3].

[1]: /metrics/types/?tab=count#metric-types
[2]: /metrics/types/?tab=rate#metric-types
[3]: /metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Gauge" %}}
The number of unique tag value combinations submitted for a GAUGE metric with this tagging scheme is **four**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

This results in `request.Latency` reporting **four Custom Metrics**. 

### Effect of adding tags

Adding tags **may not** result in more Custom Metrics. Your count of Custom Metrics usually scales with the most granular or detailed tag. Suppose you are measuring temperature in the US, and you have tagged your `temperature` metric by country and region. You submit the following to Datadog:

| Metric Name   | Tag Values                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Suppose you wanted to add the tag `city` which has three values: `NYC`, `Miami`, and `Orlando`. Adding this tag increases the number of Custom Metrics as it provides more detail and granularity to your dataset as shown below:

| Metric Name   | Tag Values                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

The count of Custom Metrics reporting from `temperature` scales with the most granular tag, `city`.

Suppose you also wanted to tag your temperature metric by `state` (which has two values: `NY` and `Florida`). This means you are tagging temperature by `country`, `region`, `state`, and `city`. Adding the state tag doesn't increase the level of granularity already present in your dataset provided by the city tag.

To obtain the temperature in Florida, you can recombine the Custom Metrics of:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Note**: Reordering tag values doesn't add uniqueness. The following combinations are the same custom metric:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configure tags with Metrics without Limits™

Custom Metrics volumes can be impacted by configuring tags using [Metrics without Limits™][4]. Metrics without Limits™ decouples ingestion costs from indexing costs -- so you can continue sending Datadog all of your data (everything is ingested) and you can specify an allowlist of tags you want to remain queryable in the Datadog platform. Given the volume of data Datadog is ingesting for your configured metrics now differs from the smaller, remaining volume you've indexed, you'll see two distinct volumes on your Usage page as well as the Metrics Summary page. 
 
- **Ingested Custom Metrics**: The original volume of Custom Metrics based on the all ingested tags (sent via code)
- **Indexed Custom Metrics**: The volume of Custom Metrics that remains queryable in the Datadog platform (based on any Metrics without Limits™ configurations) 

**Note: Only configured metrics contribute to your Ingested Custom Metrics volume.** If a metric is not configured with Metrics without Limits™, you're only charged for its indexed Custom Metrics volume.

#### When are you charged for ingested vs indexed Custom Metrics?
For metrics not configured with Metrics without Limits™, you pay for indexed Custom Metrics.

|                                      | Indexed Custom Metrics<br>(based on monthly average number of Custom Metrics per hour)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Account allotment                    | - Pro: 100 indexed Custom Metrics per host <br>- Enterprise: 200 indexed Custom Metrics per host                             |
| Usage greater than account allotment | For each 100 indexed Custom Metrics over the account allotment, you pay an amount that is specified in your current contract. |

For metrics configured with Metrics without Limits™ (tags are configured), you pay for ingested Custom Metrics and indexed Custom Metrics.

|                                      | Ingested Custom Metrics                                                                           | Indexed Custom Metrics                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Account Allotment                    | - Pro: 100 ingested Custom Metrics per host<br>- Enterprise: 200 ingested Custom Metrics per host | - Pro: 100 indexed Custom Metrics per host<br>- Enterprise: 200 indexed Custom Metrics per host                               |
| Usage greater than account allotment | For each 100 ingested Custom Metrics over the account allotment, you pay $0.10.                   | For each 100 indexed Custom Metrics over the account allotment, you pay an amount that is specified in your current contract. |

By default, Datadog gives you the following aggregations accessible upon querying:
- group by `SUM` & rollup by `AVG`
- group by `MAX` & rollup by `AVG`
- group by `MIN` & rollup by `AVG`
- group by `AVG` & rollup by `SUM`
- group by `SUM` & rollup by `SUM`
- group by `MAX` & rollup by `MAX`
- group by `MIN` & rollup by `MIN`
- group by `SUM` & rollup by `COUNT`

Your number of indexed Custom Metrics **does not scale** with the number of enabled aggregations.

Learn more about [Metrics without Limits™][1].

[1]: /metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Histogram" %}}

**A HISTOGRAM metric generates by default five Custom Metrics for each unique combination of metric name and tag values** to support the Agent-side aggregations `max`, `median`, `avg`, `95pc`, and `count`. [Learn more about HISTOGRAM metric type][1].

The number of unique tag value combinations submitted for a HISTOGRAM metric with this tagging scheme is **four**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

By default, the Agent generates five Custom Metrics for each of the original four unique tag value combinations to account [for each Agent-side aggregations enabled][2]: `avg`, `count`, `median`, `95percentile`, and `max`. Consequently, `request.Latency` reports a total of **4\*5 = 20 Custom Metrics**.

**Note**: Adding aggregations to your HISTOGRAM metrics increases the number of distinct Custom Metrics reported. Removing aggregations decreases the number of Custom Metrics reported.

- Configure which aggregation you want to send to Datadog with the `histogram_aggregates` parameter in your [datadog.yaml configuration file][3]. By default, only `max`, `median`, `avg`, and `count` aggregations are sent out to Datadog. `sum` and `min` are also available if desired.
- Configure which percentile aggregation you want to send to Datadog with the `histogram_percentiles` parameter in your [datadog.yaml configuration file][3]. By default, only the `95percentile`, 95th percentile, is sent out to Datadog.


[1]: /metrics/types/?tab=histogram#metric-types
[2]: /metrics/types/?tab=histogram#definition
[3]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Distribution" %}}

**A DISTRIBUTION metric generates by default five Custom Metrics for each unique combination of metric name and tag values** to represent the global statistical distribution of values. These five Custom Metrics represent server-side aggregations of `count`, `sum`, `min`, `max`, and `avg`. [Learn more about DISTRIBUTION metric type][1].

The number of unique tag value combinations submitted for a DISTRIBUTION metric with this tagging scheme is **four**.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

The number of Custom Metrics from a [DISTRIBUTION metric][1] is five times the unique combination of metric name and tag values. This results in `request.Latency` reporting a total of **5\*4 = 20 Custom Metrics**.

##### Adding percentile aggregations

You can include percentile aggregations (`p50`, `p75`, `p90`, `p95`, and `p99`) on your distribution metric. Including these additional percentile aggregations results in an additional volume of five times the unique combination of metric name and tag values (**5\*4 = 20 Custom Metrics**). Therefore the total number of Custom Metrics emitted from this distribution metric with percentile aggregations is **2 * (5\*4) = 40 Custom Metrics** .

This table summarizes the effect of adding percentile aggregations to any distribution metric. 

| Metrics                                                                                   | Number of Billable Custom Metrics |
|-------------------------------------------------------------------------------------------|-----------------------------------|
| Number of Custom Metrics from a baseline distribution (count, sum, min, max, avg)         | `5*(tag value combinations)`      |
| Number of Custom Metrics from including percentile aggregations (p50, p75, p90, p95, p99) | `5*(tag value combinations)`      |
| Total                                                                                     | `2*5(tag value combinations)`     |

### Configure tags with Metrics without Limits™

Custom Metrics volumes can be impacted by configuring tags and aggregations using [Metrics without Limits™][2]. Metrics without Limits™ decouples ingestion costs from indexing costs -- so you can continue sending Datadog all of your data (everything is ingested) and you can specify an allowlist of tags you'd want to remain queryable in the Datadog platform. Given the volume of data Datadog is ingesting for your configured metrics now differs from the smaller, remaining volume you've indexed, you'll see two distinct volumes on your Usage page as well as the Metrics Summary page. 
 
- **Ingested Custom Metrics**: The original volume of Custom Metrics based on the all ingested tags (sent via code)
- **Indexed Custom Metrics**: The volume of Custom Metrics that remains queryable in the Datadog platform (based on any Metrics without Limits™ configurations) 

**Note: Only configured metrics contribute to your Ingested Custom Metrics volume.** If a metric is not configured with Metrics without Limits™, you're only charged for its indexed Custom Metrics volume.

#### When are you charged for ingested vs indexed Custom Metrics?
For metrics not configured with Metrics without Limits™, you pay for indexed Custom Metrics.

|                                      | Indexed Custom Metrics<br>(based on monthly average number of Custom Metrics per hour)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Account allotment                    | - Pro: 100 indexed Custom Metrics per host <br>- Enterprise: 200 indexed Custom Metrics per host                             |
| Usage greater than account allotment | For each 100 indexed Custom Metrics over the account allotment, you pay an amount that is specified in your current contract. |

For metrics configured with Metrics without Limits™ (tags/aggregations are configured), you pay for ingested Custom Metrics and indexed Custom Metrics.

|                                      | Ingested Custom Metrics                                                                           | Indexed Custom Metrics                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Account Allotment                    | - Pro: 100 ingested Custom Metrics per host<br>- Enterprise: 200 ingested Custom Metrics per host | - Pro: 100 indexed Custom Metrics per host<br>- Enterprise: 200 indexed Custom Metrics per host                               |
| Usage greater than account allotment | For each 100 ingested Custom Metrics over the account allotment, you pay $0.10.                   | For each 100 indexed Custom Metrics over the account allotment, you pay an amount that is specified in your current contract. |

Suppose you want to keep only the `endpoint` and `status` tags associated with the `request.Latency` metric. This results in the following three unique tag combinations:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

The number of Custom Metrics from a [DISTRIBUTION metric][1] is five times the unique combination of metric name and tag values. As a result of the tag customization, `request.Latency` reporting a total of **5\*3 = 15 indexed Custom Metrics**. Based on the original tags sent on this metric, the original **ingested** Custom Metrics volume of `request.Latency` is **20 ingested Custom Metrics**.

Learn more about [Metrics without Limits™][2].

[1]: /metrics/types/?tab=distribution#definition
[2]: /metrics/metrics-without-limits
{{% /tab %}}
{{< /tabs >}}

## Tracking Custom Metrics

Administrative users (those with [Datadog Admin roles][7]) can see the monthly average number of **ingested** and **indexed** Custom Metrics per hour. The top Custom Metrics table also lists the average number of **indexed** Custom Metrics on the [usage details page][8]. See the [Usage Details][9] documentation for more information.

For more real-time tracking of the count of Custom Metrics for a particular metric name, click into the metric name on the [Metrics Summary page][10]. You can view the number of **ingested** Custom Metrics and **indexed** Custom Metrics on the metric's details sidepanel. 

<!-- replace this image here as it looks old -->
{{< img src="account_management/billing/custom_metrics/mwl_sidepanel_ingested.jpg" alt="Metrics Summary sidepanel" style="width:80%;">}}


## Allocation

You are allocated a certain number of **ingested** and **indexed** Custom Metrics based on your Datadog pricing plan:

- Pro: 100 ingested Custom Metrics per host and 100 indexed Custom Metrics per host
- Enterprise: 200 ingested Custom Metrics per host and 200 indexed Custom Metrics per host

These allocations are counted across your entire infrastructure. For example, if you are on the Pro plan and licensed for three hosts, 300 indexed Custom Metrics are allocated. The 300 indexed Custom Metrics can be divided equally across each host, or all 300 indexed metrics can be used by a single host. Using this example, the graphic below shows scenarios that do not exceed the allocated custom metric count:

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="Allocations for Custom Metrics" >}}

The billable number of indexed Custom Metrics is based on the average number of Custom Metrics (from all paid hosts) per hour over a given month. The billable number of ingested Custom Metrics only grows if you've used Metrics without Limits™ to configure your metric. Contact [Sales][11] or your [Customer Success][12] Manager to discuss Custom Metrics for your account or to purchase an additional Custom Metrics package.

## Troubleshooting

For technical questions, contact [Datadog support][13].

For billing questions, contact your [Customer Success][12] Manager.

[1]: /integrations/
[2]: /metrics/custom_metrics/
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /metrics/custom_metrics/agent_metrics_submission/
[5]: /metrics/metrics-without-limits
[6]: /metrics/types/#metric-types
[7]: /account_management/users/default_roles/
[8]: https://app.datadoghq.com/billing/usage
[9]: /account_management/plan_and_usage/usage_details/
[10]: https://app.datadoghq.com/metric/summary
[11]: mailto:sales@datadoghq.com
[12]: mailto:success@datadoghq.com
[13]: /help/
[14]: /metrics/custom_metrics/#standard-integrations
