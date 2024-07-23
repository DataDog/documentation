---
title: Watchdog Explains
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

{{< img src="dashboards/graph_insights/watchdog_explains/watchdog_explains_walkthrough.mp4" alt="Your image description" video=true >}}

Watchdog Explains is an investigation assitant that guides you to the root cause of anomalies on any timeseries graph. 

In Datadog, an investigation typically starts with graphs, then branches out into investigating individual assets. Watchdog Explains makes investigations more efficient by automatically showing which individual tags account could be responsible for a given spike. This allows you to focus your investigation on problematic areas of your infrastructure or software stack.

## How does it work?

Watchdog Explains scans metric-based graphs to look for anomalies and dissects the anomaly to show which tags are responsible. It then compares the same timeseries data across each applicable tag group against the source graph to identify which ones represent that anomalous behavior. Watchdog Explains runs every single applicable group by and compares its similarity to the source graph. If a graph’s shape changes significantly by removing an individual group by, it infers that the tag is mostly likely the cause of the spike. Watchdog Explains shows you evidence to quantify exactly how influential a given tag is.

## Investigate anomalies

Start your investigation from any timeseries metric graph. Open a graph in full screen to trigger Watchdog Explains.

{{< img src="dashboards/graph_insights/watchdog_explains/graph_anomaly_detection.png" alt="Watchdog Explains highlights the anomalous parts of a graph based on historical data" style="width:100%;" >}}

Watchdog Explains highlights the timeframe when the spike is taking place with a pink box. On the right panel, you can view the tag group or tag groups that might be responsible for the spike. 

{{< img src="dashboards/graph_insights/watchdog_explains/graph_filter_tag.png" alt="Filter out the offending tag, in this case researcher-query, to compare the original against what the graph would look like without the offending tag" style="width:100%;" >}}

Click each tag or group to see Watchdog's analysis on the impact that that tag has on the overall shape of the graph. Click **Filter "Your tag group"** to compare what the graph would look like if you removed the tag and compare it against the original. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
