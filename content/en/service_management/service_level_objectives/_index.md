---
title: Service Level Objectives
kind: documentation
description: "Track the status of your SLOs"
aliases:
- /monitors/monitor_uptime_widget/
- /monitors/slos/
- /monitors/service_level_objectives/
further_reading:
- link: "https://www.datadoghq.com/blog/slo-monitoring-tracking/"
  tag: "Blog"
  text: "Track the status and error budget of your SLOs with Datadog"
- link: "https://learn.datadoghq.com/courses/intro-to-slo"
  tag: "Learning Center"
  text: "Introduction to Service Level Objectives"
- link: "https://www.datadoghq.com/blog/service-page/"
  tag: "Blog"
  text: "Service Telemetry, Error Tracking, SLOs and more"
- link: "https://www.datadoghq.com/blog/monitor-service-performance-with-slo-alerts/"
  tag: "Blog"
  text: "Proactively monitor service performance with SLO alerts"
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/382481078/rendition/1080p/file.mp4?loc=external&signature=f5a81ca1c44d9c1c2cfcbd23c2b6b4f89914027ff344fb0a9f8dc6b9a1d141aa" poster="/images/poster/slo.png" >}}

{{< jqmath-vanilla >}}

<br />

## Overview

Service Level Objectives, or SLOs, are a key part of the site reliability engineering toolkit. SLOs provide a framework for defining clear targets around application performance, which ultimately help teams provide a consistent customer experience, balance feature development with platform stability, and improve communication with internal and external users.

## Key terminology

Service Level Indicator (SLI)
: A quantitative measurement of a service's performance or reliability. In Datadog SLOs an SLI is a metric or an aggregation of one or more monitors.

Service Level Objective (SLO)
: A target percentage for an SLI over a specific period of time.

Service Level Agreement (SLA)
: An explicit or implicit agreement between a client and service provider stipulating the client's reliability expectations and service provider's consequences for not meeting them.

Error Budget
: The allowed amount of unreliability derived from an SLO's target percentage (100% - target percentage) that is meant to be invested into product development.

## Setup

Use Datadog's [Service Level Objectives status page][1] to create new SLOs or to view and manage all your existing SLOs. You can also add [SLO widgets](#slo-widgets) to your dashboards to visualize your SLO statuses at a glance.

### Configuration

1. On the [SLO status page][1], select **New SLO +**.
2. Define the source for your SLO. You can create an SLO from [metrics][2] or [monitors][3].
3. Set a target and a rolling time window (past 7, 30, or 90 days) for the SLO. Datadog recommends you make the target stricter than your stipulated SLAs. If you configure more than one time window, select one to be the primary time window. This time window is displayed on SLO lists. By default, the shortest time window is selected. 
4. Finally, give the SLO a title, describe it in more detail or add links in the description, add tags, and save it.

After you set up the SLO, select it from the [Service Level Objectives list view][1] to open the details side panel. The side panel displays the overall status percentage and remaining error budget for each of the SLO's targets, as well as status bars (monitor-based SLOs) or bar graphs (metric-based SLOs) of the SLI's history. If you created a grouped monitor-based SLO using one [multi alert monitor][4] or a grouped metric-based SLO using the [`sum by` clause][5], the status percentage and remaining error budget for each individual group is displayed in addition to the overall status percentage and remaining error budget.

**Example:** If you create a monitor-based SLO to track latency per availability-zone, the status percentages and remaining error budget for the overall SLO and for each individual availability-zone that the SLO is tracking are displayed.

**Note:** The remaining error budget is displayed as a percentage and is calculated using the following formula:

$$\text"error budget remaining" = 100 * {\text"current status" - \text" target"} / { 100 - \text"target"}$$

### Setting SLO targets

To leverage the benefits of error budgets and error budget alerts, you must set SLO target values strictly below 100%.

Setting a 100% target means having an error budget of 0% since error budget is equal to 100%—SLO target. Without error budget representing acceptable risk, you face difficulty finding alignment between the conflicting priorities of maintaining customer-facing reliability and investing in feature development. In addition, SLOs with target values of 100% lead to division by zero errors in SLO alert evaluation.

**Note:** The number of decimal places you can specify for your SLOs differs depending on the type of SLO and the time windows you choose. Refer to the links below for more information for each respective SLO type.

[Monitor-based SLOs][6]: Up to two decimal places are allowed for 7-day and 30-day targets, up to three decimal places are allowed for 90-day targets.

[Metric-based SLOs][7]: Up to three decimal places are allowed for all targets.

## Edit an SLO

To edit an SLO, hover over the SLO's row in the list view and click the edit pencil icon that appears at the right of the row, or click on the row to open the details side panel and select the edit button from the cog icon in the top right of the panel.

