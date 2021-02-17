---
title: Watchdog Insights for Logs
kind: documentation
description: 'Get Insights on where to Start or Follow-Up your Investigations'
further_reading:
    - link: 'logs/explorer/side_panel'
      tag: 'Documentation'
      text: 'The log side panel'
    - link: 'logs/explorer/#list-of-logs'
      tag: 'Documentation'
      text: 'The list view of logs'
---

## Overview

With Watchdog Insights, find your way faster to the root cause of problems with contextual insights you receive as you explore logs. Watchdog insights complements your expertise and gut-feeling, giving nudges on where you could focus your troubleshooting attention. 

<div class="alert alert-warning">
Watchdog Insights for the Log Explorer is a BETA feature, available for customers using Log Management.
</div>

On the following example, Watchog Insights highlights that `version:2.9.7` of a containerized Ruby application causes most of errors observed in a specific timerange. 

{{< img src="logs/explorer/watchdog_insights/overview.png" alt="Watchdog Insights" style="width:100%;" >}}

## Navigating Watchdog Insights 

The Watchdog Insights banner comes on top of Log Explorer results. It runs in background, and eventually surfaces insights relevant to the current query. If you seek for troubleshooting inspiration:
 
{{< img src="logs/explorer/watchdog_insights/banner_collapsed.png" alt="Watchdog Insights banner (collapsed)" style="width:100%;" >}}

* Either **expand** the Watchdog Insight banner, meant for a quick overview on insights,

{{< img src="logs/explorer/watchdog_insights/banner_expanded.png" alt="Watchdog Insights banner (expanded)" style="width:100%;" >}}

* Or click **view all** to open the Watchdog Insight side panel, meant to navigate insights displayed with richer summary, 

{{< img src="logs/explorer/watchdog_insights/side_panel.png" alt="Watchdog Insights side panel" style="width:100%;" >}}

Each insight comes with its own embedded interactions and Side Panel with detailed troubleshooting material. The insight interactions and side panel vary depending on the [sort of Watchdog Insight](#watchdog-insight-collection).


## Watchdog Insights Collection


### Error Outliers

Error Outliers surface fields ([faceted][1] tags or attributes) that are characteristic of errors matching the current query.They are meant to accelerate troubleshooting by casting light on `key:value` that are statiscally over-represented among the errors, giving you hints on the possible root cause of problems.

Typical error outliers examples are `env:staging`, `docker_image:acme:3.1` `http.useragent_details.browser.family:curl`.

* The **banner card** version of the insight shows

  * the field
  * to what proportion of errors and overall logs this field is contributing,

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="Error Outlier card (S)" style="width:40%;" >}}

* The **side panel card** of the insight shows, in addition,

  * the main [log pattern][2] for error logs having that field,

{{< img src="logs/explorer/watchdog_insights/error_outlier_l_card.png" alt="Error Outlier card (L)" style="width:60%;" >}}

* The **full side panel** of the card shows, in addition, 

  * the timeseries for error logs having that field,
  * other fields often associated with those logs,
  * the comprehensive list of [log patterns][2] for those logs

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Error Outlier side panel" style="width:60%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/facets/
[2]: https://docs.datadoghq.com/logs/explorer/#patterns