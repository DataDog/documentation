---
title: Histograms
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

Histograms measure the statistical distribution of a set of values.

Datadog histogram and timing metrics are essentially the same thing and are extensions on the [StatsD timing metric][1]: they aggregate the values that are sent during the flush interval (usually defaults to 10 seconds). 

If you send 20 values for a metric `<METRIC_NAME>` during the flush interval, A Datadog Histogram gives you the aggregation of those values for the flush interval, i.e.:

* `<METRIC_NAME>.avg`: gives you the avg of those 20 values during the flush interval
* `<METRIC_NAME>.count`: gives you the count of the values (20 in this case) sent during the flush interval.
* `<METRIC_NAME>.median`: gives you the median of those values in the flush interval.
* `<METRIC_NAME>.95percentile`: gives you the 95th percentile value in the flush interval.
* `<METRIC_NAME>.max`: gives you the max value sent during the flush interval.
* `<METRIC_NAME>.min`: gives you the min value sent during the flush interval.
* `<METRIC_NAME>.sum`: gives you the sum of values sent during the flush interval.

Configure which aggregation you want to send to Datadog with the `histogram_aggregates` parameter in your [datadog.yaml configuration file][2]. 
By default only `max`, `median`, `avg` and `count` aggregations are sent out to Datadog.

## Submission

### Agent check


| Method              | Overview                                                       |
| :---                | :---                                                           |
| self.histogram(...) | used to track the statistical distribution of a set of values. |

### DogStatsD

| Method             | Overview                                                                                  |
| :---               | :---                                                                                      |
| dog.histogram(...) | Used to track the statistical distribution of a set of values over a statsd flush period. |


#### Example

See the [DogStatsD-specific documentation][3] for code examples.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/etsy/statsd/blob/master/docs/metric_types.md#timing
[2]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /developers/dogstatsd/data_types#histograms
