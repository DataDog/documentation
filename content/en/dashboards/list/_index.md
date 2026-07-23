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
| Recently Deleted         | Dashboards deleted within the last 30 days. [Restore deleted dashboards](#restore-deleted-dashboards) from this list.|
| Security and Compliance  | Out-of-the-box Security dashboards.                                       |

### Restore deleted dashboards

Use the preset {{< ui >}}Recently Deleted{{< /ui >}} list to restore deleted dashboards. From the list, select all dashboards to restore and click {{< ui >}}Restore to{{< /ui >}}. Select a specific list to restore the dashboards to, or select {{< ui >}}All Custom{{< /ui >}} to restore them without a custom list. Dashboards in {{< ui >}}Recently Deleted{{< /ui >}} are permanently deleted after 30 days.

{{< img src="dashboards/list/recently_deleted_restore.png" alt="Restore deleted dashboard on the Recently Deleted list" style="width:100%;">}}

## Search syntax {#search-syntax}

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Dashboard search syntax is in Preview.
{{< /callout >}}

Use the search bar at the top of the Dashboard List page to filter dashboards by name, author, tags, or widget content. The search supports free-text queries, key:value filters, Boolean operators, and range comparisons.

### Free-text search

Type one or more words to search across dashboard titles, descriptions, author names, tags, and widget content.

- **Single token**: `redis` matches dashboards with "redis" in the title, author, tags, or widgets.
- **Multiple tokens**: `redis postgres` is equivalent to `redis AND postgres`—both tokens must appear.
- **Quoted phrase**: `"web latency"` matches that exact phrase.
- **Wildcard**: `elastic*` matches "elasticsearch", "elastic-search", and similar.

### Key:value filters

Narrow results to a specific field using `key:value` syntax.

| Filter | Description | Example |
|--------|-------------|---------|
| `author:<value>` | Dashboards whose author handle or display name matches | `author:jane.doe` |
| `title:<value>` | Dashboard title | `title:elasticsearch` |
| `description:<value>` | Dashboard description | `description:latency` |
| `team:<value>` | Team tag | `team:dashboards-backend` |
| `favorites:true` | Dashboards you have starred | `favorites:true` |
| `type:<value>` | Dashboard type. Use `custom`, `integration`, or concrete values such as `custom_timeboard`, `custom_screenboard`, `integration_timeboard`, `integration_screenboard`. | `type:integration` |
| `is_shared:true` | Dashboards with link sharing enabled | `is_shared:true` |
| `popularity:<range>` | Popularity score (0 to 1) | `popularity:>=0.5` |
| `widgets.count:<range>` | Number of widgets | `widgets.count:<5` |
| `widgets.title:<value>` | Widget title | `widgets.title:cpu` |
| `widgets.type:<value>` | Widget type | `widgets.type:geomap` |
| `widgets.metrics:<value>` | Metric used in a widget | `widgets.metrics:system.cpu.user` |
| `template_variables.name:<value>` | Template variable name | `template_variables.name:service` |
| `template_variables.prefix:<value>` | Template variable prefix | `template_variables.prefix:env` |
| `template_variables.defaults:<value>` | Template variable default value | `template_variables.defaults:prod` |
| `template_variables.available_values:<value>` | Available template variable value | `template_variables.available_values:us-east` |

### Boolean operators

Combine filters with `AND`, `OR`, and `NOT` (case-sensitive). The `-` prefix and `!` prefix are equivalent to `NOT`.

| Operator | Description | Example |
|----------|-------------|---------|
| `AND` | Both conditions must match | `type:integration AND team:platform` |
| `OR` | Either condition must match | `k8s OR kubernetes` |
| `NOT` / `-` / `!` | Exclude matching dashboards | `NOT type:integration` |
| `field:(A OR B)` | Match either value within a single field | `team:(backend OR frontend)` |

### Range operators

Use `<`, `>`, `<=`, and `>=` with numeric fields.

| Filter | Description | Example |
|--------|-------------|---------|
| `widgets.count:<N` | Fewer than N widgets | `widgets.count:<3` |
| `widgets.count:>=N` | N or more widgets | `widgets.count:>=10` |
| `popularity:>=N` | Popularity at or above threshold | `popularity:>=0.2` |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /account_management/teams/
