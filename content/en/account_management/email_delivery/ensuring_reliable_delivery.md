---
title: Ensuring Reliable Delivery
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

Datadog sends email from the following addresses and domains, all of which are owned by Datadog. Add them to your organization's list of trusted email senders:

```text
noreply@datadoghq.com
no-reply@datadoghq.com
no-reply@dtdg.co
alert@datadoghq.com
*@admin.dtdg.co
*@dtdg-trial.co
*@dtdg.eu
*@admin.dtdg.eu
*@dtdg-trial.eu
*@ddog-gov.com
```

If you receive Datadog email from a sender that is not listed here, contact [Datadog Support][1].

## Check your sender authentication

Datadog publishes SPF and DKIM records for these domains, so Datadog email is expected to pass inbound authentication checks. If it does not, contact [Datadog Support][1] with the recipient address and the approximate send time.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
