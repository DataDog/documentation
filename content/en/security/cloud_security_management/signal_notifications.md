---
title: Notification Rules
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

Notifications rules allow customers to define an alerting criteria across all products, and all detections at once.

Findings: emphasize on ticket creation / triage / remediation 
Signals: emphasize on communication / escalation / triage / remediation

Create Notification Rules for 

- What is a source type?

{{< product-availability >}}

<div class="alert alert-warning">On <strong>November 14, 2024 - REMOVE DATE FROM FINAL DOC</strong>, Datadog Cloud Security Management (CSM) will no longer support Cloud Configuration and Infrastructure Configuration signals. This does not impact other security signal types (Application Security Management, Cloud SIEM, and CSM Threats).</div>

How it currently works / How it used to work

Signals are security alerts that Datadog generates and displays in the Signals Explorer. Was required to be enabled in order to alert on misconfigurations.

**placeholder for diagram**

How it will work / How it works now

**placeholder for diagram**

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

## Migrate existing notification configurations

placeholder text