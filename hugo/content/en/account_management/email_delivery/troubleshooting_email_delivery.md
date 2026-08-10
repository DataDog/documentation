---
title: Troubleshooting Email Delivery
description: Diagnose and resolve a Datadog email that a recipient did not receive.
private: true
site_support_id: email_delivery
further_reading:
- link: "/help/"
  tag: "Documentation"
  text: "Contact Datadog Support"
- link: "/account_management/email_delivery/how_email_delivery_works/#delivery-status"
  tag: "Documentation"
  text: "Status and suppression definitions"
- link: "/account_management/email_delivery/setting_up_reliable_delivery/"
  tag: "Documentation"
  text: "Prevent failures with trusted senders and authentication"
- link: "/account_management/audit_trail/guides/track_email_delivery/#check-whether-an-email-was-delivered"
  tag: "Guide"
  text: "Query delivery events and set up alerts"
---

## Overview

When a user reports that they did not receive a Datadog email, use this page to diagnose and fix the problem. To audit delivery events across your organization or set up alerts, see [Track email delivery in your organization][1].

## Troubleshooting steps

1. Check the delivery outcome in [Email Delivery][2], filtering by the recipient's address:
   - **Delivered**: ask the recipient to check their spam or junk folder, along with any mailbox rules or blocklists that filter Datadog mail.
   - **Bounced**: the receiving mail server rejected the message and returned a reason. Correct the address or mailbox if it is invalid or full. If the server filters or blocks Datadog mail, [add Datadog to your trusted senders][3] and share the reason and event timestamp with your email administrator.
   - **Dropped**: the address is suppressed. See [Email suppressions][4] to have it cleared.
2. If email is still missing, contact [Datadog Support][5] for review.

## Investigate a failed email

Trace a failure from the Email Delivery dashboard to the underlying audit event:

1. In the **Email Delivery Failures** table, click the row for the affected recipient or email type.
2. Select **View audit events** to open the full Audit Trail for that delivery attempt.
3. Click an individual audit event to inspect delivery details, including the SMTP code, mail server response, and recipient information.

## Common reasons email fails

| Reason                                        | What it means                                                                                                                                                          | What to do                                                                                                                                                                                          |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mailbox not found                             | The recipient address does not exist.                                                                                                                                  | Check for typos or a removed mailbox, then correct the address and send again.                                                                                                                       |
| Full mailbox                                  | The recipient inbox is over quota.                                                                                                                                     | Ask the recipient to free up inbox space, then send again.                                                                                                                                           |
| Sender not authenticated or blocked by policy | The recipient mail server or a group policy rejected the Datadog sender, often due to authentication (SPF, DKIM, DMARC) or a rule requiring authenticated senders.        | Ask the recipient mail administrator to [add Datadog to their trusted senders][3]. If the response cites a [sender authentication][6] or DMARC failure, contact [Datadog Support][5], because resolving it can involve both parties. |
| Suppressed (dropped)                          | A suppression rule, account setting, or system protection blocked the message, commonly after an earlier bounce.                                                        | See [Email suppressions][4].                                                                                                                                                                        |
| Flagged as spam                               | The recipient mail server or security gateway classified the message as spam based on its content.                                                                     | See [Email security gateways][7].                                                                                                                                                                   |

**Note**: The recipient mail server generates SMTP responses, and they are not always precise. Use them as a strong signal, not a guarantee of the exact cause.

## Email suppressions

After an email bounces, Datadog adds the address to a suppression list and stops sending to it until the suppression is cleared.

Contact [Datadog Support][5] and provide these items to remove the suppression:

- The email address of the blocked recipient
- A link to the bounce event in the Email Delivery dashboard or Audit Trail

**Note**: Removing a suppression does not fix the underlying cause. If the failure persists after removal, share the event timestamp and SMTP response with your email administrator or mail provider to investigate further.

## When no delivery event appears

Some failures never produce a delivery event, because Datadog does not attempt the send. If you cannot find any event for a recipient, check whether the account is in one of these states:

- **Unverified users**: invited, but have not accepted the invitation yet.
- **Disabled users**: deactivated users do not receive notifications.

## Email security gateways

If your organization routes inbound mail through an email security gateway or through built-in protection in your mail platform, it can quarantine or block Datadog email even when your trusted sender entries and sender authentication are set up correctly. Gateways apply their own filtering, so a message can pass SPF, DKIM, and DMARC and still be held.

If Datadog email still does not arrive, contact your email security gateway provider. A gateway is often the cause when Email Delivery shows a message as Delivered but the recipient cannot find it, including in their spam or junk folder, or when messages are blocked for valid addresses. Share the timestamps from the Email Delivery event so the provider can locate the affected messages and confirm why they were quarantined or blocked.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/audit_trail/guides/track_email_delivery/
[2]: https://app.datadoghq.com/dash/integration/email_delivery_tracking
[3]: /account_management/email_delivery/setting_up_reliable_delivery/#add-datadog-to-your-trusted-senders
[4]: #email-suppressions
[5]: /help/
[6]: /account_management/email_delivery/setting_up_reliable_delivery/#check-your-sender-authentication
[7]: #email-security-gateways
