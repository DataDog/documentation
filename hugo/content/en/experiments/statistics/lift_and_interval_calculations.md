---
title: Lift and Interval Calculations
description: How Datadog estimates absolute and relative lift and calculates fixed-sample, sequential, and Bayesian intervals.
further_reading:
- link: "/experiments/statistics/analysis_methods"
  tag: "Documentation"
  text: "Analysis Methods"
- link: "/experiments/statistics/cuped"
  tag: "Documentation"
  text: "CUPED: Variance Reduction Technique"
- link: "/experiments/statistics/multiple_testing_correction"
  tag: "Documentation"
  text: "Multiple Testing Correction"
- link: "/experiments/reading_results"
  tag: "Documentation"
  text: "Reading Experiment Results"
---

{{< jqmath-vanilla >}}

## Overview

This page is a reference for readers who want to reproduce or validate Datadog's calculations. For a conceptual overview of each method, see [Analysis Methods][8].

Datadog Experiments estimates how a treatment changes a metric compared with a control. The result includes a point estimate of the effect and an interval describing its uncertainty.

Fixed-sample, sequential, and Bayesian analysis start with the same observed effect and estimated sampling variance. Sequential hybrid analysis combines the sequential and fixed-sample methods. The frequentist methods report the observed effect as the point estimate. Bayesian analysis combines this evidence with a prior and reports the posterior mean.

This page describes the calculations for both **absolute lift**, also called the **difference in means**, and **relative lift**.

The examples on this page all use one conversion metric. Each group has 10,000 subjects. The control conversion rate is 10%, and the treatment conversion rate is 12%. Each section applies its method to these numbers, so you can compare the results.

## Estimate the metric in each group

Before comparing groups, Datadog calculates each group's metric value and how precisely that value is measured. This section also defines the notation used throughout the page.

- $C$ is control and $T$ is treatment.
- Greek letters are population quantities (estimands).
- A hat marks a plug-in estimate calculated from the observed data.
- Uppercase letters are random variables, and lowercase letters are observed values. In the Bayesian sections, $Θ$ is the random effect.
- Lowercase $m$ is a mean, $s$ is a subject-level standard deviation, $v$ is a sampling variance, and $q$ is a sampling covariance. Subscripts identify the quantity.

Let $n\_C$ and $n\_T$ be the numbers of subjects in control and treatment. For subject $i$ in control, $Y\_{Ci}$ is the random metric value and $y\_{Ci}$ its observed value. Define $Y\_{Tj}$ and $y\_{Tj}$ similarly for subject $j$ in treatment. The population means are $μ\_C=E[Y\_{Ci}]$ and $μ\_T=E[Y\_{Tj}]$.

The observed sample means for control and treatment are:

$$m\_C = {∑\_{i=1}^{n\_C} y\_{Ci}}/{n\_C}$$

$$m\_T = {∑\_{j=1}^{n\_T} y\_{Tj}}/{n\_T}$$

For a non-ratio mean metric, Datadog estimates the subject-level variance in each group from the squared deviations around its mean:

$$s\_C^2 = {∑\_{i=1}^{n\_C} (y\_{Ci}-m\_C)^2}/{n\_C}$$

$$s\_T^2 = {∑\_{j=1}^{n\_T} (y\_{Tj}-m\_T)^2}/{n\_T}$$

These variances describe variation between subjects within each group.

Dividing each subject-level variance by its group sample size gives the estimated sampling variance of the mean:

$$v\_C = s\_C^2/n\_C$$

$$v\_T = s\_T^2/n\_T$$

These sampling variances describe uncertainty in the estimated control and treatment means. Their square roots give the standard errors:

$$\text\"SE\"(m\_C) = √{v\_C} = s\_C/√{n\_C}$$

$$\text\"SE\"(m\_T) = √{v\_T} = s\_T/√{n\_T}$$

