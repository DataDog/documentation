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

Live process monitors are based on data collected by the [Process Agent][1]. Create monitors that warn or alert based on the count of any group of processes across hosts or tags.

Live Process Monitors work best in the following use cases:

-  Making sure that enough instances of a process exist in a non-containerized application.
-  Making sure that specific unwanted processes are never seen.

## Monitor creation

To create a [live process monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> Live Process*.

### Select processes

You can use either tags or a fuzzy search to filter across all processes in your infrastructure. Matching processes and counts are displayed below the search:

{{< img src="monitors/monitor_types/process/select_processes.png" alt="Select processes" style="width:90%;">}}

After defining your search, a graph is displayed above the search inputs with an approximation of the total number of processes found. For more granular data, visit your [Live Process Page][4].

#### Tags search
Filter processes to monitor by their tags.

Datadog recommends that you first try to filter processes by their tags. If you cannot scope processes down to the required granularity using tags, then we recommend using full text search.

 #### Full text search

If you cannot scope processes down to the granularity you would like using tags, it is possible to search for a process to monitor using a space separated list of strings. The search performs a partial match, fuzzy search across all processes on your infrastructure. Search operators `AND`, `OR`, `NOT` are supported. Datadog recommends that you put quotation marks around each of your search terms. This can prevent issues like `-` getting picked up as `NOT` and spaces from being picked up as `OR`. See the [Live Process Monitoring][3] page for more details.

##### Examples

| Example Query | Explanation |
|---|---|
| `foo AND bar` | Matches any process whoose commandline contains both `foo` and `bar` |
| `foo AND NOT bar` | Matches any process whoose commandline contains `foo` but not `bar`. |
| `foo OR bar` | Matches any process that contains `foo` or `bar`. |
| `foo bar` | Same as above. |
| `foo or NOT bar` | Matches any process that contains `foo` or does not contain `bar`. |
| `foo -bar` | Same as above. |
| `"foo -bar"` | Matches any process that contains the string `foo -bar`. |

#### Alert grouping

`Simple Alert` (default): aggregates alerts over all reporting sources. You receive one alert when the aggregated value meets the set conditions.

`Multi Alert`: applies the alert to each source according to your group parameters. You receive an alert for each group that meets the set conditions.

### Set alert conditions

* The count was `above`, `above or equal to`, `below`, or `below or equal to`
* the threshold during the last `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between 5 minutes and 24 hours.

Use thresholds to set a numeric value for triggering an alert. Datadog has two types of notifications (alert and warning). Live process monitors recover automatically based on the alert or warning threshold.

#### Best practices for timeframe selection
Our recommendation is to pick the largest timeframe that you can support. This allows for additional fault tolerance in the case where a process agent encounters network issues.

Datadog recommends to always choose a timeframe that is 5 minutes or larger. This is because a network disruption or clock drift can cause 1 minute monitors to produce false positives. As a result, datadog plans on eventually phasing out 1 minute monitors.

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
