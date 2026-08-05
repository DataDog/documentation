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

Datadog runs diagnostic checks with experiment analysis to help you identify data quality, randomization, and configuration issues before you make a rollout decision. When a check finds an issue, Datadog displays it on the experiment results page as a warning, metric message, or failed diagnostic check.

Start with any failed diagnostic check or warning banner before interpreting lift, confidence intervals, or global lift.

## Traffic imbalance

A traffic imbalance, also known as a sample ratio mismatch (SRM), means the observed assignments across variants differ significantly from the configured assignment weights.

Datadog detects SRM with Pearson's chi-squared goodness-of-fit test. The test compares observed variant counts with counts expected from the configured weights. The diagnostic fails when the p-value is below `0.001`, corresponding to a significance level (alpha) of `0.001`. Datadog does not apply a minimum total sample size or expected-count requirement to this overall check.

We run the test at the more conservative α = 0.001 level because this test is not sequentially valid; the more conservative significance level helps us avoid false positives.

Treat SRM as a blocker for interpreting results. It indicates that the experiment's effective randomization, exposure logging, or analysis population is biased. Until you find and fix the root cause, lift, confidence intervals, and global lift cannot support valid causal inference.

### Common causes

For experiments backed by Datadog Feature Flags, common causes include:

- The traffic split (the relative percentages assigned to variants) changed after launch, for example from `90/10` to `50/50`, while assignments made under the earlier split remain in the analysis window.
- Exposure events are lost at different rates by variant after assignment. For example, a variant-specific redirect or crash can prevent buffered exposure events from reaching Datadog.

Keep the traffic split between variants constant for the duration of the experiment. To ramp an equally split experiment, increase [traffic exposure][1] proportionally for both variants. For example, increase traffic exposure from a `10/10` split to a `50/50` split. This increases both variant percentages proportionally while preserving their relative split.

Changing targeting rules, the targeting key, or traffic exposure does not by itself cause SRM. Such a change causes SRM only if it alters the included assignment population differently by variant. Otherwise, it changes traffic volume or can cause a different diagnostic. For example, an inconsistent SDK `targetingKey` can cause **Missing metric data** when assignments and metric events no longer join to the same subject. It causes **Mixed assignments** only if the same recorded subject receives more than one variant.

For warehouse-native experiments, common causes include:

- The expected exposure fraction for each variant configured in Datadog does not match the assignment probability used by the upstream randomization system.
- The [Exposure SQL Model][2] filters, joins, aggregates, or applies timestamp constraints in a way that drops assignment subjects from one variant more often than another.
- Upstream assignment logging loses or misrecords assignments at different rates by variant, such as treatment-dependent telemetry loss or mapping one variant to the wrong variant key.
- The analysis includes subjects based on behavior that occurs after assignment and can be affected by the variant. For example, a treatment-dependent eligibility event or bot filter can exclude one variant at a higher rate.

### How to resolve

1. Pause decision-making for the experiment until you identify the source of the SRM.
2. For experiments backed by Datadog Feature Flags, review the flag's [{{< ui >}}Version history{{< /ui >}}][3] for traffic split or variant changes, check for mixed assignments, and confirm that exposure events reach Datadog at the same rate for every variant.
3. For warehouse-native experiments, compare the expected exposure fraction for each variant in Datadog with the upstream assignment probabilities. Compare raw assignment counts by variant before and after the Exposure SQL Model applies joins, filters, aggregation, and timestamp constraints.
4. Check whether the imbalance is localized to specific segments or time windows. A segment-specific or launch-time SRM can help narrow the root cause.
5. Fix the source of the imbalance, then rerun experiment analysis.

## Missing assignments

If Datadog has no assignment data for an experiment, results cannot be computed. This can happen when a feature flag is not evaluating, traffic does not reach the experiment targeting rule, or a warehouse Exposure SQL Model returns no rows in the analysis window for the specified **Experiment ID** and **Variant ID** values.

For experiments backed by Datadog Feature Flags that use warehouse metrics, Datadog can record assignments before it has synchronized those exposures to the `g_exposures` table in your warehouse. Warehouse metric results remain unavailable until synchronization completes.

### How to resolve

- For experiments backed by Datadog Feature Flags, confirm that the flag is enabled in the correct environment and that the application is evaluating the flag for the expected subjects. Check the flag's {{< ui >}}Real-time metric overview{{< /ui >}} for exposure events.
- For warehouse-native experiments, verify that the Exposure SQL Model returns rows with the expected **Subject Key**, **Timestamp**, **Experiment ID**, and **Variant ID** values.
- If the experiment was just launched, wait for the next analysis run or click {{< ui >}}Run an update now{{< /ui >}}.

## Mixed assignments

