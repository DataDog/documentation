---
title: Experiments
description: An overview of Datadog's LLM Observability Experiments feature.
aliases:
  - /llm_observability/experiments_preview
further_reading:
  - link: /llm_observability/experiments/setup
    tag: "Documentation"
    text: Set up and use LLM Observability Experiments
  - link: "https://www.datadoghq.com/blog/llm-experiments/"
    tag: "Blog"
    text: "Create and monitor LLM experiments with Datadog"
  - link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
    tag: Blog
    text: Datadog LLM Observability natively supports OpenTelemetry GenAI Semantic Conventions
  - link: "https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/"
    tag: "Blog"
    text: "Driving AI ROI: How Datadog connects cost, performance, and infrastructure so you can scale responsibly"
---

{{< img src="llm_observability/experiments/filtered_experiments.png" alt="LLM Observability, Experiment view. Heading: 'Comparing 12 experiments across 9 fields'. Line graph visualization charting the accuracy, correctness, duration, estimated cost, and other metrics of various experiments." style="width:100%;" >}}

LLM Observability [Experiments][1] supports the entire lifecycle of building LLM applications and agents. It helps you understand how changes to prompts, models, providers, or system architecture affect performance. With this feature, you can:

- Create and version datasets
- Run and manage experiments
- Compare results to evaluate impact

## Cookbooks

For in-depth examples of what you can do with LLM Experiments, see Datadog's provided [Jupyter notebooks][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/testing/experiments
[2]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks

