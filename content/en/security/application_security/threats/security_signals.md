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

## Signals Explorer columns

The Signals Explorer displays signals using the following columns:

### Severity

There are five severity states: **Critical**, **High**, **Medium**, **Low**, and **Info**. 

- **Critical:** A service is compromised. For example, a SQL injection. An immediate response is required.
- **High:** A service is vulnerable, but it is unclear whether the service is compromised at this time. An immediate response is required.
- **Medium:** A service is running the stack and infrastructure that allows for an attack, but the service is not vulnerable at this time. If you get a medium, it does not require an immediate response and you can evaluate how you want to triage the issue. 
- **Low** and **Info**: Typically, these are signals used when experimenting or demonstrating an issue, like Log4Shell scanning.


### Title 

The **Title** columns shows the name of the signal. For example:

```
Credential Stuffing attack - Account compromised by credential stuffing attack
```

Titles might update when new data changes the impact of the attack.

Titles also contain the `category` tag for of the attack, for example `category:account_takeover`. Click the cateogy tag to filter, exclude, or copy the tag.

### Service/Env

The **Service/Env** column shows the service and environment tag for the environment identified in the attack.

Hover over the service name to copy it or navigate to the **Service Page** for the service.

Click the service name to view the service in a new tab in the Application Security **Catalogs** view.

Click the environment tag to filter or exlude signals using the environment.

### Entities

The **Entities** column displays attackers IPs and the authenticated users impacted by the attack (compromised users).

Clicking on an attacker IP address gives you the following options:

- Filter a search using the IP
- Exclude the IP from a search
- Block the IP (block with Datadog's Library or AWS WAF)
- Add the IP to an unmonitored passlist
- Declare the IP as trusted
- Click **View IP Details in ASM** to see details about the IP in the **Attacks** page.

For more information on managing attacker IPs, see [Attacker Explorer][12].

### Triage State

The **Triage State** column displays the attack state as **Open**, **In Review**, or **Archived**. Click the state to change its status.

Click the user button to assign an attack responder. 

### Creation Date

The **Creation Date** column displays when the signal was first created and is the default sorting column for the page.

## Filter security signals

To filter the security signals in the [Signals Explorer][2], use the search query `@workflow.triage.state:<status>`, where `<status>` is the state you want to filter on (`open`, `under_review`, or `archived`). 

You can also filter using the following: 

- The **Signal State** facet on the facet panel.
- In the **Title** column, click the `category` tag.
- In the **Service/Env** column, click the environment tag to filter or exlude signals using the environment.
- In the **Entities** column, click the attacker IP to filter a search using the IP.


## Triage a signal

You can triage a signal by assigning it to a user for further investigation. The assigned user can then track their review by updating the signal's status.

1. On the [Signals Explorer][2] page, open a security signal.
2. In the signal **Next Steps**, click **Assign Signal** and select a user.
3. To update the status of the security signal, in the signal **Next Steps**, click the triage status dropdown menu and select a status. The default status is **Open**.
    - **Open**: The signal has not yet been resolved.
    - **Under Review**: The signal is actively being investigated. From the **Under Review** state, you can move the signal to **Archived** or **Open** as needed.
    - **Archived**: The detection that caused the signal has been resolved. From the **Archived** state, you can move the signal back to **Open** if it's within 30 days of when the signal was originally detected.

**Note**: To modify security signals, you must have the `security_monitoring_signals_write` permission. See [Role Based Access Control][9] for more information about Datadog's default roles and granular role-based access control permissions available for Application Security Management.

<div class="alert alert-info">
You can also assign a user and update status using the <b>Triage State</b> column.
</div>

## Create a case

Use [Case Management][6] to track, triage, and investigate security signals.

1. On the [Signals Explorer][2] page, select a security signal.
2. On the signal side panel, select the **Create a case** dropdown. Select **Create a new case**, or **Add to an existing case** to add the signal to an existing case. 
3. Enter a title and optional description.
4. Click **Create Case**.

<div class="alert alert-info">
Cases can be created for a signal, or you can add a signal to an existing case, by selecting the checkbox of one or more signals and using the <b>Bulk Action</b> menu.
</div>

## Declare an incident 

Use [Incident Management][4] to create an incident for a security signal.

1. On the [Signals Explorer][2] page, select a security signal.
2. On the signal side panel, click the **Declare Indident** dropdown menu and select **Create an incident**, or **Add to an existing incident**.
3. On the incident creation modal, configure the incident by specifying details such as the severity level and incident commander.
4. Click **Declare Incident**.

## Run a workflow

Use [Workflow Automation][5] to manually trigger a workflow for a security signal. 

1. Make sure the workflow you want to run has a security trigger.
2. On the [Signals Explorer][2] page, select a security signal.
3. Scroll down to the **What is Workflow Automation** section.
4. Click **Run Workflow**.
5. On the workflow modal, select the workflow you want to run. Depending on the workflow, you may be required to enter additional input parameters.
6. Click **Run**.

## Review and remediate

1. On the [Signals Explorer][2] page, select a security signal.
2. On the signal panel, review the attack information.
3. In **Next Steps**, take action. For example:
    -  Click **Block all Attacking IPs** (by specific duration or permanently).
    -  Click **Automated Attacker Blocking** (based on [detection][10] rules).
    -  Click **[Block with Edge WAF][11]** (if enabled).

## Bulk actions

When you select multiple signals, the Bulk Actions menu appears. The following bulk actions are available:

- Set triage state
- Assign signal to authenticated user
- Create a case or add to an existing case


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
[12]: /security/application_security/threats/attacker-explorer