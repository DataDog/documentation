---
title: Create notifications and third party tickets 
kind: documentation
further_reading:
- link: "/service_management/case_management/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting third-party integrations"
---

## Overview

Case Management provides the capability to create third-party integrations for generating notifications or tickets either automatically when a new case is created or manually when users choose to create them for specific cases. This allows you to integrate Datadog solutions into your existing workflows and processes seamlessly. With the Jira and ServiceNow integrations, you can resolve cases using full-stack telemetry in Datadog while keeping a record in these third-party systems.


## Notifications 

To get notified when a new case is created, you need to create a view. To do so: 
1. navigate to the project you want to receive notifications on
2. click **add view** 
3. give the view a name 
4. in the search box, enter a filtered query to retrieve the cases you want to be notified on
5. select how you would like to be notified within the recipients field

**Notifications options supported**

| Integration     | Configuration    |
| --------------- | ---------------- |
| Email           | Select one or more email addresses. |
| Slack           | Select a Slack workspace and channel. |
| Microsoft Teams | If you've connected Microsoft Teams tenants to Datadog, select a tenant, team, and channel. Otherwise, select a connector.|
| PagerDuty       | Select a service. |
| Webhooks        | Select the name of a webhook. |



## Third party tickets 
In Project Settings, you can manage membership, configure the auto-closing of cases, and set up third-party integrations like Jira and ServiceNow. 

### Jira

{{< img src="/service_management/case_management/settings/settings_jira.png" alt="Jira configuration options for case management settings" style="width:100%;" >}}

1. Ensure the Jira integration is configured. 
1. In Case Management project settings, enable **Jira** for manual Jira issue creation from the project. 
1. Select a Jira account, a project to create issues in, and the desired issue type (such as story, epic, bug, or task). 
1. You can opt into the automatic creation of a Jira issue for each case created in the project. 
1. For the following attributes—case title, description, assignee, comments, status, and priority—select one of the options below:
  | Option     | Description    | 
  | ---  | ----------- | 
  |Once to Jira at case creation|The field syncs from Case Management to Jira only at the time the case is created. Subsequent changes are not reflected on either side.|
  |Two-way sync (bi-directional)|Changes in Case Management are reflected in Jira, and vice versa|
  |Don't sync|The field does not sync to Jira.|
1. For case status and priority, select which values they map to on the Jira side. 
1. Save changes.

**Note**: A case can only be synced with one external resource at a time, per project. To enable Jira syncing, ServiceNow automatic creation and syncing must be disabled.

### ServiceNow

1. Configure the ServiceNow integration by following the [ITOM and ITSM setup instructions][2]. 
1. In Case Management project settings, enable ServiceNow for manual ServiceNow incident creation from the project. 
1. Select a ServiceNow instance and assignment group. 
1. You can opt into the automatic creation of a ServiceNow incident for each case created in the project.
1. For the following attributes—status, comments—select one of the options below:
  | Option     | Description    | 
  | ---  | ----------- | 
  |Once to ServiceNow at case creation|The field syncs from Case Management to ServiceNow only at the time the case is created. Subsequent changes are not reflected on either side.|
  |All updates to ServiceNow |Changes in Case Management are reflected in ServiceNow, but changes in ServiceNow are not reflected in Case Management.|
  |Two-way sync (bi-directional)|Changes in Case Management are reflected in ServiceNow, and vice versa.|
  |Don't sync|The field does not sync to ServiceNow.|
1. Select ServiceNow state values that Case Management status values should map to.
1. Save changes.

**Note**: A case can only be synced with one external resource at a time, per project. To enable ServiceNow syncing, Jira automatic creation and syncing must be disabled.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases/settings
[2]: https://docs.datadoghq.com/integrations/servicenow/#itom-and-itsm-setup
