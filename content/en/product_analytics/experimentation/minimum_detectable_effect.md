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
A Minimum Detectable Effect (MDE) is a core concept in experimentation that explains (`CALCULATES?`) the smallest difference that you are able to detect in a metric between your experiment’s variants. In general, MDEs can be defined in absolute terms (for example, a $1,000 increase in revenue) or relative terms (a 10% increase in revenue). Datadog defines MDEs in relative terms, that is, as percentage lifts relative to the control.

## What is the difference between a true and a measured effect? 
To understand Minimum Detectable Effects, it is essential to recognize the difference between the true effect of a variant and the measured effect. 

The true effect of a variant refers to the lift that would be observed if we could collect an infinite amount of experimental data. As that is impossible, the next best step is to draw conclusions using imprecise(`REMOVE THIS WORD?`) measured effects. 

The measured effect may be smaller than the true effect, or it may be larger than the true effect. It may have the same sign as the true effect, or the opposite sign.

MDE (`or DATADOG?`) uses statistics to draw conclusions about true effects using data from the measured effects.

The Minimum Detectable Effect refers to the smallest true effect that will **likely** result in a statistically significant experiment result. 

**Likely** in this case refers to a specific number: the experiment’s power. **Power** is the percent of the time that an experiment will yield a statistically significant result under the assumption that the true effect is exactly equal to the MDE. Power is typically set to 80%. This means that regardless of experiments’ measured effects, which could be anything, 80% of true effects equal to the MDE being successfully detected.

For example, if you’re designing an experiment to improve a service’s sign-up rate, setting a relative MDE of 10% means you’re designing the experiment to detect a 10% or greater difference in sign-up rates between variants.

Let’s say the sign-up rate in the control variant is 20%. If the experiment’s power is set to 80%, and the true value of the sign-up rate in the treatment variant is 22% or greater (a 10% relative increase), the experiment will reach statistical significance at least 80% of the time. However, if the true value of the sign-up rate in your treatment group is less than 22%, the experiment will reach statistical significance less than 80% of the time.


## How are MDEs related to sample size?

In general, the more samples you have in your experiment, the smaller your MDE. In other words, the more subjects are assigned to the experiment, the easier it is to detect small changes between variants. If your organization (or specific experiment) tends to have fewer subjects available, an experiment may need to run for many weeks to reach the sample size required.

## How should I choose an appropriate MDE?

Choosing an MDE is a careful art, and depends on your organization’s scale, the type of experiment, and other potential considerations.

Picking an MDE which is too large may lead to an experiment which is underpowered, or lacking a sufficient number of subjects to detect the effect you hope to see.

On the other hand, selecting an MDE which is too small may lead to using far too many subjects, limiting your ability to run parallel experiments, or potentially exposing a large share of subjects to a risky change.

One way to pick an MDE is to look at past experiments which tested similar changes. For example, if all experiments within a certain domain in your organization have produced changes of 5%-10%, picking an MDE of about 5% may prove to be a wise choice.







## Further reading
{{< partial name="whats-next/whats-next.html" >}}
