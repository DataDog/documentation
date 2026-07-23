---
title: Ticketing Integrations
description: "Security ticketing integrations"
site_support_id: case_management
products:
- name: Cloud SIEM
  url: /security/cloud_siem/
  icon: siem
- name: Workload Protection
  url: /security/workload_protection/
  icon: cloud-security-management
- name: App and API Protection
  url: /security/application_security/
  icon: app-sec
- name: Code Security
  url: /security/code_security/
  icon: security-code-security
- name: Cloud Security
  url: /security/cloud_security_management/
  icon: cloud-security-management
further_reading:
  - link: "/security/assignee_management/"
    tag: "Documentation"
    text: "Assignee Management"
  - link: "/incident_response/case_management/"
    tag: "Documentation"
    text: "Case Management"
  - link: "/api/latest/security-monitoring/#create-cases-for-security-findings"
    tag: "API"
    text: "Ticketing integration API"
---

{{< product-availability >}}

You can use [Datadog Case Management][1] to manage tickets in third-party tools like [Jira][2], [ServiceNow][21], and [Linear][23]. For details, see [Case Management integration with third-party ticketing tools][3].

This page discusses using Datadog Security with Datadog Case Management for ticketing management.

To assign a Datadog user to a finding without creating a ticket, see [Assignee Management][30].


## Case management and security products

Case Management is supported for all security products that use signals or findings:

- Code Security (in [Findings][5])
- Cloud Security (in [Findings][11])
- Cloud SIEM (in [Signals][4])
- App and API Protection (in [Signals][6] and [Findings][12])
- Workload Protection (in [Signals][7] and [Findings][13])

Open any signal or finding in these products or do a bulk selection of findings in the explorers, and use the {{< ui >}}Create Ticket{{< /ui >}} button to create a case in Datadog.


## Bidirectional ticket syncing

Bidirectional syncing enables you to update tickets automatically when changes occur in Datadog, and update some Datadog information when changes occur in your ticketing tool.

### Supported products

Bidirectional syncing is supported for the following Code and Cloud Security finding categories:

- Libraries (SCA)
- Static Code (SAST)
- Runtime Code (IAST)
- Secret Scanning 
- Infrastructure as Code (IaC)
- Misconfigurations
- Identity Risks
- Host and Container Vulnerabilities
- App and API Protection
- Workload Protection

### Single source of truth

Bidirectional syncing enables you to sync tickets with Datadog cases. However, Datadog is the single source of truth for issue detection and resolution.

A Datadog finding's related ticket can be closed manually. However, the Datadog finding remains open if Datadog cannot confirm that the issue is fixed. This restriction helps ensure that a finding is not closed and removed when someone closes a related ticket.

Closing a Datadog case without remediation does not close the finding either.

Remediation of the finding in Datadog or defining an exception by [muting the finding][14] are the only ways to close a finding. After the finding is remediated, its related cases and tickets are closed.

### Set up bidirectional syncing

{{< tabs >}}

{{% tab "Jira" %}}

The following steps set up bidirectional syncing with Jira and verify that setup is successful.

1. Set up the following prerequisites in your Datadog account, or verify that they are set up already. The prerequisites are listed in their setup order.
   1. The [Datadog Jira integration][2].
   2. A [webhook for the Jira integration][8]. Configuring a webhook enables cases created in Case Management to automatically create issues in Jira and keep both resources synced.
   3. A [new Case Management project][9]. A project is a container object that holds a set of cases.
   4. The [Jira integration is configured within the project][3].
      1. Enable the {{< ui >}}Sync data between Case Management and Jira{{< /ui >}} option.
      2. In {{< ui >}}Title{{< /ui >}}, select {{< ui >}}Two-way sync{{< /ui >}}.
      3. Complete the remaining settings, and then click {{< ui >}}Save changes{{< /ui >}}.
2. Verify that bidirectional Case Management integration with Jira is working:
   1. Open [any product supporting bidirectional ticket syncing][20].
   2. Locate the ticketing dropdown option in the explorer or finding page and select {{< ui >}}Jira{{< /ui >}}. The button opens a {{< ui >}}Jira Ticket{{< /ui >}} modal.
   3. Verify that the {{< ui >}}Case Management  ↔ Jira Integration{{< /ui >}} section exists and bidirectional sync is enabled.

{{< img src="security/jira_modal-1.png" alt="Modal used to create a Jira ticket for a Security finding, with bidirectional sync enabled." responsive="true" style="width:50%;">}}

You are ready to start creating bidirectional Case Management tickets.

If you do not see the {{< ui >}}Case Management  ↔ Jira Integration{{< /ui >}} section, verify that you have completed the prerequisites.

