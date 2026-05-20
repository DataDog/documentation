---
title: Analysis Methods
description: Choose how Datadog calculates lift estimates and confidence intervals for experiment results.
further_reading:
- link: "/experiments/plan_and_launch_experiments"
  tag: "Documentation"
  text: "Plan and Launch Experiments"
- link: "/experiments/reading_results"
  tag: "Documentation"
  text: "Reading Experiment Results"
- link: "/experiments/minimum_detectable_effect"
  tag: "Documentation"
  text: "Minimum Detectable Effects"
---

## Overview

Datadog Experiments provides several methods for estimating experiment lift and calculating the interval around that estimate. The best method depends on how much flexibility you need while the experiment is running, how much sample size you expect, and how your team wants to make launch decisions.

| Method | Description | Strengths | Tradeoffs |
| --- | --- | --- | --- |
| Fixed-sample frequentist | Choose a sample size or duration before launching the experiment, wait until that point, then make a decision. | Provides the most power for a fixed sample size. | Requires an upfront plan and can lose its statistical guarantees if you stop early or extend the experiment based on observed results. |
| Sequential frequentist | Monitor results while the experiment runs and make a decision when you are ready. | Supports flexible decision-making while controlling the false positive rate. | Has less power than fixed-sample analysis, so it can require more samples to detect the same effect. |
| Sequential hybrid | Use sequential analysis while the experiment runs, then switch to a fixed-sample interval at the planned end date. | Combines early stopping with stronger power at the end of a planned experiment. | Requires an end date, and intervals are wider than fixed-sample intervals. |
| Bayesian | Combine experiment data with a prior belief about plausible lifts, then make decisions from the posterior distribution. | Supports nuanced decisions, especially when sample sizes are small or business tradeoffs are asymmetric. | Requires trust in the prior and alignment on how to interpret probabilities. |

Sequential frequentist analysis is the default because it lets you monitor results and make ship or rollback decisions without invalidating the false positive rate. Fixed-sample analysis can be more powerful when everything goes according to plan, but it requires a stricter decision process. Sequential hybrid and Bayesian methods support more specialized decision-making workflows.

Configure the analysis method in the experiment's [statistical analysis plan][1].

## Fixed-sample frequentist analysis

Fixed-sample frequentist analysis is the most direct way to analyze experiment results. Before launching the experiment, choose when you will evaluate the results. This decision point can be a fixed duration or a target sample size. When the experiment reaches that point, compare each treatment variant to control and decide whether to ship, roll back, or continue with a new experiment.

The main challenge is choosing the decision point. If you evaluate too early, the experiment may not have enough power to detect a real effect. If you evaluate too late, you may expose users to an inferior experience longer than needed.

<div class="alert alert-warning">For fixed-sample analysis, avoid changing the sample size or duration based on interim results. Stopping early because results look unusually good or bad, or extending the experiment because results are close to significant, can bias the lift estimate and increase the false positive rate.</div>

There are two common ways to choose the decision point:

- **Choose a fixed duration.** This works when product, business, or operational constraints determine how long the experiment can run. Make sure the duration is long enough to detect a meaningful effect.
- **Run a power analysis.** Use historical metric behavior to estimate how many subjects you need to detect a given [minimum detectable effect][2].

Use fixed-sample analysis when sample size is scarce and your team can commit to the decision criteria before the experiment starts.

## Sequential frequentist analysis

Sequential frequentist analysis lets you monitor experiment results continuously and make a decision without preselecting a final sample size. This is useful when you need to react to strong positive or negative results, or when the assumptions behind a fixed-sample plan may change while the experiment is running.

Sequential analysis controls the false positive rate while allowing repeated checks of the results. The tradeoff is power: for the same number of subjects, sequential analysis is less likely than fixed-sample analysis to detect a true effect. To reach the same power, the experiment may need to run longer.

Use sequential analysis when flexibility matters more than maximizing power for a predetermined sample size. It is a good default for many experiments because it lets you:

- Monitor results while the experiment is live.
- Stop early for large improvements or degradations.
- Continue collecting data without invalidating the analysis.
- Avoid restarting the experiment when the original sample size assumptions were wrong.

## Sequential hybrid analysis

Sequential hybrid analysis combines sequential and fixed-sample approaches. While the experiment is running, Datadog uses a sequential method so you can monitor results and stop early when needed. At the planned end date, Datadog switches to a fixed-sample interval, which gives the final analysis more power than a purely sequential method.

The tradeoff is that sequential hybrid analysis requires a planned end date, and the intervals are slightly wider than fixed-sample intervals. This protects the statistical guarantees across both phases of the analysis.

Sequential hybrid analysis is useful when you want to stop early for clear regressions but prefer to wait until the planned end date before declaring a winning variant. In that workflow, teams often use the sequential phase to protect users from harmful variants and the fixed-sample phase to make final shipping decisions with more power.

## Bayesian analysis

Bayesian analysis uses experiment data to update a prior belief about plausible lift values. The result is a posterior distribution that describes which lift values are most compatible with the prior and the observed data.

Frequentist methods ask how likely the observed data would be if the treatment and control had no true difference. Bayesian methods instead take the observed data and prior as given, then estimate the probability of different lift values. This can make results easier to discuss with stakeholders because statements such as "the treatment is likely to be better than control" map more directly to the output of the analysis.

Bayesian analysis is useful when:

- You need to make a decision with limited data.
- The decision depends on the probability of a lift exceeding a business threshold, not just whether the interval excludes zero.
- Different metrics have asymmetric risks or rewards.
- Stakeholders are prepared to interpret probabilities rather than binary significant or not significant results.

The prior matters most when sample sizes are small. With enough data, the posterior is driven mostly by observed experiment behavior. With little data, an incorrect prior can influence the lift estimate and interval enough to change the decision.

<div class="alert alert-info">Bayesian intervals are technically credible intervals, though Datadog may present them alongside confidence intervals in the experiment results UI. Unlike frequentist intervals, Bayesian intervals do not provide the same false positive rate guarantee.</div>

## Related settings

Analysis methods are only one part of the statistical analysis plan. Datadog Experiments also supports:

CUPED
: Uses pre-experiment data from each subject to reduce metric variance and improve experiment sensitivity. With CUPED enabled, displayed lift may differ from the naive treatment-minus-control calculation.

Multiple testing correction
: Adjusts for the increased false positive risk that comes from evaluating multiple metric comparisons. This produces more conservative results and is not available with Bayesian analysis.

Confidence level
: Controls the width of the interval around the lift estimate. Higher confidence levels produce wider intervals and require more data to reach statistical significance.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/plan_and_launch_experiments/#choose-a-statistical-analysis-plan
[2]: /experiments/minimum_detectable_effect
