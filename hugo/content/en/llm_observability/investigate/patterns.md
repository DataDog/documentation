---
title: Patterns
description: Discover and analyze production traffic patterns in your agent with automated topic clustering.
aliases:
  - "/llm_observability/cluster_map"
  - "/llm_observability/monitoring/cluster_map"
  - "/llm_observability/investigate/cluster_map"
  - /llm_observability/monitoring/patterns/
further_reading:
- link: "/llm_observability/"
  tag: "Documentation"
  text: "Learn about Agent Observability"
- link: "/llm_observability/quickstart/terms/"
  tag: "Documentation"
  text: "Learn about Agent Observability Key Terms and Concepts"
- link: "/llm_observability/improve/datasets"
  tag: "Documentation"
  text: "Learn about Datasets"
- link: "https://learn.datadoghq.com/courses/llm-obs-investigations"
  tag: "Learning Center"
  text: "Investigate with LLM Observability"
- link: "https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications"
  tag: "Learning Center"
  text: "Tracing LLM Applications"
- link: "https://www.datadoghq.com/blog/patterns-agent-observability/"
  tag: "Blog"
  text: "Understand production LLM behavior with Patterns in Agent Observability"
---


## Overview

Patterns automatically clusters your LLM application's production traffic into meaningful topics, helping you understand what users are asking, identify coverage gaps, and diagnose failure modes.

You can create multiple named Patterns, each scoped to a different application, span type, or use case.

## How it works

Patterns uses a mix of calls to your [connected LLM provider account][1] and text embeddings to give you an interpretable view of production behavior without manual tagging.

When you run a Pattern, it:

1. Pulls LLM interactions from your production traffic based on your filter and sampling configuration
2. Summarizes each interaction with AI-generated text
3. Computes text embedding of these summaries using a self-hosted, open source model
4. Forms clusters using machine learning (UMAP and HDBSCAN)
5. Reviews each cluster and generates meaningful topics with AI-generated text
6. Attributes each interaction to a single topic
7. Builds a hierarchy using AI by grouping similar topics together

Each topic shows its interaction volume and share of total traffic. Interactions that don't fit any cluster are collected into an Outliers group.

## Set up a Pattern

1. In Datadog, navigate to **AI Observability** > **Agent Observability** > [**Patterns**][4].
1. Click **+ New Pattern**.
1. Enter a **Name**.
1. Use the **Application** multi-selector to choose one or more LLM applications to include spans for. Selecting applications automatically updates the underlying span filter query, and editing the query updates the selected applications.
1. Under **Setup**:
  1. (Optional) Write a short **Clustering Instruction** to provide free-form guidance to how Patterns should group interactions and generate topics, such as user intent, agent task or product used. For example, to cluster based on the user intent, you can write "Cluster based on the user intent". Changing this field after a first successful run **will delete the topics found and persisted** in previous Patterns runs. Leave this blank to group interactions by each interaction's main goal.
  1. Select the variables in your interaction you want Patterns to **Cluster on**. Use `{{variable}}` syntax to reference any span field; for example, `{{meta.input.value}}` to analyze patterns by user input, or `{{meta.span.kind}}` to analyze by span kind.
  1. Add precise **Filters** to better select the interactions you want to cluster with Patterns.
  1. Set the **Time window** to define the lookback period for interactions to analyze.
  1. **Sampling** of the matched interactions is accessible by clicking the **Change** button. It is capped at 10 000 spans and 5 000 traces. If your filter matches more than that, Agent Observability randomly samples interactions until it reaches that number. 
  1. Click **Select a model**. The Model configuration window opens, where you can add details that Agent Observability uses to generate topic names, summaries, topic hierarchy, and to attribute each interaction to a topic:
    - **LLM Provider**: Supported providers are OpenAI, Anthropic, Amazon Bedrock, Azure OpenAI, and Vertex AI.
    - **Account**
    - **Model**: Prefer using Recommended models tagged, for performances and costs requirements.
    Click **Confirm** to save your changes and close the window.
1. (Optional) Under **Datasets**:
  1. Turn on the radio button to compare your production traffic with your offline evaluation datasets.
  1. Use the **Datasets** selector to select dataset(s) you use to evaluate your AI Agent offline.
  1. (Optional) Enable the **Automatic curation** radio button to automatically fill coverage gaps Patterns detects. When enabled, Datadog creates a managed project (`Patterns-coverage`) and a per-pattern dataset (`{pattern-name}-pattern-curated`) to receive suggested interactions after each run. The toggle is **on** by default for new Patterns. 
1. Under **Schedule**, choose how often Pattern runs. Scheduled times use your Datadog timezone preference. Scheduled runs use the same pipeline as a manual run, so results appear in the same place, and the Patterns page always shows your most recent run.
   - **Daily**, **Weekdays**, or **Weekly (Default)**: Run automatically at a time (and, for weekly, a day) you choose.
   - **On demand**: Run the Pattern manually.
   - **Custom**: Run automatically every 1 to 7 days.
1. Under **Notifications** Enter mails and/or external messaging integrations you enabled in Datadog (see [**Integrations**][5] to enable external integrations in Datadog) to be notified when Patterns results are available.
1. Click **Create and Run Pattern**, or **Create Pattern** to create it without running it.

