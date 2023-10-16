---
title: Investigate Security Signals
kind: documentation
disable_toc: false
further_reading:
  - link: "/security/default_rules/?category=cat-csm-threats#all"
    tag: "Documentation"
    text: "Explore CSM Threats detection rules"
  - link: "/security/threats/workload_security_rules"
    tag: "Documentation"
    text: "Learn how to manage CSM Threats detection rules"
  - link: "/security/notifications/"
    tag: "Documentation"
    text: "Learn more about security notifications"
---

[Cloud Security Management Threats][9] (CSM Threats) security signals are created when Datadog detects a threat based on a security rule. View, search, filter, and investigate security signals in the [Threats Explorer][4], or configure [Notification Rules][1] to send signals to third-party tools.

To modify security signals, you must have the `security_monitoring_signals_write` permission. See [Role Based Access Control][3] for more information about Datadog's default roles and granular role-based access control permissions available for Cloud Security Management.

{{< img src="security/cws/csm_threats_signals.png" alt="CSM Threats security signals page" width="100%">}}

## Filter security signals

To filter the security signals in the [Threats Explorer][4]:

1. Click the **Options** button and add the column **Signal State**.
2. Add the facet `@workflow.triage.state`. This displays signal status and enables you to sort by status in the table header.
2. To search through signals by state, use the following search syntax `@workflow.triage.state:` and include the state (`open`, `under_review`, or `archived`) to filter on in the query.
3. Alternatively, select the **Signal State** facet on the facet panel to filter on signals using facets.

## Triage a signal

You can triage a signal by assigning it to a user for further investigation. The assigned user can then track their review by updating the signal's status.

1. On the [Threats Explorer][1], select a security signal.
4. Click the user profile icon and select a user.
5. To update the status of the security signal, click the triage status dropdown menu and select a status. The default status is **Open**.
    - **Open**: The signal has not yet been resolved.
    - **Under Review**: The signal is actively being investigated. From the **Under Review** state, you can move the signal to **Archived** or **Open** as needed.
    - **Archived**: The detection that caused the signal has been resolved. From the **Archived** state, you can move the signal back to **Open** if it's within 30 days of when the signal was originally detected.

## Create a case

Use [Case Management][6] to track, triage, and investigate security signals.

1. On the security signal side panel, click the **Escalate Investigation** dropdown menu and select **Create a case**. Alternatively, select **Add to an existing case** to add the signal to an existing case. 
2. Enter a title and optional description.
3. Click **Create Case**.

## Declare an incident 

Use [Incident Management][5] to create an incident for a security signal.

1. On the security signal side panel, click the **Escalate Investigation** dropdown menu and select **Declare incident**. Alternatively, select **Add to incident** to add the signal to an existing incident.
2. On the incident creation modal, configure the incident by specifying details such as the severity level and incident commander.
3. Click **Declare Incident**.

## Run a workflow

Use [Workflow Automation][8] to manually trigger a workflow for a security signal. See [Trigger a Workflow from a Security Signal][7] for more information.

1. On the security signal side panel, click the **Workflows** tab
2. Click **Run Workflow**.
3. On the workflow modal, select the workflow you want to run. Depending on the workflow, you may be required to enter additional input parameters.
4. Click **Run**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/notifications/rules/
[2]: /account_management/audit_trail/events/#cloud-security-platform-events
[3]: /account_management/rbac/permissions/#cloud-security-platform
[4]: https://app.datadoghq.com/security?product=cws
[5]: /service_management/incident_management/
[6]: /service_management/case_management/
[7]: /security/cloud_security_management/workflows
[8]: /service_management/workflows
[9]: /security/threats/