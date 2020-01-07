---
title: Metrics
kind: documentation
disable_toc: true
aliases:
  - /metrics/
  - /guides/metrics/
  - /metrictypes/
  - /units/
  - /developers/metrics/datagram_shell
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
---

A Datadog metric is defined by the properties below. Refer to the [Metrics Introduction documentation][1] to learn how to graph metrics within Datadog.

| Property         | Description                                                                                                                                               |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | The [name of your metric](#naming-metrics).                                                                                                               |
| `<METRIC_VALUE>` | The value of your metric.                                                                                                                                 |
| `<TIMESTAMP>`     | The timestamp associated with the metric value. **Note**: Metric timestamps cannot be more than 10 minutes in the future or more than 1 hour in the past. |
| `<CONTEXT>`      | The set of tags associated with your metric.                                                                                                              |
| `<METRIC_TYPE>`  | The type of your metric. See the [metric type documentation][2].                                                                                          |
| `<INTERVAL>`     | If the `<TYPE>` of the metric is [RATE][3] or [COUNT][4], it defines the corresponding [interval][5].                                                                    |

If a metric is not submitted from one of the [350+ Datadog integrations][6], it's considered a [Custom Metric][7]. **Note**: Some standard integrations [emit custom metrics][8].

### Naming metrics

Follow these rules for naming metrics:

* Must start with a letter.
* Must only contain ASCII alphanumerics, underscores, and periods.
  * Other characters, including spaces, are converted to underscores.
  * Unicode is _not_ supported.
* Must not exceed 200 characters. Fewer than 100 is preferred from a UI perspective.

Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`). The hierarchy is neither enforced nor interpreted, but it can be used to infer things about servers. For example, if `hostA` and `hostB` are both reporting `http.nginx.*` those must be web frontends.

**Note**: Metric names are case sensitive in Datadog.

### Submitting metrics

{{< whatsnext desc="There are multiple ways to send metrics to Datadog:">}}
    {{< nextlink href="/developers/metrics/agent_metrics_submission" >}}Custom Agent check{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/api/?lang=python#post-timeseries-points" >}}Datadog's HTTP API{{< /nextlink >}}
{{< /whatsnext >}}

You can also use one of the [Datadog-official and community contributed API and DogStatsD client libraries][9] to submit your metrics

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/introduction
[2]: /developers/metrics/types
[3]: /developers/metrics/types/?tab=rate#metric-submission-types
[4]: /developers/metrics/types/?tab=count#metric-submission-types
[5]: /developers/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[6]: /integrations
[7]: /developers/metrics/custom_metrics
[8]: /account_management/billing/custom_metrics/#standard-integrations
[9]: /developers/libraries
