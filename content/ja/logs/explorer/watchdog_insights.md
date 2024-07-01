---
title: Watchdog Insights for Logs
kind: documentation
description: 'Get Insights on where to Start or Follow-Up your Investigations'
aliases:
    - /logs/explorer/insights
further_reading:
    - link: "https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/"
      tag: Blog
      text: Accelerate your logs investigations with Watchdog Insights
    - link: logs/explorer/side_panel
      tag: Documentation
      text: More information on the log side panel
    - link: "logs/explorer/#list-of-logs"
      tag: Documentation
      text: Learn more about Log Explorer

---

## Overview

Datadog Log Management offers Watchdog Insights to help you resolve incidents faster with contextual insights in the Log Explorer. Watchdog Insights complement your expertise and instincts by surfacing suspect anomalies, outliers, and potential performance bottlenecks impacting a subset of users.

{{< img src="logs/explorer/watchdog_insights/insights-for-log-explorer.png" alt="The log explorer showing the Watchdog Insights banner with five log anomalies" style="width:100%;" >}}

## Navigation

The Watchdog Insights banner appears in the [Log Explorer][1] and displays insights about the current query:

{{< img src="logs/explorer/watchdog_insights/banner_collapsed.png" alt="The Watchdog Insights banner in the collapsed view" style="width:100%;" >}}

To see an overview of all insights, expand the Watchdog Insight banner:

{{< img src="logs/explorer/watchdog_insights/banner_expanded.png" alt="The Watchdog Insights banner showing three error outliers" style="width:100%;" >}}

To access the full Watchdog Insights side panel, click **View all**:

{{< img src="logs/explorer/watchdog_insights/side_panel.png" alt="The Watchdog Insights side panel showing more details about the error outliers" style="width:100%;" >}}

Every insight comes with embedded interactions and a side panel with troubleshooting information. The insight interactions and side panel vary based on the Watchdog Insight type.

## Insight Types

[Watchdog Insights][8] surfaces anomalies and outliers detected on specific tags, enabling you to investigate the root cause of an issue. [Insights][9] are discovered from APM, Continuous Profiler, Log Management, and infrastructure data that include the `service` tag. The two types of insights specific to Log Management are:

- [Log Anomaly Detection](#log-anomaly-detection)
- [Error Outliers](#error-outliers)

### Log Anomaly Detection

Ingested logs are analyzed at the intake level where Watchdog performs aggregations on detected patterns as well as `environment`, `service`, `source` and `status` tags.
These aggregated logs are scanned for anomalous behaviors, such as the following:

- An emergence of logs with a warning or error status.
- A sudden increase of logs with a warning or error status.


The logs surface as Insights in the Log Explorer, matching the search context and any restrictions applied to your role.

{{< img src="logs/explorer/watchdog_insights/log-anomalies-light-cropped.mp4" alt="A user scrolling through the details of a specific insight" video="true">}}

Click on a specific insight to see the full description of the detected anomaly as well as the list of patterns contributing to it.

Anomalies that Watchdog determines to be particularly severe are also surfaced in the [Watchdog alerts feed][6] and can be alerted on by setting up a [Watchdog logs monitor][7].
A severe anomaly is defined as:

* containing error logs
* lasting at least 10 minutes (to avoid transient errors)
* having a significant increase (to avoid small increases)

For more information about searching logs in the Log Explorer, see [Log Search Syntax][2] and [Custom Time Frames][3].

### Error Outliers

Error outliers display fields such as [faceted tags or attributes][4] containing characteristics of errors that match the current query. Statistically overrepresented `key:value` pairs among errors provide hints into the root cause of problems.

Typical examples of error outliers include `env:staging`, `docker_image:acme:3.1`, and `http.useragent_details.browser.family:curl`.

In the **banner card** view, you can see:

  * The field name.
  * The proportion of errors and overall logs that the field contributes to.

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="The error outlier card showing a red bar with 73.3% of total errors and a blue bar with 8.31% of total errors" style="width:50%;" >}}

In the **side panel card** view, you can see the main [log pattern][5] of error logs with the field.

{{< img src="logs/explorer/watchdog_insights/error_outlier_l_card.png" alt="Error Outlier card (L)" style="width:100%;" >}}

In the **full side panel** view, you can see:

  * The timeseries of error logs that contain the field.
  * Tags that are often associated with the error logs.
  * A comprehensive list of [log patterns][5].

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Error Outlier side panel" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://app.datadoghq.com/logs
[2]: /logs/search-syntax
[3]: /dashboards/guide/custom_time_frames
[4]: /logs/explorer/facets/
[5]: /logs/explorer/analytics/patterns
[6]: https://app.datadoghq.com/watchdog
[7]: /monitors/types/watchdog/
[8]: /watchdog/
[9]: /watchdog/insights/?tab=logmanagement#outlier-types
