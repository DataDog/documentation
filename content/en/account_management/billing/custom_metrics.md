---
title: Custom Metrics Billing
kind: documentation
aliases:
    - /integrations/faq/what-standard-integrations-emit-custom-metrics/
further_reading:
  - link: "/observability_pipelines/guide/custom-metrics-governance"
    tag: "Documentation"
    text: "Use Observability Pipelines to govern custom metrics"
---

If a metric is not submitted from one of the [more than {{< translate key="integration_count" >}} Datadog integrations][1] it's considered a [custom metric][2]<sup>[(1)](#standard-integrations)</sup>.

**A custom metric is uniquely identified by a combination of a metric name and tag values (including the host tag)**. In general, any metric you send using [DogStatsD][25] or through a [custom Agent Check][26] is a custom metric.

Your monthly billable count for custom metrics (reflected on the Usage page) is calculated by taking the total of all distinct custom metrics for each hour in a given month, and dividing it by the number of hours in the month to compute a monthly average value.

Metrics without Limits™ users see monthly billable volumes for _ingested_ and _indexed_ custom metrics on their Usage page. Learn more about ingested and indexed custom metrics and [Metrics without Limits™][3]. 

## Counting custom metrics

The number of custom metrics associated with a particular metric name depends on its metric [submission type][4]. Below are examples of how to count your custom metrics based on the following scenario below:

Suppose you’re submitting a metric, `request.Latency`, from two hosts (`host:A`,`host:B`), which measures the latency of your endpoint requests. You’re submitting this metric with two tag keys:

- `endpoint`, which has the value `endpoint:X` or `endpoint:Y`.
- `status`, which has the value `status:200` or `status:400`.

Assume that in your data, `endpoint:X` is supported by both hosts, but fails only on `host:B`. Also assume that requests to `endpoint:Y` are always successful and only appear on `host:B` as shown below:

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Request latency" style="width:80%;">}}

{{< tabs >}}
{{% tab "Count, Rate"%}}

The number of custom metrics from [COUNT][1] and [RATE][2] is calculated with the same logic.

The number of unique tag value combinations submitted for a RATE metric with this tagging scheme is **four**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

This results in `request.Latency` reporting **four custom metrics**. 

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

Suppose you also wanted to tag your temperature metric by `state` (which has two values: `NY` and `Florida`). This means you are tagging temperature by the tags: `country`, `region`, `state`, and `city`. Adding the state tag doesn't increase the level of granularity already present in your dataset provided by the city tag.

To obtain the temperature in Florida, you can recombine the custom metrics of:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Note**: Reordering tag values doesn’t add uniqueness. The following combinations are the same custom metric:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configure tags and aggregations with Metrics without Limits™

Custom metrics volumes can be impacted by configuring tags and aggregations using [Metrics without Limits™][3]. Metrics without Limits™ decouples ingestion costs from indexing costs -- so you can continue sending Datadog all of your data (everything is ingested) and you can specify an allowlist of tags you'd want to remain queryable in the Datadog platform. Given the volume of data Datadog is ingesting for your configured metrics now differs from the smaller, remaining volume you’ve indexed, you'll see two distinct volumes on your Usage page as well as the Metrics Summary page. 
 
- **Ingested Custom Metrics**: The original volume of custom metrics based on the all ingested tags (sent via code)
- **Indexed Custom Metrics**: The volume of custom metrics that remains queryable in the Datadog platform (based on any Metrics without Limits™ configurations) 

**Note: Only configured metrics contribute to your Ingested custom metrics volume.** If a metric is not configured with Metrics without Limits™, you're only charged for its indexed custom metrics volume.

#### When are you charged for ingested vs indexed custom metrics?
For metrics not configured with Metrics without Limits™, you pay for indexed custom metrics.

|                                      | Indexed Custom Metrics<br>(based on monthly average number of Custom Metrics per hour)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Account allotment                    | - Pro: 100 indexed Custom Metrics per host <br>- Enterprise: 200 indexed Custom Metrics per host                             |
| Usage greater than account allotment | For each 100 indexed custom metrics over the account allotment, you pay an amount that is specified in your current contract. |

