---
title: Statistical Nitty-Gritty
description: How Datadog estimates absolute and relative lift and calculates fixed-sample, sequential, and Bayesian intervals.
---

{{< jqmath-vanilla >}}

Datadog Experiments estimates how a treatment changes a metric compared with a control. The result includes a point estimate of the effect and an interval describing its uncertainty.

Fixed-sample, sequential, and Bayesian analysis start with the same observed effect and estimated sampling variance. Fixed-sample and sequential analysis report the observed effect as the point estimate. Bayesian analysis combines this evidence with a prior and reports the posterior mean.

This page describes the calculations for both **absolute lift**, also called the **difference in means**, and **relative lift**.

## Estimate the metric in each group

Let $C$ denote control and $T$ denote treatment. Greek letters denote population quantities (estimands); a hat denotes a plug-in estimate of an effect, calculated from the observed data. Uppercase letters denote random variables; lowercase letters denote observed values. Lowercase $m$ denotes a mean, with subscripts identifying the quantity.

Let $n\_C$ and $n\_T$ be the numbers of subjects in control and treatment. For subject $i$ in control, $Y\_{Ci}$ is the random metric value and $y\_{Ci}$ its observed value. Define $Y\_{Tj}$ and $y\_{Tj}$ similarly for subject $j$ in treatment. The population means are $μ\_C=E[Y\_{Ci}]$ and $μ\_T=E[Y\_{Tj}]$.

The observed sample means for control and treatment are:

$$m\_C = {∑\_{i=1}^{n\_C} y\_{Ci}}/{n\_C}$$

$$m\_T = {∑\_{j=1}^{n\_T} y\_{Tj}}/{n\_T}$$

For a non-ratio mean metric, Datadog estimates the subject-level variance in each group from the first and second moments:

$$s\_C^2 = {∑\_{i=1}^{n\_C} y\_{Ci}^2}/{n\_C} - m\_C^2$$

$$s\_T^2 = {∑\_{j=1}^{n\_T} y\_{Tj}^2}/{n\_T} - m\_T^2$$

These variances describe variation between subjects within each group. Datadog uses the moment variance with divisor $n\_C$ or $n\_T$, without the corresponding $n/(n-1)$ correction.

Dividing each subject-level variance by its group sample size gives the estimated sampling variance of the mean:

$$v\_C = s\_C^2/n\_C$$

$$v\_T = s\_T^2/n\_T$$

These sampling variances describe uncertainty in the estimated control and treatment means. Their square roots give the standard errors:

$$\text\"SE\"(m\_C) = √{v\_C} = s\_C/√{n\_C}$$

$$\text\"SE\"(m\_T) = √{v\_T} = s\_T/√{n\_T}$$

Below, the subscript $g$ refers to either group, $C$ or $T$.

With sufficiently large samples and suitable moment and independence assumptions, the central limit theorem motivates a normal approximation for the sampling distribution of each group mean. The individual metric values do not need to be normally distributed.

### Ratio metrics

A ratio metric compares two aggregate quantities within a group. For example, average order value is total revenue divided by total orders. It is a ratio of sums, rather than an average of each subject's revenue-to-order ratio.

Within one group, let $Y\_i$ and $Z\_i$ be the numerator and denominator random variables, with population means $μ\_Y$ and $μ\_Z$. Their observed sample means are $m\_Y$ and $m\_Z$. The ratio estimand is $μ\_Y/μ\_Z$, and its estimate is:

$$r = {m\_Y}/{m\_Z}$$

Let $v\_y$ and $v\_z$ be the estimated sampling variances of those means, and let $q\_{yz}$ be their estimated covariance. The delta method gives:

$$v ≈ v\_y/{m\_Z^2} + {m\_Y^2 v\_z}/{m\_Z^4} - {2m\_Y q\_{yz}}/{m\_Z^3}$$

The covariance matters because a subject can contribute to both quantities. It is calculated at the mean level: the subject-level covariance divided by the number of subjects.

The resulting metric estimate $r$ and sampling variance $v$ replace the non-ratio mean and its sampling variance in the lift calculations below. Do not divide this variance by sample size again.

## Estimate the lift

Write the observed group means as $m\_C$ and $m\_T$, their estimated sampling variances as $v\_C$ and $v\_T$, and their estimated covariance as $q$. For independent groups without variance reduction, $q=0$. For ratio metrics, substitute the group ratio estimates $r\_C$ and $r\_T$ for $m\_C$ and $m\_T$ in the formulas below, with the corresponding ratio sampling variances and covariance. The population quantities $μ\_C$ and $μ\_T$ then represent the population ratios.

### Absolute lift: difference in means

The absolute-lift estimand is $δ=μ\_T-μ\_C$. Its estimate, denoted $δ↖{\\^}$, is:

$$δ↖{\\^} = m\_T-m\_C$$

$$v\_δ = v\_T+v\_C-2q$$

$$\text\"SE\"(δ↖{\\^}) = √{v\_δ}$$

Absolute lift is expressed in the metric's units. If the control conversion rate is 10% and the treatment rate is 12%, absolute lift is 0.02, or **2 percentage points**.