[2]: /integrations/jira/
[3]: /incident_response/case_management/notifications_integrations/#third-party-tickets
[8]: /integrations/jira/#configure-a-jira-webhook
[9]: /incident_response/case_management/projects/
[20]: /security/ticketing_integrations/#supported-products

{{% /tab %}}

{{% tab "ServiceNow" %}}

The following steps set up bidirectional syncing with ServiceNow and verify that setup is successful.

1. Set up the following prerequisites in your Datadog account, or verify that they are set up already. The prerequisites are listed in their setup order.
   1. The [Datadog ServiceNow integration][21].
      1. Go to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}ServiceNow{{< /ui >}} > {{< ui >}}Case Management{{< /ui >}}.
      2. Choose `Datadog Cases ITSM` as the case table for bidirectional sync. 
   2. A [Case Management project][9] to link to your assignment group. A project is a container object that holds a set of cases linked to your ServiceNow table. If there is no linked project, Datadog creates a project when you create a ticket.
   3. For ITSM bidirectional sync, ensure ServiceNow users who update incidents have at least the `itil` role. See [ServiceNow ITOM/ITSM setup][22] for details.
2. Verify that bidirectional Case Management integration with ServiceNow is working:
   1. Open [any product supporting bidirectional ticket syncing][20].     
   2. Locate the ticketing dropdown option in the explorer or finding page and select {{< ui >}}ServiceNow{{< /ui >}}. The button opens a {{< ui >}}ServiceNow Ticket{{< /ui >}} modal.
   3. Verify that the bidirectional sync is enabled for the configured {{< ui >}}Instance{{< /ui >}} and {{< ui >}}Assignment Group{{< /ui >}}.

{{< img src="security/servicenow_modal.png" alt="Modal used to create a ServiceNow ticket for a Security finding, with two-way sync and statuses mapping enabled." responsive="true" style="width:50%;">}}

You are ready to start creating bidirectional Case Management tickets.

If you do not see the {{< ui >}}Case Management ↔ ServiceNow Integration{{< /ui >}} section, verify that you have completed the prerequisites.

[3]: /incident_response/case_management/notifications_integrations/#third-party-tickets
[9]: /incident_response/case_management/projects/
[20]: /security/ticketing_integrations/#supported-products
[21]: /integrations/servicenow/
[22]: /integrations/guide/servicenow-itom-itsm-setup/

{{% /tab %}}

{{% tab "Linear" %}}

The following steps set up bidirectional syncing with Linear and verify that setup is successful.

1. Set up the following prerequisites in your Datadog account, or verify that they are set up already. The prerequisites are listed in their setup order.
   1. The [Datadog Linear integration][23].
   2. A [webhook for the Linear integration][24]. Configuring a webhook keeps cases created in Case Management and their Linear issues synced.
   3. A [new Case Management project][9]. A project is a container object that holds a set of cases.
   4. The [Linear integration is configured within the project][3].
      1. Enable Linear for the project, and then select a Linear account and team for issue creation.
      2. For each field you want to keep synced, select {{< ui >}}Two-way sync{{< /ui >}}.
      3. Complete the remaining settings, and then save your changes.
2. Verify that bidirectional Case Management integration with Linear is working:
   1. Open [any product supporting bidirectional ticket syncing][20].
   2. Locate the ticketing dropdown option in the explorer or finding page and select {{< ui >}}Linear{{< /ui >}}. The button opens a {{< ui >}}Linear Issue{{< /ui >}} modal.
   3. Verify that the {{< ui >}}Case Management ↔ Linear Integration{{< /ui >}} section exists and bidirectional sync is enabled.

{{< img src="security/linear_modal.png" alt="Modal used to create a Linear issue for a Security finding, with bidirectional sync enabled." responsive="true" style="width:50%;">}}

You are ready to start creating bidirectional Case Management tickets.

If you do not see the {{< ui >}}Case Management ↔ Linear Integration{{< /ui >}} section, verify that you have completed the prerequisites.

[3]: /incident_response/case_management/notifications_integrations/#third-party-tickets
[9]: /incident_response/case_management/projects/
[20]: /security/ticketing_integrations/#supported-products
[23]: /integrations/linear/
[24]: /integrations/linear/#configure-a-linear-webhook

{{% /tab %}}

{{< /tabs >}}

### Create bidirectional tickets

The following steps create a bidirectional ticket for a Security finding.

