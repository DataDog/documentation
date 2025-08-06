---
title: Investigate Security Signals
aliases:
  - /security/application_security/threats/security_signals
further_reading:
  - link: "/security/default_rules/?category=cat-application-security#cat-application-security"
    tag: "Documentation"
    text: "Explore AAP threat detection OOTB rules"
  - link: "/security/application_security/policies/custom_rules/"
    tag: "Documentation"
    text: "Configure custom AAP threat detection rules"
  - link: "/security/application_security/how-it-works/threat-intelligence/"
    tag: "Documentation"
    text: "AAP threat intelligence"
---

## Overview

AAP security signals are created when Datadog detects a threat based on a detection rule. View, search, filter, and investigate security signals in the [Signals Explorer][2], or configure [Notification Rules][8] to send signals to third-party tools.

<!-- {{< img src="security/application_security/threats/security_signals/appsec-threat-signals.png" alt="Overview of investigating threats in signals explorer with details side panel">}} -->

## Signals Explorer columns

The Signals Explorer displays the following columns.

Severity
: There are five severity states: **Info**, **Low**, **Medium**, **High**, and **Critical**. **High** and **Critical** indicate a major impact to service availability or active compromise.

Title
: The name of the signal. Titles might update when new data is correlated, altering the assessed impact of the attack.

Service/Env
: The service and environment identified in the attack. Hover over the service name to link to the service page and code repo, and to see who is on-call for the service.

Entities
: The attackers and the victims of an attack. Attackers are identified by IP addresses. Victims are identified as authenticated users. Hover over the IP list and then click an IP to see details such as **Threat Intelligence** and **Security Activity**.

Triage State
: You can assign a responder and set a triage state for the signal. Available states are **Open**, **Under Review**, and **Archived**. 

Creation Date
: The date when the signal was first created. Signals are sorted by date by default.

## Filter security signals

To filter the security signals in the [Signals Explorer][2], use the search query `@workflow.triage.state:<status>`, where `<status>` is the state you want to filter on (`open`, `under_review`, or `archived`). You can also use the **Signal State** facet on the facet panel.

## Triage a signal

You can triage a signal by assigning it to a user for further investigation. The assigned user can then track their review by updating the signal's status.

1. On the [Signals Explorer][2] page, click the user profile icon in the **Triage State** column.
2. Select a user to assign the signal.
3. To update the status of the security signal, click the triage status dropdown menu and select a status. The default status is **Open**.
    - **Open**: The signal has not yet been resolved.
    - **Under Review**: The signal is actively being investigated. From the **Under Review** state, you can move the signal to **Archived** or **Open** as needed.
    - **Archived**: The detection that caused the signal has been resolved. From the **Archived** state, you can move the signal back to **Open** if it's within 30 days of when the signal was originally detected.

**Note**: To modify security signals, you must have the `security_monitoring_signals_write` permission. See [Role Based Access Control][9] for more information about Datadog's default roles and granular role-based access control permissions available for App and API Protection.

## Declare an incident 

Use [Incident Management][4] to create an incident for a security signal.

Declare an incident if:

- An issue is or might be impacting customers.
- You believe an issue (even if it's internal) needs to be addressed as an emergency.
 
If you don't know whether you should declare an incident, notify other users and increase severity appropriately.

1. On the [Signals Explorer][2] page, select a security signal to open its details panel.
2. On the signal panel, click **Declare Incident** or select the dropdown arrow and select **Add to an existing incident**.
3. When you declare a new incident, in the **Declare Incident** settings, configure the incident by specifying details such as the severity level and incident commander.
   1. Estimate impact. Severity levels go from SEV-1 (critical) to SEV-5 (minor impact). When in doubt, always choose the higher severity.
4. Click **Declare Incident**.

## Run a workflow

Use [Workflow Automation][5] to manually trigger a workflow for a security signal. 

1. Make sure the workflow you want to run has a security trigger.
2. On the [Signals Explorer][2] page, open a security signal.
3. In the **Respond** section, click **Run Workflow**.
4. In **Run a workflow**, select the workflow you want to run or click **New Workflow**. 
   - Depending on the workflow you select, you might be required to enter additional input parameters.
   - If you selected **New Workflow**, Run a Security Workflow opens. To learn more about workflows, see [Workflow Automation][5]. 
5. Click **Run**.

## Review and remediate

1. On the [Signals Explorer][2] page, open a security signal.
2. In the signal details, view each of the sections, such as **What Happened**, **Activity Summary**, and **Detection Rule**.
3. Review the **Next Steps** and take action:
    -  Click **Block all Attacking IPs** (by specific duration or permanently).
    -  Click **Automated Attacker Blocking** (based on [detection][10] rules). This setting requires the App and API Protection **Protect Write** permission.
    -  Click **[Block with Edge WAF][11]**.

## Bulk actions

When you select one or more signals, you can use **Bulk Actions** to perform the following.

### Set state

Set the triage state to **Open**, **Under Review**, or **Archived**.

### Assign the signal to users

Select **Assign selection** and then select the user(s) to assign to the signal. 

Select **Remove all assignments** to reset the signal assignment to none.

### Case management

Datadog [Case Management][6] offers a centralized place to triage, track, and remediate issues detected by Datadog and third-party integrations.

1. On the [Signals Explorer][2] page, select a security signal.
2. In **Bulk Actions**, select **Create a case**. 
3. Select **Create a case** or **Add to an existing case** to add the signal to an existing case. 
4. Enter a title and optional description.
5. Click **Create Case**.

When you click **Create Case**, you are directed to Case Management and the project you selected.

## Saved views

You can save different configurations of the Signals Explorer as views. For example, you could filter the explorer to show all unassigned signals and then save that as a view.

When a configuration is saved as a view, you and your teammates can use it later.

A view contains the explorer's current selections for:

- Time and query
- Displayed columns and sorting
- Analytics aggregation settings
- Timeline visibility
- Displayed facets
- Aggregate by detection rule

1. To save a view, configure the explorer to display the view you want and then click **Save**.
2. Enter a name for the view, and then select the teams you want to share the view with.
3. Click **Save**.

To see all of the saved views, click **Views** next to the **Signals Explorer** page title.

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
[10]: /security/application_security/policies/#respond-to-threats-in-real-time-by-automating-attacker-blocking
[11]: /security/application_security/policies/#blocking-attack-attempts-with-in-app-waf