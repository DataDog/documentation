---
title: Monitor-based SLOs
kind: documentation
description: "Use Monitors to define the Service Level Objective"
further_reading:
- link: "/monitors/"
  tag: "Documentation"
  text: "More information about Monitors"
---

## Overview

Select a monitor-based source if you want to build your SLO based on existing or new Datadog monitors. For more information about monitors, see the [Monitor documentation][1]. Monitor-based SLOs are useful for a time-based stream of data where you are differentiating time of good behavior vs bad behavior. Using the sum of the good time divided by the sum of total time provides a Service Level Indicator (or SLI).

{{< img src="monitors/service_level_objectives/grouped_monitor_based_slo.png" alt="monitor-based SLO example"  >}}

## Setup

On the [SLO status page][2], select **New SLO +**. Then select [**Monitor**][3].

### Define queries

To start, you need to be using Datadog monitors. To set up a new monitor, go to the [monitor creation page][4] and select one of the monitor types that are supported by SLOs (listed below). Search for monitors by name and click on it to add it to the source list.

For example, if you have a Metric Monitor that is configured to alert when user request latency is greater than 250ms, you could set a monitor-based SLO on that monitor. Let’s say you choose an SLO target of 99% over the past 30 days. What this means is that the latency of user requests should be less than 250ms 99% of the time over the past 30 days. To set this up, you would:

1. Select a single monitor or,
2. Select multiple monitors (up to 20) or,
3. Select a single [multi-alert monitor][5] and select specific monitor groups (up to 20) to be included in SLO calculation using the **Calculate on selected groups** toggle.

**Supported Monitor Types:**

- Metric Monitor Types (Metric, Integration, APM Metric, Anomaly, Forecast, Outlier)
- Synthetic
- Service Checks (open beta)

**Example:** You might be tracking the uptime of a physical device. You have already configured a metric monitor on `host:foo` using a custom metric. This monitor might also ping your on-call team if it's no longer reachable. To avoid burnout you want to track how often this host is down.

### Set your SLO targets

An SLO target is comprised of the target percentage and the time window. When you set a target for a monitor-based SLO the target percentage specifies what portion of the time the underlying monitor(s) of the SLO should be in an OK state, while the time window specifies the rolling time period over which the target should be tracked.

Example: `99% of the time requests should have a latency of less than 300ms over the past 7 days`.

While the SLO remains above the target percentage, the SLO's status will be displayed in green font. When the target percentage is violated, the SLO's status will be displayed in red font. You can also optionally include a warning percentage that is greater than the target percentage to indicate when you are approaching an SLO breach. When the warning percentage is violated (but the target percentage is not violated), the SLO status will be displayed in yellow font.

**Note:** The number of decimal places you can specify for your monitor-based SLOs differs depending on the time windows you choose. Up to two decimal places are allowed for 7-day and 30-day targets, and up to three decimal places are allowed for 90-day targets. The precision shown in the details UI of the SLO will be up to `num_target_decimal_places`, meaning two decimal places for 7-day and 30-day targets and three decimal places for 90-day targets. These limits are in place because monitor-based SLO error budget is specified in terms of time. A 99.999% target for a 7-day and 30-day targets results in error budgets of 6 seconds and 26 seconds, respectively. Monitors evaluate every minute, thus the granularity of a monitor-based SLO is also 1 minute. This means one alert would fully consume and overspend the 6 second or 26 second error budgets in the previous examples (for use cases requiring more granularity, consider using [metric-based SLOs][6] instead). Furthermore, error budgets this small are likely unrealistic goals for you to try to achieve in practice.

### Identify this indicator

Here you can add contextual information about the purpose of the SLO, including any related information or resources in the description and tags you would like to associate with the SLO.

## Overall status calculation

{{< img src="monitors/service_level_objectives/overall_uptime_calculation.png" alt="overall uptime calculation"  >}}

The overall status can be considered as a percentage of the time where **all** monitors or **all** the calculated groups in a single multi-alert monitor are in the `OK` state. It is not the average of the aggregated monitors or the aggregated groups, respectively.

Consider the following example for 3 monitors (this is also applicable to a monitor-based SLO based on a single multi-alert monitor):

| Monitor            | t1 | t2 | t3    | t4 | t5    | t6 | t7 | t8 | t9    | t10 | Status |
|--------------------|----|----|-------|----|-------|----|----|----|-------|-----|--------|
| Monitor 1          | OK | OK | OK    | OK | ALERT | OK | OK | OK | OK    | OK  | 90%    |
| Monitor 2          | OK | OK | OK    | OK | OK    | OK | OK | OK | ALERT | OK  | 90%    |
| Monitor 3          | OK | OK | ALERT | OK | ALERT | OK | OK | OK | OK    | OK  | 80%    |
| **Overall Status** | OK | OK | ALERT | OK | ALERT | OK | OK | OK | ALERT | OK  | 70%    |

This can result in the overall status being lower than the average of the individual statuses.

### Exceptions for synthetic tests
In certain cases, there is an exception to the status calculation for monitor-based SLOs that are comprised of one grouped Synthetic test. Synthetic tests have optional special alerting conditions that change the behavior of when the test enters the ALERT state and consequently impact the overall uptime:

- Wait until the groups are failing for a specified number of minutes (default: 0)
- Wait until a specified number of the groups are failing (default: 1)
- Retry a specified number of times before a location's test is considered a failure (default: 0)

By changing any of these conditions to something other than their defaults, the overall status for a monitor-based SLO using just that one Synthetic test could appear to be better than the aggregated statuses of the Synthetic test's individual groups. 

For more information on Synthetic test alerting conditions, visit the Synthetic Monitoring [documentation][7].

## Underlying monitor and SLO histories

SLOs based on the metric monitor types have a feature called SLO Replay that will backfill SLO statuses with historical data pulled from the underlying monitors' metrics and query configurations. This means that if you create a new Metric Monitor and set an SLO on that new monitor, rather than having to wait a full 7, 30 or 90 days for the SLO's status to fill out, SLO Replay will trigger and look at the underlying metric of that monitor and the monitor's query to get the status sooner. SLO Replay also triggers when the underlying metric monitor's query is changed (e.g. the threshold is changed) to correct the status based on the new monitor configuration. As a result of SLO Replay recalculating an SLO's status history, the monitor's status history and the SLO's status history may not match after a monitor update.

**Note:** SLO Replay is not supported for SLOs based on Synthetic tests or Service Checks.

Datadog recommends against using monitors with `Alert Recovery Threshold` and `Warning Recovery Threshold` as they can also affect your SLO calculations and do not allow you to cleanly differentiate between a SLI's good behavior and bad behavior.

SLO calculations do not take into account when a monitor is resolved manually or as a result of the **_After x hours automatically resolve this monitor from a triggered state_** setting. If these are important tools for your workflow, consider cloning your monitor, removing auto-resolve settings and `@-notification`s, and using the clone for your SLO.

Confirm you are using the preferred SLI type for your use case. Datadog supports monitor-based SLIs and metric-based SLIs as [described in the SLO metric documentation][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
[2]: https://app.datadoghq.com/slo
[3]: https://app.datadoghq.com/slo/new/monitor
[4]: https://app.datadoghq.com/monitors#create
[5]: /monitors/monitor_types/metric/?tab=threshold#alert-grouping
[6]: /monitors/service_level_objectives/metric/
[7]: /synthetics/api_tests/?tab=httptest#alert-conditions
