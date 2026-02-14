---
title: Responding to Pages
aliases:
- /service_management/on-call/responding_to_pages/
further_reading:
- link: '/incident_response/on-call/triggering_pages'
  tag: 'Documentation'
  text: 'Trigger a Page'
- link: '/incident_response/on-call/escalation_policies'
  tag: 'Documentation'
  text: 'Escalation Policies'
---

When you receive a Page in Datadog On-Call, you can acknowledge it, resolve it, or reroute it to another responder. This page explains how to manage and respond to Pages.

## Page statuses

Pages in Datadog On-Call have three possible statuses:

- **Triggered**: The Page has been created and sent to responders. Notifications are actively being sent according to the escalation policy.
- **Acknowledged**: A responder has acknowledged the Page and is working on it. Escalation stops once a Page is acknowledged.
- **Resolved**: The issue has been resolved and the Page is closed. No further notifications are sent.

## Acknowledge a Page

Acknowledging a Page indicates that you are aware of the issue and are working on it. When you acknowledge a Page, it stops escalating to other responders.

To acknowledge a Page:

1. Open the Page from your notification (email, SMS, push notification, or Slack/Microsoft Teams).
1. Click **Acknowledge** or reply with the acknowledgment command through your notification channel.

You can also acknowledge a Page directly in the Datadog UI:

1. Go to [**On-Call** > **Pages**][1].
1. Find the Page you want to acknowledge.
1. Click **Acknowledge**.

### Acknowledge through notification channels

Depending on how you receive notifications, you can acknowledge Pages directly from your notification:

- **Email**: Click the **Acknowledge** button in the Page notification email
- **SMS**: Reply with `ack` to acknowledge
- **Mobile app**: Tap **Acknowledge** in the push notification
- **Slack**: Click **Acknowledge** in the Page message or use the `/datadog page ack` command
- **Microsoft Teams**: Click **Acknowledge** in the Page message

## Resolve a Page

Resolving a Page marks the issue as complete and closes the Page. Once resolved, no further notifications are sent.

To resolve a Page:

1. Go to [**On-Call** > **Pages**][1].
1. Find the Page you want to resolve.
1. Click **Resolve**.

You can also resolve Pages through notification channels:

- **Email**: Click the **Resolve** button in the Page notification email
- **SMS**: Reply with `resolve` to resolve
- **Mobile app**: Tap **Resolve** in the push notification
- **Slack**: Click **Resolve** in the Page message or use the `/datadog page resolve` command
- **Microsoft Teams**: Click **Resolve** in the Page message

### Automatic resolution

Pages can be automatically resolved in the following scenarios:

- **Monitor recovery**: When a monitor that triggered a Page recovers, the Page is automatically resolved if the recovery notification includes the On-Call team mention (for example, `@oncall-payments`).
- **Escalation policy setting**: If your escalation policy is configured to automatically resolve Pages after all steps are executed, the Page is resolved after the final escalation step.

## Reroute a Page

If you need to hand off a Page to another responder, you can reroute it. You can reroute Pages that are `Triggered` or `Acknowledged`. You cannot reroute Pages that are `Resolved`.

To reroute a Page:

1. Open the Page in the Datadog UI at [**On-Call** > **Pages**][1].
1. Click **Reassign**.
1. Select the user or team you want to send the Page to.
1. (Optional) Add a message explaining the handoff.
1. Click **Confirm**.

The new recipient is notified immediately, and the Page continues from its current state.

## Escalate a Page

If a Page is not acknowledged within the timeframe defined in the escalation policy, it automatically escalates to the next step. You do not need to manually escalate a Page—this happens automatically based on your escalation policy configuration.

To modify escalation behavior, update your [escalation policy][2].

## View Page history and details

Each Page includes a detailed history of all actions taken, including:

- When the Page was triggered and by whom or what
- All responders who were notified
- Acknowledgment and resolution timestamps
- Who acknowledged or resolved the Page
- Any rerouting or reassignments

To view Page details:

1. Go to [**On-Call** > **Pages**][1].
1. Click on the Page you want to review.
1. Review the timeline on the right side panel.

## Best practices

- **Acknowledge promptly**: Acknowledge Pages as soon as you start working on them to prevent unnecessary escalations.
- **Add context when rerouting**: When rerouting a Page, include a message explaining why you're handing it off and any relevant context about what you've investigated.
- **Resolve when complete**: Mark Pages as resolved as soon as the issue is fixed to keep your Page list clean and provide accurate metrics.
- **Review escalation policies**: If you find Pages are escalating too quickly or too slowly, work with your team to adjust the escalation policy timeframes.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/pages
[2]: /incident_response/on-call/escalation_policies
