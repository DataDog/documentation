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
  text: Learn more about DogStatsD
- link: "developers/libraries"
  tag: "Documentation"
  text: Official and Community-contributed API and DogStatsD client libraries
---

## Introduction

This section explains the nuts and bolts of metrics - what they are, and what they do. Whether you want to send [custom metrics][4], or just want to have a better understanding about how Datadog works, read on. If you're looking for information about the DogStatsD (which implements these metrics), please see the [DogStatsD documentation][5].

### Submitting metrics

There are multiple ways to send metrics to Datadog:

1. Via the Datadog Agent directly. Learn how [to write an Agent check][2], or examine the [Aggregator source code][9] directly.
2. Via the DogStatsD server (bundled with the Datadog Agent) and a [client library][16].
3. Directly via Datadog's [HTTP API][10].
4. Via Dropwizard's Java [metrics][11] library with the [metrics-datadog][12] backend. Thanks to the good folks at [Vistar Media][19], [Coursera][13], and [Bazaarvoice][14] for their contributions.

### Naming metrics

There are a few rules regarding metric names:

* Must start with a letter.
* Must only contain ASCII alphanumerics, underscores, and periods.
  * Other characters, including spaces, are converted to underscores.
  * Unicode is _not_ supported.
* Must not exceed 200 characters. Fewer than 100 is preferred from a UI perspective.

Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`). The hierarchy is neither enforced nor interpreted, but it can be used to infer things about servers (e.g. "hey, I see hostA and hostB are reporting `http.nginx.*`, those must be web frontends").

## Metric Types

The "Datadog in-app type" affects how a given metric is interpreted in query results and graph visualizations across the application. The metric type visible on the [metric summary page][20] is the Datadog in-app type. You should only change the type if you have started submitting this metric with a new type, and should be aware that changing the type may render historical data nonsensical.

In the Datadog web application there are five metric types (though one is deprecated):

* COUNT
* COUNTER (deprecated)
* DISTRIBUTION
* GAUGE
* RATE

A metric's type is stored as metrics metadata and is used to determine how a metric is interpreted throughout the application by determining default time aggregation function and `as_rate()`/`as_count()` behavior. The `as_count()` and `as_rate()` modifiers behave differently for different Web Application metric types.

### Submission types and Datadog in-app types

Datadog accepts metrics submitted from a variety of sources, and as a result the "submission type" (think "use-case") does not always map exactly to the Datadog in-app type:

| Submission Source   | Submission Method (python)           | Submission Type   | Datadog In-App Type |
| ------------------- | ------------------------------------ | ----------------- | ------------------- |
| [API][3]            | `api.Metric.send(type="count", ...)` | count             | count               |
| [API][3]            | `api.Metric.send(type="gauge", ...)` | gauge             | gauge               |
| [API][3]            | `api.Metric.send(type="rate", ...)`  | rate              | rate                |
| [DogStatsD][1]      | `dog.gauge(...)`                     | gauge             | gauge               |
| [DogStatsD][1]      | `dog.distribution(...)`              | distribution      | distribution        |
| [DogStatsD][1]      | `dog.histogram(...)`                 | histogram         | gauge, rate         |
| [DogStatsD][1]      | `dog.increment(...)`                 | counter <sup>deprecated</sup> | rate    |
| [DogStatsD][1]      | `dog.set(...)`                       | set               | gauge               |
| [Agent check][2]    | `self.count(...)`                    | count             | count               |
| [Agent check][2]    | `self.gauge(...)`                    | gauge             | gauge               |
| [Agent check][2]    | `self.histogram(...)`                | histogram         | gauge, rate         |
| [Agent check][2]    | `self.increment(...)`                | counter <sup>deprecated</sup> | rate    |
| [Agent check][2]    | `self.monotonic_count(...)`          | monotonic_count   | count               |
| [Agent check][2]    | `self.rate(...)`                     | rate              | gauge               |
| [Agent check][2]    | `self.set(...)`                      | set               | gauge               |

### Modify a metric's type

While it is not normally required, it is possible to change a metric's _type_. Some examples:

1. You have a metric `app.requests.served` that counts requests served, but accidentally submitted it via StatsD as a `gauge`. The metric's Datadog type is therefore `gauge`.

2. You realize you should have submitted it as a StatsD `counter` metric, that way you can do time aggregation to answer questions like "How many total requests were served in the past day?" by querying `sum:app.requests.served{*}` (this would not make sense for a `gauge`-type  metric.)

3. You like the name `app.requests.served` so rather than submitting a new metric name with the more appropriate `counter` type, you could change the type of `app.requests.served`.
  * By updating your submission code, calling `dogstatsd.increment('app.requests.served', N)` after N requests are served.
  * By updating the Datadog in-app type via the metric summary page to `rate`.

This causes data submitted before the type change for `app.requests.served`to behave incorrectly because it was stored in a format to be interpreted as an in-app `gauge` not a `rate`. Data submitted after steps 3a and 3b
is interpreted properly.

If you are not willing to lose the historical data submitted as a `gauge`, create a new metric name with the new type, leaving the type of `app.requests.served` unchanged.

## Units

The following units may be associated with metrics submitted to Datadog.

<!-- {{% table responsive="true" %}}
|Bytes|Time|Percentage|Network|System|Disk|General|DB|Cache|Money|Memory|Frequency|Logging|
|:----|:----|:----|:----|:---|:---|:----|:---|:---|:---|:---|:---|:---|
|<ul><li>bit</li><li>byte</li><li>kibibyte</li><li>mebibyte</li><li>gibibyte</li><li>tebibyte</li><li>pebibyte</li><li>exbibyte</li></ul>|<ul><li>microsecond</li><li>millisecond</li><li>second</li><li>minute</li><li>hour</li><li>day</li><li>week</li><li>nanosecond</li></ul>|<ul><li>fraction</li><li>percent</li><li>percent_nano</li><li>apdex</li></ul>|<ul><li>connection</li><li>request</li><li>packet</li><li>segment</li><li>response</li><li>message</li><li>payload</li><li>timeout</li><li>datagram</li><li>route</li><li>session</li></ul>|<ul><li>process</li><li>core</li><li>thread</li><li>host</li><li>node</li><li>fault</li><li>service</li><li>instance</li><li>cpu</li></ul>|<ul><li>file</li><li>inode</li><li>sector</li><li>block</li></ul>|<ul><li>buffer</li><li>error</li><li>read</li><li>write</li><li>occurrence</li><li>event</li><li>time</li><li>unit</li><li>operation</li><li>item</li><li>task</li><li>worker</li><li>resource</li><li>garbage collection</li><li>email</li><li>sample</li><li>stage</li><li>monitor</li><li>location</li><li>check</li><li>attempt</li><li>device</li><li>update</li><li>method</li><li>job</li><li>container</li></ul>|<ul><li>table</li><li>index</li><li>lock</li><li>transaction</li><li>query</li><li>row</li><li>key</li><li>command</li><li>offset</li><li>record</li><li>object</li><li>cursor</li><li>assertion</li><li>scan</li><li>document</li><li>shard</li><li>flush</li><li>merge</li><li>refresh</li><li>fetch</li><li>column</li><li>commit</li><li>wait</li><li>ticket</li><li>question</li></ul>|<ul><li>hit</li><li>miss</li><li>eviction</li><li>get</li><li>set</li></ul>|<ul><li>dollar</li><li>cent</li></ul>|<ul><li>page</li><li>split</li></ul>|<ul><li>hertz</li><li>kilohertz</li><li>megahertz</li><li>gigahertz</li></ul>|<ul><li>entry</li></ul>|
{{% /table %}} -->

| type         | unit(s)                                                                                                                                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BIT          | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                       |
| TIME         | microsecond / millisecond / second / minute / hour / day / week / nanosecond                                                                                                                                                                       |
| PERCENTAGE   | fraction / percent / percent_nano / apdex                                                                                                                                                                                                          |
| NETWORK      | connection / request / packet / segment / response / message / payload / timeout / datagram / route / session                                                                                                                                      |
| SYSTEM       | process / core / thread / host / node / fault / service / instance / cpu                                                                                                                                                                           |
| DISK         | file / inode / sector / block                                                                                                                                                                                                                      |
| GENERAL      | buffer / error / read / write / occurrence / event / time / unit / operation / item / task / worker / resource / garbage collection / email / sample / stage / monitor / location / check / attempt / device / update / method / job / container   |
| DB           | table / index / lock / transaction / query / row / key / command / offset / record / object / cursor / assertion / scan / document / shard / flush / merge / refresh / fetch / column / commit / wait / ticket / question                          |
| CACHE        | hit / miss / eviction / get / set                                                                                                                                                                                                                  |
| MONEY        | dollar / cent                                                                                                                                                                                                                                      |
| MEMORY       | page / split                                                                                                                                                                                                                                       |
| FREQUENCY    | hertz / kilohertz / megahertz / gigahertz                                                                                                                                                                                                          |
| LOGGING      | entry                                                                                                                                                                                                                                              |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd
[2]: /developers/agent_checks
[3]: /api/#metrics
[4]: /developers/metrics/custom_metrics/
[5]: /developers/dogstatsd/
[6]: /developers/metrics/gauges
[7]: /developers/metrics/rates
[8]: /developers/metrics/count
[9]: https://github.com/DataDog/dd-agent/blob/master/aggregator.py
[10]: /api/
[11]: https://github.com/dropwizard/metrics
[12]: https://github.com/coursera/metrics-datadog
[13]: https://www.coursera.org
[14]: http://www.bazaarvoice.com
[15]: https://app.datadoghq.com/account/settings#agent
[16]: /developers/libraries
[17]: /graphing/miscellaneous/functions
[18]: /monitors/monitor_types/custom_check
[19]: http://www.vistarmedia.com/
[20]: https://app.datadoghq.com/metric/summary
