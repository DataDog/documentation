---
title: SMTP Configuration
description: Connect your own SMTP server to send status page subscription emails from your own domain.
further_reading:
- link: "/incident_response/status_pages/"
  tag: "Documentation"
  text: "Status Pages"
---

## Overview

The SMTP Configuration page in Organization Settings lets you connect your own SMTP server so that status page subscription emails are sent from your own domain instead of the default Datadog sender address. This improves branding, builds subscriber trust, and reduces the likelihood of notifications being filtered as spam.

<div class="alert alert-danger">You must have <code>org_management</code> permissions to add and manage SMTP servers.</div>

## Add an SMTP server

1. In Datadog, go to [**Organization Settings** > **SMTP Configuration**][1].
1. Click **Add SMTP Server**.
1. Fill in the required fields from your email provider and click **Add SMTP Server**.
1. Select the server and click **Test Connection** to verify the configuration.

After you add and validate your SMTP server, you can select it as the email sender domain on your [status pages][2].

<div class="alert alert-info">
If the selected SMTP server fails, notifications will be sent via Datadog Default(no-reply@dtdg.co).
</div>

## Supported providers

The following email providers are supported:

| Provider | SMTP Host | TLS Ports |
|---|---|---|
| SendGrid | `smtp.sendgrid.net` | 587, 465 |
| Mailgun | `smtp.mailgun.org` | 587, 465 |
| Amazon SES | `*.amazonaws.com` | 587, 465 |
| Postmark | `smtp.postmarkapp.com` | 587, 465 |
| SparkPost | `smtp.sparkpostmail.com` | 587, 465 |
| Mandrill (Mailchimp Transactional) | `smtp.mandrillapp.com` | 587, 465 |
| Brevo (formerly Sendinblue) | `smtp-relay.brevo.com` | 587, 465 |
| Elastic Email | `smtp.elasticemail.com` | 587, 465 |
| Google Workspace / Gmail | `smtp.gmail.com` | 587, 465 |
| Google Workspace / Gmail (Relay) | `smtp-relay.gmail.com` | 587, 465 |
| Microsoft 365 / Outlook | `smtp.office365.com` | 587, 465 |

If your provider isn't listed, [submit a request][3] to have it added.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/smtp-configuration/smtp-servers
[2]: /incident_response/status_pages/#configure-a-custom-email-sender-domain
[3]: https://app.datadoghq.com/forms/share/0e60439939478dc5063c2bc665a8cfdaf1b9ec19f6df55821c82096cbd3f9672
