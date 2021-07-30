---
title: Watchdog Insights for RUM
kind: documentation
description: 'Get Insights on where to Start or Follow-Up your Investigations'
further_reading:
- link: "/real_user_monitoring/explorer/search/"
  tag: "Documentation"
  text: "Learn more about search in the RUM Explorer"
- link: "https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals"
  tag: "Blog"
  text: "Monitor Core Web Vitals with RUM"
- link: "https://www.datadoghq.com/blog/datadog-mobile-rum/"
  tag: "Blog"
  text: "Improve mobile user experience with Datadog Mobile RUM"
---

## Overview

With Watchdog Insights, find your way faster to the root cause of problems with contextual insights you receive as you explore Real User Monitoring (RUM) events. Watchdog Insights complements your expertise and instincts, giving nudges toward where you could focus your troubleshooting attention. 

<div class="alert alert-warning">
Watchdog Insights for RUM is in beta. Access to this feature is provisioned to customers using Real User Monitoring. If you have feedback, contact [Datadog support][5].
</div>

In this example, Watchdog Insights identifies that the deployed application instance on `view.url_host:www.shopist.io` caused most of the errors in a given time range (for example, the past day).

{{< img src="real_user_monitoring/explorer/watchdog_insights/overview.png" alt="Watchdog Insights" style="width:100%;" >}}

## Navigation

The Watchdog Insights banner appears in the **RUM Explorer results** page and displays insights about the current query:
 
{{< img src="real_user_monitoring/explorer/watchdog_insights/banner_collapsed.png" alt="Watchdog Insights banner (collapsed)" style="width:100%;" >}}

To see an overview of all insights, expand the Watchdog Insight banner:

{{< img src="real_user_monitoring/explorer/watchdog_insights/banner_expanded.png" alt="Watchdog Insights banner (expanded)" style="width:100%;" >}}

To access the full Watchdog Insights panel, click **View all**: 

{{< img src="real_user_monitoring/explorer/watchdog_insights/side_panel.png" alt="Watchdog Insights side panel" style="width:100%;" >}}

Every insight comes with embedded interactions and a side panel with troubleshooting information. The insight interactions and side panel vary based on the [Watchdog Insights type](#collections).

## Collections

### Error outliers

One type of insight includes error outliers that display fields such as [faceted tags or attributes][1] containing characteristics of errors that match the current query. Statistically overrepresented `key:value` pairs among errors provide hints into the root cause of problems.

Typical examples of error outliers include `env:staging`, `version:1234`, and `browser.name:Chrome`.

In the **banner card** and **side panel card** view, you can see:

* The field name.
* The proportion of errors and overall RUM events that the field contributes to.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_m_card.png" alt="Error Outlier banner card and side panel card view" style="width:100%;" >}}

In the **full side panel**, you can see a timeseries of RUM errors with the field.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Error Outlier full side panel" style="width:100%;" >}}

### Latency outliers

Another type of insight includes latency outliers that display fields such as [faceted tags or attributes][1]) associated with performance bottlenecks and match the current query. `key:value` pairs with worse performance than the baseline provide hints into performance bottlenecks among a subset of real users.

Latency outliers are computed for [Core Web Vitals][2] such as First Contentful Paint, First Input Delay, and Cumulative Layout Shift, and [Loading Time][3].

In the **banner card** view, you can see:

* The field name.
* The performance metric value containing the field and the baseline for the rest of the data.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_s_card.png" alt="Latency Outlier banner card view" style="width:100%;" >}}

In the **side panel card** view, you can see a timeseries of the performance metric for the field and baseline for the rest of the data.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_l_card.png" alt="Latency Outlier side panel view" style="width:100%;" >}}

In the **full side panel** view, you can see a list of RUM events that contain the field. Look for the root cause of the performance issue in the [performance waterfall][4].

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel.png" alt="Latency Outlier full side panel view" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/facets/
[2]: /real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[3]: /real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
[4]: /real_user_monitoring/explorer/?tab=facets#event-side-panel
[5]: https://docs.datadoghq.com/help
