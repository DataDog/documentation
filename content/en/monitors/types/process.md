---
title: Live Process Monitor
kind: documentation
description: "Check if a process is running on a host"
aliases:
- /monitors/monitor_types/process
- /monitors/create/types/process/
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/manage/status/"
  tag: "Documentation"
  text: "Check your monitor status"
---

## Overview

Live Process Monitors are based on data collected by the [Process Agent][1]. Create monitors that warn or alert based on the count of any group of processes across hosts or tags.

Live Process Monitors are recommended for the following use cases:

- Ensure that enough instances of a non-containerized long-lived process are running.
- Flag when a specific process is running.

Note that only long lived processes are picked up by the Agent. This means that monitors on processes that live for less than 20 seconds may be flaky.

## Monitor creation

To create a [Live Process Monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> Live Process*.

### Select processes

You can use either tags or a fuzzy search to filter across all processes in your infrastructure. Matching processes and counts are displayed below the search:

{{< img src="monitors/monitor_types/process/select_processes.png" alt="Select processes" style="width:90%;">}}

After defining your search, a graph is displayed above the search inputs with an approximation of the total number of processes found. For more granular data, visit your [Live Process Page][4].

#### Tags search

Filter processes to monitor by their tags. Datadog recommends that you first try to filter processes by their tags before using full text search.

#### Full text search

If you cannot scope processes down to the granularity you would like using tags, it is possible to filter processes by their commandline. The full text search field performs a partial match, fuzzy search across all processes on your infrastructure. Search operators `AND`, `OR`, `NOT` are supported. See the [Live Process Monitoring][3] page for more details.

##### Examples

| Example Query | Explanation |
|---|---|
| `foo AND bar` | Matches any process whoose commandline contains both `foo` and `bar` |
| `foo AND NOT bar` | Matches any process whoose commandline contains `foo` but not `bar`. |
| `foo OR bar` | Matches any process that contains `foo` or `bar`. |
| `foo bar` | Same as above. |
| `foo or NOT bar` | Matches any process that contains `foo` or does not contain `bar`. |

#### Alert grouping

`Simple Alert` (default): aggregates alerts over all reporting sources. You receive one alert when the aggregated value meets the set conditions.

`Multi Alert`: applies the alert to each source according to your group parameters. You receive an alert for each group that meets the set conditions.

### Set alert conditions

- The count was `above`, `above or equal to`, `below`, or `below or equal to`
- the threshold during the last `5 minutes`, `15 minutes`, `1 hour`, or larger. Additionally, you can use `custom` to set a value between 5 minutes and 24 hours.

Use thresholds to set a numeric value for triggering an alert. Datadog has two types of notifications (alert and warning). Live Process Monitors recover automatically based on the alert or warning threshold.

#### Best practices for timeframe selection

Datadog recommends to pick the largest timeframe that you can support. This allows for additional fault tolerance in the case where an Agent becomes unavailable or encounters network issues.

Live Process Monitors uses a [rolling time](https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#evaluation-window) windows to evaluate process count. In other words, every minute, the monitor checks the past X minutes and triggers if the alerting condition is met. It’s recommended to not use evaluation windows shorter than 5 minutes in case there is any sporadic network disruption between the Process Agent and Datadog.

### Advanced alert conditions

For detailed instructions on the advanced alert options (auto resolve, evaluation delay, etc.), see the [Monitor configuration][5] page.

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][6] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /infrastructure/process/
[2]: https://app.datadoghq.com/monitors#create/live_process
[3]: /infrastructure/process/#search-syntax
[4]: https://app.datadoghq.com/process
[5]: /monitors/configuration/#advanced-alert-conditions
[6]: /monitors/notify/
