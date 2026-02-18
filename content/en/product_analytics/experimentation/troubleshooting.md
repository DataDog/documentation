---
title: Troubleshooting
description: Troubleshoot issues when running experiments.
further_reading:
- link: "/product_analytics/experimentation/reading_results"
  tag: "Documentation"
  text: "Reading Experiment Results"
---

## Overview

If you experience issues setting up or configuring Datadog Experiments, use this page to start troubleshooting. If you continue to have trouble, [contact Datadog Support][1].

### Why are experiment results not showing up?

There are several reasons why experiment results might not show up when you first launch an experiment, this guide gives a step-by-step process for spotting and resolving issues.

#### Why am I not seeing any experiment exposures?
The first thing to check is that your experiment is actually being evaluated. To start, navigate to the flag page by clicking “Go to Flag”. This modal will also tell you which environment the experiment is associated with:

{{< img src="/product_analytics/experiment/troubleshooting_flag_link.png" alt="Link to flag" style="width:90%;" >}}

On this page you can see how much traffic is hitting your flag in real time. Make sure you are looking at the same environment that your experiment is associated with.

{{< img src="/product_analytics/experiment/troubleshooting_flag_traffic.png" alt="Flag traffic chart" style="width:90%;" >}}

If you’re not seeing any exposures, make sure that the flag is enabled in the appropriate environment. You can manage environments on the [environments page](https://app.datadoghq.com/feature-flags/settings/environments).

If the flag is indeed being evaluated in the appropriate environment, confirm that traffic is hitting the experiment targeting rule within the waterfall:

{{< img src="/product_analytics/experiment/troubleshooting_flag_waterfall.png" alt="Flag waterfall" style="width:90%;" >}}

If you are not seeing any traffic going to the experiment’s targeting rule, check the following:
1. Are there targeting rules above the experiment that are removing all of the experiment’s traffic?
2. Are the filters in the experiment targeting rule being met?
3. What is the traffic allocation set to?

#### Why are my metric values all zero?

Once you have confirmed that you are seeing experiment exposures, the next step is to check if the assigned users have associated metric events. Hover over the experiment scorecard to see how many users are in each variant of your experiment, the total metric value across users, and the average user-level metric value:

{{< img src="/product_analytics/experiment/troubleshooting_tooltip.png" alt="Metric tooltip" style="width:90%;" >}}

If a metric is zero, first check that the metric event is firing. You can confirm this on the metric edit page:

{{< img src="/product_analytics/experiment/troubleshooting_metric_page.png" alt="Metric edit page" style="width:90%;" >}}

For Datadog to include a metric event in experiment results, two criteria must be met:
1. The event must be from a user with at least one experiment exposure event
2. The event must occur after the user’s first experiment exposure

Metrics are associated with exposures by matching the exposure’s subject with the attribute defined on the subject types page (typically `@usr.id`). You can see a list of recently exposed subjects on the Flags & Exposures tab by clicking **View Exposure Logs**:

{{< img src="/product_analytics/experiment/troubleshooting_exposure_log.png" alt="Exposures log" style="width:90%;" >}}

The subject column shows what is passed in as `targetingKey` to the SDK. If this is not the same value as the subject type’s attribute (e.g., `@usr.id`), the experiment analysis will not find any metric events associated with that exposure.

Once you’ve confirmed that the subject key matches your subject type attribute, check individual sessions from the experiment by adding the following filter on the [event stream page](https://app.datadoghq.com/product-analytics/events):

```@feature_flags.<flag-key>:<variant-value>```

{{< img src="/product_analytics/experiment/troubleshooting_event_stream.png" alt="Exposures log" style="width:90%;" >}}

From here you can inspect individual sessions and check if your metric event is firing. Remember that events that fire before the feature flag is evaluated will not be included in experiment results.

{{< img src="/product_analytics/experiment/troubleshooting_inspect_session.png" alt="Exposures log" style="width:90%;" >}}

<div class="alert alert-info"> If your metric has outlier handling enabled and you have a very small set of users with metric events, it’s possible for the outlier threshold to be zero, truncating all user metric values to zero. To test this, try removing outlier handling on the metric edit page.</div>

[1]: /help
