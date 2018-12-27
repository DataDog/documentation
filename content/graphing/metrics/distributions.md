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
This feature is in beta. <a href="/help">Contact Datadog support</a> to enable distribution metrics for your account.
</div>

## Overview

Distributions are a [metric type][1] that can be thought of as a global version of the [Histogram metric][2], which measures the statistical distribution of discrete values on a single host. Distributions observe the values that are sent from multiple hosts to measure statistical distributions across your entire infrastructure, allowing you to compute global percentiles across your entire dataset.

Global distributions are designed to instrument logical objects, like services, independently from the underlying hosts and provide insight into metric behavior across your infrastructure .

Check out the [Developer Tools section][3] for more information on the internals of this metric type. Otherwise, read on to learn how to manipulate and visualize Distributions in the interface.

## Aggregations

The new tagging workflow for Distributions allows you to define which aggregations are available in queries. Initially, Datadog maintain a single timeseries, for `*` (all points), and otherwise ignore all tags.  Manually aggregate your metric based on sets of tags, chosen from the list of tags normally available. For convenience, Datadog also creates aggregations for every combination of up to four custom tags applied to each metric.

With the [distribution UI][4], create additional aggregate timeseries by applying sets of tags to a metric, for which a timeseries is created for every combination of tag values within the set.

**Sets of tags are limited to groups of four.**

{{< img src="graphing/metrics/distributions/distribution_metric.png" alt="Distribution metric" responsive="true" >}}

When creating your own graph, Distribution metrics automatically have additional space aggregations available in the UI:

{{< img src="graphing/metrics/distributions/dogweb_latency_bis.png" alt="Distribution metric bis" responsive="true" >}}

## Case study

`my.service.latency` is a metric that is being submitted on 500 hosts.

Each host is tagged with one of 3 `Availability Zones` (as tagged by the AWS integration) and 20 `Roles` by Chef, Datadog provisioning system.

Additionally, this metric has been tagged with `Status`, which has 2 values: `Status:Success` or `Status:Fail`, and `Result`, which also has 2 values: `Result:Open` or `Result:Close`.

##### Scenario 1

By default, Datadog creates aggregations for `my.service.latency` for [each combination of custom metric][5] tags `Status` and `Result`.

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

{{< img src="graphing/metrics/distributions/Distros_Tagging.gif" alt="Distros_Tagging" responsive="true" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics
[2]: /developers/metrics/histograms
[3]: /developers/metrics/distributions
[4]: https://app.datadoghq.com/metric/distribution_metrics
[5]: /developers/metrics/custom_metrics
