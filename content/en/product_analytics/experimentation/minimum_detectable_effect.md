---
title: Minimum Detectable Effects
description: Determine the smallest detectable difference that may result in a statistically significant experiment result.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics/"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/product_analytics/analytics_explorer/"
  tag: "Documentation"
  text: "Analytics Explorer"
---

## Overview
A Minimum Detectable Effect (MDE) is the smallest change you can detect between experiment variants for a given metric. MDEs can be absolute (for example, a $1,000 increase) or relative (for example, a 10% increase). Datadog uses relative MDEs, expressed as percentage change from the control.

## Differences between true and measured effects? 
To understand Minimum Detectable Effects, it's important to distinguish between the true effect of a variant and the measured effect observed in an experiment. 

The true effect refers to the lift you would observe if you could collect an infinite amount of data. Because that isn’t possible, experiments estimate this value using measured effects, which are subject to randomness. As a result, a measured effect may be smaller or larger than the true effect, and it may even have the opposite sign.


MDE (`or DATADOG?`) uses statistics to draw conclusions about true effects using data from the measured effects.

Statistics allow us to draw conclusions about true effects from these measured effects. The Minimum Detectable Effect is the smallest true effect that is likely to result in a statistically significant outcome.

In this context, _likely_ corresponds to the experiment’s power. _Power_ is the probability that an experiment will detect a statistically significant result if the true effect is exactly equal to the MDE. Power is typically set to 80%. This means that if the true effect equals the MDE, the experiment will detect it at least 80% of the time, regardless of how much measured effects vary.

For example, if you’re designing an experiment to improve a service’s sign-up rate, setting a relative MDE of 10% means you’re designing the experiment to detect a 10% or greater difference in sign-up rates between variants.

If the control variant’s sign-up rate is 20%, then a true sign-up rate of 22% or higher in the treatment variant (a 10% relative lift) will yield a statistically significant result at least 80% of the time (assuming 80% power). If the true sign-up rate is below 22%, the chance of achieving statistical significance is less than 80%.

## MDEs and sample sizes?

In general, larger sample sizes allow experiments to detect smaller effects. More subjects make it easier to detect small changes between variants. If your organization (or specific experiment) tends to have fewer subjects available, an experiment may need to run for many weeks to reach the sample size required.

## Choosing an appropriate MDE?

Choosing an MDE requires careful consideration and depends on your organization's scale, experiment type, and other factors.

If the MDE is too large, the experiment may be underpowered, meaning it won’t have enough samples to detect meaningful effects.

If the MDE is too small, the experiment may require excessive traffic or run time, reducing the ability to run parallel experiments and potentially exposing many users to risky changes.

A common way to choose an MDE is to examine results from past experiments. For example, if historical experiments in a particular domain typically yield effects of 5–10%, selecting an MDE near the lower end of that range (such as 5%) can be a reasonable starting point.






## Further reading
{{< partial name="whats-next/whats-next.html" >}}
