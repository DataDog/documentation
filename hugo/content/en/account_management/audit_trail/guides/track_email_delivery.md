---
title: Track Email Delivery in Your Organization
description: Query Audit Trail for the delivery outcome of the email Datadog sends on your organization's behalf.
private: true
site_support_id: email_delivery
further_reading:
- link: "/account_management/email_delivery/troubleshooting_email_delivery/"
  tag: "Documentation"
  text: "Troubleshoot email delivery"
- link: "/account_management/email_delivery/how_email_delivery_works/"
  tag: "Documentation"
  text: "How Email Delivery works"
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Set up Audit Trail"
- link: "/account_management/audit_trail/events/"
  tag: "Documentation"
  text: "Learn about Audit Trail events"
- link: "/logs/explorer/search_syntax/"
  tag: "Documentation"
  text: "Audit Trail search syntax"
---

## Overview

Datadog sends transactional email on your organization's behalf, including user invitations, account verifications, password resets, scheduled reports, and monitor alert notifications. Each email delivery event in Audit Trail has one of three statuses:

- **Delivered**: the recipient's mail server accepted the message.
- **Bounced**: the recipient's mail server rejected the message.
- **Dropped**: Datadog did not send the message, because it was suppressed or blocked before delivery.

Use these events to confirm what happened to a message, investigate failures, and get alerted when delivery breaks down. To run a query from this guide, click a situation to open it prefilled in the [Audit Trail Explorer][1], or query for email events manually using the attributes in [Event attributes][2]. To diagnose and fix a specific reported failure, see [Troubleshoot email delivery][17].

**Note**: Enable Audit Trail to keep email delivery events for 90 days and to build monitors and dashboards on them. Events are recorded from the date you enable Audit Trail and are not retroactive.

## Check whether an email was delivered

Confirm what happened to a message and see its status. Click a situation to open the matching events.

| Situation                                            | Query in Audit Trail Explorer                                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------- |
| [A user did not receive an email][4]                 | `@evt.name:"Email Delivery" @metadata.email.recipient_address:user@example.com` |
| [Mail to an entire domain is missing][5]             | `@evt.name:"Email Delivery" @metadata.email.recipient_domain:"@example.com"` |
| [Check one kind of email, such as invitations][6]    | `@evt.name:"Email Delivery" @metadata.email.type:"Basic Invite"`           |
| [See all recorded delivery events][7]                | `@evt.name:"Email Delivery"`                                              |

## Investigate a delivery failure

Find failures and their causes across your organization. Click a situation to open the matching events.

| Situation                                                  | Query in Audit Trail Explorer                                                                                        |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [Bounced email events][8]                                  | `@evt.name:"Email Delivery" @action:email_bounced`                                                                   |
| [Alert notifications may not be reaching on-call][9]        | `@evt.name:"Email Delivery" @action:email_bounced @metadata.email.type:"Monitor Alert Notification"`                  |
| [One person is receiving no mail at all][10]                | `@evt.name:"Email Delivery" @action:(email_bounced OR email_dropped) @metadata.email.recipient_address:user@example.com` |
| [An entire recipient domain is failing][11]                 | `@evt.name:"Email Delivery" @action:(email_bounced OR email_dropped) @metadata.email.recipient_domain:"@example.com"` |
| [New users never received their invitation][12]             | `@evt.name:"Email Delivery" @action:(email_bounced OR email_dropped) @metadata.email.type:"Basic Invite"`             |
| [Password reset email is not arriving][13]                  | `@evt.name:"Email Delivery" @action:email_bounced @metadata.email.type:"Password Reset Request"`                      |
| [See what Datadog dropped before sending][14]               | `@evt.name:"Email Delivery" @action:email_dropped`                                                                   |

## Alert on delivery failures

To be notified when delivery degrades, create an [Audit Trail monitor][15] on these events:

- Alert when the number of `email_bounced` or `email_dropped` events crosses a threshold over a rolling window.
- Alert when any monitor alert notification is dropped or bounced.

**Note**: Removing an email suppression is not self-serve. After you identify the dropped email events, see [Email suppressions][3] to have the address cleared.

## Event attributes

Every Email Delivery event includes the attributes below. Use them to filter and group your searches, and to build monitors and dashboards.

