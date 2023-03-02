---
title: Custom Metrics
kind: documentation
aliases:
  - /guides/metrics/
  - /metrictypes/
  - /units/
  - /developers/metrics/datagram_shell
  - /developers/metrics/custom_metrics/
  - /getting_started/custom_metrics
  - /developers/metrics/
  - /metrics/guide/tag-configuration-cardinality-estimation-tool/
further_reading:
- link: "/developers/dogstatsd/"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "/developers/community/libraries/"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
- link: "https://www.datadoghq.com/blog/metrics-without-limits/"
  tag: "Blog"
  text: "Dynamically control your custom metrics volume with Metrics without Limits™"
---

## Overview

If a metric is not submitted from one of the [more than {{< translate key="integration_count" >}} Datadog integrations][1] it's considered a custom metric<sup>[(1)][2]</sup>. Custom metrics help you track your application KPIs: number of visitors, average customer basket size, request latency, or performance distribution for a custom algorithm.

A custom metric is identified by **a unique combination of a metric's name and tag values (including the host tag)**. In general, any metric you send using [DogStatsD][3] or through a [custom Agent Check][4] is a custom metric.

**Note**: Users with the Datadog Admin role or `usage_read` permission can see the monthly average number of custom metrics per hour and the top 5000 custom metrics for their account in the [usage details page][5]. Learn more about [how custom metrics are counted][6].

## Custom metrics properties

A Datadog custom metric has the properties below. Read the [metrics introduction][7] to learn how to graph metrics within Datadog.

| Property         | Description                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | The [name of your metric](#naming-custom-metrics).                                                                                                                  |
| `<METRIC_VALUE>` | The value of your metric. **Note**: Metric values must be 32-bit. Values should not reflect dates or timestamps.                                                                                                                                |
| `<TIMESTAMP>`    | The timestamp associated with the metric value. **Note**: Metric timestamps cannot be more than ten minutes in the future or more than one hour in the past. |
| `<TAGS>`         | The set of tags associated with your metric.                                                                                                                 |
| `<METRIC_TYPE>`  | The type of your metric. Read about [metric types][8].                                                                                             |
| `<INTERVAL>`     | If the `<TYPE>` of the metric is [RATE][9] or [COUNT][10], it defines the corresponding [interval][11].                                                       |

### Naming custom metrics

The following custom metric naming convention must be followed:

* Metric names must start with a letter.
* Metric names must only contain ASCII alphanumerics, underscores, and periods.
  * Other characters, including spaces, are converted to underscores.
  * Unicode is _not_ supported.
* Metric names must not exceed 200 characters. Fewer than 100 is preferred from a UI perspective.

**Note**: Metric names are case sensitive in Datadog.

## Submitting custom metrics

{{< whatsnext desc="There are multiple ways to send metrics to Datadog:">}}
    {{< nextlink href="/metrics/custom_metrics/agent_metrics_submission" >}}Custom Agent check{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}Datadog's HTTP API{{< /nextlink >}}
    {{< nextlink href="/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric" >}}Generate Log-based metrics{{< /nextlink >}}
    {{< nextlink href="/tracing/generate_metrics/" >}}Generate APM span-based metrics{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/generate_metrics/" >}}Generate RUM event-based metrics{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/increase_process_retention/#generate-a-process-based-metric" >}}Generate live process-based metrics{{< /nextlink >}}
{{< /whatsnext >}}

You can also use one of the [Datadog official and community contributed API and DogStatsD client libraries][12] to submit your custom metrics

**Note**: There are no enforced fixed rate limits on custom metric submission. If your default allotment is exceeded, you are billed according to [Datadog's billing policy for custom metrics][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br><sup>(1)</sup> *[Some integrations do emit custom metrics][2]*

[1]: /integrations/
[2]: /account_management/billing/custom_metrics/#standard-integrations
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /metrics/custom_metrics/agent_metrics_submission/
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /account_management/billing/custom_metrics/#counting-custom-metrics
[7]: /metrics
[8]: /metrics/types/
[9]: /metrics/types/?tab=rate#metric-types
[10]: /metrics/types/?tab=count#metric-types
[11]: /developers/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /developers/community/libraries/