For metrics configured with Metrics without Limits™ (tags/aggregations are configured), you pay for ingested custom metrics and indexed custom metrics.

|                                      | Ingested Custom Metrics                                                                           | Indexed Custom Metrics                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Account Allotment                    | - Pro: 100 ingested Custom Metrics per host<br>- Enterprise: 200 ingested Custom Metrics per host | - Pro: 100 indexed Custom Metrics per host<br>- Enterprise: 200 indexed Custom Metrics per host                               |
| Usage greater than account allotment | For each 100 ingested custom metrics over the account allotment, you pay $0.10.                   | For each 100 indexed custom metrics over the account allotment, you pay an amount that is specified in your current contract. |

Suppose you wanted to use Metrics without Limits™ to reduce the size of your `request.Latency` metric by keeping only the `endpoint` and `status` tags. This results in the following three unique tag combinations:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

As a result of the tag configuration, `request.Latency` reporting a total of **3 indexed custom metrics** . Based on the original tags sent on this metric, the original **ingested** custom metrics volume of `request.Latency` is **4 ingested custom metrics**.

By default, Datadog stores the most frequently queried aggregation combination depending on the metric's type to preserve the mathematical accuracy of your configured metric's query.

- Configured counts/rates are queryable with time/space aggregations of `SUM`

You can opt-in to more aggregations should they be valuable for your queries - your number of indexed custom metrics scales with the number of enabled aggregations. 

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

This results in `request.Latency` reporting **four custom metrics**. 

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

Suppose you also wanted to tag your temperature metric by `state` (which has two values: `NY` and `Florida`). This means you are tagging temperature by `country`, `region`, `state`, and `city`. Adding the state tag doesn't increase the level of granularity already present in your dataset provided by the city tag.

To obtain the temperature in Florida, you can recombine the custom metrics of:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Note**: Reordering tag values doesn’t add uniqueness. The following combinations are the same custom metric:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configure tags and aggregations with Metrics without Limits™

Custom metrics volumes can be impacted by configuring tags and aggregations using [Metrics without Limits™][4]. Metrics without Limits™ decouples ingestion costs from indexing costs -- so you can continue sending Datadog all of your data (everything is ingested) and you can specify an allowlist of tags you want to remain queryable in the Datadog platform. Given the volume of data Datadog is ingesting for your configured metrics now differs from the smaller, remaining volume you’ve indexed, you'll see two distinct volumes on your Usage page as well as the Metrics Summary page. 
 
- **Ingested Custom Metrics**: The original volume of custom metrics based on the all ingested tags (sent via code)
- **Indexed Custom Metrics**: The volume of custom metrics that remains queryable in the Datadog platform (based on any Metrics without Limits™ configurations) 

**Note: Only configured metrics contribute to your Ingested custom metrics volume.** If a metric is not configured with Metrics without Limits™, you're only charged for its indexed custom metrics volume.

#### When are you charged for ingested vs indexed custom metrics?
For metrics not configured with Metrics without Limits™, you pay for for indexed custom metrics.

|                                      | Indexed Custom Metrics<br>(based on monthly average number of Custom Metrics per hour)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Account allotment                    | - Pro: 100 indexed Custom Metrics per host <br>- Enterprise: 200 indexed Custom Metrics per host                             |
| Usage greater than account allotment | For each 100 indexed custom metrics over the account allotment, you pay an amount that is specified in your current contract. |

For metrics configured with Metrics without Limits™ (tags/aggregations are configured), you pay for ingested custom metrics and indexed custom metrics.

|                                      | Ingested Custom Metrics                                                                           | Indexed Custom Metrics                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Account Allotment                    | - Pro: 100 ingested Custom Metrics per host<br>- Enterprise: 200 ingested Custom Metrics per host | - Pro: 100 indexed Custom Metrics per host<br>- Enterprise: 200 indexed Custom Metrics per host                               |
| Usage greater than account allotment | For each 100 ingested custom metrics over the account allotment, you pay $0.10.                   | For each 100 indexed custom metrics over the account allotment, you pay an amount that is specified in your current contract. |

