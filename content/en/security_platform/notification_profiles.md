---
title: Notification Profiles
kind: documentation
description: "Create notification profiles to automatically notify your team and integrations when security rules trigger."
further_reading:
- link: "/security_platform/default_rules"
  tag: "Documentation"
  text: "Explore default security rules"
---

## Overview

Security Notification Profiles are a key component of security monitoring that keeps your team informed of issues without having to manually edit notification preferences for individual security rules.

Create and modify notification preferences within a notification profile to span across multiple security rules and signals based on parameters such as severities, rule types, rule tags and signal attributes.

On the Notification Profiles page, view and search through all created Notification Profiles. Create, edit, clone, enable, disable, delete, or view Notification Profiles created by users in your organization.

## Create a notification profile

To create a new notification profile, follow the instructions below:

1. In Datadog, navigate to the [Notification Profiles tab][1].
2. Click on the New Notification Profile button in the top right corner of the page.
3. Input a Name for your notification profile in the *Name* field.
4. Define the logic for when this notification profile is triggered by conditions matching to security rule and/or security signal.
    - For security rules, notification profiles can be made with the following conditions: severity, rule type or rule tags.
    - For security signals, notification profiles can be made for any matching signal tag or attribute.

    For example, severity set as `Medium` means a signal triggers an enabled notification profile as long as the security signal rule condition set in Step 4 is met at least once.

5. Using the *Recipients* field, select all relevant parties you want to notify. For example, notify individuals, teams, lists, or @handles.
6. The right side panel provides a preview of rules matching to the notification profile, which help indicate if the notification profile is too specific or broad.
7. Save the notification profile. This automatically activates the notification profile and navigates you back to the main Notification Profiles page.

If the notification profile is associated with a Security Rule, it can be viewed in the Rule details view in the “Set severity and notifications” section.

If the notification profile matches set conditions, the resulting notification includes details about the matched notification profile in the footer of the notification.

## Manage a notification profile

### Search

The free text search filters Notification Profiles by text in the Notification Profile. Selecting a tag within a rule type, rule tags, signal tags, or attributes adds the tag to the search, and displays Notification Profiles matching the value.

Query results update in real time when the query is edited; there is no “Search” button to click.

#### Enable or disable

Use the toggle switch in the top right corner of the notification profile card to enable or disable a notification profile.

#### Edit

To edit a notification profile, hover over the notification profile card and click on it.

#### Clone

To clone a notification profile, click the menu in the top right corner of the notification profile card and select the *Clone Notification Profile* option from the menu.

#### Delete

To delete a notification profile, click the menu in the top right corner of the notification profile card and select the *Delete Notification Profile* option from the menu.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/notification-profiles
