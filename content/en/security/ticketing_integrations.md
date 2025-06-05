---
title: Ticketing Integrations
description: "Security ticketing integrations"
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
---

{{< product-availability >}}

{{< callout btn_hidden="false" header="Join the Preview!" >}}
This feature is in Preview. Contact your Customer Success Manager to get access.
{{< /callout >}}

Datadog Security supports ticketing management using Datadog [Case Management][1] and third-party integrations, such as [Jira][2].

Datadog Case Management is available for all security products.

Notes:

- If you are new to Datadog Case Management, review the [Datadog Case Management][1] documentation.
- Review Case Management [integration with third-party ticketing tools][3]. Integrations must be set up before you can use birdirectional case management integration with Jira.


## Case management and security products

Case management is supported for all security products that use signals:

- Cloud SIEM (in [Signals][4])
- Code Security (in [Vulnerabilities][5])
- App and API Protection (in [Signals][6])
- Workload Protection (in [Signals][7])

Open any signal in these products and use the **Create Case** button to create a case in Datadog.

## Bidirectial case management with Jira

This sections describe how to use your Datadog Jira integration to sync tickets between Datadog Case Management and Jira bidirectionally. 

Bidirectionally synchronization enables you to update Jira tickets automatically when changes occur in Datadog, and update some Datadog information when changes occur in Jira.

### Supported products

Birdirectional Datadog Case Management integration with Jira is supported for the following Code Security vulnerability categories:

- Libraries (SCA)
- Static Code (SAST)
- Secret Scanning (SDS)
- Infrastructure as Code (IaC)

### Single source of truth

Birdirectional Case Management integration with Jira enables you to sync Jira tickets with Datadog cases, but Datadog is the single source of truth for issue resolution.

A Datadog finding's related Jira ticket can be closed manually, but a Datadog finding remains open if Datadog cannot confirm that the issue is fixed. This restriction ensures that a finding is not closed and removed from the list of signals when someone closes a related Jira ticket.

Closing a Datadog case without remediation does not close the finding either.

Remediation of the finding in Datadog or defining an exception by muting the finding are the only ways to close a finding. Once the finding is remediated, its related cases and Jira tickets are closed.

### Set up birdirectional case management integration with Jira

The following steps set up birdirectional case management integration with Jira and use Code Security vulnerabilites to verify that setup is successful.

1. Set up the following prerequisites in your Datadog account, or verify that they are set up already. The prerequisites are listed in their setup order.
   1. A [Datadog Jira integration][2].
   2. A [webhook for the Jira integration][8]. Configuring a webhook enables cases created in Case Management to automatically create issues in Jira and keep both resources synced.
   3. A [new Case Management project][9]. A project is a container object that holds a set of cases.
   4. A [Jira integration within the project][3].
      1. Enable and configure the **Sync data between Case Management and Jira** option.
      2. In **Title**, select **Two-way sync**.
      3. Complete the remaining settings, and then click **Save changes**.
2. Verify that birdirectional case management integration with Jira is working:
   1. Open Code Security [Vulnerbilities][5].
   2. Open any vulnerability.
   3. Locate the **Create Ticket** option. The option is available in **Next Steps** or **Repositories** (in **Libraries (SCA)**).
   4. Click the **Jira** tab.
   5. Verify the **Sync with Datadog (via Case Management)** section exists.

You are ready to start creating bidirectional case management tickets.

If you do not see the **Sync with Datadog (via Case Management)** section, ensure that you have set up the prerequisites.

### Create bidirectional case management tickets

This procedure uses Code Security vulnerabilites to demonstrate how to create bidirectional case management tickets.

1. Open Code Security [Vulnerbilities][5].
2. Open any vulnerability.
3. Locate the **Create Ticket** option. The option is available in **Next Steps** or **Repositories** (in **Libraries (SCA)**).
4. Click the **Jira** tab. You can use a new or existing ticket. Let's look at creating new Jira ticket.
5. In **Sync with Datadog (via Case Management)**, complete the following settings:
   1. **Case Management project:** select a Case Management project that has [Jira integration enabled][3].
   2. **Jira account:** select the Jira account where you want the ticket created.
   3. **Project:** select the Jira project to use.
   4. **Issue type:** select the Jira issue type to create.
6. To add more fields to the Jira ticket Datadog creates, use **Add Optional Field** to add the fields.
7. Click **Create Ticket**. 

Notes:

- Once you select a **Case Management project**, you can click **Edit integration** to verify that the integration is configured with **Two-way sync**.
- Bidirectional sync with Jira is available for certain Jira ticket attributes, such as status, assignee, and comments, but not all Jira fields are available.

### Manage bidirectional case management tickets

Existing bidirectional Jira tickets are listed in a signal's **Ticketing** or **Next Steps** sections.

Here's an example from a Static Code (SAST) signal:

{{< img src="security/bidir-jira-existing.png" alt="signal with existing Jira ticket" responsive="true" style="width:100%;">}}

Hover of the Jira ticket to see its details.

{{< img src="security/bidir-jira-existing-hover.png" alt="signal with existing Jira ticket" responsive="true" style="width:100%;">}}

Details such as assignee and status are provided along with a timeline of the Jira issue and Datadog case changes.

Closed Jira tickets are green.

In **Datadog Associated Case**, the related Datadog case is provided. Click the case name to open it in [Case Management][1]. 

Deleting a case does not delete related Jira tickets, but deleting a case project deattaches all tickets from related signals.

### Bidirectional case management facets

There are several case management facets, including:

- Case Key 
- Jira Key
- Case Status
- Has ticket attached

You can query attributes and create dashboards using these facets.


[1]: /service_management/case_management/
[2]: /integrations/jira/
[3]: /service_management/case_management/notifications_integrations/#third-party-tickets
[4]: https://app.datadoghq.com/security?column=time&order=desc&product=siem&viz=stream
[5]: https://app.datadoghq.com/security/appsec/vm/library
[6]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&product=appsec&viz=stream
[7]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Workload%20Security%22&product=cws
[8]: /integrations/jira/#configure-a-jira-webhook
[9]: /service_management/case_management/projects/
[10]: /security/ticketing_integrations/#prerequisites