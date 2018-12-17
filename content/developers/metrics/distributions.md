---
title: Distributions
kind: documentation
further_reading:
- link: "graphing/metrics/distributions"
  tag: "Documentation"
  text: "Learn more about the dedicated UI for distribution metrics"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
---

<div class="alert alert-warning">
This feature is in beta. <a href="/help">Contact Datadog support</a> to enable distribution metrics for your account.
</div>

## Overview

Distributions measure the statistical distribution of a set of values across one or more hosts. In this way, Distributions are like a "global" version of [Histograms][1].

Because averages of percentile aggregations are not statistically valid, Distribution metrics work on the raw data across hosts. For each combination of tags, Datadog maintains a timeseries for `min`, `max`, `sum`, `average`, `count`, `p50`, `p75`, `p90`, `p95`, and `p99`.

For example, a given host `Foo` reports a metric with the values `[1,1,1,2,2,2,3,3]`, and another host `Bar` reports the same metric with the values `[1,1,2]` during a flush interval. Here, the `p50` (median) for `Foo` is 2 and the `p50` for `Bar` is 1. Aggregating by the average value in this case would result in 1.5. In reality, the global `p50` (median) is the median of the *combined* set `[1,1,1,1,1,2,2,2,2,3,3]`: *2*. This is what Distribution would report.

Under this model, the total number of timeseries created is based on the set of `tag:values` for tags applied to a metric. Since these aggregations are global in nature, by default, Datadog only applies custom metric-level tags to these metrics. This behavior can be modified if you need host-level tags as well.

## Submission

### DogStatsD

{{% table responsive="true" %}}
| Method | Overview |
| :----- | :------- |
| dog.distribution(...) | Track the statistical distribution of a set of values over one or more hosts.<ul><li>Required: metric name and value.</li><li>Optional: tag(s)</li></ul> |
{{% /table %}}

#### Example

See the [DogStatsD-specific documentation][2] for code examples.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics/histograms
[2]: /developers/dogstatsd/data_types#distributions
