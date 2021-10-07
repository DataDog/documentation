---
title: Watchdog Insights for Logs
kind: documentation
description: 'Get Insights on where to Start or Follow-Up your Investigations'
further_reading:
    - link: 'https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/'
      tag: 'Blog'
      text: 'Accelerate your logs investigations with Watchdog Insights'
    - link: 'logs/explorer/side_panel'
      tag: 'Documentation'
      text: 'The log side panel'
    - link: 'logs/explorer/#list-of-logs'
      tag: 'Documentation'
      text: 'The list view of logs'

---

## Overview

Datadog Log Management offers Watchdog Insights to help you navigate to the root cause of problems with contextual insights in the Log Explorer. Watchdog Insights complement your expertise and instincts by recommending outliers and potential performance bottlenecks impacting a subset of users.

<div class="alert alert-warning">
Watchdog Insights for the Log Explorer is in beta. Access to this feature is provisioned to customers using Log Management. If you have feedback, contact <a href="https://docs.datadoghq.com/help">Datadog support</a>.
</div>

In this example, Watchog Insights identifies that the containerized Ruby application's `version:2.9.7` caused most of the errors observed in a given time range.

{{< img src="logs/explorer/watchdog_insights/overview.png" alt="Watchdog Insights" style="width:100%;" >}}

## Navigation

The Watchdog Insights banner appears in the **Log Explorer results** page and displays insights about the current query:

{{< img src="logs/explorer/watchdog_insights/banner_collapsed.png" alt="Watchdog Insights banner (collapsed)" style="width:100%;" >}}

To see an overview of all insights, expand the Watchdog Insight banner:

{{< img src="logs/explorer/watchdog_insights/banner_expanded.png" alt="Watchdog Insights banner (expanded)" style="width:100%;" >}}

To access the full Watchdog Insights side panel, click **View all**:

{{< img src="logs/explorer/watchdog_insights/side_panel.png" alt="Watchdog Insights side panel" style="width:100%;" >}}

Every insight comes with embedded interactions and a side panel with troubleshooting information. The insight interactions and side panel vary based on the Watchdog Insight type.

## Collections

### Error outliers

One type of insight includes error outliers that display fields such as [faceted tags or attributes][1] containing characteristics of errors that match the current query. Statistically overrepresented `key:value` pairs among errors provide hints into the root cause of problems.

Typical examples of error outliers include `env:staging`, `docker_image:acme:3.1`, and `http.useragent_details.browser.family:curl`.

In the **banner card** view, you can see:

  * The field name.
  * The proportion of errors and overall logs that the field contributes to.

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="Error Outlier card (S)" style="width:100%;" >}}

In the **side panel card** view, you can see the main [log pattern][2] of error logs with the field.

{{< img src="logs/explorer/watchdog_insights/error_outlier_l_card.png" alt="Error Outlier card (L)" style="width:100%;" >}}

In the **full side panel** view, you can see:

  * The timeseries of error logs that contain the field.
  * Tags that are often associated with the error logs.
  * A comprehensive list of [log patterns][2].

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Error Outlier side panel" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/facets/
[2]: /logs/explorer/#patterns