If the same subject is assigned to more than one variant in the same experiment, Datadog excludes that subject from analysis. Datadog calculates the percentage separately for each assignment source, using unique subjects from that source as the denominator. The diagnostic passes at 5% or less, warns above 5% and below 20%, and fails at 20% or more. As the excluded share grows, results become less representative and less reliable.

### How to resolve

- For experiments backed by Datadog Feature Flags, review the flag's [{{< ui >}}Version history{{< /ui >}}][3] for unexpected changes after launch, especially changes to the experiment targeting rule, traffic split, or variants.
- For warehouse-native experiments, make sure the column mapped to **Experiment ID** in the [Exposure SQL Model][2] identifies only the experiment exposure, such as a specific experiment or flag-allocation key, not the broader flag key.
- If the warehouse-native [Exposure SQL Model][2] intentionally reads flag-evaluation logs, filter out evaluations that are not experiment exposures. For example, if the model captures all evaluations for a flag, an exposure ramp can record a subject's pre-experiment control experience before they are eligible for the experiment, then later record a randomized treatment exposure after they become eligible. The pre-experiment flag evaluation is not part of the experiment and should not be captured as an exposure.
- For warehouse-native experiments, check for conflicting variant records in the assignment data.
- Fix the source of conflicting assignments, then rerun analysis.

## Dimensional assignment imbalance

Datadog can flag an experiment when the probability of being assigned to a variant differs significantly across dimension values. For example, one device type, country, plan, or customer tier might receive variants at a different split than the rest of the experiment.

For each assignment dimension, Datadog runs Pearson's chi-squared test of independence between variant and dimension value. To account for testing multiple dimensions, Datadog applies a Bonferroni correction: a dimension fails when its p-value is below `0.001 / n`, where `n` is the number of eligible dimensions tested. Datadog excludes a dimension value when any expected variant count for that value is below 5, skips dimensions with more than 100 values, and requires at least two remaining dimension values and two variants with positive marginal counts. Skipped dimensions do not contribute to `n`. If no dimension is eligible, the diagnostic passes without running a dimensional test.

Like the overall SRM check, the dimensional test is not sequentially valid across repeated analysis runs. The Bonferroni correction controls for the dimensions tested in one run, not for repeated checks as experiment data accumulates.

This diagnostic is separate from overall traffic imbalance, or sample ratio mismatch (SRM): global imbalance alone does not trigger it. When both diagnostics fail, the affected dimension values can help localize the cause of the overall SRM. For example, dimensional imbalance for device type can point to a device-specific bug in variant delivery, SDK evaluation, redirects, page performance, crashes, or exposure telemetry.

Datadog uses the dimension value from the subject's first assignment record. Later changes to the subject's dimension value should not cause this diagnostic.

### How to resolve

- Review the affected dimension values and compare them with the overall traffic imbalance diagnostic.
- Investigate segment-specific differences in flag evaluation, variant delivery, application behavior, and exposure telemetry.
- For warehouse-native experiments, confirm that the Exposure SQL Model maps the intended assignment-time property columns and does not filter exposures differently by segment.
- Fix the source of the localized imbalance, then rerun analysis.

## Missing metric data

Datadog reports **Missing metric data** when assignments exist but experiment analysis finds no usable metric values. For simple and ratio metrics, at least one contributing value before outlier handling must be non-zero. If all contributing values are zero or null, the diagnostic fails for a primary metric and warns for a secondary or guardrail metric. For percentile metrics, zero is a valid result; only null results count as missing. If Datadog cannot determine whether a metric is primary, it treats missing data as a failure.

This diagnostic does not necessarily mean that the source event never fired. Events can exist but fail the metric's filters, fail to join to experiment assignments, or produce only zero or null metric values.

### Common causes

- The metric definition's event name, aggregation, filters, or data source does not match the data being emitted.
- The source event is not firing, or it fires only before the subject's first assignment and is therefore excluded from post-assignment attribution.
- The metric events and experiment assignments identify the same subject differently. This subject identifier mismatch is a common cause of missing metric data:
  - For Product Analytics or RUM metrics in experiments backed by Datadog Feature Flags, the configured [subject type attribute][4] must match the SDK `targetingKey`.
  - For warehouse metrics, the subject column mapped in the [Metric SQL Model][5] must contain the same values as the assignment subject column. For experiments backed by Datadog Feature Flags, those values must match the SDK `targetingKey`. For warehouse-native experiments, they must match the assignment subject column configured in the [Exposure SQL Model][2].
- A warehouse Metric SQL Model returns no matching rows in the analysis window or filters out the expected events.

### How to resolve

