---
title: Standardize Experiments with Protocols
description: Use protocols to define reusable experiment defaults so that every team runs experiments with the same metrics, randomization settings, and statistical analysis plan.
further_reading:
- link: "/experiments/plan_and_launch_experiments"
  tag: "Documentation"
  text: "Plan and Launch Experiments"
- link: "/experiments/defining_metrics"
  tag: "Documentation"
  text: "Create Experiment Metrics"
- link: "/experiments/statistics/analysis_methods"
  tag: "Documentation"
  text: "Analysis Methods"
---

## Overview

A protocol is a reusable template for experiment setup. It stores the metrics, randomization settings, duration, and statistical analysis plan that your team applies to a type of experiment.

Most teams run the same kinds of experiments repeatedly. A product team measures the same set of metrics for every feature rollout. A search team tests ranking changes with the same statistical method each time. Protocols capture these choices once. Experimenters then select a protocol instead of configuring each setting again.

Use protocols to:

- Reduce the number of decisions an experimenter makes when they create an experiment.
- Apply the same metrics and statistical method across a group of experiments.
- Give teams a set of approved experiment designs to choose from.

## Prerequisites

Before you begin, make sure you have:

- Access to the right [permissions][11]. The `product_analytics_experiments_read` permission grants read access. The `product_analytics_experiments_write` permission grants access to create, edit, publish, archive, and delete protocols.
- A [subject type][3] to set the level at which Datadog randomizes experiments.
- (Optional) One or more [experiment metrics][2], if you want the protocol to set the decision metrics for every experiment.

## Create a protocol

To create a protocol:

