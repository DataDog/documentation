---
title: Notification Rules for Cloud Security Management
kind: documentation
is_beta: true
products:
- name: CSM Misconfigurations
  url: /security/misconfigurations
  icon: cloud-security-management
- name: CSM Vulnerabilities
  url: /security/vulnerabilities/
  icon: cloud-security-management
- name: CSM Identity Risks
  url: /security/identity_risks/
  icon: cloud-security-management
---

<div class="alert alert-warning">This feature is in private beta.</div>

Notifications for cloud configuration and infrastructure configuration 

Notifications rules allow customers to define an alerting criteria across all products, and all detections at once.

Findings: emphasize on ticket creation / triage / remediation 
Signals: emphasize on communication / escalation / triage / remediation

Create Notification Rules for 

- What is a source type?

{{< product-availability >}}

<div class="alert alert-warning">On <strong>November 14, 2024 - REMOVE DATE FROM FINAL DOC</strong>, Datadog Cloud Security Management (CSM) will no longer support Cloud Configuration and Infrastructure Configuration signals. This does not impact other security signal types (Application Security Management, Cloud SIEM, and CSM Threats).</div>

## How it used to work

Signals are security alerts that Datadog generates and displays in the Signals Explorer. Was required to be enabled in order to alert on misconfigurations.

**placeholder for diagram**

Brand design ticket is in progress: https://datadoghq.atlassian.net/browse/BRAND-7001

## How it works now

**placeholder for diagram**

**Notes**:

- As part of this change, notifications can no longer be configured for individual detection rules.
- Support for Cloud Configuration and Infrastructure Configuration signals will be deprecated later in 2024. Legacy signals will be retained for 15 months from their trigger date (free of charge). 
- Terraformed custom detection rules using the legacy notifications attribute are no longer supported. 

## Create a notification rule

To create a notification rule, you define the logic for when the notification rule is triggered based on conditions such as severity, detection rule type, tags, and attributes.

As you configure the rule, a preview of issues matching the notification rule conditions appears on the **Example of matching issues** panel. This can be useful in determining if the notification rule is too specific or broad.

### Select a source type

1. On the [**Notification Rules**][1] page, click **New Notification Rule**.
2. Under **Source Types**, select whether the notification rule should alert on vulnerabilities or threats.
3. (Optional) For ASM, select the ASM Vulnerability Management source type, _or_ leave the source type empty and select the **Include Application level vulnerabilities** checkbox.

### Specify rule criteria

4. Under **Rule Criteria**, select one or more severity levels.
5. Specify the tags and attributes that must be present in order for the notification rule to be triggered.

### Provide notification details

6. Under **Notification Details**, specify the recipients you want to notify when the notification rule is triggered. You can notify individuals, teams, create Jira issues, and more. See [Notifications][2] for more information.
7. Enter a name for the notification rule.
8. Click **Save and Activate**.

## Migrate existing notifications

### If you’ve configured a Notification Rule with a legacy signal type

I'm not seeing any banner or buttons to click. Is there a separate feature flag?

### Migrate notifications configured for detection rules

**Questions**: 

- Is there a way to filter the rules to only show rules that have notifications configured for them?
- What exactly is being migrated when you click **Update in 1-Click**? The severity and ...? What is `@workflow.rule.id`?

1. On the [Misconfiguration Rules page][1], select a detection rule that has notifications enabled for it.
2. In the banner displayed in the **Set severity and notifications** section, click **Update in 1-Click**.
3. ?
4. Click **Save and Activate**.

[1]: https://app.datadoghq.com/security/configuration/compliance/rules