---
title: Email Delivery
description: Confirm delivery, monitor failures, and troubleshoot the email Datadog sends on your organization's behalf.
private: true
site_support_id: email_delivery
further_reading:
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Set up Audit Trail"
- link: "/account_management/audit_trail/guides/track_email_delivery/"
  tag: "Guide"
  text: "Track email delivery in your organization"
---

## Overview

Datadog sends email for critical workflows such as user invitations, account verifications, password resets, scheduled reports, and monitor alert notifications. Email Delivery gives organization administrators visibility into what happens to those messages after they leave Datadog, so you can confirm an email was delivered, monitor and investigate failures, and set up your organization to receive Datadog mail reliably.

This documentation is for administrators who manage users, alerting, and email workflows in a Datadog organization.

## Prerequisites

- A [paid plan][1] (Pro or Enterprise)
- The `org_management` permission, included in the default [Datadog Admin role][2]

## Learn about email delivery

| Page                                | Information                                            |
| ----------------------------------- | ------------------------------------------------------ |
| [How Email Delivery Works][4]       | Delivery outcomes, bounces, and suppressions explained |
| [Monitoring Email Delivery][5]      | Reading the dashboard and alerting on failures         |
| [Troubleshooting Email Delivery][6] | Diagnosing and resolving a failed email                |
| [Setting Up Reliable Delivery][7]   | Trusted sender and sender authentication setup         |

Start with [How Email Delivery Works][4] to understand delivery outcomes, then use [Monitoring Email Delivery][5] to see them in your organization.

## Feature availability

Every paid plan includes the [Email Delivery dashboard][3] for recent activity. Enabling Audit Trail extends how long events are kept and lets you search, monitor, and export them.

|                                   | Without Audit Trail | With Audit Trail               |
| --------------------------------- | ------------------- | ------------------------------ |
| Available on                      | Any paid plan       | Any paid plan with Audit Trail |
| Event history                     | 7 days              | 90 days                        |
| View the Email Delivery dashboard | ✓                   | ✓                              |
| Full delivery event details       | —                   | ✓                              |
| Search and filter events          | —                   | ✓                              |
| Monitors and alerts on events     | —                   | ✓                              |
| Export for audit and compliance   | —                   | ✓                              |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/pricing/
[2]: /account_management/rbac/permissions/#access-management
[3]: /account_management/email_delivery/monitoring_email_delivery/#email-delivery-dashboard
[4]: /account_management/email_delivery/how_email_delivery_works/
[5]: /account_management/email_delivery/monitoring_email_delivery/
[6]: /account_management/email_delivery/troubleshooting_email_delivery/
[7]: /account_management/email_delivery/setting_up_reliable_delivery/
