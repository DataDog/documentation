---
title: Take action
disable_toc: false
---

After you review a Workload Protection signal, use the **Next Steps** section in the signal side panel to triage, escalate, automate, or remediate the threat.

Workload Protection signals share the same triage and response workflows as other Datadog Security signals. For an overview of security signals across Cloud SIEM, App and API Protection, and Workload Protection, see [Detection rules][1] and the unified [Security Signals Explorer][2].

## Triage a signal

You can triage a signal by assigning it to a user for further investigation. The assigned user can then track their review by updating the signal's status.

1. On the [Signals Explorer][3], select a security signal.
2. In the **Next Steps** section, under **Triage**, click the status dropdown and select a status. The default status is **Open**.
    - **Open**: The signal has not yet been resolved.
    - **Under Review**: The signal is actively being investigated. From the **Under Review** state, you can move the signal to **Archived** or **Open** as needed.
    - **Archived**: The detection that caused the signal has been resolved. From the **Archived** state, you can move the signal back to **Open** if it's within 30 days of when the signal was originally detected.
3. Click **Assign Signal** to assign the signal to yourself or another Datadog user.

## Create a case

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Case Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Use [Case Management][4] to track, triage, and investigate security signals.

1. On the [Signals Explorer][3], select a security signal.
2. In the **Next Steps** section, under **Respond**, click **Create Case**. Alternatively, select **Add to an existing case** to add the signal to an existing case.
3. Enter a title and optional description.
4. Click **Create Case**.

## Declare an incident

Use [Incident Management][5] to create an incident for a security signal.

1. On the [Signals Explorer][3], select a security signal.
1. In the **Next Steps** section, under **Respond**, click **More actions** and select **Declare incident**.
1. Alternatively, select **Add to incident** to add the signal to an existing incident.
1. On the incident creation modal, configure the incident by specifying details such as the severity level and incident commander.
4. Click **Declare Incident**.

## Run a workflow

Use [Workflow Automation][7] to manually trigger a workflow for a security signal. See [Trigger a Workflow from a Security Signal][6] for more information.

1. On the [Signals Explorer][3], select a security signal.
2. In the **Next Steps** section, under **Respond**, click **Run Workflow**.
3. On the workflow modal, select the workflow you want to run. The workflow must have a security trigger to appear in the list. Depending on the workflow, you may be required to enter additional input parameters.
4. Click **Run**.

Alternatively, click the **Workflows** tab in the signal side panel to see which workflows were triggered for the signal and suggested workflows to run.

## Kill containers or processes

From the signal side panel, you can terminate a malicious process or container directly. Under **Respond**, click **Kill Containers or Processes** to stop the threat on the affected host.

This action requires [Remediation][8] to be enabled on the Datadog Agent. The Agent terminates the targeted process or all processes in a compromised container depending on the configured scope. See [Remediation][8] for prerequisites, configuration, and action statuses.

## Network isolation

From the signal side panel, you can isolate a compromised process or container from the network. Under **Respond**, click **Network isolation** to block network traffic for the affected workload using an eBPF-based filter.

Network isolation requires [Remediation][8] to be enabled with network probes configured on the Agent. See [Remediation][8] for setup instructions and available enforcement options.

## More actions

Click **More actions** in the **Respond** section to access additional response options, such as declaring an incident, editing suppressions, or running other automated workflows configured for your organization.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/detection_rules/
[2]: https://app.datadoghq.com/security/signals
[3]: https://app.datadoghq.com/security/workload-protection/signals
[4]: /incident_response/case_management/
[5]: /incident_response/incident_management/
[6]: /security/cloud_security_management/workflows
[7]: /service_management/workflows
[8]: /security/workload_protection/respond_and_report/remediation
