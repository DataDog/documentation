---
title: Metric Type Modifiers
kind: documentation
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

[Metric types][1] indicate what you are trying to represent with your metric and its emission source. The `COUNT` and `RATE` metric types are similar to each other because they represent the same concept: the variation of a metric value over time. However, they use different logic:

* `RATE`: Normalized value variation over time (_per second_).
* `COUNT`: Absolute value variation over a given time interval.

Depending on your use case and submission method, one metric type may be more suitable than the other. For instance:

| Use case                                                                                                                                                                          | Metric type |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| You want to monitor the number of requests received over time across several hosts.                                                                                               | `RATE`      |
| You do not have control over the consistency of temporal count submissions across your sources, so you normalize by each individual interval to be able to compare them upstream. | `RATE`      |
| You want to count the number of times a function is called.                                                                                                                       | `COUNT`     |
| You are counting the amount of revenue that have been made over a given amount of time.                                                                                           | `COUNT`     |

Since `RATE` and `COUNT` aren't the same metric type, they don't have the same behavior or shape within Datadog graphs and monitors. To change metrics in real time between `RATE` and `COUNT` representations, use Datadog's in-application modifier functions within your graphs and monitors.

## In-application modifiers

The two main in-application modifiers are `as_count()` and `as_rate()`.

| Modifiers    | Description                                                                                                                                                                                                                                                                   |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `as_count()` | Sets the operations necessary to display the given metric in `COUNT` form, giving you the absolute variation of a metric value over [a rollup interval][2]. **Note:** Because it depends on the rollup interval, [graphing a longer time interval changes your graph shape][3]. |
| `as_rate()`  | Sets the operations necessary to display the given metric in `RATE` form, giving you the absolute variation of a metric value per second.                                                                                                                                     |

Depending on the metric type you apply them to, the behavior differs:

{{< tabs >}}
{{% tab "COUNT" %}}

* Effect of `as_count()`:
  * Disables any [interpolation][1].
  * Sets the time aggregator to `SUM`.
* Effect of `as_rate()`:
  * Disables any [interpolation][1].
  * Sets the time aggregator to `SUM`.
  * Divides the result post-aggregation by the sampling interval to normalize it. For example, the following points submitted every second `[1,1,1,1].as_rate()` with a rollup interval of 20 seconds produces `[0.05, 0.05, 0.05, 0.05]`.

**Note**: There is no normalization on tiny intervals (when no time aggregation occurs), so the raw metric value counts are returned.

[1]: /metrics/guide/interpolation-the-fill-modifier-explained/
{{% /tab %}}
{{% tab "RATE" %}}

* Effect of `as_count()`:
  * Disable any [interpolation][1].
  * Sets the time aggregator to SUM.
  * Multiplies the result post-aggregation by the sampling interval. For example, the following points submitted every second `[0.05, 0.05, 0.05, 0.05].as_count()` with a rollup interval of 20 seconds produces `[1,1,1,1]`.
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

Tags such as `pod name` or `container_name` cause high tag churn, especially when creating queries for cost management, capacity planning, or autoscaling for containerized applications. To ensure mathematical accuracy of queries on gauges regardless of tag churn, you can use the `.weighted()` in-application modifier. The `.weighted()` modifier tells Datadog to weight metric values based on the lifespan of these frequently churning tags. 

The `.weighted()` modifier is automatically appended to queries on gauges only if both of the following conditions are met:

- The gauge metric is submitted regularly, such that there is no interpolation over gaps.
- The submission interval is correctly defined and set. 

Either the Datadog Agent or an integration sets the submission interval for a metric at time of intake. Modify submission intervals on the [Metrics Summary page][4].

## Modify a metric's type within Datadog

While not normally required, it is possible to change a metric's type in the [Metrics Summary page][4]:

{{< img src="metrics/custom_metrics/type_modifiers/metric_type.png" alt="Metric Type" style="width:70%;">}}

Example use case:

You have a metric `app.requests.served` that counts requests served, but accidentally submitted it from StatsD as a `GAUGE`. The metric's Datadog type is, therefore, `GAUGE`. You wanted to submit `app.requests.served` as a StatsD `COUNT` metric for time aggregation. This would help answer questions like _"How many total requests were served in the past day?"_ by querying `sum:app.requests.served{*}`, which would not make sense for a `GAUGE` metric type. You like the name `app.requests.served`, so rather than submitting a new metric name with a more appropriate `COUNT` type, you change the type of `app.requests.served` by updating your submission code, calling `dogstatsd.increment('app.requests.served', N)` after N requests are served, and updating the metric's type from the metric summary page to `RATE`.

This causes data submitted before the type change for `app.requests.served` to behave incorrectly. This is because it was stored in a format to be interpreted as an in-app `GAUGE` (not a `RATE`). Data submitted after you update your submission code and the metric type is interpreted properly.

If you are not willing to lose the historical data submitted as a `GAUGE`, create a new metric name with the new type, leaving the type of `app.requests.served` unchanged.

**Note**: For the AgentCheck, `self.increment` does not calculate the delta for a monotonically increasing counter; instead, it reports the value passed in at the check run. To send the delta value on a monotonically increasing counter, use `self.monotonic_count`.

[1]: /metrics/types/
[2]: /metrics/introduction/#time-aggregation
[3]: /dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[4]: https://app.datadoghq.com/metric/summary
