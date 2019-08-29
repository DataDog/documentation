---
title: Metrics
kind: documentation
aliases:
  - /metrics/
  - /guides/metrics/
  - /metrictypes/
  - /units/
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
---

A Datadog metric is defined by the four properties below. To discover how to graph metrics within Datadog refer to the [Metrics Introduction documentation][1]:

| Property  | Description                                                                                                                                             |
| ----      | ----                                                                                                                                                    |
| Name      | The (name of your metric](#naming-metrics).                                                                                                             |
| Value     | The value of your metric.                                                                                                                               |
| Timestamp | The timestamp associated to the metric value. Note that Metric timestamps cannot be more than 10 minutes in the future or more than 1 hour in the past. |
| Context   | The set of tags associated to your metric.                                                                                                              |
| Type      | The type of your metric. See the [metric type documentation][2].                                                                                       |

**Note**: **If a metric is not submitted from one of the [350+ Datadog integrations][3] it's considered as a [Custom Metric][4].**

### Naming metrics

There are a few rules regarding metric names:

* Must start with a letter.
* Must only contain ASCII alphanumerics, underscores, and periods.
  * Other characters, including spaces, are converted to underscores.
  * Unicode is _not_ supported.
* Must not exceed 200 characters. Fewer than 100 is preferred from a UI perspective.

Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`). The hierarchy is neither enforced nor interpreted, but it can be used to infer things about servers. For example, if `hostA` and `hostB` are both reporting `http.nginx.*` those must be web frontends.

**Note**: Metric names are case sensitive in Datadog.

### Submitting metrics

{{< whatsnext desc="There are multiple ways to send metrics to Datadog:">}}
    {{< nextlink href="/developers/metrics/agent_metrics_submission" >}}Submit metrics with a custom Agent Check.{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/dogstatsd_metrics_submission" >}}Submit metrics with DogStatsD.{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/pwershell_metrics_submission" >}}Submit metrics with PowerShell.{{< /nextlink >}}
    {{< nextlink href="/api/?lang=python#post-timeseries-points" >}}Submit metrics with Datadog's HTTP API.{{< /nextlink >}}
{{< /whatsnext >}}

Alternatively you can use the [Dropwizard Java metrics library][5] with the [metrics-datadog][6] backend. Thanks to the people at [Vistar Media][7], [Coursera][8], and [Bazaarvoice][9] for their contributions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/metrics/introduction
[2]: /developers/metrics/metrics_type
[3]: /integrations
[4]: /developers/metrics/custom_metrics
[5]: https://github.com/dropwizard/metrics
[6]: https://github.com/coursera/metrics-datadog
[7]: http://www.vistarmedia.com
[8]: https://www.coursera.org
[9]: http://www.bazaarvoice.com
