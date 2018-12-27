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

Our histogram and timing metrics are essentially the same thing and are extensions on the StatsD timing metric:

https://github.com/etsy/statsd/blob/master/docs/metric_types.md#timing

It aggregates the values that are sent during the flush interval (usually defaults to 10 seconds). So if you send 20 values for a metric during the flush interval, it'll give you the aggregation of those values for the flush interval, i.e.:

* `my_metric.avg`: gives you the avg of those 20 values during the flush interval
* `my_metric.count`: gives you the count of the values (20 in this case) sent during the flush interval
* `my_metric.median`: gives you the median of those values in the flush interval
* `my_metric.95percentile`: gives you the 95th percentile value in the flush interval
* `my_metric.max`: gives you the max value sent during the flush interval
* `my_metric.min`: gives you the min value sent during the flush interval

Each one of these becomes a value in their respective metric timeseries that are sent to Datadog. Then you can aggregate these timeseries the same way you aggregate any other metric timeseries.

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

See the [DogStatsD-specific documentation][1] for code examples.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd/data_types#histograms
