---
title: Progressive Rollouts and Canaries
description: Gradually roll out feature flags on a schedule with optional guardrail metrics for canary releases.
---

**Progressive rollouts** release new functionality on a schedule. **Canaries** are progressive rollouts that monitor guardrail metrics and automatically pause or abort when they detect regressions.

## Progressive rollouts

### Configure a progressive rollout

1. Navigate to your feature flag and open **Targeting Rules & Rollouts** for the target environment.
2. Add or edit a targeting rule and select **Add Rollout Steps** to create a multistep rollout
3. Configure rollout steps:
   - Customize the percentage for each step, or delete steps to simplify the schedule.
   - Change the delay between steps for a slower or faster rollout.
   - Click **Split Traffic** to roll out multiple variants at the same time.

{{< img src="getting_started/feature_flags/create-progressive-rollout.png" alt="Multistep progressive rollout configuration." style="width:100%;" >}}

### Start and control the rollout

1. **Enable** the flag in the environment so SDKs evaluate your targeting rules.
2. Click the **play** button to start the progressive rollout.

{{< img src="getting_started/feature_flags/start-progressive-rollout.png" alt="Multistep progressive rollout display." style="width:100%;" >}}


After the rollout starts:

- **Pause** to stop progress temporarily.
- **Abort** to revert all progress on the rollout.

{{< img src="getting_started/feature_flags/pause-abort-progressive-rollout.png" alt="Multistep progressive rollout pause/abort controls." style="width:100%;" >}}


Monitor progress with evaluation tracking and configure notifications for rollout events.

## Canaries

A canary is a progressive rollout that includes **guardrail metrics**. Guardrail metrics measure standard key performance indicators (KPIs) such as error rate and long task count.

### How canaries work

When guardrail metrics are configured, the rollout monitors metrics in both groups:

- **Treatment**: Subjects receiving the variant you are rolling out
- **Control**: Subjects not receiving the treatment variant

When the canary detects a statistically significant change in any guardrail metric, it automatically **pauses** or **aborts** the rollout. The direction of the change depends on the metric type. You choose the pause-or-abort behavior when you create the canary.

### Configure a canary rollout

1. Create a progressive rollout targeting rule as described above.
2. Add guardrail metrics to the rollout configuration.
3. Choose whether guardrail failures should pause or abort the rollout.

<div class="alert alert-warning">Setting <code>enableExposureLogging</code> to <code>true</code> on client SDKs can impact <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> costs when guardrail metrics rely on exposure data.</div>
