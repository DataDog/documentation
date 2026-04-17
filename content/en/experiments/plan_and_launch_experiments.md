---
title: Plan and Launch Experiments
description: Use Datadog Experiments to measure the causal relationship that new experiences or features have on business outcomes, user behavior, and application performance.
aliases:
  - /product_analytics/experimentation/
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
---

## Overview

Plan and launch [experiments][8] to measure how new features affect business outcomes, user behavior, and application performance.

## Prerequisites

Before you begin, make sure you have:

- A [feature flag][4] for deploying and managing the experiment variants you want to test.
- At least one [experiment metric][2] for measuring the outcome of your experiment.
- A [subject type][6] for grouping users (default is **User**).

## Plan your experiment
Give your experiment a name and hypothesis, then define the settings.

### Draft your experiment

To create a draft experiment:

1. Navigate to [Experiments][1] in Datadog Product Analytics.
1. Click **Create Experiment**.
1. Enter your **Experiment name** and **Hypothesis**.
1. Click **Create Draft Experiment** to open the experiment's setup page.

{{< img src="/product_analytics/experiment/exp_plan_launch_create_experiment.png" alt="The Create new draft experiment dialog with an experiment name of New Product Photos Experiment, a hypothesis about higher-resolution product photos increasing add-to-cart conversions, and a Create Draft Experiment button highlighted." style="width:80%;" >}}

You can also create an experiment directly from a feature flag's detail page:
1. Navigate to the **[Feature Flags][7]** page and select the **Overview** tab.
1. Select the feature flag you want to use for your experiment to open its detail page.
1. In the **Targeting rules & rollouts** section, click **Create New Experiment**, then **Create Experiment**.

{{< img src="/product_analytics/experiment/exp_plan_launch_ff_new_experiment.png" alt="The feature flag detail page for a flag called new_product_photos, showing targeting rules and rollouts with a 50/50 split between control and treatment variants, and a Create New Experiment button highlighted at the bottom." style="width:80%;" >}}

### Set up your experiment

After drafting your experiment, define the metrics, feature flag, and randomization settings.

#### Set decision metrics
Define the metrics that measure the outcome of your experiment.

1. Use the **Calculate metrics by** dropdown to select the subject type. The default is **User (@usr.id)**. To define a custom subject type, click **Create subject type** from the dropdown.
1. Click the **Primary metric** button to open the metric picker:
   1. Select a primary metric to measure the main outcome of your experiment.
   1. (Optional) Scope the list to **Certified** or **Non-certified** metrics.
   1. (Optional) Click **Create Metric** to define a new metric. For setup instructions, see [Create Experiment Metrics][2].
