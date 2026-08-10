---
title: Cumulative Impact
description: Aggregate the noise-adjusted effect of every experiment a team has run against a metric to estimate the total movement over time.
aliases:
  - /product_analytics/experimentation/cumulative_impact/
  - /experiments/cumulative_impact
  - /experiments/cumulative_impact/
further_reading:
- link: "/experiments/reading_results"
  tag: "Documentation"
  text: "Reading Experiment Results"
- link: "/experiments/statistics/minimum_detectable_effect"
  tag: "Documentation"
  text: "Minimum Detectable Effects"
- link: "/experiments/statistics/analysis_methods"
  tag: "Documentation"
  text: "Analysis Methods"
---

## Overview

Teams running experiments need to understand how much they have cumulatively moved a metric over time. Adding up the observed lifts from successful experiments may seem like the natural way to do this, but it systematically overstates the true impact. Inflated estimates erode trust in experimentation and make it harder to evaluate progress honestly.

Cumulative Impact is a metric-level view that aggregates the effect of every experiment a team has run against a single metric and produces a noise-adjusted estimate of the total movement. It is available on the metric overview page alongside the existing metric trend, and it includes two new components: a cumulative impact chart and an effect distribution.

## Using cumulative impact

### Why naive aggregation overstates impact

The challenge of aggregating experiment results is known as the *winner's curse*: the systematic tendency of statistically significant results to overestimate the true effect. Because experiments with large measured lifts are more likely to reach significance and ship, a list of "winning" experiments is biased toward measurements that landed above the truth. Summing those measurements compounds the bias.

Historically, correcting for the winner's curse required data teams to build custom statistical models or rely on rules of thumb. Datadog Experiments performs this correction automatically by fitting a statistical model across all of your team's experiments on a metric and producing a corrected estimate of cumulative impact.

### Reading the cumulative impact chart

The cumulative impact chart shows how the metric has been moved across the selected time period. Set the **Time frame** picker to the window you want to evaluate, for example the past quarter, and the chart populates with the experiments that concluded during that window.

The chart reports two numbers prominently:

1. The number of experiments that ran during the window, and how many of those shipped a treatment variant.
2. The cumulative impact on the metric, expressed as either a relative or absolute improvement.

{{< img src="/product_analytics/experiment/cumulative_impact/cumulative_impact_overview.png" alt="The metric overview page showing the Cumulative Impact section with a time frame picker set to the past 6 months, a +5.58% cumulative impact value labeled with the number of winning experiments, and the cumulative impact chart plotted over time." style="width:90%;" >}}

Click **Including X winning experiments** to see the experiments used in the cumulative impact calculation. Selecting an experiment from the list opens its result page, where you can see the original measured lift, the shipping decision, and the corrected estimate used in the cumulative calculation. This makes it possible to trace any single contribution back to its source, which is useful when communicating impact to leadership or auditing program-level claims.

### Reading the effect distribution

To the right of the cumulative impact chart is the effect distribution. This is a visualization of the team's true effects on the metric. The center of the distribution describes the size of effect the team produces on an average experiment, and the spread describes how variable those effects tend to be.

{{< img src="/product_analytics/experiment/cumulative_impact/effect_distribution.png" alt="The Experiment Effect Distribution panel showing an average effect size of +0.55% across 10 concluded experiments, a standard deviation of 0.15%, and a bell-shaped curve centered above zero between -1% and +1%." style="width:80%;" >}}

The distribution is noise-adjusted: noisy results do not stretch the distribution wider than the data supports.

The effect distribution helps with two decisions:

- **Where to invest.** A team whose distribution sits well above zero on a particular metric is producing reliable lifts and may want to keep investing in this area. A team whose distribution straddles zero may want to redirect effort elsewhere.
- **How to size future experiments.** If a team routinely powers experiments for a 5% [minimum detectable effect][1], but the distribution suggests their true effects are typically within plus or minus 3%, the experiments are likely underpowered. Consider increasing sample sizes, broadening targeting, or focusing on opportunities with higher expected impact.

### Which experiments are included

Cumulative impact considers every experiment in the selected time window that targets the metric and has produced results. A few rules decide how each experiment contributes:

- **Model fit:** every experiment with non-failing diagnostics contributes to fitting the statistical model.
- **Aggregation:** only experiments that shipped a non-control variant contribute to the cumulative total. Experiments that shipped the control variant, or that ended without a shipping decision, are not summed.
- **Diagnostics:** experiments with failing diagnostics are excluded from the fit entirely. Experiments without diagnostics, or with passing or warning diagnostics, are included.

### Local and global views

For some metrics, you can switch between a *local* and a *global* view of cumulative impact.

The local view answers the question "how much did this metric move for the users who were exposed to each experiment?" It is the right view when comparing the size of effects across teams or surfaces, because it is not diluted by exposure size.

The global view answers the question "how much did this metric move across the entire user base?" It weights each experiment's corrected estimate by the share of users exposed to that experiment, producing a program-level estimate of the total movement. The global view is the right one when communicating organization-wide impact, because a strong lift on a small audience is correctly discounted relative to a smaller lift on a much larger audience.

Both views use the same corrected estimates and differ only in how those estimates are combined.

### Choosing a time frame

The time frame picker controls which experiments are included. A longer window includes more experiments, which strengthens the model fit and produces a smoother effect distribution, but it can also mix different team strategies if the team has changed direction.

A reasonable starting point is the period over which your team's experimentation strategy has been roughly consistent, often a quarter or half. Comparing windows can also be informative: a team whose effect distribution has shifted upward over time is producing larger true effects, not only more shipping decisions.

## Statistical details

This section describes the model that produces the corrected estimates and the effect distribution. It is intended for data scientists and statisticians who want to understand, audit, or reproduce the results.

