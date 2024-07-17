---
title: Graph Insights
disable_toc: false
further_reading:
- link: "/watchdog/insights/"
  tag: "Documentation"
  text: "Learn more about Watchdog Insights"
---

## Overview

Graph insights can help you find potential root causes for an observed issue by searching for other metrics that exhibited irregular behavior around the same time. Correlations scans your metrics from different sources such as dashboards, integrations, APM, and custom metrics.

## Metric Correlations

<div class="alert alert-info">Metric Correlations is available for <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">Timeseries widgets</a> with the <strong>Metric</strong> data source.</div>

To target the search more effectively, Metric Correlations utilizes information about related dashboards and services. Correlations can sift through metrics from various sources, including APM, integrations, and dashboards, as well as arbitrary metric namespaces you select. It searches for irregularities in other metrics over the corresponding time period, enabling Datadog to automatically provide clues that facilitate a more efficient root cause analysis.

For more information, see the [Metric Correlations][1] documentation.

## Watchdog Explains

<div class="alert alert-info">Watchdog Explains is available for <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">Timeseries widgets</a> with the <strong>Metric</strong> data source.</div>

Datadog collects various types of data to provide insights into application performance, including metrics, traces, and logs, which tell you what, how, and why something is happening. Watchdog Explains analyzes high-level trends such as latency, error rates, or request count evolution to detect critical signals. Upon observing a spike in these graphs, Watchdog Explains helps you investigate the immediate questions:
- What is the source of the spike?
- Does this anomaly affect everyone or is an isolated incident?

For more information, see the [Watchdog Explains][2] documentation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: dashboards/graph_insights/correlations
[2]: dashboards/graph_insights/watchdog_explains