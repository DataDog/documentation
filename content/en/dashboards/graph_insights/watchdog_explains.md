---
title: Watchdog Explains
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

<div class="alert alert-info">Watchdog Explains is available for <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">Timeseries widgets</a> with the <strong>Metric</strong> data source.</div>

Watchdog Explains is an investigation assistant that guides you to the root cause of anomalies on timeseries graphs. 

In Datadog, an investigation typically starts with graphs, then branches out into investigating individual assets. Watchdog Explains makes investigations more efficient by automatically showing which individual tags account could be responsible for a given spike. This allows you to focus your investigation on problematic areas of your infrastructure or software stack.

## How does it work?

1. **Watchdog Explains runs anomaly detection** on your dashboard and determines if the graph shape or value changed from the historical pattern. It scans metric-based graphs to look for anomalies and dissects the anomaly to show which tags are responsible. 

2. **Then, it runs the same query filtered on each applicable tag group**. It compares the same timeseries data across each applicable tag group against the source graph to identify which ones represent that anomalous behavior. 
   - If a graph's shape changes significantly by removing an individual tag group, it infers that the tag is mostly likely the cause of the spike. 
   - Watchdog Explains shows you evidence to quantify exactly how influential a given tag is.


## Investigate anomalies

Start your investigation from any timeseries metric graph. Watchdog Explains highlights anomalies with a pink box. Click on a datapoint inside a pink highlight, and select **View anomaly in full screen**.

On the full-screen graph, you can view the tags that are responsible for the anomaly. Click on a tag to see how it contributes to the graph shape.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
