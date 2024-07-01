---
title: Compute Apdex And Custom Performance Indicators With RUM Data
kind: guide
description: Guide for computing your Apdex score and custom performance indicators with RUM data
further_reading:
    - link: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
      tag: Documentation
      text: Configure Apdex score by service
    - link: /real_user_monitoring/explorer
      tag: Documentation
      text: RUM Dashboards
    - link: /real_user_monitoring/browser/data_collected
      tag: Documentation
      text: RUM Browser Data Collected
    - link: /real_user_monitoring/android/data_collected
      tag: Documentation
      text: RUM Android Data Collected
    - link: /real_user_monitoring/ios/data_collected
      tag: Documentation
      text: RUM iOS Data Collected
---

## Overview

Datadog collects Real User Monitoring (RUM) events from browser and mobile RUM SDKs that you can use to build a quick graph and compute performance indicator metrics such as Apdex. 

To compute your Apdex score, you can use service monitoring from APM or user monitoring data from the RUM SDKs. This guide provides instructions on computing Apdex for an application with RUM data and the **Query Value** widget in a [Quick Graph][1].

For more information about computing Apdex with service monitoring data, see [Configure Apdex score by service][2].

## Prerequisites

- Your web or mobile application is instrumented with the RUM SDK. To set up instrumentation, see [RUM Browser Monitoring][3], [RUM Android Monitoring][4], and [RUM iOS Monitoring][5].
- Events from your application are available in Datadog.

## Compute an Apdex score

The example below calculates an Apdex score using the Largest Contentful Paint performance metric from RUM events, and a hypothetical threshold of `T = 2 sec`. The minimum frustrating latency is `4T = 8 sec`. The resulting value is shown in a Query Value widget quick graph that you can export to dashboards or notebooks.

### Create a quick graph

1. Navigate to **Dashboards** > **Quick Graph**.
2. Create three RUM queries:
   * [Query `a`](#query-a) for all satisfying page loads (RUM views where Largest Contentful Paint takes less than 2 seconds to load).
   * [Query `b`](#query-b) for all tolerated page loads (RUM views where Largest Contentful Paint takes less than 8 seconds to load).
   * [Query `c`](#query-c) for all page loads (all RUM views).
3. In the **Formula** field, enter the Apdex formula `(a + 0.5 * b) / c`.
4. Under **Select a visualization**, click **Query Value**. A query value widget appears.
5. In the time frame selector, select **Past 1 Day**. By default, the widget displays in Global Time.
6. Enter a name for your graph, such as `Apdex Score`.
7. Optionally, export or copy and paste the quick graph to a dashboard or notebook, or click **Export** > **New Dashboard** to create a dashboard with this quick graph. 

#### Query A

1. In **Graph your data**, select `RUM` as the data source for query `a` and enter `@view.largest_contentful_paint:<2s`.
2. Press Enter or click **Update query** in the dropdown menu. The `Largest Contentful Paint:<2s` query appears next to `RUM` for query `a`.

#### Query B

1. To create query `b`, click **+ Add Query**.
2. Select `RUM` as the data source for query `b` and enter `@view.largest_contentful_paint:[2s TO 8s]`.
3. Press Enter or click **Update query** in the dropdown menu. The `Largest Contentful Paint:[2s - 8s]` query appears next to `RUM` for query `b`.

#### Query C

1. To create query `c`, click **+ Add Query**.
2. Select `RUM` as the data source for query `c` and enter `@Type:view`.
3. Press Enter or click **Update query** in the dropdown menu. The `Type:view` query appears next to `RUM` for query `c`.

{{< img src="real_user_monitoring/guide/quick-graph.png" alt="Apdex score in a quick graph" style="width:100%;">}}

### JSON configuration

To access the JSON code for this graph, click the **JSON** tab next to **Edit**.

Click the copy icon on the right hand corner to copy the quick graph JSON to your clipboard.

{{< code-block lang="json" filename="JSON" disable_copy="false" collapsible="true" >}}
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
                    "search": {
                        "query": "@type:view @view.largest_contentful_paint:<2000000000"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query1",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                },
                {
                    "search": {
                        "query": "@type:view @view.largest_contentful_paint:[2000000000 TO 8000000000]"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query2",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                },
                {
                    "search": {
                        "query": "@type:view"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query3",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                }
            ],
            "response_format": "scalar",
            "conditional_formats": []
        }
    ],
    "autoscale": true,
    "precision": 2
}
{{< /code-block >}}

## Additional visualizations and Apdex scores

In the example above, the Apdex score is relevant to the View RUM events and Largest Contentful Paint performance metric.  

You can also calculate other Apdex scores with the following methods:

- To see the Apdex score trend over time, select `Timeseries` instead of `Query Value` in **Select your visualization**.
- To compute the Apdex score for a specific application, add an additional `@application.name` query and update your formula.
- To compute the Apdex score with another RUM performance metric such as First Contentful Paint, replace `@view.LargestContentfulPaint` with `@view.FirstContentfulPaint` in the queries.

To compute additional performance indicators for your applications, determine what data points you need and which RUM events are relevant for you before [creating a quick graph](#create-a-quick-graph).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/guide/quick-graphs/
[2]: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
[3]: /real_user_monitoring/browser/
[4]: /real_user_monitoring/android/
[5]: /real_user_monitoring/ios/
