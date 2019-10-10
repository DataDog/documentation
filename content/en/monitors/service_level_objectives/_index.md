---
title: Service Level Objectives
kind: documentation
description: "Track the status of your SLOs"
disable_toc: true
aliases:
  - /monitors/monitor_uptime_widget/
  - /monitors/slos/
further_reading:
- link: "https://www.datadoghq.com/blog/slo-monitoring-widget/"
  tag: "Blog"
  text: "Track the status of your SLOs with the new monitor uptime widget"
---

## Overview

Service Level Objectives, or SLOs, are a key part of the site reliability engineering toolkit. SLOs provide a 
framework for defining clear targets around application performance, which ultimately help teams provide a consistent 
customer experience, balance feature development with platform stability, and improve communication with internal and 
external users.

## Setup

Use the SLO and uptime widget to track your SLOs (Service Level Objectives) and uptime on screenboards and timeboards. You can use SLO by adding a widget to a dashboard, or by going to Datadog’s [Service Level Objectives page][1] to create new SLOs and view all existing ones. Select an existing SLO from the dropdown and display it on any dashboard.

*Uptime* is defined as the amount of time a monitor was in an *up* state (OK) compared to *down* state (non-OK). The status is represented in bars as green (up) and red (down). Example: ’99 % of the time latency is less than 200ms.`

You can also track success rate and event-based SLIs (Service Level Indicators). Example: `99 % of requests are successful.`

{{< img src="monitors/slo/create-slo.png" alt="create a slo" responsive="true" >}}

### Configuration

1. On the [SLO page][1], select **New SLO +**.
2. Define the source for your monitors. Monitor types are [Event based][6] and [Monitor based][5].
3. Set your target uptime. Available windows are: 7 days, month-to-date, 30 days (rolling), Previous Month, and 90 days (rolling). For 7 days, the widget is restricted to two decimal places. For 30 days and up, it’s restricted to two to three decimal places.
4. Finally, give the SLO a title and save it.

Once you have monitors set up, on the [main Service Level Objectives page][1], you can view the overall uptime percentage only—or the overall percentage, plus the uptime for each monitor.

{{< img src="monitors/slo/slo-overview.png" alt="slo main page" responsive="true" >}}

## Edit an SLO

To edit an SLO, hover over the SLO on the right, and click the edit pencil icon.

## Searching SLOs

The [List Service Level Objectives][4] page lets you run an advanced search of all SLOs so you can view, delete or edit service tags for selected SLOs in bulk. You can also clone or fully edit any individual SLO in the search results.

{{< img src="service_level_objectives/edit_slo/edit_slo_page.png" alt="edit slo page" responsive="true" >}}

Advanced search lets you query SLOs by any combination of SLO attributes:

* `name` and `description` - text search
* `time window` - *, 7d, 30d, 90d
* `type` - metric, monitor
* `creator`
* `id`
* `service` - tags
* `team` - tags
* `env` - tags

To run a search, use the checkboxes on the left and the search bar. When you check the boxes, the search bar updates with the equivalent query. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect the change. Query results update in real-time as you edit the query; there's no 'Search' button to click.

To edit an individual SLO, hover over it and use the buttons to the far right in its row: Edit, Clone, Delete. To see more detail on a SLO, click its table row to visit its status page.

{{< img src="service_level_objectives/edit_slo/edit-slo-hover-clone.png" alt="edit-slo-hover-clone" responsive="true" style="width:80%;" >}}

### SLO Tags

{{< img src="service_level_objectives/edit_slo/slo-tags.png" alt="Monitor tags" responsive="true" style="width:30%;" >}}

You can add tags directly to your SLOs for filtering on the [list SLOs][4] pages.

### Overall Uptime Calculation

{{< img src="monitors/slo/overall_uptime_calculation.png" alt="overall uptime calculation" responsive="true" >}}

The overall uptime result calculated for a time `T_x` can be expressed using boolean logic as the logical conjunction (the `AND` conjunction) of all of the monitor states at time `T_x`.

If at time `T_x` the state of all monitors `[m0, ..., m_n]` are all in `OK` state, then the overall uptime for time `T_x` will be the `OK` state. However, if any number of monitors at time `T_x` have state `ALERT`, then the overall uptime for time `T_x` will be the `ALERT` state.

Consider the following example:

| Monitor            | t0 | t1 | t2    | t3 | t4    | t5 | t6 | t7 | t8 | t9 | t10   |
|--------------------|----|----|-------|----|-------|----|----|----|----|----|-------|
| m0                 | OK | OK | OK    | OK | ALERT | OK | OK | OK | OK | OK | ALERT |
| m1                 | OK | OK | OK    | OK | OK    | OK | OK | OK | OK | OK | ALERT |
| m2                 | OK | OK | ALERT | OK | ALERT | OK | OK | OK | OK | OK | ALERT |
| **Overall Uptime** | OK | OK | ALERT | OK | ALERT | OK | OK | OK | OK | OK | ALERT |

## View your SLOs

You can view, edit your SLO and its properties and see the status over time and the history of your SLO from the [SLO status page][4].

{{< img src="service_level_objectives/slo_status/status_slo_history.mp4" alt="status slo history" video="true" responsive="true" width="80%" >}}

## SLO Widgets

After creating your SLO, you can use the SLO dashboard widget to visualize the status of your SLOs along with your dashboard metrics, logs and APM data. For more information about SLO Widgets, see the [SLO Widgets documentation][7] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo/new
[2]: /api/#servicelevelobjectives
[3]: /developers/libraries/#managing-service-level-objectives
[4]: https://app.datadoghq.com/slo
[5]: /monitors/service_level_objectives/monitor/
[6]: /monitors/service_level_objectives/event/
[7]: /graphing/widgets/slo/
