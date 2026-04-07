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

Create, configure, and launch experiments to measure how new features affect user outcomes. 

## Create your experiment

If you have already created a feature flag for your experiment, you can create an experiment from the flag detail page.

{{< img src="/product_analytics/experiment/exp_plan_launch_ff_new_experiment.png" alt="The feature flag detail page for a flag called new_product_photos, showing targeting rules and rollouts with a 50/50 split between control and treatment variants, and a Create New Experiment button highlighted at the bottom." style="width:80%;" >}}


You can also draft your experiment before creating a feature flag: 

1. Navigate to the [Experiments][1] page in Datadog Product Analytics.
1. Click **Create Experiment**.
1. Enter your experiment name and hypothesis.
1. Click **Create Draft Experiment** to save your draft experiment and open the experiment's configuration page.

{{< img src="/product_analytics/experiment/exp_plan_launch_create_experiment.png" alt="The Create new draft experiment dialog with an experiment name of New Product Photos Experiment, a hypothesis about higher-resolution product photos increasing add-to-cart conversions, and a Create Draft Experiment button highlighted." style="width:80%;" >}}

## Configure your experiment

After creating your experiment, complete the configuration on the experiment detail page.

Under the **Decision metrics** section:
- select the subject type for calculating metrics from the **Calculate metrics by** dropdown. The default is **User (@usr.id)**.
- Add a primary metric to measure the main outcome of your experiment.
- Optionally, add secondary metrics to monitor for unintended effects on other areas like performance, engagement, or revenue.

See [Defining Metrics][2] to create metrics.

{{< img src="/product_analytics/experiment/exp_plan_launch_decision_metric.png" alt="The metrics configuration panel with options for primary metric and guardrails." style="width:80%;" >}}

Under the **Run a sample size calculation** section (optional):
- Click **sample size calculator** to open the **Sample Size Calculator** side panel.
- Select an **Entry point** event to specify when users are enrolled into the experiment.
- Optionally, add a filter to narrow the entry point audience.
- Set the **Number of variants** and **Traffic exposure** percentage.
- Under **Additional inputs**, configure the statistical **Power** (default 80%) and an optional **Target experiment duration** in weeks.
- Click **Run Calculation** to estimate the [Minimum Detectable Effects][3] for your metrics.

{{< img src="/product_analytics/experiment/exp_plan_launch_sample_size.png" alt="The Sample Size Calculator side panel showing calculation details with Add to Cart Conversion as the primary metric and Number of cart views as a guardrail, an entry point set to click on ADD TO CART, two variants at 100% traffic exposure, and additional inputs for power and target experiment duration." style="width:80%;" >}}





{{% collapse-content title="Additional configuration settings" level="h4" expanded=false %}}

These are **optional settings** you can apply to your experiment.

##### Statistical analysis plan

Datadog's default sequential statistical analysis is suitable for most situations and promotes good statistical patterns. This framework gives statistically valid confidence intervals at any point throughout the experiment, so you can make decisions at any point during the experiment.

To use a different statistical method, specify that in the analysis settings.

<!-- {{< img src="/product_analytics/experiment/TODO_statistical_analysis.png" alt="The statistical analysis plan configuration options." style="width:80%;" >}} -->

##### Exploration dimensions

To segment experiment results by subject (user) properties, add exploration dimensions in the analysis settings. You can also add analysis dimensions later.

<!-- {{< img src="/product_analytics/experiment/TODO_exploration_dimensions.png" alt="The exploration dimensions configuration options." style="width:80%;" >}} -->

##### Add a sample size calculation

After selecting your experiment's metrics, use the optional sample size calculator to determine the smallest change your experiment can reliably detect with your current sample size.

1. Select the **Entrypoint Event** of your experiment. This specifies when in the user journey they are enrolled into the test. For example, if you plan to run an experiment on users who visit the homepage, select the homepage view as your entry point.
1. Click **Run calculation** to see the [Minimum Detectable Effects][3] (MDE) your experiment has on your metrics. The MDE is the smallest difference you can detect between your experiment's variants.

<!-- {{< img src="/product_analytics/experiment/TODO_sample_size_calc.png" alt="The Sample Size Calculator with Entrypoint Event and MDE results." style="width:90%;" >}} -->

##### Add notifications

You can specify one or more notification channels to get updates on your experiment.

<!-- {{< img src="/product_analytics/experiment/TODO_notifications.png" alt="The experiment notifications configuration." style="width:80%;" >}} -->

{{% /collapse-content %}} 

## Launch your experiment

After you add at least one metric, you can launch your experiment.

- If you created your experiment from the feature flag page, your feature flag is already pre-added.
- If your experiment does not have an associated flag, link an existing flag or create a new one.

To learn more about feature flags, see the [Getting Started with Feature Flags][4] page.

{{< img src="/product_analytics/experiment/exp_feature_flag.png" alt="Set up an experiment on a Feature Flag." style="width:90%;" >}}

You can either launch your experiment right away or schedule a staged rollout.

### Staged experiment rollouts

To gradually ramp up experiment traffic, add a rollout schedule. Datadog automatically captures a representative sample of traffic to use for control.

**Note**: Datadog randomizes eligible users in two steps:
1. A sample of traffic to be tracked in the experiment.
2. A random allocation of users into experimental variants.

Users not included in the first sample receive the baseline variant and do not appear in experiment analysis. Of users included in the experiment, the proportion in each variant remains constant. This approach avoids correlations between the user's received variant and their enrollment time. It prevents time-varying metrics from introducing bias into experiment results.

### Monitoring experiment rollout

After your experiment is live, you can monitor early traffic on the **Flag & Exposures** page. The exposure balance check section verifies that the expected balance of users across variants is present. The exposure log gives a real-time list of traffic getting enrolled into your experiment.

<!-- {{< img src="/product_analytics/experiment/TODO_flag_exposures.png" alt="The Flag and Exposures page showing exposure balance and exposure log." style="width:90%;" >}} -->

## Next steps

- **[Read Experiment Results][5]**: Review and explore your experiment results.
- **[Minimum Detectable Effects][3]**: Choose appropriately sized MDEs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: /experiments/defining_metrics
[3]: /experiments/minimum_detectable_effect
[4]: /getting_started/feature_flags/
[5]: /experiments/reading_results