## Explore your Patterns

Use the dropdown in the header to switch between your named Patterns. Each Pattern shows results from its most recent run.

### Read the summary metrics

The top of the Patterns page shows three metrics from your most recent run:
- {{< ui >}}Total interactions{{< /ui >}}: How many interactions were analyzed
- {{< ui >}}Identified topics{{< /ui >}}: The total number of distinct topics found, including parent and child topics
- {{< ui >}}Classified{{< /ui >}}: The percentage of analyzed interactions assigned to a named topic — interactions in Outliers count as unclassified

### Visualize patterns by dimension

Above the topic table, a scatter plot compares your patterns against each other. Each bubble represents one topic, with the Y axis showing the number of interactions and the X axis showing the metric selected in the Dimension dropdown (for example, total errors). Use this chart to spot outliers — topics with unexpectedly high error rates or latency relative to their volume.

{{< img src="llm_observability/patterns_landing_page.png" alt="The Patterns page showing a bubble chart with one bubble per topic. The Y axis shows interaction count and the X axis shows the selected metric dimension." style="width:100%;" >}}

### Navigate the topic list

The topic table provides a hierarchical view of all discovered topics. Each topic shows:

- {{< ui >}}Pattern{{< /ui >}} — auto-generated name and description based on the interactions in the cluster
- {{< ui >}}Interactions{{< /ui >}} — count and percentage of total traffic
- {{< ui >}}Cost{{< /ui >}} —  estimated LLM cost for interactions in this topic
- {{< ui >}}Tokens{{< /ui >}} — token usage for interactions in this topic
- {{< ui >}}Errors{{< /ui >}} — error count and rate
- {{< ui >}}Latency{{< /ui >}} — median latency for interactions in this topic
- {{< ui >}}Online Evals{{< /ui >}} — evaluation results if online evaluations are configured
 

Expand parent topics to see their sub-topics and examine specific areas of your application's traffic.

### Drill into a topic

Click any topic name to open the detail view. The detail view shows a summary of what the topic represents and its associated operational metrics (Cost, Traffic, Coverage etc.). You can use the **Topic Map** to quickly visualize and navigate between topics sharing a common subject. 
You can also visualise the results of the associated **Evaluations** in the Topic and the **Interactions** table with the child topic label, input text, timestamp and recommended boolean for each interaction. Search the table by keyword to find specific examples.

{{< img src="llm_observability/patterns_topic_details.png" alt="The topic detail view showing a summary of the topic, the total interaction count, and a table of interactions with child topic label, input text, and timestamp." style="width:100%;" >}}


### Export and act on interactions
From the interactions table inside a topic's detail view, you can act on the interactions in that cluster:

- **View Recommended cases:** Filters on the recommended interactions we suggest you add to your evaluation datasets, to improve the coverage of the topic.
- **Download as CSV:** Export the interactions as a CSV file.
- **Add to Dataset:** Send the interactions to a [Dataset][2] to build evaluation test cases from real production traffic.
- **Add to Queue:** Send the interactions to an [Annotation Queue][3] for human review and labeling.

## Trigger a new run

To analyze your production traffic, click {{< ui >}}Run analysis{{< /ui >}} in the Patterns header. The pipeline runs in the background and displays it's completed, running and pending steps. A run takes around 5 to 10 minutes. Click on **Notify me** to be notified by mail once the pipeline finishes. You can close the page and return later — the header shows the last run date and lookback period when the run completes.

If a run fails, a modal explains the cause and what action to take. The page continues to display results from the most recent successful run while the failed run is shown in the header.

## Use topics to improve your application

### Understand your production traffic

Use the topic list to see what users are actually doing with your application.

Use traffic percentage to identify your most common use cases. The parent-child hierarchy helps you move from a high-level pattern down to the specific sub-patterns underneath.

### Find evaluation coverage gaps

Compare your topic distribution against what your golden datasets actually cover. Look at topics that represent high production volume but have no corresponding evaluation cases: this is where your test coverage has gaps, and where model regressions are least likely to be caught before they reach users.

### Automatically curate evaluation datasets

When automatic dataset curation is enabled, each Patterns run adds suggested interactions for under-covered topics directly into a managed dataset (`{pattern-name}-pattern-curated` inside the `Patterns-coverage` project). After a run completes, open a topic's detail view and click **Access dataset** to review the curated records and use them as evaluation test cases.

### Diagnose failure patterns

Scope your Pattern's filter to spans with poor quality scores or failed evaluations, then run the analysis. The resulting topic taxonomy shows which types of requests are failing most, giving you a structured way to prioritize fixes instead of debugging trace by trace.

### Track how traffic evolves

Re-run your Pattern periodically and use the {{< ui >}}Compare to{{< /ui >}} dropdown to compare topic distributions across runs. When a topic marked {{< ui >}}NEW{{< /ui >}} appears near the top, that signals your users have found a new use case or a new failure mode.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/configure/evaluations/llm_as_a_judge_evaluations/connect_to_account/
[2]: /llm_observability/improve/datasets/
[3]: /llm_observability/investigate/annotation_queues/
[4]: https://app.datadoghq.com/llm/patterns
[5]: /integrations/#cat-notifications