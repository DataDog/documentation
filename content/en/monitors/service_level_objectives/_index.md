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
  text: "Track the status and error budget of your SLOs with Datadog"
- link: "https://learn.datadoghq.com/course/view.php?id=34"
  tag: "Learning Center"
  text: "Introduction to Service Level Objectives (SLOs)"
---

{{< vimeo 382481078 >}}

<br />

## Overview

Service Level Objectives, or SLOs, are a key part of the site reliability engineering toolkit. SLOs provide a
framework for defining clear targets around application performance, which ultimately help teams provide a consistent customer experience, balance feature development with platform stability, and improve communication with internal and external users.

## Key terminology
*Service Level Indicator (SLI)* - a quantitative measurement of a service’s performance or reliability (in Datadog SLOs an SLI is a metric or an aggregation of one or more monitors)

*Service Level Objective (SLO)* - a target percentage for an SLI over a specific period of time

*Service Level Agreement (SLA)* - an explicit or implicit agreement between a client and service provider stipulating the client’s reliability expectations and service provider’s consequences for not meeting them

*Error Budget* - the allowed amount of unreliability derived from an SLO’s target percentage (100% - target percentage) that is meant to be invested into product development

## Setup

You can use Datadog’s [Service Level Objectives status page][1] to create new SLOs or to view and manage all your existing SLOs. You can also add [SLO Summary widgets][2] to your dashboards to visualize your SLO statuses at a glance.

### Configuration

1. On the [SLO status page][1], select **New SLO +**.
2. Define the source for your SLOs. SLO types are [Metric-based][3] and [Monitor-based][4].
3. Set up to three SLO targets. Each target consists of a target percentage and a rolling time window. Available time windows are: 7 days, 30 days, and 90 days. It is recommended that you make the SLO target percentage stricter than the target percentages stipluated in your SLAs.
4. Finally, give the SLO a title, describe it in more detail or add links in the description, add tags, and save it.

**Note:** The number of decimal places you can specify for your SLOs differs depending on the type of SLO and the time windows you choose. Refer to the links below for more information for each respective SLO type.

[Monitor-based SLOs][10]: up to 2 decimal places are allowed for 7-day and 30-day targets, up to 3 decimal places are allowed for 90-day targets.
[Metric-based SLOs][11]: up to 3 decimal places are allowed for all targets.

Once you have an SLO set up, on the [Service Level Objectives status page][1] you can select an SLO from the list view to open its details side panel. The side panel will display the overall status percentage and remaining error budget for each of that SLO's targets, as well as status bars (monitor-based SLOs) or bar graphs (metric-based SLOs) of the SLI's history. If you have created a grouped monitor-based SLO using one [multi alert monitor][5] or a grouped metric-based SLO using the [`sum by` clause][6], in addition to the overall status percentage and remaining error budget you will also be presented with the status percentage and remaining error budget for each individual group.

**Example:** If you create a monitor-based SLO to track latency per availability-zone, you will see status percentages and remaining error budget for the overall SLO and for each individual availability-zone that the SLO is tracking.

## Edit an SLO

To edit an SLO, hover over the SLO's row in the list view and click the edit pencil icon that will appear at the right of the row, or click on the row to open the details side panel and select the edit button from the cog icon in the top right of the panel.

## Searching and viewing SLOs

The [Service Level Objectives status page][1] lets you run an advanced search of all SLOs so you can find, view, edit, clone or delete SLOs from the search results.

Advanced search lets you query SLOs by any combination of SLO attributes:

* `name` and `description` - text search
* `time window` - 7d, 30d, 90d
* `type` - metric, monitor
* `creator`
* `tags` - datacenter, env, service, team, etc.

To run a search, use the facet checkboxes on the left and the search bar at the top. When you check the boxes, the search bar updates with the equivalent query. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect the change. Query results update in real-time as you edit the query; there's no 'Search' button to click.

