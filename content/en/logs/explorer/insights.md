---
title: Watchdog Insights for Log Explorer
kind: documentation
description: 'Rely on Watchdog Insights to surface anomalous logs within your search context.'
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
- An emergence of logs with a warning or error status.
* A sudden increase of logs with a warning or error status.


The logs surface as Insights in the Log Explorer, matching the search context and any restrictions applied to your role.

{{< img src="logs/explorer/insights/log-anomalies-light.gif" alt="Log Anomalies as Insights" style="width:100%;" >}}

Clikcing on specific insight, you get access to a full description of the detected anomaly as well as the list of patterns contributing to it.

### Error Outliers



For more information about searching logs in the Log Explorer, see [Log Search Syntax][1] and [Custom Time Frames][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/search-syntax
[2]: /dashboards/guide/custom_time_frames
[3]: /logs/indexes
