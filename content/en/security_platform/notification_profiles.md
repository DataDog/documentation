---
title: Notification Profiles
kind: documentation
description: "Create notification profiles to automatically notify your team and integrations when security rules trigger."
further_reading:
- link: "/security_platform/detection_rules/"
  tag: "Documentation"
  text: "Explore security rules"
---

## Overview

Security Notification Profiles play a key role in Security Monitoring by keeping your team informed of issues without you having to manually edit notification preferences for individual security rules.

Create and modify notification preferences within a notification profile to span across multiple security rules and signals based on parameters such as severities, rule types, rule tags, signal attributes, and signal tags.

View and search through all created Notification Profiles on the **Notification Profiles** page. Create, edit, clone, enable, disable, delete, or view Notification Profiles created by users in your organization.

{{< img src="security_platform/notification-profiles-overview.png" alt="Notification Profiles" style="width:100%;" >}}

## Create a notification profile

To create a new notification profile, follow the instructions below.

1. In Datadog, navigate to the [Notification Profiles tab][1] in **Security** > **Setup & Configuration**.
2. Click on the **+ New Notification Profile** button in the top right corner of the page.
3. Input a name for your notification profile in the **Name** field.
4. Define the logic for when this notification profile is triggered by conditions matching to security rule and/or security signal.
    - For security rules, notification profiles can be made with the following conditions: severity, rule type, or rule tags.
    - For security signals, notification profiles can be made for any matching signal attribute and signal tag.

    For example, severity set as `Medium` means a signal triggers an enabled notification profile as long as the security signal rule condition set in Step 4 is met at least once.

5. Select all relevant parties you want to notify in the **Recipients** field. For example, notify individuals, teams, lists, or handles.
6. A panel with a preview of rules matching the notification profile appears to the right, which helps indicate if the notification profile is too specific or broad.
7. Click **Save and Activate** to save the notification profile. This automatically activates the notification profile and navigates you back to the main **Notification Profiles** page.

{{< img src="security_platform/notification-profiles-setup.png" alt="Setup of a notification profile" style="width:100%;" >}}

If the notification profile is associated with a Security Rule, you can view the profile's trigger conditions in the “Set severity and notifications” section in your rules.

If the notification profile matches set conditions, the resulting notification includes details about the matched notification profile in the notification footer.

## Manage a notification profile

### Search

The free text search filters notification profiles by text in the **Notification Profile** page. Select a tag within a rule type, rule tags, signal attributes, or signal tags to add the tag in the search, which displays notification profiles matching the value.

When you edit the search query, search results update in real-time. There is no **Search** button.

### Enable or disable

Use the toggle switch in the top right corner of the notification profile card to enable or disable a notification profile.

### Edit

To edit a notification profile, hover over the notification profile card and click on it.

### Clone

To clone a notification profile, click the kebab menu in the top right corner of the notification profile card and select the **Clone Notification Profile** option from the menu.

### Delete

To delete a notification profile, click the kebab menu in the top right corner of the notification profile card and select the **Delete Notification Profile** option from the menu.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/notification-profiles
