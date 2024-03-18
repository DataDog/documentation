---
title: Notification Rules for Cloud Security Management
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

Security notification rules play a key role in keeping your team informed of issues without you having to manually edit notification preferences for individual detection rules.

This article outlines

**Questions**: 

- Is there a way to filter the rules to only show rules that have notifications configured for them?
- What exactly is being migrated when you click **Update in 1-Click**? The severity and ...? What is `@workflow.rule.id` <- this is the rule, finding should be pre-filled (when clicking 1-click) <- flag this in the notifications Slack channel

Target dates
- internal, having docs ready ASAP
- public-facing tied to public beta

Notifications for cloud configuration and infrastructure configuration 

Notifications rules allow customers to define an alerting criteria across all products, and all detections at once.

Findings: emphasize on ticket creation / triage / remediation 
Signals: emphasize on communication / escalation / triage / remediation

Create Notification Rules for 

One of the bigger questions I have, which we don't need to fully complete at this meeting, are definitions for some of the terms we use for notification rules. Specifically:

* security signal
* security issue
* attack path: 
* finding (will be renamed to vulnerability, the label in the UI):  
* misconfiguration
* vulnerability
* identity risk


Source types (notification rules):

* Application library vulnerability: This is for ASM (CSM Vulns not avail as a separate type, but will be soon)
* Application code vulnerability: 
* Workload Security: CSM Threats
* Signal Correlation: Cloud SIEM
* Log Detection: Cloud SIEM
* Application Security: ASM(?)

- What is a source type?

## How it used to work

Signals are security alerts that Datadog generates and displays in the Signals Explorer. Was required to be enabled in order to alert on misconfigurations.

**placeholder for diagram**

Brand design ticket is in progress: https://datadoghq.atlassian.net/browse/BRAND-7001

## How it works now

Cloud Configuration and Infrastructure Configuration will no longer generate signals.

no longer require that signals be enabled for 

When you create a notification rule, you specify 

| How it used to work | How it works now |
|---------------------|------------------|
|                     |                  |
|                     |                  |
|                     |                  |
|                     |                  |

**placeholder for diagram**

A vulnerability...

A signal...

**Notes**:

- As part of this change, notifications can no longer be configured for individual detection rules.
- Support for Cloud Configuration and Infrastructure Configuration signals will be deprecated later in 2024. Legacy signals will be retained for 15 months from their trigger date (free of charge). 
- Terraformed custom detection rules using the legacy notifications attribute are no longer supported. 

## Create notification rules

To create a notification rule, you define the logic for when the notification rule is triggered based on conditions such as source type (vulnerability or signal), severity, tags, and attributes.

As you configure the rule, a preview of issues matching the notification rule conditions appears on the **Preview of Matching Results** panel. This is useful in determining if the notification rule is overly specific or too broad.

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