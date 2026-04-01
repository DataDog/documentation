---
title: Patterns
description: Discover and analyze production traffic patterns in your LLM applications with automated topic clustering.
aliases:
  - "/llm_observability/cluster_map"
  - "/llm_observability/monitoring/cluster_map"
further_reading:
- link: "/llm_observability/"
  tag: "Documentation"
  text: "Learn about LLM Observability"
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about LLM Observability Key Terms and Concepts"
- link: "/llm_observability/experiments/datasets"
  tag: "Documentation"
  text: "Learn about Datasets"
---
{{< callout url="https://www.datadoghq.com/product/ai/llm-observability/" btn_hidden="false" header="Join the Preview">}}
Topic Pattern Analysis is in Preview.
{{< /callout >}}

## Overview

Patterns automatically clusters your LLM application's production traffic into meaningful topics, helping you understand what users are asking, identify coverage gaps, and diagnose failure modes.


## How it works

Patterns uses text embeddings to group your application's inputs into hierarchical topics. Topic labels are automatically generated using an LLM, giving you an interpretable view of production behavior without manual tagging.

When you run a pipeline, Pattern Analysis:

1. Pulls LLM interactions from your production traffic based on your filter and sampling configuration
2. Embeds interactions semantically and clusters them
3. Names each cluster with an AI-generated label and summary
4. Organizes clusters into a parent-child topic hierarchy

Each topic shows its interaction volume, share of total traffic, and a coherence score — a measure of how semantically similar the interactions within the topic are to each other (0.0–1.0). Interactions that don't fit any cluster are collected into an Outliers group.

## Explore your Patterns

### Read the summary metrics

The top of the Patterns page shows three numbers from your most recent run:
1. **Total interactions:** How many interactions were analyzed
2. **Identified topics:** The total number of distinct topics found, including parent and child topics
3. **Classified:** The percentage of analyzed interactions assigned to a named topic — interactions in Outliers count as unclassified

A high **Classified** percentage (above 80%) means the pipeline found meaningful structure in your traffic. A low percentage suggests high variance across interaction types, or a filter that spans very different use cases.

{{< img src="llm_observability/Patterns.png" alt="The Patterns page displays traces grouped by topic." style="width:100%;" >}}

### Navigate the Topic list

The Patterns page shows your topics in two views:

### Topic heirarchy

The topic table provides a hierarchical view of all discovered topics. Each topic shows:

- **Topic name** — auto-generated based on the interactions in the cluster
- **Summary** — a plain-language description of what the topic represents
- **Interactions** — count and percentage of total traffic
- **Coherence** — a measure of how semantically similar the interactions within the topic are to each other (0.0–1.0)

Expand parent topics to see their sub-topics and examine specific areas of your application's traffic.

### Drill into a topic

Click any topic name to open the detail view. Here you can:

- Read the *summary* of what this topic represents
- View the scatter plot — each dot is an interaction, plotted by semantic similarity. - Tighter clusters mean higher coherence.
- Browse the interactions table — real user inputs and outputs from production, with the sub-topic label and a confidence score for each
- Navigate to child topics listed below the scatter plot

{{< img src="llm_observability/topic-detail.png" alt="Topic detail view showing scatter plot of interaction embeddings alongside a table of interactions with topic labels and confidence score" style="width:100%;" >}}

## Trigger a new run

You can trigger a new clustering pipeline run to re-analyze your production traffic.

1. Click Run Pipeline.
2. Configure your analysis:
- Filter: Scope to a specific application, environment, or span type. 
- Sampling rate: Set what percentage of matching interactions to include. The pipeline processes up to 50,000 records per run; if your filter matches more than that, records are randomly sampled down to the cap.
- Minimum Cluster Size (Advanced): Set the minium threshold for topic formation
3. Click Run. The pipeline runs in the background and takes approximately 50 minutes — you can close the page.

When the pipeline completes, the Patterns page updates with the run date, lookback window, and status.


## Use topics to improve your application

### Understand your production traffic

The topic list answers the question teams ask first: *what are users actually doing with this application?*

Use traffic percentage to identify your most common use cases. Use the parent-child hierarchy to move from a high-level pattern down to the specific sub-patterns underneath.

### Find eval coverage gaps

Compare your topic distribution against what your golden datasets actually cover. Topics that represent high production volume but have no corresponding eval cases are where your test coverage has gaps — and where model regressions are least likely to be caught before they reach users.

### Diagnose failure patterns

Scope your pipeline filter to spans with poor quality scores or failed evaluations, then run the pipeline. The resulting topic taxonomy shows which types of requests are failing most — giving you a structured way to prioritize fixes instead of debugging trace by trace.

### Track how traffic evolves

Re-run the pipeline periodically and compare topic distributions over time. When a new topic appears near the top that wasn't there last month, that's a signal your users have found a new use case — or a new failure mode.
