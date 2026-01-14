---
title: Experiments
description: Using LLM Observability Experiments feature
private: true
aliases:
  - /llm_observability/experiments_preview
further_reading:
  - link: "https://www.datadoghq.com/blog/llm-experiments/"
    tag: "Blog"
    text: "Create and monitor LLM experiments with Datadog"
  - link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
    tag: Blog
    text: Datadog LLM Observability natively supports OpenTelemetry GenAI Semantic Conventions
---

{{< img src="llm_observability/experiments/filtered_experiments.png" alt="LLM Observability, Experiment view. Heading: 'Comparing 12 experiments across 9 fields'. Line graph visualization charting the accuracy, correctness, duration, estimated cost, and other metrics of various experiments." style="width:100%;" >}}

LLM Observability [Experiments][9] supports the entire lifecycle of building LLM applications and agents. It helps you understand how changes to prompts, models, providers, or system architecture affect performance. With this feature, you can:

- Create and version datasets
- Run and manage experiments
- Compare results to evaluate impact

## Cookbooks

For in-depth examples of what you can do with LLM Experiments, see Datadog's provided [Jupyter notebooks][10].


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /getting_started/site/
[7]: https://github.com/DataDog/llm-observability/tree/main/experiments
[8]: https://www.postman.com/
[9]: https://app.datadoghq.com/llm/testing/experiments
[10]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks
[11]: https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html
[12]: /llm_observability/instrumentation/custom_instrumentation?tab=decorators#trace-an-llm-application
[13]: /llm_observability/instrumentation/auto_instrumentation?tab=python
[14]: /llm_observability/experiments/?tab=manual#setup
[15]: /llm_observability/experiments/?tab=manual#projects
[16]: /llm_observability/experiments/?tab=manual#datasets
[17]: /llm_observability/experiments/?tab=manual#experiments
