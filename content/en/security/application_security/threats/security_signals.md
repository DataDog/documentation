---
title: Investigate Security Signals
further_reading:
  - link: "/security/default_rules/?category=cat-application-security#cat-application-security"
    tag: "Documentation"
    text: "Explore ASM threat detection OOTB rules"
  - link: "/security/application_security/threats/custom_rules/"
    tag: "Documentation"
    text: "Configure custom ASM threat detection rules"
  - link: "/security/application_security/threats/threat-intelligence/"
    tag: "Documentation"
    text: "ASM threat intelligence"
---

## Overview

ASM security signals are created when Datadog detects a threat based on a detection rule. View, search, filter, and investigate security signals in the [Signals Explorer][2], or configure [Notification Rules][8] to send signals to third-party tools.

In the [Signals Explorer][2], filter by attributes and facets to find critical threats. Click on a signal to see details about it, including the service owner and attack details. Attack details include the authenticated user and their IP address, what rule they triggered, attack flow, related traces, and other security signals. From this page, you can block IP addresses and users, and also click to create a case and declare an incident.

{{< img src="security/application_security/threats/security_signals/appsec-threat-signals.png" alt="Overview of investigating threats in signals explorer with details side panel">}}

## Filter security signals

To filter the security signals in the [Signals Explorer][2], use the search query `@workflow.triage.state:<status>`, where `<status>` is the state you want to filter on (`open`, `under_review`, or `archived`). You can also use the **Signal State** facet on the facet panel.

## Triage a signal

You can triage a signal by assigning it to a user for further investigation. The assigned user can then track their review by updating the signal's status.

1. On the [Signals Explorer][2] page, select a security signal.
2. On the signal side panel, click the user profile icon and select a user.
3. To update the status of the security signal, click the triage status dropdown menu and select a status. The default status is **Open**.
    - **Open**: The signal has not yet been resolved.
    - **Under Review**: The signal is actively being investigated. From the **Under Review** state, you can move the signal to **Archived** or **Open** as needed.
    - **Archived**: The detection that caused the signal has been resolved. From the **Archived** state, you can move the signal back to **Open** if it's within 30 days of when the signal was originally detected.

**Note**: To modify security signals, you must have the `security_monitoring_signals_write` permission. See [Role Based Access Control][9] for more information about Datadog's default roles and granular role-based access control permissions available for Application Security Management.

## Create a case

Use [Case Management][6] to track, triage, and investigate security signals.

1. On the [Signals Explorer][2] page, select a security signal.
2. On the signal side panel, select the **Create a case** dropdown. Select **Create a new case**, or **Add to an existing case** to add the signal to an existing case. 
3. Enter a title and optional description.
4. Click **Create Case**.

## Declare an incident 

Use [Incident Management][4] to create an incident for a security signal.

1. On the [Signals Explorer][2] page, select a security signal.
2. On the signal side panel, click the **Declare Indident** dropdown menu and select **Create an incident**, or **Add to an existing incident**.
3. On the incident creation modal, configure the incident by specifying details such as the severity level and incident commander.
4. Click **Declare Incident**.

## Run a workflow

Use [Workflow Automation][5] to manually trigger a workflow for a security signal. 

1. On the [Signals Explorer][2] page, select a security signal.
2. Scroll down to the **What is Workflow Automation** section. 
3. Click **Run Workflow**.
4. On the workflow modal, select the workflow you want to run. Depending on the workflow, you may be required to enter additional input parameters.
5. Click **Run**.

## Review and remediate

1. On the [Signals Explorer][2] page, select a security signal.
2. On the signal side panel, click each of the tabs, such as **Attack Flow**, **Activity Summary**, and **Rule Details**, to review the information.
3. Review the **Suggested Next Steps**, and take action:
    -  Click **Block all Attacking IPs** (by specific duration or permanently).
    -  Click **Automated Attacker Blocking** (based on [detection][10] rules).
    -  Click **[Block with Edge WAF][11]**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /service_management/incident_management/
[5]: /service_management/workflows/
[6]: /service_management/case_management/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /security/notifications/rules/
[9]: /account_management/rbac/permissions/#cloud-security-platform
[10]: /security/application_security/threats/protection/#respond-to-threats-in-real-time-by-automating-attacker-blocking
[11]: /security/application_security/threats/protection/#blocking-attack-attempts-with-in-app-waf