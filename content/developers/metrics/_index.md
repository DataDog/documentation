---
title: Metrics
kind: documentation
js_dd_docs_methods:
  - metricsGuidePage
code_languages:
  - Python
  - Ruby
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

## Introduction

This section explains what metrics are and what they do. Whether you want to send [custom metrics][1], or have a better understanding about how Datadog works, read on. If you're looking for information about the DogStatsD (which implements these metrics), see the [DogStatsD documentation][2].

### Submitting metrics

There are multiple ways to send metrics to Datadog:

1. Via the Datadog Agent directly. Learn how to [write an integration][3], or examine the [Aggregator source code][4] directly.
2. Via the DogStatsD server (bundled with the Datadog Agent) and a [client library][5].
3. Directly via Datadog's [HTTP API][6].
4. Via the [Dropwizard Java metrics library][7] with the [metrics-datadog][8] backend. Thanks to the people at [Vistar Media][9], [Coursera][10], and [Bazaarvoice][11] for their contributions.

<div class="alert alert-warning">
Metric timestamps cannot be more than 10 minutes in the future or more than 1 hour in the past.
</div>

### Naming metrics

There are a few rules regarding metric names:

* Must start with a letter.
* Must only contain ASCII alphanumerics, underscores, and periods.
  * Other characters, including spaces, are converted to underscores.
  * Unicode is _not_ supported.
