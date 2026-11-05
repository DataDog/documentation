---
title: Experiment Holdouts
description: Measure the combined effect of released changes with holdouts.
---

## Overview

Holdouts set aside a share of eligible subjects to measure the effect of released changes.

Conceptually, a holdout is a controlled experiment. The treatment is a combination of shipped changes from covered experiments. The control keeps the original experiences. This comparison naturally captures interaction effects and avoids exaggeration bias due to the [winner's curse][8].

Subjects are assigned at random to two groups:

- **Control group** (`status_quo`): Keeps each experiment's control experience, the version used for comparison.
- **Shipped-changes group** (`all_shipped`): Receives each experiment's selected change after its rollout completes.

Both groups stay on control while covered experiments run, so rejected variants cannot distort the comparison. The result measures the combined impact of changes that remain in the product and continue to affect existing and future users.

The following sections describe holdouts with Datadog Feature Flags.

## Holdout types

| Type | Experiments included |
| --- | --- |
| Global | Automatically includes eligible experiments with the same subject type. They must start during the inclusion period and after the holdout is created. |
| Selective | Includes experiments that you choose and add before they start. |

Global holdouts with the same subject type use separate time periods, from inclusion start to analysis end. An experiment can belong to only one active selective holdout.

Global and selective holdouts can run at the same time. For example, a global holdout can measure all eligible changes, while a selective holdout measures changes for a product initiative or checkout.

Each holdout has its own randomized comparison.

An experiment can be covered by both a global and a selective holdout. When both cover an experiment, Datadog applies the global holdout first. For that experiment, the selective holdout uses eligible traffic outside the global holdout. Each result measures the combined effect of the changes covered by that holdout.

## Holdout phases

The shipped-changes group receives changes as they roll out. During this time, the holdout treatment is still changing. It is complete only after all changes covered by the holdout have been released.

Measuring the entire period as one result would mix time spent with some changes and time spent with the full combination. Holdouts separate these periods so you can monitor early results, then measure the complete treatment.

For example, a team includes 10 experiments in a holdout from July through September. Five experiments produce changes that ship. The first ships on July 15, and the last ships on September 30.

The team sets an analysis phase from October 1 through October 15 to measure the combined effect of all five changes. Preliminary results let the team monitor performance during inclusion without waiting until October.

### Experiment inclusion phase

The **inclusion period** sets the dates when experiments can join the holdout.

During the experiment inclusion phase, covered experiments run, winners are selected, and changes are rolled out. Covered experiments must complete their rollouts by the end of this phase to remain included in the holdout analysis.

The inclusion dates also determine which experiments can join a global holdout. Eligible experiments must start during this period and after the holdout is created.

A preliminary analysis runs during the inclusion phase. It gives an early directional read of performance and helps identify data problems before the primary analysis starts. Its results include data from a period when the holdout treatment is still changing and not all changes have shipped. They do not measure the full combined treatment.

### Analysis phase

The analysis phase starts when or after the inclusion phase ends. Subjects remain in their holdout groups during any interval between the two phases. During the analysis phase, the shipped-changes group should have received all shipped changes. The control group continues to receive the original experiences. Each subject still sees only the components they use and whose targeting rules they meet.

The primary analysis uses metric data from the analysis phase to measure the combined effect of the shipped changes.

## Subject assignment

The **traffic allocation** is the total share of subjects set aside for both groups. Datadog divides this share equally.

For example, a 10% holdout assigns about 5% of eligible subjects to each group. The remaining 90% follows the experiment's normal rules. Holdout subjects are excluded from the individual experiment's comparison.

A subject keeps the same group across included experiments. Each experiment's targeting and traffic rules still apply.

Selecting a winner alone does not change the experience. The rollout must complete first. If control wins, both groups keep control.

## Requirements for Datadog Feature Flags

For holdouts that use Datadog Feature Flags, included experiments must:

- Use Datadog Feature Flags to assign subjects at random.
- Use the same subject type as the holdout.
- Use a consistent subject ID across covered experiments. See [Subject Types][1].
- Be standard experiments.

Add selective experiments while they are drafts. The holdout must be waiting to start or within its inclusion period.

## Set up a holdout

Create the holdout before starting the experiments:

1. Navigate to {{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Holdouts{{< /ui >}} in Product Analytics and click {{< ui >}}Create Holdout{{< /ui >}}.
1. Enter a name and select {{< ui >}}Global{{< /ui >}} or {{< ui >}}Selective{{< /ui >}}. If {{< ui >}}Managed by{{< /ui >}} is shown, select {{< ui >}}Datadog (Managed){{< /ui >}}.
1. Set the start and end dates for the {{< ui >}}Experiment inclusion phase{{< /ui >}}. Allow time for the covered experiments to run and complete their rollouts within this period.
1. Review the start and end dates for {{< ui >}}Analysis phase{{< /ui >}} and adjust them as needed. Analysis starts at or after inclusion ends.
1. Set {{< ui >}}Holdout traffic exposure{{< /ui >}}. This share includes both holdout groups.
1. Select the {{< ui >}}Subject type{{< /ui >}} used by the experiments, a {{< ui >}}Primary metric{{< /ui >}}, and optional {{< ui >}}Secondary metrics{{< /ui >}}. Review the [analysis method][2] under {{< ui >}}Analysis settings{{< /ui >}}.
1. Click {{< ui >}}Create Holdout{{< /ui >}}, review the settings, and click {{< ui >}}Confirm and Create Holdout{{< /ui >}}.
1. For each draft experiment covered by a selective holdout, choose {{< ui >}}Add Selective Holdout{{< /ui >}} during [experiment setup][4] and select the holdout. Global holdouts add eligible experiments automatically when they start.

### Run the experiments

1. Check whether the experiment belongs to a holdout before [starting it][4]. Start experiments for a global holdout during its inclusion period.
1. Review each experiment's results and select a winner.
1. Complete the winner's rollout.
1. Keep the flags and exposure logging active through the analysis end. The control group must keep receiving the original experiences.

Selective coverage can be changed before inclusion ends and before the experiment's decision is recorded. The holdout continues serving both groups through the analysis period.

## Exposure criteria

An **exposure record** identifies the experience served to a subject.

For the primary analysis, an exposure qualifies when treatment and control can first give a subject different experiences. Counting subjects before that point includes people whose outcomes the change could not yet affect. This can dilute the measured effect and make a difference harder to detect.

For a holdout, exposure occurs when a subject first interacts with a component where a covered experiment has shipped a non-control variant. Datadog records this exposure for both groups. The shipped-changes group receives the change, while the control group receives control.

For example, a subject can open checkout while a covered checkout experiment is still running. Both holdout groups receive the old checkout, so that exposure does not qualify for the primary analysis. After the new checkout rolls out, the subject's next checkout exposure qualifies. The holdout groups can receive different experiences.

### Preliminary and primary exposure records

Datadog still logs holdout exposures for running experiments. These records help confirm that data is flowing and support early checks for assignment or logging problems.

The exposure property `holdout.should_include_in_holdout_analysis` distinguishes these records:

- **`false`**: The covered experiment has not shipped a non-control variant. Both groups receive control.
- **`true`**: A non-control variant has shipped. The groups can receive different experiences. This value applies to both groups, including subjects who remain on control.

The preliminary analysis uses all holdout exposures during inclusion, including those marked `false`.

The primary analysis uses only exposures with `should_include_in_holdout_analysis = true`. It selects each subject's first qualifying exposure and excludes earlier records where both groups received control. This focuses the comparison on subjects whose experiences could differ and improves the ability to detect an effect.

The exposure and metric periods are different. A qualifying exposure can occur during inclusion or analysis. The primary analysis measures **metric data only from the analysis phase**. A subject first exposed to a shipped change in September can therefore contribute metric data to an October analysis.

### Variance reduction

The primary analysis uses [CUPED][7] when it is enabled in the analysis settings. The preliminary analysis does not use CUPED.

## Interpret results

Use the primary analysis to assess the combined changes during the analysis phase. See [Holdout phases](#holdout-phases) for the distinction between preliminary and primary results.

The scorecard compares the shipped-changes group with the control group. Interpret it as you would an experiment result. See [Reading Experiment Results][5] for lift and confidence intervals, and [Experiment Diagnostics][6] for data checks.

Primary results become available after the analysis phase starts and an analysis run processes metric data from that phase.

## Analyze holdouts with your own exposure data

Use an [Exposure SQL Model][3] to analyze holdouts when you manage experiment randomization outside Datadog Feature Flags. This also applies when you use Datadog Feature Flags with your own warehouse logging. The holdout phases and interpretation of results are the same. The model supplies the exposure records for analysis.

Configure the [warehouse exposure model](#warehouse-exposure-model), then create the holdout:

1. Navigate to {{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Holdouts{{< /ui >}} and click {{< ui >}}Create Holdout{{< /ui >}}.
1. Enter a name and select how the holdout is managed:
   - For external randomization, select {{< ui >}}Your flagging system (External){{< /ui >}} under {{< ui >}}Managed by{{< /ui >}}. Enter the {{< ui >}}Holdout key{{< /ui >}} used in your exposure records.
   - For Datadog Feature Flags with warehouse logging, select {{< ui >}}Datadog (Managed){{< /ui >}}, then {{< ui >}}Your exposure SQL model{{< /ui >}} under {{< ui >}}Exposure source{{< /ui >}}. Select {{< ui >}}Global{{< /ui >}} or {{< ui >}}Selective{{< /ui >}}.
1. Set the inclusion and analysis dates. For external randomization, enter the {{< ui >}}Share of subjects in the holdout{{< /ui >}} and {{< ui >}}Control group share{{< /ui >}} used by your system. For Datadog Feature Flags, set {{< ui >}}Holdout traffic exposure{{< /ui >}}.
1. Select {{< ui >}}Subject type{{< /ui >}}, then {{< ui >}}Exposure SQL model{{< /ui >}} and the metrics to analyze. Review {{< ui >}}Analysis settings{{< /ui >}}.
1. Click {{< ui >}}Create Holdout{{< /ui >}}, review the settings, and click {{< ui >}}Confirm and Create Holdout{{< /ui >}}.

With external randomization, your system assigns subjects to groups and serves their experiences. With Datadog Feature Flags, record the holdout fields with each exposure. See [Record Feature Flag Exposures in Your Own Data Store][9]. Then follow the selective attachment steps in [Set up a holdout](#set-up-a-holdout).

### Warehouse exposure model

The model must return records for both holdout groups, following the rules in the [Exposure criteria](#exposure-criteria) section. Add the holdout fields to your [Exposure SQL Model][3]. For example:

```sql
SELECT
    user_id,
    exposed_at,
    experiment_id,
    variant_id,
    holdout_key,
    holdout_assignment_group,
    should_include_in_holdout_analysis,
    allocation_key
FROM analytics.holdout_exposures
```

Keep the standard exposure mappings and add the following holdout mappings.

| Field | Example column | Value |
| --- | --- | --- |
| Holdout key column | `holdout_key` | The holdout key recorded in the exposure events. |
| Holdout assignment group column | `holdout_assignment_group` | `status_quo` or `all_shipped`. Convert your system's group names to these values in the query if needed. |
| Include in holdout analysis column | `should_include_in_holdout_analysis` | Optional for external randomization. Required when using Datadog Feature Flags with your own warehouse logging. A Boolean value: `true` after a covered experiment ships a non-control variant; `false` before that point. Apply the same rule to both groups. |
| Allocation key column | `allocation_key` | The allocation key from the exposure event. Only required for selective holdouts using Datadog Feature Flags with your own warehouse logging. |

Datadog uses the holdout key and assignment group to identify the exposure records for each holdout group.

For external randomization, map the inclusion field when the model contains exposures from before and after changes ship. The preliminary analysis uses both values. The primary analysis uses records marked `true`. A model that contains [qualifying exposures](#exposure-criteria) only can omit this mapping.

[1]: /experiments/concepts/subject_types/
[2]: /experiments/statistics/analysis_methods/
[3]: /experiments/concepts/exposure_sql/
[4]: /experiments/plan_and_launch_experiments/
[5]: /experiments/reading_results/
[6]: /experiments/diagnostics/
[7]: /experiments/statistics/cuped/
[8]: /experiments/concepts/cumulative_impact/#why-naive-aggregation-overstates-impact
[9]: /feature_flags/guide/record_exposures_in_your_own_data_store/
