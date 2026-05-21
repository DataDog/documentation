---
title: Notifications
description: Configure notification channels and alert types for Datadog Feature Flags.
further_reading:
- link: "/feature_flags/concepts/approvals"
  tag: "Documentation"
  text: "Approvals"
- link: "/integrations/slack/"
  tag: "Documentation"
  text: "Slack"
---

## Overview

Feature Flags can send notifications when flag configuration changes or when rollouts require attention. Configure notification channels per flag to route alerts to the right team.

## Set up notification platforms

Before configuring flag notifications, set up the notification platform integration of your choice:

- [Slack](/integrations/slack/)
- [Microsoft Teams](/integrations/microsoft-teams/)
- [PagerDuty](/integrations/pagerduty/)
- [Webhooks](/integrations/webhooks/)

Email notifications are supported out of the box.

## Configure notifications on a flag

### New flag

When you create a flag:

1. Add a notification channel.
2. Select the notification types to send to that channel.

Error-level notifications are always enabled so you receive urgent alerts—for example, when a canary rollout fails a guardrail check.

### Existing flag

1. Navigate to your flag's details page.
2. Open **Settings > Notifications**.
3. Configure the channel and notification types.

## Notification types

Feature Flags can send notifications for the following events:

- Flag enabled or disabled in an environment
- Flag archived
- Progressive rollout started
- Targeting rule created, updated, or deleted
- Progressive rollout paused by a user
- Progressive rollout aborted by a user
- Progressive rollout paused by a guardrail
- Progressive rollout aborted by a guardrail

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