In the example, $m\_C=0.10$ and $m\_T=0.12$. For a conversion metric, the subject-level variance is $m(1-m)$, so $v\_C=0.10×0.90/10000=0.0000090$ and $v\_T=0.12×0.88/10000=0.00001056$. The standard errors are $\text\"SE\"(m\_C)=0.0030$ and $\text\"SE\"(m\_T)≈0.0032$.

In the following sections, the subscript $g$ refers to either group, $C$ or $T$.

With sufficiently large samples and suitable moment and independence assumptions, the central limit theorem motivates a normal approximation for the sampling distribution of each group mean. The individual metric values do not need to be normally distributed.

### Ratio metrics

If your metric is not a ratio metric, you can skip this section.

A ratio metric compares two aggregate quantities within a group. For example, average order value is total revenue divided by total orders. It is a ratio of sums, rather than an average of each subject's revenue-to-order ratio.

Within one group, let $Y\_i$ and $Z\_i$ be the numerator and denominator random variables, with population means $μ\_Y$ and $μ\_Z$. Their observed sample means are $m\_Y$ and $m\_Z$. The ratio estimand is $μ\_Y/μ\_Z$, and its estimate is:

$$r = {m\_Y}/{m\_Z}$$

Let $v\_Y$ and $v\_Z$ be the estimated sampling variances of those means, and let $q\_{YZ}$ be their estimated covariance. The [delta method][1] gives the sampling variance of the ratio:

$$v\_r ≈ v\_Y/{m\_Z^2} + {m\_Y^2 v\_Z}/{m\_Z^4} - {2m\_Y q\_{YZ}}/{m\_Z^3}$$

The covariance matters because a subject can contribute to both quantities. It is calculated at the mean level: the subject-level covariance divided by the number of subjects.

The resulting metric estimate $r$ and sampling variance $v\_r$ replace the non-ratio mean and its sampling variance in the lift calculations in the following section. Do not divide this variance by sample size again.

### Percentile metrics

If your metric is not a percentile metric, you can skip this section.

A percentile metric describes a point in the metric distribution, such as p95 latency, rather than its mean. Let $ξ\_{g,p}$ denote the population percentile at probability $p$ in group $g$, and $ξ↖{\\^}\_{g,p}$ its estimate. For p95, $p=0.95$.