1. Navigate to [{{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Protocols{{< /ui >}}][1] in Datadog Product Analytics.
1. Click {{< ui >}}Create Protocol{{< /ui >}} to open the dialog.
1. Enter a {{< ui >}}Protocol name{{< /ui >}}. The name must be unique in your organization.
1. (Optional) Enter a {{< ui >}}Description{{< /ui >}} that explains when to use the protocol.
1. Click {{< ui >}}Create Protocol{{< /ui >}}.

Datadog creates the protocol as a draft and opens its setup page. Continue to [Configure the protocol][10].

{{< img src="/product_analytics/experiment/protocols/exp_protocols_list.png" alt="The Protocols page showing a Create Protocol button, a filter field, a Status filter set to Draft and Published, and a table listing published and draft protocols with columns for protocol name, status, subject type, primary metric, experiment count, and last updated time. Rows include published protocols such as Pricing and promotions test and Backend migration guardrail, and a draft protocol named Search Engine Optimization." style="width:90%;" >}}

## Configure the protocol

The setup page presents six numbered steps. Datadog saves your changes to a draft protocol as you work, so there is no separate save action.

The footer tracks your progress. It displays {{< ui >}}Required steps complete{{< /ui >}} when the protocol is ready to publish. Until then, it names the steps that still need input, such as {{< ui >}}Complete steps 1 and 2{{< /ui >}}.

{{< img src="/product_analytics/experiment/protocols/exp_protocols_setup.png" alt="The setup page for a draft protocol named Cart Optimization, showing step 1 Protocol details with a name, description, and owner, and step 2 Decision metric defaults with a primary metric and two secondary metrics. The footer reads Required steps complete next to a Publish button." style="width:90%;" >}}

### Step 1: Protocol details

Set the identity of the protocol.

1. Review or edit the {{< ui >}}Protocol name{{< /ui >}}. This field is required.
1. (Optional) Edit the {{< ui >}}Description{{< /ui >}}.

The {{< ui >}}Owner{{< /ui >}} field displays the user who created the protocol. This field is read-only.

### Step 2: Decision metric defaults

Set the metrics that measure the outcome of experiments created from this protocol.

1. Use the {{< ui >}}Calculate metrics by{{< /ui >}} dropdown to review or change the subject type. Datadog sets this field to your organization's default subject type when it creates the protocol. The field cannot be empty.
1. (Optional) Under {{< ui >}}Primary metric{{< /ui >}}, click {{< ui >}}Select a primary metric{{< /ui >}} and choose the metric that measures the main outcome. Datadog uses this metric to determine whether an experiment succeeds.
1. (Optional) Under {{< ui >}}Secondary metrics{{< /ui >}}, click {{< ui >}}Add secondary metrics{{< /ui >}} to add guardrail metrics. Guardrail metrics check for unintended harm to other areas, such as performance, engagement, or revenue.

The subject type is the only required field in this step. You can publish a protocol that has no primary metric, and experimenters then choose the decision metrics on each experiment. Set a primary metric when you want every experiment created from the protocol to measure the same outcome.

A metric can be either the primary metric or a secondary metric, but not both.

If you change the subject type after you select metrics, Datadog opens the {{< ui >}}Change subject type?{{< /ui >}} dialog. The dialog lists the metrics that are not compatible with the new subject type. Datadog removes those metrics from the protocol when you confirm.

{{< img src="/product_analytics/experiment/protocols/exp_protocols_decision_metrics.png" alt="The Decision metric defaults step of a protocol, showing a Calculate metrics by dropdown set to User, a primary metric of Add to Cart Conversion, and two secondary metrics for Checkout Conversion and Revenue." style="width:80%;" >}}

### Step 3: Additional metrics to add to every experiment

Add metrics that Datadog attaches to every experiment in addition to the decision metrics.

1. (Optional) Toggle on {{< ui >}}Set maximum number of metrics on the experiment to:{{< /ui >}} and enter a positive whole number. Datadog blocks experimenters from exceeding this limit on experiments created from the protocol.
1. (Optional) Add a metric group:
   1. Click {{< ui >}}Add metric group{{< /ui >}} to open the metric picker, then select the metrics to include. Datadog creates the group after you select the metrics.
   1. Enter a name for the group in the field that appears.
   1. To add more metrics to an existing group, click {{< ui >}}Add Metrics{{< /ui >}} in that group.
1. (Optional) Repeat to create more groups.

Metric groups organize related metrics on the experiment results page.

### Step 4: Randomization defaults

Set how Datadog splits traffic for experiments created from this protocol. The {{< ui >}}Environment{{< /ui >}} and {{< ui >}}Targeting rules{{< /ui >}} settings apply to Datadog Feature Flags only.

1. (Optional) Select an {{< ui >}}Environment{{< /ui >}} from the dropdown. You must select an environment before you can configure targeting rules or traffic exposure.
1. (Optional) Under {{< ui >}}Targeting rules{{< /ui >}}, add filters to limit the experiment audience by custom attributes, such as user role or subscription tier.
1. Under {{< ui >}}Traffic exposure{{< /ui >}}, set the percentage of matching users to include in the experiment. You can also define rollout steps to ramp traffic up over time.
1. (Optional) Toggle on {{< ui >}}Require splitting traffic equally between variants{{< /ui >}}. This records that experiments created from the protocol should use an equal variant split.

{{< img src="/product_analytics/experiment/protocols/exp_protocols_randomization.png" alt="The Randomization defaults step of a protocol, showing an Environment dropdown set to Production, a Targeting rules section with Add Filter and Add Saved Filter options, Traffic exposure set to 100% of targeted traffic with an Add Rollout Steps option, and a toggle to require splitting traffic equally between variants." style="width:80%;" >}}

### Step 5: Duration default

Set how long experiments created from this protocol run.

1. (Optional) Click {{< ui >}}Add a duration{{< /ui >}}, then enter a number and select a unit. This value becomes the target duration of the experiment. To set a minimum experiment duration, you must first set this default duration.
1. Under {{< ui >}}Enforcements{{< /ui >}}, set expectations for the duration of the experiment:
   - Toggle on {{< ui >}}Enforce a minimum experiment duration of{{< /ui >}}, then enter a number and select {{< ui >}}days{{< /ui >}} or {{< ui >}}weeks{{< /ui >}}. Set a default duration first, because the minimum duration cannot exceed it.
   - Toggle on {{< ui >}}Require a duration to start the experiment{{< /ui >}} to record that experiments created from the protocol need a duration.

Datadog locks {{< ui >}}Require a duration to start the experiment{{< /ui >}} in the on position when you set a minimum duration, or when the confidence interval method requires a duration.

### Step 6: Additional setting defaults

Set notifications, the statistical analysis plan, and the properties available for dimensional analysis.

Datadog pre-populates the statistical analysis plan from your organization's default experiment analysis settings.

#### Notifications

Under {{< ui >}}Notifications{{< /ui >}}, use the {{< ui >}}Recipients{{< /ui >}} dropdown to select who receives notifications. After you add a recipient, the {{< ui >}}Notify when{{< /ui >}} list appears with all triggers selected. Clear the triggers you do not want, or click {{< ui >}}Select all{{< /ui >}} to restore them.

The available triggers are:

| Trigger | Description |
| --- | --- |
| {{< ui >}}Experiment started{{< /ui >}} | An experiment starts. |
| {{< ui >}}Experiment issue detected{{< /ui >}} | Datadog detects a problem with an experiment. |
| {{< ui >}}Warehouse data pipeline issue detected{{< /ui >}} | Datadog detects a problem in the warehouse data pipeline. |
| {{< ui >}}Experiment results are statistically significant{{< /ui >}} | A metric reaches statistical significance. |
| {{< ui >}}Experiment reached target duration{{< /ui >}} | An experiment runs for its target duration. |
| {{< ui >}}Experiment winner rolled out{{< /ui >}} | A team rolls out the winning variant. |
| {{< ui >}}Sample size calculator run completed{{< /ui >}} | A sample size calculation finishes. |

Datadog copies these notification settings to each experiment created from the protocol, and experimenters can then adjust the recipients.

To remove notifications from the protocol, clear all recipients or clear all triggers.

#### Statistical analysis plan

For guidance on choosing a method, see [Analysis Methods][4].

1. Select a method from the {{< ui >}}Confidence interval method{{< /ui >}} dropdown: {{< ui >}}Sequential{{< /ui >}}, {{< ui >}}Fixed Sample{{< /ui >}}, {{< ui >}}Sequential Hybrid{{< /ui >}}, or {{< ui >}}Bayesian{{< /ui >}}.
1. Select a percentage from the {{< ui >}}Confidence level{{< /ui >}} dropdown.
1. Toggle {{< ui >}}Enable CUPED calculation{{< /ui >}} on or off. [CUPED][5] uses pre-experiment data from each subject to reduce metric variance.
1. To control the family-wise error rate, toggle on {{< ui >}}Enable multiple testing correction{{< /ui >}}. For details, see [Multiple Testing Correction][6].
   - This setting is not available when you select the {{< ui >}}Bayesian{{< /ui >}} method.

#### Dimensional analysis properties

Under {{< ui >}}Properties to compute for dimensional analysis{{< /ui >}}, select the properties that experimenters use to filter and compare results. To add a property that is not in the list, type its name and click the option to add it as a custom property. For more information, see [Break Out Metrics by Property][7].

{{< img src="/product_analytics/experiment/protocols/exp_protocols_additional_settings.png" alt="The duration and additional setting defaults of a protocol, showing a minimum experiment duration of 12 days, and a statistical analysis plan with a Sequential confidence interval method, a 95% confidence level, CUPED calculation enabled, and multiple testing correction disabled." style="width:80%;" >}}

## Publish a protocol

Experimenters can select only published protocols. To publish a protocol:

1. Complete the required steps. The footer displays {{< ui >}}Required steps complete{{< /ui >}}.
1. Click {{< ui >}}Publish{{< /ui >}}.

Datadog checks that the metrics, subject type, environment, and other references in the protocol still exist. If a reference is missing, publishing fails and Datadog reports the problem.

After publishing, the protocol opens in a read-only view with an {{< ui >}}Overview{{< /ui >}} tab and an {{< ui >}}Experiments{{< /ui >}} tab. The {{< ui >}}Experiments{{< /ui >}} tab lists the experiments that use the protocol.

## Create an experiment from a protocol

To apply a protocol to a new experiment:

1. Navigate to [{{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Experiment List{{< /ui >}}][8] and click {{< ui >}}Create Experiment{{< /ui >}}.
1. Enter an {{< ui >}}Experiment name{{< /ui >}}.
1. Under {{< ui >}}Protocol{{< /ui >}}, select a protocol. The list holds published protocols only. Use the filter field to search by name, description, subject type, or primary metric.
   - To create an experiment without a protocol, select {{< ui >}}Start from scratch{{< /ui >}}.
1. Review the summary panel, which displays the defaults the protocol applies.
1. Click {{< ui >}}Create Draft Experiment{{< /ui >}}.

You can also start from the protocol itself. On a published protocol, open the {{< ui >}}Experiments{{< /ui >}} tab and click {{< ui >}}Create Experiment from Protocol{{< /ui >}}.

{{< img src="/product_analytics/experiment/protocols/exp_protocols_create_experiment.png" alt="The Create new draft experiment dialog opened from a protocol, showing an experiment name field and a locked protocol selection for Pricing and promotions test, alongside a summary panel listing the decision metric and additional metric defaults the protocol applies." style="width:90%;" >}}

### What the protocol applies

When you create an experiment from a protocol, Datadog applies these settings:

| Setting | Effect on the experiment |
| --- | --- |
| Subject type | Sets the randomization unit for the experiment. |
| Primary and secondary metrics | Attaches the decision metrics to the experiment. |
| Metric groups | Attaches the additional metric groups to the experiment. |
| Statistical analysis plan | Sets the confidence interval method, confidence level, CUPED, and multiple testing correction. |
| Duration | Sets the experiment's target duration from the protocol default and applies the minimum duration. Datadog converts a minimum duration set in weeks to days. |
| Randomization defaults | Pre-fills the environment, targeting rules, and traffic exposure on the experiment setup page. |
| Notifications | Copies the protocol's notification recipients and triggers to the experiment. |
| Dimensional analysis properties | Makes the selected properties available for breaking out results. |

Datadog records which protocol an experiment uses. To find these experiments, use the {{< ui >}}Protocol{{< /ui >}} filter on the experiment list.

Continue to [Plan and Launch Experiments][9] to add a feature flag and start the experiment.

## Edit a published protocol

To change a published protocol:

1. Open the protocol from the [{{< ui >}}Protocols{{< /ui >}}][1] page.
1. Click {{< ui >}}Edit{{< /ui >}}.
1. Update the settings.
1. Click {{< ui >}}Save Changes{{< /ui >}}, or click {{< ui >}}Cancel{{< /ui >}} to discard your edits.

Your changes apply to experiments created after you save. Existing experiments keep the protocol settings they were created with.

## Manage protocols

Open a protocol and use the actions menu. The available actions are {{< ui >}}Duplicate protocol{{< /ui >}}, {{< ui >}}Archive protocol{{< /ui >}}, and {{< ui >}}Delete protocol{{< /ui >}}. The same actions appear as {{< ui >}}Duplicate{{< /ui >}}, {{< ui >}}Archive{{< /ui >}}, and {{< ui >}}Delete{{< /ui >}} in the actions menu on each row of the [{{< ui >}}Protocols{{< /ui >}}][1] list, where {{< ui >}}Archive{{< /ui >}} appears for published protocols only.

### Duplicate a protocol

Duplicating copies the settings into a new draft and opens it. Datadog assigns a default name to the copy; rename it in [Step 1: Protocol details][12] if you want a different name. Duplicating is useful when you need a variation of an approved design.

### Archive a protocol

Archive a protocol to hide it from the protocol picker so that experimenters cannot select it for new experiments. Experiments that already use the protocol keep their settings and continue to run.

**Note**: Archiving cannot be undone.

### Delete a protocol

Delete a protocol to remove it permanently. Datadog prompts you to confirm before deletion. Deleting frees its name for reuse.

You cannot delete a protocol that experiments reference. Archive it instead.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments/protocols
[2]: /experiments/defining_metrics
[3]: /experiments/concepts/subject_types
[4]: /experiments/statistics/analysis_methods
[5]: /experiments/statistics/cuped
[6]: /experiments/statistics/multiple_testing_correction
[7]: /experiments/metric_property_breakouts
[8]: https://app.datadoghq.com/product-analytics/experiments
[9]: /experiments/plan_and_launch_experiments
[10]: #configure-the-protocol
[11]: /account_management/rbac/permissions/#product-analytics
[12]: #step-1-protocol-details
