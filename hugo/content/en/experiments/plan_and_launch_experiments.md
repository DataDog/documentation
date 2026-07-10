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

<div class="alert alert-info">You must have the appropriate <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#product-analytics">Product Analytics</a> and <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#feature-flags">Feature Flags</a> permissions to create and launch experiments.</div>

Before you begin, make sure you have:

- A [feature flag][4] for deploying and managing the experiment variants you want to test.
- At least one [experiment metric][2] for measuring the outcome of your experiment.
- A [subject type][6] for setting the level at which Datadog randomizes your experiment.

## Plan your experiment

Give your experiment a name and hypothesis, then define the settings.

### Draft your experiment

To create a draft experiment:

1. Navigate to [{{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Experiment List{{< /ui >}}][1] in Datadog Product Analytics.
1. Click {{< ui >}}Create Experiment{{< /ui >}} to open the dialog, then enter your {{< ui >}}Experiment name{{< /ui >}} and {{< ui >}}Hypothesis{{< /ui >}}.
1. Click {{< ui >}}Create Draft Experiment{{< /ui >}} to open the experiment's setup page and continue to [Set up your experiment](#set-up-your-experiment).

{{< img src="/product_analytics/experiment/exp_plan_launch_create_experiment.png" alt="The Create new draft experiment dialog with an experiment name of New Product Photos Experiment, a hypothesis about higher-resolution product photos increasing add-to-cart conversions, and a Create Draft Experiment button highlighted." style="width:80%;" >}}

You can also create an experiment directly from a feature flag's detail page:

1. Navigate to the [{{< ui >}}Feature Flags{{< /ui >}}][7] page and select the {{< ui >}}Overview{{< /ui >}} tab.
1. Select the feature flag you want to use for your experiment to open its detail page.
1. In the {{< ui >}}Targeting rules & rollouts{{< /ui >}} section, click {{< ui >}}Create New Experiment{{< /ui >}} to open the dialog.
1. In the dialog, click {{< ui >}}Create Experiment{{< /ui >}} to open the experiment's setup page.
1. On the experiment setup page, Datadog pre-fills the {{< ui >}}Experiment name{{< /ui >}} with the name of the feature flag. Edit it as needed.
1. Enter your {{< ui >}}Hypothesis{{< /ui >}} and continue to [Set up your experiment](#set-up-your-experiment).

{{< img src="/product_analytics/experiment/exp_plan_launch_ff_new_experiment.png" alt="The feature flag detail page for a flag called new_product_photos, showing targeting rules and rollouts with a 50/50 split between control and treatment variants, and a Create New Experiment button highlighted at the bottom." style="width:80%;" >}}

### Set up your experiment

After creating your experiment, define the metrics, feature flag, and randomization settings.

#### Set decision metrics

To define the metrics that measure the outcome of your experiment:

1. Use the {{< ui >}}Calculate metrics by{{< /ui >}} dropdown to select the subject type.
   - To define a custom subject type, select {{< ui >}}Create subject type{{< /ui >}} from the dropdown.
1. Click the {{< ui >}}Primary metric{{< /ui >}} button to open the picker:
   1. Select a primary metric for the outcome you want to measure.
   1. (Optional) Click the {{< ui >}}Certified{{< /ui >}} or {{< ui >}}Non-certified{{< /ui >}} tab to filter the list.
   1. (Optional) Click {{< ui >}}Create Metric{{< /ui >}} to define a new metric. For setup instructions, see [Create Experiment Metrics][2].
1. (Optional) Click the {{< ui >}}Secondary metrics{{< /ui >}} button to add guardrail metrics, which monitor unintended effects of the experiment on other areas such as performance, engagement, or revenue.
1. Proceed to [Run a sample size calculation (optional)](#run-a-sample-size-calculation-optional) or skip to [Add a feature flag](#add-a-feature-flag).

{{< img src="/product_analytics/experiment/exp_plan_launch_decision_metric.png" alt="The experiment configuration page showing the Decision metrics section with a Calculate metrics by dropdown set to User (@usr.id), a primary metric set to Add to Cart Conversion, and a Secondary metrics section." style="width:80%;" >}}

#### Run a sample size calculation (optional)

The sample size calculator estimates the number of users and the duration needed to detect a meaningful effect. You choose an entry point, the event that assigns users to the experiment, and Datadog uses the volume of traffic to that event to produce the estimate.

To run the calculation:

1. In the {{< ui >}}Run a sample size calculation (optional){{< /ui >}} section, click the **sample size calculator** link to open the side panel.
1. Expand {{< ui >}}Calculation details{{< /ui >}}. Your primary and secondary metrics appear under {{< ui >}}Metrics{{< /ui >}}.
1. Use the {{< ui >}}Entry point{{< /ui >}} dropdown to select the event that assigns users to the experiment, such as viewing a checkout page or clicking an add-to-cart button. Datadog uses this event to estimate traffic volume.
1. (Optional) Under {{< ui >}}Filter entry point{{< /ui >}}, narrow the entry point's audience:
   1. Click {{< ui >}}+ Filter{{< /ui >}} and select a property from the picker. If you do not see the property you need, type the property name in the {{< ui >}}Custom property{{< /ui >}} field and click {{< ui >}}Add{{< /ui >}}.
   1. In the filter row that appears, modify the operator as needed and select a value from the dropdown.
   1. (Optional) Click {{< ui >}}+ Filter{{< /ui >}} to add more rows. Between rows, use the dropdown to select {{< ui >}}or{{< /ui >}} or {{< ui >}}and{{< /ui >}} to set how filters combine.
1. Set the {{< ui >}}Number of variants{{< /ui >}} and {{< ui >}}Traffic exposure{{< /ui >}}.
1. Expand {{< ui >}}Additional inputs{{< /ui >}}, then choose the statistical {{< ui >}}Power{{< /ui >}} and enter a {{< ui >}}Target experiment duration{{< /ui >}} in weeks.
   - The {{< ui >}}Target experiment duration{{< /ui >}} value must be 1 or an even number because the calculator estimates MDE values and expected user counts at 1-, 2-, 4-, 6-, and 8-week intervals.
1. Click {{< ui >}}Run Calculation{{< /ui >}} to see an estimate of the **[Minimum detectable effect (MDE)][3] over time** for your metrics.
1. Close the side panel and continue to [Add a feature flag](#add-a-feature-flag).

{{< img src="/product_analytics/experiment/exp_plan_launch_sample_size.png" alt="The Sample Size Calculator side panel showing calculation details with Add to Cart Conversion as the primary metric and Number of cart views as a secondary metric (guardrail), an entry point set to click on ADD TO CART, two variants at 100% traffic exposure, and additional inputs for power and target experiment duration." style="width:80%;" >}}

#### Add a feature flag

To add a feature flag to control how Datadog splits traffic between the experiment variants:

1. In the {{< ui >}}Feature flag{{< /ui >}} section, click the {{< ui >}}Add a feature flag{{< /ui >}} button to open the picker.
1. Select the feature flag for your experiment.
   - If you have not created a feature flag, click {{< ui >}}Create New Feature Flag{{< /ui >}}. For setup instructions, see [Create your first feature flag][9].
1. Continue to [Configure randomization](#configure-randomization).

{{< img src="/product_analytics/experiment/exp_plan_launch_add_ff.png" alt="The feature flag picker showing a list of available flags sorted by creation date, with new_product_photos selected and its details displayed, including the flag key new-product-photos, type Boolean, and a Create New Feature Flag link at the bottom." style="width:80%;" >}}

#### Configure randomization

Randomize your users and split traffic across your experiment variants.

After you select a feature flag, Datadog pre-populates the randomization settings based on the flag's configuration.

<div class="alert alert-info">The randomization settings you configure here have the following effect after you launch your experiment:<br><br><ul><li>Datadog adds a targeting rule to the selected feature flag.</li><li>If multiple experiments share the same flag, Datadog evaluates traffic based on the order of the flag's targeting rules. You can reorder targeting rules in the confirmation dialog before launching your experiment.</li></ul></div>

To configure randomization:

1. Select the {{< ui >}}Environment{{< /ui >}} for your experiment from the dropdown.
1. Under {{< ui >}}Targeting rules{{< /ui >}}, configure a filter to target users based on custom attributes (for example, user role or subscription tier) that you set in your [evaluation context][10]:
   1. Click {{< ui >}}Add Filter{{< /ui >}}. For the `IF` row, enter an attribute and value, and select an operator from the dropdown.
   1. (Optional) Refine your targeting rule:
      - To add an `AND` row within the same filter, click {{< ui >}}Add Condition{{< /ui >}}.
      - To add another filter joined by `OR`, click {{< ui >}}Add Filter{{< /ui >}}.
1. Under {{< ui >}}Variants{{< /ui >}}, use the {{< ui >}}Randomize users and split traffic{{< /ui >}} dropdown to choose {{< ui >}}Equally (recommended){{< /ui >}} or {{< ui >}}Custom{{< /ui >}}. This sets how Datadog splits traffic between your variants. Each user sees only their assigned variant throughout the experiment.
   - If you select {{< ui >}}Custom{{< /ui >}}, enter a percentage for each variant. Percentages must sum to 100%.
1. Under {{< ui >}}Traffic exposure{{< /ui >}}, set the percentage of users matching your targeting rules to include in the experiment.
1. (Optional) [Schedule a staged rollout](#schedule-a-staged-rollout), [configure additional settings](#additional-configs), or both.
1. After configuring your experiment, proceed to [Launch your experiment](#launch-your-experiment).

{{< img src="/product_analytics/experiment/exp_plan_launch_randomization_section.png" alt="The Randomization section with the environment set to prod, two targeting rule filters joined by OR (each containing an IF and AND condition with an Add Condition button), an Add Filter button below, a 50/50 equal split between Control (true) and Treatment (false) variants, and traffic exposure set to 100% of targeted traffic with an Add Rollout Steps option." style="width:80%;" >}}

{{% collapse-content title="Additional configuration settings (optional)" level="h4" expanded=false id="additional-configs" %}}

##### Schedule a staged rollout

To gradually ramp up experiment traffic instead of launching to all users at once:

1. In the {{< ui >}}Randomization{{< /ui >}} section, click {{< ui >}}Add Rollout Steps{{< /ui >}} and select a preset step configuration from the dropdown (for example, 3 steps from 5% to 100%).
1. Adjust the {{< ui >}}Traffic exposure{{< /ui >}} percentage for each step as needed.
1. Next to {{< ui >}}Scheduled rollout by holding between steps for{{< /ui >}}, use the two dropdowns to select a number and a time unit (for example, {{< ui >}}1{{< /ui >}} and {{< ui >}}days{{< /ui >}}). This sets how long each step runs before advancing.

At each rollout step, Datadog samples a percentage of eligible users to include in the experiment. Users outside the sample still see the default (control) experience, but Datadog does not include them in experiment results.

##### Set notifications

Route notifications to the right people as the experiment progresses.

In the {{< ui >}}Notifications{{< /ui >}} section, use the {{< ui >}}Recipients{{< /ui >}} dropdown to select who receives notifications about experiment life cycle events, such as results reaching statistical significance or Datadog detecting an issue.

##### Choose a statistical analysis plan

Configure how Datadog calculates statistical significance for your experiment. For guidance on choosing a method, see [Analysis Methods][11].

If your organization has configured default settings, a {{< ui >}}COMPANY DEFAULT{{< /ui >}} badge appears and Datadog pre-populates the settings.

To modify the statistical analysis plan:

1. Expand the {{< ui >}}Statistical analysis plan{{< /ui >}} section.
1. Select a method from the {{< ui >}}Confidence interval method{{< /ui >}} dropdown.
   - If you select {{< ui >}}Bayesian{{< /ui >}}, choose a {{< ui >}}Standard Deviation of Prior{{< /ui >}} from the dropdown.
1. Select a percentage from the {{< ui >}}Confidence level{{< /ui >}} dropdown.
1. To disable CUPED, toggle off {{< ui >}}CUPED calculation{{< /ui >}}. CUPED is enabled by default and uses pre-experiment data from each subject to reduce the variance of the metrics and improve experiment sensitivity.
1. To reduce the risk of false positives, toggle on {{< ui >}}Multiple testing correction{{< /ui >}}. This setting adjusts for the increased risk across multiple metric comparisons, producing more conservative results.
   - This setting is not available when you use the {{< ui >}}Bayesian{{< /ui >}} method.
1. Click {{< ui >}}Reset to Default{{< /ui >}} to restore the default settings. If your organization has configured a company default, Datadog restores those settings instead.

##### Add split-by exploration dimensions

Segment your experiment results by properties (also called attributes) from your [evaluation context][10].

To configure split-by dimensions:

1. Expand the {{< ui >}}Split-by exploration dimensions{{< /ui >}} section.
1. Select properties from the {{< ui >}}Properties to compute for dimensional analysis{{< /ui >}} dropdown. Available properties have the `context.` prefix.
1. If you do not see the property you need:
   1. Type the property name in the dropdown field, prefixed with `context.` (for example, `context.team`). Then, click {{< ui >}}Add custom property{{< /ui >}} to open the {{< ui >}}Split-by exploration dimensions{{< /ui >}} dialog.
   1. Verify the {{< ui >}}Column Name{{< /ui >}} matches the property name you entered.
   1. Select the property {{< ui >}}Type{{< /ui >}} from the dropdown.
   1. Click {{< ui >}}Save{{< /ui >}}. The custom property appears in the {{< ui >}}Properties to compute for dimensional analysis{{< /ui >}} dropdown.

{{% /collapse-content %}}

## Launch your experiment

To launch your experiment:

1. Click {{< ui >}}Start Experiment{{< /ui >}} to open the {{< ui >}}Confirm starting the experiment{{< /ui >}} dialog.
1. In the dialog, review the environment, feature flag, and the flag's targeting rules for accuracy.
   - If multiple experiments share the same flag, use the up and down arrows on each targeting rule to reorder them.
1. Click {{< ui >}}Start Experiment & Enable Flag{{< /ui >}} to launch the experiment.

Launching the experiment opens the {{< ui >}}Flag & Exposures{{< /ui >}} page. Verify your configuration is live:
- Review the {{< ui >}}Exposure balance check{{< /ui >}} to confirm your variants are split at the percentages you configured.
- Click {{< ui >}}View Exposures Log{{< /ui >}} to monitor real-time user enrollment.

See [Reading Experiment Results][5] to review your data.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: /experiments/defining_metrics
[3]: /experiments/statistics/minimum_detectable_effect
[4]: /getting_started/feature_flags
[5]: /experiments/reading_results
[6]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
[7]: https://app.datadoghq.com/feature-flags
[8]: /experiments/
[9]: /getting_started/feature_flags/#create-your-first-feature-flag
[10]: https://docs.datadoghq.com/feature_flags/client#context-attribute-requirements
[11]: /experiments/statistics/analysis_methods
