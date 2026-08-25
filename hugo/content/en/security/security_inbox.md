---
title: Security Inbox
further_reading:
- link: "/security/automation_pipelines/security_inbox"
  tag: "Documentation"
  text: "Add to Security Inbox Rules"
- link: "/security/automation_pipelines/set_due_date"
  tag: "Documentation"
  text: "Set Due Date Rules"
- link: "/security/cloud_security_management"
  tag: "Documentation"
  text: "Learn more about Cloud Security"
- link: "/security/code_security/"
  tag: "Documentation"
  text: "Learn more about Code Security"
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Learn more about App and API Protection"
- link: "/security/default_rules/#all"
  tag: "Documentation"
  text: "Out-of-the-box Detection Rules"
- link: "https://www.datadoghq.com/blog/security-inbox-prioritization/"
  tag: "Blog"
  text: "How Datadog Security Inbox prioritizes security risks"
products:
- name: Cloud Security
  url: /security/cloud_security_management/
  icon: cloud-security-management
- name: Code Security
  url: /security/code_security/
  icon: security-code-security
- name: App and API Protection
  url: /security/application_security/
  icon: app-sec
- name: Workload Protection
  url: /security/workload_protection/
  icon: security-workload-security
---

{{< product-availability >}}

Security Inbox provides a consolidated, actionable list of your most important security findings. It correlates and contextualizes findings from across Datadog security products—vulnerabilities, misconfigurations, identity risks, and attack paths—into a single prioritized view of the work that most reduces risk in your environment.

Security Inbox answers three questions:

- **What should my team work on next?** Findings are ranked by severity, then by correlated risk, then by the number of resources and services they affect.
- **What is overdue?** Due date rules attach remediation deadlines to findings, so you can track progress against the service level agreements (SLAs) your organization commits to.
- **Why is this finding in my inbox?** Every finding reaches the inbox through an inbox rule. You can review the default rules, disable the ones that do not fit your organization, and create your own.

{{< img src="security/security_inbox_8.png" alt="The Security Inbox shows prioritized security findings with severity, triage status, and remediation SLA summaries" width="100%">}}

## What appears in Security Inbox

Inbox rules control which findings reach Security Inbox. Datadog provides a set of default inbox rules, compiled by the Datadog Security Research team, that surface the findings most likely to represent real risk. You can review these rules, turn individual rules off, and add rules of your own.

To see the rules that populate your inbox, click **Customize inbox** in the Security Inbox filter bar, or go to **Security** > **Settings** > [Findings Automation][11].

### Supported finding types

Inbox rules can match any of the following finding types:

| Finding type | Source |
|---|---|
| [Misconfiguration][2] | Cloud Security |
| [Identity Risk][3] | Cloud Security |
| [Attack Path][1] | Cloud Security |
| [Host Vulnerability][14] | Cloud Security |
| [Container Image Vulnerability][14] | Cloud Security |
| [Workload Activity][15] | Workload Protection |
| [Library Vulnerability][4] | Code Security |
| [Static Code Vulnerability][16] | Code Security |
| [Runtime Code Vulnerability][5] | Code Security |
| [Infrastructure as Code][17] | Code Security |
| [Secret][18] | Code Security |
| [API Security][19] | App and API Protection |

Security Inbox shows only the finding types you have permission to read. A finding you cannot open in its own explorer does not appear in your inbox.

### Detected risks

Security Inbox takes the following detected risks into account when it evaluates a finding:

- **Public accessibility**: Publicly exposed resources carry elevated risk, especially if they contain vulnerabilities or misconfigurations. To learn more, see [How Datadog Determines if Resources are Publicly Accessible][6].
- **Privileged access**: Resources with privileged access carry elevated risk as they grant elevated permissions that can expand the attack surface.
- **Under attack**: Resources that are seeing suspicious security activity carry elevated risks. Resources are flagged as "Under Attack" if a security signal has been detected on the resource in the last 15 days.
- **Exploit available**: Vulnerabilities with public exploits available carry elevated risks. The availability of a public exploit is verified with different exploit databases, such as [cisa.gov][7], [exploit-db.com][8], and [nvd.nist.gov][9].
- **In production**: Vulnerabilities in production environments carry elevated risks. The environment is computed from the `env` and `environment` tags.

## How Security Inbox prioritization works

Security Inbox ranks findings by considering the severity of a finding first, followed by the number of correlated risks, and then the number of impacted resources and services.

- **Severity (Critical, High, Medium, and Low)**: Severity is determined by the [Datadog Security Scoring Framework][10] for cloud misconfigurations and identity risks, and by CVSS 3.1 for vulnerabilities.
- **Number of detected risks**: When two findings have the same severity, the one with a greater number of detected risks is given higher priority.
- **Number of impacted resources and services**: If two findings share both the same severity and the same number of detected risks, the finding that impacts a greater number of resources and services is prioritized higher.

**Note**: The type of finding, detected risk, or impacted resource does not influence prioritization.

## Track remediation against due dates

[Due date rules][12] assign a remediation deadline to a finding based on its severity and type. When due dates are configured, the **Remediation SLA** card at the top of Security Inbox reports progress against them:

| Status | Meaning |
|---|---|
| Overdue | The finding is past its remediation due date. |
| Due soon | The finding is due within the next seven days. |
| Not due yet | The finding is due in more than seven days. |

Click a status to filter the list to those findings. You can also filter on **Overdue Status** from the filter bar.

Two other cards summarize the same set of findings:

- **Severity**: the number of Critical and High findings.
- **Status**: **Pending triage** counts findings with no ticket and no assignee. **In flight** counts findings that have at least one.

## Investigate findings

### Filter and group

Use the filter bar to narrow the inbox by any facet in the findings schema, including severity, finding type, service, team, and resource. To filter on an attribute that is not offered as a facet, type its name into the **Edit Filters** menu and add it as a custom filter.

Use **Group by** to aggregate findings by up to two fields at once. The inbox groups by finding title by default, which collapses every occurrence of the same underlying issue into a single row. Set **Group by** to **None** to see one row per finding.

### Change the columns

Click the gear icon above the table to add, remove, or reorder columns. The default columns are finding type, title, severity, risks, resource, and triage status.

**Note**: Column options are available on an ungrouped table, and inside the nested table that opens when you expand a group. They are unavailable on the outer table of a grouped view.

### Saved views

Save the current combination of filters, grouping, and columns as a saved view, so you can return to it later or share it with your team. Saved views are listed in the sidebar.

### Export

Click **Export** above the table to export your findings to other tools:

- **Export to Sheets**: send the findings to [Datadog Sheets][21] for deeper exploration and reporting.
- **Open in DDSQL Editor**: open the equivalent query in the [DDSQL Editor][22] for complex aggregations and custom analysis.
- **Download as CSV**: download the findings as a CSV file.
- **Copy as cURL**: copy the equivalent API request to your clipboard.

## Triage and remediate

The **Triage** column carries actions for a single finding. Click **Assign** to set an [assignee][23], or **Add Ticket** to create or link a ticket, without leaving the table.

To act on several findings at once, select them and use:

- **Ticketing**: create a Jira issue, a ServiceNow incident, a Linear issue, or a Datadog security case for the selected findings, or unlink an existing one. For setup and bidirectional syncing, see [Ticketing Integrations][20].
- **Assignee**: set or clear the [assignee][23] on the selected findings.
- **Muting**: mute findings that you have assessed and accepted.
- **Severity**: adjust the severity of the selected findings.

Bulk selection is available on an ungrouped table and inside an expanded group. Click any finding to open its side panel, which shows the full detection detail and remediation guidance for that finding type.

## Report on your inbox

The **Reporting** tab shows a dashboard of Security Inbox trends over time, including finding volume, severity mix, and remediation progress. Use it to review your security posture in recurring team meetings and to check whether remediation is keeping pace with detection.

## Use the security context map to identify and mitigate vulnerabilities

The security context map for [Attack Paths](#supported-finding-types) provides a comprehensive view to help identify and address potential breach points. It maps interconnected misconfigurations, permission gaps, and vulnerabilities that attackers might exploit.

Key features include:

- **Risk assessment**: The map enables security teams to assess the broader impact of vulnerabilities and misconfigurations. This includes evaluating whether security policies---such as access paths and permissions---need updating, and understanding the compliance implications of exposure, particularly when sensitive data is at risk within the blast radius.
- **Actionable context for immediate response**: The map includes service ownership information and other relevant context, allowing teams to make informed, real-time decisions. Teams can take action directly from the map by running integrated workflows, sharing security issue links, and accessing the AWS console view of resources for efficient remediation, all without switching tools.

{{< img src="security/security_context_map.png" alt="The security context map showing a publicly accessible AWS EC2 instance with a critical misconfiguration" width="100%">}}

## Customize Security Inbox

[Automation Pipelines][13] let you configure the rules that decide what reaches your inbox and when it is due. Use them to:

- **Resurface issues not captured by default**: Highlight issues that the default rules do not match, so no critical issue is overlooked.
- **Strengthen compliance and address key system concerns**: Address concerns affecting regulatory compliance or important business systems, regardless of severity.
- **Prioritize current risks**: Focus on immediate threats, such as identity risks after an incident or industry-wide vulnerabilities.
- **Enforce remediation timelines**: Attach due dates by severity, so overdue work is visible to the whole team.

Rules are evaluated in order. For each finding, Datadog checks your rules from the top until one matches, and then stops. If no rule matches, the finding does not enter the inbox.

For more information, see [Add to Security Inbox Rules][11] and [Set Due Date Rules][12].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/?category=all#all
[2]: /security/cloud_security_management/misconfigurations/
[3]: /security/cloud_security_management/identity_risks/
[4]: /security/code_security/software_composition_analysis
[5]: /security/code_security/iast
[6]: /security/cloud_security_management/guide/public-accessibility-logic/
[7]: https://www.cisa.gov/
[8]: https://www.exploit-db.com/
[9]: https://nvd.nist.gov/
[10]: /security/cloud_security_management/severity_scoring/#cloud-security-severity-scoring-framework
[11]: /security/automation_pipelines/security_inbox
[12]: /security/automation_pipelines/set_due_date
[13]: /security/automation_pipelines/
[14]: /security/cloud_security_management/vulnerabilities/
[15]: /security/workload_protection/
[16]: /security/code_security/static_analysis/
[17]: /security/code_security/iac_security/
[18]: /security/code_security/secret_scanning/
[19]: /security/application_security/api_posture/
[20]: /security/ticketing_integrations/
[21]: /sheets/
[22]: /ddsql_editor/
[23]: /security/assignee_management/
