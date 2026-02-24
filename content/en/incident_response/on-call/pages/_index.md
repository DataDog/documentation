---
title: Pages
aliases:
- /service_management/on-call/pages/
- /service_management/on-call/triggering_pages/
- /incident_response/on-call/triggering_pages/
further_reading:
- link: '/incident_response/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
- link: '/incident_response/incident_management/'
  tag: 'Documentation'
  text: 'Incident Management'
---

A Page is an alert that requires an on-call responder's attention. Pages move through the following life cycle:

- **Triggered**: The Page has been sent, but no one has taken ownership. The escalation policy runs according to its configuration, notifying additional responders if no one responds within the defined time frame.
- **Acknowledged**: A responder has claimed the Page. Escalation notifications stop, and the responder begins working on the issue.
- **Resolved**: The underlying issue has been addressed, and the Page is closed.

This guide explains how to trigger, acknowledge, reassign, and resolve Pages.

## Trigger a Page

A Page is sent to a Team and routed through its escalation policies and schedules. After your Team is [onboarded to Datadog On-Call][1], you can start paging it.

### Trigger Pages from monitors

Send a Page by mentioning a Team's handle with `oncall-` prepended. For example, to send a Page to the Checkout Operations Team (`@checkout-operations`), mention `@oncall-checkout-operations`.

{{< img src="service_management/oncall/notification_page.png" alt="Notification that mentions an On-Call Team." style="width:80%;" >}}

You can send Pages to On-Call Teams anywhere @-handles are supported, including monitors, Incident Management, security detection rules, and Event Management.

#### Resolving Pages automatically

When a monitor recovers, any Page it triggered is automatically set to `Resolved` if the recovery notification includes the On-Call Team mention (for example, `@oncall-payments`).

If the mention appears only in the alert template (for example, within `{{#is_alert}} ... {{/is_alert}}`) and not in the recovery message, the Page does not auto-resolve.

#### Monitors and dynamic urgencies

If you send a Page through a monitor alert and the Team's routing rule uses dynamic urgencies:
- If the WARN threshold is crossed, the Page urgency is set to `low`.
- If the ALERT threshold is crossed, the Page urgency is set to `high`.

### Trigger Pages through email

Generate a unique email address to trigger a Page directly to a Team's on-call responders. Emails sent to this address follow the Team's configured routing and escalation policies.

Some teams embed this address in a human-readable distribution list (for example, `page-network@company.com`) to make it more recognizable.

To page a Team through email:

1. Go to the Team's page and scroll to **Custom Triggering Sources**.
1. Under the email trigger section, click **Generate**.

### Trigger Pages through incidents

Trigger a Page directly from an active incident to escalate and involve additional responders without leaving the workflow. See [Trigger a Page from an incident][5] for detailed instructions.

### Trigger Pages through calls

Trigger a Page through [Live Call Routing][3] by calling a dedicated phone number.

### Trigger Pages manually

Send a Page from the Datadog platform, or through a tool like Slack or Microsoft Teams. This lets you alert a Team or individual directly, even if they are not On-Call.

#### Through Datadog

1. Go to [**On-Call** > **Teams**][2].
1. Find the Team you want to page. Select **Page**.
   {{< img src="service_management/oncall/manual_page.png" alt="The list of On-Call Teams, showing the Checkout Operations Team. Three buttons are displayed: Schedules, Escalation Policies, Page." style="width:80%;" >}}
1. Enter a **Page title** and add more context in the **Description** field. Select **Page**.

Pages sent manually through Datadog are always `high` urgency.

#### Through Slack

1. Install the Datadog Slack app.
1. Enter `/datadog page` or `/dd page`.
1. Select a Team to send a Page to.

Pages sent from Slack are always `high` urgency.

To receive Page notifications in Slack, see [Routing Rules][4].

## Respond to a Page

Go to [**On-Call** > **Pages**][7] to view all active and historical Pages. Click a Page to open its side panel and take action, or select the checkbox next to one or more Pages to bulk-edit them.

{{< img src="service_management/oncall/on-call-pages-list.png" alt="The On-Call Pages list view with sub-tabs for Active, Triggered, Acknowledged, Resolved, and All, and a table showing each page's name, status, Team, responders, and creation date" style="width:100%;" >}}

### Acknowledge a Page

Acknowledging a Page signals that you're actively working on it and stops the escalation policy from notifying the next tier of responders. If you do not acknowledge the Page, escalation continues and additional responders may be paged.

To acknowledge a Page:

1. Click the Page to open its side panel.
1. Under **Next Steps**, select **Acknowledge**.

The Page status changes to `Acknowledged`.

{{< img src="service_management/oncall/on-call-page-side-panel.png" alt="An On-Call Page side panel showing the page status, urgency, responder, and service, with Next Steps buttons to Acknowledge, Reassign, Resolve, or Declare Incident" style="width:70%;" >}}

### Reassign a Page

Reassign a Page if it was routed to the wrong person or Team, or if you need to transfer ownership to someone better positioned to respond. When you reassign a Page, the Page history remains intact.

To reassign a Page:

1. Click the Page to open its side panel.
1. Under **Next Steps**, select **Reassign**. This opens a **Reassign Page** modal.

   {{< img src="service_management/oncall/on-call-reassign-page.png" alt="The Reassign Page modal with a toggle to reassign to a Team or User, a team selection dropdown, and an optional comment field" style="width:60%;" >}}

1. Select the user or Team to reassign to.
1. Optionally, add a comment explaining the handoff.
1. Click **Reassign**.

The new recipient is notified immediately.

**Note**: You can only reassign Pages with a `Triggered` or `Acknowledged` status.

### Resolve a Page

Resolve a Page when the underlying issue is addressed. This closes the Page and sets its status to `Resolved`.

To resolve a Page:

1. Click the Page to open its side panel.
1. Under **Next Steps**, select **Resolve**.

If the Page was triggered by a monitor, it resolves automatically when the monitor recovers—provided the recovery notification includes the On-Call Team mention. See [Trigger a Page](#trigger-a-page) for details.

### Declare an incident from a Page

If a Page requires cross-team coordination, stakeholder communication, or formal tracking, promote it to an incident. This creates an incident in [Incident Management][6] with the Page context pre-filled.

To declare an incident:

1. Click the Page to open its side panel.
1. Under **Next Steps**, select **Declare Incident**.
1. Review and adjust the pre-filled details as needed.

   {{< img src="service_management/oncall/on-call-declare-incident-demo.png" alt="The Declare Incident modal pre-filled with the Page title and summary, with fields for incident type, severity level, incident commander, and team" style="width:100%;" >}}

1. Select **Declare Incident** to confirm.

For guidance on incident severity levels and responder roles, see [Incident Management][6].

### Add a comment

The Page timeline is an activity log that records when the Page was triggered, who was notified, and how escalation progressed. You can add your own comments to provide context for other responders.

{{< img src="service_management/oncall/on-call-timeline-demo.png" alt="The Timeline section of an On-Call Page showing a comment input field and a chronological log of events including the Page trigger, notifications sent, and acknowledgment" style="width:60%;" >}}

Use comments to:
- Document what you've already investigated or ruled out
- Provide context when handing off to another responder
- Record external factors that affected your response

To add a comment, open the Page and enter your text in the **Timeline** section.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams
[3]: /incident_response/on-call/pages/live_call_routing
[4]: /incident_response/on-call/routing_rules/#send-pages-to-slack-or-microsoft-teams
[5]: /incident_response/incident_management/notification/#trigger-a-page-from-an-incident
[6]: /incident_response/incident_management/
[7]: https://app.datadoghq.com/on-call/pages
