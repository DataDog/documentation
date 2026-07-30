---
title: Ensuring Reliable Delivery
description: Allowlist Datadog sending addresses and check sender authentication so Datadog email is not filtered or suppressed.
further_reading:
- link: "/account_management/email_delivery/troubleshooting_email_delivery/"
  tag: "Documentation"
  text: "Troubleshoot an email that already failed"
- link: "/account_management/email_delivery/how_email_delivery_works/"
  tag: "Documentation"
  text: "What bounces and suppressions mean"
---

## Overview

Prepare your mail environment to accept Datadog email so legitimate messages are not filtered or suppressed. Share these steps with whoever manages the email infrastructure for your organization.

## Allowlist Datadog senders

To reliably receive Datadog email notifications, add the Datadog sending addresses for your site to the list of trusted senders for your organization. This helps keep Datadog email out of spam filters and suppression lists.

| Site    | Sending addresses                                                                     |
| ------- | ------------------------------------------------------------------------------------- |
| US1     | `noreply@datadoghq.com`, `alert@datadoghq.com`, `alert@dtdg.co`, `no-reply@dtdg.co`    |
| EU1     | `*@dtdg.eu`                                                                           |
| US1-FED | `*@ddog-gov.com`                                                                      |

## Check your sender authentication

If your organization enforces strict mail security, confirm that your SPF, DKIM, and DMARC policies accept Datadog mail. A strict inbound policy that rejects the Datadog sender is a common cause of failures.

If you forward Datadog email, make sure your forwarding setup and DNS records, especially SPF, account for it. A missing SPF update on a forwarding address often causes bounces.

For failures that have already occurred, see [Common reasons email fails][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/email_delivery/troubleshooting_email_delivery/#common-reasons-email-fails
