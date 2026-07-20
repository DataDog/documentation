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

- The expected variant weights configured in Datadog do not match the assignment probabilities used by the upstream randomization system.
- The Exposure SQL Model filters, joins, or aggregates exposure rows in a way that drops subjects from one variant more often than another.
- The exposure table uses unstable subject IDs, unexpected variant keys, duplicate assignments, or conflicting variant records.
- The analysis population is filtered by a post-assignment condition, such as a trigger, bot filter, eligibility rule, or event that can be affected by the variant.

### How to resolve

1. Pause decision-making for the experiment until you identify the source of the SRM.
2. For Datadog Feature Flags, review the flag environment, targeting rule order, allocation history, variant weights, SDK targeting key, and exposure telemetry path.
3. For warehouse-native experiments, compare the expected variant weights in Datadog with the upstream assignment probabilities, then inspect the Exposure SQL Model, exposure table, joins, filters, and timestamp windows.
4. Check whether the imbalance is localized to specific segments or time windows. A segment-specific or launch-time SRM can help narrow the root cause.
5. Fix the source of the imbalance, then restart or rerun the experiment analysis.

## Missing assignments

If Datadog has no assignment data for an experiment, results cannot be computed. This can happen when a feature flag is not evaluating, traffic does not reach the experiment targeting rule, or a warehouse Exposure SQL Model returns no rows in the analysis window for the specified experiment key and variant keys.

For experiments that use Datadog Feature Flags with warehouse metrics, Datadog can also warn when the Datadog assignment source has assignments but the warehouse-native assignment source has none. In this case, warehouse metric results are not available until the exposure export job has run.

### How to resolve

- For experiments backed by Datadog Feature Flags, confirm that the flag is enabled in the correct environment and that the application is evaluating the flag for the expected subjects. Check the flag's real-time metric overview for exposure events.
- For warehouse-native experiments, verify that the Exposure SQL Model returns assignment rows for the experiment key, variant keys, subject key, and timestamp range.
- If the experiment was just launched, wait for the next analysis run or manually run an update.

## Mixed assignments

If the same subject is assigned to more than one variant in the same experiment, Datadog excludes that subject from analysis. The diagnostic passes when no more than 5% of subjects have mixed assignments, warns above 5%, and fails at 20% or more. As the excluded share grows, results become less representative and less reliable.

### How to resolve

- For Feature Flags experiments, check whether the same subject has exposure records from different experiment configurations, such as an allocation or variant-key change, stale client state, or a different SDK evaluation path for the same flag.
- For warehouse-native experiments, make sure the experiment key column in the [Exposure SQL Model](/experiments/concepts/exposure_sql/) identifies only the experiment exposure, such as a specific experiment or flag-allocation key, not the broader flag key.
- If the warehouse-native [Exposure SQL Model](/experiments/concepts/exposure_sql/) intentionally reads flag-evaluation logs, filter out evaluations that are not experiment exposures. For example, if the model captures all evaluations for a flag, an exposure ramp can record a subject's pre-experiment control experience before they are eligible for the experiment, then later record a randomized treatment exposure after they become eligible. The pre-experiment flag evaluation is not part of the experiment and should not be captured as an exposure.
- For warehouse-native experiments, check for duplicate or conflicting variant records in the assignment data.
- Fix the source of conflicting assignments, then rerun analysis.

## Dimensional assignment imbalance

Datadog can flag an experiment when the probability of being assigned to a variant differs significantly across dimension values. For example, one device type, country, plan, or customer tier might receive variants at a different split than the rest of the experiment.

This diagnostic is separate from overall traffic imbalance, or sample ratio mismatch (SRM): global imbalance alone does not trigger it. When both diagnostics fail, the affected dimension values can help localize the cause of the overall SRM. For example, dimensional imbalance for device type can point to a device-specific bug in variant delivery, SDK evaluation, redirects, page performance, crashes, or exposure telemetry.

Datadog uses the dimension value from the subject's first assignment record. Later changes to the subject's dimension value should not cause this diagnostic.

### How to resolve

