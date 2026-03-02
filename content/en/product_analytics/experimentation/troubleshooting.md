---
title: Troubleshooting
description: Troubleshoot issues when running experiments.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
---

## Overview

If you experience issues setting up or running Datadog Experiments, use this page to troubleshoot. If you continue to have trouble, [contact Datadog Support][1].

## Experiment results do not appear

If experiment results are missing after you launch an experiment, start by checking whether the experiment is assigning users. Then, navigate to the appropriate troubleshooting step.

### Step 1: Confirm the experiment is assigning users

On the [Experiments][2] page, select your experiment and hover over the metric scorecard:
- If the **User Assignment Count** for each variant is zero, start with [Step 2](#step-2-confirm-the-experiment-is-receiving-traffic) to debug traffic.
- If you see assignments but no metric values, skip to [Step 3](#step-3-confirm-metric-events-are-firing).

   {{< img src="/product_analytics/experiment/troubleshooting_tooltip.png" alt="An experiment scorecard tooltip showing the metric name, the average user-level metric value per variant, the total metric value, and the user assignment count for each variant." style="width:90%;" >}}

### Step 2: Confirm the experiment is receiving traffic

Verify that your feature flag is enabled, evaluates in the correct environment, and that traffic reaches the experiment's targeting rule.

1. Note the **Environment** the experiment is running in, then click **Go to Flag**.

   {{< img src="/product_analytics/experiment/troubleshooting_flag_link1.png" alt="An experiment page showing a tooltip on the feature flag with the environment (dev, enabled) and a Go to Flag link highlighted." style="width:90%;" >}}

1. On the feature flag page, confirm that the flag is **Enabled**. If the flag is disabled, enable it before proceeding.

   {{< img src="/product_analytics/experiment/troubleshooting_feature_flag_page.png" alt="The feature flag page with the Enabled toggle highlighted in the top-right corner." style="width:90%;" >}}

1. In the **Real-time Metric Overview** section, filter by the experiment's environment to verify that the flag is receiving traffic in that specific environment. See the [Getting Started with Feature Flags][5] guide for details on environments.

   {{< img src="/product_analytics/experiment/troubleshooting_flag_traffic.png" alt="The feature flag page with the Environment dropdown highlighted in the Real-time Metric Overview section, showing a bar chart of exposures over time broken down by variant." style="width:90%;" >}}

Based on what you see in the **Real-time Metric Overview**, follow the appropriate path:

{{% collapse-content title="The flag is not receiving traffic" level="h4" expanded=false id="flag-not-receiving-traffic" %}}

If the bar chart shows no exposures, the flag is not evaluating in the expected environment.

1. Confirm the flag is enabled in the correct environment. You can manage environments on the [Environments page][3].
1. If the flag is enabled but traffic is still zero, verify that your application is pointing to the same environment the experiment targets.

{{% /collapse-content %}}

{{% collapse-content title="The flag is receiving traffic but experiment assignments are zero" level="h4" expanded=false id="flag-receiving-traffic-no-assignments" %}}

If the flag shows exposures but the experiment scorecard shows zero assignments, traffic is not reaching the experiment's [targeting rule][6].

The waterfall is an ordered list of targeting rules that the flag evaluates from top to bottom. Rules above the experiment's targeting rule, such as rules that exclude internal users or specific organizations, can capture traffic before it reaches the experiment.

{{< img src="/product_analytics/experiment/troubleshooting_flag_waterfall.png" alt="The Targeting Rules & Rollouts section of a feature flag showing the experiment targeting rule with 269 users and rollout percentages for each variant across four stages." style="width:90%;" >}}

Check the following:
   - **Targeting rule order**: Are targeting rules above the experiment capturing traffic before it reaches the experiment rule?
   - **Targeting rule filters**: Does incoming traffic match the filters in the experiment's targeting rule?
   - **Traffic allocation**: Is the traffic allocation to the experiment set correctly?

{{% /collapse-content %}}

### Step 3: Confirm metric events are firing

After you confirm the experiment is receiving traffic, check whether the assigned users have associated metric events. 

Work through the following checks sequentially. Each section builds on the previous one, so start with the first and continue to the next if the issue persists.

{{% collapse-content title="Check the metric scorecard" level="h4" expanded=true id="check-the-metric-scorecard" %}}

1. On the experiment page, hover over the metric scorecard to see the per-user metric average, the **Total** metric value across users, and the **User Assignment Count** for each variant.

   {{< img src="/product_analytics/experiment/troubleshooting_tooltip.png" alt="An experiment scorecard tooltip showing the metric name, the average user-level metric value per variant, the total metric value, and the user assignment count for each variant." style="width:90%;" >}}

1. **If a metric value is zero**, hover over the metric name to select the &#8942; menu item. Click **Edit Metric** to open the metric definition page. 

1. Verify that the metric event name is correct (for example, check for typos). Check the event volume chart on the right side of the page to confirm the event is firing.

   {{< img src="/product_analytics/experiment/troubleshooting_metric_page.png" alt="The Edit Metric page showing the metric definition on the left and a bar chart of metric event volume over the past week on the right." style="width:90%;" >}}

   <div class="alert alert-info">A metric event must meet two criteria for Datadog to include it in experiment results:
   <ol>
   <li>The event must come from a user with at least one experiment exposure event.</li>
   <li>The event must occur after the user's first experiment exposure.</li>
   </ol>
   Datadog excludes events that do not meet both criteria from experiment results.
   </div>

   <div class="alert alert-warning"><strong>If the scorecard shows non-zero user assignments but all metric values are zero</strong>, the issue is not with traffic; it is with how Datadog matches metric events to exposures. <strong>Continue to the next section</strong> to verify subject key matching.</div>

{{% /collapse-content %}}

{{% collapse-content title="Verify subject key matching" level="h4" expanded=false id="verify-subject-key-matching" %}}

1. Click **View Exposure Logs** on the **Flags & Exposures** tab to see a list of recently exposed subjects. For details on how exposure events are tracked, see the [SDK documentation][8].

   {{< img src="/product_analytics/experiment/troubleshooting_exposure_log1.png" alt="The Exposures log table showing columns for variant, timestamp, subject, flag key, experiment key, and allocation key for recently exposed users." style="width:90%;" >}}

1. Check that the value in the **Subject** column matches the subject type attribute (typically `@usr.id`). The **Subject** column shows the value passed as [`targetingKey`][7] to the SDK. If the `targetingKey` does not match the subject type attribute, the experiment analysis cannot associate metric events with that exposure.

   You can view and configure subject types on the [subject types page][9]. By default, the subject type defaults to `@usr.id`. Verify that the value you pass as `targetingKey` in your SDK matches the attribute defined on the subject types page.

**If the subject values match but experiment results are still missing**, continue to the next section to inspect individual sessions.

{{% /collapse-content %}}

{{% collapse-content title="Inspect individual sessions" level="h4" expanded=false id="inspect-individual-sessions" %}}

If subject values match and users are assigned to the experiment, inspect individual sessions to identify why specific users are not generating metric events.

1. On the [event stream page][4], filter sessions from the experiment by adding the following filter:

   ```
   @feature_flags.<flag-key>:<variant-value>
   ```

   Replace `<flag-key>` with your feature flag key and `<variant-value>` with the variant you want to inspect.

   {{< img src="/product_analytics/experiment/troubleshooting_event_stream.png" alt="The Product Analytics event stream filtered by @feature_flags.new-product-photos:false, showing a list of sessions with columns for date, session type, time spent, view count, error count, and action count." style="width:90%;" >}}

1. Select a session from a user assigned to the experiment. In the session timeline, check for two things:
   - **Is the metric event present?** If the expected event does not appear in the session, the instrumentation is not firing for that user. Verify your event tracking code and confirm the event name matches the metric definition.
   - **Does the metric event occur after the feature flag evaluation?** Datadog only counts metric events that occur *after* the user's first exposure event (`_dd_exposure`). If the metric event fires before the flag evaluation, reorder your instrumentation so the SDK evaluates the flag before the event fires. See the [SDK documentation][8] for initialization guidance.

   {{< img src="/product_analytics/experiment/troubleshooting_inspect_session1.png" alt="An individual session detail view showing a timeline of events including a view load and multiple _dd_exposure custom actions fired at 5.39 seconds into the session." style="width:90%;" >}}

{{% /collapse-content %}}

{{% collapse-content title="Check outlier handling" level="h4" expanded=false id="check-outlier-handling" %}}

If you have confirmed that metric events are firing and subject keys match, but metric values are still zero, outlier handling may be the cause. This is most common in early-stage experiments with a small number of users.

When outlier handling is enabled, Datadog calculates a threshold based on the distribution of metric values across users. If the number of users with a metric event is small, Datadog may compute the threshold as zero, which truncates all metric values to zero.

To check if outlier handling is the cause:

1. On the [Experiments][2] page, hover over the metric name and select **Edit Metric** from the &#8942; menu.
1. In the metric definition, toggle **Outlier handling** off.
1. Save the metric and wait for the experiment results to recompute.

If metric values appear after disabling outlier handling, the threshold was truncating your data. You can re-enable outlier handling after the experiment accumulates more users.

{{< img src="/product_analytics/experiment/troubleshooting_outlier_handling.png" alt="The Edit Metric page with the Outlier handling toggle highlighted." style="width:90%;" >}}


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
[9]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
