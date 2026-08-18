---
title: Patterns
description: Discover and analyze production traffic patterns in your agent with automated topic clustering.
aliases:
  - "/llm_observability/cluster_map"
  - "/llm_observability/monitoring/cluster_map"
further_reading:
- link: "/llm_observability/"
  tag: "Documentation"
  text: "Learn about Agent Observability"
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about Agent Observability Key Terms and Concepts"
- link: "/llm_observability/experiments/datasets"
  tag: "Documentation"
  text: "Learn about Datasets"
- link: "https://learn.datadoghq.com/courses/llm-obs-investigations"
  tag: "Learning Center"
  text: "Investigate with LLM Observability"
- link: "https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications"
  tag: "Learning Center"
  text: "Tracing LLM Applications"
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
1. Click **Select a model**. The Model configuration window opens, where you can add details that Agent Observability uses to generate topic names, summaries, topic hierarchy, and to attribute each interaction to a topic:
   - **LLM Provider**: Supported providers are OpenAI, Anthropic, Amazon Bedrock, Azure OpenAI, and Vertex AI.
   - **Account**
   - **Model**
1. Click **Confirm** to save your changes and close the window.
1. Under **Runs on**:
   1. Use the **Application** multi-selector to choose one or more LLM applications to include spans for. Selecting applications automatically updates the underlying span filter query, and editing the query updates the selected applications. For finer-grained scoping, click the filter icon next to the selector to open the **Advanced** popover, which exposes:
      - **Which spans do you want to cluster?:** The raw span filter query for scoping by environment, span type, or other tags.
      - **Time window:** The lookback period for interactions to analyze.
   1. Set the **Sampling Rate**: The percentage of matching interactions to include. Patterns processes up to 10,000 records per run; if your filter matches more than that, Agent Observability randomly samples records until it reaches that number.
1. Under **What should we detect Patterns on?**, enter a template that defines what gets sent to the model for analysis. Use `{{variable}}` syntax to reference any span field; for example, `{{meta.input.value}}` to analyze patterns by user input, or `{{meta.span.kind}}` to analyze by span kind. Click {{< ui >}}Template Examples{{< /ui >}} to see common configurations. As you type, the right panel previews matching spans and shows what percentage of interactions have values for the variables you've referenced.
1. Under **How often should we run Patterns?**, choose how the Pattern runs. Scheduled times use your Datadog timezone preference. Scheduled runs use the same pipeline as a manual run, so results appear in the same place, and the Patterns page always shows your most recent run.
   - **On demand** (default): Run the Pattern manually.
   - **Daily**, **Weekdays**, or **Weekly**: Run automatically at a time (and, for weekly, a day) you choose.
   - **Custom**: Run automatically every 1 to 7 days.
1. (Optional) Under **Dataset coverage**, select one or more offline evaluation datasets to measure production traffic coverage against. To automatically fill coverage gaps, enable the **Automatic dataset curation** toggle. When enabled, Datadog creates a managed project (`Patterns-coverage`) and a per-pattern dataset (`{pattern-name}-pattern-curated`) to receive suggested interactions after each run. The toggle is **on** by default for new Patterns.
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

Click any topic name to open the detail view. The detail view shows a summary of what the topic represents, the total interaction count, and an interactions table with the child topic label, input text, and timestamp for each interaction. Search the table by keyword to find specific examples.


{{< img src="llm_observability/patterns_topic_details.png" alt="The topic detail view showing a summary of the topic, the total interaction count, and a table of interactions with child topic label, input text, and timestamp." style="width:100%;" >}}

### Export and act on interactions
From the interactions table inside a topic's detail view, you can act on the interactions in that cluster:

- **Download as CSV:** Export the interactions as a CSV file.
- **Add to Dataset:** Send the interactions to a [Dataset][2] to build evaluation test cases from real production traffic.
- **Add to Queue:** Send the interactions to an [Annotation Queue][3] for human review and labeling.

## Trigger a new run

To analyze your production traffic, click {{< ui >}}Run analysis{{< /ui >}} in the Patterns header. The pipeline runs in the background and takes 5 to 10 minutes. You can close the page and return later — the header shows the last run date and lookback period when the run completes.

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

[1]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account/
[2]: /llm_observability/experiments/datasets/
[3]: /llm_observability/evaluations/annotation_queues/
[4]: https://app.datadoghq.com/llm/patterns