- Review the affected dimension values and compare them with the overall traffic imbalance diagnostic.
- Investigate segment-specific differences in flag evaluation, variant delivery, application behavior, and exposure telemetry.
- For warehouse-native experiments, confirm that the Exposure SQL Model maps the intended assignment-time property columns and does not filter exposures differently by segment.
- Fix the source of the localized imbalance, then rerun analysis.

## Missing metric data

Datadog reports **Missing metric data** when assignments exist but experiment analysis finds no usable metric values for any assigned subjects. This does not necessarily mean that the source event never fired. Events can exist but fail the metric's filters, fail to join to experiment assignments, or produce only zero or null metric values.

If the primary metric has no data, the diagnostic blocks the experiment decision. If a secondary or guardrail metric has no data, Datadog warns you without blocking analysis for the primary metric.

### Common causes

- The metric definition's event name, aggregation, filters, or data source does not match the data being emitted.
- The source event is not firing, or it fires only before the subject's first assignment and is therefore excluded from post-assignment attribution.
- The metric events and experiment assignments identify the same subject differently. This subject identifier mismatch is a common cause of missing metric data:
  - For Product Analytics or RUM metrics in experiments backed by Datadog Feature Flags, the configured [subject type attribute](/experiments/concepts/subject_types/#product-analytics-and-rum-metrics) must match the SDK `targetingKey`.
  - For warehouse metrics, the subject column mapped in the [Metric SQL Model](/experiments/concepts/subject_types/#warehouse-metrics) must contain the same values as the assignment subject column. For experiments backed by Datadog Feature Flags, those values must match the SDK `targetingKey`. For warehouse-native experiments, they must match the assignment subject column configured in the [Exposure SQL Model](/experiments/concepts/exposure_sql/).
- A warehouse Metric SQL Model returns no matching rows in the analysis window or filters out the expected events.

### How to resolve

1. Open the metric and confirm that the event name, aggregation, filters, and data source are correct. Check the metric event volume chart for recent matching data.
2. Compare an assigned subject's identifier with the identifier on its metric events. Confirm that the configured subject type attribute or mapped warehouse column contains the same value as the SDK `targetingKey` or the assignment subject column configured in the Exposure SQL Model.
3. Confirm that metric events occur after the subject's first assignment and within the experiment analysis window.
4. For a **Missing metric data** failure on the primary metric, click [{{< ui >}}Ask Bits{{< /ui >}}](/bits_ai/bits_chat/#web-application) to investigate the experiment and metric definition. If [Source Code Integration](/source_code/) is configured, Bits can also inspect the source locations where the feature flag is evaluated and help you check nearby metric instrumentation. An empty code search is inconclusive and does not prove that the SDK or flag is missing from the application.
5. For warehouse metrics, run the Metric SQL Model or query its source table directly. Bits can review the configured SQL but cannot verify that the warehouse currently contains matching rows.
6. Fix the metric definition, identity mapping, event timing, or instrumentation issue, then rerun experiment analysis.

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

For example, many conversion rate experiments have true lifts below 5%, so the default Normal prior with mean 0 and standard deviation 0.05 can be a reasonable choice. If an experiment fixes a broken checkout page that prevents most users from converting, a much larger lift may be plausible. In that case, the default prior can be too conservative and shrink the estimated effect too much.

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

If the experiment analysis pipeline fails, current results cannot be computed. For warehouse-backed analysis, the customer-controlled parts of the pipeline SQL are the assignment and metric SQL definitions; Datadog generates the rest of the pipeline SQL.

### How to resolve

1. Click [{{< ui >}}Ask Bits{{< /ui >}}](/bits_ai/bits_chat/#web-application) on the failed diagnostic. Bits reviews the pipeline error, failed warehouse queries, and the experiment's assignment and metric SQL definitions. It identifies which definition, if any, is most likely responsible and suggests a specific fix. If the definitions do not appear responsible, Bits describes other possible causes.
2. Review the failed query and apply the recommended fix. Depending on the error, you might need to correct an SQL definition, restore warehouse permissions, or make an unavailable source table accessible.
3. Rerun experiment analysis.
4. If the same failure persists, contact [Datadog support][1] with the experiment URL and failure details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
