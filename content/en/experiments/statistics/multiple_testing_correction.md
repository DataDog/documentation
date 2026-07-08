---
title: Multiple Testing Correction
description: Control false positive risk when an experiment compares multiple metrics or treatment variants.
aliases:
  - /experiments/multiple_testing_correction
  - /experiments/multiple_testing_correction/
  - /experiments/statistics/multiple_testing
  - /experiments/statistics/multiple_testing/
  - /experiments/multiple_testing
  - /experiments/multiple_testing/
  - /experiments/statistics/multiple_comparisons
  - /experiments/statistics/multiple_comparisons/
  - /experiments/multiple_comparisons
  - /experiments/multiple_comparisons/
further_reading:
- link: "/experiments/statistics/analysis_methods"
  tag: "Documentation"
  text: "Analysis Methods"
- link: "/experiments/plan_and_launch_experiments/#choose-a-statistical-analysis-plan"
  tag: "Documentation"
  text: "Choose a Statistical Analysis Plan"
- link: "/experiments/reading_results"
  tag: "Documentation"
  text: "Read Experiment Results"
---

## Overview

When you evaluate several experiment comparisons at once, the chance of seeing at least one false positive increases. For example, a single 95% confidence interval fails to cover the true underlying effect 5% of the time. If an experiment generates many confidence intervals, the probability that at least one interval fails to cover the true effect is higher than the risk for any one interval.

Multiple testing correction reduces this risk by making each individual comparison more conservative. In Datadog Experiments, this means confidence intervals become wider, and a treatment needs stronger evidence before Datadog marks a result as statistically significant.

Multiple testing correction is available for frequentist analysis methods. Datadog does not offer this setting for [Bayesian analysis][1], because Bayesian intervals are not structured around Type I error control.

## What counts as a comparison

Datadog treats each treatment variant compared to the control for each decision metric as one comparison.

The control variant is the baseline, so it does not add a comparison by itself.

For example, an experiment with one control variant, two treatment variants, and five decision metrics has 10 comparisons:

```
2 treatment variants x 5 metrics = 10 comparisons
```

Only add treatment variants and decision metrics that you intend to evaluate. Additional treatment variants make correction stricter for all metrics because each treatment adds another comparison against the control. Additional secondary metrics make correction stricter for secondary metric results.

## How Datadog adjusts confidence intervals

Datadog uses preferential Bonferroni correction. Like standard Bonferroni correction, it divides the experiment's false positive budget across comparisons. Unlike standard Bonferroni correction, it reserves a fixed share of that budget for the primary metric when there are multiple decision metrics. This helps the experiment retain more power for the main decision metric, because each additional secondary metric does not further shrink the alpha budget for the primary metric.

Start with the experiment's configured confidence level:

```
alpha = 1 - confidence level
```

For a 95% confidence level, `alpha` is `0.05`.

Datadog then allocates that `alpha` across the metric-and-variant comparisons. When there are multiple decision metrics, Datadog reserves half of the `alpha` budget for the primary metric by default and splits the other half across secondary metrics.

If an experiment has `k` treatment variants, `m` decision metrics, and primary metric weight `gamma`, Datadog calculates each comparison's alpha as follows:

| Comparison type | Per-comparison alpha |
| --- | --- |
| Primary metric, when there is only one decision metric | `alpha / k` |
| Primary metric, when there are multiple decision metrics | `(alpha * gamma) / k` |
| Each secondary metric | `(alpha * (1 - gamma)) / ((m - 1) * k)` |

Datadog then calculates each interval using:

```
adjusted confidence level = 1 - per-comparison alpha
```

### Example

Suppose an experiment has:

- A 95% configured confidence level, so `alpha = 0.05`.
- One control variant and two treatment variants, so `k = 2`.
- One primary metric and four secondary metrics, so `m = 5`.
- The default primary metric weight, so `gamma = 0.5`.

For the primary metric:

```
per-comparison alpha = (0.05 * 0.5) / 2 = 0.0125
adjusted confidence level = 1 - 0.0125 = 98.75%
```

For each secondary metric:

```
per-comparison alpha = (0.05 * 0.5) / ((5 - 1) * 2) = 0.003125
adjusted confidence level = 1 - 0.003125 = 99.6875%
```

The primary metric interval is wider than an uncorrected 95% interval. Each secondary metric interval is wider still because the secondary metrics share the remaining alpha budget.

## Interpreting corrected results

Multiple testing correction changes the confidence interval and statistical significance threshold. It does not change the control value, treatment value, or lift point estimate.

Use the corrected interval the same way you use any experiment confidence interval:

- If the entire interval is above zero, the treatment is statistically significant in the positive direction.
- If the entire interval is below zero, the treatment is statistically significant in the negative direction.
- If the interval crosses zero, the result is not statistically significant.

Because corrected intervals are wider, a result that was significant without correction may no longer be significant after correction. This is expected: the corrected result is controlling the risk of false positives across the full family of comparisons.

## When to use multiple testing correction

Enable multiple testing correction when you plan to make decisions from several metrics or treatment variants, especially when secondary metrics are important guardrails for shipping or rolling back a change.

You may leave it disabled when the experiment has one prespecified primary metric and one treatment variant, and your decision process does not depend on secondary metric significance. In that case, correction provides little or no benefit and can reduce sensitivity.

Configure multiple testing correction in the experiment's [statistical analysis plan][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/statistics/analysis_methods/#bayesian-analysis
[2]: /experiments/plan_and_launch_experiments/#choose-a-statistical-analysis-plan
