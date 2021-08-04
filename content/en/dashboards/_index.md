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

**Note**: View Dashboards with the [Datadog Mobile App][1], available on the [Apple App Store][2] and [Google Play Store][3].

## New dashboard

To create a dashboard, click on **+New Dashboard** on the [dashboard list[1] page], or click **New Dashboard** from the navigation menu. Enter a dashboard name and choose a layout option.

{{< img src="dashboards/create-dashboard.png" alt="Adding a new dashboard" style="width:70%;">}}

### Dashboards
[Dashboards][4] are on a next-gen grid based layout which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling view, which update in real-time and can represent fixed points in the past. They also work well for debugging.

### Timeboards
[Timeboards][5] have automatic layouts, and represent a single point in time—either fixed or real-time—across the entire dashboard. They are commonly used for troubleshooting, correlation, and general data exploration.

### Screenboards
[Screenboards][6] are dashboards with free-form layouts which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling views that update in real-time or represent fixed points in the past.

## Configuring dashboards

### Global time selector
To use the global time selector, at least one time-based widget must be set to use `Global Time`. Make the selection in the widget editor under **Set display preferences**, or add a widget (global time is the default time setting).

The global time selector sets the same time frame for all widgets using the `Global Time` option on the same dashboard. Select a moving window in the past (`Past 1 Hour`, `Past 1 Day`, etc.) or a fixed period with the `Select from calendar…` option or [enter a custom time frame][7]. If a moving window is chosen, the widgets are updated to move along with the time window.

Widgets not linked to global time show the data for their local time frame as applied to the global window. For example, if the global time selector is set to January 1, 2019 through January 2, 2019, a widget set with the local time frame for `Past 1 Minute` shows the last minute of January 2, 2019 from 11:59 pm.

### TV mode

Dashboards are useful for displaying key performance metrics on large screens or TVs. To enable TV mode, use the keyboard shortcut `F` or click the TV icon on the dashboard.

### Settings

#### Generate public URL

Share a dashboard with external users by generating a public URL. For more details, see [sharing dashboards][8].

#### Display UTC time

Toggle between UTC time and your default time zone.

#### Notifications

If notifications are activated for a dashboard, an event is created in the [event stream][9]. This event provides information on text changes, widget changes, dashboard cloning, and dashboard deletion along with the name of the user performing the action.

Additionally, individual users who activate the notification receive an email alert. Any user in the organization, regardless of administrative privileges, can sign up to receive change notifications for a dashboard.

Change events for dashboards with notifications enabled are seen in the event stream by searching:

```text
tags:audit,dash
```

To limit the search to a specific dashboard, include the dashboard's name in the search.

#### Permissions

For a dashboard, the creator or any [administrator][10] can activate read-only mode, which disables all non-admin edits to the dashboard.

In read-only mode, non-administrative users can clone the dashboard, rearrange tiles, snapshot a tile, and view a tile in full-screen. Any tile rearrangement by a non-administrative user does not persist.

#### Clone dashboard

Use this option to copy the entire dashboard to a new dashboard. You are prompted to name the clone.

#### Copy, import, or export dashboard JSON

From an individual dashboard, copy, import, or export a dashboard's JSON using the settings cog (upper right) with the following options:

| Option                          | Description                                                                                                                                                                |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Copy&nbsp;dashboard&nbsp;JSON   | Copy the dashboard's JSON to your clipboard.                                                                                                                               |
| Import&nbsp;dashboard&nbsp;JSON | Paste or import your JSON to the dashboard. This option overwrites all content on the dashboard. If the JSON is already on your clipboard, use `Ctrl V` (`Cmd V` for Mac). |
| Export&nbsp;dashboard&nbsp;JSON | Download a JSON file containing the JSON of your dashboard.                                                                                                                |

{{< img src="dashboards/copy_dashboard.png" alt="Copy dashboard" style="width:30%;">}}

#### Delete dashboard

Use this option to permanently delete your dashboard. You are prompted to confirm deletion.

## Suggested dashboards and active users

From an individual dashboard, Datadog offers suggestions for viewing related dashboards. To view suggested dashboards and active users, click on the caret icon next to the dashboard title. These dashboards are recommended based on the user activity in your organization and how often users go from this dashboard to other existing dashboards. You can also add or update Markdown-supported dashboard descriptions in this view by clicking `edit`.

{{< img src="dashboards/suggested_dashboards.png" alt="Suggested dashboards" >}}

## Dashboard list

Search, view, or create dashboards and lists on the [Dashboard List][11] page. By default, this is the landing page after you login to Datadog. To change the default landing page for your organization, contact [Datadog support][12].

{{< img src="dashboards/dashboard_list2.png" alt="Dashboard List page"  >}}

### New list

To create a dashboard list, click on the **New List +** button in the upper right.

The list's title is automatically set with the user's first name. For example, if John Doe creates a dashboard, the default title is `John's list`. To change a list's title, click on the title for the text to become editable.

To add dashboards to a list, select their corresponding check boxes in the main Dashboard list. Then click on the *Add to List* button in the upper right corner of the Dashboard list:

{{< img src="dashboards/dash_to_list.png" alt="Add Dashboard to list" style="width:70%;">}}

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
| Created By You           | Custom dashboards created by the current user.                            |
| Frequently Viewed By You | All dashboards frequently viewed by the current user.                     |

#### Shared, editable lists

This section displays shared, editable dashboard lists with the number of dashboards in each list.

### All dashboards

All dashboards listed are sortable using the column headers *Star*, *Name*, *Modified*, and *Popularity*. All columns with descriptions are listed below:

| Column     | Description                                                                              |
|------------|------------------------------------------------------------------------------------------|
| Star       | All dashboards starred by the current user.                                              |
| Icon       | An icon indicating the type of dashboard (timeboard or screenboard).                     |
| Name       | The name of the custom or preset dashboard.                                              |
| Modified   | The last modified date of a custom dashboard.                                            |
| Popularity | The relative [popularity](#popularity) of the dashboard for your organization.           |
| Creator    | The profile icon of the dashboard's creator. Preset dashboards use the integration logo. |

#### Popularity

An organization's most popular dashboard displays five popularity bars. All other dashboards are relative to this dashboard. Popularity is based on the amount of traffic a dashboard receives. Popularity is updated daily; new dashboards have zero popularity bars for up to 24 hours.

**Note**: Traffic to public dashboard URLs is ignored for popularity.



### Restrict access

<div class="alert alert-warning">
RBAC restrict access to dashboards is in beta. To request access, contact <a href="https://docs.datadoghq.com/help/">Datadog support</a>.</div>

Click the settings modal for the whole dashboard, and select *Permissions*. Use the pop up to restrict access to you, everyone in your org with your role, or to specific roles in your org. For more information about roles, see the [RBAC][13] documentation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mobile
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: /dashboards/dashboards
[5]: /dashboards/timeboards
[6]: /dashboards/screenboards
[7]: /dashboards/guide/custom_time_frames/
[8]: /dashboards/sharing/#dashboards
[9]: /events/
[10]: /account_management/users/default_roles/
[11]: https://app.datadoghq.com/dashboard/lists
[12]: /help/
[13]: /account_management/rbac/
