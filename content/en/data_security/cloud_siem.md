---
title: Cloud SIEM Data Security
disable_toc: false
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

Datadog generates a security signal when at least one case defined in a detection rule is matched over a given period of time. You can customize detection rules to provide notification messages that contain specific information about the signal (for example, user ID, IP addresses, and so on) and the triggering group-by values of the signal. Security rules can also use webhooks to send notifications to third-party services.

Because data sent to Datadog may contain sensitive information, this document goes over those notification features and what to do if you do not want your users to have access to these features.

## Security rules can use message template variables

When you create a detection rule you can customize the notification message with [notification variables][1], which adds specific information related to the signal. For example, if the following JSON object is associated with a security signal:

```
{
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  },
  "user": {
    "id": "user@domain.com"
  },
  "used_mfa": "false"
}
```
Using `{{@network.client.ip}}` in the notification message would display the IP address associated with the signal.

Contact [support][2] if you want to prevent users from adding template variables to notification messages.

## Security rules can include triggering group-by values in the notification title

In the **Describe your playbook** sections for [detection rules][3], you can add group-by values in the notification title. For example, if you are grouping by `service`, the service name shows in the title. Uncheck **Include triggering group-by values in notification title** to prevent group-by values from appearing in the title.

Contact [support][2] if you want to remove the **Include triggering group-by values in notification title** option.

## Security rules can use webhooks

<div class="alert alert-warning">If your organization had HIPAA enabled in 2024 or earlier, reach out to <a href = "https://docs.datadoghq.com/help/">Datadog support</a> to enable webhooks for security rules.</a></div>

Security notifications can be sent to [integrations][4], such as Jira, PagerDuty, and [webhooks][5]. Contact [support][2] to prevent users from sending notifications to third-party services using webhooks.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/notifications/variables/?tab=cloudsiem#template-variables
[2]: /help/
[3]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule?tab=threshold#describe-your-playbook
[4]: /security/notifications/#integrations
[5]: /integrations/webhooks/
