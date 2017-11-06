---
title: What is the histogram metric type?
kind: faq
customnav: developersnav
---

Our histogram and timing metrics are essentially the same thing and are extensions on the StatsD timing metric:

https://github.com/etsy/statsd/blob/master/docs/metric_types.md#timing

It aggregates the values that are sent during the flush interval (usually defaults to 10 seconds). So if you send 20 values for a metric during the flush interval, it'll give you the aggregation of those values for the flush interval, i.e.:

* my_metric.avg will give you the avg of those 20 values during the flush interval
* my_metric.count will give you the count of the values (20 in this case) sent during the flush interval
* my_metric.median will give you the median of those values in the flush interval
* my_metric.95percentile will give you the 95th percentile value in the flush interval
* my_metric.max will give you the max value sent during the flush interval
* my_metric.min will give you the min value sent during the flush interval

Each one of these will become a value in their respective metric time series that are sent to Datadog. Then you can aggregate these time series the same way you aggregate any other metric time series.