---
title: Custom Metrics
kind: documentation
aliases:
  - /metrics/
  - /guides/metrics/
  - /metrictypes/
  - /units/
  - /developers/metrics/datagram_shell
  - /developers/metrics/custom_metrics/
  - /getting_started/custom_metrics
further_reading:
- link: "/developers/dogstatsd/"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "/developers/libraries/"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
---

## Overview

If a metric is not submitted from one of the [more than {{< translate key="integration_count" >}} Datadog integrations][1] it's considered a custom metric<sup>[(1)][2]</sup>. Custom metrics help you track your application KPIs: number of visitors, average customer basket size, request latency, or performance distribution for a custom algorithm.

A custom metric is identified by **a unique combination of a metric's name and tag values (including the host tag)**. In general, any metric you send using [DogStatsD][3] or through a [custom Agent Check][4] is a custom metric.

**Note**: Users with the Datadog Admin roles can see the monthly average number of custom metrics per hour and the top 500 custom metrics for their account in the [usage details page][5]. Learn more about [how custom metrics are counted][6].

## Custom metrics properties

A Datadog custom metric has the properties below. Refer to the [Metrics Introduction documentation][7] to learn how to graph metrics within Datadog.

| Property         | Description                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | The [name of your metric](#naming-custom-metrics).                                                                                                                  |
| `<METRIC_VALUE>` | The value of your metric.                                                                                                                                    |
| `<TIMESTAMP>`    | The timestamp associated with the metric value. **Note**: Metric timestamps cannot be more than ten minutes in the future or more than one hour in the past. |
| `<TAGS>`         | The set of tags associated with your metric.                                                                                                                 |
| `<METRIC_TYPE>`  | The type of your metric. See the [metric type documentation][8].                                                                                             |
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
    {{< nextlink href="/developers/metrics/agent_metrics_submission" >}}Custom Agent check{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}Datadog's HTTP API{{< /nextlink >}}
{{< /whatsnext >}}

You can also use one of the [Datadog official and community contributed API and DogStatsD client libraries][12] to submit your custom metrics

**Note**: There are no enforced fixed rate limits on custom metric submission. If your default allotment is exceeded, you are billed according to [Datadog's billing policy for custom metrics][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br><sup>(1)</sup> *[Some integrations do emit custom metrics][2]*

[1]: /integrations/
[2]: /account_management/billing/custom_metrics/#standard-integrations
[3]: /developers/metrics/dogstatsd_metrics_submission/
[4]: /developers/metrics/agent_metrics_submission/
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /account_management/billing/custom_metrics/#counting-custom-metrics
[7]: /metrics
[8]: /developers/metrics/types/
[9]: /developers/metrics/types/?tab=rate#metric-types
[10]: /developers/metrics/types/?tab=count#metric-types
[11]: /developers/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /developers/libraries/
