---
title: Scheduled Rollouts
description: Learn how to schedule a targeting rule to start automatically at a future date and time.
further_reading:
- link: "/feature_flags/concepts/targeting_rules"
  tag: "Documentation"
  text: "Targeting Rules and Filters"
- link: "/feature_flags/concepts/approvals"
  tag: "Documentation"
  text: "Feature Flags Approvals"
- link: "/feature_flags/concepts/flag_history"
  tag: "Documentation"
  text: "Feature Flag History"
---

## Overview

Instead of activating a targeting rule immediately, you can schedule it to start automatically at a future date and time. This is available for both [feature gates](/feature_flags/concepts/targeting_rules/#targeting-rule-types) and [progressive rollouts](/feature_flags/concepts/targeting_rules/#targeting-rule-types).

A feature gate normally starts as soon as you save it. A [progressive rollout](/feature_flags/use_cases/progressive_rollouts/#start-and-control-the-rollout) normally requires you to click **Start Rollout** to begin. When you schedule a start time on either rule type instead, it activates automatically at that time.

The flag still needs to be enabled in the environment for the rule to take effect once it starts. If the flag is already enabled, no further action is required.

## Schedule a rollout start

To schedule a start time for a targeting rule:

1. Navigate to **Feature Flags** and select your flag.
2. Select the environment whose rule you want to modify.
3. Click **Add Targeting Rule** (or click the targeting rule you want to modify).
4. Select **Schedule a start time**.
5. Choose a date and time for the rule to begin. The picker defaults to the next full hour, and past dates and times cannot be selected.
6. Click **Save**.

{{< img src="feature_flags/concepts/schedule-a-rollout-start.png" alt="Targeting Rule editor side panel on a feature flag with a scheduled start." style="width:70%;" >}}

<div class="alert alert-info">
If the flag is disabled in the environment, the rule does not run. Enable the flag before the scheduled rollout for it to take effect.
</div>

## Change or cancel a scheduled start

You can reschedule to a new time, or uncheck **Schedule a start time** to cancel it, at any time before the scheduled start.

## Edit a rollout that has already started or completed

After a rollout starts, you cannot edit the targeting rule while it's running. To make changes, stop the rollout first, then edit the rule.

After a rollout completes, you cannot make any changes to it.

A [feature gate](/feature_flags/concepts/targeting_rules/#targeting-rule-types) without a schedule starts as soon as you save it, so you cannot add a schedule to it afterward.

## Approve a rollout whose start time has passed

If a scheduled rule change requires [approval](/feature_flags/concepts/approvals/), the rollout does not start automatically while the change is still pending. If the scheduled start time passes before a reviewer approves it, the rollout does not start. See [Approve, reject, or apply](/feature_flags/concepts/approvals/#approve-reject-or-apply) for details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
