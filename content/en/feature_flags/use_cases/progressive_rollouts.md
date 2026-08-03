---
title: Progressive Rollouts and Canaries
description: Gradually roll out feature flags on a schedule with optional guardrail metrics for canary releases.
---

[**Progressive rollouts**](#progressive-rollouts) release new functionality gradually by incrementing the percentage of subjects exposed to the feature over time. [**Canaries**](#canaries) are progressive rollouts that monitor guardrail metrics and automatically pause or stop when they detect regressions.

## Progressive rollouts

### Configure a progressive rollout

1. Navigate to your feature flag and open **Targeting Rules & Rollouts** for the target environment.
2. Click **Add Targeting Rule** and select **Add Rollout Steps** to create a multistep rollout.
3. Configure rollout steps:
   - Customize the percentage for each step, and add or delete steps as needed.
   - Change the delay between steps for a slower or faster rollout.
   - Click **Split Traffic** to roll out multiple variants at the same time.

{{< img src="feature_flags/create-progressive-rollout.png" alt="Multistep progressive rollout configuration." style="width:100%;" >}}

### Start and control the rollout

1. **Enable** the flag in the environment so SDKs evaluate your targeting rules.
2. Click **Start Rollout** to kick off the progressive rollout.

{{< img src="feature_flags/start-progressive-rollout.png" alt="Multistep progressive rollout display." style="width:100%;" >}}

After the rollout starts:

- Click **Pause Rollout** to stop progress temporarily.
- Click **Stop Rollout** to revert all progress on the rollout.

Monitor progress with evaluation tracking and configure notifications for rollout events.

## Canaries

A canary is a progressive rollout that includes **guardrail metrics**. Guardrail metrics measure standard key performance indicators (KPIs) such as error rate and long task count.

### How canaries work

When guardrail metrics are configured, the rollout monitors metrics in both groups:

- **Treatment**: Subjects receiving the variant you are rolling out
- **Control**: Subjects not receiving the treatment variant

When the canary detects a statistically significant change in any guardrail metric, it automatically **pauses** or **stops** the rollout.

### Configure a canary rollout

1. Create a progressive rollout targeting rule as described in the [Configure a progressive rollout](#configure-a-progressive-rollout) section.
2. Add guardrail metrics to the rollout configuration.
3. Choose whether guardrail failures should pause or stop the rollout.

{{< img src="feature_flags/canary-rollout-config.png" alt="Canary rollout configuration showing rollout steps with guardrail metrics and a control variant." style="width:90%;" >}}

## Best practices

- Configure notifications on the flag to be alerted when the rollout starts, pauses, or stops.
- For canaries, notifications fire when a guardrail metric pauses or stops the rollout — configure these before starting the rollout so you're alerted immediately if a regression is detected.
- Use evaluation tracking to monitor how many subjects are receiving each variant as the rollout progresses.
