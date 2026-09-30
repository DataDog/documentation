---
title: Setting Up Reliable Delivery
description: Add Datadog to your organization's trusted email senders and check sender authentication so Datadog email is not filtered or suppressed.
private: true
site_support_id: email_delivery
further_reading:
- link: "/account_management/email_delivery/troubleshooting_email_delivery/"
  tag: "Documentation"
  text: "Troubleshoot an email that already failed"
- link: "/account_management/email_delivery/how_email_delivery_works/"
  tag: "Documentation"
  text: "What bounces and suppressions mean"
---

## Overview

Datadog sends email from several addresses and domains. Share this page with whoever manages your organization's email infrastructure.

## Add Datadog to your trusted senders

<div class="alert alert-warning">Allowed senders bypass spam and spoof filtering. Entries that also bypass sender authentication (SPF, DKIM, DMARC) create risk that an attacker can deliver email that would otherwise be filtered. Do not disable authentication checks for these entries. Monitor the exceptions you add.</div>

If Datadog email is being filtered in your environment, add the senders below as trusted sources using the method that aligns with your organization's mail security policy.

Add these as individual addresses:

```text
noreply@datadoghq.com
alert@datadoghq.com
billing@datadoghq.com
marketplace-subscriptions@datadoghq.com
```

Add these as domains:

```text
dtdg.co
dtdg.eu
admin.dtdg.co
dtdg-trial.co
admin.dtdg.eu
dtdg-trial.eu
ddog-gov.com
```

**Note**: Datadog owns all of these addresses and domains. This list may not be complete. If you receive Datadog email from a sender that is not listed here, contact [Datadog Support][1].

## Check your sender authentication

Datadog publishes SPF and DKIM records for these domains, so Datadog email is expected to pass inbound authentication checks. If it does not, contact [Datadog Support][1] with the recipient address and the approximate send time.

For failures that have already occurred, see [Common reasons email fails][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /account_management/email_delivery/troubleshooting_email_delivery/#common-reasons-email-fails
