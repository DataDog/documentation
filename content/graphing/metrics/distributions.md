---
title: Distribution metrics
kind: documentation
description: Compute global percentiles across your entire dataset.
---

## Overview

Distributions are a [metric type][1] that can be thought of as a global version of the [Histogram metric][2], which measures the statistical distribution of discrete values on a single host. Distributions observe the values that are sent from multiple hosts to measure statistical distributions across your entire infrastructure, allowing you to compute global percentiles across your entire dataset.

Global distributions are designed to instrument logical objects, like services, independently from the underlying hosts and provide insight into metric behavior across your infrastructure .

Because averages of percentile aggregations are not statistically valid, Distribution metrics work on the raw data across hosts. For each combination of tags, Datadog maintain a timeseries for `min`, `max`, `sum`, `average`, `count`, `p50`, `p75`, `p90`, `p95`, and `p99`.

Under this model, the total number of timeseries created is based on the set of `tag:values` for tags applied to a metric.

Because these aggregations are global in nature, Datadog only apply custom, metric-level tags to these metrics by default. This behavior can be modified if you need host-level tags as well.

## Aggregations 

The new tagging workflow for Distributions allows you to define which aggregations are available in queries. 
Initially, Datadog maintain a single timeseries, for `*` (all points), and otherwise ignore all tags. 
Manually aggregate your metric based on sets of tags, chosen from the list of tags normally available. For convenience, Datadog also creates aggregations for every combination of the first four custom tags applied to each metric.

With the [distribution UI][3], create additional aggregate timeseries by applying sets of tags to a metric, for which a timeseries is created for every combination of tag values within the set. 

**Sets of tags are limited to groups of four.**

{{< img src="graphing/metrics/distributions/distribution_metric.png" alt="Distribution metric" responsive="true" popup="true">}}

## Case study

`my.service.latency` is a metric that is being submitted on 500 hosts.  

Each host is tagged with one of 3 `Availability Zones` (as tagged by the AWS integration) and 20 `Roles` by Chef, our provisioning system.  

Additionally, this metric has been tagged with `Status`, which has 2 values: `Status:Success` or `Status:Fail`, and `Result`, which also has 2 values: `Result:Open` or `Result:Close`.

##### Scenario 1

By default, Datadog creates aggregations for `my.service.latency` for [each combination of custom metric][4] tags `Status` and `Result`.  

You could then query, for example `{my.service.latency for Status:success, Result:closed}`, but not `{my.service.latency for Availability-Zone: US-East-1a}`

This creates (2+1) * (2+1) * 10 = 90 timeseries.

##### Scenario 2

You aggregate on `{Status, Result, Host}` instead of the defaults.
Available queries include, eg,:

* `{my.service.latency for Status:success, Result:closed, Host: i-deadbeef}`
* `{my.service.latency for Status:fail, host: i-deadbeef}`

The following is unavailable: 

* `{my.service.latency for Availability-Zone: US-East-1a}`

This creates (2+1) * (2+1) * (500+1) * 10 = 45,090 timeseries. 

##### Scenario 3

You aggregate by `{Availability-Zone, Status}`, in addition to `{Status, Result, Host}`.

Available queries include:

* `{my.service.latency for AZ: US-East-1a}`
* `{my.service.latency for AZ: US-West-2b, Status: Success}`
*  any in the previous scenario.

The aggregate timeseries for `Availability-Zone` and `Host` has not been requested, so `{my.service.latency for AZ:US-East-1a, Host:i-deadbeef}` is unavailable.

This creates (3 + 1) * (2 + 1) * 10 = 120, in addition to the 45,090, above, for a total of 45,210 timeseries.  

As you can see, aggregating by multiple sets of tags increases the number of timeseries additively, limiting timeseries growth.

The following gif demonstrates inspecting the aggregations created for a metric, `intake.batch_api_keys_for_org`. You would query `{availability-zone, role}` or `{instance-type, role}`, but not `{availability-zone, instance-type}`.

{{< img src="graphing/metrics/distributions/Distros_Tagging.gif" alt="Distros_Tagging" responsive="true" popup="true">}}

## Submission method
### DogStatsD

```
dog.distribution(String metric.name, double value, String... tags)  
```

### Python

To measure the duration of an HTTP request, you could measure each request time with the metric `dist.dd.dogweb.latency`.

```python
# Track the run time of a request.
start_time = time.time()
results = requests.get('https://google.com')
duration = time.time() - start_time
statsd.distribution('dist.dd.dogweb.latency', duration)
```

The above instrumentation calculates the following data: `sum`, `count`, `average`, `minimum`, `maximum`, `50th percentile` (median), `75th percentile`, `90th percentile`, `95th percentile` and `99th percentile`. These metrics give insight into how different each request time is. 
We can see how long the request usually takes by graphing the median. We can see how long most requests take by graphing the 95th percentile.

{{< img src="graphing/metrics/distributions/dogweb_latency.png" alt="Dogweb latency" responsive="true" popup="true">}}

For this toy example, let’s say a request time of *500ms* is acceptable. Our median query time (graphed in blue) is usually less than *100 milliseconds*, which is great. 
Our 95th percentile (graphed in red) has spikes sometimes over one second, which is unacceptable. 
This means most of our queries are running just fine, but our worst ones are bad. If the 95th percentile were close to the median, than we would know that almost all of our requests are performing just fine.

When creating your own graph, distribution metrics automatically have additional space aggregations available in the UI:


{{< img src="graphing/metrics/distributions/dogweb_latency_bis.png" alt="Distribution metric bis" responsive="true" popup="true">}}

Distributions are not only for measuring times. They can be used to measure the distribution of any type of value, like the size of uploaded files or classroom test scores.

[1]: /developers/metrics
[2]: /developers/metrics/histograms
[3]: https://app.datadoghq.com/metric/distribution_metrics
[4]: /getting_started/custom_metrics