1. Open [any product supporting bidirectional ticket syncing][20].
2. Locate the {{< ui >}}Ticketing{{< /ui >}} icon dropdown option for a finding in the explorer or under {{< ui >}}Next Steps{{< /ui >}} in the finding page.
3. You can also select up to 50 findings at a time to create multiple tickets or one ticket for multiple findings.
4. Select the third-party tool from the dropdown.
5. Create a ticket for any third-party tool supported (see sections below).

{{% collapse-content title="Jira ticket" level="h4" expanded=false %}}
1. Open the {{< ui >}}Jira Ticket{{< /ui >}} modal. You can use a new or existing ticket. Let's look at creating a new Jira ticket.
2. Complete the following settings:
   1. {{< ui >}}Jira account{{< /ui >}}:** select the Jira account where you want the ticket created.
   2. {{< ui >}}Jira Project{{< /ui >}}:** select the Jira project to use.
   3. {{< ui >}}Jira work type{{< /ui >}}:** select the Jira work type to create.
   4. {{< ui >}}Assignee and Priority{{< /ui >}}:** optionally select the assigned user and priority.
3. To add more fields to the Jira ticket Datadog creates, use {{< ui >}}Add Optional Field{{< /ui >}} to add the fields.
4. View {{< ui >}}Data Sync Settings{{< /ui >}} to review and update the Case Management Project linked and the bidirectional sync settings per field.
5. Click {{< ui >}}Create{{< /ui >}}.

**Notes**:
- Bidirectional sync with Jira is available for certain Jira ticket attributes, such as status, assignee, and comments, but not all Jira fields are available.
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow ticket" level="h4" expanded=false %}}
1. Open the {{< ui >}}ServiceNow Ticket{{< /ui >}} modal. You can use a new or existing ticket. Let's look at creating a new ServiceNow ticket.
2. Complete the following settings:
   1. {{< ui >}}Instance{{< /ui >}}:** select the ServiceNow instance where you want the ticket created.
   2. {{< ui >}}Assignment group{{< /ui >}}:** select the ServiceNow group to assign the ticket to.
3. If you are creating a ticket for multiple findings, choose a creation mode:
   - {{< ui >}}Single Ticket{{< /ui >}}:** creates a single aggregated ticket linked to all selected findings.
   - {{< ui >}}Multiple Tickets{{< /ui >}}:** creates an individual ticket for each selected finding.
4. View {{< ui >}}Data Sync Settings{{< /ui >}} to review and update the Case Management Project linked and the bidirectional sync settings per field.
5. Click {{< ui >}}Create{{< /ui >}}.

**Notes**:
- Bidirectional sync is supported for `ITSM` mode only. `ITOM` events do not support bidirectional sync.
- Attaching to an existing ticket is supported for `ITSM` mode only.
- Only ServiceNow incident URLs are supported. Problem and change request URLs are not accepted.
{{% /collapse-content %}}

{{% collapse-content title="Linear issue" level="h4" expanded=false %}}
1. Open the {{< ui >}}Linear Issue{{< /ui >}} modal. You can use a new or existing issue.
2. Complete the following settings:
   1. {{< ui >}}Linear account{{< /ui >}}:** select the Linear account where you want the issue created.
   2. {{< ui >}}Linear team{{< /ui >}}:** select the Linear team to create the issue in.
3. Optionally set a Linear project, labels, assignee, and priority.
4. View {{< ui >}}Data Sync Settings{{< /ui >}} to review and update the Case Management Project linked and the bidirectional sync settings per field.
5. Click {{< ui >}}Create{{< /ui >}}.

**Notes**:
- Bidirectional sync with Linear is available for issue attributes such as status, assignee, title, description, priority, and comments.
- To use an existing issue, provide the Linear issue URL.
{{% /collapse-content %}}

### Manage bidirectional Case Management tickets

**Note**: For help resolving bidirectional sync issues, see [Case Management troubleshooting][24].

{{< tabs >}}

{{% tab "Jira" %}}

Existing bidirectional Jira tickets are listed in the finding's {{< ui >}}Ticketing{{< /ui >}} or {{< ui >}}Next Steps{{< /ui >}} sections.

Here's an example from a Static Code (SAST) finding:

{{< img src="security/bidir-jira-existing-1.png" alt="finding with existing Jira ticket: in the Next Steps section, under Ticket Created, a pill with the Jira logo and text 'CJT-16'" responsive="true" style="width:100%;">}}

Hover over the Jira ticket to see its details.

{{< img src="security/bidir-jira-existing-hover-1.png" alt="Mouseover state for pill in previous image. Modal with Jira ticket details." responsive="true" style="width:100%;">}}

Details such as assignee and status are provided along with a timeline of the Jira issue and Datadog case changes.

Closed Jira tickets are green.

In {{< ui >}}Datadog Associated Case{{< /ui >}}, the related Datadog case is provided. Click the case name to open it in [Case Management][1].

