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

It allows you to spot outliers at a glance, filter or group spans by the most relevant attributes, to pinpoint the root cause of performance or error anomalies in no time


_[add image]_

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

- the **Service Page Scatterplot Graph**: Select a cluster of spans by brushing over the scatterplot to compare those spans with others from the same timeframe.

{{< img src="/tracing/trace_explorer/tag_analysis/scatterplot_entrypoint.png" alt="Analyse scatterplot slice" style="width:80%;" >}}

### Defining Subset and Baseline

To perform a tag analysis:

1. Select a subset of spans that represents the anomaly (e.g., error or slow spans).
2. Define the baseline (either automatically from the rest of the data or by selecting another span group).
3. Datadog computes the most relevant tags and their values that differ between the subset and the baseline.

## Exploring Tag Analysis Results

Tag Analysis results appear in a side panel and include:

- **Ranked Attribute List:**  
  A list of the top tags and attribute values, ordered by relevance in distinguishing the subset from the baseline.

- **Visual Comparison:**  
  For time-based comparisons, the scatterplot helps refine the selected spans and visualize their behavior.

- **Next Actions:**  
  - Filter by a tag-value pair to isolate spans driving the issue  
  - Group by a relevant attribute to examine its distribution  
  - Drill deeper into associated traces or services

## Use Cases

Tag Analysis enables fast root cause isolation across a variety of scenarios:

- Latency spikes caused by a specific client app version
- Error increases tied to a few customer orgs
- Request surges originating from a certain region or IP range
- High-latency database queries scoped to a specific shard


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: app.datadoghq.com/apm/traces