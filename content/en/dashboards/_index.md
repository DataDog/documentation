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
  - link: "/service_management/mobile/#dashboards"
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
  - link: "https://dtdg.co/fe"
    tag: "Foundation Enablement"
    text: "Join an interactive session on better visualizations with Dashboards"
cascade:
    algolia:
        rank: 70
        tags: ['snapshot', 'dashboards']
---

## Overview

A dashboard is Datadog's tool for visually tracking, analyzing, and displaying key performance metrics, which enable you to monitor the health of your infrastructure.

**Note**: View Dashboards with the [Datadog Mobile App][1], available on the [Apple App Store][2] and [Google Play Store][3].

{{< whatsnext desc="Dashboard features:">}}
    {{< nextlink href="/dashboards/configure" >}}Configure: Overview of the configuration options for dashboards{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets" >}}Widgets: Learn the configuration for different visualizations{{< /nextlink >}}
    {{< nextlink href="/dashboards/querying" >}}Querying: See the formatting options for graph queries{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions" >}}Functions: Modify metric queries and resulting graphs{{< /nextlink >}}
    {{< nextlink href="/dashboards/template_variables" >}}Template Variable: Dynamically filter widgets in a dashboard{{< /nextlink >}}
    {{< nextlink href="/dashboards/change_overlays" >}}Overlays: Automatically overlay change events on graphs{{< /nextlink >}}
    {{< nextlink href="/api/latest/dashboards" >}}API: Manage dashboards programmatically{{< /nextlink >}}
{{< /whatsnext >}}

## New dashboard

To create a dashboard, click **+New Dashboard** on the [Dashboard List][4] page or **New Dashboard** from the navigation menu. Enter a dashboard name and choose a layout option.

{{< img src="dashboards/create-dashboard.png" alt="Adding a new dashboard" style="width:70%;">}}

### Dashboards
Dashboards are on a grid-based layout, which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling views which update in realtime, and can represent fixed points in the past. They have a maximum width of 12 grid squares and also work well for debugging.

### Timeboards
Timeboards have automatic layouts, and represent a single point in time—either fixed or real-time—across the entire dashboard. They are commonly used for troubleshooting, correlation, and general data exploration.

### Screenboards
Screenboards are dashboards with free-form layouts which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling views that update in real-time or represent fixed points in the past.

## Refresh rate

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

## Dashboard list

Search, view, or create dashboards and lists on the [Dashboard List][4] page.

### Teams

Use the **My Teams** toggle to switch between viewing all dashboards and only dashboards owned by your [teams][5].

To edit the teams associated with one or more dashboards, take the following steps:
1. Select the checkbox next to each dashboard you wish to modify.
1. Open the **Edit Teams** dropdown in the upper right.
1. Use the checkboxes to select the appropriate teams for the dashboards.
1. Click **Apply Changes**.

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/dashboard/lists
[5]: /account_management/teams/
[6]: /dashboards/template_variables/#saved-views
