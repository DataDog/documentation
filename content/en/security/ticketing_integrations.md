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
  - link: "/api/latest/security-monitoring/#create-cases-for-security-findings"
    tag: "API"
    text: "Ticketing integration API"
  - link: "/incident_response/case_management/"
    tag: "Documentation"
    text: "Case Management"
---

{{< product-availability >}}

You can use [Datadog Case Management][1] to manage tickets in third-party tools like [Jira][2] and [ServiceNow][21]. For details, see [Case Management integration with third-party ticketing tools][3].

This page discusses using Datadog Security with Datadog Case Management for ticketing management.


## Case management and security products

Case Management is supported for all security products that use signals or findings:

- Code Security (in [Findings][5])
- Cloud Security (in [Findings][11])
- Cloud SIEM (in [Signals][4])
- App and API Protection (in [Signals][6] and [Findings][12])
- Workload Protection (in [Signals][7] and [Findings][13])

Open any signal or finding in these products or do a bulk selection of findings in the explorers, and use the **Create Ticket** button to create a case in Datadog.


## Bidirectional ticket syncing

Bidirectional syncing enables you to update tickets automatically when changes occur in Datadog, and update some Datadog information when changes occur in your ticketing tool.

### Supported products

Bidirectional syncing is supported for the following Code and Cloud Security finding categories:

- Libraries (SCA)
- Static Code (SAST)
- Runtime Code (IAST)
- Secret Scanning (SDS)
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
      1. Enable the **Sync data between Case Management and Jira** option.
      2. In **Title**, select **Two-way sync**.
      3. Complete the remaining settings, and then click **Save changes**.
2. Verify that bidirectional Case Management integration with Jira is working:
   1. Open [any product supporting bidirectional ticket syncing][20].
   2. Locate the ticketing dropdown option in the explorer or finding page and select **Jira**. The button opens a **Jira Ticket** modal.
   3. Verify that the **Case Management  <-> Jira Integration** section exists and bidirectional sync is enabled.

{{< img src="security/jira_modal.png" alt="Modal used to create a Jira ticket for a Security finding, with bidirectional sync enabled." responsive="true" style="width:50%;">}}

You are ready to start creating bidirectional Case Management tickets.

If you do not see the **Case Management  <-> Jira Integration** section, ensure that you have completed the prerequisites.

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
      1. Go to **Settings > Integrations > ServiceNow > Case Management**.
      2. Choose `Datadog Cases ITSM` as the target for security triage workflows.
   2. A [Case Management project][9]. A project is a container object that holds a set of cases linked to your ServiceNow table.
   3. The [ServiceNow integration configured within the project][3].
      1. Go to **Case Management > Settings** and navigate to the ServiceNow tab under the selected project.
      2. Enter your **Instance name** (your ServiceNow subdomain) and **Assignment group**.
      3. Opt in for manual or automatic creation of a ServiceNow incident for each case created in the project.
      4. Enable the **Sync data between Case Management and ServiceNow** option.
      5. Complete the remaining settings for attribute sync, and then click **Save changes**.
   4. For ITSM bidirectional sync, ensure ServiceNow users who update incidents have at least the `itil` role. See [ServiceNow ITOM/ITSM setup][22] for details.
2. Verify that bidirectional Case Management integration with ServiceNow is working:
   1. Open [any product supporting bidirectional ticket syncing][20].     
   2. Locate the ticketing dropdown option in the explorer or finding page and select **ServiceNow**. The button opens a **ServiceNow Ticket** modal.
   3. Verify that the bidirectional sync is enabled for the configured **Instance** and **Assignment Group**.

You are ready to start creating bidirectional Case Management tickets.

If you do not see the **Case Management <-> ServiceNow Integration** section, ensure that you have completed the prerequisites.

[3]: /incident_response/case_management/notifications_integrations/#third-party-tickets
[9]: /incident_response/case_management/projects/
[20]: /security/ticketing_integrations/#supported-products
[21]: /integrations/servicenow/
[22]: /integrations/guide/servicenow-itom-itsm-setup/

{{% /tab %}}

