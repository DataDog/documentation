---
title: Monitor SLO
kind: documentation
description: "Use Monitors to define the Service Level Objective"
further_reading:
- link: "monitors"
  tag: "Documentation"
  text: "More information about Monitors"
---

## Overview

Select a monitor based source if you want to build your SLO based on existing or new Datadog monitors. For more information about monitors, see the [Monitor documentation][1]. Monitor based SLOs are useful for a time-based stream of data where you are differentiating time of good behavior vs bad behavior. 
Using the sum of the good time divided by the sum of total time provides a Service Level Indicator (or SLI).

## Setup

On the [SLO page][2], select **New SLO +**. Then select **Monitor**.

### Configuration

#### Define queries

To start, you need to be using Datadog monitors. To set up a new SLO monitor, go to the [monitor page][3]. Search for monitors by name and click on it to add it to the source list. An example SLO on a monitor is if the latency of all user requests should be less than 250ms 99% of the time in any 30 day window. To set this up, you would:

1. Select a single monitor or,
2. Select multiple monitors (up to 20) or,
3. Select a single multi-alert monitor and select specific monitor groups (up to 20) to be included in SLO calculation.

**Supported monitor types**:

- metric monitor types - including metric, anomaly, APM, forecast, outlier, and integration metrics
- service checks
- synthetics

**Example:** You might be tracking the uptime of a physical device. You have already configured a metric monitor on `host:foo` using
a custom metric. This monitor might also ping your on-call team if it's no longer reachable. To avoid burnout you want to
track how often this host is down. 

#### Set your targets

SLO targets are the stat you use to measure uptime success.

First select your target value, example: `95% of all HTTP requests should be "good" over the last 7 days`.

You can optionally include a warning value that is greater than the target value to indicate when you are approaching
an SLO breach.

#### Identify this indicator

Here we add contextual information about the purpose of the SLO, including any related information
in the description and tags you would like to associate with the SLO.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors
[2]: https://app.datadoghq.com/slo/new/monitor
[3]: https://app.datadoghq.com/monitors#create/metric
