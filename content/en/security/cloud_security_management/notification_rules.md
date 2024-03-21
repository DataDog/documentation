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

<div class="alert alert-warning">...in private beta.</div>

Notification rules allow you to set general alerting preferences that span across multiple detection rules and signals. They play a key role in keeping your team informed of issues without you having to manually configure notifications for individual detection rules.

This article outlines upcoming changes to how notification rules are configured. Although the changes primarily apply to Cloud Security Management, they also impact Application Security Management and Cloud SIEM.

## Upcoming changes to notification rules

### CSM Misconfigurations signals deprecation

placeholder

### Support for identity risks and attack paths

placeholder

### Notification rule source types selector

The available source types for notification rules is now split into two types: Signals or Vulnerabilities.

When you create or edit a notification rule, you now specify the source type by choosing either Vulnerabilities or Signals.

A vulnerability...

A signal...

The Notification Rule type selector is now split into two types: Signals or Vulnerabilities: 




## How notification rules used to work

Signals are security alerts that Datadog generates and displays in the Signals Explorer. Was required to be enabled in order to alert on misconfigurations.

**placeholder for diagram**

Brand design ticket is in progress: https://datadoghq.atlassian.net/browse/BRAND-7001

## How notification rules work now

Cloud Configuration and Infrastructure Configuration will no longer generate signals.

no longer require that signals be enabled for 

When you create a notification rule, you specify 

**placeholder for diagram**

A vulnerability...

A signal...

**Notes**:

- As part of this change, notifications can no longer be configured for individual detection rules.
- Support for Cloud Configuration and Infrastructure Configuration signals will be deprecated later in 2024. Legacy signals will be retained for 15 months from their trigger date (free of charge). 
- Terraformed custom detection rules using the legacy notifications attribute are no longer supported. 

## Create notification rules

To create a notification rule, you define the logic for when the notification rule is triggered based on conditions such as source type (vulnerability or signal), severity, tags, and attributes.

As you configure the rule, a preview of issues that match the notification rule conditions appears on the **Preview of Matching Results** panel. This is useful in determining if the notification rule is overly specific or too broad.

### Select a source type

1. On the [**Notification Rules**][1] page, click **New Notification Rule**.
1. Under **Source Types**, select whether the notification rule should alert on vulnerabilities or threats.
1. (Optional) For ASM, select the ASM Vulnerability Management source type, _or_ leave the source type empty and select the **Include Application level vulnerabilities** checkbox.

### Specify rule criteria

1. Under **Rule Criteria**, select one or more severity levels.
1. Specify the tags and attributes that must be present in order for the notification rule to be triggered.

### Provide notification details

1. Under **Notification Details**, specify the recipients you want to notify when the notification rule is triggered. You can notify individuals, teams, create Jira issues, and more. See [Notifications][2] for more information.
1. Enter a name for the notification rule.
1. Click **Save and Activate**.

## Migrate notifications

### Legacy notification rules

To migrate notification rules that use the legacy Cloud Configuration and Infrastructure Configuration signals:

**Not yet available in the UI**

### Detection rule notifications

To migrate notifications that are configured for individual detection rules:

1. On the [Misconfiguration Rules page][1], select a detection rule that has notifications enabled for it.
2. In the banner displayed in the **Set severity and notifications** section, click **Update in 1-Click**.

   The **Notification Rules** editor page is displayed with the fields pre-populated with the information from the rule.

3. Modify the settings, if desired.
4. Click **Save and Activate**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/compliance/rules