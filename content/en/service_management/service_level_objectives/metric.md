---
title: Metric-based SLOs
description: "Use metrics to define a Service Level Objective"
aliases:
- /monitors/service_level_objectives/event/
- /monitors/service_level_objectives/metric/
further_reading:
- link: "/metrics/"
  tag: "Documentation"
  text: "More information about metrics"
- link: "/service_management/service_level_objectives/"
  tag: "Documentation"
  text: "SLO overview, configuration, and calculation"
---

## Overview

Metric-based SLOs are useful for a count-based stream of data where you are differentiating good and bad events. A metric query uses the sum of the good events divided by the sum of total events over time to calculate a Service Level Indicator (or SLI). You can use any metric to create SLOs, including custom metrics generated from [APM spans][1], [RUM events][2], and [logs][3]. For an overview on how SLOs are configured and calculated, see the [Service Level Objective][4] page.

{{< img src="service_management/service_level_objectives/metric_slo_side_panel.png" alt="example metric-based SLO" >}}

## Setup

On the [SLO status page][5], click **+ New SLO**. Then select, [**By Count**][6].

### Define queries

1. There are two queries to define. The numerator query defines the sum of the good events, while the denominator query defines the sum of the total events. Your queries must use COUNT, RATE, or percentile-enabled DISTRIBUTION metrics to ensure the SLO calculation behaves correctly. For more information, see [Querying][9] documentation. 
1. Use the `FROM` field to include or exclude specific groups using tags.
1. For percentile-enabled DISTRIBUTION metrics, you must use the `count values...` aggregator to specify a numerical threshold for the metric to count. This feature is called Threshold Queries and allows you to count the number of raw values that match a numerical threshold to produce counts for your numerator and denominator. For more information, see [Threshold Queries][7].
1. Optionally, for percentile-enabled DISTRIBUTION metrics, use the dropdown immediately to the right of the `count values..` aggregator to break your SLI out by specific groups.
1. Optionally, for COUNT or RATE metrics, use the `sum by` aggregator to break your SLI out by specific groups.

**Example:** If you are tracking HTTP return codes, and your metric includes a tag like `code:2xx OR code:3xx OR code:4xx`. The sum of good events would be `sum:httpservice.hits{code:2xx} + sum:httpservice.hits{code:4xx}`. And the `total` events would be `sum:httpservice.hits{!code:3xx}`.

Why is `HTTP 3xx` excluded? - These are typically redirects and should not count for or against the SLI, but other non-3xx based error codes should. In the `total` case, you want all types minus `HTTP 3xx`, in the `numerator`, you only want `OK` type status codes.

#### Multi-group for metric-based SLIs

Metric-based SLIs allow you to focus on the most important attributes of your SLIs. You can add groups to your metric-based SLIs in the editor by using tags like `datacenter`, `env`, `availability-zone`, `resource`, or any other relevant group:

{{< img src="service_management/service_level_objectives/metric_slo_creation.png" alt="grouped metric-based SLO editor" >}}

By grouping these SLIs you can visualize each individual group's status, good request counts, and remaining error budget on the detail panel:

{{< img src="service_management/service_level_objectives/metric_slo_history_groups.png" alt="metric-based SLO group results" >}}

By default, the bar graph shows the overall counts of good and bad requests for the entire SLO. You can scope the bar graph down to an individual group's good and bad requests counts by clicking on its corresponding row in the table. In addition, you can also choose to show or hide good request counts or bad request counts by selecting the appropriate option in the legend directly below the bar graph. 

### Set your SLO targets

An SLO target is comprised of the target percentage and the time window. When you set a target for a metric-based SLO the target percentage specifies what portion of the total events specified in the denominator of the SLO should be good events, while the time window specifies the rolling time period over which the target should be tracked.

Example: `99% of requests should be error-free over the past 7 days`.

While the SLO remains above the target percentage, the SLO's status will be displayed in green font. When the target percentage is violated, the SLO's status will be displayed in red font. You can also optionally include a warning percentage that is greater than the target percentage to indicate when you are approaching an SLO breach. When the warning percentage is violated (but the target percentage is not violated), the SLO status will be displayed in yellow font.

**Note:** Up to three decimal places are allowed for metric-based SLO targets. The precision shown in the details UI of the SLO will be up to `num_target_decimal_places + 1 = 4 decimal places`. The exact precision shown will be dependent on the magnitude of the values in your denominator query. The higher the magnitude of the denominator, the higher the precision that can be shown up to the four decimal place limit.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/generate_metrics/
[2]: https://docs.datadoghq.com/real_user_monitoring/platform/generate_metrics
[3]: https://docs.datadoghq.com/logs/log_configuration/logs_to_metrics/#overview
[4]: /service_management/service_level_objectives
[5]: https://app.datadoghq.com/slo
[6]: https://app.datadoghq.com/slo/new/metric
[7]: /metrics/distributions/#threshold-queries
[8]: /service_management/service_level_objectives/monitor/
[9]: https://docs.datadoghq.com/dashboards/querying/#advanced-graphing
