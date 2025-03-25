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

{{<callout url="https://www.datadoghq.com/private-beta/watchdog-explains-graph-insights/" header="Access the Preview!">}}
Watchdog Explains is available in Preview. To request access, complete the form.
{{</callout >}}

<div class="alert alert-info">Watchdog Explains is available for <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">Timeseries widgets</a> with the <strong>Metric</strong> data source.</div>

{{< img src="dashboards/graph_insights/watchdog_explains/watchdog_explains_walkthrough.mp4" alt="A walkthrough of the Watchdog Explains product" video=true >}}

Watchdog Explains is an investigation assistant that guides you to the root cause of anomalies on any timeseries graph. 

In Datadog, an investigation typically starts with graphs, then branches out into investigating individual assets. Watchdog Explains makes investigations more efficient by automatically showing which individual tags account could be responsible for a given spike. This allows you to focus your investigation on problematic areas of your infrastructure or software stack.

## How does it work?

1. **Watchdog Explains runs anomaly detection** and determines if the graph shape or value changed from the historical pattern. It scans metric-based graphs to look for anomalies and dissects the anomaly to show which tags are responsible. 

2. **Then, it runs the same query filtered on each applicable tag group**. It compares the same timeseries data across each applicable tag group against the source graph to identify which ones represent that anomalous behavior. 
   - If a graph’s shape changes significantly by removing an individual tag group, it infers that the tag is mostly likely the cause of the spike. 
   - Watchdog Explains shows you evidence to quantify exactly how influential a given tag is.


## Investigate anomalies

Start your investigation from any timeseries metric graph. Open a graph in full screen to trigger Watchdog Explains.

{{< img src="dashboards/graph_insights/watchdog_explains/graph_anomaly_detection.png" alt="Watchdog Explains highlights the anomalous parts of a graph based on historical data" style="width:90%;" >}}

Watchdog Explains highlights anomalies with a pink box. On the right side panel, you can view the tags that are responsible for the spike. Click on a tag to see evidence of how it contributes to the graph shape.

{{< img src="dashboards/graph_insights/watchdog_explains/graph_filter_tag.png" alt="Filter out the offending tag, in this case researcher-query, to compare the original against what the graph would look like without the offending tag" style="width:90%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