* Must not exceed 200 characters. Fewer than 100 is preferred from a UI perspective.

Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`). The hierarchy is neither enforced nor interpreted, but it can be used to infer things about servers. For example, if `hostA` and `hostB` are both reporting `http.nginx.*` those must be web frontends.

## Metric Types

The "Datadog in-app type" affects how a given metric is interpreted in query results and graph visualizations across the application. This type is visible and can be changed on the [metric summary page][12]. Be aware that changing the metric type may render historical data nonsensical.

In the Datadog web application there are four metric types (though one is deprecated):

* COUNT
* COUNTER (deprecated)
* GAUGE
* RATE

A metric's type is stored as metrics metadata and is used to determine how a metric is interpreted throughout the application by determining default time aggregation function and `as_rate()`/`as_count()` behavior. The `as_count()` and `as_rate()` modifiers behave differently for different web application metric types.

### Submission types and Datadog in-app types

Datadog accepts metrics submitted from a variety of sources, and as a result the "submission type" (think "use-case") does not always map exactly to the Datadog in-app type:

| Submission Source   | Submission Method (python)           | Submission Type   | Datadog In-App Type |
| ------------------- | ------------------------------------ | ----------------- | ------------------- |
| [API][13]            | `api.Metric.send(type="count", ...)` | count             | count               |
| [API][13]            | `api.Metric.send(type="gauge", ...)` | gauge             | gauge               |
| [API][13]            | `api.Metric.send(type="rate", ...)`  | rate              | rate                |
| [DogStatsD][14]      | `dog.gauge(...)`                     | gauge             | gauge               |
| [DogStatsD][14]      | `dog.histogram(...)`                 | histogram         | gauge, rate         |
| [DogStatsD][14]      | `dog.increment(...)`                 | counter           | rate                |
| [DogStatsD][14]      | `dog.set(...)`                       | set               | gauge               |
| [Agent check][3]    | `self.count(...)`                    | count             | count               |
| [Agent check][3]    | `self.gauge(...)`                    | gauge             | gauge               |
| [Agent check][3]    | `self.histogram(...)`                | histogram         | gauge, rate         |
| [Agent check][3]    | `self.increment(...)`                | counter <sup>deprecated</sup> | rate    |
| [Agent check][3]    | `self.monotonic_count(...)`          | monotonic_count   | count               |
| [Agent check][3]    | `self.rate(...)`                     | rate              | gauge               |
| [Agent check][3]    | `self.set(...)`                      | set               | gauge               |

### Modify a metric's type

While it is not normally required, it is possible to change a metric's _type_. For example:

1. You have a metric `app.requests.served` that counts requests served, but accidentally submitted it via StatsD as a `gauge`. The metric's Datadog type is therefore `gauge`.

2. You wanted to submit `app.requests.served` as a StatsD `counter` metric for time aggregation. This would help answer questions like _"How many total requests were served in the past day?"_ by querying `sum:app.requests.served{*}` (this would not make sense for a `gauge`-type  metric.)

3. You like the name `app.requests.served` so rather than submitting a new metric name with the more appropriate `counter` type, you could change the type of `app.requests.served` by updating:
  * Your submission code, calling `dogstatsd.increment('app.requests.served', N)` after N requests are served.
  * The Datadog in-app type via the metric summary page to `rate`.

This causes data submitted before the type change for `app.requests.served`to behave incorrectly because it was stored in a format to be interpreted as an in-app `gauge` not a `rate`. Data submitted after steps 3a and 3b
is interpreted properly.

If you are not willing to lose the historical data submitted as a `gauge`, create a new metric name with the new type, leaving the type of `app.requests.served` unchanged.

**Note**: For the AgentCheck, `self.increment` does not calculate the delta for a monotonically increasing counter, rather it reports the value passed in at the check run. To send the delta value on a monotonically increasing counter, use `self.monotonic_count`. 

## Units

To eliminate ambiguity and help you make sense of your systems, the following units may be associated with metrics submitted to Datadog.

| type         | unit(s)                                                                                                                                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BYTES        | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                       |
| TIME         | nanosecond / microsecond / millisecond / second / minute / hour / day / week                                                                                                                                                                       |
| PERCENTAGE   | percent_nano / percent / apdex / fraction                                                                                                                                                                                                          |
| NETWORK      | connection / request / packet / segment / response / message / payload / timeout / datagram / route / session                                                                                                                                      |
| SYSTEM       | process / thread / host / node / fault / service / instance / cpu                                                                                                                                                                                  |
| DISK         | file / inode / sector / block                                                                                                                                                                                                                      |
| GENERAL      | buffer / error / read / write / occurrence / event / time / unit / operation / item / task / worker / resource / garbage collection / email / sample / stage / monitor / location / check / attempt / device / update / method / job / container / execution / throttle / invocation / user / success / build / prediction   |
| DB           | table / index / lock / transaction / query / row / key / command / offset / record / object / cursor / assertion / scan / document / shard / flush / merge / refresh / fetch / column / commit / wait / ticket / question                          |
| CACHE        | hit / miss / eviction / get / set                                                                                                                                                                                                                  |
| MONEY        | dollar / cent                                                                                                                                                                                                                                      |
| MEMORY       | page / split                                                                                                                                                                                                                                       |
| FREQUENCY    | hertz / kilohertz / megahertz / gigahertz                                                                                                                                                                                                          |
| LOGGING      | entry                                                                                                                                                                                                                                              |
| TEMPERATURE  | degree celsius / degree fahrenheit                                                                                                                                                                                                                 |
| CPU          | nanocore / microcore / millicore / core / kilocore / megacore / gigacore / teracore / petacore / exacore                                                                                                                                           |

Units are displayed automatically on timeseries graphs, query value widgets, and toplists, as shown in the screenshot of the Redis dashboard below:

{{< img src="developers/metrics/redis_dash_metrics_units.png" alt="Redis dash metric units" responsive="true" style="width:70%;">}}

On timeseries graphs, move your cursor over any graph to see the relevant units. The raw data is automatically converted to readable display units (fractions of a second to ms, millions of bytes per second to MiB/s, etc.):

{{< img src="developers/metrics/postgres_commits.png" alt="postgres commits" responsive="true" style="width:70%;">}}

Units are also displayed at the bottom of timeboard graphs, and metric descriptions are available by selecting **Metrics Info** from the gear dropdown:

{{< img src="developers/metrics/annotated_ops.png" alt="Annotated ops" responsive="true" style="width:70%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics/custom_metrics
[2]: /developers/dogstatsd
[3]: /developers/integrations
[4]: https://github.com/DataDog/dd-agent/blob/master/aggregator.py
[5]: /developers/libraries
[6]: /api
[7]: https://github.com/dropwizard/metrics
[8]: https://github.com/coursera/metrics-datadog
[9]: http://www.vistarmedia.com
[10]: https://www.coursera.org
[11]: http://www.bazaarvoice.com
[12]: https://app.datadoghq.com/metric/summary
[13]: /api/#metrics
[14]: /developers/dogstatsd