1. Open the metric and confirm that the event name, aggregation, filters, and data source are correct. Check the metric event volume chart for recent matching data.
2. Compare an assigned subject's identifier with the identifier on its metric events. Confirm that the configured subject type attribute or mapped warehouse column contains the same value as the SDK `targetingKey` or the assignment subject column configured in the Exposure SQL Model.
3. Confirm that metric events occur after the subject's first assignment and within the experiment analysis window.
4. For an experiment backed by Datadog Feature Flags, if [Source Code Integration][6] is configured, click [{{< ui >}}Ask Bits{{< /ui >}}][7] for a **Missing metric data** failure on the primary metric. Bits can inspect the source locations where the feature flag is evaluated and help you check nearby metric instrumentation. An empty code search is inconclusive and does not prove that the SDK or flag is missing from the application.
5. For warehouse metrics, run the Metric SQL Model or query its source table directly.
6. Fix the metric definition, identity mapping, event timing, or instrumentation issue, then rerun experiment analysis.

## Metric winsorized to zero

Outlier handling caps extreme metric values to reduce variance. Datadog warns when outlier handling leaves every variant's overall result at zero or null even though at least one raw value was non-zero before outlier handling. For ratio metrics, Datadog checks the numerator and denominator separately. This diagnostic has no percentage or minimum-sample threshold and does not fail an experiment.

This can happen when only a small number of subjects perform the metric event and outlier handling caps all observed values to zero. For example, if a metric has a 99th-percentile upper winsorization bound and fewer than 1% of subjects have a non-zero value, the upper bound is zero. Every non-zero value is then treated as an outlier and capped at zero.

For percentile winsorization, Datadog can calculate bounds using all assigned subjects or non-zero values only. Excluding zeros from the calculation can prevent structural zeros from setting a bound of zero for a sparse metric. This strategy does not remove zero-valued subjects from the analysis; it excludes zeros only when calculating the percentile bounds, which Datadog then applies to every subject.

### How to resolve

1. Open the metric.
2. Review {{< ui >}}Outlier handling{{< /ui >}} under {{< ui >}}Experiment settings{{< /ui >}}. For a sparse metric with percentile winsorization, calculate the bounds from non-zero values only.
3. It can be tempting to resolve the warning by changing the winsorization percentile or disabling outlier handling. However, metrics that trigger this diagnostic tend to have low statistical power. Use the [sample size calculator][8] to estimate the experiment duration and minimum detectable effect before relying on the metric for a decision.
4. Rerun experiment analysis after updating the metric.

## Pre-experiment metric imbalance

When CUPED is enabled, Datadog uses pre-experiment metric values to reduce variance. Before exposure, the experiment should behave like an A/A test: treatment cannot affect behavior that occurred before assignment. A detected imbalance can occur by chance, or its root cause can indicate treatment-correlated selection, data leakage, or a randomization problem. Those underlying issues can violate CUPED's assumptions or invalidate more than the CUPED adjustment.

Datadog calculates two-sided sequential normal-mixture confidence sequences for the treatment-minus-control difference in pre-experiment component means. Simple metrics test the metric mean; ratio metrics test numerator and denominator means independently; and percentile metrics test their internal S and N components. Datadog starts with a family significance level (alpha) of `0.05` and applies a multiple-comparison correction across eligible metric, treatment-variant, and component checks. The diagnostic fails when an adjusted confidence sequence strictly excludes zero; an interval that touches zero passes. The confidence sequences remain valid as analysis repeats over accumulating data. The test requires observations with positive variance but has no explicit minimum sample size.

### Common causes

- Treatment-dependent identity linkage. For example, an experiment randomizes anonymous IDs but analyzes account-level purchases, and an anonymous-to-account mapping is created only after login. If post-exposure login retrospectively includes or rekeys earlier purchase history, a treatment that increases login can make more pre-experiment history appear in treatment.
- Timestamp truncation or mismatched time granularity. For example, exposure has an event timestamp but metric data is rolled up by day and represented at midnight, making post-exposure events on that day appear to precede exposure.
- Inconsistent timezone or daylight-saving handling that stores or compares a later event with an earlier timestamp.
- An assignment rule correlated with pre-treatment outcomes or earlier treatments. For example, assigning variants directly from identifier ranges or reusing the same bucket mapping across experiments can preserve a relationship between assignment and earlier experiment exposure.
- A randomization, targeting, subject-identity, or data-processing issue that makes pre-experiment data availability differ across variants.

### How to resolve

1. Confirm that pre-experiment data is available and representative for each variant, and check whether the metric definition changed during the pre-experiment window.
2. Compare raw assignment and metric timestamps at their original granularity and in a consistent timezone. Check whether a daily rollup, timestamp conversion, or daylight-saving transition can move post-exposure events into the pre-experiment window.
3. Audit subject identity mappings. Make sure post-exposure behavior, such as logging in, cannot determine which subjects have pre-experiment history available for analysis.
4. Verify that assignment is independent of pre-treatment outcomes, subject attributes, and earlier treatments. For experiments backed by Datadog Feature Flags, keep the SDK `targetingKey` stable; Datadog uses the flag key and `targetingKey` to keep a subject in the same rollout bucket. For warehouse-native experiments, use a deterministic assignment method that combines the subject identifier with an experiment-specific salt or key. This keeps a subject in the same variant within an experiment without reusing the same assignment pattern across experiments.
5. Fix the identity, timestamp, randomization, or data-processing issue, then rerun analysis. Disabling CUPED does not make the experiment valid when the imbalance comes from selection bias, post-exposure data leakage, or broken randomization.

