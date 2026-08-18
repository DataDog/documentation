---
title: Graph Insights
description: Discover potential root causes using Metric Correlations and dashboard anomaly detection to analyze irregular metric behavior.
disable_toc: false
further_reading:
- link: "/watchdog/insights/"
  tag: "Documentation"
  text: "Learn more about Watchdog Insights"
- link: "https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/"
  tag: "Blog"
  text: Anomaly detection, predictive correlations - Using AI-assisted metrics monitoring
---

## Overview

Graph insights can help you find potential root causes for an observed issue by searching for other metrics that exhibited irregular behavior around the same time. Metric Correlations scans your metrics from different sources, such as dashboards, integrations, APM, and custom metrics.

## Metric Correlations

<div class="alert alert-info">Metric Correlations is available for <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">Timeseries widgets</a> with the <strong>Metric</strong> data source.</div>

To target the search more effectively, Metric Correlations uses information about related dashboards and services. Correlations can sift through metrics from various sources, including APM, integrations, and dashboards, as well as arbitrary metric namespaces you select. It searches for irregularities in other metrics over the corresponding time period, enabling Datadog to automatically provide clues that facilitate a more efficient root cause analysis.

For more information, see the [Metric Correlations][1] documentation.

## Anomaly detection and investigation

<div class="alert alert-info">Anomaly detection is available for <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">Timeseries widgets</a> with the <strong>Metric</strong> data source.</div>

Datadog detects anomalies on the timeseries graphs of your dashboard and groups anomalies that occur together into issues. For each issue, it identifies the tags contributing most to the change, helping you answer the immediate questions:
- What is the source of the spike?
- Does this anomaly affect everyone, or is it an isolated incident?

From there, you can delegate root cause analysis to Bits Investigation. This replaces Watchdog Explains, which analyzed one anomaly at a time.

For more information, see [Investigate Dashboard Anomalies][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/graph_insights/correlations/
[2]: /dashboards/graph_insights/investigate_anomalies/