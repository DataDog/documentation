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

## In-application modifiers

{{< tabs >}}
{{% tab "Count" %}}

* Effect of `as_count()`:
    * Sets the time aggregator to SUM.
* Effect of `as_rate()`:
    * Sets the time aggregator to SUM
    * Normalizes the input timeseries values by the query (rollup) interval. For example [1,1,1,1].as_rate() for rollup interval of 20s produces [0.05, 0.05, 0.05, 0.05].
* The raw metric itself defaults to the time aggregator AVG, so it must be queried with either `as_rate()` or `as_count()` when time aggregation is applied.
* Note that there is no normalization on very small intervals (when no time-aggregation occurs), thus the raw metric value counts are returned.

{{% /tab %}}
{{% tab "Gauge" %}}

* Effect of `as_count()`: None
* Effect of `as_rate()`: None

{{% /tab %}}

{{% tab "Set" %}}

* Effect of `as_count()`:
    * Sets the time aggregator to SUM.
    * Uses the metadata interval to convert from raw rates to counts. Does not work if no metadata interval exists for the metric.
* Effect of `as_rate()`:
    * Sets the time aggregator to SUM.
    * Uses the query interval and metadata interval to calculate the time-aggregated rate. Requires that the metadata interval exists for the metric.
* Known Issue: Agent check submitted RATE metrics have no interval metadata, so `as_rate()` and `as_count()` don't work.

{{% /tab %}}

{{% tab "Rate" %}}

TO DO

{{% /tab %}}

{{< /tabs >}}


## Modify a metric's type within Datadog

While it is not normally required, it is possible to change a metric's _type_. For example:

1. You have a metric `app.requests.served` that counts requests served, but accidentally submitted it via StatsD as a `gauge`. The metric's Datadog type is therefore `gauge`.

2. You wanted to submit `app.requests.served` as a StatsD `count` metric for time aggregation. This would help answer questions like _"How many total requests were served in the past day?"_ by querying `sum:app.requests.served{*}` (this would not make sense for a `gauge`-type  metric.)

3. You like the name `app.requests.served` so rather than submitting a new metric name with the more appropriate `count` type, you could change the type of `app.requests.served` by updating:
  * Your submission code, calling `dogstatsd.increment('app.requests.served', N)` after N requests are served.
  * The Datadog in-app type via the metric summary page to `rate`.

This causes data submitted before the type change for `app.requests.served` to behave incorrectly because it was stored in a format to be interpreted as an in-app `gauge` (not a `rate`). Data submitted after step 3 is interpreted properly.

If you are not willing to lose the historical data submitted as a `gauge`, create a new metric name with the new type, leaving the type of `app.requests.served` unchanged.

**Note**: For the AgentCheck, `self.increment` does not calculate the delta for a monotonically increasing counter; instead, it reports the value passed in at the check run. To send the delta value on a monotonically increasing counter, use `self.monotonic_count`.
