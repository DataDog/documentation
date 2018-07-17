---
title: Distributions
kind: documentation
further_reading:
- link: "developers/metrics"
  tag: "Documentation"
  text: Learn more about Metrics
- link: "developers/libraries"
  tag: "Documentation"
  text: Official and Community-contributed API and DogStatsD client libraries
---

## Overview

Distributions measure the statistical distribution of a set of values across one or more hosts. In this way, Distributions are like a "global" version of [Histograms][2].

Because averages of percentile aggregations are not statistically valid, Distribution metrics work on the raw data across hosts. For each combination of tags, Datadog maintains a timeseries for `min`, `max`, `sum`, `average`, `count`, `p50`, `p75`, `p90`, `p95`, and `p99`.

Under this model, the total number of timeseries created is based on the set of `tag:values` for tags applied to a metric.

Because these aggregations are global in nature, by default, Datadog only applies custom metric-level tags to these metrics. This behavior can be modified if you need host-level tags as well.

## Submission

<!--
### Agent check

{{% table responsive="true" %}}
| Method | Overview |
| :----- | :----- |
| self.distribution(...) | Track the statistical distribution of a set of values over one or more hosts. |
{{% /table %}}
-->

### DogStatsD

{{% table responsive="true" %}}
| Method | Overview |
| :----- | :------- |
| dog.distribution(...) | Track the statistical distribution of a set of values over one or more hosts.<ul><li>Required: metric name and value.</li><li>Optional: tag(s)</li></ul> |
{{% /table %}}

#### Example

See the [DogStatsD-specific documentation][1] for code examples.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd/data_types#distributions
[2]: /developers/metrics/histograms
