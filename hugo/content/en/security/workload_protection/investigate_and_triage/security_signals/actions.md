---
title: Triage and Act on Security Signals
disable_toc: false
---

After you review a Workload Protection signal, use the {{< ui >}}Next Steps{{< /ui >}} section in the signal side panel to triage, escalate, automate, or respond to the threat.

Workload Protection signals share the same triage and response workflows as other Datadog Security signals. For an overview of security signals across Cloud SIEM, App and API Protection, and Workload Protection, see [Detection rules][1] and the unified [Security Signals Explorer][2].

## Triage a signal

You can triage a signal by assigning it to a user for further investigation. The assigned user can then track their review by updating the signal's status.

<div class="alert alert-info">To modify security signals, you must have the <code>security_monitoring_signals_write</code> permission. See <a href="/account_management/rbac/permissions/#cloud-security-platform">Role Based Access Control</a> for more information about Datadog's default roles and granular role-based access control permissions available for Workload Protection.</div>

1. On the [Signals Explorer][3], select a security signal.
2. In the {{< ui >}}Triage{{< /ui >}} section, click {{< ui >}}Assign Signal{{< /ui >}}, then select a user.
3. To update the status of the security signal, click the triage status dropdown menu and select a status. The default status is {{< ui >}}Open{{< /ui >}}.
    - {{< ui >}}Open{{< /ui >}}: The signal has not yet been resolved.
    - {{< ui >}}Under Review{{< /ui >}}: The signal is actively being investigated. From the {{< ui >}}Under Review{{< /ui >}} state, you can move the signal to {{< ui >}}Archived{{< /ui >}} or {{< ui >}}Open{{< /ui >}} as needed.
    - {{< ui >}}Archived{{< /ui >}}: The detection that caused the signal has been resolved. From the {{< ui >}}Archived{{< /ui >}} state, you can move the signal back to {{< ui >}}Open{{< /ui >}} if it's within 30 days of when the signal was originally detected.

## Create a case

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Case Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Use [Case Management][4] to track, triage, and investigate security signals.

1. On the [Signals Explorer][3], select a security signal.
2. On the signal side panel, under {{< ui >}}Next Steps{{< /ui >}}, find the {{< ui >}}Respond{{< /ui >}} section and click {{< ui >}}Create Security Case{{< /ui >}}. To add the signal to an existing case, open the dropdown next to {{< ui >}}Create Security Case{{< /ui >}} and select {{< ui >}}Add to existing Security Case{{< /ui >}}.
3. Enter a title and optional description.
4. Click {{< ui >}}Create Case{{< /ui >}}.

## Declare an incident

Use [Incident Management][5] to create an incident for a security signal.

1. On the [Signals Explorer][3], select a security signal.
2. In the {{< ui >}}Respond{{< /ui >}} section of the signal side panel, expand {{< ui >}}More actions{{< /ui >}}.
3. Under {{< ui >}}Escalate{{< /ui >}}, do one of the following:
    - To create an incident, click {{< ui >}}Declare Incident{{< /ui >}}. Configure the incident by specifying details such as the severity level and incident commander, then click {{< ui >}}Declare Incident{{< /ui >}}.
    - To add the signal to an existing incident, open the dropdown next to {{< ui >}}Declare Incident{{< /ui >}}, select an incident, and click {{< ui >}}Confirm{{< /ui >}}.

## Run a workflow

Use [Workflow Automation][7] to manually trigger a workflow for a security signal. See [Trigger a workflow from a security signal][6] for more information.

1. On the [Signals Explorer][3], select a security signal.
2. In the {{< ui >}}Respond{{< /ui >}} section of the signal side panel, click {{< ui >}}Run Workflow{{< /ui >}}.
3. On the workflow modal, select the workflow you want to run. The workflow must have a security trigger to appear in the list. Depending on the workflow, you may be required to enter additional input parameters.
4. Click {{< ui >}}Run Workflow{{< /ui >}}.

Alternatively, click the {{< ui >}}Workflows{{< /ui >}} tab in the signal side panel to see which workflows were triggered for the signal and suggested workflows to run.

## Kill containers or processes

From the signal side panel, you can terminate a malicious process or container directly. Under {{< ui >}}Respond{{< /ui >}}, click {{< ui >}}Kill Containers or Processes{{< /ui >}}.

This action requires [Response][8] to be enabled on the Datadog Agent. The Agent terminates the targeted process or all processes in a compromised container depending on the configured scope. See [Response][8] for prerequisites, configuration, and action statuses.

## Network isolation

From the signal side panel, you can isolate a compromised process or container from the network. Under {{< ui >}}Respond{{< /ui >}}, click {{< ui >}}Network Isolation{{< /ui >}} to block network traffic for the affected workload using an eBPF-based filter.

Network isolation requires [Response][8] to be enabled with network probes configured on the Agent. See [Response][8] for setup instructions and available enforcement options.

[1]: /security/detection_rules/
[2]: https://app.datadoghq.com/security/signals
[3]: https://app.datadoghq.com/security/workload-protection/signals
[4]: /incident_response/case_management/
[5]: /incident_response/incident_management/
[6]: /security/cloud_security_management/workflows
[7]: /service_management/workflows
[8]: /security/workload_protection/respond_and_report/#response
