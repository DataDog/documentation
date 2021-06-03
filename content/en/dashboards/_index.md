---
title: Dashboards
kind: documentation
aliases:
    - /guides/templating/
    - /graphing/dashboards/
    - /guides/graphing
    - /graphing/miscellaneous/metrics_arithmetic
    - /graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
    - /graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
    - /graphing/
description: Visualize your data to gain insight
further_reading:
- link: "/dashboards/template_variables/"
  tag: "Documentation"
  text: "Enhance your Dashboards with Template Variables"
- link: "https://www.datadoghq.com/blog/template-variable-associated-values/"
  tag: "Blog"
  text: "Use associated template variables to refine your dashboards"
- link: "/dashboards/sharing/"
  tag: "Documentation"
  text: "Share your Graphs outside of Datadog"
- link: "/dashboards/widgets/"
  tag: "Documentation"
  text: "Discover all available Widgets for your Dashboard"
- link: "/mobile/#dashboards"
  tag: "Documentation"
  text: "View your Dashboards on the Mobile App"
- link: "https://www.datadoghq.com/blog/datadog-clipboard/"
  tag: "Blog"
  text: "Add Dashboard widgets to your clipboard"
- link: "https://www.datadoghq.com/blog/datadog-dashboards/"
  tag: "Blog"
  text: "The new Datadog dashboards experience"
---

## Overview

A dashboard is Datadog's tool for visually tracking, analyzing, and displaying key performance metrics, which enable you to monitor the health of your infrastructure.

## Dashboard list

Search, view, or create dashboards and lists on the [Dashboard List][1] page. By default, this is the landing page after you login to Datadog. To change the default landing page for your organization, contact [Datadog support][2].

{{< img src="dashboards/dashboard_list2.png" alt="Dashboard List page"  >}}

### New list

To create a dashboard list, click on the **New List +** button in the upper right.

The list's title is automatically set with the user's first name. For example, if John Doe creates a dashboard, the default title is `John's list`. To change a list's title, click on the title for the text to become editable.

To add dashboards to a list, select their corresponding check boxes in the main Dashboard list. Then click on the *Add to List* button in the upper right corner of the Dashboard list:

{{< img src="dashboards/dash_to_list.png" alt="Add Dashboard to list"  style="width:70%;">}}

### Lists

The left sidebar displays favorite, preset, and shared, editable lists. You can hide this sidebar using the **Hide Controls** link.

#### Favorite lists

Favorite lists are dashboard lists starred by the current logged in user. **Note**: If you have no starred lists, the *Favorite Lists* category is hidden.

#### Preset lists

Preset lists are default dashboard lists in Datadog:

| List                     | Description                                                               |
|--------------------------|---------------------------------------------------------------------------|
| All Custom               | Custom dashboards made by any team member in your organization's account. |
| All Hosts                | Automatic dashboards created by Datadog when you add a host.              |
| All Integrations         | Automatic dashboards created by Datadog when you install an integration.  |
| Created By You           | Custom dashboards created by the currently logged in user.                |
| Frequently Viewed By You | All dashboards frequently viewed by the currently logged in user.         |

#### Shared, editable lists

This section displays shared, editable dashboard lists with the number of dashboards in each list.

### All dashboards

All dashboards listed are sortable using the column headers *Star*, *Name*, *Modified*, and *Popularity*. All columns with descriptions are listed below:

| Column     | Description                                                                              |
|------------|------------------------------------------------------------------------------------------|
| Star       | All dashboards starred by the currently logged in user.                                  |
| Icon       | An icon indicating the type of dashboard (timeboard or screenboard).                     |
| Name       | The name of the custom or preset dashboard.                                              |
| Modified   | The last modified date of a custom dashboard.                                            |
| Popularity | The relative [popularity](#popularity) of the dashboard for your organization.           |
| Creator    | The profile icon of the dashboard's creator. Preset dashboards use the integration logo. |

#### Popularity

An organization's most popular dashboard displays five popularity bars. All other dashboards are relative to this dashboard. Popularity is based on the amount of traffic a dashboard receives. Popularity is updated daily; new dashboards have zero popularity bars for up to 24 hours.

**Note**: Traffic to public dashboard URLs is ignored for popularity.

## New dashboard


To create a dashboard, click on the **New Dashboard +** button in the upper right. Enter a dashboard name and choose a layout option.

{{< img src="dashboards/create-dashboard.jpeg" alt="Adding a new dashboard"  style="width:70%;">}}

### Dashboard layout

<div class="alert alert-warning">The Dashboard layout is in public beta. Screenboards and Timeboards remain the same.</div>

The Dashboard layout uses a flexible, grid-based system that combines the simplicity of Timeboards and the control of Screenboards. To understand the difference between layout options, consider the following:

#### Dashboards, timeboards, and screenboards
 
|                                                                   | Dashboards | Timeboards                                            | Screenboards |
|-------------------------------------------------------------------|------------|-------------------------------------------------------|--------------|
| Widgets maintain position and can be flexibly sized               | Yes        | No                                                    | Yes          |
| Widgets scale depending on screen-size                            | Yes        | Yes                                                   | No           |
| Group actions (copy, move, delete) available on multiple widgets  | Yes        | No                                                    | Yes          |
| “Group” supported                                                 | Yes        | Yes                                                   | No           |
| All widget types supported                                        | Yes        | No                                                    | Yes          |
| Graphs can have individual time scopes                            | Yes        | No                                                    | Yes          |
| TV mode fits the entire dashboard on-screen                       | Yes        | No (dashboard scrolls in TV mode)                     | Yes          |
| Legends are optional                                              | Yes        | No (legends appear automatically based on graph size) | Yes          |


#### High-density mode

High-density mode displays the top and bottom halves of a dashboard side-by-side for increased widget density. This mode turns on by default for large screens.

{{< img src="dashboards/high-density-mode.png" alt="The high-density mode display"  style="width:70%;">}}

### Copy / import / export

From an individual dashboard, you can copy, import, or export a dashboard's JSON using the settings cog (upper right) with the following options:

| Option                          | Description                                                                                                                                                                |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Copy&nbsp;dashboard&nbsp;JSON   | Copy the dashboard's JSON to your clipboard.                                                                                                                               |
| Import&nbsp;dashboard&nbsp;JSON | Paste or import your JSON to the dashboard. This option overwrites all content on the dashboard. If the JSON is already on your clipboard, use `Ctrl V` (`Cmd V` for Mac). |
| Export&nbsp;dashboard&nbsp;JSON | Download a JSON file containing the JSON of your dashboard.                                                                                                                |

{{< img src="dashboards/copy_dashboard.png" alt="Copy dashboard"  style="width:30%;">}}

### Suggested dashboards and active users

From an individual dashboard, Datadog offers suggestions for viewing related dashboards. To view suggested dashboards and active users, click on the caret icon next to the dashboard title. These dashboards are recommended based on the user activity in your organization and how often users go from this dashboard to other existing dashboards. You can also add or update Markdown-supported dashboard descriptions in this view by clicking `edit`.

{{< img src="dashboards/suggested_dashboards.png" alt="Suggested dashboards" >}}

### Restrict access

<div class="alert alert-warning">
RBAC restrict access to dashboards is currently in beta. To request access, contact <a href="https://docs.datadoghq.com/help/">Datadog support</a>.</div>

Click the settings modal for the whole dashboard, and select *Permissions*. Use the pop up to restrict access to you, everyone in your org with your role, or to specific roles in your org. For more information about roles, see the [RBAC][3] documentation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /help/
[3]: /account_management/rbac/