### The hierarchical model

Datadog uses a hierarchical normal-normal model, a standard formulation for empirical Bayes meta-analysis. Let θ_i be the latent true effect of experiment i on the target metric, and let y_i be the lift estimated from that experiment, with known standard error σ_i. The model is:

```
y_i | θ_i  ~ Normal(θ_i, σ_i²)     (sampling distribution)
θ_i        ~ Normal(μ, τ²)         (population distribution of true effects)
```

The first line says that each experiment provides a noisy measurement of its own true effect, with noise level determined by the experiment's standard error. The second line says that the team's true effects are themselves drawn from a shared distribution with mean μ and variance τ². This shared distribution is what the UI shows as the *effect distribution*.

Marginalizing over the latent θ_i, the marginal likelihood for the observed lifts is:

```
y_i ~ Normal(μ, τ² + σ_i²)
```

This is what the optimizer fits.

### Priors

Datadog uses weakly informative priors on the population parameters. On the rescaled data (see below), the defaults are:

```
μ ~ Normal(0, 1)
τ ~ HalfCauchy(0, 0.25)
```

The normal prior on μ is wide enough to be uninformative on most metric scales after rescaling. The half-Cauchy prior on τ is a common choice for hierarchical scale parameters. It has support on the non-negative reals and concentrates mass near zero, which means the model favors homogeneity when the data is ambiguous. Its heavy tail allows large heterogeneity when the data supports it.

### Rescaling for numerical stability

Before fitting, the observed lifts and standard errors are rescaled to zero mean and unit variance. Let ȳ be the sample mean of the lifts and s_y their sample standard deviation. The optimizer works on the rescaled quantities:

```
ỹ_i = (y_i − ȳ) / s_y
σ̃_i = σ_i      / s_y
```

This means a single set of prior hyperparameters works across metrics whose natural scales differ by many orders of magnitude. After fitting, the estimates of μ and τ are transformed back to the original scale:

```
μ̂ = μ̃ · s_y + ȳ
τ̂ = τ̃ · s_y
```

### Fitting the model

The model parameters (μ, τ) are estimated by maximum a posteriori (MAP) estimation. To keep τ positive during optimization, the model is reparameterized as τ = exp(η) and the optimizer searches over (μ, η).

The objective is the negative log-posterior of (μ, η) given the observed lifts:

```
−log p(μ, η | data) = −[Σ_i log Normal(y_i | μ, τ² + σ_i²)]
                     − log Normal(μ | μ_prior_mean, μ_prior_sd²)
                     − log HalfCauchy(τ | τ_prior_scale)
                     − η                          (Jacobian of τ = exp(η))
```

Optimization uses Nelder-Mead, a gradient-free simplex method. This is a robust choice for a two-dimensional problem and avoids issues with finite-difference gradients near τ = 0.

### Corrected estimates (posterior means)

After (μ̂, τ̂) are fit, each experiment receives a corrected estimate equal to the posterior mean of its true effect under the fitted prior. The normal-normal conjugate update is a precision-weighted average of the observed lift and the population mean:

```
θ̂_i = (y_i / σ_i² + μ̂ / τ̂²) / (1 / σ_i² + 1 / τ̂²)
```

Equivalently, θ̂_i = (1 − w_i) · μ̂ + w_i · y_i where w_i = τ̂² / (τ̂² + σ_i²) is the weight placed on the observed lift. Experiments with tight intervals (small σ_i) keep most of their observed lift; experiments with wide intervals are pulled toward the population mean μ̂. This is the shrinkage step that corrects for the winner's curse.

### Aggregating to cumulative impact

The shrunken estimates are combined depending on whether the metric is naturally additive or multiplicative.

For relative lift metrics, the cumulative impact is computed multiplicatively:

```
Cumulative relative impact = ∏ (1 + θ̂_i) − 1
```

For absolute-difference metrics, the cumulative impact is the sum of the shrunken estimates:

```
Cumulative absolute impact = Σ θ̂_i
```

Only experiments that shipped a non-control variant are included in the sum or product. The chart in the UI plots a running version of this sum or product, ordered by experiment end date, so you can see how impact accumulated over time.

### Coverage weighting (global view)

The global view uses the same shrunken estimates but weights each by the experiment's *coverage*, the share of the eligible user base that was exposed to it. Letting c_i be the coverage of experiment i:

```
Global relative impact = ∏ (1 + c_i · θ̂_i) − 1
Global absolute impact = Σ c_i · θ̂_i
```

Coverage weighting is what turns a per-exposed-user estimate into a program-level estimate. Experiments without a recorded coverage value are omitted from the global view but still contribute to the local view and to the model fit.

### Diagnostic eligibility

Before the model is fit, each experiment is checked against its diagnostics. Diagnostics flag problems with experiment quality, such as severe assignment imbalance, mixed assignments across variants, or missing metric data. An experiment is *eligible* if its rolled-up diagnostic status is anything other than FAIL. Experiments without any diagnostic rows are treated as eligible.

Failing experiments are excluded from the model fit and from the cumulative aggregation entirely. They are not pulled toward the population mean and then summed; they are dropped. This prevents unreliable measurements from contaminating either the cumulative total or the effect distribution.

### Minimum sample size

The model requires at least five eligible experiments. With fewer experiments, the MAP estimate of τ is unstable and the resulting shrinkage is unreliable. When this threshold is not met, no cumulative impact value or effect distribution is displayed.

## Troubleshooting

### Charts not showing

Cumulative impact requires at least five experiments with non-failing diagnostics to fit the model. If fewer than five eligible experiments are available, Datadog does not display a cumulative impact value. Extend the time frame or run more experiments against the metric to resolve this.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/statistics/minimum_detectable_effect/
