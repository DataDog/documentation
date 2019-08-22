---
title: Metric submission with the Agent
kind: documentation
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
---

{{< tabs >}}
{{% tab "Count" %}}

* **`self.increment()`**<sup>deprecated</sup>:
    * Used to modify a count of events identified by the metric key string:
    * Can be called multiple times during a check's execution.
    * Stored as a RATE type in the Datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (time-normalized by the aggregation interval which defaults to 1 for Agent checks—so the value is generally the raw count value).
    * Handled by the aggregator Counter class.

* **`self.decrement()`**<sup>deprecated</sup>:
    * Used to modify a count of events identified by the metric key string:
    * Can be called multiple times during a check's execution.
    * Stored as RATE type in the Datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (time-normalized by the aggregation interval which defaults to 1 for Agent checks—so the value is generally the raw count value).
    * Handled by the aggregator Counter class

* **`self.monotonic_count(...)`**:
    * Track a raw counter that **always increases**. Don't normalize the values to a rate, or calculate the deltas before submitting, as the method does it for you. Samples that have a lower value than the previous sample are ignored (it usually means that the underlying raw counter has been reset):
    * Can be called multiple times during a check's execution.
        Example: Submitting samples 2, 3, 6, 7 sends 5 (i.e. 7-2) during the first check execution; then, submitting samples 10, 11 on the same monotonic_count sends 4 (i.e. 11-7) during the second check execution.
    * Stored as a COUNT type in Datadog. Each value in the stored timeseries is a delta of the counter's value between samples (not time-normalized).

* **`self.count(...)`**: Submit the number of events that occurred during the check interval:
    * Can be called multiple times during a check's execution, each sample being added to the value that is sent.
    * Stored as a COUNT type in Datadog.

{{% /tab %}}
{{% tab "Gauge" %}}

* **`self.gauge(...)`**: If called multiple times during a check's execution for a metric only the last sample is used.
    Stored as a Web Application GAUGE type.

{{% /tab %}}
{{% tab "Rate" %}}

* **`self.rate(...)`**: Submit the sampled raw value of your counter. Don't normalize the values to a rate, or calculate the deltas before submitting, as the Agent does both for you:
  * Should only be called once during a check.
  * Throws away any value that is less than a previously submitted value, i.e. the counter must be monotonically increasing.
  * Stored as a GAUGE type in the Datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value between samples.

{{% /tab %}}

{{% tab "Histogram" %}}

* **`self.histogram(...)`**: used to track the statistical distribution of a set of values.

{{% /tab %}}
{{% tab "Set" %}}

* **`self.set(...)`**: Used count the number of unique elements in a group:
  * Should be called multiple times during an Agent check.
  * Stored as a GAUGE type in the Datadog web application.

{{% /tab %}}
{{< /tabs >}}
