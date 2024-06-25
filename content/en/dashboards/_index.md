---
title: Dashboards
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
  - link: "/dashboards/sharing/"
    tag: "Documentation"
    text: "Share your Graphs outside of Datadog"
  - link: "https://www.datadoghq.com/blog/datadog-clipboard/"
    tag: "Blog"
    text: "Add Dashboard widgets to your clipboard"
  - link: "https://www.datadoghq.com/blog/datadog-dashboards/"
    tag: "Blog"
    text: "The new Datadog dashboards experience"
  - link: "https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices"
    tag: "Best Practices"
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

Dashboards provide real-time insights into the performance and health of systems and applications within an organization. They allow users to visually analyze data, track key performance indicators (KPIs), and monitor trends efficiently. With dashboards, teams can identify anomalies, prioritize issues, proactively detect problems, diagnose root causes, and ensure that reliability goals are met. Empower your teams to make informed decisions, optimize system operations, and drive business success by providing a centralized and user-friendly interface for monitoring and analyzing critical metrics and performance indicators.

{{< whatsnext desc="Dashboard features:">}}
    {{< nextlink href="/dashboards/configure" >}}Configure: Overview of the configuration options for dashboards{{< /nextlink >}}
    {{< nextlink href="/dashboards/configure" >}}Dashboard List: Search, view, or create dashboards and lists{{< /nextlink >}}
    {{< nextlink href="/dashboards/template_variables" >}}Template Variable: Dynamically filter widgets in a dashboard{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/datadog_clipboard/" >}}Datadog Clipboard{{< /nextlink >}}
    {{< nextlink href="/api/latest/dashboards" >}}API: Manage dashboards programmatically{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Graphing features:">}}
    {{< nextlink href="/dashboards/widgets" >}}Widgets: Learn the configuration for different visualizations{{< /nextlink >}}
    {{< nextlink href="/dashboards/querying" >}}Querying: See the formatting options for graph queries{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions" >}}Functions: Modify metric queries and resulting graphs{{< /nextlink >}}
    {{< nextlink href="/dashboards/change_overlays" >}}Overlays: Automatically overlay change events on graphs{{< /nextlink >}}
{{< /whatsnext >}}

## Get started

{{< whatsnext desc="See the following resources:" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}Getting Started with Dashboards{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}Learning Course: Introduction to Dashboards{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/building-better-dashboards" >}}Learning Course: Building Better Dashboards{{< /nextlink >}}
{{< /whatsnext >}}

To create a dashboard, click **+New Dashboard** on the [Dashboard List][4] page or **New Dashboard** from the navigation menu. Enter a dashboard name and choose a layout option.

{{< img src="dashboards/create-dashboard.png" alt="Adding a new dashboard" style="width:70%;">}}

Dashboards 
: A grid-based layout, which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling views which update in real time, and can represent fixed points in the past. They have a maximum width of 12 grid squares and also work well for debugging.

Timeboards
: Automatic layouts that represent a single point in time—either fixed or real-time—across the entire dashboard. They are commonly used for troubleshooting, correlation, and general data exploration.

Screenboards
: Dashboards with free-form layouts which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling views that update in real time or represent fixed points in the past.

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

## View dashboards on mobile devices

View your dashboards in a mobile-friendly format with the Datadog Mobile App, available on the [Apple App Store][2] and [Google Play Store][3]. The Mobile App comes equipped with mobile home screen widgets that allow you to monitor service health and infrastructure without opening the mobile app.

**Note**: To set up or edit a dashboard, you must log in to the Datadog browser UI. For more information on installing the app, see the [Datadog Mobile App][1] documentation.

## Further Reading

{{< learning-center-callout header="Try Creating Graph Widgets in the Datadog Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/dashboard-graph-widgets">}} Explore timeseries, query value, toplist, table, distribution, and pie chart widgets. Learn how to configure the widgets and develop an understanding of when each widget type should be utilized. {{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/dashboard/lists
