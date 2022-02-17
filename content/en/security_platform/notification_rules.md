---
title: Notification Rules
kind: documentation
description: "Create notification rules to automatically notify your team and integrations when security detection rules trigger."
aliases:
  - /security_platform/notification_profiles/
further_reading:
- link: "/security_platform/detection_rules/"
  tag: "Documentation"
  text: "Explore security detection rules"
---

## Overview

Security Notification Rules play a key role in Cloud SIEM by keeping your team informed of issues without you having to manually edit notification preferences for individual security detection rules.

Create and modify notification preferences within a notification rule to span across multiple security detection rules and signals based on parameters such as severities, rule types, rule tags, signal attributes, and signal tags.

View and search through all created Notification Rules on the **Notification Rules** page. Create, edit, clone, enable, disable, delete, or view Notification Rules created by users in your organization.

{{< img src="security_platform/notification-profiles-overview.png" alt="Notification Rules" style="width:100%;" >}}

## Create a notification rule

To create a new notification rule, follow the instructions below.

1. In Datadog, navigate to the [Notification Rules tab][1] in **Security** > **Setup & Configuration**.
2. Click on the **+ New Notification Rule** button in the top right corner of the page.
3. Input a name for your notification rule in the **Name** field.
4. Define the logic for when this notification rule is triggered by conditions matching to security detection rule and/or security signal.
    - For security detection rules, notification rules can be made with the following conditions: severity, rule type, or rule tags.
    - For security signals, notification rules can be made for any matching signal attribute and signal tag.

    For example, severity set as `Medium` means a signal triggers an enabled notification rule as long as the security signal rule condition set in Step 4 is met at least once.

5. Select all relevant parties you want to notify in the **Recipients** field. For example, notify individuals, teams, lists, or handles.
6. A panel with a preview of rules matching the notification rule appears to the right, which helps indicate if the notification rule is too specific or broad.
7. Click **Save and Activate** to save the notification rule. This automatically activates the notification rule and navigates you back to the main **Notification Rules** page.

{{< img src="security_platform/notification-profiles-setup.png" alt="Setup of a notification rule" style="width:100%;" >}}

If the notification rule is associated with a Security Detection Rule, you can view the rule's trigger conditions in the “Set severity and notifications” section in your rules.

If the notification rule matches set conditions, the resulting notification includes details about the matched notification rule in the notification footer.

## Manage a notification rule

### Search

The free text search filters notification rules by text in the **Notification Rule** page. Select a tag within a rule type, rule tags, signal attributes, or signal tags to add the tag in the search, which displays notification rules matching the value.

When you edit the search query, search results update in real-time. There is no **Search** button.

### Enable or disable

Use the toggle switch in the top right corner of the notification rule card to enable or disable a notification rule.

### Edit

To edit a notification rule, hover over the notification rule card and click on it.

### Clone

To clone a notification rule, click the kebab menu in the top right corner of the notification rule card and select the **Clone Notification Rule** option from the menu.

### Delete

To delete a notification rule, click the kebab menu in the top right corner of the notification rule card and select the **Delete Notification Rule** option from the menu.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/notification-profiles
