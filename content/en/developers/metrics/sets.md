---
title: Sets
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

Sets are used to count the number of unique elements in a group.

## Submission

### Agent check

{{% table responsive="true" %}}

|Method | Overview |
|:---|:---|
|self.set(...)|Used count the number of unique elements in a group:<ul><li>Should be called multiple times during an Agent check.</li><li>Stored as a GAUGE type in the Datadog web application.</li></ul>|
{{% /table %}}

### DogStatsD

{{% table responsive="true" %}}

|Method | Overview |
|:---|:---|
|dog.set(...)|Used count the number of unique elements in a group:<ul><li>Stored as GAUGE type in the Datadog web application. Each value in the stored timeseries is the count of unique values submitted to StatsD for a metric over that flush period.</li></ul>|
{{% /table %}}

#### DogStatsD Example

See the [DogStatsD-specific documentation][1] for code examples.

## In-app modifiers

* Effect of `as_count()`:
    * Sets the time aggregator to SUM.
    * Uses the metadata interval to convert from raw rates to counts. Does not work if no metadata interval exists for the metric.
* Effect of `as_rate()`:
    * Sets the time aggregator to SUM.
    * Uses the query interval and metadata interval to calculate the time-aggregated rate. Does not work if no metadata interval exists for the metric.
* Known Issue: Agent check submitted RATE metrics have no interval metadata, so as_rate() and as_count() don't work.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd/data_types#sets