Datadog estimates uncertainty in a percentile using the fraction of observations at or below the estimated percentile and the estimated density at that point. Let $v\_{g,\text\"fraction\"}$ be the sampling variance of that fraction and $f↖{\\^}\_g$ the estimated density. The [delta method][1] gives:

$$v\_{g,\text\"percentile\"} ≈ v\_{g,\text\"fraction\"}/{f↖{\\^}\_g(ξ↖{\\^}\_{g,p})^2}$$

For a per-subject percentile, the fraction is the average of indicators for whether each subject's value is at or below the threshold. For a per-event percentile, it is a ratio of event counts, with contributions aggregated by subject to account for dependence between a subject's events.

A lower density at the percentile means greater uncertainty in its estimated value for the same fraction variance. The density estimate must be positive. The resulting percentile estimate and sampling variance enter the lift and interval calculations in the following sections in place of the group mean and its sampling variance.

## Estimate the lift

Datadog calculates both forms of lift from the group estimates and their sampling variances.

Let $q$ be the estimated covariance between the group estimates. For independent groups without variance reduction, $q=0$. For ratio metrics, substitute the group ratio estimates $r\_C$ and $r\_T$ for $m\_C$ and $m\_T$ in the following formulas, with the corresponding ratio sampling variances and covariance. The population quantities $μ\_C$ and $μ\_T$ then represent the population ratios. For percentile metrics, make the corresponding substitution with the group percentile estimates and variances. Absolute lift is then a difference in percentiles.

### Absolute lift: difference in means

Absolute lift is the treatment value minus the control value, expressed in the metric's units.

The absolute-lift estimand is $δ=μ\_T-μ\_C$. Its estimate, denoted $δ↖{\\^}$, is:

$$δ↖{\\^} = m\_T-m\_C$$

$$v\_δ = v\_T+v\_C-2q$$

$$\text\"SE\"(δ↖{\\^}) = √{v\_δ}$$

If the control conversion rate is 10% and the treatment rate is 12%, absolute lift is 0.02, or **2 percentage points**. In the example, $v\_δ=0.00001956$ and $\text\"SE\"(δ↖{\\^})≈0.0044$.

### Relative lift

Relative lift expresses the effect as a fraction of the control value. For a nonzero control mean, the relative-lift estimand is $λ=(μ\_T-μ\_C)/μ\_C$. Its plug-in estimate is:

$$λ↖{\\^} = {m\_T-m\_C}/{m\_C}$$

Equivalently, $λ↖{\\^}=m\_T/m\_C-1$.

Applying the [delta method][1] to relative lift gives the sampling variance:

$$v\_λ ≈ v\_T/m\_C^2 + {m\_T^2 v\_C}/m\_C^4 - {2m\_T q}/m\_C^3$$

$$\text\"SE\"(λ↖{\\^}) = √{v\_λ}$$

For a control conversion rate of 10% and a treatment conversion rate of 12%, relative lift is $(0.12-0.10)/0.10=0.20$, or **20%**. Multiply a relative estimate and both interval endpoints by 100 to express them as percentages. In the example, $v\_λ≈0.00235$ and $\text\"SE\"(λ↖{\\^})≈0.0485$.

<div class="alert alert-warning">The relative-lift standard error is not generally the absolute-lift standard error divided by the observed control mean. Likewise, a relative-lift interval is not generally obtained by dividing an absolute-lift interval by the control mean.</div>

In the example, dividing the absolute-lift standard error by the control mean gives $0.0044/0.10=0.044$. This is smaller than the relative-lift standard error of $0.0485$ because it ignores uncertainty in the control mean.

### Variance reduction with CUPED

[CUPED][9] reduces noise in experiment results by adjusting for each subject's pre-experiment behavior, which produces narrower intervals.

When CUPED is enabled, Datadog uses adjusted group estimates and their sampling variances. For a group with average adjustment $m\_{a,g}$ and experiment-wide average adjustment $m\_{a,\text\"pool\"}$, the adjusted metric estimate is:

$$m\_g^{\text\"adj\"} = m\_g-(m\_{a,g}-m\_{a,\text\"pool\"})$$

The shared pooled adjustment can introduce covariance between the adjusted control and treatment estimates. The lift formulas retain the covariance term $q$ to account for this dependence. Each interval method then uses the adjusted effect estimate and standard error.

## Calculate the interval

An interval describes the range of effects that are consistent with the data. Each analysis method builds this interval differently, as summarized in the following table. The sections after the table give the formulas.

| Method | Point estimate | Interval | Valid to check results before the planned end? |
|---|---|---|---|
| Fixed-sample | Observed effect | Confidence interval: observed effect ± 1.96 standard errors at 95% | No |
| Sequential | Observed effect | Confidence sequence, wider than fixed-sample, with width that depends on sample size | Yes |
| Sequential hybrid | Observed effect | Sequential interval during the experiment, fixed-sample interval at the planned end, each at half the significance level | Yes |
| Bayesian | Posterior mean, pulled toward zero by the prior | Credible interval | Not applicable |

Let $θ↖{\\^}$ denote the observed plug-in effect estimate: either $δ↖{\\^}$ for absolute lift or $λ↖{\\^}$ for relative lift. Let $v\_θ$ denote its estimated sampling variance and $√{v\_θ}$ its standard error. Write the unknown population effect as $θ$: either $δ$ or $λ$. Let $X$ be the random estimator whose observed value is $θ↖{\\^}$.

The common normal approximation for the sampling distribution is:

$$X ∼ N(θ,σ^2)$$

Here $σ^2$ is the sampling variance of $X$, estimated by $v\_θ$. The interval calculations substitute $v\_θ$ for $σ^2$.

Let $c$ be the interval level and $α=1-c$. For a 95% interval, $α=0.05$.

### Fixed-sample frequentist analysis

Fixed-sample analysis is valid when you evaluate results one time, at the planned end of the experiment. It uses a normal interval around the observed effect:

$$z\_{1-α/2} = Φ^{-1}(1-α/2)$$

$$l=θ↖{\\^}-z\_{1-α/2}√{v\_θ}$$

$$u=θ↖{\\^}+z\_{1-α/2}√{v\_θ}$$

Here $Φ$ is the standard normal cumulative distribution function. At 95% confidence, $z\_{1-α/2}$ is approximately 1.96.

Under the approximation's assumptions, a 95% confidence procedure covers the fixed population effect in approximately 95% of repeated experiments. This is a property of the procedure, rather than a posterior probability assigned to the particular interval after observing data.

The two-sided test of zero effect uses:

$$z\_{\text\"obs\"}=θ↖{\\^}/√{v\_θ}$$

$$\text\"p-value\"=2(1-Φ(|z\_{\text\"obs\"}|))$$

In the example, the 95% interval for absolute lift is $0.02±1.96×0.0044$, or **[0.011, 0.029]**. For relative lift, it is $0.20±1.96×0.0485$, or **[10.5%, 29.5%]**.

<div class="alert alert-warning">Repeatedly checking a fixed-sample result and stopping when the interval excludes zero increases the false-positive rate. To check results while the experiment is running, use sequential or sequential hybrid analysis.</div>

### Sequential frequentist analysis

Sequential analysis lets you check results at any time without increasing the false-positive rate. Datadog reports the observed effect as the point estimate. In place of the fixed normal critical value, it uses a bound that depends on sample size, which produces wider intervals.

The boundary follows the normal-mixture construction of [Howard et al. (2021)][2]. For the control-treatment comparison, let $t=n\_C+n\_T$. Datadog calculates:

$$a=-2\ln(α)$$

$$ρ={10000}/{a+\ln(1+a)}-1$$

$$b(t,α)=√{{t+ρ}/t (\ln({t+ρ}/ρ)+a)}$$

The interval is:

$$l\_t=θ↖{\\^}\_t-√{v\_{θ,t}} b(t,α)$$

$$u\_t=θ↖{\\^}\_t+√{v\_{θ,t}} b(t,α)$$

Here $θ↖{\\^}\_t$ and $v\_{θ,t}$ are the effect estimate and its sampling variance after $t$ subjects.

The value 10,000 in the $ρ$ formula is a tuning parameter for the boundary. It is unrelated to the example's group size and is not a required minimum sample size.

In the example, $t=20000$ and $b(t,0.05)≈3.06$, compared with 1.96 for fixed-sample analysis. The 95% interval for absolute lift is **[0.006, 0.034]**, and for relative lift it is **[5.2%, 34.8%]**.

Let $L\_t$ and $U\_t$ denote the random interval endpoints, with observed values $l\_t$ and $u\_t$. The confidence-sequence objective is to cover the same population effect across analysis times, rather than only at one predetermined time:

$$P(L\_t≤θ≤U\_t \text\" for all analysis times \")≥1-α$$

Datadog uses the normal-mixture boundary with estimated sampling variances and, for relative lift, a delta-method approximation. See [Waudby-Smith et al. (2024)][3] for the theory of asymptotic confidence sequences. The boundary's validity depends on these approximations. It does not guarantee exact finite-sample coverage for every metric distribution.

The sequential p-value is obtained by inverting the sequential boundary: finding the significance level at which the interval reaches zero. It is not the fixed-sample normal-tail p-value calculated from $z\_{\text\"obs\"}$.

### Sequential hybrid analysis

The hybrid method uses sequential inference while the experiment is running or has ended early, and fixed-sample inference when it reaches its planned end. It divides the significance budget between these two branches.

For an overall significance level $α$, each branch uses $α/2$. For example, an overall 95% level uses a 97.5% interval within the selected branch. The reported branch p-value is multiplied by two and capped at one.

In the example, the sequential branch uses $b(t,0.025)≈3.30$ before the planned end. It gives **[0.005, 0.035]** for absolute lift and **[4.0%, 36.0%]** for relative lift. At the planned end, the fixed-sample branch uses $z\_{0.9875}≈2.24$. It gives **[0.010, 0.030]** for absolute lift and **[9.1%, 30.9%]** for relative lift.

### Bayesian analysis

Bayesian analysis combines the experiment data with a prior assumption that most effects are small, so small or noisy effects are pulled toward zero. Datadog reports the posterior mean as the point estimate and an equal-tailed **credible interval** for uncertainty.

#### Normal prior

A normal prior gives a closed-form posterior. In Bayesian analysis, the uncertain effect is represented by the random variable $Θ$. For a normal prior with mean $m\_{\text\"prior\"}$ and variance $τ^2$:

$$Θ∼N(m\_{\text\"prior\"},τ^2)$$

The [normal conjugate update][4] gives a normal posterior, with mean $m\_{\text\"post\"}$ and variance $v\_{\text\"post\"}$:

$$v\_{\text\"post\"}={1}/{1/τ^2+1/v\_θ}$$

$$m\_{\text\"post\"}=v\_{\text\"post\"}(m\_{\text\"prior\"}/τ^2+θ↖{\\^}/v\_θ)$$

The normal prior used by Datadog is centered at zero. In that case:

$$m\_{\text\"post\"}={τ^2}/{τ^2+v\_θ}θ↖{\\^}$$

This shrinkage factor moves the observed effect toward zero. The adjustment is stronger when the observed estimate is uncertain relative to the prior. As the sampling variance decreases, the posterior mean approaches the observed effect.

#### Prior scale for relative and absolute lift

The default Bayesian prior is normal, centered at zero, with a configured standard deviation of 0.05. For relative lift, this standard deviation is on the relative-lift scale, which corresponds to a relative lift of 5%. Organization or experiment settings can override the default.

For absolute lift, Datadog multiplies the configured prior standard deviation $k$ by a pooled scale:

$$s\_{\text\"pool\"}^2={n\_C^2 v\_C+n\_T^2 v\_T}/{n\_C+n\_T}$$

$$τ=k s\_{\text\"pool\"}$$

For ordinary, unadjusted mean metrics, this equals the sample-size-weighted pooled subject-level variance. With other metric estimators or CUPED, it is calculated from their group sampling variances using the same expression.

This scaling expresses the prior in standardized-effect units and converts it to the metric's units. Its interpretation as inference on a standardized mean difference uses a small-effect, equal-variance approximation.

Relative and absolute lift have separate likelihood variances and prior scales, so Datadog computes their Bayesian estimates and intervals separately. Don't convert one into the other by multiplying or dividing by the observed control mean.

In the example, the relative-lift prior has $τ=0.05$. The observed relative lift of 20% is large compared with this prior, so the posterior mean is pulled to about **10.3%**. The 95% credible interval is **[3.5%, 17.1%]**. For absolute lift, $s\_{\text\"pool\"}≈0.313$ and $τ≈0.0156$. The posterior mean is about **0.0185**, with a 95% credible interval of **[0.010, 0.027]**.

#### Interpreting the absolute-lift prior as a sample size

Scaling the absolute-lift prior by $s\_{\text\"pool\"}$ lets you interpret the normal prior's strength in terms of sample size. For an unadjusted mean metric, suppose both groups have equal variances and contain $n$ subjects each. With configured prior standard deviation $k$, prior and likelihood precision are equal when:

$$n=2/k^2$$

At the default $k=0.05$, this is **800 subjects per group**, or **1,600 subjects total**. At that point, the posterior mean is halfway between zero and the observed absolute lift. Larger samples give the likelihood more weight; smaller samples give the prior more weight. This is a measure of prior strength, not a minimum sample size or a power calculation. With 10,000 subjects per group, the example's absolute-lift posterior mean of 0.0185 stays close to the observed 0.02.

This interpretation assumes a normal prior, equal group sizes, and equal variances. It does not directly describe the effect-dependent shrinkage of a Student's t prior.

#### Credible interval and probability of an effect

For a normal posterior, the equal-tailed interval is:

$$l=m\_{\text\"post\"}-z\_{1-α/2}√{v\_{\text\"post\"}}$$

$$u=m\_{\text\"post\"}+z\_{1-α/2}√{v\_{\text\"post\"}}$$

Conditional on the prior, model, and observed data, this interval contains posterior probability $c$. This differs from the repeated-experiment coverage interpretation of a frequentist confidence interval.

The posterior also gives the probability of a positive effect:

$$P(Θ>0∣\text\"data\")=Φ(m\_{\text\"post\"}/√{v\_{\text\"post\"}})$$

A positive effect means the metric increased. Whether that is desirable depends on the metric: an increase in conversion and an increase in latency have different business interpretations.

#### Student's t prior

The Student's t prior is centered at zero and has heavier tails than a normal prior, allowing more probability for large treatment effects. Datadog combines this prior with the observed effect and its uncertainty to obtain a posterior distribution. The reported estimate is the posterior mean, and the credible interval contains the specified proportion of posterior probability, with equal probability in each tail.

This prior is useful when you expect effects to be near zero but want to allow for occasional large effects. Compared with a normal prior, its heavier tails can reduce shrinkage of large effects when the data support them. The degrees of freedom control the tail weight: smaller values allow heavier tails, while larger values approach a normal prior. The prior standard deviation controls its overall spread and uses the relative-lift or absolute-lift scaling described in [Prior scale for relative and absolute lift](#prior-scale-for-relative-and-absolute-lift).

Unlike the normal prior, the Student's t prior does not yield elementary closed-form expressions for the posterior mean and credible interval under a normal likelihood. Datadog computes numerical approximations to these quantities.

## Multiple testing correction

When an experiment tests several metrics or variants, Datadog adjusts each comparison's significance level to limit the overall false-positive rate. The frequentist interval formulas use this adjusted level, including both branches of hybrid analysis. For how the level is allocated, see [Multiple Testing Correction][5]. Bayesian analysis does not support this correction.

## When the approximations become unreliable

Ratio calculations require a denominator sufficiently far from zero. Datadog flags a denominator as unreliable when its standard error divided by the magnitude of its estimated mean exceeds 0.1. This is a practical reliability criterion associated with [Kuethe et al. (2000)][6] and discussed by [Díaz-Francés and Rubio (2013)][7], rather than a universal guarantee of a normal approximation. For relative lift, this check also applies to the control metric estimate:

$$\text\"SE\"(m\_C)/|m\_C|>0.1$$

In the example, $\text\"SE\"(m\_C)/|m\_C|=0.0030/0.10=0.03$, so the relative-lift approximation is reliable.

<div class="alert alert-warning">Relative lift is unreliable when the control mean is close to zero relative to its standard error. Neither a different interval method nor a prior resolves a denominator that is too close to zero for a reliable relative-lift approximation.</div>

For ratio metrics, checks also apply to the within-group denominators. A zero denominator prevents the corresponding ratio calculation. Zero numerator variance can also prevent estimation.

A narrow interval is informative only when the experiment design, data, and statistical approximations are appropriate.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://alexdeng.github.io/public/files/kdd2018-dm.pdf
[2]: https://arxiv.org/abs/1810.08240
[3]: https://arxiv.org/abs/2103.06476
[4]: https://www.cs.ubc.ca/~murphyk/Papers/bayesGauss.pdf
[5]: /experiments/statistics/multiple_testing_correction/
[6]: https://doi.org/10.1152/jappl.2000.88.6.2279
[7]: https://doi.org/10.1007/s00362-012-0429-2
[8]: /experiments/statistics/analysis_methods/
[9]: /experiments/statistics/cuped/
