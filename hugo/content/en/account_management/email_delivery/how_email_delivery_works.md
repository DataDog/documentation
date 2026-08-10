---
title: How Email Delivery Works
description: Understand delivery outcomes, SMTP bounce codes, and suppressions for the email Datadog sends.
private: true
site_support_id: email_delivery
further_reading:
- link: "/account_management/email_delivery/troubleshooting_email_delivery/"
  tag: "Documentation"
  text: "Troubleshoot delivery failures"
- link: "/account_management/email_delivery/monitoring_email_delivery/"
  tag: "Documentation"
  text: "Monitor email delivery"
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Set up Audit Trail"
---

## Overview

Email delivery involves more than one system: Datadog sends the message, and the recipient's mail server decides whether to accept or reject it. Email Delivery reports one outcome for each message, based on the response the recipient's mail server returns. If the address is suppressed, Datadog does not send the message.

When a receiving server rejects a message, it returns a standardized SMTP response code, such as `550` for an unavailable mailbox. These codes are an industry standard ([RFC 5321][1]) that every mail system uses, including Datadog. Because each mail server applies them differently, a code is a strong signal but not always an exact reason. For the failures you are most likely to encounter, see [Common reasons email fails][2].

## What Email Delivery tracks

Email Delivery records outcomes for the email Datadog sends on your organization's behalf, such as user invitations, account verifications, password resets, scheduled reports, and monitor alert notifications. Delivery events are recorded from the date the feature is enabled for your organization. Email sent before then is not tracked.

## Delivery status

Email Delivery reports the delivery outcome of each email event:

| Status    | Definition                                                                                                      |
| --------- | --------------------------------------------------------------------------------------------------------------- |
| Delivered | The recipient's mail server accepted the message.                                                               |
| Bounced   | The recipient's mail server rejected the message.                                                               |
| Dropped   | Datadog did not send the message, because a suppression rule, account setting, or system protection blocked it.  |

## Bounces and suppressions

Two concepts explain most failures:

- **Bounce**: the recipient's mail server rejected the message. This usually means the address is invalid, the mailbox is full, or the server rejected Datadog's sender.
- **Suppression**: after a message to an address bounces, Datadog adds the address to a suppression list and stops sending to it until the suppression is cleared. A message skipped for this reason has a Dropped status.

To clear a suppression, see [Email suppressions][3].

For how long delivery events are kept and what Audit Trail adds, see [Feature availability][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.rfc-editor.org/info/rfc5321/
[2]: /account_management/email_delivery/troubleshooting_email_delivery/#common-reasons-email-fails
[3]: /account_management/email_delivery/troubleshooting_email_delivery/#email-suppressions
[4]: /account_management/email_delivery/#feature-availability
