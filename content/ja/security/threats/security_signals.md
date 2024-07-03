---
disable_toc: false
further_reading:
- link: /security/default_rules/?category=cat-csm-threats#all
  tag: Documentation
  text: Explore CSM Threats detection rules
- link: /security/threats/workload_security_rules
  tag: Documentation
  text: Learn how to manage CSM Threats detection rules
- link: /security/notifications/
  tag: Documentation
  text: Learn more about security notifications
- link: https://www.datadoghq.com/blog/datadog-csm-windows/
  tag: Blog
  text: Secure your Windows workloads with Datadog Cloud Security Management
title: Investigate Security Signals
---

[Cloud Security Management Threats][9] (CSM Threats) security signals are created when Datadog detects a threat based on a security rule. View, search, filter, and investigate security signals in the [Signals Explorer][4], or configure [Notification Rules][1] to send signals to third-party tools.

To modify security signals, you must have the `security_monitoring_signals_write` permission. See [Role Based Access Control][3] for more information about Datadog's default roles and granular role-based access control permissions available for Cloud Security Management.

{{< img src="security/cws/signals_explorer.png" alt="CSM Signals Explorer page" width="100%">}}

## Filter security signals

To filter the security signals in the [Signals Explorer][4], use the search query `@workflow.triage.state:<status>`, where `<status>` is the state you want to filter on (`open`, `under_review`, or `archived`). You can also use the **Signal State** facet on the facet panel.

## Triage a signal

You can triage a signal by assigning it to a user for further investigation. The assigned user can then track their review by updating the signal's status.

1. On the [Signals Explorer][4], select a security signal.
2. On the signal side panel, click the user profile icon and select a user.
3. To update the status of the security signal, click the triage status dropdown menu and select a status. The default status is **Open**.
    - **Open**: The signal has not yet been resolved.
    - **Under Review**: シグナルはアクティブに調査中です。**Under Review** の状態から、必要に応じてシグナルを **Archived** または **Open** に移動することができます。
    - **Archived**: The detection that caused the signal has been resolved. From the **Archived** state, you can move the signal back to **Open** if it's within 30 days of when the signal was originally detected.

## ケースの作成

{{< site-region region="gov" >}}
<div class="alert alert-warning">Case Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Use [Case Management][6] to track, triage, and investigate security signals.

1. On the [Signals Explorer][4], select a security signal.
2. On the signal side panel, click the **Escalate Investigation** dropdown menu and select **Create a case**. Alternatively, select **Add to an existing case** to add the signal to an existing case. 
3. Enter a title and optional description.
4. Click **Create Case**.

## Declare an incident 

Use [Incident Management][5] to create an incident for a security signal.

1. On the [Signals Explorer][4], select a security signal.
2. On the signal side panel, click the **Escalate Investigation** dropdown menu and select **Declare incident**. Alternatively, select **Add to incident** to add the signal to an existing incident.
3. On the incident creation modal, configure the incident by specifying details such as the severity level and incident commander.
4. Click **Declare Incident**.

## Run a workflow

Use [Workflow Automation][8] to manually trigger a workflow for a security signal. See [Trigger a Workflow from a Security Signal][7] for more information.

1. On the [Signals Explorer][4], select a security signal.
2. On the signal side panel, click the **Workflows** tab.
3. Click **Run Workflow**.
4. On the workflow modal, select the workflow you want to run. Depending on the workflow, you may be required to enter additional input parameters.
5. **Run** をクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/notifications/rules/
[2]: /ja/account_management/audit_trail/events/#cloud-security-platform-events
[3]: /ja/account_management/rbac/permissions/#cloud-security-platform
[4]: https://app.datadoghq.com/security?product=cws
[5]: /ja/service_management/incident_management/
[6]: /ja/service_management/case_management/
[7]: /ja/security/cloud_security_management/workflows
[8]: /ja/service_management/workflows
[9]: /ja/security/threats/