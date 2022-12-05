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
    - /dashboards/dashboards/
    - /dashboards/screenboards/
    - /dashboards/timeboards/
description: Visualize your data to gain insight
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Dashboards"
    tag: "Release Notes"
    text: "Check out the latest Datadog Dashboards releases! (App login required)."
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
  - link: "https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices"
    tag: "Developer docs"
    text: "Create great integration dashboards"
---

## Overview

A dashboard is Datadog's tool for visually tracking, analyzing, and displaying key performance metrics, which enable you to monitor the health of your infrastructure.

**Note**: View Dashboards with the [Datadog Mobile App][1], available on the [Apple App Store][2] and [Google Play Store][3].

## New dashboard

To create a dashboard, click **+New Dashboard** on the [Dashboard List][16] page or **New Dashboard** from the navigation menu. Enter a dashboard name and choose a layout option.

{{< img src="dashboards/create-dashboard.png" alt="Adding a new dashboard" style="width:70%;">}}

### Dashboards
Dashboards are on a grid based layout, which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling views, which update in real-time and can represent fixed points in the past. They also work well for debugging.

### Timeboards
Timeboards have automatic layouts, and represent a single point in time—either fixed or real-time—across the entire dashboard. They are commonly used for troubleshooting, correlation, and general data exploration.

### Screenboards
Screenboards are dashboards with free-form layouts which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling views that update in real-time or represent fixed points in the past.

## Configuring dashboards

### Graph menu

Click on any dashboard graph to open an options menu:

| Option                 | Description                                                   |
|------------------------|---------------------------------------------------------------|
| Send snapshot          | Create and send a snapshot of your graph.                     |
| Find correlated metrics| Find correlations from APM services, integrations, and dashboards. |
| View in full screen    | View the graph in [full screen mode][4].                     |
| Lock cursor            | Lock the cursor in place on the page.                         |
| View related processes | Jump to the [Live Processes][5] page scoped to your graph.   |
| View related hosts     | Jump to the [Host Map][6] page scoped to your graph.         |
| View related logs      | Jump to the [Log Explorer][7] page scoped to your graph.     |
| View related traces    | Populate a [Traces][8] panel scoped to your graph.           |
| View related profiles  | Jump to the [Profiling][9] page scoped to your graph.        |

### Global time selector

To use the global time selector, at least one time-based widget must be set to use `Global Time`. Make the selection in the widget editor under **Set display preferences**, or add a widget (global time is the default time setting).

The global time selector sets the same time frame for all widgets using the `Global Time` option on the same dashboard. Select a moving window in the past (`Past 1 Hour`, `Past 1 Day`, etc.) or a fixed period with the `Select from calendar…` option or [enter a custom time frame][10]. If a moving window is chosen, the widgets are updated to move along with the time window.

Widgets not linked to global time show the data for their local time frame as applied to the global window. For example, if the global time selector is set to January 1, 2019 through January 2, 2019, a widget set with the local time frame for `Past 1 Minute` shows the last minute of January 2, 2019 from 11:59 pm.

#### Refresh rate

The refresh rate of a private dashboard depends on the time frame you are viewing. The shorter the time frame is, the more frequently the data is refreshed. Publicly shared dashboards refresh every thirty seconds, regardless of the selected time frame.

| Time frame   | Refresh rate |
|--------------|--------------|
| 1 minute     | 10 seconds   |
| 2 minutes    | 10 seconds   |
| 5 minutes    | 10 seconds   |
| 10 minutes   | 10 seconds   |
| 30 minutes   | 20 seconds   |
| 1 hour       | 20 seconds   |
| 3 hours      | 1 minute     |
| 4 hours      | 1 minute     |
| 1 day        | 3 minutes     |
| 2 days       | 10 minutes    |
| 1 week       | 1 hour       |
| 1 month      | 1 hour       |
| 3 months     | 1 hour       |
| 6 months     | 1 hour       |
| 1 year       | 1 hour       |

### TV mode

Dashboards are useful for displaying key performance metrics on large screens or TVs. To enable TV mode, use the keyboard shortcut `F` or click the TV icon on the dashboard.

### Settings

#### Generate public URL

Share a dashboard with external users by generating a public URL. For more details, see [Sharing dashboards][11].

#### Display UTC time

Toggle between UTC time and your default time zone.

#### Notifications

If notifications are activated for a dashboard, an event is created in the [event explorer][12]. This event provides information on text changes, widget changes, dashboard cloning, and dashboard deletion along with the name of the user performing the action.

Additionally, individual users who activate the notification receive an email alert. Any user in the organization, regardless of administrative privileges, can sign up to receive change notifications for a dashboard.

Change events for dashboards with notifications enabled are seen in the event explorer by searching:

```text
tags:audit,dash
```

To limit the search to a specific dashboard, include the dashboard's name in the search.

#### Permissions

At the top of the dashboard, click on settings and select *Permissions*.

{{< img src="dashboards/dashboard-menu-permissions.png" alt="The dashboard settings menu" style="width:50%;">}}

Use the pop up to restrict access to you, everyone in your organization with your role, or to specific roles in your organization.

{{< img src="dashboards/dashboard-role-restrictions.png" alt="Role restrictions in settings" style="width:70%;">}}

