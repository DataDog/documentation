---
title: Counts
kind: documentation
further_reading:
- link: "developers/metrics"
  tag: "Documentation"
  text: "Learn more about Metrics"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
---

## Overview

Counters are used to count things.

## Submission

### Agent check

{{% table responsive="true" %}}

| Method | Overview |
| :----- | :------- |
| self.increment()<br/><sup>deprecated</sup> | Used to modify a count of events identified by the metric key string: <ul><li>Can be called multiple times during a check's execution.</li><li>Stored as a RATE type in the Datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (time-normalized by the aggregation interval which defaults to 1 for Agent checks - so the value is generally the raw count value).</li><li>Handled by the aggregator Counter class</li></ul> |
| self.decrement()<br /><sup>deprecated</sup> | Used to modify a count of events identified by the metric key string:<ul><li>Can be called multiple times during a check's execution.</li><li>Stored as RATE type in the Datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (time-normalized by the aggregation interval which defaults to 1 for Agent checks - so the value is generally the raw count value).</li><li>Handled by the aggregator Counter class</li></ul> |
| self.monotonic_count(...) | Track a raw counter that is ever increasing. Don't normalize the values to a rate, or calculate the deltas before submitting, as the method does it for you. Samples that have a lower value than the previous sample are ignored (it usually means that the underlying raw counter has been reset):<ul><li>Can be called multiple times during a check's execution. <br> Example: Submitting samples 2, 3, 6, 7 sends 5 (i.e. 7-2) during the first check execution; then, submitting samples 10, 11 on the same monotonic_count sends 4 (i.e. 11-7) during the second check execution.</li><li>Stored as a COUNT type in Datadog. Each value in the stored timeseries is a delta of the counter's value between samples (not time-normalized).</li></ul> |
| self.count(...) | Submit the number of events that occurred during the check interval:<ul><li>Can be called multiple times during a check's execution, each sample being added to the value that is sent.</li><li>Stored as a COUNT type in Datadog.</li></ul> |

{{% /table %}}

### DogStatsD

{{% table responsive="true" %}}

| Method | Overview |
| :----- | :------- |
| dog.increment(...) | Used to increment a counter of events: <ul><li>Stored as a RATE type in the Datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period.</li></ul> |
| dog.decrement(...) | Used to decrement a counter of events: <ul><li>Stored as a RATE type in the Datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period.</li></ul> |
{{% /table %}}

#### Example

See the [DogStatsD-specific documentation][1] for code examples.

## In-app modifiers

* Effect of `as_count()`:
    * Sets the time aggregator to SUM.
* Effect of `as_rate()`:
    * Sets the time aggregator to SUM
    * Normalizes the input timeseries values by the query (rollup) interval. For example [1,1,1,1].as_rate() for rollup interval of 20s produces [0.05, 0.05, 0.05, 0.05].
* The raw metric itself defaults to the time aggregator AVG, so querying the metric without either `as_rate()` or `as_count()` becomes nonsensical when time aggregation is applied.
* Note that on very small intervals when no time-aggregation occurs, there is no normalization, and you get the raw metric value counts.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd/data_types#counters
