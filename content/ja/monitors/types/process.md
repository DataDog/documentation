---
title: Live Process Monitor
description: "Check if a process is running on a host"
aliases:
- /monitors/monitor_types/process
- /monitors/create/types/process/
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Check your monitor status
- link: "https://www.datadoghq.com/blog/monitor-fargate-processes/"
  tag: Blog
  text: Monitor processes running on AWS Fargate with Datadog
---

## Overview

Live Process Monitors are based on data collected by the [Process Agent][1]. Create monitors that warn or alert based on the count of any group of processes across hosts or tags.

Live Process Monitors are best used in the following scenarios:

- Ensure that enough instances of a non-containerized long-lived process are running.
- Flag when a specific process is running.

**Note**: Only long-lived processes are picked up by the Agent. Monitors on processes that live for less than 20 seconds may be flaky.

## Monitor creation

There are two ways to create a Live Process Monitor:

- Using the main navigation: **Monitors --> New Monitor --> Live Process**.
- On the [Live Process page][4], search for a process you want to monitor. Then click the dropdown menu next to **+New Metric** and click **Create monitor**.

### Select processes

You can use either tags or a fuzzy text search to filter across all processes in your infrastructure. Matching processes and counts are displayed below the search:

{{< img src="monitors/monitor_types/process/select_processes.png" alt="Select processes" style="width:90%;">}}

After defining your search, a graph is displayed above the search inputs with an approximation of the total number of processes found. It is recommended to keep your monitor scoped to a few thousand processes. Use additional tags to narrow the search down or consider splitting a monitor into multiple ones if needed. For more granular data, see the [Live Process page][4].

#### Tags search

Filter processes to monitor by their tags. Datadog recommends trying to filter processes by their tags before using the full text search.

#### Full text search

If you cannot scope processes down to the granularity you would like using tags, you can use text search to filter against both command lines and username. The search performs a partial match and fuzzy searches across all processes on your infrastructure. Search operators `AND`, `OR`, and `NOT` are supported. See the [Live Process Monitoring documentation][3] for more details.

##### Examples

| Example Query | Explanation |
|---|---|
| `foo AND bar` | Matches any process whose command line contains both `foo` and `bar` |
| `foo AND NOT bar` | Matches any process whose command line contains `foo` but not `bar`. |
| `foo OR bar` | Matches any process that contains `foo` or `bar`. |
| `foo or NOT bar` | Matches any process that contains `foo` or does not contain `bar`. |

#### Alert grouping

`Simple Alert` (default): aggregates alerts over all reporting sources. You receive one alert when the aggregated value meets the set conditions.

`Multi Alert`: applies the alert to each source according to your group parameters. You receive an alert for each group that meets the set conditions.

### Set alert conditions

- The process count was `above`, `above or equal to`, `below`, or `below or equal to`
- the threshold during the last `5 minutes`, `15 minutes`, `1 hour`, or larger. Additionally, you can use `custom` to set a value between 5 minutes and 24 hours.

Process Count, in this case, refers to the number of all matching processes that were alive during the time interval.

Use thresholds to set a numeric value for triggering an alert. Datadog has two types of notifications: alert and warning. Live Process Monitors recover automatically based on the alert or warning threshold.

#### Best practices for timeframe selection

Live Process Monitors use a [rolling time window][7] to evaluate process count. In other words, every minute, the monitor checks the past X minutes and triggers if the alerting condition is met. Using evaluation windows shorter than 5 minutes is discouraged in order to prevent any false positives due to sporadic network disruption between the Process Agent and Datadog.

### Advanced alert conditions

For detailed instructions on the advanced alert options (auto resolve, evaluation delay, and more), see the [Monitor configuration][5] page.

### Notifications

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][6] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /infrastructure/process/
[2]: https://app.datadoghq.com/monitors#create/live_process
[3]: /infrastructure/process/#search-syntax
[4]: https://app.datadoghq.com/process
[5]: /monitors/configuration/#advanced-alert-conditions
[6]: /monitors/notify/
[7]: /monitors/configuration/?tab=thresholdalert#evaluation-window
