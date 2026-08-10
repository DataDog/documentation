---
title: Create Charts with RUM Custom Metrics
description: "Learn how to visualize your RUM custom metrics as charts in dashboards and notebooks."
further_reading:
- link: '/real_user_monitoring/platform/generate_metrics'
  tag: 'Documentation'
  text: 'Generate Custom Metrics from RUM Events'
- link: '/real_user_monitoring/guide/alerting-with-rum'
  tag: 'Documentation'
  text: 'Create alerts with RUM data'
- link: '/real_user_monitoring/platform/dashboards/'
  tag: 'Documentation'
  text: 'RUM Dashboards'
- link: '/dashboards/'
  tag: 'Documentation'
  text: 'Dashboards'
---

## Overview

[RUM-based custom metrics][1] let you summarize event data from your browser and mobile applications and visualize trends for up to 15 months. After you [create a custom metric][1], you can use it anywhere Datadog metrics appear, including dashboards, notebooks, and SLOs.

## Add a RUM custom metric to a dashboard

1. Open an existing dashboard or [create a dashboard][2].
2. Click **Add Widgets** and select a widget type. See [Choose the right widget](#choose-the-right-widget) for guidance.
3. In the widget editor, set the data source to **Metrics**.
4. Enter your custom metric name, for example `rum.sessions.count_by_geography`.
5. Apply tag filters to scope the data, for example `env:prod`.
6. Select a **group by** tag to break down the data, for example `@application.name`.
7. Click **Save** to add the widget to your dashboard.

## Choose the right widget

The following table maps common RUM use cases to widget types:

| Use case | Recommended widget |
|---|---|
| Error rate or session count over time | Timeseries |
| Top pages by load time | Top List |
| Single KPI such as crash-free rate | Query Value |
| Distribution of load times (requires [percentile aggregation][3]) | Distribution |
| Breakdown by country or version | Geomap or Top List |

## Combine metrics with formulas

You can combine multiple RUM custom metrics in a single widget using formulas. This is useful for calculating derived values such as rates and ratios.

For example, to calculate a crash-free rate, create two custom metrics:
- **`rum.sessions.crash_free`**: A count of sessions that complete without a crash.
- **`rum.sessions.total`**: A count of all sessions.

In the widget editor, add both metrics as separate queries, then enter the formula `a / b * 100` to calculate the percentage.

{{< img src="real_user_monitoring/guide/create-charts-with-custom-metrics/custom-metrics-formulas-example.png" alt="Widget editor showing two RUM custom metric queries combined with a formula to calculate crash-free rate as a percentage." style="width:100%;" >}}

## Use template variables for reusable charts

Template variables let you create dashboards that work across multiple applications, environments, or versions without duplicating widgets.

To add a template variable to a dashboard:

1. Click **Add Variable** at the top of the dashboard.
2. Select **Metrics** as the data source.
3. Choose a tag key such as `application.name`, `env`, or `version`.

After you add the variable, reference it in widget queries using the `$variable_name` syntax. For example, filter a widget to `application.name:$application` to let viewers select which application to display.

## Charting examples

### Track conversion funnel drop-off by country

Use a **Geomap** widget with a custom metric that counts completed checkout sessions grouped by country. Filter to `@session.type:user` to exclude synthetic traffic, and group by the `@geo.country` tag to visualize where users drop off in your conversion funnel.

### Monitor crash-free rate by release version

Use a **Timeseries** widget with the formula pattern from the [Combine metrics with formulas](#combine-metrics-with-formulas) section to track crash-free rate over time. Group by `version` to compare stability across releases and detect regressions introduced by specific builds.

### Visualize page load performance trends

Use a **Distribution** widget with a distribution metric that has percentile aggregation enabled to display P50, P75, P90, and P99 values. Filter to a specific view name to focus on a critical page, such as a checkout or sign-up flow.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/platform/generate_metrics
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /real_user_monitoring/platform/generate_metrics#percentile-aggregation
