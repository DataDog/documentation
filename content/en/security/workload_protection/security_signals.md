---
title: Investigate Security Signals
disable_toc: false
aliases:
  - /security/threats/security_signals
  - /security_platform/cspm/signals_explorer
  - /security/cspm/signals_explorer
  - /security/misconfigurations/signals_explorer
  - /security/cloud_security_management/misconfigurations/signals_explorer/
further_reading:
  - link: "/security/default_rules/?category=cat-csm-threats#all"
    tag: "Documentation"
    text: "Explore Workload Protection detection rules"
  - link: "/security/workload_protection/workload_security_rules"
    tag: "Documentation"
    text: "Learn how to manage Workload Protection detection rules"
  - link: "/security/notifications/"
    tag: "Documentation"
    text: "Learn more about security notifications"
---

[Workload Protection][9] security signals are created when Datadog detects a threat based on a security rule. View, search, filter, and investigate security signals in the [Signals Explorer][4], or configure [Notification Rules][1] to send signals to third-party tools.

To modify security signals, you must have the `security_monitoring_signals_write` permission. See [Role Based Access Control][3] for more information about Datadog's default roles and granular role-based access control permissions available for Cloud Security.

<!-- {{< img src="security/cws/signals_explorer.png" alt="CSM Signals Explorer page" width="100%">}} -->

## Filter security signals

To filter the security signals in the [Signals Explorer][4], use the search query `@workflow.triage.state:<status>`, where `<status>` is the state you want to filter on (`open`, `under_review`, or `archived`). You can also use the **{{< ui >}}Signal State{{< /ui >}}** facet on the facet panel.

## Triage a signal

You can triage a signal by assigning it to a user for further investigation. The assigned user can then track their review by updating the signal's status.

1. On the [Signals Explorer][4], select a security signal.
2. On the signal side panel, click the user profile icon and select a user.
3. To update the status of the security signal, click the triage status dropdown menu and select a status. The default status is **{{< ui >}}Open{{< /ui >}}**.
    - **{{< ui >}}Open{{< /ui >}}**: The signal has not yet been resolved.
    - **{{< ui >}}Under Review{{< /ui >}}**: The signal is actively being investigated. From the **{{< ui >}}Under Review{{< /ui >}}** state, you can move the signal to **{{< ui >}}Archived{{< /ui >}}** or **{{< ui >}}Open{{< /ui >}}** as needed.
    - **{{< ui >}}Archived{{< /ui >}}**: The detection that caused the signal has been resolved. From the **{{< ui >}}Archived{{< /ui >}}** state, you can move the signal back to **{{< ui >}}Open{{< /ui >}}** if it's within 30 days of when the signal was originally detected.

## Create a case

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Case Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Use [Case Management][6] to track, triage, and investigate security signals.

1. On the [Signals Explorer][4], select a security signal.
2. On the signal side panel, click the **{{< ui >}}Escalate Investigation{{< /ui >}}** dropdown menu and select **{{< ui >}}Create a case{{< /ui >}}**. Alternatively, select **{{< ui >}}Add to an existing case{{< /ui >}}** to add the signal to an existing case.
3. Enter a title and optional description.
4. Click **{{< ui >}}Create Case{{< /ui >}}**.

## Declare an incident

Use [Incident Management][5] to create an incident for a security signal.

1. On the [Signals Explorer][4], select a security signal.
1. On the signal side panel under *Next Steps*, click the **{{< ui >}}Show all actions{{< /ui >}}** dropdown menu and select **{{< ui >}}Declare incident{{< /ui >}}**.
1. Alternatively, select **{{< ui >}}Add to incident{{< /ui >}}** to add the signal to an existing incident.
1. On the incident creation modal, configure the incident by specifying details such as the severity level and incident commander.
4. Click **{{< ui >}}Declare Incident{{< /ui >}}**.

## Run a workflow

Use [Workflow Automation][8] to manually trigger a workflow for a security signal. See [Trigger a Workflow from a Security Signal][7] for more information.

1. On the [Signals Explorer][4], select a security signal.
2. On the signal side panel, click the **{{< ui >}}Workflows{{< /ui >}}** tab.
3. Click **{{< ui >}}Run Workflow{{< /ui >}}**.
4. On the workflow modal, select the workflow you want to run. The workflow must have a security trigger to appear in the list. Depending on the workflow, you may be required to enter additional input parameters.
5. Click **{{< ui >}}Run{{< /ui >}}**.

[1]: /security/notifications/rules/
[2]: /account_management/audit_trail/events/#cloud-security-platform-events
[3]: /account_management/rbac/permissions/#cloud-security-platform
[4]: https://app.datadoghq.com/security/workload-protection/signals
[5]: /incident_response/incident_management/
[6]: /incident_response/case_management/
[7]: /security/cloud_security_management/workflows
[8]: /service_management/workflows
[9]: /security/workload_protection/
