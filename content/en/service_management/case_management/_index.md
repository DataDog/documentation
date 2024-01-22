---
title: Case Management
kind: documentation
aliases:
- /monitors/case_management/
further_reading:
- link: "https://www.datadoghq.com/blog/track-issues-datadog-case-management/"
  tag: "blog"
  text: "Proactively track, triage, and assign issues with Datadog Case Management"
- link: "https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/"
  tag: "blog"
  text: "Automate common security tasks and stay ahead of threats with Datadog Workflows and Cloud SIEM"
- link: "https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/"
  tag: "Blog"
  text: "Monitor 1Password with Datadog Cloud SIEM"
algolia:
  tags: ['inbox']
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
Case Management is not available in the US1-FED site.
</div>
{{% /site-region %}}

{{< img src="/service_management/case_management/case_managment_overview.png" alt="View all your cases on the main Case Management page" style="width:100%;" >}}

## Overview

Datadog Case Management provides a centralized place to track, triage, and troubleshoot issues. Create cases from alerts, security signals, and Error Tracking issues that you want to investigate.

You can assign cases to users or teams, establishing clear lines of ownership that persist throughout the lifespan of the case. Populate your cases with graphs, logs, and other telemetry data from across Datadog alongside information from external tools, such as messaging and issue-tracking apps.

## Create or update a case

On the [Case Management][1] page, click the **New Case** button to create a new case.

You can create or update cases from several other locations in Datadog:

| Create a case         | Instructions    |
| --------------------- | ----------- |
| Monitors              | From the individual Monitor status page, click the **Escalate** dropdown menu and select the **+ Create a case** option. |
| [Security Signals][4] | Click into a Security Signal to open up the side panel. From the side panel, click the **Escalate Investigation** dropdown menu and select **Create a Case**. |
| Error Tracking        | Click into an individual Error Tracking issue to open the side panel. From the side panel, click  **Create Case** or update the existing case.|

## View, filter, and manage

Find [Case Management][1] in the Service Management menu.

### Filter cases with Inboxes

Use **Inboxes** to filter the list of cases to the ones most relevant to your work. Datadog automatically creates inboxes with filters for cases assigned to you, created by you, or associated with your [Teams][2].

{{< img src="/service_management/case_management/add_new_inbox.png" alt="Inboxes left panel highlighting the option to add new inboxes" style="width:85%;" >}}

To filter cases based on a search query, create a custom inbox:
1. On the [Case Management page][1], next to **Other Inboxes**, click **Add**. The [Create a new inbox][3] page appears.
1. Give the inbox a **Name**
1. In the search box, enter a query. The **Inbox Preview** refreshes to show you the cases that match the current search query.
1. (Optional) Send a notification with third-party tools such as Slack, PagerDuty, or Webhooks. Click **+ Add Recipient Type** and select from the pre-configured channels or recipients. A notification is sent every time a case matching the query is created.
1. Click **Save Inbox**.

{{< img src="service_management/case_management/inbox_config.png" alt="Inbox configuration displaying third-party notification options" style="width:100%;" >}}

### Bulk actions

Make bulk edits to cases from the [Case Management page][1]:
1. Use the checkboxes to select one or more cases. The top of the list updates to show bulk edit options.
1. Use the drop-down menus to **Set status**, **Assign**, **Set priority**, or perform **More actions**. Or, click **Archive**.

### View case details

{{< img src="/service_management/case_management/case_detail_view.png" alt="Case detail view of an example case that was escalated" style="width:100%;" >}}

The Case Details view acts as a single source of truth of what is going on with the investigation. Click on a case to view the associated alerts, issues, timeline, and status. This page also provides information on the associated monitor, security signal, or Error Tracking issue, as well as the teams working on the case.

{{< img src="/service_management/case_management/activity_timeline.png" alt="View case details in the activity timeline" style="width:100%;" >}}

Each case automatically creates an activity timeline to capture real-time updates to status, assignee, priority, notes, insights, and integration tickets.

### Retention policy

By default, cases have a 15-month retention policy which can be extended if needed.

## Workflow automation

Automate the creation of cases. In a new or existing workflow, add a step in the [workflow builder][5] and search for "case management". Select the **Create Case** action or **Update the status from a Case**. 

To attach associated monitors to your case, add the monitor URL link in the Workflows Create Case action in the **Attachment Links** field.

{{< img src="service_management/case_management/workflows_attachment_link.png" alt="Add monitor links in the Workflows Create Case action in the Attachment Links field" style="width:100%;" >}}

If the case is created from a **Monitor or Security signal** trigger, the URL is available in the **Source** tab of the trigger.

## Take action

Use Case Management to gather information, context, and resources to determine the proper action. This includes further investigation, escalating to an incident, or closing out a case.

{{< img src="/service_management/case_management/close_case.png" alt="Close a case by updating the status to Closed" style="width:100%;" >}}

From an individual case:
- [**Declare Incident**][6]: Escalate a case to an incident.
- [**Investigation Notebook**][7]: Gather investigation information.
- **Link to integration**: Create Jira or ServiceNow tickets.
- **Close a case**: Let the team know that no further action is needed. Select **Closed** to update the status.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /account_management/teams/
[3]: https://app.datadoghq.com/cases/contexts/new
[4]: https://app.datadoghq.com/security
[5]: /service_management/workflows/build/#build-a-workflow-with-the-workflow-builder
[6]: /service_management/incident_management/#describing-the-incident
[7]: /notebooks/
