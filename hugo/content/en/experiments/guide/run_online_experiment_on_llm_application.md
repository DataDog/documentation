---
title: Run an Online Experiment on an LLM Application
description: Compare variants of an LLM application and measure their effect with Agent Observability evaluation scores.
further_reading:
- link: "/llm_observability/improve/online_experiments/"
  tag: "Documentation"
  text: "Agent Observability Online Experiments"
- link: "/getting_started/feature_flags/"
  tag: "Documentation"
  text: "Getting Started with Feature Flags"
- link: "/llm_observability/investigate/evaluations/"
  tag: "Documentation"
  text: "Agent Observability Evaluations"
- link: "/experiments/reading_results/"
  tag: "Documentation"
  text: "Reading Experiment Results"
---

## Overview

Use a Datadog online experiment to compare two versions of an LLM application on live traffic. Datadog Feature Flags assigns each [experiment subject][1], such as a user or an autonomous workflow run, to a variant. An Agent Observability evaluation score measures the outcome for each subject.

This guide covers the LLM-specific configuration for the following workflow:

{{< include-markdown "llm_observability/improve/shared/online_experiment_setup" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/concepts/subject_types/
