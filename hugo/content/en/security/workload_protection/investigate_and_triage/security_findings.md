---
title: Findings
disable_toc: false
further_reading:
  - link: "/security/workload_protection/finding-rules"
    tag: "Documentation"
    text: "Learn about finding rules"
  - link: "/security/workload_protection/detect_and_monitor/finding_rules"
    tag: "Documentation"
    text: "Learn about finding rules"
---

[Workload Protection][1] findings are generated when a resource — a host or container — fails a [finding rule][2]. View, filter, and triage findings in the [Findings Explorer][3] to assess and improve your runtime security posture.

Workload Protection evaluates resources against finding rules based on Agent events. Datadog generates a new finding as soon as a finding rule is triggered and stores a complete history of all findings for investigation and audit.

{{< img src="security/workload_protection/findings_explorer.png" alt="Workload Protection Findings Explorer showing findings grouped by rule" width="100%">}}

## Findings Explorer

The [Findings Explorer][3] lists findings across your infrastructure. Each entry shows the affected resource, the finding rule it is failing, when the issue was first reported, and the current triage state.

Explore which team or service is responsible for the affected resource, check when the finding was first reported, and review triage state.

Click **View All** to see a complete list of resources affected by the same finding rule.

### Filter findings

Use the search bar and facet panel to narrow findings by severity, triage state, rule, host, or container.

To filter by triage state, use the search query `@workflow.triage.status:(open OR in-progress)`.

### Group findings

Use **Group by** to organize the list:

- **Finding rule**: Shows all resources failing a specific rule.
- **Resource name**: Shows all findings for a specific host or container.
- **None**: Shows a flat list of all findings.

### Save views

To save your current search and filter settings for future use, hover over **Views** and click **Save as new view**.

## Finding details

Click any finding to open the side panel with detailed information about the resource and the rule it is failing.

{{< img src="security/workload_protection/finding_side_panel.png" alt="Finding side panel showing What Happened section and triage controls" width="100%">}}

The **What Happened** section shows:

- When the finding was first reported.
- The location of the affected resource.
- The finding rule that matched.

### Remediation guidance

Each OOTB finding rule includes remediation guidance authored by the Datadog security team. Scroll the side panel to review the remediation steps and address the underlying misconfiguration.

{{< img src="security/workload_protection/finding_remediation.png" alt="Finding side panel showing remediation steps for a failing resource" width="100%">}}

## Triage findings

Use the triage section in the finding side panel to manage findings across your team:

- **Mute**: Suppress a finding for a specified duration when the behavior is expected or acceptable.
- **Assign**: Assign the finding to a team member for follow-up.
- **Track status**: Update the triage state to reflect investigation progress.

[1]: /security/workload_protection/
[2]: /security/workload_protection/detect_and_monitor/finding_rules
[3]: https://app.datadoghq.com/security/workload-protection/findings
