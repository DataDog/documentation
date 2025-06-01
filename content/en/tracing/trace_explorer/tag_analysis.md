---
title: Tag Analysis
description: "Tag analysis"
private: true
aliases:
further_reading:
- link: 'tracing/trace_explorer'
  tag: 'Documentation'
  text: 'Trace Explorer'
- link: '/tracing/trace_explorer/trace_groups/'
  tag: 'Documentation'
  text: 'Trace Groups'
---

{{< callout url="https://www.datadoghq.com/support/" header="Request access to the Preview!" >}}
Tag Analysis is in Preview. To request access, contact Datadog support.
{{< /callout >}}

## Overview

Tag Analysis helps you quickly identify which tags and attributes contribute most significantly to anomalies in your tracing data, such as error spikes or latency issues, by automatically highlighting the dimensions that distinguish problematic spans from normal ones.

It allows you to spot outliers at a glance, filter or group spans by the most relevant attributes, to pinpoint the root cause of performance or error anomalies in no time.

{{< img src="/tracing/trace_explorer/tag_analysis/tag_analysis_panel.png" alt="Tag analysis panel" style="width:80%;" >}}

Tag analysis relies on a comparison of a subset of spans (such as high-latency or error spans) against a baseline set (such as successful or fast spans), then ranks the tags and attributes that differ most between the two groups, surfacing the most impactful dimensions for further investigation.

#### When is tag analysis useful ?

Use Tag Analysis to answer questions like:

- Are recent errors tied to a specific customer ID or org?
- Is increased latency scoped to a certain region or Kubernetes cluster?
- Did a surge in request volume originate from a specific user or client app?

## Getting Started

You can trigger Tag Analysis from :

- the **Trace Explorer Top Metrics** (Requests, Errors and Latency):
  click `Analyze` next to the Errors or Latency graph to discover which tags contribute to the errors.

{{< img src="/tracing/trace_explorer/tag_analysis/red_metrics_entrypoint.png" alt="Analyze RED metrics" style="width:90%;" >}}

- the **Trace Explorer Timeseries View**: Brush over a time window to define a subset of spans. Tag Analysis compares this selection to the rest of the time range.

{{< img src="/tracing/trace_explorer/tag_analysis/timeseries_entrypoint.png" alt="Analyze time range" style="width:80%;" >}}

- the **Trace Explorer and Service Page Scatterplot Graph**: Select a cluster of spans by brushing over the graph in two dimensions to select a subset of spans of interest (duration and time range) to compare to other spans.

{{< img src="/tracing/trace_explorer/tag_analysis/scatterplot_entrypoint.png" alt="Analyse scatterplot slice" style="width:80%;" >}}

From there, a side panel opens showing:
1. the selection of the subset and baseline spans that are being compared against.
2. the list of span tags and attributes, sorted by most relevant, with the comparison of their values' distribution.

## Exploring Tag Analysis Results

Tag Analysis results appear in a side panel and include:

- **The subset and baseline definition:**
  For time and duration based comparisons, the subset and baseline selection are represented with a scatterplot graph. Redraw the subset or baseline to refine the selection and compare specific duration and time ranges.

{{< img src="/tracing/trace_explorer/tag_analysis/subset_baseline_definition.png" alt="Subset and baseline detinifion" style="width:80%;" >}}

- **Ranked Attribute List:**  
  A list of the top tags and attribute values, ordered by relevance in distinguishing the subset from the baseline. Relevant dimensions are highlighted with a light pink background while relevant key:value pairs are highlighted with a pink status pill on the row.

**Note:** The relevance score is computed based on the difference in the tag value distribution between the subset and baseline.

{{< img src="/tracing/trace_explorer/tag_analysis/relevant_dimension.png" alt="Tag analysis relevant dimension" style="width:70%;" >}}

- **Next Actions:**  
  - Color the scatter plot by any attribute that you wish to investigate further.
  - Group by a relevant attribute to examine and compare groups with [Trace Groups][2]
  - Filter by a `key:value` pair to isolate spans driving the issue
  - Drill deeper into associated individual spans and traces

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: app.datadoghq.com/apm/traces
[2]: /tracing/trace_explorer/trace_groups