[1]: /incident_response/case_management/
{{% /tab %}}

{{% tab "ServiceNow" %}}

Existing bidirectional ServiceNow tickets are listed in the finding's {{< ui >}}Ticketing{{< /ui >}} or {{< ui >}}Next Steps{{< /ui >}} sections.

{{< img src="security/bidir-servicenow-existing.png" alt="Finding with an existing ServiceNow ticket: in the Next Steps section, under Tracking, a ServiceNow View incident pill." responsive="true" style="width:100%;">}}

Hover over the ServiceNow ticket to see its details, including status and a timeline of changes synced between ServiceNow and Datadog.

{{< img src="security/bidir-servicenow-existing-hover.png" alt="Tooltip over a ServiceNow ticket pill showing the incident number, status, and a timeline of changes synced between ServiceNow and Datadog." responsive="true" style="width:100%;">}}

In {{< ui >}}Datadog Associated Case{{< /ui >}}, the related Datadog case is provided. Click the case name to open it in [Case Management][1].

[1]: /incident_response/case_management/
{{% /tab %}}

{{% tab "Linear" %}}

Existing bidirectional Linear issues are listed in the finding's {{< ui >}}Ticketing{{< /ui >}} or {{< ui >}}Next Steps{{< /ui >}} sections.

{{< img src="security/bidir-linear-existing.png" alt="Finding with an existing Linear issue in the Next Steps section." responsive="true" style="width:100%;">}}

Hover over the Linear issue to see its details, including status, assignee, and a timeline of changes synced between Linear and Datadog.

{{< img src="security/bidir-linear-existing-hover.png" alt="Tooltip over a Linear issue pill showing issue status, assignee, and a timeline of changes synced between Linear and Datadog." responsive="true" style="width:100%;">}}

In {{< ui >}}Datadog Associated Case{{< /ui >}}, the related Datadog case is provided. Click the case name to open it in [Case Management][1].

[1]: /incident_response/case_management/
{{% /tab %}}

{{< /tabs >}}

#### Automatic detachment and ticket opening/closing

Archiving a case does not delete related tickets, but deleting a case project detaches all tickets from related Security findings.

Detaching a ticket from a Security finding does not delete it.

If there are no open findings left attached to a ticket (because they are all detached or resolved or muted), it is automatically closed.
Similarly, if at least one open finding is attached to a closed ticket (because it was attached or detected again or unmuted), it is automatically reopened.

### Bidirectional Case Management facets

There are several case management facets under {{< ui >}}Triage{{< /ui >}}, including:

- Case Key
- Jira Key
- Jira Status
- Linear Issue Key
- Linear Status
- Case Status
- Has ticket attached

You can query attributes and create dashboards using these facets.

## Ticketing integration API

The link between Datadog Cases and existing Security findings can be managed with the public API.

Dedicated endpoints allow users to [create Datadog case for existing security findings][15], [attach security findings to an existing Datadog case][16], and [detach security findings from their case][17].

Users can also [create Jira issues for security findings][18] and [attach security findings to a Jira issue][19].


[1]: /incident_response/case_management/
[2]: /integrations/jira/
[3]: /incident_response/case_management/notifications_integrations/#third-party-tickets
[4]: https://app.datadoghq.com/security/siem/signals
[5]: https://app.datadoghq.com/security/code-security
[6]: https://app.datadoghq.com/security/appsec/signals
[7]: https://app.datadoghq.com/security/workload-protection/signals
[8]: /integrations/jira/#configure-a-jira-webhook
[9]: /incident_response/case_management/projects/
[10]: /security/ticketing_integrations/#prerequisites
[11]: https://app.datadoghq.com/security/compliance
[12]: https://app.datadoghq.com/security/appsec/inventory/finding
[13]: https://app.datadoghq.com/security/workload-protection/findings
[14]: https://app.datadoghq.com/security/automation_pipelines/mute
[15]: /api/latest/security-monitoring/#create-cases-for-security-findings
[16]: /api/latest/security-monitoring/#attach-security-findings-to-a-case
[17]: /api/latest/security-monitoring/#detach-security-findings-from-their-case
[18]: /api/latest/security-monitoring/#create-jira-issues-for-security-findings
[19]: /api/latest/security-monitoring/#attach-security-findings-to-a-jira-issue
[20]: /security/ticketing_integrations/#supported-products
[21]: /integrations/servicenow/
[22]: /integrations/guide/servicenow-itom-itsm-setup/
[23]: /integrations/linear/
[24]: /incident_response/case_management/troubleshooting/
[30]: /security/assignee_management/
