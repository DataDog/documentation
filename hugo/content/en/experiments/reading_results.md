---
title: Reading Experiment Results
description: Read and understand the results of your experiments.
aliases:
  - /product_analytics/experimentation/reading_results/
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics/"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/product_analytics/analytics_explorer/"
  tag: "Documentation"
  text: "Analytics Explorer"
- link: "/experiments/diagnostics/"
  tag: "Documentation"
  text: "Experiment Diagnostics"
---

## Overview

After you [launch an experiment][1], the experiment results page is the central place to analyze it. From this page, you can:

- **Measure metrics**: Review scorecards that compare control and treatment performance on your decision metrics.
- **Analyze results further**: Break metric lift down by user segments or plot lift over time to understand how your change performed across cohorts.
- **Inspect session replays**: Open individual user session replays to see how specific users experienced each variant.
- **Document learnings**: Record conclusions and takeaways for your team.

The following sections explain the metric scorecard and how to explore results.

## Experiment diagnostics

Datadog runs [experiment diagnostics][9] with experiment analysis to check exposure data, metric data, randomization, and analysis health. Review diagnostic warnings before interpreting results, especially when a metric is missing, unexpectedly zero, or marked with a warning.

## Metric scorecard

The experiment results page shows a scorecard for each decision metric. Each row summarizes how one metric compared between the treatment and control variants.

{{< img src="/product_analytics/experiment/exp_reading_exps_scorecard.png" alt="The experiment results overview showing a decision metrics table with control and treatment values, relative lift, and confidence interval bars for three metrics." style="width:90%;" >}}

### What the scorecard shows

For each metric, the scorecard displays:

- **Control and treatment values**: The average per-subject metric value in each variant.
- **Relative lift**: The percent change in that average between treatment and control.
- **Confidence interval**: A range of lift values consistent with the observed data, shown as a bar centered on the relative lift estimate.

The width and interpretation of the confidence interval depend on the experiment's configured [analysis method][2].

{{% collapse-content title="How metrics are calculated" level="h4" expanded=false id="how-metrics-are-calculated" %}}

Datadog analyzes experiments at the **subject** level—the unit you configured when you set up the experiment, typically a user. Datadog computes a metric value for each enrolled subject (for example, revenue per user or whether the user completed a signup). These per-subject values form a distribution for each variant. Datadog's statistical engine then compares these distributions between control and treatment.

**Relative lift** measures how much the treatment shifted the average per-subject metric value compared to the control:

```
Relative lift = (Treatment − Control) / Control
```

A relative lift of 10% means the treatment group's average per-subject value is 10% higher than the control group's average. Negative lift means the treatment performed worse on average.

{{% /collapse-content %}}

### Confidence intervals

The confidence interval is a range of lift values that are consistent with the observed data. The true lift could fall outside this range, but values inside the interval are more consistent with what the experiment measured.

- If the **entire interval is above zero**, the result is statistically significant in the positive direction. An improvement at least this large is unlikely to occur if there is no true effect.
- If the **entire interval is below zero**, the result is statistically significant in the negative direction. The treatment likely reduced the metric.
- If the **interval crosses zero**, the result is not statistically significant. The result is consistent with a true effect of zero.

Use the interval width as an indicator of precision: a narrower interval means a more precise estimate of lift; a wider interval means more uncertainty, often because the sample is smaller or the metric is noisy.

If [multiple testing correction][8] is enabled, confidence intervals are wider because Datadog controls the family-wise error rate across the experiment's metric and treatment-variant comparisons.

### Global lift

Experiments typically enroll only a subset of eligible users. Switch to the {{< ui >}}Global lift{{< /ui >}} tab on the metric scorecard to estimate how rolling out the treatment to all eligible users would affect your overall metric totals. See [Global Lift][7] for the full methodology.

{{< img src="/product_analytics/experiment/exp_reading_global_lift.png" alt="The Global lift tab of the experiment scorecard showing control and treatment average metric values, coverage, and global lift for each decision metric." style="width:90%;" >}}

For each metric, the {{< ui >}}Global lift{{< /ui >}} tab displays:

- **Control and treatment values**: The average per-subject metric value in each variant—the same values shown on the main scorecard tab.
- **Coverage**: The estimated proportion of your global metric total associated with the experiment's eligible population (excluding the effect of the experiment).
- **Global lift**: The estimated change to your overall metric totals if the treatment were released to all eligible users. Datadog calculates global lift as the product of coverage and the experiment's local (relative) lift.

## Exploring results

From the metric scorecard, hover over a metric name to view exploration options. The options available depend on your metric's data source.

### Chart

Click {{< ui >}}Chart{{< /ui >}} on any metric to open an interactive visualization of how a metric performed during the experiment. Within the chart, you can:

- **Split by segmentation properties**: Compare lift across cohorts such as device type or user tier. Properties reflect subject attributes at the initial time of exposure.
- **Plot lift over time**: See how lift trends across the experiment, plotted by calendar date or by days since each subject's first experiment exposure.
- **Add filters**: Narrow the chart to a specific subset of subjects.
- **Switch lift types**: Toggle between relative lift and absolute lift (Treatment − Control).

The example below shows a segment-level breakout by country. Use this view to understand when certain cohorts reacted differently to the new experience.

{{< img src="/product_analytics/experiment/exp_segment_view.png" alt="Segment-level view of a metric split by Country ISO Code, showing a bar chart of relative lift and a data table with control and treatment values per country." style="width:90%;" >}}

### Copy SQL

For [warehouse-native metrics][3], click {{< ui >}}Copy SQL{{< /ui >}} to copy a simplified version of the pipeline logic Datadog used to calculate the result. Paste the query into your warehouse to audit the result or run follow-up analysis.

{{< img src="/product_analytics/experiment/exposure-sql/copy-sql.png" alt="The experiment results page with the Copy SQL button highlighted on a warehouse metric." style="width:90%;" >}}

### Replays

For metrics built on [RUM][4] or [Product Analytics][5] data, click {{< ui >}}Replays{{< /ui >}} to watch [session replays][6] for users enrolled in the experiment. Review how subjects in each variant experienced the product.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/plan_and_launch_experiments
[2]: /experiments/statistics/analysis_methods
[3]: /experiments/guide/connecting_a_data_warehouse/
[4]: /real_user_monitoring/
[5]: /product_analytics/
[6]: /session_replay/
[7]: /experiments/global_lift/
[8]: /experiments/statistics/multiple_testing_correction
[9]: /experiments/diagnostics/
