---
title: Trace Cluster Map
description: Identify your LLM application's drifts by viewing its Cluster Map.
aliases:
  - "/llm_observability/cluster_map"
further_reading:
- link: "/llm_observability/"
  tag: "Documentation"
  text: "Learn about LLM Observability"
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about LLM Observability Key Terms and Concepts"
---

## Overview

You can identify drifts in your LLM applications by visualizing trace data in clusters on the [Clusters page][1]. Select an application configured with LLM Observability to view cluster information.

**Note:** Clustering can take up to **24 hours** after data is ingested to be fully processed and visible on the Cluster Map. During this time, spans that are not yet clustered appear under a **"Pending"** cluster.

Cluster Maps display inputs or outputs, grouped by [topic][2]. Inputs and outputs are clustered separately. Topics are determined by clustering the selected input or output into text embeddings in high dimensions, then projecting them into a 2D space.

{{< img src="llm_observability/cluster_map/scatter.png" alt="The scatter plot displays clusters of traces with color-coded topics and includes a panel listing clusters, trace counts, and failure rates." style="width:100%;" >}}

You can visualize the clusters by using a **Box Packing** or **Scatter Plot** layout.

- Box Packing gives you a grouped view of each of the clusters and overlays any metrics or evaluations on every trace.
- Scatter Plot, on the other hand, allows you to view the high dimensional text embeddings in a 2D space, although the distance between each trace may be misleading due to projection distortion.

Cluster Maps provide an overview of each cluster's performance across operational metrics, such as error types and latency, or [out-of-the-box or custom evaluations][3], enabling you to identify trends such as topic drift and additional quality issues.

<div class="alert alert-info"><strong>Built with Llama</strong>: The Cluster Map uses Llama to generate topic labels based on your instrumented LLM application's inputs and outputs. </div>

## Search and manage clusters

Customize your search query by selecting the sorting options to narrow down the clusters based on your specific criteria, such as evaluation metrics or time periods, for more targeted analysis.

1. Select `inputs` or `outputs` from the dropdown menu to see clusters for inputs or outputs grouped by topic.
1. Select an evaluation type or an evaluation score to color-code the clusters. For example, `Output Sentiment` for "What is the sentiment of the output?" or `duration` for "How long does it take for an LLM to generate an output (in nanoseconds)?"
1. Select a field for the clusters to be sorted by: time, duration, or color. Then, select **desc** or **asc** to set the order.

Select a topic cluster from the list to examine how inputs or outputs about specific topics perform against other topics for each metric or evaluation. You can also see individual prompts and responses for each cluster. For example, you can get an overview of your slowest topics when you overlay by `duration`.

{{< img src="llm_observability/cluster_map/box.png" alt="The box packing layout displays clusters of traces represented by colored circles, and includes a panel listing clusters with topics, trace counts, and failure rates." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/clusters
[2]: /llm_observability/evaluations/managed_evaluations/#enter-a-topic
[3]: /llm_observability/terms/#evaluations
