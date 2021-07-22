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
Watchdog Insights for RUM is a beta feature, rolling out to customers using RUM. If you have feedback, contact <a href="https://docs.datadoghq.com/help">Datadog support</a>.
</div>

In the following example, Watchog Insights highlights that the instance of our application deployed on `view.url_host:www.shopist.io` causes most of the errors observed in a specific time range. 

{{< img src="real_user_monitoring/explorer/watchdog_insights/overview.png" alt="Watchdog Insights" style="width:100%;" >}}

## Navigation

The Watchdog Insights banner appears in the RUM Explorer results page and surfaces insights relevant to the current query:
 
{{< img src="real_user_monitoring/explorer/watchdog_insights/banner_collapsed.png" alt="Watchdog Insights banner (collapsed)" style="width:100%;" >}}

To see a quick overview of insights, expand the Watchdog Insight banner:

{{< img src="real_user_monitoring/explorer/watchdog_insights/banner_expanded.png" alt="Watchdog Insights banner (expanded)" style="width:100%;" >}}

For richer troubleshooting inspiration, click **View all** to open the Watchdog Insights side panel: 

{{< img src="real_user_monitoring/explorer/watchdog_insights/side_panel.png" alt="Watchdog Insights side panel" style="width:100%;" >}}

Each insight comes with its own embedded interactions and side panel with detailed troubleshooting material. The insight interactions and side panel vary depending on the [type of Watchdog Insight](#collections).

## Collections

### Error outliers

An error outliers insight shows fields (that is, [faceted tags or attributes][1]) that are characteristic of errors matching the current query. This casts light on `key:value` pairs that are statistically over-represented among the errors, giving you hints on the possible root cause of problems.

Typical error outliers examples are `env:staging`, `version:1234`, or `browser.name:Chrome`.

* The **banner card** and the **side panel card** version of the insight both show:

  * The name of the field.
  * The proportion of errors and overall RUM events that this field is contributing.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_m_card.png" alt="Error Outlier card (M)" style="width:60%;" >}}

* The **full side panel** of the card shows, in addition:

  * The timeseries for RUM errors that have the field.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Error Outlier side panel" style="width:60%;" >}}

### Latency outliers

A latency outliers insight shows fields (that is, [faceted tags or attributes][1]) that are associated with performance bottlenecks, matching the current query. This casts light on `key:value` pairs that are having worse performance than the baseline, allowing you to uncover performance bottlenecks among a subset of real users.

Latency outliers are computed for [Core Web Vitals][2] (First Contentful Paint, First Input Delay and Cumulative Layout Shift) and [Loading Time][3].

* The **banner card** version of the insight shows:

  * The name of the field.
  * The value of the performance metric that has this field, and what the baseline is for the rest of the data.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_s_card.png" alt="Latency Outlier card (S)" style="width:60%;" >}}

* The **side panel card** of the insight shows, in addition:

  * The timeseries of the performance metric for this field, and of the baseline for the rest of the data.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_l_card.png" alt="Latency Outlier card (L)" style="width:60%;" >}}

* The **full side panel** of the card shows, in addition:

  * A list of RUM views that have this field, to be able to find the root cause of the performance issue in the [performance waterfall][4].

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel.png" alt="Latency Outlier side panel" style="width:60%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/facets/
[2]: /real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[3]: /real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
[4]: /real_user_monitoring/explorer/?tab=facets#event-side-panel