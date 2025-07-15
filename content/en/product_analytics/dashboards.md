---
title: Dashboards
description: Visualize your data to gain insight
further_reading:
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
---

## Overview 

The key to getting started with dashboards is knowing what kind of questions you ask yourself regularly. What are common issues your customers face? When a problem occurs, what questions help you find a solution?

Creating a good dashboard is about bringing the answers to these questions to the surface. Also, it is important not to cram all of those thoughts into the same dashboard. Creating separate dashboards to pinpoint different issues can help you quickly find your answers.

This guide gets you started on a path to creating dashboards. These basic dashboards enable team discussion and speed up issue resolution.

## Create a dashboard

To create a dashboard, click **+New Dashboard** on the [Dashboard List][1] page. 

{{< img src="product_analytics/dashboard/pana_dashboard_overview.png" alt="Adding a new dashboard" style="width:70%;">}}


Enter a dashboard name and choose a layout option.

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



## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/dashboard/list