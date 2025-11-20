---
title: Planning and Launching Experiments
description: Experimentation allows you to measure the causal relationship new experiences or features have on user outcomes.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/product_analytics/experimentation/defining_metrics"
  tag: "Documentation"
  text: "Defining Experiment Metrics"
---

## Overview 
Datadog Experimentation allows you to measure the causal relationship that new experiences and features have on user outcomes. To do this, Experimentation randomly allocates traffic between two or more variations, and selects a subset of traffic to use as a control group.

This page walks you through planning and launching your experiments. 


## Setup
To create, configure, and launch your experiment, complete the following steps:

### Step 1 - Create your experiment

1. Navigate to the [Experiments][1] page in Datadog Product Analytics.
2. Click **+ Create Experiment**.
3. Enter your experiment name and hypothesis.

{{< img src="/product_analytics/experiment/exp_create_experiment.png" alt="create an experiment and add a hypothesis for the experiment." style="width:80%;" >}}


### Step 2 - Add metrics

After you’ve created an experiment, add your primary metric and optional guardrails. See [Defining Metrics][2] for details on how to create metrics.

{{< img src="/product_analytics/experiment/exp_decision_metrics.png" alt="create an experiment and add a hypothesis for the experiment." style="width:80%;" >}}


#### Add a sample size calculation (optional)

After selecting your experiment’s metrics, use the optimal sample size calculator to determine what size of change your experiment can reliably detect with your current sample size.

1. Select the entry point of your experiment. This specifies _when_ in the user journey they will be enrolled into the test. 

For example, if you plan to run an experiment on users who visit the homepage, select the homepage view as your entry point. You can also configure the number of variants and the traffic exposure percentage (the portion of entry point traffic to include in the experiment).

1. Click **Run calculation** to see the [Minimum Detectable Effects][3](MDE) your experiment has on your metrics. The MDE is the smallest difference that you are able to detect between your experiment’s variants.

{{< img src="/product_analytics/experiment/exp_sample_size.png" alt="Sleect an entrypoint event to run a sample size calculation" style="width:90%;" >}}

### Step 3 - Launch your experiment

After specifying and aligning your experiment, you can launch your test immediately or at a scheduled date. 

1. Select a Feature Flag that captures the variants you want to test. If you have not yet created a feature flag, see the [Getting Started with Feature Flags][4] page.

1. Click **Set up experiment on feature flag** to specify how you want to roll out your experiment. You can either launch the experiment to all traffic, or schedule a gradual rollout with realtime RUM guardrails. 


{{< img src="/product_analytics/experiment/exp_feature_flag.png" alt="Set up an experiment on a Feature Flag." style="width:90%;" >}}


## Next steps
1. **[Defining metrics][2]**: Define the metrics you want to measure during your experimentation.
1. **[Reading Experiment Results][5]**: Review and explore your Experiment results.
1. Learn more about **[Minimum Detectable Effects][3]**: Choose an appropriately sized MDE.















## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: /product_analytics/experimentation/defining_metrics
[3]: /product_analytics/experimentation/minimum_detectable_effect
[4]: /getting_started/feature_flags/
[5]: /product_analytics/experimentation/reading_results