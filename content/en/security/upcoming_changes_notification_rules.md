---
title: Upcoming Changes to Security Notification Rules
kind: documentation
is_beta: true
further_reading:
- link: "/security/notifications/rules/"
  tag: "Documentation"
  text: "Notifications"
- link: "/security/notifications/"
  tag: "Documentation"
  text: "Notification Rules"
---

This article outlines upcoming changes to how [notification rules][1] are configured. Although the most significant changes apply to Cloud Security Management (CSM), they also impact Application Security Management and Cloud SIEM.

## CSM Misconfigurations signals deprecation

Currently, notifications for [CSM Misconfigurations][2] can only be configured for detection rules that have signals enabled. As part of the upcoming changes to notification rules, you will no longer be required to enable signals in order to generate notifications.

This change will have the following impact on how notifications are generated for CSM Misconfigurations:

1. You will now be able to specify misconfiguration as a source type when creating notification rules.
1. You will no longer be able to configure signals for CSM Misconfigurations detection rules. This also means that notifications can no longer be enabled for individual detection rules.
1. Support for CSM Misconfigurations signals will be deprecated in late 2024. Legacy signals will be retained for 15 months from their trigger date (free of charge).

## Notification rules source types selector

When you create a notification rule, you will now be required to choose between two different source types (finding or signal).

{{< img src="security/csm/notification_rules_new_selectors.png" alt="New source types for notification rules" width="75%">}}

### What is a finding?

A finding represents a potential security flaw in your infrastructure. The available options are:

  - Application library vulnerability
  - Application code vulnerability
  - Misconfiguration
  - Attack Path
  - Identity Risk

### What is a signal?

A signal represents suspicious activity that poses an active threat against your infrastructure. The available options are:

  - Application Security
  - Log Detection
  - Signal Correlation 
  - Workload Security

## Additional changes

- Notification rules can now be configured for identity risks and attack paths.
- Terraformed custom detection rules using the legacy notifications attribute are no longer supported.

## How to migrate existing notifications

### Detection rule notifications

To migrate notifications that are configured for individual detection rules:

1. On the [Misconfiguration Rules page][1], select a detection rule that has notifications enabled for it.
2. In the banner displayed in the **Set severity and notifications** section, click **Update in 1-Click**.

   The **Notification Rules** editor page is displayed with the fields pre-populated with the information from the rule.

3. Modify the settings, if desired.
4. Click **Save and Activate**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/notifications/rules/
[2]: /security/misconfigurations
[3]: https://app.datadoghq.com/security/configuration/compliance/rules