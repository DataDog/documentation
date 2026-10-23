---
title: Online Experiments
description: Compare variants of an LLM application on live traffic and measure their effect with Agent Observability evaluations.
further_reading:
- link: "/llm_observability/improve/offline_experiments"
  tag: "Documentation"
  text: "Agent Observability Offline Experiments"
- link: "/llm_observability/investigate/evaluations/"
  tag: "Documentation"
  text: "Agent Observability Evaluations"
- link: "/getting_started/feature_flags/"
  tag: "Documentation"
  text: "Getting Started with Feature Flags"
- link: "/experiments/reading_results/"
  tag: "Documentation"
  text: "Reading Experiment Results"
---

## Overview

Online Experiments compare multiple versions of an LLM application or agent on live production traffic. Datadog Feature Flags assigns each [experiment subject][2], such as a user or an autonomous workflow run, to a control or treatment variant. An Agent Observability evaluation measures the outcome for each subject, and [Datadog Experiments][1] determines whether the difference between variants is statistically significant.

Use Online Experiments to validate a change, such as a new model, prompt, or tool, against real users after you test it offline.

Setting up an Online Experiment involves the following steps:

{{< include-markdown "llm_observability/improve/shared/online_experiment_setup" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/
[2]: /experiments/concepts/subject_types/
