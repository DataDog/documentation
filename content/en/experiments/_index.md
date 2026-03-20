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

Datadog Experiments helps teams run and analyze randomized experiments, such as A/B tests, to understand how product changes affect user behavior, application performance, and business outcomes, allowing you to make confident, data-backed decisions about what to implement.

Datadog Experiments has two components:

- [Datadog Feature Flags][1] for deploying and managing randomized experiments
- Statistical analysis using metrics from [Product Analytics][2] and [Real User Monitoring (RUM)][3] to measure the impact of each experiment group.

## Getting started

To start using Datadog Experiments, configure at least one of the following data sources:

- **[Real User Monitoring (RUM)][3]** for client-side and performance signals
- **[Product Analytics][2]** for user behavior and journey metrics

After setting your data source:
1. **[Create a metric][4]** to use to evaluate your experiment.
1. **[Create an experiment][5]** to calculate a [sample size][8] and set a hypothesis.
1. **[Create a feature flag][6]** and implement it using the [SDK][9] to assign users to the control and variant groups. This is required to launch your experiment.
1. **[Launch your experiment][7]** to see the impact of your change on business metrics, application performance, and user journey.

{{< img src="/product_analytics/experiment/overview_metrics_view1.png" alt="The Experiments metrics view showing business, funnel, and performance metrics with control and variant values and relative lift for each metric." style="width:90%;" >}}


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
[9]: /getting_started/feature_flags/#feature-flags-sdks

