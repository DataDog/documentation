---
title: Settings
aliases:
- /service_management/case_management/settings/
- /incident_response/case_management/settings/
further_reading:
- link: "/incident_response/work_management/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting third-party integrations"
- link: "/incident_response/work_management/customization"
  tag: "Documentation"
  text: "Work Management Customization"
---

## Overview

In Project Settings, you can manage access control, configure automatic status transitions, set up third-party integrations like Jira and ServiceNow, and more.

## Granular Access Control

By default, access to projects and work items is unrestricted. [Granular Access Control][1] can be used to manage the permissions of users, teams, roles, or your full organization at the project level. There are four sets of permissions that can be used:
- **Manager**: Users can create and edit work items, views, settings, and permissions of the project, and can delete the project.
- **Contributor**: Users can create, comment on, and edit work items. They can't change settings, permissions, or the project.
- **Viewer**: Users can view and watch all work items, views, and settings of the project. They can't create, edit, or comment on work items.
- **No Access**: Users can't view any work items, views, or settings of the project.

**Note:** Other Datadog products that integrate with Work Management, such as Monitors, are able to automatically create work items within a project regardless of the project's access settings.

## Status transitions

To reduce noise, configure work items to automatically close after 7, 14, 30, 90, or 180 days of inactivity from the status transitions page of project settings. Inactivity is defined as the absence of human-initiated action, such as updating an attribute or writing a comment. Once a day, Datadog checks for work items that are inactive for at least the selected period and closes them out.

## Set up integrations

Work Management offers a range of native and third-party integrations, so you can incorporate Datadog solutions into your existing workflows and processes. With the Jira, ServiceNow, and Linear integrations, you can resolve work items using full-stack telemetry in Datadog, while maintaining a record of the investigation in those third-party systems.

### Monitors

<div class="alert alert-info">Monitor handles use <code>@case-&lt;project_handle&gt;</code> terminology, which reflects Work Management's previous name, Case Management.</div>

Navigate to the [Project Settings page][2], click **Integrations** > **Datadog Monitors**, and click on the toggle to get your @case-<project_handle>.

Project handles can be used in monitors to automatically create work items. In the monitor message body, include `@case-<project_handle>`. Datadog suggests a handle based on the project's name. You can accept or modify it as you wish.

### Third party integrations
To configure third party integrations, navigate to [Create notifications and tickets ][3].

## Custom work types and attributes

Add custom work types and attributes to projects so that you can tailor your work items to fit your organizational needs. For more information, see [Work Management Customization][4].


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/granular_access
[2]: https://app.datadoghq.com/work/settings
[3]: /incident_response/work_management/notifications_integrations
[4]: /incident_response/work_management/customization
