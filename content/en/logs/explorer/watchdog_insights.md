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

With Watchdog Insights, find your way faster to the root cause of problems with contextual insights you receive as you explore logs. Watchdog Insights complements your expertise and instincts, giving nudges toward where you could focus your troubleshooting attention. 

<div class="alert alert-warning">
Watchdog Insights for the Log Explorer is a beta feature, rolling out to customers using Log Management. If you have feedback, contact <a href="https://docs.datadoghq.com/help">Datadog support</a>.
</div>

In the following example, Watchog Insights highlights that `version:2.9.7` of a containerized Ruby application causes most of the errors observed in a specific time range. 

{{< img src="logs/explorer/watchdog_insights/overview.png" alt="Watchdog Insights" style="width:100%;" >}}

## Navigation

The Watchdog Insights banner appears in the Log Explorer results page and surfaces insights relevant to the current query:
 
{{< img src="logs/explorer/watchdog_insights/banner_collapsed.png" alt="Watchdog Insights banner (collapsed)" style="width:100%;" >}}

To see a quick overview of insights, expand the Watchdog Insight banner:

{{< img src="logs/explorer/watchdog_insights/banner_expanded.png" alt="Watchdog Insights banner (expanded)" style="width:100%;" >}}

For richer troubleshooting inspiration, click **View all** to open the Watchdog Insights side panel: 

{{< img src="logs/explorer/watchdog_insights/side_panel.png" alt="Watchdog Insights side panel" style="width:100%;" >}}

Each insight comes with its own embedded interactions and side panel with detailed troubleshooting material. The insight interactions and side panel vary depending on the [type of Watchdog Insight](#watchdog-insights-collections).

## Collections

### Error outliers

An error outliers insight shows fields (that is, [faceted tags or attributes][1]) that are characteristic of errors matching the current query. This casts light on `key:value` pairs that are statistically over-represented among the errors, giving you hints on the possible root cause of problems.

Typical error outliers examples are `env:staging`, `docker_image:acme:3.1` `http.useragent_details.browser.family:curl`.

* The **banner card** version of the insight shows:

  * The name of the field.
  * The proportion of errors and overall logs that this field is contributing.

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="Error Outlier card (S)" style="width:40%;" >}}

* The **side panel card** of the insight shows, in addition:

  * The main [log pattern][2] for error logs that have the field.

{{< img src="logs/explorer/watchdog_insights/error_outlier_l_card.png" alt="Error Outlier card (L)" style="width:60%;" >}}

* The **full side panel** of the card shows, in addition:

  * The timeseries for error logs that have the field.
  * Other fields that are often associated with those logs.
  * A comprehensive list of [log patterns][2] for those logs.

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Error Outlier side panel" style="width:60%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/facets/
[2]: https://docs.datadoghq.com/logs/explorer/#patterns
