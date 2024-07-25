---
title: Send a Page
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

A Page is sent to a Team and subsequently routed through that Team's escalation policies and schedules. After your Team is [onboarded to Datadog On-Call][1], you can start paging it.

### Page from notifications
You can send a Page by mentioning a Team's handle with `oncall-` prepended. For example: to send a Page to the Checkout Operations team (`@checkout-operations`), mention `@oncall-checkout-operations`.

{{< img src="service_management/oncall/notification_page.png" alt="Notification that mentions an On-Call Team." style="width:80%;" >}}

You can send Pages to On-Call Teams where @-handles are supported, including monitors, Incident Management, security detection rules, Event Management, and more.

#### Monitors and dynamic urgencies

If you send a Page through a monitor alert, and your Team's processing rule uses dynamic urgencies:
- If the WARN threshold is crossed, the Page urgency is set to `low`.
- If the ALERT threshold is crossed, the Page urgency is set to `high`.

### Page manually

You can manually send a Page directly in the Datadog platform, through a tool like Slack or Microsoft Teams, or with the Datadog API.

#### Through Datadog

#### Through Slack or Microsoft Teams
1. Install the Datadog app
2. Enter `/datadog page` or `/dd page`.
3. Select a Team to send a Page to.

Manually paging a Team from Slack or Microsoft Teams always results in a `high` urgency Page.

#### Through the API