By default, Datadog stores the most frequently queried aggregation combination depending on the metric's type to preserve the mathematical accuracy of your configured metric's query as listed below: 

- Configured gauges are queryable in time/space aggregations of `AVG/AVG` 

You can opt-in to more aggregations should they be valuable for your queries - your number of indexed custom metrics scales with the number of enabled aggregations.

Learn more about [Metrics without Limits™][1].

[1]: /metrics/metrics-without-limits
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


[1]: /metrics/types/?tab=histogram#metric-types
[2]: /metrics/types/?tab=histogram#definition
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

##### Adding percentile aggregations

You can include percentile aggregations (`p50`, `p75`, `p90`, `p95`, and `p99`) on your distribution metric. Including these additional percentile aggregations results in an additional volume of five times the unique combination of metric name and tag values (**5\*4 = 20 custom metrics**). Therefore the total number of custom metrics emitted from this distribution metric with percentile aggregations is **2 * (5\*4) = 40 custom metrics** .

This table summarizes the effect of adding percentile aggregations to any distribution metric. 

| Metrics                                                                                   | Number of Billable Custom Metrics |
|-------------------------------------------------------------------------------------------|-----------------------------------|
| Number of custom metrics from a baseline distribution (count, sum, min, max, avg)         | `5*(tag value combinations)`      |
| Number of custom metrics from including percentile aggregations (p50, p75, p90, p95, p99) | `5*(tag value combinations)`      |
| Total                                                                                     | `2*5(tag value combinations)`     |

### Configure tags with Metrics without Limits™

Custom metrics volumes can be impacted by configuring tags and aggregations using [Metrics without Limits™][2]. Metrics without Limits™ decouples ingestion costs from indexing costs -- so you can continue sending Datadog all of your data (everything is ingested) and you can specify an allowlist of tags you'd want to remain queryable in the Datadog platform. Given the volume of data Datadog is ingesting for your configured metrics now differs from the smaller, remaining volume you’ve indexed, you'll see two distinct volumes on your Usage page as well as the Metrics Summary page. 
 
- **Ingested Custom Metrics**: The original volume of custom metrics based on the all ingested tags (sent via code)
- **Indexed Custom Metrics**: The volume of custom metrics that remains queryable in the Datadog platform (based on any Metrics without Limits™ configurations) 

**Note: Only configured metrics contribute to your Ingested custom metrics volume.** If a metric is not configured with Metrics without Limits™, you're only charged for its indexed custom metrics volume.

#### When are you charged for ingested vs indexed custom metrics?
For metrics not configured with Metrics without Limits™, you pay for for indexed custom metrics.

|                                      | Indexed Custom Metrics<br>(based on monthly average number of Custom Metrics per hour)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Account allotment                    | - Pro: 100 indexed Custom Metrics per host <br>- Enterprise: 200 indexed Custom Metrics per host                             |
| Usage greater than account allotment | For each 100 indexed custom metrics over the account allotment, you pay an amount that is specified in your current contract. |

For metrics configured with Metrics without Limits™ (tags/aggregations are configured), you pay for ingested custom metrics and indexed custom metrics.

|                                      | Ingested Custom Metrics                                                                           | Indexed Custom Metrics                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Account Allotment                    | - Pro: 100 ingested Custom Metrics per host<br>- Enterprise: 200 ingested Custom Metrics per host | - Pro: 100 indexed Custom Metrics per host<br>- Enterprise: 200 indexed Custom Metrics per host                               |
| Usage greater than account allotment | For each 100 ingested custom metrics over the account allotment, you pay $0.10.                   | For each 100 indexed custom metrics over the account allotment, you pay an amount that is specified in your current contract. |

Suppose you want to keep only the `endpoint` and `status` tags associated with the `request.Latency` metric. This results in the following three unique tag combinations:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

