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
Distributions are a new metric type in Agent 6 that aggregate the values that are sent from multiple hosts during a flush interval to measure statistical distributions across your entire infrastructure serverside.  This can be thought of as a global version of the [Histogram metric][2], which measures at the Agent-level the statistical distribution of values on a single host.

Global distributions are designed to instrument logical objects, like services, independently from the underlying hosts. Unlike histograms which aggregate on the Agent-side, global distributions send all raw data collected during flush interval and aggregation occurs serverside. Because the underlying data structure has not been aggregated and represents raw data, distributions provide two major features: 

* Calculation of percentile aggregations: 
Percentile aggregations (p50, p75, p90, p95, p99) are calculated from the raw data across all hosts, and are therefore globally accurate.

Percentile aggregations cannot be calculated on data that has already been aggregated, which means that Datadog must keep a value for every possible query that a customer can make. To protect against unwanted timeseries growth, we provide a workflow that allows you to provide a whitelist that represents the queries that you expect to make (see customization of tagging point below). 

* Customization of tagging
This new functionality allows you to control the tagging scheme for metrics for which host-level granularity is not necessary (e.g. transactions per second for a checkout service). 


Check out the [Developer Tools section][3] for more implementation details.

## Aggregations

Like other metric types, such as `gauges` or `histograms`, distributions have the following 5 aggregations available: count, min, max, sum, avg. Distributions are initially tagged the same way as any other metric (via custom tags set in code) and are resolved to any host tag based on the host that shipped the metric.

{{< img src="graphing/metrics/distributions/distribution_metric.png" alt="Distribution metric" responsive="true" >}}

With the [distribution UI][4], add additional percentile aggregations (p50, p75, p90, p95, p99) for a set of tags (up to 10) you’ve elected to apply. 

{{< img src=" PLEASE ADD DISTRIBUTIONS UI CROPPED IMAGE FROM GOOGLE DOCS HERE @GUS" alt="Distribution Metric UI" responsive="true" >}}

After electing to apply percentile aggregations on a distribution metric, these aggregations will be automatically available in the graphing UI:

{{< img src="graphing/metrics/distributions/dogweb_latency_bis.png" alt="Distribution metric bis" responsive="true" >}}

Distributions aren't just for measuring times. They can be used to measure the distribution of any type of value, like the size of uploaded files or number of orders completed.


## Customize Tagging
Distributions provide new functionality that allows you to control the tagging for metrics for which host-level granularity does not make sense. This is designed to provide you with more value within existing budgets, but there is no additional accuracy or performance benefit/penalty incurred here. 

To customize tagging, hover over your metric in the table, and click on the pencil icon to edit. In the modal that pops up, select “Custom...”. There is a whitelist of the tags you have defined in code by default. You can remove any of these tags or add any host-level tags back in. 


#### Example:
Suppose you’ve defined a distribution metric with the following metric name and tags (of interest for querying purposes) to Datadog: 

Metric Name: `dist.dd.dogweb.latency`
Applied Tags: `env`, `foo`
Include Percentiles?: Yes

If this `dist.dd.dogweb.latency{*}` metric sends 20 values in a given 10 second flush interval, Datadog will store each respective distribution of these values within the 10 time series representing the following: count, min, max, sum, avg p50, p75, p90, p95, p99. Note that each of these 10 time series is counted as a custom metric.

During this 10 second flush period for this particular distribution metric, we’ve now stored the following values in their respective time series: 

avg:`dist.dd.dogweb.latency{*}`: gives you the avg of those 20 values during the flush interval
count:`dist.dd.dogweb.latency{*}`: gives you the count of the values (20 in this case) sent during the flush interval across
max:`dist.dd.dogweb.latency{*}`:  gives you the max value sent during the flush interval
min: `dist.dd.dogweb.latency{*}`: gives you the min value sent during the flush interval
sum:`dist.dd.dogweb.latency{*}`:  gives you the sum value sent during the flush interval
50p:`dist.dd.dogweb.latency{*}`: gives you the 50th percentile, or median, of those values in the flush interval
75p:`dist.dd.dogweb.latency{*}`: gives you the 75th percentile value in the flush interval
90p:`dist.dd.dogweb.latency{*}`: gives you the 90th percentile value in the flush interval
95p:`dist.dd.dogweb.latency{*}`: gives you the 95th percentile value in the flush interval
99p:`dist.dd.dogweb.latency{*}`: gives you the 99th percentile value in the flush interval


Note that a different tag value combination for the given metric name `dist.dd.dogweb.latency`,such as `dist.dd.dogweb.latency{env:prod}`, would also create 10 other timeseries: count, sum, avg, min, max, p50, p75, p90, p95, p99.

You would not be able to query for p99:`dist.dd.dogweb.latency` by {`availability-zone`} since `availability-zone` is not one of the applied tags.


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

{{< img src="graphing/metrics/distributions/Distros_Tagging.gif" alt="Distros_Tagging" responsive="true" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics
[2]: /developers/metrics/histograms
[3]: /developers/metrics/distributions
[4]: https://app.datadoghq.com/metric/distribution_metrics