To edit an individual SLO, hover over it and use the buttons that appear at the right of its row: **Edit**, **Clone**, **Delete**. To see more details on a SLO, click its table row to open its details side panel.

### SLO tags

When you create or edit an SLO, you can add tags for filtering on the [SLO status page][1] or for creating [SLO saved views][7].

### SLO default view

The default SLO view is loaded when you land on the SLO list view.

The default view includes:

- An empty search query
- A list of all defined SLOs in your organization
- A list of available facets in left side facet list

### Saved views

Saved views allow you to save and share customized searches in the SLO list view for SLOs that are most relevant for you and your team by sharing:

- A search query
- A selected subset of facets

After you query for a subset of SLOs on the list view, you can now add that query as a saved view.

#### Add a saved view

To add a saved view:

1. Query for your SLOs.
2. Click **Save View +** at the top left of the page.
3. Name your view and save.

#### Load a saved view

To load a saved view, open the *Saved Views* panel by pressing the **Show Views** button at the top left of the page and select a saved view from the list. You can also search for saved views in the *Filter Saved Views* search box at the top of that same *Saved Views* panel.

#### Share a saved view

Hover over a saved view from the list and select the hyperlink icon to copy the link to the saved view to share it with your teammates.

#### Manage saved views

Once you are using a saved view, you can update it by selecting that saved view, modifying the query, and clicking the *Update* button below its name in the *Saved Views* panel. To change the saved view's name or delete a saved view, hover over its row in the *Saved Views* panel and click the pencil icon or trash can icon, respectively.

## SLO audit events

SLO audit events allow you to track the history of your SLO configurations using the Event Stream. Audit events are added to the Event Stream every time you create, modify or delete an SLO. Each event includes information on an SLO's configuration, and the stream provides a history of the SLO's configuration changes over time.

Each event includes the following SLO configuration information:

- Name
- Description
- Target percentages and time windows
- Datasources (monitor IDs or metric query)

Three types of SLO audit events appear in the Event Stream:

1. `SLO Created` events show all four pieces of SLO configuration information at creation time.
2. `SLO Modified` events show a what configuration information changed during a modification
3. `SLO Deleted` events show all four pieces of configuration information the SLO had right before it was deleted

To get a full list of all SLO audit events, enter the search query `tags:audit,slo` in the Event Stream. To view the list of audit events for a specific SLO, enter `tags:audit,slo_id:<SLO ID>` with the ID of the desired SLO.

You can also query the Event Stream programmatically using the [Datadog Events API][8].

**Note:** If you don't see events appear in the UI, be sure to set the time frame of the Event Stream to a longer period, for example, the past 7 days.

{{< img src="monitors/service_level_objectives/slo-audit-events.png" alt="SLO audit events"  >}}

To proactively manage the configurations of your SLOs, set an [Event Monitor][9] to notify you when events corresponding to certain tags occur.

For example, if you wish to be notified when a specific SLO's configuration is modified, set an Event Monitor to track the text `[SLO Modified]` over the tags `audit,slo_id:<SLO ID>`.

{{< img src="monitors/service_level_objectives/slo-event-monitor.png" alt="SLO event monitor"  >}}

## SLO widgets

After creating your SLO, you can use the SLO Summary dashboard widget to visualize the status of an SLO along with your dashboard metrics, logs and APM data. For more information about SLO Widgets, see the [SLO Widgets documentation][2] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: /dashboards/widgets/slo/
[3]: /monitors/service_level_objectives/metric/
[4]: /monitors/service_level_objectives/monitor/
[5]: /monitors/monitor_types/metric/?tab=threshold#alert-grouping
[6]: /monitors/service_level_objectives/metric/#define-queries
[7]: /monitors/service_level_objectives/#saved-views
[8]: /api/v1/events/#query-the-event-stream
[9]: /monitors/monitor_types/event/
[10]: /monitors/service_level_objectives/monitor/#set-your-slo-targets
[11]: /monitors/service_level_objectives/metric/#set-your-slo-targets
