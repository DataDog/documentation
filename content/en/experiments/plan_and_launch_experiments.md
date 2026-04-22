---
title: Plan and Launch Experiments
description: Use Datadog Experiments to measure the causal relationship that new experiences or features have on business outcomes, user behavior, and application performance.
aliases:
  - /product_analytics/experimentation/
further_reading:
- link: "https://www.datadoghq.com/blog/experiments"
  tag: "Blog"
  text: "Measure the business impact of every product change with Datadog Experiments"
- link: "https://www.datadoghq.com/blog/datadog-product-analytics"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
---

## Overview

Plan and launch [experiments][8] to measure how new features affect business outcomes, user behavior, and application performance.

## Prerequisites

<div class="alert alert-info">If your organization uses custom roles, you must have the appropriate <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#product-analytics">Product Analytics</a> and <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#feature-flags">Feature Flags</a> permissions to create and launch experiments.</div>

Before you begin, make sure you have:

- A [feature flag][4] for deploying and managing the experiment variants you want to test.
- At least one [experiment metric][2] for measuring the outcome of your experiment.
- A [subject type][6] for setting the level at which Datadog randomizes your experiment (default is **User**).

## Plan your experiment

Give your experiment a name and hypothesis, then define the settings.

### Draft your experiment

To create a draft experiment:

1. Navigate to **[Experiments > Experiment List][1]** in Datadog Product Analytics.
1. Click **Create Experiment** to open the dialog, then enter your **Experiment name** and **Hypothesis**.
1. Click **Create Draft Experiment** to open the experiment's setup page and continue to [Set up your experiment](#set-up-your-experiment).

{{< img src="/product_analytics/experiment/exp_plan_launch_create_experiment.png" alt="The Create new draft experiment dialog with an experiment name of New Product Photos Experiment, a hypothesis about higher-resolution product photos increasing add-to-cart conversions, and a Create Draft Experiment button highlighted." style="width:80%;" >}}

You can also create an experiment directly from a feature flag's detail page:

1. Navigate to the **[Feature Flags][7]** page and select the **Overview** tab.
1. Select the feature flag you want to use for your experiment to open its detail page.
1. In the **Targeting rules & rollouts** section, click **Create New Experiment** to open the dialog.
1. In the dialog, click **Create Experiment** to open the experiment's setup page.
1. On the experiment setup page, Datadog pre-fills the **Experiment name** with the name of the feature flag. Edit it as needed.
1. Enter your **Hypothesis** and continue to [Set up your experiment](#set-up-your-experiment).

{{< img src="/product_analytics/experiment/exp_plan_launch_ff_new_experiment.png" alt="The feature flag detail page for a flag called new_product_photos, showing targeting rules and rollouts with a 50/50 split between control and treatment variants, and a Create New Experiment button highlighted at the bottom." style="width:80%;" >}}

### Set up your experiment

After creating your experiment, define the metrics, feature flag, and randomization settings.

#### Set decision metrics

To define the metrics that measure the outcome of your experiment:

1. Use the **Calculate metrics by** dropdown to select the subject type (default is **User (@usr.id)**).
   - To define a custom subject type, select **Create subject type** from the dropdown.
1. Click the **Primary metric** button to open the picker:
   1. Select a primary metric for the outcome you want to measure.
   1. (Optional) Click the **Certified** or **Non-certified** tab to filter the list.
   1. (Optional) Click **Create Metric** to define a new metric. For setup instructions, see [Create Experiment Metrics][2].
1. (Optional) Click the **Secondary metrics** button to add guardrail metrics, which monitor unintended effects of the experiment on other areas such as performance, engagement, or revenue.
1. Proceed to [Run a sample size calculation (optional)](#run-a-sample-size-calculation-optional) or skip to [Add a feature flag](#add-a-feature-flag).

{{< img src="/product_analytics/experiment/exp_plan_launch_decision_metric.png" alt="The experiment configuration page showing the Decision metrics section with a Calculate metrics by dropdown set to User (@usr.id), a primary metric set to Add to Cart Conversion, and a Secondary metrics section." style="width:80%;" >}}

#### Run a sample size calculation (optional)

The sample size calculator estimates the number of users and the duration needed to detect a meaningful effect. You choose an entry point, the event that assigns users to the experiment, and Datadog uses the volume of traffic to that event to produce the estimate.

To run the calculation:

1. In the **Run a sample size calculation (optional)** section, click the **sample size calculator** link to open the side panel.
1. Expand **Calculation details**. Your primary and secondary metrics appear under **Metrics**.
1. Use the **Entry point** dropdown to select the event that assigns users to the experiment, such as viewing a checkout page or clicking an add-to-cart button. Datadog uses this event to estimate traffic volume.
1. (Optional) Under **Filter entry point**, narrow the entry point's audience:
   1. Click **Filter** and select a property from the picker. If you do not see the property you need, type the property name in the **Custom property** field and click **Add**.
   1. In the filter row that appears, modify the operator as needed and select a value from the dropdown. The default operator is **= (is)**.
   1. (Optional) Click **Filter** to add more rows. Between rows, use the dropdown to select **or** or **and** to set how filters combine.
1. Set the **Number of variants** (default is 2) and **Traffic exposure** percentage (default is 100%).
1. Expand **Additional inputs**, then choose the statistical **Power** (default is 80%) and enter a **Target experiment duration** in weeks.
   - The **Target experiment duration** value must be 1 or an even number because the calculator estimates MDE values and expected user counts at 1-, 2-, 4-, 6-, and 8-week intervals.
   - For longer intervals, enter a higher even value.
1. Click **Run Calculation** to see an estimate of the **[Minimum detectable effect (MDE)][3] over time** for your metrics.
1. Close the side panel and continue to [Add a feature flag](#add-a-feature-flag).

{{< img src="/product_analytics/experiment/exp_plan_launch_sample_size.png" alt="The Sample Size Calculator side panel showing calculation details with Add to Cart Conversion as the primary metric and Number of cart views as a secondary metric (guardrail), an entry point set to click on ADD TO CART, two variants at 100% traffic exposure, and additional inputs for power and target experiment duration." style="width:80%;" >}}

#### Add a feature flag

To add a feature flag to control how Datadog splits traffic between the experiment variants:

1. In the **Feature flag** section, click the **Add a feature flag** button to open the picker.
1. Select the feature flag for your experiment.
   - If you have not created a feature flag, click **Create New Feature Flag**. For setup instructions, see [Create your first feature flag][9].
1. Continue to [Configure randomization](#configure-randomization).

{{< img src="/product_analytics/experiment/exp_plan_launch_add_ff.png" alt="The feature flag picker showing a list of available flags sorted by creation date, with new_product_photos selected and its details displayed, including the flag key new-product-photos, type Boolean, and a Create New Feature Flag link at the bottom." style="width:80%;" >}}

#### Configure randomization

Randomize your users and split traffic across your experiment variants.

After you select a feature flag, Datadog pre-populates the randomization settings based on the flag's configuration.

<div class="alert alert-info">The randomization settings you configure here have the following effect after you launch your experiment:<br><br><ul><li>Datadog adds a targeting rule to the selected feature flag.</li><li>If multiple experiments share the same flag, Datadog evaluates traffic based on the order of the flag's targeting rules. You can reorder targeting rules in the confirmation dialog before launching your experiment.</li></ul></div>

To configure randomization:

1. Select the **Environment** for your experiment from the dropdown. The default is **prod**.
1. Under **Targeting rules**, configure a filter to target users based on custom attributes (for example, user role or subscription tier) that you set in your [evaluation context][10]:
   1. Click **Add Filter**. For the `IF` row, enter an attribute and value, and select an operator from the dropdown. The default is **is one of**.
   1. (Optional) Refine your targeting rule:
      - To add an `AND` row within the same filter, click **Add Condition**.
      - To add another filter joined by `OR`, click **Add Filter**.
1. Under **Variants**, use the **Randomize users and split traffic** dropdown to choose **Equally (recommended)** or **Custom**. This sets how Datadog splits traffic between your variants. Each user sees only their assigned variant throughout the experiment.
   - If you select **Custom**, enter a percentage for each variant. Percentages must sum to 100%.
1. Under **Traffic exposure**, set the percentage of users matching your targeting rules to include in the experiment.
1. (Optional) [Schedule a staged rollout](#schedule-a-staged-rollout), [configure additional settings](#additional-configs), or both.
1. After configuring your experiment, proceed to [Launch your experiment](#launch-your-experiment).

{{< img src="/product_analytics/experiment/exp_plan_launch_randomization_section.png" alt="The Randomization section with the environment set to prod, two targeting rule filters joined by OR (each containing an IF and AND condition with an Add Condition button), an Add Filter button below, a 50/50 equal split between Control (true) and Treatment (false) variants, and traffic exposure set to 100% of targeted traffic with an Add Rollout Steps option." style="width:80%;" >}}

{{% collapse-content title="Additional configuration settings (optional)" level="h4" expanded=false id="additional-configs" %}}

##### Schedule a staged rollout

To gradually ramp up experiment traffic instead of launching to all users at once:

1. In the **Randomization** section, click **Add Rollout Steps** and select a preset step configuration from the dropdown (for example, 3 steps from 5% to 100%).
1. Adjust the **Traffic exposure** percentage for each step as needed.
1. Next to **Scheduled rollout by holding between steps for**, use the two dropdowns to select a number and a time unit (for example, **1** and **days**). This sets how long each step runs before advancing.

At each rollout step, Datadog samples a percentage of eligible users to include in the experiment. Users outside the sample still see the default (control) experience, but Datadog does not include them in experiment results.

##### Set notifications

Route notifications to the right people as the experiment progresses.

In the **Notifications** section, use the **Recipients** dropdown to select who receives notifications about experiment life cycle events, such as results reaching statistical significance or Datadog detecting an issue.

##### Choose a statistical analysis plan

Configure how Datadog calculates statistical significance for your experiment.

If your organization has configured default settings, a **COMPANY DEFAULT** badge appears and Datadog pre-populates the settings.

To modify the statistical analysis plan:

1. Expand the **Statistical analysis plan** section.
1. Select a method from the **Confidence interval method** dropdown. The default is **Sequential**.
   - If you select **Bayesian**, choose a **Standard Deviation of Prior** from the dropdown. The default is **Medium (5.00%)**.
1. Select a percentage from the **Confidence level** dropdown. The default is **95%**.
1. To disable CUPED, toggle off **CUPED calculation**. CUPED is enabled by default and uses pre-experiment data from each subject to reduce the variance of the metrics and improve experiment sensitivity.
1. To reduce the risk of false positives, toggle on **Multiple testing correction**. This setting adjusts for the increased risk across multiple metric comparisons, producing more conservative results.
   - This setting is not available when you use the **Bayesian** method.
1. Click **Reset to Default** to restore the default settings. If your organization has configured a company default, Datadog restores those settings instead.

##### Add split-by exploration dimensions

Segment your experiment results by properties (also called attributes) from your [evaluation context][10].

To configure split-by dimensions:

1. Expand the **Split-by exploration dimensions** section.
1. Select properties from the **Properties to compute for dimensional analysis** dropdown. Available properties have the `context.` prefix.
1. If you do not see the property you need:
   1. Type the property name in the dropdown field, prefixed with `context.` (for example, `context.team`). Then, click **Add custom property** to open the **Split-by exploration dimensions** dialog.
   1. Verify the **Column Name** matches the property name you entered.
   1. Select the property **Type** from the dropdown. The default is **String**.
   1. Click **Save**. The custom property appears in the **Properties to compute for dimensional analysis** dropdown.

{{% /collapse-content %}}

## Launch your experiment

To launch your experiment:

1. Click **Start Experiment** to open the **Confirm starting the experiment** dialog.
1. In the dialog, review the environment, feature flag, and the flag's targeting rules for accuracy.
   - If multiple experiments share the same flag, use the up and down arrows on each targeting rule to reorder them.
1. Click **Start Experiment & Enable Flag** to launch the experiment.

Launching the experiment opens the **Flag & Exposures** page. Verify your configuration is live:
- Review the **Exposure balance check** to confirm your variants are split at the percentages you configured.
- Click **View Exposures Log** to monitor real-time user enrollment.

See [Reading Experiment Results][5] to review your data.

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
[10]: https://docs.datadoghq.com/feature_flags/client#context-attribute-requirements

