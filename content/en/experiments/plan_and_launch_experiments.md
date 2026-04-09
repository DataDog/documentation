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

After creating your experiment, configure it on the detail page.

### Decision metrics
Define the metrics that measure the outcome of your experiment.

1. Select the subject type for calculating metrics from the **Calculate metrics by** dropdown. The default is **User (@usr.id)**.
1. Add a primary metric to measure the main outcome of your experiment.
1. Optionally, add secondary metrics to monitor for unintended effects on other areas like performance, engagement, or revenue.

See [Create Experiment Metrics][2] for details.

{{< img src="/product_analytics/experiment/exp_plan_launch_decision_metric.png" alt="The metrics configuration panel with options for primary metric and guardrails." style="width:80%;" >}}

### Sample size calculation
Optionally, estimate the smallest change your experiment can reliably detect.

1. Click **sample size calculator** to open the side panel.
1. Expand **Calculation details**. Your primary and secondary metrics appear under **Metrics**.
1. Select an **Entry point** event to specify when users are enrolled into the experiment.
1. Optionally, add a filter to narrow the entry point audience.
1. Set the **Number of variants** and **Traffic exposure** percentage.
1. Under **Additional inputs**, configure the statistical **Power** (default 80%) and an optional **Target experiment duration** in weeks.
1. Click **Run Calculation** to estimate the [Minimum detectable effect (MDE)][3] for your metrics.
1. Close the **Sample Size Calculator** side panel.

{{< img src="/product_analytics/experiment/exp_plan_launch_sample_size.png" alt="The Sample Size Calculator side panel showing calculation details with Add to Cart Conversion as the primary metric and Number of cart views as a guardrail, an entry point set to click on ADD TO CART, two variants at 100% traffic exposure, and additional inputs for power and target experiment duration." style="width:80%;" >}}

### Feature flag
Click **Add a feature flag** to select the appropriate feature flag for your experiment. See [Getting Started with Feature Flags][4] for setup details.

### Randomization
Configure the environment, targeting rules, variant split, and traffic exposure for your experiment.

1. Select the **Environment** for your experiment from the dropdown.
1. Under **Targeting rules**, define conditions to filter which users are included in the experiment. Click **Add Condition** to add additional conditions and **Add Filter** to add additional filters.
1. Under **Variants**, set how traffic is split between your control and treatment groups. Use the **Randomize users and split traffic** dropdown to choose an equal or custom split.
1. Under **Traffic exposure**, set the percentage of targeted traffic to include in the experiment.
1. Optionally, click **Add Rollout Steps** to schedule a staged rollout.

{{% collapse-content title="Additional configuration settings (optional)" level="h4" expanded=false %}}

##### Notifications
Select recipients from the **Recipients** dropdown to receive updates on your experiment.

##### Statistical analysis plan
Datadog's default sequential statistical analysis is suitable for most situations and promotes good statistical patterns. This framework gives statistically valid confidence intervals throughout the experiment, so you can make decisions at any time.

To use a different statistical method:
1. Expand the **Statistical analysis plan** section.
1. Select the **Confidence interval method** from the dropdown. The default is **Sequential**.
1. Select the **Confidence level** from the dropdown. The default is **95%**.
1. Toggle **CUPED calculation** to reduce variance and improve experiment sensitivity.
1. Toggle **Multiple testing correction** to adjust for multiple comparisons across metrics.

##### Split-by exploration dimensions
Expand the **Split-by exploration dimensions** section. Select properties from the **Properties to compute for dimensional analysis** dropdown to segment experiment results by user or context attributes.

##### Staged experiment rollouts

To gradually ramp up experiment traffic, add a rollout schedule. Datadog automatically captures a representative sample of traffic to use for control.

**Note**: Datadog randomizes eligible users in two steps:
1. A sample of traffic to be tracked in the experiment.
2. A random allocation of users into experimental variants.

Users not included in the first sample receive the baseline variant and do not appear in experiment analysis. Of users included in the experiment, the proportion in each variant remains constant. This approach avoids correlations between the user's received variant and their enrollment time and prevents time-varying metrics from introducing bias into experiment results.

{{% /collapse-content %}}

## Launch your experiment

To launch your experiment:
1. Click **Start Experiment** to open the **Confirm starting the experiment** dialog.
1. Review your experiment settings, then click **Start Experiment & Enable Flag** to launch the experiment and open the **Flag & Exposures** page.

On the **Flag & Exposures** page, see the **Exposure balance check** section to confirm the expected split of users across variants. Then, click **View Exposures Log** to see a real-time list of traffic getting enrolled into your experiment.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: /experiments/defining_metrics
[3]: /experiments/minimum_detectable_effect
[4]: /getting_started/feature_flags/