### Relative lift

Relative lift expresses the effect as a fraction of the control value. For a nonzero control mean, the relative-lift estimand is $λ=(μ\_T-μ\_C)/μ\_C$. Its plug-in estimate is:

$$λ↖{\\^} = {m\_T-m\_C}/{m\_C}$$

Equivalently, $λ↖{\\^}=m\_T/m\_C-1$.

The delta-method sampling variance is:

$$v\_λ ≈ v\_T/m\_C^2 + {m\_T^2 v\_C}/m\_C^4 - {2m\_T q}/m\_C^3$$

$$\text\"SE\"(λ↖{\\^}) = √{v\_λ}$$

For the conversion example above, relative lift is $(0.12-0.10)/0.10=0.20$, or **20%**. Multiply a relative estimate and both interval endpoints by 100 to express them as percentages.

Relative lift accounts for uncertainty in both group estimates. Its standard error is not generally the absolute-lift standard error divided by the observed control mean. Likewise, a relative-lift interval is not generally obtained by dividing an absolute-lift interval by the control mean.

### Variance reduction with CUPED

When CUPED is enabled, Datadog uses adjusted group estimates and their sampling variances. For a group with average adjustment $m\_{a,g}$ and experiment-wide average adjustment $m\_{a,\text\"pool\"}$, the adjusted metric estimate is:

$$m\_g^{\text\"adj\"} = m\_g-(m\_{a,g}-m\_{a,\text\"pool\"})$$

The shared pooled adjustment can introduce covariance between the adjusted control and treatment estimates. The lift formulas retain the covariance term $q$ to account for this dependence. The interval methods below then use the adjusted effect estimate and standard error.

## Calculate the interval

Let $θ↖{\\^}$ denote the observed plug-in effect estimate: either $δ↖{\\^}$ for absolute lift or $λ↖{\\^}$ for relative lift. Let $v$ denote its estimated sampling variance and $s=√v$ its standard error. Write the unknown population effect as $θ$: either $δ$ or $λ$. Let $X$ be the random estimator whose observed value is $θ↖{\\^}$.

The common normal approximation for the sampling distribution is:

$$X ∼ N(θ,σ^2)$$

Here $σ^2$ is the sampling variance of $X$, estimated by $v$. The interval calculations substitute $v$ for $σ^2$.

In this notation, the second parameter of $N$ is a variance. Let $c$ be the interval level and $α=1-c$. For a 95% interval, $α=0.05$.

### Fixed-sample frequentist analysis

Fixed-sample analysis uses a normal interval around the observed effect:

$$z\_{1-α/2} = Φ^{-1}(1-α/2)$$

$$l=θ↖{\\^}-z\_{1-α/2}s$$

$$u=θ↖{\\^}+z\_{1-α/2}s$$

Here $Φ$ is the standard normal cumulative distribution function. At 95% confidence, $z\_{1-α/2}$ is approximately 1.96.

Under the approximation's assumptions, a 95% confidence procedure covers the fixed population effect in approximately 95% of repeated experiments. This is a property of the procedure, rather than a posterior probability assigned to the particular interval after observing data.

The two-sided test of zero effect uses:

$$z\_{\text\"obs\"}=θ↖{\\^}/s$$

$$p=2(1-Φ(|z\_{\text\"obs\"}|))$$

A fixed-sample interval supports inference at the planned analysis point. Repeatedly checking it and stopping when it excludes zero does not preserve the same false-positive rate.

### Sequential frequentist analysis

Sequential analysis accounts for repeated examination of results. It retains the observed effect as its point estimate and replaces the fixed normal critical value with a sample-size-dependent bound.

For the control-treatment comparison, let $t=n\_C+n\_T$. Datadog calculates:

$$a=-2\ln(α)$$

$$ρ={10000}/{a+\ln(1+a)}-1$$

$$b(t,α)=√{{t+ρ}/t (\ln({t+ρ}/ρ)+a)}$$

The interval is:

$$l\_t=θ↖{\\^}\_t-s\_t b(t,α)$$

$$u\_t=θ↖{\\^}\_t+s\_t b(t,α)$$

The value 10,000 is a tuning parameter for the boundary; it is not a required minimum sample size.

Let $L\_t$ and $U\_t$ denote the random interval endpoints, with observed values $l\_t$ and $u\_t$. The confidence-sequence objective is to cover the same population effect across analysis times, rather than only at one predetermined time:

$$P(L\_t≤θ≤U\_t \text\" for all analysis times \")≥1-α$$

Datadog uses the normal-mixture boundary with estimated sampling variances and, for relative lift, a delta-method approximation. Its use therefore depends on those approximations being appropriate; it does not establish exact finite-sample coverage for arbitrary metric distributions.

Sequential intervals are wider than fixed-sample intervals at the same nominal level to account for repeated looks. The sequential p-value is obtained by inverting the sequential boundary: finding the significance level at which the interval reaches zero. It is not the fixed-sample normal-tail p-value calculated from $z\_{\text\"obs\"}$.

### Sequential-fixed hybrid analysis

The hybrid method uses sequential inference while the experiment is running or has ended early, and fixed-sample inference when it reaches its planned end. It divides the significance budget between these two branches.

For an overall significance level $α$, each branch uses $α/2$. Thus an overall 95% level uses a 97.5% interval within the selected branch. The reported branch p-value is multiplied by two and capped at one.

### Bayesian analysis

Bayesian analysis uses the normal likelihood for the effect to update a prior distribution. It reports the posterior mean as the point estimate and an equal-tailed **credible interval** for uncertainty.

#### Normal prior

In Bayesian analysis, the uncertain effect is represented by the random variable $Θ$. For a normal prior with mean $m\_0$ and variance $τ^2$:

$$Θ∼N(m\_0,τ^2)$$

The posterior is normal, with mean $m\_p$ and variance $v\_p$:

$$v\_p={1}/{1/τ^2+1/v}$$

$$m\_p=v\_p(m\_0/τ^2+θ↖{\\^}/v)$$

The normal prior used by Datadog is centered at zero. In that case:

$$m\_p={τ^2}/{τ^2+v}θ↖{\\^}$$

This moves the observed effect toward zero. The adjustment is stronger when the observed estimate is uncertain relative to the prior. As the sampling variance decreases, the posterior mean approaches the observed effect.

#### Prior scale for relative and absolute lift

For relative lift, the configured prior standard deviation is already on the relative-lift scale. For example, a standard deviation of 0.05 represents five percentage points on that scale.

For absolute lift, Datadog multiplies the configured prior standard deviation $k$ by a pooled scale:

$$s\_{\text\"pool\"}^2={n\_C^2 v\_C+n\_T^2 v\_T}/{n\_C+n\_T}$$

$$τ=k s\_{\text\"pool\"}$$

For ordinary, unadjusted mean metrics, this equals the sample-size-weighted pooled subject-level variance. With other metric estimators or CUPED, it is calculated from their group sampling variances using the same expression.

This scaling expresses the prior in standardized-effect units and converts it to the metric's units. Its interpretation as inference on a standardized mean difference uses a small-effect, equal-variance approximation.

Relative and absolute lift have separate likelihood variances and prior scales. Their Bayesian estimates and intervals are therefore computed separately; one should not be converted into the other by multiplying or dividing by the observed control mean.

#### Credible interval and probability of an effect

For a normal posterior, the equal-tailed interval is:

$$l=m\_p-z\_{1-α/2}√{v\_p}$$

$$u=m\_p+z\_{1-α/2}√{v\_p}$$

Conditional on the prior, model, and observed data, this interval contains posterior probability $c$. This differs from the repeated-experiment coverage interpretation of a frequentist confidence interval.

The posterior also gives the probability of a positive effect:

$$P(Θ>0∣\text\"data\")=Φ(m\_p/√{v\_p})$$

A positive effect means the metric increased. Whether that is desirable depends on the metric: an increase in conversion and an increase in latency have different business interpretations.

#### Student-t prior

The Student-t prior is centered at zero and has heavier tails than a normal prior, allowing more probability for large treatment effects. Datadog combines this prior with the observed effect and its uncertainty to obtain a posterior distribution. The reported estimate is the posterior mean, and the credible interval contains the specified proportion of posterior probability, with equal probability in each tail.

This prior is useful when you expect effects to be near zero but want to allow for occasional large effects. Compared with a normal prior, its heavier tails can reduce shrinkage of large effects when the data support them. The degrees of freedom control the tail weight: smaller values allow heavier tails, while larger values approach a normal prior. The prior standard deviation controls its overall spread and uses the relative-lift or absolute-lift scaling described above.

Unlike the normal prior, the Student-t prior does not yield elementary closed-form expressions for the posterior mean and credible interval under a normal likelihood. Datadog computes numerical approximations to these quantities.

## Multiple comparisons

When multiple-testing correction is enabled, Datadog adjusts the significance level before calculating intervals. Preferential Bonferroni correction allocates part of the significance budget to the primary metric and divides the remaining budget among the other metrics, accounting for treatment comparisons within each allocation. With one metric, it reduces to Bonferroni correction across treatments.

Use the resulting comparison-specific $α$ in the interval formulas above. For hybrid analysis, the split between sequential and fixed-sample branches follows this correction. For Bayesian analysis, the adjusted level changes the credible interval's tail probabilities; it does not change the posterior or turn the credible interval into a frequentist coverage guarantee.

## When the approximations become unreliable

Ratio calculations require a denominator sufficiently far from zero. Datadog flags a denominator as unreliable when its standard error divided by the magnitude of its estimated mean exceeds 0.1. For relative lift, this check also applies to the control metric estimate:

$$\text\"SE\"(m\_C)/|m\_C|>0.1$$

For ratio metrics, checks also apply to the within-group denominators. A zero denominator prevents the corresponding ratio calculation. Zero numerator variance can also prevent estimation.

A narrow interval is only informative when the experiment design, data, and statistical approximations are appropriate. Neither a different interval method nor a prior resolves a denominator that is too close to zero for a reliable relative-lift approximation.
