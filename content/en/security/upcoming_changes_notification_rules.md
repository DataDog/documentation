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

This article outlines upcoming changes to how [notification rules][1] are configured. These changes impact [Cloud Security Management (CSM)][4], and more specifically cloud configuration and infrastructure configuration signals. Note that for the time being, the changes will only affect how you get notified after manually upgrading a notification rule, or after the final deprecation date is reached (early 2025). 

## Signals deprecation for CSM Misconfigurations

Until today, notifications for [CSM Misconfigurations][2] would only be sent out for detection rules that have signals enabled, as shown in the following diagram:

**Current workflow**:

{{< img src="security/csm/notification_rules_old_workflow.png" alt="Diagram that shows the current workflow for enabling notifications for CSM Misconfigurations" width="80%">}}

As part of the upcoming changes to notification rules, you are no longer required to enable signals in order to generate notifications. The new workflow is shown in the following diagram:

**New workflow**:

{{< img src="security/csm/notification_rules_new_workflow.png" alt="Diagram that shows the new workflow for enabling notifications for CSM Misconfigurations" width="100%">}}

This change has the following impact on how notifications are generated for CSM Misconfigurations:

1. You will now be able to specify misconfiguration as a source type when creating notification rules.
2. Signals are no longer generated for CSM Misconfigurations. This also means that notifications can no longer be enabled and configured at the detection rule level.

<div class="alert alert-warning">Due to this change in behavior, you may notice an increase in the number of notifications generated. If the conditions set in a notification rule results in a high number of notifications, a warning message is displayed in the <strong>Preview of Matching Results</strong> panel. To help control noise, you can refine your query and use the new time aggregation mechanism.</div>

3. Support for CSM Misconfigurations signals will be deprecated in early 2025. Legacy signals will be retained for 15 months from their trigger date (free of charge).

## Notification rules source types selector

When you create a notification rule, you are now required to choose between two different source types: Vulnerability or Threat (Signal).

- A vulnerability represents a potential security flaw in your infrastructure.
- A threat (signal) represents suspicious activity that poses an active threat against your infrastructure.

{{< img src="security/csm/notification_rules_new_selectors_2.png" alt="New source types for notification rules" width="75%">}}

## Additional changes

- Notification rules can now be configured for identity risks and attack paths, as well as container image vulnerabilities.
- CSM Misconfigurations notifications now contain the full finding metadata. Previously, the notification contained only limited signal metadata.
- Terraformed custom detection rules using the legacy notifications attribute will no longer be supported after the final deprecation date (early 2025). Terraform support for Notification Rules will be available in late 2024. 

## How to migrate existing notifications

### Detection rule notifications

To migrate notifications that are configured for individual detection rules:

1. On the [Misconfiguration Rules page][3], select a detection rule that has notifications enabled for it.
2. In the banner displayed in the **Set severity and notifications** section, click **Update in 1-Click**.

   The **Notification Rules** editor page is displayed with the fields pre-populated with the information from the rule.

3. Modify the settings, if desired.
4. Click **Save and Activate**.

### Notification rules configured for cloud or infrastructure configuration signals

To migrate notification rules configured for cloud or infrastructure configuration signals, change the target from Cloud Configuration or Infrastructure Configuration to Vulnerability > Misconfiguration. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/notifications/rules/
[2]: /security/misconfigurations
[3]: https://app.datadoghq.com/security/configuration/compliance/rules?query=type%3A%28cloud_configuration%20OR%20infrastructure_configuration%29%20notification%3A%2A%20&deprecated=hide&groupBy=severity&sort=date
[4]: /security/cloud_security_management/ 
[5]: /security/application_security/
[6]: /security/cloud_siem/
