---
title: Watchdog Insights for Log Explorer
kind: documentation
description: 'Rely on Watchdog Insights to surface meaningful signals within your current seach context.'
aliases:
    - /logs/explorer/insights
further_reading:
    - link: 'logs/explorer/group'
      tag: 'Documentation'
      text: 'Group queried logs'
    - link: 'logs/explorer/visualize'
      tag: 'Documentation'
      text: 'Create visualizations from logs'
    - link: '/logs/explorer/export'
      tag: 'Documentation'
      text: 'Export Log Explorer views'
---

## Overview

Datadog Logs Explorer offers Watchdog Insights to highlight signals that stand out within your search context based on the time frame and tags.

In the Log Explorer, Watchdog Insights surface logs based on patterns and specific tags that have been flagged by algorithms such as log anomaly detection and error outliers detection.

{{< img src="logs/explorer/insights/insights-carousel.png" alt="Watchdog Insights in Log Explorer" style="width:100%;" >}}

### Log Anomaly Detection

Ingested logs are analyzed at the intake level where Watchdog performs aggregations on detected patterns as well as `environment`, `service`,`source` and `status`tags.
These aggregated logs are scanned for anomalous behaviors, such as the following:
* There is an emergence of logs in statuses warning, error or above.
* The count of Logs in statuses warning, error or above is showing a sudden increase.


They are then surfaced as Insights in the Log Explorer when they match your current search context as well as any restrictions applied to your role.

{{< img src="logs/explorer/insights/log-anomalies-light.gif" alt="Log Anomalies as Insights" style="width:100%;" >}}

Clikcing on specific insight, you get access to a full description of the detected anomaly as well as the list of patterns contributing to it.

### Error Outliers



To begin searching for logs in Log Explorer, see the [Log Search Syntax documentation][1] and read the [time frame documentation][2] for more details on custom time frames.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/search-syntax
[2]: /dashboards/guide/custom_time_frames
[3]: /logs/indexes
