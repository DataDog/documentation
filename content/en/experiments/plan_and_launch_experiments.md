---
title: Plan and Launch Experiments
description: Use Datadog Experiments to measure the causal relationship that new experiences or features have on user outcomes.
aliases:
  - /product_analytics/experimentation/
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/experiments/reading_results"
  tag: "Documentation"
  text: "Read Experiment Results"
---

## Overview

Plan and launch experiments to measure how new features affect user outcomes.

## Prerequisites

Before you begin, make sure you have:

- A [feature flag][4] for the variants you want to test
- At least one [experiment metric][2] defined
- A [subject type][6] for grouping users (default is `@usr.id`)

## Plan your experiment
Give your experiment a name and hypothesis, then define the settings.

### Draft your experiment

To create a draft experiment:

1. Navigate to [Experiments][1] in Datadog Product Analytics.
1. Click **Create Experiment** at the top right corner.
1. Enter your **Experiment name** and **Hypothesis**.
1. Click **Create Draft Experiment** to open the experiment's configuration page.

{{< img src="/product_analytics/experiment/exp_plan_launch_create_experiment.png" alt="The Create new draft experiment dialog with an experiment name of New Product Photos Experiment, a hypothesis about higher-resolution product photos increasing add-to-cart conversions, and a Create Draft Experiment button highlighted." style="width:80%;" >}}

You can also create an experiment directly from a [feature flag's][4] detail page.

{{< img src="/product_analytics/experiment/exp_plan_launch_ff_new_experiment.png" alt="The feature flag detail page for a flag called new_product_photos, showing targeting rules and rollouts with a 50/50 split between control and treatment variants, and a Create New Experiment button highlighted at the bottom." style="width:80%;" >}}

### Set up your experiment

After drafting your experiment, define the metrics, feature flag, and randomization settings.

<div class="alert alert-warning">You can edit only the subject type after launching your experiment. Set up all other settings before you launch.</div>

#### Decision metrics
Define the metrics that measure the outcome of your experiment.

1. Use the **Calculate metrics by** dropdown to select the subject type. The default is **User (@usr.id)**. To define a custom grouping, click **+ Create subject type**.
1. Click **+ Primary metric** to open the metric picker:
   1. Select a primary metric to measure the main outcome (your hypothesis) of your experiment.
   1. (Optional) Scope the list to **Certified** or **non-certified** metrics.
   1. (Optional) Click **Create Metric** to define a new metric.
1. Optionally, add secondary metrics to monitor unintended effects of the experiment on other areas like performance, engagement, or revenue.

{{< img src="/product_analytics/experiment/exp_plan_launch_decision_metric.png" alt="The experiment configuration page showing the Decision metrics section with a Calculate metrics by dropdown set to User (@usr.id), a primary metric set to Add to Cart Conversion, and a Secondary metrics section." style="width:80%;" >}}

#### Sample size calculation (optional)
Determine how sensitive your experiment can be to changes between variants.

1. Click **sample size calculator** to open the side panel.
1. Expand **Calculation details**. Your primary and secondary metrics appear under **Metrics**.
1. Select an **Entry point** event to specify when users are enrolled into the experiment.
1. Optionally, add a filter to narrow the entry point audience.
1. Set the **Number of variants** and **Traffic exposure** percentage.
1. Under **Additional inputs**, configure the statistical **Power** (default 80%) and an optional **Target experiment duration** in weeks.
1. Click **Run Calculation** to estimate the [Minimum detectable effect (MDE)][3] for your metrics.
1. Close the **Sample Size Calculator** side panel.

{{< img src="/product_analytics/experiment/exp_plan_launch_sample_size.png" alt="The Sample Size Calculator side panel showing calculation details with Add to Cart Conversion as the primary metric and Number of cart views as a guardrail, an entry point set to click on ADD TO CART, two variants at 100% traffic exposure, and additional inputs for power and target experiment duration." style="width:80%;" >}}

#### Feature flag
Link a feature flag to control how traffic is split between variants.

Click **Add a feature flag** to select the appropriate feature flag for your experiment. If you haven't created a feature flag, see [Getting Started with Feature Flags][4].

#### Randomization
After selecting a feature flag, the randomization settings are pre-populated based on the flag's configuration. Adjust these settings as needed.

1. Select the **Environment** for your experiment from the dropdown.
1. Under **Targeting rules**:
   1. Click **Add Filter** to define conditions and filter which users to include in the experiment.
   1. Click **Add Condition** to set additional conditions.
1. Under **Variants**, set how traffic is split between your control and treatment groups. Use the **Randomize users and split traffic** dropdown to choose an equal or custom split.
1. Under **Traffic exposure**, set the percentage of targeted traffic to include in the experiment.
1. Optionally, [schedule a staged rollout](#schedule-a-staged-rollout-optional).

{{< img src="/product_analytics/experiment/exp_plan_launch_ui_randomization.png" alt="The Randomization section showing the environment set to staging, a targeting rule with an IF condition, two variants with an equal 50/50 split between Control (False) and variant B (True), and traffic exposure set to 100% of targeted traffic with an Add Rollout Steps option." style="width:80%;" >}}

#### Schedule a staged rollout (optional)

To gradually ramp up experiment traffic instead of launching to all users at once:

1. In the **Randomization** section, click **Add Rollout Steps** and select a rollout configuration.
1. Adjust the **Traffic exposure** percentage for each step as needed.
1. Set the hold duration between steps using the **Scheduled rollout by holding between steps for** dropdown.

At each rollout stage, Datadog samples a percentage of eligible users to include in the experiment. Users outside the sample still see the default experience but are not included in experiment results.

{{% collapse-content title="Additional configuration settings (optional)" level="h4" expanded=false %}}

##### Notifications
Select recipients from the **Recipients** dropdown to receive updates on your experiment.

##### Statistical analysis plan
Datadog uses sequential statistical analysis by default. This method provides statistically valid confidence intervals throughout the experiment, so you can make decisions at any time.

To use a different statistical method:
1. Expand the **Statistical analysis plan** section.
1. Select the **Confidence interval method** from the dropdown. The default is **Sequential**.
1. Select the **Confidence level** from the dropdown. The default is **95%**.
1. Toggle **CUPED calculation** to reduce variance and improve experiment sensitivity.
1. Toggle **Multiple testing correction** to adjust for multiple comparisons across metrics.

##### Split-by exploration dimensions
Segment experiment results by context attributes.

Expand the **Split-by exploration dimensions** section. Select properties from the **Properties to compute for dimensional analysis** dropdown.

{{% /collapse-content %}}

## Launch your experiment

To launch your experiment:

1. Click **Start Experiment** to open the **Confirm starting the experiment** dialog.
1. Review your experiment settings.
1. Click **Start Experiment & Enable Flag** to launch the experiment.

Launching the experiment opens the **Flag & Exposures** page:
- Check the **Exposure balance check** to confirm users are split across variants as expected.
- Click **View Exposures Log** to see a real-time list of traffic getting enrolled into your experiment.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: /experiments/defining_metrics
[3]: /experiments/minimum_detectable_effect
[4]: /getting_started/feature_flags/
[5]: /experiments/reading_results
[6]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
