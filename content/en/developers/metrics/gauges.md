---
title: Gauges
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

Gauges measure the value of a particular thing over time:

## Submission

### Agent check

{{% table responsive="true" %}}

|Method | Overview |
|:---|:---|
|self.gauge(...)|<ul><li>If called multiple times during a check's execution for a metric only the last sample is used.</li><li>Stored as a Web Application GAUGE type</li></ul>|
{{% /table %}}

### DogStatsD

{{% table responsive="true" %}}

|Method | Overview |
|:---|:---|
|dog.gauge(...)|Stored as a GAUGE type in the Datadog web application. Each value in the stored timeseries is the last gauge value submitted for that metric during the StatsD flush period.|
{{% /table %}}

#### Example

See the [DogStatsD-specific documentation][1] for code examples.

## In-application modifiers

* Effect of `as_count()`: None
* Effect of `as_rate()`: None

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd/data_types#gauges
