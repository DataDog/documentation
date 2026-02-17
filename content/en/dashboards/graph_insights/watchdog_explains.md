---
title: Watchdog Explains
description: Automatically detect anomalies in timeseries graphs and identify contributing tags for faster root cause analysis.
aliases:
    - /graphing/correlations/
    - /dashboards/correlations/
further_reading:
- link: "/watchdog/insights/"
  tag: "Documentation"
  text: "Learn more about Watchdog Insights"
- link: "https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/"
  tag: "Blog"
  text: Anomaly detection, predictive correlations - Using AI-assisted metrics monitoring
---

## Overview

Watchdog Explains is an investigation assistant that detects anomalies on timeseries graphs and identifies which tags contribute to them. This allows you to immediately focus your investigation on problematic areas of your infrastructure or software stack.

To disable Watchdog Explains, see [Disabling anomaly detection](#disabling-anomaly-detection).

<div class="alert alert-info">Watchdog Explains is available for <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">Timeseries widgets</a> with <strong>Metric</strong> data (avg, sum, min, and max aggregation).</div>

## How Watchdog Explains detects anomalies

Watchdog Explains applies anomaly detection to graphs on your dashboard by analyzing both the shape and value of the underlying timeseries. It identifies deviations from historical patterns, flagging spikes, dips, or gradual drifts that don't align with expected behavior.

To account for seasonality, the algorithm looks back up to three weeks in time. For example, if a spike appears on a Monday at 9:00 a.m., Watchdog compares that datapoint against previous Mondays at the same hour. If similar patterns appear consistently, the spike is treated as **seasonal** and not flagged as an anomaly. This helps reduce false positives and ensures that only unexpected deviations are surfaced.

Anomalies can be sharp spikes or drops, but may also be more subtle trends like step changes or slope shifts.

<div class="alert alert-info">Anomaly detection in Watchdog Explains works with <strong>Metrics data</strong> (avg, sum, min, and max aggregation).</div>

## Watchdog Explains isolates the cause with dimensional analysis

You can start your investigation from any timeseries graph that uses metric data. When Watchdog Explains detects an anomaly, it highlights the affected region with a pink box. To begin investigating, click **Investigate Anomaly**.

This opens a full-screen investigation view. Watchdog analyzes the anomaly and surfaces any tag groups that significantly contributed to the shape or scale of the anomaly. Click on a tag to see how removing or isolating that dimension affects the graph. Use this to identify root causes like specific customers, services, or environments.

{{< img src="/dashboards/graph_insights/watchdog_explains/isolation_tag_breakdown.png" alt="Tag breakdown in Watchdog Explains investigation" style="width:100%;" >}}


## Disabling anomaly detection

<div class="alert alert-info">You can disable anomaly scanning on any dashboard. This only affects your view, other dashboard viewers still see anomalies unless they turn it off.
</div>

{{< img src="/dashboards/graph_insights/watchdog_explains/disable_anomaly_detection.png" alt="Disabling anomaly detection in Watchdog Explains" style="width:100%;" >}}

To disable anomaly detection on a dashboard, open **Anomalies** at the top of the dashboard and click **Turn Off**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
