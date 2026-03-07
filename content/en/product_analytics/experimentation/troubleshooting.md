---
title: Troubleshooting
description: Troubleshoot issues when running experiments.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
---

## Overview

If you experience issues setting up or running Datadog Experiments, use this page to troubleshoot. If you continue to have trouble, [contact Datadog support][1].

## Experiment results do not appear

If experiment results are missing after you launch an experiment, start by checking whether the experiment is assigning users. Then, navigate to the appropriate troubleshooting step.

### Step 1: Confirm the experiment is assigning users

On the [Experiments][2] page, select your experiment. On the experiment details page, hover over the metric scorecard:
- If the **User Assignment Count** for each variant is zero, start with [Step 2](#step-2-confirm-the-experiment-is-receiving-traffic) to debug traffic.
- If you see assignments but no metric values, skip to [Step 3](#step-3-confirm-metric-events-are-firing).

In the following example, the **User Assignment Count** is 12,427 for Variant A and 12,573 for Variant B.

   {{< img src="/product_analytics/experiment/troubleshooting_tooltip.png" alt="An experiment scorecard tooltip showing the metric name, the average user-level metric value per variant, the total metric value, and the user assignment count for each variant." style="width:90%;" >}}

### Step 2: Confirm the experiment is receiving traffic

Verify that your feature flag is enabled, evaluates in the correct environment, and that traffic reaches the experiment's targeting rule.

1. On the experiment details page, hover over the experiment flag label (for example, `new-product-photos`).
1. Note the **Environment** where the experiment is running, then click **Go to Flag**.

   {{< img src="/product_analytics/experiment/troubleshooting_flag_link1.png" alt="An experiment page showing a tooltip on the feature flag with the environment (dev, enabled) and a Go to Flag link highlighted." style="width:90%;" >}}

1. On the **Feature Flags** page, select the correct environment tab and confirm that the flag is **Enabled**. If the flag is disabled, enable it before proceeding.

   {{< img src="/product_analytics/experiment/troubleshooting_feature_flag_page.png" alt="The Feature Flags page with the Enabled toggle highlighted in the top-right corner." style="width:90%;" >}}

1. In the **Real-time metric overview** section, confirm that the bar chart shows exposure events.

   {{< img src="/product_analytics/experiment/troubleshooting_flag_traffic1.png" alt="The Feature Flags page with the Environment dropdown highlighted in the Real-time metric overview section, showing a bar chart of exposures over time broken down by variant." style="width:90%;" >}}

Based on what you see in the **Real-time metric overview**, follow the appropriate path:

#### The flag is not receiving traffic

Confirm the flag is enabled in the correct environment. You can manage environments on the [Environments page][3].

See the [Getting Started with Feature Flags][5] guide for details on environments.

#### The flag is receiving traffic but experiment assignments are zero

If the flag shows exposures but the metric scorecard shows zero assignments, traffic is not reaching the experiment's [targeting rule][6].

The **Targeting Rules & Rollouts** section displays a waterfall, a list of targeting rules that the flag evaluates from top to bottom. Rules above the experiment's targeting rule, such as rules that exclude internal users or specific organizations, can capture traffic before it reaches the experiment.

{{< img src="/product_analytics/experiment/troubleshooting_flag_waterfall.png" alt="The Targeting Rules & Rollouts section of a feature flag showing the experiment targeting rule with 269 users and rollout percentages for each variant across four stages." style="width:90%;" >}}

Check the following and edit the targeting rule and traffic allocation as needed:
   - **Targeting rule order**: Are targeting rules above the experiment capturing traffic before it reaches the experiment rule?
   - **Targeting rule filters**: Does incoming traffic match the filters in the experiment's targeting rule?
   - **Traffic allocation**: Is the traffic allocation to the experiment set correctly?

### Step 3: Confirm metric events are firing

After you confirm the experiment is receiving traffic, check whether the assigned users have associated metric events.

Work through the following checks in order. Each builds on the previous one, so continue to the next if the issue persists.

{{% collapse-content title="Check the metric scorecard" level="h4" expanded=true id="check-the-metric-scorecard" %}}

1. On the [Experiments][2] page, select your experiment.
1. On the experiment details page, hover over the metric scorecard to see the per-user metric average, the **Total** metric value across users, and the **User Assignment Count** for each variant.

1. If a metric value is zero, hover over the metric name and click the &#8942; menu icon. Select **Edit Metric** to open the metric definition page.

1. Verify that the metric event name is correct (for example, check for typos). Then, review the event volume chart on the right side of the page to confirm the event is firing.

   {{< img src="/product_analytics/experiment/troubleshooting_metric_page.png" alt="The Edit Metric page showing the metric definition on the left and a bar chart of metric event volume over the past week on the right." style="width:90%;" >}}

   <div class="alert alert-info">A metric event must meet two criteria for Datadog to include it in experiment results:
   <ul>
   <li>The event must come from a user with at least one experiment exposure event.</li>
   <li>The event must occur after the user's first experiment exposure.</li>
   </ul>
   </div>

   <div class="alert alert-warning">If the scorecard shows non-zero user assignments but all metric values are zero, the issue is not with traffic; it is with how Datadog matches metric events to exposures. Continue to the next section to verify subject key matching.</div>

{{% /collapse-content %}}

{{% collapse-content title="Verify subject key matching" level="h4" expanded=false id="verify-subject-key-matching" %}}

Datadog matches metric events to experiment exposures using a subject key. If the subject key in your SDK does not match the subject type attribute configured in Datadog, the experiment cannot associate metrics with users.

1. On the [Experiments][2] page, select your experiment.
1. Select the **Flag & Exposures** tab. Then, click **View Exposures Log** to see a list of recently exposed subjects. For details on how exposure events are tracked, see the [SDK documentation][8].

   {{< img src="/product_analytics/experiment/troubleshooting_exposure_log1.png" alt="The Exposures Log table showing columns for variant, timestamp, subject, flag key, experiment key, and allocation key for recently exposed users." style="width:90%;" >}}

1. The **Subject** column shows the value your SDK passes as [`targetingKey`][7]. Compare this value to the attribute defined for your subject type on the [Subject Types page][9] (typically `@usr.id`). If these identifiers do not match, update them before proceeding.

1. To resolve a mismatch, update either the [`targetingKey`][7] in your SDK or the subject type attribute on the [Subject Types page][9] so that both use the same identifier.

If the subject values match but experiment results are still missing, continue to the next section to inspect individual sessions.

{{% /collapse-content %}}

{{% collapse-content title="Inspect individual sessions" level="h4" expanded=false id="inspect-individual-sessions" %}}

If subject values match and users are assigned to the experiment, inspect individual sessions to identify why specific users are not generating metric events.

1. On the [Activity Stream page][4], filter for experiment sessions by adding the following:

   ```
   @feature_flags.<flag-key>:<variant-value>
   ```

   {{< img src="/product_analytics/experiment/troubleshooting_event_stream.png" alt="The Product Analytics Activity Stream page filtered by @feature_flags.new-product-photos:false, showing a list of sessions with columns for date, session type, time spent, view count, error count, and action count." style="width:90%;" >}}

1. Select a session from a user assigned to the experiment. In the session timeline, check for the following:
   - **Is the metric event present?** Verify that the expected metric event is firing within the session.
   - **Does the metric event occur after the feature flag evaluation?** Events that occur **before** the feature flag evaluates do not count toward experiment results.

   If the metric event is missing or fires before the feature flag evaluation, share the session details with the [Datadog support team][1].

   {{< img src="/product_analytics/experiment/troubleshooting_inspect_session1.png" alt="An individual session detail view showing a timeline of events including a view load and multiple _dd_exposure custom actions fired at 5.39 seconds into the session." style="width:90%;" >}}

{{% /collapse-content %}}

{{% collapse-content title="Check outlier handling" level="h4" expanded=false id="check-outlier-handling" %}}

If you have confirmed that metric events are firing and subject keys match, but metric values are still zero, outlier handling may be the cause.

When outlier handling is enabled, Datadog calculates a threshold based on the distribution of metric values across users. If the number of users with a metric event is small, Datadog may compute the threshold as zero, which truncates all metric values to zero.

To check if outlier handling is the cause:

1. On the [Experiments][2] page, select your experiment.
1. Hover over the metric name, then click the &#8942; menu icon. Select **Edit Metric** to open the metric definition page.
1. On the Edit Metric page, expand the **Experiment settings** accordion. Under **Outlier handling**, toggle off both **Lower bound percentile** and **Upper bound percentile**.
1. Save the metric.
1. To trigger an immediate recompute, click the &#8942; menu icon next to **Last Updated** in the **Metrics** section of the experiment details page and click **run an update now**. Otherwise, wait for the next scheduled update.

{{< img src="/product_analytics/experiment/troubleshooting_recompute1.png" alt="The experiment details page, in the Metrics section showing the Last Updated menu with the option to run an update now." style="width:90%;" >}}

If metric values appear after disabling outlier handling, the threshold was truncating your data. To resolve this, keep outlier handling disabled or set a higher threshold on the Edit Metric page.

{{< img src="/product_analytics/experiment/troubleshooting_outlier_handling.png" alt="The Edit Metric page with the Outlier handling toggles highlighted." style="width:90%;" >}}

{{% /collapse-content %}}

If the issue persists after completing all checks, contact the [Datadog support team][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://app.datadoghq.com/product-analytics/experiments
[3]: https://app.datadoghq.com/feature-flags/settings/environments
[4]: https://app.datadoghq.com/product-analytics/events
[5]: /getting_started/feature_flags/
[6]: /getting_started/feature_flags/#step-4-define-targeting-rules-and-enable-the-feature-flag
[7]: /feature_flags/client/javascript/#set-the-evaluation-context
[8]: /feature_flags/client/
[9]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
