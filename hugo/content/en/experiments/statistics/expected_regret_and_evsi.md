---
title: Expected Regret and EVSI
description: How Datadog calculates minimum expected regret and the expected value of sample information (EVSI) for Bayesian experiment results.
further_reading:
- link: "/experiments/statistics/lift_and_interval_calculations"
  tag: "Documentation"
  text: "Lift and Interval Calculations"
- link: "/experiments/statistics/analysis_methods"
  tag: "Documentation"
  text: "Analysis Methods"
- link: "/experiments/reading_results"
  tag: "Documentation"
  text: "Reading Experiment Results"
---

{{< jqmath-vanilla >}}

## Overview

Bayesian analysis reports two statistics that help you decide whether to stop an experiment or keep it running:

- **Minimum expected regret**: The lift you would lose if the better-looking variant is the wrong choice, averaged over the chance that it is.
- **Expected value of sample information (EVSI)**: How much the minimum expected regret is likely to drop if the experiment keeps running at its recent traffic. Datadog bases EVSI on one more week of data, as described in the [How Datadog projects the extra data](#how-datadog-projects-the-extra-data) section.

Both statistics appear in the [Statistical details view][1] of the experiment results page. They are available only for experiments that use [Bayesian analysis][2].

This page is a reference for readers who want to understand or reproduce these calculations. It uses the notation and the Bayesian posterior defined in [Lift and Interval Calculations][3].

## Notation

Let $Θ$ be the random effect, either absolute or relative lift. The posterior for $Θ$ has mean $m\_{\text\"post\"}$ and variance $v\_{\text\"post\"}$, as calculated in [Bayesian analysis][4]. Let $Φ$ and $φ$ denote the standard normal cumulative distribution function and density.

A positive $Θ$ means the treatment increased the metric. The formulas on this page assume that an increase is desirable. If your metric should decrease, swap the roles of shipping the treatment and keeping the control. Minimum expected regret and EVSI are the same either way.

## Minimum expected regret

After an experiment, you choose between two decisions: ship the treatment or keep the control. **Regret** is the lift you give up by making a decision, compared with the decision you would make if you knew the true effect:

| Decision | True effect is positive ($Θ>0$) | True effect is negative ($Θ<0$) |
|---|---|---|
| **Ship the treatment** | 0 | $-Θ$ |
| **Keep the control** | $Θ$ | 0 |

A regret of zero means you made the better decision. You don't know the true effect, so Datadog averages each row over the posterior:

$$R\_T=E[\max(-Θ,0)∣\text\"data\"]$$

$$R\_C=E[\max(Θ,0)∣\text\"data\"]$$

The two regrets differ by the posterior mean, $R\_C-R\_T=m\_{\text\"post\"}$. When the posterior mean is positive, shipping the treatment has the lower expected regret. When it is negative, keeping the control does. Datadog reports the **minimum expected regret**:

$$R=\min(R\_T,R\_C)$$

The minimum expected regret also equals the **expected value of perfect information**: the expected gain from learning the true effect before deciding. A value close to zero means there is little downside to deciding with the current data.

### Normal prior

For a [normal prior][5], the posterior is normal and the regret has a closed form. Let $s\_{\text\"post\"}=√{v\_{\text\"post\"}}$. Then:

$$R=s\_{\text\"post\"}φ({|m\_{\text\"post\"}|}/{s\_{\text\"post\"}})-|m\_{\text\"post\"}|Φ(-{|m\_{\text\"post\"}|}/{s\_{\text\"post\"}})$$

Regret has the same units as the lift. Relative-lift regret is a proportion of the control mean, so a regret of 0.005 means 0.5% of the control value.

### Student's t prior

Datadog approximates the [Student's t prior][6] with a mixture of normal distributions centered at zero. The posterior is then also a mixture of normal distributions. Each posterior component $k$ has weight $w\_k$, mean $m\_k$, and variance $v\_k$. Datadog calculates $R\_T$ and $R\_C$ from the closed-form tail expectations of each component, weighted by $w\_k$, and reports the smaller value.

## Expected value of sample information

If you keep the experiment running, the extra data updates the posterior and might change your decision. EVSI is the expected reduction in minimum expected regret from that extra data:

$$\text\"EVSI\"=R-E[R\_{\text\"after\"}]$$

Here $R\_{\text\"after\"}$ is the minimum expected regret calculated after observing the extra data. The expectation averages over the data you might observe, based on the current posterior.

EVSI is never negative, and it is never larger than the current minimum expected regret. At most, more data can reduce the minimum expected regret to zero.

### How Datadog projects the extra data

Datadog forecasts one more week of data from the experiment's recent traffic:

1. Datadog counts the first exposures, across all variants, in the last seven complete days of traffic. The first day of the experiment and the most recent day are excluded because they might be partial days. Call this count $M$.
1. Datadog assumes that the next seven days have the same number of first exposures, $M$.

Datadog treats the data from those new subjects as an independent estimate of the same lift. The standard error of that estimate is the current standard error scaled to the new sample size:

$$s\_f=√{v\_θ}√{N/M}$$

Here $√{v\_θ}$ is the current standard error of the lift estimate and $N$ is the total number of subjects exposed so far. The scaling assumes that standard errors shrink with the square root of the sample size, and that the split between variants stays the same.

The tooltip on the {{< ui >}}EVSI{{< /ui >}} column shows the assumed exposures per day and the total for the next seven days.

### Normal prior

For a normal prior, a future estimate with standard error $s\_f$ moves the posterior mean by an amount that is normally distributed, with standard deviation:

$$ω={v\_{\text\"post\"}}/{√{v\_{\text\"post\"}+s\_f^2}}$$

EVSI uses the same closed form as the minimum expected regret, with $ω$ in place of $s\_{\text\"post\"}$:

$$\text\"EVSI\"=ωφ({|m\_{\text\"post\"}|}/{ω})-|m\_{\text\"post\"}|Φ(-{|m\_{\text\"post\"}|}/{ω})$$

Because $ω$ is smaller than $s\_{\text\"post\"}$, EVSI is smaller than the minimum expected regret. With a lot of extra data, $s\_f$ approaches zero, $ω$ approaches $s\_{\text\"post\"}$, and EVSI approaches the minimum expected regret. With little extra data, $s\_f$ is large and EVSI approaches zero.

### Student's t prior

For the normal mixture that approximates a Student's t prior, the future estimate $Y$ changes the decision at a single threshold $y^{\*}$. The updated posterior mean is positive when $Y$ is above $y^{\*}$ and negative when it is below. Datadog finds $y^{\*}$ numerically.

The expected regret after the extra data then has a closed form. For each posterior component $k$, let $V\_k=v\_k+s\_f^2$ and $β\_k=(y^{\*}-m\_k)/√{V\_k}$. Then:

$$E[R\_{\text\"after\"}]=∑\_k w\_k(m\_kΦ(β\_k)-{v\_k}/{√{V\_k}}φ(β\_k))-E[\min(Θ,0)∣\text\"data\"]$$

EVSI is the current minimum expected regret minus this value.

### When EVSI is unavailable

Datadog doesn't calculate EVSI, and the {{< ui >}}EVSI{{< /ui >}} column shows a dash, when:

- The experiment doesn't have seven complete days of traffic yet, not counting the first and most recent days.
- No first exposures were recorded in the last seven complete days.
- Traffic data or the standard error can't be used for a forecast.

Hover over the dash to see the reason for a specific result.

## Interpret the results

Minimum expected regret and EVSI are on the same scale, so you can compare them directly:

- **Minimum expected regret is close to zero**: There is little downside to deciding with the current data. Choose the better-looking variant.
- **EVSI is close to the minimum expected regret**: The extra data that EVSI assumes is likely to resolve most of the remaining uncertainty. Consider running the experiment longer.
- **EVSI is much smaller than the minimum expected regret**: Uncertainty remains, but the extra data that EVSI assumes is unlikely to resolve much of it. Consider deciding with the current data, or plan for a longer experiment or more traffic.

Running an experiment longer also has costs, such as delaying the rollout of a better variant or keeping users on a worse one. To compare EVSI with these costs, convert both into the same units, such as revenue.

Both statistics depend on the prior. A tighter prior shrinks the posterior toward zero and can reduce how much extra data changes the posterior.

## Example

This example uses a conversion metric with 10,000 subjects in each group. The control conversion rate is 10%, and the treatment conversion rate is 10.3%. The analysis uses the default normal prior for relative lift, with $τ=0.05$.

The observed relative lift is 3%, with a standard error of about 0.0433. The posterior mean is about **1.71%**, with a posterior standard deviation of about 0.0328, or 3.28%. The probability that the treatment beats the control is about **70.0%**.

The expected regrets are:

- Ship the treatment: $R\_T≈0.00625$, or 0.625% of the control value.
- Keep the control: $R\_C=R\_T+m\_{\text\"post\"}≈0.0234$, or 2.34%.

Shipping the treatment has the lower expected regret, so the minimum expected regret is about **0.625%**.

Suppose the experiment has exposed 20,000 subjects so far, and 10,000 of them were first exposed in the last seven complete days. The future standard error is $s\_f≈0.0433×√{20000/10000}≈0.0613$, which gives $ω≈0.0154$ and an EVSI of about **0.104%**.

Another week of data is expected to reduce the minimum expected regret from about 0.625% to about 0.521%. The extra week recovers about one-sixth of the current regret. Most of the remaining uncertainty is unlikely to resolve in one week at the current traffic.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/reading_results/#statistical-details
[2]: /experiments/statistics/analysis_methods/#bayesian-analysis
[3]: /experiments/statistics/lift_and_interval_calculations/
[4]: /experiments/statistics/lift_and_interval_calculations/#bayesian-analysis
[5]: /experiments/statistics/lift_and_interval_calculations/#normal-prior
[6]: /experiments/statistics/lift_and_interval_calculations/#students-t-prior
