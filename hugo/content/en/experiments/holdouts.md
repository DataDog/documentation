---
title: Experiment Holdouts
description: Measure the combined effect of released changes with holdouts.
---

## Overview

A holdout measures the combined effect of shipped changes from covered experiments.

Conceptually, a holdout is a controlled experiment. The treatment is a combination of shipped changes from covered experiments. The control keeps the original experiences.

Holdouts measure the effect of combined changes in a way that naturally captures interaction effects and avoids exaggeration bias due to the [winner's curse][8].

A holdout sets aside a share of eligible subjects.

These subjects are assigned at random to two groups:

- **Status quo** (`status_quo`): Keeps each experiment's control experience, the version used for comparison.
- **All shipped** (`all_shipped`): Receives each experiment's selected change after its rollout completes.

Holdouts measure the value of the product you ship. Both groups stay on control while covered experiments run, so rejected variants cannot distort the comparison. The result measures the combined impact of changes that remain in the product and continue to affect existing and future users.

The following sections describe holdouts with Datadog Feature Flags. Use a consistent subject ID across covered experiments. See [Subject Types][1].

## Holdout phases

The `all shipped` group, or `winners-only` group, receives changes as they roll out. During this time, the holdout treatment is still changing. It is complete only after all changes covered by the holdout have been released.

Measuring the entire period as one result would mix time spent with some changes and time spent with the full combination. Holdouts separate these periods so you can monitor early results, then measure the complete treatment.

A team includes 10 experiments in a holdout from July through September. Five experiments produce changes that ship. The first ships on July 15, and the last ships on September 30.

The goal is to measure the combined effect of all five changes. The holdout treatment is still changing during the inclusion phase and is complete only when the last change ships. The team sets an analysis phase from October 1 through October 15 to measure the full combination.

During inclusion, preliminary results give the team an early directional read without waiting until October. These results include time when only some changes had shipped, so they do not measure the full combination.

### Experiment inclusion phase

During the experiment inclusion phase, covered experiments run, winners are selected, and changes are rolled out. Covered experiments must conclude during this phase to be included in the holdout analysis. Rollouts should complete before the analysis phase starts. Both holdout groups receive an experiment's control experience while it runs. After a non-control variant rolls out, the `all shipped` group receives that change.

The inclusion dates also determine which experiments can join a global holdout. Eligible experiments must start during this period and after the holdout is created. These rules do not require every rollout to finish by the inclusion end date. The interval before analysis starts allows time for the remaining rollouts to complete.

A preliminary analysis runs during inclusion. It gives an early directional read of performance and helps identify data problems before the primary analysis starts. Its results include data from a period when the holdout treatment is still changing and not all changes have shipped. They do not measure the full combined treatment.

### Analysis phase

The analysis phase starts at or after inclusion ends. During this phase, the All shipped group should be able to receive all shipped changes. The Status quo group continues to receive the original experiences. Each subject still sees only the components they use and for which they meet the targeting rules.

The primary analysis measures metric data from this period. It answers the main question: what is the impact of the shipped changes together? If a rollout is still in progress when analysis starts, the treatment is not yet complete. The result then includes time when only some changes were available.

## Subject assignment

The **traffic allocation** is the total share of subjects set aside for both groups. Datadog divides this share equally.

For example, a 10% holdout assigns about 5% of eligible subjects to each group. The remaining 90% follows the experiment's normal rules. Holdout subjects are excluded from the individual experiment's comparison.

A subject keeps the same group across included experiments. Each experiment's targeting and traffic rules still apply.

Both groups receive control until the experiment's rollout completes. Selecting a winner alone does not change the experience. After a change's rollout completes, only the All shipped group receives it. If control wins, both groups keep control.

## Holdout types

The **inclusion period** sets the dates when experiments can join the holdout.

| Type | Experiments included |
| --- | --- |
| Global | Automatically includes eligible experiments with the same subject type. They must start during the inclusion period and after the holdout is created. |
| Selective | Includes experiments that you choose and add before they start. |

Global holdouts do not include experiments already running when the holdout is created. Global holdouts with the same subject type cannot overlap from the inclusion start date to the analysis end date. An experiment can belong to only one active selective holdout.

### Global and selective measurement

Global and selective holdouts can measure different sets of changes at the same time:

- A global holdout measures the combined effect of shipped changes from all eligible experiments with the same subject type.
- A selective holdout measures a chosen set of changes, such as a product initiative, updates to checkout, or a team's work.

Each holdout has its own randomized comparison. This measures the impact of each set of changes directly. The selective result is not inferred from the global result or the sum of individual experiment results.

An experiment can be covered by both a global and a selective holdout. When both cover an experiment, Datadog applies the global holdout first. For that experiment, the selective holdout uses eligible traffic outside the global holdout. The results describe different sets of changes and should not be added together.

## Set up a holdout

Create the holdout before starting the experiments:

1. Enter a name and select **Global** or **Selective**.
1. Select the subject type used by the experiments.
1. Set the traffic allocation. Include both groups when calculating how much traffic remains for individual experiments.
1. Set the **experiment inclusion start** and **end** dates. A global holdout includes eligible experiments that start during this period. Add selective experiments before they start and before inclusion ends.
1. Set the **analysis start** and **end** dates. Analysis must start at or after inclusion ends. Its end date must be after its start date. Allow time for experiments and rollouts to finish before analysis starts.
1. Select a primary metric, optional secondary metrics, and an [analysis method][2].
1. For a selective holdout, add the draft experiments. Global holdouts add eligible experiments automatically when they start.

### Eligible experiments

Included experiments must:

- Use Datadog Feature Flags to assign subjects at random.
- Use the same subject type as the holdout.
- Be standard experiments, not other holdout analyses.

Add selective experiments while they are drafts. The holdout must be waiting to start or within its inclusion period.

An **exposure record** identifies the experience served to a subject. If the holdout uses Datadog-hosted exposure data, included experiments must not ignore that data.

### Run the experiments

1. Check whether the experiment belongs to a holdout before [starting it][4]. Start experiments for a global holdout during its inclusion period.
1. Review each experiment's results and select a winner.
1. Complete the winner's rollout.
1. Keep the flags and exposure logging active through the analysis end. The status quo group must keep receiving control.

After inclusion ends, you cannot change the included experiments. The holdout continues serving both groups through the analysis period. You also cannot remove a selective experiment after recording its decision.

## Exposure criteria

As a general principle, count exposure when treatment and control can first give a subject different experiences. Counting subjects before that point includes people whose outcomes the change could not yet affect. This can dilute the measured effect and make a difference harder to detect.

For a holdout, this point is the subject's first interaction with a component tied to a concluded experiment that shipped a non-control variant. Record this exposure for both groups. The All shipped group receives the change, while the Status quo group receives control. A subject does not need to encounter every covered change to enter the analysis.

For example, a subject can open checkout while a covered checkout experiment is still running. Both holdout groups receive the old checkout, so that exposure does not qualify for the primary analysis. After the new checkout rolls out, the subject's next checkout exposure qualifies. The holdout groups can receive different experiences.

### Preliminary and primary exposure records

Datadog still logs holdout exposures for running experiments. These records help confirm that data is flowing and support early checks for assignment or logging problems.

The exposure property `holdout.should_include_in_holdout_analysis` distinguishes these records:

- **`false`**: The covered experiment has not shipped a non-control variant. Both groups receive control.
- **`true`**: A non-control variant has shipped. The groups can receive different experiences. This value applies to both groups, including subjects who remain on control.

The preliminary analysis uses all holdout exposures during inclusion, including those marked `false`. It provides an early directional read while changes are still being released.

The primary analysis uses only exposures with `should_include_in_holdout_analysis = true`. It selects each subject's first qualifying exposure and excludes earlier records where both groups received control. This focuses the comparison on subjects whose experiences could differ and improves the ability to detect an effect.

The exposure and metric periods are different. A qualifying exposure can occur during inclusion or analysis. The primary analysis measures **metric data only from the analysis phase**. A subject first exposed to a shipped change in September can therefore contribute metric data to an October analysis.

An experiment that ships control does not create a qualifying exposure. Subjects who encounter only such experiments do not enter the primary analysis through them.

### Variance reduction

The primary analysis uses [CUPED][7] when it is enabled in the analysis settings. The preliminary analysis does not use CUPED. Its purpose is to monitor early results while the treatment is changing, and its timeseries results do not use the CUPED calculation. Skipping it avoids unnecessary computation.

Using the first qualifying exposure also gives CUPED the correct point from which to look back. Data collected after a subject could receive a shipped change must not be treated as data from before exposure.

## Interpret results

Use the primary analysis to assess the combined changes during the analysis phase. Preliminary results provide an early directional read and help identify problems during inclusion. They include time before the full treatment is available, so they should not be interpreted as the impact of the complete set of shipped changes.

The scorecard compares All shipped with Status quo. Interpret it as you would an experiment result. See [Reading Experiment Results][5] for lift and confidence intervals, and [Experiment Diagnostics][6] for data checks.

If primary results are empty, check that:

- A treatment rollout has completed.
- Subjects have exposure records after that rollout.
- Metric data exists within the analysis period.

## Analysis-only holdouts

Use an [Exposure SQL Model][3] to analyze holdouts when you manage experiment randomization outside Datadog Feature Flags. This also applies when you use Datadog Feature Flags with your own warehouse logging. The holdout phases and interpretation of results are the same. The model supplies the exposure records for analysis.

When creating the holdout, select the model and its subject type. The holdout key must match the key in the exposure records. With external randomization, your system handles group assignment and serves the experiences described above. With Datadog Feature Flags, preserve the holdout fields from the exposure events.

### Warehouse exposure model

The model must return records for both holdout groups, using the [exposure criteria][9] above. Add the holdout fields to your [Exposure SQL Model][3]. For example:

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

Keep the standard exposure mappings and add the holdout mappings below. Omit `allocation_key` from the query unless the holdout uses selective coverage with Datadog Feature Flags.

| Field | Example column | Value |
| --- | --- | --- |
| Holdout key | `holdout_key` | The holdout key recorded in the exposure events. |
| Holdout assignment group | `holdout_assignment_group` | `status_quo` or `all_shipped`. Convert your system's group names to these values in the query if needed. |
| Include in holdout analysis | `should_include_in_holdout_analysis` | Optional for external randomization. Required when using Datadog Feature Flags with your own warehouse logging. A Boolean value: `true` after a covered experiment ships a non-control variant; `false` before that point. Apply the same rule to both groups. |
| Allocation key | `allocation_key` | The allocation key from the exposure event. Only required for selective holdouts using Datadog Feature Flags with your own warehouse logging. |

Datadog uses the holdout key and assignment group to select holdout records. The experiment ID and variant ID do not determine holdout membership. Return only exposures for experiences covered by this holdout. For external randomization, adding experiments in Datadog does not filter these rows. Do not use experiment or allocation key template variables in this model: a holdout analysis does not supply those values.

With external randomization, the inclusion field is optional. Include it when logging exposures before changes ship. The preliminary analysis uses all holdout exposure records within the inclusion period. The primary analysis uses only records marked `true`. Without this mapping, Datadog does not apply that filter. In that case, the model must return only qualifying exposures, as described in [Exposure criteria][9].

[1]: /experiments/concepts/subject_types/
[2]: /experiments/statistics/analysis_methods/
[3]: /experiments/concepts/exposure_sql/
[4]: /experiments/plan_and_launch_experiments/
[5]: /experiments/reading_results/
[6]: /experiments/diagnostics/
[7]: /experiments/statistics/cuped/
[8]: /experiments/concepts/cumulative_impact/#why-naive-aggregation-overstates-impact
[9]: #exposure-criteria
