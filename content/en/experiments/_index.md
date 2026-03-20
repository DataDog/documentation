---
title: Experiments
description: Plan, run, and analyze randomized experiments across your stack with Datadog Experiments.
further_reading:
- link: "/feature_management/"
  tag: "Documentation"
  text: "Feature Flags"
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
---

## Overview

Datadog Experiments helps teams run and analyze randomized experiments, such as A/B tests, to understand how product changes affect user behavior, application performance, and business outcomes. This allows you to make confident, data-backed decisions about what to implement.

Datadog Experiments builds on [Datadog Feature Flags][1], [Product Analytics][2], and [Real User Monitoring (RUM)][3]. Feature Flags control which users see each variant while [Product Analytics][2] and [Real User Monitoring (RUM)][3] provide the metrics used to measure the impact.

## Getting started

To start using Datadog Experiments, set up a data source:

- **[Product Analytics][2]** for user behavior and journey metrics
- **[Real User Monitoring (RUM)][3]** for client-side and performance signals

After setting up a data source:
1. **[Create a metric][4]** to calculate a [sample size][8] and to evaluate your experiment.
1. **[Create an experiment][5]** and define the experiment's name and hypothesis.
1. **[Create a feature flag][6]** and implement it using the SDK to assign users to control and variant groups. This is required to launch your experiment.
1. **[Launch your experiment][7]** to see comparison results across groups and a report of the lift, confidence intervals, and statistical significance.


## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/
[2]: /product_analytics/
[3]: /real_user_monitoring/
[4]: /experiments/defining_metrics
[5]: /experiments/plan_and_launch_experiments
[6]: /getting_started/feature_flags/#create-your-first-feature-flag
[7]: /experiments/plan_and_launch_experiments#step-3---launch-your-experiment
[8]: /experiments/plan_and_launch_experiments#add-a-sample-size-calculation-optional

