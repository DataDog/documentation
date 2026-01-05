---
title: Tag Analysis
description: Identify tags and attributes that contribute to anomalies in tracing data using automated comparison analysis.
private: true
further_reading:
- link: 'tracing/trace_explorer'
  tag: 'Documentation'
  text: 'Trace Explorer'
- link: '/tracing/trace_explorer/trace_groups/'
  tag: 'Documentation'
  text: 'Trace Groups'
- link: 'https://www.datadoghq.com/blog/tag-analysis/'
  tag: 'Blog'
  text: "Find what's driving errors and latency with Tag Analysis"
---

## Overview

Tag Analysis helps you identify tags and attributes that contribute most significantly to anomalies in your tracing data, such as error spikes or latency issues. It automatically highlights dimensions that distinguish problematic spans from normal ones.

Tag Analysis allows you to spot outliers at a glance, filter or group spans by the most relevant attributes, and pinpoint the root cause of performance or error anomalies.

{{< img src="/tracing/trace_explorer/tag_analysis/tag_analysis_panel.png" alt="Tag analysis panel" style="width:80%;" >}}

Tag Analysis compares a subset of problematic spans (such as high-latency or error spans) against a baseline of normal spans (such as successful or low-latency spans). It then ranks the tags and attributes with the most significant differences between the two groups, surfacing the most impactful dimensions for further investigation.


Use Tag Analysis to answer questions such as:

- Are recent errors tied to a specific customer ID or organization?
- Is increased latency scoped to a certain region or Kubernetes cluster?
- Did a surge in request volume originate from a specific user or client application?

## Getting started

You can initiate Tag Analysis from several locations:

- **Trace Explorer Point Plot Visualization**: Select a cluster of spans by brushing over the graph (spanning duration and time range) to define a subset of spans to compare against. The same visualization can be found in [service][3] and [resource][4] pages.

{{< img src="/tracing/trace_explorer/tag_analysis/point_plot_explorer.png" alt="Trace Explorer Point plot selection" style="width:80%;" >}}

- **Trace Explorer Top Metrics** (Requests, Errors and Latency): Click **Analyze** next to the Errors or Latency graphs to discover tags contributing to errors or latency.

{{< img src="/tracing/trace_explorer/tag_analysis/red_metrics_entrypoint.png" alt="Analyze RED metrics" style="width:90%;" >}}

-**Trace Explorer Timeseries View**: Brush over a time window to define a subset of spans. Tag Analysis compares this selection to the rest of the time range.

{{< img src="/tracing/trace_explorer/tag_analysis/timeseries_entrypoint.png" alt="Analyze time range" style="width:80%;" >}}

## Exploring Tag Analysis results

Tag Analysis results appear in a side panel and include:

- **The subset and baseline definition**: For comparisons based on time and duration, a point plot graph represents the subset and baseline selections. Redraw the subset or baseline to refine the selection and compare specific duration and time ranges.

{{< img src="/tracing/trace_explorer/tag_analysis/subset_baseline_definition.png" alt="Subset and baseline detinifion" style="width:80%;" >}}

- **Ranked Attribute List**::  
  A list of the top tags and attribute values, ordered by relevance in distinguishing the subset from the baseline. Relevant dimensions are highlighted with a light pink background, and relevant `key:value` pairs are highlighted with a status pill on the row.

**Note**: The relevance score is computed based on the difference in the tag value distribution between the subset and the baseline.

{{< img src="/tracing/trace_explorer/tag_analysis/relevant_dimension.png" alt="Tag analysis relevant dimension" style="width:70%;" >}}

- From the analysis results, you can:
  - Color the point plot by any attribute for further investigation.
  - Group by a relevant attribute to examine and compare groups with [Trace Groups][2].
  - Filter by a `key:value` pair to isolate spans driving the issue.
  - Drill deeper into associated individual spans and traces.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: app.datadoghq.com/apm/traces
[2]: /tracing/trace_explorer/trace_groups
[3]: /tracing/services/service_page
[4]: /tracing/services/resource_page