## Implausible prior

For Bayesian analysis, Datadog runs a two-tailed prior-predictive check on relative lift. The check accounts for both the prior's dispersion and the estimate's sampling uncertainty. Datadog warns when, under the prior predictive distribution, there is less than a 1% chance of observing a lift at least as extreme in either direction as the lift estimated in the experiment. Datadog tests each eligible metric-treatment comparison without a multiple-testing correction. The check requires a positive, finite standard error but has no explicit minimum sample size. A warning indicates that the observed effect is surprising under the selected prior.

For example, many conversion rate experiments have true lifts below 5%, so the default normal prior with mean 0 and standard deviation 0.05 can be a reasonable choice. If an experiment fixes a broken checkout page that prevents most users from converting, a much larger lift may be plausible. In that case, the default prior can be too conservative and shrink the estimated effect too much.

### How to resolve

- Compare the estimated lift with historical effects for the metric and with the effect that the intervention could plausibly produce.
- Review the experiment's statistical analysis plan and prior setting.
- If the estimated lift is plausible but the prior assigns very little probability to effects of that size, update the prior to reflect relevant domain knowledge and rerun analysis.

## Segment-level degradation

Datadog warns when a segment's point estimate is opposite the metric's desired change and the segment performs significantly worse than comparable segments. For a metric where an increase is desirable, the segment lift must be below zero. For a metric where a decrease is desirable, the segment lift must be above zero.

For each metric, treatment variant, and dimension, Datadog compares each segment lift with the inverse-variance-weighted average of valid segment lifts in that same combination. A segment warns only when a sequential confidence sequence for its difference from the weighted average lies entirely in the worse direction and its point estimate is opposite the desired change.

Datadog applies a Bonferroni correction by dividing the family significance level (alpha) of `0.05` by the number of segment comparisons that pass initial summary-statistics validation. Comparisons skipped during later checks remain in the denominator, making the threshold more conservative. The check requires at least two segments with positive variance for the same metric, treatment variant, and dimension. Segment-level degradation produces a warning, not a failed diagnostic.

### How to resolve

- Review segment-level charts for affected dimensions such as country, plan, device, or customer tier.
- Check whether the affected segment maps to a real product or instrumentation issue.
- Consider diverting affected segment traffic away from the experiment while you investigate high-impact segments.

## Analysis pipeline failure

Experiment analysis can use Product Analytics and RUM data in Datadog or warehouse native mode. **Analysis pipeline failure** applies only to experiments that use warehouse metrics. Datadog reports this diagnostic when a customer warehouse query fails, so current warehouse results cannot be computed. Datadog does not report internal Product Analytics or RUM analysis failures with this diagnostic.

The SQL you define depends on how the experiment is randomized. For experiments backed by Datadog Feature Flags, Datadog synchronizes assignments to the `g_exposures` table, and you define Metric SQL Models. For warehouse-native experiments, you define both the Exposure SQL Model and Metric SQL Models. Datadog generates the remaining pipeline SQL.

### How to resolve

1. Click [{{< ui >}}Ask Bits{{< /ui >}}][7] on the failed diagnostic. Bits reviews the pipeline error, failed warehouse queries, and any SQL models configured for the experiment. It identifies the most likely cause and suggests a specific fix.
2. For an experiment backed by Datadog Feature Flags, confirm that exposures have synchronized to `g_exposures`, then review the failed query, Metric SQL Models, warehouse connection and permissions, and source-table availability.
3. For a warehouse-native experiment, review the failed query, Exposure SQL Model, Metric SQL Models, warehouse connection and permissions, and source-table availability.
4. Apply the fix, then rerun experiment analysis.
5. If the same failure persists, contact [Datadog support][9] with the experiment URL and failure details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/plan_and_launch_experiments/#schedule-a-staged-rollout
[2]: /experiments/concepts/exposure_sql/
[3]: /feature_flags/concepts/flag_history/#individual-flag-history
[4]: /experiments/concepts/subject_types/#product-analytics-and-rum-metrics
[5]: /experiments/concepts/subject_types/#warehouse-metrics
[6]: /source_code/
[7]: /bits_ai/bits_chat/#web-application
[8]: /experiments/plan_and_launch_experiments/#run-a-sample-size-calculation-optional
[9]: /help/
