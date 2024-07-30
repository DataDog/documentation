---
title: Metric Type Modifiers
aliases:
 - /developers/metrics/metric_type_modifiers
 - /graphing/faq/as_count_validation
 - /developers/metrics/type_modifiers/
 - /metrics/type_modifiers
further_reading:
- link: "/developers/dogstatsd/"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "/developers/community/libraries/"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
---

A [metric type][1] is an indication of what you are trying to represent with your metric and its emission source. The `COUNT` and `RATE` metric types are quite similar to each other, as they represent the same concept: the variation of a metric value over time. However, they use different logic:

* `RATE`: Normalized value variation over time (_per second_).
* `COUNT`: Absolute value variation over a given time interval.

Depending on your use case and submission method, one metric type may be more suited than the other for submission. For instance:

| Metric type submitted | Use case                                                                                                                                                                               |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `RATE`                | You want to monitor the number of requests received over time across several hosts.                                                                                                    |
| `RATE`                | You do not have control over the consistency of temporal count submissions across your sources, so you're normalizing by each individual interval to be able to compare them upstream. |
| `COUNT`               | You want to count the number of times a function is called.                                                                                                                            |
| `COUNT`               | Counting the amount of revenue that have been made over a given amount of time.                                                                                                        |

Since `RATE` and `COUNT` aren't the same metric type, they don't have the same behavior or shape within Datadog graphs and monitors. To change metrics on the fly between `RATE` and `COUNT` representations, use Datadog's in-application modifier functions within your graphs and monitors.

## In-application modifiers

The two main in-application modifiers are `as_count()` and `as_rate()`.

| Modifiers    | Description                                                                                                                                                                                                                                                                   |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `as_count()` | Sets the operations necessary to display the given metric in `COUNT` form, giving you the absolute variation of a metric value over [a rollup interval][2]. **Note:** Because it depends on the rollup interval, [graphing a longer time interval changes your graph shape][3]. |
| `as_rate()`  | Sets the operations necessary to display the given metric in `RATE` form, giving you the absolute variation of a metric value per second.                                                                                                                                     |

Depending on the metric type you applied them to, the behavior differs:

{{< tabs >}}
{{% tab "COUNT" %}}

* Effect of `as_count()`:
  * Disables any [interpolation][1].
  * Sets the time aggregator to `SUM`.
* Effect of `as_rate()`:
  * Disables any [interpolation][1].
  * Sets the time aggregator to `SUM`.
  * Divides the result post-aggregation by the sampling interval in order to normalize it. For example, the following points submitted every second `[1,1,1,1].as_rate()` with a rollup interval of 20s would produce `[0.05, 0.05, 0.05, 0.05]`.

**Note**: There is no normalization on tiny intervals (when no time aggregation occurs), thus the raw metric value counts are returned.

[1]: /metrics/guide/interpolation-the-fill-modifier-explained/
{{% /tab %}}
{{% tab "RATE" %}}

* Effect of `as_count()`:
  * Disable any [interpolation][1].
  * Sets the time aggregator to SUM.
  * Multiply the result post-aggregation by the sampling interval. For example, the following points submitted every second `[0.05, 0.05, 0.05, 0.05].as_count()` with a rollup interval of 20s would produce `[1,1,1,1]`.
* Effect of `as_rate()`:
  * Disables any [interpolation][1].
  * Sets the time aggregator to `SUM`.

[1]: /metrics/guide/interpolation-the-fill-modifier-explained/
{{% /tab %}}
{{% tab "GAUGE" %}}

`GAUGE` metric types represent the absolute and final value of a metric; `as_count()` and `as_rate()` modifiers have no effect on them.

{{% /tab %}}
{{< /tabs >}}

### The `weighted()` modifier

Tags such as `pod name` or `container_name` cause high tag churn, especially when creating queries for cost management, capacity planning, or autoscaling for containerized applications. To ensure mathematical accuracy of queries on gauges regardless of tag churn, you can use a `.weighted()` in-application modifier. The `.weighted()` modifier enables Datadog to properly weight metric values based on the lifespan of these frequently churning tags. 

The `.weighted()` modifier is automatically appended to queries on gauges only if both of the following conditions are met:

- The gauge metric is submitted regularly, such that there is no interpolation over gaps.
- The submission interval is correctly defined and set. 

Either the Datadog Agent or an integration sets the submission interval for a metric at time of intake. Modify submission intervals on the [Metrics Summary page][4].

## Modify a metric's type within Datadog

While it is not normally required, it is possible to change a metric's type in the [Metrics Summary page][4]:

{{< img src="metrics/custom_metrics/type_modifiers/metric_type.png" alt="Metric Type" style="width:70%;">}}

Example use case:

1. You have a metric `app.requests.served` that counts requests served, but accidentally submitted it from StatsD as a `GAUGE`. The metric's Datadog type is, therefore, `GAUGE`.

2. You wanted to submit `app.requests.served` as a StatsD `COUNT` metric for time aggregation. This would help answer questions like _"How many total requests were served in the past day?"_ by querying `sum:app.requests.served{*}` (this would not make sense for a `GAUGE` metric type.)

3. You like the name `app.requests.served`, so rather than submitting a new metric name with a more appropriate `COUNT` type, you could change the type of `app.requests.served` by updating:
  * Your submission code, calling `dogstatsd.increment('app.requests.served', N)` after N requests are served, and
  * The Datadog in-app type from the metric summary page to `RATE`.

This causes data submitted before the type change for `app.requests.served` to behave incorrectly. This is because it was stored in a format to be interpreted as an in-app `GAUGE` (not a `RATE`). Data submitted after step 3 is interpreted properly.

If you are not willing to lose the historical data submitted as a `GAUGE`, create a new metric name with the new type, leaving the type of `app.requests.served` unchanged.

**Note**: For the AgentCheck, `self.increment` does not calculate the delta for a monotonically increasing counter; instead, it reports the value passed in at the check run. To send the delta value on a monotonically increasing counter, use `self.monotonic_count`.

[1]: /metrics/types/
[2]: /metrics/introduction/#time-aggregation
[3]: /dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[4]: https://app.datadoghq.com/metric/summary
