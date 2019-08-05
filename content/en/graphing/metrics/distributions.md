---
title: Distribution metrics
kind: documentation
description: Compute global percentiles across your entire dataset.
aliases:
  - /developers/faq/characteristics-of-datadog-histograms/
further_reading:
  - link: "developers/dogstatsd/data_types#distributions"
    tag: "Documentation"
    text: "Using Distributions in DogStatsD"
---
<div class="alert alert-warning">	
This feature is in beta. <a href="https://docs.datadoghq.com/help/">Contact Datadog support</a> to enable distribution metrics for your account.	
</div>

## Overview

Distributions are a metric type in that aggregate the values that are sent from multiple hosts during a flush interval to measure statistical distributions across your entire infrastructure server-side.

Global distributions are designed to instrument logical objects, like services, independently from the underlying hosts. Unlike histograms [1] which aggregate on the Agent-side, global distributions send all raw data collected during the flush interval and the aggregation occurs server-side. Because the underlying data structure has not been aggregated and represents raw data, distributions provide two major features:

* **Calculation of percentile aggregations**: Percentile aggregations (p50, p75, p90, p95, p99) are calculated from the raw data across all hosts, and are therefore globally accurate.

* **Customization of tagging**: This functionality allows you to control the tagging scheme for metrics for which host-level granularity is not necessary (e.g. transactions per second for a checkout service).

See the [Developer Tools section][2] for more implementation details. Please note that since distributions are a new metric type, they should be instrumented under new metric names during submission to Datadog.

## Aggregations

Like other metric types, such as `gauges` or `histograms`, distributions have the following aggregations available: `count`, `min`, `max`, `sum`, and `avg`. Distributions are initially tagged the same way as other metrics (with custom tags set in code) and are resolved to any host tag based on the host that reported the metric. You can also calculate percentile aggregations for a set of tags (up to 10) you specify in the [distribution UI][3]. This will provide aggregations for `p50`, `p75`, `p90`, `p95`, and `p99`.

{{< img src="graphing/metrics/distributions/global_metrics_selection.png" alt="Distribution Metric UI" responsive="true" style="width:80%;">}}

After electing to apply percentile aggregations on a distribution metric, these aggregations are automatically available in the graphing UI:

{{< img src="graphing/metrics/distributions/dogweb_latency_bis.png" alt="Distribution metric bis" responsive="true" style="width:80%;">}}

## Customize Tagging

Distributions provide new functionality that allows you to control the tagging for metrics for which host-level granularity does not make sense. 

To customize tagging, hover over your metric in the table, and click on the pencil icon to edit. In the modal that pops up, select *Custom...*. There is a _whitelist_ of the tags you have defined in code by default. You can remove any of these tags or add any host-level tags back in. 

Note: The exclusion of tags is not supported in this whitelist-based customization of tags. Adding tags starting with `!` will not be accepted.

{{< img src="graphing/metrics/distributions/distribution_metric.png" alt="Distribution metric" responsive="true" style="width:80%;">}}

## Case Studies
Distribution metrics are a new type of metric that allows you to obtain the global distribution values across all hosts. Therefore, metrics that are submitted as distribution metrics create custom metrics the same way as other metric types.

`my.service.latency` is a distribution metric submitted on 500 hosts.

Each host is tagged with one of 3 `Availability Zones` (as tagged by the AWS integration) and 20 `Roles` by Chef, Datadog provisioning system.

Additionally, this metric is tagged with `Status`, which has two values: `Status:Success` or `Status:Fail`, and `Result`, which also has two values: `Result:Open` or `Result:Close`. For the following scenarios, we'll assume that both values of the `Status` tag appear with both values of the `Result` tag.

##### Scenario 1
Suppose `my.service.latency` is a distribution metric tagged by `Status` and `Result` that only needs to queried with the nonpercentile aggregations such as `avg`, `min`, `max`, `sum`, `count`.

Datadog stores four timeseries (one for each nonpercentile aggregation: `min`, `max`, `sum`, `count` -- `avg` is calculated as the quotient of sum/count) per unique tag value combination that appears. In this case, since every value of `Status` appears with every value of the `Result` tag. 

Therefore, the number of timeseries created for nonpercentile aggregations is: 4 * (2) * (2) = 16 timeseries.

##### Scenario 2

Now suppose you're interested in the p99 value of `my.service.latency`. You've already added percentile aggregations to `my.service.latency` tagged by `Status` and `Result` using the Distributions UI. You could then query, for example {my.service.latency for Status:success, Result:closed}, but not {my.service.latency for Availability-Zone: US-East-1a}

Datadog still stores the original 16 timeseries from Scenario 1 to allow you to continue querying by any nonpercentile aggregation. For percentile aggregations, we create timeseries for every potentially queryable combination of tag values (including null tag values).

The additional timeseries created for percentile aggregations is: 5 * (2+1) * (2+1) = 45 timeseries. 

Therefore the total number of timeseries associated with `my.service.latency` is 16+45 = 51 timeseries.

{{< img src="graphing/metrics/distributions/Distros_Tagging.gif" alt="Distros_Tagging" responsive="true" style="width:80%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics/histograms
[2]: /developers/metrics/distributions
[3]: https://app.datadoghq.com/metric/distribution_metrics
