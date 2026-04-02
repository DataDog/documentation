---
title: Plan and Launch Experiments
description: Use Datadog Experiments to measure the causal relationship that new experiences or features have on user outcomes.
aliases:
  - /product_analytics/experimentation/
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/experiments/defining_metrics"
  tag: "Documentation"
  text: "Defining Experiment Metrics"
---

## Overview
Use Datadog Experiments to measure the causal relationship that new experiences and features have on user outcomes. Datadog Experiments uses [Feature Flags][4] to randomly allocate traffic between two or more variations, using one of the variations as a control group.

This page walks you through planning and launching your experiments.

## Setup
To create, configure, and launch your experiment, complete the following steps:

### Step 1 - Create your experiment

1. Navigate to the [Experiments][1] page in Datadog Product Analytics.
2. Click **+ Create Experiment**.
3. Enter your experiment name and hypothesis.

{{< img src="/product_analytics/experiment/exp_create_experiment.png" alt="The experiment creation form with fields for experiment name and hypothesis." style="width:80%;" >}}

### Step 2 - Add metrics

After you have created an experiment, add your primary metric and optional guardrails. See [Defining Metrics][2] for details on how to create metrics.

{{< img src="/product_analytics/experiment/exp_decision_metrics1.png" alt="The metrics configuration panel with options for primary metric and guardrails." style="width:80%;" >}}

#### Add a sample size calculation (optional)

After selecting your experiment’s metrics, use the optional sample size calculator to determine how small of a change your experiment can reliably detect with your current sample size.

1. Select the **Entrypoint Event** of your experiment. This specifies _when_ in the user journey they will be enrolled into the test.
1. Click **Run calculation** to see the [Minimum Detectable Effects][3] (MDE) your experiment has on your metrics. The MDE is the smallest difference you can detect between your experiment’s variants.

{{< img src="/product_analytics/experiment/exp_sample_size.png" alt="The Sample Size Calculator modal with the Entrypoint Event dropdown highlighted." style="width:90%;" >}}

### Step 3 - Launch your experiment

After specifying your metrics, you can launch your experiment.

1. Select a feature flag that captures the variants you want to test. If you have not yet created a feature flag, see the [Getting Started with Feature Flags][4] page.

1. Click **Set Up Experiment on Feature Flag** to specify how you want to roll out your experiment. You can either launch the experiment to all traffic, or schedule a gradual rollout.

{{< img src="/product_analytics/experiment/exp_feature_flag.png" alt="Set up an experiment on a Feature Flag." style="width:90%;" >}}

## Next steps
1. **[Defining metrics][2]**: Define the metrics you want to measure during your experiments.
1. **[Reading Experiment Results][5]**: Review and explore your experiment results.
1. **[Minimum Detectable Effects][3]**: Choose appropriately sized MDEs.


## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: /experiments/defining_metrics
[3]: /experiments/minimum_detectable_effect
[4]: /getting_started/feature_flags/
[5]: /experiments/reading_results
