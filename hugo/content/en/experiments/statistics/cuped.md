---
title: "CUPED: Variance Reduction Technique"
description: Learn how CUPED uses pre-experiment data to reduce metric variance and reach conclusions faster.
aliases:
  - /experiments/cuped
  - /experiments/cuped/
further_reading:
- link: "/experiments/statistics/analysis_methods"
  tag: "Documentation"
  text: "Analysis Methods"
- link: "/experiments/reading_results"
  tag: "Documentation"
  text: "Reading Experiment Results"
- link: "/experiments/plan_and_launch_experiments"
  tag: "Documentation"
  text: "Plan and Launch Experiments"
---

## Overview

The precision of experiment results, including confidence interval width, depends on metric variance. One way to improve precision is to gather more data, but that increases the time required to reach a decision.

Controlled-experiment Using Pre-Experiment Data (CUPED), originally presented in Deng et al.'s [Improving the Sensitivity of Online Controlled Experiments by Utilizing Pre-Experiment Data][1], reduces metric variance directly by using data captured before experiment exposure.

Standard experiment analysis compares metric data from subjects exposed to a treatment with metric data from subjects in a control group. All data used in that comparison is collected during the experiment. Teams often have information about subjects from before the experiment started, especially historical metric data. CUPED uses this pre-experiment data to control for some of the metric variance that comes from randomly assigning variants to subjects. For example, one variant might have more active subjects than another variant by random chance. CUPED reduces the effect of this random variation by controlling for different activity levels across variants.

CUPED is enabled by default. With CUPED enabled, the displayed lift and metric values may differ from the unadjusted estimates calculated from the raw data. The raw data is unchanged; CUPED changes only the estimator used for analysis. This difference is expected and is the mechanism that drives the reduced variance. You can toggle CUPED in the experiment's [statistical analysis plan][2].

## How CUPED works

Datadog's implementation is based on the original CUPED paper and the metric augmentation framework described in Deng et al.'s [From Augmentation to Decomposition: A New Look at CUPED in 2023][3].

CUPED takes the raw (non-CUPED) lift estimate for a metric and *augments* it with a series of adjustments. Given a raw absolute lift estimate `Δ` (the non-CUPED treatment−control difference for the metric), the CUPED-adjusted lift is:

```
CUPED lift = Δ + adjustment_1 + adjustment_2 + ... + adjustment_n
```

To avoid introducing bias, the adjustment terms must be chosen carefully. Specifically, they must be *zero-in-expectation*. If the experiment were run many times, each with a different sample of users in the control and treatment variants, the average of the adjustments across those samples would equal zero. Because the adjustments are zero-in-expectation, the CUPED lift aims at the same target as the non-CUPED lift. With carefully chosen coefficients, it does so with less sampling variance.

Each adjustment has the form:

```
adjustment_i = -theta_i * (avg. covariate in treatment - avg. covariate in control)
```

