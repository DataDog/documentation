---
title: Multiple Testing Correction
description: Control the family-wise error rate when an experiment compares multiple metrics or treatment variants.
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

When you evaluate several experiment comparisons at once, the family-wise error rate increases. For example, a single 95% confidence interval does not include the true effect 5% of the time. If an experiment generates many confidence intervals, the probability that at least one interval does not include its true effect is higher than the failure probability for any one interval.

Multiple testing correction reduces the family-wise error rate by making each individual comparison more conservative. In Datadog Experiments, this means confidence intervals become wider, and a treatment needs stronger evidence before Datadog marks a result as statistically significant.

Multiple testing correction is available for frequentist analysis methods. Datadog does not offer this setting for [Bayesian analysis][1], because Bayesian intervals are not structured around Type I error control.

Datadog treats each treatment variant compared to the control for each metric in the experiment as one comparison. Remaining metrics are all metrics other than the primary metric.

The control variant is the baseline, so it does not add a comparison by itself.

For example, an experiment with one control variant, two treatment variants, one primary metric, and four remaining metrics has 10 comparisons:

```
2 treatment variants x (1 primary metric + 4 remaining metrics) = 10 comparisons
```

Add only the treatment variants and metrics that you intend to evaluate. Additional treatment variants make correction stricter for all metrics because each treatment adds another comparison against the control. Additional metrics beyond the primary metric make correction stricter for the remaining metric results, but they do not reduce the alpha budget reserved for the primary metric.

## How Datadog adjusts confidence intervals

Datadog uses preferential Bonferroni correction. Like standard Bonferroni correction, it divides the experiment's family-wise error rate budget across comparisons. Unlike standard Bonferroni correction, it reserves a configurable share of that budget for the primary metric and splits the rest across the remaining metrics. This helps the experiment retain more power for the primary metric, because adding more metrics beyond the primary metric does not further shrink its alpha budget.

Start with the experiment's configured confidence level:

```
alpha = 1 - confidence level
```

For a 95% confidence level, `alpha` is `0.05`.

Datadog then allocates that `alpha` across the metric-and-variant comparisons. The primary metric weight, represented as `gamma`, controls how much `alpha` is reserved for the primary metric. The default `gamma` is `0.5`, which reserves half of the `alpha` budget for the primary metric and splits the other half across the remaining metrics. Increasing `gamma` gives more budget to the primary metric and less budget to the remaining metrics.

If an experiment has `k` treatment variants, `m` total metrics, and primary metric weight `gamma`, Datadog calculates each comparison's alpha as follows:

| Comparison type | Per-comparison alpha |
| --- | --- |
| Primary metric only | `alpha / k` |
| Primary metric with remaining metrics | `(alpha * gamma) / k` |
| Each remaining metric | `(alpha * (1 - gamma)) / ((m - 1) * k)` |

Datadog then calculates each interval using:

```
adjusted confidence level = 1 - per-comparison alpha
```

This Bonferroni-style allocation does not estimate covariance between comparisons. As a result, it can be conservative when related metric lifts are correlated or when treatment comparisons share the same control group.

### Example

Suppose an experiment has:

- A 95% configured confidence level (`alpha = 0.05`).
- One control variant and one treatment variant, so each metric has one treatment-control comparison.
- One primary metric and four remaining metrics.
- The default primary metric weight (`gamma = 0.5`).

For the primary metric:

```
primary alpha budget = 0.05 * 0.5 = 0.025
primary comparison count = 1
per-comparison alpha = 0.025 / 1 = 0.025
adjusted confidence level = 1 - 0.025 = 97.5%
```

For the remaining metrics:

```
remaining metrics alpha budget = 0.05 * (1 - 0.5) = 0.025
remaining metric comparison count = 4
per-comparison alpha = 0.025 / 4 = 0.00625
adjusted confidence level = 1 - 0.00625 = 99.375%
```

In this example, each remaining metric receives a smaller per-comparison alpha than the primary metric because the remaining metrics split the non-primary alpha budget.

## Interpreting corrected results

Multiple testing correction changes the confidence interval and statistical significance threshold. It does not change the control value, treatment value, or lift point estimate.

Use the corrected interval the same way you use any experiment confidence interval:

- If the entire interval is above zero, the treatment is statistically significant in the positive direction.
- If the entire interval is below zero, the treatment is statistically significant in the negative direction.
- If the interval crosses zero, the result is not statistically significant.

Because corrected intervals are wider, a result that was significant without correction may no longer be significant after correction. This is expected: the corrected result is controlling the family-wise error rate across the full family of comparisons.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/statistics/analysis_methods/#bayesian-analysis
[2]: /experiments/plan_and_launch_experiments/#choose-a-statistical-analysis-plan
