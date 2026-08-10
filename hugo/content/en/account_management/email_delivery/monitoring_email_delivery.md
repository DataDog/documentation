---
title: Monitoring Email Delivery
description: Review delivery activity in the Email Delivery dashboard and alert on failures with Audit Trail monitors.
private: true
site_support_id: email_delivery
further_reading:
- link: "/account_management/email_delivery/troubleshooting_email_delivery/"
  tag: "Documentation"
  text: "Troubleshoot delivery failures"
- link: "/account_management/audit_trail/guides/track_email_delivery/"
  tag: "Guide"
  text: "Track email delivery in your organization"
---

## Overview

Email Delivery provides a dashboard for reviewing delivery activity, and it lets you create monitors that alert you when a critical email fails.

## Access Email Delivery

Navigate to [**Organization Settings**][1] > [**Email Delivery**][2]. Access requires the `org_management` permission.

## Email Delivery dashboard

The dashboard shows requests by email type, a delivery timeline, and a breakdown of delivery failures by recipient and by email type. Filter events with these template variables:

- `email_address`
- `email_domain`
- `email_type`
- `email_status`
- `smtp_reason`

{{< img src="/account_management/email_delivery/email_delivery_dashboard.png" alt="An Email Delivery dashboard example." style="width:100%;" >}}

To trace a single failure from the dashboard to its underlying audit event, see [Investigate a failed email][3].

## Create an Audit Trail monitor

**Note**: Enable Audit Trail before you alert on email events.

1. From the Email Delivery dashboard, click **Create Monitor**, or create a monitor directly from the Audit Trail Explorer.
2. Scope the monitor to specific email types, domains, or failure reasons using the [email delivery event attributes][4].
3. Notify your administrators or the team that manages users and email workflows.

Delivery events are timely but not instantaneous. A failure appears as soon as Datadog receives the failure notice, which depends on when the recipient's mail server reports it back.

## Recommendations

- Monitor `email_bounced` and `email_dropped` events for your most critical email types.
- Because email is not a guaranteed-delivery channel, use a backup notification channel for critical alerts. For example, pair email alerts with Slack, PagerDuty, or webhooks.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: https://app.datadoghq.com/dash/integration/email_delivery_tracking
[3]: /account_management/email_delivery/troubleshooting_email_delivery/#investigate-a-failed-email
[4]: /account_management/audit_trail/guides/track_email_delivery/#event-attributes