## Permissions

### Role based access

All users can view SLOs and [SLO status corrections](#slo-status-corrections), regardless of their associated [role][8]. Only users attached to roles with the `slos_write` permission can create, edit, and delete SLOs.

To create, edit, and delete status corrections, users require the `slos_corrections` permissions. A user with this permission can make status corrections, even if they do not have permission to edit those SLOs. For the full list of permissions, see the [RBAC documentation][9].

### Granular access controls

Restrict access to individual SLOs by specifying a list of [roles][8] that are allowed to edit it. 

{{< img src="monitors/service_level_objectives/slo_set_permissions.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="SLO permissions option in the cog menu">}}

1. Click on the SLO to open the details side panel. 
1. Click the cog icon in the upper right of the panel. 
1. Select **Permissions**.
1. Click **Restrict Access**.
1. The dialog box updates to show that members of your organization have **Viewer** access by default.
1. Use the drop-down to select one or more roles that may edit the SLO.
1. Click **Add**.
1. The dialog box updates to show that the role you selected has the **Editor** permission.
1. Click **Save**

To maintain your edit access to the SLO, the system requires you to include at least one role that you are a member of before saving. Users on the access control list can add roles and can only remove roles other than their own.

**Note**: Users can create SLOs on any monitor even if they do not have write permissions to the monitor. Similarly, users can create SLO alerts even if they do not have write permissions to the SLO. For more information on RBAC permissions for Monitors, see the [RBAC documentation][10] or the [guide on how to set up RBAC for Monitors][11].

## Searching SLOs

The [Service Level Objectives status page][1] lets you run an advanced search of all SLOs so you can find, view, edit, clone or delete SLOs from the search results.

Advanced search lets you query SLOs by any combination of SLO attributes:

* `name` and `description` - text search
* `time window` - 7d, 30d, 90d
* `type` - metric, monitor
* `creator`
* `tags` - datacenter, env, service, team, etc.

To run a search, use the facet checkboxes on the left and the search bar at the top. When you check the boxes, the search bar updates with the equivalent query. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect the change. Query results update in real-time as you edit the query; there's no 'Search' button to click.

## Viewing SLOs

Group your SLOs by *team*, *service* or *environment* to get a summary view of your data. You can quickly analyze how many SLOs are in each state (breached, warning, OK, and no data), grouped by context.

{{< img src="/monitors/service_level_objectives/slo_group_by.png" alt="Summary view of SLOs grouped by Team" style="width:100%;" >}}

Sort SLOs by the *status* and *error budget* columns to prioritize which SLOs need your attention. The SLO list displays the details of SLOs over the primary time window selected in your [configuration](#configuration). All other configuration time windows are available to view in the individual side panel. Open the SLO details side panel by clicking the respective table row.

**Note**: You can view your SLOs from your mobile device home screen by downloading the [Datadog Mobile App][12], available on the [Apple App Store][13] and [Google Play Store][14].

{{< img src="monitors/service_level_objectives/slos-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="SLOs on iOS and Android">}}

### SLO tags

When you create or edit an SLO, you can add tags for filtering on the [SLO status page][1] or for creating [SLO saved views][15].

Add tags to SLOs in bulk with the *Edit Tags* and the *[Edit Teams][16]* dropdown options at the top of the SLO list.

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

After you query for a subset of SLOs on the list view, you can add that query as a saved view.

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

SLO audit events allow you to track the history of your SLO configurations using the Event Explorer. Audit events are added to the Event Explorer every time you create, modify or delete an SLO. Each event includes information on an SLO's configuration, and the stream provides a history of the SLO's configuration changes over time.

Each event includes the following SLO configuration information:

- Name
- Description
- Target percentages and time windows
- Datasources (monitor IDs or metric query)

Three types of SLO audit events appear in the Event Explorer:

1. `SLO Created` events show all four pieces of SLO configuration information at creation time.
2. `SLO Modified` events show a what configuration information changed during a modification
3. `SLO Deleted` events show all four pieces of configuration information the SLO had right before it was deleted

To get a full list of all SLO audit events, enter the search query `tags:audit,slo` in the Event Explorer. To view the list of audit events for a specific SLO, enter `tags:audit,slo_id:<SLO ID>` with the ID of the desired SLO.

You can also query the Event Explorer programmatically using the [Datadog Events API][17].

**Note:** If you don't see events appear in the UI, be sure to set the time frame of the Event Explorer to a longer period, for example, the past 7 days.

{{< img src="monitors/service_level_objectives/slo-audit-events.png" alt="SLO audit events" >}}

For example, if you wish to be notified when a specific SLO's configuration is modified, set an Event Monitor to track the text `[SLO Modified]` over the tags `audit,slo_id:<SLO ID>`.

{{< img src="monitors/service_level_objectives/slo-event-monitor.png" alt="SLO event monitor" >}}

## SLO widgets

After creating your SLO, you can visualize the data through Dashboards and widgets. 
  - Use the SLO Summary widget to visualize the status of a single SLO.
  - Use the SLO List widget to visualize a set of SLOs
  - Graph 15 months' worth of metric-based SLO data with the [SLO data source][18] in both timeseries and scalar (query value, top list, table, change) widgets. 
  
For more information about SLO Widgets, see the [SLO Summary][19] and [SLO List][20] widget pages. For more information on the SLO data source, see the guide on how to [Graph historical SLO data on Dashboards][18].

To proactively manage the configurations of your SLOs, set an [Event Monitor][21] to notify you when events corresponding to certain tags occur.

## SLO status corrections

Status corrections allow you to exclude specific time periods from SLO status and error budget calculations. This way, you can:
- Prevent expected downtime, such as scheduled maintenance, from depleting your error budget
- Ignore non-business hours, where you're not expected to conform to your SLOs
- Ensure that temporary issues caused by deployments do not negatively impact your SLOs

When you apply a correction, the time period you specify is dropped from the SLO's calculation.
- For monitor-based SLOs, the correction time window is not counted.
- For metric-based SLOs, all good and bad events in the correction window are not counted.

You have the option to create one-time corrections for ad hoc adjustments, or recurring corrections for predictable adjustments that occur on a regular cadence. One-time corrections require a start and end time, while recurring corrections require a start time, duration, and interval. Recurring corrections are based on [iCalendar RFC 5545's RRULE specification][22]. The supported rules are `FREQ`, `INTERVAL`, `COUNT`, and `UNTIL`. Specifying an end date for recurring corrections is optional in case you need the correction to repeat indefinitely. 

For either type of correction, you must select a correction category that states why the correction is being made. The available categories are `Scheduled Maintenance`, `Outside Business Hours`, `Deployment`, and `Other`. You can optionally include a description to provide additional context if necessary.

Each SLO has a maximum limit of corrections that can be configured to ensure query performance. These limits only apply to the past 90 days per SLO, so corrections for time periods before the past 90 days do not count towards your limit. This means that:
- If the end time of a one-time correction is before the past 90 days, it does count towards your limit.
- If the end time of the final repetition of a recurring correction is before the past 90 days, it does not count towards your limit.

The 90-day limits per SLO are as follows:

| Correction Type   | Limit per SLO |
| ----------------- | ------------- |
| One-time          | 100           |
| Daily recurring   | 2             |
| Weekly recurring  | 3             |
| Monthly recurring | 5             |

You may configure status corrections through the UI by selecting `Correct Status` in your SLO's side panel, the [SLO status corrections API][23], or a [Terraform resource][24].

{{< img src="monitors/service_level_objectives/slo-corrections-ui.png" alt="SLO correction UI" >}}

#### Access in the UI

To access SLO status corrections in the UI:

1. Create a new SLO or click on an existing one.
2. Navigate to an SLO's details side panel view.
3. Under the gear icon, select **Correct Status** to access the **Status Corrections** creation modal.
4. Choose between `One-Time` and `Recurring` in the **Select the Time Correction Window**, and specify the time period you wish to correct.
5. Select a **Correction Type**.
6. Optionally add **Notes**.
7. Click **Apply Correction**.

To view, edit, and delete existing status corrections, click on the **Corrections** tab at the top of an SLO's detailed side panel view.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: /service_management/service_level_objectives/metric/
[3]: /service_management/service_level_objectives/monitor/
[4]: /monitors/types/metric/?tab=threshold#alert-grouping
[5]: /service_management/service_level_objectives/metric/#define-queries
[6]: /service_management/service_level_objectives/monitor/#set-your-slo-targets
[7]: /service_management/service_level_objectives/metric/#set-your-slo-targets
[8]: /account_management/rbac/
[9]: /account_management/rbac/permissions/#service-level-objectives/
[10]: /account_management/rbac/permissions/#monitors
[11]: /monitors/guide/how-to-set-up-rbac-for-monitors/
[12]: /mobile
[13]: https://apps.apple.com/app/datadog/id1391380318
[14]: https://play.google.com/store/apps/details?id=com.datadog.app
[15]: /service_management/service_level_objectives/#saved-views
[16]: /account_management/teams/#associate-resources-with-team-handles
[17]: /api/latest/events/
[18]: /dashboards/guide/slo_data_source/
[19]: /dashboards/widgets/slo/
[20]: /dashboards/widgets/slo_list/
[21]: /monitors/types/event/
[22]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[23]: /api/latest/service-level-objective-corrections/
[24]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/slo_correction
