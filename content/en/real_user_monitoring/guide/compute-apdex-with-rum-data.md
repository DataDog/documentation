---
title: Compute Apdex and custom performance indicators with RUM data
kind: guide
description: Guide for computing your Apdex score and custom performance indicators with RUM data
further_reading:
    - link: '/real_user_monitoring/explorer'
      tag: 'Documentation'
      text: 'RUM Dashboards'
    - link: '/real_user_monitoring/browser/data_collected'
      tag: 'Documentation'
      text: 'RUM Browser Data Collected'
    - link: '/real_user_monitoring/android/data_collected'
      tag: 'Documentation'
      text: 'RUM Android Data Collected'
    - link: '/real_user_monitoring/ios/data_collected'
      tag: 'Documentation'
      text: 'RUM iOS Data Collected'
---

## Overview

Datadog collects Real User Monitoring (RUM) events from the browser and mobile RUM SDKs that you can use to build a dashboard and compute performance indicator metrics such as Apdex. 

Compute your Apdex score with service monitoring data from APM or with user monitoring data from the RUM SDKs. To compute your Apdex score from a formula, see [Configure Apdex score by service][1].

This guide provides instructions on computing Apdex for an application with client monitoring data from the RUM SDKs and the **Query Value** widget.

## Prerequisites

- Your web or mobile application instrumented with the RUM SDK. To set up, see [RUM Browser Monitoring][2], [RUM Android Monitoring][3], and [RUM iOS Monitoring][4].
- Events from your application available in Datadog.

## Compute your Apdex score

In the example below, the View RUM events and the Largest Contentful Paint performance metrics are available. The threshold is `T = 2 sec` and the minimum frustrating latency is `4T = 3 sec`. By computing two queries in a dashboard and adding a formula in a Query Value widget, you can calculate your Apex score.

{{< tabs >}}
{{% tab "Create a dashboard in Datadog" %}}

Create three queries: query `a` for all satisfying page loads (RUM views where LargestContentfulPaint takes less than 2 seconds to load), query `b` for all tolerating page loads (RUM views where LargestContentfulPaint takes less than 2 to 3 seconds to load), and query `c` for all page loads (all RUM views).


1. Navigate to **Dashboards** > **New Dashboard**.
2. Enter a dashboard name and click **New Dashboard**.
3. Click **Add widgets**. A Layout and Widgets panel appears.
4. Under **Widgets**, drag and drop **Query Value** into your dashboard. A visualization modal appears.
5. On the upper right, select `1d` Past 1 Day to include data collected over the past day.
6. In **Graph your data**, select `RUM` as the data source for query `a` and enter `@view.largest_contentful_paint:<2s`.
7. Click **Update query**. The `Largest Contentful Paint:<2s` query appears next to `RUM` for query `a`.
8. To create query `b`, click **+ Add Query**.
9. Select `RUM` as the data source for query `b` and enter `@view.largest_contentful_paint:[2s TO 3s]`.
10. Click **Update query**. The `Largest Contentful Paint:[2s - 3s]` query appears next to `RUM` for query `b`.
11. To create query `c`, click **+ Add Query**.
12. Select `RUM` as the data source for query `c` and enter `@Type:view`.
13. Click **Update query**. The `Type:view` query appears next to `RUM` for query `c`.
14. In the **Formula** field, enter `(a + 0.5 * b) / c`.
15. In **Set display preferences**, select **Past 1 Day**. By default, the widget displays in Global Time.
16. Enter a name for your graph, such as `Apdex Score`.
17. Click **Save**.

{{< img src="real_user_monitoring/guide/apdex-score.png" alt="Apdex Score in a dashboard" style="width:100%;">}}

{{% /tab %}}
{{% tab "Create a dashboard programmatically" %}}

1. Navigate to **Dashboards** > **New Dashboard**.
2. Enter a dashboard name and click **New Dashboard**.
3. Click **Add widgets**. A Layout and Widgets panel appears.
4. Under **Widgets**, drag and drop **Query Value** into your dashboard. A visualization modal appears.
5. On the upper right, select `1d` Past 1 Day to include data collected over the past day.
6. In **Graph your data**, select the **JSON** tab and paste the following in the text field.

```
{
    "viz": "query_value",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "(query1 + 0.5 * query2) / query3"
                }
            ],
            "queries": [
                {
                    "data_source": "rum",
                    "name": "query1",
                    "search": {
                        "query": "@view.largest_contentful_paint:<2000000000"
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                },
                {
                    "data_source": "rum",
                    "name": "query2",
                    "search": {
                        "query": "@view.largest_contentful_paint:[2000000000 TO 8000000000]"
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                },
                {
                    "data_source": "rum",
                    "name": "query3",
                    "search": {
                        "query": "@type:view"
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                }
            ],
            "response_format": "scalar",
            "conditional_formats": [
                {
                    "comparator": ">",
                    "palette": "white_on_red"
                },
                {
                    "comparator": ">=",
                    "palette": "white_on_yellow"
                },
                {
                    "comparator": "<",
                    "palette": "white_on_green"
                }
            ]
        }
    ],
    "autoscale": true,
    "precision": 2
}
```

7. In **Set display preferences**, select **Past 1 Day**. By default, the widget displays in Global Time.
16. Enter a name for your graph, such as `Apdex Score`.
17. Click **Save**.

Your dashboard contains the Apdex performance indicator for your applications in the past day.

{{% /tab %}}
{{< /tabs >}}

## Customize your Apdex score

You can customize your Apdex score using the following methods:

- To see the Apdex score trend over time, select `Timeseries` instead of `Query Value` in **Select your visualization**.
- To compute the Apdex score for a specific application, add an additional `@application.id` query and update your formula.
- To compute the Apdex score with another RUM performance metric such as First Contentful Paint, replace `@view.LargestContentfulPaint` with `@view.FirstContentfulPaint` in the query.

To compute additional performance indicators for your applications, determine what data points you need and which RUM events are relevant for you to define and calculate using the instructions above.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
[2]: /real_user_monitoring/browser/
[3]: /real_user_monitoring/android/
[4]: /real_user_monitoring/ios/
