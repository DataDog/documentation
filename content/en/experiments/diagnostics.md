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

For example, you might see:

- A **Failed diagnostic check** banner when results are unreliable.
- A **Traffic imbalance** diagnostic when traffic is split differently than expected.
- A **Missing metric data** diagnostic when Datadog has not received events for a metric.
- A warning icon on a metric when the metric or subject type configuration prevents calculation.

Start with any failed diagnostic check or warning banner before interpreting lift, confidence intervals, or global lift.

## Traffic imbalance

A traffic imbalance means the observed traffic split across variants is significantly different from the split configured for the experiment. This statistical issue is sometimes called a sample ratio mismatch or exposure imbalance. When this happens, Datadog marks the results as unreliable.

You may see one of the following messages:

- **Failed diagnostic check**
- **Traffic imbalance**
- "This experiment has a significant exposure imbalance between variants, which makes the results unreliable."

### Common causes

- Targeting rules above the experiment rule capture traffic before users reach the experiment.
- The experiment's traffic exposure or rollout percentages do not match the intended split.
- The application assigns the same subject inconsistently.
- For warehouse-native experiments, exposure data contains unexpected variant proportions.

### How to resolve

1. Review the experiment's randomization setup.
2. Confirm the feature flag environment, targeting rule order, filters, and traffic exposure.
3. For warehouse-native experiments, inspect the Exposure SQL Model and upstream exposure table.
4. Fix the source of the imbalance, then restart or rerun the experiment analysis.

## Missing assignments

If Datadog has no exposure data for an experiment, results cannot be computed. This can happen when a feature flag is not evaluating, traffic does not reach the experiment targeting rule, or a warehouse exposure model returns no rows in the analysis window for the specified experiment key and variant keys.

### How to resolve

- For experiments backed by Datadog Feature Flags, confirm that the flag is enabled in the correct environment and that the application is evaluating the flag for the expected subjects. Check the flag's real-time metric overview for exposure events.
- For warehouse-native experiments, verify that the Exposure SQL Model returns exposure rows for the experiment key, variant keys, subject key, and timestamp range.
- If the experiment was just launched, wait for the next analysis run or manually run an update.

## Missing flag evaluations

For experiments backed by Datadog Feature Flags, Datadog can report **Missing flag evaluations** when no flag evaluations were recorded in the analysis window. This check does not apply to warehouse-native experiments.

### How to resolve

- Confirm that the feature flag is enabled in the correct environment.
- Confirm that the application initializes the Feature Flags SDK and evaluates the flag for the expected subjects.
- Check the flag's real-time metric overview for evaluation and exposure activity.
- Verify that the flag key and experiment configuration match the flag your application evaluates.

## Mixed assignments

If the same subject is exposed to more than one variant in the same experiment, Datadog excludes that subject from analysis. A high number of mixed exposures can make results incomplete or unreliable.

### How to resolve

- For Feature Flags experiments, confirm that subjects can match only one experiment variant.
- Review targeting rules, rollout stages, and any application code that changes targeting keys.
- For warehouse-native experiments, check for duplicate or conflicting variant records in the exposure data.
- Fix the source of conflicting exposures, then rerun analysis.

## Dimensional assignment imbalance

Datadog can flag an experiment when the probability of seeing a variant differs significantly across segment values. For example, one country, plan, device, or customer tier might receive variants at a different split than the rest of the experiment. This can make CUPED results unreliable.

### How to resolve

- Review segment-level results for dimensions that are related to targeting or data collection.
- Avoid using segment properties that can change during the experiment if the treatment can affect those properties.
- Confirm that exposure data records the subject's segment consistently at the time of exposure.
- Fix targeting or exposure data issues, then rerun analysis.

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

## Metric configuration warnings

A metric warning icon can appear when Datadog cannot calculate a metric as configured.

Examples include:

- The metric, underlying measure, or property was deleted.
- The metric's subject type does not match the experiment's analysis subject.
- Metric configuration was not loaded or is not supported for a specific calculation, such as global lift.

### How to resolve

- Open the metric and confirm that its event, measure, filters, and subject type are still valid.
- Make sure the metric subject type matches the experiment's analysis subject.
- Replace deleted measures or properties, then rerun analysis.

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

If Datadog cannot complete experiment analysis, current results cannot be computed.

### How to resolve

- Review the details shown in the experiment.
- Fix configuration or data source issues, such as invalid SQL, missing warehouse permissions, or unavailable metric sources.
- Rerun experiment analysis.
- If the same failure persists, contact [Datadog support][1] with the experiment URL and details shown in the experiment.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
