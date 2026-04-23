---
title: Dashboard List
description: "Organize and manage dashboards with lists"
disable_toc: false
further_reading:
- link: "dashboards/"
  tag: "Documentation"
  text: "Dashboards Overview"
- link: "dashboards/guide/maintain-relevant-dashboards"
  tag: "Guide"
  text: "Best practices for maintaining relevant dashboards"
---

## Overview

Organize and streamline your expanding dashboard collection with Dashboard List features. Group dashboards into lists, assign them to specific teams, and mark important ones as favorites for fast access to key visualizations. Manage dashboard organization further by using functionalities like filtering by Teams, performing bulk actions for efficient management, and assigning Teams to multiple dashboards. Explore, create, and manage custom or integrated dashboards effortlessly on the [Dashboard List page][1].
View and manage your dashboards:
- [Use the {{< ui >}}All Dashboards{{< /ui >}} table to sort, search, and group your lists.](#view-all-dashboards)
- [Organize your dashboard views through lists.](#lists)

## View all dashboards

The {{< ui >}}All Dashboards{{< /ui >}} table lists dashboards in your Datadog organization, either custom created or available as an out-of-the-box dashboard. Select multiple dashboards in the table to conduct bulk actions, such as associating [Teams](#teams) with dashboards or adding dashboards to [lists](#lists).

You can sort by column headers {{< ui >}}Name{{< /ui >}}, {{< ui >}}Modified{{< /ui >}}, and {{< ui >}}Popularity{{< /ui >}}.

| Column     | Description                                                                              |
|------------|------------------------------------------------------------------------------------------|
| Star       | All dashboards starred by the current user.                                              |
| Name       | The name of the custom or preset dashboard.                                              |
| Author     | The profile icon of the dashboard's creator.                                             |
| Teams      | [Teams][2] assigned to the dashboard.                                                    |
| Modified   | The last modified date of a custom dashboard.                                            |
| Popularity | The relative [popularity](#popularity) of the dashboard for your organization.           |
| Icon       | An icon indicating the type of dashboard (Timeboard or Screenboard).                     |


### Popularity

An organization's most popular dashboard displays five popularity bars. All other dashboards are relative to this dashboard. Popularity is based on the amount of traffic a dashboard receives. Popularity is updated daily; new dashboards have zero popularity bars for up to 24 hours.

**Note**: Traffic to public dashboard URLs is ignored for popularity.

## Teams

Use the {{< ui >}}My Teams{{< /ui >}} toggle to switch between viewing all dashboards and only dashboards owned by your [teams][2].

To edit the teams associated with one or more dashboards, take the following steps:
1. Select the checkbox next to each dashboard you wish to modify.
1. Open the {{< ui >}}Edit Teams{{< /ui >}} dropdown in the upper right.
1. Use the checkboxes to select the appropriate teams for the dashboards.
1. Click {{< ui >}}Apply Changes{{< /ui >}}.

## Lists

Dashboard lists groups dashboards so you and your team can switch between dashboards within the same context. You can add dashboards to [preset lists](#preset-lists) or to a custom list.

1. To create a dashboard list, click {{< ui >}}+ New List{{< /ui >}} in the upper right.
1. Click the pencil icon to change a list's title. The list's title is automatically set with the user's first name. For example, `John's list`.
1. Add dashboards to a list. In the [{{< ui >}}All Dashboards{{< /ui >}}](#view-all-dashboards) table, check the checkboxes next to the Dashboard title. Then click the {{< ui >}}Add to{{< /ui >}} dropdown in the upper right corner of the Dashboard list and select the list.

The left sidebar displays all lists, which you can filter by Team or through search terms. Toggle {{< ui >}}Hide Controls{{< /ui >}} to hide this sidebar.

### Favorite lists

Favorite lists are dashboard lists starred by the current logged in user. **Note**: If you have no starred lists, the {{< ui >}}Favorite Lists{{< /ui >}} category is hidden.

### Preset lists

Preset lists are out-of-the-box dashboard lists in Datadog:

| List                     | Description                                                               |
|--------------------------|---------------------------------------------------------------------------|
| All Custom               | Custom dashboards made by any team member in your organization's account. |
| All Hosts                | Automatic dashboards created by Datadog when you add a host.              |
| All Integrations         | Automatic dashboards created by Datadog when you install an integration.  |
| All Shared               | Dashboards with authenticated or public link sharing enabled.             |
| Created By You           | Custom dashboards created by the current user.                            |
| Frequently Viewed By You | All dashboards frequently viewed by the current user.                     |
| Recently Deleted         | Dashboards deleted within the last 30 days. [Restore deleted dashboards](#restore-deleted-dashboards) from this list.|
| Security and Compliance  | Out-of-the-box Security dashboards.                                       |

### Restore deleted dashboards

Use the preset {{< ui >}}Recently Deleted{{< /ui >}} list to restore deleted dashboards. From the list, select all dashboards to restore and click {{< ui >}}Restore to{{< /ui >}}. Select a specific list to restore the dashboards to, or select {{< ui >}}All Custom{{< /ui >}} to restore them without a custom list. Dashboards in {{< ui >}}Recently Deleted{{< /ui >}} are permanently deleted after 30 days.

{{< img src="dashboards/list/recently_deleted_restore.png" alt="Restore deleted dashboard on the Recently Deleted list" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /account_management/teams/
