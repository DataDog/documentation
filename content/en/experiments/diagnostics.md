---
title: Experiment Diagnostics
description: Understand diagnostic warnings in Datadog Experiments and learn how to resolve common data and randomization issues.
further_reading:
- link: "/experiments/reading_results/"
  tag: "Documentation"
  text: "Reading Experiment Results"
- link: "/experiments/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Experiments"
- link: "/experiments/concepts/exposure_sql/"
  tag: "Documentation"
  text: "Exposure SQL Models"
- link: "/feature_flags/"
  tag: "Documentation"
  text: "Feature Flags"
---

## Overview

Datadog runs diagnostic checks with experiment analysis to help you identify data quality, randomization, and configuration issues before you make a rollout decision. When a check finds an issue, Datadog surfaces it in the experiment results experience as a warning, metric message, or failed diagnostic check.

Start with any failed diagnostic check or warning banner before interpreting lift, confidence intervals, or global lift.

## Traffic imbalance

A traffic imbalance, also known as a sample ratio mismatch (SRM), means the observed assignments across variants differ significantly from the expected variant weights used for experiment analysis.

Treat SRM as a blocker for interpreting results. It indicates that the experiment's effective randomization, exposure logging, or analysis population is biased. Until you find and fix the root cause, lift, confidence intervals, and global lift cannot support valid causal inference.

### Common causes

For experiments backed by Datadog Feature Flags, common causes include:

- A flag rule, targeting condition, allocation change, or rollout change that sends users around the experiment rule during the experiment.
- An inconsistent targeting key, subject identifier, or SDK evaluation path that changes which variant a subject can receive.
- Variant behavior that changes whether exposure telemetry is generated or received, such as redirects, crashes, slower page loads, or conditional flag evaluation.
- Manual interference, such as pausing a variant, changing allocation mid-run, or forcing users into a variant outside the experiment flow.

For warehouse-native experiments, common causes include:

- The exposure fraction configured in Datadog does not match the assignment probabilities used by the upstream randomization system.
- The Exposure SQL Model filters, joins, or aggregates exposure rows in a way that drops subjects from one variant more often than another.
- The exposure table uses unstable subject IDs, unexpected variant keys, duplicate assignments, or conflicting variant records.
- The analysis population is filtered by a post-assignment condition, such as a trigger, bot filter, eligibility rule, or event that can be affected by the variant.

### How to resolve

1. Pause decision-making for the experiment until you identify the source of the SRM.
2. For Datadog Feature Flags, review the flag environment, targeting rule order, allocation history, variant weights, SDK targeting key, and exposure telemetry path.
3. For warehouse-native experiments, compare the Datadog exposure fraction with the upstream assignment probabilities, then inspect the Exposure SQL Model, exposure table, joins, filters, and timestamp windows.
4. Check whether the imbalance is localized to specific segments or time windows. A segment-specific or launch-time SRM can help narrow the root cause.
5. Fix the source of the imbalance, then restart or rerun the experiment analysis.

## Missing assignments

If Datadog has no assignment data for an experiment, results cannot be computed. This can happen when a feature flag is not evaluating, traffic does not reach the experiment targeting rule, or a warehouse Exposure SQL Model returns no rows in the analysis window for the specified experiment key and variant keys.

### How to resolve

- For experiments backed by Datadog Feature Flags, confirm that the flag is enabled in the correct environment and that the application is evaluating the flag for the expected subjects. Check the flag's real-time metric overview for exposure events.
- For warehouse-native experiments, verify that the Exposure SQL Model returns assignment rows for the experiment key, variant keys, subject key, and timestamp range.
- If the experiment was just launched, wait for the next analysis run or manually run an update.

## Mixed assignments

If the same subject is assigned to more than one variant in the same experiment, Datadog excludes that subject from analysis. A high number of mixed assignments can make results incomplete or unreliable.

### How to resolve

- For Feature Flags experiments, check whether the same subject has exposure records from different experiment configurations, such as an allocation or variant-key change, stale client state, or a different SDK evaluation path for the same flag.
- For warehouse-native experiments, make sure the experiment ID column in the [Exposure SQL Model](/experiments/concepts/exposure_sql/) identifies only the experiment exposure, such as a specific experiment or flag-allocation key, not the broader flag key.
- For warehouse-native experiments, check whether the Exposure SQL Model returns flag evaluations that are not experiment exposures. For example, if the model captures all evaluations for a flag, an exposure ramp can record a subject's pre-experiment control experience before they are eligible for the experiment, then later record a randomized treatment exposure after they become eligible. The pre-experiment flag evaluation is not part of the experiment and should not be captured as an exposure.
- For warehouse-native experiments, check for duplicate or conflicting variant records in the assignment data.
- Fix the source of conflicting assignments, then rerun analysis.

