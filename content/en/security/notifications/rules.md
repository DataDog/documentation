---
title: Notification Rules
description: "Create notification rules to automatically notify your team and integrations when security detection rules trigger."
aliases:
  - /security_platform/notification_profiles/
  - /security_platform/notification_rules/
  - /security_platform/notifications/rules/
  - /security/notification_profiles/
  - /security/notification_rules/
  - /security/upcoming_changes_notification_rules/
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

Security notification rules play a key role in keeping your team informed of issues without you having to manually edit notification preferences for individual detection rules. Notification rules can span across multiple detection rules and signals based on parameters such as severities, rule types, rule tags, signal attributes, and signal tags.

{{< img src="security/notification-profiles-overview3.png" alt="Notification Rules" style="width:100%;" >}}

## Create notification rules

To create a notification rule, you define the logic for when the notification rule is triggered based on conditions such as severity, detection rule type, tags, and attributes. If the notification rule matches the specified conditions, the resulting notification includes details about the matched notification rule in the notification footer.

<div class="alert alert-info">As you configure the rule, a preview of issues matching the notification rule conditions appears on the <strong>Preview of Matching Results</strong> panel. This can be useful in determining if the notification rule is too specific or broad.</div>

1. On the [**Notification Rules**][1] page, click **New Notification Rule**.
1. Enter a **Name** for the notification rule.
1. Select the source type for the notification rule:
    - **Vulnerability**: A potential security flaw in your infrastructure.
    - **Signal**: Suspicious activity that poses an active threat against your infrastructure.
1. Select one or more severity levels.
1. Specify the tags and attributes that must be present in order for the notification rule to be triggered.
1. Click **Add Recipient**.
1. Specify the recipients you want to notify when the notification rule is triggered. You can notify individuals, teams, create Jira issues, and more. See [Notifications][2] for more information.
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