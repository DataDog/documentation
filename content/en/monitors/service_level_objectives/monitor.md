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

## Setup

On the [SLO status page][2], select **New SLO +**. Then select [**Monitor**][3].

### Define queries

To start, you need to be using Datadog monitors. To set up a new monitor, go to the [monitor creation page][4] and select one of the monitor types that are supported by SLOs (listed below). Search for monitors by name and click on it to add it to the source list. An example SLO on a monitor is if the latency of all user requests should be less than 250ms 99% of the time in any 30 day window. To set this up, you would:

1. Select a single monitor or,
2. Select multiple monitors (up to 20) or,
3. Select a single multi-alert monitor and select specific monitor groups (up to 20) to be included in SLO calculation.

**Supported Monitor Types:**
- Metric Monitor Types (Metric, Integration, APM Metric, Anomaly, Forecast, Outlier)
- Synthetics
- Service Checks (open beta)

**Example:** You might be tracking the uptime of a physical device. You have already configured a metric monitor on `host:foo` using a custom metric. This monitor might also ping your on-call team if it's no longer reachable. To avoid burnout you want to track how often this host is down.

### Set your SLO targets

An SLO comprised of the target percentage and the time window that the target should be tracked for.

Example: `95% of all HTTP requests should be "good" over the last 7 days`.

You can optionally include a warning value that is greater than the target value to indicate when you are approaching an SLO breach.

### Identify this indicator

Here we add contextual information about the purpose of the SLO, including any related information in the description and tags you would like to associate with the SLO.

## Underlying monitor and SLO histories

SLOs based on the metric monitor types have a feature called SLO Replay that will backfill SLO statuses with historical data pulled from the underlying monitors' metrics and query configurations. This means that if you create a new Metric Monitor and set an SLO on that new monitor, rather than having to wait a full 7, 30 or 90 days for the SLO's status to fill out, SLO Replay will trigger and look at the underlying metric of that monitor and the monitor's query to get the status sooner. SLO Replay also triggers when the underlying metric monitor's query is changed (e.g. the threshold is changed) to correct the status based on the new monitor configuration. As a result of SLO Replay recalculating an SLO's status history, the monitor's status history and the SLO's status history may not match after a monitor update.

Datadog recommends against using monitors with `Alert Recovery Threshold` and `Warning Recovery Threshold` as they can also affect your SLO calculations and do not allow you to cleanly differentiate between a SLI's good behavior and bad behavior.

SLO calculations do not take into account when a monitor is resolved manually or as a result of the **_After x hours automatically resolve this monitor from a triggered state_** setting. If these are important tools for your workflow, consider cloning your monitor, removing auto-resolve settings and `@-notification`s, and using the clone for your SLO.

Confirm you are using the preferred SLI type for your use case. Datadog supports monitor-based SLIs and metric-based SLIs as [described in the SLO metric documentation][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
[2]: https://app.datadoghq.com/slo
[3]: https://app.datadoghq.com/slo/new/monitor
[4]: https://app.datadoghq.com/monitors#create
[5]: /monitors/service_level_objectives/metric/
