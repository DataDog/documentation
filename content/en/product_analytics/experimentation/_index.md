---
title: Planning and Launching Experiments
description: Experimentation allows you to measure the causal relationship new experiences or features have on user outcomes.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics/"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/product_analytics/analytics_explorer/"
  tag: "Documentation"
  text: "Analytics Explorer"
---

## Overview 
Datadog Experimentation allows you to measure the causal relationship new experiences and features have on user outcomes. To do this, Experimentation randomly allocates traffic between two or more variations, and selects a subset of traffic to use as a control group.

## Getting started
To plan and launch experiments:
1. Go to the [Experiments][1] page in Datadog Product Analytics
2. click **Create Experiment**
3. Enter your experiment name and hypothesis


## Specifying Experiment Plan

After you’ve created an experiment, add your primary metric and optional guardrails. See [Defining Metrics][2] for details on how to create metrics.

{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}


### Adding a sample size calculation (optional)

After you’ve selected your experiment’s metrics, you can run an optimal sample size calculation to understand how large of a lift you’ll be able to measure. 

First, select the entry point of your experiment. This specifies when in the user journey they will be enrolled into the test. For example, if you plan to run an experiment on users who visit the homepage, select the homepage view as your entry point.

You can also update the number of variants and the traffic exposure (the percentage of traffic that hits the entry point that you want to include in the experiment).

Then, click **“Run calculation”** to see the Minimum Detectable Effect (MDE) your experiment will have on your metrics. The MDE signifies the smallest difference that you’ll be able to detect between your experiment’s variants. To learn more, see the [Minimum Detectable Effects][3] page.


{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}

## Launching an Experiment

Once the experiment plan has been specified and aligned upon, you can launch your test either immediately or at a later scheduled date. To proceed, you’ll need a Feature Flag that captures the variants you want to test. If you have not yet created a feature flag, see the [Getting Started with Feature Flags][4] page.

Once you’ve selected a feature flag, click “Set up experiment on feature flag” to specify how you want to roll out your experiment. You can either launch the experiment to all traffic, or schedule a gradual rollout with realtime RUM guardrails. 


{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}


Congratulations! You have now planned and launched your first experiment. 
















## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: ADD-LINK
[3]: ADD-LINK
[4]: /getting_started/feature_flags/