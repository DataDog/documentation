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

## Overview
Thus a change

Patterns automatically clusters your LLM application's production traffic into meaningful topics, helping you understand what users are asking, identify coverage gaps, and diagnose failure modes. Select an application configured with LLM Observability to view pattern information on the [**Patterns** page][1].

Patterns uses text embeddings to group your application's inputs or outputs into hierarchical topics. Topic labels are automatically generated using an LLM, giving you an interpretable view of production behavior without manual tagging.

{{< img src="llm_observability/cluster_map/scatter.png" alt="The scatter plot displays clusters of traces with color-coded topics and includes a panel listing clusters, trace counts, and failure rates." style="width:100%;" >}}

<div class="alert alert-info"><strong>Built with Llama</strong>: Patterns uses Llama to generate topic labels based on your instrumented LLM application's inputs and outputs.</div>

**Note:** Clustering can take up to **24 hours** after data is ingested to be fully processed and visible. During this time, spans that are not yet clustered appear under a **Pending** cluster.

## How Patterns works

Patterns processes your LLM application's trace data through an automated pipeline:

1. **Embedding generation**: Inputs and outputs from your LLM spans are converted into text embeddings.
2. **Clustering**: Embeddings are grouped into clusters in high-dimensional space based on semantic similarity.
3. **Topic labeling**: An LLM generates human-readable topic labels for each cluster.
4. **Hierarchical organization**: Topics are organized into a tree structure, with broad categories containing more specific sub-topics.
5. **Projection**: High-dimensional clusters are projected into 2D space for visualization.

Inputs and outputs are clustered separately, so you can analyze what users are asking (inputs) and how your application responds (outputs) independently.

## Explore topics

The Patterns page shows your topics in two views:

### Topic table

The topic table provides a hierarchical view of all discovered topics. Each topic shows:

- **Topic name**: An automatically generated label describing the cluster content.
- **Trace count**: The number of traces in the topic.
- **Metrics**: Operational metrics such as error rate, latency, and evaluation scores.

Expand parent topics to see their sub-topics and examine specific areas of your application's traffic.

### Visualizations

You can visualize topics using two layouts:

- **Box Packing**: A grouped view of each cluster, with metrics or evaluations overlaid on every trace. Use this to compare cluster sizes and quality at a glance.
- **Scatter Plot**: A 2D projection of the high-dimensional embeddings. Traces that are semantically similar appear closer together. Note that distances may be affected by projection distortion.

{{< img src="llm_observability/cluster_map/box.png" alt="The box packing layout displays clusters of traces represented by colored circles, and includes a panel listing clusters with topics, trace counts, and failure rates." style="width:100%;" >}}

## Search and filter topics

Customize your view by selecting sorting options to narrow down topics based on specific criteria:

1. Select **inputs** or **outputs** from the dropdown menu to see topics for inputs or outputs.
1. Select an evaluation type or an evaluation score to color-code the clusters. For example, `Output Sentiment` for "What is the sentiment of the output?" or `duration` for "How long does it take for an LLM to generate an output (in nanoseconds)?"
1. Select a field for the clusters to be sorted by: time, duration, or color. Then, select **desc** or **asc** to set the order.

Select a topic from the list to examine how traces about that topic perform against other topics for each metric or evaluation. You can also see individual prompts and responses for each topic.

## Curate topics

After reviewing the automatically discovered topics, you can refine them to better reflect your application's domain:

- **Rename**: Update a topic's label to use terminology specific to your domain.
- **Merge**: Combine similar or duplicate topics into a single topic.
- **Split**: Break an overly broad topic into more specific sub-topics.
- **Remove**: Remove irrelevant data points from a topic. Removed points become unassigned and are re-clustered in subsequent runs.
- **Persist**: Mark a topic as stable so it is preserved across subsequent pipeline runs.

Curated topics act as training signals for future clustering runs, improving the accuracy of topic assignments over time.

## Trigger a new run

You can trigger a new clustering pipeline run to re-analyze your production traffic. After curation changes, triggering a new run incorporates your feedback:

- Persisted topics are maintained as stable anchors.
- Re-clustering respects your curation decisions (merges, splits, removals).
- New data since the last run is incorporated into the analysis.

## Use topics to improve your application

Patterns helps you take action on production insights:

- **Identify coverage gaps**: Compare the distribution of production traffic topics against your evaluation [datasets][2] to find under-tested areas.
- **Build targeted datasets**: Add representative traces from specific topics to datasets for use in [experiments][3].
- **Monitor quality by topic**: Overlay [evaluations][4] (such as sentiment, failure to answer, or hallucination) to identify which topics have the highest failure rates.
- **Detect drift**: Track how topic distributions change over time to identify emerging usage patterns or shifts in user behavior.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/clusters
[2]: /llm_observability/experiments/datasets
[3]: /llm_observability/experiments/
[4]: /llm_observability/evaluations/
