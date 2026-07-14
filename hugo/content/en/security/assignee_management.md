---
title: Assignee Management
description: "Assign Datadog users to security findings to manage triage ownership across Cloud Security, Code Security, App and API Protection, and Workload Protection."
site_support_id: case_management
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
  icon: cloud-security-management
further_reading:
  - link: "/security/ticketing_integrations/"
    tag: "Documentation"
    text: "Manage security findings with third-party ticketing tools"
  - link: "/incident_response/case_management/"
    tag: "Documentation"
    text: "Case Management"
---

{{< product-availability >}}

Assignee management lets you assign a Datadog user directly to a security finding to establish ownership during triage. You can assign a user without creating a [Case][1] or a third-party ticket first.

If a finding is linked to a Case or ticket, the finding's assignee and the linked Case or ticket assignee stay in sync. Cases and tickets remain optional.

## Supported products

You can assign users to findings in the following products:

- [Cloud Security][2]
- [Code Security][3]
- [App and API Protection][4]
- [Workload Protection][5]

## Assign a user to a finding

You can assign a user from the findings explorer, the finding side panel, or the finding detail page:

1. Open a finding, or hover over a finding in the explorer.
2. In the {{< ui >}}Assignee{{< /ui >}} control, select a Datadog user.

{{< img src="security/assignee_management/assign_finding.png" alt="The Assignee control on a finding with a Datadog user selected" responsive="true" style="width:100%;">}}

To unassign a finding, open the {{< ui >}}Assignee{{< /ui >}} control and clear the selected user.

{{< img src="security/assignee_management/unassign_finding.png" alt="Clearing the selected user from the Assignee control to unassign a finding" responsive="true" style="width:100%;">}}

## Assign multiple findings at once

To assign one user to several findings in a single action:

1. In the findings explorer, select up to 50 findings.
2. Click {{< ui >}}Assign{{< /ui >}} and select a Datadog user.
3. If some selected findings already have an assignee, choose how to handle them:
   - {{< ui >}}Exclude Vulnerabilities with Existing Assignees{{< /ui >}}: skip findings that already have an assignee.
   - {{< ui >}}Override Existing Assignees{{< /ui >}}: reassign all selected findings to the new user.

   {{< img src="security/assignee_management/bulk_assign_options.png" alt="Bulk assignment dialog with options to exclude vulnerabilities with existing assignees or override existing assignees" responsive="true" style="width:100%;">}}
4. If any selected findings are linked to shared tickets, Datadog warns you that reassigning updates the ticket assignee and affects all findings linked to those tickets.

   {{< img src="security/assignee_management/bulk_assign_shared_ticket_warning.png" alt="Warning that reassigning findings on shared tickets updates the ticket assignee and all linked findings" responsive="true" style="width:100%;">}}
5. Confirm to apply the assignment.

## Assignees, Cases, and tickets

Assignment works independently of Cases, and the finding assignee and any linked Case or ticket assignee stay in sync.

### Bidirectional sync

When [bidirectional syncing][6] is set up, assigning or unassigning a finding that is linked to a Case or ticket also updates the linked Case or ticket assignee. Assignee changes made in the external tool propagate back to the finding.

Assignee sync is supported for Jira and Linear. ServiceNow ticket assignees are not synced.

### Case creation carryover

When you create a Case for a finding that already has an assignee, the assignee carries over to the new Case.

### Assignee precedence

The finding assignee is resolved as follows:

| Action | Finding assignee outcome |
|--------|--------------------------|
| Create a Case for the finding | The finding's assignee is carried over to the Case. |
| Attach a Case that has an assignee | The Case's assignee takes precedence. |
| Attach a Case that has no assignee | The finding's assignee is preserved. |
| Detach or delete the Case | The finding's assignee is preserved. |

### Permissions for linked Cases and tickets

Updating a linked Case or ticket assignee is subject to [Case Management project][7] permissions. If you or the target assignee are not authorized for the Case's project, Datadog still assigns the finding, leaves the Case assignee unchanged, and notifies you that the Case was not updated.

### Shared tickets

When several findings are linked to one ticket, assigning or unassigning one finding's assignee updates the ticket and all other findings linked to that ticket.

## Assignee facet

The following facet is available for filtering findings by assignee:

- {{< ui >}}Assignee{{< /ui >}}: the assigned user's name.

You can query this facet and build dashboards with it.

## Permissions

To assign or unassign findings, you must have the `security_monitoring_findings_write` or `appsec_vm_write` permission. See [Role Based Access Control][8] for more information about Datadog's default roles and granular role-based access control permissions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/case_management/
[2]: https://app.datadoghq.com/security/compliance
[3]: https://app.datadoghq.com/security/code-security
[4]: https://app.datadoghq.com/security/appsec/inventory/finding
[5]: https://app.datadoghq.com/security/workload-protection/findings
[6]: /security/ticketing_integrations/#bidirectional-ticket-syncing
[7]: /incident_response/case_management/projects/
[8]: /account_management/rbac/permissions/#cloud-security-platform
