---
title: Custom Metrics
kind: documentation
disable_toc: true
aliases:
  - /metrics/
  - /guides/metrics/
  - /metrictypes/
  - /units/
  - /developers/metrics/datagram_shell
  - /developers/metrics/custom_metrics/
  - /getting_started/custom_metrics
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
---

## Overview

If a metric is not submitted from one of the [350+ Datadog integrations](/integrations) it's considered a custom metric.

A custom metric refers to **a unique combination of metric name, host, and tag values**. In general, any metric you send using [DogStatsD](/developers/metrics/dogstatsd_metrics_submission), or through a [custom Agent Check](/developers/metrics/agent_metrics_submission) is a custom metric. There are no enforced fixed rate limits on custom metric submission. If your default allotment is exceeded, you are billed according to [Datadog's billing policy for custom metrics](/account_management/billing/custom_metrics).

**Note**: Some standard integrations [emit custom metrics](/account_management/billing/custom_metrics/#standard-integrations).

## Metric definition

A Datadog metric is defined by the properties below. Refer to the [Metrics Introduction documentation][1] to learn how to graph metrics within Datadog.

| Property         | Description                                                                                                                                               |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | The [name of your metric](#naming-metrics).                                                                                                               |
| `<METRIC_VALUE>` | The value of your metric.                                                                                                                                 |
| `<TIMESTAMP>`    | The timestamp associated with the metric value. **Note**: Metric timestamps cannot be more than 10 minutes in the future or more than 1 hour in the past. |
| `<CONTEXT>`      | The set of tags associated with your metric.                                                                                                              |
| `<METRIC_TYPE>`  | The type of your metric. See the [metric type documentation][2].                                                                                          |
| `<INTERVAL>`     | If the `<TYPE>` of the metric is RATE or COUNT, it defines the corresponding interval.                                                                    |

### Naming custom metrics

Follow these rules for naming metrics:

* Must start with a letter.
* Must only contain ASCII alphanumerics, underscores, and periods.
  * Other characters, including spaces, are converted to underscores.
  * Unicode is _not_ supported.
* Must not exceed 200 characters. Fewer than 100 is preferred from a UI perspective.

Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`). The hierarchy is neither enforced nor interpreted, but it can be used to infer things about servers. For example, if `hostA` and `hostB` are both reporting `http.nginx.*` those must be web frontends.

**Note**: Metric names are case sensitive in Datadog.

## Submitting custom metrics

{{< whatsnext desc="There are multiple ways to send metrics to Datadog:">}}
    {{< nextlink href="/developers/metrics/agent_metrics_submission" >}}Custom Agent check{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/api/?lang=python#post-timeseries-points" >}}Datadog's HTTP API{{< /nextlink >}}
{{< /whatsnext >}}

You can also use one of the [Datadog-official and community contributed API and DogStatsD client libraries][6] to submit your metrics

## Counting Custom Metrics

A custom metric is uniquely identified by a combination of a metric name and tag values (including the host tag):

* Reporting the same metric name on different hosts results in multiple custom metrics
* Adding tags on a metric can change the number of custom metrics (number of unique tag value combinations) associated with that particular metric -- see Example 3 and 4 below.
* Reordering of tag values doesn’t add uniqueness, the following combinations are the same custom metric:

  *  `metric_name{tag_1:value_1, tag_2:value_2}`
  *  `metric_name{tag_2:value_2, tag_1:value_1}`

Find below some example of how to count your custom metrics, depending on your [submision type](/developers/metrics/types/#metric-submission-types), the amount of custom metrics generated may difer:

{{< tabs >}}
{{% tab "Count, Rate, Gauge" %}}

**Note**: This example uses a `COUNT` metric type, but the count of custom metrics would have been the same with a `GAUGE` or a `RATE` metric type.

Suppose you’re submitting a metric, `request.Count`, from two hosts (A,B), which counts the number of endpoint requests. You’re submitting this metric with two tag keys:

* `endpoint`  that can take the value `X` or `Y`
* `status` that can take the value `200` or `400`

Let’s assume that in your data, endpoint `X` is supported by both hosts, but fails only on `host:B`, and requests to `endpoint:Y` are always successful and only appears on `host:B` as shown below:

{{< img src="developers/metrics/custom_metrics_host.png" alt="Custom metrics host" responsive="true" style="width:80%;">}}

`request.Count` reports then **4 custom metrics**. The custom metrics are listed below:

| Metric Name     | Tag Values                           |
|-----------------|--------------------------------------|
| `request.Count` | `host:A`, `endpoint:X`, `status:200` |
| `request.Count` | `host:B`, `endpoint:X`, `status:200` |
| `request.Count` | `host:B`, `endpoint:X`, `status:400` |
| `request.Count` | `host:B`, `endpoint:Y`, `status:200` |

{{% /tab %}}
{{% tab "Histogram" %}}

A HISTOGRAM metric generates five custom metrics (to support client-side aggregations of `count`, `sum`, `min`, `max`, and `avg`) instead of one custom metric (unique tag value combination) that a Gauge/Count/Rate emits. Learn more about HISTOGRAM metric type.


{{% /tab %}}
{{% tab "Distribution" %}}

A distribution metric generates five custom metrics (to support server-side aggregations of `count`, `sum`, `min`, `max`, and `avg`) instead of one custom metric (unique tag value combination) that a Gauge/Count/Rate emits. Lern more about DISTRIBUTION metric type


{{% /tab %}}
{{< /tabs >}}

### Effect of Adding Tags

Adding tags **may not** result in more custom metrics. Your count of custom metrics usually scales with the most granular/detailed tag. Let’s suppose you’re measuring temperature in the US and you’ve tagged your temperature metric by country and region. You submit the following data to Datadog:

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

Now suppose you wanted to tag your temperature metric also by `state` (which has 2 values: `NY` and `Florida`). You’re now tagging temperature by the set of tags: `country`, `region`, `state`, and `city`. Adding the state tag doesn’t increase the level of granularity already present in your dataset provided by the city tag.

To obtain the temperature in Florida, you can simply recombine the custom metrics of:

* `temperature:{country:USA, state:Florida, city:Orlando}`
* `temperature{country:USA, state:Florida, city:Miami}`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/metrics/introduction
[2]: /developers/metrics/types
[3]: /integrations
[4]: /developers/metrics/custom_metrics
[5]: /account_management/billing/custom_metrics/#standard-integrations
[6]: /developers/libraries
