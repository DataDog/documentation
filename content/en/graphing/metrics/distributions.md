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

Distributions are a metric type in Agent 6 that aggregate the values that are sent from multiple hosts during a flush interval to measure statistical distributions across your entire infrastructure server-side.  This can be thought of as a global version of the [Histogram metric][1], which measures at the Agent-level the statistical distribution of values on a single host.

Global distributions are designed to instrument logical objects, like services, independently from the underlying hosts. Unlike histograms which aggregate on the Agent-side, global distributions send all raw data collected during the flush interval and the aggregation occurs server-side. Because the underlying data structure has not been aggregated and represents raw data, distributions provide two major features:

* **Calculation of percentile aggregations**: Percentile aggregations (p50, p75, p90, p95, p99) are calculated from the raw data across all hosts, and are therefore globally accurate.

* **Customization of tagging**: This functionality allows you to control the tagging scheme for metrics for which host-level granularity is not necessary (e.g. transactions per second for a checkout service).

See the [Developer Tools section][2] for more implementation details.

## Aggregations

Like other metric types, such as `gauges` or `histograms`, distributions have the following 5 aggregations available: `count`, `min`, `max`, `sum`, and `avg`. Distributions are initially tagged the same way as any other metric (via custom tags set in code) and are resolved to any host tag based on the host that shipped the metric. Add additional percentile aggregations with the [distribution UI][3]: `p50`, `p75`, `p90`, `p95`, and `p99` for a set of tags (up to 10) you’ve elected to apply:

{{< img src="graphing/metrics/distributions/global_metrics_selection.png" alt="Distribution Metric UI" responsive="true" style="width:80%;">}}

After electing to apply percentile aggregations on a distribution metric, these aggregations are automatically available in the graphing UI:

{{< img src="graphing/metrics/distributions/dogweb_latency_bis.png" alt="Distribution metric bis" responsive="true" style="width:80%;">}}

## Customize Tagging

Distributions provide new functionality that allows you to control the tagging for metrics for which host-level granularity does not make sense. This is designed to provide you with more value within existing budgets, but there is no additional accuracy or performance benefit/penalty incurred here.

To customize tagging, hover over your metric in the table, and click on the pencil icon to edit. In the modal that pops up, select *Custom...*. There is a whitelist of the tags you have defined in code by default. You can remove any of these tags or add any host-level tags back in.

{{< img src="graphing/metrics/distributions/distribution_metric.png" alt="Distribution metric" responsive="true" style="width:80%;">}}

## Case Studies
Distribution metrics are a new type of metric that allows you to obtain the global distribution values across all hosts. Therefore, metrics that are submitted as distribution metrics create custom metrics the same way other metric types do.

`my.service.latency` is a metric that is being submitted on 500 hosts.

Each host is tagged with one of 3 `Availability Zones` (as tagged by the AWS integration) and 20 `Roles` by Chef, Datadog provisioning system.

Additionally, this metric has been tagged with `Status`, which has 2 values: `Status:Success` or `Status:Fail`, and `Result`, which also has 2 values: `Result:Open` or `Result:Close`.

##### Scenario 1

By default, Datadog creates aggregations for `my.service.latency` for each combination of custom metric tags `Status` and `Result`.

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

{{< img src="graphing/metrics/distributions/Distros_Tagging.gif" alt="Distros_Tagging" responsive="true" style="width:80%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics/histograms
[2]: /developers/metrics/distributions
[3]: https://app.datadoghq.com/metric/distribution_metrics
