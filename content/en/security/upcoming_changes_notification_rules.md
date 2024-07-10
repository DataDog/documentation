---
title: Upcoming Changes to Security Notification Rules
is_beta: true
further_reading:
- link: "/security/notifications/rules/"
  tag: "Documentation"
  text: "Notifications Overview"
- link: "/security/notifications/"
  tag: "Documentation"
  text: "Notification Rules"
---

This article outlines upcoming changes to how [notification rules][1] are configured. Although the most significant changes apply to [Cloud Security Management (CSM)][4], they also impact [Application Security Management][5] and [Cloud SIEM][6].

## Signals deprecation for CSM Misconfigurations

Currently, notifications for [CSM Misconfigurations][2] can only be configured for detection rules that have signals enabled, as shown in the following diagram:

**Current workflow**:

{{< img src="security/csm/notification_rules_old_workflow.png" alt="Diagram that shows the current workflow for enabling notifications for CSM Misconfigurations" width="80%">}}

As part of the upcoming changes to notification rules, you are no longer required to enable signals in order to generate notifications. The new workflow is shown in the following diagram:

**New workflow**:

{{< img src="security/csm/notification_rules_new_workflow.png" alt="Diagram that shows the new workflow for enabling notifications for CSM Misconfigurations" width="100%">}}

This change has the following impact on how notifications are generated for CSM Misconfigurations:

1. You will now be able to specify misconfiguration as a source type when creating notification rules.
2. Signals are no longer generated for CSM Misconfigurations. This also means that notifications can no longer be enabled for individual detection rules.

<div class="alert alert-warning">Due to this change in behavior, you may notice an increase in the number of notifications generated. If the conditions set in a notification rule results in a high number of notifications, a warning message is displayed in the <strong>Preview of Matching Results</strong> panel.</div>

3. Support for CSM Misconfigurations signals will be deprecated in late 2024. Legacy signals will be retained for 15 months from their trigger date (free of charge).

## Notification rules source types selector

When you create a notification rule, you are now required to choose between two different source types: Vulnerability or Threat (Signal).

- A vulnerability represents a potential security flaw in your infrastructure.
- A threat (signal) represents suspicious activity that poses an active threat against your infrastructure.

{{< img src="security/csm/notification_rules_new_selectors_2.png" alt="New source types for notification rules" width="75%">}}

## Additional changes

- Notification rules can now be configured for identity risks and attack paths.
- CSM Misconfigurations notifications now contain the full finding metadata. Previously, the notification contained only limited signal metadata.
- Terraformed custom detection rules using the legacy notifications attribute will no longer be supported.

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
[4]: /security/cloud_security_management/ 
[5]: /security/application_security/
[6]: /security/cloud_siem/
