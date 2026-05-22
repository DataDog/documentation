---
title: Progressive Rollouts & Canaries
description: Gradually roll out feature flags on a schedule with optional guardrail metrics for canary releases.
further_reading:
- link: "/feature_flags/concepts/targeting_rules"
  tag: "Documentation"
  text: "Targeting Rules and Filters"
- link: "/feature_flags/concepts/traffic_splitting"
  tag: "Documentation"
  text: "Traffic Splitting and Randomization"
- link: "/feature_flags/concepts/evaluation_tracking"
  tag: "Documentation"
  text: "Evaluation Tracking"
- link: "/feature_flags/concepts/notifications"
  tag: "Documentation"
  text: "Notifications"
---

## Overview

Progressive rollouts let you gradually release new functionality on a schedule instead of enabling a flag for 100% of traffic at once. **Canaries** are progressive rollouts that monitor **guardrail metrics** and automatically pause or abort when regressions are detected.

## Progressive rollouts

### Configure a multistep rollout

1. Navigate to your feature flag and open **Targeting Rules & Rollouts** for the target environment.
2. Add or edit a targeting rule and choose a **progressive rollout**.
3. Configure rollout steps:
   - Set the percentage for each step, or delete steps to simplify the schedule.
   - Customize the delay between steps for a slower or faster rollout.

{{< img src="getting_started/feature_flags/ff-targeting-rules-and-rollouts.png" alt="Multistep progressive rollout configuration" style="width:100%;" >}}

### Start and control the rollout

1. **Enable** the flag in the environment so SDKs evaluate your targeting rules.
2. Click the **play** button to start the progressive rollout.

After the rollout starts:

- **Pause** to stop progress temporarily.
- **Abort** to revert all progress on the rollout.

Monitor progress with [evaluation tracking](/feature_flags/concepts/evaluation_tracking/) and configure [notifications](/feature_flags/concepts/notifications/) for rollout events.

## Canaries

A canary is a progressive rollout that includes **guardrail metrics**. Guardrail metrics measure standard KPIs such as error rate and long task count.

### How canaries work

When guardrail metrics are configured, the rollout monitors metrics in both groups:

- **Treatment**: Subjects receiving the variant you are rolling out
- **Control**: Subjects not receiving the treatment variant

If a statistically significant change is observed for any guardrail metric (direction depends on metric type), the rollout is automatically **paused** or **aborted** based on the behavior you configure when you create the canary rollout.

### Configure a canary rollout

1. Create a progressive rollout targeting rule as described above.
2. Add guardrail metrics to the rollout configuration.
3. Choose whether guardrail failures should pause or abort the rollout.

<div class="alert alert-warning">Setting <code>enableExposureLogging</code> to <code>true</code> on client SDKs can impact <a href="/real_user_monitoring/">RUM</a> costs when guardrail metrics rely on exposure data.</div>

## Related concepts

- [Traffic splitting](/feature_flags/concepts/traffic_splitting/) explains how percentage rollouts assign subjects deterministically.
- [Targeting rules](/feature_flags/concepts/targeting_rules/) define filters and rule types, including progressive rollouts and experiments.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
