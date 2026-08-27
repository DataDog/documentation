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

To start the rollout automatically at a future date and time instead of clicking **Start Rollout**, [schedule a start time](/feature_flags/concepts/scheduled_rollouts/) when you configure the rule.

After the rollout starts:

- Click **Pause Rollout** to stop progress temporarily.
- Click **Stop Rollout** to revert all progress on the rollout.

Monitor progress with evaluation tracking and configure notifications for rollout events.

## Canaries

A canary is a progressive rollout that includes **guardrail metrics**. Guardrail metrics measure key performance indicators (KPIs), such as error rate, latency, and long task count.

### How canaries work

When guardrail metrics are configured, the rollout monitors metrics in both groups:

- **Treatment**: Subjects receiving the variant you are rolling out
- **Control**: Subjects not receiving the treatment variant

When the canary detects a statistically significant adverse change in a guardrail metric, it automatically **pauses** or **stops** the rollout.

### Use APM guardrail metrics

APM guardrail metrics use retained spans to compare application performance between the control and treatment groups. You can monitor:

- Mean span duration
- Error rate
- P90 span duration
- Mean of a numeric span attribute

[APM trace enrichment][1] is required before you add an APM metric to a canary. Enrichment records the flag allocation, variant, and subject on each trace so the canary can associate APM data with the correct group.

After you enable enrichment:

1. Verify that the application evaluates the feature flag during traced requests.
2. In Trace Explorer, confirm that root spans contain the decoded `@feature_flags.<flag_key>` attribute.
3. Create an APM metric with a span query that matches the requests you want to monitor.
4. Select the APM metric as a guardrail when you configure the canary.

Canary analysis uses the retained sample of matching traces. If the retained volume is low, the canary waits until it has enough sampled subjects and events to make a decision. To increase the random retained sample, configure temporary trace retention for the canary. Temporary retention does not recover traces dropped before they reach Datadog.

{{< img src="feature_flags/apm_canaries/apm-metric-create-flow-1.png" alt="Metric creation flow with APM Spans selected and supported APM guardrail metric types, including P90 span duration." style="width:90%;" >}}

{{< img src="feature_flags/apm_canaries/apm-metric-create-flow-2.png" alt="APM metric creation flow with an APM span query and matching span preview." style="width:90%;" >}}

### Configure a canary rollout

1. Create a progressive rollout targeting rule as described in the [Configure a progressive rollout](#configure-a-progressive-rollout) section.
2. Add guardrail metrics to the rollout configuration.
3. For an APM guardrail, configure temporary trace retention if you want to increase the retained sample.
4. Choose whether guardrail failures should pause or stop the rollout.

{{< img src="feature_flags/canary-rollout-config.png" alt="Canary rollout configuration showing rollout steps with guardrail metrics and a control variant." style="width:90%;" >}}

{{< img src="feature_flags/apm_canaries/apm-canary-metric-monitored-with-retention.png" alt="Canary configuration with a P90 span duration guardrail, abort action, temporary APM trace retention, and a control variant." style="width:90%;" >}}

## Best practices

- Configure notifications on the flag to be alerted when the rollout starts, pauses, or stops.
- Configure canary notifications before starting the rollout. Notifications alert you when a guardrail metric pauses or stops the rollout.
- Use evaluation tracking to monitor how many subjects are receiving each variant as the rollout progresses.
- For APM guardrails, review sampled-subject and sampled-event readiness before increasing rollout exposure.

[1]: /feature_flags/guide/apm_trace_enrichment/