Creators are always able to edit the dashboard, but other users who are allowed to edit the dashboard can add or remove any role from the access control list (ACL) as long as the final ACL includes one of their roles. For more information about roles, see the [RBAC documentation][13].

If the dashboard was created with the deprecated "read only" setting, the access control list pre-populates with a list of roles that have the Access Management (`user_access_manage`) permission.

If you manage your Dashboards with Terraform, you can use the latest version of the Datadog Terraform provider to control which roles can edit your Dashboards. For more information, see the [Terraform Dashboard role restriction guide][14].

**Note:** View restrictions on individual dashboards are available to anyone on an Enterprise tier plan. Reach out to your account team or [Datadog support][15] to enable this feature. 


#### High-density mode

High-density mode displays group widgets in a dashboard side-by-side for increased widget density. This mode turns on by default on large screens for dashboards that use group widgets.

{{< img src="dashboards/high-density-mode.png" alt="The high-density mode display" style="width:90%;">}}
#### Clone dashboard

Use this option to copy the entire dashboard to a new dashboard. You are prompted to name the clone.

#### Copy, import, or export dashboard JSON

From an individual dashboard, copy, import, or export a dashboard's JSON using the settings cog (upper right) with the following options:

| Option                          | Description                                                                                                                                                                |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Copy&nbsp;dashboard&nbsp;JSON   | Copy the dashboard's JSON to your clipboard.                                                                                                                               |
| Import&nbsp;dashboard&nbsp;JSON | Paste or import your JSON to the dashboard. This option overwrites all content on the dashboard. If the JSON is already on your clipboard, use `Ctrl V` (`Cmd V` for Mac). |
| Export&nbsp;dashboard&nbsp;JSON | Download a JSON file containing the JSON of your dashboard.                                                                                                                |

#### Delete dashboard

Use this option to permanently delete your dashboard. You are prompted to confirm deletion.

## Suggested dashboards and active users

From an individual dashboard, Datadog offers suggestions for viewing related dashboards. To view suggested dashboards and active users, click on the caret icon next to the dashboard title. These dashboards are recommended based on the user activity in your organization and how often users go from this dashboard to other existing dashboards. You can also add or update Markdown-supported dashboard descriptions in this view by clicking `edit`.

{{< img src="dashboards/suggested_dashboards.png" alt="Suggested dashboards" >}}

## Dashboard list

Search, view, or create dashboards and lists on the [Dashboard List][16] page.

### New list

To create a dashboard list, click on the **New List +** button in the upper right.

The list's title is automatically set with the user's first name. For example, if John Doe creates a dashboard, the default title is `John's list`. To change a list's title, click on the title for the text to become editable.

To add dashboards to a list, select their corresponding check boxes in the main Dashboard list. Then click on the *Add to List* button in the upper right corner of the Dashboard list:

{{< img src="dashboards/dash_to_list.png" alt="Add Dashboard to list" style="width:100%;">}}

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
| All Shared               | Dashboards with authenticated or public link sharing enabled.             |
| Created By You           | Custom dashboards created by the current user.                            |
| Frequently Viewed By You | All dashboards frequently viewed by the current user.                     |
| Recently Deleted         | Dashboards deleted within the last 30 days.                               |

#### Restore deleted Dashboards

Use the preset **Recently Deleted** list to restore deleted dashboards. From the list, select all dashboards to restore and click **Restore to**. Select a specific list to restore the dashboards to, or select **All Custom** to restore them without a custom list. Dashboards in **Recently Deleted** are permanently deleted after 30 days.

{{< img src="dashboards/recently_deleted.png" alt="Restore deleted dashboard" style="width:100%;">}}

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

## Viewing dashboards on mobile devices

The [Datadog Mobile App][1], available on the [Apple App Store][2] and [Google Play Store][3], enables you to view your dashboards in a mobile-friendly format.

On the Dashboards page, you can view and search all of your dashboards, and filter them using the same template variables you have set up in the Datadog web app. Quickly filter your dashboards using template variable saved views. For more information about template variable saved views, see [Dashboard Saved Views][17]. Click on an individual dashboard to view it.

**Note**: To set up or edit a dashboard, you must log in to the Datadog browser UI.

{{< img src="dashboards/dashboards-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Dashboards on iOS and Android">}}

## Creating mobile home screen dashboards

The [Datadog Mobile App][1], available on the [Apple App Store][2] and [Google Play Store][3], also comes equipped with mobile home screen widgets. These widgets enable you to monitor service health and infrastructure without having to open the mobile app.

You can add SLOs, Monitors, and Open Incidents widgets to your mobile home screen alongside other development and collaboration tools to optimize your triage and incident management workflows.

{{< img src="dashboards/dashboards-widget-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Widgets on iOS and Android">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: /dashboards/widgets/#full-screen
[5]: https://app.datadoghq.com/process
[6]: https://app.datadoghq.com/infrastructure/map
[7]: https://app.datadoghq.com/logs
[8]: /tracing/
[9]: /profiler/
[10]: /dashboards/guide/custom_time_frames/
[11]: /dashboards/sharing/#dashboards
[12]: /events/
[13]: /account_management/rbac/
[14]: /dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/
[15]: /help/
[16]: https://app.datadoghq.com/dashboard/lists
[17]: /dashboards/template_variables/#saved-views
