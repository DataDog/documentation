---
title: Cloud SIEM Data Security
disable_toc: false
aliases:
- /path-to-old-doc/
further_reading:
- link: "/data_security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
- link: "/data_security/pci_compliance/"
  tag: "Documentation"
  text: "Set up a PCI-compliant Datadog organization"
---

<div class="alert alert-info">This page is about the security of data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security/" target="_blank">Security</a> section.</div>

## Overview

A security signal is generated when at least one case defined in a detection rule is matched over a given period of time. You can customize detection rules to provide notification messages that contain specific information about the signal (for example, user ID, IP addresses, and so on) and the triggering group-by values of the signal. Security rules can also use webhooks to send notifications to third-party services. Since data sent to Datadog may contain sensitive information, this document goes over those notification features and what to do if you do not want users to have access to these features.

## Security rules can use message template variables

When you create a detection rule you can customize the notification message with [notification variables][1], which adds specific information related to the signal. For example, if the following JSON object is associated with a security signal:

```
{
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  },
  "usr": {
    "id": "user@domain.com"
  },
  "used_mfa": "false"
}
```
Using `{{@network.client.ip}}` in the notification message displays the IP addresses associated with the signal.

Contact [support][2] if you do not want users to be able to add template variables to notification messages.

## Security rules can include triggering group-by values in the notification title

In the **Describe your playbook** section for [log detection rules][3] and [signal correlation rules][4], you can add group-by values in the notification title. For example, if you are grouping by `service`, the service name shows in the title. Uncheck **Include triggering group-by values in notification title** to opt out of adding triggering group-by values to the title.

Contact [support][2] If you do not want the option to include triggering group-by values in the notification title.

## Security rules can use webhooks

<div class="alert alert-warn">If you are a <a href = "https://docs.datadoghq.com/data_security/hipaa_compliance/">HIPAA-enabled organization</a>, webhooks for security rules is disabled.</a></div>

Security notifications can be sent to [integrations][5], such as Jira, PagerDuty, and [webhooks][6]. Contact [support][2] if you do not want users to be able to send notifications to a third-party service using webhooks.

[1]: /security/notifications/variables/?tab=cloudsiem#template-variables
[2]: /help/
[3]: /security/cloud_siem/log_detection_rules/?tab=threshold#say-whats-happening
[4]: /security/cloud_siem/signal_correlation_rules#say-whats-happening
[5]: /security/notifications/#integrations
[6]: /integrations/webhooks/