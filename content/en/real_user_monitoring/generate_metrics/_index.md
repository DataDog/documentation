---
title: Generate Metrics From RUM Events
kind: documentation
description: "Create custom metrics from your RUM events."
further_reading:
- link: "/real_user_monitoring/"
  tag: "Documentation"
  text: "Learn how to capture RUM events from your browser and mobile applications"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Learn how to create queries in the RUM Explorer"
- link: "/real_user_monitoring/explorer/search/#event-types/"
  tag: "Documentation"
  text: "Learn about RUM event types"
- link: "/logs/log_configuration/logs_to_metrics/"
  tag: "Documentation"
  text: "Generate metrics from ingested logs"
---

<div class="alert alert-warning">
Generating metrics from RUM events is in beta. Access to this feature is provisioned to customers using Real User Monitoring. Contact <a href="/help">Datadog Support</a> to provide feedback.
</div>

## Overview

Real User Monitoring (RUM) allows you to capture events that occur in your browser and mobile applications using the RUM SDKs and collect data from events at a [sample rate][1]. Datadog retains this event data in the [RUM Explorer][2], where you can create search queries and visualizations.

Custom RUM metrics are a cost-efficient option to summarize the data from your set of RUM events. With custom RUM metrics, you can visualize trends and anomalies across your RUM data at a granular level for up to 15 months.

You can also generate a count metric of logs that match a query or a [distribution metric][3] of a numeric value contained in logs, such as the request duration.

## Generate a custom RUM metric

To create a custom RUM metric, navigate to [**UX Monitoring** > **Generate Metrics**][4] and click **+ New Metric**.

{{< img src="real_user_monitoring/generate_metrics/new_metrics_button.png" alt="Click + New Metric to create a custom RUM metric" width="80%" >}}

To create a metric from a search query in the [RUM Explorer][5], click the **Export** button and select **Generate new metric** from the dropdown menu.

### Add a custom RUM metric

{{< img src="real_user_monitoring/generate_metrics/generate_metric.png" alt="Generate a custom RUM metric" width="80%" >}}

1. Select an event type you want to create a metric for, such as `Actions`. Your options include **Actions**, **Errors**, **Resources**, and **Long Tasks**. For more information, see [Search RUM Events][6].
2. Create a search query that filters your RUM events using the RUM Explorer's [search syntax][7]. Events that contain a timestamp within the past hour and 15 minutes are included in the metric aggregation. 
3. Choose a field to track from the dropdown menu next to **Count**. 

    - Select `*` to generate a count of all RUM events that match your search query. 
    - Optionally, enter an event attribute such as `@action.target` to aggregate a numeric value and create corresponding, aggregated metrics such as `count`, `min`, `max`, `sum`, and `avg`. 

   If the RUM attribute facet is a measure, the metric value is the RUM attribute value.

4. Select a path to group by from the dropdown menu next to **group by**. The metric tag name is the original attribute or tag name without the `@`. By default, metrics generated from RUM events do not contain tags unless they are explicitly added. You can use an attribute or tag dimension that exists in your RUM events such as `@error.source` or `env` to create metric tags. 
   
   <div class="alert alert-warning">Custom RUM metrics are considered as <a href="/metrics/custom_metrics/">custom metrics</a>. Datadog recommends avoiding grouping by unbounded or extremely high cardinality attributes such as timestamps, user IDs, request IDs, and session IDs. For more information, see <a href="/data_security/logs/">Log Management Data Security</a>.
   </div>

5. Add percentile aggregations for distribution metrics. You can generate P50, P75, P90, P95, and P99 percentiles. 

   <div class="alert alert-warning">Percentile metrics are also considered <a href="/metrics/custom_metrics/">custom metrics</a>.

6. Give your [metric][8] a name.
7. Click **Create Metric**.

Your custom RUM metric appears in the list below **Custom RUM Metrics**, and there may be a short delay for your metric to become available in [dashboards][9] and [monitors][10]. 

Data points are not created for metrics with historical data. Data points for your custom RUM metric generate on a ten second interval, and metrics data is retained for 15 months. 

### Update a custom RUM metric

To update a metric, hover over a metric and click the **Edit** icon to the right hand corner.

- Filter query: Change the set of matching RUM events that are aggregated into metrics.
- Aggregation groups: Update tags or manage the cardinality of generated metrics.
- Percentile selection: Click the **Calculate percentiles** toggle to remove or generate percentile metrics.

Because you cannot rename a metric, Datadog recommends creating another metric.

### Delete a custom RUM metric

In order to stop the computing of data points from your metric (and billing), hover over a metric and click the **Delete** icon to the right hand corner. 

## Use a custom RUM metric

You can use custom RUM metrics to:

- Visualize trends over a set period of time in a [dashboard][11].
- Trigger an alert when a metric behaves differently than it has in the past in an [anomaly monitor][12].
- Trigger an alert when a metric is predicted to cross a threshold in the future in a [forecast monitor][13].
- Create [metric-based SLOs][14] to track user-centric performance objectives for your teams and organizations. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/#browser-and-session-replay-sampling-configuration
[2]: https://app.datadoghq.com/rum/explorer
[3]: /metrics/distributions/
[4]: https://app.datadoghq.com/rum/generate-metrics
[5]: /real_user_monitoring/explorer/
[6]: /real_user_monitoring/explorer/search/#event-types
[7]: /real_user_monitoring/explorer/search_syntax/
[8]: /metrics/
[9]: /dashboards/
[10]: /monitors/
[11]: /dashboards/querying/#configuring-a-graph
[12]: /monitors/create/types/anomaly/
[13]: /monitors/create/types/forecasts/
[14]: /monitors/service_level_objectives/metric/
