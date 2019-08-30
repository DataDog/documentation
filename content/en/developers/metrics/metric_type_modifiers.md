---
title: Metric Type Modifiers
kind: documentation
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
---

A metric type is an indication of what you tried to represent with your metric and it's emission source. If you refer to the [metric types][1] documentation you can see that the COUNT and RATE metric types are really close to one another as they represent the same concept: the variation of a metric value over time, but not with the same logic:

* RATE: Normalized value variation over time (usually _per seconds_)
* COUNT: Absolute value variation over a given time interval.

Depending of your use-case and your submission method, one metric type may be more suited than the other, for instance:

| Metric type submitted | Use-case                                                                                                                                                                        |
| ------------          | ----------                                                                                                                                                                      |
| RATE                  | You want to monitor across several hosts the amount of request received over time.                                                                                              |
| RATE                  | You have no control over the consistency of count temporal submission across your sources, hence you normalize by each individual interval to be able to compare them upstream. |
| COUNT                 | You want to count the amount of time a function is called.                                                                                                                      |
| COUNT                 | Counting the amount of revenues have be made over a given amount of time.                                                                                                       |

Since RATE and COUNT aren't the same metric type, they don't have the same behavior within Datadog graphs and monitors. In some corner cases RATE metric type might encounter some issues, for instance:

TO DO: Give example of temporal RATE aggregation when zooming out of a Graph

In order to mitigate this, Datadog offers you In-application modifiers functions that you can apply to your metrics within your graphs and monitor in order to switch on the fly a RATE to a COUNT and vice-versa.

## In-application modifiers

 set the operations necessary to display the given metric in count form (increments per interval) or rate form (increments per second)

The two main in-application modifiers are `as_count()` and `as_rate()`

| Modifiers | Description |
| `as_count()` | This functions set the operations necessary to display the given metric in COUNT form: giving you the absolute variation of a metric value over [a rollup interval][2]. Note that since it's depending of the rollup interval, [graphing a longer time interval changes your graph shape][3]. |
| `as_rate()` | This functions set the operations necessary to display the given metric in RATE form: giving you the absolute variation of a metric value per second. |

Depending of the metric type you applied them to, their behavior differ:

{{< tabs >}}
{{% tab "Count" %}}

* Effect of `as_count()`:
  * Disable any [interpolation][1].
  * Sets the time aggregator to SUM.
* Effect of `as_rate()`:
  * Disable any [interpolation][1].
  * Sets the time aggregator to SUM
  * Divide the result post-aggregation isby the sampling interval in order to normalize it: For example `[1,1,1,1].as_rate()` for rollup interval of 20s produces `[0.05, 0.05, 0.05, 0.05]`.

**Note**: that there is no normalization on very small intervals (when no time-aggregation occurs), thus the raw metric value counts are returned.

[1]: /graphing/faq/interpolation-the-fill-modifier-explained
{{% /tab %}}
{{% tab "Rate" %}}

* Effect of `as_count()`:
  * Disable any [interpolation][1].
  * Sets the time aggregator to SUM.
  * Multiply the result post-aggregation by the sampling interval: For example `[0.05, 0.05, 0.05, 0.05].as_count() for rollup interval of 20s produces `[1,1,1,1]`.
* Effect of `as_rate()`:
  * Disable any [interpolation][1].
  * Sets the time aggregator to SUM

[1]: /graphing/faq/interpolation-the-fill-modifier-explained
{{% /tab %}}
{{% tab "Gauge" %}}

GAUGE metric type representing the absolute and final value of a metric, `as_count()` and `as_rate()` modifiers have no effect on it.

{{% /tab %}}
{{< /tabs >}}

## Modify a metric's type within Datadog

While it is not normally required, it is possible to change a metric's type in the [metric summary page][4]:

{{< img src="developers/metrics/metric_type_modifiers/metric_type.png" alt="Metric Type" responsive="true" style="width:70%;">}}

For example:

1. You have a metric `app.requests.served` that counts requests served, but accidentally submitted it via StatsD as a `gauge`. The metric's Datadog type is therefore `gauge`.

2. You wanted to submit `app.requests.served` as a StatsD `count` metric for time aggregation. This would help answer questions like _"How many total requests were served in the past day?"_ by querying `sum:app.requests.served{*}` (this would not make sense for a `gauge`-type  metric.)

3. You like the name `app.requests.served` so rather than submitting a new metric name with the more appropriate `count` type, you could change the type of `app.requests.served` by updating:
  * Your submission code, calling `dogstatsd.increment('app.requests.served', N)` after N requests are served.
  * The Datadog in-app type via the metric summary page to `rate`.

This causes data submitted before the type change for `app.requests.served` to behave incorrectly because it was stored in a format to be interpreted as an in-app `gauge` (not a `rate`). Data submitted after step 3 is interpreted properly.

If you are not willing to lose the historical data submitted as a `gauge`, create a new metric name with the new type, leaving the type of `app.requests.served` unchanged.

**Note**: For the AgentCheck, `self.increment` does not calculate the delta for a monotonically increasing counter; instead, it reports the value passed in at the check run. To send the delta value on a monotonically increasing counter, use `self.monotonic_count`.

[1]: /developers/metrics/metrics_type
[2]: /graphing/metrics/introduction/#time-aggregation
[3]: /graphing/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
[4]: https://app.datadoghq.com/metric/summary