## Dimensional assignment imbalance

Datadog can flag an experiment when the probability of being assigned to a variant differs significantly across dimension values. For example, one device type, country, plan, or customer tier might receive variants at a different split than the rest of the experiment.

This diagnostic can also help diagnose overall traffic imbalance, or sample ratio mismatch (SRM). If the imbalance is concentrated in one dimension value, the root cause is often localized to that segment. For example, dimensional SRM for device type can point to a device-specific bug in variant delivery, SDK evaluation, redirects, page performance, crashes, or exposure telemetry.

Datadog uses the dimension value from the subject's first assignment record. Later changes to the subject's dimension value should not cause this diagnostic.

### How to resolve

- Review the affected dimension values and compare them with the overall traffic imbalance diagnostic.
- Investigate segment-specific differences in flag evaluation, variant delivery, application behavior, and exposure telemetry.
- For warehouse-native experiments, confirm that the Exposure SQL Model maps the intended assignment-time property columns and does not filter exposures differently by segment.
- Fix the source of the localized imbalance, then rerun analysis.

## Missing metric data

When Datadog has not received event data for a metric, the experiment results page can show **Missing metric data**. The metric cannot contribute to results until events are collected and joined to exposed subjects.

If the primary metric has no data, the diagnostic blocks the experiment decision. If a secondary or guardrail metric has no data, Datadog warns you without blocking analysis for the primary metric.

### Common causes

- The event used by the metric is not firing.
- The metric filters exclude the events you expected to count.
- Events are firing, but not for subjects exposed to the experiment.
- Events occur before the subject's first exposure, so they are excluded from experiment analysis.

### How to resolve

1. Open the metric and confirm that the event name, aggregation, filters, and data source are correct.
2. Check the metric event volume chart for recent data.
3. For Product Analytics or RUM metrics, inspect sessions for exposed users and confirm that metric events occur after feature flag evaluation.
4. Continue running the experiment until data is collected, or fix instrumentation and rerun analysis.

## Metric winsorized to zero

Outlier handling caps extreme metric values to reduce variance. If only a small number of subjects perform the metric event, outlier handling can winsorize all values to zero and prevent statistical analysis.

### How to resolve

1. Open the metric.
2. Review **Outlier handling** under the metric's experiment settings.
3. Disable outlier handling or adjust the bounds.
4. Rerun experiment analysis.

## Pre-experiment metric imbalance

When CUPED is enabled, Datadog uses pre-experiment metric values to reduce variance. If pre-experiment values differ meaningfully across variants, CUPED-adjusted results may be unreliable.

### How to resolve

- Confirm that pre-experiment data is available and representative for each variant.
- Check whether the metric definition changed during the pre-experiment window.
- If the imbalance is expected or cannot be fixed, interpret CUPED-adjusted results carefully or disable CUPED.

## Implausible prior

For Bayesian analysis, Datadog can warn when the observed lift is outside the range expected from the configured prior. This can happen when the prior is not appropriate for the experiment or when instrumentation produces unusually large or small values.

For example, many conversion rate experiments have true lifts below 5%, so the default prior, `N(0, 0.05)`, can be a reasonable choice. If an experiment fixes a broken checkout page that prevents most users from converting, a much larger lift may be plausible. In that case, the default prior can be too conservative and shrink the estimated effect too much.

### How to resolve

- Review the experiment's statistical analysis plan and prior setting.
- Confirm that the metric aggregation, filters, and event values match the intended unit.
- Check for instrumentation changes, duplicate events, or unusually large values during the analysis window.
- If the prior is not appropriate for the experiment, update the analysis plan and rerun analysis.

## Segment-level degradation

Datadog can flag results when a specific segment performs significantly worse than the overall experiment direction. This helps you catch cases where the average result hides a degraded experience for a subgroup.

### How to resolve

- Review segment-level charts for affected dimensions such as country, plan, device, or customer tier.
- Check whether the affected segment maps to a real product or instrumentation issue.
- Consider diverting affected segment traffic away from the experiment while you investigate high-impact segments.

## Analysis pipeline failure

If a customer warehouse query fails during experiment analysis, current results cannot be computed.

### How to resolve

- Review the details shown in the experiment.
- Fix configuration or data source issues, such as invalid SQL, missing warehouse permissions, or unavailable warehouse tables.
- Rerun experiment analysis.
- If the same failure persists, contact [Datadog support][1] with the experiment URL and details shown in the experiment.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
