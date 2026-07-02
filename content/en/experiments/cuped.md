---
title: "CUPED: Variance Reduction Technique"
description: Learn how CUPED uses pre-experiment data to reduce metric variance and reach conclusions faster.
further_reading:
- link: "/experiments/analysis_methods"
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

The precision of experiment results, reflected in the width of the confidence intervals, depends on the variance of the metrics you are measuring. One way to improve precision is to gather more data, since variance decreases as more data accumulates. The drawback is obvious: it takes longer to run the experiment.

There are options beyond waiting for more data, and they all reduce the variance in the metrics directly. One particularly flexible and powerful method is Controlled-experiment Using Pre-Experiment Data (CUPED), originally presented by [Deng et al. (2013)][1].

Standard experiment analysis compares metric data from subjects exposed to a treatment against a control group, using only data gathered during the experiment. But most companies know something about their users beyond what they did during the experiment, most prominently metric data from before the experiment started. CUPED leverages this data from outside the experiment to control for some of the variance that comes from randomly assigning a variant to each subject. In a standard experiment, one variant might end up with more active users purely by chance; CUPED reduces the effect of this random variation by controlling for the different activity levels across variants.

CUPED is enabled by default. With CUPED enabled, the displayed lift and metric values may differ from the naive estimates calculated from the raw data. This difference is expected and is the mechanism that drives the reduced variance. You can toggle CUPED in the experiment's [statistical analysis plan][2].

## How CUPED works

CUPED takes the raw (non-CUPED) lift estimate for a metric and adds a series of adjustments. Given a raw lift estimate `Δ`, the CUPED-adjusted lift is:

```
CUPED lift = Δ + adjustment_1 + adjustment_2 + ... + adjustment_n
```

To avoid introducing bias, the adjustment terms must be chosen carefully. Specifically, they must be *zero-in-expectation*. This means that if the experiment were run many times, each with a different sample of users in the control and treatment variants, the average of the adjustments across those samples would equal zero.

Each adjustment has the form:

```
adjustment_i = -theta_i * (avg. covariate in treatment - avg. covariate in control)
```

