---
title: Settings
kind: documentation
further_reading:
- link: "/service_management/case_management/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting third-party integrations"
---

## Overview

In Project Settings, you can manage membership, configure the auto-closing of cases, and set up third-party integrations like Jira and ServiceNow. 

## Manage membership

Add or remove members from a project. Members can either be individual users or entire Datadog Teams.

## Status transitions

To reduce noise, configure cases to automatically close after 7, 14, 30, 90, or 180 days of inactivity from the status transitions page of project settings. Inactivity is defined as the absence of human-initiated action, such as updating an attribute or writing a comment. Once a day, Datadog checks for cases that are inactive for at least the selected period and closes them out.

## Set up integrations

Case Management offers a range of native and third-party integrations, so you can incorporate Datadog solutions into your existing workflows and processes. With the Jira and ServiceNow integrations, you can solve the case with full-stack telemetry in Datadog, while maintaining a record of the investigation in those third-party systems. 

### Monitors

Project handles can be used in monitors to automatically create cases. In the monitor message body, include `@case-<project_handle>`. Datadog suggests a handle based on the project's name. You can accept or modify it as you wish. 

Navigate to the [Project Settings page][1], click **Integrations** > **Datadog Monitors**, and click on the toggle to get your @case-<project_handle>.

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
  |Two-way sync|Changes in Case Management are reflected in Jira, and vice versa|
  |Don't sync|The field does not sync to Jira.|
1. For case status and priority, select which values they map to on the Jira side. 
1. Save changes.

### ServiceNow

1. Configure the ServiceNow integration by following the [ITOM and ITSM setup instructions][2]. 
1. In Case Management project settings, enable ServiceNow for manual ServiceNow incident creation from the project. 
1. Select a ServiceNow instance and assignment group. 
1. You can opt into the automatic creation of a ServiceNow incident for each case created in the project.
1. Save changes.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases/settings
[2]: https://docs.datadoghq.com/integrations/servicenow/#itom-and-itsm-setup
