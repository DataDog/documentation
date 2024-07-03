---
description: Learn how to investigate issues in your RUM applications with Watchdog
  Insights.
further_reading:
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: Blog
  text: Monitor Core Web Vitals with RUM
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: Blog
  text: Improve mobile user experience with Datadog Mobile RUM
- link: /watchdog/insights
  tag: Documentation
  text: Learn about Watchdog Insights
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Learn how to search in the RUM Explorer
kind: documentation
title: Watchdog Insights for RUM
---

## Overview

Datadog Real User Monitoring (RUM) offers Watchdog Insights to help you navigate to the root cause of problems with contextual insights in the RUM Explorer. Watchdog Insights complement your expertise and instincts by recommending outliers and potential performance bottlenecks impacting a subset of users. 

For more information, see [Watchdog Insights][1].

## Explore collected insights

The pink Watchdog Insights banner appears in the [RUM Explorer][2] and displays insights about the search query over a period of time. This example demonstrates how Watchdog Insights surfaces issues in a deployed application instance of `view.url_host:www.shopist.io`, which caused a certain amount of errors in a given time range (for example, the past day).

{{< img src="real_user_monitoring/explorer/watchdog_insights/overview.png" alt="Watchdog Insights banner cards in the RUM Explorer" style="width:100%;" >}}

Click on an [error](#error-outliers) or [latency outlier](#latency-outliers) to interact with the visualizations embedded in the side panel and find views from the list of impacted events. Click **View all** to see all outstanding error outliers in a side panel. 

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_m_card-3.png" alt="Error Outlier banner card and side panel card view in the RUM Explorer" style="width:100%;" >}}

Hover over a card in the banner and click **Filter on Insight** to add the anomalous insight behavior to your search query. For example, you can hone in on a particular view path or a specific continent like `North America`. 

Click **View in Analytics** to automatically set the `Group into fields` formulas and select the `Visualize as` type under the search query to reflect the card's outlier behavior. For example, you can create a timeseries graph about an unusually high error rate on a Synthetic test by using the `synthetics.test_id` in a search formula and export it into a monitor or dashboard.

## Error outliers

Error outliers display fields such as [faceted tags or attributes][3] that contain characteristics of errors that match the current search query. Statistically overrepresented `key:value` pairs among errors can provide hints into the root cause of issues. Typical examples of error outliers include `env:staging`, `version:1234`, and `browser.name:Chrome`.

In the **banner card** view, you can see:

* The field name
* The proportion of total errors and overall RUM events that the field contributes to
* Related tags

In the **full side panel**, you can see a timeseries graph about the total number of RUM errors with the field along with a impact pie charts and a list of RUM events that contain the field.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel-1.png" alt="Error Outlier full side panel" style="width:100%;" >}}

## Latency outliers

Latency outliers display fields such as [faceted tags or attributes][3] that are associated with performance bottlenecks that match the current search query. `key:value` pairs with worse performance than the baseline can provide hints into the performance bottlenecks among a subset of real users.

Latency outliers are computed for [Core Web Vitals][4] such as First Contentful Paint, First Input Delay, Cumulative Layout Shift, and [Loading Time][5]. For more information, see [Monitoring Page Performance][4].

In the **banner card** view, you can see:

* The field name
* The performance metric value containing the field and the baseline for the rest of the data

In the **full side panel**, you can see a timeseries graph about the performance metric with an X axis of increments of `p50`, `p75`, `p99`, and `max`, along with a list of RUM events that contain the field. 

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel-1.png" alt="Latency Outlier full side panel view" style="width:100%;" >}}

You can begin your investigation for the root cause of a performance issue in this timeseries graph.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/watchdog/insights/
[2]: /ja/real_user_monitoring/explorer
[3]: /ja/real_user_monitoring/explorer/search/#facets
[4]: /ja/real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[5]: /ja/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa