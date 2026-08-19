---
title: Findings
disable_toc: false
further_reading:
  - link: "/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules"
    tag: "Documentation"
    text: "Learn about finding rules"
---

[Workload Protection][1] findings are generated when Agent events from a resource (a host or container) match a [finding rule][2]. View, filter, and triage findings in the [Findings Explorer][3] to assess and improve your runtime security posture.

Datadog stores a complete history of findings for investigation and audit.

## Findings Explorer

The [Findings Explorer][3] lists findings across your infrastructure. Each entry shows the affected resource, the finding rule that generated the finding, when the issue was first reported, its current status, and the responsible team or service.

Click {{< ui >}}View All{{< /ui >}} to see a complete list of resources affected by the same finding rule.

### Filter findings

Use the search bar and facet panel to narrow findings by severity, triage state, rule, host, or container.

To filter by triage state, use the search query `@workflow.triage.status:(open OR in-progress)`.

### Group findings

Use {{< ui >}}Group by{{< /ui >}} to organize the list:

- {{< ui >}}Rule Name{{< /ui >}}: Groups resources by finding rule.
- {{< ui >}}Resource Name{{< /ui >}}: Groups findings by host or container.
- {{< ui >}}None{{< /ui >}}: Shows a flat list of findings.

### Save views

To save your current search and filter settings for future use, hover over {{< ui >}}Views{{< /ui >}} and click {{< ui >}}Save as new view{{< /ui >}}.

## Finding details

Click any finding to open the side panel with detailed information about the resource and the finding rule that generated it.

{{< img src="security/workload_protection/investigate_and_triage/findings/findings_side_panel.png" alt="Finding side panel showing What Happened section and triage controls" width="100%">}}

The {{< ui >}}What Happened{{< /ui >}} section shows:

- When the finding was first reported.
- The location of the affected resource.
- The finding rule that matched.

Select the {{< ui >}}Trigger Event{{< /ui >}} tab to review the Agent event associated with the finding.

### Remediation guidance

Each OOTB finding rule includes remediation guidance authored by the Datadog security team. Select the {{< ui >}}Remediation{{< /ui >}} tab to review the remediation steps and address the underlying misconfiguration.

{{< img src="security/workload_protection/investigate_and_triage/findings/findings_remediation.png" alt="Finding details showing remediation steps for an affected resource" width="100%">}}

## Triage findings

Use {{< ui >}}Next Steps{{< /ui >}} in the finding side panel to manage findings:

- {{< ui >}}Status{{< /ui >}}: Update the finding's status to reflect investigation progress.
- {{< ui >}}Mute{{< /ui >}}: Suppress a finding for a specified duration when the behavior is expected or acceptable.
- {{< ui >}}Add Ticket{{< /ui >}}: Add the finding to a ticket for follow-up.

[1]: /security/workload_protection/
[2]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[3]: https://app.datadoghq.com/security/workload-protection/findings
