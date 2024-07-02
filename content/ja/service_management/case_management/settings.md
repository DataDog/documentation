---
title: Settings
kind: documentation
further_reading:
- link: /service_management/case_management/troubleshooting
  tag: Documentation
  text: Troubleshooting third-party integrations
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

Navigate to the [Project Settings page][1], click **Integrations** > **Datadog Monitors**, and click on the toggle to get your @case-<project_handle>.

Project handles can be used in monitors to automatically create cases. In the monitor message body, include `@case-<project_handle>`. Datadog suggests a handle based on the project's name. You can accept or modify it as you wish. 

### Third party integrations 
To configure third party integrations, navigate to [Create notifications and tickets ][2]


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases/settings
[2]: /service_management/case_management/create_notifications_and_third_party_tickets
