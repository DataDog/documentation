---
title: Generate Custom Metrics From RUM Events
kind: documentation
description: "Create custom metrics from your RUM events."
aliases:
- /real_user_monitoring/generate_metrics
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: Learn how to capture RUM events from your browser and mobile applications
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to create queries in the RUM Explorer
- link: "/real_user_monitoring/explorer/search/#event-types"
  tag: Documentation
  text: Learn about RUM event types
- link: /logs/log_configuration/logs_to_metrics/
  tag: Documentation
  text: Generate metrics from ingested logs
- link: "https://www.datadoghq.com/blog/track-customer-experience-with-rum-metrics/"
  tag: Blog
  text: Generate RUM-based metrics to track historical trends in customer experience
---

## Overview

Real User Monitoring (RUM) allows you to capture events that occur in your browser and mobile applications using the Datadog RUM SDKs and collect data from events at a [sample rate][1]. Datadog retains this event data in the [RUM Explorer][2], where you can create search queries and visualizations.

RUM-based custom metrics are a cost-efficient option to summarize the data from your set of RUM events. You can visualize trends and anomalies across your RUM data at a granular level for up to 15 months.

**Billing Note:** Metrics created from RUM events are billed as [Custom Metrics][3].

## Create a RUM-based custom metric

To create a custom metric from RUM event data, navigate to [**Digital Experience** > **Application Management** > **Generate Metrics**][4] and click **+ New Metric**.

{{< img src="real_user_monitoring/generate_metrics/new_metrics_button-2.png" alt="Click + New Metric to create a RUM-based custom metric" width="80%" >}}

To create a custom metric from a search query in the [RUM Explorer][5], click the **Export** button and select **Generate new metric** from the dropdown menu.

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="Generate a RUM-based custom metric" width="80%" >}}

1. Give your [custom metric][3] a name that does not start with `datadog.estimated_usage`, such as `rum.sessions.count_by_geography`. For more information, see the [naming convention][6].
2. Select an event type you want to create a custom metric for, such as `Sessions`. Your options include **Sessions**, **Views**, **Actions**, **Errors**, **Resources**, and **Long Tasks**. For more information, see [Search RUM Events][7].
3. Create a search query that filters your RUM events using the RUM Explorer's [search syntax][8] such as `@session.type:user`. 
4. Choose a field to track from the dropdown menu next to **Count**. 

   - Select `*` to generate a count of all RUM events that match your search query. 
   - Optionally, enter an event attribute such as `@action.target` to aggregate a numeric value and create a corresponding `count` or `distribution` metric. 

   If the RUM attribute facet is a measure, the metric value is the RUM attribute value.

5. Select a path to group by from the dropdown menu next to **group by**. The metric tag name is the original attribute or tag name without the `@`. By default, custom metrics generated from RUM events do not contain tags unless they are explicitly added. You can use an attribute or tag dimension that exists in your RUM events such as `@error.source` or `env` to create metric tags. 

   <div class="alert alert-warning">RUM-based custom metrics are considered as <a href="/metrics/custom_metrics/">custom metrics</a> and billed accordingly. Avoid grouping by unbounded or extremely high cardinality attributes such as timestamps, user IDs, request IDs, and session IDs.
   </div>

6. For custom metrics created on sessions and views, select **The active session/view starts matching the query** or **The session/view becomes inactive or is completed** to set the matching criteria for sessions and views. For more information, see [Add a RUM-based metric on sessions and views](#add-a-rum-based-metric-on-sessions-and-views).

7. Add percentile aggregations for distribution metrics. You can opt-in for advanced query functionality and use globally accurate percentiles (such as P50, P75, P90, P95, and P99). 

   <div class="alert alert-warning">Enabling advanced query functionality with percentiles generates more <a href="/metrics/custom_metrics/">custom metrics</a> and is <a href="/account_management/billing/custom_metrics/">billed accordingly</a>.

8. Click **Create Metric**.

Your RUM-based custom metric appears in the list below **Custom RUM Metrics**, and there may be a short delay for your metric to become available in [dashboards][9] and [monitors][10]. 

Data points are not created for metrics with historical data. Data points for your RUM-based custom metric generate on a ten second interval. Metrics data is retained for 15 months. 

### Add a RUM-based metric on sessions and views

Sessions and views are considered active when there is ongoing application or user activity in a RUM application. For example, as a user opens new pages, these pageviews are collected in the user session. As a user interacts with buttons on a page, these actions are collected in the pageviews.

   Let's assume you have a RUM-based custom metric that counts the number of user sessions containing more than five errors, and a session ID `123` that reaches five errors at 11 AM and closes at 12 PM.

   - By accounting for the session or view as soon as it matches the query, you increment the count metric's value by one at the 11 AM timestamp.
   - By accounting for the session or view that is inactive, you increment the count metric's value by one at the 12 PM timestamp.

## Manage RUM-based custom metrics

You can generate a count metric of RUM events that match a query or a [distribution metric][11] of a numeric value contained in RUM events, such as the request duration.

### Update a RUM-based custom metric

To update a metric, hover over a metric and click the **Edit** icon to the right hand corner.

- Filter query: Change the set of matching RUM events that are aggregated into metrics.
- Aggregation groups: Update tags to manage the cardinality of generated metrics.
- Percentile selection: Click the **Calculate percentiles** toggle to remove or generate percentile metrics.

Because you cannot rename an existing metric, Datadog recommends creating another metric.

### Delete a RUM-based custom metric

In order to stop the computing of data points from your custom metric and billing, hover over a metric and click the **Delete** icon to the right hand corner. 

## 使用方法

You can use RUM-based custom metrics for the following actions:

- Visualize trends over a set period of time in a [dashboard][12]
- Trigger an alert when a metric behaves differently than it has in the past in an [anomaly monitor][13]
- Trigger an alert when a metric is predicted to cross a threshold in the future in a [forecast monitor][14]
- Create [metric-based SLOs][15] to track user-centric performance objectives for your teams and organizations 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/guide/sampling-browser-plans
[2]: https://app.datadoghq.com/rum/explorer
[3]: /metrics/custom_metrics/
[4]: https://app.datadoghq.com/rum/generate-metrics
[5]: /real_user_monitoring/explorer/
[6]: /metrics/custom_metrics/#naming-custom-metrics
[7]: /real_user_monitoring/explorer/search/#event-types
[8]: /real_user_monitoring/explorer/search_syntax/
[9]: /dashboards/
[10]: /monitors/
[11]: /metrics/distributions/
[12]: /dashboards/querying/#configuring-a-graph
[13]: /monitors/types/anomaly/
[14]: /monitors/types/forecasts/
[15]: /service_management/service_level_objectives/metric/
