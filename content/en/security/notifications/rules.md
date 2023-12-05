---
title: Notification Rules
kind: documentation
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
---

## Overview

Security notification rules play a key role in keeping your team informed of issues without you having to manually edit notification preferences for individual security detection rules.

Create and modify notification preferences within a notification rule to span across multiple security detection rules and signals based on parameters such as severities, rule types, rule tags, signal attributes, and signal tags.

{{< img src="security/notification-profiles-overview3.png" alt="Notification Rules" style="width:100%;" >}}

## Create notification rules

To create a notification rule, you define the logic for when the notification rule is triggered based on conditions such as severity, detection rule type, tags, and attributes.

When you configure the rule, a preview of issues matching the notification rule conditions appears on the **Example of matching issues** panel. This can be useful in determining if the notification rule is too specific or broad.

1. On the [**Notification Rules**][1] page, click **New Notification Rule**.
2. Under **Source Types**, select one or more detection rule types to include in the notification rule.
3. (Optional) For ASM, select the **Include Application level vulnerabilities** checkbox.
4. Under **Rule Criteria**, select the severities to include in the notification rule.
5. Specify the tags and attributes to include in the notification rule.
6. Under **Notification Details**, specify the recipients you want to notify when the notification rule is triggered. You can notify individuals, teams, lists, or handles.
7. Enter a name for the notification rule.
8. Click **Save and Activate**.

{{< img src="security/notification-profiles-setup3.png" alt="Setup of a notification rule" style="width:100%;" >}}

If the notification rule is associated with a Security Detection Rule, you can view the rule's trigger conditions in the **Set severity and notifications** section in your rules.

If the notification rule matches set conditions, the resulting notification includes details about the matched notification rule in the notification footer.

## Manage notification rules

### Enable or disable a notification rule

To enable or disable a notification rule, toggle the switch on the notification rule card.

### Edit a notification rule

To edit a notification rule, click the notification rule card.

1. Click the notification rule card.
2. Make changes.
3. Click **Save and Activate**.

### Clone a notification rule

To clone a notification rule, click the vertical three-dot menu on the notification rule card and select **Clone**.

### Delete a notification rule

To delete a notification rule, click the vertical three-dot menu on the notification rule card and select **Delete**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/notification-rules