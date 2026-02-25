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

## Experiment results do not appear
If experiment results are missing after you first launch an experiment, follow these steps to find and resolve this issue.

<!-- WHAT IS THE DIFFERENCE BETWEEN: 
- "experiment is being evaluated",
- "seeing any exposures", AND 
- "how much traffic is hitting your flag". 

ARE THEY ALL SAYING THE SAME THING? 
ARE THESE THREE DIFFERENT THINGS? 
-->

### Step 1 - Confirm the experiment is receiving traffic
First, check that your experiment is being evaluated: 

1. On the [Experiment][2] page, select the desired experiment

2. Hover over the Feature Flag and make note of the **Environment** in which the experiment is running. Then click **Go to Flag**.

{{< img src="/product_analytics/experiment/troubleshooting_flag_link.png" alt="An experiment page showing a tooltip on the feature flag with the environment (dev, enabled) and a Go to Flag link highlighted." style="width:90%;" >}}

3. On the resulting page, confirm the **Environment** matches the one from the previous step. Then, see how much traffic is hitting your flag in real time.

{{< img src="/product_analytics/experiment/troubleshooting_flag_traffic.png" alt="The feature flag page with the Environment dropdown highlighted in the Real-time Metric Overview section, showing a bar chart of exposures over time broken down by variant." style="width:90%;" >}}

4. If you’re not seeing any exposures, make sure that the flag is enabled in the appropriate environment. You can manage environments on the [environments page][3].

5. If the flag is being evaluated in the appropriate environment, confirm that traffic is hitting the experiment targeting rule within the waterfall:

{{< img src="/product_analytics/experiment/troubleshooting_flag_waterfall.png" alt="The Targeting Rules & Rollouts section of a feature flag showing the experiment targeting rule with 269 users and rollout percentages for each variant across four stages." style="width:90%;" >}}

6. If you are not seeing any traffic going to the experiment’s targeting rule, confirm:
    1. If there are targeting rules above the experiment that are removing all of the experiment’s traffic
    2. If the filters in the experiment targeting rules are being met
    3. What the traffic allocation is set to

### Step 2 - Confirm metric events are firing

After you confirm that you are seeing experiment exposures, check if the assigned users have associated metric events. 

1. Hover over the experiment scorecard to see how many users are in each variant of your experiment, the total metric value across users, and the average user-level metric value: <!-- WHICH OF THESE ARE REFERENCED IN THE IMAGE? -->

{{< img src="/product_analytics/experiment/troubleshooting_tooltip.png" alt="An experiment scorecard tooltip showing the metric name, the average user-level metric value per variant, the total metric value, and the user assignment count for each variant." style="width:90%;" >}}

2. If a metric is zero, first confirm on the metric edit page that the metric event is firing.

{{< img src="/product_analytics/experiment/troubleshooting_metric_page.png" alt="The Edit Metric page showing the metric definition on the left and a bar chart of metric event volume over the past week on the right." style="width:90%;" >}}

<div class="alert alert-info"> A metric event must meet two criteria for Datadog to include it in experiment results:

<ol>
<li> The event must be from a user with at least one experiment exposure event </li>
<li> The event must occur after the user’s first experiment exposure </li>
</ol>
</div>

3. Click **View Exposure Logs** on the Flags & Exposures tab to see a list of recently exposed subjects. Metrics are associated with exposures by matching the exposure’s subject with the attribute defined on the subject types page (typically `@usr.id`).

{{< img src="/product_analytics/experiment/troubleshooting_exposure_log.png" alt="The Exposures log table showing columns for variant, timestamp, subject, flag key, experiment key, and allocation key for recently exposed users." style="width:90%;" >}}

4. The subject column shows what is passed in as `targetingKey` to the SDK. If this is not the same value as the subject type’s attribute (for example, `@usr.id`), the experiment analysis will not find any metric events associated with that exposure.

5. After you have confirmed that the subject key matches your subject type attribute, check individual sessions from the experiment by adding the following filter on the [event stream page][4]:

```@feature_flags.<flag-key>:<variant-value>```

{{< img src="/product_analytics/experiment/troubleshooting_event_stream.png" alt="The Product Analytics event stream filtered by @feature_flags.new-product-photos:false, showing a list of sessions with columns for date, session type, time spent, view count, error count, and action count." style="width:90%;" >}}

6. Then, inspect individual sessions and check whether your metric event is firing. Events that occur before the feature flag is evaluated are not included in experiment results.

{{< img src="/product_analytics/experiment/troubleshooting_inspect_session.png" alt="An individual session detail view showing a timeline of events including a view load and multiple _dd_exposure custom actions fired at 5.39 seconds into the session." style="width:90%;" >}}

<div class="alert alert-info"> If your metric has outlier handling enabled and you have a very small set of users with metric events, it’s possible for the outlier threshold to be zero, truncating all user metric values to zero. To test this, try removing outlier handling on the metric edit page. </div>

[1]: /help
[2]: https://app.datadoghq.com/product-analytics/experiments
[3]: https://app.datadoghq.com/feature-flags/settings/environments
[4]: https://app.datadoghq.com/product-analytics/events
