---
title: Notification Rules
description: "Create notification rules to automatically notify your team and integrations when security detection rules trigger."
aliases:
  - /security_platform/notification_profiles/
  - /security_platform/notification_rules/
  - /security_platform/notifications/rules/
  - /security/notification_profiles/
  - /security/notification_rules/
further_reading:
- link: "/security/detection_rules/"
  tag: "Documentation"
  text: "Explore security detection rules"
products:
- name: Cloud SIEM
  url: /security/cloud_siem/
  icon: siem
- name: Cloud Security Management
  url: /security/cloud_security_management/
  icon: cloud-security-management
- name: Application Security Management
  url: /security/application_security/
  icon: app-sec
---

{{< product-availability >}}

## Overview

Notification rules are predefined sets of conditions that automate the process of informing your team about security issues. By using notification rules, you no longer need to manually set up notifications for each individual detection rule. Notification rules can be configured to cover a wide range of scenarios by specifying parameters such as severities, rule types, rule tags, signal attributes, and signal tags.

{{< img src="security/notification-rules-overview.png" alt="Notification Rules overview page" style="width:100%;" >}}

## Create notification rules

To create a notification rule, specify the conditions under which the rule should be triggered. These conditions may include criteria such as severity, detection rule type, tags, and attributes. When an issue matches the defined criteria, the rule automatically sends notifications to the designated recipients.

<div class="alert alert-info">As you configure the rule, a preview of issues matching the notification rule conditions appears on the <strong>Preview of Matching Results</strong> panel. This preview helps you determine if your notification rule is too specific or too broad, allowing you to adjust the criteria accordingly for optimal coverage.</div>

1. On the [**Notification Rules**][1] page, click **New Notification Rule**.
1. Enter a **Name** for the notification rule.
1. Select the source type for the notification rule:
    - **Vulnerability**: A potential security flaw in your infrastructure.
    - **Signal**: Suspicious activity that poses an active threat against your infrastructure.
1. Select one or more severity levels.
1. Specify the tags and attributes that must be present in order for the notification rule to be triggered.
1. Click **Add Recipient**.
1. Specify the recipients you want to notify when the notification rule is triggered. You can notify individuals, teams, create Jira issues, and more. See [Notification channels][2] for more information.
1. Click **Save**.

{{< img src="security/notification-rules-setup.png" alt="Setup page for creating a notification rule" style="width:100%;" >}}

## Manage notification rules

### Enable or disable a notification rule

To enable or disable a notification rule, toggle the switch on the notification rule card.

### Edit a notification rule

To edit a notification rule, click the notification rule card. After you finish making your changes, click **Save**.

### Clone a notification rule

To clone a notification rule, click the vertical three-dot menu on the notification rule card and select **Clone**.

### Delete a notification rule

To delete a notification rule, click the vertical three-dot menu on the notification rule card and select **Delete**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/notification-rules
[2]: /security/notifications/#notification-channels