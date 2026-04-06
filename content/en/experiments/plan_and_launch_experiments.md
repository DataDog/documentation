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
  text: "Create Experiment Metrics"
---

## Overview

Datadog Experiments allows you to measure the causal relationship that new experiences and features have on user outcomes. Experiments use [feature flags][4] to randomly allocate traffic between two or more variations, using one of the variations as a control group.

Experiments have a primary metric as well as optional secondary metrics. Datadog's statistical analysis engine compares these metrics across experiment variants.

## Setup

To create, configure, and launch your experiment, complete the following steps:

### Step 1 - Create your experiment

If you have already created a feature flag for your experiment, you can create an experiment from the flag detail page:

{{< img src="/product_analytics/experiment/TODO_create_from_flag.png" alt="Creating an experiment from the feature flag detail page." style="width:80%;" >}}

You can also draft experiments before creating a feature flag:

1. Navigate to the [Experiments][1] page in Datadog Product Analytics.
1. Click **+ Create Experiment**.
1. Enter your experiment name and hypothesis.

{{< img src="/product_analytics/experiment/exp_create_experiment.png" alt="The experiment creation form with fields for experiment name and hypothesis." style="width:80%;" >}}

### Step 2 - Create your experiment plan

#### Add metrics

After you have created an experiment, add your primary metric and optional guardrails. See [Defining Metrics][2] for details on how to create metrics.

{{< img src="/product_analytics/experiment/exp_decision_metrics1.png" alt="The metrics configuration panel with options for primary metric and guardrails." style="width:80%;" >}}

#### Configure optional analysis settings

##### Statistical analysis plan

Datadog's default sequential statistical analysis is suitable for most situations and promotes good statistical patterns. This framework gives statistically valid confidence intervals at any point throughout the experiment, so you can make decisions at any point during the experiment.

To use a different statistical method, specify that in the analysis settings. To learn more about analysis options, see [Choosing a statistical analysis plan][TODO_stats_plan_link].

{{< img src="/product_analytics/experiment/TODO_statistical_analysis.png" alt="The statistical analysis plan configuration options." style="width:80%;" >}}

##### Exploration dimensions

To segment experiment results by subject (user) properties, specify exploration dimensions in the analysis settings. You can also add analysis dimensions later.

{{< img src="/product_analytics/experiment/TODO_exploration_dimensions.png" alt="The exploration dimensions configuration options." style="width:80%;" >}}

#### Add a sample size calculation (optional)

After selecting your experiment's metrics, use the optional sample size calculator to determine how small of a change your experiment can reliably detect with your current sample size.

1. Select the **Entrypoint Event** of your experiment. This specifies _when_ in the user journey they are enrolled into the test. For example, if you plan to run an experiment on users who visit the homepage, select the homepage view as your entry point.
1. Click **Run calculation** to see the [Minimum Detectable Effects][3] (MDE) your experiment has on your metrics. The MDE is the smallest difference you can detect between your experiment's variants.

{{< img src="/product_analytics/experiment/TODO_sample_size_calc.png" alt="The Sample Size Calculator with Entrypoint Event and MDE results." style="width:90%;" >}}

#### Add notifications (optional)

You can specify one or more notification channels to get updates on your experiment.

{{< img src="/product_analytics/experiment/TODO_notifications.png" alt="The experiment notifications configuration." style="width:80%;" >}}

### Step 3 - Launch your experiment

After you add at least one metric, you can launch your experiment.

- If you created your experiment from the feature flag page, your feature flag is already pre-added.
- If your experiment does not have an associated flag, link an existing flag or create a new one.

To learn more about feature flags, see the [Getting Started with Feature Flags][4] page.

{{< img src="/product_analytics/experiment/exp_feature_flag.png" alt="Set up an experiment on a Feature Flag." style="width:90%;" >}}

You can either launch your experiment right away or schedule a staged rollout.

#### Staged experiment rollouts

If you want to gradually ramp up experiment traffic, you can add a rollout schedule. Datadog automatically captures a representative sample of traffic to use for control.

**Note**: Datadog randomizes eligible users in two steps:
1. A sample of traffic to be tracked in the experiment.
2. A random allocation of users into experimental variants.

Any users not included in the first sampling receive the baseline variant and do not appear in experiment analysis. Of users included in the experiment, the proportion in each variant remains constant. This approach avoids correlations between the user's received variant and their enrollment time. It prevents time-varying metrics from introducing bias into experiment results.

#### Monitoring experiment rollout

After your experiment is live, you can monitor early traffic on the **Flag & Exposures** page. The exposure balance check section verifies that the expected balance of users across variants is present. The exposure log gives a real-time list of traffic getting enrolled into your experiment.

{{< img src="/product_analytics/experiment/TODO_flag_exposures.png" alt="The Flag and Exposures page showing exposure balance and exposure log." style="width:90%;" >}}

## Next steps

1. **[Read Experiment Results][5]**: Review and explore your experiment results.
1. **[Minimum Detectable Effects][3]**: Choose appropriately sized MDEs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: /experiments/defining_metrics
[3]: /experiments/minimum_detectable_effect
[4]: /getting_started/feature_flags/
[5]: /experiments/reading_results