The number of custom metrics from a [DISTRIBUTION metric][1] is five times the unique combination of metric name and tag values. As a result of the tag customization, `request.Latency` reporting a total of **5\*3 = 15 indexed custom metrics**. Based on the original tags sent on this metric, the original **ingested** custom metrics volume of `request.Latency` is **20 ingested custom metrics**.

Learn more about [Metrics without Limits™][2].

[1]: /metrics/types/?tab=distribution#definition
[2]: /metrics/metrics-without-limits
{{% /tab %}}
{{< /tabs >}}

## Tracking custom metrics

Administrative users (those with [Datadog Admin roles][5]) can see the monthly average number of **ingested** and **indexed** custom metrics per hour. The top custom metrics table also lists the average number of **indexed** custom metrics on the [usage details page][6]. See the [Usage Details][7] documentation for more information.

For more real-time tracking of the count of custom metrics for a particular metric name, click into the metric name on the [Metrics Summary page][8]. You can view the number of **ingested** custom metrics and **indexed** custom metrics on the metric's details sidepanel. 
{{< img src="account_management/billing/custom_metrics/mwl_sidepanel_ingested.jpg" alt="Metrics Summary sidepanel" style="width:80%;">}}


## Allocation

You are allocated a certain number of **ingested** and **indexed** custom metrics based on your Datadog pricing plan:

- Pro: 100 ingested custom metrics per host and 100 indexed custom metrics per host
- Enterprise: 200 ingested custom metrics per host and 200 indexed custom metrics per host

These allocations are counted across your entire infrastructure. For example, if you are on the Pro plan and licensed for three hosts, 300 indexed custom metrics are allocated. The 300 indexed custom metrics can be divided equally across each host, or all 300 indexed metrics can be used by a single host. Using this example, the graphic below shows scenarios that do not exceed the allocated custom metric count:

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="Allocations for Custom Metrics"  >}}

The billable number of indexed custom metrics is based on the average number of custom metrics (from all paid hosts) per hour over a given month. The billable number of ingested custom metrics only grows if you've used Metrics without Limits™ to configure your metric. Contact [Sales][9] or your [Customer Success][10] Manager to discuss custom metrics for your account or to purchase an additional custom metrics package.

## Standard integrations

The following standard integrations can potentially emit custom metrics.

| Type of integrations                           | Integrations                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| Limited to 350 custom metrics by default.      | [ActiveMQ XML][11] / [Go-Expvar][12] / [Java-JMX][13]                              |
| No default limit on custom metrics collection. | [Nagios][14] /[PDH Check][15] /[OpenMetrics][16] /[Windows Services][17] /[WMI][18] /[Prometheus][27] |
| Can be configured to collect custom metrics.   | [MySQL][19] /[Oracle][20] /[Postgres][21] /[SQL Server][22]                        |
| Custom metrics sent from cloud integrations    | [AWS][23]                                                                          |

## Troubleshooting

For technical questions, contact [Datadog support][24].

For billing questions, contact your [Customer Success][10] Manager.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[2]: /metrics/custom_metrics/
[3]: /metrics/metrics-without-limits
[4]: /metrics/types/#metric-types
[5]: /account_management/users/default_roles/
[6]: https://app.datadoghq.com/billing/usage
[7]: /account_management/billing/usage_details/
[8]: https://app.datadoghq.com/metric/summary
[9]: mailto:sales@datadoghq.com
[10]: mailto:success@datadoghq.com
[11]: /integrations/activemq/#activemq-xml-integration
[12]: /integrations/go_expvar/
[13]: /integrations/java/
[14]: /integrations/nagios/
[15]: /integrations/pdh_check/
[16]: /integrations/openmetrics/
[17]: /integrations/windows_service/
[18]: /integrations/wmi_check/
[19]: /integrations/mysql/
[20]: /integrations/oracle/
[21]: /integrations/postgres/
[22]: /integrations/sqlserver/
[23]: /integrations/amazon_web_services/
[24]: /help/
[25]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[26]: /metrics/custom_metrics/agent_metrics_submission/
[27]: /integrations/prometheus