where the averages are the covariate means observed in the treatment and control groups, and `theta_i` is a coefficient discussed in [Selecting the coefficients](#selecting-the-coefficients). Given this form, requiring each adjustment to be zero-in-expectation is equivalent to requiring that each covariate is equal in expectation across the control and treatment groups.

<div class="alert alert-info">
<strong>Intuition for "zero-in-expectation":</strong> A natural way to conceptualize CUPED's requirement is to think about observed lifts in repeated A/A tests. In an A/A test, users are randomized into treatment and control, but the experience is identical in both groups. With proper randomization, the average lift across many tests is zero because the groups are not systematically different, but the lift is not necessarily zero in any individual A/A test due to sampling noise. The core assumption of CUPED is that adjustments behave the same way as the lift in an A/A test; equivalently, the per-variant covariate means behave the same way as per-variant metric means in an A/A test.
</div>

## Default covariates

By default, Datadog Experiments includes the following covariates:

Pre-exposure aggregations
: Per-subject observations captured in a 30-day period before experiment exposure.

Subject property values
: Subject properties based on the initial assignment record.

Unless there are data quality issues, both categories of covariates meet the assumptions of CUPED. There is no systematic difference in the experience of treatment and control subjects before the moment of experiment exposure, so the pre-exposure aggregations mimic the behavior of metric observations in an A/A test. Similarly, subject property values captured at the moment of first exposure cannot be influenced by exposure to the treatment.

### Handling missing values

Missing data is expected in practice: new users often have no pre-experiment observations, and some subjects have no recorded value for a property. CUPED handles both cases without dropping the subject.

- **Missing pre-exposure aggregations:** when a subject has no pre-experiment data for a metric, the value is imputed and a separate *missingness indicator* covariate is added. This lets CUPED control for the fact that a value was missing, rather than discarding the subject or letting the imputed value distort the adjustment.
- **Missing property values:** a missing value for a property is treated as its own category value rather than being dropped, so subjects without a recorded property value are still included.

### How many covariates are included

Covariates are built from aggregations, and an aggregation is not the same thing as a metric. A simple metric such as a mean or a conversion rate is a single aggregation, but a ratio metric splits into two aggregations: a numerator and a denominator. Each aggregation contributes one covariate, plus one missingness indicator. Each subject property contributes one covariate per value, including a value for missing.

Consider an experiment with three metrics and one property:

- **Revenue per user** (a mean metric)
- **Conversion rate** (a mean metric)
- **Click-through rate** (a ratio metric, clicks divided by pageviews)
- **Device type** (a property that is either `Desktop` or `Mobile`)

Because the ratio metric splits into a numerator and a denominator, these three metrics produce four pre-exposure aggregations, which contribute the following covariates:

| Source | Covariates |
| --- | --- |
| Revenue per user (mean) | Pre-exposure revenue per user, plus its missingness indicator |
| Conversion rate (mean) | Pre-exposure conversion rate, plus its missingness indicator |
| Click-through rate (ratio) | Pre-exposure clicks and pre-exposure pageviews, plus a missingness indicator for each |
| Device type (property) | `Desktop`, `Mobile`, and `Missing` |

In total, this experiment includes 11 covariates: 8 from the four pre-exposure aggregations and 3 from the device type property.

To keep the adjustment stable, a property contributes covariates for at most its 10 most common values per variant; less common values are not included. A covariate that has no variation, such as a missing indicator when no subjects are missing that value, is also excluded.

## Selecting the coefficients

After the covariates are set, Datadog chooses the coefficients (the `theta_i` values) that *minimize the variance* of the CUPED-adjusted lift. This is the adjustment that removes the most noise while remaining zero-in-expectation. A single set of coefficients is estimated by pooling data from all variants, so the same adjustment applies to every variant and to any segment you slice later. A small stabilizing penalty keeps the coefficients well-behaved when covariates are correlated with one another.

Because this is variance minimization applied on top of an already-unbiased estimate, rather than a model fit to the outcome, CUPED does not assume that the relationship between covariates and metrics is linear. The same approach applies uniformly to mean, ratio, and percentile metrics.

## Variance reduction for all metric types

CUPED at Datadog is not limited to simple mean-based metrics. The same framework reduces variance for mean, ratio, and percentile metrics, including metrics that target the tail of a distribution such as the 95th percentile of page load time. This is a meaningful advantage over regression-based implementations of CUPED, which do not naturally extend to percentile metrics. As a result, you get faster, more precise results even for latency and core web vitals measurements that are naturally expressed as percentiles.

## Frequently asked questions

### Does CUPED make modeling assumptions such as linear relationships, homoscedasticity, or no interactions?

No. The main assumption of CUPED is that the covariate means across variants are equal in expectation. The other assumptions it relies on are common to digital experimentation in general, such as no confounding through proper randomization, and sufficiently large samples for normality of the estimators by the central limit theorem.

### Should CUPED provide the same lift estimates, but with narrower confidence intervals?

No. If CUPED and non-CUPED estimates were always the same, the variance, and therefore the confidence intervals, would be the same as well. The fact that CUPED and non-CUPED results differ is the exact mechanism that drives the reduced variance of CUPED.

### If CUPED and non-CUPED results differ, which one should I trust?

Provided that CUPED's weak assumptions are met, CUPED results are more reliable: they have the same expectation as non-CUPED results, but with lower variance. Violations of CUPED's assumptions are easily avoided through proper data management practices, and there are also diagnostic checks to catch assumption violations, including pre-experiment imbalance and dimensional sample ratio mismatch.

<div class="alert alert-info">Decide whether the decision is based on the CUPED or non-CUPED result before the experiment starts, to avoid cherry-picking results.</div>

### Does CUPED correct for bias?

No, but there are caveats. CUPED assumes that the experiment is properly randomized, so it does not recover statistically valid estimates from systematically biased experiments. However, random covariate imbalances still arise in properly randomized experiments, and CUPED does correct for these imbalances in the sense that the CUPED-adjusted estimates are *conditionally* unbiased for a specific observed covariate imbalance.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf
[2]: /experiments/plan_and_launch_experiments/#choose-a-statistical-analysis-plan
