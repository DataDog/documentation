---
title: Trigger a Page
aliases:
- /service_management/on-call/pages
- /service_management/on-call/triggering_pages/
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

A Page is sent to a Team and subsequently routed through that Team's escalation policies and schedules. After your Team is [onboarded to Datadog On-Call][1], you can start paging it.

### Page from notifications
You can send a Page by mentioning a Team's handle with `oncall-` prepended. For example: to send a Page to the Checkout Operations team (`@checkout-operations`), mention `@oncall-checkout-operations`.

{{< img src="incident_response/on-call/notification_page.png" alt="Notification that mentions an On-Call Team." style="width:80%;" >}}

You can send Pages to On-Call Teams wherever @-handles are supported, including monitors, Incident Management, security detection rules, Event Management, and more.

#### Resolving pages automatically
When a monitor recovers, any Page it triggered is automatically set to `Resolved` if the recovery notification includes the On-Call team mention (for example, `@oncall-payments`). If the mention appears only in the alert template (such as within `{{#is_alert}} ... {{/is_alert}}`) and not in the recovery message, the Page does not auto-resolve. 

#### Monitors and dynamic urgencies

If you send a Page through a monitor alert, and your Team's routing rule uses dynamic urgencies:
- If the WARN threshold is crossed, the Page urgency is set to `low`.
- If the ALERT threshold is crossed, the Page urgency is set to `high`.

### Trigger Pages through emails

You can generate a unique email address that is used to trigger a Page directly to the team's on-call responders. When an email is sent to this address, it initiates the paging process using your configured routing and escalation policies. For added clarity and ease of use, some customers choose to embed this paging address within a more human-readable distribution list (for example, [page-network@company.com](mailto:page-network@company.com)), which can make life easier in case the email is destined to be used by humans.
To page a team through email:

 1. Navigate to the on-call team's page and scroll down to "Custom Triggering Sources".
 2. Click "Generate" under the email trigger section. This generates a unique email address that can be used to trigger a Page directly to the team's on-call responders.

### Trigger Pages through incidents

You can trigger a Page directly from an active incident. This allows you to escalate and bring in responders without leaving the incident workflow. See [Trigger a Page from an incident][5] for detailed instructions.

### Trigger Pages through calls

You can trigger a Page through live call routing, which lets users initiate a Page by calling a dedicated phone number. This provides an additional channel for urgent situations. For setup instructions, see [Live Call Routing][3].

### Page manually

You can manually send a Page directly in the Datadog platform, or through a tool like Slack or Microsoft Teams. This lets you alert a Datadog team or an individual directly (even if they aren't On-Call).

### Reroute Pages
You can reroute an active Page to a different user or team if it is still open. You can only reroute Pages that are Triggered or Acknowledged; you cannot reroute Pages that are Resolved.

To reroute a Page:

1. Open the active Page.
1. Click **Reassign**.
1. Choose the user or team you want to send it to.
1. (Optional) Add a short message explaining the handoff.
1. Confirm the reroute.

The new recipient is notified immediately, and the Page continues from its current state.

#### Through Datadog

1. Go to [**On-Call** > **Teams**][2].
1. Find the Team you want to page. Select **Page**.
   {{< img src="incident_response/on-call/manual_page.png" alt="The list of On-Call Teams, showing the Checkout Operations Team. Three buttons are displayed: Schedules, Escalation Policies, Page." style="width:80%;" >}}
1. Enter a **Page title**. You can also select **Tags** and add more context in the **Description** field. Select **Page**.

Manually paging a Team through Datadog always results in a `high` urgency Page.

#### Through Slack
1. Install the Datadog app
1. Enter `/datadog page` or `/dd page`.
1. Select a Team to send a Page to.

Manually paging a Team from Slack always results in a `high` urgency Page.

To send Pages to Slack, see [Routing Rules][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams
[3]: /incident_response/on-call/triggering_pages/live_call_routing
[4]: /incident_response/on-call/routing_rules/#send-pages-to-slack-or-microsoft-teams
[5]: /incident_response/incident_management/notification/#trigger-a-page-from-an-incident
