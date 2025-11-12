---
title: Planning and Launching Experiments
description: Experimentation allows you to measure the causal relationship new experiences or features have on user outcomes.
further_reading:
- link: "/product_analytics/experimentation/reading_results.md"
  tag: "Documentation"
  text: "Reading Experiment Results"
- link: "/product_analytics/experimentation/defining_metrics"
  tag: "Documentation"
  text: "Defining Experiment Metrics"
---

## Overview 
Datadog Experimentation allows you to measure the causal relationship that new experiences and features have on user outcomes. To do this, Experimentation randomly allocates traffic between two or more variations, and selects a subset of traffic to use as a control group.

This page walks you through planning and launching your experiments. 


## Setup
Follow the steps below to create, add metrics, and launch your experiment. 

### Step 1 - Create your experiment

1. Go to the [Experiments][1] page in Datadog Product Analytics
2. Click **Create Experiment**
3. Enter your experiment name and hypothesis


### Step 2 - Add metrics

After you’ve created an experiment, add your primary metric and optional guardrails. See [Defining Metrics][2] for details on how to create metrics.

{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}


#### Add a sample size calculation (optional)

After you’ve selected your experiment’s metrics, you can run an optimal sample size calculation to determine how large of a change in your chosen metric your experiment will be able to reliably detect, given your sample size. 

First, select the entry point of your experiment. This specifies _when_ in the user journey they will be enrolled into the test. 

For example, if you plan to run an experiment on users who visit the homepage, select the homepage view as your entry point. You can also update the number of variants and the traffic exposure (the percentage of traffic that hits the entry point that you want to include in the experiment).

Then, click **Run calculation** to see the [Minimum Detectable Effects][3](MDE) your experiment will have on your metrics. The MDE is the smallest difference that you are able to detect between your experiment’s variants. To learn more, see the [Minimum Detectable Effects][3] page.


{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}

### Step 3 - Launch your experiment

After specifying and aligning your the experiment, you can launch your test immediately or at a scheduled date. 

First, you need to select a Feature Flag that captures the variants you want to test. If you have not yet created a feature flag, see the [Getting Started with Feature Flags][4] page.

Then, click **Set up experiment on feature flag** to specify how you want to roll out your experiment. You can either launch the experiment to all traffic, or schedule a gradual rollout with realtime RUM guardrails. 


{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}


You have now planned and launched your first experiment. 
















## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: /product_analytics/experimentation/defining_metrics
[3]: /product_analytics/experimentation/minimum_detectable_effect
[4]: /getting_started/feature_flags/