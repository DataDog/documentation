---
title: Trigger a Page
aliases:
- /service_management/on-call/pages
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

A Page is sent to a Team and subsequently routed through that Team's escalation policies and schedules. After your Team is [onboarded to Datadog On-Call][1], you can start paging it.

### Page from notifications
You can send a Page by mentioning a Team's handle with `oncall-` prepended. For example: to send a Page to the Checkout Operations team (`@checkout-operations`), mention `@oncall-checkout-operations`.

{{< img src="service_management/oncall/notification_page.png" alt="Notification that mentions an On-Call Team." style="width:80%;" >}}

You can send Pages to On-Call Teams wherever @-handles are supported, including monitors, Incident Management, security detection rules, Event Management, and more.

#### Monitors and dynamic urgencies

If you send a Page through a monitor alert, and your Team's routing rule uses dynamic urgencies:
- If the WARN threshold is crossed, the Page urgency is set to `low`.
- If the ALERT threshold is crossed, the Page urgency is set to `high`.

### Trigger Pages through emails

You can generate a unique email address that is used to trigger a page directly to the team's on-call responders. When an email is sent to this address, it initiates the paging process using your configured routing and escalation policies. For added clarity and ease of use, some customers choose to embed this paging address within a more human-readable distribution list (for example, [page-network@company.com](mailto:page-network@company.com)), which can make life easier in case the email is destined to be used by humans.
To page a team through email:

 1. Navigate to the on-call team's page and scroll down to "Custom Triggering Sources".
 1. Click "Generate" under the email trigger section. This generates a unique email address that can be used to trigger a page directly to the team's on-call responders.

### Trigger Pages through calls

You can also trigger a Page through live call routing, which lets users initiate a Page by calling a dedicated phone number. This provides an additional channel for urgent situations. For setup instructions, see [Live Call Routing][3].


### Page manually

You can manually send a Page directly in the Datadog platform, or through a tool like Slack or Microsoft Teams. This lets you alert a Datadog team or an individual directly (even if they aren't On-Call).

#### Through Datadog

1. Go to [**On-Call** > **Teams**][2].
1. Find the Team you want to page. Select **Page**.
   {{< img src="service_management/oncall/manual_page.png" alt="The list of On-Call Teams, showing the Checkout Operations Team. Three buttons are displayed: Schedules, Escalation Policies, Page." style="width:80%;" >}}
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

[1]: /service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams
[3]: /service_management/on-call/triggering_pages/live_call_routing
[4]: /service_management/on-call/routing_rules/#send-pages-to-slack-or-microsoft-teams