| Name              | Event attribute                        | Description                                                                | Values                                                |
| ----------------- | -------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------- |
| Delivery outcome  | `@action`                              | The final result of the send attempt, and the field you filter on most often. | `email_delivered`, `email_bounced`, `email_dropped` |
| Status            | `@metadata.email_status`               | The outcome as a plain status word, the short form of the action.           | `delivered`, `bounced`, `dropped`                     |
| Timestamp         | `@metadata.event_timestamp`            | When the delivery outcome was recorded.                                    | Timestamp, such as `2026-07-11T18:30:24Z`             |
| Email type        | `@metadata.email.type`                 | The kind of email sent. Filter to focus on one workflow.                    | String, such as `Basic Invite`                        |
| Recipient address | `@metadata.email.recipient_address`    | The address the message was sent to. Filter to trace the mail for one person. | String, such as `john.doe@example.com`              |
| Recipient domain  | `@metadata.email.recipient_domain`     | The recipient domain, including the leading `@`. Filter to check a whole organization at once. | String, such as `@example.com`      |
| Subject           | `@metadata.email.subject`              | The subject line of the email, for identifying a specific message.          | String                                                |
| Message ID        | `@metadata.email.email_message_id`     | Unique ID for the message. Share it with Datadog Support to find the exact send. | String                                           |

### Delivery result

These attributes describe how the recipient mail server responded to the delivery attempt.

| Name                      | Event attribute                              | Description                                                            | Values                                                        |
| ------------------------- | -------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| SMTP code                 | `@metadata.transport.smtp_code`              | The status code from the server. Group bounces by it to spot top failure reasons. | String, such as `250`, `550`, `554`                 |
| Enhanced SMTP code        | `@metadata.transport.smtp_enhanced_code`     | A more precise status code ([RFC 3463][16]), such as `5.1.1` for an unknown mailbox. | String, such as `2.0.0`, `5.1.1`, `5.7.1`         |
| Rejection reason          | `@metadata.transport.smtp_reason`            | A short, readable reason for a bounce.                                  | String, such as `Policy/spam rejection`                       |
| Enhanced rejection reason | `@metadata.transport.smtp_reason_enhanced`   | A longer explanation of the reason, with guidance on how to resolve it.  | Sentence, such as `The recipient mail server did not respond. This is often a temporary connectivity or throttling issue on the receiving side; retry later.` |
| Raw SMTP response         | `@metadata.transport.smtp_response`          | The full, unedited server reply behind the code and reason.             | String, such as `550 5.7.1 Message rejected due to spam content` |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: #event-attributes
[3]: /account_management/email_delivery/troubleshooting_email_delivery/#email-suppressions
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Email%20Delivery%22%20%40metadata.email.recipient_address%3Auser%40example.com
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Email%20Delivery%22%20%40metadata.email.recipient_domain%3A%22%40example.com%22
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Email%20Delivery%22%20%40metadata.email.type%3A%22Basic%20Invite%22
[7]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Email%20Delivery%22
[8]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Email%20Delivery%22%20%40action%3Aemail_bounced
[9]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Email%20Delivery%22%20%40action%3Aemail_bounced%20%40metadata.email.type%3A%22Monitor%20Alert%20Notification%22
[10]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Email%20Delivery%22%20%40action%3A%28email_bounced%20OR%20email_dropped%29%20%40metadata.email.recipient_address%3Auser%40example.com
[11]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Email%20Delivery%22%20%40action%3A%28email_bounced%20OR%20email_dropped%29%20%40metadata.email.recipient_domain%3A%22%40example.com%22
[12]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Email%20Delivery%22%20%40action%3A%28email_bounced%20OR%20email_dropped%29%20%40metadata.email.type%3A%22Basic%20Invite%22
[13]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Email%20Delivery%22%20%40action%3Aemail_bounced%20%40metadata.email.type%3A%22Password%20Reset%20Request%22
[14]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Email%20Delivery%22%20%40action%3Aemail_dropped
[15]: /monitors/types/audit_trail/
[16]: https://www.rfc-editor.org/info/rfc3463/
[17]: /account_management/email_delivery/troubleshooting_email_delivery/