{{< /tabs >}}

### Create bidirectional tickets

The following steps create a bidirectional ticket for a Security finding.

1. Open [any product supporting bidirectional ticket syncing][20].
2. Locate the **Ticketing** icon dropdown option for a finding in the explorer or under **Next Steps** in the finding page.
3. Select the third-party tool from the dropdown.
4. Create a ticket for any third-party tool supported (see sections below).

{{% collapse-content title="Jira ticket" level="h4" expanded=false %}}
1. Click the **Jira** tab. You can use a new or existing ticket. Let's look at creating a new Jira ticket.
2. In **Case Management  <-> Jira Integration**, complete the following settings:
   1. **Case Management project:** select a Case Management project that has [Jira integration enabled][3].
   2. **Jira account:** select the Jira account where you want the ticket created.
   3. **Project:** select the Jira project to use.
   4. **Issue type:** select the Jira issue type to create.
3. To add more fields to the Jira ticket Datadog creates, use **Add Optional Field** to add the fields.
4. Click **Create Ticket**.

**Notes**:
- Bidirectional sync with Jira is available for certain Jira ticket attributes, such as status, assignee, and comments, but not all Jira fields are available.
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow ticket" level="h4" expanded=false %}}
1. Click the **ServiceNow** tab. You can use a new or existing ticket.
2. In **Case Management <-> ServiceNow Integration**, complete the following settings:
   1. **Case Management project:** select a Case Management project that has [ServiceNow integration enabled][3].
   2. **Instance:** select the ServiceNow instance where you want the ticket created.
   3. **Assignment group:** select the ServiceNow group to assign the ticket to.
3. Choose a creation mode:
   - **One ticket for all findings**: creates a single aggregated ticket linked to all selected findings.
   - **One ticket per finding**: creates an individual ticket for each selected finding.
4. Click **Create Ticket**.

**Notes**:
- Bidirectional sync is supported for `ITSM` mode only. `ITOM` events do not support bidirectional sync.
- Attaching to an existing ticket is supported for `ITSM` mode only.
- Only ServiceNow incident URLs are supported. Problem and change request URLs are not accepted.
{{% /collapse-content %}}

### Manage bidirectional Case Management tickets

{{< tabs >}}

{{% tab "Jira" %}}

Existing bidirectional Jira tickets are listed in the finding's **Ticketing** or **Next Steps** sections.

Here's an example from a Static Code (SAST) finding:

{{< img src="security/bidir-jira-existing.png" alt="finding with existing Jira ticket: in the Next Steps section, under Ticket Created, a pill with the Jira logo and text 'CJT-16'" responsive="true" style="width:100%;">}}

Hover over the Jira ticket to see its details.

{{< img src="security/bidir-jira-existing-hover.png" alt="Mouseover state for pill in previous image. Modal with Jira ticket details." responsive="true" style="width:100%;">}}

Details such as assignee and status are provided along with a timeline of the Jira issue and Datadog case changes.

Closed Jira tickets are green.

In **Datadog Associated Case**, the related Datadog case is provided. Click the case name to open it in [Case Management][1].

{{% /tab %}}

{{% tab "ServiceNow" %}}

Existing bidirectional ServiceNow tickets are listed in the finding's **Ticketing** or **Next Steps** sections.

Hover over the ServiceNow ticket to see its details, including status, priority, and a timeline of changes synced between ServiceNow and Datadog.

In **Datadog Associated Case**, the related Datadog case is provided. Click the case name to open it in [Case Management][1].

{{% /tab %}}

{{< /tabs >}}

#### Automatic detachment and ticket opening/closing

Archiving a case does not delete related tickets, but deleting a case project detaches all tickets from related Security findings.

Detaching a ticket from a Security finding does not delete it.

If there are no open findings left attached to a ticket (because they are all detached or resolved or muted), it is automatically closed.
Similarly, if at least one open finding is attached to a closed ticket (because it was attached or detected again or unmuted), it is automatically reopened.

### Bidirectional Case Management facets

There are several case management facets under **Triage**, including:

- Case Key
- Jira Key
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