In this formula, the averages are the covariate means observed in the treatment and control groups. The `theta_i` value is a coefficient discussed in [Selecting the coefficients](#selecting-the-coefficients). Given this form, requiring each adjustment to be zero-in-expectation is equivalent to requiring that each covariate is equal in expectation across the control and treatment groups.

<div class="alert alert-info">
<p><strong>Intuition for "zero-in-expectation":</strong> One way to understand CUPED's requirement is to compare the adjustments to observed lifts in repeated A/A tests.</p>
<p>In an A/A test, users are randomized into treatment and control, but the experience is identical in both groups. With proper randomization, the average lift across many tests is zero because the groups are not systematically different, but the lift is not necessarily zero in any individual A/A test due to sampling noise. The core assumption of CUPED is that adjustments behave the same way as the lift in an A/A test. Equivalently, the per-variant covariate means behave the same way as per-variant metric means in an A/A test.</p>
</div>

## Default covariates

By default, Datadog Experiments includes the following covariates:

Pre-exposure aggregations
: Per-subject observations captured in a 30-day period before experiment exposure.

Subject property values
: Subject properties based on the initial assignment record.

Unless there are data quality issues, both categories of covariates meet the assumptions of CUPED. There is no systematic difference in the experience of treatment and control subjects before the moment of experiment exposure, so the pre-exposure aggregations mimic the behavior of metric observations in an A/A test. Similarly, subject property values captured at the moment of first exposure cannot be influenced by exposure to the treatment.

Datadog also runs diagnostic checks on a regular basis to detect violations of these assumptions, such as pre-experiment imbalance and dimensional sample ratio mismatch.

### Handling missing values

Missing data is expected in practice: new users often have no pre-experiment observations, and some subjects have no recorded value for a property. CUPED handles both cases without dropping the subject, following the approach in Section 4.2 of the [original CUPED paper][1].

- **Missing pre-exposure aggregations:** When a subject has no pre-experiment data for a metric, the value is set to zero. When the data is only partially missing, a separate *missingness indicator* covariate is also added. This helps CUPED control for the fact that a value was missing rather than letting the imputed zero distort the adjustment.
- **Missing property values:** A missing value for a property is treated as its own category value rather than being dropped, so subjects without a recorded property value are still included.

### How many covariates are included

Covariates are built from aggregations, and an aggregation is not the same thing as a metric. A mean metric is a single aggregation, but a ratio metric splits into two aggregations: a numerator and a denominator. Each aggregation contributes one covariate, plus a missingness indicator when the data is partially missing. Each subject property contributes one covariate per value, including a value for missing.

Consider an experiment with two metrics and one property:

- **Revenue per user** (a mean metric)
- **Click-through rate** (a ratio metric, clicks divided by pageviews)
- **Device type** (a property that is either `Desktop` or `Mobile`)

Because the ratio metric splits into a numerator and a denominator, these two metrics produce three pre-exposure aggregations. Assuming each has some partially missing data, they contribute the following covariates:

| Source | Covariates |
| --- | --- |
| Revenue per user (mean) | Pre-exposure revenue per user, plus its missingness indicator |
| Click-through rate (ratio) | Pre-exposure clicks and pre-exposure pageviews, plus a missingness indicator for each |
| Device type (property) | `Desktop`, `Mobile`, and `Missing` |

In total, this experiment includes 9 covariates: 6 from the three pre-exposure aggregations and 3 from the device type property.

To keep the adjustment stable, only a property's most common values are included. The 10 most common values in each variant are combined into a single shared set of covariates that applies to all variants, and rarer values are not included. A covariate that has no variation, such as a missing indicator when no subjects are missing that value, is also excluded.

## Selecting the coefficients

After the covariates are set, Datadog chooses the coefficients (the `theta_i` values) that *approximately minimize the variance* of the CUPED-adjusted lift. This adjustment removes the most noise while remaining zero-in-expectation. A single set of coefficients is estimated by pooling data from all variants, so the same adjustment applies to every variant and to segments analyzed later, which are defined by subject properties recorded at assignment.

A small L2 penalty keeps the coefficients stable when covariates are correlated with one another. This penalty does not introduce bias in the lift estimator, because CUPED is unbiased for any fixed set of adjustment coefficients. This is unlike ridge regression, which applies its L2 penalty to a coefficient on the treatment effect itself and can therefore bias the estimator.

Although the coefficients are estimated from the experiment data in practice, CUPED treats them as fixed when computing results. This follows the approach of the original CUPED paper, and theory suggests that the variance contribution of estimating the coefficients is generally negligible at the sample sizes required in digital experimentation.

CUPED is often interpreted as a form of regression adjustment, and the two are closely related. For a mean metric, the variance-minimizing coefficients are exactly those obtained by regressing the metric on the covariates with ordinary least squares.

However, CUPED is fundamentally model-free. It relies only on the fact that pre-experiment differences between randomized groups are zero in expectation, and it makes no assumption about the form of the relationship between the covariates and the metric. Framing CUPED as augmentation rather than regression provides a general framework that naturally extends to advanced metric types such as ratio and percentile metrics. In all cases, the general form is the same: start from a non-CUPED lift estimate and add zero-expectation adjustment terms.

## Variance reduction for all metric types

CUPED at Datadog is not limited to mean-based metrics. The same framework reduces variance for mean, ratio, and percentile metrics, including metrics that target the tail of a distribution, such as the 95th percentile of page load time. This is an advantage over regression-based implementations of CUPED, which do not naturally extend to percentile metrics. CUPED can produce narrower intervals in fewer samples, including for latency and Core Web Vitals measurements that are naturally expressed as percentiles.

## Assumptions and interpretation

### Modeling assumptions

CUPED does not assume linear relationships, homoscedasticity, or the absence of interactions. Its main assumption is that the covariate means across variants are equal in expectation. The other assumptions are common to digital experimentation in general, such as no confounding through proper randomization, and samples large enough for the estimators to be approximately normal by the central limit theorem.

### Why CUPED lift estimates differ from non-CUPED estimates

CUPED does not produce the same lift estimates with narrower confidence intervals. If CUPED and non-CUPED estimates were always identical, their variance, and therefore their confidence intervals, would also be identical. The difference between CUPED and non-CUPED results is the exact mechanism that drives CUPED's reduced variance.

### Choosing between CUPED and non-CUPED results

Use CUPED results when CUPED's assumptions are met. They have the same expectation as non-CUPED results, but with lower variance. Proper data management practices reduce the risk of assumption violations, and diagnostic checks can detect pre-experiment imbalance and dimensional sample ratio mismatch.

<div class="alert alert-info">Before the experiment starts, decide whether to base your decision on the CUPED or non-CUPED result. This avoids selecting the result that best supports a preferred outcome.</div>

### CUPED and improperly randomized experiments

CUPED does not correct for bias caused by improper randomization. It assumes the experiment is properly randomized, so it cannot recover statistically valid estimates from systematically biased experiments. Random covariate imbalances still arise in properly randomized experiments, and CUPED corrects for these: the CUPED-adjusted estimates are *conditionally* unbiased for a specific observed covariate imbalance.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf
[2]: /experiments/plan_and_launch_experiments/#choose-a-statistical-analysis-plan
[3]: https://arxiv.org/abs/2312.02935