1. (Optional) Add **Secondary metrics** (also called guardrail metrics) to monitor unintended effects of the experiment on other areas like performance, engagement, or revenue.
1. Proceed to [Run a sample size calculation (optional)](#run-a-sample-size-calculation-optional) or skip to [Add a feature flag](#add-a-feature-flag).

{{< img src="/product_analytics/experiment/exp_plan_launch_decision_metric.png" alt="The experiment configuration page showing the Decision metrics section with a Calculate metrics by dropdown set to User (@usr.id), a primary metric set to Add to Cart Conversion, and a Secondary metrics section." style="width:80%;" >}}

#### Run a sample size calculation (optional)
Estimate the sample size needed to detect meaningful differences between variants.

1. Click the **sample size calculator** link to open the side panel.
1. Expand **Calculation details**. Your primary and secondary metrics appear under **Metrics**.
1. Use the **Entry point** dropdown to select the event that assigns users to the experiment. Datadog uses this to estimate expected traffic.
1. (Optional) Add a **Filter** to narrow the entry point's audience. If you do not see the property you need, type the property name in the **Custom property** field and click **Add**.
1. Set the **Number of variants** (default is 2) and **Traffic exposure** percentage (default is 100%).
1. Under **Additional inputs**, configure the statistical **Power** (default is 80%) and **Target experiment duration** in weeks.
1. Click **Run Calculation** to see an estimate of the **[Minimum detectable effect (MDE)][3] over time** for your metrics.
1. Close the **Sample Size Calculator** side panel and continue to [Add a feature flag](#add-a-feature-flag).

{{< img src="/product_analytics/experiment/exp_plan_launch_sample_size.png" alt="The Sample Size Calculator side panel showing calculation details with Add to Cart Conversion as the primary metric and Number of cart views as a secondary metric (guardrail), an entry point set to click on ADD TO CART, two variants at 100% traffic exposure, and additional inputs for power and target experiment duration." style="width:80%;" >}}

#### Add a feature flag
Link a feature flag to control how traffic is split between the experiment variants.

1. Click the **Add a feature flag** button to open the picker.
1. Select the feature flag you want to use for your experiment.
1. If you have not created a feature flag, click **Create New Feature Flag**. For setup instructions, see [Create your first feature flag][9].
1. Continue to [randomize your users and set traffic exposure](#configure-randomization).

{{< img src="/product_analytics/experiment/exp_plan_launch_add_ff.png" alt="The feature flag picker showing a list of available flags sorted by creation date, with new_product_photos selected and its details displayed, including the flag key new-product-photos, type Boolean, and a Create New Feature Flag link at the bottom." style="width:80%;" >}}

#### Configure randomization
Randomize your users and split traffic across your experiment variants.

After you select a feature flag, Datadog pre-populates the randomization settings based on the flag's configuration.

<div class="alert alert-info">The randomization settings you configure here have the following effect after you launch your experiment:<br><br><ul><li>Datadog adds a targeting rule to the selected feature flag.</li><li>If multiple experiments share the same flag, Datadog evaluates traffic based on the order of the flag's targeting rules. You can reorder targeting rules in the confirmation dialog before launching your experiment.</li></ul></div>

To configure how users are assigned to variants:
1. Select the **Environment** for your experiment from the dropdown. The default is **prod**.
1. Under **Targeting rules**:
   1. Click **Add Filter** to define conditions based on custom attributes set in your SDK's evaluation context and filter which users to include in the experiment.
   1. Click **Add Condition** to set additional conditions.
1. Under **Variants**, use the **Randomize users and split traffic** dropdown to choose **Equally (recommended)** or **Custom**. This sets how traffic is split between your experiment groups. Each user consistently sees their assigned variant throughout the experiment.
1. Under **Traffic exposure**, set the percentage of targeted traffic to include in the experiment.
1. (Optional) [Schedule a staged rollout](#schedule-a-staged-rollout-optional) and [set additional configurations](#additional-config).
1. After configuring your experiment, proceed to [Launch your experiment](#launch-your-experiment).

{{< img src="/product_analytics/experiment/exp_plan_launch_randomization_ui.png" alt="The Randomization section showing the environment set to prod, a targeting rule with an IF condition, two variants with an equal 50/50 split between Control (Enabled/true) and variant B (Disabled/false), and traffic exposure set to 100% of targeted traffic with an Add Rollout Steps option." style="width:80%;" >}}

{{% collapse-content title="Additional configuration settings (optional)" level="h4" expanded=false id="additional-config" %}}

##### Schedule a staged rollout (optional)

To gradually ramp up experiment traffic instead of launching to all users at once:

1. In the **Randomization** section, click **Add Rollout Steps** and select a rollout configuration.
1. Adjust the **Traffic exposure** percentage for each step as needed.
1. Set the hold duration between steps using the **Scheduled rollout by holding between steps for** dropdown.

At each rollout stage, Datadog samples a percentage of eligible users to include in the experiment. Users outside the sample still see the default experience but are not included in experiment results.

##### Set notifications
Select recipients from the **Recipients** dropdown to receive alerts about experiment lifecycle events, such as when results reach statistical significance or an issue is detected.

##### Choose a statistical analysis plan
If your organization has configured default settings, a **COMPANY DEFAULT** badge appears and the settings are pre-populated.

To modify the statistical analysis plan:
1. Expand the **Statistical analysis plan** section.
1. Select the method from the **Confidence interval method** dropdown. The default is **Sequential**.
   - If you select **Bayesian**, choose a **Standard Deviation of Prior** from the dropdown. The default is **Medium (5.00%)**.
1. Select a percentage from the **Confidence level** dropdown.
1. Toggle on **CUPED calculation** to reduce variance and improve experiment sensitivity.
1. Toggle on **Multiple testing correction** to adjust for multiple comparisons across metrics.
   - **Multiple testing correction** is not available when using the **Bayesian** method.
1. (Optional) Click **Reset to Default** to restore the Datadog default, or your company default if configured.

##### Add split-by exploration dimensions
Segment experiment results by context attributes.

Expand the **Split-by exploration dimensions** section. Select properties from the **Properties to compute for dimensional analysis** dropdown.

{{% /collapse-content %}}

## Launch your experiment

To launch your experiment:

1. Click **Start Experiment** to open the **Confirm starting the experiment** dialog.
1. Review your experiment settings. If multiple experiments share the same flag, use the arrow on the targeting rules to re-order them as needed.
1. Click **Start Experiment & Enable Flag** to launch the experiment.

Launching the experiment opens the **Flag & Exposures** page. Verify that the experiment is running correctly:
- Check the **Exposure balance check** to confirm users are split across variants as expected.
- Click **View Exposures Log** to see a real-time list of users enrolling in your experiment.

After launching your experiment, see [Reading Experiment Results][5] to review your data.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: /experiments/defining_metrics
[3]: /experiments/minimum_detectable_effect
[4]: /getting_started/feature_flags
[5]: /experiments/reading_results
[6]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
[7]: https://app.datadoghq.com/feature-flags
[8]: /experiments/
[9]: /getting_started/feature_flags/#create-your-first-feature-flag

