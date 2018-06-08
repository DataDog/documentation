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

This section explains the nuts and bolts of metrics - what they are, and what they do. Whether you want to send [custom metrics][4], or just want to have a better understanding about how Datadog works, read on. If you're looking for information about the DogStatsD (which implements these metrics), please see the [DogStatsD documentation][5].

## Metric submission

There are multiple ways to send metrics to Datadog:

1. Via the Datadog Agent directly. Learn how [to write an Agent check](/agent/agent_checks), or examine the [Aggregator source code][9] directly.
2. Via the DogStatsD server (bundled with the Datadog Agent) and a [client library][16].
3. Directly via Datadog's [HTTP API][10].
4. Via Dropwizard's Java [metrics][11] library with the [metrics-datadog][12] backend. Thanks to the good folks at [Vistar Media][19], [Coursera][13], and [Bazaarvoice][14] for their contributions.

## Metric names

There are a few rules regarding metric names:

* Must start with a letter.
* Must only contain ASCII alphanumerics, underscores, and periods.
  * Other characters, including spaces, are converted to underscores.
  * Unicode is _not_ supported.
* Must not exceed 200 characters. Fewer than 100 is preferred from a UI perspective.

Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`). The hierarchy is neither enforced nor interpreted, but it can be used to infer things about servers (e.g. "hey, I see hostA and hostB are reporting `http.nginx.*`, those must be web frontends").

## Metric Types

The "Datadog in-app type" affects how a given metric is interpreted in query results and graph visualizations across the application. The metric type visible on the metric summary page is the Datadog in-app type. You should only change the type if you have started submitting this metric with a new type, and should be aware that changing the type may render historical data nonsensical.

In the Datadog web application there are four metric types (though one is deprecated):

* GAUGE
* RATE
* COUNT
* COUNTER (deprecated)

A metric's type is stored as metrics metadata and is used to determine how a metric is interpreted throughout the application by determining default time aggregation function and `as_rate()`/`as_count()` behavior. The `as_count()` and `as_rate()` modifiers behave differently for different Web Application metric types.

### Submission types and Datadog in-app types

Datadog accepts metrics submitted from a variety of sources, and as a result the "submission type" (think "use-case") does not always map exactly to the Datadog in-app type:

| Submission Source   | Submission Method (python)           | Submission Type   | Datadog In-App Type |
| ------------------- | ------------------------------------ | ----------------- | ------------------- |
| [API][3]            | `api.Metric.send(type="gauge", ...)` | gauge             | gauge               |
| [API][3]            | `api.Metric.send(type="count", ...)` | count             | count               |
| [API][3]            | `api.Metric.send(type="rate", ...)`  | rate              | rate                |
| [DogStatsD][1]      | `dog.gauge(...)`                     | gauge             | gauge               |
| [DogStatsD][1]      | `dog.increment(...)`                 | counter           | rate                |
| [DogStatsD][1]      | `dog.histogram(...)`                 | histogram         | gauge, rate         |
| [DogStatsD][1]      | `dog.set(...)`                       | set               | gauge               |
| [Agent check][2]    | `self.gauge(...)`                    | gauge             | gauge               |
| [Agent check][2]    | `self.increment(...)`                | counter           | rate                |
| [Agent check][2]    | `self.rate(...)`                     | rate              | gauge               |
| [Agent check][2]    | `self.count(...)`                    | count             | count               |
| [Agent check][2]    | `self.monotonic_count(...)`          | monotonic_count   | count               |
| [Agent check][2]    | `self.histogram(...)`                | histogram         | gauge, rate         |
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

{{% table responsive="true" %}}
|Bytes|Time|Percentage|Network|System|Disk|General|DB|Cache|Money|Memory|Frequency|Logging|
|:----|:----|:----|:----|:---|:---|:----|:---|:---|:---|:---|:---|:---|
|<ul><li>bit</li><li>byte</li><li>kibibyte</li><li>mebibyte</li><li>gibibyte</li><li>tebibyte</li><li>pebibyte</li><li>exbibyte</li></ul>|<ul><li>microsecond</li><li>millisecond</li><li>second</li><li>minute</li><li>hour</li><li>day</li><li>week</li><li>nanosecond</li></ul>|<ul><li>fraction</li><li>percent</li><li>percent_nano</li><li>apdex</li></ul>|<ul><li>connection</li><li>request</li><li>packet</li><li>segment</li><li>response</li><li>message</li><li>payload</li><li>timeout</li><li>datagram</li><li>route</li><li>session</li></ul>|<ul><li>process</li><li>core</li><li>thread</li><li>host</li><li>node</li><li>fault</li><li>service</li><li>instance</li><li>cpu</li></ul>|<ul><li>file</li><li>inode</li><li>sector</li><li>block</li></ul>|<ul><li>buffer</li><li>error</li><li>read</li><li>write</li><li>occurrence</li><li>event</li><li>time</li><li>unit</li><li>operation</li><li>item</li><li>task</li><li>worker</li><li>resource</li><li>garbage collection</li><li>email</li><li>sample</li><li>stage</li><li>monitor</li><li>location</li><li>check</li><li>attempt</li><li>device</li><li>update</li><li>method</li><li>job</li><li>container</li></ul>|<ul><li>table</li><li>index</li><li>lock</li><li>transaction</li><li>query</li><li>row</li><li>key</li><li>command</li><li>offset</li><li>record</li><li>object</li><li>cursor</li><li>assertion</li><li>scan</li><li>document</li><li>shard</li><li>flush</li><li>merge</li><li>refresh</li><li>fetch</li><li>column</li><li>commit</li><li>wait</li><li>ticket</li><li>question</li></ul>|<ul><li>hit</li><li>miss</li><li>eviction</li><li>get</li><li>set</li></ul>|<ul><li>dollar</li><li>cent</li></ul>|<ul><li>page</li><li>split</li></ul>|<ul><li>hertz</li><li>kilohertz</li><li>megahertz</li><li>gigahertz</li></ul>|<ul><li>entry</li></ul>|
{{% /table %}}

## Count

### Overview

Counters are used to count things.

### Submission

#### Agent check submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
| self.increment(...) |  Used to modify a count of events identified by the metric key string: <ul><li>Can be called multiple times during a check's execution.</li><li>Stored as a RATE type in the Datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (time-normalized by the aggregation interval which defaults to 1 for Agent checks - so the value is generally the raw count value).</li><li>Handled by the aggregator Counter class</li></ul>|
|self.decrement(...) |Used to modify a count of events identified by the metric key string:<ul><li>Can be called multiple times during a check's execution.</li><li>Stored as RATE type in the Datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (time-normalized by the aggregation interval which defaults to 1 for Agent checks - so the value is generally the raw count value).</li><li>Handled by the aggregator Counter class</li></ul>|
|self.monotonic_count(...)|Submit the sampled raw value of your counter. Don't normalize the values to a rate, or calculate the deltas before submitting. If the value of your counter ever decreases between submissions the resulting stored value for that submission is 0:<ul><li>Should only be called once during a check. Throws away any value that is less than a previously submitted value. IE the counter should be monotonically increasing.</li><li>Stored as a COUNT type in the Datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (not time-normalized).</li></ul>|
|self.count(...)|Submit the number of events that occurred during the check interval. If you're tracking a counter value that persists between checks, this means you must calculate the delta before submission:<ul><li>Should only be called once during a check.</li><li>Stored as a COUNT type in the Datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (not time-normalized).</li></ul>|
{{% /table %}}

#### DogStatsD submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
| dog.increment(...) | Used to increment a counter of events: <ul><li>Stored as a RATE type in the Datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value over that statsd flush period.</li></ul>|
|dog.decrement(...)| Used to decrement a counter of events: <ul><li>Stored as a RATE type in the Datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value over that statsd flush period.</li></ul>|
{{% /table %}}

### In-app modifiers

* Effect of `as_count()`:
    * Sets the time aggregator to SUM.
* Effect of `as_rate()`:
    * Sets the time aggregator to SUM
    * Normalizes the input timeseries values by the query (rollup) interval. For example [1,1,1,1].as_rate() for rollup interval of 20s produces [0.05, 0.05, 0.05, 0.05].
* The raw metric itself defaults to the time aggregator AVG, so querying the metric without either `as_rate()` or `as_count()` becomes nonsensical when time aggregation is applied.
* Note that on very small intervals when no time-aggregation occurs, there is no normalization, and you get the raw metric value counts.

### DogStatsD example

See the [DogStatsD-specific documentation][20].

## Gauges

### Overview

Gauges measure the value of a particular thing over time:

### Submission methods

#### Agent check submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|self.gauge(...)|<ul><li>If called multiple times during a check's execution for a metric only the last sample is used.</li><li>Stored as a Web Application GAUGE type</li></ul>|
{{% /table %}}

#### DogStatsD Submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|dog.gauge(...)|Stored as a GAUGE type in the Datadog web application. Each value in the stored timeseries is the last gauge value submitted for that metric during the statsd flush period.|
{{% /table %}}

### In-application modifiers

* Effect of `as_count()`: None
* Effect of `as_rate()`: None

### DogStatsD example

See the [DogStatsD-specific documentation][21].

## Histograms

### Overview

Histograms measure the statistical distribution of a set of values.

Our histogram and timing metrics are essentially the same thing and are extensions on the StatsD timing metric:

https://github.com/etsy/statsd/blob/master/docs/metric_types.md#timing

It aggregates the values that are sent during the flush interval (usually defaults to 10 seconds). So if you send 20 values for a metric during the flush interval, it'll give you the aggregation of those values for the flush interval, i.e.:

* `my_metric.avg`: gives you the avg of those 20 values during the flush interval
* `my_metric.count`: gives you the count of the values (20 in this case) sent during the flush interval
* `my_metric.median`: gives you the median of those values in the flush interval
* `my_metric.95percentile`: gives you the 95th percentile value in the flush interval
* `my_metric.max`: gives you the max value sent during the flush interval
* `my_metric.min`: gives you the min value sent during the flush interval

Each one of these becomes a value in their respective metric time series that are sent to Datadog. Then you can aggregate these time series the same way you aggregate any other metric time series.

### Submission methods

#### Agent sheck submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|self.histogram(...)|used to track the statistical distribution of a set of values.|
{{% /table %}}

#### DogStatsD Submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|dog.histogram(...)|Used to track the statistical distribution of a set of values over a statsd flush period.|
{{% /table %}}

### DogStatsD Example

See the [DogStatsD-specific documentation][22].

## Rates

### Overview

Rates represent the derivative of a metric, it's the value variation of a metric on a defined time interval.

### Submission methods

#### Agent check submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|self.rate(...)|Submit the sampled raw value of your counter. Don't normalize the values to a rate, or calculate the deltas before submitting - the Agent does both for you:<ul><li>Should only be called once during a check.</li><li>Throws away any value that is less than a previously submitted value. IE the counter should be monotonically increasing.</li><li>Stored as a GAUGE type in the Datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value between samples.</li></ul>|
{{% /table %}}

## Sets

### Overview

Sets are used to count the number of unique elements in a group.

### Submission methods

#### Agent check submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|self.set(...)|Used count the number of unique elements in a group:<ul><li>Should be called multiple times during an Agent check.</li><li>Stored as a GAUGE type in the Datadog web application.</li></ul>|
{{% /table %}}

#### DogStatsD Submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|dog.set(...)|Used count the number of unique elements in a group:<ul><li>Stored as GAUGE type in the Datadog web application. Each value in the stored timeseries is the count of unique values submitted to statsd for a metric over that flush period.</li></ul>|
{{% /table %}}

### In-app modifiers

* Effect of `as_count()`:
    * Sets the time aggregator to SUM.
    * Uses the metadata interval to convert from raw rates to counts. Does not work if no metadata interval exists for the metric.
* Effect of `as_rate()`:
    * Sets the time aggregator to SUM.
    * Uses the query interval and metadata interval to calculate the time-aggregated rate. Does not work if no metadata interval exists for the metric.
* Known Issue: Agent check submitted RATE metrics have no interval metadata, so as_rate() and as_count() don't work.

### DogStatsD Example

See the [DogStatsD-specific documentation][23].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd
[2]: /agent/agent_checks
[3]: /api/#metrics
[4]: /getting_started/custom_metrics/
[5]: /developers/dogstatsd/
[6]: /developers/metrics/#gauges
[7]: /developers/metrics/#rates
[8]: /developers/metrics/#count
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
[20]: /developers/dogstatsd/data_types#counters
[21]: /developers/dogstatsd/data_types#gauges
[22]: /developers/dogstatsd/data_types#histograms
[23]: /developers/dogstatsd/data_types#sets
