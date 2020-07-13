---
title: Service Level Objectives
kind: documentation
description: "Track the status of your SLOs"
aliases:
  - /monitors/monitor_uptime_widget/
  - /monitors/slos/
further_reading:
- link: "https://www.datadoghq.com/blog/slo-monitoring-tracking/"
  tag: "Blog"
  text: "Track the status of your SLOs with the new monitor uptime widget"
- link: "https://learn.datadoghq.com/enrol/index.php?id=30"
  tag: "Learning Center"
  text: "Introduction to Service Level Objectives (SLOs)"
---

{{< vimeo 382481078 >}}

<br />

## Overview

Service Level Objectives, or SLOs, are a key part of the site reliability engineering toolkit. SLOs provide a
framework for defining clear targets around application performance, which ultimately help teams provide a consistent customer experience, balance feature development with platform stability, and improve communication with internal and external users.

## Setup

Use the SLO and uptime widget to track your SLOs (Service Level Objectives) and uptime on screenboards and timeboards. You can use SLO by adding a widget to a dashboard, or by going to Datadog’s [Service Level Objectives status page][1] to create new SLOs and view all existing ones. Select an existing SLO from the dropdown and display it on any dashboard.

*Uptime* is defined as the amount of time a monitor was in an *up* state (OK) compared to *down* state (non-OK). The status is represented in bars as green (up) and red (down). Example: ’99 % of the time latency is less than 200ms.`

You can also track success rate and metric-based SLIs (Service Level Indicators). Example: `99 % of requests are successful.`

### Configuration

1. On the [SLO status page][1], select **New SLO +**.
2. Define the source for your SLOs. SLO types are [Metric-based][2] and [Monitor-based][3].
3. Set your target uptime. Available windows are: 7 days, month-to-date, 30 days (rolling), Previous Month, and 90 days (rolling). For 7 days, the widget is restricted to two decimal places. For 30 days and up, it’s restricted to two to three decimal places.
4. Finally, give the SLO a title, describe it in more detail, add tags, and save it.

Once you have monitors set up, on the [Service Level Objectives status page][1], you can view the overall uptime percentage only—or the overall percentage, plus the uptime for each monitor.

## Edit an SLO

To edit an SLO, hover over the SLO on the right, and click the edit pencil icon.

## Searching SLOs

The [Service Level Objectives status page][1] lets you run an advanced search of all SLOs so you can view, delete or edit service tags for selected SLOs in bulk. You can also clone or fully edit any individual SLO in the search results.

Advanced search lets you query SLOs by any combination of SLO attributes:

* `name` and `description` - text search
* `time window` - *, 7d, 30d, 90d
* `type` - metric, monitor
* `creator`
* `tags` - datacenter, env, service, team, etc.

To run a search, use the checkboxes on the left and the search bar. When you check the boxes, the search bar updates with the equivalent query. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect the change. Query results update in real-time as you edit the query; there's no 'Search' button to click.

To edit an individual SLO, hover over it and use the buttons to the far right in its row: **Edit**, **Clone**, **Delete**. To see more detail on a SLO, click its table row to visit its status page.

### SLO Tags

When you create or edit an SLO, you can add tags for filtering on the [SLO status page][1].

### Overall Uptime Calculation

{{< img src="monitors/service_level_objectives/overall_uptime_calculation.png" alt="overall uptime calculation"  >}}

The overall uptime can be considered as a percentage of the time where **all** monitors are in the `OK` state. It is not the average of the aggregated monitors.

Consider the following example for 3 monitors:

| Monitor            | t1 | t2 | t3    | t4 | t5    | t6 | t7 | t8 | t9    | t10 | Uptime |
|--------------------|----|----|-------|----|-------|----|----|----|-------|-----|--------|
| Monitor 1          | OK | OK | OK    | OK | ALERT | OK | OK | OK | OK    | OK  | 90%    |
| Monitor 2          | OK | OK | OK    | OK | OK    | OK | OK | OK | ALERT | OK  | 90%    |
| Monitor 3          | OK | OK | ALERT | OK | ALERT | OK | OK | OK | OK    | OK  | 80%    |
| **Overall Uptime** | OK | OK | ALERT | OK | ALERT | OK | OK | OK | ALERT | OK  | 70%    |

This can result in the overall uptime being lower than the average of the individual uptimes.

## View your SLOs

You can view, edit your SLO and its properties and see the status over time and the history of your SLO from the [SLO status page][1].

### SLO Default View

The default SLO view is loaded when you land on the SLO list view.

The default view includes:

- An empty search query
- A list of all defined SLOs in your organization
- A list of available facets in left side facet list

### Saved Views

Saved views allow you to save and share customized searches in the SLO list view for SLOs that are most relevant for you and your team by sharing:

- A search query
- A selected subset of facets

After you query for a subset of SLOs on the list view, you can now add that query as a saved view.

#### Add a saved view

To add a saved view:

1. Query for your SLOs.
2. Click *Save View* at the top.
3. Name your view and save.

#### Load a Saved View

To load a saved view, open the *Saved Views* panel at the top of the page and select. You can also search for views in the *Filter Saved Views* search box.

#### Saved Views selection

Star saved views to mark them as favorites.

#### Share a Saved View

Copy-paste a saved view short-link to share it with your teammates.

#### Manage Saved Views

To create a new saved view, click the *Save as* button at the top of the screen. Give it a name and click *Save*. Once you are using a saved view, you can update it by selecting that view, modifying the query, and clicking *Update*.

Saved Views can be deleted directly from the Saved View list. Hover over the name of the saved view to reveal its delete button. Click on it and confirm.

## SLO Widgets

After creating your SLO, you can use the SLO dashboard widget to visualize the status of your SLOs along with your dashboard metrics, logs and APM data. For more information about SLO Widgets, see the [SLO Widgets documentation][4] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: /monitors/service_level_objectives/metric/
[3]: /monitors/service_level_objectives/monitor/
[4]: /dashboards/widgets/slo/
