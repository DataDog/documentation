---
title: Metric-based SLOs
kind: documentation
description: "Use metrics to define a Service Level Objective"
aliases:
  - /monitors/service_level_objectives/event/
further_reading:
- link: "/metrics/"
  tag: "Documentation"
  text: "More information about metrics"
---

## Overview

Metric-based SLOs are useful for a count-based stream of data where you are differentiating good and bad events. A metric query uses the sum of the good events divided by the sum of total events over time to calculate a Service Level Indicator (or SLI).

## Setup

On the [SLO status page][1], select **New SLO +**. Then select [**Metric**][2].

### Define queries

1. There are two queries to define. The first query defines the sum of the good events, while the second query defines the sum of the total events.
2. Use the `FROM` field to include or exclude specific groups using tags.
3. Use the `sum by` aggregator to sum up all request counts instead of averaging them, or taking the max or min of all of those requests.
4. Optionally, break your SLI out by specific groups (for tracking and visualization) or report on an aggregation of everything included in your criteria from steps 1 and 2. 

**Example:** If you are tracking HTTP return codes, and your metric includes a tag like `code:2xx` || `code:3xx` || `code:4xx`. The sum of good events would be `sum:httpservice.hits{code:2xx} + sum:httpservice.hits{code:4xx}`. And the `total` events would be `sum:httpservice.hits{!code:3xx}`.

Why did we exclude `HTTP 3xx`? - These are typically redirects and should not count for or against the SLI, but other non 3xx based error codes should. In the `total` case we want all types minus `HTTP 3xx`, in the `numerator` we only want `OK` type status codes.

### Multi-group for metric-based SLIs

Metric-based SLIs allow you to focus on the most important attributes of your SLIs. You can add groups to your metric-based SLIs in the editor by using tags like `datacenter`, `partition`, `availability-zone`, `resource`, or any other relevant group:

{{< img src="monitors/service_level_objectives/metric_editor.png" alt="example metric-based SLO editor"  >}}

By grouping these SLIs you can visualize each individual group’s status, good request counts, and remaining error budget on the detail panel:

{{< img src="monitors/service_level_objectives/metric_results.png" alt="example metric-based SLO group results"  >}}

**Note**: If you are using monitor-based SLIs, you can also [view monitor groups][3].

### Set your SLO targets

SLO targets are the stat you use to measure uptime success.

First select your target value, example: `95% of all HTTP requests should be "good" over the last 7 days`.

You can optionally include a warning value that is greater than the target value to indicate when you are approaching an SLO breach.

### Identify the indicator

Here we add contextual information about the purpose of the SLO, including any related information in the description and tags you would like to associate with the SLO.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: https://app.datadoghq.com/slo/new/metric
[3]: /monitors/service_level_objectives/monitor/
