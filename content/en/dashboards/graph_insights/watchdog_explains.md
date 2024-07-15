---
title: Metric Correlations
aliases:
    - /graphing/correlations/
    - /dashboards/correlations/
further_reading:
- link: "/watchdog/insights/"
  tag: "Documentation"
  text: "Learn more about Watchdog Insights"
---

## Overview

<div class="alert alert-info">Watchdog Explains is available for <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">Timeseries widgets</a> with the <strong>Metric</strong> data source.</div>


Watchdog Explains is an investigation assitant that guides you to the root cause of anomalies on any timeseries graph. 

In Datadog, an investigation typically starts with graphs, then branches out into investigating individual assets. Watchdog Explains makes investigations more efficient by automatically showing which individual tags account for a given spike. This allows you to narrow in directly on problematic areas of your infrastructure or software stack.


## How does it work?

Watchdog Explains scans metric-based graphs to look for anomalies and dissects the anomaly to show which tags are responsible. It then compares the same timeseries data across each applicable tag group against the source graph to identify which ones represent that anomalous behavior. Watchdog Explains runs every single applicable group by and compares its similarity to the source graph. If a graph’s shape changes significantly by removing an individual group by, it infers that the tag is 'influential' and accounts for the spike. Watchdog Explains shows you evidence to quantify exactly how influential a given tag is.

## Investigate anomalies

Start your investigation from any timeseries metric graph. Open a graph in full screen to trigger Watchdog Explains.

[PLACEHOLDER FOR INVESTIGATION ACTIONS]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
