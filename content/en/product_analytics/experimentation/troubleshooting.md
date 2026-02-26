---
title: Troubleshooting
description: Troubleshoot issues when running experiments.
further_reading:
- link: "/product_analytics/experimentation/reading_results"
  tag: "Documentation"
  text: "Reading Experiment Results"
---

## Overview

If you experience issues setting up or running Datadog Experiments, use this page to troubleshoot. If you continue to have trouble, [contact Datadog Support][1].

## Experiment results do not appear

If experiment results are missing after you launch an experiment, work through the following steps in order. Start by confirming the experiment is receiving traffic, then verify that metric events are firing correctly.

### Step 1: Confirm the experiment is receiving traffic

Verify that your feature flag is evaluating in the correct environment and that traffic is reaching the experiment's targeting rule.

1. On the [Experiments][2] page, select your experiment.

1. Hover over the feature flag and note the **Environment** the experiment is running in. Click **Go to Flag**.

   {{< img src="/product_analytics/experiment/troubleshooting_flag_link.png" alt="An experiment page showing a tooltip on the feature flag with the environment (dev, enabled) and a Go to Flag link highlighted." style="width:90%;" >}}

1. On the feature flag page, confirm the **Environment** matches the one from the previous step. Check the **Real-time Metric Overview** to see if the flag is receiving traffic. For more on environments, see the [Getting Started with Feature Flags][5] guide.

   {{< img src="/product_analytics/experiment/troubleshooting_flag_traffic.png" alt="The feature flag page with the Environment dropdown highlighted in the Real-time Metric Overview section, showing a bar chart of exposures over time broken down by variant." style="width:90%;" >}}

1. **If the flag is not receiving any traffic**, verify that the flag is enabled in the correct environment. You can manage environments on the [Environments page][3].

1. **If the flag is receiving traffic**, check whether that traffic is reaching the experiment's [targeting rule][6] in the waterfall:

   {{< img src="/product_analytics/experiment/troubleshooting_flag_waterfall.png" alt="The Targeting Rules & Rollouts section of a feature flag showing the experiment targeting rule with 269 users and rollout percentages for each variant across four stages." style="width:90%;" >}}

1. **If traffic is not reaching the experiment's targeting rule**, check the following:
   - **Targeting rule order**: Are there targeting rules above the experiment that are capturing all traffic before it reaches the experiment rule?
   - **Targeting rule filters**: Are the filters in the experiment's targeting rule being satisfied by incoming traffic?
   - **Traffic allocation**: What percentage of traffic is allocated to the experiment?

### Step 2: Confirm metric events are firing

After you confirm the experiment is receiving traffic, check whether the assigned users have associated metric events.

{{% collapse-content title="Check the metric scorecard" level="h4" expanded=true id="check-the-metric-scorecard" %}}

1. On the experiment page, hover over the metric scorecard to see the number of users in each variant, the total metric value, and the average user-level metric value.

   {{< img src="/product_analytics/experiment/troubleshooting_tooltip.png" alt="An experiment scorecard tooltip showing the metric name, the average user-level metric value per variant, the total metric value, and the user assignment count for each variant." style="width:90%;" >}}

1. **If a metric value is zero**, go to the metric edit page and confirm the metric event is firing. Check the event volume chart on the right side of the page.

   {{< img src="/product_analytics/experiment/troubleshooting_metric_page.png" alt="The Edit Metric page showing the metric definition on the left and a bar chart of metric event volume over the past week on the right." style="width:90%;" >}}

   <div class="alert alert-info">A metric event must meet two criteria for Datadog to include it in experiment results:
   <ol>
   <li>The event must come from a user with at least one experiment exposure event.</li>
   <li>The event must occur after the user's first experiment exposure.</li>
   </ol>
   Events that do not meet both criteria are excluded from experiment results.
   </div>

**If the metric event is firing but the experiment scorecard still shows zero**, continue to [Verify subject key matching](#verify-subject-key-matching).

{{% /collapse-content %}}

{{% collapse-content title="Verify subject key matching" level="h4" expanded=false id="verify-subject-key-matching" %}}

1. Click **View Exposure Logs** on the **Flags & Exposures** tab to see a list of recently exposed subjects. For details on how exposure events are tracked, see the [client SDK documentation][8].

   {{< img src="/product_analytics/experiment/troubleshooting_exposure_log.png" alt="The Exposures log table showing columns for variant, timestamp, subject, flag key, experiment key, and allocation key for recently exposed users." style="width:90%;" >}}

1. Check that the value in the **Subject** column matches the subject type attribute (typically `@usr.id`). The **Subject** column shows the value passed as [`targetingKey`][7] to the SDK. If the `targetingKey` does not match the subject type attribute, the experiment analysis cannot associate metric events with that exposure.

**If the subject values match but results are still missing**, continue to [Inspect individual sessions](#inspect-individual-sessions).

{{% /collapse-content %}}

{{% collapse-content title="Inspect individual sessions" level="h4" expanded=false id="inspect-individual-sessions" %}}

1. On the [event stream page][4], filter sessions from the experiment by adding the following filter:

   ```
   @feature_flags.<flag-key>:<variant-value>
   ```

   {{< img src="/product_analytics/experiment/troubleshooting_event_stream.png" alt="The Product Analytics event stream filtered by @feature_flags.new-product-photos:false, showing a list of sessions with columns for date, session type, time spent, view count, error count, and action count." style="width:90%;" >}}

1. Inspect individual sessions and verify that your metric event is firing. Check the timing of events in the session timeline — events that occur **before** the feature flag is evaluated are not included in experiment results.

   {{< img src="/product_analytics/experiment/troubleshooting_inspect_session.png" alt="An individual session detail view showing a timeline of events including a view load and multiple _dd_exposure custom actions fired at 5.39 seconds into the session." style="width:90%;" >}}

{{% /collapse-content %}}

{{% collapse-content title="Check outlier handling" level="h4" expanded=false id="check-outlier-handling" %}}

**If metrics are still showing as zero** and you have a small set of users with metric events, check whether outlier handling is causing the issue. When outlier handling is enabled and the user pool is small, the outlier threshold may be set to zero, which truncates all user metric values to zero. To test this, try disabling outlier handling on the metric edit page.

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://app.datadoghq.com/product-analytics/experiments
[3]: https://app.datadoghq.com/feature-flags/settings/environments
[4]: https://app.datadoghq.com/product-analytics/events
[5]: /getting_started/feature_flags/
[6]: /getting_started/feature_flags/#step-4-define-targeting-rules-and-enable-the-feature-flag
[7]: /feature_flags/client/javascript/#set-the-evaluation-context
[8]: /feature_flags/client/javascript/
